export type TJwtPayload = {
  email: string;
  role: "ADMIN" | "VIEWER";
  id?: string;
};
