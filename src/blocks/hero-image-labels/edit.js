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
  Button
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
    leftLabel,
    rightLabel,
    videoUrl
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
          <TextControl label="Primary Button Text" value={buttonText} onChange={(v) => setAttributes({ buttonText: v })} />
          <TextControl label="Primary Button URL" value={buttonUrl} onChange={(v) => setAttributes({ buttonUrl: v })} />

          <TextControl label="Secondary Button Text" value={secondaryButtonText} onChange={(v) => setAttributes({ secondaryButtonText: v })} />
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

          <TextControl label="Left Label" value={leftLabel} onChange={(v) => setAttributes({ leftLabel: v })} />
          <TextControl label="Right Label" value={rightLabel} onChange={(v) => setAttributes({ rightLabel: v })} />
          <TextControl label="Video URL (optional)" value={videoUrl} onChange={(v) => setAttributes({ videoUrl: v })} />
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

            {leftLabel && (
              <span className="absolute left-4 top-4 bg-white px-3 py-1 rounded shadow">
                {leftLabel}
              </span>
            )}

            {rightLabel && (
              <span className="absolute right-4 top-4 bg-white px-3 py-1 rounded shadow">
                {rightLabel}
              </span>
            )}

            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white p-4 rounded-full shadow-lg text-3xl">
                  ▶
                </div>
              </a>
            )}
          </div>

        </div>
      </section>
    </Fragment>
  );
}
