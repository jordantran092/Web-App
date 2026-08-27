
-- Creating the search vector for Page, a PostgreSQL implementation managed by Postgres, that prisma does not need to manage 


ALTER TABLE "Page"
ADD COLUMN "searchVector" tsvector -- column data type is type tsvector using Postgres' FTS
/* 

The generated column that holds the expression to produce a ts_vector data format optimized for postgres to search through, created when page record is created. 

Set weight to make title higher prio over blocks when scanning. 

Coalesce to prevent taking title or blocks if null, which could cause whole expression to be null

Stored to save it when created, not re-ran after every query to avoid requiring too much performance during search, spread it out

*/

GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce("title", '')), 'A') || setweight(to_tsvector('english', coalesce("blocks", '')), 'B')
) STORED;


/*

Create index for the search vector col, using GIN to find potential rows faster based on searchVector col

*/
CREATE INDEX "Page_searchVector_idx"
ON "Page"
USING GIN ("searchVector");