// src/components/LoginPage.jsx
import React, { useState } from "react";
import { ArrowLeft, User, Lock, Building, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "../data/demoData";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Find user in demo data
    const users =
      selectedRole === "admin" ? demoUsers.admin : demoUsers.employee;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log("Login successful:", user);
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
  };

  // Admin Form Component
  const AdminForm = () => (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-purple-600" size={32} />
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Admin Portal
          </h2>
          <p className="text-gray-600 text-sm">System Administrator Access</p>
        </div>
      </div>

      <p className="text-gray-600 mb-8 text-sm lg:text-base">
        <strong>Administrative Access:</strong> Log in with your admin
        credentials to access system controls and user management.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Username
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="admin-remember"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label
            htmlFor="admin-remember"
            className="ml-2 text-sm text-gray-600"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Admin Login
        </button>
      </form>
    </div>
  );

  // Employee Form Component
  const EmployeeForm = () => (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Building className="text-blue-600" size={32} />
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Employee Portal
          </h2>
          <p className="text-gray-600 text-sm">Staff Member Access</p>
        </div>
      </div>

      <p className="text-gray-600 mb-8 text-sm lg:text-base">
        <strong>Employee Access:</strong> Log in with your employee credentials
        to access payment processing and customer management.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID / Email
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="employee-remember"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="employee-remember"
            className="ml-2 text-sm text-gray-600"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Employee Login
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Role Selection */}
            <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 lg:p-12">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-blue-100 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>

              <h1 className="text-3xl lg:text-4xl font-bold mb-6">Log in as</h1>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleChange("employee")}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedRole === "employee"
                      ? "border-white bg-white/10"
                      : "border-blue-500/30 hover:border-white/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Employee</span>
                    <span className="text-2xl">→</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange("admin")}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedRole === "admin"
                      ? "border-white bg-white/10"
                      : "border-blue-500/30 hover:border-white/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Admin</span>
                    <span className="text-2xl">→</span>
                  </div>
                </button>
              </div>

              <div className="mt-12 text-center">
                <div className="text-white font-semibold text-lg">Coinnect</div>
              </div>
            </div>

            {/* Right Side - Dynamic Form */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              {selectedRole === "admin" ? <AdminForm /> : <EmployeeForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
