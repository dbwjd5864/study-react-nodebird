const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /user
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId', async (req, res, next) => { // GET /user
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.userId },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })

        if(fullUserWithoutPassword){
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length // 개인정보 침해 예방
            data.Followers = data.Followers.length
            data.Followings = data.Followings.length
            res.status(200).json(data);
        }
        else {
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//POST /user/login
// 미들웨어를 확장하는 방법
router.post('login', (req, res, next) => {
    passport.authenticate('local', (err, user, info)=> {
        // 서버 쪽 에러
        if(err){
            console.error(err);
            return next(err);
        }
        // client 에러
        if(info){
            return res.status(401).send(info.reason);
        }

        //성공
        return req.login(user, async (loginErr) => {
            if(loginErr){
                // passport 내에서 로그인 에러가 날때
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id},
                attributes : {exclude: ['password']},
                // attributes: ['id','nickname','email'],
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: "Followings",
                },{
                    model: User,
                    as: "Followers",
                }]
            })
            return res.status(200).json(user);
        })
    })(req, res, next);
});

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
        // res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(201).send('ok');
    }catch (error){
        console.log(error);
        next(error); // status 500
    }

})

router.post('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

module.exports = router;