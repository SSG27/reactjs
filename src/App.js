import { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './App.css';

function App() {
  const [inputs, setInputs] = useState({});
  const [responseData, setResponseData] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/title',
    params: {
      title: inputs.movietitle,
      country:inputs.moviecountry,
      show_type: 'all',
      output_language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': '40ca44c84bmsh145b9b00a4acff0p1bac6cjsne48e70272caf',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    setResponseData(response.data);
  } catch (error) {
    console.error(error);
  }
}

	return (
    <section
    style={{
      fontFamily: '-apple-system',
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#292b2c",
      backgroundColor: "#fff",
      padding: "0 2em"
    }}
  >
    <div
      style={{
        textAlign: "center",
        maxWidth: "950px",
        margin: "0 auto",
        border: "1px solid #e6e6e6",
        padding: "40px 25px",
        marginTop: "50px"
      }}
    >
      <img
        src="https://www.pngmart.com/files/5/Movie-PNG-Transparent-Image.png"
        alt="Tammy Stevens"
        style={{
          margin: "-90px auto 30px",
          width: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0"
        }}
      />
      <div>
        <p
          style={{
            lineHeight: 1.5,
            fontWeight: 300,
            marginBottom: "25px",
            fontSize: "1.375rem"
          }}
        >
          Your one stop search for movies to watch.
        </p>
      </div>
      <p
        style={{
          marginBottom: "0",
          fontWeight: 600,
          fontSize: "1rem"
        }}
      >
        Made By
        <span style={{ fontWeight: 400 }}> · Sanju Ghandhi</span>
      </p>
    </div>
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>Enter the movie title: 
        <input type="text" 
        name = "movietitle"
        value={inputs.movietitle || ""} 
        onChange={handleChange}
        />
      </label>
      <br></br>
      <label>Enter the two letter country code (e.g UK): 
        <input type="text" 
        name = "moviecountry"
        value={inputs.moviecountry || ""} 
        onChange={handleChange}
        />
      </label>
      <br></br>
      <input type="submit" />
    </form>

    {/* Display the API response */}
    {responseData && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </section>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
