const Router = require('koa-router')

let router = new Router();


router.get('/',async ctx=>{
    await ctx.render('home',{
        title:'home'
    })
})

// index.use('/', index.routes(), index.allowedMethods())

module.exports = router;