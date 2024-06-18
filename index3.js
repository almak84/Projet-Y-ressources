
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

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
    this.height = 75
    this.onGround = true
    this.running = false
  }

  draw() {
    c.fillStyle = 'brown'
    c.fillRect(this.position.x, this.position.y, this.height, this.height)
  }

  update() {
    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y < canvas.height) this.velocity.y += gravity
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

const player2 = new Player({
  x: 300,
  y: 100,
})

const keys = {
  d: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  z: {
    pressed: false,
  },
  shift: {
    pressed: false,
  },
}

//const background = new Sprite({
//  position: {
//    x: 0,
//    y: 0,
//  },
//  imageSrc: './img/background.png'
//})

const stamina = document.getElementById('stamina')

function animation() {
  window.requestAnimationFrame(animation)
  c.fillStyle = 'rgb(0, 0, 255)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  //c.save()
  //c.scale(0.5,0.5)
  //c.translate(0, -background.image.height/2)
  //background.update()
  //c.restore()

  player.update()
  player2.update()

  player.velocity.x = 0
  if (keys.d.pressed) {
    if (keys.shift.pressed) {
      player.velocity.x = 10
      stamina.value -= 1
    } else {
      player.velocity.x = 5
    }
  } else if (keys.q.pressed) {
    if (keys.shift.pressed) {
      player.velocity.x = -10
      stamina.value -= 1
    } else {
      player.velocity.x = -5
    }
  }

  if (stamina.value <= 0) {
    player.running = false
    keys.shift.pressed = false
  }
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
        player.velocity.y = -20
        player.onGround = false
      }
      break
    case 'Shift':
      if (stamina.value > 0) {
        keys.shift.pressed = true
        player.running = true
      }
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
    case 'z':
      keys.z.pressed = false
      break
    case 'Shift':
      keys.shift.pressed = false
      player.running = false
      break
  }
})