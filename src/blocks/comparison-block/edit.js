import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    RichText,
    InspectorControls
} from "@wordpress/block-editor";
import {
    PanelBody,
    TextControl,
    TextareaControl,
    Button,
    RangeControl
} from "@wordpress/components";
import { Fragment, useEffect } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {

    const {
        title,
        leftTitle,
        rightTitle,
        leftItems,
        leftIcons,
        rightItems,
        rightIcons,
        extraText,
        buttonText,
        buttonUrl, 
        sectionClass,
        sectionColor,
        paddingTop,
        paddingBottom,
        maxContainerWidth,
        sectionMarginTop,
    } = attributes;

    /** ---------------------------------------
     * AUTO POPULATE DEFAULT ITEMS ONCE
     * --------------------------------------*/
    useEffect(() => {
        if (!leftItems.length) {
            setAttributes({
                leftItems: ["Left item 1"],
                leftIcons: ["fa-solid fa-xmark"]
            });
        }
        if (!rightItems.length) {
            setAttributes({
                rightItems: ["Right item 1"],
                rightIcons: ["fa-solid fa-check"]
            });
        }
    }, []);

    /** ---------------------------------------
     * UPDATE HELPERS
     * --------------------------------------*/
    const updateLeft = (field, value, index) => {
        const updated = [...field];
        updated[index] = value;
        setAttributes({ [field === leftItems ? "leftItems" : "leftIcons"]: updated });
    };

    const updateRight = (field, value, index) => {
        const updated = [...field];
        updated[index] = value;
        setAttributes({ [field === rightItems ? "rightItems" : "rightIcons"]: updated });
    };

    /** ---------------------------------------
     * ADD / REMOVE ITEMS
     * --------------------------------------*/
    const addLeftItem = () => {
        setAttributes({
            leftItems: [...leftItems, "New item"],
            leftIcons: [...leftIcons, "fa-solid fa-xmark"]
        });
    };

    const removeLeftItem = (index) => {
        setAttributes({
            leftItems: leftItems.filter((_, i) => i !== index),
            leftIcons: leftIcons.filter((_, i) => i !== index)
        });
    };

    const addRightItem = () => {
        setAttributes({
            rightItems: [...rightItems, "New item"],
            rightIcons: [...rightIcons, "fa-solid fa-check"]
        });
    };

    const removeRightItem = (index) => {
        setAttributes({
            rightItems: rightItems.filter((_, i) => i !== index),
            rightIcons: rightIcons.filter((_, i) => i !== index)
        });
    };

    /** ---------------------------------------
     * RENDER
     * --------------------------------------*/
    const blockProps = useBlockProps({
        className: "p-8 md:p-12 rounded-xl",
        style: { backgroundColor: sectionColor }
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="Content Settings" initialOpen={true}>

                    {/* MAIN TITLES */}
                    <TextareaControl
                        label="Main Title"
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                    />

                    {/* LEFT COLUMN */}
                    <hr />
                    <h3>Left Column</h3>

                    <TextareaControl
                        label="Left Column Title"
                        value={leftTitle}
                        onChange={(v) => setAttributes({ leftTitle: v })}
                    />

                    {leftItems.map((item, i) => (
                        <div key={i} className="border p-3 rounded mb-3 bg-gray-50">
                            <TextareaControl
                                label={`Item ${i + 1}`}
                                value={item}
                                onChange={(v) => updateLeft(leftItems, v, i)}
                            />

                            <TextControl
                                label="Icon class"
                                value={leftIcons[i]}
                                onChange={(v) => updateLeft(leftIcons, v, i)}
                                placeholder="fa-solid fa-xmark"
                            />

                            <Button
                                isDestructive
                                onClick={() => removeLeftItem(i)}
                                style={{ marginTop: "8px" }}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={addLeftItem}
                        style={{ marginBottom: "16px" }}
                    >
                        + Add Left Item
                    </Button>

                    {/* RIGHT COLUMN */}
                    <hr />
                    <h3>Right Column</h3>

                    <TextControl
                        label="Right Column Title"
                        value={rightTitle}
                        onChange={(v) => setAttributes({ rightTitle: v })}
                    />

                    {rightItems.map((item, i) => (
                        <div key={i} className="border p-3 rounded mb-3 bg-gray-50">
                            <TextareaControl
                                label={`Item ${i + 1}`}
                                value={item}
                                onChange={(v) => updateRight(rightItems, v, i)}
                            />

                            <TextControl
                                label="Icon class"
                                value={rightIcons[i]}
                                onChange={(v) => updateRight(rightIcons, v, i)}
                                placeholder="fa-solid fa-check"
                            />

                            <Button
                                isDestructive
                                onClick={() => removeRightItem(i)}
                                style={{ marginTop: "8px" }}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={addRightItem}
                        style={{ marginBottom: "16px" }}
                    >
                        + Add Right Item
                    </Button>

                    {/* EXTRA TEXT */}
                    <TextareaControl
                        label="Extra Text"
                        value={extraText}
                        onChange={(v) => setAttributes({ extraText: v })}
                    />

                    <TextControl
                        label="Button Text"
                        value={buttonText}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                    <TextControl
                        label="Button URL"
                        value={buttonUrl}
                        onChange={(v) => setAttributes({ buttonUrl: v })}
                    />
 

                </PanelBody>


                 <PanelBody title="Styles" initialOpen={false}>
                
                                    <TextControl
                                        label="Container Max Width"
                                        value={maxContainerWidth}
                                        onChange={(v) => setAttributes({ maxContainerWidth: v })}
                                    />
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

            {/* Backend preview (same layout as frontend) */}
            <section {...blockProps}>
                <h2 className="text-h38 font-semibold mb-8">{title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT PREVIEW */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-h22 mb-4">{leftTitle}</h3>
                        {leftItems.map((item, i) => (
                            <div key={i} className="flex gap-3 mb-3">
                                <i className={leftIcons[i]}></i>
                                <RichText tagName="p" value={item} className="text-p16" />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-h22 mb-4">{rightTitle}</h3>
                        {rightItems.map((item, i) => (
                            <div key={i} className="flex gap-3 mb-3">
                                <i className={rightIcons[i]}></i>
                                <RichText tagName="p" value={item} className="text-p16" />
                            </div>
                        ))}
                    </div>

                </div>

                <p className="text-center mt-8 opacity-70">{extraText}</p>
                <div className="flex justify-center mt-4">
                    <button className="bg-primary text-white px-6 py-3 rounded-md">
                        {buttonText}
                    </button>
                </div>
            </section>
        </Fragment>
    );
}
