import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import styled from "styled-components";

const DialogContentStyled = styled(DialogContent)`
  min-width: 320px;
`;

const FormDialog = ({
  open,
  onClose,
  title,
  formFields,
  formData,
  onInputChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContentStyled>
        {" "}
        {formFields.map((field) => {
          if (field.type === "custom") {
            return (
              <div key={field.key} style={{ margin: "16px 0" }}>
                <div
                  style={{
                    marginBottom: "8px",
                    fontSize: "0.875rem",
                    color: "#666",
                  }}
                >
                  {field.label}
                  {field.required && " *"}
                </div>
                {field.component(
                  formData[field.key],
                  (value) => onInputChange(field.key, value),
                  null // error - can be added later
                )}
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <FormControlLabel
                key={field.key}
                control={
                  <Checkbox
                    checked={formData[field.key] || false}
                    onChange={(e) => onInputChange(field.key, e.target.checked)}
                  />
                }
                label={field.label}
                sx={{ display: "block", mb: 2 }}
              />
            );
          }

          return (
            <TextField
              key={field.key}
              fullWidth
              label={field.label}
              required={field.required}
              type={field.type || "text"}
              value={formData[field.key] || ""}
              onChange={(e) => onInputChange(field.key, e.target.value)}
              margin="normal"
              multiline={field.multiline || false}
              rows={field.rows || 1}
            />
          );
        })}
      </DialogContentStyled>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
