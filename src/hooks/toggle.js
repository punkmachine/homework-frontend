import { useCallback, useState } from 'react'

export const useToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState);
	const toggle = useCallback(() => setIsToggled(!isToggled));
	return [isToggled, toggle];
}