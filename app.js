const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const db = require('./models');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();

app.use(cors({
    origin:'*',
    credentials:false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('hello express');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port} sever running`);
});
