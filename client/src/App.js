import "./App.css";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    fetch("/getCat")
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);

  const handleOnChange = (index) => {
    setCatIndex(index);
    fetch(`/getRanking/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setItems(res));
  };

  const handleClick = () => {
    fetch(`/getRanking/?param=${categories[catIndex].ID}&save=true`);
  };

  return (
    <Box bg="#283247" minH="100vh" p={0}>
      <Tabs color="#E9EFF1" onChange={(index) => handleOnChange(index)}>
        <TabList>
          {categories.length &&
            categories.map((cat, index) => {
              return (
                <Tab
                  key={index}
                  _selected={{ color: "#E9EFF1", bg: "#8098AD" }}
                >
                  {cat.name}
                </Tab>
              );
            })}
        </TabList>
        <TabPanels>
          {categories.length &&
            categories.map((cat, index) => {
              return (
                <TabPanel key={index}>
                  {items.length > 0 && <ItemCardContainer products={items} />}
                  <Button colorScheme='blue' onClick={handleClick}>Save</Button>
                </TabPanel>
              );

            })}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
