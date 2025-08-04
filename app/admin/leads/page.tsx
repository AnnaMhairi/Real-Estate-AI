import { db } from '../../lib/db';

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Lead Inbox</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Name</th><th>Phone</th><th>Property</th><th>Date</th></tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.property}</td>
              <td>{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
