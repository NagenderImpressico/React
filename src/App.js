import logo from './logo.svg';
import './App.css';
import JetDev from './Components/jetDev';
import { connect, Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <JetDev/>
      </header>
    </div>
    </Provider>
  );
}

export default App;
