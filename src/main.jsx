import "./index.css";

import React, { Suspense } from "react";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LazyLoading from "./components/LazyLoading/LazyLoading";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode/>
  <Suspense fallback={<LazyLoading />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
  /* </React.StrictMode> */
);
