const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig');

router.prefix('/users')

// 注册接口
router.post('/userRegister', async (ctx, next) => {    
    var _username = ctx.request.body.username,
        _userpwd = ctx.request.body.userpwd,
        _nickname = ctx.request.body.nickname;
    if(!_username || !_userpwd || !_nickname){
        ctx.body = {
            code: "701",
            mess: "用户名、密码、昵称不能为空"
        }
        return;
    }
    let user = {
        username: _username,
        userpwd: _userpwd,
        nickname: _nickname
    }
    await userService.findUser(user.username).then(async (res) => {
        if(res.length){
            try{
                throw Error("用户名已存在");
            }catch(err){
                console.log(err);
            }
        }else{
            await userService.insertUser([user.username,user.userpwd,user.nickname])
            .then((res) => {
                console.log(res);
                if(res.affectedRows != 0){
                    ctx.body = {
                        code: "777",
                        data: "ok",
                        mess: "注册成功"
                    }
                }else{
                    ctx.body = {
                        code: "704",
                        data: "error",
                        mess: "注册失败"
                    }
                }
            })
        }
    })
})

// 登录接口
router.post('/userLogin', async (ctx, next) => {
    var _username = ctx.request.body.username,
        _userpwd = ctx.request.body.userpwd;
    await userService.userLogin(_username,_userpwd).then((res) => {
        console.log(res);
        if(res.length){
            let result = {
                id: res[0].id,
                nickname: res[0].nickname,
                username: res[0].username
            }
            ctx.body = {
                code: "777",
                data: result,
                mess: "登录成功"
            }
        }else{
            ctx.body = {
                code: "704",
                data: "error",
                mess: "登录失败"
            }
        }
    })
})

module.exports = router
