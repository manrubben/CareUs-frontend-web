import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {baseURL} from "../helpers/IPConfig";

function AuxiliaresDisponibles() {

    const [listOfAuxiliaresDisponibles, setListOfAuxiliaresDisponibles] = useState([]);
    let { id } = useParams(); //id de la persona dependiente
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseURL}/users/personaDependiente/${id}/listAuxiliaresDisponibles`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfAuxiliaresDisponibles(response.data);
            });
    }, [])


    const addAuxiliar = (userId, personaDependienteId) => {
        axios.post(`${baseURL}/userPersonaDependiente/addTo`,
            {userId: userId, personaDependienteId: personaDependienteId},
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then(() => {
                navigate(`/personaDependiente/${id}`)
            })
    }


    return(
        <div className="App">
            <h1>AUXILIARES DISPONIBLES PARA AÑADIR</h1>
            <div>
                {listOfAuxiliaresDisponibles.map((value, key) => {
                    return(
                        <div className="auxiliar-disponible">
                            <div key={key} className="post" onClick={() => {
                                navigate(`/auxiliares/show/${value.id}`);
                            }}>
                                <div className="title">{value.nombre + " " + value.apellidos}</div>
                            </div>
                            <button className="add-auxiliar-button" onClick={() => {
                                addAuxiliar(value.id, id);
                            }}>Añadir</button>
                        </div>

                    )
                })}
            </div>
        </div>

    )
}

export default AuxiliaresDisponibles;
