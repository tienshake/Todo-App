import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function FormError(props) {
  const { errors } = props;

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{errors}</Alert>
    </Stack>
  );
}

export default FormError;
