import {observable, computed, action} from "mobx";
import {uuid} from './utils'

class Store {
  @observable todos = new Map();
  @observable shownFilter = 'all';

  @computed get allTodos() {
    return [...this.todos.values()];
  }
  @computed get completedTodos() {
    return [...this.todos.values()].filter(todo => todo.completed)
  }
  @computed get activeTodos() {
    return [...this.todos.values()].filter(todo => !todo.completed)
  }
  @computed get todosList() {
    switch (this.shownFilter) {
      case 'all':
        return this.allTodos;
      case 'active':
        return this.activeTodos;
      case 'completed':
        return this.completedTodos;
      default:
        return this.allTodos;
    }
  }

  @computed get leftTodos() {
    return this.activeTodos.length;
  }
  @computed get completedCount() {
    return this.completedTodos.length;
  }

  @action
  addTodo(title) {
    var id = uuid();
    var todo = {
      title: title,
      id: id,
      completed: false
    };
    const a = this.todos.set(id, todo);
    console.log(a);
  }

  @action
  changeShownFilter(filter) {
    this.shownFilter = filter;
  }

  @action
  toggleComplete(id) {
    console.log('completed');
    var todo = this.todos.get(id);
    todo.completed = !todo.completed;
  }

  @action
  destroyTodo(id){
    this.todos.delete(id);
  }

  @action
  toggleAllComplete() {
    this.todos.forEach(todo => {
      todo.completed = !todo.completed
    })
  }

  @action
  clearCompleted() {
    this.todos = this.activeTodos;
  }
}

export default new Store();
