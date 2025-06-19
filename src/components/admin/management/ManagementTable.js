import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";
import apiService from "../../../app/apiService";
import { updateProductWithImage } from "../../../app/apiService";

// Import responsive styles
import "./responsive.css";

// Import our refactored components
import TableHeader from "./TableHeader";
import DataTable from "./DataTable";
import MobileCardView from "./MobileCardView";
import FormDialog from "./FormDialog";
import TablePagination from "./TablePagination";
import {
  parseApiResponse,
  convertNumericFields,
  isPaginatedEndpoint,
} from "./utils";

const TableContainerStyled = styled(Box)`
  margin-bottom: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  width: 100%;

  // Responsive improvements
  @media (max-width: 768px) {
    margin-bottom: 16px;
    border-radius: 6px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

/**
 * Refactored ManagementTable component
 * Now split into smaller, more manageable components
 */
const ManagementTable = forwardRef(
  (
    {
      title,
      fetchUrl,
      addUrl,
      editUrl,
      deleteUrl,
      columns,
      formFields,
      getInitialItem,
      dataKey,
      customActions = [],
      tableContainerStyle = {},
    },
    ref
  ) => {
    // State management
    const [items, setItems] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [newItem, setNewItem] = useState(getInitialItem());
    const [openEdit, setOpenEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    // Pagination state
    const isPaginated = isPaginatedEndpoint(fetchUrl);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12;

    // Fetch data function
    const fetchItems = async (pageNum = page) => {
      try {
        let url = fetchUrl;
        if (isPaginated) {
          const params = new URLSearchParams();
          params.append("page", pageNum);
          params.append("limit", limit);
          url = `${fetchUrl}?${params.toString()}`;
        }
        const response = await apiService.get(url);
        const { items: fetchedItems, totalPages: fetchedTotalPages } =
          parseApiResponse(response, fetchUrl, dataKey);

        console.log("=== ManagementTable Fetch Debug ===");
        console.log("URL:", url);
        console.log("Response:", response);
        console.log("Fetched Items:", fetchedItems);
        console.log("Items Length:", fetchedItems?.length);
        console.log("Total Pages:", fetchedTotalPages);
        console.log("===================================");

        setItems(fetchedItems);
        setTotalPages(fetchedTotalPages);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        alert("Failed to fetch data");
      }
    };

    // Expose fetchItems method through ref
    useImperativeHandle(ref, () => ({
      fetchItems,
    }));

    // Effects
    useEffect(() => {
      fetchItems();
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (isPaginated) fetchItems(page);
      // eslint-disable-next-line
    }, [page]);

    // Event handlers
    const handleDelete = async (item) => {
      if (!window.confirm("Delete this item?")) return;
      try {
        await apiService.delete(deleteUrl(item));
        setItems(items.filter((i) => i._id !== item._id));
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete");
      }
    };

    const handleAdd = async () => {
      try {
        await apiService.post(
          addUrl,
          convertNumericFields(newItem, formFields)
        );
        setOpenAdd(false);
        setNewItem(getInitialItem());
        fetchItems();
      } catch (err) {
        console.error("Failed to add:", err);
        alert("Failed to add");
      }
    };

    const handleEditOpen = (item) => {
      setEditItem({ ...item });
      setOpenEdit(true);
    };
    const handleEditSave = async () => {
      try {
        const processedData = convertNumericFields(editItem, formFields);

        // Check if there's an image file (File object) vs image URL (string)
        const hasImageFile =
          processedData.image && processedData.image instanceof File;

        if (hasImageFile && editUrl(editItem).includes("/products/")) {
          // Use image upload API for products with new image files
          const { image, ...productData } = processedData;
          await updateProductWithImage(editItem._id, productData, image);
        } else {
          // Use regular update API
          await apiService.put(editUrl(editItem), processedData);
        }

        setOpenEdit(false);
        setEditItem(null);
        fetchItems();
      } catch (err) {
        console.error("Failed to update:", err);
        let msg = "Failed to update";
        if (err.response?.data) {
          msg +=
            ": " +
            (err.response.data.message ||
              err.response.data.error ||
              JSON.stringify(err.response.data));
        } else if (err.message) {
          msg += ": " + err.message;
        }
        alert(msg);
      }
    };

    const handleInputChange = (key, value) => {
      if (openAdd) {
        setNewItem({ ...newItem, [key]: value });
      } else if (openEdit) {
        setEditItem({ ...editItem, [key]: value });
      }
    };
    console.log("=== ManagementTable Render Debug ===");
    console.log("Current Items State:", items);
    console.log("Desktop Columns:", columns);
    console.log("====================================");

    // Responsive breakpoint
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
      <Box>
        <TableHeader
          title={title}
          addUrl={addUrl}
          onAddClick={() => setOpenAdd(true)}
        />        <TableContainerStyled>
          {isSmallScreen ? (
            <MobileCardView
              items={items}
              columns={columns}
              customActions={customActions}
              onEdit={handleEditOpen}
              onDelete={handleDelete}
              editUrl={editUrl}
              deleteUrl={deleteUrl}
            />
          ) : (
            <DataTable
              columns={columns}
              items={items}
              customActions={customActions}
              onEdit={handleEditOpen}
              onDelete={handleDelete}
              editUrl={editUrl}
              deleteUrl={deleteUrl}
              tableContainerStyle={tableContainerStyle}
            />
          )}
        </TableContainerStyled>

        <TablePagination
          isPaginatedTable={isPaginated}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        {/* Add Dialog */}
        {addUrl && (
          <FormDialog
            open={openAdd}
            onClose={() => {
              setOpenAdd(false);
              setNewItem(getInitialItem());
            }}
            title={`Add New ${title.replace(" Management", "")}`}
            formFields={formFields}
            formData={newItem}
            onInputChange={handleInputChange}
            onSave={handleAdd}
          />
        )}
        {/* Edit Dialog */}
        {editUrl && editItem && (
          <FormDialog
            open={openEdit}
            onClose={() => {
              setOpenEdit(false);
              setEditItem(null);
            }}
            title={`Edit ${title.replace(" Management", "")}`}
            formFields={formFields}
            formData={editItem}
            onInputChange={handleInputChange}
            onSave={handleEditSave}
          />
        )}
      </Box>
    );
  }
);

export default ManagementTable;
