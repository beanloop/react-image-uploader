import React from 'react'
import TestRenderer from 'react-test-renderer';
import ImageUploader from '../src/ImageUploader'

describe('<ImageUploader />', () => {
    const container = <ImageUploader 
        buttonText={'Choose Image'}
        extendedClassNames={{}} // Leave empty object to not use any extenede class names
        imgExtension={['.jpg', '.jpeg']}
        label={'Max file siz: , valid extensions jpg|jpeg'}
        maxFileSize={1}
        onChange={() => 123}
        onUpload={() => '123'}
        singleImage={true}
        withLabel={true}
    />

    test('Should render component', () => {
        const testRenderer = TestRenderer.create(container);
        const rootImageUploader = testRenderer.root.findByType(ImageUploader)
        const EXPECTED_PROPS = {
            buttonText: 'Choose Image',
            extendedClassNames: {},
            imgExtension: [ '.jpg', '.jpeg' ],
            label: 'Max file siz: , valid extensions jpg|jpeg',
            maxFileSize: 1,
            singleImage: true,
            withLabel: true
        }
        expect(rootImageUploader.props.buttonText).toEqual(EXPECTED_PROPS.buttonText)
        expect(rootImageUploader.props.extendedClassNames).toEqual(EXPECTED_PROPS.extendedClassNames)
        expect(rootImageUploader.props.imgExtension).toEqual(EXPECTED_PROPS.imgExtension)
        expect(rootImageUploader.props.label).toEqual(EXPECTED_PROPS.label)
        expect(rootImageUploader.props.maxFileSize).toEqual(EXPECTED_PROPS.maxFileSize)
        expect(rootImageUploader.props.singleImage).toEqual(EXPECTED_PROPS.singleImage)
        expect(rootImageUploader.props.withLabel).toEqual(EXPECTED_PROPS.withLabel)

        expect(rootImageUploader.props.onChange()).toEqual(123)
        expect(rootImageUploader.props.onUpload()).toEqual('123')
    })

    const defaultElementsRendered = [
        'FileUploader',
        'FileContainer',
        'FileContent', 
        'FileActions', 
        'ErrorsContainer', 
        'ChooseFileButton',
        'FileInput',
        'DefaultPicture',
        'UploadPicturesWrapper'
    ]

    const notDefaultElementsRendered = [
        'UploadFileButton',
        'UploadPictureContainer',
        'DeleteImage',
        'UploadPicture',
        'FileErrorMessage'
    ]

    defaultElementsRendered.forEach((element) => {
        test(`Should render ${element} element`, () => {
            const testRenderer = TestRenderer.create(container);
            const elementRendered = testRenderer.root.findByProps({id: element})
            expect(elementRendered).toBeDefined()
        })
    })

    notDefaultElementsRendered.forEach((element) => {
        test(`Should not render ${element} from start`, () => {
            const testRenderer = TestRenderer.create(container);
            try {
                testRenderer.root.findByProps({id: element})
                expect(true).toBe(false)
            } catch (error) {
                expect(error.message).toEqual(`No instances found with props: {"id":"${element}"}`)
            }
        })
    })
})