export class User {
  id: number;
  username: string;
  customerName?: string;
  customerSurname?: string;
  email: string;
  password: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_SELLER';
  storeName?: string;

  constructor(id: number, username: string, customerName: string, customerSurname: string, email: string, password: string, role: 'ROLE_CUSTOMER' | 'ROLE_SELLER', storeName: string | undefined) {
    this.id = id;
    this.username = username;
    this.customerName = customerName;
    this.customerSurname = customerSurname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.storeName = storeName || undefined;
  }
}
