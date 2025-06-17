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
  height: auto;
  min-height: 200px;
  max-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  
  @media (max-width: 600px) {
    padding: 12px;
    min-height: 180px;
    max-height: 350px;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    min-height: 160px;
  }
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
            sx={{
              height: { xs: 150, sm: 180, md: 200 },
              objectFit: "cover"
            }}
          />
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography 
              gutterBottom 
              variant="body1" 
              component="div" 
              noWrap
              sx={{ 
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 500
              }}
            >
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
