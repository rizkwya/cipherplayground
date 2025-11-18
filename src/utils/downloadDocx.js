// src/utils/downloadDocx.js
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, ShadingType } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Download a valid .docx file using docx library with styled tables
 * @param {Object} options
 * @param {string} options.content - Main content (string, can use \n)
 * @param {string} options.filename - File name for download
 * @param {Object} options.metadata - Metadata object (method, mode, etc)
 * @param {Function} options.showError - Error handler
 */
export async function downloadDocx({ content, filename, metadata, showError }) {
  try {
    // Title
    const title = new Paragraph({
      children: [
        new TextRun({ text: 'CIPHER PLAYGROUND REPORT', bold: true, size: 32, color: '8B5CF6' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    });

    // Metadata Table
    const metaRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Parameter', bold: true })],
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: '8B5CF6' },
            width: { size: 20, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Value', bold: true })],
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: '8B5CF6' },
            width: { size: 80, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
      ...Object.entries(metadata).map(([k, v]) => new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: k })],
            width: { size: 20, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph({ text: String(v) })],
            width: { size: 80, type: WidthType.PERCENTAGE },
          }),
        ],
      })),
    ];
    const metaTable = new Table({
      rows: metaRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
    });

    // Input/Output Table
    const ioRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Type', bold: true })],
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'EC4899' },
            width: { size: 20, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Text', bold: true })],
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'EC4899' },
            width: { size: 80, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Input')], width: { size: 20, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph(content.split('\n')[0] || '-')], width: { size: 80, type: WidthType.PERCENTAGE } }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Output')], width: { size: 20, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph(content.split('\n').slice(1).join('\n') || '-')], width: { size: 80, type: WidthType.PERCENTAGE } }),
        ],
      }),
    ];
    const ioTable = new Table({
      rows: ioRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [title, metaTable, new Paragraph({}), ioTable],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  } catch (error) {
    showError('Error membuat DOCX: ' + error.message);
    console.error(error);
  }
}
