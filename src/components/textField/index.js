import React from "react";
import { InputAdornment, TextField as TextFieldInput } from "@mui/material";
import styles from "./TextField.module.scss";
import SearchIcon from "@mui/icons-material/Search";
const TextField = ({ onChange }) => {
  return (
    <div className={styles.TextField}>
      <TextFieldInput
        onChange={onChange}
        InputProps={{
          style: {
            padding: 0,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default TextField;
