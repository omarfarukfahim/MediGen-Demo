import React, { useState, useMemo } from 'react';
import { Doctor } from '../types';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose }) => {
  // Generate the next 7 days for booking
  const availableDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Simulate different time slots for different days
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    
    // Simple logic to vary slots based on day of the week
    const day = selectedDate.getDay();
    if (day % 3 === 0) { // Sun, Wed, Sat
      return ['09:00 AM', '10:00 AM', '11:00 AM'];
    }
    if (day % 3 === 1) { // Mon, Thu
      return ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    }
    // Tue, Fri
    return ['09:30 AM', '10:30 AM', '02:30 PM', '03:30 PM', '04:30 PM'];
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setIsConfirmed(true);
    } else {
      alert('Please select a date and a time slot.');
    }
  };
  
  const getFormattedConfirmationDate = () => {
      if (!selectedDate) return '';
      // Fix: Corrected method name from 'toLocaleDateTimeString' to 'toLocaleDateString'.
      return selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };
  
  const isSameDay = (d1: Date, d2: Date | null) => {
      if (!d2) return false;
      return d1.getFullYear() === d2.getFullYear() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getDate() === d2.getDate();
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!isConfirmed ? (
          <>
            <h2 id="booking-modal-title" className="text-2xl font-bold text-gray-800 mb-4">Book Appointment</h2>

            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg border">
              <div className={`w-16 h-16 ${doctor.avatarColor} rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                {doctor.name.split(' ').map(n => n[0]).slice(1,3).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">1. Select a Date</h3>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {availableDates.map(date => (
                    <button 
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isSameDay(date, selectedDate) ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">2. Select an Available Time</h3>
                  {timeSlots.length > 0 ? (
                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map(time => (
                          <button 
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${selectedTime === time ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                  ) : (
                    <div className="text-center py-4 px-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                        No available time slots for this day. Please select another date.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime}
                className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </>
        ) : (
            <div className="text-center py-8 px-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 id="booking-modal-title" className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Your appointment with <span className="font-semibold text-gray-800">{doctor.name}</span> is scheduled for <span className="font-semibold text-gray-800">{getFormattedConfirmationDate()}</span> at <span className="font-semibold text-gray-800">{selectedTime}</span>.
                </p>
                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-10 py-2.5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
