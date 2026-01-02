import { createRoot } from "react-dom/client";
import App from "./App";
import ComingSoon from "./ComingSoon";
import "./index.css";

const comingSoon = import.meta.env.VITE_TB_COMING_SOON === "true";
const previewKey = import.meta.env.VITE_TB_PREVIEW_KEY;

const params = new URLSearchParams(window.location.search);
const isPreview = params.get("preview") === previewKey;

createRoot(document.getElementById("root")!).render(
  comingSoon && !isPreview ? <ComingSoon /> : <App />
);

