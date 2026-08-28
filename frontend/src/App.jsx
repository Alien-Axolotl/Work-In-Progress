import { useState, useEffect } from 'react'
import { API_BASE } from "./api";
 
import './index.css'

function App() {

  const [health, setHealth] = useState('Unknown');

  const handleHealthCheck = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);

      if (!response.ok) {
        console.error(`Backend returned status: ${response.status}`);
        setHealth('Bad');
        return;
      }

      const data = await response.json();
      console.log("Backend is online:", data);
      setHealth('Good');

    } catch (error) {
      console.error("Couldn't reach the backend server:", error);
      setHealth('Bad');
    }
  };

  useEffect(() => {
    handleHealthCheck();

    const intervalId = setInterval(() => {
      handleHealthCheck();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-400 text-white gap-6 mt-3">

      <div className={`flex items-center justify-center h-32 w-96 px-4 text-2xl font-extrabold rounded-sm transition-all duration-300 ${
        health === 'Good' ? 'bg-green-300/20 ' : 'bg-red-900/40'
      }`}>
        {health === 'Good' ? 'Module Online, Doctor!' : 'Module Is Offline, Activating Sleep Mode :<'}
      </div>
    </div>
  )
}

export default App;