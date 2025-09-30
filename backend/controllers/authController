// POST: login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username, password });
    if (!customer) return res.status(401).json({ error: "Invalid credentials" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};