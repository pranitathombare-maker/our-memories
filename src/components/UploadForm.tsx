import { useState } from 'react';
import type { Album, Memory } from '../types';

type Props = {
  albums: Album[];
  defaultAlbum: string;
  onAdd: (items: Memory[]) => void;
  onCancel: () => void;
};

export default function UploadForm({ albums, defaultAlbum, onAdd, onCancel }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [albumId, setAlbumId] = useState(defaultAlbum === 'all' ? '' : defaultAlbum);

  const submit = () => {
    if (!files.length) return;
    const items: Memory[] = files.map((f) => ({
      id: crypto.randomUUID(),
      albumId,
      kind: f.type.startsWith('video') ? 'video' : 'image',
      blob: f,
      caption,
      date,
    }));
    onAdd(items);
  };

  return (
    <div className="modal">
      <div className="sheet">
        <h2>Add memory</h2>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
          <option value="">No album</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <div className="row">
          <button className="ghost" onClick={onCancel}>Cancel</button>
          <button onClick={submit} disabled={!files.length}>Save</button>
        </div>
      </div>
    </div>
  );
}