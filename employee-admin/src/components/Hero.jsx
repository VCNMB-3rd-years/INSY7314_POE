// src/components/Hero.jsx
import { useState } from "react";
import { Shield, Database, Code, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyCode = () => {
    const code = `// Secure Payment API Endpoint
app.post('/api/payments', 
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
  helmet(),
  csrf({ cookie: true }),
  async (req, res) => {
    // Secure payment processing logic
    const hashedPassword = await bcrypt.hash(password, 12);
    // Transaction validation and storage
  }
);`;

    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="p-8 lg:p-12 lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-blue-600" size={24} />
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  BANKING SECURITY PROJECT
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Secure International{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Payments Portal
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                A React-based secure banking application for international
                payments with SWIFT integration, featuring advanced security
                measures, employee verification portals, and comprehensive
                threat protection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Code size={20} />
                  Admin Login
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="group border-2 border-blue-600 text-blue-600 font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Database size={20} />
                  Employee Login
                </button>
              </div>
            </div>

            {/* Right Content - Security Dashboard */}
            <div className="p-8 lg:p-12 lg:w-1/2 bg-gray-50 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="relative group">
                  {/* Security Dashboard Preview */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>

                    {/* Security Status */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-800">
                            SQL Injection Protection
                          </span>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-800">
                            XSS Protection
                          </span>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-800">
                            Session Security
                          </span>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-800">
                            DDoS Protection
                          </span>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-800">
                            Clickjacking Protection
                          </span>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          Active
                        </span>
                      </div>

                      {/* Code Snippet */}
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative">
                        <button
                          onClick={copyCode}
                          className="absolute top-2 right-2 flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white py-1 px-2 rounded text-xs transition-colors"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <pre>
                          <code>{`// Rate limiting & CSRF protection
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(helmet());
app.use(csrf({ cookie: true }));`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
