import { useState } from "react";
import { ManagementTable } from "./management";
import apiService from "../../app/apiService";

// Import order utilities separately to debug
import {
  getStatusInfo,
  getPaymentMethodColor,
  getUserInitials,
} from "./order/OrderUtils";

import { createOrderTableColumns } from "./order/OrderTableColumns";
import OrderDetailsDialog from "./order/OrderDetailsDialog";
import OrderSnackbar from "./order/OrderSnackbar";

function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [refreshTable, setRefreshTable] = useState(0);

  const handleStatusToggle = async (order) => {
    const newStatus = order.status === "pending" ? "completed" : "pending";

    try {
      const response = await apiService.put(`/orders/${order._id}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        if (selectedOrder && selectedOrder._id === order._id) {
          setSelectedOrder({
            ...selectedOrder,
            status: newStatus,
          });
        }

        setSnackbar({
          open: true,
          message: `Order status updated to ${newStatus}!`,
          severity: "success",
        });

        setRefreshTable((prev) => prev + 1);
      } else {
        setSnackbar({
          open: true,
          message: response.data.message || "Failed to update order status",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Network error. Please try again.",
        severity: "error",
      });
    }
  };

  // Desktop columns (existing complex layout)
  const tableColumns = createOrderTableColumns({
    handleStatusToggle,
    getStatusInfo,
    getPaymentMethodColor,
    getUserInitials,
  });
  const orderTableStyle = {
    width: "100%", // Changed from fixed minWidth to flexible width
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    "& .MuiTableCell-root": {
      padding: "12px 16px",
      borderRight: "1px solid #e0e0e0",
      fontSize: "0.875rem",
      "&:last-child": {
        borderRight: "none",
      },
    },
    "& .MuiTableHead .MuiTableCell-root": {
      backgroundColor: "#f5f5f5",
      fontWeight: 600,
      borderBottom: "2px solid #d0d0d0",
    },
    "& .MuiTableBody .MuiTableRow-root": {
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9f9f9",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "#ffffff",
      },
      "&:hover": {
        backgroundColor: "#f5f5f5 !important",
      },
      borderBottom: "1px solid #e0e0e0",
    },
    "& .MuiTable-root": {
      tableLayout: "fixed",
      width: "100%",
    },
  };

  return (
    <>
      <ManagementTable
        key={refreshTable}
        title="Order Management"
        fetchUrl="/orders"
        addUrl={null}
        editUrl={null}
        deleteUrl={(item) => `/orders/${item._id}/admin`}
        customActions={[
          {
            label: "View Details",
            onClick: setSelectedOrder,
            color: "primary",
          },
        ]}
        tableContainerStyle={orderTableStyle}
        columns={tableColumns}
        formFields={[]}
        getInitialItem={() => ({})}
        dataKey="orders"
      />

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusToggle={handleStatusToggle}
        getPaymentMethodColor={getPaymentMethodColor}
      />

      <OrderSnackbar
        snackbar={snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default OrderManagement;
