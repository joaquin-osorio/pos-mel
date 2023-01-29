import "./App.css";
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast
} from "@chakra-ui/react";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catIndex, setCatIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const toast = useToast();

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
    fetch(`/getHistory/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setHistory(res));
  };

  const handleClick = () => {
    fetch(`/getRanking/?param=${categories[catIndex].ID}&save=true`)
    .then(() => {
      toast({
        title: "Your ranking has been saved.",
        position: 'top',
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    })
  };

  console.log(history);

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
                  <Flex direction="row">
                    {history.length &&
                      history.sort((a, b) => a.date.seconds - b.date.seconds).map((day) => {
                       return <ItemCardContainer products={day.data} date={day.date.seconds*1000} />;
                      })}
                    <Flex direction="column">
                      {items.length > 0 && (
                        <ItemCardContainer products={items} />
                      )}
                      <Button colorScheme="blue" onClick={handleClick}>
                        Save
                      </Button>
                    </Flex>
                  </Flex>
                </TabPanel>
              );
            })}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
