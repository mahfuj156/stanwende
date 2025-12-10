import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings
} from '@wordpress/block-editor';

import {
  PanelBody,
  Button,
  TextControl,
  TextareaControl,
  RangeControl,
  SelectControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    subtitle,
    eyebrow,
    eyebrowIcon,
    description,
    stat1,
    stat1_label,
    stat2,
    stat2_label,
    chartUrl, 
    subtitleIcon, 
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    sectionColor,
    paddingTop,
    paddingBottom,
    titleFontSize,
    subtitleFontSize,
    maxContainerWidth,
    columns,
    imagePosition,
    bullets = [],
    bulletIcons = [],
  } = attributes;

  const blockProps = useBlockProps({
    className: `rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start`,
    style: { backgroundColor: sectionColor || 'transparent', paddingTop: `${paddingTop}rem`, paddingBottom: `${paddingBottom}rem` }
  });

  const onSelectImage = (media) => {
    setAttributes({ chartUrl: media?.url || '' });
  };
  const onSelectSubtitleImage = (media) => {
    setAttributes({ subtitleIcon: media?.url || '' });
  };

  // ----- BULLETS -----
   // ADD NEW BULLET
const addBullet = () => {
  setAttributes({
    bullets: [
      ...bullets,
      {
        iconImage: { id: 0, url: "" },
        title: "",
        link: "",
      }
    ]
  });
};

// UPDATE BULLET
const updateBullet = (index, key, value) => {
  const newBullets = [...bullets];
  newBullets[index] = {
    ...newBullets[index],
    [key]: value,
  };
  setAttributes({ bullets: newBullets });
};

