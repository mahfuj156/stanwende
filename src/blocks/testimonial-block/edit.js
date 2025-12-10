import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    RichText,
    MediaUpload,
    InspectorControls,
} from "@wordpress/block-editor";
import {
    PanelBody,
    TextControl,
    TextareaControl, 
    Button,
    RangeControl,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
    const { title, subtitle, buttonText, buttonUrl, testimonials = [],sectionClass="", sectionColor="" ,paddingTop="",paddingBottom="",maxContainerWidth="",titleFontSize="",subtitleFontSize="" } = attributes;

    const addTestimonial = () => {
        setAttributes({
            testimonials: [
                ...testimonials,
                { avatar: "", name: "Name", role: "Role", rating: 5, text: "" },
            ],
        });
    };

    const updateTestimonial = (index, field, value) => {
        const updated = [...testimonials];
        updated[index][field] = value;
        setAttributes({ testimonials: updated });
    };

    const removeTestimonial = (index) => {
        const updated = testimonials.filter((_, i) => i !== index);
        setAttributes({ testimonials: updated });
    };

    const blockProps = useBlockProps({
        className: "p-6 bg-[#F7F7F2] rounded-xl",
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__("Block Settings", "zero")} initialOpen={true}>
                    <TextareaControl
                        label={__("Title", "zero")}
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                    />
                    <TextareaControl
                        label={__("Subtitle", "zero")}
                        value={subtitle}
                        onChange={(v) => setAttributes({ subtitle: v })}
                    />
                    <TextareaControl
                        label={__("Button text", "zero")}
                        value={buttonText}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                    <TextareaControl
                        label={__("Button URL", "zero")}
                        value={buttonUrl}
                        onChange={(v) => setAttributes({ buttonUrl: v })}
                    />
                </PanelBody>

                <PanelBody title={__("Testimonials", "zero")} initialOpen={false}>
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="border p-3 rounded mb-3 bg-gray-50"
                        >
                            <MediaUpload
                                onSelect={(media) =>
                                    updateTestimonial(i, "avatar", media.url)
                                }
                                type="image"
                                render={({ open }) => (
                                    <Button isSecondary onClick={open} className="mb-2 w-full">
                                        {t.avatar ? __("Change avatar", "zero") : __("Upload avatar", "zero")}
                                    </Button>
                                )}
                            />

                            <TextControl
                                label={__("Name", "zero")}
                                value={t.name}
                                onChange={(v) => updateTestimonial(i, "name", v)}
                            />

                            <TextControl
                                label={__("Role", "zero")}
                                value={t.role}
                                onChange={(v) => updateTestimonial(i, "role", v)}
                            />

                            <RangeControl
                                label={__("Rating", "zero")}
                                min={1}
                                max={5}
                                value={t.rating}
                                onChange={(v) => updateTestimonial(i, "rating", v)}
                            />

                            <TextareaControl
                                label={__("Text", "zero")}
                                value={t.text}
                                onChange={(v) => updateTestimonial(i, "text", v)}
                            />

                            <Button
                                isDestructive
                                onClick={() => removeTestimonial(i)}
                                className="mt-2"
                            >
                                {__("Remove", "zero")}
                            </Button>
                        </div>
                    ))}

                    <Button isPrimary onClick={addTestimonial}>
                        {__("Add Testimonial", "zero")}
                    </Button>
                </PanelBody>


                 {/* Style Panel */}
                                <PanelBody title="Styles" initialOpen={false}>
                
                                    <TextControl
                                        label="Section Class"
                                        value={sectionClass}
                                        onChange={(v) => setAttributes({ sectionClass: v })}
                                    />
                                    <TextControl
                                        label="Section Background Color"
                                        value={sectionColor}
                                        onChange={(v) => setAttributes({ sectionColor: v })}
                                    />

                                     <TextControl
                                        label="Container Max Width"
                                        value={maxContainerWidth}
                                        onChange={(v) => setAttributes({ maxContainerWidth: v })}
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
                                        label={__("Title Font Size (PX)", "zero")}
                                        value={titleFontSize}
                                        onChange={(value) => setAttributes({ titleFontSize: value })}
                                        min={10}
                                        max={100}
                                        /> 
                                    <RangeControl
                                        label={__("Subtitle Font Size (PX)", "zero")}
                                        value={subtitleFontSize}
                                        onChange={(value) => setAttributes({ subtitleFontSize: value })}
                                        min={10}
                                        max={100}
                                        /> 
                                </PanelBody>

            </InspectorControls>

            <section {...blockProps}>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="opacity-75 mb-6">{subtitle}</p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-5 shadow flex flex-col items-center text-center"
                        >
                            {t.avatar && (
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-20 h-20 rounded-full mb-4 object-cover"
                                />
                            )}
                            <h3 className="font-semibold">{t.name}</h3>
                            <p className="opacity-75 mb-2">{t.role}</p>
                            <p className="mb-2">{"⭐".repeat(t.rating)}</p>
                            <p className="text-sm">{t.text}</p>
                        </div>
                    ))}
                </div>

                {buttonText && (
                    <div className="flex justify-center mt-6">
                        <a
                            href={buttonUrl || "#"}
                            className="bg-primary text-white px-6 py-3 rounded-md"
                        >
                            {buttonText}
                        </a>
                    </div>
                )}
            </section>
        </Fragment>
    );
}
