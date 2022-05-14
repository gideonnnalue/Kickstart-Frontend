import { useState } from "react";
import { useRouter } from 'next/router';
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../factory";
import web3 from "../../web3";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
