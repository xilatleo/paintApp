var paint = function () {
    this.canvas = null;
    this.context = null;
    this.width = 800;
    this.height = 500;

    this.color = 'blue';
    this.lineWidth = 5;
    this.drawing = false;
    var self = this;
    this.savedMousePosition = { x: 0, y: 0 };

    this.init = function () {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.body.appendChild(this.canvas);

      
        this.listenEvent();
    }
    this.listenEvent = function () {
        this.canvas.addEventListener('mousedown', self.processMouseDown);
        this.canvas.addEventListener('mouseup', self.processMouseUp);
        this.canvas.addEventListener('mousemove', self.processMouseMove);
    }

    this.processMouseDown = function (event) {
        self.drawing = true;
        self.savedMousePosition = self.getMousePosition(event);

    }

    this.processMouseUp = function (event) {
        self.drawing = false;
        self.savedMousePosition = self.getMousePosition(event);
    }

    this.processMouseMove = function (event) {
        if (self.drawing == false) {
            return;
        } 

        var newMousePosition = self.getMousePosition(event);

        self.drawline(self.savedMousePosition.x, self.savedMousePosition.y, newMousePosition.x, newMousePosition.y);
        self.savedMousePosition = newMousePosition;
    }

    this.getMousePosition = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }


    this.drawline = function (startX, startY, endX, endY) {
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.stroke();

    }

}

var p = new paint();
p.init();

function setColor(color) {
    var colorCode = '#000';
    switch (color) {
        case 'red':
            colorCode = 'red';
            break;
        case 'blue':
            colorCode = 'blue';
            break;
        case 'black':
            colorCode = 'black';
        default:
            break;
    }
    p.color = colorCode;
}