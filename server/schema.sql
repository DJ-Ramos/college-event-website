--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-29 20:34:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 233 (class 1255 OID 16582)
-- Name: check_admin_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_admin_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.user_id NOT IN (SELECT user_id FROM users) THEN
        RAISE EXCEPTION 'admin user_id must exist in user table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_admin_id() OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 16586)
-- Name: check_pr_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pr_event_disjoint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id IN (SELECT event_id FROM public_events) 
	OR NEW.event_id IN (SELECT event_id FROM rso_events) THEN
        RAISE EXCEPTION 'private_events event_id must not exist in public_events or rso_events tables';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pr_event_disjoint() OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 16576)
-- Name: check_pr_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pr_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM event) THEN
        RAISE EXCEPTION 'private_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pr_id() OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 16588)
-- Name: check_pu_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pu_event_disjoint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id IN (SELECT event_id FROM private_events) 
	OR NEW.event_id IN (SELECT event_id FROM rso_events) THEN
        RAISE EXCEPTION 'public_events event_id must not exist in private_events or rso_events tables';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pu_event_disjoint() OWNER TO postgres;

--
-- TOC entry 229 (class 1255 OID 16578)
-- Name: check_pu_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pu_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM event) THEN
        RAISE EXCEPTION 'public_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pu_id() OWNER TO postgres;

--
-- TOC entry 235 (class 1255 OID 16590)
-- Name: check_rso_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rso_event_disjoint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id IN (SELECT event_id FROM private_events) 
	OR NEW.event_id IN (SELECT event_id FROM public_events) THEN
        RAISE EXCEPTION 'rso_events event_id must not exist in private_events or public_events tables';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_rso_event_disjoint() OWNER TO postgres;

--
-- TOC entry 230 (class 1255 OID 16580)
-- Name: check_rso_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rso_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM event) THEN
        RAISE EXCEPTION 'rso_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_rso_id() OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 16584)
-- Name: check_super_admin_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_super_admin_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.user_id NOT IN (SELECT user_id FROM users) THEN
        RAISE EXCEPTION 'super admin user_id must exist in users table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_super_admin_id() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16457)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    user_id integer NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16477)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    user_id integer NOT NULL,
    text text,
    rating integer,
    "timestamp" timestamp without time zone,
    event_id integer NOT NULL,
    CONSTRAINT comment_rating_non_null CHECK (((text IS NOT NULL) OR (rating IS NOT NULL)))
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16413)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    "time" time without time zone NOT NULL,
    date date NOT NULL,
    description text,
    event_name character varying(32) NOT NULL,
    location_name character varying(32) NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16528)
-- Name: join; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."join" (
    user_id integer NOT NULL,
    rso_id integer NOT NULL
);


ALTER TABLE public."join" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16452)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    location_name character varying(32) NOT NULL,
    address character varying(64) NOT NULL,
    longitude double precision,
    latitude double precision
);


ALTER TABLE public.location OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16422)
-- Name: private_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.private_events (
    event_id integer NOT NULL,
    admin_id integer NOT NULL,
    super_admin_id integer NOT NULL
);


ALTER TABLE public.private_events OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16427)
-- Name: public_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_events (
    event_id integer NOT NULL,
    admin_id integer NOT NULL,
    super_admin_id integer NOT NULL
);


ALTER TABLE public.public_events OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16442)
-- Name: rso_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rso_events (
    event_id integer NOT NULL,
    rso_id integer NOT NULL
);


ALTER TABLE public.rso_events OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16518)
-- Name: rsos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rsos (
    rso_id integer NOT NULL,
    rso_name character varying(32) NOT NULL,
    admin_id integer NOT NULL
);


ALTER TABLE public.rsos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16467)
-- Name: super_admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.super_admins (
    user_id integer NOT NULL
);


ALTER TABLE public.super_admins OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16502)
-- Name: universities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universities (
    super_admin_id integer NOT NULL,
    university_name character varying(32) NOT NULL,
    location_name character varying(32),
    description text,
    num_students integer,
    university_id integer NOT NULL
);


ALTER TABLE public.universities OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16402)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    users_id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    user_type text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16407)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.users_id;


--
-- TOC entry 4740 (class 2604 OID 16408)
-- Name: users users_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN users_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4763 (class 2606 OID 16461)
-- Name: admins admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4747 (class 2606 OID 16417)
-- Name: events event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 4761 (class 2606 OID 16456)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_name);


--
-- TOC entry 4754 (class 2606 OID 16426)
-- Name: private_events private_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT private_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 4757 (class 2606 OID 16431)
-- Name: public_events public_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT public_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 4759 (class 2606 OID 16446)
-- Name: rso_events rso_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso_events
    ADD CONSTRAINT rso_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 4772 (class 2606 OID 16522)
-- Name: rsos rso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsos
    ADD CONSTRAINT rso_pkey PRIMARY KEY (rso_id);


--
-- TOC entry 4765 (class 2606 OID 16471)
-- Name: super_admins super_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.super_admins
    ADD CONSTRAINT super_admin_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4750 (class 2606 OID 16421)
-- Name: events unique_time_and_location; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT unique_time_and_location UNIQUE ("time", location_name);


--
-- TOC entry 4770 (class 2606 OID 16593)
-- Name: universities university_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT university_pkey PRIMARY KEY (university_id);


--
-- TOC entry 4743 (class 2606 OID 16410)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4745 (class 2606 OID 16412)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (users_id);


--
-- TOC entry 4755 (class 1259 OID 16570)
-- Name: fki_a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_a ON public.public_events USING btree (super_admin_id);


