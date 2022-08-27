import React from 'react';
import './App.css';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Footer from './Components/Layout/Footer/Footer';
import Dashboard from './Components/Layout/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Header />
      <Main />
      <Footer />

    </div>
  );
}

export default App;
