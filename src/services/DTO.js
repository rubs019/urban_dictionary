module.exports = {
  accountCreate,
  accountLogin
}



function accountCreate(data) {
  return {
    "realm": data.login,
    "username": data.login,
    "email": data.email,
    "password": data.pwd
  }
}

function accountLogin(data) {
  return {
    "username": data.login,
    "password": data.pwd
  }
}
