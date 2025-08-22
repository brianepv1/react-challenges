export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    company: {
      department: string;
    };
  }
  
  export interface UsersApiResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }