'use client';
import { useState } from 'react';

export function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', property: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('Submitting...');

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('✅ Sent!');
      setForm({ name: '', phone: '', property: '' });
    } else {
      setStatus('❌ Failed to send.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        placeholder="Property of interest"
        value={form.property}
        onChange={(e) => setForm({ ...form, property: e.target.value })}
      />
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
}
