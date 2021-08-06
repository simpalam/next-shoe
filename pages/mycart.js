import { filter } from "lodash";
import {
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Stack,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import client from "../apollo-client";
import Page from "../components/Page";
import CartListToolbar from "../components/_dashboard/cartproducts/CartListToolbar";
import CartProductList from "../components/_dashboard/cartproducts/CartProductList";
import { ProductList } from "../components/_dashboard/products";
import { DELETE_CARTPRODUCT } from "../graphql/mutation/cartproduct.mutation";
import { CARTPRODUCTS_BY_USERID } from "../graphql/query/cartproduct.query";

//------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) =>
          _user.node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  

export default function MyCart() {
  const [userid, setUserid] = useState(null);
  const [cartproducts, setCartproducts] = useState(null);
  const [iscart, setIscart] = useState(false);
  const router = useRouter();
  const [filterName,setFilterName]=useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleFilterByName= (event)=>{
      setFilterName(event.target.value);
  }

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

  
  const filteredProducts = applySortFilter(
    cartproducts,
    getComparator(order, orderBy),
    filterName
  );

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
           // flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
          >
        
           <CartListToolbar
           filterName={filterName}
           onFilterName={handleFilterByName}
           />
          </Stack>
          <CartProductList
            cartproducts={filteredProducts}
            handledeleteCartProduct={handledeleteCartProduct}
          />
        </Container>
      </Page>
    </div>
  );
}
