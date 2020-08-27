import React from 'react';
import { Text, Box, Flex, Grid, Image, Link } from '@chakra-ui/core';
import { shortEther, toBN, toWei } from '../utils';
import { totalPresale } from '../config';
import addresses from '../contracts/addresses';

export default function Subheading({
  totalEth,
  totalDepositors,
  accountEthDeposit,
  accountShares,
  maxShares
}) {
  return (
    <Box
      w="100%"
      m="0"
      p={['20px', '20px', '0px']}
      pt="0px"
      pb="20px"
      bg="lid.bgMed"
      position="relative">
      <Box
        position="absolute"
        zIndex="1"
        left="0px"
        right="0px"
        bottom="0px"
        height="100px"
        bg="lid.bg"
      />
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        ml="auto"
        mr="auto"
        p="0px"
        pt="20px"
        pb="20px"
        position="relative"
        zIndex="2">
        <Grid
          w="100%"
          gap="20px"
          templateRows={{
            base: 'repeat(6, 1fr)',
            md: 'repeat(2, max-content)'
          }}
          templateColumns={{ base: 'auto', md: 'repeat(3, minmax(0, 1fr))' }}>
          <Box
            w="100%"
            borderRadius="5px"
            p="25px"
            border="solid 1px"
            borderColor="lid.stroke"
            bg="lid.bg">
            <Text fontSize="18px" m="0" p="0" color="lid.fgMed">
              Verified SWFL Presale Contract
            </Text>
            {addresses.presale ? (
              <Link
                wordBreak="break-word"
                color="lid.brand"
                href={'https://etherscan.io/address/' + addresses.presale}
                mt="15px"
                display="block">
                {addresses.presale}
              </Link>
            ) : (
              <Text>
                TBD
              </Text>
            )}
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="white"
            borderRadius="5px"
            p="25px"
            bg="linear-gradient(0deg, rgba(12,101,235,1) 0%, rgba(28,158,247,1) 100%)">
            <Image
              src="/ethereum-eth-logo-white.png"
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.bg" display="inline-block">
              Your ETH Deposits
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold">
              {shortEther(accountEthDeposit)}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="white"
            borderRadius="5px"
            p="25px"
            bg="linear-gradient(0deg, rgba(12,101,235,1) 0%, rgba(28,158,247,1) 100%)">
            <Image
              src="/logo.png"
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.bg" display="inline-block">
              Your SWFL Tokens
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold">
              {maxShares !== '0'
                ? shortEther(
                    toBN(accountShares)
                      .mul(toBN(toWei(totalPresale)))
                      .div(toBN(maxShares))
                  )
                : '0'}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg">
            <Image
              src="/Depositor.png"
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Total Presale Depositors
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {totalDepositors}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg">
            <Image
              src="/ethereum-eth-logo.png"
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Total ETH Deposited
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {shortEther(totalEth)}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg">
            <Image
              src="/logo.png"
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Total Presale SWFL
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {shortEther(toWei(totalPresale))}
            </Text>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}
