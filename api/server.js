const express = require("express")
const morgan = require("morgan");
const {red} = require("chalk")
const db = require("./db")
const routes = require('./routes')

const app = express()

// Configs
app.use(morgan("dev"))
app.use(express.json()) //Para los GET no hace falta pero para los POST sí :)
app.use(express.urlencoded({ extended: false })); //Para que funcionen los formularios del front


//Routes
app.use("/api", routes)

// Error Middleware
app.use((error, req, res, next) =>{
  console.log(red("Ha ocurrido un error y entré al error middleware:"))
  console.log(error)
  res.sendStatus(500)
})

//TODO Preguntar si esta forma de levantar el server con async/await está bien
const deployServer = async () =>{
  try{
    await db.sync({force: false})
    const port = 3001
    app.listen(port, () =>{
      console.log(`Server running on http://localhost/${port}`)
    })  
  }catch(error){
    console.log(red(error))
  }
}

deployServer()