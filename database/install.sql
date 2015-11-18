CREATE TABLE requests (
	request_id bigserial PRIMARY KEY,
	request_date date,
	operator_title VARCHAR(255),
	operator_id int,
	operator_jurisdiction VARCHAR(255),
	operator_jurisdiction_id int,
	dateadded timestamp
);

CREATE TABLE contacts (
	email_address VARCHAR(255) PRIMARY KEY
);

CREATE TABLE events (
	event_id bigserial PRIMARY KEY,
	jurisdiction_id bigint,
	name VARCHAR(255),
	description TEXT,
	days_to_reminder bigint,
	CONSTRAINT u_constraint UNIQUE (name, jurisdiction_id)
);

CREATE TABLE request_contacts (
	request_contact_id bigserial PRIMARY KEY,
	email_address varchar(255) REFERENCES contacts(email_address) ON DELETE CASCADE,
	request_id bigint REFERENCES requests(request_id)
);

CREATE TABLE request_events (
	request_event_id bigserial PRIMARY KEY,
	event_id bigint REFERENCES events(event_id),
	request_id bigint REFERENCES requests(request_id),
	request_contact_id bigint REFERENCES request_contacts(request_contact_id) ON DELETE CASCADE,
	email_sent BOOLEAN,
	email_schedule_date date,
);
CREATE INDEX schedule_date ON request_events (email_schedule_date);