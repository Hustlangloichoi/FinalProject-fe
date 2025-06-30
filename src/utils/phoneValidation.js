// phoneValidation.js: provides regex patterns and utility functions for validating and formatting phone numbers.
// - phoneRegex: regex patterns for Vietnam, international, and basic phone numbers
// - formatPhoneNumber: formats a phone number string for display
// - validatePhoneNumber: checks if a phone number is valid and returns a result object
// - sanitizePhoneNumber: removes spaces from a phone number string

export const phoneRegex = {
  vietnam: /^(\+84|84|0)([3|5|7|8|9])\d{8}$/,
  international: /^\+?[1-9]\d{1,14}$/,
  basic: /^[+]?[0-9\s\-()]{8,15}$/,
};

/**
 * Formats the given phone number string for display.
 * @param {string} value - The phone number string to format.
 * @returns {string} - The formatted phone number string.
 */
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("0") && cleaned.length <= 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (cleaned.startsWith("+84") && cleaned.length <= 13) {
    return cleaned.replace(/(\+84)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  }

  return cleaned;
};

/**
 * Validates the given phone number and returns an object with the validation result.
 * @param {string} phone - The phone number to validate.
 * @returns {{ isValid: boolean, message: string }} - The validation result object.
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === "") {
    return { isValid: true, message: "" };
  }

  const cleaned = phone.replace(/\s/g, "");

  if (phoneRegex.vietnam.test(cleaned)) {
    return { isValid: true, message: "Valid phone number" };
  }

  if (phoneRegex.international.test(cleaned)) {
    return { isValid: true, message: "Valid international number" };
  }

  return {
    isValid: false,
    message:
      "Please enter a valid phone number (e.g., 0901234567 or +84901234567)",
  };
};

/**
 * Removes spaces from the given phone number string.
 * @param {string} phone - The phone number string to sanitize.
 * @returns {string} - The sanitized phone number string.
 */
export const sanitizePhoneNumber = (phone) => {
  return phone.replace(/\s/g, "");
};
