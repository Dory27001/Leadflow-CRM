export type Lead = {
  id: number;
  name: string;
  company: string;
  status: string;
};

const API_URL = 'http://localhost:3000/api/leads';

export const getLeads = async (): Promise<Lead[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }

  return response.json();
};

export const addLead = async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error('Failed to add lead');
  }

  return response.json();
};

export const updateLead = async (
  id: number,
  updatedLead: Omit<Lead, 'id'>
): Promise<Lead> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedLead),
  });

  if (!response.ok) {
    throw new Error('Failed to update lead');
  }

  return response.json();
};

export const deleteLead = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete lead');
  }
};