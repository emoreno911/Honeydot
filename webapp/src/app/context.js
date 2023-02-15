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
	const [accounts, setAccounts] = useState([]);
	const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
	const [currentCollection, setCurrentCollection] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			initAccountWithWallet()
		}, 500);
	}, [])

	const initAccountWithWallet = async () => {
		const result = await Polkadot.enableAndLoadAllWallets();
		const account = result.accounts[currentAccountIndex];
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})
		
		const balance = await sdk.balance.get({address: account.address});
		setBalance(balance.availableBalance);
		console.log(account)

		setAccounts(result.accounts);
		setSdk(sdk);
	}

	const switchWalletAccount = async (newIndex) => {
		const account = accounts[newIndex];
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})
		
		const balance = await sdk.balance.get({address: account.address});
		setBalance(balance.availableBalance);
		setCurrentAccountIndex(newIndex);
		setSdk(sdk);
	}

	const initAccountWithSeed = async () => {
		// devnet testing account 5E4KzvZz2ZSqE1g8ZfTA8xZGNhLgcNLxA8JysDzEVVMNdTRn
		const account = await KeyringProvider.fromMnemonic('reflect boost slice noise solar practice disagree truth dutch miss lecture galaxy')

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

		// const tokens = await sdk.tokens.getAccountTokens({collectionId: id, address: currentAccount.address});
		// console.log(tokens);
		
	}

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		currentCollection,
		currentAccountIndex,
		accounts,
		balance
	}

	const fn = {
		isMobile,
		switchWalletAccount
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;