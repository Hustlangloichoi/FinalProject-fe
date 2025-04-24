import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../../app/apiService";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [openEdit, setOpenEdit] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await apiService.get("/categories");
      setCategories(res.data.data || res.data.categories || []);
    } catch (err) {
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await apiService.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  const handleAdd = async () => {
    try {
      await apiService.post("/categories", {
        name: newCategory.name,
        description: newCategory.description,
      });
      setOpenAdd(false);
      setNewCategory({ name: "", description: "" });
      fetchCategories();
    } catch (err) {
      alert("Failed to add category");
    }
  };

  const handleEditOpen = (category) => {
    setEditCategory({ ...category });
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      await apiService.put(`/categories/${editCategory._id}`, {
        name: editCategory.name,
        description: editCategory.description,
      });
      setOpenEdit(false);
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      alert("Failed to update category");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Category Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
        >
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editCategory?.name || ""}
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editCategory?.description || ""}
            onChange={(e) =>
              setEditCategory({ ...editCategory, description: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CategoryManagement;
