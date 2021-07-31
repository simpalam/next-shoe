import PropTypes from 'prop-types';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card,  Typography, Stack ,IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import  AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

import Link from 'next/link'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, image, price, color, status, salePrice,id } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={`https://institute-env.s3.amazonaws.com/static/${image}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link href={`product-detail/${id}`} >
          <Typography variant="subtitle2" noWrap>
            {name} 
          </Typography>
        </Link>
        <ColorPreview colors={color.edges} />
      

        <Stack direction="row" alignItems="center" justifyContent="space-between">
         
          <IconButton onClick={()=>alert('clicked')} color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
        
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {salePrice && fCurrency(salePrice)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
