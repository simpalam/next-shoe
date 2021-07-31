import { useFormik } from 'formik';
import { useState ,useEffect} from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import { INCREMENT } from '../types'
import { GET_PRODUCTS } from '../graphql/query/products.query';
import { useQuery } from '@apollo/client';
import ClientOnly from '../components/ClientOnly';
import client from '../apollo-client';


// ----------------------------------------------------------------------
export async function getServerSideProps(){
  const {data,error,loading} = await client.query({
    query:GET_PRODUCTS
  });
  
  if(loading){
    return <h2>Loading ... Please wait.</h2>
  }
  if(error){
    console.error(error);
    return null
  }

  return {
    props: {
      products : data.allProducts.edges
    }
  }

}
export default function EcommerceShop({products}) {
  const [openFilter, setOpenFilter] = useState(false);

  // const [products,setProduts]=useState(products);

  const state = useSelector(state => state);
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
      <div>       
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
  

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <ProductCartWidget />
      </Container>
    </Page>
    </div>
  );
}
