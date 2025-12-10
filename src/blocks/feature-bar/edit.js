import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
    RichText
} from "@wordpress/block-editor";

import {
    PanelBody,
    TextControl,
    Button,
    SelectControl,
    RangeControl,
    TextareaControl
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const {
        items = [],
        logos = [],
        logoTitle = "",
        sectionClass = "",
        sectionColor = "#FFF",
        paddingTop = 6,
        paddingBottom = 6,
        sectionMarginTop = "0",
        maxContainerWidth = "1312",
        showDivider = "Yes",
        columns = 3
    } = attributes;

    const blockProps = useBlockProps({
        className: sectionClass
    });

    // Items
    const addItem = () => {
        setAttributes({
            items: [
                ...items,
                { icon: "fa-solid fa-circle-check", text: "" }
            ]
        });
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setAttributes({ items: updated });
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

    // Logos
    const addLogos = (media) => {
        const mapped = media.map((m) => ({ id: m.id, url: m.url }));
        setAttributes({ logos: [...logos, ...mapped] });
    };

    const removeLogo = (index) => {
        const updated = [...logos];
        updated.splice(index, 1);
        setAttributes({ logos: updated });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Feature Items" initialOpen={true}>
                    {items.map((item, index) => (
                        <div key={index} className="mb-4 p-3 border rounded">
                            <TextControl
                                label="Icon Class"
                                value={item.icon}
                                onChange={(v) => updateItem(index, "icon", v)}
                            />


                              <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => updateItem(index, "image", media.url)}
                                    allowedTypes={["image"]}
                                    render={({ open }) => (
                                        <div style={{ marginBottom: "1rem" }}>
                                            <p><strong>Item Image</strong></p>

                                            {item.image ? (
                                                <>
                                                    <img 
                                                        src={item.image}
                                                        style={{ 
                                                            maxWidth: "100%", 
                                                            borderRadius: "10px", 
                                                            marginBottom: "10px" 
                                                        }} 
                                                    />
                                                    
                                                    <Button onClick={open} isSecondary>
                                                        Replace Image
                                                    </Button>

                                                    <Button 
                                                        isDestructive
                                                        onClick={() => updateItem(index, "image", "")}
                                                        style={{ marginLeft: "10px" }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button isPrimary onClick={open}>
                                                    Upload Image
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>


                            <TextareaControl
                                label="Text"
                                value={item.text}
                                onChange={(v) => updateItem(index, "text", v)}
                            />

                            <Button 
                                isDestructive 
                                onClick={() => removeItem(index)}
                                className="mt-2"
                            >
                                Remove Item
                            </Button>
                        </div>
                    ))}

                    <Button isPrimary onClick={addItem}>
                        Add Item
                    </Button>
                </PanelBody>

                <PanelBody title="Logos" initialOpen={false}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={addLogos}
                            allowedTypes={["image"]}
                            multiple
                            gallery
                            render={({ open }) => (
                                <Button isPrimary onClick={open}>
                                    Add Logos
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    <div className="mt-4 space-y-3">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <img src={logo.url} className="w-12 h-12 object-contain" />
                                <Button
                                    isDestructive
                                    onClick={() => removeLogo(i)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                     <TextControl
                        label="Partner Heading"
                        value={logoTitle}
                        onChange={(v) => setAttributes({ logoTitle: v })}
                    />

                </PanelBody>

                <PanelBody title="Styles" initialOpen={false}>
                    <TextControl
                        label="Section Classes"
                        value={sectionClass}
                        onChange={(v) => setAttributes({ sectionClass: v })}
                    />

                    <TextControl
                        label="Section Background Color"
                        value={sectionColor}
                        onChange={(v) => setAttributes({ sectionColor: v })}
                    />

                   
                     <TextControl
                        label="Section Container Width (PX)"
                        value={maxContainerWidth}
                        onChange={(v) => setAttributes({ maxContainerWidth: v })}
                    /> 
                    

                   <TextControl
                        label="Section margin top"
                        value={sectionMarginTop}
                        onChange={(v) => setAttributes({ sectionMarginTop: v })}
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

                         

                     <SelectControl
                        label="Show Devider"
                        value={attributes.showDivider}
                        options={[
                            { label: 'Yes', value: "Yes"},
                            { label: 'No', value: 'No' }
                        ]}
                        onChange={(value) => setAttributes({ showDivider: value })}
                    />
                     <SelectControl
                        label="Columns on Desktop"
                        value={attributes.columns}
                        options={[
                            { label: '2 Columns', value: 2 },
                            { label: '3 Columns', value: 3 }
                        ]}
                        onChange={(value) => setAttributes({ columns: parseInt(value) })}
                    />


                
                </PanelBody>
            </InspectorControls>

            {/* PREVIEW */}
            <div {...blockProps}>
                <div className="flex flex-col items-center gap-6 py-6">

                    {/* Top Items */}
                    <div className="flex flex-col md:flex-row md:items-center gap-8 text-center">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <i className={item.icon + " text-green-600"}></i>
                                <RichText.Content tagName="span" value={item.text} />
                            </div>
                        ))}
                    </div>

                    <hr className="w-full border-gray-200 " />

                    {/* Logos */}
                    <div className="text-center font-semibold text-gray-700">
                        {logoTitle}
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {logos.map((logo, i) => (
                            <img
                                key={i}
                                src={logo.url}
                                className="h-8 object-contain "
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
