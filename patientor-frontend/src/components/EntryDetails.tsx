import React from "react";
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry
} from "../types";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      const hospitalEntry = entry as HospitalEntry;
      return (
        <Box border={1} borderRadius={2} p={2} mb={1}>
          <Typography variant="h6">
            {hospitalEntry.date} <LocalHospitalIcon />
          </Typography>
          <Typography>{hospitalEntry.description}</Typography>
          {hospitalEntry.discharge && (
            <Typography>
              <b>Discharge:</b> {hospitalEntry.discharge.date} - {hospitalEntry.discharge.criteria}
            </Typography>
          )}
          {hospitalEntry.diagnosisCodes && (
            <>
              <Typography><b>Diagnosis Codes:</b></Typography>
              <List dense>
                {hospitalEntry.diagnosisCodes.map(code => (
                  <ListItem key={code} style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary={code} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      const occHealthEntry = entry as OccupationalHealthcareEntry;
      return (
        <Box border={1} borderRadius={2} p={2} mb={1}>
          <Typography variant="h6">
            {occHealthEntry.date} <WorkIcon /> {occHealthEntry.employerName}
          </Typography>
          <Typography>{occHealthEntry.description}</Typography>
          {occHealthEntry.sickLeave && (
            <Typography>
              <b>Sick leave:</b> {occHealthEntry.sickLeave.startDate} - {occHealthEntry.sickLeave.endDate}
            </Typography>
          )}
          {occHealthEntry.diagnosisCodes && (
            <>
              <Typography><b>Diagnosis Codes:</b></Typography>
              <List dense>
                {occHealthEntry.diagnosisCodes.map(code => (
                  <ListItem key={code} style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary={code} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    case "HealthCheck":
      const healthCheckEntry = entry as HealthCheckEntry;
      const healthRatingColor = () => {
        switch (healthCheckEntry.healthCheckRating) {
          case 0:
            return "green";
          case 1:
            return "yellow";
          case 2:
            return "orange";
          case 3:
            return "red";
          default:
            return "grey";
        }
      };
      return (
        <Box border={1} borderRadius={2} p={2} mb={1}>
          <Typography variant="h6">
            {healthCheckEntry.date} <FavoriteIcon style={{ color: healthRatingColor() }} />
          </Typography>
          <Typography>{healthCheckEntry.description}</Typography>
          {healthCheckEntry.diagnosisCodes && (
            <>
              <Typography><b>Diagnosis Codes:</b></Typography>
              <List dense>
                {healthCheckEntry.diagnosisCodes.map(code => (
                  <ListItem key={code} style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary={code} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
