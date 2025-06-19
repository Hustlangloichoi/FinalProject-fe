# Product Components

This directory contains the refactored components for the DetailPage, breaking down the large monolithic component into smaller, more maintainable pieces.

## Components

### ProductImage.js

- Displays the product image with responsive styling
- Handles missing image gracefully

### ProductDetails.js

- Shows product name, description, and price
- Contains the order button and authentication state handling
- Responsive design for different screen sizes

### OrderDialog.js

- Main dialog component for the order process
- Contains customer information, payment, notes, and summary sections
- Responsive full-screen on mobile

### OrderFormCustomerInfo.js

- Customer information form section
- Quantity, address, and phone number inputs

### OrderFormPayment.js

- Payment method selection
- Payment details display based on selected method

### OrderFormNotes.js

- Additional notes textarea for special instructions

### OrderSummary.js

- Order summary display with total price calculation
- Product details and quantity breakdown

## Props Structure

Each component receives specific props to maintain separation of concerns and reusability:

- `product`: Product data object
- `fCurrency`: Currency formatting function
- State setters for form data (quantity, address, phone, etc.)
- Event handlers (onOrderClick, onSubmit, etc.)
- UI state (loading, mobile, authentication)

## Benefits of Refactoring

1. **Maintainability**: Easier to modify individual sections
2. **Reusability**: Components can be reused in other parts of the app
3. **Testing**: Smaller components are easier to test
4. **Performance**: Potential for better optimization with React.memo
5. **Readability**: Code is more organized and easier to understand
