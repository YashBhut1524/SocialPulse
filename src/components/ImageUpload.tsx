"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    if (value) {
        return (
            <div className="relative size-40">
                <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                >
                    <XIcon className="h-4 w-4 text-white" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
            appearance={{
                label: "text-sm text-gray-500",
                allowedContent: "text-xs text-gray-400 mt-1",
                container: "border border-dashed border-gray-300 p-4 rounded-md hover:border-gray-500 transition-all duration-200 h-[30vh]",
                uploadIcon: "text-blue-500",
                button: "bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm",
            }}
            config={{
                mode: "auto", // or "manual" if you want to handle uploads programmatically
            }}
        />
    );
}

export default ImageUpload;
