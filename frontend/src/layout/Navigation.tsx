import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "~/pages";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
