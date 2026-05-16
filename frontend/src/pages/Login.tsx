import API from "../services/api"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  FaLeaf,
  FaEnvelope,
  FaLock,
  FaArrowRight
} from "react-icons/fa"

function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/auth/login",
        form
      )

      localStorage.setItem(
        "token",
        res.data.access_token
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-14 relative overflow-hidden">

          {/* BACKGROUND GLOW */}
          <div className="absolute w-72 h-72 bg-white/10 rounded-full top-[-60px] right-[-60px]"></div>

          <div className="absolute w-52 h-52 bg-white/10 rounded-full bottom-[-40px] left-[-40px]"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-8">

              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg">

                <FaLeaf size={30} />

              </div>

              <div>

                <h1 className="text-4xl font-black">
                  Civic AI
                </h1>

                <p className="text-indigo-100 mt-1">
                  Smart Civic Intelligence
                </p>

              </div>

            </div>

            <h2 className="text-5xl font-black leading-tight">

              AI Powered
              <br />
              Civic Monitoring

            </h2>

            <p className="mt-8 text-lg text-indigo-100 leading-relaxed">

              Analyze complaints using machine learning,
              monitor civic issues, and improve urban governance
              with intelligent predictions.

            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-4">

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ AI Complaint Classification

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ Smart Priority Detection

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ Sentiment Analysis Dashboard

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-10">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl text-white shadow-lg">

              <FaLeaf size={22} />

            </div>

            <div>

              <h1 className="text-3xl font-black text-gray-800">
                Civic AI
              </h1>

              <p className="text-gray-500 text-sm">
                Smart Civic Intelligence
              </p>

            </div>

          </div>

          {/* HEADER */}
          <div className="mb-10">

            <h2 className="text-5xl font-black text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Login to access your AI civic dashboard
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Email Address

              </label>

              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Password

              </label>

              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 text-lg"
            >

              Login

              <FaArrowRight />

            </button>

          </form>

          {/* REGISTER */}
          <div className="mt-8 text-center">

            <p className="text-gray-500">

              Don’t have an account?

              <Link
                to="/register"
                className="ml-2 text-indigo-600 font-bold hover:text-indigo-800 transition-all duration-300"
              >

                Create Account

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login