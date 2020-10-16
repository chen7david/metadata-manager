# metadata-manager

### Movies API
Name | Method | URL
--- | --- | --- | 
search movies on tmdb | GET | /tmdb-movies?search=nemo&year=2017
search movie | GET | /tmdb-movies/:id
get movie | GET | /movies/:id
search movies | GET | /movies?search=nemo&year=2017
delte movie | DELETE | /movies/:id

### Shows API
Name | Method | URL
--- | --- | --- | 
search show on tmdb | GET | /tmdb-shows?search=pokemon&year=2017
search show | GET | /shows?search=pokemon&year=2017
import show | GET | /tmdb-shows/:id
get all shows | GET | /shows
get show | GET | /shows/:id
update show season episodes | UPDATE | /shows/:id/season/:number
delte show | DELETE | /shows/:id

### Trending API
Name | Method | URL
--- | --- | --- | 
movies trending| GET | /trending?type=movies&window=week
shows trending| GET | /trending?type=shows
people trending| GET | /trending?type=people


### Genres API
Name | Method | URL
--- | --- | --- | 
movie genres| GET | /genres?type=movies
show genres| GET | /genres?type=shows

