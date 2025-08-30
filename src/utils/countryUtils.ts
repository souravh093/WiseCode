import { countries } from "@/constant/countries";

export const getCountryName = (code: string): string => {
  const country = countries.find((c) => c.code === code);
  return country ? country.name : code;
};

export const getCountryCode = (name: string): string => {
  const country = countries.find((c) => c.name === name);
  return country ? country.code : name;
};
