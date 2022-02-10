pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimun) public {
        address newCampaign = new Campaign(minimun, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // type request
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimun, address creator) public {
        // sender property describes whos is attempting to create a contract
        manager = creator;
        minimunContribution = minimun;
    }

    function contribute() public payable {
        require(msg.value > minimunContribution);
        // add address to approvers mapping and set to true
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
            // create variable newRequest of type Request
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });
            requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        // access requests array, get the specific request and assign to a local variable
        Request storage request = requests[index];

        // Make sure person callig this function has donated
        require(approvers[msg.sender]);

        // Make sure person calling this function hasn’t voted before
        require(!request.approvals[msg.sender]);

        // mark the person as having voted in this request
        request.approvals[msg.sender] = true;

        // increment approval count
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // check if the number of approvals is 50% of the approversCount
        require(request.approvalCount > (approversCount / 2));
        // check if the request has not been finalised
        require(!request.complete);
        // transfer the money to recipient
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(
      uint, uint, uint, uint, address
    ) {
        return (
          minimunContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }

}
