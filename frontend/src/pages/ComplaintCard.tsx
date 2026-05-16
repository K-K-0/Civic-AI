interface Complaint {
  title: string
  description: string
  priority: string
  status: string
  category?: string
  sentiment?: string
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700"
  }

  return (
    <div className="border border-gray-100 bg-gray-50 hover:bg-white transition-all duration-300 rounded-3xl p-6 shadow-sm hover:shadow-xl">

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {complaint.title}
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {complaint.description}
          </p>

        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {complaint.status}
        </span>

      </div>

      {/* TAGS */}
      <div className="flex gap-3 flex-wrap mt-6">

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            priorityColor[
              complaint.priority as keyof typeof priorityColor
            ]
          }`}
        >
          {complaint.priority} Priority
        </span>

        {
          complaint.category && (
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              {complaint.category}
            </span>
          )
        }

        {
          complaint.sentiment && (
            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
              {complaint.sentiment}
            </span>
          )
        }

      </div>

    </div>
  )
}

export default ComplaintCard