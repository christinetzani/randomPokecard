// this code sets up the entry point for your React application
// it finds the root HTML element on the page,
// and renders the App component within that element, wrapped in StrictMode for additional checks.

import { StrictMode } from "react";
// `StrictMode` is a tool that helps you write better React code by highlighting potential problems in your application.
// It doesn't render anything visible on the page; it's more of a development aid.

import { createRoot } from "react-dom/client";
// `createRoot` is used to create a root React element in your application
// which is where your entire React component tree will be rendered.
// root React element => the starting point/container for your entire React application within the DOM

import App from "./App";
// This line gets the HTML element with the id root from your HTML document.
// This element is where the React application will be injected and displayed in the browser.

const rootElement = document.getElementById("root");
// createRoot creates a React root associated with the `rootElement` (the HTML element with id root). This root is the starting point for rendering your React application.
const root = createRoot(rootElement);

root.render(
  // ^ reders the React application
  <StrictMode>
    {" "}
    {/* wraps the App component in StrictMode for additional checks */}
    <App />
  </StrictMode>
);
