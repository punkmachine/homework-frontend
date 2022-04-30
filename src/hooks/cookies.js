export const useCookies = () => {
	function CookiesDelete() {
		const cookies = document.cookie.split(";");
		cookies.forEach((item) => {
			let pos = item.indexOf('=');
			let name = pos > - 1 ? item.substr(0, pos) : item;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
			document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
		});
	}

	return {
		CookiesDelete,
	};
}