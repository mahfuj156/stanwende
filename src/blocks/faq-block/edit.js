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
    Button
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        items = [],
        buttonText,
        buttonUrl,
        buttonText2,
        buttonUrl2,
        clientName,
        clientImage
    } = attributes;

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
                {/* FAQ BLOCK SETTINGS */}
                <PanelBody title="FAQ Block Settings" initialOpen={true}>
                    <TextControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />

                    <TextControl
                        label="Button 1 Text"
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <TextControl
                        label="Button 1 URL"
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
                    />

                    <TextControl
                        label="Button 2 Text"
                        value={buttonText2}
                        onChange={(value) => setAttributes({ buttonText2: value })}
                    />
                    <TextControl
                        label="Button 2 URL"
                        value={buttonUrl2}
                        onChange={(value) => setAttributes({ buttonUrl2: value })}
                    />
                </PanelBody>

                {/* CLIENT INFO */}
                <PanelBody title="Client Section" initialOpen={false}>
                    <TextControl
                        label="Client Name"
                        value={clientName}
                        onChange={(value) => setAttributes({ clientName: value })}
                    />

                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    clientImage: { url: media.url, alt: media.alt }
                                })
                            }
                            allowedTypes={["image"]}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary" className="mt-3">
                                    {clientImage?.url ? "Change Client Image" : "Upload Client Image"}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    {clientImage?.url && (
                        <img
                            src={clientImage.url}
                            alt={clientImage.alt}
                            style={{ width: "80px", height: "80px", borderRadius: "50%", marginTop: "10px" }}
                        />
                    )}
                </PanelBody>

                {/* FAQ LIST */}
                <PanelBody title="FAQ Items" initialOpen={false}>
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

            {/* EDITOR PREVIEW */}
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
