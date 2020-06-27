let dbName = "saves";
let storeName = "saveStore";
let transactionRunning = false;
let retData;

/**
 * makeRequest
 * Manages requests, has three modes, save, load, clear and delete. Save and delete requires a payload
 * @param requestData {operation: [save, load, clear, delete], payload{ name: [name of disease], list: [list of symptoms], totals: [totals of disease], id: [id of item to delete]}}
 */
function makeRequest(requestData) {
	return new Promise(resolve => {
		let request = indexedDB.open(dbName, 1),
			db,
			tx,
			store,
			index;

		request.onupgradeneeded = e => {
			db = e.target.result;
			store = db.createObjectStore(storeName, { autoIncrement: true });
			index = store.createIndex("name", "name", { unique: false });
		};

		request.onsuccess = e => {
			transactionRunning = true;
			db = e.target.result;
			tx = db.transaction(storeName, "readwrite");
			store = tx.objectStore(storeName);
			index = store.index("name");

			db.onerror = e => {
				console.error("Error: " + e.target.errorCode);
				console.log(e);
				reject("Error: " + e.target.errorCode);
				transactionRunning = false;
			};

			switch (requestData.operation) {
				case "save":
					store.put({
						name: requestData.payload.name,
						list: requestData.payload.list,
						totals: requestData.payload.totals
					});
                    break;
                    
				case "load":
                    // Returns value with primary key
					const result = [];

					index.openCursor().onsuccess = event => {
						var cursor = event.target.result;
						if (cursor) {
							result.push({id: cursor.primaryKey, value: cursor.value});
                            cursor.continue();
						}
                    };
						retData = result;
                    break;
                    
				case "clear":
					let s1;
					if (store) {
						s1 = store.clear(); // Clears store to keep it up to date
					}
					s1.onsuccess = () => {
						console.log("All saves cleared");
					};
                    break;
                case "delete":
                    let d1;
                    d1 = store.delete(requestData.payload.id)
                    d1.onsuccess = () => {
                        console.log("Save deleted");
                    }
                    break;
                default:
                    reject("Invalid operator")
			}

			tx.oncomplete = () => {
				transactionRunning = false;
				db.close();
				if (!transactionRunning) {
					if (retData) {
						resolve(retData);
					}
				}
			};
		};
	});
}
export default makeRequest;
