import React, { useEffect, useState } from 'react'
import { consultaDb, eliminarDocDataBase} from '../config/firebase';
import { Link } from 'react-router-dom'



export const Ventas = () => {

    /* Se reemplazan productos */
    const [listaVentas, setlistaVentas] = useState([])
    const [ventaBuscada, setventaBuscada] = useState('') 
    const [swt1, setSwt1] = useState(false)

    const cargarVentas = async () => {

        const listaTemporal = await consultaDb('lista-ventas')
        // console.log(listaTemporal);
        setlistaVentas(listaTemporal)
        setSwt1(false)
    }



    useEffect(() => {
        // console.log('Usando useEffect PRODUCTOS');
        // setlistaVentas(respuesta)
        cargarVentas()
    }, [])

    const handleEliminar = async (e) => {
        // e.preventDefault()
        const arregloTemporal = listaVentas.filter((elemento) => {
            return elemento.id !== e
        })
        setlistaVentas(arregloTemporal)

        await eliminarDocDataBase('lista-ventas', e)


    }

    const handleBuscar = async (e) => {
        // console.log("ventaBuscada: ",ventaBuscada);

        if (e.key === 'Enter' && ventaBuscada !== '') {

            const arregloTemporal = listaVentas.filter((elemento) => {

                return (elemento.descripcion) === ventaBuscada || (elemento.idProd) === ventaBuscada
            })
            setlistaVentas(arregloTemporal)
            setSwt1(true)
            // console.log("arreg: ", arregloTemporal);

        }

    }

    const handleBuscarBtn = async (e) => {
        // console.log("ventaBuscada: ")

        if (ventaBuscada !== '') {

            const arregloTemporal = listaVentas.filter((elemento) => {

                return (elemento.descripcion) === ventaBuscada || (elemento.idProd) === ventaBuscada
            })
            setlistaVentas(arregloTemporal)
            setSwt1(true)
            // console.log("arreg: ", arregloTemporal);            
        }

    }

    
   
    return (


        <div className="container mt-3 ">


            <div className="d-flex bd-highlight mb-3 ">

                {/* <div className="me-auto p-2 bd-highligh">
                    <h1>Productos</h1>
                </div> */}

                <div className="me-auto p-2 bd-highligh">
                    <Link className="btn btn-primary  border-dark"
                        to="/lista-ventas/create"
                        /* Se cambia nombre del botón */
                    >Nueva venta</Link>
                </div>

                <div className="p-2 bd-highlight ">

                    <input className="form-control border-dark "
                        id="bot-busqueda"
                        placeholder="Buscar venta"
                        value={ventaBuscada} /*Cambiar producto por venta*/
                        onChange={(event) => setventaBuscada(event.target.value)}
                        onKeyPress={handleBuscar}

                    ></input>


                </div>

                
                <div className="p-2 bd-highlight">
                    <button className="btn btn-info text-white border-dark"

                        onClick={swt1 === false ? handleBuscarBtn : cargarVentas}

                    >{swt1 === false ? 'Buscar' : 'Atras'}</button>
                </div>



            </div>
            <hr />


            <table className="table table-striped table-bordered 
            align-middle border-dark">

                <thead className="table-dark">
                    <tr className="text-center">
                        <th scope="col">ID</th>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">C.C Cliente</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Valor de venta</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Editar/Eliminar</th>


                    </tr>
                </thead>

                <tbody>

                    {
                        listaVentas.map((prod, index) => (

                            <tr key={prod.id} className="text-center">
                                <th scope="row" >{index + 1}</th>
                                <th>{"cosas Bd"}</th>
                                <th>{"cosas Bd"}</th>
                                <td>{prod.descripcion}</td>
                                <td>{prod.precioUnitario}</td>
                                <td>{prod.estado}</td>
                                <td>{"fecha"}</td>
                                <td >
                                    <div className="btn-group" role="group" aria-label="Borrar-Modificar">

                                        <Link type="button" className="btn btn-outline-dark border-dark"
                                            to={`/lista-ventas/${prod.id}`}>
                                            <i className="bi bi-brush"></i>
                                        </Link>

                                        <button className="btn btn-danger border-dark"
                                            onClick={() => handleEliminar(prod.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>


                                    </div>
                                </td>

                            </tr>
                        ))

                    }
                </tbody>



            </table>

            
        </div>

    )
}

export default Ventas;
