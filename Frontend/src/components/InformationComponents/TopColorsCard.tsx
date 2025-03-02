import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material"; // Tuodaan Grid

interface TopColorsCardProps {
  topColors: { color: string; count: number }[];
}

const TopColorsCard: React.FC<TopColorsCardProps> = ({ topColors }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Top Colors
        </Typography>
        {topColors.length > 0 ? (
          <Box className="top-colors-container">
            {topColors.map((color, index) => (
              <Box key={index} className="color-item">
                <Box className="color-circle" style={{ backgroundColor: color.color }} />
                <Typography variant="body1">
                  {color.color}: {color.count}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" className="no-data-text">
            No color data available.
          </Typography>
        )}
      </CardContent>
    </Card>
  </Grid>
);

export default TopColorsCard;