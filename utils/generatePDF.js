const PDFDocument = require("pdfkit");

/**
 * Generate a PDF for a buyer and pipe it to the given stream (usually `res`)
 * @param {Object} buyer - Buyer data from MongoDB
 * @param {WritableStream} res - Express response object
 */
function generateBuyerPDF(buyer, res) {
  const doc = new PDFDocument();

  // Pipe to response
  doc.pipe(res);

  doc.fontSize(20).text("Buyer Details", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Name: ${buyer.name || ""}`);
  doc.text(`Phone: ${buyer.phoneNumber || ""}`);
  doc.text(`Email: ${buyer.email || ""}`);
  doc.text(`Aadhar: ${buyer.aadhar || ""}`);
  doc.text(`PAN: ${buyer.pan || ""}`);
  doc.text(`Negotiation Price: ₹${buyer.negotiationPrice || 0}`);
  doc.text(`Commission: ₹${buyer.commission || 0}`);
  doc.text(`RTO Charges: ₹${buyer.rtoCharges || 0}`);
  doc.text(`Balance: ₹${buyer.balance || 0}`);
  doc.text(`Address: ${buyer.address || ""}`);
  doc.text(`Out Date: ${new Date(buyer.outDate).toLocaleDateString()}`);
  doc.end(); // Automatically ends the stream
}

module.exports = generateBuyerPDF;
