import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'app/providers/storeProvider';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
