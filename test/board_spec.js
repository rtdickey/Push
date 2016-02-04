var chai = require('chai');
var expect = require('chai').expect;
var Board = require('../src/board');

describe('board', function() {
    it('newing up cell will by default have no color or piece', function(done) {
        var board = new Board();
        var cell = board.generateCell();

        expect(cell.piece).to.equal(null);
        expect(cell.color).to.equal(null);

        done();
    });

    it('cell passed black pawn has black pawn', function(done) {
        var board = new Board();
        var cell = board.generateCell('black', 'pawn');

        expect(cell.piece).to.equal('pawn');
        expect(cell.color).to.equal('black');

        done();
    });

    it('cell pased black pusher has black pusher', function(done) {
        var board = new Board();
        var cell = board.generateCell('black', 'pusher');

        expect(cell.piece).to.equal('pusher');
        expect(cell.color).to.equal('black');

        done();
    });

    it('should look like this', function(done) {
        var board = new Board().create();

        expect(board[0][0]).to.equal(null);
        expect(board[0][3]).to.equal(null);
        expect(board[1][3]).to.equal(null);
        expect(board[0][6]).to.equal(null);
        expect(board[0][7]).to.equal(null);
        expect(board[3][7]).to.equal(null);

        done();
    });
})
