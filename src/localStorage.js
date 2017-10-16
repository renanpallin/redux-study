export const loadState = () => {
	try {
		return JSON.parse(window.localStorage.getItem('state')) || undefined;
	} catch(e) {
		console.error(e);
		return undefined;
	}
}

export const saveState = state => {
	try {
		window.localStorage.setItem('state', JSON.stringify(state));
	} catch(e) {
		console.log(e);
		return undefined;
	}
}