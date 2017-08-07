/* globals requestAnimationFrame  */

import DrawLine from './draw-line';
import DrawText from './draw-text';

let self = null;
let drawFlag = false;

function Draw() {
    self = this;
    drawFlag = true;
}

(function DrawDispatch() {
    if (self && drawFlag) {
        self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height);
        self.ctx.canvas.style.cursor = 'default';

        const objects = self.sys.objects || [];
        objects.forEach(obj => {
            switch (obj.type) {
                case self.sys.objectTypes.line:
                    DrawLine(self, obj);
                    break;
                case self.sys.objectTypes.text:
                    // console.warn('b', obj)
                    DrawText(self, obj);
                    break;
                default:
                    // console.log('unkone type', obj.type);
            }
        });
        drawFlag = false;
    }
    requestAnimationFrame(DrawDispatch);
}());

export default Draw;