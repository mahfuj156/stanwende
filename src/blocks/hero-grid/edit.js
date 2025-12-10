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
        eyebrowIcon = "",
        eyebrow = "Feit"
    } = attributes;

    const blockProps = useBlockProps({
        className: `${sectionClass} p-10`
    });

    

      // -------------------------
    // PARENT ITEM FUNCTIONS
    // -------------------------
    const addItem = () => {
        setAttributes({
            bullets: [
                ...bullets,
                {
                    iconImage: { id: 0, url: "" },
                    title: "", 
                }
            ]
        });
    };

    const updateItem = (index, field, value) => {
        const newItems = [...bullets];
        newItems[index][field] = value;
        setAttributes({ bullets: newItems });
    };

    const removeItem = (index) => {
        const updated = [...bullets];
        updated.splice(index, 1);
        setAttributes({ bullets: updated });
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
                        label="Eyebrow"
                        value={eyebrow}
                        onChange={(v) => setAttributes({ eyebrow: v })}
                    />
                    <TextareaControl
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
                   {bullets.map((item, index) => (
                        <div key={index} className="mb-2">

                             {/* ITEM ICON IMAGE */}
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        updateItem(index, "iconImage", {
                                            id: media.id,
                                            url: media.url
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
                                label={`Bullet ${index + 1}`}
                                value={item.title}
                                onChange={(v) => updateItem(index, "title", v)}
                            />
                            <Button 
                                isDestructive 
                                onClick={() => removeItem(index)}
                                className="mt-1"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addItem}>Add Bullet</Button>

                    
                    <TextareaControl
                        label="Primary Button Text"
                        value={buttonPrimary}
                        onChange={(v) => setAttributes({ buttonPrimary: v })}
                    />
                    <TextControl
                        label="Primary Button Text"
                        value={buttonPrimaryUrl}
                        onChange={(v) => setAttributes({ buttonPrimaryUrl: v })}
                    />
                    <TextareaControl
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
                        max={20}
                        />
                        
                    <RangeControl
                        label={__("Section Padding Bottom (REM)", "zero")}
                        value={paddingBottom}
                        onChange={(value) => setAttributes({ paddingBottom: value })}
                        min={0}
                        max={20}
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
                    <p className="text-2xl font-bold">{eyebrow}</p>
                    <h1 className="text-5xl font-bold">{heading}</h1>
                    <p className="mt-6 text-lg">{subheading}</p>

                    <ul className={bulletListClass}>
                       

                        {bullets.map((item, index) => (
                        <li key={index} className={bulletItemClass}>
                            {item.iconImage?.url && (
                                <img
                                    src={item.iconImage.url}
                                    className="w-12 h-12 object-contain mb-3"
                                />
                            )}

                            <h3 className="text-xl font-bold">{item.title}</h3> 
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
