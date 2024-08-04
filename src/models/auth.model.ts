export interface BodyRequestLogin {
    email: string,
    password: string
}

export interface BodyResponseLogin {
    token: string,
}

export interface  BodyRequestCreateUser {
    email: string,
    password: string
}

export interface BodyResponseCreateUser {
    id: number,
    token: string,
}