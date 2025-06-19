import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Note } from "@mui/icons-material";

const OrderFormNotes = ({ note, setNote }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Note />
          Additional Notes
        </Typography>

        <TextField
          label="Note (Optional)"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          fullWidth
          size={isMobile ? "small" : "medium"}
          multiline
          rows={3}
          placeholder="Any special instructions or notes..."
        />
      </CardContent>
    </Card>
  );
};

export default OrderFormNotes;
