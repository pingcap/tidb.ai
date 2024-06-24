
create table app
(
    app_id varchar(50)  null,
    name   varchar(255) null
);

create table app_access_token
(
    app_id varchar(50)  not null primary key,
    token  varchar(255) not null,
    constraint idx_aat_on_token unique (token)
);