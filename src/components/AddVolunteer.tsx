
import React from 'react';
import { useState } from "react";


const AddVolunteer: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Volunteer</h1>
      <p className="text-gray-600">This is a placeholder for the Add Vendor page.</p>
      {/* Add your form or content here */}
    </div>
  );
 
  interface signUpVendorState{
    companyName: string;
    emailName: string;
    numberName: string;
    contactName: string;

  }

  const [formData, setFormData] = useState<signUpVendorState>({
    companyName: '',
    emailName: '',
    numberName: '',
    contactName: ''

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

}

export default AddVolunteer;
