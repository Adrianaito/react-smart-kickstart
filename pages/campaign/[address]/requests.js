import React from "react";
import Link from "next/link";

import web3 from "../../../ethereum/web3";
import campaignInstance from "../../../ethereum/campaign";

import ButtonIcon from "../../../components/Button/ButtonIcon";

const RequestsIndex = ({ address }) => {
  return (
    <div>
      <h1>Requests</h1>
      <Link href={`/campaign/${address}/requests/new`} passHref>
        <ButtonIcon label="Add a Request" />
      </Link>
    </div>
  );
};

RequestsIndex.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = await campaignInstance(props.query.address);
  console.log(campaign);
  // const summary = await campaign.methods.requests().call();
  return {
    address,
  };
};
export default RequestsIndex;
