import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [data, setData] = useState({
        nickName: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('register user action')
        console.log(data)
        sessionStorage.setItem('user_id', 1)
        // navigate('/')
        window.location = '/'
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>create Account</h2>
                <input
                    type="text"
                    placeholder="nickname"
                    name="nickName"
                    onChange={handleChange}
                    value={data.nickName}
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
            <div>
                <Link to="/login">login</Link>
            </div>
        </div>
    )
}
export default RegisterForm
