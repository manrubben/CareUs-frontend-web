import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {baseURL} from "../helpers/IPConfig";


function EditFamiliar() {

    let { id } = useParams();
    const [familiar, setFamiliar] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseURL}/users/familiares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setFamiliar(response.data)
            });
    }, [])

    const initialValues = {
        nombre: familiar.nombre,
        apellidos: familiar.apellidos,
        telefono: familiar.telefono,
        rol: "FAMILIAR",
        username: familiar.username,
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        telefono: Yup.string().required("Debes introducir un número de teléfono"),
        username: Yup.string().required("Debes introducir un nombre de usuario")
            .min(8, "El nombre de usuario debe tener al menos 8 caracteres")
            .max(16, "El nombre de usuario debe tener como máximo 16 caracteres"),
    });

    const editFamiliar = (data) => {

        axios.put(`${baseURL}/users/familiares/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/familiar/${id}`)
                }
            })
    }

    const deleteFamiliar = () => {
        axios.delete(`${baseURL}/users/familiares/delete/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate('/coordinador/familiares')
                }
            })
    }


    return(
        <div className="App">
            <h1>EDITAR FAMILIAR</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editFamiliar}
            >
                <Form className="formContainer">
                    <label>Nombre: </label>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="(Ej. Juan...)"
                    />

                    <label>Apellidos: </label>
                    <ErrorMessage name="apellidos" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="apellidos"
                        placeholder="(Ej. Rodríguez...)"
                    />

                    <label>Teléfono: </label>
                    <ErrorMessage name="telefono" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="telefono"
                        placeholder="(Ej. 622172737...)"
                    />

                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ej. javier97...)"
                    />

                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={deleteFamiliar}>Eliminar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditFamiliar;
