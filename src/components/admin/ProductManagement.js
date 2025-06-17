import ManagementTable from "./ManagementTable";

function ProductManagement() {
  return (
    <div>
      <ManagementTable
        title="Product Management"
        fetchUrl="/products"
        addUrl="/products"
        editUrl={(item) => `/products/${item._id}`}
        deleteUrl={(item) => `/products/${item._id}`}
        columns={[
          { label: "Name", render: (item) => item.name },
          { label: "Description", render: (item) => item.description || "-" },
          { label: "Price", render: (item) => `$${item.price}` },
          { label: "Quantity", render: (item) => item.quantity },
          { label: "Category", render: (item) => item.category?.name || "-" },
        ]}
        formFields={[
          { label: "Name", key: "name", required: true },
          { label: "Description", key: "description", required: false },
          { label: "Price", key: "price", type: "number", required: true },
          {
            label: "Quantity",
            key: "quantity",
            type: "number",
            required: true,
          },
          { label: "Image URL", key: "image", required: false },
          { label: "Category ID", key: "category", required: false },
        ]}
        getInitialItem={() => ({ 
          name: "", 
          description: "",
          price: "", 
          quantity: 0,
          image: "",
          category: ""
        })}
      />
    </div>
  );
}

export default ProductManagement;
