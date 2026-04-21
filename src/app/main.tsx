import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProviders } from "./providers/AppProviders.tsx";
import { App } from "@/app/App.tsx";

import "@/styles/reset.css";
import "@/styles/themes.css";
import "@/styles/styles.css";
import "@/styles/variables.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
