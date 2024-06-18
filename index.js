const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.485

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw () {
    if (!this.image) return
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
  }
}

class Player {
  constructor(position) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.height = 40
    this.onGround = true
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.height, this.height)
  }

  update() {
    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y < canvas.height + -27) this.velocity.y += gravity
    else {
      this.velocity.y = 0
      this.onGround = true
    }
  }
}

const player = new Player({
  x: 0,
  y: 0,
})

const keys = {
  d: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png'
})

function animation() {
  window.requestAnimationFrame(animation)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.scale(0.25,0.25)
  background.update()
  c.restore()

  player.update()

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 3
  else if (keys.q.pressed) player.velocity.x = -3
}

animation()

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'q':
      keys.q.pressed = true
      break
    case 'z':
      if (player.onGround) {
        player.velocity.y = -13
        player.onGround = false
      }
      break
    case 'r':
      player.position.x = 0
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'q':
      keys.q.pressed = false
      break
  }
})