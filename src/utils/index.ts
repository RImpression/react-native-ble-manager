import { Linking } from 'react-native';

const REGEXP_URL = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
const REGEXP_PHONE = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
const REGEXP_ID = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

export const isUrl = (str: string) => REGEXP_URL.test(str)

export const isPhone = (str: string) => REGEXP_PHONE.test(str)

export const isIDCard = (str: string) => REGEXP_ID.test(str)

export const phoneCall = (phone: string) => {
  const str = `tel:${phone}`
  Linking.canOpenURL(str).then((supported) => {
    if (!supported) {
      console.log('Can\'t handle url: ' + str);
    } else {
      Linking.openURL(str)
    }
  }).catch(err => console.error('An error occurred', err));
}

export const delay = (ms = 0) => {
  return new Promise((r) => {
    setTimeout(() => r(), ms)
  })
}