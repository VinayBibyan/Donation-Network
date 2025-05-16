
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import needService from "../services/needService";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../components/need/LoadingState";
import ErrorState from "../components/need/ErrorState";
import NeedHeader from "../components/need/NeedHeader";
import NeedDescription from "../components/need/NeedDescription";
import OwnerActions from "../components/need/OwnerActions";
import OfferHelp from "../components/need/OfferHelp";

const NeedDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: need, isLoading, error } = useQuery({
    queryKey: ['need', id],
    queryFn: () => needService.getNeedById(id || ''),
    enabled: !!id
  });
  
  // Fix: Use _id instead of id for the user object
  const isOwner = user && need && user._id === need.recipientId;
  
  const updateNeedStatus = async (isActive: boolean) => {
    if (id) {
      await needService.updateNeedStatus(id, isActive);
      queryClient.invalidateQueries({ queryKey: ['need', id] });
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }
  
  if (error || !need) {
    return (
      <Layout>
        <ErrorState />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <NeedHeader need={need} />
            <NeedDescription need={need} />
            
            {isOwner && <OwnerActions need={need} updateNeedStatus={updateNeedStatus} />}
            
            {!isOwner && <OfferHelp need={need} isAuthenticated={isAuthenticated} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NeedDetail;
