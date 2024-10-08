drop schema julio cascade;

create extension "uuid-ossp";

create schema julio;

create table julio.contract (
	id_contract uuid not null default uuid_generate_v4() primary key,
	description text,
	amount numeric,
	periods integer,
	date timestamp
);

create table julio.payment (
	id_payment uuid not null default uuid_generate_v4() primary key,
	id_contract uuid references julio.contract (id_contract),
	amount numeric,
	date timestamp
);

insert into julio.contract values ('4224a279-c162-4283-86f5-1095f559b08c', 'Prestação de serviços escolares', 6000, 12, '2022-01-01T10:00:00');
insert into julio.payment values ('c931d9db-c8d8-44d4-8861-b3d6b734c64e', '4224a279-c162-4283-86f5-1095f559b08c', 6000, '2022-01-05T10:00:00');