import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../../app/apiService";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

const TableContainerStyled = styled(Box)`
  margin-bottom: 24px;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    .MuiTable-root {
      min-width: 650px;
    }
  }
`;

const MobileTableContainer = styled(Box)`
  @media (max-width: 768px) {
    display: block;
    
    .desktop-table {
      display: none;
    }
    
    .mobile-cards {
      display: block;
    }
  }
  
  @media (min-width: 769px) {
    .desktop-table {
      display: block;
    }
    
    .mobile-cards {
      display: none;
    }
  }
`;

const MobileCard = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const FlexHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DialogContentStyled = styled(DialogContent)`
  min-width: 320px;
`;

const ActionsCell = styled(TableCell)`
  min-width: 120px;
`;

/**
 * Generic management table for CRUD operations.
 * Props:
 * - title: string
 * - fetchUrl: string
 * - addUrl: string
 * - editUrl: (item) => string
 * - deleteUrl: (item) => string
 * - columns: [{ label, render: (item) => node }]
 * - formFields: [{ label, key, type, required }]
 * - getInitialItem: () => object
 * - customActions: [{ label, onClick: (item) => void, color }]
 */
const ManagementTable = forwardRef(({
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
}, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newItem, setNewItem] = useState(getInitialItem());
  const [openEdit, setOpenEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // Pagination state for all resources
  const isPaginatedTable = ["/products", "/orders", "/users", "/categories", "/messages"].includes(fetchUrl);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchItems = async (pageNum = page) => {
    try {
      let url = fetchUrl;
      if (isPaginatedTable) {
        // Add pagination params
        const params = new URLSearchParams();
        params.append("page", pageNum);
        params.append("limit", limit);
        url = `${fetchUrl}?${params.toString()}`;
      }
      const res = await apiService.get(url);
      let arr = [];
      // Parse paginated response for each resource
      if (fetchUrl === "/products" && res.data && res.data.data && res.data.data.products) {
        arr = res.data.data.products;
        setTotalPages(res.data.data.totalPages || 1);
      } else if (fetchUrl === "/orders" && res.data && res.data.data && res.data.data.orders) {
        arr = res.data.data.orders;
        setTotalPages(res.data.data.totalPages || 1);
      } else if (fetchUrl === "/users" && res.data && res.data.data && res.data.data.users) {
        arr = res.data.data.users;
        setTotalPages(res.data.data.totalPages || 1);
      } else if (fetchUrl === "/categories" && res.data && res.data.data && res.data.data.category) {
        arr = res.data.data.category;
        setTotalPages(res.data.data.totalPages || 1);
      } else if (fetchUrl === "/messages" && res.data && res.data.data && res.data.data.messages) {
        arr = res.data.data.messages;
        setTotalPages(res.data.data.totalPages || 1);
      } else if (dataKey && res.data && res.data[dataKey]) {
        arr = res.data[dataKey];
      } else if (dataKey && res.data.data && res.data.data[dataKey]) {
        arr = res.data.data[dataKey];
      } else if (Array.isArray(res.data)) {
        arr = res.data;
      } else if (Array.isArray(res.data.data)) {
        arr = res.data.data;
      } else if (res.data.data && typeof res.data.data === "object") {
        const firstArray = Object.values(res.data.data).find(Array.isArray);
        arr = firstArray || [];
      } else if (typeof res.data === "object") {
        const firstArray = Object.values(res.data).find(Array.isArray);
        arr = firstArray || [];
      }
      setItems(arr);
    } catch (err) {
      alert("Failed to fetch data");
    }
  };

  // Expose fetchItems method through ref
  useImperativeHandle(ref, () => ({
    fetchItems
  }));

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  // For paginated tables, refetch when page changes
  useEffect(() => {
    if (isPaginatedTable) fetchItems(page);
    // eslint-disable-next-line
  }, [page]);

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await apiService.delete(deleteUrl(item));
      setItems(items.filter((i) => i._id !== item._id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // Helper: convert numeric fields to numbers
  const convertNumericFields = (item) => {
    const result = { ...item };
    formFields.forEach((field) => {
      if (field.type === "number" && result[field.key] !== undefined && result[field.key] !== "") {
        result[field.key] = Number(result[field.key]);
      }
    });
    return result;
  };

  const handleAdd = async () => {
    try {
      await apiService.post(addUrl, convertNumericFields(newItem));
      setOpenAdd(false);
      setNewItem(getInitialItem());
      fetchItems();
    } catch (err) {
      alert("Failed to add");
    }
  };

  const handleEditOpen = (item) => {
    setEditItem({ ...item });
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      await apiService.put(editUrl(editItem), convertNumericFields(editItem));
      setOpenEdit(false);
      setEditItem(null);
      fetchItems();
    } catch (err) {
      let msg = "Failed to update";
      if (err.response && err.response.data) {
        msg += ": " + (err.response.data.message || err.response.data.error || JSON.stringify(err.response.data));
      } else if (err.message) {
        msg += ": " + err.message;
      }
      alert(msg);
    }
  };

  return (
    <Box>
      <FlexHeader>
        <Typography variant="h6">{title}</Typography>
        {addUrl && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
          >
            Add
          </Button>
        )}
      </FlexHeader>
      
      <MobileTableContainer>
        {/* Desktop Table */}
        <TableContainerStyled component={Paper} className="desktop-table">
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.label}>{col.label}</TableCell>
                ))}
                <ActionsCell></ActionsCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  {columns.map((col) => (
                    <TableCell key={col.label}>{col.render(item)}</TableCell>
                  ))}
                  <ActionsCell>
                    {customActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color={action.color || "primary"}
                        size="small"
                        onClick={() => action.onClick(item)}
                        sx={{ mr: 1, mb: 1 }}
                      >
                        {action.label}
                      </Button>
                    ))}
                    {editUrl && (
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {deleteUrl && (
                      <IconButton color="error" onClick={() => handleDelete(item)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </ActionsCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
        
        {/* Mobile Cards */}
        <Box className="mobile-cards">
          {items.map((item) => (
            <MobileCard key={item._id} elevation={2}>
              {columns.map((col) => (
                <Box key={col.label} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {col.label}:
                  </Typography>
                  <Typography variant="body2">
                    {col.render(item)}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {customActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color={action.color || "primary"}
                    size="small"
                    onClick={() => action.onClick(item)}
                  >
                    {action.label}
                  </Button>
                ))}
                {editUrl && (
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(item)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {deleteUrl && (
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(item)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </MobileCard>
          ))}
        </Box>
      </MobileTableContainer>
      {/* Add Dialog */}
      {addUrl && (
        <Dialog 
          open={openAdd} 
          onClose={() => setOpenAdd(false)}
          maxWidth="sm"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              mx: { xs: 0, sm: 2 },
              my: { xs: 0, sm: 2 },
              width: { xs: '100%', sm: 'auto' },
              height: { xs: '100%', sm: 'auto' },
              maxHeight: { xs: '100%', sm: '90vh' }
            }
          }}
        >
          <DialogTitle sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}>
            Add {title.replace(" Management", "")}
          </DialogTitle>
          <DialogContentStyled sx={{ pt: 1 }}>
            {formFields.map((field) =>
              field.type === "checkbox" ? (
                <FormControlLabel
                  key={field.key}
                  control={
                    <Checkbox
                      checked={!!newItem[field.key]}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          [field.key]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={field.label}
                  sx={{ mb: 2 }}
                />
              ) : (
                <TextField
                  key={field.key}
                  label={field.label}
                  type={field.type || "text"}
                  value={newItem[field.key] || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, [field.key]: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                  required={field.required}
                  size={isMobile ? "small" : "medium"}
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? (isMobile ? 2 : 3) : 1}
                />
              )
            )}
          </DialogContentStyled>
          <DialogActions sx={{ 
            px: 3, 
            pb: { xs: 3, sm: 2 },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button 
              onClick={() => setOpenAdd(false)}
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAdd} 
              variant="contained"
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Edit Dialog */}
      {editUrl && (
        <Dialog 
          open={openEdit} 
          onClose={() => setOpenEdit(false)}
          maxWidth="sm"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              mx: { xs: 0, sm: 2 },
              my: { xs: 0, sm: 2 },
              width: { xs: '100%', sm: 'auto' },
              height: { xs: '100%', sm: 'auto' },
              maxHeight: { xs: '100%', sm: '90vh' }
            }
          }}
        >
          <DialogTitle sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}>
            Edit {title.replace(" Management", "")}
          </DialogTitle>
          <DialogContentStyled sx={{ pt: 1 }}>
            {formFields.map((field) =>
              field.type === "checkbox" ? (
                <FormControlLabel
                  key={field.key}
                  control={
                    <Checkbox
                      checked={!!editItem?.[field.key]}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          [field.key]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={field.label}
                  sx={{ mb: 2 }}
                />
              ) : (
                <TextField
                  key={field.key}
                  label={field.label}
                  type={field.type || "text"}
                  value={editItem?.[field.key] || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, [field.key]: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                  required={field.required}
                  size={isMobile ? "small" : "medium"}
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? (isMobile ? 2 : 3) : 1}
                />
              )
            )}
          </DialogContentStyled>
          <DialogActions sx={{ 
            px: 3, 
            pb: { xs: 3, sm: 2 },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button 
              onClick={() => setOpenEdit(false)}
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave} 
              variant="contained"
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Pagination for paginated resources */}
      {isPaginatedTable && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
});

export default ManagementTable;
