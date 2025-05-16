
import { Button } from "@/components/ui/button";

const ErrorState = () => {
  return (
    <div className="container py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Request Not Found</h2>
      <p className="mb-6">The request you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <a href="/needs">Browse Other Requests</a>
      </Button>
    </div>
  );
};

export default ErrorState;
