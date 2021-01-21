import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import * as alpha from '../../helpers/alpha'

import Checkboard from './Checkboard'

export class Alpha extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e) => {
    const change = alpha.calculateChange(e, this.props.hsl, this.props.direction, this.props.a, this.container)
    change && typeof this.props.onChange === 'function' && this.props.onChange(change, e)
  }

  handleMouseDown = (e) => {
    this.handleChange(e)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { direction = 'horizontal', rgb } = this.props
    const styles = reactCSS({
      'default': {
        alpha: {
          absolute: '0px 0px 0px 0px',
          borderRadius: this.props.radius,
        },
        checkboard: {
          absolute: '0px 0px 0px 0px',
          overflow: 'hidden',
          borderRadius: this.props.radius,
        },
        gradient: {
          absolute: '0px 0px 0px 0px',
          background: `linear-gradient(to right, rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 0) 0%,
           rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 1) 100%)`,
          boxShadow: this.props.shadow,
          borderRadius: this.props.radius,
        },
        container: {
          position: 'relative',
          height: '100%',
        },
        pointer: {
          position: 'absolute',
          left: `${ rgb.a * 100 }%`,
        },
        slider: {
          width: '4px',
          borderRadius: '1px',
          height: '8px',
          boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
          background: '#fff',
          marginTop: '1px',
          transform: 'translateX(-2px)',
        },
      },
      'vertical': {
        gradient: {
          background: `linear-gradient(to bottom, rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 0) 0%,
           rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 1) 100%)`,
        },
        pointer: {
          left: 0,
          top: `${ rgb.a * 100 }%`,
        },
      },
      'overwrite': {
        ...this.props.style,
      },
    }, {
      vertical: direction === 'vertical',
      overwrite: true,
    })

    return (
      <div style={ styles.alpha }>
        <div className="alpha-track-left" style={ styles.checkboard }>
          <Checkboard renderers={ this.props.renderers } />
        </div>
        <div className="alpha-track-right" style={ styles.gradient } />
        <div
          className={ `alpha-${ direction }` }
          style={ styles.container }
          ref={ (container) => this.container = container }
          onMouseDown={ this.handleMouseDown }
          onTouchMove={ this.handleChange }
          onTouchStart={ this.handleChange }
        >
          <div style={ styles.pointer }>
            { this.props.pointer ? (
              <this.props.pointer { ...this.props } />
            ) : (
              <div style={ styles.slider } />
            ) }
          </div>
        </div>
      </div>
    )
  }
}

export default Alpha
