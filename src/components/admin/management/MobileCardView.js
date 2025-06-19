import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

const MobileCard = styled(Paper)`
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  min-height: 120px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 8px;
    margin-bottom: 8px;
    min-height: 100px;
  }

  @media (max-width: 360px) {
    padding: 6px;
    margin-bottom: 6px;
    min-height: 80px;
  }
`;

const CardField = styled(Box)`
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    margin-bottom: 4px;
  }

  @media (max-width: 360px) {
    margin-bottom: 3px;
  }
`;

const CardLabel = styled(Typography)`
  font-weight: 600;
  color: #666;
  font-size: 0.7rem;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin-bottom: 1px;
  }

  @media (max-width: 360px) {
    font-size: 0.6rem;
  }
`;

const CardValue = styled(Typography)`
  font-size: 0.85rem;
  color: #333;
  word-break: break-word;
  line-height: 1.3;
  min-height: 18px;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    min-height: 16px;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
    min-height: 14px;
  }
`;

const ActionsContainer = styled(Box)`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    gap: 4px;
    justify-content: center;
    margin-top: 6px;
    padding-top: 6px;
  }

  @media (max-width: 360px) {
    gap: 2px;
    margin-top: 4px;
    padding-top: 4px;
  }
`;

const MobileCardView = ({
  items,
  columns,
  customActions = [],
  onEdit,
  onDelete,
  editUrl,
  deleteUrl,
}) => {
  // Debug log to check data
  console.log("=== MobileCardView Debug ===");
  console.log("Items:", items);
  console.log("Items length:", items?.length);
  console.log("Columns:", columns);
  console.log("Columns length:", columns?.length);
  console.log("CustomActions:", customActions);
  console.log("================================");
  // Helper function to render cell value safely
  const renderCellValue = (column, item) => {
    try {
      if (column.render && typeof column.render === "function") {
        return column.render(item);
      }

      let value = item[column.key];

      // Handle undefined/null values
      if (value === null || value === undefined || value === "") {
        return "N/A";
      }

      // Handle boolean values
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }

      // Handle numbers
      if (typeof value === "number") {
        return value.toString();
      }

      // Handle dates
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }

      // Handle objects (convert to string representation)
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          return value.length > 0 ? value.join(", ") : "Empty";
        }
        return Object.keys(value).length > 0
          ? JSON.stringify(value)
          : "Empty Object";
      }

      // Handle strings
      const stringValue = String(value).trim();
      return stringValue.length > 0 ? stringValue : "N/A";
    } catch (error) {
      console.error("Error rendering cell value:", error);
      return "Error";
    }
  };
  // Show message if no items
  if (!items || items.length === 0) {
    return (
      <Box className="mobile-cards" sx={{ textAlign: "center", py: 4 }}>
        <CardValue
          variant="body1"
          sx={{ color: "#666", fontStyle: "italic", fontSize: "1rem" }}
        >
          📱 No data available to display
        </CardValue>
        <CardValue variant="body2" sx={{ color: "#999", mt: 1 }}>
          Items: {JSON.stringify(items)} | Length:{" "}
          {items?.length || "undefined"}
        </CardValue>
      </Box>
    );
  }

  // Show message if no columns
  if (!columns || columns.length === 0) {
    return (
      <Box className="mobile-cards" sx={{ textAlign: "center", py: 4 }}>
        <CardValue
          variant="body1"
          sx={{ color: "#666", fontStyle: "italic", fontSize: "1rem" }}
        >
          📋 No columns configured
        </CardValue>
        <CardValue variant="body2" sx={{ color: "#999", mt: 1 }}>
          Columns: {JSON.stringify(columns)} | Length:{" "}
          {columns?.length || "undefined"}
        </CardValue>
      </Box>
    );
  }
  return (
    <Box
      className="mobile-cards"
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "8px",
        margin: 0,
        "@media (max-width: 480px)": {
          padding: "4px",
        },
      }}
    >
      {items.map((item, idx) => {
        console.log(`=== Rendering Card ${idx} ===`);
        console.log("Item data:", item);

        return (
          <MobileCard key={item._id || item.id || idx} elevation={2}>
            {/* Show a title/identifier for each card */}
            {item.name && (
              <CardField sx={{ mb: 2, pb: 1, borderBottom: "1px solid #eee" }}>
                <CardValue variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
                  {item.name}
                </CardValue>
              </CardField>
            )}

            {columns.map((col, colIdx) => {
              const cellValue = renderCellValue(col, item);

              console.log(`Column ${colIdx} (${col.label}):`, {
                key: col.key,
                rawValue: item[col.key],
                renderedValue: cellValue,
                hasRender: !!col.render,
              });
              // Skip only if the cell value is truly empty or error
              if (
                cellValue === "N/A" ||
                cellValue === "Error" ||
                cellValue === null ||
                cellValue === undefined ||
                (typeof cellValue === "string" && cellValue.trim() === "")
              ) {
                console.log(
                  `Skipping column ${col.label} - empty/invalid value:`,
                  cellValue
                );
                return null;
              }
              return (
                <CardField key={colIdx}>
                  <CardLabel variant="caption">{col.label}</CardLabel>{" "}
                  <CardValue variant="body2">
                    {/* Handle React elements (like images) with size constraint */}
                    {React.isValidElement(cellValue) ? (
                      <Box
                        sx={{
                          "& img": {
                            maxWidth: "50px !important",
                            maxHeight: "50px !important",
                            width: "auto !important",
                            height: "auto !important",
                            objectFit: "cover",
                          },
                        }}
                      >
                        {cellValue}
                      </Box>
                    ) : (
                      String(cellValue)
                    )}
                  </CardValue>
                </CardField>
              );
            })}

            {/* Show actions only if there are any to show */}
            {(customActions.length > 0 || editUrl || deleteUrl) && (
              <ActionsContainer>
                {customActions.map((action, actionIdx) => (
                  <IconButton
                    key={actionIdx}
                    color={action.color || "primary"}
                    onClick={() => action.onClick(item)}
                    size="small"
                    title={action.label || "Action"}
                  >
                    {action.icon || <EditIcon />}
                  </IconButton>
                ))}
                {editUrl && (
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(item)}
                    size="small"
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {deleteUrl && (
                  <IconButton
                    color="error"
                    onClick={() => onDelete(item)}
                    size="small"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ActionsContainer>
            )}
          </MobileCard>
        );
      })}
    </Box>
  );
};

export default MobileCardView;
