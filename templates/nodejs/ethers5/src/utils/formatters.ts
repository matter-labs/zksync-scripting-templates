import type { BigNumber, BigNumberish } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

// Format BigNumberish to decimal string (e.g.: 13370000000000000000 -> "13.37")
export const formatAmount = (amount: BigNumberish, decimals: number): string => {
  const result = formatUnits(amount.toString(), decimals).toString();
  if (result.endsWith(".0")) {
    return result.slice(0, -2);
  }
  return result;
}

// Parse decimal string to BigNumberish (e.g.: "13.37" -> 13370000000000000000)
export const parseAmount = (amount: string, decimals: number): BigNumber => {
  return parseUnits(amount, decimals);
}

// Format BigNumberish to get token price (e.g.: "$13370.13315315")
export const formatTokenPrice = (amount: BigNumberish, decimals: number, price: number): number => {
  const tokenAmount = formatAmount(amount, decimals);
  return parseFloat(tokenAmount) * price;
}