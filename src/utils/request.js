import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store';
import { getToken } from '@/utils/auth';
import router from "../router";
import cache from '@/utils/cache';

// create an axios instance
const service = axios.create({
  baseURL: process.env.API_ROOT, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 200000, // request timeout
});

let hideMessage=false;
let interval=3000; // 间隔时间(ms)，小于此时间视为重复提交

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    hideMessage = !!config.hideMessage;
    if (store.getters.token) {
      config.headers['token'] = getToken();
    }
    if (config['Content-Type']) {
      config.headers['Content-Type'] = config['Content-Type'];
    }
    // 是否需要防止数据重复提交
    const isRepeatSubmit = config['isRepeatSubmit'] || false;
    if (isRepeatSubmit && config.method === 'post') {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = cache.session.getJSON('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交';
          console.log(`[${s_url}]: ` + message);
          return Promise.reject(message);
        } else {
          cache.session.setJSON('sessionObj', requestObj);
        }
      }
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response, 'response');
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === 3) {
        // hideMessage 是否隐藏错误提示
        if (response.config.hideMessage) {
          return Promise.reject(res || 'Error');
        } else {
          Toast({message:res.msg,type:'html'});
        }
      } else {
        if (res.code === -1) {
          if (response.config.hideMessage) {
            return Promise.reject(res || 'Error');
          } else {
            Toast('登录已失效,请重新登录');
          }
        } else {
          Toast(`操作异常，请联系管理员(${res.code})!`);
        }
      }
      return Promise.reject(res || 'Error');
    } else {
      return res;
    }
  },
  err => {
    if (err.indexOf('请勿重复提交')>-1) {
      Toast('请勿重复提交!');
      return Promise.reject(err);
    }
    if (!hideMessage) {
      Toast('服务繁忙');
    }
    return Promise.reject(err);
  },
);

export default service;
