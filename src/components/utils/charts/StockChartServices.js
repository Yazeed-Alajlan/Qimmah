function createTooltip(chartContainerId, chart, series) {
  const container = document.getElementById(chartContainerId);

  const toolTipWidth = 80;
  const toolTipHeight = 80;
  const toolTipMargin = 15;

  // Create and style the tooltip html element
  const toolTip = document.createElement("div");
  toolTip.style = `width: 96px; height: 100px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
  toolTip.style.background = "white";
  toolTip.style.color = "black";
  toolTip.style.borderColor = "rgba( 38, 166, 154, 1)";
  container.appendChild(toolTip);
  // update tooltip
  chart.subscribeCrosshairMove((param) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > container.clientWidth ||
      param.point.y < 0 ||
      param.point.y > container.clientHeight
    ) {
      toolTip.style.display = "none";
    } else {
      // time will be in the same format that we supplied to setData.
      // thus it will be YYYY-MM-DD
      const dateStr = param.time;
      toolTip.style.display = "block";
      const data = param.seriesData.get(series);
      const price = data.value !== undefined ? data.value : data.close;
      toolTip.innerHTML = `
      <div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
			${Math.round(100 * price) / 100}
			</div>
      <div style="color: ${"black"}">
			${dateStr}
			</div>`;

      const y = param.point.y;
      let left = param.point.x + toolTipMargin;
      if (left > container.clientWidth - toolTipWidth) {
        left = param.point.x - toolTipMargin - toolTipWidth;
      }

      let top = y + toolTipMargin;
      if (top > container.clientHeight - toolTipHeight) {
        top = y - toolTipHeight - toolTipMargin;
      }
      toolTip.style.left = left + "px";
      toolTip.style.top = top + "px";
    }
  });
}

async function addVolumeHistogram(chart, series) {
  // Add volume series with overlay
  const volumeSeries = chart.addHistogramSeries({
    color: "#26a69a", // Set the color for volume bars
    priceFormat: {
      type: "volume",
    },
    overlay: true,
    priceScaleId: "", // Set the priceScaleId to an empty string for overlay
  });
  volumeSeries.priceScale().applyOptions({
    // set the positioning of the volume series
    scaleMargins: {
      top: 0.7, // highest point of the series will be 70% away from the top
      bottom: 0,
    },
  });
  volumeSeries.setData(
    formatCandlestickData(series).map((data) => ({
      time: data.time,
      value: data.volume,
    }))
  );
  return volumeSeries;
}
async function addLegend(
  chart,
  setLegend,
  candlestickSeries,
  volumeSeries,
  lastValue
) {
  const resolvedVolumeSeries = await volumeSeries;
  chart.subscribeCrosshairMove((param) => {
    let closePrice = "";
    let openPrice = "";
    let highPrice = "";
    let lowPrice = "";
    let volume = "";
    let changePercent = "";

    if (param.time) {
      const candlestickData = param.seriesData.get(candlestickSeries);
      const volumeData = param.seriesData.get(resolvedVolumeSeries);

      if (candlestickData) {
        closePrice = candlestickData.close;
        openPrice = candlestickData.open;
        highPrice = candlestickData.high;
        lowPrice = candlestickData.low;
      }

      if (volumeData) {
        volume = volumeData.value;
      }

      // Calculate change percent only if openPrice is available
      if (openPrice !== "") {
        changePercent = (((closePrice - openPrice) / openPrice) * 100).toFixed(
          2
        );
      }
    } else {
      // Set default values when crosshair is not over any data point
      closePrice = lastValue.close;
      openPrice = lastValue.open;
      highPrice = lastValue.high;
      lowPrice = lastValue.low;
      volume = lastValue.volume;
      changePercent = "";
    }

    setLegend({
      close: closePrice,
      open: openPrice,
      high: highPrice,
      low: lowPrice,
      volume: volume,
      changePercent: changePercent,
    });
  });
}

const formatCandlestickData = (data) => {
  if (!data) return [];
  return data
    .map((quote) => {
      if (!quote) return null; // Check if quote is null or undefined

      return {
        time: quote.date.split("T")[0],
        open: Number(quote.open?.toFixed(2)), // Use optional chaining to avoid errors if open is null or undefined
        high: Number(quote.high?.toFixed(2)),
        low: Number(quote.low?.toFixed(2)),
        close: Number(quote.close?.toFixed(2)),
        volume: Number(quote.volume),
      };
    })
    .filter((data) => data !== null); // Filter out null values
};

const formatLineData = (series) => {
  if (!series) return [];
  return series
    .map((quote) => {
      if (!quote) return null; // Check if quote is null or undefined
      return {
        time: quote.date.split("T")[0],
        value: Number(quote.value?.toFixed(2)), // Use optional chaining to avoid errors if open is null or undefined
        volume: Number(quote.volume),
      };
    })
    .filter((data) => data !== null); // Filter out null values
};

const formatIndicatorData = (series) => {
  console.log(series);
  let data = [];
  if (!series) return [];

  return Object.entries(series).map(([time, value]) => ({
    time: time.split("T")[0],
    value: Number(value.toFixed(2)),
  }));
  // .filter((data) => data !== null); // Filter out null values
};

export {
  createTooltip,
  addVolumeHistogram,
  addLegend,
  formatCandlestickData,
  formatLineData,
  formatIndicatorData,
};
