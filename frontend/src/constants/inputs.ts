export enum Input {
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
  STREET_ADDRESS = "street_address",
  CITY_ADDRESS = "city_address",
  ZIP_CODE = "zip_code",
}

interface InputSettings {
  maxLength: number;
}

export const INPUT_SETTINGS: Record<Input, InputSettings> = {
  email: {
    maxLength: 128,
  },
  password: {
    maxLength: 1024,
  },
  name: {
    maxLength: 16,
  },
  street_address: {
    maxLength: 128,
  },
  city_address: {
    maxLength: 32,
  },
  zip_code: {
    maxLength: 5,
  },
};
