import { OurFileRouter } from '@/app/api/uploadthing/core';
import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
  generateReactHelpers,
} from '@uploadthing/react';

export const Uploader = generateUploader<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
