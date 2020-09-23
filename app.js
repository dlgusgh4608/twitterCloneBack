const express = require('express');
const db = require('./models');
const app = express();
const postRouter = require('./routes/post');
const port = 4000;

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    }).catch(console.error);

app.get('/', (req, res) => {
    res.send('hello express');
});

app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port} sever running`);
});
