import React from "react";

const ShowCard = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  console.log(minimumContribution);
  return (
    <div className="block p-6 sm:max-w-full lg:max-w-fit bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h4 className="text-red-500 text-2xl">
        Minimun Contribution{minimumContribution}
      </h4>
      <h6 className="mb-2 text-ellipsis overflow-hidden font-bold tracking-tight text-gray-900 dark:text-white">
        {manager}
      </h6>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {approversCount}
      </p>
    </div>
  );
};

export default ShowCard;
