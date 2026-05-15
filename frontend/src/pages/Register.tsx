import API from "../services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const [form, setForm ] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            await API.post('/auth/register', form )
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-6 shadow-lg rounded-xl"> 
                <h1 className="text-3xl font-bold">
                    Register
                </h1>

                <input type="username" name="username" placeholder="username" value={form.username} onChange={handleChange} className="border p-2 rounded" />
                <input type="email" name="email" placeholder="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
                <input type="password" name="password" placeholder="password" value={form.password} onChange={handleChange} className="border p-2 rounded" />

                <button className="bg-black text-white p-2 rounded" > Register </button>

            </form>
        </div>
    )


}

export default Register