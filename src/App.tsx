
import './App.css'
import { useMovies } from './hooks/useMovies'
import { MovieCard } from './components/MovieCard'
import { useSearch } from './hooks/useSearch'
import { useCallback, useState } from 'react'

import debounce from 'just-debounce-it'


function App() { 
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies} = useMovies({sort})

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      getMovies({search})
    }, 500)
  , []) 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
            <input 
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }}
              name='query' 
              onChange={handleChange} 
              value={search}
              placeholder='Avenges, Star Wars, Matrix...' />
            <input type='checkbox' onChange={handleSort} checked={sort}/>
            <button type='submit'>Buscar</button>
        </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {movies.length ?
          <ul className='movies'> 
            {movies.map((movie) => MovieCard(movie))}
          </ul>
          :
          <div>No results</div>
        }
      </main>

    </div>
  )
}

export default App



