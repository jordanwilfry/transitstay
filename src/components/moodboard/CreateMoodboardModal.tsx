import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import Button from '../ui/Button';

interface CreateMoodboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description?: string) => void;
  loading?: boolean;
}

export function CreateMoodboardModal({ isOpen, onClose, onSubmit, loading }: CreateMoodboardModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    setErrors({});
    onSubmit(title.trim(), description.trim() || undefined);
    
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Moodboard">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <p className="text-gray-600 text-sm mb-6">
          Create a new moodboard to organize your travel inspirations and ideas.
        </p>
        
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Travel Moodboard"
          error={errors.title}
          autoFocus
        />
        
        <Textarea
          label="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your moodboard..."
        />
        
        <div className="pt-4">
          <Button
            type="black"
            text={loading ? "Creating..." : "Create Moodboard"}
            disabled={loading}
            className="w-full"
          />
        </div>
      </form>
    </Modal>
  );
}