import { place as placement } from 'placement.js';
import validator from 'validator';
import CryptoJS from 'crypto-js';
// const CryptoJS = require('crypto-js')

const formatBits = (value) => {
    value = value * 8;
    var magabitdata = value / 1000000; // covert bit to Megabit
    if (magabitdata < 1) {
        value = magabitdata * 1000; // covert Megabit to Kilobit
        return parseFloat(value.toFixed(2)) + ' Kbps';
    } else if (magabitdata > 1000) {
        value = magabitdata / 1000; // covert Megabit to Gigabit
        return parseFloat(value.toFixed(2)) + ' Gbps';
    } else {
        value = magabitdata
        return parseFloat(value.toFixed(2)) + ' Mbps';
    }
}
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const addComa = (x) => {
    x = parseInt(x)
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

const convertIPStr = (sIP) => {
    var ip = sIP;
    var res = ip.split('.');
    var resStr = '';
    for (var j = 0; j < res.length; j++) {
        resStr += res[j] + '-';
    }
    return resStr.substring(0, resStr.length - 1);
}

const convertStrToIP = (sIP) => {
    var ip = sIP;
    var res = ip.split('-');
    var resStr = '';
    for (var j = 0; j < res.length; j++) {
        resStr += res[j] + '.';
    }
    return resStr.substring(0, resStr.length - 1);
}

function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
}
function SortedArr(arr) {
    var len = arr.length,
        i, j, stop;

    for (i = 0; i < len; i++) {
        for (j = 0, stop = len - i; j < stop; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
function getShortMonth(index) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return month[index];
}

function getShortDayOfTheWeek(index) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return week[index];
}
const limitName = (hostname, limit = 30) => {
    // reducer = (accumulator, currentValue) => accumulator + currentValue;
    // array.reduce(reducer)
    const newHostname = [];
    if (hostname.length > limit) {
        hostname.split('-').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newHostname.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newHostname.join('-')} ...`;
    }
    return hostname;
}

const cursorOpts = {
    lock: true,
    focus: {
        prox: 1,
    },
    sync: {
        key: "moo",
        setSeries: true,
    },
};

// TOOLTIP PLUGIN CODES //
function tooltipsPlugin(YlabelArr, yParameter) {
    let ttc, plot, bound, bLeft, bTop;

    function init(u, opts, data) {
        plot = u.root.querySelector(".u-over");
        bound = plot
        ttc = u.cursortt = document.createElement("div");
        ttc.className = "tooltip";
        ttc.innerHTML = "<p>(x,y)</p>";
        ttc.style.pointerEvents = "none";
        ttc.style.position = "absolute";
        ttc.style.background = "#1ecbe1";
        ttc.style.color = "#ffffff";
        ttc.style.zIndex = 10;
        plot.appendChild(ttc);

        u.seriestt = opts.series.map((s, i) => {
            if (i == 0) return;

            let tt = document.createElement("div");
            tt.className = "tooltip";
            tt.innerHTML = "";
            tt.style.pointerEvents = "none";
            tt.style.position = "absolute";
            tt.style.background = "#1ecbe1";
            tt.style.color = "#ffffff";
            tt.style.zIndex = 10;
            tt.style.display = "none";
            plot.appendChild(tt);
            return tt;
        });

        function hideTips() {
            ttc.style.display = "none";
            u.seriestt.forEach((tt, i) => {
                if (i == 0) return;

                tt.style.display = "none";
            });
        }

        function showTips() {
            ttc.style.display = null;
            u.seriestt.forEach((tt, i) => {
                if (i == 0) return;

                let s = u.series[i];
                tt.style.display = s.show ? null : "none";
            });
        }

        plot.addEventListener("mouseleave", () => {
            if (!u.cursor._lock) {
                //	u.setCursor({left: -10, top: -10});
                hideTips();
            }
        });

        plot.addEventListener("mouseenter", () => {
            showTips();
        });

        hideTips();
    }

    function syncBounds() {
        let bbox = plot.getBoundingClientRect();
        bLeft = bbox.left;
        bTop = bbox.top;
    }

    function setCursor(u) {
        const { left, top, idx } = u.cursor;

        // this is here to handle if initial cursor position is set
        // not great (can be optimized by doing more enter/leave state transition tracking)
        //	if (left > 0)
        //		u.cursortt.style.display = null;

        // u.cursortt.style.left = left + "px";
        // u.cursortt.style.top = top + "px";
        u.cursortt.style.padding = "10px";

        let anchor = { left: left + "px", top: top + "px" };

        // can optimize further by not applying styles if idx did not change
        u.seriestt.forEach((tt, i) => {
            if (i == 0) return;

            let s = u.series[i];
            if (s.show) {
                // this is here to handle if initial cursor position is set
                // not great (can be optimized by doing more enter/leave state transition tracking)
                //	if (left > 0)
                //		tt.style.display = null;

                let xVal = u.data[0][idx];
                let yVal = u.data[i][idx];

                // console.log(u.data, i, idx)

                let newXVal = new Date(xVal * 1000);
                let hr, min, dayLight;
                min = newXVal.getMinutes();
                if (newXVal.getHours() > 12) {
                    hr = newXVal.getHours() - 12;
                    dayLight = 'PM';
                } else {
                    hr = newXVal.getHours();
                    dayLight = 'AM';
                }

                let ylabelHtml = ''
                // tt.innerHTML = `<p>${newXVal.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</p><p>${Ylabel}-${yVal} ${yParameter}</p>`;
                for (var i = 0; i < YlabelArr.length; i++) {
                    ylabelHtml += `<p style="color:#ffffff">${YlabelArr[i]}-${u.data[i + 1][idx]} ${yParameter}</p>`;
                }
                u.cursortt.innerHTML = `<p style="color:#ffffff">${hr}:${min} ${dayLight}</p> ${ylabelHtml}`;
                // u.cursortt.innerHTML = "<p>(" + u.posToVal(left, "x").toFixed(2) + ", " + u.posToVal(top, "y").toFixed(2) + ")</p>";

                tt.style.left = Math.round(u.valToPos(xVal, 'x')) + "px";
                tt.style.top = Math.round(u.valToPos(yVal, s.scale)) + "px";
            }
        });
        // placement(ttc, anchor, "right", "start", { bound });
    }

    return {
        hooks: {
            init,
            setCursor,
            setScale: [
                (u, key) => {
                    // console.log('setScale', key);
                }
            ],
            setSeries: [
                (u, idx) => {
                    // console.log('setSeries', idx);
                }
            ],
        },
    };
}
// TOOLTIP PLUGIN CODE //


// TOOLTIP PLUGIN CODE FOR INTERNET //
function internetTooltipsPlugin(YlabelArr, yParameter) {
    let ttc, plot, bound, bLeft, bTop;

    function init(u, opts, data) {
        plot = u.root.querySelector(".u-over");
        bound = plot
        ttc = u.cursortt = document.createElement("div");
        ttc.className = "tooltip";
        ttc.innerHTML = "<p>(x,y)</p>";
        ttc.style.pointerEvents = "none";
        ttc.style.position = "absolute";
        ttc.style.background = "#1ecbe1";
        ttc.style.color = "#ffffff";
        ttc.style.zIndex = 10;
        plot.appendChild(ttc);

        u.seriestt = opts.series.map((s, i) => {
            if (i == 0) return;

            let tt = document.createElement("div");
            tt.className = "tooltip";
            tt.innerHTML = "";
            tt.style.pointerEvents = "none";
            tt.style.position = "absolute";
            tt.style.background = "#1ecbe1";
            tt.style.color = "#ffffff";
            tt.style.zIndex = 10;
            tt.style.display = "none";
            plot.appendChild(tt);
            return tt;
        });

        function hideTips() {
            ttc.style.display = "none";
            u.seriestt.forEach((tt, i) => {
                if (i == 0) return;

                tt.style.display = "none";
            });
        }

        function showTips() {
            ttc.style.display = null;
            u.seriestt.forEach((tt, i) => {
                if (i == 0) return;

                let s = u.series[i];
                tt.style.display = s.show ? null : "none";
            });
        }

        plot.addEventListener("mouseleave", () => {
            if (!u.cursor._lock) {
                //	u.setCursor({left: -10, top: -10});
                hideTips();
            }
        });

        plot.addEventListener("mouseenter", () => {
            showTips();
        });

        hideTips();
    }

    function syncBounds() {
        let bbox = plot.getBoundingClientRect();
        bLeft = bbox.left;
        bTop = bbox.top;
    }

    function setCursor(u) {
        const { left, top, idx } = u.cursor;

        // this is here to handle if initial cursor position is set
        // not great (can be optimized by doing more enter/leave state transition tracking)
        //	if (left > 0)
        //		u.cursortt.style.display = null;

        // u.cursortt.style.left = left + "px";
        // u.cursortt.style.top = top + "px";
        u.cursortt.style.padding = "10px";
        u.cursortt.style.color = "#ffffff";

        let anchor = { left: left + "px", top: top + "px" };

        // can optimize further by not applying styles if idx did not change
        u.seriestt.forEach((tt, i) => {
            if (i == 0) return;

            let s = u.series[i];
            if (s.show) {
                // this is here to handle if initial cursor position is set
                // not great (can be optimized by doing more enter/leave state transition tracking)
                //	if (left > 0)
                //		tt.style.display = null;

                let xVal = u.data[0][idx];
                let yVal = u.data[i][idx];

                let newXVal = new Date(xVal * 1000);
                let hr, min, dayLight;
                min = newXVal.getMinutes();
                if (newXVal.getHours() > 12) {
                    hr = newXVal.getHours() - 12;
                    dayLight = 'PM';
                } else {
                    hr = newXVal.getHours();
                    dayLight = 'AM';
                }

                let ylabelHtml = ''
                // tt.innerHTML = `<p>${newXVal.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</p><p>${Ylabel}-${yVal} ${yParameter}</p>`;
                for (var i = 0; i < YlabelArr.length; i++) {
                    var x;
                    if ((u.data[i + 1][idx] * 8 / 1000) >= 1000) {
                        x = (u.data[i + 1][idx] * 8 / 1000000).toFixed(2)
                        yParameter = 'Mbps'
                    } else if ((u.data[i + 1][idx] * 8 / 1000) < 1000) {
                        x = (u.data[i + 1][idx] * 8 / 1000)
                        yParameter = 'Kbps';
                    }
                    ylabelHtml += `<p style="color:#ffffff">${YlabelArr[i]} - ${x} ${yParameter}</p>`;
                }
                u.cursortt.innerHTML = `<p style="color:#ffffff">${hr}:${min} ${dayLight}</p> ${ylabelHtml}`;
                // u.cursortt.innerHTML = "<p>(" + u.posToVal(left, "x").toFixed(2) + ", " + u.posToVal(top, "y").toFixed(2) + ")</p>";

                tt.style.left = Math.round(u.valToPos(xVal, 'x')) + "px";
                tt.style.top = Math.round(u.valToPos(yVal, s.scale)) + "px";
            }
        });
        // placement(ttc, anchor, "right", "start", { bound });
    }

    return {
        hooks: {
            init,
            setCursor,
            setScale: [
                (u, key) => {
                    // console.log('setScale', key);
                }
            ],
            setSeries: [
                (u, idx) => {
                    // console.log('setSeries', idx);
                }
            ],
        },
    };
}
// TOOLTIP PLUGIN CODE FOR INTERNET //
function createCookie(key, value, date) {
    const expiration = new Date(date).toUTCString();
    console.log(expiration);
    const cookie = escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
    document.cookie = cookie;
    console.log(cookie);
    console.log("New cookie with key: " + key + " value: " + value + " expiration: " + expiration);
}

function readCookie(name) {
    let key = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}

// Decryption and encryption codes;
// Code goes here;
var keySize = 256;
var ivSize = 128;
var iterations = 100;
function encodeStrBase64(msg, pass) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
}

function decodeStrBase64(transitmessage, pass) {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    var encrypted = transitmessage.substring(64);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// function encodeStrBase64(data) {
//     return data
//     return Buffer.from(data).toString('base64')
// }

// function decodeStrBase64(data) {
//     return data
//     return Buffer.from(data, 'base64').toString('ascii')
// }

function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
    // return validator.isEmail(email);
}

function validateName(value) {
    if (value.length >= 3) {
        return true
    } else {
        return false
    }
}

function validatePhone(value) {
    if (value.length == 10) {
        return true
    } else {
        return false
    }
}

function validatePassword(value) {
    const valid_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (valid_password.test(value)) {
        return true
    } else {
        return false
    }
}

function ValidateIPaddress(ipaddress) {
    const patternIPv6 = /^(([0-9a-fA-F]{1}|[1-9a-fA-F]{1}[0-9a-fA-F]{1,3}):){7}([0-9a-fA-F]{1}|[1-9a-fA-F]{1}[0-9a-fA-F]{1,3})$/;
    const patternIPv4 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (patternIPv6.test(ipaddress) || patternIPv4.test(ipaddress)) {
        return (true)
    } else {
        return (false)
    }
}
function ValidateMACaddress(mac_address) {
    const regex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
    if (regex.test(mac_address)) {
        return (true)
    } else {
        return (false)
    }
}

// Date and Time
const getYesterdayFromTo = () => {
    const todayDateObj = new Date();
    todayDateObj.setDate(todayDateObj.getDate() - 1);

    const firstDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 00:00';
    const todayDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 23:59';

    const from = Math.floor(new Date(firstDate).getTime() / 1000) * 1000;
    const to = Math.floor(new Date(todayDate).getTime() / 1000) * 1000;
    return { from, to };
}

const getTodayFromTo = () => {
    const todayDateObj = new Date();

    const firstDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 00:00';
    const todayDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' ' + todayDateObj.getHours() + ':' + todayDateObj.getMinutes();

    const from = Math.floor(new Date(firstDate).getTime() / 1000) * 1000;
    const to = Math.floor(new Date(todayDate).getTime() / 1000) * 1000;
    return { from, to };
}

function apiheader(token) {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            authorization: `bearer ${token}`
        }
    }
}

function findCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}

export {
    formatBytes,
    formatBits,
    convertIPStr,
    convertStrToIP,
    bytesToSize,
    addComa,
    SortedArr,
    limitName,
    cursorOpts,
    tooltipsPlugin,
    internetTooltipsPlugin,
    getShortMonth,
    getShortDayOfTheWeek,
    createCookie,
    readCookie,
    encodeStrBase64,
    decodeStrBase64,
    validateEmail,
    validateName,
    validatePhone,
    validatePassword,
    ValidateIPaddress,
    ValidateMACaddress,
    getYesterdayFromTo,
    getTodayFromTo,
    apiheader,
    findCommonElements,
}