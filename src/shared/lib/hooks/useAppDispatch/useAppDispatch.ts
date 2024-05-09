import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/Providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
