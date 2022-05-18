import { useCallback, useState } from 'react';

export const useModal = (initialState) => {
	const [visible, setVisible] = useState(initialState);
	const toggle = useCallback((newState) => setVisible(newState));
	return [visible, toggle];
}