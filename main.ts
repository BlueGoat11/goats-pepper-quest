namespace SpriteKind {
    export const Intro = SpriteKind.create()
    export const hud = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    Goat.vy = 0
    Goat.vx = 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Goat.vy += -100
})
info.onLifeZero(function () {
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
function GG_Intro () {
    scene.setBackgroundImage(assets.image`BG`)
    G1 = sprites.create(assets.image`g1`, SpriteKind.Intro)
    G2 = sprites.create(assets.image`g1`, SpriteKind.Intro)
    G1.setScale(2, ScaleAnchor.Middle)
    G2.setScale(2, ScaleAnchor.Middle)
    G1.setPosition(60, 50)
    G2.setPosition(93, 50)
    animation.runMovementAnimation(
    G1,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    animation.runMovementAnimation(
    G2,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    Goat = sprites.create(assets.image`Goat`, SpriteKind.Intro)
    Goat.setPosition(75, 80)
    animation.runMovementAnimation(
    Goat,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    pause(5000)
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    animation.runMovementAnimation(
    Goat,
    animation.animationPresets(animation.waveRight),
    2000,
    false
    )
    pause(2000)
    sprites.destroy(G1)
    sprites.destroy(G2)
    sprites.destroy(Goat)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(100)
})
let divscore = 0
let tree: Sprite = null
let taco: Sprite = null
let G2: Sprite = null
let G1: Sprite = null
let mySprite: Sprite = null
let Goat: Sprite = null
GG_Intro()
scene.setBackgroundImage(assets.image`black`)
pause(1500)
scene.setBackgroundImage(assets.image`desert`)
let Manny = sprites.create(assets.image`manny1`, SpriteKind.Intro)
Goat = sprites.create(assets.image`GoatL`, SpriteKind.Intro)
Goat.setPosition(100, 70)
Manny.setPosition(50, 70)
game.setDialogFrame(assets.image`frame`)
game.showLongText("A long time ago, a Goat and a Monkey met in the desert. The Monkey (named Manny) had a present for his friend the Goat. The last enchanted pepper.", DialogLayout.Full)
pause(1000)
let Pepper = sprites.create(assets.image`Pepper`, SpriteKind.Intro)
Pepper.setPosition(60, 70)
animation.runMovementAnimation(
Pepper,
animation.animationPresets(animation.waveRight),
2000,
false
)
pause(2050)
Goat.x += -10
pause(500)
Goat.x += 15
Pepper.x += 12
music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
sprites.destroy(Pepper, effects.fire, 500)
animation.runMovementAnimation(
Goat,
animation.animationPresets(animation.bobbing),
2000,
false
)
pause(2000)
music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
Goat.setImage(assets.image`CrazyGoatL`)
pause(500)
Goat.setImage(assets.image`CrazyGoatR`)
Goat.setVelocity(50, 0)
pause(2000)
sprites.destroy(Manny)
sprites.destroy(Goat)
scene.setBackgroundImage(assets.image`black`)
game.showLongText("But something went wrong. The Goat ate the pepper, and with 2.5M scoville units, went crazy! Disaster strikes as the goat enters the forest, as things fly in his way!", DialogLayout.Full)
pause(2000)
scene.setBackgroundImage(assets.image`forest`)
scroller.scrollBackgroundWithSpeed(-30, 0)
Goat = sprites.create(assets.image`CrazyGoatR`, SpriteKind.Player)
Goat.y += 160
Goat.x += -50
mySprite.setStayInScreen(true)
tiles.setCurrentTilemap(tilemap`Level1`)
game.showLongText("Press A to jump! Make it to 100.", DialogLayout.Bottom)
scene.cameraFollowSprite(Goat)
controller.moveSprite(Goat, 50, 0)
let on = 1
info.setScore(0)
mySprite = sprites.create(assets.image`Milk`, SpriteKind.hud)
mySprite.y += -50
mySprite.x += 55
info.setLife(3)
scene.centerCameraAt(Goat.x, Goat.y)
music.play(music.createSong(assets.song`song`), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(2000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    if (on == 1) {
        info.changeScoreBy(1)
    }
})
forever(function () {
    if (on == 1) {
        Goat.vy += 5
    }
})
forever(function () {
    taco = sprites.create(assets.image`gamer`, SpriteKind.Enemy)
    tree = sprites.create(assets.image`tree`, SpriteKind.Enemy)
    if (on == 1) {
        while (info.score() < 30) {
            pause(randint(2000, 4000))
            if (randint(1, 2) == 2) {
                tree = sprites.create(assets.image`tree`, SpriteKind.Enemy)
                tree.y += 160
                tree.x += 85
                tree.vx = -50 * divscore
                tree.setStayInScreen(false)
            } else {
                taco = sprites.create(assets.image`gamer`, SpriteKind.Enemy)
                tree.y += 160
                tree.x += 85
                tree.vx = -50 * divscore
                tree.setStayInScreen(false)
            }
        }
    }
})
forever(function () {
    divscore = info.score() / 3
})
forever(function () {
    if (info.score() == 100) {
        game.setGameOverEffect(true, effects.blizzard)
        game.gameOver(true)
    }
})
