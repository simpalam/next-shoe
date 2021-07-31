import { Container, Stack, Typography, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../../components/_dashboard/blog";
//
import POSTS from "../../_mocks_/blog";
import ProductImageCarouselCard from "../../components/_dashboard/products/ProductCarouselImage";
import PdDetail from "../../components/productdetails/pdDetail";
import CustomerForm from "../../components/productdetails/customerform";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Checkout from "../../components/productdetails/checkout";
import client from "../../apollo-client";
import { GET_ONE_PRODUCT } from "../../graphql/query/products.query";
import { useRouter } from "next/router";

function getSteps() {
  return ["Product details", "Delivery details", "Payment method"];
}

export async function getServerSideProps(context) {
  const { data, loading, error } = await client.query({
    query: GET_ONE_PRODUCT,
    variables: { id: context.params.id },
  });

  if (loading) {
    return <h2>Loading ... Please wait.</h2>;
  }
  if (error) {
    console.error(error);
    return null;
  }

  return {
    props: {
      product: data.product,
    },
  };
}

export default function ProductDertail({ product }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("login");
  };

  const [productdetail, setProductdetail] = useState({
    name: product.name,
    price: product.salePrice,
    colorname: "",
    colorvalue: "",
    size: 7,
    image: "",
  });

  const [cstdetail, setCstdetail] = useState({
    price: product.salePrice,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [login, setLogin] = useState("");

  useEffect(() => {
    // if (isOpenSidebar) {
    //   onCloseSidebar();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setLogin(localStorage.getItem("login"));
  }, [login]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
    console.log(productdetail);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  const pdDetail = (productdetail) => {
    if (productdetail) {
      setProductdetail((prevState) => ({
        ...prevState,
        colorname: productdetail.colorname,
        colorvalue: productdetail.colorvalue,
        size: productdetail.size,
        image: productdetail.image,
      }));
    }
  };

  const csDetail = (cstdetail) => {
    if (cstdetail) {
      setCstdetail((prevState) => ({
        ...prevState,
        firstName: cstdetail.firstName,
        lastName: cstdetail.lastName,
        email: cstdetail.email,
        phone: cstdetail.phone,
        address: cstdetail.address,
      }));
      handleNext();
      console.log(cstdetail);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PdDetail pdDetail={pdDetail} product={product} />;
      case 1:
        return <CustomerForm csDetail={csDetail} />;
      case 2:
        return <Checkout productdetail={productdetail} cstdetail={cstdetail} />;
      default:
        return "Unknown step";
    }
  }

  return (
    <div>
      <Page title="Product Detail">
        <Container>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const buttonProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <div>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
              </div>
            ) : (
              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep === 2 || activeStep === 1 ? (
                    <div></div>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}

                  {activeStep !== steps.length &&
                    (completed.has(activeStep) ? (
                      <Typography variant="caption">
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <div>
                        {activeStep === 2 ? (
                          // <Typography>
                          //   {/* Place order. */}
                          // </Typography>
                          <div>
                            {login === "true" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleComplete}
                              >
                                Place Order
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                              >
                                Please Login
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Page>
    </div>
  );
}
