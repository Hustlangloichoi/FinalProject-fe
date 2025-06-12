import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Container,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import ProductFilter, { SORT_BY_OPTIONS } from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import ProductList from "../components/ProductList";
import ProductNotFound from "../components/ProductNotFound";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
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
  const [openFilter, setOpenFilter] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  const defaultValues = {
    gender: [],
    category: [], // FIX: should be an array, not 'All'
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset, setValue } = methods;
  const filters = watch();
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        // Build query params from filters and page
        const params = new URLSearchParams();
        if (filters.searchQuery) params.append("keyword", filters.searchQuery);
        if (filters.category && filters.category !== "All") {
          if (Array.isArray(filters.category)) {
            filters.category.forEach((cat) => {
              if (cat && cat !== "All") params.append("category", cat);
            });
          } else {
            params.append("category", filters.category);
          }
        }
        if (filters.priceRange) params.append("priceRange", filters.priceRange);
        if (filters.sortBy) params.append("sortBy", filters.sortBy);
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
  }, [
    page,
    filters.searchQuery,
    searchTrigger,
    filters.category,
    filters.priceRange,
    filters.sortBy,
  ]);

  return (
    <>
      <HeroSection />
      <CategorySection
        onCategoryClick={(catName) => {
          methods.setValue("category", [catName]);
          setPage(1);
          setTimeout(() => {
            const productSection = document.getElementById(
              "product-list-section"
            );
            if (productSection) {
              productSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }}
      />
      <PromoBannerSection />
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
          mt: 3,
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
        }}
        id="product-list-section"
      >
        {/* MOBILE: Hiện nút filter, ẩn filter cố định */}
        {isMobile ? (
          <>
            <Button
              variant="contained"
              sx={{ mb: 2, width: 160 }}
              onClick={() => setOpenFilter(true)}
            >
              Filter
            </Button>
            <Dialog
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>Filter</DialogTitle>
              <DialogContent>
                <FormProvider methods={methods}>
                  <ProductFilter resetFilter={reset} />
                </FormProvider>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Stack
            sx={{
              minWidth: { xs: "100%", md: 250 },
              maxWidth: { xs: "100%", md: 250 },
            }}
          >
            <FormProvider methods={methods}>
              <ProductFilter resetFilter={reset} />
            </FormProvider>
          </Stack>
        )}
        <Stack sx={{ flexGrow: 1, width: "100%" }}>
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
                  setValue("searchQuery", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setPage(1);
                }}
                onSearch={(query) => {
                  setValue("searchQuery", query, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setPage(1);
                  setSearchTrigger((t) => t + 1); // TRIGGER SEARCH
                }}
              />
              <ProductSort
                value={filters.sortBy}
                onChange={(e) =>
                  setValue("sortBy", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                options={SORT_BY_OPTIONS}
              />
            </Stack>
          </FormProvider>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : products.length === 0 ? (
              <ProductNotFound onReset={reset} />
            ) : (
              <>
                <ProductList products={products} onResetFilters={reset} />
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
          </Box>
        </Stack>
      </Container>
      <TestimonialSection />
    </>
  );
}

export default HomePage;
