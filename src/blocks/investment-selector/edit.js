import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps, 
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";

import {
    PanelBody,
    TextControl,
    Button, 
    RangeControl,
    TextareaControl
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const {
        heading = "",
        subheading = "",
        items = [],
        sectionClass,
        sectionColor,
        paddingTop,
        paddingBottom,
        sectionMarginTop,
        columns
    } = attributes;

    const blockProps = useBlockProps({
        className: sectionClass
    });

    // -------------------------
    // PARENT ITEM FUNCTIONS
    // -------------------------
    const addItem = () => {
        setAttributes({
            items: [
                ...items,
                {
                    iconImage: { id: 0, url: "" },
                    title: "",
                    description: "",
                    buttonText: "",
                    buttonUrl: "",
                    subItems: []
                }
            ]
        });
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

    // -------------------------
    // SUB ITEM FUNCTIONS
    // -------------------------
    const addSubItem = (parentIndex) => {
        const newItems = [...items];

        if (!Array.isArray(newItems[parentIndex].subItems)) {
            newItems[parentIndex].subItems = [];
        }

        newItems[parentIndex].subItems.push({
            icon: "fa-solid fa-check",
            text: ""
        });

        setAttributes({ items: newItems });
    };

    const updateSubItem = (pIndex, sIndex, field, value) => {
        const newItems = [...items];
        newItems[pIndex].subItems[sIndex][field] = value;
        setAttributes({ items: newItems });
    };

    const removeSubItem = (pIndex, sIndex) => {
        const newItems = [...items];
        newItems[pIndex].subItems.splice(sIndex, 1);
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Section" initialOpen={true}>
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
                        
                </PanelBody>
                <PanelBody title="Items" initialOpen={true}>
                    {items.map((item, index) => (
                        <div key={index} className="border p-3 mb-4 rounded">

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
                                            <label className="font-semibold">Item Icon (Image)</label>

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

                            <TextControl
                                label="Title"
                                value={item.title}
                                onChange={(v) => updateItem(index, "title", v)}
                            />

                            <TextControl
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem(index, "description", v)}
                            />

                            <TextControl
                                label="Button Text"
                                value={item.buttonText}
                                onChange={(v) => updateItem(index, "buttonText", v)}
                            />

                            <TextControl
                                label="Button URL"
                                value={item.buttonUrl}
                                onChange={(v) => updateItem(index, "buttonUrl", v)}
                            />

                            {/* SUB ITEMS */}
                            <div className="bg-gray-100 p-2 mt-4 rounded">
                                <strong>Sub Items</strong>

                                {(item.subItems || []).map((sub, sIndex) => (
                                    <div key={sIndex} className="border p-2 mt-2 rounded">
                                        <TextControl
                                            label="Sub Item Icon (FontAwesome)"
                                            value={sub.icon}
                                            onChange={(v) =>
                                                updateSubItem(index, sIndex, "icon", v)
                                            }
                                        />

                                        <TextControl
                                            label="Sub Item Text"
                                            value={sub.text}
                                            onChange={(v) =>
                                                updateSubItem(index, sIndex, "text", v)
                                            }
                                        />

                                        <Button
                                            isDestructive
                                            onClick={() => removeSubItem(index, sIndex)}
                                        >
                                            Remove Sub Item
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    isSecondary
                                    className="mt-2"
                                    onClick={() => addSubItem(index)}
                                >
                                    Add Sub Item
                                </Button>
                            </div>

                            <Button
                                isDestructive
                                className="mt-3"
                                onClick={() => removeItem(index)}
                            >
                                Remove Item
                            </Button>

                        </div>
                    ))}

                    <Button isPrimary onClick={addItem}>
                        Add Item
                    </Button>
                </PanelBody>


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


                     

                
                </PanelBody>

            </InspectorControls>

            {/* PREVIEW */}
            <div {...blockProps}>
                <div className="grid md:grid-cols-3 gap-6">

                    
                    {items.map((item, index) => (
                        <div key={index} className="border p-5 rounded">

                            {item.iconImage?.url && (
                                <img
                                    src={item.iconImage.url}
                                    className="w-12 h-12 object-contain mb-3"
                                />
                            )}

                            <h3 className="text-xl font-bold">{item.title}</h3>

                            <p className="text-gray-700">{item.description}</p>

                            <ul className="mt-4 space-y-1">
                                {(item.subItems || []).map((sub, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <i className={sub.icon + " text-green-600"}></i>
                                        {sub.text}
                                    </li>
                                ))}
                            </ul>

                            {item.buttonText && (
                                <a className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded">
                                    {item.buttonText}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
