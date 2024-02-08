function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("RoadXS", 1);

    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("RoadXSStore", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}
export async function fetchData() {
  const db = await openDatabase();
  const transaction = db.transaction(["RoadXSStore"], "readonly");
  const objectStore = transaction.objectStore("RoadXSStore");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject('Error fetching data: ' + event.target.errorCode);
  });
}

async function saveData(data) {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["RoadXSStore"], "readwrite");
    const objectStore = transaction.objectStore("RoadXSStore");
    const request = objectStore.add(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve('Data saved successfully');
      request.onerror = (event) => reject('Error saving data: ' + event.target.errorCode);
    });
  } catch (error) {
    throw new Error('Error opening database: ' + error);
  }
}
