--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.0

-- Started on 2024-04-16 14:24:04

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
-- TOC entry 5 (class 2615 OID 49362)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 229 (class 1255 OID 49363)
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
-- TOC entry 230 (class 1255 OID 49364)
-- Name: check_pr_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pr_event_disjoint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id IN (SELECT event_id FROM public_events) 
	OR NEW.event_id IN (SELECT event_id FROM rso_event) THEN
        RAISE EXCEPTION 'private_events event_id must not exist in public_events or rso_events tables';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pr_event_disjoint() OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 49365)
-- Name: check_pr_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pr_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM events) THEN
        RAISE EXCEPTION 'private_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pr_id() OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 49366)
-- Name: check_pu_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pu_event_disjoint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id IN (SELECT event_id FROM private_events) 
	OR NEW.event_id IN (SELECT event_id FROM rso_event) THEN
        RAISE EXCEPTION 'public_events event_id must not exist in private_events or rso_events tables';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pu_event_disjoint() OWNER TO postgres;

--
-- TOC entry 233 (class 1255 OID 49367)
-- Name: check_pu_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_pu_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM events) THEN
        RAISE EXCEPTION 'public_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_pu_id() OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 49368)
-- Name: check_rso_event_disjoint(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rso_event_admin() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
	IF NEW.admin_id NOT IN (SELECT admin_id FROM rsos WHERE rso_id = NEW.rso_id) THEN
		RAISE EXCEPTION 'RSO event must be created by that RSOs Admin.';
	END IF;
	
	RETURN NEW;
END;$$;


ALTER FUNCTION public.check_rso_event_admin() OWNER TO postgres;

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
-- TOC entry 235 (class 1255 OID 49369)
-- Name: check_rso_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rso_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.event_id NOT IN (SELECT event_id FROM events) THEN
        RAISE EXCEPTION 'rso_events event_id must exist in event table';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_rso_id() OWNER TO postgres;

CREATE FUNCTION public.check_if_rso_active() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
    IF (SELECT COUNT(*) FROM "join"
        WHERE rso_id = NEW.rso_id) > 4 THEN
        UPDATE rsos
        	SET status = 'active'
        	WHERE rso_id = NEW.rso_id;
    END IF;
    
    RETURN NEW;
END;$$;


ALTER FUNCTION public.check_if_rso_active() OWNER TO postgres;

CREATE FUNCTION public.check_if_rso_inactive() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
    IF (SELECT COUNT(*) FROM "join"
        WHERE rso_id = OLD.rso_id) < 5 THEN
        UPDATE rsos
        	SET status = 'inactive'
        	WHERE rso_id = OLD.rso_id;
    END IF;
    
    RETURN OLD;
END;$$;

--
-- TOC entry 236 (class 1255 OID 49370)
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
-- TOC entry 214 (class 1259 OID 49371)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    user_id integer NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 49374)
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
-- TOC entry 216 (class 1259 OID 49380)
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
-- TOC entry 217 (class 1259 OID 49388)
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
-- TOC entry 218 (class 1259 OID 49391)
-- Name: private_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.private_events (
    event_id integer NOT NULL,
    admin_id integer NOT NULL,
    super_admin_id integer NOT NULL
);


ALTER TABLE public.private_events OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49394)
-- Name: public_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_events (
    event_id integer NOT NULL,
    admin_id integer NOT NULL,
    super_admin_id integer NOT NULL
);


ALTER TABLE public.public_events OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49400)
-- Name: rso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rso (
    rso_name character varying(32) NOT NULL,
    admin_id integer NOT NULL,
    university_id integer NOT NULL,
    rso_description text NOT NULL,
    rso_id integer NOT NULL
);


ALTER TABLE public.rso OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49397)
-- Name: rso_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rso_event (
    event_id integer NOT NULL,
    rso_id integer NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    date timestamp without time zone NOT NULL,
    admin_id integer NOT NULL
);


ALTER TABLE public.rso_event OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 65602)
-- Name: rso_event_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rso_event_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rso_event_event_id_seq OWNER TO postgres;

