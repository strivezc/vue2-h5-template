import router from './router'
import store from './store'
import { Toast } from 'vant';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) { // 需要验证
    // token存在条件并且是否已认证
    const hasToken = getToken()
    if (hasToken) {
      next()
    } else {
      next({
        path: '/',                 // 验证失败要跳转的页面
      })
    }
  } else { // 不需要验证的页面
    next() // 确保一定要调用 next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
