import FlowNavbar from './components/FlowNavbar';
import FlowHero from './components/FlowHero';
import FlowFeatures from './components/FlowFeatures';
import FlowPricing from './components/FlowPricing';
import FlowCTA from './components/FlowCTA';
import FlowFooter from './components/FlowFooter';

export default function FlowPage() {
  return (
    <div className="bg-[#050508] text-[#F1F5F9] overflow-x-hidden">
      <FlowNavbar />
      <FlowHero />
      <FlowFeatures />
      <FlowPricing />
      <FlowCTA />
      <FlowFooter />
    </div>
  );
}
