"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { TCustomJwtPayload } from "@/types/auth.types";

export const loggedUser = async () => {
  const cookie = await cookies();
  const token = cookie.get("auth-token")?.value;

  let decoded: TCustomJwtPayload | null = null;

  if (token) {
    decoded = jwtDecode<TCustomJwtPayload>(token);
  }

  return decoded;
};
