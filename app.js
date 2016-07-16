const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

const port = process.env.PORT || 5000;

const nav = require('./nav');

const bookRouter = require('./src/routes/bookroutes')(nav);
const adminRouter = require('./src/routes/adminroutes')(nav);

const authRouter = require('./src/routes/authroutes')(nav);

app.get('/', (req, res) => res.render('index',
  { title: 'Hello from Render',
    nav }));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({ secret: 'library' }));

app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport')(app);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/Auth', authRouter);
app.set('views', './src/view');
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

