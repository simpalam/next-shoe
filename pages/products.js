import { useFormik } from "formik";
import { useState, useEffect } from "react";
// material
import {
  Container,
  Dialog,
  Stack,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
// components
import Page from "../components/Page";
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../components/_dashboard/products";
//
import PRODUCTS from "../_mocks_/products";
import { INCREMENT } from "../types";
import { GET_PRODUCTS } from "../graphql/query/products.query";
import { useQuery } from "@apollo/client";
import ClientOnly from "../components/ClientOnly";
import client from "../apollo-client";
import { CREATE_CARTPRODUCT } from "../graphql/mutation/cartproduct.mutation";
import Link from "next/link";

// ----------------------------------------------------------------------
export async function getServerSideProps() {
  const { data, errors, loading } = await client.query({
    query: GET_PRODUCTS,
  });

  if (loading) {
    return <h2>Loading ... Please wait.</h2>;
  }
  if (errors) {
    console.error(error);
    return null;
  }

  return {
    props: {
      products: data.allProducts.edges,
    },
  };
}

//-----------------------------------------------------------------------

export default function EcommerceShop({ products }) {
  const [openFilter, setOpenFilter] = useState(false);

  // const [products,setProduts]=useState(products);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
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

  const [isDialog, setIsDialog] = useState(false);
  const [islogin, setIslogin] = useState(false);
  const [isCartadded,setIsCartadded]=useState(false);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    setUserid(localStorage.getItem("userid"));
  }, [userid]);
  const handleCartProduct = async (product) => {
    //  let userid=localStorage.getItem('userid');

    if (userid === null) {
      setIslogin(true);
      return null;
    }
    setIsDialog(true);
    const { data, errors, loading } = await client.mutate({
      mutation: CREATE_CARTPRODUCT,
      variables: {
        userid: userid,
        productid: product.id,
        color: "color",
        image: product.image,
        price: product.price,
        salePrice: product.salePrice,
        name: product.name,
        status: product.status,
      },
    });
    if (errors) {
      console.log(errors);
      return null;
    }
    if (loading) {
      return <h2>Product loading..</h2>;
    }
    if (data.createCartproduct.cartproduct.userId === userid) {
      console.log(data);
      setIsDialog(false);
      setIsCartadded(true);
    }
  };
  return (
    <div>
       <Dialog open={isCartadded}>
        <DialogTitle>Product added</DialogTitle>
        <DialogContent>
          Product added to cart successfully.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCartadded(false)}>Not now</Button>
          <Link href="/mycart">
            <Button>Go to My cart</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Dialog open={islogin}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          For adding product to shop cart, you must login.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIslogin(false)}>Not now</Button>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialog}>
        <DialogTitle>Product adding to cart, please wait...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Page title="Dashboard: Products ">
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

          <ProductList
            products={products}
            handleCartProduct={handleCartProduct}
          />
          <ProductCartWidget />
        </Container>
      </Page>
    </div>
  );
}
