export type User = {
    FELHASZNALOID: string;
    FELHASZNALONEV: string;
    VEZETEKNEV: string;
    KERESZTNEV: string;
    EMAIL: string;
    JELSZO: string;
    ROLE: string;
  };

export type Kep = {
  KEPID: number;
  CIM: string;
  FELTOLTES_DATUM: Date, // vagy string, ha a dátumot stringként tárolod
  FAJL_ELERESI_UTVONAL: string;
  PROMPT: string;
  FELHASZNALOID: string;
}