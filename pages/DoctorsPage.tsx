import React, { useState, useMemo } from 'react';
import { DOCTORS, NEARBY_HOSPITALS, TOP_RATED_DOCTORS } from '../constants';
import { Doctor } from '../types';
import { StarIcon } from '../components/icons/StarIcon';
import { BookingModal } from '../components/BookingModal';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-shadow hover:shadow-md">
    <div className="flex items-center space-x-4">
      <div className={`w-16 h-16 ${doctor.avatarColor} rounded-full flex items-center justify-center text-xl font-bold`}>
        {doctor.name.split(' ').map(n => n[0]).slice(1,3).join('')}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
        <p className="text-sm text-gray-600">
          {doctor.specialty} &bull; {doctor.location}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
            {doctor.rating.toFixed(1)}
          </div>
          <span className="text-gray-300">&bull;</span>
          <div className={`text-sm font-medium ${doctor.availability === 'Available Today' ? 'text-green-600' : 'text-orange-600'}`}>
            {doctor.availability}
          </div>
        </div>
      </div>
    </div>
    
    <button 
      onClick={() => onBook(doctor)}
      className="w-full sm:w-auto px-5 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-semibold"
    >
      Book Appointment
    </button>
  </div>
);


export const DoctorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const specialties = useMemo(() => ['All', ...Array.from(new Set(DOCTORS.map(d => d.specialty)))], []);
  
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doctor => {
      const matchesQuery = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  const handleOpenBookingModal = (doctor: Doctor) => {
    setBookingDoctor(doctor);
  };

  const handleCloseBookingModal = () => {
    setBookingDoctor(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Doctor</h1>
              <p className="text-gray-600">Search our directory of trusted medical professionals.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by name, specialty, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
              </select>
            </div>
            
            <div className="space-y-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} onBook={handleOpenBookingModal} />)
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-700">No doctors found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
                </div>
              )}
            </div>
          </div>
          
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Nearby Hospitals</h3>
              <ul className="space-y-3">
                {NEARBY_HOSPITALS.map((h) => (
                  <li key={h.id}>
                    <h4 className="font-medium text-gray-800">{h.name}</h4>
                    <p className="text-sm text-gray-600">{h.type} &bull; {h.distance}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Top Rated Doctors</h3>
              <ul className="space-y-3">
                {TOP_RATED_DOCTORS.map((d) => (
                  <li key={d.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">{d.name}</span>
                    <div className="flex items-center font-bold text-gray-600">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                      {d.rating.toFixed(1)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      {bookingDoctor && (
        <BookingModal doctor={bookingDoctor} onClose={handleCloseBookingModal} />
      )}
    </>
  );
};