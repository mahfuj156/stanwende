import { __ } from '@wordpress/i18n';
import { Fragment } from "@wordpress/element";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  PanelBody,
  TextControl,
  Button,
  SelectControl,
  RangeControl,
  TextareaControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const { heading, subheading, items = [], columns, buttonText = "", buttonUrl = "", bottomLabels = [], sectionClass="",sectionMarginTop="", sectionColor="" ,paddingTop="",paddingBottom="",titleFontSize="",subtitleFontSize="" } = attributes;

  const blockProps = useBlockProps({ className: "py-12" });
 

  
    // -------------------------
    // PARENT ITEM FUNCTIONS
    // -------------------------
    const addItem = () => {
        setAttributes({
            items: [
                ...items,
                {
                    iconImage: { id: 0, url: "" },
                    title: "", 
                }
            ]
        });
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setAttributes({ items: updated });
    };

     


  return (
    <Fragment>
      {/* REAL InspectorControls (sidebar) */}
      <InspectorControls>
        <PanelBody title="General Settings" initialOpen={true}>
       
        
          <TextareaControl
                            label="Heading"
                            value={heading}
                            onChange={(v) => setAttributes({ heading: v })}
                        />
        <TextareaControl
            label="Subheading"
            value={subheading}
            onChange={(v) => setAttributes({ subheading: v })}
        />
  
         
        </PanelBody> 


         <PanelBody title="Items Image" initialOpen={true}>
                    {items.map((item, index) => (
                        <div key={index} className="border p-3 mb-4 rounded">

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

                            <TextControl
                                label="Caption"
                                value={item.title}
                                onChange={(v) => updateItem(index, "title", v)}
                            />

                         
 

                            <Button
                                isDestructive
                                className="mt-3"
                                onClick={() => removeItem(index)}
                            >
                                Remove Item
                            </Button>

                        </div>
                    ))}

                    <Button isPrimary onClick={addItem}>
                        Add Item
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


                     
 <SelectControl
            label="Columns"
            value={columns}
            options={[
              { label: "1 Column", value: 1 },
              { label: "2 Columns", value: 2 },
              { label: "3 Columns", value: 3 },
            ]}
            onChange={(v) => setAttributes({ columns: Number(v) })}
          />
                
                </PanelBody>


      </InspectorControls>

      {/* BLOCK CANVAS — WE BUILD A LAYOUT WITH RIGHT-SIDE DESCRIPTION */}
      <section {...blockProps}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* LEFT: Main Content */}
          <div className="md:col-span-3">

            {/* Title */}
            <RichText
              tagName="h2"
              placeholder="Enter title…"
              value={heading}
              onChange={(v) => setAttributes({ heading: v })}
              className="text-2xl md:text-3xl font-bold mb-4"
            />
 

            {/* Repeater Grid */}
            <div
              className={`grid gap-6 ${
                columns === 1
                  ? "grid-cols-1"
                  : columns === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
                {items.map((item, index) => (
                        <div key={index} className="border p-5 rounded">

                            {item.iconImage?.url && (
                                <img
                                    src={item.iconImage.url}
                                    className="w-12 h-12 object-contain mb-3"
                                />
                            )}

                            <h3 className="text-xl font-bold">{item.title}</h3> 
                        </div>
                    ))}
            </div>

           
          </div> 
        </div>
      </section>
    </Fragment>
  );
}
