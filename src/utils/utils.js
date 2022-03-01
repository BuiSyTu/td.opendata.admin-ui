import {parse} from 'querystring'
import _ from 'lodash'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
var ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION
const reg =
  /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
export const isUrl = (path) => reg.test(path)
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true
  }

  return window.location.hostname === 'preview.pro.ant.design'
}

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env

  if (NODE_ENV === 'development') {
    return true
  }

  return isAntDesignPro()
}
export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const handleImage = (values, URL) => {
  const arr = _.without(_.split(values, '##'), '')
  let res = []
  arr.forEach((i) => {
    res.push({
      url: !(i.includes('https://') || i.includes('http://')) ? URL + i : i,
      path: i,
    })
  })
  return res
}

export const convertImage = (array) => {
  var temp = []
  array.forEach((element) => {
    temp = _.concat(temp, element?.response?.data[0]?.url??element.path)
  })
  var res = _.uniq(temp).join('##')
  return res
}