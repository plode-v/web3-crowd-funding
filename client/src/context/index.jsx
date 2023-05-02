import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const { contract } = useContract('0xb66515E6A575306F4108BE198697A735C54f7A1e');
	const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

	const address = useAddress();
	const connect = useMetamask();

	const publishCampaign = async (form) => {
		try {
			const data = await createCampaign({args: [
				address,
				form.title,
				form.description,
				form.target,
				new Date(form.deadline).getTime(),
				form.image
			]})
			console.log("contract call success", data)
		} catch (error) {
			console.log("contract call failure", error)
		}
	}

	const getCampaigns = async () => {
		const campaigns = await contract.call("getCampaigns")


		const parsedCampaigns = campaigns.map((campaign, index) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.target.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
			image: campaign.image,
			pId: index
		}));

		return parsedCampaigns;
	}

  return (
	<StateContext.Provider
	  value={{ 
		address,
		contract,
		connect,
		createCampaign: publishCampaign,
		getCampaigns,
	  }}
	>
	  {children}
	</StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);