--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 227
-- Name: rso_event_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rso_event_event_id_seq OWNED BY public.rso_event.event_id;


--
-- TOC entry 228 (class 1259 OID 65603)
-- Name: rso_event_event_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rso_event ALTER COLUMN event_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.rso_event_event_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 65581)
-- Name: rso_rso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rso ALTER COLUMN rso_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.rso_rso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 49570)
-- Name: university; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.university (
    university_id integer NOT NULL,
    super_admin_id integer NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    enrollment integer NOT NULL,
    description text NOT NULL,
    domain text
);


ALTER TABLE public.university OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 49573)
-- Name: university_university_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.university ALTER COLUMN university_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_university_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 49411)
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
-- TOC entry 223 (class 1259 OID 49416)
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
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.users_id;


--
-- TOC entry 3221 (class 2604 OID 49417)
-- Name: users users_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN users_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3224 (class 2606 OID 49419)
-- Name: admins admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3228 (class 2606 OID 49421)
-- Name: events event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 3233 (class 2606 OID 49423)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_name);


--
-- TOC entry 3237 (class 2606 OID 49425)
-- Name: private_events private_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT private_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 3240 (class 2606 OID 49427)
-- Name: public_events public_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT public_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 3243 (class 2606 OID 65601)
-- Name: rso_event rso_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso_event
    ADD CONSTRAINT rso_event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 3247 (class 2606 OID 65580)
-- Name: rso rso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso
    ADD CONSTRAINT rso_pkey PRIMARY KEY (rso_id);


--
-- TOC entry 3231 (class 2606 OID 49435)
-- Name: events unique_time_and_location; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT unique_time_and_location UNIQUE ("time", location_name);


--
-- TOC entry 3254 (class 2606 OID 65589)
-- Name: university university_domain_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university
    ADD CONSTRAINT university_domain_unique UNIQUE (domain);


--
-- TOC entry 3256 (class 2606 OID 49578)
-- Name: university university_university_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university
    ADD CONSTRAINT university_university_id PRIMARY KEY (university_id);


--
-- TOC entry 3249 (class 2606 OID 49439)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3251 (class 2606 OID 49441)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (users_id);


--
-- TOC entry 3238 (class 1259 OID 49442)
-- Name: fki_a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_a ON public.public_events USING btree (super_admin_id);


--
-- TOC entry 3244 (class 1259 OID 65587)
-- Name: fki_admin_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admin_id_fkey ON public.rso USING btree (admin_id);


--
-- TOC entry 3234 (class 1259 OID 49443)
-- Name: fki_admins_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_admins_fkey ON public.private_events USING btree (admin_id);


--
-- TOC entry 3225 (class 1259 OID 49444)
-- Name: fki_events_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_events_fkey ON public.comments USING btree (event_id);


--
-- TOC entry 3229 (class 1259 OID 49445)
-- Name: fki_location_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_location_fkey ON public.events USING btree (location_name);


--
-- TOC entry 3241 (class 1259 OID 65599)
-- Name: fki_rso_event_rso_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_rso_event_rso_id_fkey ON public.rso_event USING btree (rso_id);


--
-- TOC entry 3235 (class 1259 OID 49448)
-- Name: fki_super_admins_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_super_admins_fkey ON public.private_events USING btree (super_admin_id);


--
-- TOC entry 3245 (class 1259 OID 65567)
-- Name: fki_university_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_university_id_fkey ON public.rso USING btree (university_id);


--
-- TOC entry 3252 (class 1259 OID 49584)
-- Name: fki_university_super_admin_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_university_super_admin_id ON public.university USING btree (super_admin_id);


--
-- TOC entry 3226 (class 1259 OID 49449)
-- Name: fki_users_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_users_fkey ON public.comments USING btree (user_id);


--
-- TOC entry 3269 (class 2620 OID 49450)
-- Name: admins admin_isa_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER admin_isa_user BEFORE INSERT OR UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION public.check_admin_id();


