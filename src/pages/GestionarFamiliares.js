import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {baseURL} from "../helpers/IPConfig";


function GestionarFamiliares() {
    const [listOfFamiliares, setListOfFamiliares] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`${baseURL}/users/familiares/list`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfFamiliares(response.data)
            })
    }, [])

    return(
        <div className="App">
            <h1>GESTIONAR FAMILIARES</h1>
            <div>
                {listOfFamiliares.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/familiar/${value.id}`);
                        }}>
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default GestionarFamiliares;
