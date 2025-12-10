import Edit from "./edit";
import save from "./save";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("zero/special-layout-table", {
    edit: Edit,
    save,
});