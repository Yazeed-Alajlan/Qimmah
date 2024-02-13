import PageWrapper from "@/components/PageWrapper";
import CardWithLink from "@/components/utils/cards/CardWithLink";
import React from "react";
import {
  TbReportAnalytics,
  TbDeviceAnalytics,
  TbChartCandle,
} from "react-icons/tb";
import { FaChartBar, FaSignal } from "react-icons/fa"; // Import FontAwesome icons

const page = () => {
  return (
    <PageWrapper>
      <div className="flex justify-center flex-wrap gap-8">
        <CardWithLink
          to="tools/monthly-returns"
          label="Monthly Returns"
          icon={<TbReportAnalytics size={50} />}
        />
        <CardWithLink
          to="tools/chart-patterns"
          label="Chart Patterns"
          icon={<TbReportAnalytics size={50} />}
        />
        <CardWithLink
          to="tools/consolidating-stocks"
          label="Consolidating Stocks"
          icon={<FaChartBar size={50} />}
        />
        <CardWithLink
          to="tools/japanese-candlestick"
          label="Japanese Candlestick"
          icon={<TbChartCandle size={50} />}
        />
        <CardWithLink
          to="tools/hawkes-process"
          label="Hawkes Process"
          icon={<FaSignal size={50} />}
        />

        <CardWithLink
          to="tools/technical-analysis-automation"
          label="Technical Analysis"
          icon={<TbDeviceAnalytics size={50} />}
        />
        <CardWithLink
          to="tools/vsa"
          label="VSA"
          icon={<TbDeviceAnalytics size={50} />}
        />
      </div>
    </PageWrapper>
  );
};

export default page;
