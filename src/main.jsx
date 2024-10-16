import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { Toaster } from "react-hot-toast";
import MainContext from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <MainContext>
        <Router>
          <App />
        </Router>
        <Toaster position="top-center" reverseOrder={false} />
      </MainContext>
    </Provider>
  </BrowserRouter>
);
