import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList;

//-----------------------------------

//  renderizamos los todos que se encuentran en el localStorage
todoList.todos.forEach(todo => crearTodoHtml( todo ));

//tambien se puede hacer asi:
// todoList.todos.forEach(crearTodoHtml);
