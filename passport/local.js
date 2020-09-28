const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                return done(null, false, { reason: '이메일이 잘못되었거나 비밀번호가 틀렸습니다.!' }) //아이디 없음
            }
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, { reason: '이메일이 잘못되었거나 비밀번호가 틀렸습니다.' }) //비밀번호 틀림
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
}