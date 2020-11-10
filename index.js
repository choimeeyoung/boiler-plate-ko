const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const config = require('./config/key');

const { User } = require("./models/User");

// application/x-www-form-urlencode 된 데이터를 분석해서 가져올수 있도록 하기위함
app.use(bodyParser.urlencoded({ extended: true }));

// json 된 데이터를 분석해서 가져올수 있도록 하기위함
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
    .catch(error => {
        console.log(error)
    })

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    // 회원가입 필요한 정보를 Client 에서 가져오면 DB에 저장
    const user = new User(req.body);

    // 비밀번호의 암호화 작업 필요 (models/User.js 의 userSchema.pre('save'...) 에서 처리후 넘어옴
    user.save((error, doc) => {
        if (error) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));
