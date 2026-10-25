const KEY='sunset-city-save-v1';
export const SaveSystem={save(data){try{localStorage.setItem(KEY,JSON.stringify({...data,savedAt:new Date().toISOString()}));return true;}catch(e){return false;}},load(){try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):null;}catch(e){return null;}}};
