import Customer from "../../../../models/Customer";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ status: "failed", message: "Error connecting to DB" });
    return;
  }

  if (req.method === "PATCH") {
    const id = req.query.customerId;
    const data = req.body;

    try {
      const customer = await Customer.findOne({ _id: id });
      customer.fullName = data.fullName;
      customer.phone = data.phone;
      customer.email = data.email;
      customer.updatedAt = Date.now();
      await customer.save();
      res.status(200).json({ status: "success", data: customer });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }
}