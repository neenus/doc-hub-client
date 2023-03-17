import React from 'react'
import { getFileIconSrc } from '../../utils/getFileIconSrc'
import { convertFileSize } from '../../utils/convertFileSize'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const FilesList = ({ files, handleDelete }) => {

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, rowGap: "1em" }}>
                <TableCell>
                  <img height={30} src={getFileIconSrc(file)} alt={file.name} />
                </TableCell>
                <TableCell>
                  {file.name}
                </TableCell>
                <TableCell>
                  {convertFileSize(file.size)}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" size="small" onClick={() => handleDelete(file)}>
                    <DeleteIcon color="warning" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

export default FilesList