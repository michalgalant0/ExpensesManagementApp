import React, { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios"

const LoginForm = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = "http://localhost:8080/api/person/login"
            const { data: res } = await axios.post(url, data)
            sessionStorage.setItem('person_id', res.personId)
            window.location = "/"
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
                <h2>login form</h2>
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
                <button type="submit">login</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                <Link to="/register">register</Link>
            </div>
        </div>
    )
}
export default LoginForm
