// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DataGrid, GridColDef, GridRowId, GridRowModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { PavementConditionStatusDto, useGetPavementConditionStatusFindQuery, usePostPavementConditionStatusParseMutation, usePostPavementConditionStatusImportMutation, usePutPavementConditionStatusUpdateMutation, useDeletePavementConditionStatusDeleteMutation } from '@econolite/shared/data-access/api-configuration';
import { useGetAuditReportFindQuery } from '@econolite/shared/data-access/api-reports';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';

export enum PavementConditionStatusPageState {
  Updating,
  Importing,
}

export interface ConfirmationDialogProps {
  title?: string,
  content?: string,
  onClickConfirm?: any
}

export interface PavementConditionStatusProps { }

export function PavementConditionStatus(props: PavementConditionStatusProps) {
  const [pageState, setPageState] = React.useState<PavementConditionStatusPageState>(PavementConditionStatusPageState.Updating);

  const { data: pcsData, isLoading: pcsIsLoading, isError: pcsIsError, refetch: pcsRefetch } = useGetPavementConditionStatusFindQuery({});
  const [updateSelections, { data: updatedData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError }] = usePutPavementConditionStatusUpdateMutation();
  const [deleteSelections, { data: deletedData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError }] = useDeletePavementConditionStatusDeleteMutation();

  const { data: auditData, isLoading: auditIsLoading, isError: auditIsError, refetch: auditRefetch } = useGetAuditReportFindQuery({ startDate: new Date(0).toISOString(), eventTypes: ["PavementConditionStatus"], details: true });

  const [dialogProps, setDialogProps] = React.useState<ConfirmationDialogProps>({});
  const [openDialog, setOpenDialog] = React.useState(false);

  const { handleSubmit } = useForm();
  const [uploadedFilename, setUploadedFilename] = React.useState("");
  const [uploadFile, { data: uploadData, isSuccess: uploadIsSuccess, isError: uploadIsError, error: uploadError }] = usePostPavementConditionStatusParseMutation();
  const [editMode, setEditMode] = React.useState(false);
  const [editedRows, setEditedRows] = React.useState<PavementConditionStatusDto[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [importSelections, { data: importedData, isSuccess: importIsSuccess, isError: importIsError, error: importError }] = usePostPavementConditionStatusImportMutation();

  const [rowData, setRowData] = React.useState([] as PavementConditionStatusDto[]);

  // if (!pcsIsLoading && pcsIsError) {
  //   pcsRefetch();
  // }

  // if (!auditIsLoading && auditIsError) {
  //   auditRefetch();
  // }

  useEffect(() => {
    pcsRefetch();
    handleUpdated();
  }, [updatedData])

  useEffect(() => {
    pcsRefetch();
    handleDeleted();
  }, [deletedData])

  useEffect(() => {
    pcsRefetch();
    handleImported();
  }, [importedData])

  useEffect(() => {
    setRowData(getRows());
  }, [pcsData, uploadData])

  const confirmUpdate = () => {
    setDialogProps({ title: 'Update Confirmation', content: 'Are you certain you want to update your selections?', onClickConfirm: handleUpdate });
    handleOpenDialog();
  }

  const confirmDelete = () => {
    setDialogProps({ title: 'Delete Confirmation', content: 'Are you certain you want to delete your selections?', onClickConfirm: handleDelete });
    handleOpenDialog();
  }

  const confirmImport = () => {
    setDialogProps({ title: 'Import Confirmation', content: 'Are you certain you want to import your selections?', onClickConfirm: handleImport });
    handleOpenDialog();
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleUpdate = () => {
    handleCloseDialog();
    // filter for the selected rows then find and remap for the edited rows
    const selectedRows = pcsData!.filter(d => rowSelectionModel.includes(d.id as GridRowId)).map(d => {
      const editedRow = editedRows.find(r => r.id == d.id);
      if (editedRow)
        return { ...editedRow, timestamp: new Date(editedRow.timestamp || '').toISOString()};
      return { ...d, timestamp: new Date(d.timestamp || '').toISOString()};
    });

    if (selectedRows.length > 0) {
      updateSelections({ body: selectedRows });
    }
  };

  const handleDelete = () => {
    handleCloseDialog();
    const selectedRows = pcsData!.filter(d => rowSelectionModel.includes(d.id as GridRowId));

    if (selectedRows.length > 0) {
      deleteSelections({ body: selectedRows });
    }
  };

  const handleUpload = async (e: any) => {
    const filename = e.target.files[0].name;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    var args: any = { method: "POST", body: formData };
    uploadFile(args);
    handleUploaded(filename);
  };

  const handleImport = () => {
    handleCloseDialog();
    // filter for the selected rows then find and remap for the edited rows
    const selectedRows = uploadData!.filter(d => rowSelectionModel.includes(d.id as GridRowId)).map(d => {
      const editedRow = editedRows.find(r => r.id == d.id);
      if (editedRow) {
        return editedRow;
      }
      return d;
    });

    if (selectedRows.length > 0) {
      importSelections({ filename: uploadedFilename, body: selectedRows });
    }
  };

  const getPreviousImportDetails = () => {
    const importHistory = auditData!.filter(x => x.eventType == "PavementConditionStatus:Add");
    if (importHistory && importHistory.length > 0) {
      const previousImport = importHistory.at(-1);
      const startDate = previousImport!.startDate ? SetLocalDate(previousImport!.startDate) : '';
      const username = previousImport!.username;
      const details = JSON.parse(previousImport!.details as string);
      const filename = details.New._v.Filename;

      return (
        <>
          <p>Import Details:</p>
          <span><b>Timestamp: </b>{startDate}</span>
          <span><b>Username: </b>{username}</span>
          <span><b>Filename: </b>{filename}</span>
          <br />
        </>
      );
    } else {
      return (
        <>
          <p>No import details.</p>
          <br />
        </>
      );
    }
  };

  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Timestamp', width: 250, editable: true },
    { field: 'location', headerName: 'Location', width: 250, editable: true },
    { field: 'longitude', headerName: 'Longitude', width: 125, editable: true },
    { field: 'latitude', headerName: 'Latitude', width: 125, editable: true },
    { field: 'severity', headerName: 'Severity', width: 125, editable: true, type: 'singleSelect', valueOptions: ['Low', 'Medium', 'High'] },
    { field: 'type', headerName: 'Type', width: 125, editable: true, type: 'singleSelect', valueOptions: ['None', 'Bump', 'Pothole'] },
    { field: 'isActive', headerName: 'Active', width: 100, editable: true, type: 'boolean' }
  ];

  const getRows = () => {
    if (pageState == PavementConditionStatusPageState.Updating && pcsData && pcsData.length > 0)
      return pcsData.map(p => ({ ...p, timestamp: p.timestamp ? SetLocalDate(p.timestamp) : ''})) as PavementConditionStatusDto[];
    if (pageState == PavementConditionStatusPageState.Importing && uploadData && uploadData.length > 0)
      return uploadData.map(p => ({ ...p, timestamp: p.timestamp ? SetLocalDate(p.timestamp) : ''})) as PavementConditionStatusDto[];

    return [] as PavementConditionStatusDto[];
  };

  const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleProcessRowUpdate = (editedRow: GridRowModel) => {
    setEditedRows([editedRow, ...editedRows]);
    return editedRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    // TODO
  };

  const handleGetRowClassName = (params: any) => {
    const editedRow = editedRows.find(r => r.id == params.id);
    return (editedRow) ? "editedRow" : "";
  }

  const handleOnRowEditStart = () => {
    setEditMode(true);
  }

  const handleOnRowEditStop = () => {
    setEditMode(false);
  }

  const uploadFileInput = React.useRef<any>(null);

  const handleUploadFileInputClick = () => {
    uploadFileInput.current.value = null;
    uploadFileInput.current.click();
  };

  const [openToast, setOpenToast] = React.useState(false);

  const handleOpenToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleUpdated = () => {
    setEditedRows([]);
    setRowSelectionModel([]);
    setUpdated(true);
    setDeleted(false);
    setImported(false);
    handleOpenToast();
  };

  const handleDeleted = () => {
    setEditedRows([]);
    setRowSelectionModel([]);
    setUpdated(false);
    setDeleted(true);
    setImported(false);
    handleOpenToast();
  };

  const handleUploaded = (filename: string) => {
    setUploadedFilename(filename);
    setPageState(PavementConditionStatusPageState.Importing);
    setEditedRows([]);
    setRowSelectionModel([]);
    setUpdated(false);
    setDeleted(false);
    setImported(false);
    handleOpenToast();
  };

  const [imported, setImported] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  const handleImported = () => {
    setPageState(PavementConditionStatusPageState.Updating);
    setEditedRows([]);
    setRowSelectionModel([]);
    setUpdated(false);
    setDeleted(false);
    setImported(true);
    handleOpenToast();
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Pavement Condition Status</Typography>
      </Box>
      <>
        {(pageState == PavementConditionStatusPageState.Updating) &&
          <>
            {(editedRows && editedRows.length > 0) &&
              <>
                <Alert severity="info" sx={{ width: '100%' }}>
                  Note: There are unsaved changes.
                </Alert>
                <br />
              </>
            }
            {(updated && updateIsError) &&
              <>
                <Alert severity="error" sx={{ width: '100%' }}>
                  Update Failed
                </Alert>
                <br />
              </>
            }
            {(deleted && deleteIsError) &&
              <>
                <Alert severity="error" sx={{ width: '100%' }}>
                  Delete Failed
                </Alert>
                <br />
              </>
            }
            {(imported && importIsError) &&
              <>
                <Alert severity="error" sx={{ width: '100%' }}>
                  Import Failed
                </Alert>
                <br />
              </>
            }
          </>
        }
        {(pageState == PavementConditionStatusPageState.Importing) &&
          <>
            {(uploadIsError) &&
              <>
                <Alert severity="error" sx={{ width: '100%' }}>
                  Upload Failed
                </Alert>
                <br />
              </>
            }
          </>
        }
      </>
      <div style={{ height: 750, width: '100%' }}>
        <DataGrid editMode="row"
          rows={rowData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
          getRowClassName={handleGetRowClassName}
          onRowEditStart={handleOnRowEditStart}
          onRowEditStop={handleOnRowEditStop}
        />
      </div>
      <br />
      {(pageState == PavementConditionStatusPageState.Updating) &&
        <>
          <form>
            <Button disabled={editMode || rowSelectionModel.length == 0} type="submit" className="reportButton" onClick={handleSubmit(confirmUpdate)}>
              Update
            </Button>
            <Button disabled={editMode || rowSelectionModel.length == 0} type="submit" className="reportButton" onClick={handleSubmit(confirmDelete)}>
              Delete
            </Button>
          </form>
        </>
      }
      {(pageState == PavementConditionStatusPageState.Importing) &&
        <>
          <form>
            <Button disabled={editMode || rowSelectionModel.length == 0} type="submit" className="reportButton" onClick={handleSubmit(confirmImport)}>
              Import
            </Button>
          </form>
        </>
      }
      <br />
      {(auditData && auditData.length > 0) &&
        <>
        {getPreviousImportDetails()}
        </>
      }
      <form onSubmit={handleSubmit(handleUpload)}>
        <input type="file" ref={uploadFileInput} onChange={handleUpload} style={{ display: 'none' }} />
        <Button className="reportButton" onClick={handleUploadFileInputClick}>
          Upload File
        </Button>
      </form>
      {(pageState == PavementConditionStatusPageState.Updating && updated && updateIsSuccess) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Update Succeeded
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Updating && updated && updateIsError) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Update Failed
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Updating && deleted && deleteIsSuccess) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Delete Succeeded
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Updating && deleted && deleteIsError) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Delete Failed
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Importing && uploadIsSuccess) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Upload Succeeded
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Importing && uploadIsError) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Upload Failed
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Updating && imported && importIsSuccess) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Import Succeeded
          </Alert>
        </Snackbar>
      }
      {(pageState == PavementConditionStatusPageState.Updating && imported && importIsError) &&
        <Snackbar open={openToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000} onClose={handleCloseToast}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Import Failed
          </Alert>
        </Snackbar>
      }
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogProps.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogProps.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button className="reportButton" onClick={dialogProps.onClickConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PavementConditionStatus;
