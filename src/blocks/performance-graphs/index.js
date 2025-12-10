import Edit from "./edit";
import save from "./save";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("zero/performance-graphs", {
    edit: Edit,
    save,
});