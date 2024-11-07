import FlexBetween from "@/components/FlexBetween";
import { Typography, useTheme } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

function Navbar() {
  const { palette } = useTheme();

  return (
    <div className="w-dvw">
      <FlexBetween
        mb="1rem"
        color="white"
        p="1rem"
        borderRadius="1rem"
        gap="1rem"
        sx={{
          justifyContent: "center",
          backgroundColor: "rgba(123, 72, 195, 1)", 
          backdropFilter: "blur(10px)", 
          WebkitBackdropFilter: "blur(10px)", // Safari compatibility
          boxShadow: "0 4px 10px rgba(255, 158, 0, 0.5)",
          opacity: 0.9, 
        }}
      >
        <FlexBetween
          gap="0.75rem"
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          {/* Icon and Logo */}
          <TrendingUpRoundedIcon
            sx={{ fontSize: "40px", color: palette.secondary[500] }}
          />
          <Typography
            variant="h4"
            fontSize="25px"
            fontWeight="bold"
            color="white"
          >
            Finalyze
          </Typography>
        </FlexBetween>
      </FlexBetween>
    </div>
  );
}

export default Navbar;
