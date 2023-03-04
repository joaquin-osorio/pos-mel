import React, { useState } from 'react'
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast
} from '@chakra-ui/react'
import ItemCardContainer from './components/ItemCardContainer/ItemCardContainer'
import { shortnames, savedToast } from './utils/const'
import { arrToClipboard, replaceTitlesWithShortnames, filterObjectsBySeller } from './utils/arrFunctions'
import { useFetch } from './hooks'

function App () {
  const [items, setItems] = useState([])
  const [catIndex, setCatIndex] = useState(0)
  const toast = useToast()
  const categories = useFetch('https://pos-mel.vercel.app/getCat')

  const handleOnChange = (index) => { // TODO: Refactor this function
    setCatIndex(index)
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setItems(res))
  }

  const handleClick = () => { // TODO: Refactor this function
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[catIndex].ID}&save=true`)
      .then(() => {
        const tempArr = filterObjectsBySeller(items, [229557596, 10477825])
        arrToClipboard(replaceTitlesWithShortnames(tempArr, shortnames).map((item) => item.title))
      })
      .then(() => {
        toast(savedToast)
      })
  }

  return (
    <Box bg="#283247" minH="100vh" p={0}>
      <Tabs color="#E9EFF1" onChange={(index) => handleOnChange(index)}>
        <TabList>
          {categories.length &&
            categories.map((cat, index) => {
              return (
                <Tab
                  key={index}
                  _selected={{ color: '#E9EFF1', bg: '#8098AD' }}
                >
                  {cat.name}
                </Tab>
              )
            })}
        </TabList>
        <TabPanels>
          {categories.length &&
            categories.map((cat, index) => {
              return (
                <TabPanel key={index}>
                  <Flex direction="row">
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
              )
            })}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default App

// TODO: Por el momento no estoy usando el historial. Puede llegar a ser necesario mas adelante
