let users = [
    {
        id: 1,
        name: "Mihai",
        email: "mihai.gheorghe@csie.ase.ro",
        password: "Mihai1!"
    },
    {
        id: 2,
        name: "Elena",
        email: "elena@gmail.com",
        password: "Elena1!"
    },
]

//server app
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = 3000;

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var wellKeptSecret = 'Nu exista mos craciun'

app.use(logger('dev'));
app.use(cors()) //see more at https://www.npmjs.com/package/cors
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //we expect JSON data to be sent as payloads

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', async (req, res) => {
  let user = req.body
  console.log('trying to post the following data: ', user)

  const userflitred = users.filter(function(dbuser){
    return dbuser.email === user.email;
  })

  if(userflitred.length){
    res.send("this user already exist")
  }else{
    const hashPassword = await bcrypt.hash(user.password, saltRounds)

    user.password=hashPassword
    user.id = users[users.length -1].id + 1 
    users.push(user)
    console.log(user)
    res.send('The user has been successfully added')
    
  }
  console.log(users)

});

app.post('/login', (req, res) => {
  let user = req.body
  console.log('trying to login with: ', user)

  const userflitred = users.filter(function(dbuser){
    return dbuser.email === user.email;
  })

  if(userflitred.length){
    let dbhash = userflitred[0].password

    bcrypt.compare(user.password, dbhash, function(err, result) {
      if(result){
        let token = jwt.sign(user.email, wellKeptSecret)
        let response = {
        }
        response.token = token
        response.success = true
        res.json(response)
      }
      else{
        res.send("Invalid password")
      }
  });
  }else{

    res.send('The user dosn t exist')
    
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

