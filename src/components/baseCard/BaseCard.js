import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const BaseCard = ({ header, children }) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        {header}
      </Box>
      <CardContent sx={{ overflow: 'auto' }}>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
