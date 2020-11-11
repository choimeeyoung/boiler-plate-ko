const {User} = require('../models/User')
// 인증을 처리하는 곳
let auth = (req, res, next) => {
   // client 에서 cookie에서 token 을 가져온다.
   let token = req.cookies.x_auth;
   
   // 가져온 토큰을 복호화한후 유저를 찾는다.
    User.findByToken(token,(error,user) => {
        if(error) throw error;
        if(!user) return res.json({isAuth: false , error : true})
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }