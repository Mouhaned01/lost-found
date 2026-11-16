import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Item } from '@/types';

const STORAGE_KEY = 'lost-found/items';

const STARTER_ITEMS: Item[] = [
  { id: '1', title: 'Blue water bottle', place: 'Library, 2nd floor', claimed: false },
  { id: '2', title: 'Student card', place: 'Cafeteria', claimed: false },
  { id: '3', title: 'USB-C charger', place: 'Room B12', claimed: true },
];

type NewItem = Omit<Item, 'id' | 'claimed'>;

type ItemsContextValue = {
  items: Item[];
  loaded: boolean;
  addItem: (data: NewItem) => void;
  toggleClaimed: (id: string) => void;
  removeItem: (id: string) => void;
};

const ItemsContext = createContext<ItemsContextValue | null>(null);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 1. Load once, when the app starts
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((json) => {
      setItems(json ? JSON.parse(json) : STARTER_ITEMS);
      setLoaded(true);
    });
  }, []);

  // 2. Save every time the list changes (but not before loading finished)
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  function addItem(data: NewItem) {
    const newItem: Item = { id: Date.now().toString(), claimed: false, ...data };
    setItems((current) => [newItem, ...current]);
  }

  function toggleClaimed(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, claimed: !item.claimed } : item)),
    );
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ItemsContext.Provider value={{ items, loaded, addItem, toggleClaimed, removeItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems() must be used inside <ItemsProvider>');
  }
  return context;
}