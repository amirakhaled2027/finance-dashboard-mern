import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b c"
    "d b e"
    "d g e"
    "f g e"
    "f g e"
    "f g h"
    "f g h"
`;

const gridTemplateSmallScreens = `
    "a" "a" "a" "a"
    "b" "b" "b" "b"
    "c" "c" "c" "c"
    "d" "d" 
    "e" "e" "e" "e"
    "f" "f" "f" "f"
    "g" "g" "g" "g"
    "h" "h" 
`;

function Dashboard() {
  //useMediaQuery() hook coming from Material UI to specify a breakpoint
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      paddingBottom="2rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
}

export default Dashboard;
