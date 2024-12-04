"use client";
import { BookingProvider } from "./context/bookingContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className="antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
