// Phone validation utilities
export const phoneRegex = {
  // Vietnam phone format: +84xxxxxxxxx hoặc 0xxxxxxxxx
  vietnam: /^(\+84|84|0)([3|5|7|8|9])\d{8}$/,

  // International format: +country_code + number
  international: /^\+?[1-9]\d{1,14}$/,
  // Loose format for basic validation
  basic: /^[+]?[0-9\s\-()]{8,15}$/,
};

export const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters except +
  const cleaned = value.replace(/[^\d+]/g, "");

  // Auto-format Vietnam numbers
  if (cleaned.startsWith("0") && cleaned.length <= 11) {
    // Format: 0xxx xxx xxxx
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (cleaned.startsWith("+84") && cleaned.length <= 13) {
    // Format: +84 xxx xxx xxxx
    return cleaned.replace(/(\+84)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  }

  return cleaned;
};

export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === "") {
    return { isValid: true, message: "" }; // Optional field
  }

  const cleaned = phone.replace(/\s/g, "");

  // Check Vietnam format first
  if (phoneRegex.vietnam.test(cleaned)) {
    return { isValid: true, message: "Valid phone number" };
  }

  // Check international format
  if (phoneRegex.international.test(cleaned)) {
    return { isValid: true, message: "Valid international number" };
  }

  return {
    isValid: false,
    message:
      "Please enter a valid phone number (e.g., 0901234567 or +84901234567)",
  };
};

export const sanitizePhoneNumber = (phone) => {
  // Remove spaces and format for backend
  return phone.replace(/\s/g, "");
};
