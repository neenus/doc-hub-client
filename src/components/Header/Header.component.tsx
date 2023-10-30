import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileSection/ProfileSection.component";

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem 0",
        elevation: 5
      }}
    >
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.name}
          </Typography>
          <ProfileButton user={user} />
        </Box>
      ) : (
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#0B096A",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            lineHeigh: "22px",
            fontWeight: 700,
            textAlign: "center",
            flexGrow: 1
          }}
        >
          NR Accounting & Business Advisors
        </Typography>
      )}
    </Box>
  );
};

export default Header;
