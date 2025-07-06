import React from "react";
import { Entry, Diagnosis, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Record<string, Diagnosis>;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
  const renderDiagnosisList = () => {
    return entry.diagnosisCodes?.map((code) => (
      <li key={code}>
        {code} {diagnoses[code]?.name}
      </li>
    ));
  };

  const HealthRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "grey";
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={4} borderColor="grey.400" p={2} mt={2}>
          <Typography variant="subtitle1">
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography><i>{entry.description}</i></Typography>
          <ul>{renderDiagnosisList()}</ul>
          <Typography variant="body2">
            <b>Discharge:</b> {entry.discharge.date} – {entry.discharge.criteria}
          </Typography>
          <Typography variant="caption">Specialist: {entry.specialist}</Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box border={1} borderRadius={4} borderColor="grey.400" p={2} mt={2}>
          <Typography variant="subtitle1">
            {entry.date} <WorkIcon /> <b>{entry.employerName}</b>
          </Typography>
          <Typography><i>{entry.description}</i></Typography>
          <ul>{renderDiagnosisList()}</ul>
          {entry.sickLeave && (
            <Typography variant="body2">
              <b>Sick Leave:</b> {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography variant="caption">Specialist: {entry.specialist}</Typography>
        </Box>
      );

    case "HealthCheck":
      return (
        <Box border={1} borderRadius={4} borderColor="grey.400" p={2} mt={2}>
          <Typography variant="subtitle1">
            {entry.date} <FavoriteIcon style={{ color: HealthRatingColor(entry.healthCheckRating) }} />
          </Typography>
          <Typography><i>{entry.description}</i></Typography>
          <ul>{renderDiagnosisList()}</ul>
          <Typography variant="body2">
            <b>Health Check Rating:</b> {entry.healthCheckRating}
          </Typography>
          <Typography variant="caption">Specialist: {entry.specialist}</Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
