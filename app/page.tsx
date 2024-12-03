import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold mb-6 text-primary">
          Welcome to Workout Buddy
        </h1>
        <p className="text-xl mb-8 text-text">
          Your personal fitness companion
        </p>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">
              Quick Start
            </h2>
            <p className="text-text">
              Get started with your fitness journey today!
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">
              Featured Workouts
            </h2>
            <p className="text-text">
              Explore our curated list of effective workouts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">
              Track Your Progress
            </h2>
            <p className="text-text">
              Log your workouts and see your improvements over time.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
