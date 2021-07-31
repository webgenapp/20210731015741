export type Toy = {
  id?: number

  name: string

  type: string
}

export type Event = {
  id?: number

  name: string

  date: string

  price: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type ToyError = any

export type EventError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
