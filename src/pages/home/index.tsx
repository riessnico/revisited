import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "~/components/ui/input";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		"x-api-key": "2bbcaa2d2957424aa8e10c2e4b4fe7b0",
	},
};

const Page = () => {
	const [contract, setContract] = useState("");

	const { data } = useQuery(["lau", contract], async () => {
		const res = await fetch(
			`https://api.opensea.io/api/v2/chain/ethereum/contract/${contract}/nfts`,
			options,
		);
		return res.json();
	});

	return (
		<Input
			onChange={(e) => setContract(e.target.value)}
			onBlur={(e) => {
				console.log(data);
			}}
		/>
	);
};

export default Page;
