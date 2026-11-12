import { useEffect, useState } from 'react';
import type { Album, Memory } from './types';
import { addMemory, getAlbums, getMemories, removeMemory, saveAlbums } from './db';
import UploadForm from './components/UploadForm';
import MemoryCard from './components/MemoryCard';

export default function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [albums, setAlbums] = useState<Album[]>(getAlbums());
  const [current, setCurrent] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getMemories().then(setMemories);
  }, []);

  const createAlbum = () => {
    const name = prompt('Album name?')?.trim();
    if (!name) return;
    const next = [...albums, { id: crypto.randomUUID(), name }];
    setAlbums(next);
    saveAlbums(next);
  };

  const handleAdd = async (items: Memory[]) => {
    await Promise.all(items.map(addMemory));
    setMemories((m) => [...m, ...items]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this memory?')) return;
    await removeMemory(id);
    setMemories((m) => m.filter((x) => x.id !== id));
  };

  const visible = memories
    .filter((m) => current === 'all' || m.albumId === current)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="app">
      <header>
        <h1>Our Memories</h1>
        <button onClick={() => setShowForm(true)}>+ Add</button>
      </header>

      <nav className="albums">
        <button className={current === 'all' ? 'active' : ''} onClick={() => setCurrent('all')}>
          All
        </button>
        {albums.map((a) => (
          <button
            key={a.id}
            className={current === a.id ? 'active' : ''}
            onClick={() => setCurrent(a.id)}
          >
            {a.name}
          </button>
        ))}
        <button className="ghost" onClick={createAlbum}>+ Album</button>
      </nav>

      <main className="grid">
        {visible.length === 0 && <p className="empty">No memories yet. Tap + Add.</p>}
        {visible.map((m) => (
          <MemoryCard key={m.id} memory={m} onDelete={handleDelete} />
        ))}
      </main>

      {showForm && (
        <UploadForm
          albums={albums}
          defaultAlbum={current}
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}