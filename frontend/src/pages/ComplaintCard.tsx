export interface Complaint {
    id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High"
    category?: string;
    sentiment?: string 
    status: "Pending" | "In Progress" | "Resolved"
}


interface cardComplaint {
    complaint: Complaint;
}

function ComplaintCard({ complaint } : cardComplaint) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {complaint.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {complaint.description}
          </p>

        </div>

        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
          {complaint.status}
        </span>

      </div>

      <div className="flex gap-3 mt-5 flex-wrap">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {complaint.category}
        </span>

        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
          {complaint.priority}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {complaint.sentiment}
        </span>

      </div>

    </div>
  )
}

export default ComplaintCard