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

export const loginFormLinks: ILink[] = [
  {
    text: "Forgot Password?",
    path: "/forgot-password",
  },
  {
    text: "Need an Account?",
    path: "/register",
  },
];

export const registerFormLinks: ILink[] = [
  {
    text: "Have an Account?",
    path: "/login",
  },
];
