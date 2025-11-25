import { keccak256, toBytes } from 'viem';
import { Address, isAddress } from 'viem';

/**
 * Converts a customer number to a format suitable for contract queries
 * @param customerNumber - The customer number to convert
 * @param type - Type of conversion: 'stablecoin' (keccak256 hash) or 'bitcoin' (as-is)
 * @returns The converted value (either a keccak256 hash with 0x prefix or original string)
 * @throws Error if customerNumber is empty
 */
export function convertCustomerNumber(
  customerNumber: string,
  type: 'stablecoin' | 'bitcoin'
): string {
  if (!customerNumber || customerNumber.trim() === '') {
    throw new Error('Customer number cannot be empty');
  }

  if (type === 'stablecoin') {
    // Convert to keccak256 hash with 0x prefix
    try {
      const hash = keccak256(toBytes(customerNumber));
      return hash;
    } catch (error) {
      throw new Error(
        `Failed to convert customer number to keccak256 hash: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  } else if (type === 'bitcoin') {
    // Return as-is for Bitcoin
    return customerNumber.trim();
  }

  throw new Error(`Invalid type: ${type}`);
}

/**
 * Validates and converts a customer number to an Ethereum address
 * Useful for checking if the converted stablecoin customer number is a valid address
 * @param customerNumber - The customer number to convert
 * @returns The keccak256 hash as an Address
 * @throws Error if the conversion doesn't result in a valid address
 */
export function convertCustomerNumberToAddress(
  customerNumber: string
): Address {
  const hash = convertCustomerNumber(customerNumber, 'stablecoin');
  
  if (!isAddress(hash)) {
    throw new Error(`Converted customer number is not a valid Ethereum address: ${hash}`);
  }
  
  return hash;
}

/**
 * Validates a customer number format (basic validation)
 * @param customerNumber - The customer number to validate
 * @returns true if valid, false otherwise
 */
export function isValidCustomerNumber(customerNumber: string): boolean {
  if (!customerNumber || typeof customerNumber !== 'string') {
    return false;
  }
  
  // Customer numbers should be non-empty strings
  // Additional validation can be added here based on specific format requirements
  return customerNumber.trim().length > 0;
}
