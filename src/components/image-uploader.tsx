import * as React from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { updateSettingImage } from "@/client/operations/settings";

export interface ImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: 'light' | 'dark';
  maxBytes?: number;
}

const supportTypes = "image/png, image/jpeg, image/svg, image/svg+xml";

const defaultMaxBytes = 2 * 1024 * 1024;

const ImageUploader = React.forwardRef<HTMLInputElement, ImageUploaderProps>(
  ({
     className,
     mode,
     maxBytes = defaultMaxBytes,
     value ,
     onChange,
     ...props
   },
   ref
  ) => {
    const [loading, setLoading] = React.useState(false);
    const [uploadedImagePath, setUploadImagePath] = React.useState<string>();
    const { toast } = useToast();

    const handleImageUpload = async (image: File) => {
      if (!image) return;
      setLoading(true);

      await updateSettingImage(image, onChange);

      setLoading(false);
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        if (file.size > maxBytes) {
          toast({
            variant: "destructive",
            description: "File size is too large.",
          });
          return;
        }
        await handleImageUpload(event.target.files[0]);
      }
    };

    return (
      <>
        <div className="mt-2 flex items-center gap-x-3">
          <div className={`${mode === 'dark' ? "bg-gray-900" : "bg-slate-200"} rounded-md relative h-12 w-12`}>
            {
              loading &&
              <div
                className={`${mode === 'dark' ? "bg-gray-900" : "bg-slate-200"} bg-opacity-70 absolute h-12 w-12 z-20 flex items-center justify-center rounded-sm overflow-hidden`}>
                <div className="h-4 w-4">
                  <Loader2 color={mode === 'dark' ? '#fafafa' : '#18181b'} className="mr-2 h-4 w-4 animate-spin"/>
                </div>
              </div>
            }
            <Avatar className="h-12 w-12 rounded-sm">
              <AvatarImage src={value as string || uploadedImagePath}/>
            </Avatar>
          </div>
          <Input ref={ref} type="file" accept={supportTypes} onChange={handleInputChange} {...props}/>
        </div>
      </>
    )
  }
)

ImageUploader.displayName = "ImageUploader"

export {ImageUploader}
