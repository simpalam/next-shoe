import { Provider } from "react-redux";
import { useStore } from "../store";

import ThemeConfig from "../theme";
import DashboardLayout from "../layouts/dashboard";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
   
      <Provider store={store}>
        <ThemeConfig>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </ThemeConfig>
      </Provider>
 
  );
}
