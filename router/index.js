const Router = require('koa-router')

let router = new Router();


router.get('/songList',async ctx=>{
    await ctx.render('songList',{
        title:'songList'
    })
})

router.get('/popularSong',async ctx=>{
    await ctx.render('popularSong',{
        title:'popularSong'
    })
})

router.get('/songList',async ctx=>{
    await ctx.render('popularSong',{
        title:'popularSong'
    })
})

router.get('/hotSong',async ctx=>{
    await ctx.render('hotSong',{
        title:'hotSong'
    })
})

router.get('/about',async ctx=>{
    await ctx.render('about',{
        title:'about'
    })
})

router.get('/todayMusic',async ctx=>{
    await ctx.render('todayMusic',{
        title:'todayMusic'
    })
})
// index.use('/', index.routes(), index.allowedMethods())

module.exports = router;