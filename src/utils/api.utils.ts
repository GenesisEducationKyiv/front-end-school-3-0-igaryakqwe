import { APIError } from "@/types/api";

export const throwError = async (res: Response, message: string) => {
  if (res.ok) return;
  const { error } = (await res.json()) as APIError;
  throw new Error(error || message || "An unexpected error occurred");
};