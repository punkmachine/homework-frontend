import { useCallback, useState } from 'react';

export const useModal = (initialState) => {
	const [visible, setVisible] = useState(initialState);
	const toggle = useCallback((newState) => setVisible(newState));
	const show = useCallback(() => setVisible(true));
	const hide = useCallback(() => setVisible(false));
	return [visible, toggle];
}