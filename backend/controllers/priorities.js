const modelPriorities = require("../models/priorities");

module.exports = {
  createPriority,
};

async function createPriority(req, res) {
  try {
    const priorityData = req.body;

    // Validate userId
    //   const user = await modelUsers.getUser(reviewData.userId);
    //   if (!user) {
    //     return res.status(400).json({ errorMsg: "Invalid user ID" });
    //   }

    const priority = await modelPriorities.createPriority(priorityData);
    res.status(201).json(priority); // Return the created review
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}
