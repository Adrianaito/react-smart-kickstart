import React from "react";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

const propTypes = {
  header: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.string,
    recipient: PropTypes.string,
    approvalCount: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      amount: PropTypes.string,
      recipient: PropTypes.string,
      approvalCount: PropTypes.string,
    })
  ).isRequired,
};

const Table = ({ header, data }) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden ">
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {Object.values(header).map((title) => (
                  <th
                    scope="col"
                    key={uuid()}
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {data.map((request) => {
                const { complete, approvalCount, approversCount, ...rest } =
                  request;
                return (
                  <tr
                    key={uuid()}
                    className={
                      complete
                        ? "bg-gray-200 dark:bg-gray-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  >
                    {Object.values(rest).map((value) => (
                      <td
                        key={uuid()}
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
Table.propTypes = propTypes;
export default Table;
