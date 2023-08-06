const Client = require('pg').Client;
const express = require('express')

const session = require('express-session')

const PORT = process.env.PORT || 4001 

const app = express()
app.use(express.json());

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 5000*60, secure: false, sameSite: true },
    saveUninitialized: false,
    resave: false,
    store: new (require('connect-pg-simple')(session))({conString: 'postgres://postgres:postgres@localhost:5432/authentify'})
    })
    );

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'authentify',
  password: 'postgres',
  port: 5432,

})

const connect = async () => {
  await client.connect()
}
connect()

const end = async ()=>{
  await client.end()
}

//const store = new session.MemoryStore();
app.set('trust proxy', 1) // trust first proxy
app.set("view engine", "ejs");

    function ensureAuthentication(req, res, next) {
        // Complete the if statement below:
        if (req.session.authenticated) {
          return next();
        } else {
          res.status(403).json({ msg: "You're not authorized to view this page" });
        }
      }

/*const pool =  new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'authentify',
  password: 'postgres',
  port: 5432,
})*/

app.post('/signup', (req, res)=>{
  
 const {username, password} = req.body
// connect()
  client.query('INSERT INTO inputs VALUES ($1, $2)', [username, password], (error, result)=>{
      if (error){
          throw error;
      }
      else{
          res.send('Sign up successful...');
      }
  })
  //end()
})


/*app.get('/login', (req, res)=>{
  res.render('login')
})*/

app.post('/login', (req, res) => {
    /*Authentification*/
    const {username, password} = req.body
   
//    connect()

    client.query('SELECT username, pass FROM inputs WHERE username = $1', [username], (error, result)=>{
        if (error){
            throw error;
        }
        else{
            if(result.rows[0].pass === password){
                req.session.authenticated = true;
                req.session.user = {
                  username,
                  password,
                };
                res.redirect('/view');
              
            }
            else{
              res.status(403).send('User Information incorrect')
            }
            }
    })
    
})

app.post('/saveInfo', ensureAuthentication, (req, res)=>{
  const {username, info} = req.body
//  connect()
    client.query('UPDATE inputs SET data = $1 WHERE username = $2', [info, username], (error, result)=>{
        if (error){
            throw error;
        }
        else{
            
            res.send('Info added successfully...');
        }
    })

})

app.get('/view', ensureAuthentication, (req, res)=>{



  client.query('SELECT username, data FROM inputs WHERE username = $1', [req.session.user.username], (error, result)=>{
    if (error){
        throw error;
    }
    else{
        res.send(result.rows)
        }
})

})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}...`);
})
