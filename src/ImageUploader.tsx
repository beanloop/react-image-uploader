/* eslint react/prop-types: 0 */

import React, { useState } from 'react'
import {
  ChooseFileButton, 
  DefaultPicture, 
  DeleteImage, 
  ErrorsContainer, 
  FileActions, 
  FileContainer, 
  FileContent,
  FileErrorMessage, 
  FileInput, 
  FileLabel, 
  FileUploader, 
  FlipMoveContainer, 
  UploadFileButton, 
  UploadPicture, 
  UploadPictureContainer, 
  UploadPicturesWrapper
} from './styles'

/**
 * Contant variable for the error type
 */
const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
}

/**
 * Interface for the extended css classes
 * 
 * @interface
 * 
 * @property string chooseFileButton - Css class name for Choose File Button
 * @property string defaultPicture - Css class name for Default picture
 * @property string deleteImage - Css class name for Delete image button
 * @property string errorsContainer - Css class name for Error message container
 * @property string fileActions - Css class name for containter containing choose file button and label
 * @property string fileContainer - Css class name for container containing fileContent and fileActions
 * @property string fileContent - Css class name for container containing the picture
 * @property string fileErrorMessage - Css class name for error messages
 * @property string fileInput - Css class name for file input field
 * @property string fileLabel - Css class name for file label
 * @property string flipMoveContainer - Css class name for container for the flip move animation
 * @property string fileUploader - Css class name for the parent container
 * @property string uploadFileButton - Css class name for upload file button
 * @property string uploadPicture - Css class name for uploaded picture
 * @property string uploadPictureContainer - Css class name for container containing the uploaded picture
 * @property string uploadPicturesWrapper - Css class name for wrapper containing the flip move picture
 * 
 */
interface IExtendedClassNames {
  chooseFileButton?: string,
  defaultPicture?: string,
  deleteImage?: string,
  errorsContainer?: string,
  fileActions?: string,
  fileContainer?: string,
  fileContent?: string,
  fileErrorMessage?: string,
  fileInput?: string,
  fileLabel?: string,
  flipMoveContainer?: string,
  fileUploader?: string,
  uploadFileButton?: string,
  uploadPicture?: string
  uploadPictureContainer?: string,
  uploadPicturesWrapper?: string,
}

/**
 * Interface of the component props
 * 
 * @interface
 * @property string buttonText - Button text for button
 * @property IExtendedClassNames extendedClassNames - Object with extended class names for css extension
 * @property Array<string> imgExtension - Array with the valid file extensions
 * @property string label - The label shown above the button
 * @property number maxFileSize - Max size for files, in bytes
 * @property function onChange - Function that handles on change events on the input field
 * @property function onUpload - Function to handle upload event
 * @property boolean singleImage - If the component will just handle a single image
 * @property boolean withLabel - If the label should be shown
 */
interface IImageUploaderProps {
  buttonText: string,
  extendedClassNames: IExtendedClassNames
  imgExtension: Array<string>,
  label: string,
  maxFileSize: number,
  onChange: (pictures:Array<string>, files:Array<File>) => void,
  onUpload: (file:File) => void,
  singleImage: boolean,
  withLabel: boolean,
}

/**
 * Interface for the File error object
 * 
 * @interface
 * @property string name - File name
 * @property string type - Error type
 */
interface IFileError {
  name: string,
  type: string
}

/**
 * Interface for the return object from ReadFile()
 * 
 * @interface
 * @property File file - Image file
 * @property string imageURL - base64 encoded string of the image
 */
interface IReadFile {
  file: File,
  imageURL: string
}

/**
 * Image Uploader Component
 * @param Object IImageUploaderProps
 * @returns JSX:Element
 */
