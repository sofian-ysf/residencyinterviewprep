'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: any) => void;
  editingExperience?: any;
}

export default function ExperienceModal({
  isOpen,
  onClose,
  onSave,
  editingExperience
}: ExperienceModalProps) {
  const [experience, setExperience] = useState({
    title: '',
    organization: '',
    startDate: '',
    endDate: '',
    ongoing: false,
    description: '',
    isMostMeaningful: false,
    meaningfulDescription: ''
  });

  const [charCount, setCharCount] = useState(0);
  const [meaningfulCharCount, setMeaningfulCharCount] = useState(0);

  useEffect(() => {
    if (editingExperience) {
      setExperience(editingExperience);
      setCharCount(editingExperience.description?.length || 0);
      setMeaningfulCharCount(editingExperience.meaningfulDescription?.length || 0);
    } else {
      // Reset form
      setExperience({
        title: '',
        organization: '',
        startDate: '',
        endDate: '',
        ongoing: false,
        description: '',
        isMostMeaningful: false,
        meaningfulDescription: ''
      });
      setCharCount(0);
      setMeaningfulCharCount(0);
    }
  }, [editingExperience, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!experience.title || !experience.organization || !experience.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (charCount > 750) {
      alert('Description must be 750 characters or less');
      return;
    }

    if (experience.isMostMeaningful && meaningfulCharCount > 300) {
      alert('Most meaningful explanation must be 300 characters or less');
      return;
    }

    onSave({
      ...experience,
      id: editingExperience?.id || Date.now().toString()
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">
            {editingExperience ? 'Edit Experience' : 'Add Experience Description'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-black font-medium">
                Experience Title *
              </Label>
              <Input
                id="title"
                value={experience.title}
                onChange={(e) => setExperience({ ...experience, title: e.target.value })}
                placeholder="e.g., Research Assistant"
                className="mt-1 text-black"
                required
              />
            </div>

            <div>
              <Label htmlFor="organization" className="text-black font-medium">
                Organization *
              </Label>
              <Input
                id="organization"
                value={experience.organization}
                onChange={(e) => setExperience({ ...experience, organization: e.target.value })}
                placeholder="e.g., Johns Hopkins Hospital"
                className="mt-1 text-black"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-black font-medium">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="month"
                value={experience.startDate}
                onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
                className="mt-1 text-black"
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate" className="text-black font-medium">
                End Date {experience.ongoing && '(Ongoing)'}
              </Label>
              <Input
                id="endDate"
                type="month"
                value={experience.endDate}
                onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
                className="mt-1 text-black"
                disabled={experience.ongoing}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="ongoing"
                  checked={experience.ongoing}
                  onChange={(e) => setExperience({
                    ...experience,
                    ongoing: e.target.checked,
                    endDate: e.target.checked ? '' : experience.endDate
                  })}
                  className="mr-2"
                />
                <Label htmlFor="ongoing" className="text-sm text-gray-600">
                  This experience is ongoing
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-black font-medium">
              Experience Description * (ERAS format)
            </Label>
            <Textarea
              id="description"
              value={experience.description}
              onChange={(e) => {
                const text = e.target.value;
                if (text.length <= 750) {
                  setExperience({ ...experience, description: text });
                  setCharCount(text.length);
                }
              }}
              placeholder="Describe your role, responsibilities, and achievements..."
              className="mt-1 min-h-[150px] text-black"
              required
            />
            <p className={`text-sm mt-1 ${charCount > 700 ? 'text-orange-600' : 'text-gray-500'}`}>
              {charCount} / 750 characters
            </p>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="meaningful"
                checked={experience.isMostMeaningful}
                onChange={(e) => setExperience({
                  ...experience,
                  isMostMeaningful: e.target.checked
                })}
                className="mr-2"
              />
              <Label htmlFor="meaningful" className="text-black font-medium">
                This is one of my most meaningful experiences
              </Label>
            </div>

            {experience.isMostMeaningful && (
              <div>
                <Label htmlFor="meaningfulDescription" className="text-black font-medium">
                  Why is this meaningful? *
                </Label>
                <Textarea
                  id="meaningfulDescription"
                  value={experience.meaningfulDescription}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 300) {
                      setExperience({ ...experience, meaningfulDescription: text });
                      setMeaningfulCharCount(text.length);
                    }
                  }}
                  placeholder="Explain why this experience was particularly meaningful to you..."
                  className="mt-1 min-h-[100px] text-black"
                  required={experience.isMostMeaningful}
                />
                <p className={`text-sm mt-1 ${meaningfulCharCount > 250 ? 'text-orange-600' : 'text-gray-500'}`}>
                  {meaningfulCharCount} / 300 characters
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white"
            >
              {editingExperience ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}