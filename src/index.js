import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./shared/App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
