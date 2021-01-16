import React from "react";
import ScrapSeries from "../../components/ScrapSeries/ScrapSeries";

export interface SeriesLayoutProps {
  series: any;
}

function SeriesLayout(props: any) {
  console.log(props);
  const seriesData = props.series;
  console.log("series is: ", seriesData);
  let showSeriesCard: boolean = false;
  if (seriesData.length) {
    showSeriesCard = true;
  }

  if (!showSeriesCard) {
    return <ScrapSeries></ScrapSeries>;
  } else {
    return (
      // cardLayout mt-4 ml-0 mr-0 flex-row d-flex flex-wrap justify-content-center
      <div >
      </div>
    );
  }
}

export default SeriesLayout;
