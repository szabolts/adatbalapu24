-- Oracledb 19.19.0.0

-- Timestamp formazasa a sessionben:
-- ALTER session SET NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS';

CREATE TABLE Felhasznalo (
    FelhasznaloID VARCHAR2(25) NOT NULL,
    Felhasznalonev VARCHAR2(20) NOT NULL,
    Vezeteknev VARCHAR2(20) NOT NULL,
    Keresztnev VARCHAR2(20) NOT NULL,
    Email VARCHAR2(50) NOT NULL UNIQUE,
    Jelszo VARCHAR2(60) NOT NULL,
    Role VARCHAR2(10) NOT NULL,
    PRIMARY KEY(FelhasznaloID)
);

CREATE TABLE Kep (
    KepID NUMBER(10) GENERATED AS IDENTITY,
    Cim VARCHAR2(50) NOT NULL,
    Feltoltes_datum TIMESTAMP NOT NULL,
    Fajl_eleresi_utvonal VARCHAR2(100) NOT NULL,
    Prompt VARCHAR2(255),
    FelhasznaloID VARCHAR2(25) NOT NULL,
    PRIMARY KEY(KepID),
    FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalo(FelhasznaloID) ON DELETE CASCADE 
);

CREATE TABLE Kategoria (
    KategoriaID NUMBER(10) GENERATED AS IDENTITY,
    Nev VARCHAR2(50) NOT NULL,
    Leiras VARCHAR2(255),
    PRIMARY KEY(KategoriaID)
);

CREATE TABLE Komment (
    KommentID NUMBER(10) GENERATED AS IDENTITY,
    Tartalom VARCHAR2(255) NOT NULL,
    Datum TIMESTAMP NOT NULL,
    FelhasznaloID VARCHAR2(25) NOT NULL,
    KepID NUMBER(10) NOT NULL,
    PRIMARY KEY(KommentID),
    FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalo(FelhasznaloID) ON DELETE CASCADE,
    FOREIGN KEY (KepID) REFERENCES Kep(KepID) ON DELETE CASCADE 
);

CREATE TABLE Kategoriaja(
    KepID NUMBER(10) NOT NULL,
    KategoriaID NUMBER(10) NOT NULL,
    PRIMARY KEY (KepID, KategoriaID),
    FOREIGN KEY (KepID) REFERENCES Kep(KepID) ON DELETE CASCADE,
    FOREIGN KEY (KategoriaID) REFERENCES Kategoria(KategoriaID) ON DELETE CASCADE 
);

CREATE TABLE KommentetLikeol (
    FelhasznaloID VARCHAR2(25) NOT NULL,
    KommentID NUMBER(10) NOT NULL,
    PRIMARY KEY (FelhasznaloID, KommentID),
    FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalo(FelhasznaloID) ON DELETE CASCADE,
    FOREIGN KEY (KommentID) REFERENCES Komment(KommentID) ON DELETE CASCADE 
);

CREATE TABLE KepetLikeol (
    FelhasznaloID VARCHAR2(25) NOT NULL,
    KepID NUMBER(10) NOT NULL,
    PRIMARY KEY (FelhasznaloID, KepID),
    FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalo(FelhasznaloID) ON DELETE CASCADE,
    FOREIGN KEY (KepID) REFERENCES Kep(KepID) ON DELETE CASCADE 
);




