const sendEmail = require("../utils/sendEmail");

const bookDemo = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const message = `
    New Demo Booking Request:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
  `;

  try {
    await sendEmail("abhinavdivyansh82@gmail.com", "New Demo Booking", message);
    res.status(200).json({ message: "Demo request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send demo email" });
  }
};

module.exports = {bookDemo};