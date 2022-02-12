import React, { useRef } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";
import router from "next/router";

import web3 from "ethereum/web3";
import campaignInstance from "ethereum/campaign";

import ButtonIcon from "components/Button/ButtonIcon";
import Table from "components/Input/Table";
import { update } from "components/Toast";

const propTypes = {
  address: PropTypes.string.isRequired,
  requestCount: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  approversCount: PropTypes.string.isRequired,
};

const RequestsIndex = ({ address, requests, requestCount, approversCount }) => {
  const toastId = useRef(null);
  const handleApprove = async (id) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    const campaign = campaignInstance(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(id)
        .send({
          from: accounts[0],
        })
        .then(() => update("Processing...", "default", true));
      update(
        toastId.current,
        "Request approved successfully!",
        "success",
        false
      );
      router.reload();
    } catch (err) {
      update(toastId.current, err.message, "error", false);
    }
  };
  const handleFinalize = async (id) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    const campaign = campaignInstance(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(id)
        .send({
          from: accounts[0],
        })
        .then(() => update("Processing...!", "default", true));
      update(
        toastId.current,
        "Request finalized successfully!",
        "success",
        false
      );
      router.reload();
    } catch (err) {
      update(toastId.current, err.message, "error", false);
    }
  };

  const header = {
    // id: "ID",
    description: "Description",
    amount: "Amount in Ether",
    recipient: "Recipient",
    approvalCount: "Approval Count",
    approve: "Approve",
    finalize: "Finalize",
  };

  const parsedData = requests.map((request, index) => {
    const { description, value, recipient, approvalCount, complete } = request;
    return {
      description,
      amount: web3.utils.fromWei(value || "", "ether"),
      recipient,
      approvalRatio: `${approvalCount}/${approversCount}`,
      complete,
      approvalCount,
      approversCount,
      approveButton: !complete ? (
        <ButtonIcon label="Approve" onClick={() => handleApprove(index)} />
      ) : (
        <span>Approved</span>
      ),
      finalizeButton: !complete ? (
        <ButtonIcon
          label="Finalize"
          onClick={() => handleFinalize(index)}
          tooltip={
            parseInt(approvalCount, 10) >= parseInt(approversCount, 10) / 2
              ? "Able to finalize request!"
              : "You need at least 50% of approvals to finalize the request"
          }
          style={`${
            parseInt(approvalCount, 10) >= parseInt(approversCount, 10) / 2
              ? "button"
              : "bg:gray-200 disabled"
          }`}
        />
      ) : (
        <span>Completed</span>
      ),
    };
  });

  const renderTable = () => (
    <Table
      key={uuid()}
      address={address}
      data={parsedData}
      header={header}
      approversCount={approversCount}
    />
  );
  return (
    <div className="customContainer">
      <div className="flex justify-between mb-2">
        <Link href={`/campaign/${address}`} passHref>
          <ButtonIcon label="Back" />
        </Link>
        <p className="py-2">Found {requestCount} request(s)!</p>
        <Link href={`/campaign/${address}/requests/new`} passHref>
          <ButtonIcon label="Add a Request" />
        </Link>
      </div>
      {renderTable()}
    </div>
  );
};

RequestsIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = await campaignInstance(props.query.address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount, 10))
      .fill()
      .map((element, index) => campaign.methods.requests(index).call())
  );
  return {
    address,
    requests,
    requestCount,
    approversCount,
    campaign,
  };
};

RequestsIndex.propTypes = propTypes;
export default RequestsIndex;
