import axios from 'axios';
import {Toast} from 'vant';
import {getToken} from '@/utils/auth';

const API_ROOT = process.env.API_ROOT;
const url = window.location.href;

/**
 *@desc 微信h5分享
 *@author zzc
 *@date 2022/03/14
 *@param title 分享标题
 *@param desc 分享描述
 *@param link 分享链接
 *@param imgUrl 分享图标
 */
export function wxShare({title, desc, link,imgUrl}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_ROOT}/users/user/getWxinShareInfo`,
      data: {url},
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        token: getToken(),
      },
    })
      .then(res => {
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
          // console.log(resultData, 'getWxinShareInfo');
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: resultData.appId, // 必填，公众号的唯一标识
            timestamp: resultData.timestamp, // 必填，生成签名的时间戳
            nonceStr: resultData.nonceStr, // 必填，生成签名的随机串
            signature: resultData.signature,// 必填，签名
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表
          });
          let obj = {
            title,
            desc,
            link,
            imgUrl, //分享图标
            success: (data) => {
              // console.log(data,'分享回调');
            }
          };
          // console.log(obj,'shareObj');
          wx.ready(function () {
            wx.onMenuShareAppMessage(obj);
            //监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            // console.log('onMenuShareAppMessage');
            wx.onMenuShareTimeline(obj);
            // console.log('onMenuShareTimeline');
            //监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareQQ(obj);

            //监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo(obj);
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
