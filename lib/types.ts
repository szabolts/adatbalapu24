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
  FELTOLTES_DATUM: Date, 
  FAJL_ELERESI_UTVONAL: string;
  PROMPT: string;
  FELHASZNALOID: string;
  FELHASZNALONEV: string;
  KATEGORIA_NEV: string;
}

export type Kategoria = {
  KATEGORIAID: number;
  NEV: string;
  LEIRAS: string | null; 
}

export type KategoriaEsElsoKep = {
  KATEGORIAID: number;
  KATEGORIANEV: string;
  KATEGORIALEIRAS: string | null;
  ELSOKEPELERESIUT: string;
}

export type Stat1 = {
  FELHASZNALONEV: string;
  FELTOLTOTTKEPEKSZAMA: number;
}