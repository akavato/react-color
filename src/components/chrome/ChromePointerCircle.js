import React from 'react'
import reactCSS from 'reactcss'

export const ChromePointerCircle = () => {
  const styles = reactCSS({
    'default': {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        // boxShadow: 'inset 0 0 0 1px #fff',
        border: '1px solid #fff',
        transform: 'translate(-6px, -6px)',
      },
    },
  })

  return (
    <div className="pointer-circle" style={ styles.picker } />
  )
}

export default ChromePointerCircle
