export const statusOptions = [
  { value: "pending", label: "Pending", color: "warning" },
  { value: "completed", label: "Completed", color: "success" },
];

export const getStatusInfo = (status) => {
  const statusInfo = statusOptions.find(
    (option) => option.value === status?.toLowerCase()
  );
  return statusInfo || { value: "pending", label: "Pending", color: "warning" };
};

export const getPaymentMethodColor = (method) => {
  switch (method?.toLowerCase()) {
    case "credit card":
      return { color: "primary", icon: "💳" };
    case "paypal":
      return { color: "info", icon: "🅿️" };
    case "bank transfer":
    case "mb bank":
      return { color: "secondary", icon: "🏦" };
    case "cash on delivery":
    case "cod":
      return { color: "warning", icon: "💵" };
    default:
      return { color: "default", icon: "💰" };
  }
};

export const getUserInitials = (user) => {
  if (user?.name) {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
  if (user?.email) {
    return user.email.substring(0, 2).toUpperCase();
  }
  return "?";
};
