export class LoginEntity {
  id: number;
  email: string;
  created_at: string;
  token: string;

  constructor(id: number, email: string, created_at: string, token: string) {
    this.id = id;
    this.email = email;
    this.created_at = created_at;
    this.token = token;
  }
}
