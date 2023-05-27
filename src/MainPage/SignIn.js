import React, { Component, useEffect, useState } from "react";
import "../asset/css/signin.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SingIn() {
    const [data, setData] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const url = "http://vcb-api.somee.com/api/UserInformation/";
    
    const handleLogin = (e) => {
        e.preventDefault();
        async function getData()
        {
            const response = await axios.get(url + `Verify?Username=${username}&Password=${password}`)
            .catch((error) => {
                setErrorMessage(error);
            })
            if(Object.keys(response.data).length > 0)
            {
                navigate("/user");
            }
        }
        getData();
    }

    return (
        <>
            <div className="form">
                <div className="form-box">
                    <div className="form-left">
                        <div className="form-padding">
                            <img className="form-img" src="https://i.pinimg.com/originals/8b/44/51/8b4451665d6b2139e29f29b51ffb1829.png" alt="" />
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-padding-right">
                            <form className="login-form" onSubmit={handleLogin}>
                                <h1 className="form-title">Đăng nhập quản trị viên</h1>
                                <input className="form-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tài khoản" required></input>
                                <input className="form-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required></input>
                                {errorMessage ? (<div id="error">{"Sai tên đăng nhập hoặc mật khẩu."}</div>) : ("")}
                                <button type="submit" className="form-submit-btn">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingIn;