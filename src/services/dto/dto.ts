import {
  Expression,
  RawExpression,
  RawUserCredential,
  UserCredential
} from "@/services/dto/dto.d.ts"

export default {
  accountCreate,
  accountLogin,
  addDefinition,
  accountPatchInformation
}

function accountCreate(credential: RawUserCredential): UserCredential | undefined {
  if (!credential.login || !credential.email || !credential.pwd || !credential.locale) return
  return {
    "username": credential.login,
    "email": credential.email,
    "password": credential.pwd,
    "locale": credential.locale
  }
}

function accountLogin(credential: RawUserCredential): UserCredential | undefined {
  if (!credential.login || credential.pwd) return
  return {
    "username": credential.login,
    "password": credential.pwd
  }
}

function addDefinition(expression: RawExpression): Expression | undefined {
  if (!expression.name || !expression.description || !expression.tags || !expression.example || !expression.locale) return

  return {
    "name": expression.name,
    "definition": expression.description,
    "tags": expression.tags,
    "example": expression.example,
    "locale": expression.locale
  }
}

function accountPatchInformation(credential: RawUserCredential): UserCredential | undefined {
  if (!credential.name || !credential.email || !credential.pwd || !credential.locale) return
  return {
    "username": credential.name,
    "email": credential.email,
    "password": credential.pwd,
    "locale": credential.locale
  }
}

