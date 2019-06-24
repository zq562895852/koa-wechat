//  引入模板
const { getTemplate } = require('../tmpl/template');

let weChat = require('../middleware/accessToken')

const rp = require('request-promise-native');
module.exports = {
    replyTxt(ctx){//回复文字消息
       
    },
    replyImage(ctx){//回复图文消息
      
    },
    replySubscribe( ctx, message){//回复订阅事件消息
        message.Content = "欢迎您的关注~";
        message.MsgType = 'text';
        const result = getTemplate(message);
        console.log('result',result);
        ctx.body = result;
        const content   = 'Hello Word';
        const data = { "touser" : message.ToUserName,
                "msgtype" : "text",
                "text" : {
                    "content" : content
                }
            };
        const w = new weChat();
        
        w.fetchAccessToken().then(async res=>{
            const url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+accessToken;
            rp({
                method:'GET',
                url,
                json:true,
                body:data
            }).then(res=>{
                console.log(res);
            })
        })
        
        
    },
    replyTodayMusic(ctx,options){//今日推荐内容
        options.Content = '今日推荐'
        // options.Content = `回复以下关键词查看相关推荐\n
        //                     新碟 - 最新music\n
        //                     华语 - 华语music\n
        //                     摇滚 - 摇滚music\n
        //                     民谣 - 民谣music\n
        //                   `;
        options.MsgType = 'text';
        const result = getTemplate(options);
        console.log('result',result);
        ctx.body = result;
    }
}