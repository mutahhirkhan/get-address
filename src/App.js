import React from "react";
import { mnemonicToSeed } from "bip39";
import * as EthWallet from "ethereumjs-wallet";

function App() {
	const [input, serInput] = React.useState("");
	const [privateKeyAndPublicAddress, setPrivateKeyAndPublicAddress] = React.useState({
		privatekey: "",
		publicAddress: "",
		publicKey: "",
	});
	const generate = async (e) => {
		e.preventDefault();

		const seed = await mnemonicToSeed(input);
		const hdwallet = EthWallet.hdkey.fromMasterSeed(seed);
		const wallet_hdpath = "m/44'/60'/0'/0/";
		let fullPath = wallet_hdpath + 0;
		console.log("fullPath", fullPath);

		const wallet = hdwallet.derivePath(fullPath).getWallet();

		setPrivateKeyAndPublicAddress({
			privatekey: wallet.privKey.toString("hex"),
			publicAddress: wallet.getAddress().toString("hex"),
			publicKey: wallet.pubKey.toString("hex"),
		});
	};
	return (
		<div className="container">
			<h1>get address from the seed phrase</h1>
			<form>
				<input onChange={(e) => serInput(e.target.value)} type="text" value={input} placeholder="Enter your mnemonic" />
				<button onClick={generate}>generate private key </button>
			</form>
			<p>private key: {privateKeyAndPublicAddress.privatekey}</p>
			<p>public key: {privateKeyAndPublicAddress.publicKey}</p>
			<p>public address: {privateKeyAndPublicAddress.publicAddress}</p>
		</div>
	);
}

export default App;
