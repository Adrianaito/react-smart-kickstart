import React from "react";

import campaignInstance from "../../ethereum/campaign";
import ShowCard from "../../components/ShowCard";

const Campaign = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  console.log("browser", minimumContribution);
  return (
    <div className="customContainer">
      <ShowCard
        key={manager}
        minimumContribution={minimumContribution}
        balance={balance}
        requestsCount={requestsCount}
        approversCount={approversCount}
        manager={manager}
      />
    </div>
  );
};

Campaign.getInitialProps = async (props) => {
  const campaign = await campaignInstance(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  console.log(summary[0]);
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default Campaign;
