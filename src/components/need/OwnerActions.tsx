
import StatusToggle from "../StatusToggle";
import { NeedListing } from "@/types/models";

interface OwnerActionsProps {
  need: NeedListing;
  updateNeedStatus: (isActive: boolean) => Promise<void>;
}

const OwnerActions = ({ need, updateNeedStatus }: OwnerActionsProps) => {
  return (
    <div className="border-t pt-4">
      <h3 className="font-medium mb-3">Request Status</h3>
      <StatusToggle 
        isActive={!need.isFulfilled}
        onChange={updateNeedStatus}
        activeLabel="Active"
        inactiveLabel="Fulfilled"
        isItem={false}
      />
    </div>
  );
};

export default OwnerActions;
