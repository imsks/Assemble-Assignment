export interface TestUser {
  name: string;
  age: number;
}

export interface TestUsersList {
  users: Array<TestUser>;
}

export type MeuseumVisitorData = {
  museum: string;
  visitors: string;
};
