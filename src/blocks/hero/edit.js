import { __ } from '@wordpress/i18n';

import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps
} from "@wordpress/block-editor";

import {
    PanelBody,
    TextControl,
    TextareaControl,
    Button,
    SelectControl,
    RangeControl
} from "@wordpress/components";

import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
    const {
        heading = "",
        subheading = "",
        bullets = [],
        bulletIcons = [],
        buttonPrimary = "",
        buttonSecondary = "",
        buttonPrimaryUrl = "",
        buttonSecondaryUrl = "",
        images = [],
        sectionClass = "",
        sectionColor = "",
        styleType = "light",
        imagePosition = "right",
        bulletListClass = "list-disc pl-5 space-y-2",
        bulletItemClass = "",
        paddingTop = 0,
        paddingBottom = 0,
        titleFontSize = "46",
    } = attributes;

    const blockProps = useBlockProps({
        className: `${sectionClass} p-10`
    });

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

    // ----- IMAGES -----
    const addImages = (media) => {
        const selected = Array.isArray(media) ? media : [media];
        const mapped = selected.map((m) => ({ id: m.id, url: m.url }));
        setAttributes({ images: [...images, ...mapped] });
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setAttributes({ images: newImages });
    };

    return (
        <Fragment>
            <InspectorControls>

                {/* Content Panel */}
                <PanelBody title="Hero Content" initialOpen={true}>
                    <TextControl
                        label="Heading"
                        value={heading}
                        onChange={(v) => setAttributes({ heading: v })}
                    />
                    <TextareaControl
                        label="Subheading"
                        value={subheading}
                        onChange={(v) => setAttributes({ subheading: v })}
                    />

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

                    
                    <TextControl
                        label="Primary Button Text"
                        value={buttonPrimary}
                        onChange={(v) => setAttributes({ buttonPrimary: v })}
                    />
                    <TextControl
                        label="Primary Button Text"
                        value={buttonPrimaryUrl}
                        onChange={(v) => setAttributes({ buttonPrimaryUrl: v })}
                    />
                    <TextControl
                        label="Secondary Button Text"
                        value={buttonSecondary}
                        onChange={(v) => setAttributes({ buttonSecondary: v })}
                    />
                    <TextControl
                        label="Secondary Button Text"
                        value={buttonSecondaryUrl}
                        onChange={(v) => setAttributes({ buttonSecondaryUrl: v })}
                    />
                </PanelBody>

                {/* Image Panel */}
                <PanelBody title="Images" initialOpen={false}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={addImages}
                            allowedTypes={["image"]}
                            multiple
                            gallery
                            render={({ open }) => (
                                <Button isPrimary onClick={open}>Add Images</Button>
                            )}
                        />
                    </MediaUploadCheck>

                    <div className="mt-4 space-y-3">
                        {images.map((img, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <img src={img.url} className="w-16 h-16 rounded object-cover" />
                                <Button isDestructive onClick={() => removeImage(i)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                </PanelBody>

                {/* Style Panel */}
                <PanelBody title="Styles" initialOpen={false}>

                    <TextControl
                        label="Section Background Color"
                        value={sectionColor}
                        onChange={(v) => setAttributes({ sectionColor: v })}
                    />

                    <TextControl
                        label="Section Classes"
                        value={sectionClass}
                        onChange={(v) => setAttributes({ sectionClass: v })}
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

                    <SelectControl
                        label="Hero Style"
                        value={styleType}
                        options={[
                            { label: "Light", value: "light" },
                            { label: "Dark", value: "dark" }
                        ]}
                        onChange={(v) => setAttributes({ styleType: v })}
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
                    <TextControl label="Bullet List Classes" value={bulletListClass} onChange={(v)=>setAttributes({bulletListClass:v})} />
                    <TextControl label="Bullet Item Classes" value={bulletItemClass} onChange={(v)=>setAttributes({bulletItemClass:v})} />
                </PanelBody>

            </InspectorControls>

            {/* Block Preview */}
            <div {...blockProps}>

                <div 
  className="flex flex-col md:flex-row gap-12" 
  style={{ paddingTop: `${paddingTop}rem`, paddingBottom: `${paddingBottom}rem`, backgroundColor: sectionColor }}
>

    {/* LEFT COLUMN */}
                <div className={`${imagePosition === "left" ? "order-last md:order-first" : ""} flex-1`}>
                    <h1 className="text-5xl font-bold">{heading}</h1>
                    <p className="mt-6 text-lg">{subheading}</p>

                    <ul className={bulletListClass}>
                        {bullets.map((b, i) => (
                            <li key={i} className={bulletItemClass}>
                                {bulletIcons[i] && <i className={bulletIcons[i]}></i>} {b}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex gap-4">
                        <button className="px-6 py-3 bg-green-600 text-white rounded-lg">{buttonPrimary}</button>
                        <button className="px-6 py-3 bg-gray-200 rounded-lg">{buttonSecondary}</button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={`${imagePosition === "left" ? "order-first md:order-last" : ""} flex-1 grid grid-cols-2 gap-4`}>
                    {images.map((img, i) => (
                        <img key={i} src={img.url} className="rounded-xl object-cover" />
                    ))}
                </div>

            </div>
            </div>
        </Fragment>
    );
}
