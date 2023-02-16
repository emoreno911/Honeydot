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

	const getSdkClient = () => {
		const account = accounts[currentAccountIndex];
		const address = account.address;
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})

		return { sdk, address }
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

	const createRftCollection = async () => {
		const account = accounts[currentAccountIndex];
		const address = account.address;
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})

		const { parsed, error } = await sdk.refungible.createCollection.submitWaitResult({
			address,
			name: 'Test RFT collection',
			description: 'My test RFT collection',
			tokenPrefix: 'TSTR',
		});
	
		if (error || !parsed) {
			console.log('Error occurred while creating a collection. ', error);
			process.exit();
		}
	
		const { collectionId } = parsed;
	
		const c = await sdk.collections.get({ collectionId });
		console.log('collection done', c);
	}

	const mintRefungibleToken = async () => {
		const account = accounts[currentAccountIndex];
		const address = account.address;
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})

		const createArgs = {
			collectionId: 523,
			data: {
				image: {},
			},
			amount: 20
		};

		const result = await sdk.refungible.createToken.submitWaitResult({
			address,
			...createArgs
		});
		if (!result || !result.parsed) {
			console.log('Error occurred while creating a token');
			process.exit();
		}
		const { collectionId, tokenId } = result.parsed;
		console.log(collectionId, tokenId);

		const token = await sdk.tokens.get({ collectionId, tokenId });
		console.log(token) 
	}

	const getTokenInfo = async (collectionId = 500, tokenId = 1) => {
		const account = accounts[currentAccountIndex];
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})

		//const collection = await sdk.refungible.getCollection({ collectionId });
		const result = await sdk.tokens.accountTokens({ collectionId, address: account.address });
		console.log('collection', result)

		const bundle = await sdk.tokens.getBundle({ collectionId, tokenId  });
		console.log('collection', bundle)

		const token = await sdk.tokens.get({ collectionId, tokenId });
		console.log(token) 

		// const { amount } = await sdk.refungible.getBalance({ collectionId, tokenId, address: account.address });
		// console.log('Pieces you have: ', amount)
	}

	const getTokenDetailInfo = async (collectionId, tokenId) => {
		const { sdk, address } = getSdkClient();

		const tokenDetail = await sdk.tokens.get({ collectionId, tokenId });

		const bundleInfo = await sdk.tokens.getBundle({ collectionId, tokenId  });
		console.log('bundle', bundleInfo)

		return { tokenDetail, bundleInfo }
	}

	const nestTokens = async ({ parentCollection, parentToken, childCollection, childToken }) => {
		const account = accounts[currentAccountIndex];
		const address = account.address;
		const sdk = new Sdk({
			baseUrl: baseNetworkURL, 
			signer: account.uniqueSdkSigner
		})

		const args = {
			address,
			parent: {
				collectionId: parentCollection,
				tokenId: parentToken,
			},
			nested: {
				collectionId: childCollection,
				tokenId: childToken,
			},
			value: 10
		};

		console.log('nesting...')
		const result = await sdk.tokens.nest.submitWaitResult(args);

		if (!result || !result.parsed) {
			console.log('Error occurred while nest');
			process.exit();
		}

		const { tokenId } = result.parsed;

		console.log(
			`Token ${tokenId} successfully nested`,
		);
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
		initAccountWithWallet,
		switchWalletAccount,
		createRftCollection,
		createCollection,
		mintRefungibleToken,
		mintNewBundle,
		getTokenInfo,
		getTokenDetailInfo,
		nestTokens
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;