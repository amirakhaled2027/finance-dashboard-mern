import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween"


type Props = {
    title: string,
    subtitle?: string,
    sideText: string,
    //coz this is gonna be a material ui icon and that is represented by react.ReactNode
    icon?: React.ReactNode;
}
function BoxHeader({title, subtitle, sideText,  icon}: Props) {
    const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} margin='1.5rem 1rem 0 1rem'>
        {/* the text on the left side */}
        <FlexBetween>
            {icon}
            <Box width='100%'>
                <Typography variant='h4' mb='-0.1rem'>
                    {title}
                </Typography>
                <Typography variant='h6'>
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        {/* the text on the right side */}
        <Typography variant='h5' fontWeight='700' color={palette.secondary[500]}>
            {sideText}
        </Typography>
    </FlexBetween>
  )
}

export default BoxHeader