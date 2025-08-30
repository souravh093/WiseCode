import { JwtPayload } from "jwt-decode";

export type TJwtPayload = {
  email: string;
  role: "ADMIN" | "VIEWER";
  id?: string;
};

export interface TCustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
