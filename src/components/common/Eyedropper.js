import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import html2canvas from 'html2canvas'
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

  imageToCanvas = (eventTarget) => {
    // Usage example
    // if (target.nodeName.toLowerCase() === 'img') {
    //   const { offsetX, offsetY } = e
    //   this.imageToCanvas(target).then((canvas) => {
    //     const { r, g, b } = this.getCanvasPixelColor(canvas, offsetX, offsetY)
    //     this.handleChange({ r, g, b })
    //   })
    //   this.removeEventListener()
    //   document.body.style.cursor = 'default'
    //   return
    // }
    if (eventTarget.nodeName !== 'IMG') {
      return null
    }
    const canvasElement = document.createElement('canvas')
    canvasElement.width = eventTarget.width
    canvasElement.height = eventTarget.height
    const context = canvasElement.getContext('2d')

    const downloadedImg = new Image
    downloadedImg.src = eventTarget.src
    downloadedImg.crossOrigin = 'Anonymous'

    return new Promise((resolve, reject) => {
      downloadedImg.addEventListener('load', function loaded() {
        context.drawImage(downloadedImg, 0, 0, eventTarget.width, eventTarget.height)
        downloadedImg.removeEventListener('load', loaded)
        resolve(canvasElement)
      })
    })
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

  handleEyeDropperClick = (event) => {
    event.stopPropagation()
    const rootElement = this.props.rootElement || document.querySelector('body')

    html2canvas(rootElement, { logging: false }).then((canvas) => {
      canvas.id = 'temp-canvas'
      rootElement.insertBefore(canvas, rootElement.firstChild)

      const realCanvas = document.querySelector('#temp-canvas')
      realCanvas.style.position = 'absolute'
      realCanvas.style.top = 0
      realCanvas.style.right = 0
      realCanvas.style.bottom = 0
      realCanvas.style.left = 0
      realCanvas.style.zIndex = 99999
      realCanvas.style.cursor = 'crosshair'
      realCanvas.addEventListener('click', this.eyeDropper, false)
    })
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