// REMOVE BULLET
const removeBullet = (index) => {
  const newBullets = [...bullets];
  newBullets.splice(index, 1);
  setAttributes({ bullets: newBullets });
};

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Content settings', 'zero')} initialOpen={true}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ eyebrowIcon: media.url })}
              allowedTypes={["image"]}
              render={({ open }) => (
                <div style={{ marginBottom: "1rem" }}>
                  <p><strong>Eyebrow Icon</strong></p>
                  {eyebrowIcon ? (
                    <>
                      <img src={eyebrowIcon} style={{ maxWidth: "100%", borderRadius: "10px", marginBottom: "10px" }} />
                      <Button onClick={open} isSecondary>Replace Image</Button>
                      <Button isDestructive onClick={() => setAttributes({ eyebrowIcon: "" })} style={{ marginLeft: "10px" }}>Remove</Button>
                    </>
                  ) : (
                    <Button isPrimary onClick={open}>Upload Image</Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>

          <TextControl
            label={__('Eyebrow', 'zero')}
            value={eyebrow}
            onChange={(v) => setAttributes({ eyebrow: v })}
          />
          <TextareaControl
            label={__('Title', 'zero')}
            value={title}
            onChange={(v) => setAttributes({ title: v })}
          />
          <TextareaControl
            label={__('Subtitle', 'zero')}
            value={subtitle}
            onChange={(v) => setAttributes({ subtitle: v })}
          />

          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectSubtitleImage}
              allowedTypes={['image']}
              value={subtitleIcon}
              render={({ open }) => (
                <div>
                  <Button isSecondary onClick={open}>
                    {subtitleIcon ? __('Upload subtitile Icon', 'zero') : __('Upload subtitile Icon', 'zero')}
                  </Button>
                  {subtitleIcon && (
                    <Button isLink isDestructive onClick={() => setAttributes({ subtitleIcon: '' })}>
                      {__('Remove', 'zero')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>

          <TextareaControl
            label={__('Description', 'zero')}
            value={description}
            onChange={(v) => setAttributes({ description: v })}
          />
        </PanelBody>

        {/* BULLETS */}
        <PanelBody title={__('Bullet Points', 'zero')} initialOpen={false}>
          {bullets.map((item, index) => (
            <div key={index} className="mb-2">

              {/* ITEM ICON IMAGE */}
              <MediaUploadCheck>
                  <MediaUpload
                     onSelect={(media) =>
                      updateBullet(index, "iconImage", {
                        id: media.id,
                        url: media.url,
                      })
                    }
                      allowedTypes={["image"]}
                      value={item.iconImage?.id}
                      render={({ open }) => (
                          <div className="mb-3">
                              <label className="font-semibold">Item  Image</label>

                              {item.iconImage?.url ? (
                                  <div className="flex flex-col gap-2 mt-2">
                                      <img
                                          src={item.iconImage.url}
                                          style={{
                                              width: "80px",
                                              height: "80px",
                                              objectFit: "contain"
                                          }}
                                      />

                                      <div className="flex gap-2">
                                          <Button isSecondary onClick={open}>
                                              Replace Image
                                          </Button>
                                          <Button
                                              isDestructive
                                              onClick={() =>
                                                  updateItem(index, "iconImage", { id: 0, url: "" })
                                              }
                                          >
                                              Remove
                                          </Button>
                                      </div>
                                  </div>
                              ) : (
                                  <Button isPrimary className="mt-2" onClick={open}>
                                      Upload Icon Image
                                  </Button>
                              )}
                          </div>
                      )}
                  />
              </MediaUploadCheck> 
              
             
               <TextareaControl
                label={`Bullet Title ${index + 1}`}
                value={item.title}
                onChange={(v) => updateBullet(index, "title", v)}
              />
                
              <TextareaControl
                label={`Bullet Link ${index + 1}`}
                value={item.link}
                onChange={(v) => updateBullet(index, "link", v)}
              />
              <Button 
                isDestructive 
                onClick={() => removeBullet(index)} 
                className="mt-1"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button isPrimary onClick={addBullet}>Add Bullet</Button>
        </PanelBody>

        <PanelBody title={__('Stats', 'zero')} initialOpen={false}>
          <TextControl
            label={__('Stat 1 (value)', 'zero')}
            value={stat1}
            onChange={(v) => setAttributes({ stat1: v })}
          />
          <TextControl
            label={__('Stat 1 label', 'zero')}
            value={stat1_label}
            onChange={(v) => setAttributes({ stat1_label: v })}
          />
          <TextControl
            label={__('Stat 2 (value)', 'zero')}
            value={stat2}
            onChange={(v) => setAttributes({ stat2: v })}
          />
          <TextControl
            label={__('Stat 2 label', 'zero')}
            value={stat2_label}
            onChange={(v) => setAttributes({ stat2_label: v })}
          />
        </PanelBody>

        <PanelBody title={__('Chart image', 'zero')} initialOpen={false}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={chartUrl}
              render={({ open }) => (
                <div>
                  <Button isSecondary onClick={open}>
                    {chartUrl ? __('Replace chart image', 'zero') : __('Upload chart image', 'zero')}
                  </Button>
                  {chartUrl && (
                    <Button isLink isDestructive onClick={() => setAttributes({ chartUrl: '' })}>
                      {__('Remove', 'zero')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>

        <PanelBody title="Buttons" initialOpen={false}>
          <TextareaControl label="Primary Button Text" value={buttonText} onChange={(v) => setAttributes({ buttonText: v })} />
          <TextControl label="Primary Button URL" value={buttonUrl} onChange={(v) => setAttributes({ buttonUrl: v })} />
          <TextareaControl label="Secondary Button Text" value={secondaryButtonText} onChange={(v) => setAttributes({ secondaryButtonText: v })} />
          <TextControl label="Secondary Button URL" value={secondaryButtonUrl} onChange={(v) => setAttributes({ secondaryButtonUrl: v })} />
        </PanelBody>

        <PanelBody title="Styles" initialOpen={false}>
          <TextControl
            label="Section Container Width (PX)"
            value={maxContainerWidth}
            onChange={(v) => setAttributes({ maxContainerWidth: v })}
          /> 
          <TextControl
            label="Section Background Color"
            value={sectionColor}
            onChange={(v) => setAttributes({ sectionColor: v })}
          /> 

          <SelectControl
            label="Columns on Desktop"
            value={columns}
            options={[
              { label: '1 Column', value: 1 },
              { label: '2 Columns', value: 2 },
              { label: '3 Columns', value: 3 }
            ]}
            onChange={(v) => setAttributes({ columns: parseInt(v) })}
          />

          <RangeControl
            label={__("Section Padding Top  (REM)", "zero")}
            value={paddingTop}
            onChange={(v) => setAttributes({ paddingTop: v })}
            min={0}
            max={20}
          />
          
          <RangeControl
            label={__("Section Padding Bottom (REM)", "zero")}
            value={paddingBottom}
            onChange={(v) => setAttributes({ paddingBottom: v })}
            min={0}
            max={20}
          />
          <RangeControl
            label={__("Title Font Size (PX)", "zero")}
            value={titleFontSize}
            onChange={(v) => setAttributes({ titleFontSize: v })}
            min={10}
            max={100}
          /> 
          <RangeControl
            label={__("Subtitle Font Size (PX)", "zero")}
            value={subtitleFontSize}
            onChange={(v) => setAttributes({ subtitleFontSize: v })}
            min={10}
            max={100}
          /> 

          <SelectControl
            label="Image Position"
            value={imagePosition}
            options={[
              { label: "Right", value: "right" },
              { label: "Left", value: "left" }
            ]}
            onChange={(v) => setAttributes({ imagePosition: v })}
          />
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        {/* LEFT: Chart */}
        {chartUrl && (
          <div className="w-full md:w-1/2">
            <div className="rounded-xl bg-white p-4 h-[260px] md:h-[360px] flex items-center justify-center">
              <img src={chartUrl} alt={__('Chart', 'zero')} className="object-contain h-full w-full rounded-xl" />
            </div>
          </div>
        )}

        {/* RIGHT: Content */}
        <div className="w-full md:w-1/2 space-y-6">
          {eyebrow && <div className="text-h18 text-gray-600">{eyebrow}</div>}

          <RichText
            tagName="h2"
            className="text-h38 md:text-h46 font-semibold"
            value={title}
            onChange={(v) => setAttributes({ title: v })}
            placeholder={__('Add title…', 'zero')}
          />

          <RichText
            tagName="p"
            className="text-p16 text-gray-700"
            value={description}
            onChange={(v) => setAttributes({ description: v })}
            placeholder={__('Add description…', 'zero')}
          />

          <div className="flex flex-wrap gap-8 items-center">
            <div>
              <div className="text-h22 font-semibold">{stat1}</div>
              <div className="text-p16 text-gray-600">{stat1_label}</div>
            </div>
            <div>
              <div className="text-h22 font-semibold">{stat2}</div>
              <div className="text-p16 text-gray-600">{stat2_label}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a className="inline-block bg-primary text-white px-5 py-3 rounded shadow-btn-primary" href={buttonUrl || "#"}>
              {buttonText || __('Primary Button', 'zero')}
            </a>
            <a className="inline-block text-custom-black underline px-3 py-3" href={secondaryButtonUrl || "#"}>
              {secondaryButtonText || __('Secondary Button', 'zero')}
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
