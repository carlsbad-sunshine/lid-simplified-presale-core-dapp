import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import CountDown from './CountDown';

export default function EndTimer({ expiryTimestamp }) {
  return (
    <Box
      display="block"
      w="100%"
      mt="40px"
      mb="40px"
      pl={{ base: '20px', lg: '0px' }}
      pr={{ base: '20px', lg: '0px' }}
      maxW="1200px"
      ml="auto"
      mr="auto"
      textAlign="center">
      <Text fontSize={{ base: '28px', sm: '36px' }} fontWeight="bold">
        SWFL Presale ends in
      </Text>
      <CountDown
        expiryTimestamp={expiryTimestamp == null ? new Date() : expiryTimestamp}
      />
      <Text
        fontSize={{ base: '12px', sm: '14px' }}
        fontWeight="light"
        mt="-20px">
        48 hour timer.
      </Text>
      <Text fontSize={{ base: '12px', sm: '14px' }} fontWeight="light">
        Ends after 48 hours or 1500 ETH.
      </Text>
    </Box>
  );
}
