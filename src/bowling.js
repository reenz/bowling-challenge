function Bowling() {
    this.frames = [];
    this.frame = new Frame();
}

Bowling.prototype.gameScore = function() {
    var total = 0;
    for (var i = 0; i < this.frames.length; i++) {
        var currentFrame = this.frames[i];
        var nextFrame = this.frames[i+1];
        var nextToNextFrame = this.frames[i+2];
        var windowTotal = this._windowScore(currentFrame, nextFrame, nextToNextFrame)
        total += windowTotal;
    }
    return total;
};

Bowling.prototype.toString = function() {
    return this.frames.join(" , ");
};

Bowling.prototype._windowScore = function(currentFrame, nextFrame, nextToNextFrame) {
    var total = currentFrame.frameScore();

    if (typeof nextFrame === "undefined") {
        return total;
    }

    if (currentFrame.isSpare()) {
        total += nextFrame.firstRoll() ;
    }

    if (currentFrame.isStrike()) {
        if (nextFrame.isStrike()) {
            if (typeof nextToNextFrame === "undefined") {
                return (total + nextFrame.frameScore());
            }
            total += nextFrame.frameScore() + nextToNextFrame.firstRoll() ;
        } else {
            total += nextFrame.frameScore();
        }
    }
    return total;
};

Bowling.prototype.framesArray = function() {
    return this.frames;
};

/**
 * Update the bowling game with the number of pins rolled. Return true if
 * the pins were added successfully else return false.
 * 
 * @param {Number} pins The number of pins rolled
 */
Bowling.prototype.roll = function(pins) {
    if (this.frames.length === 10 && this.frame.isDone()) {
        return false;
    }
    this.frame.addRoll(pins);
    if (this.frame.isDone()) {
        this.frames.push(this.frame);
        if (this.frames.length !== 10) {
            this.frame = new Frame();
        }
    }
    return true;
};
