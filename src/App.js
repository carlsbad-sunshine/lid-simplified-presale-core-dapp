import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { createWatcher } from '@makerdao/multicall';
import { ThemeProvider, CSSReset, Box, Text } from '@chakra-ui/core';

import Header from './components/Header';
import Subheading from './components/Subheading';
import EndTimer from './components/EndTimer';
import StartTimer from './components/StartTimer';
import ReferralCode from './components/ReferralCode';
import Footer from './components/Footer';
import DepositForm from './components/DepositForm';
import PresaleCompletion from './components/PresaleCompletion';
import Claimer from './components/Claimer';

import { toBN, toWei } from './utils.js';
import { providerOptions, totalPresale, infura_ids } from './config';
import addresses from './contracts/addresses';
import abis from './contracts/abis';

import theme from './theme';

const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const defaultWatcher = createWatcher([], {});
const walletWatcher = createWatcher([], {});

function App() {
  const [address, setAddress] = useState();
  const [provider, setProvider] = useState(
    new Web3.providers.HttpProvider(
      'https://mainnet.infura.io/v3/' +
        infura_ids[Math.floor((Math.random() * 100) % 6)]
    )
  );
  const [web3, setWeb3] = useState(new Web3(provider));

  const [isActive, setIsActive] = useState(false);

  const [lidPresaleSC, setLidPresale] = useState(null);

  const [depositVal, setDepositVal] = useState('');

  const [state, setState] = useState({
    startTime: Date.UTC(2020, 7, 27, 4, 0, 0, 0),
    endTime: null,
    totalEth: '0',
    totalDepositors: '0',
    accountShares: '0',
    accountEthDeposit: '0',
    currentPrice: '0',
    maxDeposit: '0',
    earnedReferrals: '0',
    referralCounts: '0',
    finalEndTime: '0',
    accountRedeemable: '0',
    accountClaimedTokens: '0',
    maxShares: '0',
    hardcap: '0',
    isEnded: false,
    isPaused: false
  });

  const {
    startTime,
    endTime,
    totalEth,
    totalDepositors,
    accountShares,
    accountEthDeposit,
    currentPrice,
    maxDeposit,
    earnedReferrals,
    referralCounts,
    finalEndTime,
    accountRedeemable,
    accountClaimedTokens,
    maxShares,
    hardcap,
    isEnded,
    isPaused
  } = state;

  let referralAddress = window.location.hash.substr(2);
  if (!referralAddress || referralAddress.length !== 42)
    referralAddress = '0x0000000000000000000000000000000000000000';

  useEffect(() => {
    if (!web3) {
      return;
    }

    const multiCallConfig = {
      web3,
      multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
      interval: 10000
    };

    const presale = new web3.eth.Contract(abis.presale, addresses.presale);
    setLidPresale(presale);

    defaultWatcher.stop();

    defaultWatcher.recreate(
      [
        {
          call: ['getEthBalance(address)(uint256)', addresses.presale],
          returns: [['totalEth', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['totalDepositors()(uint256)'],
          returns: [['totalDepositors', (val) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['finalEndTime()(uint256)'],
          returns: [['finalEndTime', (val) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['isPresaleEnded()(bool)'],
          returns: [['isEnded']]
        },
        {
          target: addresses.presale,
          call: ['getMaxWhitelistedDeposit()(uint256)'],
          returns: [['maxDeposit', (val) => val.toString()]]
        },
        {
          target: addresses.timer,
          call: ['endTime()(uint256)'],
          returns: [['endTime', (val) => new Date(val * 1000)]]
        },
        {
          target: addresses.presale,
          call: ['hardcap()(uint256)'],
          returns: [['hardcap', (val) => val.toString()]]
        }
      ],
      multiCallConfig
    );

    defaultWatcher.subscribe((update) => {
      setState((prevState) => ({
        ...prevState,
        [update.type]: update.value
      }));
    });

    defaultWatcher.start();
  }, [web3]);

  useEffect(() => {
    if (!web3 || !address || hardcap === '0') {
      return;
    }

    const multiCallConfig = {
      web3,
      multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
      interval: 10000
    };

    walletWatcher.stop();

    walletWatcher.recreate(
      [
        {
          target: addresses.redeemer,
          call: ['accountShares(address)(uint256)', address],
          returns: [['accountShares', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['accountDeposits(address)(uint256)', address],
          returns: [['accountEthDeposit', (val) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['earnedReferrals(address)(uint256)', address],
          returns: [['earnedReferrals', (val) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['referralCounts(address)(uint256)', address],
          returns: [['referralCounts', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['accountClaimedTokens(address)(uint256)', address],
          returns: [['accountClaimedTokens', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['getMaxShares(uint256)(uint256)', hardcap],
          returns: [['maxShares', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: [
            'calculateRatePerEth(uint256,uint256,uint256)(uint256)',
            toWei(totalPresale),
            totalEth,
            hardcap
          ],
          returns: [['currentPrice', (val) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: [
            'calculateReedemable(address,uint256,uint256)(uint256)',
            address,
            finalEndTime,
            toWei(totalPresale)
          ],
          returns: [['accountRedeemable', (val) => val.toString()]]
        }
      ],
      multiCallConfig
    );

    walletWatcher.subscribe((update) => {
      const { type, value } = update;
      setState((prevState) => ({
        ...prevState,
        [type]: value
      }));
    });

    walletWatcher.start();
  }, [web3, address, finalEndTime, totalEth, hardcap]);

  const handleDeposit = async function () {
    if (!depositVal) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    if (toBN(depositVal).lt(toBN(toWei('0.01')))) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    if (toBN(maxDeposit).lt(toBN(depositVal))) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    const balance = await web3.eth.getBalance(address);
    if (toBN(balance).lt(toBN(depositVal))) {
      alert('Must enter a value lower than your ETH balance.');
      return;
    }
    await lidPresaleSC.methods
      .deposit(referralAddress)
      .send({ from: address, value: depositVal });
    alert(
      'Deposit request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

  const handleLidClaim = async function () {
    if (toBN(accountRedeemable).lt(toBN('1'))) {
      alert('You must have at least 1 wei of SWFL to claim.');
      return;
    }
    await lidPresaleSC.methods.redeem().send({ from: address });
    alert(
      'Claim request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

  const handleSendToUniswap = async function () {
    await lidPresaleSC.methods.sendToUniswap().send({ from: address });
  };

  const handleIssueTokens = async function () {
    await lidPresaleSC.methods.issueTokens().send({ from: address });
  };

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setAddress('');
    setWeb3(null);
    setProvider(null);
  };

  //TODO: event subscriptions to auto update UI
  const subscribeProvider = async (provider, web3) => {
    if (!provider.on) {
      return;
    }
    provider.on('close', () => resetApp(web3));
    provider.on('accountsChanged', async (accounts) => {
      setAddress(accounts[0]);
    });
  };

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    const web3 = await new Web3(provider);
    await subscribeProvider(provider, web3);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    setAddress(address);
    setProvider(provider);
    setWeb3(web3);
  };

  useEffect(() => {
    if (window.web3) onConnect();
  }, []);

  useEffect(() => {
    setIsActive(true);
    if (Date.now() < startTime) {
      let interval = setInterval(() => {
        setIsActive(Date.now() > startTime);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setIsActive(true);
    }
  }, [startTime]);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Header address={address} onConnect={onConnect} />
      <Subheading
        totalEth={totalEth}
        totalDepositors={totalDepositors}
        accountEthDeposit={accountEthDeposit}
        accountShares={accountShares}
        maxShares={maxShares}
      />
      {isPaused && (
        <>
          <Text
            fontSize="36px"
            textAlign="center"
            color="lid.brandDark"
            mt="60px">
            Presale Paused.
          </Text>
          <Text textAlign="center" mb="200px">
            Please be patient. Upgrades underway.
          </Text>
        </>
      )}
      {isActive && isEnded && !isPaused && (
        <Claimer
          accountShares={accountShares}
          handleLidClaim={handleLidClaim}
          maxShares={maxShares}
          finalEndTime={finalEndTime}
          accountRedeemable={accountRedeemable}
          accountClaimedTokens={accountClaimedTokens}
        />
      )}
      {isActive && !isEnded && !isPaused && (
        <>
          <EndTimer expiryTimestamp={endTime} />
          <DepositForm
            rate={currentPrice}
            hardcap={hardcap}
            totalEth={totalEth}
            cap={toWei('20')}
            accountDeposit={accountEthDeposit}
            setVal={setDepositVal}
            val={depositVal}
            handleClick={handleDeposit}
          />
        </>
      )}
      {!isActive && !isEnded && !isPaused && (
        <StartTimer expiryTimestamp={startTime} />
      )}
      <ReferralCode
        address={address}
        earnedReferrals={earnedReferrals}
        referralCounts={referralCounts}
      />
      <Box
        w="100%"
        maxW="1200px"
        bg="lid.stroke"
        height="1px"
        mt="40px"
        mb="40px"
        ml="auto"
        mr="auto"
      />
      {isActive &&
        isEnded &&
        !isPaused && (
          <PresaleCompletion
            isEnded={isEnded}
            handleSendToUniswap={handleSendToUniswap}
            handleIssueTokens={handleIssueTokens}
          />
        )}

      <Footer />
    </ThemeProvider>
  );
}

export default App;
