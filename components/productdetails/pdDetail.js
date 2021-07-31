// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
// components
import Page from "../../components/Page";

import { alpha, styled } from "@material-ui/core/styles";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const GalleryStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "240px",
  objectFit: "cover",
  position: "absolute",
});

const IconStyle = styled("div")(({ theme }) => ({
  marginLeft: 4,
  borderRadius: "50%",
  width: theme.spacing(3),
  height: theme.spacing(3),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
}));

export default function PdDetail({ product, pdDetail }) {
  const { name, image, price, salePrice, gallery, description,size } = product;

  const [pdurl, setPdurl] = useState(image);
  const [colorname, setColorname] = useState("");
  const [colorvalue, setColorValue] = useState("");
  const [productname,setProductname]=useState(name);
  const [productprice,setProductprice]=useState(salePrice);
  const [productsize,setProductsize]=useState(size.edges[0].node.value);

  const [checked, setChecked] = useState(0);

  const handleToggle = (value,size) => () => {
    setChecked(value);
    setProductsize(size);
    let pd={
      name:productname,
      price:productprice,
      colorname:colorname,
      colorvalue:colorvalue,
      size:size,
      image:pdurl
    }
    pdDetail(pd);

  };


  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ pt: "80%", position: "relative" }}>
                <ProductImgStyle
                  alt="image"
                  src={`https://institute-env.s3.amazonaws.com/static/${pdurl}`}
                />
              </Box>
              <Carousel
                partialVisible={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                // centerMode={true}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
              >
                {gallery &&
                  gallery.edges.map((item, index) => (
                    <Box
                      sx={{
                        pt: "150px",
                        width: "100%",
                        height: "150px",
                        position: "relative",
                      }}
                      onClick={() => {
                        setPdurl(item.node.url);
                        setColorname(item.node.color.edges[0].node.title);
                        setColorValue(item.node.color.edges[0].node.value);

                        let pd={
                          name:productname,
                          price:productprice,
                          colorname:colorname,
                          colorvalue:colorvalue,
                          size:productsize,
                          image:pdurl
                        }
                        pdDetail(pd);

                      }}
                    >
                      <GalleryStyle
                        key={index}
                        alt={item.node.url}
                        src={`https://institute-env.s3.amazonaws.com/static/${item.node.url}`}
                      />
                    </Box>
                  ))}
              </Carousel>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <Stack direction="column" spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                  <Typography variant="h6" noWrap>
                    Product name :
                  </Typography>
                  <Typography>{productname}</Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="h6" noWrap>
                    Price :
                  </Typography>
                  <Typography>Rs.{productprice}</Typography>
                </Stack>

                <Typography variant="subtitle2" noWrap>
                 Selected product color :
                 {colorname}{" "}
                  <IconStyle sx={{ bgcolor: colorvalue }} />
                
                </Typography>
                <List >
      {size && size.edges.map((item,index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} role={undefined} dense button onClick={handleToggle(index+1,item.node.value)}>
            <ListItemIcon>
              {
                checked == index+1 ? (
                  <Checkbox
                  edge="start"
                  checked={true}
                 // tabIndex={-1}
                  disableRipple
                  // inputProps={{ 'aria-labelledby': labelId }}
                />

                ) : (
                  <Checkbox
                  edge="start"
                  checked={false}
                 // tabIndex={-1}
                  disableRipple
                  // inputProps={{ 'aria-labelledby': labelId }}
                />
                )
              }
             
            </ListItemIcon>
            <ListItemText id={index} primary={`Size ${item.node.value}`} />
          
          </ListItem>
        );
      })}
    </List>
                <Typography variant="subtitle2" >
                  Product description : {description}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
