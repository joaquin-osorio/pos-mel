import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ItemCard = ({ special, text }) => {
  const bgColor = special ? "#8098AD" : "#E9EFF1";
  const textColor = special ? "#E9EFF1" : "#283247";

  const cutString = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };

  return (
    <Box
      bg={bgColor}
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
      <Text color={textColor}>{cutString(text, 25)}</Text>
    </Box>
  );
};

export default ItemCard;
