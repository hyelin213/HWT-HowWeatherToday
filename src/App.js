import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Weather from './components/weather';

function App() {
  const [weather, setWeather] = useState([]);
  // **useState = 함수형 컴포넌트에서 상태값을 관리하는 것

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
