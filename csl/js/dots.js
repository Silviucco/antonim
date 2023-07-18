(function () {
    var width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;

    // Main

    if (window.innerWidth < 575) {
        initHeaderMobile();
        // alert(height);
    } else if (window.innerWidth > 575) {
        initHeaderBig();
        // alert(height);
    }

    initAnimation();
    addListeners();

    function initHeaderMobile() {
        width = window.innerWidth;
        height = parseInt(window.innerHeight / 2 + 90 + "px");
        target = { x: width / 2, y: height };

        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";

        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        for (var x = 0; x < width; x = x + width / 15) {
            for (var y = 0; y < height; y = y + height / 7) {
                var px = x + (Math.random() * width) / 10;
                var py = y + (Math.random() * height) / 10;
                var p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 8 closest points
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j];
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 3; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < 3; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random() * 1, "rgba(194,255,242,0.6)");
            points[i].circle = c;
        }
    }

    function initHeaderBig() {
        width = window.innerWidth;
        height = parseInt(window.innerHeight / 2 + 24 + "px");
        console.log(height);
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";

        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        for (var x = 0; x < width; x = x + width / 50) {
            for (var y = 0; y < height; y = y + height / 10) {
                var px = x + (Math.random() * width) / 10;
                var py = y + (Math.random() * height) / 10;
                var p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 8 closest points
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j];
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 4; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < 4; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random() * 1, "rgba(194,255,242,0.6)");
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if (!("ontouchstart" in window)) {
            window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        // window.addEventListener("resize", resize);
    }

    function mouseMove(e) {
        var posx = (posy = 0);
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    // function resize() {
    //     width = window.innerWidth;
    //     height = window.innerHeight;
    //     largeHeader.style.height = height + "px";
    //     canvas.width = width;
    //     canvas.height = height;
    //     console.log(parseInt(largeHeader));
    // }

    // animation
    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in points) {
                // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 1000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(target, points[i])) < 10000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 2 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 60,
            y: p.originY - 50 + Math.random() * 60,
            ease: Circ.easeInOut,
            onComplete: function () {
                shiftPoint(p);
            },
        });
    }

    // Canvas manipulation
    function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = "rgba(194,255,242,0.4)";
            ctx.stroke();
        }
    }

    function Circle(pos, color) {
        var _this = this;

        // constructor
        (function () {
            _this.pos = pos || null;
            _this.radius = 5 || null;
            _this.color = "rgba(194,255,242,0.4)" || null;
        })();

        this.draw = function () {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 4 * Math.PI, false);
            ctx.fillStyle = "rgba(194,255,242,0.4)";
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
})();
