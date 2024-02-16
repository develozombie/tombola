const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const axios = require('axios');

app.use(bodyParser.urlencoded({extended: false}));

app.use(
    helmet()
);
//app.get that show index.html
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
});
//app.post that read a form input
app.post('/form', function(req, res){
    var respuesta = "";
    let config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    let data = {
     'codigoId': req.body.codigo
    }
    axios.post('https://0z9chajzl3.execute-api.us-east-1.amazonaws.com/default/requestTombola', data,config)
      .then(function (response) {
        if(response.data)
        {
            console.log(response);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            respuesta = `
            <html>
                <head>
                    <title>Kayari Tombola</title>
                    <style>
                        .container {
                        margin: 20px;
                        display: flex;
                        padding: 20px;
                        width: 400px;
                        }
                        .green-block {
                            text-align: center;
                            position: absolute;
                            right: 0;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            width: fit-content;
                            height: fit-content;
                        }
                        .result{
                            font-size: xx-large;
                            font-weight: bold;
                            color: green;
                        }
                    </style>
                    <script src="jquery-3.7.1.min.js"></script>
                </head>
                <body>
                    <div class="container">
                    <div class="green-block">
                        <img src="kayari.png"/></br>
                        <form action="/form" method="POST" id="tombola" class="tombola">
                            <input autofocus type="text" name="codigo" id="codigo" style="border-radius: 6px; padding: 10px; font-size: large; width:500px;"></input>
                            <input type="submit" name="submit" value="Jugar!" style="border-radius: 6px; padding: 10px; font-size: large;"></input>
                        </form>
                        <div class="result" id="result">${response.data.Item.S}</div>
                    </div>
                    </div>
                </body>

                </html> 
            `;
            res.end(respuesta); 
        }
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            respuesta = `
            <html>
                <head>
                    <title>Kayari Tombola</title>
                    <style>
                        .container {
                        margin: 20px;
                        display: flex;
                        padding: 20px;
                        width: 400px;
                        }
                        .green-block {
                            text-align: center;
                            position: absolute;
                            right: 0;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            width: fit-content;
                            height: fit-content;
                        }
                        .result{
                            font-size: xx-large;
                            font-weight: bold;
                            color: green;
                        }
                    </style>
                    <script src="jquery-3.7.1.min.js"></script>
                </head>
                <body>
                    <div class="container">
                    <div class="green-block">
                        <img src="kayari.png"/></br>
                        <form action="/form" method="POST" id="tombola" class="tombola">
                            <input autofocus type="text" name="codigo" id="codigo" style="border-radius: 6px; padding: 10px; font-size: large; width:500px;"></input>
                            <input type="submit" name="submit" value="Jugar!" style="border-radius: 6px; padding: 10px; font-size: large;"></input>
                        </form>
                        <div class="result" id="result">Hoy NO manana SI! (pi pi pi)</div>
                    </div>
                    </div>
                </body>

                </html> 
            `;  
            res.end(respuesta);
        }
      })
});


app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/fonts'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});