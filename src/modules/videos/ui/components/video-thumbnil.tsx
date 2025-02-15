import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface VideoThumbnailProps {
  imageUrl?: string | null;
  previewUrl: string | null;
  title: string;
  duration: number;
}

export const VideoThumbnail = ({
  imageUrl,
  title,
  previewUrl,
  duration
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail Wrapper  */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-auto">
        <Image
          src={imageUrl ?? "/placeholder.jpg"}
          alt={title}
          height={40}
          width={40}
          className="size-full object-cover group-hover:opacity-0"
        />

        <Image
          src={previewUrl ?? "/placeholder.jpg"}
          alt={title}
          fill
          className="size-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Video Duration  box  */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
      {formatDuration(duration)}

      </div>
    </div>
  );
};
