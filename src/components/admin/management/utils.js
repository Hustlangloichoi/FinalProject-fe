/**
 * Helper function to parse API response data based on the fetchUrl
 * This centralizes the logic for extracting data from different API endpoints
 */
export const parseApiResponse = (response, fetchUrl, dataKey) => {
  const { data } = response;
  let items = [];
  let totalPages = 1;

  // Handle paginated responses for specific endpoints
  if (fetchUrl === "/products" && data?.data?.products) {
    items = data.data.products;
    totalPages = data.data.totalPages || 1;
  } else if (fetchUrl === "/orders" && data?.data?.orders) {
    items = data.data.orders;
    totalPages = data.data.totalPages || 1;
  } else if (fetchUrl === "/users" && data?.data?.users) {
    items = data.data.users;
    totalPages = data.data.totalPages || 1;
  } else if (fetchUrl === "/categories" && data?.data?.category) {
    items = data.data.category;
    totalPages = data.data.totalPages || 1;
  } else if (fetchUrl === "/messages" && data?.data?.messages) {
    items = data.data.messages;
    totalPages = data.data.totalPages || 1;
  }
  // Handle generic responses
  else if (dataKey && data?.[dataKey]) {
    items = data[dataKey];
  } else if (dataKey && data?.data?.[dataKey]) {
    items = data.data[dataKey];
  } else if (Array.isArray(data)) {
    items = data;
  } else if (Array.isArray(data?.data)) {
    items = data.data;
  } else if (data?.data && typeof data.data === "object") {
    const firstArray = Object.values(data.data).find(Array.isArray);
    items = firstArray || [];
  } else if (typeof data === "object") {
    const firstArray = Object.values(data).find(Array.isArray);
    items = firstArray || [];
  }

  return { items, totalPages };
};

/**
 * Helper function to convert numeric fields in form data
 */
export const convertNumericFields = (item, formFields) => {
  const result = { ...item };
  formFields.forEach((field) => {
    if (
      field.type === "number" &&
      result[field.key] !== undefined &&
      result[field.key] !== ""
    ) {
      result[field.key] = Number(result[field.key]);
    }
  });
  return result;
};

/**
 * Helper function to determine if a table should be paginated
 */
export const isPaginatedEndpoint = (fetchUrl) => {
  return [
    "/products",
    "/orders",
    "/users",
    "/categories",
    "/messages",
  ].includes(fetchUrl);
};
