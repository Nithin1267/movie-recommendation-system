import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineMatch - Movie Recommendations" },
      { name: "description", content: "Discover movies you'll love. Filter by genre, year and mood." },
    ],
  }),
  component: Index,
});

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  mood: string;
  rating: number;
  poster: string;
};

const MOVIES: Movie[] = [
  { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", mood: "Thrilling", rating: 8.8, poster: "https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", mood: "Thrilling", rating: 9.0, poster: "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi", mood: "Emotional", rating: 8.6, poster: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 4, title: "Parasite", year: 2019, genre: "Thriller", mood: "Dark", rating: 8.5, poster: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 5, title: "La La Land", year: 2016, genre: "Romance", mood: "Feel-Good", rating: 8.0, poster: "https://image.tmdb.org/t/p/w342/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" },
  { id: 6, title: "The Grand Budapest Hotel", year: 2014, genre: "Comedy", mood: "Feel-Good", rating: 8.1, poster: "https://image.tmdb.org/t/p/w342/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" },
  { id: 7, title: "Whiplash", year: 2014, genre: "Drama", mood: "Thrilling", rating: 8.5, poster: "https://image.tmdb.org/t/p/w342/oXM870anEEs2ztId6vDpcZsf07Y.jpg" },
  { id: 8, title: "Spirited Away", year: 2001, genre: "Animation", mood: "Feel-Good", rating: 8.6, poster: "https://image.tmdb.org/t/p/w342/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg" },
  { id: 9, title: "The Social Network", year: 2010, genre: "Drama", mood: "Dark", rating: 7.8, poster: "https://image.tmdb.org/t/p/w342/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" },
  { id: 10, title: "Mad Max: Fury Road", year: 2015, genre: "Action", mood: "Thrilling", rating: 8.1, poster: "https://image.tmdb.org/t/p/w342/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg" },
  { id: 11, title: "Her", year: 2013, genre: "Romance", mood: "Emotional", rating: 8.0, poster: "https://image.tmdb.org/t/p/w342/lEIaL12hSkqZm3kCMooDpvWxkgl.jpg" },
  { id: 12, title: "Get Out", year: 2017, genre: "Thriller", mood: "Dark", rating: 7.7, poster: "https://image.tmdb.org/t/p/w342/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg" },
  { id: 13, title: "Coco", year: 2017, genre: "Animation", mood: "Emotional", rating: 8.4, poster: "https://image.tmdb.org/t/p/w342/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg" },
  { id: 14, title: "Knives Out", year: 2019, genre: "Comedy", mood: "Thrilling", rating: 7.9, poster: "https://image.tmdb.org/t/p/w342/pThyQovXQrw2m0s9x82twj48Jq4.jpg" },
  { id: 15, title: "Dune", year: 2021, genre: "Sci-Fi", mood: "Thrilling", rating: 8.0, poster: "https://image.tmdb.org/t/p/w342/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id: 16, title: "Everything Everywhere All at Once", year: 2022, genre: "Sci-Fi", mood: "Feel-Good", rating: 8.0, poster: "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg" },
];

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

function Index() {
  const [genre, setGenre] = useState("All");
  const [mood, setMood] = useState("All");
  const [sort, setSort] = useState("rating");
  const [query, setQuery] = useState("");

  const genres = ["All", ...uniq(MOVIES.map((m) => m.genre)).sort()];
  const moods = ["All", ...uniq(MOVIES.map((m) => m.mood)).sort()];

  const filtered = useMemo(() => {
    let list = MOVIES.filter(
      (m) =>
        (genre === "All" || m.genre === genre) &&
        (mood === "All" || m.mood === mood) &&
        (query === "" || m.title.toLowerCase().includes(query.toLowerCase())),
    );
    list = [...list].sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : sort === "year" ? b.year - a.year : a.title.localeCompare(b.title),
    );
    return list;
  }, [genre, mood, sort, query]);

  const selectClass =
    "rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            🎬 CineMatch
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A simple movie recommendation system — filter, sort & discover.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title..."
              className={selectClass}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Genre</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} className={selectClass}>
              {genres.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className={selectClass}>
              {moods.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Sort by</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
              <option value="rating">Top Rated</option>
              <option value="year">Newest</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </div>

        <h2 className="mt-8 mb-3 text-lg font-semibold text-foreground">Recommended for you</h2>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No movies match your filters. Try widening your selection.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((m) => (
              <article
                key={m.id}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[2/3] overflow-hidden bg-muted">
                  <img
                    src={m.poster}
                    alt={`${m.title} poster`}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground" title={m.title}>
                    {m.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{m.year} · {m.genre}</span>
                    <span className="font-medium text-foreground">★ {m.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-8 border-t border-border py-6 text-center text-xs text-muted-foreground">
        Internship Project · CineMatch Movie Recommender
      </footer>
    </div>
  );
}
