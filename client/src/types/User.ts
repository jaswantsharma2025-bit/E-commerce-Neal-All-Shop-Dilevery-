export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "customer" | "vendor" | "rider";
  storeName?: string;
}
