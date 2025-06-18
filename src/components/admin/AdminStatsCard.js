import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
  Grow,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

function AdminStatsCard({ title, value, icon, color, trend, subtitle }) {
  const theme = useTheme();
  const isPositiveTrend = trend && trend.includes("+");

  return (
    <Grow in={true} timeout={800}>
      <Card
        sx={{
          height: "280px", // Fixed height for square shape
          aspectRatio: "1", // Make it square
          background: `linear-gradient(135deg, ${alpha(
            color || theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(
            color || theme.palette.primary.main,
            0.2
          )}`,
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 20px 40px ${alpha(
              color || theme.palette.primary.main,
              0.2
            )}`,
            border: `1px solid ${alpha(
              color || theme.palette.primary.main,
              0.4
            )}`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${
              color || theme.palette.primary.main
            }, ${alpha(color || theme.palette.primary.main, 0.7)})`,
          },
        }}
      >
        {" "}
        <CardContent
          sx={{
            p: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
              width: "100%",
            }}
          >
            <Box
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: alpha(color || theme.palette.primary.main, 0.15),
                color: color || theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                mb: 2,
                "& .MuiSvgIcon-root": {
                  fontSize: "2.5rem",
                },
                "&:hover": {
                  transform: "rotate(360deg)",
                  bgcolor: alpha(color || theme.palette.primary.main, 0.2),
                },
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: color || theme.palette.primary.main,
                lineHeight: 1,
                fontSize: { xs: "3rem", sm: "3.5rem" },
                background: `linear-gradient(45deg, ${
                  color || theme.palette.primary.main
                }, ${alpha(color || theme.palette.primary.main, 0.7)})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {value}
            </Typography>

            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 500, textAlign: "center" }}
              >
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Chip
                icon={
                  isPositiveTrend ? (
                    <TrendingUp fontSize="small" />
                  ) : (
                    <TrendingDown fontSize="small" />
                  )
                }
                label={trend}
                size="small"
                color={isPositiveTrend ? "success" : "error"}
                sx={{
                  alignSelf: "flex-start",
                  fontWeight: 600,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default AdminStatsCard;
