import API from "../services/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const [form, setForm ] = useState({
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
            const res = await API.post('/auth/login', form )
            localStorage.setItem("token", res.data.access_token)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-6 shadow-lg rounded-xl"> 
                <h1 className="text-3xl font-bold">
                    Login
                </h1>

                
                <input type="text" name="email" placeholder="email" value={form.email}  onChange={handleChange} className="border p-2 rounded" />

                <input type="password" name="password" placeholder="password" value={form.password} onChange={handleChange} className="border p-2 rounded" />

                <button className="bg-black text-white p-2 rounded" > Login </button>

                <Link to="/register" className="text-blue-500" > Create Account </Link>
            </form>
        </div>
    )


}

export default Login;