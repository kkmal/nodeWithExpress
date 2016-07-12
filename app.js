const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

const bookRouter = require('./src/routes/bookroutes');

app.use(express.static('public'));
app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(('/Books', bookRouter));
app.get('/', (req, res) => res.render('index',
  { title: 'Hello from Render', list: ['a', '2', '3'],
    nav: [{
      Link: '/Books',
      Text: 'Books',
    }, {
      Link: '/Authors',
      Text: 'Authors',
    }] }));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
