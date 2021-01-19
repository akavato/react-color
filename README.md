# React Color + eyedropper, based on [react-color](http://casesandberg.github.io/react-color/)

[![Npm Version][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]

* **13 Different Pickers** - Sketch, Photoshop, Chrome and many more

* **Make Your Own** - Use the building block components to make your own

## Demo

[**Live Demo**](http://casesandberg.github.io/react-color/)

## Installation & Usage

```sh
npm install mp-react-color --save
```

### Include the Component

```js
import React from 'react'
import { ChromePicker } from 'mp-react-color'

class Component extends React.Component {

  render() {
    return <ChromePicker useScreenCaptureAPI rootElement={document.querySelector('#react-app')} />
  }
}
```
You can import `AlphaPicker` `BlockPicker` `ChromePicker` `CirclePicker` `CompactPicker` `GithubPicker` `HuePicker` `MaterialPicker` `PhotoshopPicker` `SketchPicker` `SliderPicker` `SwatchesPicker` `TwitterPicker` respectively.


[license-image]: http://img.shields.io/npm/l/react-color.svg
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/mp-react-color.svg
[npm-version-url]: https://www.npmjs.com/package/mp-react-color
