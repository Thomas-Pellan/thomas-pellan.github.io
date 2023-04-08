import Action from './Action';
class ButtonAction extends Action {

    private readonly _text: string;

    constructor(link: string, text: string) {
        super(link);
        this._text = text;
    }

    get text(): string {
        return this._text;
    }
}

export default ButtonAction;