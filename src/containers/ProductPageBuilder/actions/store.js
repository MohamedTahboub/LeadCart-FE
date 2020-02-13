import { useContext as useReactContext, createContext } from 'react';

const Context = createContext({});

export const useContext = () => useReactContext(Context);

export default Context;

