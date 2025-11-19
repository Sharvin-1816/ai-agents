const xlsx = require("xlsx");
const Contact = require("../models/excelModel");

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read Excel file from buffer (NOT from disk)
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    let jsonData = xlsx.utils.sheet_to_json(sheet);

    if (!jsonData.length) {
      return res.status(400).json({ error: "Excel sheet is empty" });
    }

    // Normalize & map keys
    const formattedData = jsonData.map((row) => ({
      name: row.Name || row.name || "",
      mobile: row.Mobile || row.mobile || "",
      email: row.Email || row.email || "",
      state: row.State || row.state || "",
      city: row.City || row.city || "",
    }));

    // Store in MongoDB
    await Contact.insertMany(formattedData);

    res.json({
      message: "Excel uploaded & parsed successfully!",
      inserted: formattedData.length,
    });

  } catch (err) {
    console.error("Excel Parse Error:", err);
    res.status(500).json({ error: "Failed to parse Excel file" });
  }
};
