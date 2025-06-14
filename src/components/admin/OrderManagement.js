import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import ManagementTable from "./ManagementTable";

function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", // Default width for larger screens
          mx: "auto",
          p: 2,
          "@media screen and (max-width: 768px)": {
            display: "none", // Hide the dashboard on smaller screens
          },
        }}
      >
        <Button
          variant="contained"
          sx={{ display: { xs: "block", md: "none" } }} // Show menu button on small screens
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </Button>
        {menuOpen && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 10,
            }}
          >
            {/* Render the dashboard content here */}
          </Box>
        )}
      </Box>

      <ManagementTable
        title="Order Management"
        fetchUrl="/orders" // Fetch order data from the backend
        addUrl={null} // Orders are not added from admin
        editUrl={null} // Orders are not edited from admin
        deleteUrl={(item) => `/orders/${item._id}`}
        columns={[ // Define columns to display fetched data
          {
            label: "User",
            render: (item) => item.sender?.name || item.sender?.email || "-",
          },
          {
            label: "Product",
            render: (item) => item.product?.name || "-",
          },
          {
            label: "Quantity",
            render: (item) => item.quantity || "-",
          },
          {
            label: "Total Price",
            render: (item) => {
              const calculatedTotalPrice = (item.quantity || 0) * (item.product?.price || 0);
              return calculatedTotalPrice ? calculatedTotalPrice.toFixed(2) : "-";
            },
          },
          {
            label: "Note",
            render: (item) => item.note || "-",
          },
          {
            label: "Phone Number",
            render: (item) => item.phoneNumber || "-",
          },
          {
            label: "Address",
            render: (item) => item.address || "-",
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
