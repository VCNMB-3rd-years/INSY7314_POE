const bcrypt = require("bcryptjs");

(async () => {
  const plain = "Mihle!Mnc123"; // must be exactly what you typed in Postman
  const hashed = "$2b$10$X5hqOmMH.GCQlPpeaYbhTeSNgE/CwP0C55sBPSJWC1RWow25sTNDW" // paste from MongoDB

  const result = await bcrypt.compare(plain, hashed);
  console.log("Password matches?", result);
})();
