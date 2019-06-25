const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

getMusic =  ()=>{
   return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();

        await page.emulate(iPhone);//如果是手机一定要设置这个，否则默认打开的是网页屏幕

        await page.goto('https://music.163.com/m/',{waitUntil:'networkidle2'});

        await page.waitFor('.remd_ul');

        const result = await page.evaluate(() => {
            let data = []; // 初始化空数组来存储数据
            let elements = document.querySelectorAll('.remd_ul > a'); // 获取所有元素
            
            for (let element of elements){
                let ele = element.querySelector('img');
                let id = element.href.split('=')[1]
                let title = element.querySelector('p').innerText ;// 获取标题
                let url = ele.src;//获取网址
                data.push({title,url,id}); // 存入数组
            }
            return data;
        });
        console.log(result);//打印出信息
        await page.waitFor(3000);//超时时间
        await browser.close();
   });
}

getMusic();


