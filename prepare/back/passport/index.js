// passport 설정 파일

const passport = require('passport');
const local = require('local');
const {User} = require('../models')

module.exports = () => {
    passport.serializeUser((user, done) => {
        // 유저 정보 중에서 쿠키랑 묶어줄 유저 아이디만 저장
        // 첫번째 인자가 서버에러 두번째 인자가 성공
        done(null, user.id)
    });

    // 최초 로그인이 된 후 부터는 id를 이용하여 유저 정보를 복구해냄
   passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({ where: {id}})
            done(null, user) // req.user
        }catch(error){
            console.error(error)
            done(error)
        }
    });

    local();
}