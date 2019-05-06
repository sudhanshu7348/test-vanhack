const express = require("express");
const bodyParser = require('body-parser');
const port = 5000;
const username = 'rdspgtest';
const password = 'rdstest#123456';
const host = 'rdstestinstance.cyxfud1f8h9v.us-east-2.rds.amazonaws.com';
const dbName = 'rdsdb';


var knex = require('knex')({
  client: 'pg',
  connection: {
    host : host,
    user : username,
    password : password,
    database : dbName
  }
});

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post("/save", (req, res) => {
    console.log('req:::', req.body);
    
    knex('users')
    .insert(req.body)
    .then(result => {
        return knex.from('users').select('*');
    })
    .then(result => {
        let html = `<!DOCTYPE html>
<html>
    <head>
        <title> Test Application</title>
        </head>
    <body>
    <p>Records has been created successfully</p>
    <br/><br/><br/>
    Here is the entire list:<br/>
    <table>
    ${result.map(r =>'<tr>'+'<td>'+r.name+'</td>'+'<td>'+r.color+'</td>'+'<td>'+r.cats_or_dogs+'</td>'+'</tr>' ).join('')}
    </table>
    </body>
    </html>`;
        res.send(html);
    }).catch(err => {
        //console.log(err);
        res.status(400).send(' Records with name '+req.body.name+' already exists!');
    });
    
});

app.listen(port,()=> console.log(`Application Started on port ${port}`));
