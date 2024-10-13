//this is gonna be a styled component 
//we can have components that are automatically styles and we can share
//those stylings across different components
import { Box } from "@mui/material";
import { styled } from "@mui/system";
 


//this is the basic syntax if you wanna a style component
const FlexBetween = styled(Box)({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
});

export default FlexBetween