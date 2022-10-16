import { TextField, Stack } from '@mui/material'

import React from 'react'

const TextInput = ({ label, handleChange, ...otherProps }) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
        fullWidth
        variant='outlined'
        label={label}
        sx={{ mt: 2 }}
        {...otherProps}
        onChange={handleChange}
      />
    </Stack>
  )
}

export default TextInput