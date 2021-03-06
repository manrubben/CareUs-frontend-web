import React, {useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {baseURL} from "../helpers/IPConfig";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let navigate = useNavigate();

    const login = () => {
        const data = { username: username, password: password };
        axios.post(`${baseURL}/users/login`, data).then((response) => {
            if(response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username, id: response.data.id, rol: response.data.rol, status: true});
                navigate("/home");
            }
        });
    };
    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input type="text"
                   onChange={(event) => {
                setUsername(event.target.value);
                   }}
            />
            <label>Password:</label>
            <input type="password"
                   onChange={(event) => {
                setPassword(event.target.value);
                   }}
            />

            <button onClick={login}>Login</button>
        </div>
    )


}

export default Login;
