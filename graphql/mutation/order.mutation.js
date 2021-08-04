import {gql}from '@apollo/client'

export const UPDATE_ORDER=gql`
mutation updateOrder($id: ID, $userid: String!, $image: String!, $productName: String!, $color: String!, $size: Int, $price: String!, $deliverycharge: String!, $status: String, $name: String!, $phone: String!, $email: String!, $address: String!) {
    updateOrder(orderData: {id: $id, userId: $userid, image: $image, productName: $productName, color: $color, size: $size , price: $price, deliverycharge: $deliverycharge, status: $status, name: $name, phone: $phone, email: $email, address: $address}) {
      order {
        id
        userId
        price
        productName
        userId
      }
    }
  }
`

export const CREATE_ORDER=gql`
mutation createOrder( $userid: String!, $image: String!,
     $productName: String!, $color: String!,
      $size: Int, $price: String!, $deliverycharge: String!,
       $status: String, $name: String!, $phone: String!, $email: String!, $address: String!) {
    createOrder(orderData: { userId: $userid, image: $image, productName: $productName, color: $color, size: $size , price: $price, deliverycharge: $deliverycharge, status: $status, name: $name, phone: $phone, email: $email, address: $address}) {
      order {
        id
        userId
        price
        productName
        userId
      }
    }
  }
`