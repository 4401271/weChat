/*
* 该模块用于解析微信服务器转发的用户消息
* */

let {parseString} = require('xml2js')

module.exports = {

  //获取微信服务器发送过来的XML格式的数据
  getXMLData(req) {
  //微信服务器是以xml格式，向开发者服务器转发用户消息的
  return new Promise((resolve, reject)=>{
    let result = ''
    req.on('data', (data)=>{
      result += data.toString()
    })
    req.on('end', ()=>{
      resolve(result)
    })
  })
},

  //将XML数据转换为JS对象
  parseXML2js(xmlData)  {
  let result
  //这个方法是同步的，99%的回调都是异步，这个就是那个特殊的同步回调
  parseString(xmlData, {trim:true}, (err, data)=>{
    if(!err){
      result = data
    } else {
      console.log('进行xml格式转换时出错！',err)
    }
  })
  return result
},

  //进一步格式化数据
  formatObjectData({xml}) {
  let result = {}
  for(let key in result){
    result[key] = xml[key][0]
  }
  return result
}

}