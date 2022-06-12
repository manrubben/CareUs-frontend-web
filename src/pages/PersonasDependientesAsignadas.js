import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import '../App.css'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import App from "../App";
import {baseURL} from "../helpers/IPConfig";


function PersonasDependientesAsignadas() {


    const [listOfPersonasDependientes, setListOfPersonasDependientes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        axios.get(`${baseURL}/personasDependientes/personasAsignadas/`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfPersonasDependientes(response.data);
            });
    }, []);

    return(
        <div className="App">
            <h1>PERSONAS ASIGNADAS</h1>
            <div>
                {listOfPersonasDependientes.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/personaDependiente/${value.id}`);
                        }}>
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PersonasDependientesAsignadas;
