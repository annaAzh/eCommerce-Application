import { AppDispatch } from 'app/providers/storeProvider/config/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
