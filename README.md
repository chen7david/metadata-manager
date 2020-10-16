# metadata-manager

### Movies API
Name | Method | URL
--- | --- | --- | 
search movies on tmdb | GET | /tmdb-movies?search=nemo&year=2017
search movie | GET | /import-movies/12
import movie | GET | /movies/12
search movies | GET | /tmdb-movies?search=nemo&year=2017
import movie | GET | /import-movies/12
import movie | GET | /movies/12

### Shows API
Name | Method | URL
--- | --- | --- | 
search show on tmdb | GET | /tmdb-shows?search=pokemon&year=2017
search show | GET | /shows?search=pokemon&year=2017
import show | GET | /tmdb-shows/4602
get all shows | GET | /shows
get show | GET | /shows/4602
update show season episodes | UPDATE | /shows/67198/season/2

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

