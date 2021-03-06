import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";
import {baseURL} from "../helpers/IPConfig";


function Observaciones() {

    let { id } = useParams();

    const [observaciones, setObservaciones] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${baseURL}/observaciones/showObservaciones/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setObservaciones(response.data);
        });
    }, []);

    const deleteObservacion = (id) => {
        axios
            .delete(`${baseURL}/observaciones/deleteObservacion/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setObservaciones(
                    observaciones.filter((val) => {
                        return val.id != id;
                    })
                );
            });
    };

    return(
        <div className="App">
            <h1>Observaciones</h1>
            <div>
                {observaciones.map((value, key) => {
                    return (
                        <div key={key}>
                            <div className="datos-observacion">
                                <label> {value.titulo}</label>
                                <label> Creada: {value.createdAt}</label>
                                <label> Descripción: {value.descripcion}</label>
                                <label> Creada por: {value.username}</label>
                            </div>

                            {authState.username === value.username && (
                                <button  onClick={() => {
                                    deleteObservacion(value.id);
                                }}>Eliminar</button>
                            )}

                        </div>
                    );
                })}
            </div>


        </div>
    )

}


export default Observaciones;
