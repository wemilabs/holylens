import HeroBanner from '@/components/HeroBanner';
import LatestLenses from '@/components/LatestLenses';
import PurposeSection from '@/components/PurposeSection';

export default async function Home() {
	return (
		<>
			<HeroBanner />
			<main className='m-auto max-w-2xl lg:max-w-[78rem] p-6 rounded-md'>
				<LatestLenses />
				<PurposeSection />
			</main>
		</>
	);
}
