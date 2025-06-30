// index.js: utility functions for formatting numbers as currency, percent, with separators, or shortened notation.
import numeral from "numeral";

/**
 * Format number as currency string
 * @param {number} number - The number to be formatted
 * @returns {string} - The formatted currency string
 */
export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

/**
 * Format number as percent string
 * @param {number} number - The number to be formatted
 * @returns {string} - The formatted percent string
 */
export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

/**
 * Format number with thousand separators
 * @param {number} number - The number to be formatted
 * @returns {string} - The formatted number string
 */
export function fNumber(number) {
  return numeral(number).format();
}

/**
 * Format number as shortened string (e.g. 1.2k, 3.4m)
 * @param {number} number - The number to be formatted
 * @returns {string} - The formatted shortened string
 */
export function fShortenNumber(number) {
  return numeral(number).format("0.00a").replace(".00", "");
}
