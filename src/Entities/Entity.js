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
        this._assetName = name;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        if (this.assetName === '') {
            return;
        }
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}
