/*
 * @Description: 登录请求
 * @Author: yingzi
 * @Date: 2020-11-19 12:23:22
 * @LastEditTime: 2020-11-19 15:19:25
 * @LastEditors: yingzi
 */
import {request} from "./index";

export function login(userName, password) {
  return request({
    // type: 'post',
    url: '/users/login',
    params: {
      userName,
      password
    }
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}