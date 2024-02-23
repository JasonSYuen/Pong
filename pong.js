
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 1024
canvas.width = 1024
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, 600, 600);

class Element {
    constructor(vel_xl, vel_xr, vel_yu, vel_yd, width, height, type, px = 0, py = 0, color = "green") {
        this.V_XR = vel_xr;
        this.V_XL = vel_xl;
        this.V_YU = vel_yu;
        this.V_YD = vel_yd;

        this.P_X = px;
        this.P_Y = py;

        this.width = width;
        this.height = height;
        this.color = color;

        this.type = type;
    }
}

class player extends Element {
    constructor(vel_xl, vel_xr, vel_yu, vel_yd, width, height, type, px, py, color) {
        super(vel_xr, vel_xl, vel_yu, vel_yd, width, height, type, px, py, color);
        this.id = "user";
    }
}

class ball extends Element {
    constructor(vxl, vxr, vyu, vyd, width, height, type, img = 0, color = "Green", px = 0, py = 0) {
        super(vxr, vxl, vyu, vyd, width, height, type, px, py, color)
        this.img = img;
        this.id = "ai";
    }
}

function key_was_pressed(event) {
    event.preventDefault();
    if (event.key == 'ArrowRight') {
        p.V_XR = 6;
        console.log('r')
    }
    if (event.key == 'ArrowLeft') {
        p.V_XL = -6;
    }


}
function key_lifted(event) {
    if (event.key == 'ArrowRight') {
        p.V_XR = 0;
        console.log('a')
    }
    if (event.key == 'ArrowLeft') {
        p.V_XL = 0;
    }


}
function movement(obj) {
    ctx.clearRect(obj.P_X, obj.P_Y, obj.width, obj.height)
    ctx.fillStyle = "lightblue";
    ctx.fillRect(obj.P_X, obj.P_Y, obj.width, obj.height)

    obj.P_X += obj.V_XR + obj.V_XL
    obj.P_Y += obj.V_YU + obj.V_YD


    if (obj.P_X < 0 || obj.P_X > 600 - obj.width) {
        obj.P_X -= obj.V_XR + obj.V_XL
        if (obj.id == "ai") {
            temp = obj.V_XR;
            obj.V_XR = obj.V_XL * -1;
            obj.V_XL = temp * -1;
        }
    }
    if (obj.P_Y < 100 || obj.P_Y > 600 - obj.height) {
        obj.P_Y -= obj.V_YU + obj.V_YD
        if (obj.id == "ai") {
            temp = obj.V_YU;
            obj.V_YU = obj.V_YD * -1;
            obj.V_YD = temp * -1;
        }
    }



    ctx.fillStyle = obj.color;

    if (obj.type == "drawn") {
        ctx.fillRect(obj.P_X, obj.P_Y, obj.width, obj.height)
        //console.log(obj.P_Y)
    }
    if (obj.type == "image") {
        ctx.drawImage(obj.img, obj.P_X, obj.P_Y, obj.width, obj.height)
    }
}



function collision2(ai, player) {
    if ((ai.P_Y + ai.height > player.P_Y + 3) && ((ai.P_X <= player.P_X + player.width + 5 && ai.P_X > player.P_X) || (ai.P_X + ai.width > player.P_X - 5 && ai.P_X + ai.width < player.P_X + player.width))) {
        temp = ai.V_XR;
        ai.V_XR = ai.V_XL * -1;
        ai.V_XL = temp * -1;
        //ai.P_X += player.V_XL + player.V_XR;
        console.log("side")
        coll = true;
    }
    else if (ai.P_Y + ai.height > player.P_Y && (ai.P_X + ai.width > player.P_X && ai.P_X < player.P_X + player.width)) {

        temp = ai.V_YU;
        ai.V_YU = ai.V_YD * -1;
        ai.V_YD = temp * -1;

        console.log("collision top")
        coll = true;
        count = count + 1;
        document.getElementById("count").innerHTML = count;
    }


}
function follow(obj) {
    ctx.clearRect(obj.P_X, obj.P_Y, obj.width, obj.height)
    ctx.fillStyle = "lightblue";
    ctx.fillRect(obj.P_X, obj.P_Y, obj.width, obj.height)



    ctx.fillStyle = obj.color;

    obj.P_X = b.P_X - 50;
    if (obj.P_X < 0) {
        obj.P_X = 0;
    }
    if (obj.P_X + obj.width > 600) {
        obj.P_X = 500;
    }
    ctx.fillRect(obj.P_X, obj.P_Y, obj.width, obj.height)
}

window.addEventListener("keydown", key_was_pressed);
window.addEventListener("keyup", key_lifted);
const orig = document.getElementById("ai");
//rect(20, 500, 100, 30);

count = 0;
width = 100;
height = 30;
ctx.fillStyle = "rgb(0 0 200 / 50%)";
ctx.fillRect(10, 500, width, height); //
ctx.fillRect(10, 70, width, height);
ctx.fillRect(10, 500, 600, 1)

const img = new Image();
img.onload = () => {

}
img.src = "assets/purple_circle.png";

let p = new player(0, 0, 0, 0, 100, 30, "drawn", 10, 500, "navy");
let a = new ball(0, 4, 0, 0, 100, 30, "drawn", img, "orange", 10, 70); //paddle AI
let b = new ball(-6, 0, 6, 0, 40, 40, "image", img, "none", 300, 300);
console.log(a.P_Y)

let r = 0;
var coll = false;
function tick() {
    if (coll == false) {
        collision2(b, p)
    }
    movement(p);
    movement(b);
    follow(a);
    if (coll == true) {
        r++;
        if (r > 20) {
            coll = false;
            r = 0;
        }
    }
    if (b.P_Y < 598 - b.height) {
        requestAnimationFrame(tick);
    }
    else {
        document.getElementById("game_over").style.color = "black";
    }






}

tick()


