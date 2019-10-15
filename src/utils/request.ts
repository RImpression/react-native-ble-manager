// import axios from 'axios'
import { Alert } from 'react-native'
import { Toast, Portal } from '@ant-design/react-native';
import mock from '../mock';
import strorge from '../utils/strorge';

let loadingKey = null

const showLoading = (msg = '加载中') => {
  if (!loadingKey) {
    console.log('showLoading');
    loadingKey = Toast.loading(msg, 20)
  }
}
const hideLoading = () => Portal.remove(loadingKey)

export async function request(url, option) {
  if (option.loading) {
    showLoading()
  }
  const token = await strorge.get('userToken');
  const defOption = {
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  if (mock[option.url]) {
    
    return mock[option.url](option.data)
      .then(res => {
        hideLoading()
        return res
      })
      .then(res => {
      if (res.code === 1) {
        return res.data
      } else if (res.message) {
        console.log('error', res);
        Toast.info(res.message)
        return false
      }
    })
  }
  const newOption = { ...defOption, ...option }

  return fetch(url, newOption)
    .then(response => response.json())
    .then(res => {
      __DEV__ && console.log('request success:',{
        url,
        method: newOption.method,
        headers: newOption.headers,
        requestBody: newOption.body,
        responseBody: res
      });
      hideLoading();
      if (res.code === 1) {
        return res.data || {}
      } else if (res.message) {
        Toast.info(res.message)
        return false
      }
    })
    .catch(err => {
      hideLoading();
      __DEV__ && console.log('request error:',{
        url,
        method: newOption.method,
        headers: newOption.headers,
        requestBody: newOption.body,
        err
      });
    })
}

const defaultData = {}
const defatltUrl = ''
export function $post(url = defatltUrl, data = defaultData, options = {}) {
  return request(url, {
    ...options,
    method: 'POST',
    url,
    body: JSON.stringify(data)
  })
}

export function $get(url = defatltUrl, data = defaultData, options = {}) {
  var getUrl = url + obj2Params(data);
  return request(getUrl, {
    ...options,
    method: 'GET',
    url,
    data
  })
}

function obj2Params(obj = {}) {
  var params = '?';
  if (JSON.stringify(obj) != '{}') {
    for(var key in obj) {
      params += (params.substr(params.length-1,params.length) != '?' ? '&' : '') +  key + '=' + obj[key];
    }
    return params;
  } else {
    return '';
  }
}

export default {
  request,
  $post,
  $get
}
