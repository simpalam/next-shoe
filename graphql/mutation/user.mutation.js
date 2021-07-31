import {gql} from '@apollo/client'

export const REGISTER_USER=gql`
mutation ($email:String!,$password:String!) {
    register(
      input: {
        username:$email,
        email: $email,
        password1: $password,
        password2: $password,
      }
    ) {
      success,
      errors,
      token,
      refreshToken
    }
  }
`

export const LOGIN_USER=gql`
mutation ($username:String!,$password:String!){
    tokenAuth(
      input: {
        username: $username,
        password: $password
      }
    ) {
      success,
      errors,
      unarchiving,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username,
      }
    }
  }
`