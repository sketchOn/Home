var egghunt = {

    egghunt: this,

    neggs: 4,

    success: "easter-egg-hunt",

    basetime: 1585526400,

    cookiename: "eehr",

    mode: "off",

    set: function (neggs, url, mode) {

        this.neggs = neggs;

        this.success = url;

        this.mode = mode;

    },

    record: function (eggnumber) {

        let eggsfound, start, end, count

        let eehr = this.readCookie(this.cookiename);

        let now = Date.now() - this.basetime;

        let alleggs = 2 ** this.neggs - 1;

        let nice = ["Nice!", "Well done!", "Fabulous!", "Good eye!", "Way to go!"]

        nice = nice[Math.floor(Math.random() * nice.length)]

        eggnumber = 1 << eggnumber;

        if (eehr.length <= 0) {

            // first egg found

            this.cookieEgg(eggnumber, now, now, 1)

            this.showPopUp(nice + "<br>You found your first egg!");

        } else {

            // subsequent egg found

            // console.log(eehr);

            [eggsfound, start, end, count] = eehr.split(',');

            // console.log(eggsfound, eggnumber, eggsfound | eggnumber, eggsfound | eggnumber);

            if (eggsfound & eggnumber) {

                this.showPopUp("You already found this egg.");

            } else {

                // console.log(eggsfound, eggnumber, eggsfound | eggnumber);

                eggsfound = eggsfound | eggnumber;

                count++

                this.cookieEgg(eggsfound, start, now, count)

                if (eggsfound === alleggs) {

                    window.location.href = this.success + "?SQF_BUNNIES=" +

                        this.encode(this.msScore());

                } else {

                    let msg = nice + "<br>";

                    msg += "You now have " + count + " of the " + this.neggs + " eggs.";

                    this.showPopUp(msg);

                }

            }

        }

    },

    cookieEgg: function (eggnumber, start, end, count) {

        value = eggnumber + "," + start + "," + end + "," + count;

        this.setCookie("eehr", value);

    },

    // Set a session cookie (a cookie with no expire date specified)

    setCookie: function (name, value) {

        if (value === undefined) {

            console.error("stqC.setCookie value for", name, "is undefined");

            return;

        }

        document.cookie = name + "=" + value + "; path=/";

    },

    // Read cookies

    // from http://stackoverflow.com/questions/5639346/

    readCookie: function (name) {

        let c = "";

        let b = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");

        if (b) {

            c = b.pop();

            if (typeof c === "undefined") { c = ""; }

        }

        return c;

    },

    showPopUp: function (text) {

        let popup = document.getElementById("EasterPopUp");

        popup.style.display = "block";

        popup.innerHTML = text;

        setTimeout(function () {

            popup.style.display = "none";

        }, 5000);

    },

    msScore: function () { // score in milliseconds

        let score = 0,

            eehr = this.readCookie(this.cookiename);

        if (eehr.length > 0) {

            let eggsfound, start, end, count;

            [eggsfound, start, end, count] = eehr.split(',');

            score = end - start

        }

        return score;

    },

    encode: function (score) { // encodes the score with btoa preceded by a random letter

        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 24)] + btoa(score);

    },

    decode: function (score) { // returns the number of milliseconds of the encoded score

        return atob(score.substr(1));

    },

    displayScore: function () {

        let scoreblock = document.getElementById("eggscore"),

            score = "",

            eehr = this.readCookie(this.cookiename);

        if (scoreblock === null) {

            return "";

        }

        if (eehr.length > 0) {

            let eggsfound, start, end, count;

            [eggsfound, start, end, count] = eehr.split(',');

            let seconds = Math.round((end - start) / 1000) % 60;

            let minutes = Math.floor((end - start) / 60000);

            if (minutes > 0) {

                score += minutes;

                if (minutes === 1) {

                    score += " minute";

                } else {

                    score += " minutes";

                }

            }

            if (seconds > 0) {

                if (minutes > 0) {

                    score += " and ";

                }

                score += seconds;

                if (seconds === 1) {

                    score += " second";

                } else {

                    score += " seconds";

                }

            }

            let div = document.getElementById("eggscore");

            div.innerHTML = score;

        }

    },

};

document.addEventListener("DOMContentLoaded", startEasterEggHunt);

function startEasterEggHunt() {

    // add the message overlay to the body

    let popup = document.createElement("div");

    popup.setAttribute("id", "EasterPopUp");

    document.body.appendChild(popup);

    // dialog box is typically 390px wide and 60px high

    let style =

        "display:none;" +

        "position:fixed;" +

        "text-align:center;" +

        "left:" + ((window.innerWidth - 390) * 0.5) + "px;" +

        "top:" + ((window.innerHeight - 60) * 0.5) + "px;" +

        "padding:10px;" +

        "background:white;" +

        "border:2px rgb(147,113,183) solid;" +

        "font-family: calluna;" +

        "font-size:30px;" +

        "-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);" +

        "-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);" +

        "box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);" +

        "z-index: 100;" +

        "";

    popup.setAttribute("style", style);

    // do we display eggs?

    mode = "none"

    if (egghunt.mode === "on") {

        mode = "inline";

    } else if (egghunt.mode === "test") {

        const urlParams = new URLSearchParams(window.location.search);

        if ( urlParams.get("egghunt") !== null) {

            mode = "inline";

        } else {

            mode = "none";

        }

    }

    let eggclass = document.querySelectorAll(".egghunt");

    eggclass.forEach(function (e) {

        e.style.display = mode;

    });

    // look to see if score is needed

    egghunt.displayScore();

}
