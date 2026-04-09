import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Reviews from './components/Reviews.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import BookingConfirmation from './components/BookingConfirmation.jsx';
import './App.css';

function App() {
  const [confirmacion, setConfirmacion] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <Reviews />
      <Booking onReservaExitosa={setConfirmacion} />
      {confirmacion && (
        <BookingConfirmation
          datos={confirmacion}
          onCerrar={() => setConfirmacion(null)}
        />
      )}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
