import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";

//tempItems {id, position, type}
//items {id, position, title, seller}

function App() {
  const [items, setItems] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  // useEffect(() => {
  //     fetch('/getRanking')
  //     .then(res => res.json())
  //     .then(res => setItems(res))
  // }, []);

  // console.log(items);

  console.log(catIndex);

  const handleOnChange = (index) => {
    setCatIndex(index);
    let cat = "";
    switch (index) {
      case 0:
        cat = "MLA402916";
        break;
      case 1:
        cat = "MLA416668";
        break;
      case 2:
        cat = "MLA412663";
        break;
    }
    fetch(`/getRanking/?param=${cat}`)
      .then((res) => res.json())
      .then((res) => setItems(res));
  };

  return (
    <Box bg="#283247" minH="100vh" p={0}>
      {/* {items.length > 0 &&  <ItemCardContainer products={items}/>} */}
      <Tabs color="#E9EFF1" onChange={(index) => handleOnChange(index)}>
        <TabList>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>
            Controladores MIDI
          </Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>
            Baterias Electronicas
          </Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Melodicas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {items.length > 0 && <ItemCardContainer products={items} />}
          </TabPanel>
          <TabPanel>
            {items.length > 0 && <ItemCardContainer products={items} />}
          </TabPanel>
          <TabPanel>
            {items.length > 0 && <ItemCardContainer products={items} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
