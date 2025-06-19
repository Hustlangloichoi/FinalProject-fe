import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    margin: 0 -16px;
  }
`;

const StyledTable = styled(Table)`
  width: 100%; // Changed from fixed min-width to flexible width

  // Make table responsive
  @media (max-width: 768px) {
    min-width: 100%;
    width: 100%;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    width: 100%;
    font-size: 0.8rem;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  &:nth-of-type(even) {
    background-color: #ffffff;
  }
  &:hover {
    background-color: #f5f5f5 !important;
  }
  border-bottom: 1px solid #e0e0e0;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #e0e0e0;
  padding: 12px 16px;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    max-width: 150px;
  }
`;

const StyledHeaderCell = styled(TableCell)`
  background-color: #f5f5f5;
  font-weight: 600;
  border-right: 1px solid #e0e0e0;
  border-bottom: 2px solid #d0d0d0;
  padding: 12px 16px;
  white-space: nowrap;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

const ActionsCell = styled(StyledTableCell)`
  min-width: 120px;
  text-align: center;

  @media (max-width: 768px) {
    min-width: 100px;
  }
`;

const DataTable = ({
  columns,
  items,
  customActions,
  onEdit,
  onDelete,
  editUrl,
  deleteUrl,
  tableContainerStyle,
}) => {
  return (
    <TableContainer>
      <StyledTable sx={{ ...tableContainerStyle, border: "1px solid #e0e0e0" }}>
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <StyledHeaderCell key={idx} sx={{ width: col.width }}>
                {col.label}
              </StyledHeaderCell>
            ))}
            <StyledHeaderCell sx={{ minWidth: "120px" }}>
              Actions
            </StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <StyledTableRow key={item._id || idx}>
              {columns.map((col, colIdx) => (
                <StyledTableCell key={colIdx}>
                  {col.render ? col.render(item) : item[col.key]}
                </StyledTableCell>
              ))}
              <ActionsCell>
                {customActions.map((action, actionIdx) => (
                  <IconButton
                    key={actionIdx}
                    color={action.color || "primary"}
                    onClick={() => action.onClick(item)}
                    size="small"
                    sx={{ mr: 0.5 }}
                  >
                    {action.icon || <EditIcon />}
                  </IconButton>
                ))}
                {editUrl && (
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(item)}
                    size="small"
                    sx={{ mr: 0.5 }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {deleteUrl && (
                  <IconButton
                    color="error"
                    onClick={() => onDelete(item)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ActionsCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default DataTable;
