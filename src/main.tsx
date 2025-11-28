import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "./slices/productSlice.ts";

store.dispatch(fetchProducts());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-3oukfrbkwe6akdfm.us.auth0.com"
      clientId="pV74Eg5ecegC1Iu5zK90w8kfJRubcBX2"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/home",
      }}
      cacheLocation="localstorage"
  useRefreshTokens={true}
    >
      
      <Provider store={store}>
        <App />
        <ToastContainer position="top-right" autoClose={2000} />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);