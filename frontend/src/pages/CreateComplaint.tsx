import React, { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

import {
  FaRobot,
  FaLeaf,
  FaExclamationTriangle,
  FaSmile
} from "react-icons/fa"

interface Complaint {
  id: string;
  title: string;
  description: string;
}

interface PredictionData {
  category: string;
  priority: string
  sentiment: string
}

type Inputface = Omit<Complaint, "id">

function CreateComplaint() {

  const navigate = useNavigate()

  const [data, setData] = useState<Inputface>({
    title: "",
    description: ""
  })

  const [prediction, setPrediction] =
    useState<PredictionData | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >
  ) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/complaints/complaint",
        data
      )

      setPrediction(res.data.prediction)

      console.log(res)

      navigate("/dashboard")

    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg">

                <FaRobot size={28} />

              </div>

              <div>

                <h1 className="text-4xl font-black text-gray-800">
                  AI Complaint Portal
                </h1>

                <p className="text-gray-500 mt-1">
                  Submit civic issues for AI analysis
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* TITLE */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Complaint Title

              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter complaint title"
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-300 p-4 rounded-2xl outline-none"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">

                Description

              </label>

              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                rows={7}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-300 p-4 rounded-2xl outline-none resize-none"
              />

            </div>

            {/* BUTTON */}
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] transition-all duration-300 text-white py-4 rounded-2xl font-bold shadow-xl text-lg"
            >

              Analyze Complaint

            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center">

          {
            prediction ? (

              <div className="bg-white rounded-3xl shadow-2xl p-10">

                <div className="flex items-center gap-3 mb-8">

                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">

                    <FaRobot size={28} />

                  </div>

                  <div>

                    <h2 className="text-4xl font-black text-gray-800">
                      AI Predictions
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Intelligent civic analysis result
                    </p>

                  </div>

                </div>

                {/* PREDICTIONS */}
                <div className="space-y-5">

                  {/* CATEGORY */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="bg-indigo-500 text-white p-3 rounded-xl">

                        <FaLeaf />

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
                          Category
                        </p>

                        <h3 className="text-xl font-bold text-gray-800">
                          {prediction.category}
                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* PRIORITY */}
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="bg-red-500 text-white p-3 rounded-xl">

                        <FaExclamationTriangle />

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
                          Priority
                        </p>

                        <h3 className="text-xl font-bold text-gray-800">
                          {prediction.priority}
                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* SENTIMENT */}
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="bg-green-500 text-white p-3 rounded-xl">

                        <FaSmile />

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
                          Sentiment
                        </p>

                        <h3 className="text-xl font-bold text-gray-800">
                          {prediction.sentiment}
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ) : (

              <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-xl">

                  <FaRobot size={40} />

                </div>

                <h2 className="text-4xl font-black text-gray-800 mt-8">
                  AI Analysis Ready
                </h2>

                <p className="text-gray-500 mt-4 text-lg leading-relaxed">

                  Submit a complaint and our AI system will automatically predict:

                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">

                  <span className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-full font-semibold">
                    Category Detection
                  </span>

                  <span className="bg-red-100 text-red-700 px-5 py-3 rounded-full font-semibold">
                    Priority Analysis
                  </span>

                  <span className="bg-green-100 text-green-700 px-5 py-3 rounded-full font-semibold">
                    Sentiment Detection
                  </span>

                </div>

              </div>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default CreateComplaint