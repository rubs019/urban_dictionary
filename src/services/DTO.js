module.exports = {
  accountCreate
}



function accountCreate(data) {
  return {
    "realm": data.login,
    "username": data.login,
    "email": data.email,
    "password": data.pwd
  }
}
