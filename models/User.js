const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // 10자리로 암호화 함
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        tpye: Number,
        default: 0
    },
    image:{tpye: String},
    token: {
        type: String
    },
    tokenExp: {
        tpye: Number
    }
})

// user Model 에 데이터를 저장하기 전에 수행 / 끝나면 index.js 의 POST '/register' 의 user.save ... save 로 보내짐
userSchema.pre('save', function (next) {
    const user = this;
    // 비밀번호르 암호화 한다.

    // 비밀번호를 변경할때만 암호화 해주어야함
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (error, salt) { // bcrypy에서 salt를 가져와서 자리수를 지정
            if (error) return next(error)                   // error 가 있는 경우 next를 이용하여 error 를 전송

            // user.password : 사용자가 입력한 암호화 되지 않은 비밀번호 / User에 있음
            // salt : 앞서 생성한 salt
            // hash : 암호화된 비밀번호
            // user.password = hash => 기존의 비밀번호에서 암호화된 비밀번호로 변경후 next 로 전송
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return next(error);
                user.password = hash;
                next(); // index.js 의 POST '/register' 의 user.save ... save 로 보내준다.
            })
        })
    } else {
        next();
    }
})

// 이메일이 있는 경우 비밀번호가 맞는지 확인
userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword => 암호화 해서 DB에 암호화된 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(error, isMatch) {
        if (error) return cb(error);
        cb(null, isMatch);
    })
}

// userToken의 생성
userSchema.methods.generateToken = function (callback) {
    const user = this;
    // jsonwebtoken을 이용하여 token 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    // user._id + secretToken = token 생성
    // secretToken 을 넣으면 => user._id 이 나온다.

    user.token = token;
    user.save(function (error, user) {
        if (error) return callback(err);
        callback(null, user);
    })

}

// userToken의 Decode
userSchema.statics.findByToken = function(token,callback){
    const user = this;
   // token => user._id + secretToken => decode 한 결과는 userId 값이 나온다.
    jwt.verify(token,'secretToken', function(error,decode){                 // decode = user._id값 
        // 유저 아이디를 이용해서 유저를 찾은후 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decode , "token": token},function(error,user){
            if(error) return callback(error);
                callback(null,user);
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }


