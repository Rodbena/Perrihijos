import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { todasCategorias } from '../../acciones/categoria.acciones';
import './estilos.css';

/**
* @author
* @function MenuHd
**/

const MenuHd = (props) => {

    const categoria = useSelector(state => state.categoria);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todasCategorias());

    }, [])


    const mostrarCategorias = (categorias) => {

        let todasCategorias = [];
        for (let categoria of categorias) {
            todasCategorias.push(
                <li key={categoria.nombre}>
                    {
                        categoria.IdPadre ? <a href={`http://localhost:3000/${categoria.slug}`}> {categoria.nombre} </a> :
                        <span>{categoria.nombre}</span>
                    }
                    {categoria.children.length > 0 ? (<ul>{mostrarCategorias(categoria.children)}</ul>) : null}
                </li>
            );
        }
        return todasCategorias;
    }


    return (
        <div className="menu">
            <ul>
                {categoria.categorias.length > 0 ? mostrarCategorias(categoria.categorias) : null}
            </ul>
        </div>
    )

}

export default MenuHd