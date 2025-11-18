import { Fragment } from "@wordpress/element";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { title = "", items = [], buttonText = "", buttonUrl = "" } = attributes;

    const faqList = Array.isArray(items) ? items : [];

    const updateItem = (index, field, value) => {
        const updated = [...faqList];
        updated[index] = { ...(updated[index] || {}), [field]: value };
        setAttributes({ items: updated });
    };

    const addItem = () => {
        setAttributes({
            items: [...faqList, { question: "", answer: "" }]
        });
    };

    const removeItem = (index) => {
        const updated = [...faqList];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

    const blockProps = useBlockProps({
        className: "p-8 md:p-12 bg-gray-50 rounded-xl"
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="FAQ Block Settings" initialOpen={true}>
                    <TextControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextControl
                        label="Button Text"
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <TextControl
                        label="Button URL"
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
                    />
                </PanelBody>

                <PanelBody title="FAQ Items" initialOpen={true}>
                    {faqList.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                marginBottom: "12px",
                                background: "#fafafa"
                            }}
                        >
                            <TextControl
                                label="Question"
                                value={item.question}
                                onChange={(value) => updateItem(index, "question", value)}
                            />

                            <TextareaControl
                                label="Answer"
                                value={item.answer}
                                onChange={(value) => updateItem(index, "answer", value)}
                            />

                            <Button
                                isDestructive
                                onClick={() => removeItem(index)}
                                style={{ marginTop: "8px" }}
                            >
                                Remove FAQ
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={addItem}
                        style={{ width: "100%", marginTop: "10px" }}
                    >
                        Add FAQ
                    </Button>
                </PanelBody>
            </InspectorControls>

            {/* Editor preview */}
            <section {...blockProps}>
                <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

                <div className="space-y-3">
                    {faqList.map((item, index) => (
                        <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
                            <p className="font-semibold text-lg">
                                {item.question || "Question…"}
                            </p>
                            <p className="text-gray-600 mt-2">
                                {item.answer || "Answer…"}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm mt-6 text-gray-500">
                    FAQ preview — edit content in the sidebar.
                </p>
            </section>
        </Fragment>
    );
}
