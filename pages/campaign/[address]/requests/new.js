import React, { useRef } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import ButtonIcon from "../../../../components/Button/ButtonIcon";

import campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

function NewRequest() {
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

  const handleSubmit = async ({}) => {
    console.log("handleSubmit");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, isValid, setFieldValue, handleBlur }) => (
        <>
          {/* <pre>{JSON.stringify(values)}</pre> */}
          <Form>
            <div className="mb-6">
              <label
                htmlFor="base-input"
                className="block my-2 ml-1  text-xl font-medium text-gray-900 dark:text-gray-900"
              >
                Description
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
        </>
      )}
    </Formik>
  );
}

export default NewRequest;
