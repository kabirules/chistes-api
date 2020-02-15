var express = require('express');
var app = express();
const fs = require('fs');

app.get('/', function (req, res) {
  res.send('Welcome to Chistes API!');
});

app.get('/chistes', function (req, res) {
    let chistes = getChistesFromfile();
    // retrieving parameters
    let id = req.query.id;
    let categoria = req.query.categoria;
    let chiste = getChisteFromParams(chistes, id, categoria);
    res.send(chiste.texto);
});

app.get('/categorias', function (req, res) {
    res.send('Hello Categorias!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// retrieve file as json
function getChistesFromfile() {
    let rawdata = fs.readFileSync('chistes.json');
    return JSON.parse(rawdata);
}
// retrieve chiste from chistes json depending on params
function getChisteFromParams(chistes, id, categoria) {
    // get chiste by id
    if (id) {
        return chistes.chistes.find(chiste => chiste.id == id);
    }
    // get one random chiste by category
    if (categoria) {
        let filteredChistes = [];
        chistes.chistes.forEach(chiste => {
            chiste.categorias.forEach(categorias => {
                if (categorias == categoria) {
                    filteredChistes.push(chiste);
                }
            })
        });
        if (filteredChistes.length > 0) {
            return filteredChistes[Math.floor(Math.random() * filteredChistes.length)];
        }
    }
    // No chiste retrieved
    return {"texto": "Hoy no hay chiste"};
}