import { NETWORKS } from "./model";

export const toHex = (num) => `0x${num.toString(16)}`;

export const getNetworkByUniqueId = (_id) => {
  try {
    return NETWORKS[_id];
  } catch (error) {
    return null;
  }
};

export const convertBigNumberToDecimal = (value, decimal) => {
  let num = Number(value.toString());
  let denom = Math.pow(10, decimal);
  return num / denom;
};

