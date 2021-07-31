import { Button, Card, Container, Grid ,Stack, Typography} from "@material-ui/core";
import React from "react";
import Page from "../Page";

export default function Checkout({productdetail,cstdetail}) {
  return (
    <div>
      <Page>
        <Container maxWidth="xl">
          
        <Typography variant='subtitle2' align='left'>
                    Product detail :
                  </Typography>
                  <Typography>
                   Product name: {productdetail.name} 
                  </Typography>
                  <Typography>
                   Product color: {productdetail.colorname} 
                  </Typography>
                  <Typography>
                   Product price: {productdetail.price} 
                  </Typography>
                  <Typography>
                   Product size: {productdetail.size} 
                  </Typography>
                  <Typography variant='subtitle2' align='left'>
                    Delivery details :
                  </Typography>
                  <Typography>
                   Name: {cstdetail.firstName} 
                  </Typography>
                  <Typography>
                   Email: {cstdetail.email} 
                  </Typography>
                  <Typography>
                   Phone: {cstdetail.phone} 
                  </Typography>
                  <Typography>
                   Address: {cstdetail.address} 
                  </Typography>
          <Grid container spacing={3} style={{
              flexDirection:'column',
              alignItems:'center',
              padding:'80px'          }} >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                
               
              <Card>
              <Button variant='contained' disabled={true}>Online Payment</Button>
            </Card>
            <Card>
              <Button variant='contained'>Cash On Delivery</Button>
            </Card>

              </Stack>
           
           
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
