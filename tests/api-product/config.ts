// Expected product data for validation
export const EXPECTED_PRODUCTS = [
  {
    title: 'Fund Transfer to Krungthai Account',
    description: 'Fund Transfer to Krungthai Account provides 24/7 real-time transfers for quick and seamless transactions.',
  },
  {
    title: 'Fund Transfer to Other Bank Account',
    description: 'Fund Transfer to Other Bank Account enables real-time, 24/7 transfers for seamless transactions to any bank.',
  },
  {
    title: 'Fund Transfer to PromptPay',
    description: 'Fund Transfer to PromptPay empowers instant transfers, 24/7 convenience, and seamless transactions.',
  },
  {
    title: 'Direct Debit Registration',
    description: 'Offer your customers a convenient and secure way to set up auto-debit from anywhere and any time.',
  },
  {
    title: 'Direct Debit',
    description: 'Direct Debit enables daily, 24/7 availability, convenience, and secure debiting for your clients.',
  },
  {
    title: 'Authentication (App-to-App)',
    description: 'Authentication (App-to-App) enables user to securely and seamlessly log in to your application with their Paotang accounts.',
  },
  {
    title: 'Authentication (QR Scan)',
    description: "Authentication (QR scan) provides QR scan login via Paotang application, allowing user on a partner's website to log in with a few easy steps.",
  },
] as const

export const apiBaseURL = process.env.API_BASE_URL
