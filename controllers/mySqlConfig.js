var mysql = require('mysql');// 引入mysql包
var config = require('./defaultConfig');// 引入数据库配置文件
//创建线程池
/*
这里采用连接池的方式连接数据库。
连接池在并发执行数越大时， 对比单次连接方式， 优势越明显；
而且支持的最大并发执行数远大于单次连接。对于本项目而言，都无所谓。
*/
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

//统一连接数据库的方法
let allServices = {
    query: function (sql,values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {           
                    connection.query(sql,values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {      
                            resolve(rows)
                            console.log(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    }   
}

// 用户注册
let insertUser = function(value){
    let _sql = `insert into users set username=?,userpwd=?,nickname=?`;
    return allServices.query(_sql,value);
}
// 用户登录
let userLogin = function(username,userpwd){
    let _sql = `select * from users where username="${username}" and userpwd="${userpwd}"`;
    return allServices.query(_sql);
}
// 查找用户
let findUser = function(username){
    let _sql = `select * from users where username="${username}"`;
    return allServices.query(_sql);
}
//读取所有 users 表数据，测试数据链接
let getAllUsers = function(){
    let _sql = `select * from users;`
    return allServices.query(_sql);
}
// 根据类名查对应的笔记
let findNoteListByType = function(note_type){
    let _sql = `select * from note where note_type="${note_type}" order by id desc`;
    return allServices.query(_sql);
}
// 根据ID查询笔记详情
let findNoteDetailById = function (id) {
    let _sql = `select * from note where id=${id}`;
    return allServices.query(_sql);
}
// 发表笔记
let insertNote = function(options){
    let _sql = `insert into note set c_time=?,m_time=?,note_content=?,
                head_img=?,title=?,note_type=?,useId=?,nickname=?;`
    return allServices.query(_sql,options); 
}
//需要export出去，用过es6的应该都知道
module.exports = {
    insertUser,
    userLogin,
    findUser,
    getAllUsers,
    findNoteListByType,
    findNoteDetailById,
    insertNote
}