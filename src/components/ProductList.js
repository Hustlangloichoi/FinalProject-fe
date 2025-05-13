import styled from "styled-components";
import ProductCard from "./ProductCard";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;
const GridItem = styled.div`
  flex: 1 1 22%;
  max-width: 24%;
  min-width: 200px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    max-width: 32%;
  }
  @media (max-width: 900px) {
    max-width: 48%;
  }
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

function ProductList({ products }) {
  return (
    <Grid>
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductCard product={product} />
        </GridItem>
      ))}
    </Grid>
  );
}

export default ProductList;
