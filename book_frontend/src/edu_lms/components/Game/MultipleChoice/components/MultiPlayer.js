import React, { useState, useEffect } from "react";

const useMultiAudio = (urls) => {
  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.map((url) => {
      return {
        url,
        playing: false,
      };
    })
  );

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle];
};

const MultiPlayer = ({ urls }) => {
  const [players, toggle] = useMultiAudio(urls);
  const [column, setStateColumn] = [12 / players.length];
  console.log("Column", column);
  return (
    <div className="row">
      {players.map((player, i) => (
        <div key={i} className={`col-md-${column}`}>
          <Player key={i} player={player} toggle={toggle(i)} />
        </div>
      ))}
    </div>
  );
};

const Player = ({ player, toggle }) => (
  <div>
    <button
      style={{
        padding: "10px 135px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        background: "none",
      }}
      onClick={toggle}
    >
      {player.playing ? (
        <i
          style={{ color: "red", fontSize: "30px" }}
          className="fa fa-pause-circle"
        ></i>
      ) : (
        <i
          style={{ color: "dodgerblue", fontSize: "30px" }}
          className="fa fa-play-circle"
        ></i>
      )}
    </button>
  </div>
);

export default MultiPlayer;
