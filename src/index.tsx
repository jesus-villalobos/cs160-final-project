import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "jotai";
import { appStore } from "./state/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
