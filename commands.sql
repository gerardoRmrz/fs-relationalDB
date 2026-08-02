postgres=# CREATE TABLE blogs(
postgres(# id SERIAL PRIMARY KEY,
postgres(# author TEXT NOT NULL,
postgres(# url TEXT NOT NULL,
postgres(# title TEXT NOT NULL,
postgres(# likes INT DEFAULT 0
postgres(# );