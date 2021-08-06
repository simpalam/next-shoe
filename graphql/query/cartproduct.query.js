import {gql} from '@apollo/client'

export const CARTPRODUCTS_BY_USERID=gql`
query allCartpeoducts($userid:String!){
    allCartpeoducts(userId_Icontains:$userid){
      edges{
        node{
          id
          image
          productid
          name
          price
          salePrice
          status
          color
          userId
        }
      }
    }
  }
`