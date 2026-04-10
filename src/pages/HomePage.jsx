import Hero from '../components/Hero';
import RotatingDishes from '../components/RotatingDishes';
import StorySection from '../components/StorySection';
import VillageAuthenticity from '../components/VillageAuthenticity';
import CTABanner from '../components/CTABanner';
import CustomerReviews from '../components/CustomerReviews';

export default function HomePage() {
  return (
    <>
      <Hero />
      <RotatingDishes />
      <StorySection />
      <VillageAuthenticity />
      <CTABanner />
      <CustomerReviews />
    </>
  );
}
