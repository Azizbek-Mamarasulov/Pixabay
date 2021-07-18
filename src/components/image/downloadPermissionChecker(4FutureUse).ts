import { Permission } from 'react-native';
import { check, PERMISSIONS, requestMultiple } from 'react-native-permissions';

const READ_EXTERNAL_STORAGE = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
const WRITE_EXTERNAL_STORAGE = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

export async function checkPermissions() {
    const ps = [READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE];
    const aps: Permission[] = [];
    for (let x of ps) {
        const sts = await check(x);
        if (sts == 'blocked' || sts == 'unavailable') {
            return false;
        }
        if (sts == 'denied') {
            aps.push(x);
        }
    }
    
    if (aps.length == 0) {
        return true;
    }
    
    const statuses = await requestMultiple(aps);
    let bool = true;
    let x: Permission;
    for (x in statuses) {
        bool = statuses[x] == 'granted' && bool;
    }
    
    return bool;
}