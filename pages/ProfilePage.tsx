import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string }> = 
  ({ label, name, value, onChange, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
    </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = 
  ({ label, name, value, onChange, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
            {children}
        </select>
    </div>
);


export const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        patientId: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        allergies: [''],
        currentMedications: [''],
        emergencyContact: { name: '', relationship: '', phone: '' },
    });
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const saveTimeoutRef = React.useRef<number | null>(null);

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                const parsedProfile = JSON.parse(savedProfile);
                
                if (!parsedProfile.patientId) {
                    parsedProfile.patientId = crypto.randomUUID();
                }

                // Ensure arrays are not empty for the UI
                if (!parsedProfile.allergies || parsedProfile.allergies.length === 0) {
                    parsedProfile.allergies = [''];
                }
                if (!parsedProfile.currentMedications || parsedProfile.currentMedications.length === 0) {
                    parsedProfile.currentMedications = [''];
                }
                setProfile(parsedProfile);
            } else {
                setProfile(prev => ({
                    ...prev,
                    patientId: crypto.randomUUID(),
                }));
            }
        } catch (error) {
            console.error("Failed to load profile from localStorage", error);
            setProfile(prev => ({
                ...prev,
                patientId: crypto.randomUUID(),
            }));
        }
    }, []);

    const handleSave = useCallback((updatedProfile: UserProfile) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        setSaveStatus('saving');
        try {
            const profileToSave = {
                ...updatedProfile,
                allergies: updatedProfile.allergies.filter(item => item.trim() !== ''),
                currentMedications: updatedProfile.currentMedications.filter(item => item.trim() !== ''),
            };
            localStorage.setItem('userProfile', JSON.stringify(profileToSave));
            saveTimeoutRef.current = window.setTimeout(() => {
                setSaveStatus('saved');
                saveTimeoutRef.current = window.setTimeout(() => setSaveStatus('idle'), 2000);
            }, 500);
        } catch (error) {
            console.error("Failed to save profile to localStorage", error);
            setSaveStatus('idle');
        }
    }, []);
    
    useEffect(() => {
      // Don't save the initial blank profile on first render
      if (profile.patientId) {
        handleSave(profile);
      }
      return () => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      }
    }, [profile, handleSave]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            emergencyContact: { ...prev.emergencyContact, [name]: value }
        }));
    };

    const handleMedicalListChange = (index: number, value: string, field: 'allergies' | 'currentMedications') => {
        const newList = [...profile[field]];
        newList[index] = value;
        setProfile(prev => ({ ...prev, [field]: newList }));
    };

    const addMedicalListItem = (field: 'allergies' | 'currentMedications') => {
        setProfile(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeMedicalListItem = (index: number, field: 'allergies' | 'currentMedications') => {
        if (profile[field].length <= 1) return;
        const newList = profile[field].filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, [field]: newList }));
    };

    const getSaveStatusText = () => {
        switch (saveStatus) {
            case 'saving': return 'Saving...';
            case 'saved': return 'Profile Saved!';
            default: return '';
        }
    };

    const renderMedicalList = (field: 'allergies' | 'currentMedications') => (
        <div className="space-y-3">
            {profile[field].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => handleMedicalListChange(index, e.target.value, field)}
                        placeholder={field === 'allergies' ? 'e.g., Penicillin' : 'e.g., Metformin 500mg'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        type="button"
                        onClick={() => removeMedicalListItem(index, field)}
                        disabled={profile[field].length <= 1}
                        className="p-2 text-gray-500 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Remove ${field.slice(0, -1)}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addMedicalListItem(field)}
                className="text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
                + Add {field === 'allergies' ? 'Allergy' : 'Medication'}
            </button>
        </div>
    );
    

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Health Profile</h1>
                    <span className={`text-sm font-medium transition-opacity duration-300 ${saveStatus !== 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                        {getSaveStatusText()}
                    </span>
                </div>
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" name="fullName" value={profile.fullName} onChange={handleChange} placeholder="Enter your full name"/>
                            <InputField label="Date of Birth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} type="date"/>
                            <SelectField label="Gender" name="gender" value={profile.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </SelectField>
                            <SelectField label="Blood Type" name="bloodType" value={profile.bloodType} onChange={handleChange}>
                                <option value="">Select Blood Type</option>
                                <option value="A+">A+</option> <option value="A-">A-</option>
                                <option value="B+">B+</option> <option value="B-">B-</option>
                                <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                                <option value="O+">O+</option> <option value="O-">O-</option>
                                <option value="Unknown">I don't know</option>
                            </SelectField>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Medical History</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                                {renderMedicalList('allergies')}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                                {renderMedicalList('currentMedications')}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Emergency Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="Contact Name" name="name" value={profile.emergencyContact.name} onChange={handleEmergencyContactChange} placeholder="e.g., Jane Doe"/>
                            <InputField label="Relationship" name="relationship" value={profile.emergencyContact.relationship} onChange={handleEmergencyContactChange} placeholder="e.g., Spouse"/>
                            <InputField label="Phone Number" name="phone" value={profile.emergencyContact.phone} onChange={handleEmergencyContactChange} type="tel" placeholder="e.g., (555) 123-4567"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};