import { createStore, set, del, values } from 'idb-keyval';
import type { Album, Memory } from './types';

const store = createStore('our-memories', 'memories');

export const getMemories = () => values<Memory>(store);
export const addMemory = (m: Memory) => set(m.id, m, store);
export const removeMemory = (id: string) => del(id, store);

export const getAlbums = (): Album[] =>
  JSON.parse(localStorage.getItem('albums') ?? '[]');
export const saveAlbums = (a: Album[]) =>
  localStorage.setItem('albums', JSON.stringify(a));