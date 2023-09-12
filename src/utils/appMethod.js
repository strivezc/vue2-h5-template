import {isAndroid, isIOS} from './index';

/**
 *@desc 返回原生
 *@author zzc
 *@date 2021/11/12
 */
export function goBack() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.goBack.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.goBack()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 退出登录
 *@author zzc
 *@date 2021/11/12
 */
export function logout() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.logout.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.logout()
    } catch (error) {
      console.log(error)
    }
  }
}
