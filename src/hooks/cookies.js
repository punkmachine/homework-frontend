import { useState, useEffect } from 'react';

export const useCookies = () => {
	const [jwt, setJWT] = useState(null);

	function CookiesDelete() {
		const cookies = document.cookie.split(";");
		cookies.forEach((item) => {
			let pos = item.indexOf('=');
			let name = pos > - 1 ? item.substr(0, pos) : item;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
			document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
		});
		setJWT(null);
	}

	useEffect(() => {
		let cookieJWT = document.cookie
			.split(';')
			.map(item => {
				const index = item.indexOf('=');
				const key = item.slice(0, index);
				const value = item.slice(index + 1, item.length);

				return {
					[key]: value,
				};
			})
			.filter(item => item.JWT);

		if (cookieJWT.length > 0) {
			setJWT(cookieJWT[0].JWT);
		} else {
			setJWT(cookieJWT.toString());
		}
	}, []);

	useEffect(() => {
		console.log('jwt useEffect >>>', jwt);
	}, [jwt])

	return {
		jwt,
		CookiesDelete,
		setJWT
	};
}