// 用到的包
const http = require('http');
const cheerio = require('cheerio');
const mysql = require('mysql');
const reg = require('./libs/RegExp.js');
const dbq = require('./libs/db');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'netMusic'
});
// 一些常量，可以定义到config文件中
const api = {
    playlist:'/discover/playlist/',
}
const req_options = {
    host: 'music.163.com',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'http://music.163.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        'Cookie':'_ntes_nnid=c272db0077ca496da323a6671487ffe0,1508054296655; _ntes_nuid=c272db0077ca496da323a6671487ffe0; __utma=94650624.647173836.1510988321.1510999824.1511007188.3; __utmb=94650624.6.10.1511007188; __utmc=94650624; __utmz=94650624.1510988321.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; JSESSIONID-WYYY=%2BJr8%5CK%2BoDf08yvgHirxngUOZrde%5CuIW85f2tM3gsplT%2B%2FOZm53hV6CQ4Vt0FAfNbsXzBOQwCG%2Btzl7S7KhByGWr5%2FsCdxrdArelarjQJp0ktU1HsGZZgc6GcgKjlDRg1lQ8oH5w%2FsoMa9ovNyKmIzVOCBUFzV5WXrN9bNd0N%2FXr4pBjZ%3A1511009268178; _iuqxldmzr_=32'
    }
}

// 主流程走向_______________________________________
get_save_SongList(); //开始抓取歌单列表数据,并且将爬取过来的数据写入数据区表


// 抓取歌单列表数据
function get_save_SongList() {
    let page_number = 0;
    let time_cost = 0;
    let totalData = 0;
    let timer_cost = setInterval(() => {
        time_cost++;
    }, 1000);
    Control();
    function Control() {
        onePageGetData(page_number).then(async (pageDataNum) => {
            console.log(`已经抓取第 ${page_number+1} 页数据...`);
            page_number++;
            totalData += pageDataNum; //记录总共多少条数据
            // 为了不被网易云官方注意到我的爬虫，在这里做个随机延迟间隔
            let random_delay_time = Math.floor(Math.random()*3000+1500); //延迟时间在1.5s~4.5s之间
            let timer_delay = setTimeout(() => {
                clearTimeout(timer_delay);
                Control();
            }, random_delay_time);
        }).catch((boolean) => {
            clearInterval(timer_cost);
            console.log("------->> 没有更多的歌单需要爬取了！");
            console.log(`结束：共${totalData}条；耗时：${time_cost}秒`);
            process.exit();
        });
    }
}

// 定义一些函数_______________________________________
// 合成请求的设置
function OptionFactory(url){
    let ops = req_options;
    ops.path = url
    return ops;
};

// 获取页面的HTML文本
function getData(url, queryString='') {
    return new Promise((resolve,reject)=>{
        http.get(OptionFactory(url+queryString), (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
               resolve(data);
            })
        });
    });
}

// 获取一页的要抓取的数据
function onePageGetData(page){
    let step = 35;//每一页歌单列表显示的歌单数
    return new Promise(async (resolve,reject)=>{
        let qs = `?order=hot&cat=%E5%85%A8%E9%83%A8&limit=${step}&offset=` + (page * step);
        let pageDataNum = 0;
        let gotData = await getData(api.playlist, qs); //获取数据的函数
        let $ = cheerio.load(gotData);
        let MAX_pages = parseInt($('#m-pl-pager').find('a').last().prev().text());
        if (page < MAX_pages) {
            pageDataNum = $('#m-pl-container li').length;
            $('#m-pl-container li').each(async function (item, val) {
                let list = {};
                let a = $(val).children().eq(1).find('a.tit');
                let img = $(val).children().eq(0).find("img");
                let listenNumber = $(val).children().eq(0).find("span.nb");
                let author = $(val).children().eq(2).find('a');

                list.title = reg(a.attr('title')); //歌单的标题
                list.href = reg("http://music.163.com"+a.attr("href")); //歌单的链接
                list.img = reg(img.attr("src")); //歌单的海报
                list.listenNumber = reg(listenNumber.text()); //歌单的收听数
                list.author = reg(author.text()); //歌单的作者
                await dbq({
                    db:db,
                    sql: `INSERT INTO songList_table (id,title,href,img,listenNumber,author) VALUES(0,"${list.title}","${list.href}","${list.img}","${list.listenNumber}","${list.author}");`
                });
            });
            resolve(pageDataNum);
        } else {
            reject(false);
        }
    });
}



