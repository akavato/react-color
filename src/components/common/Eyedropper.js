import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import { toCanvas } from 'html-to-image'
import tinycolor from 'tinycolor2'

class EyeDropper extends (PureComponent || Component) {

  componentWillUnmount() {
    this.removeEventListener()
  }

  removeEventListener = () => {
    const tempCanvas = document.querySelector('#temp-canvas')
    if (tempCanvas) {
      tempCanvas.removeEventListener('click', this.eyeDropper, false)
    }
  }

  getCanvasPixelColor = (ctx, x, y) => {
    if (!ctx.getImageData) {
      ctx = ctx.getContext('2d')
    }

    const pixel = ctx.getImageData(x, y, 1, 1).data

    pixel.r = pixel[0]
    pixel.g = pixel[1]
    pixel.b = pixel[2]
    pixel.a = pixel[3]

    pixel.rgb = `rgb(${ pixel.r },${ pixel.g },${ pixel.b })`
    pixel.rgba = `rgba(${ pixel.r },${ pixel.g },${ pixel.b },${ pixel.a })`

    return pixel
  }

  eyeDropper = (e) => {
    e.stopPropagation()
    const { clientX, clientY } = e
    const realCanvas = document.querySelector('#temp-canvas')
    const { r, g, b } = this.getCanvasPixelColor(realCanvas, clientX, clientY)
    this.handleChange({ r, g, b })
    this.removeEventListener()
    realCanvas.remove()
  }

  handleEyeDropperClick = async (event) => {
    event.stopPropagation()
    const rootElement = this.props.rootElement || document.querySelector('body')
    let canvas

    if (this.props.useScreenCaptureAPI) {
      canvas = await this.screenCapture()
      if (typeof canvas === 'string') {
        canvas = await toCanvas(rootElement)
      }
    } else {
      canvas = await toCanvas(rootElement)
    }
    canvas.id = 'temp-canvas'
    rootElement.insertBefore(canvas, rootElement.firstChild)

    const realCanvas = document.querySelector('#temp-canvas')
    realCanvas.style.position = 'fixed'
    realCanvas.style.top = 0
    realCanvas.style.right = 0
    realCanvas.style.bottom = 0
    realCanvas.style.left = 0
    realCanvas.style.zIndex = 99999
    realCanvas.style.cursor = 'crosshair'
    realCanvas.addEventListener('click', this.eyeDropper, false)
  }

  screenCapture = async () => {
    const video = document.createElement('video')
    let mediaStream
    try {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: { width: screen.width, height: screen.height, frameRate: 1, cursor: 'never' } })
    } catch (error) {
      return error.message
    }

    const result = await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        video.play()
        video.pause()

        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        resolve(canvas)
      }
      video.srcObject = mediaStream
    })

    mediaStream.getTracks().forEach((track) => track.stop())

    return result
  }

  handleChange = (colorObj) => {
    const color = tinycolor(colorObj)
    this.props.onChange(color.toHsl())
  }

  render() {
    const styles = reactCSS({
      'default': {
        eyedropper: {
          absolute: '0px 0px 0px 0px',
          zIndex: 2,
        },
      },
    })

    return (
      <div style={ styles.eyedropper } onClick={ this.handleEyeDropperClick } />
    )
  }
}

export default EyeDropper
