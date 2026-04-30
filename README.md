# 🧾 InvoiceFlow SaaS

InvoiceFlow is a premium, full-stack Invoice Management SaaS Frontend tailored for SMEs, schools, and freelancers. It is designed with a modern glassmorphism aesthetic, responsive mobile-first architecture, and advanced billing features.

![InvoiceFlow Preview](screenshots/login-page.png)

## 🚀 Key Features

* **🔐 Authentication & Protected Routing**: Centralized AuthContext with token-based simulated login, guarded routes, and a beautiful split-layout auth screen.
* **👥 Customer Management (CRM)**: A built-in CRM to add, edit, and manage clients, storing data persistently in `localStorage`.
* **🧾 Dynamic Invoice Builder**: An interactive builder with real-time tax/total calculations and dynamic line items.
* **📱 QR Code Payment Integration**: Automatically generates unique, scan-to-pay QR codes directly on the invoice using `qrcode.react`, embedding invoice ID and bank instructions.
* **🏢 Company Branding System**: Customize the platform to fit your business. Update your company name, select from global currencies (PKR, USD, EUR, GBP), pick a brand theme color, and set custom footer/payment instructions. The invoice preview updates dynamically.
* **✨ Premium UI/UX**: Built entirely with Tailwind CSS v4 featuring soft shadows, rounded borders, pulse animations, staggered entrances, and full responsive support (collapsible sidebar for mobile).

## 🛠️ Tech Stack

* **Framework:** React 19 + Vite
* **Styling:** Tailwind CSS v4 (Custom design tokens & utilities)
* **Routing:** React Router v7
* **QR Codes:** `qrcode.react`
* **Unique IDs:** `uuid`
* **Testing:** Playwright (E2E)

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository and navigate to the directory.
2. Install the dependencies:
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5174`.

## 🧪 Testing

This project includes complete End-to-End (E2E) testing powered by **Playwright**. The tests thoroughly verify the Login flow, Registration, form validations, and route navigation.

To run the Playwright tests:
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run the test suite
npx playwright test tests/auth.spec.js
```
*Make sure your dev server (`npm run dev`) is running before executing the tests.*

## 🛣️ Roadmap
- [x] Phase 1: Frontend Architecture, Auth, UI Design System
- [x] Phase 2: CRM, QR Code Payments, Branding Preferences
- [ ] Phase 3: Bulk Send System (Fee Vouchers for Schools)
- [ ] Phase 4: Backend Integration (Laravel/Node REST API)
