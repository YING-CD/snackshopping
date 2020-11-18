import originAxios from 'axios'
import Vue from 'vue'
// import qs from 'qs'

export default function axios(option) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			// baseURL: 'http://152.136.185.210:8000/api/w6',
			timeout: 5000
		});

		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// console.log('来到了request拦截success中');
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			return config
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		instance.interceptors.response.use(res => {
      if (res.data.code === "401") {
        // 401表示没有登录
        // 提示没有登录
        Vue.prototype.notifyError(res.data.msg);
        // 修改vuex的showLogin状态,显示登录组件
        store.dispatch("setShowLogin", true);
      }
      if (res.data.code === "500") {
        // 500表示服务器异常
        // 跳转error页面
        router.push({ path: "/error" });
      }
      return res;
		}, err => {
			console.log('来到了response拦截failure中');
     // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
