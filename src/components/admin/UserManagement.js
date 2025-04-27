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
        {
          label: "Role",
          render: (item) => item.role || (item.isAdmin ? "admin" : "user"),
        },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Email", key: "email", required: true },
        {
          label: "Password",
          key: "password",
          type: "password",
          required: true,
        },
        { label: "Role", key: "role", required: true },
      ]}
      getInitialItem={() => ({
        name: "",
        email: "",
        password: "",
        role: "user",
      })}
      dataKey="users"
    />
  );
}

export default UserManagement;
