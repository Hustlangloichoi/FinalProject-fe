import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ManagementTable from "./ManagementTable";

function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <ManagementTable
        title="Order Management"
        fetchUrl="/orders"
        addUrl={null} // Orders are not added from admin
        editUrl={null} // Orders are not edited from admin
        deleteUrl={(item) => `/orders/${item._id}`}
        columns={[
          {
            label: "User",
            render: (item) => item.sender?.name || item.sender?.email || "-",
          },
          { label: "Product", render: (item) => item.product?.name || "-" },
          {
            label: "Quantity",
            render: (item) => item.quantity || "-",
          },
          {
            label: "Total Price",
            render: (item) => item.totalPrice || "-",
          },
          {
            label: "Payment Method",
            render: (item) => item.paymentMethod || "-",
          },
          {
            label: "Payment Details",
            render: (item) => item.paymentDetails || "-",
          },
          {
            label: "",
            render: (item) => (
              <Button variant="contained" onClick={() => setSelectedOrder(item)}>
                Details
              </Button>
            ),
          },
        ]}
        formFields={[]}
        getInitialItem={() => ({})}
        dataKey="orders"
      />

      {selectedOrder && (
        <Dialog open={true} onClose={() => setSelectedOrder(null)}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <p><strong>ID:</strong> {selectedOrder._id}</p>
            <p><strong>User:</strong> {selectedOrder.sender?.name || selectedOrder.sender?.email || "-"}</p>
            <p><strong>Product:</strong> {selectedOrder.product?.name || "-"}</p>
            <p><strong>Note:</strong> {selectedOrder.note}</p>
            <p><strong>Phone Number:</strong> {selectedOrder.phoneNumber || "-"}</p>
            <p><strong>Address:</strong> {selectedOrder.address || "-"}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity || "-"}</p>
            <p><strong>Total Price:</strong> {selectedOrder.totalPrice || "-"}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || "-"}</p>
            <p><strong>Payment Details:</strong> {selectedOrder.paymentDetails || "-"}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedOrder(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default OrderManagement;
