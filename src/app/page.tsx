import HeroBanner from '@/components/HeroBanner';
import { FeaturedLenses } from '@/components/FeaturedLenses';
import { Newsletter } from '@/components/NewsLetter';

export default async function Home() {
	return (
		<>
			<HeroBanner />
			<FeaturedLenses />
			<Newsletter />
		</>
	);
}
