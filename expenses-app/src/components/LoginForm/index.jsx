import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({ nickname: '', password: '' })

    const navigate = useNavigate()
    
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('login user action')
        console.log(data)
        sessionStorage.setItem('user_id', 1)
        // navigate('/')
        window.location = '/'
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>login form</h2>
                <input
                    type="text"
                    placeholder="nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={data.nickname}
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
            <div>
                <Link to="/register">register</Link>
            </div>
        </div>
    )
}
export default LoginForm
