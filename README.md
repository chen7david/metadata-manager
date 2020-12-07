# metadata-manager


### Movies API
Name | Method | URL
--- | --- | --- | 
return all movies in database | GET | /movies
create new movie | POST | /movies
get movie by id | GET | /movies/:id
patch movie by id | PATCH | /movies/:id
delete movie by id | DELETE | /movies/:id
download movie images | GET | /movies/:id?download=coverart
create movie image thumbnails | GET | /movies/:id?create=thumbnails

### Movies API Query Params
name | route | path | params 
--- | --- | --- | --- |
search | GET | /movies | search=string, year=1990
trending | GET | /movies | type=trending, window=week
genres | GET | /movies | type=genres, window=week



/movies?type=trending&window=day
/movies?type=trending&window=week
/movies?type=trending
/movies?type=genres


/shows?search=raven
/shows?search=raven&source=tmdb&year=2003
/movies?search=nemo&source=tmdb&year=2003


http://files.tmdb.org/p/exports/person_ids_12_03_2020.json.gz