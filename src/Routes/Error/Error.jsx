import React from "react";
import { useRouteError } from "react-router-dom";
import { ErrorOutline } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
// import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

import "./Error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <React.Fragment>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1><span>4</span><span>0</span><span>4</span></h1>
          </div>
          <h2>we are sorry, but the page you requested was not found</h2>
        </div>
      </div>
    </React.Fragment>
  );
}