--
-- TOC entry 4751 (class 1259 OID 16553)
-- Name: fki_admins_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admins_fkey ON public.private_events USING btree (admin_id);


--
-- TOC entry 4766 (class 1259 OID 16495)
-- Name: fki_events_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_events_fkey ON public.comments USING btree (event_id);


--
-- TOC entry 4748 (class 1259 OID 16547)
-- Name: fki_location_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_location_fkey ON public.events USING btree (location_name);


--
-- TOC entry 4768 (class 1259 OID 16517)
-- Name: fki_locations_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_locations_fkey ON public.universities USING btree (location_name);


--
-- TOC entry 4773 (class 1259 OID 16541)
-- Name: fki_rsos_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_rsos_fkey ON public."join" USING btree (rso_id);


--
-- TOC entry 4752 (class 1259 OID 16559)
-- Name: fki_super_admins_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_super_admins_fkey ON public.private_events USING btree (super_admin_id);


--
-- TOC entry 4767 (class 1259 OID 16501)
-- Name: fki_users_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_users_fkey ON public.comments USING btree (user_id);


--
-- TOC entry 4798 (class 2620 OID 16583)
-- Name: admins admin_isa_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER admin_isa_user BEFORE INSERT OR UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION public.check_admin_id();


--
-- TOC entry 4792 (class 2620 OID 16587)
-- Name: private_events pr_event_disjoint; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pr_event_disjoint BEFORE INSERT OR UPDATE ON public.private_events FOR EACH ROW EXECUTE FUNCTION public.check_pr_event_disjoint();


--
-- TOC entry 4793 (class 2620 OID 16577)
-- Name: private_events pr_isa_event; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pr_isa_event BEFORE INSERT OR UPDATE ON public.private_events FOR EACH ROW EXECUTE FUNCTION public.check_pr_id();


--
-- TOC entry 4794 (class 2620 OID 16589)
-- Name: public_events pu_event_disjoint; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pu_event_disjoint BEFORE INSERT OR UPDATE ON public.public_events FOR EACH ROW EXECUTE FUNCTION public.check_pu_event_disjoint();


--
-- TOC entry 4795 (class 2620 OID 16579)
-- Name: public_events pu_isa_event; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pu_isa_event BEFORE INSERT OR UPDATE ON public.public_events FOR EACH ROW EXECUTE FUNCTION public.check_pu_id();


--
-- TOC entry 4796 (class 2620 OID 16591)
-- Name: rso_events rso_event_disjoint; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER rso_event_disjoint BEFORE INSERT OR UPDATE ON public.rso_events FOR EACH ROW EXECUTE FUNCTION public.check_rso_event_disjoint();


--
-- TOC entry 4797 (class 2620 OID 16581)
-- Name: rso_events rso_isa_event; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER rso_isa_event BEFORE INSERT OR UPDATE ON public.rso_events FOR EACH ROW EXECUTE FUNCTION public.check_rso_id();


--
-- TOC entry 4799 (class 2620 OID 16585)
-- Name: super_admins super_admin_isa_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER super_admin_isa_user BEFORE INSERT OR UPDATE ON public.super_admins FOR EACH ROW EXECUTE FUNCTION public.check_super_admin_id();


--
-- TOC entry 4789 (class 2606 OID 16523)
-- Name: rsos admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rsos
    ADD CONSTRAINT admin_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(user_id);


--
-- TOC entry 4775 (class 2606 OID 16548)
-- Name: private_events admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT admin_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(user_id);


--
-- TOC entry 4778 (class 2606 OID 16560)
-- Name: public_events admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT admin_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(user_id);


--
-- TOC entry 4776 (class 2606 OID 16432)
-- Name: private_events event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 4779 (class 2606 OID 16437)
-- Name: public_events event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 4785 (class 2606 OID 16490)
-- Name: comments event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 4781 (class 2606 OID 16447)
-- Name: rso_events event_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso_events
    ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 4787 (class 2606 OID 16512)
-- Name: universities location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT location_fkey FOREIGN KEY (location_name) REFERENCES public.location(location_name);


--
-- TOC entry 4774 (class 2606 OID 16542)
-- Name: events location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT location_fkey FOREIGN KEY (location_name) REFERENCES public.location(location_name);


--
-- TOC entry 4790 (class 2606 OID 16536)
-- Name: join rso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."join"
    ADD CONSTRAINT rso_fkey FOREIGN KEY (rso_id) REFERENCES public.rsos(rso_id);


--
-- TOC entry 4782 (class 2606 OID 16571)
-- Name: rso_events rso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso_events
    ADD CONSTRAINT rso_fkey FOREIGN KEY (rso_id) REFERENCES public.rsos(rso_id);


--
-- TOC entry 4788 (class 2606 OID 16507)
-- Name: universities super_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT super_admin_fkey FOREIGN KEY (super_admin_id) REFERENCES public.super_admins(user_id);


--
-- TOC entry 4777 (class 2606 OID 16554)
-- Name: private_events super_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT super_admin_fkey FOREIGN KEY (super_admin_id) REFERENCES public.super_admins(user_id);


--
-- TOC entry 4780 (class 2606 OID 16565)
-- Name: public_events super_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT super_admin_fkey FOREIGN KEY (super_admin_id) REFERENCES public.super_admins(user_id);


--
-- TOC entry 4783 (class 2606 OID 16462)
-- Name: admins user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 4784 (class 2606 OID 16472)
-- Name: super_admins user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.super_admins
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 4786 (class 2606 OID 16496)
-- Name: comments user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 4791 (class 2606 OID 16531)
-- Name: join user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."join"
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-03-29 20:34:15

--
-- PostgreSQL database dump complete
--

