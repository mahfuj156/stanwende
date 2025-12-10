 
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
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { titleLeft,leftSubtitle, leftPaneltitle, leftPanelSubTitle,clientImage,bullets=[],leftContactHeading, titleRight ,rightSubtitle} = attributes;


    
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


    return (
        <>
            <InspectorControls>
                <PanelBody title="Left Section">
                    <TextControl
                        label="Left column title"
                        value={titleLeft}
                        onChange={(v) => setAttributes({ titleLeft: v })}
                    />
                    <TextareaControl
                        label="Left Sub title"
                        value={leftSubtitle}
                        onChange={(v) => setAttributes({ leftSubtitle: v })}
                    />
                    
                    <TextareaControl
                        label="Left Sub title"
                        value={leftPaneltitle}
                        onChange={(v) => setAttributes({ leftPaneltitle: v })}
                    />
                    <TextareaControl
                        label="Left Panel title"
                        value={leftPanelSubTitle}
                        onChange={(v) => setAttributes({ leftPanelSubTitle: v })}
                    />
                    <TextareaControl
                        label="Left Contact title"
                        value={leftContactHeading}
                        onChange={(v) => setAttributes({ leftContactHeading: v })}
                    />
 
                </PanelBody>

                   {/* CLIENT SECTION */}
                <PanelBody title="Client Section" initialOpen={false}> 
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({ clientImage: { url: media.url, alt: media.alt } })
                            }
                            allowedTypes={["image"]}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {clientImage?.url ? "Change Client Image" : "Upload Client Image"}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    {clientImage?.url && (
                        <img src={clientImage.url} alt={clientImage.alt} className="mt-3 h-20 w-20 rounded-full" />
                    )}


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
                    

                </PanelBody>

                <PanelBody title="Right Section">
                    

                    <TextControl
                        label="Right column title"
                        value={titleRight}
                        onChange={(v) => setAttributes({ titleRight: v })}
                    />
                    <TextareaControl
                        label="Right column title"
                        value={rightSubtitle}
                        onChange={(v) => setAttributes({ rightSubtitle: v })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps({ className: "p-6 bg-gray-50" })}>
                <h3>{titleLeft}</h3>
                <h3>{titleRight}</h3>

                <p>
                    <em>The full layout appears on the front-end.</em>
                </p>
            </div>
        </>
    );
}
