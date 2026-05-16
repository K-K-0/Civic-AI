import API from "../services/api"
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight
} from "react-icons/fa"

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
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

      await API.post(
        "/auth/register",
        form
      )

      navigate("/")

    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-indigo-100 flex items-center justify-center p-6">

      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 to-green-700 text-white p-14 relative overflow-hidden">

          {/* GLOW EFFECTS */}
          <div className="absolute w-80 h-80 bg-white/10 rounded-full top-[-100px] right-[-100px]"></div>

          <div className="absolute w-56 h-56 bg-white/10 rounded-full bottom-[-50px] left-[-50px]"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            {/* LOGO */}
            <div className="flex items-center gap-4 mb-10">

              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg">

                <FaLeaf size={30} />

              </div>

              <div>

                <h1 className="text-4xl font-black">
                  Civic AI
                </h1>

                <p className="text-green-100 mt-1">
                  Smart Civic Intelligence
                </p>

              </div>

            </div>

            {/* TITLE */}
            <h2 className="text-5xl font-black leading-tight">

              Join The Future
              <br />
              Of Civic Technology

            </h2>

            {/* DESCRIPTION */}
            <p className="mt-8 text-lg text-green-100 leading-relaxed">

              Create your account and become part of an AI-powered
              civic complaint monitoring platform designed to improve
              urban governance and community engagement.

            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-4">

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ AI Complaint Classification

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ Smart Priority Analysis

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">

                ✓ Civic Intelligence Dashboard

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-10">

            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-3 rounded-2xl text-white shadow-lg">

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
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Register to access your AI civic dashboard
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* USERNAME */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Username

              </label>

              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">

                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Email Address

              </label>

              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
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

              <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">

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
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:scale-[1.01] transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 text-lg"
            >

              Create Account

              <FaArrowRight />

            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-8 text-center">

            <p className="text-gray-500">

              Already have an account?

              <Link
                to="/"
                className="ml-2 text-emerald-600 font-bold hover:text-emerald-800 transition-all duration-300"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register