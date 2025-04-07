import React from 'react';


import { useState } from "react";


  interface signUpVendorState {
  companyName: string;
  emailName: string;
  numberName: string;
  contactName: string;
  }


const AddVendor: React.FC = () => {

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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Volunteer</h1>
      <form>
      <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="block w-full p-2 mb-3 border rounded"
        />
        <input
          name="emailName"
          value={formData.emailName}
          onChange={handleChange}
          placeholder="Email"
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
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Contact Name"
          className="block w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
 
  

};
export default AddVendor;




