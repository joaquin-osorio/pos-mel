/* eslint-disable react/prop-types */
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import { Flex, Text } from '@chakra-ui/react'
import { COLORS, SELLERS } from '../../utils/const'
import { getDateArr } from '../../utils/arrFunctions'

const ItemCardContainer = ({ products, date }) => {
  const [month, day, year] = getDateArr()
  const { LIGHT_COLOR } = COLORS
  const { PC_MIDI_CENTER, ARTURIA_OFICIAL } = SELLERS

  return (
        <Flex direction='column' alignItems='center' w='16em' mx={2}>

            <Text color={LIGHT_COLOR} m={3}>
                {`${date ? `${day} - ${month} - ${year}` : 'Now'}`}
            </Text>

            {products.map((item, index) => (
                <ItemCard
                key={index}
                seller={item.seller}
                text={item.title}
                special={!!(item.seller === ARTURIA_OFICIAL || item.seller === PC_MIDI_CENTER)}
                />
            ))}

        </Flex>
  )
}

export default ItemCardContainer
