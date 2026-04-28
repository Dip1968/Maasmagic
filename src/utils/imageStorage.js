const DB_NAME = 'village-image-db';
const STORE_NAME = 'product-images';
const REF_PREFIX = 'idb-image:';

const openImageDb = () =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Unable to open the image database.'));
  });

const runTransaction = async (mode, handler) => {
  const database = await openImageDb();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);

    let settled = false;

    const finish = (callback) => (value) => {
      if (settled) return;
      settled = true;
      callback(value);
    };

    transaction.oncomplete = () => database.close();
    transaction.onabort = finish(() => {
      database.close();
      reject(new Error('Image storage transaction was aborted.'));
    });
    transaction.onerror = finish(() => {
      database.close();
      reject(transaction.error || new Error('Image storage transaction failed.'));
    });

    handler(store, finish(resolve), finish((error) => reject(error)));
  });
};

export const isStoredImageRef = (value) => typeof value === 'string' && value.startsWith(REF_PREFIX);

export const isInlineImageData = (value) => typeof value === 'string' && value.startsWith('data:image/');

export const createImageRef = (key) => `${REF_PREFIX}${key}`;

export const createImageKey = (productId, fileName = 'upload') => {
  const normalizedFileName = fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-+|-+$/g, '');
  return `${productId}-${Date.now()}-${normalizedFileName || 'image'}`;
};

export const saveImageBlob = async (blob, key) => {
  await runTransaction('readwrite', (store, resolve, reject) => {
    const request = store.put(blob, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Unable to save the image.'));
  });

  return createImageRef(key);
};

export const saveImageFile = (file, key) => saveImageBlob(file, key);

export const saveDataUrlImage = async (dataUrl, key) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return saveImageBlob(blob, key);
};

export const loadStoredImageUrl = async (ref) => {
  if (!isStoredImageRef(ref)) return ref;

  const key = ref.slice(REF_PREFIX.length);

  return runTransaction('readonly', (store, resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => {
      const blob = request.result;
      resolve(blob ? URL.createObjectURL(blob) : '');
    };
    request.onerror = () => reject(new Error('Unable to load the stored image.'));
  });
};

export const deleteStoredImage = async (ref) => {
  if (!isStoredImageRef(ref)) return;

  const key = ref.slice(REF_PREFIX.length);

  await runTransaction('readwrite', (store, resolve, reject) => {
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Unable to delete the stored image.'));
  });
};
