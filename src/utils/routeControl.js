import Vue from 'vue';
import router from '../router'
import store from '../store'

// 需要缓存的路由名称数组
const cachedRouteNames = store.getters.cachedRouteNames;

// 定义添加缓存组件name函数，设置的是组件的name
const addRoutes = async (route) => {
  const routeName = route.name
  if (routeName && cachedRouteNames.indexOf(routeName) === -1) {
    await store.commit('cachedRoute/UPDATE_CACHEDROUTENAMES', { action: 'add', route: routeName })
  }
}

// 定义删除缓存组件name函数，设置的是组件的name
const deleteRoutes = async (route) => {
  const routeName = route.name
  if (routeName && cachedRouteNames.indexOf(routeName) !== -1) {
    await store.commit('cachedRoute/UPDATE_CACHEDROUTENAMES', { action: 'delete', route: routeName })
  }
}

router.beforeEach(async (to, from, next) => {
  // 处理缓存路由开始
  // 在读取缓存之前，先对该组件是否读取缓存进行处理
  to.matched.forEach((item, index) => {
    const routes = item.meta.cacheWhenFromRoutes;
    /**
     * 此处有几种情况
     *  1. 没有配置cacheWhenFromRoutes, 则一直缓存；
     *  2. 配置了cacheWhenFromRoutes，但是首次打开此web app，则from.name为空，此时应该将该页面组件的name添加到缓存配置文件中
     *  3. 配置了cacheWhenFromRoutes，from.name不为空，若命中cacheWhenFromRoutes，则添加该页面组件的name到缓存配置文件中，否则删除。
     *
     **/
    if (item.meta.keepAlive && (!routes || (routes && (!from.name || routes.indexOf(from.name) !== -1)))) {
      addRoutes(item)
    } else {
      deleteRoutes(item)
    }

  })
  next()
  // 处理缓存路由结束
})

// 全局混入。此步骤的目的是在该组件被解析之后，若是属于需要缓存的组件，先将其添加到缓存配置中，进行缓存。

// 导航守卫的最后一个步骤就是调用 beforeRouteEnter 守卫中传给 next 的回调函数，此时整个组件已经被解析，DOM也已经更新。

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      to.matched.forEach((item) => {
        const routeName = item.name
        if (to.meta.keepAlive && routeName && cachedRouteNames.indexOf(routeName) === -1) {
          store.commit('cachedRoute/UPDATE_CACHEDROUTENAMES', { action: 'add', route: routeName })
        }
      })
    })
  },
})

