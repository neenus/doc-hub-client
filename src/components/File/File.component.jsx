import React from 'react'
import { ListItem, ListItemText } from '@mui/material'

const File = ({ file, index }) => {
  const convertFileSize = size => {
    if (size < 1024) {
      return size + " bytes";
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + " KB";
    } else if (size < 1073741824) {
      return (size / 1048576).toFixed(2) + " MB";
    } else {
      return (size / 1073741824).toFixed(2) + " GB";
    }
  }

  return (
    <ListItem key={index} >
      <ListItemText
        primary={`${file.name} - ${convertFileSize(file.size)}`} />
    </ListItem>
  )
}

export default File