const Mock = require('mockjs'); //引入mock依赖模块
const Random = Mock.Random; //获取mock.random对象

var obj = Mock.mock({
  "banners|3-6":[{
    "image": Random.image('500x300'),
    "link": "http://product.dangdang.com/1541446077.html"
  }]
})
console.log(obj);

module.exports.obj = obj;

