
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import itemService from "../services/itemService";
import needService from "../services/needService";
import ItemCard from "../components/ItemCard";
import NeedCard from "../components/NeedCard";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().optional(),
  image: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['user-items'],
    queryFn: () => itemService.getUserItems(),
    enabled: !!isAuthenticated
  });

  const { data: userNeeds = [], isLoading: needsLoading } = useQuery({
    queryKey: ['user-needs'],
    queryFn: () => needService.getUserNeeds(),
    enabled: !!isAuthenticated
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      location: user?.location || "",
      image: user?.image || "",
    }
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);
      await updateProfile({
        name: data.name,
        location: data.location,
        image: data.image,
      });
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      {...register("location")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      {...register("image")}
                    />
                    <div className="mt-4 flex justify-center">
                      <img 
                        src={user?.image || "/placeholder.svg"} 
                        alt={user?.name || "Profile"} 
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-donation-primary hover:bg-donation-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="donated" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="donated">My Donations</TabsTrigger>
                <TabsTrigger value="requested">My Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="donated" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Items I've Donated</h2>
                  <Button asChild className="bg-donation-primary hover:bg-donation-secondary">
                    <a href="/items/add">+ Donate New Item</a>
                  </Button>
                </div>
                
                {itemsLoading ? (
                  <div className="text-center py-12">
                    <div className="spinner h-12 w-12 mx-auto mb-4"></div>
                    <p>Loading your donations...</p>
                  </div>
                ) : userItems.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600 mb-4">You haven't donated any items yet.</p>
                    <Button asChild className="bg-donation-primary hover:bg-donation-secondary">
                      <a href="/items/add">Donate an Item</a>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userItems.map(item => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="requested" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Items I've Requested</h2>
                  <Button asChild className="bg-donation-primary hover:bg-donation-secondary">
                    <a href="/needs/add">+ Request New Item</a>
                  </Button>
                </div>
                
                {needsLoading ? (
                  <div className="text-center py-12">
                    <div className="spinner h-12 w-12 mx-auto mb-4"></div>
                    <p>Loading your requests...</p>
                  </div>
                ) : userNeeds.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600 mb-4">You haven't requested any items yet.</p>
                    <Button asChild className="bg-donation-primary hover:bg-donation-secondary">
                      <a href="/needs/add">Request an Item</a>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userNeeds.map(need => (
                      <NeedCard key={need.id} need={need} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
