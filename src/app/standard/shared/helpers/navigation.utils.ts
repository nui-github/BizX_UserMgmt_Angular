import * as CryptoJS from 'crypto-js';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Permission } from '../../pages/standard-permission/models/standard-permission.model';
import { StandardPermissionService } from '../../pages/standard-permission/services/standard-permission.service';

// Encryption key - In production, this should be from environment config
const ENCRYPTION_KEY = 'dochub-sso-key-2025';

export interface CurrentUser {
    username: string;
    firstname: string;
    lastname: string;
    uid: string;
    ucode: string;
    email: string;
    gid: string;
    cpid: string;
    firstLogin: boolean;
    permissions: string[];
}

export function initializeUserSession(
    permissionService: StandardPermissionService,
): CurrentUser | null {
    try {
        const currentUser = getCurrentUserDataFromUrl();

        if (!currentUser) {
            console.log('No current user found in URL');
            return null;
        }

        setUserDataToSessionStorage(currentUser);
        processNavigateAuthSuccess(permissionService, {});
        return currentUser;
    } catch (error) {
        console.error('Failed to initialize external user session:', error);
        return null;
    }
}


export function getCurrentUserDataFromUrl(): CurrentUser | null {
    try {
        // Look for encrypted user data in URL hash
        const hash = window.location.hash;
        const hashMatch = hash.match(/dochubUser=([^&]+)/);

        if (hashMatch) {
            const encryptedData = decodeURIComponent(hashMatch[1]);

            // Decrypt user data
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedData) {
                console.error('Failed to decrypt user data - invalid key or corrupted data');
                return null;
            }

            return JSON.parse(decryptedData);
        }

        return null;
    } catch (error) {
        console.error('Error retrieving encrypted user data from URL:', error);
        return null;
    }
}

export function setUserDataToSessionStorage(userData: CurrentUser): boolean {
    try {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        console.log('User data successfully set to session storage');
        return true;
    } catch (error) {
        console.error('Failed to set user data to session storage:', error);
        return false;
    }
}

export async function processNavigateAuthSuccess(
    // res: StandardResponse<any>,
    permissionService: StandardPermissionService,
    searchPermission: { permissionCode?: string },
): Promise<void> {
    const permissionRes = await firstValueFrom(
        permissionService.getPermissionListInformation(
            1,
            9999,
            searchPermission.permissionCode ?? null
        )
    );

    setPermissionList(permissionRes.data?.data);
}

export function getPermissionListInformation(
    permissionService: StandardPermissionService,
    searchPermission: { permissionCode?: string },
    setPermissionListFn: (data: Permission[] | undefined) => void
): void {
    permissionService
        .getPermissionListInformation(1, 9999, searchPermission.permissionCode ?? null)
        .subscribe({
            next: (res) => {
                setPermissionListFn(res.data?.data);
            },
            error: (err) => {
                console.error(err);
            }
        });
}


export function setPermissionList(data: Permission[] | undefined): void {
    if (!data || data.length === 0) {
        return;
    }

    const output: Record<string, any> = {};
    const permissions = new Map<string, string>();

    data.forEach(p => {
        if (!p.permissionCode) {
            return; // skip null / undefined
        }
        permissions.set(p.permissionCode, p.permissionCode);
    });

    permissions.forEach((value, key) => {
        const keys = key.split('.');
        const last = keys.pop()!; // ปลอดภัยแล้ว เพราะ key เป็น string แน่นอน

        keys.reduce((r, a) => {
            r[a] = r[a] || {};
            return r[a];
        }, output)[last] = value;
    });

    sessionStorage.setItem('permissionList', JSON.stringify(output));
}