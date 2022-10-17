const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('./session');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

// .env 파일내 값이 자동으로 치환돼서 들어옴
dotenv.config();

// 브라우저에서 다른 도메인 서버로 요청했을때만 cors 에러 발생
// 서버에서 서버로는 안생김
// 1. proxy : 브라우저(3060) -> 프론트 서버(3060) -> 백엔드 서버 (3065) -> 프론트 -> 브라우저
// 2. Access-Control-Allow-Origin
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();

// 위에서 밑으로 코드가 실행되기 때문에 라우터보다 위에서 실행
// app. ~ 나오기전에 req.body를 사용하기 위해서는
// use안에 들어가는것이 미들웨어
app.use(cors({
    origin: 'http://localhost:3060',
    credentials: true,
}));
app.use(express.json());
// 폼을 처리할때
app.use(express.urlencoded({extended: true}));

// 브라우저는 누구나 접속할 수 있기 때문에 보안에 취약
// 로그인을 하면 브라우저(3060), 백엔드 서버(3065) 같은 정보를 들고 있지않음
// 누가 로그인을 했는지 브라우저나 프론트로 보내줘야함
// 비밀번호를 통째로 보내주면 해킹에 취약
// 이를 보내주지 않고 쿠키를 보내줌
// 서버쪽에는 그런 쿠키를 보내준다는걸 저장해둠 (세션)
app.use(cookieParser('nodebirdSecret')); //  secret 과 같은 값이 들어가야함
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

// app.get => 가져오다
// app.post => 생성하다
// app.put => 전체 수정
// app.delete => 제거
// app.patch => 부분 수정
// app.options => 찔러보기
// app.head => 헤더만 가져오기 (헤더 바디중에 헤더만 가져오는 것)

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('hello api');
})

app.get('/api/posts', (req, res) => {
    res.json([
        {id: 1, content: 'hello'},
        {id: 2, content: 'hello2'},
        {id: 3, content: 'hello3'},
    ]);
})

app.use('/post', postRouter);
app.use('/user', userRouter);
// app.post('/post', (req, res) => {
//     res.json({id: 1, content: 'hello'});
// })
//
// app.delete('/post', (req, res) => {
//     res.json({id: 1});
// })


app.listen(3065, () => {
    console.log('서버 실행 중')
})










/* -----------------------------------------
    node만을 이용한 서버 구축
 */

// http가 서버 역할을 해주는 것이지 node 자체가 서버는 아님
// 브라우저나 front에서 오는 요청은 전부 다 req
// 응답에 대한 정보는 res

// npm 설차를 하지 않아도 node가 http라는 모듈을 제공
// const http = require('http');

// 요청 한번당 응답 한번
// 응답을 안보내면 특정 시간(30초 정도) 후에 브라우저가 자동으로 응답 실패로 처리한다
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     if(req.method === 'GET'){
//         if (req.url === '/api/posts'){
//
//         }
//     }
//     res.write('<h1>end 전에는 다 write</h1>');
//     res.write('<h2>end는 마지막에</h2>');
//     res.write('<h3>html도 가능</h3>');
//     res.write('<h1>test</h1>');
//     res.end('<h5>Hello node</h5>')
// });
// server.listen(3065, () => {
//     console.log('서버 실행 중')
// });