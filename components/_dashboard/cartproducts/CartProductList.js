import  PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import CartProductCard from './CartProductCard';

CartProductList.propTypes={
    cartproducts:PropTypes.array.isRequired
};

export default  function CartProductList({cartproducts,handledeleteCartProduct,...other}){

    return (
        <Grid container spacing={3} {...other}>
            {
                cartproducts.map((product)=>(
                    <Grid key={product.node.id} item xs={12} md={3}>
                        <CartProductCard product={product.node} handledeleteCartProduct={handledeleteCartProduct}/>
                        </Grid>
                ))
            }

        </Grid>
    )
}