import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    InspectorControls,
} from "@wordpress/block-editor";

import {
    PanelBody,
    RangeControl,
    TextControl,
    TextareaControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        incomeLabel,
        pensionLabel,
        buttonText,
        resultRoom,
        resultBack,
        incomeExample,
        pensionExample,
        sectionClass,
        sectionBGColor,
        paddingTop,
        paddingBottom,
        sectionMarginTop,
        containerMaxWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: "p-6 bg-gray-100 border rounded",
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Content Settings" initialOpen={true}>
                    <TextControl
                        label="Heading"
                        value={heading}
                        onChange={(v) => setAttributes({ heading: v })}
                    />

                    <TextControl
                        label="Income Label"
                        value={incomeLabel}
                        onChange={(v) => setAttributes({ incomeLabel: v })}
                    />

                    <TextControl
                        label="Pension Label"
                        value={pensionLabel}
                        onChange={(v) => setAttributes({ pensionLabel: v })}
                    />

                    <TextControl
                        label="Button Text"
                        value={buttonText}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                </PanelBody>

                <PanelBody title="Result Box Settings" initialOpen={false}>
                    <TextControl
                        label="Jaarruimte Amount"
                        value={resultRoom}
                        onChange={(v) => setAttributes({ resultRoom: v })}
                    />

                    <TextControl
                        label="Teruggave Amount"
                        value={resultBack}
                        onChange={(v) => setAttributes({ resultBack: v })}
                    />

                    <TextControl
                        label="Example: Income"
                        value={incomeExample}
                        onChange={(v) => setAttributes({ incomeExample: v })}
                    />

                    <TextControl
                        label="Example: Pensionopbouw"
                        value={pensionExample}
                        onChange={(v) => setAttributes({ pensionExample: v })}
                    />
                </PanelBody>

                <PanelBody title="Styles" initialOpen={false}>
                    <TextControl
                        label="Container Max Width"
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                    />
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
                <h3 className="font-bold text-xl mb-4">{heading}</h3>

                <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded shadow">
                    <div>
                        <p className="text-sm mb-2">{incomeLabel}</p>
                        <input className="border p-2 w-full rounded" placeholder="€ 00" />

                        <p className="text-sm mt-4 mb-2">{pensionLabel}</p>
                        <input className="border p-2 w-full rounded" placeholder="€ 00" />

                        <button className="w-full mt-4 bg-green-500 text-white p-2 rounded">
                            {buttonText}
                        </button>
                    </div>

                    <div className="bg-green-800 text-white p-6 rounded">
                        <h3 className="font-semibold text-lg">Jaarruimte</h3>
                        <p className="text-3xl font-bold mt-2">€ {resultRoom}</p>

                        <p className="mt-6">Op basis van:</p>

                        <ul className="mt-3 text-sm space-y-1">
                            <li>Bruto verzamelinkomen 2024: € {incomeExample}</li>
                            <li>Pensioenopbouw 2024: € {pensionExample}</li>
                        </ul>

                        <p className="mt-6 text-sm">Teruggave*</p>
                        <p className="text-2xl font-bold">€ {resultBack}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
