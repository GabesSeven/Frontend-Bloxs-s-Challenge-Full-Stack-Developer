import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/user-data'); // Substitua com a rota adequada da sua API
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Exibir informações do usuário */}
      <p>Olá Mundo!</p>
    </div>
  );
};

export default UserDetails;
