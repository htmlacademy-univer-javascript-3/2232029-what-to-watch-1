import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, store } from '../store';

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
