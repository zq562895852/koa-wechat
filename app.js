// 微信公众号

const Koa = require('koa');

const app = new Koa();

// 模板配置
const views = require('koa-views');


// 引入路由模块
// const router = require('./router')
// 引入微信认证中间件
const auth = require('./middleware/auth');

//配置模板引擎   ，模板文件的后缀名为html
app.use(views('views', { map: {html: 'ejs' }}));

// 注册微信认证中间件  这个要在路由配置前注册
app.use(auth())


// app.use(router.routes()).use(router.allowedMethods());




app.listen(80,()=>{
    console.log('http://127.0.0.1:80')
})

