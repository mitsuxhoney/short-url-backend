const express = require('express');

const app = express();

const connect = require('./config/connection');

const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const urlRouter = require('./routes/urlRouter');
const adminRouter = require('./routes/adminRouter');

const cookieParser = require('cookie-parser');

const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 8001;
const url = process.env.URL;

connect(url);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/v1/urls/', urlRouter);
app.use('/api/v1/auth/', userRouter);
app.use('/api/v1/admin/urls/', adminRouter);
app.use('/', viewRouter);


app.listen(port, () => {
    console.log(`Server started listening on ${port}`);
})