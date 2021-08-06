import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------


ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products,handleCartProduct, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.node.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product.node} handleCartProduct={handleCartProduct} />
        </Grid>
      ))}
    </Grid>
  );
}
