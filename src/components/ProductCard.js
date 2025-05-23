import styled from "styled-components";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils";

const StyledCard = styled(Card)`
  cursor: pointer;
`;

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <StyledCard onClick={() => navigate(`/product/${product.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.image || "/logo.png"}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {product.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            {product.priceSale && (
              <Typography
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                {fCurrency(product.priceSale)}
              </Typography>
            )}
            <Typography variant="subtitle1">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default ProductCard;
