import React from 'react';
import Navbar from './Navbar';

const MaharashtraIncomeCertificate = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="font-sans bg-gray-100 p-8 mt-16">
        <header className="bg-gray-800 text-white py-4 px-6 text-center">
          <h1 className="text-3xl font-bold">Maharashtra Income Certificate - Eligibility and Application Procedure</h1>
        </header>

        <main className="bg-white p-8 max-w-4xl mx-auto my-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
          <p className="mb-4">
            Any individual who is employed and a resident of Maharashtra is eligible to apply for a Maharashtra income certificate.
          </p>

          <hr className="my-6" />

          <h2 className="text-2xl font-bold mb-4">Documents Required</h2>
          <p className="mb-4">The following documents are to be attached at the time of submitting the application form online:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Age Proof: Applicant Birth Certificate / School leaving Certificate / Pan Card.</li>
            <li>Address Proof: Ration Card / Voter ID / Passport / Driving License / Electricity bill / Water bill / Property tax receipt.</li>
            <li>Photograph: Applicant passport size photograph.</li>
            <li>Identity Proof: Aadhar Card / Voter ID / Driving License.</li>
            <li>Proof of Income: Form 16 if salaried, income tax return statement, salary slip.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-2xl font-bold mb-4">Online Application Procedure</h2>
          <p className="mb-4">The following steps have been specified to obtain a Maharashtra income certificate online:</p>
          <ul className="list-decimal list-inside mb-4">
            <strong>Step 1:</strong> Visit the official website of the Maharashtra Government.<br/>
            <strong>Step 2:</strong> Click on “New User” which is visible on the home page of the portal.<br/>
            <strong>Step 3:</strong> Select “Income Certificate” option from the main menu.<br/>
            <strong>Step 4:</strong> On the next page, the application form for Income Certificate appears.<br/>
            <strong>Step 5:</strong> Fill the form with required details and attach the scanned documents.<br/>
            <strong>Step 6:</strong> Finally click on “Submit” for successful registration.<br/>
          </ul>
          <p className="mb-4">
            <strong>Note:</strong> After submitting the application form for an income certificate, you will be provided with an acknowledgement number to track your income certificate status.
          </p>

          <hr className="my-6" />

          <h2 className="text-2xl font-bold mb-4">Track Income Certificate Status</h2>
          <p className="mb-4">To check the status of your Maharashtra income certificate application, follow these steps:</p>
          <ul className="list-decimal list-inside mb-4">
            <strong>Step 1:</strong> Click on ”Track Your Application” and enter your application ID.<br/>
            <strong>Step 2:</strong> Select ‘Go‘ and the status of the application will be displayed.<br/>
          </ul>
          <p>
            <strong>Note:</strong> The concerned authority will issue the income certificate within 15 days from the date of application. The applicant can obtain the Income Certificate by remitting a fee of Rs. 5. The validity of the Income Certificate is for six months from the date of issue.
          </p>
        </main>
      </div>
    </>
  );
};

export default MaharashtraIncomeCertificate;
