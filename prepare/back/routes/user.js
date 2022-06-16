const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

// POST /user/
router.post('/', async (req, res, next) => {
    try{
        // 비동기인지 동기인지는 공식문서로 찾아보고 판단
        const exUser = await User.findOne({
            where:{
                email: req.body.email,
            }
        });

        if(exUser){
            // 만약 return을 안붙이고 응답을 두번 보내게 된다면 can't set headers already sent 라는 에러메시지가 뜬다.
            // 응답은 한번만 해야함
            // 요청/응답은 헤더(상태, 용량, 시간, 쿠키)와 바디(데이터)로 구성되어있다.
            // 200 성공
            // 300 리다이렉트
            // 400 쿨라이언트 에러러
            // 500 서버 에러

            // 이미 사용중인 아이디는 브라우저에서 데이터를 잘못보낸거니까 400번대
           return res.status(403).send('이미 사용중인 아이디 입니다.')
        }
        // 숫자가 높을수록 보안은 높아지나 시간이 오래걸림
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        // 잘 생성됐다 : 201
        res.status(201).send('ok');
    }catch (error){
        console.log(error);
        next(error); // status 500
    }

})

module.exports = router;