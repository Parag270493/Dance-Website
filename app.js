const express = require("express")
const path = require("path");
const fs = require("fs")
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { resolveSoa } = require("dns");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUF SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory

// Endpoint
app.get('/', (req, res) => {
    const con = 'This is the best content on the internet use it wisely';
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const con = 'This is the best content on the internet use it wisely';
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.send(404).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug' );
})
app.get('/services', (req, res) => {
    const con = 'This is the best content on the internet use it wisely';
    const params = {}
    res.status(200).render('services.pug', params);
})

app.get('/about', (req, res) => {
    const con = 'This is the best content on the internet use it wisely';
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/classinfo', (req, res) => {
    const con = 'This is the best content on the internet use it wisely';
    const params = {}
    res.status(200).render('classinfo.pug', params);
})

app.post('/contact', (req, res) => {
    name = req.body.name
    phone = req.body.phone
    email = req.body.email
    address = req.body.address
    desc = req.body.desc


    let outputToWrite = `The name of the client is ${name}, ${phone} years old , ${email} , residing at ${address}, More about his/her:${desc}`
    fs.writeFileSync('output.txt', outputToWrite)

    const params = { 'message': "Your form has been successfully submitted" }
    res.status(200).render('contact.pug', params);
})



// start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})
