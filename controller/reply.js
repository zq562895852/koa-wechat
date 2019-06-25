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
        const content   = '您可以点击菜单查看相关内容\n\n您也可以回复以下关键词查看\n\n 热门、流行、榜单、摇滚';
        const data = { "touser" : message.ToUserName,
                "msgtype" : "text",
                "text" : {
                    "content" : content
                }
            };
        const w = new weChat();
        
        w.fetchAccessToken().then(async res=>{
            console.log('fetchAccessToken',res);
            const url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+res.access_token;
            rp({
                method:'POST',
                url,
                json:true,
                body:data
            }).then(data => {
                console.log(data);

            //    https://fdaced7c.ngrok.io/todayMusic
            //    https://fdaced7c.ngrok.io/todayMusic


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
    },
    replyTextMusic(ctx,options){
        
        options.MsgType = 'news';

        const result = getTemplate(options);
        console.log('result',result);
        ctx.body = result;
    }
}