import axios from 'axios';
import {Toast} from 'vant';
import {getToken} from '@/utils/auth';

const API_ROOT = process.env.API_ROOT;
const url = window.location.href;

/**
 *@desc 微信jsdk
 *@author zzc
 *@date 2022/12/28
 * @param debug
 */
export function wxConfig(debug=false) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_ROOT}/async/userBind/getWxShareInfo`,
      data: {url},
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        token: getToken(),
      },
    })
      .then(res => {
        console.log(res,'res');
        const data = res.data;
        if (data.resultCode !== 0) {
          if (data.resultCode === 3) {
            // Toast(data.resultMessage);
          } else {
            if (data.resultCode === -1) {
              // Toast('登录已失效,请重新登录');
            } else {
              // Toast(`操作异常，请联系管理员(${data.resultCode})!`);
            }
          }
          reject(data);
        } else {
          const resultData = data.resultData;
          console.log(resultData, 'getWxinShareInfo');
          wx.config({
            debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: process.env.NODE_ENV === "production" ? resultData.appId : 'wx863ba2f7ef50223c', // 必填，公众号的唯一标识
            timestamp: resultData.timestamp, // 必填，生成签名的时间戳
            nonceStr: resultData.nonceStr, // 必填，生成签名的随机串
            signature: resultData.signature,// 必填，签名
            jsApiList: ['onMenuShareTimeline'],
            openTagList: ['wx-open-launch-weapp']
          });
          wx.ready(function () {
            console.log('wx.ready');
          });
          resolve(data);
        }
      })
      .catch(err => {
        Toast(err);
        reject(err);
      });
  });
}
