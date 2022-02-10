import React, { useState, useRef } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";

import { update, success } from "../../components/Toast";
import ButtonIcon from "../../components/Button/ButtonIcon";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const validationSchema = Yup.object({
  amount: Yup.number().required(),
});
const CampaignNew = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const toastId = useRef(null);

  const initialValues = {
    amount: "",
  };
  const handleSubmit = async (values) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    try {
      console.log("entrou");
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
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
      console.log("erro", err.message);
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
        {({ values, isValid, setFieldValue, handleBlur }) => (
          <>
            <pre>{JSON.stringify(values)}</pre>
            <h1 className="text-4xl">Create Campaign!</h1>
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block my-2 ml-1  text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Minimun Contribution
                </label>
                <div className="flex">
                  <Field
                    type="text"
                    name="amount"
                    onChange={(e) => setFieldValue("amount", e.target.value)}
                    onBlur={handleBlur}
                    className="lg:w-64 bg-gray-500 border border-gray-300 text-gray-600 lg:text-lg rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    wei
                  </span>
                </div>
              </div>
              <ButtonIcon label="Submit" type="submit" isValid={!isValid} />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CampaignNew;
