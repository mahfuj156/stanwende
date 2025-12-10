import Edit from "./edit";
import save from "./save";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("zero/contact-us", {
    edit: Edit,
    save,
});