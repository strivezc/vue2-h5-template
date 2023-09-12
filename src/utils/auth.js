import Cookies from 'js-cookie';

const TokenKey = 'token';
const UserId = 'userId';
const UserType='userType';
const UserName='userName';
const UserPhone='userPhone';
const UserImg='userImg';


export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function setUserImg(userImg) {
  return Cookies.set(UserImg,userImg);
}
export function getUserImg() {
  return Cookies.get(UserImg);
}
export function removeUserImg() {
  return Cookies.remove(UserImg);
}

export function getUserId() {
  return Cookies.get(UserId);
}

export function removeUserId() {
  return Cookies.remove(UserId);
}

export function setUserId(userId) {
  return Cookies.set(UserId, userId);
}

export function getUserPhone() {
  return Cookies.get(UserPhone);
}

export function removeUserPhone() {
  return Cookies.remove(UserPhone);
}

export function setUserPhone(userPhone) {
  return Cookies.set(UserPhone, userPhone);
}

export function setUserType(userType) {
  return Cookies.set(UserType,userType);
}
export function getUserType() {
  return Cookies.get(UserType);
}
export function removeUserType() {
  return Cookies.remove(UserType);
}

export function setUserName(userName) {
  return Cookies.set(UserName,userName);
}
export function getUserName() {
  return Cookies.get(UserName);
}
export function removeUserName() {
  return Cookies.remove(UserName);
}
