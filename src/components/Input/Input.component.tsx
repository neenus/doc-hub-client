import PropTypes from "prop-types";
import { TextField, Stack } from "@mui/material";

const TextInput = ({ label, handleChange, ...otherProps }: TextInputProps) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        sx={{ mt: 2 }}
        {...otherProps}
        onChange={handleChange}
      />
    </Stack>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

type TextInputProps = {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default TextInput;
