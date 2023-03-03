/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Text, Tooltip } from '@chakra-ui/react'
import { cutString } from '../../utils/arr'
import { useSellerName } from './hooks'
import { COLORS } from '../../utils/const'

const ItemCard = ({ special, text, seller }) => {
  const sellerName = useSellerName(seller)

  const { PRIMARY_COLOR, DARK_COLOR, LIGHT_COLOR } = COLORS

  return (
    <Box
      bg={special ? PRIMARY_COLOR : LIGHT_COLOR}
      p={1}
      px={3}
      borderRadius="0.3em"
      m={1}
      boxShadow="0 4px 4px 0 rgba(0, 0, 0, 0.2)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
    >
      <Tooltip
        hasArrow
        label={`${text} - ${sellerName}`}
        aria-label="A tooltip"
      >
        <Text color={special ? LIGHT_COLOR : DARK_COLOR}>
          {cutString(text, 25)}
        </Text>
      </Tooltip>
    </Box>
  )
}

export default ItemCard

// TODO: Add Prop validation
