// const musicUrl = 'https://fdaced7c.ngrok.io/hotSong'//热门


// 引入图文链接
const picUrl = require('./picUrl');


module.exports = {
    getTemplate(options){
        let tmpl = `
            <xml><ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
            <FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[${options.MsgType}]]></MsgType>
        `
       if(options.MsgType === 'text'){
            if(options.EventKey === "todayMusic"){

                tmpl += `<Content><![CDATA[${options.Content}]]></Content>`
                
            }else{
                tmpl += `<Content><![CDATA[${options.Content}]]></Content>`
            }

       }else if(options.MsgType === 'news'){
              //     <xml>
                //     <ToUserName><![CDATA[toUser]]></ToUserName>
                //     <FromUserName><![CDATA[fromUser]]></FromUserName>
                //     <CreateTime>12345678</CreateTime>
                //     <MsgType><![CDATA[music]]></MsgType>
                //     <Music>
                //       <Title><![CDATA[TITLE]]></Title>
                //       <Description><![CDATA[DESCRIPTION]]></Description>
                //       <MusicUrl><![CDATA[MUSIC_Url]]></MusicUrl>
                //       <HQMusicUrl><![CDATA[HQ_MUSIC_Url]]></HQMusicUrl>
                //       <ThumbMediaId><![CDATA[media_id]]></ThumbMediaId>
                //     </Music>
                //   </xml>
                tmpl += `<ArticleCount>1</ArticleCount>
                        <Articles>
                            <item>
                                <Title><![CDATA[热门音乐]]></Title>
                                <Description><![CDATA[热门相关推荐]]></Description>
                                <PicUrl><![CDATA[https://035166c9.ngrok.io/about]]></PicUrl>
                                <Url><![CDATA[${picUrl.hotPicUrl}]]></Url>
                            </item>
                        </Articles>`

       }else if(options.MsgType === 'voice'){

        tmpl += `<MediaId><![CDATA[${options.media_id}]]></MediaId><Format><![CDATA[Format]]></Format>`

       }else if(options.MsgType === 'image'){

        tmpl += `<PicUrl><![CDATA[${options.picUrl}]]></PicUrl><MediaId><![CDATA[${options.media_id}]]></MediaId>`
        
       }else if(options.Event === 'subscribe'){
        //    关注事件
          
       }else if(options.Event === 'unsubscribe'){
        //    取消关注事件
        console.log('无情取关~')
       }

        return tmpl + `</xml>`;
    }
}