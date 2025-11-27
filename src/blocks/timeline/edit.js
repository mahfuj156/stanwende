import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    
    InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, TextareaControl, RangeControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
    const { heading, steps = [],  buttonText = "", buttonUrl = "", bottomLabels = [], sectionBGColor = "#FFFFFF", sectionClass = " mx-auto py-10 bg-white rounded-xl shadow-sm", paddingTop = 6, paddingBottom = 6, sectionMarginTop = "0" } = attributes;

    const addStep = () => {
        setAttributes({
            steps: [
                ...steps,
                {
                    number: steps.length + 1 + "",
                    title: "Step title",
                    text: "Step description",
                },
            ],
        });
    };

    const updateStep = (index, field, value) => {
        const updated = [...steps];
        updated[index][field] = value;
        setAttributes({ steps: updated });
    };

    const removeStep = (index) => {
        const updated = steps.filter((_, i) => i !== index);
        setAttributes({ steps: updated });
    };

    const blockProps = useBlockProps({
        className: "p-6 bg-white rounded border",
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__("Timeline Steps", "zero")} initialOpen={true}>

                       <TextareaControl
                            label={__("Section Heading", "zero")}
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                        
                    {steps.map((step, i) => (
                        <div key={i} className="border p-3 rounded mb-3 bg-gray-50">

                            <TextControl
                                label={__("Number", "zero")}
                                value={step.number}
                                onChange={(v) => updateStep(i, "number", v)}
                            />

                            <TextControl
                                label={__("Title", "zero")}
                                value={step.title}
                                onChange={(v) => updateStep(i, "title", v)}
                            />

                            <TextareaControl
                                label={__("Description", "zero")}
                                value={step.text}
                                onChange={(v) => updateStep(i, "text", v)}
                            />

                            <Button
                                isDestructive
                                onClick={() => removeStep(i)}
                            >
                                Remove Step
                            </Button>
                        </div>
                    ))}

                    <Button isPrimary onClick={addStep}>
                        + Add Step
                    </Button>



                </PanelBody>

                <PanelBody title="Bottom Labels" initialOpen={false}>
                    {bottomLabels.map((label, i) => (
                        <TextControl
                            key={i}
                            label={`Label ${i + 1}`}
                            value={label}
                            onChange={(v) => {
                                const updated = [...bottomLabels];
                                updated[i] = v;
                                setAttributes({ bottomLabels: updated });
                            }}
                        />
                    ))}

                    
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


                  <PanelBody title="Styles" initialOpen={false}>
                                    <TextControl
                                        label="Section Classes"
                                        value={sectionClass}
                                        onChange={(v) => setAttributes({ sectionClass: v })}
                                    />
                                    <TextControl
                                        label="Section Background Color"
                                        value={sectionBGColor}
                                        onChange={(v) => setAttributes({ sectionBGColor: v })}
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

            <div {...blockProps}>
                <h3 className="font-semibold mb-4">Timeline (Preview)</h3>

                <div className="w-full border-t border-gray-300 relative mt-10">
                    <div className="grid grid-cols-4 gap-6 mt-6">
                        {steps.map((step, i) => (
                            <div key={i} className="relative text-center">

                                <div className="w-10 h-10 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center bg-white absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    {step.number}
                                </div>

                                <h4 className="font-semibold mt-6">{step.title}</h4>
                                <p className="text-gray-600 text-sm">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
