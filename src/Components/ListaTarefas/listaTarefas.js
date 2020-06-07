import React, {useState} from 'react'
import './listaTarefas_estilo.css'

import {FiPlusSquare, FiPlusCircle, FiX} from 'react-icons/fi'

function ListaTarefa() {
    const [lista, setLista] = useState(JSON.parse(localStorage.getItem('lista')) || [])
    const [itemlista, setItemlista] = useState('')
    const [tarefas, setTarefas] = useState(JSON.parse(localStorage.getItem('tarefas')) || [])
    const [novoitemlista, setNovoitemlista] = useState('')
    const [novatarefa, setNovatarefa] = useState('')
    
    
    function adicionaritemLista() {
        console.log('atual', {itemTitulo: novoitemlista})
        console.log('itemTitulo: ', novoitemlista)
                                
        if (lista.some((cada) => cada.itemTitulo === novoitemlista)) {  
           setLista([...lista])   
           setNovoitemlista('')
           alert('Não pode haver item lista igual')
        }
        else {
           setLista([...lista, {itemTitulo: novoitemlista}])
           setNovoitemlista('')
           salvar()
        }
    }

    function adicionarTarefa() {
        if (tarefas.some(cada => cada.tarefaTitulo === novatarefa)) {
           setTarefas([...tarefas])
           setNovatarefa('')
           alert('Não pode haver tarefas iguais')
        }
        else {
           setTarefas([...tarefas, {tarefaTitulo: novatarefa, doItem: itemlista}])
           setNovatarefa('')
           salvar()
        }
    }
    
    function mostrarLista(nomeitemlista) {
        setItemlista(nomeitemlista)
    }

    function apagarLista(itemTitulo) {
        var novo_itemlista = []
        var nova_tarefa = []

        for (var cada_item of lista) {
           if (cada_item.itemTitulo !== itemTitulo) {
              novo_itemlista.push(cada_item)
           }
           else {
              console.log('repetido')
           }
        }

        for (var cada_tarefa of tarefas) {
            if (cada_tarefa.doItem !== itemTitulo) {
               nova_tarefa.push(cada_tarefa)
            }
        }

        setLista(novo_itemlista)
        setTarefas(nova_tarefa)
        salvar()
    }

    function checarTarefa(doitem_lista, tarefa_titulo) {
        var nova_tarefa = []

        for (var cada_tarefa of tarefas) {
            if (cada_tarefa.doItem !== tarefas.doitem_lista && cada_tarefa.tarefaTitulo !== tarefa_titulo) {
               nova_tarefa.push(cada_tarefa)
            }
            
        }

        setTarefas(nova_tarefa)
        salvar()
    }

    function salvar() {
        localStorage.setItem('lista', JSON.stringify(lista))
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    salvar()

    return (
        <div className="lado-a-lado">
            <div className="lista">
                 <h1 className="destaque">Lista</h1>
                 <ul className="conteudo">
                    {lista.map(cadaitem => {
                        return (
                            <li key={cadaitem.itemTitulo}> 
                                <button className="itembutao" onClick={mostrarLista.bind(this, cadaitem.itemTitulo)}>
                                    {cadaitem.itemTitulo}
                                </button>
                                <button onClick={apagarLista.bind(this, cadaitem.itemTitulo)}>
                                    <FiX />
                                </button>
                            </li>
                        )
                    })}
                 </ul>
                 <div className="campo1">
                     <input placeholder="Novo item" value={novoitemlista} onChange={(e) => setNovoitemlista(e.target.value)}/>
                     <button >
                         <FiPlusSquare size={30} color="darkslateblue" onClick={adicionaritemLista}/>
                     </button>
                 </div>
            </div>

            <div className="tarefas">
                 <h1 className="destaque">{itemlista === '' ? 'Minhas Tarefas' : itemlista}</h1>
                 <ul className="conteudo">
                     {itemlista === '' ? <li>Selecione um item ou crie outro</li> :
                      // eslint-disable-next-line 
                      tarefas.map(cadatarefa => {
                          if (cadatarefa.doItem === itemlista) {
                              return (
                                  <li key={cadatarefa.tarefaTitulo}> 
                                      <span className="itemtarefas">{cadatarefa.tarefaTitulo}</span>
                                      <button  onClick={checarTarefa.bind(this, cadatarefa.doItem, cadatarefa.tarefaTitulo)}>
                                          <FiX size={30}/>
                                      </button>
                                  </li>
                              )
                          }
                      }) 
                      }
                 </ul>
                 <div className="campo2">
                     <input placeholder="Nova Tarefa" value={novatarefa} onChange={(e) => setNovatarefa(e.target.value)}/>
                     <button >
                         <FiPlusCircle size={30} color="purple" onClick={adicionarTarefa}/>
                     </button>
                 </div>
            </div>
            
        </div>
    )
}

export default ListaTarefa