
import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';


  interface signUpVolunteerState {
  first_name: string;
  lastName: string;
  numberName: string;
  emailName: string;
  }


const AddVolunteer: React.FC = () => {

  const [formData, setFormData] = useState<signUpVolunteerState>({
    first_name: '',
    lastName: '',
    numberName: '',
    emailName: ''

  })
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData); 
      
      await supabase.from('volunteers').insert([
        {
          first_name: formData.first_name,
          lastName: formData.lastName,
          numberName: formData.numberName,
          emailName: formData.emailName,
        }
      ]);
  

     

      navigate('/VolunteerManagement');
    }; 


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Volunteer</h1>
      <form onSubmit={handleSubmit}>
      <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full p-2 mb-3 border rounded"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="block w-full p-2 mb-3 border rounded"
        />
        <input
          name="numberName"
          value={formData.numberName}
          onChange={handleChange}
          placeholder="Phone Number"
          className="block w-full p-2 mb-3 border rounded"
        />
        <input
          name="emailName"
          value={formData.emailName}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
 
  

};

export default AddVolunteer;
