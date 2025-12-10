import { __ } from "@wordpress/i18n";
import { TextControl, PanelBody } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
    const { title } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title="Calculator Settings">
                    <TextControl
                        label="Title"
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <h2>{title}</h2>
                <p><em>Frontend calculator preview will appear on the live site.</em></p>
            </div>
        </>
    );
}
