import React, { useContext, createContext} from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react"
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xb66515E6A575306F4108BE198697A735C54f7A1e");
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ])

            console.log("contract call success", data);
        } catch(err) {
            console.log("contract call failure", err);
        }
    }

    return (
        <StateContext.Provider 
            value={{
                address,
                contract,
                createCampaign: publishCampaign
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);