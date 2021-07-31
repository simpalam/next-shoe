import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
import Link from 'next/link'
// material
import { styled } from '@material-ui/core/styles';

import {Button,Stack,Typography,Container,Box,Card,CardMedia } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { BlogPostCard } from '../components/_dashboard/blog';

import Page from '../components/Page';

import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));


const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});


// ----------------------------------------------------------------------


export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found | Minimal-UI">
      <Container>
       
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
          
            {/* <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography> */}

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
             <Card sx={{ position: 'relative' }}>
               <CardMedia 
               image="/static/mock-images/cover/cover_1.jpg"
               title="image"
               />
                  <CoverImgStyle alt="image" src="/static/mock-images/cover/cover_1.jpg" />
             </Card>
              
            </motion.div>
            {/* <Link href="/">
            <Button to="/" size="large" variant="contained" >
              Go to Home
            </Button>
            </Link> */}
           
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
