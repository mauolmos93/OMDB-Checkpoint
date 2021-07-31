const loginMethods = require("./loginMethods")
const registerMethods = require("./registerMethods")
const usersMethods = require("./usersMethods")

module.exports = {
  ...loginMethods,
  ...registerMethods,
  ...usersMethods
}