
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let hotels = []; 
function readData() {
    const filename = "Hotel.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    hotels = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "Hotel.json";
    const jsonData = JSON.stringify(hotels);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}

app.get("/hotels", (req, res) => {
    readData();
    res.send(JSON.stringify(hotels));
})

app.post('/hotels', (req, res) => {
    if (hotels.length == 0)
        readData(); 
    let body = req.body; 
    hotels.push(body);
        saveData(); 
        res.send("Hotel Details added successfully");

})

//Server
app.listen(3000, () => {
    console.log("Server available at 1234");
})