export class RegistrationEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  createdAt: string;

  constructor(data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
    created_at: string;
  }) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.password = data.password;
    this.age = data.age;
    this.createdAt = data.created_at;
  }
}
