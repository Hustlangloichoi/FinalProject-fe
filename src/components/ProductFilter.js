import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Diagnostic Equipment",
  "Monitoring Devices",
  "Therapeutic Devices",
  "Surgical Instruments",
  "Medical Consumables",
  "PPE",
  "Mobility Aids",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <FRadioGroup
          name="category"
          options={FILTER_CATEGORY_OPTIONS}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
