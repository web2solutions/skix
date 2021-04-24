export class Entity {
    x = 0;
    y = 0;

    // change
    // assetName = '';
    _assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    // change
    get assetName() {
        return this._assetName;
    }

    // change
    set assetName(name) {
        if (typeof name !== 'string') {
            throw new Error('Skier asset name must be a string');
        }
        console.info('set assetName', name);
        this._assetName = name;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}
