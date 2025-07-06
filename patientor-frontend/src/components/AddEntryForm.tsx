import React, { useState } from "react";
import { TextField, InputLabel, MenuItem, Select, Button, FormControl, Grid } from "@mui/material";
import { EntryFormValues, EntryType } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const submit = () => {
    const base = { description, date, specialist };

    switch (type) {
      case "HealthCheck":
        onSubmit({ ...base, type, healthCheckRating });
        break;
      case "OccupationalHealthcare":
        const occEntry: EntryFormValues = {
          ...base,
          type,
          employerName,
        };
        if (sickLeaveStart && sickLeaveEnd) {
          occEntry.sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
        }
        onSubmit(occEntry);
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type,
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        });
        break;
    }
  };

  return (
    <form>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as EntryType)}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField fullWidth label="Description" value={description} onChange={e => setDescription(e.target.value)} sx={{ mt: 2 }} />
      <TextField fullWidth label="Specialist" value={specialist} onChange={e => setSpecialist(e.target.value)} sx={{ mt: 2 }} />

      {type === "HealthCheck" && (
        <TextField fullWidth type="number" label="Health Rating (0-3)" value={healthCheckRating} onChange={e => setHealthCheckRating(Number(e.target.value))} sx={{ mt: 2 }} />
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField fullWidth label="Employer Name" value={employerName} onChange={e => setEmployerName(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Sick Leave Start" type="date" value={sickLeaveStart} onChange={e => setSickLeaveStart(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
          <TextField fullWidth label="Sick Leave End" type="date" value={sickLeaveEnd} onChange={e => setSickLeaveEnd(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
        </>
      )}

      {type === "Hospital" && (
        <>
          <TextField fullWidth label="Discharge Date" type="date" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
          <TextField fullWidth label="Discharge Criteria" value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} sx={{ mt: 2 }} />
        </>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button variant="contained" onClick={submit}>Add</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
