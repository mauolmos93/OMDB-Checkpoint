const crypto = require("crypto")
const S = require("sequelize");
const db = require("../db");

class Users extends S.Model {}

Users.init({
  name: {
    type: S.STRING,
    allowNull: false,
  },
  email: {
    type: S.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: S.STRING,
    allowNull: false,
  },
  salt: {
    type: S.STRING,
    allowNull: false,
  }
}, {sequelize: db, modelName: "users", timestamps: false})

//-----------------------------------------------------------//
//                      Hooks
//-----------------------------------------------------------//

Users.addHook("beforeValidate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex");
  user.password = user.hashPassword(user.password);
});

//-----------------------------------------------------------//
//               Métodos de instancia
//-----------------------------------------------------------//

Users.prototype.hashPassword = function (password) {
  return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
};

Users.prototype.validPassword = function (loginPassword) {
  return this.password == this.hashPassword(loginPassword);
};

//-----------------------------------------------------------//

module.exports = Users;