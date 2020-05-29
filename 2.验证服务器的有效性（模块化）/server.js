let express = require('express')
let app = express()
//引入请求验证
let requestHeadler = require('./wechat/requestHeadler')

//用于解析post请求的urlencoded编码形式的参数
app.use(express.urlencoded({extended:true}))

app.use(requestHeadler)

// app.get('/test', (req, res)=>{
//   res.send("ok")
// })
app.listen(3000, (err)=>{
  if(!err){
    console.log("服务器启动成功...")
  }else {
    console.log(err)
  }
})