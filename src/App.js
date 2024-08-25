import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
   const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await axios.post(`https://bajaj-backend-nu-umber.vercel.app/bfhl`, { data: parsedData.data });
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error.message);
      setResponse({ status: 'failure', reason: 'Invalid JSON format or server error' });
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('alphabets') && (
          <p>Alphabets: {response.alphabets?.join(', ') || 'N/A'}</p>
        )}
        {selectedOptions.includes('numbers') && (
          <p>Numbers: {response.numbers?.join(', ') || 'N/A'}</p>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet?.join(', ') || 'N/A'}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Challenge</h1>
      
      <textarea
        className="w-full max-w-lg h-32 p-2 border border-gray-300 rounded mb-4"
        placeholder='Enter JSON like { "data": ["A", "b", "1", "C", "z", "2"] }'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {response && (
        <div className="w-full max-w-lg bg-white p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Response</h2>
          <div className="mb-4">
            <input
              type="checkbox"
              id="alphabets"
              onChange={() => handleOptionChange('alphabets')}
              checked={selectedOptions.includes('alphabets')}
            />
            <label htmlFor="alphabets" className="ml-2">Alphabets</label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="numbers"
              onChange={() => handleOptionChange('numbers')}
              checked={selectedOptions.includes('numbers')}
            />
            <label htmlFor="numbers" className="ml-2">Numbers</label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="highest_lowercase_alphabet"
              onChange={() => handleOptionChange('highest_lowercase_alphabet')}
              checked={selectedOptions.includes('highest_lowercase_alphabet')}
            />
            <label htmlFor="highest_lowercase_alphabet" className="ml-2">Highest Lowercase Alphabet</label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
