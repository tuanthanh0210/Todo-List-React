import React, {Component} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/add-item.svg';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      newItem: '',
      currentFilter: '',
      todoItems: [
        // {
        //   title: "Mua bim bim",
        //   isComplete: false
        // },
        // {
        //   title: "Đi đá bóng",
        //   isComplete: true
        // },
        // {
        //   title: "Đi chơi với gấu",
        //   isComplete: false
        // },
        // {
        //   title: "Chơi game",
        //   isComplete: true
        // },
        // {
        //   title: "Đấm nhau",
        //   isComplete: false
        // }
      ],
    };

    this.onKeyUp = this.onKeyUp.bind (this);
    this.onChange = this.onChange.bind (this);
    this.onShowAll = this.onShowAll.bind (this);
    this.onActive = this.onActive.bind (this);
    this.onAddAll = this.onAddAll.bind (this);
    this.onComplete = this.onComplete.bind (this);
    this.onClearCompleted = this.onClearCompleted.bind (this);
    // this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onItemClick (item) {
    // return event => {
    const isComplete = item.isComplete;
    const {todoItems} = this.state;
    const index = todoItems.indexOf (item);
    console.log (index, item);
    this.setState ({
      todoItems: [
        ...todoItems.slice (0, index),
        {
          ...item,
          isComplete: !isComplete,
        },
        ...todoItems.slice (index + 1),
      ],
    });
    // };
  }

  onDeleteItem (item) {
    // const index = this.state.todoItems.indexOf(item);
    // this.setState({
    //   todoItems: this.state.todoItems.splice(index, 1)
    // });
    // return () => {
    const newTdodoItems = [...this.state.todoItems];
    const index = this.state.todoItems.indexOf (item);
    const newTdodoItems1 = newTdodoItems.splice (index, 1);
    console.log (newTdodoItems1);
    console.log (newTdodoItems);
    console.log (item);
    this.setState ({
      ...this.state,
      todoItems: newTdodoItems,
    });
    // };
  }

  onKeyUp (event) {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY) {
      let text = event.target.value;
      if (!text) {
        return;
      }

      text = text.trim ();
      if (!text) {
        return;
      }

      this.setState ({
        newItem: '',
        todoItems: [{title: text, isComplete: false}, ...this.state.todoItems],
      });
    }
  }

  onChange (event) {
    this.setState ({
      newItem: event.target.value,
    });
  }

  onAddAll () {
    this.setState ({
      ...this.state,
      todoItems: this.state.todoItems.map (
        item =>
          (item = {
            ...item,
            isComplete: true,
          })
      ),
    });
  }
  onShowAll () {
    this.setState ({
      ...this.state,
      currentFilter: 'all',
    });
  }

  onActive () {
    // let activeTodo = [...this.state.todoItems];
    // console.log(activeTodo);
    this.setState ({
      ...this.state,
      newItem: '',
      currentFilter: 'active',
      // todoItems: filter(item => item.isComplete === false)
    });
  }

  onComplete () {
    // let completeTodo = [...this.state.todoItems];
    // console.log(completeTodo);
    this.setState ({
      ...this.state,
      newItem: '',
      currentFilter: 'completed',
      // todoItems: filter(item => item.isComplete === true)
    });
  }

  onClearCompleted () {
    this.setState ({
      ...this.state,
      todoItems: this.state.todoItems.filter (
        item => item.isComplete === false
      ),
    });
  }

  onReverseTodoItem(){
    this.setState({
      todoItems: this.state.todoItems.reverse()
    })
  }

  render () {
    const {todoItems, newItem, currentFilter} = this.state;
    let curentFilterTodo = todoItems;
    if (currentFilter === 'active') {
      curentFilterTodo = todoItems.filter (item => item.isComplete === false);
    }
    if (currentFilter === 'completed') {
      curentFilterTodo = todoItems.filter (item => item.isComplete === true);
    }
    return (
      <div className="App">
        <h1>todos</h1>
        {/* <div>{currentFilter}</div> */}
        <button onClick={() => this.onReverseTodoItem()}>Reverse</button>
        <div className="Header">
          {this.state.todoItems.length > 0 &&
            <img
              src={tick}
              height={32}
              width={32}
              alt="text"
              onClick={this.onAddAll}
            />}
          {this.state.todoItems.length === 0 && <div style={{opacity: 0}} />}
          <input
            type="text"
            placeholder="What needs to be done ?"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>

        {curentFilterTodo.map (
          (item, index) =>
            !this.state.isHidden &&
            <TodoItem
              key={index}
              item={item}
              onClick={() => {
                this.onItemClick (item);
              }}
              onDelete={() => {
                this.onDeleteItem (item);
              }}
            />
        )}

        {this.state.todoItems.length > 0 &&
          <div className="Footer">
            <div className="items-left">
              {todoItems.filter (item => item.isComplete === false).length >
                1 &&
                <p>
                  {todoItems.filter (item => item.isComplete === false).length}
                  {' '}
                  items left
                </p>}

              {todoItems.filter (item => item.isComplete === false).length <=
                1 &&
                <p>
                  {todoItems.filter (item => item.isComplete === false).length}
                  {' '}
                  item left
                </p>}
            </div>

            <div className="Button">
              <button onClick={this.onShowAll}>All</button>
              <button onClick={this.onActive}>Active</button>
              <button onClick={this.onComplete}>Completed</button>
              <button onClick={this.onClearCompleted}>Clear completed</button>
            </div>
          </div>}
        {this.state.todoItems.length === 0 && <div style={{opacity: 0}} />}
      </div>
    );
  }
}

export default App;
