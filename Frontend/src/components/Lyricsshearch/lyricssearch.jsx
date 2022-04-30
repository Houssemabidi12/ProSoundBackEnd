import axios from "axios";
import { useState } from "react";
import "./lol.css";
function LyricsSrch() {
  const [artists, setArtist] = useState("");
  const [songs, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");

  function searchLyrics() {
    if (artists === "" || songs === "") {
      return;
    }
    axios.get(`https://api.lyrics.ovh/v1/${artists}/${songs}`).then((res) => {
      console.log(res.data.lyrics);
      setLyrics(res.data.lyrics);
    });
  }

  return (
    <div className="App">
      <h1>Lyrics Finder</h1>

      <input
        className="inp"
        type="text"
        placeholder="Artist name"
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      />
      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
      />
      <button className="btn" onClick={() => searchLyrics()}>
        Search
      </button>
      <hr />
      <pre>{lyrics}</pre>
    </div>
  );
}

export default LyricsSrch;
