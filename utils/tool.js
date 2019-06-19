const fs = require('fs');
let path = require('path')
// 引入解析xml的插件
const { parseString } = require('xml2js')
module.exports={
    readFileAsync(filename){
         return new Promise((resolve,reject)=>{
            fs.readFile(__dirname+'/'+filename,'utf-8',(err,file)=>{
                err ? reject(err) : resolve(file);
            })
         })
    },
    writeFileAsync(filename,data){
        return new Promise((resolve,reject)=>{
            fs.writeFile(__dirname+'/'+filename,data,(err,file)=>{
                err ? reject(err) : resolve(file);
            })
         })
    },
    getUserData(req){
        return new Promise((resolve,reject)=>{
            let xmlData = '';
            req.on('data',data => {
                // console.log(data) //二进制buffer数据
                xmlData += data.toString();
            })
            .on('end',() => {
                resolve(xmlData)
            })
        })
    },
    parseXml2Js(xmlData){
       
        return new Promise((resolve, reject) => {
            parseString(xmlData,{trim:true},(err,data) => {
               if(!err){
                   resolve(data)
               }else{
                   reject('parseXml2Js'+err)
               }
            })
        });
    },
    getXmlData(xml){
        let message = {};
        /**
         * { ToUserName: [ 'gh_a1e246930dfa' ],
                FromUserName: [ 'o9c581GwljNihXl-4NpuKGFuQAMs' ],
                CreateTime: [ '1560842071' ],
                MsgType: [ 'text' ],  //消息类型
                Content: [ '55' ],//消息内容
                MsgId: [ '22345883181724013' ] }
         */

         /**
          * { ToUserName: [ 'gh_a1e246930dfa' ],
            FromUserName: [ 'o9c581GwljNihXl-4NpuKGFuQAMs' ],
            CreateTime: [ '1560846908' ],
            MsgType: [ 'event' ],   //事件
            Event: [ 'unsubscribe' ],//事件类型
            EventKey: [ '' ] }
          */
        if(!xml) return;
        if(xml.Content) message.Content = xml.Content[0];
        if(xml.MsgId) message.MsgId = xml.MsgId[0];
        if(xml.Event) message.Event = xml.Event[0];
        message.ToUserName = xml.ToUserName[0];
        message.FromUserName = xml.FromUserName[0];
        
        message.MsgType = xml.MsgType[0];
        return message
    }
}