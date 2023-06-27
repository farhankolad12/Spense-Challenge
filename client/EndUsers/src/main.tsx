import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./context/AppContext.tsx";
import AuthContext from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContext>
      <AppContext>
        <App />
      </AppContext>
    </AuthContext>
  </BrowserRouter>
  // </React.StrictMode>
);
