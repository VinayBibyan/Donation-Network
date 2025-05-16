
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  defaultImage?: string;
  className?: string;
}

const ImageUpload = ({ onChange, defaultImage, className = "" }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) {
      setPreview(defaultImage);
      onChange(null);
      return;
    }
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc)');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    onChange(file);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label htmlFor="image-upload">Image</Label>
      
      <div className="flex flex-col items-center space-y-4">
        {preview ? (
          <div className="relative w-full max-w-[300px] aspect-square mb-2 rounded-md overflow-hidden">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2 opacity-80"
              onClick={() => {
                setPreview(undefined);
                onChange(null);
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-[300px] aspect-square bg-gray-100 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300">
            <Image className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Upload an image</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        )}
        
        <div className="w-full">
          <Label 
            htmlFor="image-upload" 
            className="cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Upload className="h-4 w-4" />
            <span>{preview ? 'Change image' : 'Upload image'}</span>
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
