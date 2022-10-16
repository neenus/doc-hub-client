import { TextField, Stack, useMediaQuery } from '@mui/material'

import React from 'react'

const TextInput = ({ label, handleChange, ...otherProps }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <TextField
        variant='outlined'
        label={label}
        sx={{ width: !isMobile ? "50%" : "100%", mt: 2 }}
        {...otherProps}
        onChange={handleChange}
      />
    </Stack>
  )
}

export default TextInput