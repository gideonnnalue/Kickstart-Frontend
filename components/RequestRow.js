import { Table, Button } from "semantic-ui-react";
import web3 from "../web3";
import Campaign from "../campaign";

const RequestRow = (props) => {
  const { id, request, address, approversCount } = props;
  const { description, value, approvalCount, complete } = request;
  const { Row, Cell } = Table;
  const readyToFinalize = approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
    } catch (error) {}
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
    } catch (error) {}
  };
  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{address}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