--
-- TOC entry 3270 (class 2620 OID 49451)
-- Name: private_events pr_event_disjoint; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pr_event_disjoint BEFORE INSERT OR UPDATE ON public.private_events FOR EACH ROW EXECUTE FUNCTION public.check_pr_event_disjoint();


--
-- TOC entry 3271 (class 2620 OID 49452)
-- Name: private_events pr_isa_event; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pr_isa_event BEFORE INSERT OR UPDATE ON public.private_events FOR EACH ROW EXECUTE FUNCTION public.check_pr_id();


--
-- TOC entry 3272 (class 2620 OID 49453)
-- Name: public_events pu_event_disjoint; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pu_event_disjoint BEFORE INSERT OR UPDATE ON public.public_events FOR EACH ROW EXECUTE FUNCTION public.check_pu_event_disjoint();


--
-- TOC entry 3273 (class 2620 OID 49454)
-- Name: public_events pu_isa_event; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pu_isa_event BEFORE INSERT OR UPDATE ON public.public_events FOR EACH ROW EXECUTE FUNCTION public.check_pu_id();

CREATE TRIGGER rso_event_creator_is_admin BEFORE INSERT OR UPDATE ON public.rso_event FOR EACH ROW EXECUTE FUNCTION public.check_rso_event_admin();

CREATE TRIGGER rso_event_disjoint BEFORE INSERT OR UPDATE ON public.rso_events FOR EACH ROW EXECUTE FUNCTION public.check_rso_event_disjoint();

CREATE TRIGGER rso_isa_event BEFORE INSERT OR UPDATE ON public.rso_events FOR EACH ROW EXECUTE FUNCTION public.check_rso_id();

CREATE TRIGGER rso_member_delete AFTER DELETE ON public."join" FOR EACH ROW EXECUTE FUNCTION public.check_if_rso_inactive();

CREATE TRIGGER rso_member_insert AFTER INSERT ON public."join" FOR EACH ROW EXECUTE FUNCTION public.check_if_rso_active();

CREATE TRIGGER super_admin_isa_user BEFORE INSERT OR UPDATE ON public.super_admins FOR EACH ROW EXECUTE FUNCTION public.check_super_admin_id();

--
-- TOC entry 3261 (class 2606 OID 49463)
-- Name: private_events admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT admin_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(user_id);


--
-- TOC entry 3263 (class 2606 OID 49468)
-- Name: public_events admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT admin_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(user_id);


--
-- TOC entry 3266 (class 2606 OID 65582)
-- Name: rso admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso
    ADD CONSTRAINT admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.users(users_id);


--
-- TOC entry 3262 (class 2606 OID 49473)
-- Name: private_events event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 3264 (class 2606 OID 49478)
-- Name: public_events event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_events
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 3258 (class 2606 OID 49483)
-- Name: comments event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- TOC entry 3260 (class 2606 OID 49498)
-- Name: events location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT location_fkey FOREIGN KEY (location_name) REFERENCES public.location(location_name);


--
-- TOC entry 3265 (class 2606 OID 65594)
-- Name: rso_event rso_event_rso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso_event
    ADD CONSTRAINT rso_event_rso_id_fkey FOREIGN KEY (rso_id) REFERENCES public.rso(rso_id);


--
-- TOC entry 3267 (class 2606 OID 65562)
-- Name: rso university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rso
    ADD CONSTRAINT university_id_fkey FOREIGN KEY (university_id) REFERENCES public.university(university_id);


--
-- TOC entry 3268 (class 2606 OID 49579)
-- Name: university university_super_admin_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university
    ADD CONSTRAINT university_super_admin_id FOREIGN KEY (super_admin_id) REFERENCES public.users(users_id);


--
-- TOC entry 3257 (class 2606 OID 49528)
-- Name: admins user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 3259 (class 2606 OID 49538)
-- Name: comments user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(users_id);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-04-16 14:24:05

--
-- PostgreSQL database dump complete
--

