import ReactDOM from "react-dom";

import App from "~/layout/App";

const container = document.getElementById("root");
// @ts-ignore - No types for React 18 yet
const root = ReactDOM.createRoot(container);

root.render(<App />);
