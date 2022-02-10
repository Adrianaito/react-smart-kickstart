import React, { Component } from "react";
import factory from "../ethereum/factory";
import Card from "../components/Cards";
import ButtonIcon from "../components/Button/ButtonIcon";
import { PlusCircleIcon } from "@heroicons/react/solid";

const CampaignIndex = ({ campaigns }) => {
  const renderCards = () => {
    return campaigns.map((address) => {
      const items = {
        address,
        title: "Campaign Title",
        body: "Campaign Body",
        link: `/campaign/${address}`,
      };
      console.log(campaigns);
      return <Card key={address} props={items} />;
    });
  };
  return (
    <>
      <div className="customContainer px-4">
        <h3>Open Campaigns</h3>
        <div className="my-5">{renderCards()}</div>
        <ButtonIcon
          icon={<PlusCircleIcon className="h-5 w-5 pr-1 text-sky-400" />}
          label="Start a Campaign"
          onClick={() => {
            console.log("button");
          }}
        />
      </div>
    </>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
