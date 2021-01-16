import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import StickyHeadTable from "./components/PlayerTable";
import SeriesCard from "./components/Series/SeriesCard";
import TeamSquads from "./components/Squad/TeamSquads";
import SeriesLayout from "./layout/SeriesLayout/SeriesLayout";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });

    fetch("/series")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("series data is: ", data);
        setSeries(data);
      });

    // fetch('/scrap-series/1226769').then((res)=>{
    //   return res.json();
    // }).then(data=>{
    //   console.log("series data is: ",data);
    //   setSeries(data);
    // })
  }, []);

  return (
    <>
      <Header>
        <h1>Header</h1>
      </Header>
      <SeriesLayout series={series}></SeriesLayout>
      {/* <SeriesCard series={series}></SeriesCard> */}
      {/* <p>The current time is {currentTime}.</p> */}
      {/* <TeamSquads></TeamSquads> */}
      {/* <StickyHeadTable></StickyHeadTable> */}
    </>
  );
}

export default App;
