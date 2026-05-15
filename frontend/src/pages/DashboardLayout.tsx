import { Link, useNavigate } from "react-router-dom"

import {
  FaHome,
  FaPlusCircle,
  FaSignOutAlt
} from "react-icons/fa"
import type React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children } : DashboardLayoutProps ) {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Civic AI
        </h1>

        <div className="flex flex-col gap-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <FaPlusCircle />
            Create Complaint
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-3 mt-10 text-left"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {children}

      </div>
    </div>
  )
}

export default DashboardLayout