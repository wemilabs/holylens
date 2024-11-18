import { FAQ } from '@/components/home/faq';
import { FeaturedLenses } from '@/components/home/featured-lenses';
import HeroBanner from '@/components/home/hero-banner';
import { Newsletter } from '@/components/home/newsletter';
import { Testimonials } from '@/components/home/testimonials';

export default function Home() {
	return (
		<>
			<HeroBanner />
			<FeaturedLenses />
			<Testimonials />
			<Newsletter />
			<FAQ />
		</>
	);
}
