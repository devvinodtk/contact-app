import { ref } from "firebase/storage";
import { storage } from "./firebase";

const mountainsRef = ref(storage, 'mountains.jpg');
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 