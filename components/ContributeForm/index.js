import React, { useRef } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { update } from "../Toast";
import ButtonIcon from "../Button/ButtonIcon";

import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const propTypes = {
  address: PropTypes.string.isRequired,
};

const ContributeForm = ({ address }) => {
  const toastId = useRef(null);
  const router = useRouter();

  const validationSchema = Yup.object({
    amount: Yup.number().required(),
  });

  const initialValues = {
    amount: "",
    address,
  };

  const handleSubmit = async (values) => {
    toastId.current = toast("Waiting for approval...", { autoClose: false });
    const campaignInstance = campaign(values.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(values.amount, "ether"),
        })
        .then(() =>
          update(toastId.current, "Processing transaction...", "default", true)
        );
      update(toastId.current, "Contributed successfully!", "success", false);
    } catch (err) {
      update(toastId.current, err.message, "error", false);
    }
    router.reload();
  };

  return (
    <div className="customContainer mb-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isValid, setFieldValue, handleBlur }) => (
          <div>
            {/* <pre>{JSON.stringify(values)}</pre> */}
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block my-2 ml-1  text-xl font-medium text-gray-900 dark:text-gray-900"
                >
                  Contribute
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
                    ether
                  </span>
                </div>
              </div>
              <ButtonIcon label="Submit" type="submit" isValid={!isValid} />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
ContributeForm.propTypes = propTypes;
export default ContributeForm;
