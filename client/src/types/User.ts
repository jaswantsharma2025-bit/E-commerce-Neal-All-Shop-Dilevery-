export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "customer" | "vendor" | "rider";
  // Vendor fields
  storeName?: string;
  storeDescription?: string;
  storeAddress?: string;
  storeCategory?: string;
  storeImage?: string;
  storeOpen?: boolean;
}
