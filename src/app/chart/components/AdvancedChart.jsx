"use client";
import React, { useEffect, useState } from "react";
import {
  Toolbar,
  ToolSeparator,
  ButtonTool,
  SelectTool,
  ModalTool,
  CehckBoxTool,
} from "../Toolbar/Toolbar";
import {
  TbChartHistogram,
  TbSearch,
  TbHome,
  TbPencil,
  TbChartCandle,
  TbFlag,
} from "react-icons/tb";
import IndicatorsList from "../utils/IndicatorsList";
import IndicatorsListValues from "../utils/IndicatorsListDefautValues";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import candlestick_patterns from "../utils/candlestickPatterns";
import IndicatorsSelection from "../Toolbar/IndicatorsSelection";
import PatternsSelection from "../Toolbar/PatternsSelection";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
const AdvancedChart = ({ symbol }) => {
  const { selectedIndicators, setSelectedIndicators, getIndicatorData } =
    useTechnicalAnalysis();

  const [indicatorsSettings, setIndicatorsSettings] = useState({
    Indicators: {
      icon: TbChartHistogram,
      onSelectFunction: async (indicatorName) => {
        const indicatorData = await getIndicatorData(symbol, indicatorName, {
          [indicatorName]: IndicatorsList[indicatorName],
        });
        const indicator = IndicatorsListValues.find(
          (indicator) => indicator.name === indicatorName
        );

        indicator.lines.forEach((line) => {
          let lineName = line.name;
          if (lineName in indicatorData) {
            line.data = indicatorData[lineName];
          }
        });
        setSelectedIndicators((prevIndicators) => [
          ...prevIndicators,
          indicator,
        ]);
      },
      options: transformIndicatorsToList(IndicatorsList),
    },
  });

  useEffect(() => {
    const updatedIndicators = [];
    const fetchIndicatorData = async () => {
      console.log(selectedIndicators);
      for (const indicator of selectedIndicators) {
        const indicatorData = await getIndicatorData(symbol, indicator.name, {
          [indicator.name]: indicator.params,
        });

        indicator.lines.forEach((line) => {
          let lineName = line.name;
          if (lineName in indicatorData) {
            line.data = indicatorData[lineName];
          }
        });
        updatedIndicators.push(indicator);
        console.log(updatedIndicators);
      }
      setSelectedIndicators(updatedIndicators);
    };
    if (selectedIndicators) fetchIndicatorData();
  }, [symbol]);

  const [patternsSettings, setPatternsSettings] = useState({
    "Japanese Candlestick": {
      icon: TbChartCandle,
      onSelectFunction: async (pattern) => {
        console.log(pattern);
      },
      options: transformIndicatorsToList(candlestick_patterns),
    },
    "Flags and Pennants": {
      icon: TbFlag,
      onSelectFunction: async (pattern) => {
        console.log(pattern);
      },
    },
  });

  const chartKey = selectedIndicators
    .map((indicator) => indicator.name)
    .join(",");

  function transformIndicatorsToList(indicators) {
    return Object.keys(indicators).map((key) => ({
      value: key,
      label: indicators[key].name || key,
    }));
  }
  const handleCheckboxChange = async (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setMarkers(await japaneseCandlestickMarkers(symbol));
    } else {
      setMarkers([]);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <Toolbar>
        <ButtonTool icon={TbHome} hoverText="Home" />

        <ToolSeparator />
        <ModalTool
          icon={TbSearch}
          hoverText="Modal"
          text={symbol}
          title={"Search"}
        >
          <div> Search for symbol</div>
        </ModalTool>
        <ToolSeparator />

        <ModalTool
          icon={TbChartHistogram}
          hoverText="Indicators"
          text={"Indicators"}
          title={"Indicators"}
          size={"lg"}
        >
          <IndicatorsSelection
            settings={indicatorsSettings}
            setSettings={setIndicatorsSettings}
          />
        </ModalTool>
        <ToolSeparator />
        {/* <ModalTool
          icon={TbPencil}
          hoverText="Patterns"
          text={"Patterns"}
          title={"Patterns"}
          size={"lg"}
        >
          <CehckBoxTool
            isChecked={isChecked}
            text={"candle"}
            onCheckboxChange={handleCheckboxChange}
          />
          <PatternsSelection
            title={"Filter Data"}
            settings={patternsSettings}
            setSettings={setPatternsSettings}
          />
        </ModalTool> */}

        <ToolSeparator />
        <SelectTool
          options={[
            { value: "D", label: "1 Day" },
            { value: "W", label: "1 Week" },
            { value: "M", label: "1 Month" },
          ]}
          defaultValue={"D"}
          showValueAsText
          onSelectFunction={(value) => {
            console.log(value);
          }}
          hoverText={"Frame"}
        />
      </Toolbar>
      <div id="responsive-chart" className="h-100 ">
        <StockPriceChart
          key={chartKey}
          indicators={selectedIndicators}
          symbol={symbol}
          // markers={markers}
        />
      </div>
    </div>
  );
};

export default AdvancedChart;
