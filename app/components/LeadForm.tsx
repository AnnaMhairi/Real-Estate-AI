'use client';
import { useState } from 'react';

export function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', property: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('Sending...');
    const res = await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'Sent!' : 'Error');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Property" onChange={(e) => setForm({ ...form, property: e.target.value })} />
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
}
