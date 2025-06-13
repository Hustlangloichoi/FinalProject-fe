import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

function NotFoundPage() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        px: { xs: 2, sm: 0 },
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 480 },
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant={{ xs: "h5", sm: "h4" }} paragraph>
          Page not found!
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Sorry, we couldn’t find the page you requested.
        </Typography>
        <Button to="/" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
export default NotFoundPage;
