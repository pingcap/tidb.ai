create table document_index_chunk_partitioned
(
    namespace_id int         not null,
    chunk_id     BINARY(16) not null,
    document_id  BINARY(16) not null,
    index_name   varchar(32) not null,
    text_content text        not null,
    ordinal      int         not null,
    metadata     json        not null,
    embedding vector< float > not null,
    staled       tinyint(1)  not null,
    primary key (namespace_id, chunk_id)
)
    partition by key (`namespace_id`) partitions 50;
create index idx_dic_on_chunk_id_document_id
    on document_index_chunk_partitioned (chunk_id, document_id);
create index idx_dic_on_document_id_staled_ordinal
    on document_index_chunk_partitioned (document_id, staled, ordinal);

create table namespace
(
    id                int auto_increment
        primary key,
    name              varchar(100)         not null,
    description       varchar(255)         null,
    common            tinyint(1) default 0 not null comment 'If a namespace is common, it allows the documents under it to be searched on retrieval phase by default.',
    `default`         tinyint(1) default 0 not null,
    level             int        default 1 not null,
    parent_id         int                  null,
    common_uri_prefix varchar(255)         null comment 'The bot is able to store documents in the corresponding namespace according to the uri_common_prefix prefix rule.',
    constraint `uni_n_on_name `
        unique (name)
);