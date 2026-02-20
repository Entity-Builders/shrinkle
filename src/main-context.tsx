import { createContext, useEffect, useState } from 'react';
import LocalStorageParser from 'local-storage-parser';

import { UrlItem } from './types';

interface IMainContext {
  urlItems: UrlItem[] | [];
  saveUrlItem: (urlItem: UrlItem) => void;
  deleteItem: (shortCode: string) => void;
}

const initialState = {} as IMainContext;

const MainContext = createContext<IMainContext>(initialState);

const lsp = new LocalStorageParser('local');
export const MainProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [urlItems, setUrlItems] = useState<UrlItem[] | []>(
    lsp.get()?.urlItems || []
  );

  const saveUrlItem = (urlItem: UrlItem) => {
    setUrlItems((prevItems) => {
      if (prevItems) {
        return [...prevItems, urlItem];
      }

      return [urlItem];
    });
  };

  const deleteItem = (shortCode: string) => {
    setUrlItems(urlItems.filter((item) => item.shortCode !== shortCode));
  };

  useEffect(() => {
    lsp.set({ urlItems });
  }, [urlItems]);

  return (
    <MainContext.Provider value={{ urlItems, saveUrlItem, deleteItem }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext };
