import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  NumberInput,
  NumberInputField
} from '@chakra-ui/core';
import { shortenDecimal, toBN, toWei, fromWei } from '../utils.js';
import { referralBP, basisPoint } from '../config';

export default function DepositForm({
  rate,
  cap,
  accountDeposit,
  setVal,
  val,
  hardcap,
  totalEth,
  handleClick
}) {
  const [displayVal, setDisplayVal] = useState('');

  const availableByAccountDeposit = toBN(cap).gte(toBN(accountDeposit))
    ? toBN(cap)
        .sub(toBN(accountDeposit))
        .add(
          toBN(cap)
            .sub(toBN(accountDeposit))
            .mul(toBN(referralBP))
            .div(toBN(basisPoint))
        )
    : toBN('1');
  const availableByTotalDeposit = toBN(hardcap).gte(toBN(totalEth))
    ? toBN(hardcap)
        .sub(toBN(totalEth))
        .add(
          toBN(hardcap)
            .sub(toBN(totalEth))
            .mul(toBN(referralBP))
            .div(toBN(basisPoint))
        )
    : toBN('1');
  
  const availableMax = availableByAccountDeposit.gte(availableByTotalDeposit)
    ? availableByTotalDeposit
    : availableByAccountDeposit;

  useEffect(() => {
    if (displayVal !== '' && !isNaN(displayVal)) setVal(toWei(displayVal));
  }, [displayVal]);

  return (
    <Box
      w="100%"
      maxWidth="1200px"
      ml="auto"
      mr="auto"
      mt="60px"
      mb="60px"
      pl={{ base: '20px', lg: '0px' }}
      pr={{ base: '20px', lg: '0px' }}>
      <Box
        w="100%"
        p="20px"
        textAlign="left"
        color="lid.fg"
        position="relative"
        border="solid 1px"
        borderColor="lid.stroke">
        <Text fontSize={{ base: '24px', sm: '36px' }} fontWeight="bold">
          Deposit ETH for SWFL
        </Text>
        <Text fontSize="18px" color="blue.500">
          Minimum 0.01 ETH, Maximum 20 ETH
        </Text>
        <Text fontSize="18px" color="red.500">
          Your Available Max: {shortenDecimal(fromWei(availableMax))} ETH
        </Text>
        <Text fontSize="18px">
          Estimated SWFL:{' '}
          {!val
            ? '0'
            : shortenDecimal(
                fromWei(
                  toBN(val)
                    .mul(toBN(rate))
                    .mul(toBN('10000'))
                    .div(toBN('10250'))
                    .div(toBN(toWei('1')))
                )
              )}
        </Text>

        <NumberInput
          fontSize="18px"
          w="100%"
          maxW="600px"
          mb="0px"
          display="inline-block"
          value={displayVal}
          min={0.01}
          max={fromWei(availableMax)}
          mt="10px"
          step="any"
          precision="any">
          <NumberInputField
            w="100%"
            h="50px"
            border="solid 2px"
            borderColor="lid.stroke"
            borderRadius="30px"
            pl="20px"
            fontSize="18px"
            position="relative"
            zIndex="1"
            step="any"
            precision="any"
            pattern="[0-9\.]*"
            type="number"
            bg="lid.bg"
            color="lid.fg"
            placeholder="Amount of ETH to deposit."
            whilePlaceholder={{ color: 'lid.fgMed' }}
            onChange={(e) => {
              if (isNaN(e.target.value)) return;
              if (e.target.value === '') {
                setDisplayVal('');
              } else if (Number(e.target.value) > 140000000) {
                setDisplayVal('140000000');
              } else if (Number(e.target.value) < 0) {
                setDisplayVal('0');
              } else {
                setDisplayVal(e.target.value);
              }
            }}
          />
          <Button
            fontSize="18px"
            display="inline-block"
            border="solid 2px"
            borderRadius="25px"
            bg="lid.buttonBg"
            color="lid.fgLight"
            w="120px"
            h="50px"
            position="absolute"
            right="0px"
            zIndex="2"
            m="0px"
            borderColor="lid.buttonBg"
            onClick={() => setDisplayVal(fromWei(availableMax))}>
            Max
          </Button>
        </NumberInput>
        <Button
          variantColor="blue"
          bg="lid.brand"
          color="white"
          border="none"
          display="block"
          borderRadius="25px"
          w="200px"
          h="50px"
          m="0px"
          mt="30px"
          fontWeight="regular"
          fontSize="18px"
          onClick={handleClick}>
          Deposit
        </Button>
      </Box>
    </Box>
  );
}
