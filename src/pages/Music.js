import { motion } from "framer-motion";
import Layout from "./Layout";
import React from "react";
import "./music-style.css";

const goeasy = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const dreams = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

const chillout =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3";

const twistter =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";

const freebird =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";

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
        title: "Go Easy",
        url:
          "https://thumbs-prod.si-cdn.com/Vj7Cmc62xkQLwQZLiX1SbOV89ik=/420x240/https://public-media.si-cdn.com/filer/cd/0e/cd0efbec-bc15-4f38-894a-7e0e6f5968b8/campfire_edit.jpg",
      },
      {
        id: 2,
        title: "Dreams",
        url:
          "https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: 3,
        title: "Chill Out",
        url:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-vector%2Fgradient-liquid-abstract-background_13403524.htm&psig=AOvVaw0F90tdLjVE0C10atG5Nzai&ust=1620573581840000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi5v7ixuvACFQAAAAAdAAAAABAD",
      },
      {
        id: 4,
        title: "Twistter",
        url: "https://i.ytimg.com/vi/VJ52yJwN_K0/maxresdefault.jpg",
      },
      {
        id: 5,
        title: "Free Bird",
        url:
          "https://www.laurenswilliam.nl/wp-content/uploads/2016/09/Chill-music-update-1.jpeg",
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
        case "Go Easy":
          track = goeasy;
          break;
        case "Dreams":
          track = dreams;
          break;
        case "Chill Out":
          track = chillout;
          break;
        case "Twistter":
          track = twistter;
          break;
        case "Free Bird":
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
