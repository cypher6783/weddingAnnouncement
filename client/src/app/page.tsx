import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Story />
      <Gallery />
      <EventDetails />
      <RSVPForm />
      <Footer />
    </main>
  );
}
