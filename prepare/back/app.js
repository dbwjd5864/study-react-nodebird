// npm 설차를 하지 않아도 node가 http라는 모듈을 제공
const http = require('http');

// http가 서버 역할을 해주는 것이지 node 자체가 서버는 아님
// 브라우저나 front에서 오는 요청은 전부 다 req
// 응답에 대한 정보는 res

// 요청 한번당 응답 한번
// 응답을 안보내면 특정 시간(30초 정도) 후에 브라우저가 자동으로 응답 실패로 처리한다
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    if(req.method === 'GET'){
        if (req.url === '/api/posts'){

        }
    }
    res.write('<h1>end 전에는 다 write</h1>');
    res.write('<h2>end는 마지막에</h2>');
    res.write('<h3>html도 가능</h3>');
    res.write('<h1>test</h1>');
    res.end('<h5>Hello node</h5>')
});
server.listen(3065, () => {
    console.log('서버 실행 중')
});