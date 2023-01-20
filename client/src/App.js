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

  console.log(catIndex);

  const handleOnChange = (index) => {
    setCatIndex(index);
    let cat = "";
    switch (index) {
      case 0:
        cat = "MLA402916";
        break;
      case 1:
        cat = "MLA434918";
        break;
      case 2:
        cat = "MLA413546";
        break;
      case 3:
        cat = "MLA91773";
        break;
      case 4:
        cat = "MLA2997";
        break;
      case 5:
        cat = "MLA90323";
        break;
      case 6:
        cat = "MLA377642";
        break;
      case 7:
        cat = "MLA2997?attribute=BRAND&attributeValue=101652";
        break;
      case 8:
        cat = "MLA412663";
        break;
      case 9:
        cat = "MLA416668";
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
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Controladores MIDI</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Interfaces</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Filtros Antipop</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Brazos</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Teclados</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Pianos y Organos</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Ukeleles</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Teclados Meike</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Melodicas</Tab>
          <Tab _selected={{ color: "#E9EFF1", bg: "#8098AD" }}>Baterias</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
          <TabPanel>{items.length > 0 && <ItemCardContainer products={items} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;


