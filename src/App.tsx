import { useEffect, useState } from 'react';

interface IMovie {
  id: number;
  name: string;
  genre: string;
  rating: number;
  releasedate: string;
}

export default function App() {

  return (
    <main className="main">
      <div className="center">
        <h1 className="title"> cinema </h1>
      </div>

      <div className="center">
        <div className="grid">
          {/* Map de films hier */}
        </div >
      </div>
    </main>
  )
}
