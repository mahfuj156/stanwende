import { Fragment } from "@wordpress/element";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  TextareaControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { title, subtitle, columns = [], rows = [] } = attributes;

  const updateColumn = (index, field, value) => {
    const updated = [...columns];
    updated[index] = { ...updated[index], [field]: value };
    setAttributes({ columns: updated });
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setAttributes({ rows: updated });
  };

  const addRow = () => {
    setAttributes({
      rows: [
        ...rows,
        {
          label: "",
          col1: { type: "text", value: "" },
          col2: { type: "text", value: "" },
          col3: { type: "text", value: "" },
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setAttributes({ rows: updated });
  };

  const blockProps = useBlockProps({
    className: "p-8 md:p-12 rounded-xl bg-gray-50",
  });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="General" initialOpen={true}>
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
        </PanelBody>

        <PanelBody title={__("Columns Header Settings", "custom")} initialOpen>
          {[0, 1, 2].map((colIndex) => (
            <div
              key={colIndex}
              style={{
                padding: "12px",
                borderBottom: colIndex < 2 ? "1px solid #ddd" : "none",
                marginBottom: "12px",
              }}
            >
              <MediaUploadCheck>
    <MediaUpload
        onSelect={(media) =>
            updateColumn(colIndex, "icon", media?.url || "")
        }
        allowedTypes={["image"]}
        render={({ open }) => (
            <div className="mt-3">
                <label className="components-base-control__label">
                    Column Icon (Image)
                </label>

                {columns[colIndex]?.icon ? (
                    <div>
                        <img
                            src={columns[colIndex].icon}
                            alt="Column icon"
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                                marginBottom: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        />
                        <Button isSecondary onClick={open}>
                            Replace Image
                        </Button>
                        <Button
                            isDestructive
                            onClick={() => updateColumn(colIndex, "icon", "")}
                            className="ml-2"
                        >
                            Remove
                        </Button>
                    </div>
                ) : (
                    <Button isPrimary onClick={open}>
                        Upload Icon
                    </Button>
                )}
            </div>
        )}
    />
</MediaUploadCheck>

              <TextControl
                label="Title"
                value={columns[colIndex]?.title || ""}
                onChange={(value) => updateColumn(colIndex, "title", value)}
              />
              <TextControl
                label="Subtitle"
                value={columns[colIndex]?.subtitle || ""}
                onChange={(value) => updateColumn(colIndex, "subtitle", value)}
              />
              <TextControl
                label="Button Text"
                value={columns[colIndex]?.buttonText || ""}
                onChange={(value) => updateColumn(colIndex, "buttonText", value)}
              />
              <TextControl
                label="Button URL"
                value={columns[colIndex]?.buttonUrl || ""}
                onChange={(value) => updateColumn(colIndex, "buttonUrl", value)}
              />
            </div>
          ))}
        </PanelBody>

        <PanelBody title={__("Rows Settings", "custom")} initialOpen>
          {rows.map((row, index) => (
            <div
              key={index}
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "12px",
                background: "#fafafa",
              }}
            >
              <TextControl
                label="Row Label"
                value={row.label}
                onChange={(value) => updateRow(index, "label", value)}
              />

              {["col1", "col2", "col3"].map((colKey) => {
                const col = row[colKey] || { type: "text", value: "" };
                return (
                  <div key={colKey} className="mt-4 p-2 border rounded bg-white">
                    <strong>{colKey.toUpperCase()}</strong>
                    <select
                      className="w-full mt-2"
                      value={col.type}
                      onChange={(e) =>
                        updateRow(index, colKey, { type: e.target.value, value: col.value })
                      }
                    >
                      <option value="text">Text</option>
                      <option value="icon">FontAwesome Icon</option>
                    </select>

                    {col.type === "text" && (
                      <TextControl
                        label="Text value"
                        value={col.value}
                        onChange={(val) => updateRow(index, colKey, { type: "text", value: val })}
                      />
                    )}

                    {col.type === "icon" && (
                      <TextControl
                        label="FontAwesome class (e.g., fa-solid fa-star)"
                        value={col.value}
                        onChange={(val) => updateRow(index, colKey, { type: "icon", value: val })}
                      />
                    )}
                  </div>
                );
              })}

              <Button
                isDestructive
                onClick={() => removeRow(index)}
                style={{ marginTop: "8px" }}
              >
                {__("Remove Row", "custom")}
              </Button>
            </div>
          ))}

          <Button
            variant="primary"
            onClick={addRow}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {__("Add Row", "custom")}
          </Button>
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-gray-900 bg-white rounded-lg shadow-md">
            <thead className="bg-green-50 text-center text-gray-700">
              <tr>
                <th className="p-4 border-b border-green-200"></th>
                {columns.map((col, i) => (
                  <th key={i} className="p-4 border-b border-green-200 align-top">
                    <div className="font-semibold">{col.title || "Title"}</div>
                    <div className="text-sm text-green-700 mb-2">{col.subtitle || "Subtitle"}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400 italic">
                    {__("No rows added yet.", "custom")}
                  </td>
                </tr>
              )}
              {rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-green-50" : "bg-white"}>
                  <td className="p-4 border border-green-200">{row.label || "Row label"}</td>
                  {["col1", "col2", "col3"].map((colKey, i) => {
                    const col = row[colKey];
                    return (
                      <td key={i} className="p-4 border border-green-200 text-center font-semibold">
                        {col?.type === "text" && col.value}
                        {col?.type === "icon" && <i className={`${col.value} text-2xl`}></i>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td></td>
                {columns.map((col, i) => (
                  <td key={i} className="p-4 text-center border-green-200 border-t">
                    {col.buttonText && col.buttonUrl ? (
                      <a
                        href={col.buttonUrl}
                        className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {col.buttonText}
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-block bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
                      >
                        No Button
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </Fragment>
  );
}
