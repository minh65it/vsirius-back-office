import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FunctionUtility {
    ToFormData(formValue: any) {
        const formData = new FormData();
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            if (value != null || value != undefined)
                formData.append(key, value);
        }
        return formData;
    }
    // convert image file
    base64ToFile(base64: string, fileName: string): File {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], fileName, { type: 'image/jpeg' });
    }
}
