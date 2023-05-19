import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type SyntheticEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handlePromise<T>(
  promise: (event: SyntheticEvent) => Promise<T>
) {
  return (event: SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.error("Unexpected error", error);
      });
    }
  };
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
