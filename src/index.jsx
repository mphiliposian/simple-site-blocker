import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Popup } from "./components/Popup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
);
