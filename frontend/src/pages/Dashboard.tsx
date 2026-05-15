import { useEffect, useState } from "react"
import API from "../services/api"
import DashboardLayout from "./DashboardLayout"
import ComplaintCard from "./ComplaintCard"

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
      console.log(res)
      setComplaints(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

      <h1 className="text-5xl font-bold mb-10">
        Civic Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500">
            Total Complaints
          </h2>

          <p className="text-4xl font-bold mt-2">
            {complaints.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500">
            High Priority
          </h2>

          <p className="text-4xl font-bold mt-2">

            {
              complaints.filter(
                c => c.priority === "High"
              ).length
            }

          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-2">

            {
              complaints.filter(
                c => c.status === "Pending"
              ).length
            }

          </p>

        </div>

      </div>

      {/* COMPLAINT FEED */}
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

    </DashboardLayout>
  )
}

export default Dashboard