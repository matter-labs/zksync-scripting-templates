import { ethers } from "ethers";

// Format BigInt to decimal string (e.g.: 13370000000000000000 -> "13.37")
export const formatAmount = (amount: BigInt, decimals: number): string => {
  const result = ethers.formatUnits(amount.toString(), decimals).toString();
  if (result.endsWith(".0")) {
    return result.slice(0, -2);
  }
  return result;
}

// Parse decimal string to BigInt (e.g.: "13.37" -> 13370000000000000000)
export const parseAmount = (amount: string, decimals: number): BigInt => {
  return ethers.parseUnits(amount, decimals);
}

// Format BigInt to get token price (e.g.: "$13370.13315315")
export const formatTokenPrice = (amount: BigInt, decimals: number, price: number): number => {
  const tokenAmount = formatAmount(amount, decimals);
  return parseFloat(tokenAmount) * price;
}