const ImageUploader = (props:IImageUploaderProps): JSX.Element => {
    const [pictures, setPictures] = useState<Array<string>>([])
    const [files, setFiles] = useState<Array<File>>([])
    const [fileErrors, setFileErrors] = useState<Array<IFileError>>([])
    const [inputElement, setInputElement] = useState<HTMLInputElement | null>()

    const extendedClassNames = { ...props.extendedClassNames }

    /**
     * 
     * 
     * Validation Functions
     * 
     * 
     */

    /**
     * Check if file has the right extension
     * @param string fileName - The file name
     * @return boolean 
     */
    const hasExtension = (fileName:string): boolean => {
      const pattern = '(' + props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
      return new RegExp(pattern, 'i').test(fileName);
    }

    /**
     * Check if the file has the right extension and is not too big
     * @param File file - The uploaded file
     * @return string | null
     */
    const checkExtensionAndFileSizeError = (file:File): string|null => {
      let error;
      error = !hasExtension(file.name) ? ERROR.NOT_SUPPORTED_EXTENSION : null
      error = file.size > props.maxFileSize ? ERROR.FILESIZE_TOO_LARGE : null

      return error
    }



    /**
     * 
     * 
     * Action Functions
     * 
     * 
     */

    /**
     * Removes the image from the input
     * @param string picture - The image as a base64 encoded string
     * @return void
     */
    const removeImage = (picture:string): void => {
      // The function is prepared for several uploaded images but will configure for just one 
      const removedIndex = pictures.findIndex(p => p === picture)
      const updatedPictures = pictures.filter((p, index) => index !== removedIndex)
      const updatedFiles = files.filter((f, index) => index !== removedIndex)

      setPictures(updatedPictures)
      setFiles(updatedFiles)
      props.onChange(pictures, files)
    }

    /**
     * Trigger upload button
     * @return void
     */
    const triggerFileUpload = (): void => {
      if (inputElement)
        inputElement.click()
    }

    /**
     * Reads the File and encodes the image as a base64 encoded string
     * @param File file - The uploaded file
     * @return Promise<IReadFile>
     */
    const readFile = (file:File): Promise<IReadFile> => {
      return new Promise((resolve) => {
        const fileReader = new FileReader()

        fileReader.onload = (event:any) => {
          let imageURL = event.target.result
          imageURL = imageURL.replace(";base64", `;name=${file.name};base64`)
          resolve({file, imageURL})
        }

        fileReader.readAsDataURL(file)
      })
    }

    /**
     * Resets the input field
     * @param event - The event from the input field
     * @return void
     */
    const onUploadClick = (event:any): void => {
      event.target.value = null
    }

    /**
     * Processes the file uploaded to the input filed. Trigger on changes.
     * @param event - The event from the input field
     * @return void
     */
    const onDropFile = (event:any): void => {
      const targetFiles: Array<File> = Object.values(event.target.files)
      const fileErrors: Array<IFileError> = []

      const allFilePromises: Array<Promise<IReadFile>> = targetFiles.filter((file:File) => {
        const error = checkExtensionAndFileSizeError(file)
        if (error) {
          fileErrors.push({
            name: file.name,
            type: error
          } as IFileError)
          return false
        }

        return true
      }).map((file:File) => {
        return readFile(file)
      })

      setFileErrors(fileErrors)

      Promise.all(allFilePromises).then(newPictureFile => {
        const stateImageUrls = props.singleImage ? [] : pictures.slice()
        const stateFiles = props.singleImage ? [] : files.slice()

        newPictureFile.forEach(data => {
          stateImageUrls.push(data.imageURL)
          stateFiles.push(data.file)
        })

        setPictures(stateImageUrls)
        setFiles(stateFiles)
      })
    }

    
    /**
     * 
     * 
     * Render Functions
     * 
     * 
     */

     /**
      * Render the provided label if provided
      * @returns JSX.Element | void
      */
    const renderLabel = (): JSX.Element|void => {
      if (props.withLabel) {
        return <FileLabel className={extendedClassNames.fileLabel} id="FileLabel">{props.label}</FileLabel>
      }
    }

    /**
     * Render error messages if any
     * @returns Array<JSX.Element>
     */
    const renderErrors = (): Array<JSX.Element> => {
      return fileErrors.map((fileError: IFileError, index) => {
        return (
          <FileErrorMessage className={extendedClassNames.fileErrorMessage} key={index} id="FileErrorMessage">
            * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? ' file size is too big' : ' is not a supported file extension'}
          </FileErrorMessage>
        );
      });
    }

    /**
     * Renders a preview of the picture
     * @returns JSX.Element
     */
    const renderPreviewPicture = (): JSX.Element => {
      return (
        <UploadPicturesWrapper className={extendedClassNames.uploadPicturesWrapper} id="UploadPicturesWrapper">
          <FlipMoveContainer className={extendedClassNames.flipMoveContainer} >
            { _renderPicture() }
          </FlipMoveContainer>
        </UploadPicturesWrapper>
      )
    }

    /**
     * Helper function to render an uploaded picture or a default picture
     * @returns Array<JSX.Element>|JSX.Element
     */
    const _renderPicture = (): Array<JSX.Element>|JSX.Element => {
      if (pictures.length) {
        return (
          pictures.map((picture, index) => {
            return (
              <UploadPictureContainer key={index} className={extendedClassNames.uploadPictureContainer} id="UploadPictureContainer">
                <DeleteImage className={extendedClassNames.deleteImage} onClick={() => removeImage(picture)} id="DeleteImage">X</DeleteImage>
                <UploadPicture className={extendedClassNames.uploadPicture} src={picture} alt="preview" id="UploadPicture"/>
              </UploadPictureContainer>
            )
          })
        )
      }

      return (
        <DefaultPicture className={extendedClassNames.defaultPicture} id="DefaultPicture">
          No Picture uploaded
        </DefaultPicture>
      )
    }

    
    return (
        <FileUploader className={extendedClassNames.fileUploader} id="FileUploader">
            <FileContainer className={extendedClassNames.fileContainer} id="FileContainer">
              <FileContent className={extendedClassNames.fileContent} id="FileContent">
                { renderPreviewPicture() }
              </FileContent>
              <FileActions className={extendedClassNames.fileActions} id="FileActions">
                {renderLabel()}
                <ErrorsContainer className={extendedClassNames.errorsContainer} id="ErrorsContainer"> {renderErrors()} </ErrorsContainer>
                {!pictures.length ?
                  <ChooseFileButton className={extendedClassNames.chooseFileButton} type='button' onClick={triggerFileUpload} id="ChooseFileButton">{props.buttonText}</ChooseFileButton>  
                :
                  <UploadFileButton className={extendedClassNames.uploadFileButton} type='button' onClick={() => props.onUpload(files[0])} id="UploadFileButton">Upload Picture</UploadFileButton>
                }
                <FileInput
                    type="file"
                    ref={(input:HTMLInputElement | null) => setInputElement(input)}
                    className={extendedClassNames.fileInput}
                    name="imageInput"
                    multiple={!props.singleImage}
                    onChange={onDropFile}
                    onClick={onUploadClick}
                    accept="image/*"
                    id="FileInput"
                />
              </FileActions>
            </FileContainer>
        </FileUploader>
    )
}

export default ImageUploader