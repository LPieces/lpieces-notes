const router = require('koa-router')();
const userService = require('../controllers/mysqlConfig');
const utils = require('../controllers/utils.js');
router.prefix('/notes')

// 根据类名获取笔记接口
router.get('/findNoteListByType', async (ctx, next) => {
    let note_type = ctx.request.query.note_type;
    await userService.findNoteListByType(note_type)
    .then(async (res) => {
        if(res.length){
            ctx.body = {
                code: "777",
                data: res,
                mess: "查找成功"
            }
        }
    })
})

// 根据ID查找笔记详情接口
router.post('/findNoteDetailById', async (ctx, next) => {
    let id = ctx.request.body.id;
    await userService.findNoteDetailById(id)
    .then(async (res) => {
        if(res.length){
            ctx.body = {
                code: "777",
                data: res[0],
                mess: "查找成功"
            }
        }
    })
})

// 发表笔记接口
router.post('/insertNote', async (ctx, next) => {
    let c_time = utils.getNowFormatDate();
    let m_time = utils.getNowFormatDate();
    let note_content = ctx.request.body.note_content;
    let head_img = ctx.request.body.head_img;
    let title = ctx.request.body.title;
    let note_type = ctx.request.body.note_type;
    let userId = ctx.request.body.userId;
    let nickname = ctx.request.body.nickname;
    await userService.insertNote([c_time,m_time,note_content,head_img,title,note_type,userId,nickname])
    .then(async (res)=>{
        if (res.affectedRows != 0) {
            ctx.body = {
                code:"777",
                data: "ok",
                mess:"发表成功"
            }   
        }else{
            ctx.body = {
                code:"704",
                data: "error",
                mess:"发表失败"
            }  
        }
    })
})

module.exports = router
