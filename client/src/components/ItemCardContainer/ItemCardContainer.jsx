import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { Flex, Text } from '@chakra-ui/react';

const ItemCardContainer = ({ products }) => {
    return (
        <Flex direction='column' alignItems='center' w='16em'>
            <Text color='#E9EFF1' m={3}>18/01/2023</Text>
            {products.map((item) => (
                <ItemCard text={item.title} special={
                    item.seller === 229557596 ? true : false
                } />
            ))}
        </Flex>
    );
};

export default ItemCardContainer;