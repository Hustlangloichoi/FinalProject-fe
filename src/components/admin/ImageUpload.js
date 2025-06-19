import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { CloudUpload, Delete, Image as ImageIcon } from "@mui/icons-material";
import styled from "styled-components";

const UploadContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2196f3;
    background-color: #f5f5f5;
  }
`;

const PreviewContainer = styled(Box)`
  position: relative;
  display: inline-block;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f44336 !important;
  color: white !important;
  width: 28px !important;
  height: 28px !important;

  &:hover {
    background-color: #d32f2f !important;
  }
`;

const ImageUpload = ({
  currentImage,
  onImageChange,
  loading = false,
  error = null,
  maxSize = 5, // MB
}) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [dragOver, setDragOver] = useState(false);

  // Update preview when currentImage changes
  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onImageChange(null, "Only image files are allowed!");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      onImageChange(null, `File size must be less than ${maxSize}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Call parent callback
    onImageChange(file, null);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null, null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <UploadContainer
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          borderColor: dragOver ? "#2196f3" : "#e0e0e0",
          backgroundColor: dragOver ? "#e3f2fd" : "#fafafa",
        }}
      >
        {preview ? (
          <PreviewContainer>
            <Avatar
              src={preview}
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
              }}
              variant="rounded"
            >
              <ImageIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <DeleteButton
              size="small"
              onClick={handleRemove}
              disabled={loading}
            >
              <Delete sx={{ fontSize: 16 }} />
            </DeleteButton>
          </PreviewContainer>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CloudUpload sx={{ fontSize: 48, color: "#bdbdbd", mb: 1 }} />
            <Typography variant="body1" color="textSecondary">
              Drag & drop an image here, or click to select
            </Typography>
          </Box>
        )}

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload-input"
          type="file"
          onChange={handleInputChange}
          disabled={loading}
        />

        <label htmlFor="image-upload-input">
          <Button
            variant="outlined"
            component="span"
            startIcon={
              loading ? <CircularProgress size={20} /> : <CloudUpload />
            }
            disabled={loading}
            sx={{ minWidth: 140 }}
          >
            {loading
              ? "Uploading..."
              : preview
              ? "Change Image"
              : "Select Image"}
          </Button>
        </label>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Supported formats: JPG, PNG, GIF, WebP
          <br />
          Maximum size: {maxSize}MB
        </Typography>
      </UploadContainer>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ImageUpload;
