import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../campaign";
import web3 from "../../../../web3";

const NewRequest = () => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  const {
    query: { address },
  } = router;

  const onSubmit = async (e) => {
    e.preventDefault();

    const campaign = Campaign(address);
    setLoading(true);
    setErrMsg("");

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errMsg}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errMsg} />

        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default NewRequest;
