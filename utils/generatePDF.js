const PDFDocument = require("pdfkit");

/**
 * Generates a PDF and pipes it to the given writable stream.
 * @param {Object} buyerData - Data to include in the PDF.
 * @param {WritableStream} stream - The writable stream (e.g., res for HTTP response).
 */
function generateBuyerPDF(buyerData, stream) {
  const doc = new PDFDocument();

  doc.pipe(stream);

  doc.fontSize(20).text("Buyer Details", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Name: ${buyerData.name || ""}`);
  doc.text(`Email: ${buyerData.email || ""}`);
  doc.text(`Phone: ${buyerData.phone || ""}`);
  doc.text(`Address: ${buyerData.address || ""}`);
  // Add more fields as needed

  doc.end();
}

module.exports = generateBuyerPDF;