export enum INPUT {
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
}

interface InputSettings {
  maxLength: number;
}

export const INPUT_SETTINGS: Record<INPUT, InputSettings> = {
  email: {
    maxLength: 128,
  },
  password: {
    maxLength: 1024,
  },
  name: {
    maxLength: 16,
  },
};
