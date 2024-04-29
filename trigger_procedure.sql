
CREATE OR REPLACE PROCEDURE frissit_kepet_es_kategoriat(
    p_kep_id IN NUMBER,
    p_cim IN VARCHAR2,
    p_fajl_eleresi_utvonal IN VARCHAR2,
    p_prompt IN VARCHAR2,
    p_kategoria_nev IN VARCHAR2
) AS
BEGIN
    UPDATE Kep
    SET Cim = p_cim,
        Fajl_eleresi_utvonal = p_fajl_eleresi_utvonal,
        Prompt = p_prompt
    WHERE KepID = p_kep_id;
    
    DECLARE
        v_kategoria_id NUMBER(10);
    BEGIN
        SELECT KategoriaID INTO v_kategoria_id
        FROM Kategoria
        WHERE Nev = p_kategoria_nev;
        
        UPDATE Kategoriaja
        SET KategoriaID = v_kategoria_id
        WHERE KepID = p_kep_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            ROLLBACK;
            DBMS_OUTPUT.PUT_LINE('Nem található a megadott kategória név: ' || p_kategoria_nev);
        WHEN OTHERS THEN
            ROLLBACK;
            DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
    END;
END;
/