import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      {data ? <h1>{data}</h1> : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
