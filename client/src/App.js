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
  useToast,
} from "@chakra-ui/react";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catIndex, setCatIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch("https://pos-mel.vercel.app/getCat")
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);

  const handleOnChange = (index) => {
    setCatIndex(index);
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setItems(res));
    fetch(`https://pos-mel.vercel.app/getHistory/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setHistory(res));
  };

  const handleClick = () => {
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[catIndex].ID}&save=true`)
    .then(()=>{
      const tempArr = filterObjectsBySeller(items, [229557596, 10477825]);
      arrToClipboard(tempArr.map((item) => item.title));
    })
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

  const arrToClipboard = (arr) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const nonEmptyItems = arr.filter((item) => item !== "").length;
    const totalItems = arr.length;
    const modifiedArray = [formattedDate, nonEmptyItems, totalItems, ...arr];
    const strArr = modifiedArray.join("\t");
    navigator.clipboard
      .writeText(strArr)
      .then(() => console.log("Copied to clipboard!"));
  };

  function filterObjectsBySeller(originalArray, expectedSellers) {
    return originalArray.map((obj) => {
      if (expectedSellers.includes(obj.seller)) {
        return obj;
      } else {
        return { title: "", seller: obj.seller };
      }
    });
  }

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
                    {/*history.length &&
                      history
                        .sort((a, b) => a.date.seconds - b.date.seconds)
                        .map((day) => {
                          return (
                            <ItemCardContainer
                              products={day.data}
                              date={day.date.seconds * 1000}
                            />
                          );
                        })*/}
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
