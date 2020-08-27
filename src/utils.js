import { utils } from 'web3';

export const toBN = utils.toBN;
export const toWei = utils.toWei;
export const fromWei = utils.fromWei;

export function removeDecimal(decimalString) {
  decimalString = decimalString.toString();
  if (!decimalString.includes('.')) return decimalString;
  return decimalString.substring(0, decimalString.indexOf('.'));
}

export function shortenDecimal(decimalString) {
  decimalString = decimalString.toString();
  if (!decimalString.includes('.')) return decimalString;
  return decimalString.substring(0, decimalString.indexOf('.'));
}

export function shortEther(wei) {
  if (wei === undefined || wei == null) return '';

  wei = wei.toString();
  if (wei === '') return '';

  const etherString = removeDecimal(fromWei(wei));

  if (toBN(etherString).lt(toBN('1'))) {
    return Number(Number(fromWei(wei)).toPrecision(4)).toString();
  }

  if (toBN(etherString).lt(toBN('1000'))) {
    return Number(fromWei(wei)).toPrecision(4).toString();
  }
  const etherBN = toBN(etherString);
  let resultInteger = '';
  let resultDecimal = '';
  let resultSuffix = '';
  if (etherBN.div(toBN('1000000')).gt(toBN('0'))) {
    resultSuffix = 'M';
    resultInteger = etherBN.div(toBN('1000000')).toString();
    if (resultInteger.length < 3) {
      resultDecimal =
        etherBN.sub(toBN(resultInteger).mul(toBN('1000000'))).toNumber() /
        1000000;
    }
  } else if (etherBN.div(toBN('1000')).gt(toBN('0'))) {
    resultSuffix = 'K';
    resultInteger = etherBN.div(toBN('1000')).toString();
    if (resultInteger.length < 3) {
      resultDecimal =
        etherBN.sub(toBN(resultInteger).mul(toBN('1000'))).toNumber() / 1000;
    }
  } else {
    resultInteger = etherString;
  }

  if (resultDecimal === '0') {
    if (resultInteger.length === 1) {
      resultDecimal = '.00';
    } else if (resultInteger.length === 2) {
      resultDecimal = '.0';
    }
  } else if (resultDecimal !== '') {
    if (resultInteger.length === 1) {
      resultDecimal = resultDecimal.toPrecision(2).substr(1);
    } else {
      resultDecimal = resultDecimal.toPrecision(1).substr(1);
    }
  }

  return resultInteger + resultDecimal + resultSuffix;
}
