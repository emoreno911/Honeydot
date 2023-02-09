import React, { createContext, useState, useEffect } from 'react';
import {
	getAccountBalance,
} from './utils';

export const DataContext = createContext();

const DataContextProvider = (props) => { 
	const collectionId = 1220;
	//const [currentParent, setCurrentParent] = useState(null);
	//const [currentChild, setCurrentChild] = useState(null);

	useEffect(() => {
		//getBalance();
	}, [])

	const getBalance = async () => {
		const {address, balance} = await getAccountBalance("5F9GP5q3X8CPaHEHbffYURdDz6T1q6uEs1EHiysg9ek8DGWV");
		console.log(`Balance for ${address} is ${balance}`)
	}

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		collectionId,
	}

	const fn = {
		isMobile,
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;