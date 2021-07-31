const jwt = require("jsonwebtoken")
const { Users } = require("../models")

//------------------------ POST ------------------------//

const postLoginUser = async (req, res, next) => {
  try {
    //chequear si el usuario es valido, en caso de que el usuario es correcto -> genero el token
    const { email, password } = req.body
    //evaluamos el email
    const user = await Users.findOne({where: {email}})
    if(!user) 
      return res.status(400).send("User does not exist")
      
    if(!user.validPassword(password))
      return res.status(401).send("Invalid credentials, forbidden")
      
    //si pasó todas estas validaciones, generamos el token, con el primer parametro seleccionamos que info queremos hashear (el payload) y en el segundo la secret key que despues nos va a servir para deshashear el payload
    //NOTE yo seteo el req.tokenPayload = payload en auth.js es el primer parámetro y acá defino que es ese payload
    const token = jwt.sign({ userId: user.id }, "plataforma5")
    const { id, name } = user
    return res.status(200).send({ id, name, email, token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postLoginUser,
}