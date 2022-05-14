import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";

import Campaign from "../campaign";
import web3 from "../web3";

const ContributeForm = ({ address }) => {
  const [amount, setAmount] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const campaign = Campaign(address);
    setLoading(true);
    setErrMsg('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether')
      });
      router.reload();
    } catch (err) {
      setErrMsg(err.message)
    }

    setLoading(false);
    setAmount('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errMsg}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errMsg} />
      <Button loading={loading} primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
