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
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    ball.vy = 0 - ball.vy
})
let mySprite: Sprite = null
let ball: Sprite = null
ball = sprites.create(img`
    . 3 3 3 .
    3 3 3 3 3
    3 3 3 3 3
    3 3 3 3 3
    . 3 3 3 .
`, SpriteKind.Projectile)
let board = sprites.create(img`
    . 8 8 8 8 8 8 8 8 8 8 .
    8 8 8 8 8 8 8 8 8 8 8 8
`, SpriteKind.Player)
ball.setPosition(0, 78)
board.setPosition(0, 110)
ball.setVelocity(50, 50)
ball.setFlag(SpriteFlag.StayInScreen, true)
ball.setFlag(SpriteFlag.BounceOnWall, true)
board.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(board, 100, 0)
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
for (let indexy = 0; indexy <= 5; indexy++) {
    for (let indexx = 0; indexx <= 12; indexx++) {
        mySprite = sprites.create(block, SpriteKind.Enemy)
        mySprite.setPosition(8 + 12 * indexx, 20 + 12 * indexy)
    }
}