-- Felhasznalok
INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clss8n4l50000gmytfz5u0nzw','Test1', 'Kis', 'Ferenc', 'test@gmail.com','$2a$10$kn0UQNzBulFpRqrhBPXo6OR6uaCn.6cMWEHJUIEe1UrGXnXroFmeq', 'admin');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n863i000fw2qs82dicgme','Rozsomak','Rozsda', 'Péter', 'RozsdaPeter@gmail.com','$2a$10$0S/zyyn5IpDsMWmd.PisTeWlFThAZsQZKUOb5ohpP88ZeQjPOtACe', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nfivd000gw2qscsge0hpn','Rekabeka','Kiss', 'Réka', 'KissReka@gmail.com','$2a$10$I2px/41Wy55ibRKGFdKNk.XanuBP0Kth8/uJTU8uwihSOFpaKUCrG', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nhihu000hw2qs603maryw','NagyViktoria', 'Nagy', 'Viktória', 'NagyViktoria@gmail.com','$2a$10$1NfJCbKOvCs84d1VC5eaL.f.XeG.9eSYU.vt17Ir.hsVzQWe6ExSK', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nhylp000iw2qs1pc003nw','darthvader1999','Molnár', 'Balázs', 'MolnarBalazs@gmail.com','$2a$10$SKdFKjyt38cHgDoPbuX7BuqyS50KKNTsyPZfs0K3dbe3ZDidHN8Gq', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nk78q000mw2qsgxj51ch5','kuvasz','Papír', 'Anna', 'PapirAnna@gmail.com','$2a$10$F0lQda6aukSi6csKZkB6duQXsSECHox9QHoJfVKgwxfKzeib8FZte', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nl6dx000nw2qsckhlgydb','buksika','Horváth', 'Emese', 'HorvathEmese@gmail.com','$2a$10$MW0JPkmE7MESB4NNLyg5HeyT9By6fzmtFhcYZWUwlZh63kJZ8R7Ey', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nlvao000ow2qs0lbw0anj','papuafej', 'Kapos', 'Lajos', 'KaposLajos@gmail.com','$2a$10$JYPRBybn7NASSnaVSRjiS.RThFDGaYqAH7a2d9GSOwu3c/dQ1sMfO', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nmjju000pw2qs2s47ch1g','aramlaszlo','Áram', 'László', 'AramLaszlo@gmail.com','$2a$10$NQ2CqCGrGMtRE7ZiCr4Ag.J/rAk/bx32XxozsFEDdzCkC2XaAy2.C', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('cltyz4g0v0000pe42cl9l0ddh','Mezga','Mézga', 'Aladár', 'example1@gmail.com','$2a$10$y2U7C/MPRDuaB0ur6LAaauUzs5IF4//dD5psylclcpT.MimjrCTum', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1nimbl000jw2qse20tgrmv','FuvesiAdam','Füvesi', 'Ádám', 'FuvesiAdam@gmail.com','$2a$10$ppTd0Sn.ATMP9JEjjLn79ejVfdFTNYdYfG4YHMx1lpCzTBjfUuxRS', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('clu1nj76o000kw2qs6ofu75sv','slayer88','Szikra', 'Márton','SzikraMarton@gmail.com','$2a$10$s.dh808bhRycmgkHchOBAODF39E3.uILKEMswPfgLAaZOXKneTfPu', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('cltboudsd0000w9421jnfdsqt','liliandaniela01','Lilian', 'Daniel','liliandaniela01@gmail.com','$2a$10$CrZqWdAxzu2XFBQLlQiL2e6IaDeI.oontAkdowR6i5oyvw2y8aI9K', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1mjbl20000w2qsgpei6a2q','Eleck', 'Teszt', 'Elek', 'TesztElek@gmail.com','$2a$10$Xp2luPT8JxftgllzODIWyeKxrzizDvfHKH./Z7siDRzT4U5TrA1Kq', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1mr3240000w2qsf7z778qc','jackab','Gipsz', 'Jakab','GipszJakab@gmail.com','$2a$10$vF1asXQo3LsFUrLgq76JBeQEtg0tlAwqn6V7RyOUMqZQx2Qj6z.zO', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1ms2hi0001w2qs22s3exln','viragmezo','Mezei', 'Virág', 'MezeiVirag@gmail.com','$2a$10$UT1UdwvCCn2y4rH7Njq0XOV3/hrMUmQTXieqIosPron9kKfSJGr6K', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1msmab0002w2qsbidc12px','vinyo','Vincs', 'Eszter','VincsEszter@gmail.com','$2a$10$spVPV4GubIFGOmR.fUBCLOktQJTAXem0EhtST/t/yOtSooaA99S6M', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1mt2hw0003w2qs3e81078e','Disznaj','Disz', 'Nóra', 'DiszNora@gmail.com','$2a$10$w6SPtdHGG6fgdnfb2KqHgeXIRflMUAhTom2j/GwZD7oCLkhvo8nzS', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1mtn2b0004w2qsfwi94glo','lenke','Eszet', 'Lenke','EszetLenke@gmail.com','$2a$10$3rj4sKAncSa1eCwkqueRoOwWM50cKv89I.DMxAF/GpvGFhO2oiExG', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1myhjs0005w2qs7sn21yl9','semmiaron','Bármi', 'Áron','BarmiAron@gmail.com','$2a$10$S2jZgyj5NTbnEm0MqZqgGeItXoUHXf2ywFR3SdPMkJ7uwITDYhv6a', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1mzax60006w2qsgi1o0hqs','ebedelek','Ebéd', 'Elek', 'EbedElek@gmail.com','$2a$10$2GXuXW8OWpyQk5LKhR6RyOs.LTe8tpMlHjXL8eylSbxhuyR/lgnCC', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('clu1n3j2w0007w2qs4eqlbmxx','boroskola','Boros', 'András','BorosAndras@gmail.com','$2a$10$F5.XOJr8XV.Fy8c6c5W9B.uhKJHgcVOIvyRKLkuick9t/ZeFCysTK', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n473v0008w2qs6xobb12e','kocsik','Kovács', 'Péter', 'KovacsPeter@gmail.com','$2a$10$f/WUuPgD/cMfF66JJq/.he6kkTTVrAOeWT0C591F7s1E7yMulgdja', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n5vt5000bw2qsf3im1w0d','pankracio12','Szabó', 'Gergő','SzaboGergo@gmail.com','$2a$10$tSnItKHOuYDqEN1LGrqp/ugMFYli.hkCnvlgLUM/3cczUEkufIK2K', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n57ha000aw2qs7omkap32','kovacsanna','Kovács', 'Anna','KovacsAnna@gmail.com','$2a$10$mFm5ivZngus880w3Ejrb6u5HMReo48sqiwHglapE94jUIhgm1koDO', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n6gxy000cw2qs894b1f9i','bencushka','Éder', 'Bence','EderBence@gmail.com','$2a$10$Nff8qeQAtMEJN8r.I0YDpuYcHUDgYCE.SPPwDYsVC6PB.WGZ0Y6UC', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('clu1n6wrb000dw2qs99rb77q2','Rezangyal','Réz', 'Anna', 'RezAnna@gmail.com','$2a$10$a.wdR8jsZoQHGt5flPjm4.ARDI/AmG0bEStOtaVfxzCm2KEP6cb26', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role) 
VALUES ('clu1n7i4t000ew2qs2wnt6nlk','Tuzelo','Tüz', 'Eszter','TuzEszter@gmail.com','$2a$10$2CS0zjxrHM3DXX96zUmafOCXy9XAIxUzXjzBeYUUbnOlvLnT0yWv6', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('clu1n4rj80009w2qs37sp8j0a', 'fekamarci', 'Fekete', 'Márton', 'FeketeMarton@gmail.com','$2a$10$H18sWhkJv689okxF.VJfhOy6XI7O7FfYffyivKvTRWVX8pEnhDIGa', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('clu1njqif000lw2qsgba33q32','eeesztikee','Barna', 'Eszter', 'BarnaEszter@gmail.com','$2a$10$Kw8jHms9lCLuaNkYSSXZDucWwQs0p2rmL/IY0ShsgJfKCn3hYse7y', 'user');

INSERT INTO Felhasznalo (FelhasznaloID, Felhasznalonev, Vezeteknev, Keresztnev, Email, Jelszo, Role)
VALUES ('cluhpp660000064yt71gwfumc','asdasdasd','asd', 'asd', 'asdasd@gmail.com','$2a$10$mFAJnpNrKuaYtqGXsUHrKeordXM249T.amWxuCgN2lGmRIYAzpcdC', 'user');



-- Kepek
INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Soft Abstract 3D Cityscape', TIMESTAMP '2024-03-21 10:00:00', '/kepek/soft_abstrack_3d/sa1.png', 'Cityscape, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine', 'clu1nfivd000gw2qscsge0hpn');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Soft Abstract 3D Hamburger', TIMESTAMP '2024-03-21 10:15:00', '/kepek/soft_abstrack_3d/sa2.png', 'Hamburger, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Soft Abstract 3D Mountains', TIMESTAMP '2024-03-21 10:30:00', '/kepek/soft_abstrack_3d/sa3.png', 'Mountains, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine ', 'clu1nhylp000iw2qs1pc003nw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Soft Abstract 3D Surfer', TIMESTAMP '2024-03-21 10:45:00', '/kepek/soft_abstrack_3d/sa4.png', ' Surfer, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine', 'clu1nk78q000mw2qsgxj51ch5');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Soft Abstract 3D Tree', TIMESTAMP '2024-03-21 11:00:00', '/kepek/soft_abstrack_3d/sa5.png', 'Tree, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine', 'clu1nl6dx000nw2qsckhlgydb');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Surrealist Comic Hamburger', TIMESTAMP '2024-03-21 11:15:00', '/kepek/surrealist_comic/sc1.png', 'Hamburger in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal ', 'clu1nlvao000ow2qs0lbw0anj');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Surrealist Comic Bicycle', TIMESTAMP '2024-03-21 11:30:00', '/kepek/surrealist_comic/sc2.png', 'Bicycle in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal ', 'clu1nmjju000pw2qs2s47ch1g');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Surrealist Comic Child', TIMESTAMP '2024-03-21 11:45:00', '/kepek/surrealist_comic/sc3.png', 'Child in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal ', 'cltyz4g0v0000pe42cl9l0ddh');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Surrealist Comic Cityscape', TIMESTAMP '2024-03-21 12:00:00', '/kepek/surrealist_comic/sc4.png', 'Cityscape in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal ', 'clu1nimbl000jw2qse20tgrmv');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Surrealist Comic Cat', TIMESTAMP '2024-03-21 12:15:00', '/kepek/surrealist_comic/sc5.png', 'Cat in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal ', 'clu1nj76o000kw2qs6ofu75sv');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Vaporwave Illustration Jungle', TIMESTAMP '2024-03-21 12:30:00', '/kepek/vaporwave_illustration/vi1.png', 'a drawing of a Jungle, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics ', 'clu1njqif000lw2qsgba33q32');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Vaporwave Illustration Bridge', TIMESTAMP '2024-03-21 12:45:00', '/kepek/vaporwave_illustration/vi2.png', 'a drawing of a Bridge, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics ', 'cltboudsd0000w9421jnfdsqt');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Vaporwave Illustration Waterfall', TIMESTAMP '2024-03-21 13:00:00', '/kepek/vaporwave_illustration/vi3.png', 'a drawing of a Waterfall, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics ', 'clu1mjbl20000w2qsgpei6a2q');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Vaporwave Illustration Mountains', TIMESTAMP '2024-03-21 13:15:00', '/kepek/vaporwave_illustration/vi4.png', 'a drawing of a Mountains, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics', 'clu1mr3240000w2qsf7z778qc');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Vaporwave Illustration Shark', TIMESTAMP '2024-03-21 13:30:00', '/kepek/vaporwave_illustration/vi5.png', 'a drawing of a Shark, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics ', 'clu1ms2hi0001w2qs22s3exln');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('50s High Detail Family', TIMESTAMP '2024-03-21 14:00:00', '/kepek/50s_hig_detail/hd1.png', '1950s vintage clipart retro Family, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy', 'clu1mr3240000w2qsf7z778qc');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('50s High Detail Hiker', TIMESTAMP '2024-03-21 14:15:00', '/kepek/50s_hig_detail/hd2.png', '1950s vintage clipart retro Hiker, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy', 'clu1ms2hi0001w2qs22s3exln');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('50s High Detail Street Vendor', TIMESTAMP '2024-03-21 14:30:00', '/kepek/50s_hig_detail/hd3.png', '1950s vintage clipart retro Street Vendor, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy', 'cltyz4g0v0000pe42cl9l0ddh');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('50s High Detail Cow', TIMESTAMP '2024-03-21 14:45:00', '/kepek/50s_hig_detail/hd4.png', '1950s vintage clipart retro Cow, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy', 'clu1nmjju000pw2qs2s47ch1g');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('50s High Detail Jungle', TIMESTAMP '2024-03-21 15:00:00', '/kepek/50s_hig_detail/hd5.png', '1950s vintage clipart retro Jungle, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy', 'clu1ms2hi0001w2qs22s3exln');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retrossaince Jungle', TIMESTAMP '2024-03-21 15:15:00', '/kepek/Retrossaince/rss1.png', 'a black drawing showing an ancient Jungle, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble', 'clu1nhylp000iw2qs1pc003nw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retrossaince Family', TIMESTAMP '2024-03-21 15:30:00', '/kepek/Retrossaince/rss2.png', 'a black drawing showing an ancient Family, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble', 'clu1ms2hi0001w2qs22s3exln');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retrossaince Meadows', TIMESTAMP '2024-03-21 15:45:00', '/kepek/Retrossaince/rss3.png', 'a black drawing showing an ancient Meadows, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble', 'clu1nlvao000ow2qs0lbw0anj');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retrossaince Waterfall', TIMESTAMP '2024-03-21 16:00:00', '/kepek/Retrossaince/rss4.png', 'a black drawing showing an ancient Waterfall, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble', 'clu1ms2hi0001w2qs22s3exln');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retrossaince Group of people', TIMESTAMP '2024-03-21 16:15:00', '/kepek/Retrossaince/rss5.png', 'a black drawing showing an ancient Group of people, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Family', TIMESTAMP '2024-03-21 16:30:00', '/kepek/retro_futurism/rf1.png', 'Family, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'clu1mzax60006w2qsgi1o0hqs');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Group of people', TIMESTAMP '2024-03-21 16:45:00', '/kepek/retro_futurism/rf2.png', 'Group of people, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Jungle', TIMESTAMP '2024-03-21 17:00:00', '/kepek/retro_futurism/rf3.png', 'Jungle, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Mountains', TIMESTAMP '2024-03-21 17:15:00', '/kepek/retro_futurism/rf4.png', 'Mountains, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'clu1mzax60006w2qsgi1o0hqs');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Meadows', TIMESTAMP '2024-03-21 17:30:00', '/kepek/retro_futurism/rf5.png', 'Meadows, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'cltyz4g0v0000pe42cl9l0ddh');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Retro Futurism Market', TIMESTAMP '2024-03-21 17:45:00', '/kepek/retro_futurism/rf6.png', 'Market, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('80s Trance Poster Synth Glowing Metropolis', TIMESTAMP '2024-03-21 20:15:00', '/kepek/80s_trance_poster/tp1.png', 'synth glowing metropolis in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('80s Trance Poster Synth Pinball Arcade Game', TIMESTAMP '2024-03-21 20:30:00', '/kepek/80s_trance_poster/tp2.png', 'synth pinball arcade game in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded', 'clu1mzax60006w2qsgi1o0hqs');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('80s Trance Poster Synth Neon Palm Trees', TIMESTAMP '2024-03-21 20:45:00', '/kepek/80s_trance_poster/tp3.png', 'synth neon palm trees in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('80s Trance Poster Synth Cyberpunk DJ Booth', TIMESTAMP '2024-03-21 21:00:00', '/kepek/80s_trance_poster/tp4.png', 'synth cyberpunk DJ booth in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded', 'cltyz4g0v0000pe42cl9l0ddh');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('80s Trance Poster Synth Dragon', TIMESTAMP '2024-03-21 21:15:00', '/kepek/80s_trance_poster/tp5.png', 'synth dragon in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Meadows', TIMESTAMP '2024-03-21 21:30:00', '/kepek/neo_futuristic/nf1.png', 'Meadows in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Bookstore', TIMESTAMP '2024-03-21 21:45:00', '/kepek/neo_futuristic/nf2.png', 'Bookstore in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Waterfall', TIMESTAMP '2024-03-21 22:00:00', '/kepek/neo_futuristic/nf3.png', 'Waterfall in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Market', TIMESTAMP '2024-03-21 22:15:00', '/kepek/neo_futuristic/nf4.png', 'Market in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Mountains', TIMESTAMP '2024-03-21 22:30:00', '/kepek/neo_futuristic/nf5.png', 'Mountains in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Hiker', TIMESTAMP '2024-03-21 22:45:00', '/kepek/neo_futuristic/nf6.png', 'Hiker in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');

INSERT INTO Kep (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, Prompt, FelhasznaloID) 
VALUES ('Neo Futuristic Bridge', TIMESTAMP '2024-03-21 23:00:00', '/kepek/neo_futuristic/nf7.png', 'Bridge in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids', 'clu1nhihu000hw2qs603maryw');





-- Kommentek
INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez egy remek kép!', TIMESTAMP '2024-03-21 08:00:00', 'clss8n4l50000gmytfz5u0nzw', 1);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyon tetszik ez a fotó!', TIMESTAMP '2024-02-21 08:15:00', 'clu1n863i000fw2qs82dicgme', 2);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Szép pillanat!', TIMESTAMP '2024-01-16 08:30:00', 'clu1nfivd000gw2qscsge0hpn', 3);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Fantasztikus kép!', TIMESTAMP '2024-01-23 08:45:00', 'clu1nhihu000hw2qs603maryw', 4);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez a kedvencem eddig!', TIMESTAMP '2024-03-24 09:00:00', 'clu1nhylp000iw2qs1pc003nw', 5);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyon érdekes fotó!', TIMESTAMP '2024-03-25 09:15:00', 'clu1nk78q000mw2qsgxj51ch5', 6);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Csodálatos látvány!', TIMESTAMP '2024-03-21 09:30:00', 'clu1nl6dx000nw2qsckhlgydb', 7);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez megihletett!', TIMESTAMP '2024-03-21 09:45:00', 'clu1nlvao000ow2qs0lbw0anj', 8);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyon profi munka!', TIMESTAMP '2024-03-21 10:00:00', 'clu1nmjju000pw2qs2s47ch1g', 9);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Tökéletes összhatás!', TIMESTAMP '2024-03-21 10:15:00', 'cltyz4g0v0000pe42cl9l0ddh', 10);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Remek összhatás!', TIMESTAMP '2024-03-21 10:30:00', 'clu1nimbl000jw2qse20tgrmv', 11);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyszerű fotó!', TIMESTAMP '2024-03-21 10:45:00', 'clu1nj76o000kw2qs6ofu75sv', 12);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Imádom ezt a képet!', TIMESTAMP '2024-03-21 11:00:00', 'clu1njqif000lw2qsgba33q32', 13);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez lenyűgöző!', TIMESTAMP '2024-03-21 11:15:00', 'cltboudsd0000w9421jnfdsqt', 14);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Fantasztikus pillanat!', TIMESTAMP '2024-03-21 11:30:00', 'clu1mjbl20000w2qsgpei6a2q', 15);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez a legjobb eddig!', TIMESTAMP '2024-03-21 11:45:00', 'clu1mr3240000w2qsf7z778qc', 16);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Csodálatosan fest!', TIMESTAMP '2024-03-21 12:00:00', 'clu1ms2hi0001w2qs22s3exln', 1);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez inspiráló!', TIMESTAMP '2024-03-21 12:15:00', 'clu1msmab0002w2qsbidc12px', 2);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Fantasztikus munka!', TIMESTAMP '2024-03-21 12:30:00', 'clu1mt2hw0003w2qs3e81078e', 3);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez egyedülálló!', TIMESTAMP '2024-03-21 12:45:00', 'clu1mtn2b0004w2qsfwi94glo', 4);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Lenyűgöző munka!', TIMESTAMP '2024-03-21 13:00:00', 'clu1myhjs0005w2qs7sn21yl9', 5);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez a legjobb eddig látott kép!', TIMESTAMP '2024-03-22 08:30:00', 'clu1mzax60006w2qsgi1o0hqs', 6);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyon szép!', TIMESTAMP '2024-03-23 11:45:00', 'clu1n3j2w0007w2qs4eqlbmxx', 7);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez igazán inspiráló!', TIMESTAMP '2024-03-24 14:15:00', 'clu1n473v0008w2qs6xobb12e', 8);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Fantasztikus látvány!', TIMESTAMP '2024-03-25 10:30:00', 'clu1n4rj80009w2qs37sp8j0a', 9);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez valóban lenyűgöző!', TIMESTAMP '2024-03-26 09:00:00', 'clu1n57ha000aw2qs7omkap32', 10);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Nagyon szép pillanat!', TIMESTAMP '2024-03-27 16:45:00', 'clu1n5vt5000bw2qsf3im1w0d', 11);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez egy igazi mestermű!', TIMESTAMP '2024-03-28 12:00:00', 'clu1n6gxy000cw2qs894b1f9i', 12);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Imádom ezt a képet!', TIMESTAMP '2024-03-29 08:15:00', 'clu1n6wrb000dw2qs99rb77q2', 13);

