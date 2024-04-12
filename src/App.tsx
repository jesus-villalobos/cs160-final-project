import React from "react";
import { Button } from "antd";

const App: React.FC = () => (
    <div className="App">
        <Button type="primary" onClick={() => console.log("hello")}>
            Button
        </Button>
    </div>
);

export default App;
