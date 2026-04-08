import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeads, addLead, updateLead, deleteLead } from '../api/leadsApi';
import '../App.css';

function LeadsPage() {
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('New');
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  });

  const addMutation = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      lead,
    }: {
      id: number;
      lead: { name: string; company: string; status: string };
    }) => updateLead(id, lead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const resetForm = () => {
    setName('');
    setCompany('');
    setStatus('New');
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!name.trim() || !company.trim()) return;

    const leadData = { name, company, status };

    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, lead: leadData });
    } else {
      addMutation.mutate(leadData);
    }
  };

  const handleEdit = (lead: {
    id: number;
    name: string;
    company: string;
    status: string;
  }) => {
    setEditingId(lead.id);
    setName(lead.name);
    setCompany(lead.company);
    setStatus(lead.status);
  };

  const getBadgeClass = (leadStatus: string) => {
    if (leadStatus === 'New') return 'badge badge-new';
    if (leadStatus === 'Contacted') return 'badge badge-contacted';
    return 'badge badge-qualified';
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>

      <h1 className="title">LeadFlow CRM</h1>
      <p className="subtitle">
        Simple CRM app using React, TypeScript, and TanStack Query.
      </p>

      <div className="form-row">
        <input
          className="input"
          type="text"
          placeholder="Lead Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
        </select>

        <button className="button" onClick={handleSubmit}>
          {editingId !== null ? 'Update Lead' : 'Add Lead'}
        </button>

        {editingId !== null && (
          <button className="delete-button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      <ul className="lead-list">
        {data?.map((lead) => (
          <li key={lead.id} className="lead-item">
            <div>
              <span className="lead-text">
                {lead.name} - {lead.company}
              </span>
              <span className={getBadgeClass(lead.status)}>{lead.status}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="button" onClick={() => handleEdit(lead)}>
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => deleteMutation.mutate(lead.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadsPage;