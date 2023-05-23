import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FunctionUtility {
    ToFormData(formValue: any) {
        debugger
        const formData = new FormData();
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            if (value != null || value != undefined)
                formData.append(key, value);
        }
        return formData;
    }
}
