import React from 'react'

import './cabecario_estilo.css'
import logoimagem from '../../Assets/agenda.png'


function Cabecario(){
    return (
        <div className="contentor-cabecario">
            <img src={logoimagem} alt="planejamento"/>
            <h1>Planejamento</h1>
        </div>
    )
}

export default Cabecario