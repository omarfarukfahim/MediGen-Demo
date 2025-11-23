// Fix: Define the types used across the application.
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  availability: string;
  avatarColor: string;
}

export interface Appointment {
  id: number;
  doctor: Doctor;
  time: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  time: string;
  category: string;
  replies: number;
  lastActivity: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
}

export interface Hospital {
  id: number;
  name: string;
  type: string;
  distance: string;
}

export enum Page {
  Home = 'Home',
  Doctors = 'Doctors',
  Appointments = 'Appointments',
  Articles = 'Articles',
  Forum = 'Forum',
  AiAssistant = 'AI Assistant',
  Login = 'Login',
  Profile = 'Profile',
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
}

export interface UserProfile {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  currentMedications: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}