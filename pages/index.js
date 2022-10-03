import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const d = new Date();
  const min = d.getMinutes();
  const hrs = d.getHours();

  const [search, setSearch] = useState(null);

  let session_seconds = "00";
  let session_minutes = 25;

  const template = () => {
    document.getElementById("minutes").innerHTML = session_minutes;
    document.getElementById("seconds").innerHTML = session_seconds;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com/"></script>
      </Head>

      <div className="bg">
        <nav className="flex p-2.5">
          <div className="text-3xl font-bold">
            {hrs}:{min > 9 && <span>{min}</span>}
            {min <= 9 && <span>0:{min}</span>}
          </div>
          <div className="absolute lg:left-[50%] lg:translate-x-[-50%]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (search.includes("https://")) {
                    window.open(search, "_blank");
                  } else {
                    window.open(
                      `https://google.com/search?q=${search}`,
                      "_blank"
                    );
                  }
                }
              }}
              className="placeholder:text-white w-[430px] h-[40px] border border-white rounded-full focus:outline-none bg-transparent pl-2.5"
              placeholder="Search Google or enter a URL"
            />
          </div>
        </nav>
        <div className="pl-2.5 absolute top-[50%] translate-y-[-50%]">
          <h1 className="lg:text-7xl text-3xl font-bold">
            <span id="minutes">{session_minutes}</span>:
            <span id="seconds">{session_seconds}</span>
          </h1>
          <br />
          <button
            onClick={() => {
              let a = new Audio("../public/bell.wav")
              session_minutes = 24;
              session_seconds = 59;

              document.getElementById("minutes").innerHTML = session_minutes;
              document.getElementById("seconds").innerHTML = session_seconds;

              setInterval(() => {
                session_minutes = session_minutes - 1;
                document.getElementById("minutes").innerHTML = session_minutes;

                if (session_minutes === 0) {
                  a.play()
                }
              }, 60000);
              setInterval(() => {
                session_seconds = session_seconds - 1;
                document.getElementById("seconds").innerHTML = session_seconds;

                if (session_seconds <= 0) {
                  session_seconds = 60;
                }
              }, 1000);
            }}
          >
            <img src="https://img.icons8.com/ios-glyphs/40/FFFFFF/play--v1.png"/>
          </button>
        </div>
      </div>
    </div>
  );
}
