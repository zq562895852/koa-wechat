
// 引入配置模块
const { url } = require('../confing');

module.exports = {
    "button":[
            {	
                "type":"view",
                "name":"今日歌曲",
                "url":url+"/todayMusic"
            },
            {
                "name":"今日推荐",
                "sub_button":[
                {	
                    "type":"view",
                    "name":"榜单",
                    "url":url+"/songList"
                },
                {
                    "type":"view",
                    "name":"流行",
                    "url":url+"/popularSong",
                },
                {
                    "type":"view",
                    "name":"热门",
                    "url":url+"/hotSong",
                }]
            },
            {
                "type":"view",
                "name":"关于我们",
                "url":url+'/about',
                // "key":"about"//如果菜单是view  key不能有
            }
        ]
}