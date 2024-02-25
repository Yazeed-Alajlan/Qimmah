import PageWrapper from "@/components/PageWrapper";
import CardWithLink from "@/components/utils/cards/CardWithLink";
import React from "react";
import {
  TbReportAnalytics,
  TbDeviceAnalytics,
  TbChartCandle,
} from "react-icons/tb";
import { FaChartBar, FaSignal } from "react-icons/fa"; // Import FontAwesome icons
import { CgArrowsShrinkV } from "react-icons/cg";
import { FaRegFlag } from "react-icons/fa6";
import { LuCandlestickChart } from "react-icons/lu";

const page = () => {
  return (
    <PageWrapper>
      <div className="flex justify-center flex-wrap gap-8">
        <CardWithLink
          to="tools/consolidating-stocks"
          label="Consolidating Stocks"
          icon={<CgArrowsShrinkV size={50} />}
        />
        <CardWithLink
          to="tools/monthly-change"
          label="Monthly Change"
          icon={<TbReportAnalytics size={50} />}
        />
        <CardWithLink
          to="tools/japanese-candlestick"
          label="Japanese Candlestick Filter"
          icon={<TbChartCandle size={50} />}
        />

        <CardWithLink
          to="tools/flag-pennant"
          label="Flag and Pennant"
          icon={<FaRegFlag size={50} />}
        />

        <CardWithLink
          to="tools/japanese-candlestick-markers"
          label="Japanese Candlestick Markers"
          icon={<LuCandlestickChart size={50} />}
        />

        <CardWithLink
          to="tools/hawkes-process"
          label="Hawkes Process"
          icon={<FaSignal size={50} />}
        />

        <CardWithLink
          to="tools/vsa"
          label="VSA"
          icon={<TbDeviceAnalytics size={50} />}
        />
        <CardWithLink
          to="tools/moving-average"
          label="Moving Average"
          icon={<TbDeviceAnalytics size={50} />}
        />
      </div>
    </PageWrapper>
  );
};

export default page;
