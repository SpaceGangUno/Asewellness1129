import { v4 as uuidv4 } from 'uuid';

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID;
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID;
const SQUARE_ACCESS_TOKEN = import.meta.env.VITE_SQUARE_ACCESS_TOKEN;

interface PaymentRequest {
  amount: number;
  currency: string;
  idempotencyKey: string;
}

interface CreatePaymentParams {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  sourceId: string;
}

export async function createPaymentRequest(amount: number): Promise<PaymentRequest> {
  return {
    amount,
    currency: 'USD',
    idempotencyKey: uuidv4()
  };
}

export async function initializePayment(amount: number): Promise<void> {
  try {
    const payments = await window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
    const card = await payments.card();
    await card.attach('#card-container');

    const paymentRequest = await createPaymentRequest(amount);

    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      throw new Error('Payment creation failed');
    }

    const result = await card.tokenize();
    if (result.status === 'OK') {
      // Process payment with token
      console.log('Payment successful:', result.token);
    } else {
      throw new Error(result.errors[0].message);
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}

export async function createPayment(params: CreatePaymentParams): Promise<void> {
  try {
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        sourceId: params.sourceId,
        amount: params.total * 100, // Convert to cents
        currency: 'USD',
        idempotencyKey: uuidv4(),
        items: params.items
      }),
    });

    if (!response.ok) {
      throw new Error('Payment processing failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}