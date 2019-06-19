

module.exports = {
    getTemplate(options){
        let tmpl = `
            <xml><ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
            <FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[${options.MsgType}]]></MsgType>
        `
       if(options.MsgType === 'text'){

         tmpl += `<Content><![CDATA[${options.Content}]]></Content>`

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