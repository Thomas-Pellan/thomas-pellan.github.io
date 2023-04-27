class Prospect {
    private _name: string;
    private _mail: string;
    private _phone: string;
    private _dataConsent: boolean;
    private _newsletterConsent: boolean;
    constructor(name: string, mail: string, phone: string, dataConsent: boolean, newsletterConsent: boolean) {
        this._name = name;
        this._mail = mail;
        this._phone = phone;
        this._dataConsent = dataConsent;
        this._newsletterConsent = newsletterConsent;
    }

    get newsletterConsent(): boolean {
        return this._newsletterConsent;
    }

    set newsletterConsent(value: boolean) {
        this._newsletterConsent = value;
    }

    get dataConsent(): boolean {
        return this._dataConsent;
    }
    set dataConsent(value: boolean) {
        this._dataConsent = value;
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }
}

export default Prospect;