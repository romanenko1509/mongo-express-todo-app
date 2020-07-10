const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.use(todoRoutes);
app.use(express.static(__dirname + '/public/'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://rmnk:rmnk1509@cluster0.tkcha.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log(e);
    }
}

app.listen(PORT, () => {
    console.log('Server has been started..')
})

start();