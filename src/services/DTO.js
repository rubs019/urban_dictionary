export default {
  accountCreate,
  accountLogin,
  accountLogout,
  addDefinition
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

function accountLogout({token}) {
  return {
    "access_token": token
  }
}

function addDefinition(expression) {
  return {
    "name": expression.name,
    "definition": expression.description,
    "tags": expression.tags
  }
}

