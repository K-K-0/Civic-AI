import { Link, useNavigate, useLocation } from "react-router-dom"

import {
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaLeaf
} from "react-icons/fa"

import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({
  children
}: DashboardLayoutProps) {

  const navigate = useNavigate()

  const location = useLocation()

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/")
  }

  const navItemClass = (path: string) => {

    return `
      flex items-center gap-4 px-5 py-4 rounded-2xl
      transition-all duration-300
      ${
        location.pathname === path
          ? "bg-white/20 text-white shadow-lg"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }
    `
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex">

      {/* SIDEBAR */}
      <aside className="w-72 sticky top-0 h-screen bg-black/90 backdrop-blur-xl text-white flex flex-col justify-between p-6 shadow-2xl border-r border-white/10">

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-14">

            <div className="bg-gradient-to-r from-emerald-400 to-green-600 p-3 rounded-2xl shadow-lg">

              <FaLeaf size={22} />

            </div>

            <div>

              <h1 className="text-3xl font-black tracking-tight">
                Civic AI
              </h1>

              <p className="text-gray-400 text-sm">
                Smart Civic Intelligence
              </p>

            </div>

          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-4">

            <Link
              to="/dashboard"
              className={navItemClass("/dashboard")}
            >

              <FaHome size={18} />

              <span className="font-semibold">
                Dashboard
              </span>

            </Link>

            <Link
              to="/create"
              className={navItemClass("/create")}
            >

              <FaPlusCircle size={18} />

              <span className="font-semibold">
                Create Complaint
              </span>

            </Link>

          </nav>

        </div>

        {/* BOTTOM */}
        <div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6">

            <p className="text-sm text-gray-400">
              AI Civic Monitoring
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Active System
            </h2>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

              <span className="text-green-300 text-sm">
                Online
              </span>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl font-semibold shadow-lg"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* TOP BAR */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 px-10 py-5 flex items-center justify-between shadow-md">

          <div>

            <h1 className="text-2xl font-black text-gray-800">
              Civic Intelligence Platform
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              AI-powered civic complaint management system
            </p>

          </div>

         
        </header>

        {/* PAGE CONTENT */}
        <div className="p-10">

          {children}

        </div>

      </main>

    </div>
  )
}

export default DashboardLayout