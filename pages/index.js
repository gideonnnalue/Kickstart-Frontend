import { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../factory";
import Layout from "../components/Layout";
import Link from "next/link";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(campaigns);
    };
    fetchData();
  }, []);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export default CampaignList;
