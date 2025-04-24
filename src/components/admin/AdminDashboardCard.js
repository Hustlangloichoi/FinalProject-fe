import { Paper, Typography } from "@mui/material";

function AdminDashboardCard({ title, description, onClick }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        minWidth: 300,
        width: 320,
        height: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
      onClick={onClick}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Paper>
  );
}

export default AdminDashboardCard;
