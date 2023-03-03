import React, { useEffect, useState } from 'react'
import {
  Box, Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast
} from '@chakra-ui/react'
import ItemCardContainer from './components/ItemCardContainer/ItemCardContainer'

function App () {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [catIndex, setCatIndex] = useState(0)
  const [history, setHistory] = useState([])
  const toast = useToast()

  useEffect(() => {
    fetch('https://pos-mel.vercel.app/getCat')
      .then((res) => res.json())
      .then((res) => setCategories(res))
  }, [])

  const handleOnChange = (index) => {
    setCatIndex(index)
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setItems(res))
    fetch(`https://pos-mel.vercel.app/getHistory/?param=${categories[index].ID}`)
      .then((res) => res.json())
      .then((res) => setHistory(res))
  }

  const shortnames = [
    {
      id: 'MLA842312662',
      shortname: 'Minilab Black edition'
    },
    {
      id: 'MLA815228338',
      shortname: 'Minilab Deep Black'
    },
    {
      id: 'MLA831170000',
      shortname: 'Minilab Inverted'
    },
    {
      id: 'MLA666004062',
      shortname: 'KLE49'
    },
    {
      id: 'MLA1297767060',
      shortname: 'Minilab 3'
    },
    {
      id: 'MLA842311699',
      shortname: 'Minilab Black'
    },
    {
      id: 'MLA643257685',
      shortname: 'AKM322'
    },
    {
      id: 'MLA796927972',
      shortname: 'AKM320BE'
    },
    {
      id: 'MLA843513704',
      shortname: 'KLE49BE'
    },
    {
      id: 'MLA751177661',
      shortname: 'Origin 62'
    },
    {
      id: 'MLA931065045',
      shortname: 'UMC202'
    },
    {
      id: 'MLA1109866203',
      shortname: 'L8'
    },
    {
      id: 'MLA1105477047',
      shortname: 'Pf1'
    },
    {
      id: 'MLA1109197987',
      shortname: 'Pf1'
    },
    {
      id: 'MLA922665137',
      shortname: 'Jirafa + Pipeta'
    },
    {
      id: 'MLA16126906',
      shortname: 'Mk-4300'
    },
    {
      id: 'MLA925848109',
      shortname: 'Mq6106'
    },
    {
      id: 'MLA925851544',
      shortname: 'Mq5468'
    },
    {
      id: 'MLA925840502',
      shortname: 'Mq813'
    },
    {
      id: 'MLA925841306',
      shortname: 'Mq813'
    },
    {
      id: 'MLA770047586',
      shortname: 'Ukelele'
    },
    {
      id: 'MLA817845668',
      shortname: 'Ukelele'
    },
    {
      id: 'MLA936065018',
      shortname: 'Mk4100'
    },
    {
      id: 'MLA736691161',
      shortname: 'Mk939'
    },
    {
      id: 'MLA16121139',
      shortname: 'Mk-2083'
    },
    {
      id: 'MLA822814280',
      shortname: 'Mk2113'
    },
    {
      id: 'MLA936065090',
      shortname: 'Mk4100'
    },
    {
      id: 'MLA829684870',
      shortname: 'Mk4300'
    },
    {
      id: 'MLA822965480',
      shortname: 'Mk885'
    },
    {
      id: 'MLA885797997',
      shortname: 'Mk935'
    },
    {
      id: 'MLA829684967',
      shortname: 'Mk4300'
    },
    {
      id: 'MLA822814446',
      shortname: 'Mk2113'
    },
    {
      id: 'MLA798806034',
      shortname: 'Mk2083'
    },
    {
      id: 'MLA883678174',
      shortname: 'Mk935'
    },
    {
      id: 'MLA822965606',
      shortname: 'Mk885'
    },
    {
      id: 'MLA886161768',
      shortname: 'Ed9 Pro'
    },
    {
      id: 'MLA896784829',
      shortname: 'Ed8'
    }
  ]

  function replaceTitlesWithShortnames (array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      const item = array1[i]
      const shortnameItem = array2.find((x) => x.id === item.id)
      if (shortnameItem) {
        item.title = shortnameItem.shortname
      }
    }
    return array1
  }

  const handleClick = () => { // TODO: Add shortname to the clipboard
    fetch(`https://pos-mel.vercel.app/getRanking/?param=${categories[catIndex].ID}&save=true`)
      .then(() => {
        const tempArr = filterObjectsBySeller(items, [229557596, 10477825])
        arrToClipboard(replaceTitlesWithShortnames(tempArr, shortnames).map((item) => item.title))
      })
      .then(() => {
        toast({
          title: 'Your ranking has been saved.',
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const arrToClipboard = (arr) => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`
    const nonEmptyItems = arr.filter((item) => item !== '').length
    const totalItems = arr.length
    const modifiedArray = [formattedDate, nonEmptyItems, totalItems, ...arr]
    const strArr = modifiedArray.join('\t')
    navigator.clipboard
      .writeText(strArr)
      .then(() => console.log('Copied to clipboard!'))
  }

  function filterObjectsBySeller (originalArray, expectedSellers) {
    return originalArray.map((obj) => {
      if (expectedSellers.includes(obj.seller)) {
        return obj
      } else {
        return { title: '', seller: obj.seller }
      }
    })
  }

  console.log(history)

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
                    {/* history.length &&
                      history
                        .sort((a, b) => a.date.seconds - b.date.seconds)
                        .map((day) => {
                          return (
                            <ItemCardContainer
                              products={day.data}
                              date={day.date.seconds * 1000}
                            />
                          );
                        }) */}
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
