import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { EntryFormValues, EntryType } from "../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Add New Entry</Typography>
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default AddEntryModal;
