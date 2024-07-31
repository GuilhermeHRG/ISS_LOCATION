import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import Footer from './components/footer'; 


const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

interface Astronaut {
  name: string;
}

const App: React.FC = () => {
  const [issPosition, setIssPosition] = useState<LatLngExpression>([0, 0]);
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await axios.get('http://api.open-notify.org/iss-now.json');
        const { latitude, longitude } = response.data.iss_position;
        setIssPosition([latitude, longitude]);
      } catch (error) {
        console.error('Error fetching ISS position:', error);
      }
    };

    const fetchAstronauts = async () => {
      try {
        const response = await axios.get('http://api.open-notify.org/astros.json');
        setAstronauts(response.data.people);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    fetchISSPosition();
    fetchAstronauts();
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
  ];

  return (
    <div className="flex flex-col items-center w-full text-center uppercase bg-slate-600 text-white p-2 h-screen">
      <h1 className="text-2xl mb-4"> ISS Location</h1>
      
      <MapContainer center={issPosition} zoom={3} style={{ height: '500px', width: '100%', borderRadius:18 }} className="mb-4">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={issPosition} icon={issIcon} />
        <Circle center={issPosition} radius={200000} />
      </MapContainer>
      <h2 className="text-xl mb-2">Pessoas no Espaço</h2>
      <p className="mb-4">Número de pessoas no espaço: {astronauts.length}</p>
      <ul className='columns-4 text-black bg-white w-full p-4 rounded mb-2 text-center justify-center items-center font-bold'>
        {astronauts.map((astronaut) => (
          <li key={astronaut.name} className="mb-1">{astronaut.name}</li>
        ))}
      </ul>
      <Footer socialLinks={socialLinks} copyright="Guilherme Guelere &copy; 2024"  /> 
    </div>
  );
};

export default App;
