import React, { useState, useEffect } from "react";
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
import { validatePhoneNumber, formatPhoneNumber } from "../../../utils/phoneValidation";

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
  const [phoneError, setPhoneError] = useState("");

  // Handle phone validation
  const handleInputChange = (key, value) => {
    if (key === "phone") {
      // Format phone as user types
      const formattedValue = formatPhoneNumber(value);
      
      // Validate phone if not empty (since it's optional)
      if (formattedValue.trim()) {
        const validation = validatePhoneNumber(formattedValue);
        setPhoneError(validation.isValid ? "" : validation.message);
      } else {
        setPhoneError(""); // Clear error if field is empty (optional field)
      }
      
      onInputChange(key, formattedValue);
    } else {
      onInputChange(key, value);
    }
  };

  // Clear phone error when dialog closes
  useEffect(() => {
    if (!open) {
      setPhoneError("");
    }
  }, [open]);
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
          }          return (
            <TextField
              key={field.key}
              fullWidth
              label={field.label}
              required={field.required}
              type={field.type || "text"}
              value={formData[field.key] || ""}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              margin="normal"
              multiline={field.multiline || false}
              rows={field.rows || 1}
              error={field.key === "phone" && !!phoneError}
              helperText={
                field.key === "phone" 
                  ? phoneError || "Format: 0901234567 or +84901234567"
                  : undefined
              }
              placeholder={
                field.key === "phone"
                  ? "Enter phone number (e.g., 0901234567)"
                  : undefined
              }
            />
          );
        })}
      </DialogContentStyled>      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={!!phoneError}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
