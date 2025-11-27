import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor';

import {
  PanelBody,
  TextControl,
  TextareaControl,
  Button,
  RangeControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    subtitle,
    content,
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    mainImage, 
    videoUrl,
    sectionColor,
    paddingTop,
    paddingBottom,
    titleFontSize,
    subtitleFontSize
  } = attributes;

  const blockProps = useBlockProps({
    className: "max-w-container-wide mx-auto px-4 py-16"
  });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="Text Settings" initialOpen={true}>
          <TextControl label="Heading" value={heading} onChange={(v) => setAttributes({ heading: v })} />
          <TextareaControl label="Subtitle" value={subtitle} onChange={(v) => setAttributes({ subtitle: v })} />
          <TextareaControl label="Content" value={content} onChange={(v) => setAttributes({ content: v })} />
        </PanelBody>

        <PanelBody title="Buttons" initialOpen={false}>
          <TextareaControl label="Primary Button Text" value={buttonText} onChange={(v) => setAttributes({ buttonText: v })} />
          <TextControl label="Primary Button URL" value={buttonUrl} onChange={(v) => setAttributes({ buttonUrl: v })} />

          <TextareaControl label="Secondary Button Text" value={secondaryButtonText} onChange={(v) => setAttributes({ secondaryButtonText: v })} />
          <TextControl label="Secondary Button URL" value={secondaryButtonUrl} onChange={(v) => setAttributes({ secondaryButtonUrl: v })} />
        </PanelBody>

        <PanelBody title="Main Image Section" initialOpen={false}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ mainImage: media.url })}
              allowedTypes={["image"]}
              render={({ open }) => (
                <div style={{ marginBottom: "1rem" }}>
                  <p><strong>Main Image</strong></p>

                  {mainImage ? (
                    <>
                      <img src={mainImage} style={{ maxWidth: "100%", borderRadius: "10px", marginBottom: "10px" }} />
                      <Button onClick={open} isSecondary>Replace Image</Button>
                      <Button isDestructive onClick={() => setAttributes({ mainImage: "" })} style={{ marginLeft: "10px" }}>Remove</Button>
                    </>
                  ) : (
                    <Button isPrimary onClick={open}>Upload Image</Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
 
          <TextControl label="Video URL (optional)" value={videoUrl} onChange={(v) => setAttributes({ videoUrl: v })} />
        </PanelBody>

         {/* Style Panel */}
          <PanelBody title="Styles" initialOpen={false}>

              <TextControl
                  label="Section Background Color"
                  value={sectionColor}
                  onChange={(v) => setAttributes({ sectionColor: v })}
              /> 

              <RangeControl
                  label={__("Section Padding Top  (REM)", "zero")}
                  value={paddingTop}
                  onChange={(value) => setAttributes({ paddingTop: value })}
                  min={0}
                  max={10}
                  />
                  
              <RangeControl
                  label={__("Section Padding Bottom (REM)", "zero")}
                  value={paddingBottom}
                  onChange={(value) => setAttributes({ paddingBottom: value })}
                  min={0}
                  max={10}
                  />
              <RangeControl
                  label={__("Title Font Size (PX)", "zero")}
                  value={titleFontSize}
                  onChange={(value) => setAttributes({ titleFontSize: value })}
                  min={10}
                  max={100}
                  /> 
              <RangeControl
                  label={__("Subtitle Font Size (PX)", "zero")}
                  value={subtitleFontSize}
                  onChange={(value) => setAttributes({ subtitleFontSize: value })}
                  min={10}
                  max={100}
                  /> 
          </PanelBody>
          
      </InspectorControls>

      {/* FRONT-END PREVIEW INSIDE EDITOR */}
      <section {...blockProps}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-bold mb-4">{heading}</h2>
            <p className="text-gray-700 mb-4">{subtitle}</p>
            <p className="text-gray-700 mb-6">{content}</p>

            <div className="flex gap-4">
              <a href="#" className="bg-green-600 text-white px-4 py-2 rounded">{buttonText}</a>
              <a href="#" className="text-black underline">{secondaryButtonText}</a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {mainImage && (
              <img src={mainImage} className="rounded-xl w-full object-cover" />
            )}

           

            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center"
              >
              
              </a>
            )}
          </div>

        </div>
      </section>
    </Fragment>
  );
}
