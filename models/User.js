const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // 10자리로 암호화 함



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
    image: String,
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
    }
})


const User = mongoose.model('User', userSchema)
module.exports = { User }
