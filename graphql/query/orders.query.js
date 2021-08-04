import {gql} from "@apollo/client"

export const ORDER_BY_ID=gql`
query getOrder($id:ID!){
    order(id:$id){
      id
      userId
      productName
      color
      size
      price
      image
      deliverycharge
      status
      name
      phone
      email
      address
    }
  }
`

export const ORDERS_BY_USERID=gql`
query getOrders($userid:String!){
    allOrdeers(userId_Icontains:$userid){
      edges{
        node{
          id
          userId
          productName
          color
          size
          price
          image
          status
          deliverycharge
          name
          phone
          email
          address
        }
      }
    }
  }
`