INSERT INTO Komment (Tartalom, Datum, FelhasznaloID, KepID) 
VALUES ('Ez egyedi és lenyűgöző!', TIMESTAMP '2024-03-30 15:30:00', 'clu1n7i4t000ew2qs2wnt6nlk', 14);

-- Komment likeok
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clss8n4l50000gmytfz5u0nzw', 1);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n863i000fw2qs82dicgme', 2);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nfivd000gw2qscsge0hpn', 3);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nhihu000hw2qs603maryw', 4);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nhylp000iw2qs1pc003nw', 5);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nk78q000mw2qsgxj51ch5', 6);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nl6dx000nw2qsckhlgydb', 7);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nlvao000ow2qs0lbw0anj', 8);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nmjju000pw2qs2s47ch1g', 9);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('cltyz4g0v0000pe42cl9l0ddh', 10);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nimbl000jw2qse20tgrmv', 11);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1nj76o000kw2qs6ofu75sv', 12);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1njqif000lw2qsgba33q32', 13);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('cltboudsd0000w9421jnfdsqt', 14);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1mjbl20000w2qsgpei6a2q', 15);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1mr3240000w2qsf7z778qc', 16);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1ms2hi0001w2qs22s3exln', 17);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1msmab0002w2qsbidc12px', 18);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1mt2hw0003w2qs3e81078e', 19);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1mtn2b0004w2qsfwi94glo', 20);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1myhjs0005w2qs7sn21yl9', 21);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1mzax60006w2qsgi1o0hqs', 22);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n3j2w0007w2qs4eqlbmxx', 23);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n473v0008w2qs6xobb12e', 24);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n4rj80009w2qs37sp8j0a', 25);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n57ha000aw2qs7omkap32', 26);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n5vt5000bw2qsf3im1w0d', 27);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n6gxy000cw2qs894b1f9i', 28);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n6wrb000dw2qs99rb77q2', 29);
INSERT INTO KommentetLikeol (FelhasznaloID, KommentID) VALUES ('clu1n7i4t000ew2qs2wnt6nlk', 30);


