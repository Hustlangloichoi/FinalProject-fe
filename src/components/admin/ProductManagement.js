import ManagementTable from "./ManagementTable";

function ProductManagement() {
  return (
    <ManagementTable
      title="Product Management"
      fetchUrl="/products"
      addUrl="/products"
      editUrl={(item) => `/products/${item._id}`}
      deleteUrl={(item) => `/products/${item._id}`}
      columns={[
        { label: "Name", render: (item) => item.name },
        { label: "Price", render: (item) => `$${item.price}` },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Price", key: "price", type: "number", required: true },
      ]}
      getInitialItem={() => ({ name: "", price: "" })}
    />
  );
}

export default ProductManagement;
