import { login } from "@/api/user";
import {
  getToken,
  removeToken,
  setToken,
  setUserId,
  setUserType,
  setUserName,
  setUserPhone,
  setUserImg,
} from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  userImg: "",
  phone: "",
  userId: "",
  recommendCode: "",
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_IMG: (state, userImg) => {
    state.userImg = userImg;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId;
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  SET_RECOMMEND_CODE: (state, recommendCode) => {
    state.recommendCode = recommendCode;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const params={
        ...userInfo,
        loginId: userInfo.loginId.trim(),
        password:userInfo.password.trim(),
      }
      login(params)
        .then((response) => {
          const data = response.resultData;
          commit("SET_TOKEN", data.token);
          commit("SET_PHONE", data.phone);
          commit("SET_USER_ID", data.userId);
          commit("SET_NAME", data.userName);
          commit("SET_USER_IMG", data.userImg);
          setToken(data.token);
          setUserId(data.userId);
          setUserType(data.userType);
          setUserName(data.userName);
          setUserPhone(data.phone);
          setUserImg(data.userImg);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  setRecommendCode({ commit }, recommendCode) {
    commit("SET_RECOMMEND_CODE", recommendCode);
  },
  setName({ commit }, name) {
    commit("SET_NAME", name);
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      //   .then(() => {
      //     commit("SET_TOKEN", "");
      //     removeToken();
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
