import React from 'react'
import { Provider } from "react-redux";
import { useStore } from "../store";

import ThemeConfig from "../theme";
import DashboardLayout from "../layouts/dashboard";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Router from "next/router";
import { CircularProgress } from "@material-ui/core";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
   
      <Provider store={store}>
        <ThemeConfig>
          <DashboardLayout>
            {
              loading ? (<CircularProgress /> ):( <Component {...pageProps} />)
            }
           
          </DashboardLayout>
        </ThemeConfig>
      </Provider>
 
  );
}
