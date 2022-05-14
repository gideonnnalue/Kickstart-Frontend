import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Grid, Button } from "semantic-ui-react";

import web3 from "../../../web3";

import Layout from "../../../components/Layout";
import Campaign from "../../../campaign";
import ContributeForm from "../../../components/ContributeForm";

const Show = () => {
  const [contractData, setContractData] = useState({});
  const {
    query: { address },
  } = useRouter();

  const renderCards = () => {
    const items = [
      {
        header: contractData.manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contractData.minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contractData.requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contractData.approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contractData.balance
          ? web3.utils.fromWei(contractData.balance, "ether")
          : "0",
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  };

  const fetchContractData = useCallback(async () => {
    if (address) {
      const campaign = Campaign(address);

      let summary = await campaign.methods.getSummary().call();

      setContractData({
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      });
    }
  }, [address]);

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Show;
