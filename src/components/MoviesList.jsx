import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const MoviesList = () => {
  const [kino, setKino] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = 'https://www.omdbapi.com/?s=ip man&apikey=c65fcde9';

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setKino(data.Search);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(kino);

  return (
   <div className="movies-container py-5">
  <h1 className="text-center text-light mb-4 fw-bold">🎬 Movies Collection</h1>

  <div className="table-responsive">
    <table className="table table-hover table-bordered text-center align-middle shadow-lg rounded-4 overflow-hidden">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Year</th>
          <th>IMDb ID</th>
          <th>Type</th>
          <th>Poster</th>
        </tr>
      </thead>

      <tbody className="table-body-custom">
        {kino.length > 0 ? (
          kino.map((item, index) => (
            <tr key={item.imdbID} className="movie-row">
              <td className="text-secondary fw-bold">{index + 1}</td>
              <td className="fw-semibold text-light">{item.Title}</td>
              <td className="text-info fw-medium">{item.Year}</td>
              <td className="text-warning">{item.imdbID}</td>
              <td>
                <span className="badge bg-danger bg-opacity-75 text-light">
                  {item.Type}
                </span>
              </td>
              <td>
                <img
                  src={item.Poster}
                  alt={item.Title}
                  width="90"
                  className="rounded-3 shadow-sm border border-secondary"
                  loading="lazy"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-light fs-4 py-4">
              🎞 Loading movies...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MoviesList;
