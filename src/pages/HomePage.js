import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import ProductList from "../components/ProductList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import PromoBannerSection from "../components/PromoBannerSection";
import TestimonialSection from "../components/TestimonialSection";
import Pagination from "@mui/material/Pagination";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTrigger, setSearchTrigger] = useState(0); // NEW

  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset, setValue } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedProducts = filterProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        // Build query params from filters and page
        const params = new URLSearchParams();
        if (filters.searchQuery) params.append("keyword", filters.searchQuery);
        if (filters.category && filters.category !== "All")
          params.append("category", filters.category);
        if (filters.priceRange) params.append("priceRange", filters.priceRange);
        if (filters.sortBy) params.append("sort", filters.sortBy);
        params.append("page", page);
        params.append("limit", productsPerPage);
        // This is where the search request is sent to the backend
        const res = await apiService.get(`/products?${params.toString()}`);
        const products = res.data.data.products || [];
        setProducts(products.map((p) => ({ ...p, id: p._id })));
        setTotalProducts(res.data.data.total || 0);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
    // eslint-disable-next-line
  }, [page, filters.searchQuery, searchTrigger]); // ADD searchTrigger

  // Handler for HeroSection search
  const handleHeroSearch = (query) => {
    setValue("searchQuery", query, { shouldValidate: true, shouldDirty: true });
    setPage(1); // Optionally reset to first page on new search
    // Scroll to product list
    setTimeout(() => {
      const productSection = document.getElementById("product-list-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <HeroSection />
      <CategorySection />
      <PromoBannerSection />
      <Container
        sx={{ display: "flex", minHeight: "100vh", mt: 3 }}
        id="product-list-section"
      >
        <Stack>
          <FormProvider methods={methods}>
            <ProductFilter resetFilter={reset} />
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <ProductSearch
                value={filters.searchQuery}
                onChange={(e) => {
                  setValue(
                    "searchQuery",
                    e.target.value,
                    { shouldValidate: true, shouldDirty: true }
                  );
                  setPage(1);
                }}
                onSearch={(query) => {
                  setValue("searchQuery", query, { shouldValidate: true, shouldDirty: true });
                  setPage(1);
                  setSearchTrigger((t) => t + 1); // TRIGGER SEARCH
                }}
              />
              <ProductSort />
            </Stack>
          </FormProvider>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <ProductList products={filterProducts} />
                    {totalPages > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 3,
                          mb: 6,
                        }}
                      >
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={(_, value) => setPage(value)}
                          color="primary"
                        />
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
      <TestimonialSection />
    </>
  );
}

function applyFilter(products, filters) {
  const { sortBy } = filters;
  let filteredProducts = products;

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(filteredProducts, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredProducts = orderBy(filteredProducts, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["asc"]);
  }

  // COMBINED FILTER: Category AND Price
  filteredProducts = filteredProducts.filter((product) => {
    let categoryMatch = true;
    let priceMatch = true;
    if (filters.category && filters.category !== "All") {
      categoryMatch = product.category === filters.category;
    }
    if (filters.priceRange) {
      if (filters.priceRange === "below") {
        priceMatch = product.price < 25;
      } else if (filters.priceRange === "between") {
        priceMatch = product.price >= 25 && product.price <= 75;
      } else if (filters.priceRange === "above") {
        priceMatch = product.price > 75;
      }
    }
    return categoryMatch && priceMatch;
  });

  return filteredProducts;
}

export default HomePage;
