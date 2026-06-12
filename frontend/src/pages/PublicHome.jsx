import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default PublicHome;
