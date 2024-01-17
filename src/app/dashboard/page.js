"use client";

import ButtonLink from "@/components/utils/buttons/ButtonLink";
import { Button } from "@/components/utils/buttons/Button";
import { Card } from "@/components/utils/cards/card";
import { FaHeart, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { Tab, Tabs } from "@/components/utils/tabs/tabs";
import { SlidingTabs } from "@/components/utils/tabs/SlidingTabs";

export default function Home() {
  const handleTabSelect = (index) => {
    console.log("Selected tab index:", index);
    // Do whatever you want with the selected index
  };
  return (
    <div className=" flex justify-center">
      <Button
        text="Click me"
        icon={<FaHeart />}
        onClick={() => console.log("Button clicked")}
      />

      <Card size="lg" header="Large Card" subHeader="A bigger card">
        <p>Some other content here...sssssssssss</p>
        <ButtonLink
          text="Learn More"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="red"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          }
          href="#"
        />
      </Card>

      <SlidingTabs
        getIndex={handleTabSelect}
        tabs={[
          {
            id: "home",
            name: "Home",
            icon: <FaHeart />, // Replace with your icon component
            render: () => <div>Home Content</div>,
          },
          {
            id: "blog",
            name: "Blog",
            icon: <FaHeart />, // Replace with your icon component
            render: () => <div>Blog Content</div>,
          },
          {
            id: "projects",
            name: "Projects",
            icon: <FaHeart />, // Replace with your icon component
            render: () => <div>Projects Content</div>,
          },
          {
            id: "arts",
            name: "Arts",
            icon: <FaHeart />, // Replace with your icon component
            render: () => <div>Arts Content</div>,
          },
        ]}
      />
      <Tabs>
        <Tab label="Tab 1">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-2">Tab 1 Content</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
              laudantium molestias eos sapiente officiis modi at sunt excepturi
              expedita sint? Sed quibusdam recusandae alias error harum maxime
              adipisci amet laborum.
            </p>
          </div>
        </Tab>
        <Tab label="Tab 2">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-2">Tab 2 Content</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
              laudantium molestias eos sapiente officiis modi at sunt excepturi
              expedita sint? Sed quibusdam recusandae alias error harum maxime
              adipisci amet laborum.
            </p>
          </div>
        </Tab>
        <Tab label="Tab 3">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-2">Tab 3 Content</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
              laudantium molestias eos sapiente officiis modi at sunt excepturi
              expedita sint? Sed quibusdam recusandae alias error harum maxime
              adipisci amet laborum.
            </p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
