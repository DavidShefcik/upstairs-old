import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "~/pages";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
