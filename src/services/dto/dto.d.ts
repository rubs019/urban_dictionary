export interface UserCredential {
    username: string
    "email"?: string
    "password"?: string
    "locale"?: string
}

export interface UserConnectedCredential {
    id?: string
    username?: string
    email?: string
    role?: string
    token?: string
    karma?: string
    locale?: string
}

export interface RawUserCredential {
    id?: string
    username?: string
    name?: string
    login?: string
    "email"?: string
    "password"?: string
    "pwd"?: string
    "pwd2"?: string
    "locale"?: string
    karma?: number
    role?: string,
    token?: string
}

export interface RawExpression {
    "name"?: string
    "definition"?: string
    "description"?: string
    "tags"?: string
    "example"?: string
    "locale"?: string
}

export interface Expression {
    "name": string
    "definition": string
    "tags": string
    "example": string
    "locale": string
}
