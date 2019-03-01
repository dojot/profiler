-- Table: public.messages

-- DROP TABLE public.messages;

CREATE SEQUENCE public.messages_id_seq;

ALTER SEQUENCE public.messages_id_seq
    OWNER TO dojot;
    
CREATE TABLE public.messages
(
    device_time bigint,
    mosca_time bigint,
    socket_time bigint,
    mongo_time bigint,
    total_messages integer,
    last_message boolean,
    id bigint NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
    test_id bigint,
    send_order bigint,
    CONSTRAINT messages_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.messages
    OWNER to dojot;


-- Table: public.tests

-- DROP TABLE public.tests;

CREATE SEQUENCE public.tests_id_seq;

ALTER SEQUENCE public.tests_id_seq
    OWNER TO dojot;

CREATE TABLE public.tests
(
    id bigint NOT NULL DEFAULT nextval('tests_id_seq'::regclass),
    host character(50) COLLATE pg_catalog."default",
    tenant character(10) COLLATE pg_catalog."default",
    username character(15) COLLATE pg_catalog."default",
    device character(10) COLLATE pg_catalog."default",
    total_messages integer,
    per_second integer,
    name character(20) COLLATE pg_catalog."default",
    CONSTRAINT testes_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tests
    OWNER to dojot;    