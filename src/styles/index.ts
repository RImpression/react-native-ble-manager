import { StyleProp, Dimensions } from 'react-native';

export const color = {
  primary_red: '#FF2452',
  fff: '#fff'
}

export const flex = {
  directionRow: { flexDirection: 'row' },
  directionColumn: { flexDirection: 'column' },
  wrap: { flexWrap: 'wrap' },
  nowrap: { flexWrap: 'nowrap' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  alignStart: { alignItems: 'flex-start' },
  alignCenter: { alignItems: 'center' },
  alignEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },
}

export const flexBox = {
  center: mergeStyle(flex.directionRow, flex.justifyCenter, flex.alignCenter),
  centerX: mergeStyle(flex.directionRow, flex.justifyCenter),
  centerY: mergeStyle(flex.directionRow, flex.alignCenter),
  ...flex,
}

const getArray4 = (array: number[] = []) => {
  const length = array.length
  let result: number[]
  
  if (length === 1) {
    result = new Array(4).fill(array[0])
  } else if (length === 2) {
    result = [array[0], array[1], array[0], array[1]]
  } else if (length === 3) {
    result = [array[0], array[1], array[2], array[1]]
  } else if (length === 4) {
    result = array
  } else {
    result = new Array().fill(0)
  }
  return result
}

export const margin = (array: number[] = []) => {
  const result = getArray4(array)
  return {
    marginTop: result.shift(),
    marginRight: result.shift(),
    marginBottom: result.shift(),
    marginLeft: result.shift()
  }
}

/**
 * 内边距
 */
export const padding = (array: number[] = []) => {
  const result = getArray4(array)
  return {
    paddingTop: result.shift(),
    paddingRight: result.shift(),
    paddingBottom: result.shift(),
    paddingLeft: result.shift()
  }
}

/**
 * 容器边框
 * @param width 边宽
 * @param color 色值
 */
export const border = (width: number | number[], color:string = '#eee', style = 'solid') => {
  const widthArray = getArray4(Array.isArray(width) ? width : [width])

  return {
    borderTopWidth: widthArray.shift(),
    borderRightWidth: widthArray.shift(),
    borderBottomWidth: widthArray.shift(),
    borderLeftWidth: widthArray.shift(),
    borderColor: color,
    // borderStyle: style
  }
}

export const boxShadow = (
  width: number = 0,
  height: number = 1,
  opacity: number = 0.2,
  shadowRadius: number = 1,
  color = 'rgba(0,0,0,0.17)'
) => {

  return {
    shadowOffset: { width, height },
    // iosshadowOffset: { width, height },
    shadowColor: color,
    // iosshadowColor: color,
    shadowOpacity: opacity,
    // iosshadowOpacity: opacity,
    // iosshadowRadius: shadowRadius,
    shadowRadius
  }
}

export const dimensions = Dimensions.get('window')

export function mergeStyle (...args: object[]) {
  return Object.assign({}, ...args)
}