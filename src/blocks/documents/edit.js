import { __ } from '@wordpress/i18n';
import { Fragment } from "@wordpress/element";
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
    TextareaControl,
    SelectControl
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
         buttonText,
        buttonUrl,
        buttonText2,
        buttonUrl2,
        clientName,
        clientImage = {}, 
        columns,
        titleFontSize,
        subTitleFontSize,
        panelTitleFontSize,
        titleMarginBottom,
        panelTitleTag,
        linkStyle,
        clientLayout
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

    const onSelectClientImage = (media) => {
        setAttributes({
            clientImage: media.url
        });
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

                            <TextareaControl
                                label="Title"
                                value={item.title}
                                onChange={(v) => updateItem(index, "title", v)}
                            />

                            <TextareaControl
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem(index, "description", v)}
                            />

                            <TextareaControl
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
                                        <TextControl
                                            label="Sub Item LINK#"
                                            value={sub.link}
                                            onChange={(v) =>
                                                updateSubItem(index, sIndex, "link", v)
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


                
                {/* CLIENT SECTION */}
                <PanelBody title="Client Section" initialOpen={false}>
                    <TextControl
                        label="Client Name"
                        value={clientName}
                        onChange={(v) => setAttributes({ clientName: v })}
                    />
 

     {/* Upload Image */}
                    <MediaUploadCheck>
                        <MediaUpload
                            allowedTypes={["image"]}
                            onSelect={onSelectClientImage}
                            render={({ open }) => (
                                <div style={{ marginBottom: "15px" }}>
                                    {!clientImage ? (
                                        <Button
                                            onClick={open}
                                            variant="primary"
                                        >
                                            Upload Client Image
                                        </Button>
                                    ) : (
                                        <>
                                            <img
                                                src={clientImage}
                                                style={{
                                                    maxWidth: "100%",
                                                    borderRadius: "6px",
                                                    marginBottom: "10px"
                                                }}
                                            />

                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                style={{ marginRight: "8px" }}
                                            >
                                                Replace Image
                                            </Button>

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setAttributes({ clientImage: "" })
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>

 
                       <TextareaControl
                        label="Button 1 Text"
                        value={buttonText}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                    <TextControl
                        label="Button 1 URL"
                        value={buttonUrl}
                        onChange={(v) => setAttributes({ buttonUrl: v })}
                    />

                    <TextareaControl
                        label="Button 2 Text"
                        value={buttonText2}
                        onChange={(v) => setAttributes({ buttonText2: v })}
                    />
                    <TextControl
                        label="Button 2 URL"
                        value={buttonUrl2}
                        onChange={(v) => setAttributes({ buttonUrl2: v })}
                    />

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


                            <RangeControl
                                label={__("Title Margin Bottom", "zero")}
                                value={titleMarginBottom}
                                onChange={(value) => setAttributes({ titleMarginBottom: value })}
                                min={1}
                                max={16}
                                />
                            <RangeControl
                                label={__("Title Font Size (PX)", "zero")}
                                value={titleFontSize}
                                onChange={(value) => setAttributes({ titleFontSize: value })}
                                min={10}
                                max={100}
                                />
                            <RangeControl
                                label={__("Sub Title Font Size (PX)", "zero")}
                                value={subTitleFontSize}
                                onChange={(value) => setAttributes({ titleFontSize: value })}
                                min={10}
                                max={100}
                                />
                            <RangeControl
                                label={__("Panel Title Font Size (PX)", "zero")}
                                value={panelTitleFontSize}
                                onChange={(value) => setAttributes({ panelTitleFontSize: value })}
                                min={10}
                                max={100}
                                />
                                

                            <TextControl
                                label="Link Style"
                                value={linkStyle}
                                onChange={(v) => setAttributes({ linkStyle: v })}
                            />
                                

                              <SelectControl
                        label="Panel Tag"
                        value={panelTitleTag}
                        options={[
                            { label: "h1", value: "h1" },
                            { label: "h2", value: "h2" },
                            { label: "h3", value: "h3" },
                            { label: "h4", value: "h4" },
                            { label: "h5", value: "h5" },
                            { label: "p", value: "p" }
                        ]}
                        onChange={(v) => setAttributes({ panelTitleTag:  v })}
                    />
                              <SelectControl
                        label="Columns"
                        value={columns}
                        options={[
                            { label: "1 Column", value: 1 },
                            { label: "2 Columns", value: 2 },
                            { label: "3 Columns", value: 3 },
                            { label: "4 Columns", value: 4 }
                        ]}
                        onChange={(v) => setAttributes({ columns: parseInt(v) })}
                    />

                        <SelectControl
                                            label="Client Layout"
                                            value={clientLayout}
                                            options={[
                                                { label: "Stacked", value: "stacked" },
                                                { label: "Inline", value: "inline" }
                                            ]}
                                            onChange={(v) => setAttributes({ clientLayout: v })}
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
