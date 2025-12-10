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
    TextareaControl,
    Button,
    SelectControl,
    RangeControl
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        items = [],
        buttonText,
        buttonUrl,
        buttonText2,
        buttonUrl2,
        clientName,
        clientImage = {},
        sectionClass,
        sectionColor,
        paddingTop,
        maxContainerWidth,
        paddingBottom,
        sectionMarginTop,
        clientLayout,
        columns
    } = attributes;

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index] = { ...(updated[index] || {}), [field]: value };
        setAttributes({ items: updated });
    };

    const addItem = () => {
        setAttributes({
            items: [...items, { question: "", answer: "" }]
        });
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

    const blockProps = useBlockProps({
        className: "p-8 md:p-12 bg-gray-50 rounded-xl"
    });


const onSelectClientImage = (media) => {
        setAttributes({
            clientImage: media.url
        });
    };

    return (
        <Fragment>
            <InspectorControls>

                {/* GENERAL SETTINGS */}
                <PanelBody title="FAQ Block Settings" initialOpen={true}>
                    <TextareaControl
                        label="Title"
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                    />
                    <TextareaControl
                        label="Sub Title"
                        value={subtitle}
                        onChange={(v) => setAttributes({ subtitle: v })}
                    />

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
                    

                    


                </PanelBody>

                {/* FAQ ITEMS */}
                <PanelBody title="FAQ Items" initialOpen={false}>
                    {items.map((item, index) => (
                        <div key={index} className="p-3 border rounded bg-white mb-3">
                            <TextControl
                                label="Question"
                                value={item.question}
                                onChange={(v) => updateItem(index, "question", v)}
                            />

                            <TextareaControl
                                label="Answer"
                                value={item.answer}
                                onChange={(v) => updateItem(index, "answer", v)}
                            />

                            <Button isDestructive onClick={() => removeItem(index)} className="mt-2">
                                Remove FAQ
                            </Button>
                        </div>
                    ))}

                    <Button variant="primary" onClick={addItem} className="w-full">
                        Add FAQ
                    </Button>
                </PanelBody>

                {/* STYLE SETTINGS */}
                <PanelBody title="Styles" initialOpen={false}>
                    <TextControl
                        label="Background Color"
                        value={sectionColor}
                        onChange={(v) => setAttributes({ sectionColor: v })}
                    />

                    <TextControl
                        label="Section Classes"
                        value={sectionClass}
                        onChange={(v) => setAttributes({ sectionClass: v })}
                    />
                    <TextControl
                        label="Max Container Width Classes"
                        value={maxContainerWidth}
                        onChange={(v) => setAttributes({ maxContainerWidth: v })}
                    />

                    <TextControl
                        label="Margin Top (px)"
                        value={sectionMarginTop}
                        onChange={(v) => setAttributes({ sectionMarginTop: v })}
                    />

                    <RangeControl
                        label="Padding Top (rem)"
                        value={paddingTop}
                        onChange={(v) => setAttributes({ paddingTop: v })}
                        min={0}
                        max={20}
                    />

                    <RangeControl
                        label="Padding Bottom (rem)"
                        value={paddingBottom}
                        onChange={(v) => setAttributes({ paddingBottom: v })}
                        min={0}
                        max={20}
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

            {/* Preview inside editor */}
            <section {...blockProps}>
                <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="p-4 bg-white rounded shadow">
                            <strong>{item.question || "Question…"}</strong>
                            <p className="text-gray-600">{item.answer || "Answer…"}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center mt-6 text-gray-500">
                    FAQ preview — edit content in the sidebar.
                </p>
            </section>
        </Fragment>
    );
}
