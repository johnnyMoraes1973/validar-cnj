-- FUNCTION: public.validar_numero_unico_processo(text)

-- DROP FUNCTION IF EXISTS public.validar_numero_unico_processo(text);

CREATE OR REPLACE FUNCTION public.validar_numero_unico_processo(
	numero text)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    numero_processo TEXT;
    digito_verificador_extraido INT;
    vara TEXT;
    tribunal TEXT;
    ramo TEXT;
    ano_inicio TEXT;
    numero_sequencial TEXT;
    digito_verificador_calculado INT;
    mod INT := 0;
    take INT := 5;
    a INT;
    x TEXT;
BEGIN
    -- Remove todos os pontos e traços
    numero_processo := REGEXP_REPLACE(numero, '[.-]', '', 'g');

    -- Verifica o comprimento e se é numérico
    IF LENGTH(numero_processo) < 14 OR numero_processo !~ '^\d+$' THEN
        RETURN FALSE;
    END IF;

    -- Extrai as partes do número CNJ
    digito_verificador_extraido := CAST(SUBSTRING(numero_processo FROM LENGTH(numero_processo) - 12 FOR 2) AS INT);
    vara := SUBSTRING(numero_processo FROM LENGTH(numero_processo) - 3 FOR 4);
    tribunal := SUBSTRING(numero_processo FROM LENGTH(numero_processo) - 5 FOR 2);
    ramo := SUBSTRING(numero_processo FROM LENGTH(numero_processo) - 6 FOR 1);
    ano_inicio := SUBSTRING(numero_processo FROM LENGTH(numero_processo) - 10 FOR 4);
    numero_sequencial := LPAD(SUBSTRING(numero_processo FROM 1 FOR LENGTH(numero_processo) - 13), 7, '0');

    -- Concatena as partes para o cálculo do dígito verificador
    x := numero_sequencial || ano_inicio || ramo || tribunal || vara || '00';

    -- Realiza o cálculo do módulo diretamente dentro da função
    WHILE LENGTH(x) > 0 LOOP
        a := CAST(mod || LEFT(x, take) AS INT);  -- Pega os primeiros 5 caracteres e calcula o módulo
        x := SUBSTRING(x FROM take + 1);        -- Move para os próximos caracteres
        mod := a % 97;                          -- Calcula o módulo com 97
		--raise notice 'a % mod %, x %', a, mod , x;
    END LOOP;

    -- Calcula o dígito verificador esperado
    digito_verificador_calculado := 98 - mod;

    -- Compara os dígitos verificadores
    RETURN digito_verificador_extraido = digito_verificador_calculado;
END;
$BODY$;