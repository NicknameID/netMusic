let listData = 
[{
        title: '似水年华|在晨曦融化了时间的色彩之前',
        href: '/playlist?id=995535061',
        img: 'http: //p1.music.126.net/Mj8zmITMZkdUNNZGLWINmg==/109951163063305748.jpg?param=140y140',
        listenNumber: '25万',
        author: '123有话好好说'
    },
    {
        title: '「华语」你不必冷淡，我从未想过纠缠',
        href: '/playlist?id=798285813',
        img: 'http: //p1.music.126.net/BpdTSFmVb9FbwYY1NJtZ6A==/109951163000849792.jpg?param=140y140',
        listenNumber: '44万',
        author: '123有话好好说'
    },
    {
        title: 'We are VINAI',
        href: '/playlist?id=1979196947',
        img: 'http: //p1.music.126.net/AUHpq4sMr32yG5sc6Q5ddA==/109951163064086143.jpg?param=140y140',
        listenNumber: '19万',
        author: '123有话好好说'
    },
    {
        title: '[ 废墟纪元]“ 再不听话就让你永远消失” ',
        href: '/playlist?id=867172068',
        img: 'http: //p1.music.126.net/mAaSLCjVxlMpSBNScFCfDg==/19006157998165160.jpg?param=140y140',
        listenNumber: '70252',
        author: '123有话好好说'
    }, {
        title: '少年与他们所养的名唤温柔的猫',
        href: '/playlist?id=989824732',
        img: 'http: //p1.music.126.net/8W9-jGytNU_XnlePW5O_Gg==/109951163062852945.jpg?param=140y140',
        listenNumber: '10万',
        author: '123有话好好说'
    }, {
        title: '你都孤独成这样了 还是要听纯音乐？',
        href: '/playlist?id=766008394',
        img: 'http: //p1.music.126.net/Vpen-WfGmU6EeZLBxX8gsg==/109951163004513073.jpg?param=140y140',
        listenNumber: '20万',
        author: '123有话好好说'
    }, {
        title: 'ї ʜ ᴀ ᴛ e̼̫ ᴜ ︙ ɪ ʟ σ ᴠ ё u',
        href: '/playlist?id=1979601074',
        img: 'http: //p1.music.126.net/_i0dVXBuYtPrBrQulRiGiQ==/109951163064444411.jpg?param=140y140',
        listenNumber: '49911',
        author: '123有话好好说'
    }, {
        title: '日语｜无可救药的孤独症患者',
        href: '/playlist?id=984196486',
        img: 'http: //p1.music.126.net/Qdm6RJpqskxwULyTUH2i0A==/109951163055988695.jpg?param=140y140',
        listenNumber: '158万',
        author: '123有话好好说'
    }, {
        title: '你是阳光和雨交界最美的颜色',
        href: '/playlist?id=987527362',
        img: 'http: //p1.music.126.net/55kE86yM2OMIjhiwIDQS_w==/19208468137678294.jpg?param=140y140',
        listenNumber: '181万',
        author: '123有话好好说'
    }, {
        title: '怀旧辑 | 昨日红花今又开，似是故人来',
        href: '/playlist?id=988454757',
        img: 'http: //p1.music.126.net/gpakOFOGv_WPmy6F0-9i6w==/109951163057981277.jpg?param=140y140',
        listenNumber: '208万',
        author: '123有话好好说'
    }, {
        title: '唯美和风｜但盼风雨来，留你在心中',
        href: '/playlist?id=975318620',
        img: 'http: //p1.music.126.net/VpHvq7_0Bex2noYrH72xbA==/109951163051865782.jpg?param=140y140',
        listenNumber: '47万',
        author: '123有话好好说'
    }
]

const mysql = require('mysql');
const dbq = require('./libs/db');
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'netMusic'
});

function f(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(111);
        }, 2000);
    })
}


async function save(){
    for(let i=0,len=listData.length;i<len;i++){
        console.log(await f());
    }
};

save()




