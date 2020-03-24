
export interface IExtendedClassNames {
    chooseFileButton?: string;
    defaultPicture?: string;
    deleteImage?: string;
    errorsContainer?: string;
    fileActions?: string;
    fileContainer?: string;
    fileContent?: string;
    fileErrorMessage?: string;
    fileInput?: string;
    fileLabel?: string;
    flipMoveContainer?: string;
    fileUploader?: string;
    uploadFileButton?: string;
    uploadPicture?: string;
    uploadPictureContainer?: string;
    uploadPicturesWrapper?: string;
}

export interface IImageUploaderProps {
    buttonText: string;
    extendedClassNames: IExtendedClassNames;
    imgExtension: Array<string>;
    label: string;
    maxFileSize: number;
    onChange: (pictures: Array<string>, files: Array<File>) => void;
    onUpload: (file: File) => void;
    singleImage: boolean;
    withLabel: boolean;
}

declare const ImageUploader: (props: IImageUploaderProps) => JSX.Element

declare module 'beanloop-image-uploader' {}
export default ImageUploader;