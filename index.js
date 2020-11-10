const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');

const { User } = require("./models/User");

// application/x-www-form-urlencode 된 데이터를 분석해서 가져올수 있도록 하기위함
app.use(bodyParser.urlencoded({ extended: true }));

// json 된 데이터를 분석해서 가져올수 있도록 하기위함
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
    .catch(error => {
        console.log(error)
    })

app.get('/', (req, res) => res.send('Hello World!'))

// 회원가입
app.post('/api/user/register', (req, res) => {
    // 회원가입 필요한 정보를 Client 에서 가져오면 DB에 저장
    const user = new User(req.body);

    // 비밀번호의 암호화 작업 필요 (models/User.js 의 userSchema.pre('save'...) 에서 처리후 넘어옴
    user.save((error, doc) => {
        if (error) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

// 로그인
app.post('/api/user/login', (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {
        // db에서 요청된 이메일을 찾기
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 이메일이 있는 경우 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (error, isMatch) => {

            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })
            }
        })

        //  토큰의 생성
        user.generateToken((error, user) => {
            if (error) return res.status(404).send(error);

            // 토큰을 저장한다. / 쿠키 또는 로커스토리지 에 저장 / 크롬 개발자 도구의 Application 에서 확인 가능
            res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
        })
    })
})

// 로그아웃
app.get('/api/user/logout',auth, (req,res) => {
    User.findOneAndUpdate({_id:req.user._id},{token:""},(error,user) => {
        if(error) return res.json({success:false, error});
        return res.status(200).send({success:true})
    })
})

// auth 기능
app.get('/api/user/auth', auth, (req, res) => {
    console.log("ok?")
   // 여기까지 왔다면 미들웨어를 (auth) 를 통화 했음을 의미
    return res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));


