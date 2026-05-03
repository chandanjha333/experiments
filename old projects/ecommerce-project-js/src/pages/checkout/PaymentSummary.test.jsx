import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from "./PaymentSummary";

vi.mock('axios');

describe('PaymentSummary component', () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentSummary = {
      "totalItems": 4,
      "productCostCents": 7174,
      "shippingCostCents": 499,
      "totalCostBeforeTaxCents": 7673,
      "taxCents": 767,
      "totalCostCents": 8440
    };
  });

  it('displays payment summary correcly', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    )

    expect(
      within(screen.getByTestId('payment-summary-product-cost')).getByText('$71.74')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-shipping-cost')).getByText('$4.99')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-totalCostBeforeTax')).getByText('$76.73')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-tax')).getByText('$7.67')
    ).toBeInTheDocument();

    expect(screen.getByTestId('payment-summary-total-cost')).toHaveTextContent('$84.40');
  });

  it('places an order', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    )

    const placeOrderButton = screen.getByTestId('place-order-button');
    const user = userEvent.setup();
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-Path')).toHaveTextContent('/orders');
  });
});

function Location() {
  const location = useLocation();

  return <div data-testid="url-Path">{location.pathname}</div>
}