import React from 'react'
import File from '../File/File.component'
import { Divider, List, ListSubheader } from '@mui/material'

const FilesList = ({ files }) => {

  return (
    <List spacing={1}
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      <ListSubheader>Files Selected to upload</ListSubheader>
      {files.map((file, index) => (
        <React.Fragment key={index}>
          <File key={index} file={file} />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}

export default FilesList