import React, { useState } from "react";
import { exportToCSV, exportToPDF } from "../utils/exportUtils.js";
import "./ExportMenu.css";

function ExportMenu({ habits }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCSVExport = () => {
    setIsExporting(true);
    try {
      exportToCSV(habits);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const handlePDFExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(habits);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="export-menu-container">
      <button
        className="export-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Export habits data"
        disabled={isExporting}
      >
        📥 {isExporting ? "Exporting..." : "Export"}
      </button>

      {isOpen && (
        <div className="export-dropdown">
          <button
            className="export-option"
            onClick={handleCSVExport}
            disabled={isExporting}
          >
            📊 Export as CSV
          </button>
          <button
            className="export-option"
            onClick={handlePDFExport}
            disabled={isExporting}
          >
            📄 Export as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default ExportMenu;
