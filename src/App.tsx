import { useEffect, useState } from 'react';

interface IMovie {
  id: number;
  name: string;
  genre: string;
  rating: number;
  releasedate: string;
}

export default function App() {
  const [editId, setEditId] = useState<number | null>(null);
  const [newMovieName, setNewMovieName] = useState<string>('');

  const getMovies = async () => {
    const movies: IMovie[] = [];

    await fetch('/movies.csv')
      .then(response => response.text()
      )
      .then(data => {
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
          const columns = row.split(',');
          const movie: IMovie = {
            id: parseInt(columns[0]),
            name: columns[1],
            genre: columns[2],
            rating: parseInt(columns[3]),
            releasedate: columns[4]
          }
          movies.push(movie);
        })
      });

    return movies;
  }

  const [movies, setMovies] = useState<IMovie[]>([]);



  useEffect(() => {
    const getProps = async () => {
      setMovies(await getMovies());
    }
    getProps();
  }, []);


  const deleteMovie = async (id: number) => {
    const newMovies = movies.filter(movie => movie.id !== id);
    setMovies(newMovies);
  }

  const handleEditPress = (id: number) => {
    // Set the editId state to the given ID
    setEditId(editId === id ? null : id);
    setNewMovieName(movies.find(movie => movie.id === id)?.name || '');
  }

  const saveMovie = async (id: number) => {
    const newMovies = movies.map(movie => {
      if (movie.id === id) {
        movie.name = newMovieName;
      }
      return movie;
    });
    setMovies(newMovies);
    setEditId(null);
  }


  return (
    <main className="main">
      <div className="center">
        <h1 className="title"> cinema </h1>
      </div>

      <div className="center">
        <div className="grid">
          {movies.length > 0 &&
            movies.map((movie: IMovie) => {
              return (
                <div className="card" key={movie.id}>
                  <h3>{movie.name}</h3>
                  <p>Genre: {movie.genre}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>Release: {movie.releasedate}</p>

                  <button
                    className="editButton"
                    onClick={() => handleEditPress(movie.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="deleteButton"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete
                  </button>

                  <div className="edit"
                    hidden={editId !== movie.id}
                  >
                    <input type="text" value={newMovieName} onChange={(e) => setNewMovieName(e.target.value)} />
                    <button
                      onClick={() => saveMovie(movie.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div >
      </div>
    </main>
  )
}
