"use client";
import useIsMounted from "@/hooks/use-is-mounted";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { Button } from "@/components/ui/Button";

declare global {
  var cloudinary: any;
}
type Props = {
  onChange: (imageSrc: string) => void;
  value: string[];
  disabled?: boolean;
  onRemove: (imageSrc: string) => void;
};

export default function ImageUpload({
  onChange,
  value,
  onRemove,
  disabled,
}: Props) {
  const isMounted = useIsMounted();
  const onUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((imageSrc) => (
          <div
            key={imageSrc}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(imageSrc)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={imageSrc} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={onUpload}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={onClick}
              variant="secondary"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
