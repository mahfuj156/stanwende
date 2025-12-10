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
  Button,
  SelectControl,
  TextareaControl,
  RangeControl
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { title = "", subtitle = "",footerTxt="", columns = [], rows = [],sectionColor="" ,paddingTop="",paddingBottom="",titleFontSize="",subtitleFontSize=""} = attributes;
  const blockProps = useBlockProps({ className: "p-6 md:p-8 bg-white rounded-lg shadow-sm" });

  // ---------- Columns ----------
  const addColumn = () => {
    const newCol = { iconType: "icon", icon: "fa-solid fa-star", title: "New", subtitle: "", buttonText: "", buttonUrl: "" };
    const newColumns = [...columns, newCol];
    const newRows = rows.map(r => ({ cells: [...r.cells, { type: "text", value: "" }] }));
    setAttributes({ columns: newColumns, rows: newRows });
  };

  const removeColumn = (colIndex) => {
    if (!confirm("Remove this column?")) return;
    const newColumns = columns.filter((_, i) => i !== colIndex);
    const newRows = rows.map(r => ({ cells: r.cells.filter((_, i) => i !== colIndex) }));
    setAttributes({ columns: newColumns, rows: newRows });
  };

  const updateColumnField = (colIndex, field, value) => {
    const newColumns = [...columns];
    newColumns[colIndex] = { ...newColumns[colIndex], [field]: value };
    setAttributes({ columns: newColumns });
  };

  const onSelectHeaderImage = (colIndex, media) => {
    if (!media) return;
    updateColumnField(colIndex, "iconType", "image");
    updateColumnField(colIndex, "icon", media.url || "");
  };

  // ---------- Rows ----------
  const addRow = () => {
    const newRow = { cells: columns.map(() => ({ type: "text", value: "" })) };
    setAttributes({ rows: [...rows, newRow] });
  };

  const removeRow = (rowIndex) => {
    if (!confirm("Remove this row?")) return;
    setAttributes({ rows: rows.filter((_, i) => i !== rowIndex) });
  };

  const updateRowCell = (rowIndex, colIndex, cell) => {
    const newRows = [...rows];
    newRows[rowIndex].cells[colIndex] = cell;
    setAttributes({ rows: newRows });
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__("General", "zero")} initialOpen={true}>
          <TextareaControl label={__("Title", "zero")} value={title} onChange={v => setAttributes({ title: v })} />
          <TextareaControl label={__("Subtitle", "zero")} value={subtitle} onChange={v => setAttributes({ subtitle: v })} />
          <TextareaControl label={__("Footer Text", "zero")} value={footerTxt} onChange={v => setAttributes({ footerTxt: v })} />
        </PanelBody>

        <PanelBody title={__("Columns (Header) Settings", "zero")} initialOpen={false}>
          {columns.map((col, i) => (
            <div key={i} style={{ padding: "10px", borderBottom: i < columns.length - 1 ? "1px solid #eee" : "none", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <strong>Column {i + 1}</strong>
                <Button isDestructive onClick={() => removeColumn(i)} style={{ marginLeft: "auto" }}>{__("Delete", "zero")}</Button>
              </div>

              <SelectControl
                label={__("Icon type", "zero")}
                value={col.iconType || "icon"}
                options={[
                  { label: "FontAwesome Icon", value: "icon" },
                  { label: "Image Upload", value: "image" }
                ]}
                onChange={v => updateColumnField(i, "iconType", v)}
              />

              {col.iconType === "icon" && (
                <TextControl label={__("FontAwesome class", "zero")} value={col.icon || ""} onChange={v => updateColumnField(i, "icon", v)} />
              )}

              {col.iconType === "image" && (
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={media => onSelectHeaderImage(i, media)}
                    allowedTypes={["image"]}
                    render={({ open }) => col.icon ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={col.icon} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 6, border: "1px solid #eee" }} />
                        <div>
                          <Button isSecondary onClick={open}>{__("Replace", "zero")}</Button>
                          <Button isDestructive onClick={() => updateColumnField(i, "icon", "")} style={{ marginLeft: 8 }}>{__("Remove", "zero")}</Button>
                        </div>
                      </div>
                    ) : <Button isPrimary onClick={open}>{__("Upload Icon Image", "zero")}</Button>}
                  />
                </MediaUploadCheck>
              )}

              <TextControl label={__("Header Title", "zero")} value={col.title || ""} onChange={v => updateColumnField(i, "title", v)} />
              <TextControl label={__("Header Subtitle", "zero")} value={col.subtitle || ""} onChange={v => updateColumnField(i, "subtitle", v)} />
              <TextControl label={__("Button Text", "zero")} value={col.buttonText || ""} onChange={v => updateColumnField(i, "buttonText", v)} />
              <TextControl label={__("Button URL", "zero")} value={col.buttonUrl || ""} onChange={v => updateColumnField(i, "buttonUrl", v)} />
            </div>
          ))}

          <Button isPrimary onClick={addColumn} style={{ marginTop: 8 }}>+ {__("Add Column", "zero")}</Button>
        </PanelBody>

        <PanelBody title={__("Rows Settings", "zero")} initialOpen={false}>
          {rows.map((row, rIndex) => (
            <div key={rIndex} style={{ padding: 10, border: "1px solid #eee", borderRadius: 8, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{__("Row", "zero")} {rIndex + 1}</strong>
                <Button isDestructive onClick={() => removeRow(rIndex)}>{__("Delete Row", "zero")}</Button>
              </div>

              {columns.map((col, cIndex) => {
                const cell = row.cells[cIndex] || { type: "text", value: "" };
                return (
                  <div key={cIndex} style={{ marginTop: 8, padding: 8, border: "1px dashed #ddd", borderRadius: 6 }}>
                    <strong>{`Cell for ${col.title || "Column " + (cIndex+1)}`}</strong>
                    <SelectControl
                      label={__("Cell Type", "zero")}
                      value={cell.type}
                      options={[
                        { label: "Text", value: "text" },
                        { label: "FontAwesome Icon", value: "icon" }
                      ]}
                      onChange={v => updateRowCell(rIndex, cIndex, { ...cell, type: v })}
                    />
                    {cell.type === "text" && <TextControl label={__("Text value", "zero")} value={cell.value} onChange={v => updateRowCell(rIndex, cIndex, { ...cell, value: v })} />}
                    {cell.type === "icon" && <TextControl label={__("FontAwesome class", "zero")} value={cell.value} onChange={v => updateRowCell(rIndex, cIndex, { ...cell, value: v })} />}
                  </div>
                );
              })}
            </div>
          ))}

          <Button isPrimary onClick={addRow}>{__("Add Row", "zero")}</Button>
        </PanelBody>


            {/* Style Panel */}
                                <PanelBody title="Styles" initialOpen={false}>
                
                                    <TextControl
                                        label="Section Background Color"
                                        value={sectionColor}
                                        onChange={(v) => setAttributes({ sectionColor: v })}
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
        <div className="max-w-7xl mx-auto">
          {title && <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>}
          {subtitle && <p className="text-center text-sm text-gray-600 mb-6">{subtitle}</p>}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white rounded-lg">
              <thead className="text-center text-sm text-gray-700">
                <tr className="bg-green-50">
                  {columns.map((col, i) => (
                    <th key={i} className="p-4 border border-green-100 align-top">
                      <div className="flex flex-col items-center justify-center">
                        {col.iconType === "icon" && col.icon && <i className={`${col.icon} text-2xl mb-2`}></i>}
                        {col.iconType === "image" && col.icon && <img src={col.icon} className="w-14 h-14 object-contain mb-2" />}
                        <div className="font-semibold">{col.title}</div>
                        <div className="text-sm text-green-700">{col.subtitle}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="p-6 text-center text-gray-400 italic">No rows added yet.</td>
                  </tr>
                )}

                {rows.map((row, rIndex) => (
                  <tr key={rIndex} className={rIndex % 2 === 0 ? "bg-white" : "bg-green-50"}>
                    {columns.map((col, cIndex) => {
                      const cell = row.cells[cIndex] || { type: "text", value: "" };
                      return (
                        <td key={cIndex} className="p-4 border border-green-100 text-center">
                          {cell.type === "text" && <span className="font-semibold">{cell.value}</span>}
                          {cell.type === "icon" && cell.value && <i className={`${cell.value} text-2xl`}></i>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

           
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
