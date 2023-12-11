import CanvasController from "./canvasController";

class CanvasFilterManager {

    /**
     * Creates a CanvasFilterManager instance.
     * @param {CanvasController} canvas - The canvas element to manage filters on.
     */
    constructor(canvas) {
        /**
         * The canvas element.
         * @private
         * @type {CanvasController}
         */
        this.canvas = canvas;

        /**
         * An array to store filters, where each filter is represented by an object with `name` and `value` properties.
         * @private
         * @type {Array<{ name: string, value: number }>}
         */
        this.filters = [];
    }

    /**
     * Adds or updates a filter in the array.
     * If the filter with the given name already exists, its value will be updated.
     * If the filter does not exist, it will be added to the array.
     * @param {string} name - The name of the filter (e.g., 'brightness', 'contrast').
     * @param {number} value - The value of the filter (percentage).
     */
    addOrUpdateFilter(name, value) {
        const existingFilterIndex = this.filters.findIndex(filter => filter.name === name);

        if (existingFilterIndex !== -1) {
            // Update the existing filter
            this.filters[existingFilterIndex].value = value;
        } else {
            // Add a new filter
            this.filters.push({ name, value });
        }
    }

    /**
     * @param {string} name 
     * @returns {number}
     */
    getFilterValue(name) {
        const filter = this.filters.find(f => f.name == name);

        if (!filter) return 0;

        return filter.value;
    }

    /**
     * Removes a filter from the array.
     * @param {string} name - The name of the filter to be removed.
     */
    removeFilter(name) {
        this.filters = this.filters.filter((filter) => filter.name !== name);
    }

    /**
     * Gets the filter string to be applied to the canvas.
     * @returns {string} - The filter string.
     */
    getFilters() {
        return this.filters
            .map(({ name, value }) => `${name}(${value})`)
            .join(' ');
    }
}

export default CanvasFilterManager;
