import React, { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"


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
    const [ data, setData ] = useState<Inputface>({
        title: "",
        description: ""
    })

    const [prediction, setPrediction] = useState<PredictionData | null >(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await API.post('/complaints/complaint', data)
            setPrediction(res.data.prediction)
            console.log(res)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-6 shadow-lg rounded-xl"> 
                <h1 className="text-3xl font-bold">
                    Create Complaint
                </h1>

                <input type="text" name="title" placeholder="Title" onChange={handleChange} className="border p-2 rounded" />
               <textarea
            name="description"
            placeholder="Describe the issue..."
            rows={6}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

                <button className="bg-black text-white p-2 rounded" > complaint </button>

            </form>

            { prediction && (

                <div className="mt-8 bg-white shadow-xl p-6 rounded-2xl">

                    <h2 className="text-2xl font-bold mb-4">
                    AI Predictions
                    </h2>

                    <div className="space-y-3"> 
                        <p >
                            <span className="font-bold">
                                Category: 
                            </span>{" "}
                            {prediction.category}
                            
                             <span className="font-bold">
                                Priority:  
                            </span>{" "}
                            {prediction.priority}

                             <span className="font-bold">
                                Sentiment: 
                            </span>{" "}
                            {prediction.sentiment}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateComplaint;