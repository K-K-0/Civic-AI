import { useEffect, useState } from "react"
import API from "../services/api"
import DashboardLayout from "./DashboardLayout"
import ComplaintCard from "./ComplaintCard"

import {
  FaExclamationTriangle,
  FaClock,
  FaChartBar
} from "react-icons/fa"

interface Complaint {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High"
  status: "Pending" | "In Progress" | "Resolved"
}

function Dashboard() {

  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {

    try {

      const res = await API.get("/complaints/get")

      setComplaints(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

     
      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-xl text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-80">
                Total Complaints
              </p>

              <h2 className="text-5xl font-black mt-2">
                {complaints.length}
              </h2>

            </div>

            <FaChartBar size={40} />

          </div>

        </div>

        {/* HIGH PRIORITY */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-3xl shadow-xl text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-80">
                High Priority
              </p>

              <h2 className="text-5xl font-black mt-2">

                {
                  complaints.filter(
                    c => c.priority === "High"
                  ).length
                }

              </h2>

            </div>

            <FaExclamationTriangle size={40} />

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-3xl shadow-xl text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-80">
                Pending Issues
              </p>

              <h2 className="text-5xl font-black mt-2">

                {
                  complaints.filter(
                    c => c.status === "Pending"
                  ).length
                }

              </h2>

            </div>

            <FaClock size={40} />

          </div>

        </div>

      </div>

      {/* COMPLAINT SECTION */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Recent Complaints
            </h2>

            <p className="text-gray-500 mt-1">
              AI analyzed civic complaints from users
            </p>

          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-2xl text-gray-700 font-semibold">

            {complaints.length} Records

          </div>

        </div>

        {/* EMPTY STATE */}
        {
          complaints.length === 0 && (

            <div className="flex flex-col items-center justify-center py-20">

              <h3 className="text-2xl font-bold text-gray-700">
                No Complaints Found
              </h3>

              <p className="text-gray-500 mt-2">
                Start by submitting a civic issue.
              </p>

            </div>
          )
        }

        {/* COMPLAINT LIST */}
        <div className="space-y-6">

          {
            complaints.map((complaint) => (

              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />

            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Dashboard