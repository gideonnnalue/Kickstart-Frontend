import web3 from './web3';

import CampaignFactory from './ethereum/build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x13aC3337830FED981fE38216B1C3bbc338D3110d');

export default instance;