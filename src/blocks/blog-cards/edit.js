import { Fragment, useEffect, useState } from "@wordpress/element";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl, RangeControl, Spinner, TextareaControl, TextControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const {title, subtitle,metatitle, category, numberOfPosts, order, buttonText, buttonUrl,
     sectionClass,
        sectionBGColor,
        paddingTop,
        paddingBottom,
        sectionMarginTop,
        containerMaxWidth,
        textAlignment,
        showCategory,
        showPagination,
   } = attributes;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories dynamically
  useEffect(() => {
    let isMounted = true;
    apiFetch({ path: "/wp/v2/categories?per_page=100" })
      .then((cats) => {
        if (!isMounted) return;
        const options = cats.map((c) => ({ label: c.name, value: c.slug }));
        setCategories([{ label: __("All Categories", "custom"), value: "" }, ...options]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { isMounted = false; };
  }, []);

  const blockProps = useBlockProps({ className: "p-8 md:p-12 rounded-xl bg-gray-50" });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__("Settings", "custom")} initialOpen={true}>

            <TextareaControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
            <TextareaControl
            label="Meta Title"
            value={metatitle}
            onChange={(value) => setAttributes({ metatitle: value })}
          />

          <TextareaControl
            label="Subtitle"
            value={subtitle}
            onChange={(value) => setAttributes({ subtitle: value })}
          />

          {loading ? (
            <Spinner />
          ) : (
            <SelectControl
              label={__("Category", "custom")}
              value={category}
              options={categories}
              onChange={(value) => setAttributes({ category: value })}
            />
          )}

          <RangeControl
            label={__("Number of Posts", "custom")}
            value={numberOfPosts}
            onChange={(value) => setAttributes({ numberOfPosts: value })}
            min={1}
            max={20}
          />

          <SelectControl
            label={__("Order", "custom")}
            value={order}
            options={[
              { label: __("Descending", "zero"), value: "DESC" },
              { label: __("Ascending", "zero"), value: "ASC" },
            ]}
            onChange={(value) => setAttributes({ order: value })}
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

            <SelectControl
            label="Show Category"
            value={showCategory}
            options={[
              { label: 'Show Category', value: "Yes" },
              { label: 'Hide Category', value: "No" }
            ]}
            onChange={(value) => setAttributes({ showCategory: value })} 
          />
            <SelectControl
            label="Show Pagination"
            value={showPagination}
            options={[
              { label: 'Show Pagination', value: "Yes" },
              { label: 'Hide Pagination', value: "No" }
            ]}
            onChange={(value) => setAttributes({ showPagination: value })} 
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

                  <SelectControl
            label="Text Alignmnet"
            value={textAlignment}
            options={[
              { label: 'Text Left', value: "left" },
              { label: 'Text Right', value: "right" },
              { label: 'Text Justify', value: "justify" }
            ]}
            onChange={(value) => setAttributes({ textAlignment: value })} 
          />
          

          
          </PanelBody>
                

      </InspectorControls>

      <section {...blockProps}>
        <div className="text-center">
          <h3 className="font-bold text-xl text-gray-700">
            {__("Select Category, Configure Posts and Order", "custom")}
          </h3>
        </div>
      </section>
    </Fragment>
  );
}
