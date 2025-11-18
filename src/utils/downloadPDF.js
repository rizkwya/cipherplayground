// src/utils/downloadPDF.js
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Download PDF with table layout for metadata, input, and output
 * @param {Object} options
 * @param {string} options.content - Output text
 * @param {string} options.cipherMethod - Cipher method name
 * @param {string} options.filename - File name for download
 * @param {Object} [options.metadata] - Metadata object (optional)
 * @param {string} [options.input] - Input text (optional)
 * @param {Function} options.showError - Error handler
 */
export async function downloadPDF({ content, cipherMethod, filename, metadata = {}, input = '', showError }) {
  try {
    const doc = new jsPDF();
    const title = `Dokumen Enkripsi/Dekripsi (${cipherMethod.toUpperCase()})`;
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(16);
    doc.text(title, 10, 15);
    doc.setFontSize(10);
    doc.text(`Waktu: ${timestamp}`, 10, 23);

    // Metadata table
    if (metadata && Object.keys(metadata).length > 0) {
      autoTable(doc, {
        startY: 30,
        head: [['Parameter', 'Value']],
        body: Object.entries(metadata).map(([k, v]) => [k, String(v)]),
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] },
        styles: { fontSize: 10 },
      });
    }
    let y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 38;

    // Input/Output table
    autoTable(doc, {
      startY: y,
      head: [['Type', 'Text']],
      body: [
        ['Input', input || '-'],
        ['Output', content || '-'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [236, 72, 153] },
      styles: { fontSize: 10, cellWidth: 'wrap' },
      columnStyles: { 1: { cellWidth: 140 } },
    });

    doc.save(filename);
  } catch (error) {
    showError("Error membuat PDF: " + error.message);
    console.error(error);
  }
}
