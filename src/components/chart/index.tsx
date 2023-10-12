import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

const ChartComponent = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = "transparent",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "transparent",
      areaBottomColor = "transparent",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef?.current || "", {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      height: 300,
    });
    chart.applyOptions({
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        visible: false,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    newSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);
  //@ts-ignore
  return <div ref={chartContainerRef} />;
};

export default ChartComponent;
