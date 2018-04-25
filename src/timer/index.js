import {observable, computed, autorun, action} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import DevTools from 'mobx-react-devtools'

var numbers = observable([1, 2, 3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer();
numbers.push(5);

var appState = observable({
  @observable timer: 0,
  @action resetTimer: function () {
    this.timer = 0;
  }
});

@observer
class App extends React.Component {
  @observable doubleTimer = 2;

  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer * this.doubleTimer}
        </button>
        <button onClick={this.add10}>Add 10</button>
        <button onClick={this.addDouble}>Add 10</button>
        <DevTools/>
      </div>
    )
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }

  add10 = () => {
    this.props.appState.timer += 10;
  }

  addDouble = () => {
    this.doubleTimer += 2;
  }
}

setInterval(function () {
  appState.timer += 1;
}, 1000);

ReactDOM.render(<App appState={appState}/>, document.getElementById('root'))

