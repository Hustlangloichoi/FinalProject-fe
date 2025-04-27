import ManagementTable from "./ManagementTable";

function CategoryManagement() {
  return (
    <ManagementTable
      title="Category Management"
      fetchUrl="/categories"
      addUrl="/categories"
      editUrl={(item) => `/categories/${item._id}`}
      deleteUrl={(item) => `/categories/${item._id}`}
      columns={[
        { label: "Name", render: (item) => item.name },
        { label: "Description", render: (item) => item.description },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Description", key: "description", required: false },
      ]}
      getInitialItem={() => ({ name: "", description: "" })}
      dataKey="category"
    />
  );
}

export default CategoryManagement;
