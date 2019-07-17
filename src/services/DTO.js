export default {
  accountCreate,
  accountLogin,
  addDefinition,
  accountPatchInformation
}

function accountCreate(data) {
  return {
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

function addDefinition(expression) {
  return {
    "name": expression.name,
    "definition": expression.description,
    "tags": expression.tags
  }
}

function accountPatchInformation(data) {
  return {
    "username": data.name,
    "email": data.email,
    "password": data.pwd,
    "locale": data.locale
  }
}

