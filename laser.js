class Laser {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    display(){
        laser = createSprite(this.x, this.y, 30, 5)
        shapeColor("red")
    }
}