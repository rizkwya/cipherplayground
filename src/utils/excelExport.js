// src/utils/excelExport.js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/**
 * Export data as an Excel file (.xlsx) with advanced styling using exceljs
 * @param {Object} options
 * @param {Object} options.metadata - Metadata object (method, mode, etc)
 * @param {string} options.input - Input text
 * @param {string} options.output - Output text
 * @param {string} options.filename - File name for download
 */
export async function exportToExcel({ metadata, input, output, filename }) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cipher Report');

  // Title
  sheet.mergeCells('A1:B1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'CIPHER PLAYGROUND REPORT';
  titleCell.font = { size: 16, bold: true, color: { argb: 'FF8B5CF6' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.addRow([]);

  // Metadata Table
  const metaHeader = sheet.addRow(['Parameter', 'Value']);
  metaHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  metaHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8B5CF6' } };
  metaHeader.alignment = { vertical: 'middle', horizontal: 'center' };
  for (const [k, v] of Object.entries(metadata)) {
    const row = sheet.addRow([k, String(v)]);
    row.alignment = { vertical: 'middle', horizontal: 'left' };
  }
  sheet.addRow([]);

  // Input/Output Table
  const ioHeader = sheet.addRow(['Type', 'Text']);
  ioHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  ioHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEC4899' } };
  ioHeader.alignment = { vertical: 'middle', horizontal: 'center' };
  const inputRow = sheet.addRow(['Input', input || '-']);
  inputRow.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
  const outputRow = sheet.addRow(['Output', output || '-']);
  outputRow.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

  // Set column widths
  sheet.getColumn(1).width = 18;
  sheet.getColumn(2).width = 60;

  // Add border to all cells
  sheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
      };
    });
  });

  // Save as file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), filename);
}
