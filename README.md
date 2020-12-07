# metadata-manager


### Movies API
Name | Method | URL
--- | --- | --- | 
return all movies in database | GET | /movies
create new movie | POST | /movies
get movie by id | GET | /movies/:id
patch movie by id | PATCH | /movies/:id
delete movie by id | DELETE | /movies/:id

### Movies API Query Params
name | route | path | params 
--- | --- | --- | --- |
paginate | GET | /movies | page=integer, limit=integer
search | GET | /movies | search=string, year=1990
trending | GET | /movies | type=trending, window=week
genres | GET | /movies | type=genres, window=week
download | GET | /movies/:id| download=coverart
thumbnails | GET | /movies/:id| create=thumbnails


### Shows API
Name | Method | URL
--- | --- | --- | 
return all shows in database | GET | /shows
create new show | POST | /shows
get show by id | GET | /shows/:id
create season | POST | /shows/:id/season
update season | PATCH | /season/:id
delete season | DELETE | /season/:id
create episode | POST | /shows/:id/season/:id/episode
update episode | PATCH | /episode/:id
delete episode | DELETE | /episode/:id
patch show by id | PATCH | /shows/:id
delete show by id | DELETE | /shows/:id

### Shows API Query Params
name | route | path | params 
--- | --- | --- | --- |
paginate | GET | /shows | page=integer, limit=integer
search | GET | /shows | search=string, year=1990
trending | GET | /shows | type=trending, window=week
genres | GET | /shows | type=genres, window=week
seasons | GET | /shows/:id| seasons[]=1&seasons[]=2 or seasons[]=-1
download | GET | /shows/:id| download=coverart
thumbnails | GET | /shows/:id| create=thumbnails



/movies?type=trending&window=day
/movies?type=trending&window=week
/movies?type=trending
/movies?type=genres


/shows?search=raven
/shows?search=raven&source=tmdb&year=2003
/movies?search=nemo&source=tmdb&year=2003


http://files.tmdb.org/p/exports/person_ids_12_03_2020.json.gz