// local 로그인 전략
const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../models');
import bcrypt from 'bcrypt';

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password' // req.body.password
    }, async (email, password, done) => {
        try{
            // findOne은 await이 필요
            const user = await User.findOne({
                where: {email}
            });

            if(!user){
                // passport에서는 응답을 보내주지는 않고 done으로 결과를 확인
                // 서버에러, 성공, 클라이언트 에러 (보내는측에서 잘못 보내서 나는 에러)
                return done(null, false, {reason: '존재하지 않는 이메일입니다!'})
            }
            //compare 도 비동기 함수
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);
            }else{
                return done(null, false, {reason: '비밀번호가 틀렸습니다.'});
            }
        }catch(error){
            // 서버 에러
            console.error(error);
            return done(error);
        }
    }));
};