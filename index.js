const  express = require("express")
let app = express()


let ct = {cities:["Sofia", "Plovdiv", "Kazanlak"]}
let ct1 = {cities:["Aotos", "Varna", "Pazardjik"]}

app.use(express.json());

app.get('/', (req, res)=> {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(ct));
    res.end();


})

app.post('/', (req,res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(req.body); 
    //res.write(JSON.stringify(ct1));
    res.end();
})
var port = process.env.PORT || 8080;
app.listen(port);



module.exports = app;

