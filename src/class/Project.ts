import type Budget from './Budget'

class Project {

    private _services: string[];
    private _attendees: string;
    private _budget: Budget;
    private _isPresent: boolean;
    private _comment: string;
    constructor(services: string[], attendees: string, budget: Budget, isPresent: boolean, comment: string) {
        this._services = services;
        this._attendees = attendees;
        this._budget = budget;
        this._isPresent = isPresent;
        this._comment = comment;
    }

    get comment(): string {
        return this._comment;
    }

    set comment(value: string) {
        this._comment = value;
    }

    get services(): string[] {
        return this._services;
    }

    set services(value: string[]) {
        this._services = value;
    }

    get attendees(): string {
        return this._attendees;
    }

    set attendees(value: string) {
        this._attendees = value;
    }

    get budget(): Budget {
        return this._budget;
    }

    set budget(value: Budget) {
        this._budget = value;
    }

    get isPresent(): boolean {
        return this._isPresent;
    }

    set isPresent(value: boolean) {
        this._isPresent = value;
    }
}

export default Project;