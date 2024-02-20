"use client";
import PageWrapper from "@/components/PageWrapper";
import { useParams } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AdvancedChart from "./components/AdvancedChart";
import SidebarSelection from "./components/SidebarSelection";

const layout = ({ children }) => {
  const { symbol } = useParams();

  return (
    <PageWrapper fullPage>
      <div dir="ltr">
        <PanelGroup direction="horizontal" className="flex ">
          <Panel minSizePercentage={75}>
            {symbol ? <>{children}</> : <>SELECT STOCK</>}
          </Panel>
          <PanelResizeHandle
            className="bg-dark-light"
            style={{ width: "4px" }}
          />

          <Panel
            // collapsible={true}
            // collapsedSizePixels={40}
            minSizePercentage={20}
          >
            <SidebarSelection />
          </Panel>
        </PanelGroup>
      </div>
    </PageWrapper>
  );
};

export default layout;
