import ManagementTable from "./ManagementTable";

function UserManagement() {
  return (
    <ManagementTable
      title="User Management"
      fetchUrl="/users"
      addUrl="/users"
      editUrl={(item) => `/users/${item._id}`}
      deleteUrl={(item) => `/users/${item._id}`}
      columns={[
        { label: "Name", render: (item) => item.name },
        { label: "Email", render: (item) => item.email },
        { label: "Phone", render: (item) => item.phone }, // Added phone column
        { label: "Address", render: (item) => item.address }, // Added address column
        {
          label: "Role",
          render: (item) => item.role || (item.isAdmin ? "admin" : "user"),
        },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Email", key: "email", required: true },
        { label: "Phone", key: "phone", required: false }, // Added phone field
        { label: "Address", key: "address", required: false }, // Added address field
        {
          label: "Password",
          key: "password",
          type: "password",
          required: true,
        },
        { label: "Admin", key: "isAdmin", type: "checkbox", required: false },
      ]}
      getInitialItem={() => ({
        name: "",
        email: "",
        phone: "", // Added phone field
        address: "", // Added address field
        password: "",
        isAdmin: false,
      })}
      dataKey="users"
    />
  );
}

export default UserManagement;
