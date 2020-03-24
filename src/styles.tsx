import styled from 'styled-components'
import FlipMove from 'react-flip-move'

export const FileUploader = styled.div`

`
export const FileContainer = styled.div`
    background: #fff;
    // box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
    // border-radius: 10px;
    position: relative;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row§s;
    margin: 10px auto;
    transition: all 0.3s ease-in;
`
export const FileActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ErrorsContainer = styled.div`
    max-width: 300px;
    font-size: 12px;
    color: red;
    text-align: left;
`
export const FileContent = styled.div`
    width: 20%;
    margin-right: 5%;
    min-width: 150px;
`
const _FileButton = styled.button`
    padding: 8px;
    border-radius: 8px;
    color: white;
    font-weight: 300;
    font-size: 75%;
    margin: 10px 0;
    transition: all 0.2s ease-in;
    cursor: pointer;
    outline: none;
    border: none;
    width: 60%;
`
export const ChooseFileButton = styled(_FileButton)`
    background: #ec8f8f;

    :hover {
        background: #a05555;
    }
`
export const UploadFileButton = styled(_FileButton)`
    background: #57ca96;
    color: black;
    :hover {
        background: #37986c;
    }
`
export const FileLabel = styled.p`
    font-size: 75%;
    margin: 8px 0 4px;
`
export const FileErrorMessage = styled.div`
    
`
export const FileInput = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`
export const UploadPicturesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`
export const FlipMoveContainer = styled(FlipMove)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`
export const UploadPictureContainer = styled.div`
    width: 100%;
    padding: 10px;
    background: #edf2f6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid #d0dbe4;
    position: relative;
`
export const DeleteImage = styled.div`
    position: absolute;
    top: -9px;
    right: -9px;
    color: #fff;
    background: #ff4081;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    font-size: 26px;
    font-weight: bold;
    line-height: 30px;
    width: 30px;
    height: 30px;
`
export const UploadPicture = styled.img`
    width: 100%;
`
export const DefaultPicture = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #efcece;
    justify-content: center;
    background-color: #f1e5e56e;
`
