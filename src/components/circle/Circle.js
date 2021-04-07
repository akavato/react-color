import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import merge from 'lodash/merge'

import { ColorWrap } from '../common'
import CircleSwatch from './CircleSwatch'

export const Circle = ({ width, onChange, onSwatchHover, colors, hex, circleSize,
  styles: passedStyles = {}, circleSpacing, className = '' }) => {
  const styles = reactCSS(merge({
    'default': {
      card: {
        width,
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing,
      },
    },
  }, passedStyles))

  const handleChange = (hexCode, e) => onChange({ hex: hexCode, source: 'hex' }, e)

  return (
    <div style={ styles.card } className={ `circle-picker ${ className }` }>
      { colors.map((c) => (
        <CircleSwatch
          key={ c }
          color={ c }
          onClick={ handleChange }
          onSwatchHover={ onSwatchHover }
          active={ hex === c.toLowerCase() }
          circleSize={ circleSize }
          circleSpacing={ circleSpacing }
        />
      )) }
    </div>
  )
}

Circle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circleSize: PropTypes.number,
  circleSpacing: PropTypes.number,
  styles: PropTypes.object,
}

Circle.defaultProps = {
  width: 252,
  circleSize: 28,
  circleSpacing: 14,
  colors: ['#FF4638', '#A52CAE', '#5940D3',
    '#5959A7', '#4C5E86', '#1D9EF9',
    '#00B46D', '#FA0095', '#FF3366',
    '#00BCD4', '#00978A', '#4BA4CA',
    '#FFC400', '#77513C', '#94A0B6',
    '#9BC40E', '#FFFFFF', '#000000'],
  styles: {},
}

export default ColorWrap(Circle)
