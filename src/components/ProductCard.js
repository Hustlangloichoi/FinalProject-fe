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

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  height: auto; /* Adjust height dynamically based on content */
  min-height: 200px; /* Set a minimum height */
  max-height: 400px; /* Set a maximum height to prevent overflow */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <StyledCard onClick={() => navigate(`/product/${product.id}`)}>
      <CardActionArea>
        <ProductCardContainer>
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
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {fCurrency(product.priceSale)}
                </Typography>
              )}
              <Typography variant="subtitle1">
                {fCurrency(product.price)}
              </Typography>
            </Stack>
          </CardContent>
        </ProductCardContainer>
      </CardActionArea>
    </StyledCard>
  );
}

export default ProductCard;
