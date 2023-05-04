import { type SyntheticEvent } from "react";

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
