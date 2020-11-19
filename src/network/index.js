/*
 * @Description: 网络请求体封装
 * @Author: yingzi
 * @Date: 2020-11-11 23:20:27
 * @LastEditTime: 2020-11-19 12:22:28
 * @LastEditors: yingzi
 */
import axios from 'axios'

export function request(config) {
	//1. 创建axios实例
	const instance = axios.create({
		baseURL: 'http://localhost:3030/',
		timeout: 5000
	})
	// axios请求拦截器
	instance.interceptors.request.use(res => {
		console.log(res);
		return res
	}, err => {
		console.log(err);
	})
	//axios应答拦截器
	instance.interceptors.response.use(res => {
		// console.log(res.data);
		return res.data
	}, err => {
		console.log(err);
	})
	//返回实例
	return instance(config)
}