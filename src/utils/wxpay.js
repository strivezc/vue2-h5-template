/**
 *@desc 微信内部浏览器支付
 *@author zzc
 *@date 2021/03/15
 */
export function wxpay(params,callback){
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady(params,callback), false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady(params,callback));
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(params,callback));
    }
  }else{
    onBridgeReady(params,callback);
  }
}

function onBridgeReady(params,callback){
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId":params.appId,
      "timeStamp":params.timestamp,
      "nonceStr":params.nonceStr,
      "package":`prepay_id=${params.prepayId}`,
      "signType":params.signType,
      "paySign":params.paySign,
    },
    function(res){
      callback(res)
    }
  );
}
