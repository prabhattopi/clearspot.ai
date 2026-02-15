# ClearSpot.ai

This repository contains the solution for the Frontend Engineer Technical Assessment.

## 🚀 How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## 🏗️ Architecture

* **Vite + React + TypeScript:** For a fast, type-safe development environment.
* **TanStack Query (React Query):** For server state management, caching, and optimistic updates.
* **Axios:** For the API client implementation with interceptors.
* **Custom Hooks:** `useWebSocket` for managing real-time connections.

## 🛠️ Features Implemented

1.  **API Client:** A reusable `AxiosApiClient` class handling JWT tokens and error normalization.
2.  **Site Management:** A list of sites fetched via React Query (simulated API delay).
3.  **Real-time Alarms:** A WebSocket hook that auto-reconnects and processes incoming alarm streams (simulated data).
4.  **Optimistic Updates:** The "Capacity" field in the Site list updates instantly on save, rolling back if the simulated API fails.
5.  **Global Error Boundary:** Catches React render errors and provides a recovery UI.