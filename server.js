const express = require('express');
const fs = require('fs');
var app = express();

//view engine for node 
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials')
//medile ware for static path __dirname = project path 
//medile ware executes in order its called

const port=process.env.PORT || 4200;

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    log = `${now} : ${req.method} ${req.path} `;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintanace.hbs');
// });

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
})

app.get('/', (request, response) => {
    // response.send("<h1>Hello There !!!</h1");
    // response.send({
    //     name:'andy',
    //     Likes:['Badminton','dancing']
    // })
    response.render('home.hbs', {
        pageTitle: "Home Page",
    });

});
app.get('/about', (request, response) => {
    // response.send("About Page")
    // retturn to page
    response.render('about.hbs', {
        pageTitle: "About Page",
    });
})

app.get('/bad', (request, response) => {
    response.send({
        error: '503 Bad request'
    });
})



app.listen(port, () => {
    console.log(`server is up ${port}`);
});

