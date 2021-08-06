import {
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Stack,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import client from "../apollo-client";
import Page from "../components/Page";
import CartProductList from "../components/_dashboard/cartproducts/CartProductList";
import { ProductList } from "../components/_dashboard/products";
import { DELETE_CARTPRODUCT } from "../graphql/mutation/cartproduct.mutation";
import { CARTPRODUCTS_BY_USERID } from "../graphql/query/cartproduct.query";

export default function MyCart() {
  const [userid, setUserid] = useState(null);
  const [cartproducts, setCartproducts] = useState(null);
  const [iscart, setIscart] = useState(false);

  const router = useRouter();

  async function fetchCartproducts() {
    const { data, errors, loading } = await client.query({
      query: CARTPRODUCTS_BY_USERID,
      variables: { userid: userid },
    });

    if (loading) {
      return <h2>Loading data</h2>;
    }
    if (errors) {
      return null;
    }
    if (data.allCartpeoducts.edges.length > 0) {
      setCartproducts(data.allCartpeoducts.edges);
      setIscart(true);
    }
  }

  useEffect(() => {
    setUserid(localStorage.getItem("userid"));
    if (userid != null) {
      fetchCartproducts();
    }
  }, [userid, iscart]);

  const [isDelete, setIsDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handledeleteCartProduct = async (id) => {
    setIsDelete(true);
    const { data, errors, loading } = await client.mutate({
      mutation: DELETE_CARTPRODUCT,
      variables: { id: id },
    });

    if (errors) {
      console.error(errors);
      return null;
    }
    if (loading) {
      return <h2>Deleting data</h2>;
    }
    if (data.deleteCartproduct === null) {
      setIsDelete(false);
      setDeleted(true);
    }
  };

  if (iscart === false) {
    return <h2>You have not added any product to cart.</h2>;
  }

  return (
    <div>
      <Dialog open={isDelete}>
        <DialogContent>
          Product deleting...
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Dialog open={deleted}>
        <DialogContent>Product deleted from cart successfully.</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleted(false);
              router.reload();
            }}
          >
            Ok, Fine
          </Button>
        </DialogActions>
      </Dialog>
      <Page title="My Cart">
        <Container>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            Some my cart sorting things.
          </Stack>
          <CartProductList
            cartproducts={cartproducts}
            handledeleteCartProduct={handledeleteCartProduct}
          />
        </Container>
      </Page>
    </div>
  );
}
