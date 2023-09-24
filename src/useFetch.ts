import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useFetch = <T>(url: string): { data: T | null; isPending: boolean; error: string | null } => {
	const [data, setData] = useState<T | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchData = async () => {
			try {
				const response: AxiosResponse<T> = await axios.get(url, {
					cancelToken: source.token,
				});
				setData(response.data);
				setIsPending(false);
				setError(null);
			} catch (err: any) {
				if (axios.isCancel(err)) {
					setError(err.message || "An error occurred while fetching data");
					setIsPending(false);
				}
			}
		};

		fetchData();

		return () => {
			source.cancel("Request canceled by user");
		};
	}, [url]);

	return { data, isPending, error };
};

export default useFetch;
