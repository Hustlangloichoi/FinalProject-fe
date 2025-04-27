import ManagementTable from "./ManagementTable";

function OrderManagement() {
  return (
    <ManagementTable
      title="Order Management"
      fetchUrl="/orders"
      addUrl={null} // Orders are not added from admin
      editUrl={null} // Orders are not edited from admin
      deleteUrl={(item) => `/orders/${item._id}`}
      columns={[
        { label: "Order ID", render: (item) => item._id },
        {
          label: "User",
          render: (item) => item.sender?.name || item.sender?.email || "-",
        },
        { label: "Product", render: (item) => item.product?.name || "-" },
        { label: "Content", render: (item) => item.content },
      ]}
      formFields={[]}
      getInitialItem={() => ({})}
      dataKey="orders"
    />
  );
}

export default OrderManagement;
