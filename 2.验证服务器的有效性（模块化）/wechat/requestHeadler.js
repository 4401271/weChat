/*
* 该模块用于验证是否为自己的公众号，并将echostr返回给微信服务器，用于告知我们就是合法的开发者服务器
* */

let sha1 = require('sha1')
let {Token} = require('../config')

module.exports = (req, res, next)=>{

  /*
  * 微信服务器会给开发者服务器发送两种类型的消息
  *   1. 验证服务器有效性的消息 --- GET
  *   2. 转发用户的消息 --- POST
  * */

  // 当微信服务器给开发者服务器发送请求时发送的请求时GET请求

  /*
  * 1. 在网页上配置开发者服务器的时候，微信服务器会返回给开发者如下信息
    * { signature: 'f03259795efbe52ac4e56c2eac55eef15eccfc70', //微信公众号经过特殊加密后的字符串
        echostr: '3352425038413815093', //微信服务器生成的一个随机的字符串
        timestamp: '1590156341', //时间戳
        nonce: '824137407' //微信服务器生成的一个随机数字 }

    2. 验证服务器有效性步骤：
      1. 将微信服务器发过来的timestamp、nonce、事先在网页里约定好的token(beanInBoy)，存入一个数组中，随后对数组进行字典排序
      2. 将上述字典排序过的数组，每一项取出，拼接成一个字符串
      3. 将第二步的字符串进行sha1加密
      4. 将加密的结果与signature进行对比
        -- 一致： 返回给微信服务器：echostr
        -- 不一致： 非法请求，驳回请求
  * */

  let {signature, echostr, timestamp, nonce} = req.query
  // 1. 将微信服务器发过来的timestamp、nonce、事先在网页里约定好的token(beanInBoy)，存入一个数组中，随后对数组进行字典排序
  let arr = [timestamp, nonce, Token].sort()

  // 2. 将上述字典排序过的数组，每一项取出，拼接成一个字符串
  // 3. 将第二步的字符串进行sha1加密
  let sha1Str = sha1(arr.join(''))

  //微信服务器发来了验证有效性的请求
  if(req.method === 'GET' && sha1Str == signature){
    console.log('微信服务器发来了验证有效性的请求，验证通过...')
    res.send(echostr)
  } else if(req.method === 'POST' && sha1Str == signature) {
    console.log('微信服务器转发了用户的消息')
  } else {
    res.send('err')
  }

}