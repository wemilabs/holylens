export default function AboutPage() {
	return (
		<div className='py-1 pb-14 px-6 md:px-14 space-y-12'>
			<div className='text-wrap max-w-2xl pt-14'>
				<h1 className='text-4xl lg:text-6xl font-semibold lg:font-medium'>
					Surely, everyone has a story to tell.
				</h1>
			</div>

			<div className='text-lg max-w-3xl flex flex-col space-y-6 items-center justify-start leading-8'>
				<p>
					HolyLens is a home for human stories and ideas. Here, anyone can share
					insightful perspectives, useful knowledge, and life wisdom with the
					world—without building a mailing list or a following first. The
					internet is noisy and chaotic; HolyLens is quiet yet full of insight.
					It’s simple, beautiful, collaborative, and helps you find the right
					audience for whatever you have to say.
				</p>
				<p>
					We believe that what you read and write matters. Words can divide or
					empower us, inspire or discourage us. In a world where the most
					sensational and surface-level stories often win, we’re building a
					system that rewards depth, nuance, and time well spent. A space for
					thoughtful conversation more than drive-by takes, and substance over
					packaging.
				</p>
				<blockquote className=' whitespace-pre-wrap p-4 md:px-6 bg-blue-200 border-l-4 border-blue-500'>
					Ultimately, our goal is to deepen our collective understanding of the
					world through the power of writing.
				</blockquote>
				<p>
					Over 100 million people connect and share their wisdom on HolyLens
					every month. Many are professional writers, but just as many
					aren’t — they’re CEOs, computer scientists, U.S. presidents, amateur
					novelists, and anyone burning with a story they need to get out into
					the world. They write about what they’re working on, what’s keeping
					them up at night, what they’ve lived through, and what they’ve learned
					that the rest of us might want to know too.
				</p>
				<p>
					Instead of selling ads or selling your data, we’re supported by a
					growing community of HolyLens members who align with our mission. If
					you’re new here, start exploring. Dive deeper into whatever matters to
					you. Find a post that helps you learn something new, or reconsider
					something familiar—and then share your own story.
				</p>
			</div>
		</div>
	);
}
