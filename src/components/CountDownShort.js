import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Text, Box } from '@chakra-ui/core';

export default function CountDownShort({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called')
  });

  useEffect(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp]);

  return (
    <Box w="100%" textAlign="center" mb="40px" position="relative">
      <Box display="inline-block" w={{ base: '40px', sm: '90px' }} m="5px">
        <Text fontSize={{ base: '24px', sm: '48px' }} color="lid.brand">
          {minutes.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={{ base: '12px', sm: '16px' }}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light">
          MINUTES
        </Text>
      </Box>
      <Box
        display="inline-block"
        m="5px"
        position="relative"
        top={{ base: '-24px', sm: '-36px' }}>
        <Text fontSize={{ base: '24px', sm: '48px' }} color="lid.brand" m="0px">
          :
        </Text>
      </Box>
      <Box display="inline-block" w={{ base: '40px', sm: '90px' }} m="105pxx">
        <Text fontSize={{ base: '24px', sm: '48px' }} color="lid.brand">
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={{ base: '12px', sm: '16px' }}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light">
          SECONDS
        </Text>
      </Box>
    </Box>
  );
}
