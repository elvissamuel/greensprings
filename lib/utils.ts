import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: "NGN" | "USD" = "NGN"): string {
  const symbol = currency === "NGN" ? "₦" : "$"
  const formatted = (amount / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return `${symbol}${formatted}`
}

export function parseFormDate(dateString: string): Date {
  return new Date(dateString)
}
