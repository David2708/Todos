import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml, actualizarPendientes } from './js/componentes';

export const todoList = new TodoList;

//-----------------------------------

//  renderizamos los todos que se encuentran en el localStarage
todoList.todos.forEach(todo => crearTodoHtml( todo ));
actualizarPendientes();

