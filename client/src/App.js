import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";

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
    <Box bg='#283247' minH='100vh'>
      {items.length > 0 &&  <ItemCardContainer products={items}/>}
    </Box>
  );
}

export default App;
