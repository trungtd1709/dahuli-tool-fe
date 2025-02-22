import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UploadPage } from "./pages/UpLoadPage";
import { TablePage } from "./pages/TablePage";
import { AppLayout } from "./components/AppLayout";
import { NotePage } from "./pages/NotePage";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/luu-y" element={<NotePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> For 404 */}
      </Routes>
    </AppLayout>
  );
};

export default App;
