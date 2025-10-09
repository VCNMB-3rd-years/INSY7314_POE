const jwt = require("jsonwebtoken");
require("dotenv").config(); // make sure .env is loaded

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1paGxlTSIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NjAwMjIxMzksImV4cCI6MTc2MDAyNTczOX0.dZFqVFhAto-DcHrFz-4p93XQ9ShwcO9s5cU-AVg4LbI";

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded token:", decoded);
} catch (err) {
  console.error("Token verification failed:", err.message);
}
