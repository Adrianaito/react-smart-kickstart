import React, { useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import router from "next/router";

import ButtonIcon from "components/Button/ButtonIcon";
import { update } from "components/Toast";
import Input from "components/Input";

import factory from "ethereum/factory";
import web3 from "ethereum/web3";

const validationSchema = Yup.object({
  amount: Yup.number().required(),
});
const CampaignNew = () => {
  const toastId = useRef(null);

  const initialValues = {
    amount: "",
  };
  const handleSubmit = async (values) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(values.amount)
        .send({
          from: accounts[0],
        })
        .then(() =>
          update(toastId.current, "Processing transaction...", "default", true)
        );
      update(
        toastId.current,
        "Campaign created successfully!",
        "success",
        false
      );
      router.push("/");
    } catch (err) {
      update(toastId.current, err.message, "error", false);
    }
  };

  return (
    <div className="customContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isValid, setFieldValue, handleBlur }) => (
          <div>
            <h1 className="text-4xl">Create Campaign!</h1>
            <Form>
              <div className="mb-6">
                <Input
                  label="Minimun Contribution"
                  type="text"
                  name="amount"
                  setFieldValue={(e) => setFieldValue("amount", e.target.value)}
                  onBlur={handleBlur}
                  span="wei"
                />
              </div>
              <ButtonIcon label="Submit" type="submit" isValid={!isValid} />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CampaignNew;
