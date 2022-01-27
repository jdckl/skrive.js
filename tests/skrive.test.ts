import Skrive from '../src/index';

jest.useFakeTimers()
jest.spyOn(window, 'setTimeout')

describe('Basic functionality testing', () => {
    it('should wait for 200ms', () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        t.sleep(180)

        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 180)

        expect(t.typeDelay).toBe(180);
        expect(t.clearBeforeWriting).toBeFalsy();
    })

    it('should set custom options', () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0], {
            typeDelay: 500,
            clearBeforeWriting: true
        })

        expect(t.typeDelay).toBe(500);
        expect(t.clearBeforeWriting).toBeTruthy();
    })

    it('should throw a "Missing DOM element!" error', () => {
        expect(() => {
            // @ts-expect-error
            new Skrive('test')
        }).toThrow('Missing DOM element!')
    })

    it('should type out "test" into the element', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await t.write('test')

        expect(document.body.querySelectorAll('#container')[0].innerHTML).toBe('test');
        expect(sleepMock).toHaveBeenCalledTimes(4);
    })

    it('should type out "test and test again" into the element while chaining', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await (await t.write('test')).write(' and test again')
        expect(document.body.querySelectorAll('#container')[0].innerHTML).toBe('test and test again');
        expect(sleepMock).toHaveBeenCalledTimes(19);
    })

    it('should clear the element before writing "cleared" to it ', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await t.write('test')
        await t.write('cleared', 200, true)

        expect(document.body.querySelectorAll('#container')[0].innerHTML).toBe('cleared');
        expect(sleepMock).toHaveBeenCalledTimes(11);
    })

    it('should clear the element', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await t.write('test')
        await t.clear()

        expect(document.body.querySelectorAll('#container')[0].innerHTML).toBe('');
        expect(sleepMock).toHaveBeenCalledTimes(4);
    })

    it('should unwrite the element', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await t.write('test')
        await t.unwrite()

        expect(document.body.querySelectorAll('#container')[0].innerHTML).toBe('');
        expect(sleepMock).toHaveBeenCalledTimes(8);
    })

    it('should throw a "Nothing to unwrite!" error', async () => {
        document.body.innerHTML = '<div id="container"></div>'
        const t = new Skrive(document.body.querySelectorAll('#container')[0])

        let sleepMock = jest.spyOn(t, 'sleep');
            sleepMock.mockResolvedValue();

        await t.write('test')
        t.clear();

        expect(async () => {
            await t.unwrite()
        }).rejects.toThrow('Nothing to unwrite!')
        expect(sleepMock).toHaveBeenCalledTimes(4);
    })
})

afterEach(() => {
    document.body.innerHTML = '';
})