import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import Torus from '@toruslabs/torus-embed';
import Authereum from 'authereum';
import UniLogin from '@unilogin/provider';
import Portis from '@portis/web3';
import Squarelink from 'squarelink';
import MewConnect from '@myetherwallet/mewconnect-web-client';

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: '29a7f0c37b214a90934bec1b032d5c8f' // required
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: 'pk_live_B853BB3433E80B5B' // required
    }
  },
  torus: {
    package: Torus // required
  },
  authereum: {
    package: Authereum // required
  },
  unilogin: {
    package: UniLogin // required
  },
  portis: {
    package: Portis, // required
    options: {
      id: '9b1635c2-43f4-4cbe-b8b6-73bf219d6a77' // required
    }
  },
  squarelink: {
    package: Squarelink, // required
    options: {
      id: '48ff2cdfaf26656bbd86' // required
    }
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: '53a6aee5a5c74599b815999befb91ecc' // required
    }
  }
};

export const totalPresale = '11400000';

export const infura_ids = [
  '0764bdc3bf3f4eb7b38dc5b45d652bc9',
  '23427d6792604256b324ceaebd638800',
  '14edb7254c744027a0eba88604561a1b',
  '6c3420cb4c214fb1b4c85f7bee4e9288',
  '200a5f18716c42faa4aa99e7d585d2eb',
  '301ca1cb214744b69c68548011cf9e1d'
];

export const referralBP = '250';
export const basisPoint = '10000';
