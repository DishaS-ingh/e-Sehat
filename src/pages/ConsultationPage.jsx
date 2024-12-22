import React, { useState } from "react";
//import doctorImage from "../assets/doctor.webp"; // Add a sample doctor image
import { GoogleGenerativeAI } from "@google/generative-ai";

const ConsultationPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = " ";

  const doctors = [
    {
      name: "Dr. John Doe",
      specialty: "General Physician",
      contact: "john.doe@example.com",
      image: "/src/assets/doctor.webp",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
    {
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      contact: "jane.smith@example.com",
      image: "/src/assets/janesmith.jpg",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
    {
      name: "Dr. Tony Stark",
      specialty: "Surgeon",
      contact: "emily.johnson@example.com",
      image: "/src/assets/rd.jpg",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
    {
      name: "Dr. Swaroop Vasudev",
      specialty: "Cardiologist",
      contact: "swaroopv@example.com",
      image: "/src/assets/swaroopv.jpg",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
    {
      name: "Dr. Rajshekhar Lal",
      specialty: "Opthamologist",
      contact: "rajshekharlal@example.com",
      image: "/src/assets/rajshekharlal.jpg",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
    {
      name: "Dr. Bhuvneshwar Kumar",
      specialty: "Neurologist",
      contact: "bhuvneshwarkumar@example.com",
      image: "/src/assets/bhuvi.jpg",
      meetLink: "https://meet.google.com/hwa-ofww-mvh"
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Diagnose the following symptoms and give me only the names of the diseases each in a new line, and nothing else: ${symptoms}`;
      const result = await model.generateContent(prompt);

      const diagnosisText = await result.response.text();
      const possibleDiseases = diagnosisText
        .split("\n")
        .map((disease) => disease.trim())
        .filter((disease) => disease); // Extract only the disease name and remove empty lines
      setDiagnosis(possibleDiseases);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultation-page container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Consultation</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Enter your symptoms</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md mb-4"
                rows="5"
                placeholder="Describe your symptoms here..."
              ></textarea>
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Diagnosis'}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {error && <p className="text-center text-red-500">{error}</p>}

          {diagnosis.length > 0 && (
            <div className="diagnosis-results bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Possible Diseases</h2>
              <ul className="list-disc list-inside">
                {diagnosis.map((disease, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    {disease}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="doctors-list mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Available Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full mb-4" />
              <p className="text-lg font-medium text-gray-800">{doctor.name}</p>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-blue-500">{doctor.contact}</p>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mt-4"
                onClick={() => window.open(doctor.meetLink, '_blank')}
              >
                Connect Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;