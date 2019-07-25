export interface UserCredential {
    username: string
    "email"?: string
    "password"?: string
    "locale"?: string
}

export interface RawUserCredential {
    username?: string
    name?: string
    login?: string
    "email"?: string
    "password"?: string
    "pwd"?: string
    "locale"?: string
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
