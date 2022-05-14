import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../campaign";
import RequestRow from "../../../../components/RequestRow";

const Requests = () => {
  const {
    query: { address },
  } = useRouter();

  const [requests, setRequests] = useState([]);
  const [approversCount, setApproversCount] = useState("");

  const fetchRequestCount = useCallback(async () => {
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(Number(requestCount))
        .fill()
        .map((_, i) => {
          return campaign.methods.requests(i).call();
        })
    );
    setRequests(requests);
    setApproversCount(approversCount);
  }, [address]);

  useEffect(() => {
    fetchRequestCount();
  }, [fetchRequestCount]);

  const renderRows = () =>
    requests.map((req, i) => (
      <RequestRow key={i} id={i} request={req} address={address} approversCount={approversCount} />
    ));

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requests.length} requests.</div>
    </Layout>
  );
};

export default Requests;
