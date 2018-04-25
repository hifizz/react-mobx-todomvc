import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./store";
import classNames from "classnames";
import DevTool from "mobx-react-devtools";

@observer
class App extends Component {
  onChangeFilter(type) {
    this.props.appState.changeShownFilter(type);
  }

  render() {
    const {shownFilter, todosList} = this.props.appState;
    console.log('render');
    const items = todosList.map((todo) => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.computed}
        />
      )
    });
    console.log(items);

    const footer = this.props.appState.todosList.length > 0 && (
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item left</span>
          <ul className="filters">
            <li>
              <a
                className={shownFilter === 'all' && "selected"}
                href="#/"
                onClick={() => {
                  this.onChangeFilter('all')
                }}>All</a>
            </li>
            <li>
              <a
                href="#/active"
                className={shownFilter === 'active' && "selected"}
                onClick={() => {
                this.onChangeFilter('active')
              }}>Active</a>
            </li>
            <li>
              <a
                href="#/completed"
                className={shownFilter === 'completed' && "selected"}
                onClick={() => {
                this.onChangeFilter('completed')
              }}>Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      );

    return (
      <div className="App">
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              onKeyPress={this.handleNewTodoInputKeyPress}
              placeholder="What needs to be done?"
              autoFocus
            />
          </header>
          <div className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onClick={this.onToggleAllComplete}
            />
            <label htmlFor="toggle-all" or="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {items}
            </ul>
          </div>
          {footer}
        </div>
        <DevTool/>
      </div>
    );
  }

  handleNewTodoInputKeyPress = (e) => {
    if (e.which === 13) {
      const title = e.target.value.trim();
      e.target.value = '';
      title && this.props.appState.addTodo(title);
    }
  };

  onToggleAllComplete = () => {
    this.props.appState.toggleAllComplete();
  }
}

@observer
class Todo extends Component {
  render() {
    const props = this.props;
    console.log('todo');
    console.log(props);
    const todoStyle = classNames({
      'completed': props.completed
    });
    return (
      <li className={todoStyle}>
        <div className="view">
          <input
            onClick={this.toggleCompleted}
            className="toggle"
            type="checkbox"
            checked={props.completed}
            readOnly
          />
          <label>{props.title}</label>
          <button className="destroy" onClick={this.destroyTodo}/>
        </div>
        <input className="edit" value="Create a TodoMVC template" readOnly/>
      </li>
    )
  }

  toggleCompleted = () => {
    store.toggleComplete(this.props.id);
  };

  destroyTodo = () => {
    store.destroyTodo(this.props.id);
  };
}

export default App;
