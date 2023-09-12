const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  userImg: state => state.user.userImg,
  phone: state => state.user.phone,
  userId: state => state.user.userId,
  recommendCode: state => state.user.recommendCode,
  isApp: state => state.user.isApp,
  isPlay: state => state.user.isPlay,
  centreMsg: state => state.user.centreMsg,

  groupData: state => state.content.groupData,

  cachedRouteNames: state => state.cachedRoute.cachedRouteNames,

}
export default getters
