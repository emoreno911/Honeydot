import React, { createContext, useState, useEffect, useContext } from 'react';
import { Polkadot } from "@unique-nft/utils/extension";
import {Sdk} from "@unique-nft/sdk";
import {KeyringProvider} from "@unique-nft/accounts/keyring";
import {
	baseNetworkURL,
	getAccountBalance,
} from './utils';

const DataContext = createContext();
export const useDatacontext = () => useContext(DataContext);

const DataContextProvider = (props) => { 
	const [sdk, setSdk] = useState(null);
	const [balance, setBalance] = useState({});
	const [currentAccount, setCurrentAccount] = useState({});
	const [currentCollection, setCurrentCollection] = useState([]);

	useEffect(() => {
		initAccountWithWallet()
	}, [])

	const initAccountWithWallet = async () => {
		const result = await Polkadot.enableAndLoadAllWallets();
		const account = result.accounts[0];
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})
		
		const balance = await sdk.balance.get({address: account.address});
		console.log(balance);

		setBalance(balance.availableBalance);
		setCurrentAccount(account);
		setSdk(sdk);
	}

	const initAccountWithSeed = async () => {
		const account = await KeyringProvider.fromMnemonic('affair spoon other impact target solve extra range cute myself float panda')

		const sdk = new Sdk({
			baseUrl: baseNetworkURL,
			signer: account,
		})

		const balance = await sdk.balance.get({address: account.getAddress()});
		console.log(balance);
	}

	const getCollection = async (id = 376) => {
		// const collection = await sdk.collections.tokens({collectionId: id});
		// setCurrentCollection(collection);
		// console.log(collection);

		const tokens = await sdk.tokens.getAccountTokens({collectionId: id, address: currentAccount.address});
		console.log(tokens);
		
	}

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		currentCollection,
		currentAccount,
		balance
	}

	const fn = {
		isMobile,
		getCollection
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;