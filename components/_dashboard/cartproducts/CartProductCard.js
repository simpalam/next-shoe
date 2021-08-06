import PropTypes from "prop-types";
import { styled } from "@material-ui/styles";
import { Card, Stack, Typography ,IconButton} from "@material-ui/core";
import { Box } from "@material-ui/system";
import Label from "../../Label";
import Link from "next/link";
import { Delete } from "@material-ui/icons";
import { fCurrency } from "../../../utils/formatNumber";


//------------
const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

CartProductCard.propTypes = {
  product: PropTypes.object,
};

export default function CartProductCard({ product,handledeleteCartProduct }) {
  const { name, image, price, salePrice, color, status, productid, userid ,id} =
    product;

  return (
    <Card>
      <Box
        sx={{
          pt: "100%",
          position: "relative",
        }}
      >
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle
          alt={name}
          src={`https://institute-env.s3.amazonaws.com/static/${image}`}
        />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link href={`product-detail/${productid}`}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
            <IconButton onClick={()=>handledeleteCartProduct(id)} color="primary" aria-label="Delete from shipping cart.">
                <Delete />
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
                {price && fCurrency(price)}
                </Typography>
                &nbsp;
                {fCurrency(salePrice)}

            </Typography>

        </Stack>
      </Stack>
    </Card>
  );
}
