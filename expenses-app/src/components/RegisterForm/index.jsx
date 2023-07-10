import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const RegisterForm = () => {
    const [data, setData] = useState({
        nickname: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/person/register"
            await axios.post(url, data)
            window.location = '/'
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>create Account</h2>
                <input
                    type="text"
                    placeholder="nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={data.nickname}
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                />
                <button type="submit">register</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                <Link to="/login">login</Link>
            </div>
        </div>
    )
}
export default RegisterForm
