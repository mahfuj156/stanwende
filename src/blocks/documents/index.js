import Edit from "./edit";
import save from "./save";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("zero/documents", {
    edit: Edit,
    save,
});