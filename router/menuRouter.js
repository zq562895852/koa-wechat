
// 引入数据处理模块
const { getXmlData } = require('../utils/tool')

// 引入逻辑处理模块
const reply = require('../controller/reply');

module.exports = {
    // 负责处理微信菜单
    handleWchatRouter(ctx,xml){
       let message = getXmlData(xml);

       console.log(message);
       //  定义模板数据对象
       const options = {
           ToUserName:message.FromUserName,
           FromUserName:message.ToUserName,
           Content:'',
           MsgType:message.MsgType,
       }
    
       if(message.MsgType === 'event'){// 事件
           options.Event = message.Event;
           if(message.Event === 'subscribe'){
               reply.replySubscribe(ctx,options)
           }else if(message.Event === 'unsubscribe'){
               console.log('无情取关~')
           }else if(message.Event === "CLICK" && message.EventKey === "todayMusic"){//今日推荐
               options.EventKey = message.EventKey;
               reply.replyTodayMusic(ctx,options)


           }
           
           
       }else if(message.Content === '热门'){//回复音乐信息
         
          reply.replyTextMusic(ctx,options)




       }else if(message.Content == '1'){
           //    测试用
           let r = "<xml><ToUserName><![CDATA[o9c581GwljNihXl-4NpuKGFuQAMs]]></ToUserName><FromUserName><![CDATA[gh_a1e246930dfa]]></FromUserName><CreateTime>1561000454755</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[你好~]]></Content></xml>"
           ctx.body = r;

       }else{
           //    测试用
           let r = `<xml><ToUserName><![CDATA[${options.ToUserName}]]></ToUserName><FromUserName><![CDATA[${options.FromUserName}]]></FromUserName><CreateTime>1561000454755</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[你在说什么，我听不懂~]]></Content></xml>`
           ctx.body = r;
       }
    }
}