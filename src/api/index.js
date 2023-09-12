import request from "@/utils/request";

export function aliWapPaymentApplication(data) {
  return request({
    url: `/myOrder/aliWapPaymentApplication`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}
export function wxPaymentApplication(data) {
  return request({
    url: `/myOrder/wxPaymentApplication`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}
// 品牌推广详情
export function getBrandPromotionInfo(data) {
  return request({
    url: `/brandPromotion/getBrandPromotionInfo`,
    method: "post",
    data,
    hideMessage: true,
  });
}
