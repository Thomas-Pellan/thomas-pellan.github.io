import Prospect from "./Prospect";

class ExtendedProspect extends Prospect {

    private _companyName: string;
    private _title: string;

    constructor(name: string, mail: string, phone: string, dataConsent: boolean, companyName: string, title: string) {
        super(name, mail, phone, dataConsent);
        this._companyName = companyName;
        this._title = title;
    }

    get companyName(): string {
        return this._companyName;
    }

    set companyName(value: string) {
        this._companyName = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}

export default ExtendedProspect;