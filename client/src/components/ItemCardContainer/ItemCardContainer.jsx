/* eslint-disable react/prop-types */
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import { Flex, Text } from '@chakra-ui/react'

const ItemCardContainer = ({ products, date }) => {
  console.log(`ItemCardContainer.jsx: date = ${date}`)

  const d = new Date(date)
  const [month, day, year] = [d.getMonth() + 1, d.getDate(), d.getFullYear()]

  return (
        <Flex direction='column' alignItems='center' w='16em' mx={2}>
            <Text color='#E9EFF1' m={3}>{`${date ? `${day} - ${month} - ${year}` : 'Now'}`}</Text>
            {products.map((item, index) => (
                <ItemCard key={index} seller={item.seller} text={item.title} special={
                    !!(item.seller === 229557596 || item.seller === 10477825)
                } />
            ))}
        </Flex>
  )
}

export default ItemCardContainer
