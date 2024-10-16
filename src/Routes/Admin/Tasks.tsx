import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../features/tasks/taskSlice";
import { Box, Typography, Fab } from "@mui/material";
import { DataGrid, GridToolbar, GridRowModesModel, GridRowModes, GridRowId, GridActionsCellItem, GridColDef, GridEventListener, GridRowModel, GridRowEditStopReasons } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getUsers } from "../../features/users/userSlice";


const Tasks = () => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const [rows, setRows] = useState(tasks);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const users = useSelector((state: any) => state.users.users);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    // TODO: Save the changes to the database

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoremodifications: true },
    }));
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 2, editable: true },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "completed", headerName: "Completed" },
    { field: "createdBy", headerName: "Created By", flex: 1, valueGetter: (params: any) => params?.name || "Not Assigned" },
    { field: "assignedTo", headerName: "Assigned To", flex: 2, editable: true, type: "singleSelect", valueOptions: users.filter((user: any) => user.role !== "customer").map((user: any) => user.name) },
    { field: "dueDate", headerName: "Due Date", flex: 1, renderCell: (params: any) => new Date(params.value).toLocaleDateString("en-US") },
    { field: "frequency", headerName: "Frequency", flex: 1, editable: true, type: "singleSelect", valueOptions: ["Once", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"] },
    {
      field: "actions", type: "actions", headerName: "Actions", flex: 1, sortable: false, getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<CancelIcon />} label="Delete" onClick={() => console.log("Delete task feature coming soon")} />,
        ];
      }
    }
  ];


  useEffect(() => {
    dispatch(getTasks());
    !users.length && dispatch(getUsers());
  }, [auth]);

  return (
    <>
      <Box>
        <Box py={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#0B096A",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              lineHeigh: "22px",
              fontWeight: 700
            }}
          >
            Tasks
          </Typography>
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 1 }
              },
              columns: {
                columnVisibilityModel: {
                  createdBy: false,
                }
              }
            }}
            rows={tasks}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 25, 50]}
            slots={{ toolbar: GridToolbar }}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
          />
        </Box>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2rem", right: "2rem" }} onClick={() => console.log("Add task feature coming soon")}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default Tasks