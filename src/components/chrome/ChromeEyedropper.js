import React from 'react'
import reactCSS from 'reactcss'
import { Eyedropper } from '../common'
import ColorizeIcon from './ColorizeIcon'

export const ChromeEyedropper = (props) => {
  const styles = reactCSS({
    'default': {
      wrap: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '32px',
        height: '32px',
        cursor: 'pointer',
      },
      icon: {
        width: '18px',
        height: '18px',
        fill: '#364364',
      },
    },
  })

  return (
    <div className="eyedropper-wrap" style={ styles.wrap }>
      <ColorizeIcon style={ styles.icon } />
      <Eyedropper onChange={ props.onChange } />
    </div>
  )
}

export default ChromeEyedropper
