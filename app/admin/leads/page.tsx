import { db } from '../../lib/db';

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Lead Inbox</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Phone</th>
            <th className="border px-2">Property</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="border px-2">{lead.name}</td>
              <td className="border px-2">{lead.phone}</td>
              <td className="border px-2">{lead.property ?? '-'}</td>
              <td className="border px-2">{lead.status}</td>
              <td className="border px-2">
                {new Date(lead.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
