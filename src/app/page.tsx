import HeroBanner from '@/components/home/HeroBanner';
import { FeaturedLenses } from '@/components/home/FeaturedLenses';
import { Newsletter } from '@/components/home/NewsLetter';
import { FAQ } from '@/components/home/FAQ';
import { Testimonials } from '@/components/home/Testimonials';

export default async function Home() {
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
