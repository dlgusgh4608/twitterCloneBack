const express = require('express');
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();

db.sequelize.sync()
.then(() => {
    console.log('db 연결 성공');
})
.catch(console.error);
passportConfig();

app.use(cors({
    origin: '*',
    credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('leehyunhoTest'));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'leehyunhoTest',
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/post', postRouter);
app.use('/user', userRouter);

const port = 4000;

app.listen(port, () => {
    console.log(`http://localhost:${port} sever running`);
});
