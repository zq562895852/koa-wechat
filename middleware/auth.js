// 微信认证模块
// 引入config模块
const config = require('../confing');
// 引入sha1加密模块
const sha1 = require('sha1');

// 引入数据处理模块
const {getUserData, parseXml2Js,  getXmlData } = require('../utils/tool')
// 引入路由模块
const menuRouter = require('../router/menuRouter');

module.exports = ()=>{
   return async (ctx,next )=>{
    //    console.log();
    /*
        { signature: 'b119cef58ff67220ecb5fa0b769ddb8cc627cebe',//微信的加密签名
        echostr: '7737330723417220981',//微信随机字符串
        timestamp: '1560135252',//时间戳
        nonce: '692625820' }//随机数字
    */
    /*
    目的  计算得出signature微信加密签名，和微信传递过来的signature进行对比，如果一样是来自微信服务器，如果不一样说明不是微信服务器发送过过来的
    1.将参数微信加密签名的三个参数（timestamp,nonce,token)按照字典进行排序 ,连接成字符串   在进行sha1加密  加密完成和微信返回的signature对比
    */ 
   
    // console.log(shaStr);
    // 切记不可以在这个中间件后面返回页面，否则会报配置不成功
    let {url,request ,response} = ctx;
    // console.log(request.query);
    let {signature,echostr,timestamp,nonce} = request.query;

    // sort默认按照字典排序
    let str = [timestamp,nonce,config.token].sort().join('')
    
    let shaStr = sha1(str);
    if(request.method === 'GET'){
        if(signature === shaStr){
           ctx.body = echostr + "";
        }else{
           ctx.body = 'error'
        }
    }else if(request.method === 'POST'){//微信用户发送的信息将以post方式发送过来
        if(shaStr !== signature){
            ctx.body = 'error';
        }
        //  { signature: 'df197a0225a8e2392f68ab05befa25cbaa89923a',
        //   timestamp: '1560839604',
        //   nonce: '607689938',
        //   openid: 'o9c581GwljNihXl-4NpuKGFuQAMs' }用户的微信id
        /**
         * 
           <xml><ToUserName><![CDATA[gh_a1e246930dfa]]></ToUserName>
            <FromUserName><![CDATA[o9c581GwljNihXl-4NpuKGFuQAMs]]></FromUserName>
            <CreateTime>1560841540</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[33]]></Content>
            <MsgId>22345878756446395</MsgId>
            </xml>
         */
        // 将xml数据解析为js对象
        /**
         * { xml:
            { ToUserName: [ 'gh_a1e246930dfa' ],
                FromUserName: [ 'o9c581GwljNihXl-4NpuKGFuQAMs' ],
                CreateTime: [ '1560842071' ],
                MsgType: [ 'text' ],  //消息类型
                Content: [ '55' ],//消息内容
                MsgId: [ '22345883181724013' ] } }
         */
    
        let xmlData = await getUserData(ctx.req);//ctx.req是node的原始对象，request是koa的对象，有些方法不能互用
         console.log('xmlData',xmlData)
        const { xml } = await parseXml2Js(xmlData);

        // 处理路由模块  暂时不知道为什异步函数在函数中调用不能发送数据
        menuRouter.handleWchatRouter(ctx,xml)

        
    }else{

        ctx.body = 'error';
    }
    // 路由处理
    // menuRouter.handleWchatRouter(ctx)
   


    // ctx.body = echostr + "";
    // await next()
   }
}