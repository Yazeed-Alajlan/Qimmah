"use client";
import PageWrapper from "@/components/PageWrapper";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SidebarSelection from "./components/SidebarSelection";

const Page = () => {
  const { selectedStock } = useTechnicalAnalysis();

  return (
    <PageWrapper>
      <div dir="ltr">
        <PanelGroup direction="horizontal" className="flex ">
          <Panel minSizePercentage={80}>
            {selectedStock ? (
              <>
                <div>{selectedStock}</div>
                {/* <AdvancedChart /> */}
              </>
            ) : (
              <>SELECT STOCK</>
            )}
          </Panel>
          <PanelResizeHandle
            className="bg-dark-light"
            style={{ width: "4px" }}
          />

          <Panel
            collapsible={true}
            collapsedSizePixels={20}
            minSizePercentage={15}
          >
            <SidebarSelection />
          </Panel>
        </PanelGroup>
      </div>
    </PageWrapper>
  );
};

export default Page;
