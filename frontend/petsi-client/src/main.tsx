import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyles from "./shared/styles/GlobalStyles";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <GlobalStyles />
        <App />
    </StrictMode>
);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
            console.log(registration);
        })
        .catch(function (err) {
            console.error("Service Worker registration failed: ", err);
        });
}
