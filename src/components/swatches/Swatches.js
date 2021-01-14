import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import map from 'lodash/map'
import merge from 'lodash/merge'

import { ColorWrap, Raised } from '../common'
import SwatchesGroup from './SwatchesGroup'

export const Swatches = ({ width, height, onChange, onSwatchHover, colors, hex,
  styles: passedStyles = {}, className = '' }) => {
  const styles = reactCSS(merge({
    'default': {
      picker: {
        width,
        height,
      },
      overflow: {
        height,
        overflowY: 'scroll',
      },
      body: {
        padding: '16px 0 6px 16px',
      },
      clear: {
        clear: 'both',
      },
    },
  }, passedStyles))

  const handleChange = (data, e) => onChange({ hex: data, source: 'hex' }, e)

  return (
    <div style={ styles.picker } className={ `swatches-picker ${ className }` }>
      <Raised>
        <div style={ styles.overflow }>
          <div style={ styles.body }>
            { map(colors, group => (
              <SwatchesGroup
                key={ group.toString() }
                group={ group }
                active={ hex }
                onClick={ handleChange }
                onSwatchHover={ onSwatchHover }
              />
            )) }
            <div style={ styles.clear } />
          </div>
        </div>
      </Raised>
    </div>
  )
}

Swatches.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  styles: PropTypes.object,
}

/* eslint-disable max-len */
Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [
    ['#CE1F1E', '#EA3332', '#FF4638', '#F97878', '#FFD0D5'],
    ['#9E1956', '#D7295F', '#FF3366', '#FF6C95', '#FFBFD2'],
    ['#56178A', '#8523A0', '#A52CAE', '#C16BC7', '#E4BFE6'],
    ['#900977', '#CF0389', '#FA0095', '#F466BC', '#F6BEE3'],
    ['#215579', '#3885AB', '#4BA4CA', '#73BED4', '#BDE3EB'],
    ['#004EA7', '#0C7DD8', '#1D9EF9', '#65BBFA', '#BCE1FD'],
    ['#0022AD', '#3B33C3', '#5940D3', '#9079E1', '#D0C6F1'],
    ['#004E41', '#007A6C', '#00978A', '#42B7AE', '#B0DFDC'],
    ['#006232', '#009355', '#00B46D', '#54CC99', '#BAE8D2'],
    ['#346C00', '#74A000', '#9BC40E', '#BBD568', '#E3EDBF'],
    ['#FF6E00', '#FFA100', '#FFC400', '#FFD743', '#FFEDB0'],
    ['#3E221A', '#5C3C2C', '#77513C', '#A28474', '#DCC9C0'],
    ['#2D3348', '#3D4D71', '#4C5E86', '#818EA7', '#C7CED9'],
    ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF'],
  ],
  styles: {},
}

export default ColorWrap(Swatches)
