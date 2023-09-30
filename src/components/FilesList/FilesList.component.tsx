import React from "react";
import PropTypes from "prop-types";
import { getFileIconSrc } from "../../utils/getFileIconSrc.ts";
import { convertFileSize } from "../../utils/convertFileSize.ts";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FilesList = ({ files, handleDelete }: FilesListProp) => {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {files.map((file, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  rowGap: "1em"
                }}
              >
                <TableCell>
                  <img height={30} src={getFileIconSrc(file)} alt={file.name} />
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{convertFileSize(file.size)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(file)}
                  >
                    <DeleteIcon color="warning" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

FilesList.propTypes = {
  files: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
};

type FilesListProp = {
  files: Array<File>;
  handleDelete: (file: File) => void;
};

export default FilesList;
