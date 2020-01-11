namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
    //% blockIdentity=images._tile
    export const tile1 = img`
. . . . 3 3 3 3 3 3 3 3 . . . . 
. 3 3 3 3 . . . . . . 3 3 . . . 
3 3 . . . . . . . . . . 3 3 . . 
3 3 . . . . . . . . . . . . 3 3 
. 3 . . . . . . . . . . . . . 3 
. 3 . . . . . . . . . . . . . 3 
. 3 . . . . . . . . . . . . . 3 
. 3 . . . . . . . . . . . . . 3 
3 . . . . . . . . . . . . . . 3 
3 . 3 3 3 3 . . . . . . . . . 3 
3 . 3 3 3 3 . . . . . . . . . 3 
3 3 3 3 3 3 . . . . . . . . . 3 
. . 3 3 . . . . . . . . . . . 3 
. 3 . 3 3 3 3 . . . . . . . . 3 
. . . . . . . 3 3 . . . . . . 3 
. . . . . . . . 3 3 3 3 3 3 3 3 
`
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Math.abs(sprite.x - otherSprite.x) > Math.abs(sprite.y - otherSprite.y)) {
        sprite.vx = 0 - sprite.vx
    } else {
        sprite.vy = 0 - sprite.vy
    }
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (on_board) {
        ball.follow(board, 0)
        ball.y += -8
        ball.setVelocity(50, -50)
        on_board = 0
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    ball.vy = 0 - ball.vy
})
let on_board = 0
let mySprite: Sprite = null
let board: Sprite = null
let ball: Sprite = null
info.setScore(0)
info.setLife(3)
let block = img`
. 8 8 8 8 8 8 . 
8 8 1 1 1 1 8 8 
8 1 1 1 1 1 1 8 
8 1 1 1 1 1 1 8 
8 1 1 1 1 1 1 8 
8 1 1 1 1 1 1 8 
8 8 1 1 1 1 8 8 
. 8 8 8 8 8 8 . 
`
ball = sprites.create(img`
. 3 3 3 . 
3 3 3 3 3 
3 3 3 3 3 
3 3 3 3 3 
. 3 3 3 . 
`, SpriteKind.Projectile)
board = sprites.create(img`
. 8 8 8 8 8 8 8 8 8 8 . 
8 8 8 8 8 8 8 8 8 8 8 8 
`, SpriteKind.Player)
ball.setPosition(0, 78)
board.setPosition(0, 110)
ball.setFlag(SpriteFlag.StayInScreen, true)
ball.setFlag(SpriteFlag.BounceOnWall, true)
board.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(board, 100, 0)
for (let indexy = 0; indexy <= 5; indexy++) {
    for (let indexx = 0; indexx <= 14; indexx++) {
        mySprite = sprites.create(block, SpriteKind.Enemy)
        mySprite.setPosition(10 + 10 * indexx, 20 + 10 * indexy)
    }
}
on_board = 1
ball.follow(board, 250)
game.onUpdate(function () {
    if (ball.y > 112) {
        on_board = 1
        ball.y += -8
        info.changeLifeBy(-1)
        ball.follow(board, 250)
        scene.cameraShake(4, 200)
    }
})
