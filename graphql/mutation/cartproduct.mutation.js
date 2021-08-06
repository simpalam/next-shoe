import {gql} from '@apollo/client'


export const CREATE_CARTPRODUCT=gql`
mutation createCartProduct($userid:String!,$productid:String!,
    $color:String!,$image:String!,$price:String!
  ,$salePrice:String!,$name:String!,$status:String!){
    createCartproduct(cartData:{userId:$userid,productid:$productid,color:$color,image:$image,price:$price,
    salePrice:$salePrice,name:$name,status:$status}){
      cartproduct{
        id
        userId
          productid
         name
        color
        image
        price
        salePrice
        status
      }
    }
  }
`

export const UPDATE_CARTPRODUCT=gql`
mutation updateCartProduct($id:ID!,$userid:String!,$productid:String!,
    $color:String!,$image:String!,$price:String!
  ,$salePrice:String!,$name:String!,$status:String!){
    updateCartproduct(cartData:{id:$id,userId:$userid,productid:$productid,color:$color,image:$image,price:$price,
    salePrice:$salePrice,name:$name,status:$status}){
      cartproduct{
        id
        userId
          productid
         name
        color
        image
        price
        salePrice
        status
      }
    }
  }
`
export const DELETE_CARTPRODUCT=gql`
mutation deleteCartProduct($id:ID!){
    deleteCartproduct(id:$id){
      cartproduct{
        id
        image
      }
      
    }
  }
`