const WHITESPACE_REGEX = /\s/g;

/**
 * Check if a string is a valid string by checking
 * if it is all whitespace or not
 *
 * @param value - The string to check
 * @returns If the string is all whitespace or not
 */
export const isValidString = (value: string): boolean =>
  value.replace(WHITESPACE_REGEX, "").length > 0;
