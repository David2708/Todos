import '../css/componentes.css'

import { Todo } from '../classes';
import { todoList } from '../index' 
//REferencias en el HTMl

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros =  document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const countPendientes = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) => {

    const crearHtml = `
        <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML  = crearHtml;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// pendientes
export const actualizarPendientes = () => 
    countPendientes.innerHTML = `${todoList.contarPendientes()} Pendiente(s)`;



//Eventos

txtInput.addEventListener( 'keyup', ( event )=> {

    if(event.key === 'Enter' &&  txtInput.value.length >= 3){
        const nTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nTodo );
        crearTodoHtml( nTodo );
        txtInput.value = '';
        
    }

} );

divTodoList.addEventListener( 'click' , ( event ) => {
    
    const nameElemnt = event.target.localName;
    const liElement = event.target.parentElement.parentElement;
    const idElement = liElement.getAttribute('data-id')

    if(nameElemnt.includes( 'input' )){

        todoList.marcarCompletado( idElement );
        liElement.classList.toggle( 'completed' );

    }else if( nameElemnt.includes( 'button' ) ){

        todoList.eliminarTodo( idElement );
        divTodoList.removeChild( liElement );

    }

    actualizarPendientes();

} )


btnBorrar.addEventListener( 'click' , () => {
    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length - 1; i >= 0; i--  ){
        const element = divTodoList.children[i];
        if( element.classList.contains( 'completed' ) ){
            divTodoList.removeChild(element);
        }
    }

} )


ulFiltros.addEventListener('click' , ( event) => {
    
    const filtro = event.target.text;
    
    if(!filtro) return;
    anchorFiltros.forEach( elem => elem.classList.remove('selected')  );
    event.target.classList.add('selected');


    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden')
                }
                break;
        
            default:
                break;
        }

    }

})

console.log(countPendientes)
