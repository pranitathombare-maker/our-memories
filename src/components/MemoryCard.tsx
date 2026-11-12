import { useEffect, useState } from 'react';
import type { Memory } from '../types';

type Props = { memory: Memory; onDelete: (id: string) => void };

export default function MemoryCard({ memory, onDelete }: Props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const u = URL.createObjectURL(memory.blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [memory.blob]);

  return (
    <div className="card">
      {memory.kind === 'video' ? (
        <video src={url} controls playsInline />
      ) : (
        <img src={url} alt={memory.caption} />
      )}
      <div className="meta">
        <small>{new Date(memory.date).toLocaleDateString()}</small>
        <p>{memory.caption}</p>
        <button className="ghost" onClick={() => onDelete(memory.id)}>Delete</button>
      </div>
    </div>
  );
}