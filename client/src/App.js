import "./App.css";
import { useEffect, useState } from "react";

//tempItems {id, position, type}
//items {id, position, title, seller}

function App() {
  
  const [items, setItems] = useState([]);
  
  useEffect(() => {
      fetch('/getRanking')
      .then(res => res.json())
      .then(res => setItems(res))
  }, []);

  console.log(items);

  return (
    <div className="App">
      <h1>Ranking de productos</h1>
    </div>
  );
}

export default App;
