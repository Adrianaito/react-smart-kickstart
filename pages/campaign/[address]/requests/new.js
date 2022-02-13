import React, { useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import router from "next/router";
import Link from "next/link";

import ButtonIcon from "components/Button/ButtonIcon";
import Input from "components/Input";
import TextArea from "components/Input/TextArea";
import { update } from "components/Toast";

import campaign from "ethereum/campaign";
import web3 from "ethereum/web3";

const propTypes = {
  address: PropTypes.string.isRequired,
};

const NewRequest = ({ address }) => {
  const toastId = useRef(null);

  const validationSchema = Yup.object({
    amount: Yup.number().required(),
    description: Yup.string().required(),
    recipient: Yup.string().required(),
  });

  const initialValues = {
    amount: "",
    description: "",
    recipient: "",
  };

  const handleSubmit = async (values) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    const campaignInstance = campaign(address);
    const { description, recipient, amount } = values;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({
          from: accounts[0],
        })
        .then(() =>
          update(toastId.current, "Processing transaction...", "default", true)
        );
      update(
        toastId.current,
        "New request added successfully!",
        "success",
        false
      );
      router.push(`/campaign/${address}/requests`);
    } catch (err) {
      update(toastId.current, err.message, "error", false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isValid, setFieldValue, handleBlur }) => (
        <div className="customContainer">
          <Link href={`/campaign/${address}/requests`} passHref>
            <ButtonIcon label="Back" />
          </Link>
          <Form>
            <div className="mb-6 w-4/5">
              <Input
                name="amount"
                label="Amount in Ether"
                setFieldValue={(e) => setFieldValue("amount", e.target.value)}
                type="text"
                onBlur={handleBlur}
              />
              <Input
                name="recipient"
                label="Recipient"
                setFieldValue={(e) =>
                  setFieldValue("recipient", e.target.value)
                }
                type="text"
                onBlur={handleBlur}
              />
              <TextArea
                name="description"
                label="Description"
                setFieldValue={(e) =>
                  setFieldValue("description", e.target.value)
                }
                onBlur={handleBlur}
              />
            </div>
            <ButtonIcon label="Submit" type="submit" isValid={!isValid} />
          </Form>
        </div>
      )}
    </Formik>
  );
};

NewRequest.getInitialProps = async (props) => {
  const { address } = props.query;
  return {
    address,
  };
};
NewRequest.propTypes = propTypes;
export default NewRequest;
