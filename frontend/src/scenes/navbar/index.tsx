import FlexBetween from '@/components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react';
import PixIcon from '@mui/icons-material/Pix';
import { Link } from 'react-router-dom';

// type Props = {};
// function Navbar({props}: Props) {

function Navbar() {
    const { palette } = useTheme();
    //this is gonna be the state determining on what page we're on so that we can highlight the text
    const [selected, setSelected] = useState("dashboard");

  return (
    // this is the most common flexbox you'll ever have to use
    // <Box
    //   display="flex"
    //   justifyContent="space-between"
    //   alignItems="center"
    // ></Box>

    //after setting up the styled component file FlexBetween.tsx,
    //we don't wanna the previous code, we're just gonna import the component
    //and you can add more styles if you want
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* NAV LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        {/* sx provides color in our component in material UI */}
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finanseer
        </Typography>
      </FlexBetween>

      {/* NAV RIGHT SIDE */}
      <FlexBetween>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/" 
            // this isn't for navigation purposes but to highlight the text when it's selected
            onClick={() => setSelected("dashboard")}
            // coz this react router not material, we;re gonna use style not sx
            style={{
                color: selected == "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
            }}
            >dashboard</Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/predictions" 
            // this isn't for navigation purposes but to highlight the text when it's selected
            onClick={() => setSelected("predictions")}
            // coz this react router not material, we;re gonna use style not sx
            style={{
                color: selected == "predictions" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
            }}
            >predictions</Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Navbar

