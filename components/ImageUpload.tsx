import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiImage, FiUploadCloud } from "react-icons/fi";

interface DropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
  const [base64, setBase64] = useState(value);

  useEffect(() => {
    setBase64(value);
  }, [value]);

  const handleChange = useCallback((base64: string) => {
    onChange(base64);
  }, [onChange]);

  const handleDrop = useCallback((files: any) => {
      const file = files[0]
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
  }, [handleChange])

  const { getRootProps, getInputProps } = useDropzone({ 
    maxFiles: 1, 
    onDrop: handleDrop, 
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    } 
  });

  return ( 
    <div {...getRootProps({
      className: `group flex min-h-[112px] w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#3a444f] bg-[#0d1116] p-4 text-center transition hover:border-sky-400/60 hover:bg-sky-400/[0.03] focus:outline-none focus:ring-2 focus:ring-sky-400 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`,
      role: 'button',
      'aria-label': label,
    })}>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center gap-4">
          <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image
              src={base64}
              fill
              sizes="72px"
              alt="Uploaded image"
              className="object-cover"
            />
          </span>
          <div className="text-left">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <FiImage aria-hidden="true" /> Image selected
            </p>
            <p className="mt-1 text-xs text-[#71808e]">Click or drop a file to replace it</p>
          </div>
        </div>
      ) : (
        <div>
          <FiUploadCloud className="mx-auto text-sky-400" size={24} aria-hidden="true" />
          <p className="mt-2 text-sm font-medium text-white">{label}</p>
          <p className="mt-1 text-xs text-[#71808e]">PNG or JPG</p>
        </div>
      )}
    </div>
   );
}
 
export default ImageUpload;
