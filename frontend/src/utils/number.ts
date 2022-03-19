const NUMBER_REGEX = /^\d+$/;

/**
 * Check if a string is a valid number
 *
 * @param value - The string to check
 * @returns If the string is a valid number or not
 */
export const isValidNumber = (value: string): boolean =>
  !!value.match(NUMBER_REGEX);
