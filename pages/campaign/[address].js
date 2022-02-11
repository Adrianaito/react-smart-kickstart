import React from "react";
import Link from "next/link";

import web3 from "../../ethereum/web3";
import campaignInstance from "../../ethereum/campaign";

import ShowCard from "../../components/ShowCard";
import ContributeForm from "../../components/ContributeForm";
import ButtonIcon from "../../components/Button/ButtonIcon";

const Campaign = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
  address,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-4/5">
      <div className="customContainer mt-5 max-w-4/5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 col-span-3">
        <ShowCard
          title={manager}
          meta="Manager Address"
          description="The manager of this campaign"
        />
        <ShowCard
          title={minimumContribution}
          meta="Minimum Contribution"
          description="This is the minimum contribution required to contribute to this campaign"
        />
        <ShowCard
          title={requestsCount}
          meta="Number of Requests"
          description="This is the number of requests made to this campaign. Requests must be approve by at least 50% of the campaign approvers"
        />
        <ShowCard
          title={approversCount}
          meta="Number of Approvers"
          description="This is the number of people who have contribute to this campaign"
        />
        <ShowCard
          title={web3.utils.fromWei(balance, "ether")}
          meta="Campaign Balance(ether)"
          description="This is the balance left of this campaign"
        />
      </div>
      <div>
        <ContributeForm address={address} />
        <Link href={`/campaign/${address}/requests`} passHref>
          <ButtonIcon label="Requests" />
        </Link>
      </div>
    </div>
  );
};

Campaign.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = await campaignInstance(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  console.log(summary[0]);
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address,
  };
};

export default Campaign;
