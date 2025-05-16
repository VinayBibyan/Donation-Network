
import { Badge } from "@/components/ui/badge";
import { NeedListing } from "@/types/models";

interface NeedHeaderProps {
  need: NeedListing;
}

const NeedHeader = ({ need }: NeedHeaderProps) => {
  const urgencyColor = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800"
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Badge className="bg-donation-primary hover:bg-donation-secondary">
          {need.category}
        </Badge>
        <Badge variant="outline" className={urgencyColor[need.urgency]}>
          {need.urgency} Priority
        </Badge>
        {need.isFulfilled && (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Fulfilled
          </Badge>
        )}
      </div>
      <h1 className="text-2xl font-bold">{need.title}</h1>
    </div>
  );
};

export default NeedHeader;
