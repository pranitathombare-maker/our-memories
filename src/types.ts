export type Album = {
  id: string;
  name: string;
};

export type Memory = {
  id: string;
  albumId: string; // '' means no album
  kind: 'image' | 'video';
  blob: Blob;
  caption: string;
  date: string; // YYYY-MM-DD
};