-- Kep likeok
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('cltyz4g0v0000pe42cl9l0ddh', 1);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1nimbl000jw2qse20tgrmv', 2);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1nj76o000kw2qs6ofu75sv', 3);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1njqif000lw2qsgba33q32', 4);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('cltboudsd0000w9421jnfdsqt', 5);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1mjbl20000w2qsgpei6a2q', 6);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1mr3240000w2qsf7z778qc', 7);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1ms2hi0001w2qs22s3exln', 8);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1msmab0002w2qsbidc12px', 9);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1mt2hw0003w2qs3e81078e', 10);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1mtn2b0004w2qsfwi94glo', 11);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1myhjs0005w2qs7sn21yl9', 12);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1mzax60006w2qsgi1o0hqs', 13);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n3j2w0007w2qs4eqlbmxx', 14);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n473v0008w2qs6xobb12e', 15);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n4rj80009w2qs37sp8j0a', 1);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n57ha000aw2qs7omkap32', 1);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n5vt5000bw2qsf3im1w0d', 2);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n6gxy000cw2qs894b1f9i', 3);
INSERT INTO KepetLikeol (FelhasznaloID, KepID) VALUES ('clu1n6wrb000dw2qs99rb77q2', 4);

-- Kategoriak
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Soft Abstract 3D', '{subject}, in the style of conceptual minimalist sculpture, surrealistic juxtapositions, light white and light pink, realistic yet imaginative, i cant believe how beautiful this is, fine lines, delicate curves, playful cartoonish scenes, unreal engine');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Surrealist Comic', '{subject}, in the style of futuristic contraptions, detailed colorful comic, light black and purple, detailed comic book art, luminescent color scheme, detailed illustration, nature, surreal');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Vaporwave Illustration', 'a drawing of a {subject}, in the style of light pink and light aquamarine, grid work, vintage aesthetics, post-internet aesthetics');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('50s High Detail', '1950s vintage clipart retro {subject}, in the style of green and azure, realist portraiture, associated press photo, realist: lifelike accuracy');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Retrossaince', 'a black drawing showing an ancient {subject}, in the style of light pink and light gray, animated gifs, greek art and architecture, vintage aesthetics, ocean academia, hand-drawn animation, marble');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Retro Futurism', '{subject}, in the style of retro-futuristic propaganda, frequent use of yellow, romanticized views, uncanny valley realism, die brücke, otherworldly visions, les automatistes --ar 2:1');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('80s Trance Poster', 'synth {subject} in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Neo Futuristic', '{subject} in the style of neo futuristic, neon bright, illustrated, high tech, highly detail, bright colors, androids ');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Vaporwave Neon', '{subject} in the style of vaporwave, a variety of light posters and blown up circles with ethereal outlines, grandiose ruins, vibrant hues master, gold and cyan, colorful gardens, resin, warped, studio photography, fashion photography');
INSERT INTO Kategoria (Nev, Leiras) VALUES ('Yellow Brutalism', '{subject}, in the style of energy-filled illustrations, industrial brutalism, yellow and magenta, enigmatic characters, lowbrow surrealism, blown-off-roof perspective');


-- Soft Abstract 3D
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (1, 1); 
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (2, 1);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (3, 1);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (4, 1);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (5, 1);

-- Surrealist Comic
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (6, 2);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (7, 2);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (8, 2);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (9, 2);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (10, 2);

-- Vaporwave Illustration
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (11, 3);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (12, 3);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (13, 3);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (14, 3);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (15, 3);

-- 50s High Detail
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (16, 4);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (17, 4);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (18, 4);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (19, 4);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (20, 4);

-- Retrossaince
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (21, 5);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (22, 5);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (23, 5);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (24, 5);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (25, 5);

-- Retro Futurism
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (26, 6);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (27, 6);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (28, 6);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (29, 6);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (30, 6);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (31, 6);

-- 80s Trance Poster
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (32, 7);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (33, 7);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (34, 7);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (35, 7);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (36, 7);

-- Neo Futuristic
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (37, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (38, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (39, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (40, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (41, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (42, 8);
INSERT INTO Kategoriaja (KepID, KategoriaID) VALUES (43, 8);



