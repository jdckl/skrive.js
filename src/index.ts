/** Wait for x ms */
export const sleep = (ms:number) : Promise<void> => new Promise((r) => setTimeout(r, ms))

/**
 * Simple module to iteratively type characters into DOM elements
 */
class Skrive {
    el: Element;
    typeDelay: number;
    clearBeforeWriting: boolean;

    /** Constructor */
    constructor (e:Element, opts: { 
        typeDelay?: number,
        clearBeforeWriting?: boolean
    }) {
        if (!e || e instanceof Element === false) throw 'Missing DOM element!';

        this.el = e;
        this.typeDelay = opts.typeDelay ? opts.typeDelay : 180;
        this.clearBeforeWriting = opts.clearBeforeWriting ? opts.clearBeforeWriting : false;
    }

    /** Clear the element */
    clear = () : Skrive => {
        this.el.innerHTML = '';
        return this;
    }

    /** Write to element */
    async write (str: string, typeDelay = null, clearBefore = false) : Promise<Skrive> {
        if (this.clearBeforeWriting || clearBefore) this.clear();

        const strArray = str.split('');
        for (const [i, char] of strArray.entries()) {
            this.el.insertAdjacentHTML('beforeend', char);
            if (i+1 <= strArray.length) await sleep(typeDelay || this.typeDelay);
        }

        return this;
    }
}

export default Skrive;