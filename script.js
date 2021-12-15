// DOM

const boxContainer = document.querySelector('.box-container')

// full width of the your screen
const fullWidth = window.innerWidth
const fullHeight = window.innerHeight

boxContainer.style.width = `${fullWidth}px`
boxContainer.style.height = `${fullHeight}px`

// random number within a range

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return num
}

// maps style
function mapStyle(element, style) {
  const keys = Object.keys(style)
  keys.forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    element.style[key] = style[key]
  })
}

// collision detect

function isCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true
  }
  return false
}

const boxes = []

class Box {
  constructor(x, y, velX, velY, size, color, parentElem) {
    this.x = x // position in x-axis
    this.y = y // position in y-axis
    this.velX = velX
    this.velY = velY
    this.size = size // length and breadth of the square
    this.color = color
    this.parentElem = parentElem // parent element of the box
    this.box = document.createElement('div')
  }

  // creates a box
  createBox() {
    const boxStyle = {
      height: `${this.size}px`,
      width: `${this.size}px`,
      position: `absolute`,
      top: `${this.y}px`,
      left: `${this.x}px`,
      backgroundColor: this.color,
    }

    mapStyle(this.box, boxStyle)

    if (this.parentElem) {
      this.parentElem.appendChild(this.box)
    }
  }

  moveBox() {
    if (this.x + this.size >= fullWidth) {
      this.velX = -this.velX
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX
    }

    if (this.y + this.size >= fullHeight) {
      this.velY = -this.velY
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY
    }

    this.x += this.velX
    this.y += this.velY
  }

  collisionDetect() {
    for (let i = 0; i < boxes.length; i += 1) {
      if (!(this === boxes[i])) {
        const rect1 = this.box.getBoundingClientRect()
        // console.log(rect1)
        const rect2 = boxes[i].box.getBoundingClientRect()

        if (isCollision(rect1, rect2)) {
          boxes[i].color = '#fff'
          this.color = '#fff'
        }
      }
    }
  }
}

// const testBox =
// testBox.init()

while (boxes.length < 20) {
  const randSize = random(10, 20)
  const box = new Box(
    random(0 + randSize, fullWidth - randSize), // position X
    random(0 + randSize, fullHeight - randSize), // position Y
    random(-7, 7), // velocity X
    random(-7, 7), // velocity Y
    randSize, // length and breadth of square
    `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
    boxContainer // parent container
  )
  boxes.push(box)
}

function loop() {
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].createBox()
    boxes[i].moveBox()
    // boxes[i].collisionDetect()
  }
  requestAnimationFrame(loop)
}
loop()
