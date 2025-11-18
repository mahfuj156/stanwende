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
  TextareaControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    eyebrow,
    description,
    stat1,
    stat1_label,
    stat2,
    stat2_label,
    chartUrl,
    bgColor
  } = attributes;

  const blockProps = useBlockProps({
    className: `rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start`,
    style: { backgroundColor: bgColor }
  });

  const onSelectImage = (media) => {
    setAttributes({ chartUrl: media?.url || '' });
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
          <TextareaControl
            label={__('Description', 'zero')}
            value={description}
            onChange={(v) => setAttributes({ description: v })}
          />
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

        <PanelColorSettings
          title={ __('Background color', 'zero') }
          initialOpen={ false }
          colorSettings={[
            {
              value: bgColor,
              onChange: (value) => setAttributes({ bgColor: value }),
              label: __('Background color', 'zero')
            }
          ]}
        />
      </InspectorControls>

      <section {...blockProps}>
        {/* LEFT: Chart */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl bg-white p-4 h-[260px] md:h-[360px] flex items-center justify-center">
            {chartUrl ? (
              <img src={chartUrl} alt={__('Chart', 'zero')} className="object-contain h-full w-full rounded-xl" />
            ) : (
              <div className="text-gray-400">{__('Chart placeholder', 'zero')}</div>
            )}
          </div>
        </div>

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
