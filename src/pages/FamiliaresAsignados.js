import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import {baseURL} from "../helpers/IPConfig";


function FamiliaresAsignados() {
    let { id } = useParams();
    const [listOfFamiliaresAsignados, setListOfFamiliaresAsignados] = useState([])
    let navigate = useNavigate;
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${baseURL}/userPersonaDependiente/familiares/list/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfFamiliaresAsignados(response.data)
            })
    }, [])


    const deleteUserPersonaDependiente = async (familiarId, id) => {
        await axios.delete(`${baseURL}/userPersonaDependiente/delete`,
            {headers: {accessToken: localStorage.getItem("accessToken")},
                data: {
                    userId: familiarId,
                    personaDependienteId: id
                }})
            .then(() => {
                setListOfFamiliaresAsignados(
                    listOfFamiliaresAsignados.filter((familiar) => {
                        return familiar.id != familiarId;
                    })
                )
            })

        await axios.delete(`${baseURL}/users/familiares/delete/${familiarId}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error)
                }
            })

    }

    return(
        <div className="App">
            <h1>FAMILIARES ASIGNADOS</h1>
            <div>
                {listOfFamiliaresAsignados.map((value, key) => {
                    return(
                        <div className="familiar-asignado">
                            <div key={key} className="post" >
                                <div className="title">{value.nombre + " " + value.apellidos}</div>

                                {authState.rol === "AUXILIAR" &&
                                <div className="body">Contacto: {value.telefono}</div>
                                }

                            </div>

                            {authState.rol === "COORDINADOR" &&
                            <>
                                <button className="delete-user-personaDependiente" onClick={() => {
                                    deleteUserPersonaDependiente(value.id, id);
                                }}>Eliminar</button>
                            </>
                            }

                        </div>

                    )
                })}
            </div>
        </div>
    )

}


export default FamiliaresAsignados;
