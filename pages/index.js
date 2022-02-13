import React from "react";
import PropTypes from "prop-types";

import factory from "../ethereum/factory";
import Card from "../components/Cards";

const propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const CampaignIndex = ({ campaigns }) => {
  const renderCards = () =>
    campaigns.map((address) => {
      const items = {
        address,
        title: "Campaign Title",
        body: "Campaign Body",
        link: `/campaign/${address}`,
      };
      return <Card key={address} data={items} />;
    });
  return (
    <div>
      <div className="customContainer px-4">
        <h3 className="font-sans font-semibold text-2xl text-gray-800">
          Open Campaigns
        </h3>
        <div className="my-5 grid grid-cols-1 md:grid-cols-3 ">
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

CampaignIndex.propTypes = propTypes;

export default CampaignIndex;
