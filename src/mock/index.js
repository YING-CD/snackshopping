const fs = require('fs');
const path = require('path');
const Mock = require('mockjs');//mockjs 导入依赖模块
const JSON5 = require('json5');
var obj = require('./data')


//读取json文件
function getJsonFile(filePath) {
    //读取指定json文件
    var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
    //解析并返回
    return JSON5.parse(json);
}

//返回一个函数
module.exports = function(app){
  if(process.env.MOCK == 'true'){
      //监听http请求
      app.get('/home/bannans', function (rep, res) {
          //每次响应请求时读取mock data的json文件
          //getJsonFile方法定义了如何读取json文件并解析成数据对象
          var json = getJsonFile('./test.json5');
          //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
          res.json(Mock.mock(json));
          // console.log(obj);
          res.json(obj);
          
      });
  }
} 