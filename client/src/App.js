import "./App.css";
import { useEffect, useState } from "react";

//tempItems {id, position, type}
//items {id, position, title, seller}

function App() {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/getRanking')
      .then(res => res.json())
      .then(res => res.content)
      .then(res => {
        const fetchPromises = res.map(element => {
          return fetch('/getProducts?param=' + element.id)
            .then(res => res.json())
            .then(res => {
              return {
                id: res.id,
                position: element.position,
                title: res.title,
                seller: res.seller_id
              }
            })
        })
  
        Promise.all(fetchPromises)
          .then(results => setItems(results))
      })
  }, []);
  

  console.log(items);

  return (
    <div className="App">
      <button>Get Ranking</button>
    </div>
  );
}

export default App;
