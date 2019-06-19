// 微信接口凭证，accessToken

// 引入发送请求的模块 request-promise-native 依赖request,但是只需要引入request-promise-native即可
const rp = require('request-promise-native');

const { appID,appsecret } = require('../confing');
/**
 * 特点
 * 1.唯一性
 * 2.有效性性  2小时   提前五分钟需要重新获取
 * 3.接口每天2000次
 * 
 * 思路：
 * 1.首次本地没有，发送请求获取accessToken (保存成唯一的文件)
 * 2.第二次以后：先读取本地文件，获取，判断是否过期
 *       过期
 *        -重新获取，保存覆盖之前的文件
 *       没有过期
 *        -直接使用
 * 整理
 * 读取文件
 *   -本地有文件
 *      判断有没有过期，过期重新请求，没有直接使用
 *   -本地没有文件
 *     直接请求获取保存下来，直接使用
 *   
 */

// 引入读写文件的模块
 const WRTool = require('../utils/tool.js');

//  WRTool.readFileAsync('token.txt')
//        .then(data=>{
//           console.log(data);
//        }).catch(err=>{
//            console.log(err);
//        })
 class WeChat{
     constructor(){}
     /**
      * 获取accessToken
      */
     getAccessToken(){
         const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
         return new Promise((resolve, reject) => {
            rp({
                method:'GET',
                url,
                json:true
            }).then(res=>{
                console.log(res)
               /*  { access_token: '22_xjOnuw-5w3hjbmF0i_LvfMV5yPwBDmp25UlZqMn6Du7tzttXWV1v0n5b1TGSFddb9I3a3VN_NF4nBhns0lbkO1_rltDMBcGk30-8505BHiukQFkCpljQonabxMBkPlHB1JWZgTmWDWcASq04IPRiABASZB',
                 expires_in: 7200 }*/
               //  重写res中AccessToken的过期时间expires_in
               res.expires_in = Date.now() + (res.expires_in - 300)*1000;
               resolve(res)
            }).catch(err=>{
                console.log(err)
                reject('getAccessToken' + err)
            })
         });
     }
     /**
      * 保存accessToken
      */
    saveAccessToken(accessToken){
        // 保存数据AccessToken
        return new Promise((resolve, reject) => {
            WRTool.writeFileAsync('accessToken.txt',JSON.stringify(accessToken)).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log('write'+err)
                reject(err)
            })
        });
    }
    /**
     * 
     * @param {读取文件信息获取accessToken} accessToken 
     */
    readAccessToken(accessToken){
        // 获取本地AccessToken
        return new Promise((resolve, reject) => {
            WRTool.readFileAsync(accessToken).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        });
    }
    /**
     * 
     * @param {判断accessToken是否有效} data 
     */
    isValidAccessToken(data){
        // 检测数据是否有效
        if(!data && !data.access_token && !data.expires_in){
            return false;
        }

        // 检测是否过期
        return Date.now() < data.expires_in;
    }

    fetchAccessToken(){
        // 缓存数据
        if(this.access_token&&this.expires_in&&this.isValidAccessToken(this)){
            // 之前保存过这个数据并且有效
            // return Promise.resolve(this)
            return Promise.resolve({
                access_token:this.access_token,
                expires_in:this.expires_in
            })
        }
        // 读取本地保存文件
        this.readAccessToken('accessToken.txt').then(async res=>{
            console.log(res)
            // 本地保存过文件，然后读取文件
            
            // 判断是否过期
            if(this.isValidAccessToken(res)){
                // 有效 可以直接使用
                return Promise.resolve(res);
            }else{
                // 无效  重新获取
                const result = await this.getAccessToken();
                this.saveAccessToken(res)
                return Promise.resolve(result);
            }
        }).catch(async err=>{
            // 本地没有保存过文件，然后获取accessToken,获取后保存到本地
            console.log(err)
            // this.getAccessToken().then(async res=>{
            //     // res可以直接使用
            //     this.saveAccessToken(res)
            // })
            const result = await this.getAccessToken();
            // result
            this.saveAccessToken(result);
            return Promise.resolve(result);
        }).then(res=>{
            this.access_token = res.access_token;
            this.expires_in = res.expires_in;
            return Promise.resolve(res);
        })
    }


 }




//  测试

const w = new WeChat();
w.fetchAccessToken()