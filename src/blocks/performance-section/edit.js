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
    description,
    stat1,
    stat1_label,
    stat2,
    stat2_label,
    chartUrl, 
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    sectionColor, paddingTop, paddingBottom, titleFontSize, subtitleFontSize,
    maxContainerWidth,
    columns,
    imagePosition,
     bullets = [],


  } = attributes;

  const blockProps = useBlockProps({
    className: `rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start`,
    style: { backgroundColor: sectionColor || 'transparent', paddingTop: `${paddingTop}rem`, paddingBottom: `${paddingBottom}rem` }
  });

  const onSelectImage = (media) => {
    setAttributes({ chartUrl: media?.url || '' });
  };


    // ----- BULLETS -----
    const addBullet = () => {
        setAttributes({ 
            bullets: [...bullets, ""],
            bulletIcons: [...bulletIcons, "fas fa-check"] // default icon
        });
    };

    const updateBullet = (index, value) => {
        const newBullets = [...bullets];
        newBullets[index] = value;
        setAttributes({ bullets: newBullets });
    };

    const removeBullet = (index) => {
        const newBullets = [...bullets];
        const newIcons = [...bulletIcons];
        newBullets.splice(index, 1);
        newIcons.splice(index, 1);
        setAttributes({ bullets: newBullets, bulletIcons: newIcons });
    };



  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Content settings', 'zero')} initialOpen={true}>
          <TextControl
            label={__('Eyebrow', 'zero')}
            value={eyebrow}
            onChange={(v) => setAttributes({ eyebrow: v })}
          />
          <TextControl
            label={__('Title', 'zero')}
            value={title}
            onChange={(v) => setAttributes({ title: v })}
          />
          <TextControl
            label={__('Subtitle', 'zero')}
            value={subtitle}
            onChange={(v) => setAttributes({ subtitle: v })}
          />
          <TextareaControl
            label={__('Description', 'zero')}
            value={description}
            onChange={(v) => setAttributes({ description: v })}
          />
        </PanelBody>


   <h4 className="mt-4">Bullet Points</h4>
                   {bullets.map((b, i) => (
                        <div key={i} className="mb-2">
                            <TextareaControl
                                label={`Bullet ${i + 1}`}
                                value={b}
                                onChange={(v) => updateBullet(i, v)}
                            />
                            <Button 
                                isDestructive 
                                onClick={() => removeBullet(i)} 
                                className="mt-1"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addBullet}>Add Bullet</Button>

                    


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

         {/* Style Panel */}
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
                              value={attributes.columns}
                              options={[
                                  { label: '1 Columns', value: 1 },
                                  { label: '2 Columns', value: 2 },
                                  { label: '3 Columns', value: 3 }
                              ]}
                              onChange={(value) => setAttributes({ columns: parseInt(value) })}
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
            {chartUrl ? (
        <div className="w-full md:w-1/2">
          <div className="rounded-xl bg-white p-4 h-[260px] md:h-[360px] flex items-center justify-center">
            {chartUrl ? (
              <img src={chartUrl} alt={__('Chart', 'zero')} className="object-contain h-full w-full rounded-xl" />
            ) : (
              <div className="text-gray-400">{__('Chart placeholder', 'zero')}</div>
            )}
          </div>
        </div>
            ) : null}

        {/* RIGHT: Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="text-h18 text-gray-600">{eyebrow}</div>

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
            <a className="inline-block bg-primary text-white px-5 py-3 rounded shadow-btn-primary" href="#">
              {__('Calculate your return', 'zero')}
            </a>

            <a className="inline-block text-custom-black underline px-3 py-3" href="#">
              {__('Our returns →', 'zero')}
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
