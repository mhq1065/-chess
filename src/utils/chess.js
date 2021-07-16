/* eslint-disable */
var whiteSquareGrey = "#a9a9a9";
var blackSquareGrey = "#696969";

export function getConfig(game) {
    return {
        draggable: true,
        onDragStart: (source, piece) => {
            if (game.game_over()) return false;
            console.log(game.turn(), source, piece)
            // only pick up pieces for the side to move
            if (
                (game.turn() === "b" || piece.search(/^b/) !== -1)
            ) {
                return false;
            }
        },
        onDrop: (source, target) => {
            let move = game.move({
                from: source,
                to: target,
                promotion: "q", // NOTE: always promote to a queen for example simplicity
            });
            if (move === null) return "snapback";
            setTimeout(() => {
                var possibleMoves = game.moves()
                if (possibleMoves.length === 0) return
                var randomIdx = Math.floor(Math.random() * possibleMoves.length)
                game.move(possibleMoves[randomIdx])
                console.log(game.fen())
                this.position(game.fen())
            }, 250);
        },
    };
}


var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'
export function removeGreySquares() {
    $('#myboard .square-55d63').css('background', '')
}

export function greySquare(square) {
    var $square = $('#myboard .square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }

    $square.css('background', background)
}

// minimax 算法
function minimax(game, depth, alpha, beta, isMaximizingPlayer, sum, color) {
    positionCount++;
    var children = game.ugly_moves({ verbose: true });

    // Sort moves randomly, so the same move isn't always picked on ties
    children.sort(function (a, b) { return 0.5 - Math.random() });

    var currMove;
    // Maximum depth exceeded or node is a terminal node (no children)
    if (depth === 0 || children.length === 0) {
        return [null, sum]
    }

    // Find maximum/minimum from list of 'children' (possible moves)
    var maxValue = Number.NEGATIVE_INFINITY;
    var minValue = Number.POSITIVE_INFINITY;
    var bestMove;
    for (var i = 0; i < children.length; i++) {
        currMove = children[i];

        // Note: in our case, the 'children' are simply modified game states
        var currPrettyMove = game.ugly_move(currMove);
        var newSum = evaluateBoard(currPrettyMove, sum, color);
        var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !isMaximizingPlayer, newSum, color);

        game.undo();

        if (isMaximizingPlayer) {
            if (childValue > maxValue) {
                maxValue = childValue;
                bestMove = currPrettyMove;
            }
            if (childValue > alpha) {
                alpha = childValue;
            }
        }

        else {
            if (childValue < minValue) {
                minValue = childValue;
                bestMove = currPrettyMove;
            }
            if (childValue < beta) {
                beta = childValue;
            }
        }

        // Alpha-beta pruning
        if (alpha >= beta) {
            break;
        }
    }

    if (isMaximizingPlayer) {
        return [bestMove, maxValue]
    }
    else {
        return [bestMove, minValue];
    }
}
