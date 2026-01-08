import StoryCard from "./StoryCard";

interface Story {
  id: number;
  category: string;
  title: string;
  date: string;
  story: string;
  isHighRisk: boolean;
  isVerified: boolean;
}

export default function SavedStories({ stories }: { stories: Story[] }) {
  return (
    <section>
      <h3 className="font-serif text-2xl text-amber-800 mb-4">
        Your Saved Stories
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
