// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from './components/Login';
// import UserDetails from './components/UserDetails';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route path="/user-details" component={UserDetails} />
//         {/* Adicione outras rotas conforme necessário */}
//       </Switch>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Trocando o import

import Login from './components/Login';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes> {/* Mudando de Switch para Routes */}
        <Route path="/" element={<Login />} /> {/* Usando element ao invés de component */}
        <Route path="/user-details" element={<UserDetails />} /> {/* Usando element ao invés de component */}
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;