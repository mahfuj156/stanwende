// ...existing code...
import { Fragment } from "@wordpress/element";
import { InspectorControls, MediaUpload, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, TextareaControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
    // ensure attributes exist and normalize items
    const { title = "", subtitle = "", items = [], buttonText = "", buttonUrl = "", bgColor = "" } = attributes || {};
    const itemList = Array.isArray(items) ? items : [];

    const updateItem = (index, field, value) => {
        const updated = [...itemList];
        updated[index] = { ...(updated[index] || {}), [field]: value };
        setAttributes({ items: updated });
    };

    const addItem = () => {
        setAttributes({
            items: [
                ...itemList,
                { name: "", before: "", after: "", avatar: "" }
            ]
        });
    };

    const removeItem = (index) => {
        const updated = [...itemList];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

    const blockProps = useBlockProps({
        className: "p-8 md:p-12 rounded-xl",
        style: bgColor ? { backgroundColor: bgColor } : undefined
    });

    // ...existing code...
    return (
          <Fragment>
            <InspectorControls>
                <PanelBody title="Content Settings" initialOpen={true}>
                    <TextareaControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextareaControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextareaControl
                        label="Subtitle"
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                    />
                    <TextareaControl
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

                <PanelBody title="Comparison Items" initialOpen={true}>
                    {itemList.map((item, index) => (
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
                            <MediaUpload
                                onSelect={(media) => updateItem(index, "avatar", media.url)}
                                type="image"
                                render={({ open }) => (
                                    <Button isSecondary onClick={open} className="mb-2 w-full">
                                        {item.avatar ? __("Change avatar", "zero") : __("Upload avatar", "zero")}
                                    </Button>
                                )}
                            />

                            <TextControl
                                label="Name"
                                value={item.name || ""}
                                onChange={(value) => updateItem(index, "name", value)}
                            />

                            <TextareaControl
                                label="Before (✗)"
                                value={item.before || ""}
                                onChange={(value) => updateItem(index, "before", value)}
                            />

                            <TextareaControl
                                label="After (✓)"
                                value={item.after || ""}
                                onChange={(value) => updateItem(index, "after", value)}
                            />

                            <Button
                                isDestructive
                                onClick={() => removeItem(index)}
                                style={{ marginTop: "8px" }}
                            >
                                Remove Item
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={addItem}
                        style={{ width: "100%", marginTop: "10px" }}
                    >
                        Add Item
                    </Button>
                 </PanelBody>
            </InspectorControls>

            {/* Editor Preview */}
            <section {...blockProps}>
            <div className="p-6 bg-gray-100 rounded-lg border text-center">
                <h2 className="text-xl font-semibold mb-4">
                    <i className="fa-solid fa-arrows-left-right mr-2"></i>
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {itemList.map((item, index) => (
                        <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                             {item.avatar && (
                                <img
                                    src={item.avatar}
                                    alt={item.name || ""}
                                    className="w-20 h-20 rounded-full mb-4 object-cover"
                                />
                            )}
                            
                            <p className="font-bold text-gray-800">{item.name || "Name…"}</p>
                            <p className="text-red-600 mt-2">✗ {item.before || "Before text…"}</p>
                            <p className="text-green-600 mt-2">✓ {item.after || "After text…"}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-gray-500">Preview only — edit items in the right sidebar.</p>
            </div>
            </section>
        </Fragment>
    );
}
// ...existing code...