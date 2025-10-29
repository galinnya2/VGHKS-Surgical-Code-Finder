
import React, { useState } from 'react';
import type { SurgicalCode } from '../types';
import { PlusIcon, EditIcon, DeleteIcon, CloseIcon } from './Icons';

interface AdminViewProps {
  codes: SurgicalCode[];
  setCodes: React.Dispatch<React.SetStateAction<SurgicalCode[]>>;
}

const emptyCode: Omit<SurgicalCode, 'id'> = { code: '', name_ch: '', name_en: '' };

const CodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: SurgicalCode) => void;
  codeToEdit: SurgicalCode | null;
}> = ({ isOpen, onClose, onSave, codeToEdit }) => {
  const [currentCode, setCurrentCode] = useState<Omit<SurgicalCode, 'id'>>(() => codeToEdit || emptyCode);

  React.useEffect(() => {
    setCurrentCode(codeToEdit || emptyCode);
  }, [codeToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCode(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...currentCode,
      id: codeToEdit?.id || crypto.randomUUID(),
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{codeToEdit ? 'Edit Code' : 'Add New Code'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
            <input type="text" name="code" value={currentCode.code} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div>
            <label htmlFor="name_ch" className="block text-sm font-medium text-gray-700">Chinese Name</label>
            <textarea name="name_ch" value={currentCode.name_ch} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">English Name</label>
            <textarea name="name_en" value={currentCode.name_en} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export const AdminView: React.FC<AdminViewProps> = ({ codes, setCodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<SurgicalCode | null>(null);

  const handleOpenModal = (code: SurgicalCode | null = null) => {
    setCodeToEdit(code);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCodeToEdit(null);
  };

  const handleSaveCode = (code: SurgicalCode) => {
    if (codeToEdit) {
      setCodes(prev => prev.map(c => c.id === code.id ? code : c));
    } else {
      setCodes(prev => [code, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteCode = (id: string) => {
    if (window.confirm('Are you sure you want to delete this code?')) {
      setCodes(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Codes</h2>
        <button onClick={() => handleOpenModal()} className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Code
        </button>
      </div>

      <CodeModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCode}
        codeToEdit={codeToEdit}
      />

      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chinese Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English Name</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {codes.map((code) => (
                <tr key={code.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{code.code}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs break-words">{code.name_ch}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs break-words">{code.name_en}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => handleOpenModal(code)} className="text-primary-600 hover:text-primary-900 p-1">
                      <EditIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleDeleteCode(code.id)} className="text-red-600 hover:text-red-900 p-1">
                      <DeleteIcon className="w-5 h-5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
