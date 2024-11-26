import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axiosInstance";
import ActionButton from "../../components/common/ActionButton";

const DeletePersonMaster = ({id,getListData}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`operationMaster?uuid=${id}`)
            if (response?.status === 200) {
                getListData();
                handleClose();
                toast.success("Deleted person master data successfully")
            }
        } catch (error) {
            console.log("error",error);
            toast.error("Error")
        }
    };

    return (
        <React.Fragment>
            <ActionButton
                icon={<DeleteIcon />}
                label="Delete"
                color="#d32f2f"
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Person Master"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this person master? This action cannot be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            background: "#ffffff",
                            boxShadow:
                                "6.22px 6.22px 15px 0px #0000001A,-6.22px -6.22px 15px 0px #F9FCFF",
                            padding: "7px 20px",
                            color: "#454545",
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            background:
                                " linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
                            boxShadow:
                                "8px 8px 12.8px 0px #FFFFFF1A inset, -8px -8px 12.8px 0px #0000004D inset, 0px 3.46px 3.46px 0px #00000040 inset",
                            padding: "7px 20px",
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </React.Fragment>
    )
}

export default DeletePersonMaster