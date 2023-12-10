/**
 * @typedef {import("./snapshot").Snapshot} Snapshot
 */

export default class SnapshotManager {
    /**
     * @private
     * @type {Snapshot[]}
     */
    snapshots = [];

    /**
     * @param {Snapshot[]} snapshots 
     */
    loadSavedSnapshots(snapshots) {
        this.snapshots = snapshots;
    }

    /**
     * Get all snapshots.
     * @returns {Snapshot[]} - Array of all snapshots.
     */
    getAllSnapshots() {
        return this.snapshots;
    }

    /**
     * Save a new snapshot.
     * @param {string} data - Base64 data of the saved canvas image.
     */
    saveSnapshot(data) {
        const newSnapshot = {
            id: this.generateNewId(),
            data: data,
        };

        this.snapshots.push(newSnapshot);
    }

    /**
     * Get a snapshot by ID.
     * @param {number} id - ID of the snapshot to retrieve.
     * @returns {Snapshot|null} - The snapshot with the given ID, or null if not found.
     */
    getSnapshot(id) {
        return this.snapshots.find(snapshot => snapshot.id === id);
    }

    /**
     * Remove a snapshot by ID.
     * @param {number} id - ID of the snapshot to remove.
     */
    removeSnapshot(id) {
        this.snapshots = this.snapshots.filter(snapshot => snapshot.id !== id);
    }

    /**
     * @private
     * @returns {number} - The newly generated ID.
     */
    generateNewId() {
        if (this.snapshots.length == 0) return 0;

        return this.snapshots[this.snapshots.length - 1].id + 1;
    }

}
