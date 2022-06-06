const express = require('express');

const app = express();

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

app.post('/api/post', (req, res) => {
    res.json({id: 1, content: 'hello'});
})

app.delete('/api/post', (req, res) => {
    res.json({id: 1});
})


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