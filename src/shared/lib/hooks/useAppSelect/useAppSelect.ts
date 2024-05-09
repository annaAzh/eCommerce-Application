import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'app/Providers/StoreProvider';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
