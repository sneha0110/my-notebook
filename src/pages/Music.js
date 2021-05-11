import { motion } from "framer-motion";
import Layout from "./Layout";
import React from "react";
import "./music-style.css";

const goeasy =
  "https://mp3by.in/siteuploads/files/sfd12/5818/Imagine%20Dragons%20-%20Thunder(mp3by.in).mp3";
const dreams =
  "https://dwn.pagol.world/siteuploads/files/sfd13/6181/Believer(Mr-Jatt1.com).mp3";

const chillout =
  "https://dwn.pagol.world/siteuploads/files/sfd13/6183/Roar(Mr-Jatt1.com).mp3";

const twistter =
  "https://mp3.filmisongs.com/Hall%20of%20Fame%20-%20The%20Script.mp3";

const freebird =
  "https://mp3by.in/siteuploads/files/sfd22/10505/Perfect%20-%20Ed%20Sheeran(mp3by.in).mp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
export default class Music extends React.Component {
  state = {
    currentSong: null,
    music: "stopped",
    currentTime: null,
    duration: null,
  };

  render() {
    const easing = [0.6, -0.05, 0.01, 0.99]; //keyframes
    const fadeIn1 = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: easing,
        },
      },
    };
    const fadeIn2 = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 2.5,
          ease: easing,
        },
      },
    };
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    const playlist = [
      {
        id: 1,
        title: "Thunder",
        url: "https://thumbs-prod.si-cdn.com/Vj7Cmc62xkQLwQZLiX1SbOV89ik=/420x240/https://public-media.si-cdn.com/filer/cd/0e/cd0efbec-bc15-4f38-894a-7e0e6f5968b8/campfire_edit.jpg",
      },
      {
        id: 2,
        title: "Believer",
        url: "https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: 3,
        title: "Roar",
        url: "https://www.iot-now.com/wp-content/uploads/2020/06/lion-3317670_640.jpg",
      },
      {
        id: 4,
        title: "Hall of Fame",
        url: "http://a10.gaanacdn.com/images/albums/73/64273/crop_480x480_64273.jpg",
      },
      {
        id: 5,
        title: "Perfect",
        url: "https://www.laurenswilliam.nl/wp-content/uploads/2016/09/Chill-music-update-1.jpeg",
      },
    ].map((item) => {
      return (
        <div class="ui list">
          <div class="item">
            <img class="ui avatar image" src={item.url} alt="music images" />
            <div class="content">
              <li
                className="title"
                key={item.id}
                onClick={() => this.setState({ currentSong: item.title })}
              >
                {item.title}
              </li>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <Layout>
          <motion.div exit="exit" initial="initial" animate="animate">
            <motion.div variants={fadeIn1}>
              <div className="App">
                <h1 className="header mb-3 font-weight-bold">Music Player</h1>
                <div className="ui card main-container">
                  <div className="info-container">
                    {this.state.music === "playing" ? (
                      <div className="current-song">
                        Now Playing {this.state.currentSong}
                      </div>
                    ) : null}
                    {this.state.music === "paused" ? (
                      <div className="current-song">
                        {this.state.currentSong} is paused{" "}
                      </div>
                    ) : null}
                    {this.state.music === "playing" ||
                    this.state.music === "paused" ? (
                      <div>
                        {currentTime} / {duration}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="button-container">
                    {this.state.music === "paused" && (
                      <button
                        class="ui labeled icon red button"
                        onClick={() => this.setState({ music: "playing" })}
                      >
                        <i class=" large play circle outline icon" />
                        Play
                      </button>
                    )}
                    {this.state.music === "playing" && (
                      <button
                        class="ui labeled icon red button"
                        onClick={() => this.setState({ music: "paused" })}
                      >
                        <i class="large pause circle outline icon" />
                        Pause
                      </button>
                    )}
                    {this.state.music === "playing" ||
                    this.state.music === "paused" ? (
                      <button
                        class="ui labeled icon button"
                        onClick={() => this.setState({ music: "stop" })}
                      >
                        <i class="large stop circle outline icon" />
                        Stop
                      </button>
                    ) : null}
                  </div>

                  <div className="playlist">{playlist}</div>

                  <audio ref={(ref) => (this.music = ref)} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Layout>
      </>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentSong !== prevState.currentSong) {
      let track;
      switch (this.state.currentSong) {
        case "Thunder":
          track = goeasy;
          break;
        case "Believer":
          track = dreams;
          break;
        case "Roar":
          track = chillout;
          break;
        case "Hall of Fame":
          track = twistter;
          break;
        case "Perect":
          track = freebird;
          break;
        default:
          break;
      }

      if (track) {
        this.music.src = track;
        this.music.play();
        this.setState({
          music: "playing",
        });
      }
    }

    if (this.state.music !== prevState.music) {
      if (this.state.music === "paused") {
        this.music.pause();
      }
      if (this.state.music === "playing" && prevState.music === "paused") {
        this.music.play();
      }
      if (this.state.music === "stop") {
        this.music.pause();
        this.currentTime = 0;
        this.setState({
          currentSong: null,
        });
      }
    }
  }

  componentDidMount() {
    this.music.addEventListener("timeupdate", (e) => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
  }

  componentWillUnmount() {
    this.music.removeEventListener("timeupdate", () => {});
  }
}
