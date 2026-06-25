import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineMatch - Movie Recommendations" },
      { name: "description", content: "Discover movies across Telugu, Hindi, English, Tamil, Malayalam and Korean cinema." },
    ],
  }),
  component: Index,
});

type Category = "Classics" | "Love" | "Recent";
type Language = "Telugu" | "Hindi" | "English" | "Tamil" | "Malayalam" | "Korean";

type Movie = {
  id: number;
  title: string;
  year?: number;
  language: Language;
  category: Category;
  poster?: string;
};

// Real TMDB poster paths for well-known films (w342 size).
const P = (path: string) => `https://image.tmdb.org/t/p/w342${path}`;
const POSTERS: Record<number, string> = {
  1: P("/rnUFy7QqRfqLk1QrxnhSjxmI9jE.jpg"),   // Baahubali
  2: P("/8Z5ms3yK0Vc16kY0AAOnDhWUkS5.jpg"),   // Baahubali 2
  8: P("/wQs9NUR9swULsBRyqOZdL1qd3pj.jpg"),   // Rangasthalam
  10: P("/3UoojiTuFnoFEnBO0YOTHeOpZNs.jpg"),  // Eega
  21: P("/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg"),  // RRR
  22: P("/uVkBLF2sxoCgIyDmMARkkmuVRWS.jpg"),  // Sita Ramam
  25: P("/dRcnyYsRfqLk7HpVT8FfqaUu0Yr.jpg"),  // Salaar
  30: P("/66A9MqXOyVFCssoloscw79z8Tew.jpg"),  // 3 Idiots
  31: P("/cnt5BfPaAve9JsxtZQvTKvkeOMa.jpg"),  // Dangal
  32: P("/dKn4ULZpa4tNNAVKfQ5LznRyOyU.jpg"),  // PK
  33: P("/5XYQEZe3Av0HwPp4VsdHa1uTeJ.jpg"),   // Lagaan
  36: P("/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg"),  // Taare Zameen Par
  40: P("/9o8XOaP9KAkLDExjOIzcOMqQQYS.jpg"),  // Kuch Kuch Hota Hai
  50: P("/jqyYU1tCNZmbCFRZ4Vw2ZK1nLPK.jpg"),  // Pathaan
  51: P("/dQS5BcYBpAYHk3lhULRyR9JJ45h.jpg"),  // Jawan
  52: P("/jpgWb6BHIWKzcuc9MzGzPLpAzbS.jpg"),  // Animal
  54: P("/2WTfYemtmEgTNyhmH4nuLzYAGTI.jpg"),  // 12th Fail
  60: P("/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"),  // Shawshank
  61: P("/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"),  // Forrest Gump
  62: P("/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"),  // Titanic
  63: P("/ehGpN04mLJtaSdle1jrAjJFOJI4.jpg"),  // Gladiator
  64: P("/qJ2tW6WMUDux911r6m7haRef0WH.jpg"),  // Dark Knight
  65: P("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"),  // Inception
  66: P("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),  // Interstellar
  70: P("/3Cnu8WhTrPyhU2CCNTPzPwUgT9N.jpg"),  // Fault in Our Stars
  75: P("/qca5iSoIp6h6CVTwt5RsS0DJBN.jpg"),   // The Notebook
  80: P("/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"),  // Oppenheimer
  81: P("/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"),  // Barbie
  82: P("/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"),  // Dune Part Two
  84: P("/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"),  // Avatar 2
  110: P("/4d4d33Mtg4FNRkPb6CV0Z0sBxg.jpg"),  // Drishyam
  130: P("/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"), // Parasite
  131: P("/qx7r1vyl1HrTHzwhrIQNQVk5VLz.jpg"), // Train to Busan
  134: P("/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg"), // Oldboy
};



const MOVIES: Movie[] = [
  // Telugu - Classics
  { id: 1, title: "Baahubali: The Beginning", year: 2015, language: "Telugu", category: "Classics" },
  { id: 2, title: "Baahubali 2: The Conclusion", year: 2017, language: "Telugu", category: "Classics" },
  { id: 3, title: "Magadheera", year: 2009, language: "Telugu", category: "Classics" },
  { id: 4, title: "Pokiri", year: 2006, language: "Telugu", category: "Classics" },
  { id: 5, title: "Athadu", year: 2005, language: "Telugu", category: "Classics" },
  { id: 6, title: "Khaleja", year: 2010, language: "Telugu", category: "Classics" },
  { id: 7, title: "Oopiri", year: 2016, language: "Telugu", category: "Classics" },
  { id: 8, title: "Rangasthalam", year: 2018, language: "Telugu", category: "Classics" },
  { id: 9, title: "Jersey", year: 2019, language: "Telugu", category: "Classics" },
  { id: 10, title: "Eega", year: 2012, language: "Telugu", category: "Classics" },
  // Telugu - Love
  { id: 11, title: "Happy Days", year: 2007, language: "Telugu", category: "Love" },
  { id: 12, title: "Leader", year: 2010, language: "Telugu", category: "Love" },
  { id: 13, title: "Kotha Bangaru Lokam", year: 2008, language: "Telugu", category: "Love" },
  { id: 14, title: "Ye Maaya Chesave", year: 2010, language: "Telugu", category: "Love" },
  { id: 15, title: "Majili", year: 2019, language: "Telugu", category: "Love" },
  { id: 16, title: "Dear Comrade", year: 2019, language: "Telugu", category: "Love" },
  { id: 17, title: "Love Story", year: 2021, language: "Telugu", category: "Love" },
  { id: 18, title: "96 (Telugu Dub)", language: "Telugu", category: "Love" },
  { id: 19, title: "Colour Photo", year: 2020, language: "Telugu", category: "Love" },
  { id: 20, title: "Baby", year: 2023, language: "Telugu", category: "Love" },
  // Telugu - Recent
  { id: 21, title: "RRR", year: 2022, language: "Telugu", category: "Recent" },
  { id: 22, title: "Sita Ramam", year: 2022, language: "Telugu", category: "Recent" },
  { id: 23, title: "Hi Nanna", year: 2023, language: "Telugu", category: "Recent" },
  { id: 24, title: "Dasara", year: 2023, language: "Telugu", category: "Recent" },
  { id: 25, title: "Salaar", year: 2023, language: "Telugu", category: "Recent" },
  { id: 26, title: "Hanuman", year: 2024, language: "Telugu", category: "Recent" },

  // Hindi - Classics
  { id: 30, title: "3 Idiots", year: 2009, language: "Hindi", category: "Classics" },
  { id: 31, title: "Dangal", year: 2016, language: "Hindi", category: "Classics" },
  { id: 32, title: "PK", year: 2014, language: "Hindi", category: "Classics" },
  { id: 33, title: "Lagaan", year: 2001, language: "Hindi", category: "Classics" },
  { id: 34, title: "Swades", year: 2004, language: "Hindi", category: "Classics" },
  { id: 35, title: "Rang De Basanti", year: 2006, language: "Hindi", category: "Classics" },
  { id: 36, title: "Taare Zameen Par", year: 2007, language: "Hindi", category: "Classics" },
  // Hindi - Love
  { id: 40, title: "Kuch Kuch Hota Hai", year: 1998, language: "Hindi", category: "Love" },
  { id: 41, title: "Kabir Singh", year: 2019, language: "Hindi", category: "Love" },
  { id: 42, title: "Yeh Jawaani Hai Deewani", year: 2013, language: "Hindi", category: "Love" },
  { id: 43, title: "Student of the Year", year: 2012, language: "Hindi", category: "Love" },
  { id: 44, title: "Mohabbatein", year: 2000, language: "Hindi", category: "Love" },
  { id: 45, title: "Rockstar", year: 2011, language: "Hindi", category: "Love" },
  { id: 46, title: "Love Aaj Kal", year: 2009, language: "Hindi", category: "Love" },
  // Hindi - Recent
  { id: 50, title: "Pathaan", year: 2023, language: "Hindi", category: "Recent" },
  { id: 51, title: "Jawan", year: 2023, language: "Hindi", category: "Recent" },
  { id: 52, title: "Animal", year: 2023, language: "Hindi", category: "Recent" },
  { id: 53, title: "Dunki", year: 2023, language: "Hindi", category: "Recent" },
  { id: 54, title: "12th Fail", year: 2023, language: "Hindi", category: "Recent" },

  // English - Classics
  { id: 60, title: "The Shawshank Redemption", language: "English", category: "Classics" },
  { id: 61, title: "Forrest Gump", language: "English", category: "Classics" },
  { id: 62, title: "Titanic", language: "English", category: "Classics" },
  { id: 63, title: "Gladiator", language: "English", category: "Classics" },
  { id: 64, title: "The Dark Knight", language: "English", category: "Classics" },
  { id: 65, title: "Inception", language: "English", category: "Classics" },
  { id: 66, title: "Interstellar", language: "English", category: "Classics" },
  // English - Love
  { id: 70, title: "The Fault in Our Stars", language: "English", category: "Love" },
  { id: 71, title: "Five Feet Apart", language: "English", category: "Love" },
  { id: 72, title: "Love, Simon", language: "English", category: "Love" },
  { id: 73, title: "After", language: "English", category: "Love" },
  { id: 74, title: "To All the Boys I've Loved Before", language: "English", category: "Love" },
  { id: 75, title: "The Notebook", language: "English", category: "Love" },
  // English - Recent
  { id: 80, title: "Oppenheimer", year: 2023, language: "English", category: "Recent" },
  { id: 81, title: "Barbie", year: 2023, language: "English", category: "Recent" },
  { id: 82, title: "Dune: Part Two", year: 2024, language: "English", category: "Recent" },
  { id: 83, title: "John Wick (Series)", language: "English", category: "Recent" },
  { id: 84, title: "Avatar: The Way of Water", language: "English", category: "Recent" },

  // Tamil - Classics
  { id: 90, title: "Enthiran (Robot)", language: "Tamil", category: "Classics" },
  { id: 91, title: "Sivaji", language: "Tamil", category: "Classics" },
  { id: 92, title: "Anniyan", language: "Tamil", category: "Classics" },
  { id: 93, title: "Vikram", language: "Tamil", category: "Classics" },
  { id: 94, title: "Kaithi", language: "Tamil", category: "Classics" },
  { id: 95, title: "Master", language: "Tamil", category: "Classics" },
  { id: 96, title: "Leo", language: "Tamil", category: "Classics" },
  // Tamil - Love
  { id: 100, title: "96", language: "Tamil", category: "Love" },
  { id: 101, title: "Vaaranam Aayiram", language: "Tamil", category: "Love" },
  { id: 102, title: "Premam (Tamil Dub)", language: "Tamil", category: "Love" },
  { id: 103, title: "Remo", language: "Tamil", category: "Love" },
  { id: 104, title: "Raja Rani", language: "Tamil", category: "Love" },
  { id: 105, title: "Kadhal Desam", language: "Tamil", category: "Love" },

  // Malayalam - Classics/Popular
  { id: 110, title: "Drishyam", language: "Malayalam", category: "Classics" },
  { id: 111, title: "Drishyam 2", language: "Malayalam", category: "Classics" },
  { id: 112, title: "Bangalore Days", language: "Malayalam", category: "Classics" },
  { id: 113, title: "Premam", language: "Malayalam", category: "Classics" },
  { id: 114, title: "Kumbalangi Nights", language: "Malayalam", category: "Classics" },
  { id: 115, title: "Lucifer", language: "Malayalam", category: "Classics" },
  { id: 116, title: "Manjummel Boys", year: 2024, language: "Malayalam", category: "Classics" },
  // Malayalam - Love
  { id: 120, title: "Hridayam", language: "Malayalam", category: "Love" },
  { id: 121, title: "Charlie", language: "Malayalam", category: "Love" },
  { id: 122, title: "Thattathin Marayathu", language: "Malayalam", category: "Love" },

  // Korean - Classics (Movies)
  { id: 130, title: "Parasite", language: "Korean", category: "Classics" },
  { id: 131, title: "Train to Busan", language: "Korean", category: "Classics" },
  { id: 132, title: "The Gangster, The Cop, The Devil", language: "Korean", category: "Classics" },
  { id: 133, title: "Burning", language: "Korean", category: "Classics" },
  { id: 134, title: "Oldboy", language: "Korean", category: "Classics" },
  // Korean - Love
  { id: 140, title: "Tune in for Love", language: "Korean", category: "Love" },
  { id: 141, title: "On Your Wedding Day", language: "Korean", category: "Love" },
  { id: 142, title: "Love Reset", language: "Korean", category: "Love" },
];

const LANG_COLORS: Record<Language, string> = {
  Telugu: "from-rose-600 to-orange-500",
  Hindi: "from-amber-500 to-yellow-600",
  English: "from-sky-600 to-indigo-700",
  Tamil: "from-emerald-600 to-teal-700",
  Malayalam: "from-purple-600 to-fuchsia-700",
  Korean: "from-pink-500 to-rose-700",
};

const CAT_LABELS: Record<Category, string> = {
  Classics: "⭐ Classics & Popular",
  Love: "❤️ Love / College",
  Recent: "🔥 Recent / Trending",
};

function Poster({ movie }: { movie: Movie }) {
  const initials = movie.title
    .replace(/[()]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${LANG_COLORS[movie.language]} p-3 text-center`}
    >
      <div className="text-3xl font-black tracking-tight text-white/95 drop-shadow">
        {initials}
      </div>
      <div className="mt-2 line-clamp-3 text-[11px] font-semibold leading-tight text-white/90">
        {movie.title}
      </div>
      {movie.year && (
        <div className="mt-1 text-[10px] font-medium text-white/70">{movie.year}</div>
      )}
    </div>
  );
}

function Index() {
  const [language, setLanguage] = useState<"All" | Language>("All");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [sort, setSort] = useState("default");
  const [query, setQuery] = useState("");

  const languages: ("All" | Language)[] = ["All", "Telugu", "Hindi", "English", "Tamil", "Malayalam", "Korean"];
  const categories: ("All" | Category)[] = ["All", "Classics", "Love", "Recent"];

  const filtered = useMemo(() => {
    let list = MOVIES.filter(
      (m) =>
        (language === "All" || m.language === language) &&
        (category === "All" || m.category === category) &&
        (query === "" || m.title.toLowerCase().includes(query.toLowerCase())),
    );
    if (sort === "year") list = [...list].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    else if (sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [language, category, sort, query]);

  const selectClass =
    "rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">🎬 CineMatch</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Movie recommendations across Telugu, Hindi, English, Tamil, Malayalam & Korean cinema.
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
            <label className="mb-1 text-xs font-medium text-muted-foreground">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "All" | Language)}
              className={selectClass}
            >
              {languages.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "All" | Category)}
              className={selectClass}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All" : CAT_LABELS[c as Category]}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-muted-foreground">Sort by</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
              <option value="default">Default</option>
              <option value="year">Newest</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "movie" : "movies"}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No movies match your filters.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((m) => (
              <article
                key={m.id}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <Poster movie={m} />
                </div>
                <div className="p-2.5">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground" title={m.title}>
                    {m.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{m.language}</span>
                    <span>{m.year ?? "—"}</span>
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
