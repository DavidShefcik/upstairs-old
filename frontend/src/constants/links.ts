export interface ILink {
  text: string;
  path: string;
}

export const unauthenticatedNavLinks: ILink[] = [
  {
    text: "Login",
    path: "/login",
  },
  {
    text: "Register",
    path: "/register",
  },
];
