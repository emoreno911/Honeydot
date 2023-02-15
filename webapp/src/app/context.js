import React, { createContext, useState, useEffect, useContext } from 'react';
import { Polkadot } from "@unique-nft/utils/extension";
import {Sdk} from "@unique-nft/sdk";
import {KeyringProvider} from "@unique-nft/accounts/keyring";
import {
	baseNetworkURL,
	getAccountBalance,
} from './utils';


const seed = process.env.REACT_APP_ACC_SEED;
const DataContext = createContext();
export const useDatacontext = () => useContext(DataContext);

const DataContextProvider = (props) => { 
	const [balance, setBalance] = useState({});
	const [accounts, setAccounts] = useState([]);
	const [currentAccountIndex, setCurrentAccountIndex] = useState(1);
	const [currentCollection, setCurrentCollection] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			initAccountWithWallet()
		}, 1500);
	}, [])

	const setSdkClient = (account) => {
		return new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		});
	}

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
	}

	const initAccountWithSeed = async () => {
		// devnet testing account 5E4KzvZz2ZSqE1g8ZfTA8xZGNhLgcNLxA8JysDzEVVMNdTRn
		const account = await KeyringProvider.fromMnemonic(seed)

		const sdk = new Sdk({
			baseUrl: baseNetworkURL,
			signer: account,
		})

		const balance = await sdk.balance.get({address: account.getAddress()});
		console.log(balance);
	}

	const getClientWithSeed = async () => {
		const options = {
			type: 'sr25519',
		};

		const provider = new KeyringProvider(options);
		await provider.init();
	
		const signer = provider.addSeed(seed);

		const clientOptions = {
			baseUrl: 'https://rest.unique.network/opal/v1',
			signer,
		};

		const sdk = new Sdk(clientOptions);
		const address = signer.getAddress();

		return { sdk, address }
	}

	const createCollection = async () => {
		console.log('creating collection...')

		const {sdk, address} = await getClientWithSeed();

		const { parsed, error } = await sdk.collections.creation.submitWaitResult({
			address,
			name: 'Test collection',
			description: 'My test collection',
			tokenPrefix: 'TSTX',
			permissions: {
				nesting: {
					tokenOwner: true,
					collectionAdmin: true,
				},
			},
		});
	
		if (error || !parsed) {
			console.log('Error occurred while creating a collection. ', error);
			return
		}
	
		const { collectionId } = parsed;
	
		const c = await sdk.collections.get({ collectionId });
		console.log('collection done', c);
	}

	const mintNewBundle = async (attrs, _collectionId, ipfsCid) => {
		// const client = new Sdk({ baseUrl: 'https://rest.unique.network/opal/v1' });
		// const file = fs.readFileSync(`./your_picture.png`);
		// const { fullUrl, cid } = await client.ipfs.uploadFile({ file });
		
		const account = accounts[currentAccountIndex];
		const address = account.address;
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})
		//const {sdk, address} = await getClientWithSeed();

		const createTokenArgs = {
			address,
			collectionId: _collectionId,
			data: {
			  //encodedAttributes: attrs,
			  image: {
				ipfsCid: ipfsCid,
			  }
			},
		  };
		  
		  const result = await sdk.tokens.create.submitWaitResult(createTokenArgs);
		  console.log(result.parsed)
		  const { collectionId, tokenId } = result.parsed;
		  console.log(tokenId)
		  
		  const token = await sdk.tokens.get({ collectionId, tokenId });
		  console.log(token) 
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
		switchWalletAccount,
		createCollection,
		mintNewBundle
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;