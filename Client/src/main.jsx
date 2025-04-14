import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
//Import Register Licence from syncfusion
import { registerLicense } from "@syncfusion/ej2-base";
// Import Syncfusion CSS
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-notifications/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhdcHRVQmVeV0F3Wks="
);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <QueryClientProvider client={queryClient}>
            <ToastContainer/>
            <App />
          </QueryClientProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
