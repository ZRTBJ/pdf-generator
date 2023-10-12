import React from "react";
import { usePDF } from "react-to-pdf";
import PDFContent from "./components/pdf";
import { Print } from "./icons";
import "./App.css";

function App() {
  const { toPDF, targetRef } = usePDF({ filename: "research.pdf" });
  return (
    <div className="App">
      <div className="button_wrapper">
        <button className="print_button" onClick={() => toPDF()}>
          <Print /> Print
        </button>
      </div>
      <div ref={targetRef} className="pdf_content">
        <PDFContent />
      </div>
    </div>
  );
}

export default App;
