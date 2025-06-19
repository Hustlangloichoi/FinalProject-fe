import { ManagementTable } from "./management";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import styled from "styled-components";
import ImageUpload from "./ImageUpload";

// Styled components for enhanced visuals
const StyledProductCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff9800 30%, #ff5722 90%);
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PriceDisplay = styled(Typography)`
  font-weight: 600;
  color: #2e7d32;
  font-size: 0.85rem;
`;

const QuantityChip = styled(Chip)`
  border-radius: 6px;
  font-size: 0.65rem;
  height: 20px;
`;

function ProductManagement() {
  const getProductInitials = (product) => {
    if (product?.name) {
      return product.name.substring(0, 2).toUpperCase();
    }
    return "PR";
  };
  const getQuantityColor = (quantity) => {
    if (quantity > 50) return "success";
    if (quantity > 10) return "warning";
    return "error";
  };

  // Desktop columns (existing complex layout)
  const desktopColumns = [
    {
      label: "Product",
      width: "400px", // Increased significantly for product info
      render: (item) => (
        <StyledProductCell>
          {item.image ? (
            <ProductImage
              src={item.image}
              alt={item.name || "Product"}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <ProductAvatar
            style={{
              display: item.image ? "none" : "flex",
            }}
          >
            {getProductInitials(item)}
          </ProductAvatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={500}
              noWrap
              sx={{ fontSize: "0.8rem" }}
            >
              {item.name || "Unknown Product"}
            </Typography>{" "}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: "0.7rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "280px", // Reduced to accommodate larger image
                display: "block",
              }}
              title={item.description}
            >
              {item.description || "No description"}
            </Typography>
          </Box>
        </StyledProductCell>
      ),
    },
    {
      label: "Price",
      width: "150px", // Increased for better spacing
      render: (item) => (
        <PriceDisplay>${item.price?.toLocaleString() || "0"}</PriceDisplay>
      ),
    },
    {
      label: "Stock",
      width: "120px", // Increased for better spacing
      render: (item) => (
        <QuantityChip
          label={item.quantity || "0"}
          color={getQuantityColor(item.quantity)}
          variant="outlined"
        />
      ),
    },
    {
      label: "Category",
      width: "200px", // Increased for better spacing
      render: (item) => (
        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
          {item.category?.name || "-"}
        </Typography>
      ),
    },
  ];

  return (
    <ManagementTable
      title="Product Management"
      fetchUrl="/products"
      addUrl="/products"
      editUrl={(item) => `/products/${item._id}`}
      deleteUrl={(item) => `/products/${item._id}`}
      tableContainerStyle={{
        width: "100%", // Changed from fixed minWidth to flexible width
        "& .MuiTableCell-root": {
          padding: "12px 16px", // Increased padding for larger images
          verticalAlign: "middle",
        },
        "& .MuiTable-root": {
          tableLayout: "fixed",
          width: "100%",
        },
        "& .MuiTableRow-root": {
          height: "100px", // Set minimum row height for large images
        },
      }}
      columns={desktopColumns} // Use desktop columns for table
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
        {
          label: "Product Image",
          key: "image",
          type: "custom",
          component: (value, onChange, error) => (
            <ImageUpload
              currentImage={value}
              onImageChange={(file, errorMsg) => {
                if (errorMsg) {
                  console.error("Image upload error:", errorMsg);
                } else {
                  onChange(file);
                }
              }}
              error={error}
            />
          ),
          required: false,
        },
        { label: "Category ID", key: "category", required: false },
      ]}
      getInitialItem={() => ({
        name: "",
        description: "",
        price: "",
        quantity: 0,
        image: "",
        category: "",
      })}
    />
  );
}

export default ProductManagement;
