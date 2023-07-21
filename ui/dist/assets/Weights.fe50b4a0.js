import {
  g as Jd,
  c as ef,
  _ as rs,
  o as or,
  a as sr,
  b as he,
  d as va,
  n as tf,
  r as Lo,
  e as Wo,
  w as rf,
  t as ga,
  F as af,
  f as nf,
  h as of,
  v as sf,
  i as lf,
} from "./index.b3ed7097.js";
function St(r) {
  if (r === null || r === !0 || r === !1) return NaN;
  var i = Number(r);
  return isNaN(i) ? i : i < 0 ? Math.ceil(i) : Math.floor(i);
}
function ge(r, i) {
  if (i.length < r)
    throw new TypeError(
      r +
        " argument" +
        (r > 1 ? "s" : "") +
        " required, but only " +
        i.length +
        " present"
    );
}
function ka(r) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (ka = function (s) {
          return typeof s;
        })
      : (ka = function (s) {
          return s &&
            typeof Symbol == "function" &&
            s.constructor === Symbol &&
            s !== Symbol.prototype
            ? "symbol"
            : typeof s;
        }),
    ka(r)
  );
}
function Ze(r) {
  ge(1, arguments);
  var i = Object.prototype.toString.call(r);
  return r instanceof Date || (ka(r) === "object" && i === "[object Date]")
    ? new Date(r.getTime())
    : typeof r == "number" || i === "[object Number]"
    ? new Date(r)
    : ((typeof r == "string" || i === "[object String]") &&
        typeof console < "u" &&
        (console.warn(
          "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
        ),
        console.warn(new Error().stack)),
      new Date(NaN));
}
function uf(r, i) {
  ge(2, arguments);
  var s = Ze(r).getTime(),
    d = St(i);
  return new Date(s + d);
}
var df = {};
function Ba() {
  return df;
}
function ff(r) {
  var i = new Date(
    Date.UTC(
      r.getFullYear(),
      r.getMonth(),
      r.getDate(),
      r.getHours(),
      r.getMinutes(),
      r.getSeconds(),
      r.getMilliseconds()
    )
  );
  return i.setUTCFullYear(r.getFullYear()), r.getTime() - i.getTime();
}
var as = 6e4,
  ns = 36e5;
function Sa(r) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (Sa = function (s) {
          return typeof s;
        })
      : (Sa = function (s) {
          return s &&
            typeof Symbol == "function" &&
            s.constructor === Symbol &&
            s !== Symbol.prototype
            ? "symbol"
            : typeof s;
        }),
    Sa(r)
  );
}
function cf(r) {
  return (
    ge(1, arguments),
    r instanceof Date ||
      (Sa(r) === "object" &&
        Object.prototype.toString.call(r) === "[object Date]")
  );
}
function hf(r) {
  if ((ge(1, arguments), !cf(r) && typeof r != "number")) return !1;
  var i = Ze(r);
  return !isNaN(Number(i));
}
function vf(r, i) {
  ge(2, arguments);
  var s = St(i);
  return uf(r, -s);
}
var gf = 864e5;
function mf(r) {
  ge(1, arguments);
  var i = Ze(r),
    s = i.getTime();
  i.setUTCMonth(0, 1), i.setUTCHours(0, 0, 0, 0);
  var d = i.getTime(),
    c = s - d;
  return Math.floor(c / gf) + 1;
}
function Fa(r) {
  ge(1, arguments);
  var i = 1,
    s = Ze(r),
    d = s.getUTCDay(),
    c = (d < i ? 7 : 0) + d - i;
  return s.setUTCDate(s.getUTCDate() - c), s.setUTCHours(0, 0, 0, 0), s;
}
function is(r) {
  ge(1, arguments);
  var i = Ze(r),
    s = i.getUTCFullYear(),
    d = new Date(0);
  d.setUTCFullYear(s + 1, 0, 4), d.setUTCHours(0, 0, 0, 0);
  var c = Fa(d),
    p = new Date(0);
  p.setUTCFullYear(s, 0, 4), p.setUTCHours(0, 0, 0, 0);
  var _ = Fa(p);
  return i.getTime() >= c.getTime()
    ? s + 1
    : i.getTime() >= _.getTime()
    ? s
    : s - 1;
}
function pf(r) {
  ge(1, arguments);
  var i = is(r),
    s = new Date(0);
  s.setUTCFullYear(i, 0, 4), s.setUTCHours(0, 0, 0, 0);
  var d = Fa(s);
  return d;
}
var bf = 6048e5;
function yf(r) {
  ge(1, arguments);
  var i = Ze(r),
    s = Fa(i).getTime() - pf(i).getTime();
  return Math.round(s / bf) + 1;
}
function Ia(r, i) {
  var s, d, c, p, _, S, T, P;
  ge(1, arguments);
  var L = Ba(),
    Y = St(
      (s =
        (d =
          (c =
            (p = i == null ? void 0 : i.weekStartsOn) !== null && p !== void 0
              ? p
              : i == null ||
                (_ = i.locale) === null ||
                _ === void 0 ||
                (S = _.options) === null ||
                S === void 0
              ? void 0
              : S.weekStartsOn) !== null && c !== void 0
            ? c
            : L.weekStartsOn) !== null && d !== void 0
          ? d
          : (T = L.locale) === null ||
            T === void 0 ||
            (P = T.options) === null ||
            P === void 0
          ? void 0
          : P.weekStartsOn) !== null && s !== void 0
        ? s
        : 0
    );
  if (!(Y >= 0 && Y <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var V = Ze(r),
    de = V.getUTCDay(),
    Te = (de < Y ? 7 : 0) + de - Y;
  return V.setUTCDate(V.getUTCDate() - Te), V.setUTCHours(0, 0, 0, 0), V;
}
function os(r, i) {
  var s, d, c, p, _, S, T, P;
  ge(1, arguments);
  var L = Ze(r),
    Y = L.getUTCFullYear(),
    V = Ba(),
    de = St(
      (s =
        (d =
          (c =
            (p = i == null ? void 0 : i.firstWeekContainsDate) !== null &&
            p !== void 0
              ? p
              : i == null ||
                (_ = i.locale) === null ||
                _ === void 0 ||
                (S = _.options) === null ||
                S === void 0
              ? void 0
              : S.firstWeekContainsDate) !== null && c !== void 0
            ? c
            : V.firstWeekContainsDate) !== null && d !== void 0
          ? d
          : (T = V.locale) === null ||
            T === void 0 ||
            (P = T.options) === null ||
            P === void 0
          ? void 0
          : P.firstWeekContainsDate) !== null && s !== void 0
        ? s
        : 1
    );
  if (!(de >= 1 && de <= 7))
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively"
    );
  var Te = new Date(0);
  Te.setUTCFullYear(Y + 1, 0, de), Te.setUTCHours(0, 0, 0, 0);
  var Ct = Ia(Te, i),
    Je = new Date(0);
  Je.setUTCFullYear(Y, 0, de), Je.setUTCHours(0, 0, 0, 0);
  var et = Ia(Je, i);
  return L.getTime() >= Ct.getTime()
    ? Y + 1
    : L.getTime() >= et.getTime()
    ? Y
    : Y - 1;
}
function _f(r, i) {
  var s, d, c, p, _, S, T, P;
  ge(1, arguments);
  var L = Ba(),
    Y = St(
      (s =
        (d =
          (c =
            (p = i == null ? void 0 : i.firstWeekContainsDate) !== null &&
            p !== void 0
              ? p
              : i == null ||
                (_ = i.locale) === null ||
                _ === void 0 ||
                (S = _.options) === null ||
                S === void 0
              ? void 0
              : S.firstWeekContainsDate) !== null && c !== void 0
            ? c
            : L.firstWeekContainsDate) !== null && d !== void 0
          ? d
          : (T = L.locale) === null ||
            T === void 0 ||
            (P = T.options) === null ||
            P === void 0
          ? void 0
          : P.firstWeekContainsDate) !== null && s !== void 0
        ? s
        : 1
    ),
    V = os(r, i),
    de = new Date(0);
  de.setUTCFullYear(V, 0, Y), de.setUTCHours(0, 0, 0, 0);
  var Te = Ia(de, i);
  return Te;
}
var xf = 6048e5;
function wf(r, i) {
  ge(1, arguments);
  var s = Ze(r),
    d = Ia(s, i).getTime() - _f(s, i).getTime();
  return Math.round(d / xf) + 1;
}
function Z(r, i) {
  for (var s = r < 0 ? "-" : "", d = Math.abs(r).toString(); d.length < i; )
    d = "0" + d;
  return s + d;
}
var Mf = {
  y: function (i, s) {
    var d = i.getUTCFullYear(),
      c = d > 0 ? d : 1 - d;
    return Z(s === "yy" ? c % 100 : c, s.length);
  },
  M: function (i, s) {
    var d = i.getUTCMonth();
    return s === "M" ? String(d + 1) : Z(d + 1, 2);
  },
  d: function (i, s) {
    return Z(i.getUTCDate(), s.length);
  },
  a: function (i, s) {
    var d = i.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (s) {
      case "a":
      case "aa":
        return d.toUpperCase();
      case "aaa":
        return d;
      case "aaaaa":
        return d[0];
      case "aaaa":
      default:
        return d === "am" ? "a.m." : "p.m.";
    }
  },
  h: function (i, s) {
    return Z(i.getUTCHours() % 12 || 12, s.length);
  },
  H: function (i, s) {
    return Z(i.getUTCHours(), s.length);
  },
  m: function (i, s) {
    return Z(i.getUTCMinutes(), s.length);
  },
  s: function (i, s) {
    return Z(i.getUTCSeconds(), s.length);
  },
  S: function (i, s) {
    var d = s.length,
      c = i.getUTCMilliseconds(),
      p = Math.floor(c * Math.pow(10, d - 3));
    return Z(p, s.length);
  },
};
const _t = Mf;
var nr = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  kf = {
    G: function (i, s, d) {
      var c = i.getUTCFullYear() > 0 ? 1 : 0;
      switch (s) {
        case "G":
        case "GG":
        case "GGG":
          return d.era(c, { width: "abbreviated" });
        case "GGGGG":
          return d.era(c, { width: "narrow" });
        case "GGGG":
        default:
          return d.era(c, { width: "wide" });
      }
    },
    y: function (i, s, d) {
      if (s === "yo") {
        var c = i.getUTCFullYear(),
          p = c > 0 ? c : 1 - c;
        return d.ordinalNumber(p, { unit: "year" });
      }
      return _t.y(i, s);
    },
    Y: function (i, s, d, c) {
      var p = os(i, c),
        _ = p > 0 ? p : 1 - p;
      if (s === "YY") {
        var S = _ % 100;
        return Z(S, 2);
      }
      return s === "Yo" ? d.ordinalNumber(_, { unit: "year" }) : Z(_, s.length);
    },
    R: function (i, s) {
      var d = is(i);
      return Z(d, s.length);
    },
    u: function (i, s) {
      var d = i.getUTCFullYear();
      return Z(d, s.length);
    },
    Q: function (i, s, d) {
      var c = Math.ceil((i.getUTCMonth() + 1) / 3);
      switch (s) {
        case "Q":
          return String(c);
        case "QQ":
          return Z(c, 2);
        case "Qo":
          return d.ordinalNumber(c, { unit: "quarter" });
        case "QQQ":
          return d.quarter(c, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return d.quarter(c, { width: "narrow", context: "formatting" });
        case "QQQQ":
        default:
          return d.quarter(c, { width: "wide", context: "formatting" });
      }
    },
    q: function (i, s, d) {
      var c = Math.ceil((i.getUTCMonth() + 1) / 3);
      switch (s) {
        case "q":
          return String(c);
        case "qq":
          return Z(c, 2);
        case "qo":
          return d.ordinalNumber(c, { unit: "quarter" });
        case "qqq":
          return d.quarter(c, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return d.quarter(c, { width: "narrow", context: "standalone" });
        case "qqqq":
        default:
          return d.quarter(c, { width: "wide", context: "standalone" });
      }
    },
    M: function (i, s, d) {
      var c = i.getUTCMonth();
      switch (s) {
        case "M":
        case "MM":
          return _t.M(i, s);
        case "Mo":
          return d.ordinalNumber(c + 1, { unit: "month" });
        case "MMM":
          return d.month(c, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return d.month(c, { width: "narrow", context: "formatting" });
        case "MMMM":
        default:
          return d.month(c, { width: "wide", context: "formatting" });
      }
    },
    L: function (i, s, d) {
      var c = i.getUTCMonth();
      switch (s) {
        case "L":
          return String(c + 1);
        case "LL":
          return Z(c + 1, 2);
        case "Lo":
          return d.ordinalNumber(c + 1, { unit: "month" });
        case "LLL":
          return d.month(c, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return d.month(c, { width: "narrow", context: "standalone" });
        case "LLLL":
        default:
          return d.month(c, { width: "wide", context: "standalone" });
      }
    },
    w: function (i, s, d, c) {
      var p = wf(i, c);
      return s === "wo" ? d.ordinalNumber(p, { unit: "week" }) : Z(p, s.length);
    },
    I: function (i, s, d) {
      var c = yf(i);
      return s === "Io" ? d.ordinalNumber(c, { unit: "week" }) : Z(c, s.length);
    },
    d: function (i, s, d) {
      return s === "do"
        ? d.ordinalNumber(i.getUTCDate(), { unit: "date" })
        : _t.d(i, s);
    },
    D: function (i, s, d) {
      var c = mf(i);
      return s === "Do"
        ? d.ordinalNumber(c, { unit: "dayOfYear" })
        : Z(c, s.length);
    },
    E: function (i, s, d) {
      var c = i.getUTCDay();
      switch (s) {
        case "E":
        case "EE":
        case "EEE":
          return d.day(c, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return d.day(c, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return d.day(c, { width: "short", context: "formatting" });
        case "EEEE":
        default:
          return d.day(c, { width: "wide", context: "formatting" });
      }
    },
    e: function (i, s, d, c) {
      var p = i.getUTCDay(),
        _ = (p - c.weekStartsOn + 8) % 7 || 7;
      switch (s) {
        case "e":
          return String(_);
        case "ee":
          return Z(_, 2);
        case "eo":
          return d.ordinalNumber(_, { unit: "day" });
        case "eee":
          return d.day(p, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return d.day(p, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return d.day(p, { width: "short", context: "formatting" });
        case "eeee":
        default:
          return d.day(p, { width: "wide", context: "formatting" });
      }
    },
    c: function (i, s, d, c) {
      var p = i.getUTCDay(),
        _ = (p - c.weekStartsOn + 8) % 7 || 7;
      switch (s) {
        case "c":
          return String(_);
        case "cc":
          return Z(_, s.length);
        case "co":
          return d.ordinalNumber(_, { unit: "day" });
        case "ccc":
          return d.day(p, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return d.day(p, { width: "narrow", context: "standalone" });
        case "cccccc":
          return d.day(p, { width: "short", context: "standalone" });
        case "cccc":
        default:
          return d.day(p, { width: "wide", context: "standalone" });
      }
    },
    i: function (i, s, d) {
      var c = i.getUTCDay(),
        p = c === 0 ? 7 : c;
      switch (s) {
        case "i":
          return String(p);
        case "ii":
          return Z(p, s.length);
        case "io":
          return d.ordinalNumber(p, { unit: "day" });
        case "iii":
          return d.day(c, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return d.day(c, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return d.day(c, { width: "short", context: "formatting" });
        case "iiii":
        default:
          return d.day(c, { width: "wide", context: "formatting" });
      }
    },
    a: function (i, s, d) {
      var c = i.getUTCHours(),
        p = c / 12 >= 1 ? "pm" : "am";
      switch (s) {
        case "a":
        case "aa":
          return d.dayPeriod(p, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return d
            .dayPeriod(p, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return d.dayPeriod(p, { width: "narrow", context: "formatting" });
        case "aaaa":
        default:
          return d.dayPeriod(p, { width: "wide", context: "formatting" });
      }
    },
    b: function (i, s, d) {
      var c = i.getUTCHours(),
        p;
      switch (
        (c === 12
          ? (p = nr.noon)
          : c === 0
          ? (p = nr.midnight)
          : (p = c / 12 >= 1 ? "pm" : "am"),
        s)
      ) {
        case "b":
        case "bb":
          return d.dayPeriod(p, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return d
            .dayPeriod(p, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return d.dayPeriod(p, { width: "narrow", context: "formatting" });
        case "bbbb":
        default:
          return d.dayPeriod(p, { width: "wide", context: "formatting" });
      }
    },
    B: function (i, s, d) {
      var c = i.getUTCHours(),
        p;
      switch (
        (c >= 17
          ? (p = nr.evening)
          : c >= 12
          ? (p = nr.afternoon)
          : c >= 4
          ? (p = nr.morning)
          : (p = nr.night),
        s)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return d.dayPeriod(p, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return d.dayPeriod(p, { width: "narrow", context: "formatting" });
        case "BBBB":
        default:
          return d.dayPeriod(p, { width: "wide", context: "formatting" });
      }
    },
    h: function (i, s, d) {
      if (s === "ho") {
        var c = i.getUTCHours() % 12;
        return c === 0 && (c = 12), d.ordinalNumber(c, { unit: "hour" });
      }
      return _t.h(i, s);
    },
    H: function (i, s, d) {
      return s === "Ho"
        ? d.ordinalNumber(i.getUTCHours(), { unit: "hour" })
        : _t.H(i, s);
    },
    K: function (i, s, d) {
      var c = i.getUTCHours() % 12;
      return s === "Ko" ? d.ordinalNumber(c, { unit: "hour" }) : Z(c, s.length);
    },
    k: function (i, s, d) {
      var c = i.getUTCHours();
      return (
        c === 0 && (c = 24),
        s === "ko" ? d.ordinalNumber(c, { unit: "hour" }) : Z(c, s.length)
      );
    },
    m: function (i, s, d) {
      return s === "mo"
        ? d.ordinalNumber(i.getUTCMinutes(), { unit: "minute" })
        : _t.m(i, s);
    },
    s: function (i, s, d) {
      return s === "so"
        ? d.ordinalNumber(i.getUTCSeconds(), { unit: "second" })
        : _t.s(i, s);
    },
    S: function (i, s) {
      return _t.S(i, s);
    },
    X: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = p.getTimezoneOffset();
      if (_ === 0) return "Z";
      switch (s) {
        case "X":
          return Yo(_);
        case "XXXX":
        case "XX":
          return Vt(_);
        case "XXXXX":
        case "XXX":
        default:
          return Vt(_, ":");
      }
    },
    x: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = p.getTimezoneOffset();
      switch (s) {
        case "x":
          return Yo(_);
        case "xxxx":
        case "xx":
          return Vt(_);
        case "xxxxx":
        case "xxx":
        default:
          return Vt(_, ":");
      }
    },
    O: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = p.getTimezoneOffset();
      switch (s) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + Eo(_, ":");
        case "OOOO":
        default:
          return "GMT" + Vt(_, ":");
      }
    },
    z: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = p.getTimezoneOffset();
      switch (s) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + Eo(_, ":");
        case "zzzz":
        default:
          return "GMT" + Vt(_, ":");
      }
    },
    t: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = Math.floor(p.getTime() / 1e3);
      return Z(_, s.length);
    },
    T: function (i, s, d, c) {
      var p = c._originalDate || i,
        _ = p.getTime();
      return Z(_, s.length);
    },
  };
function Eo(r, i) {
  var s = r > 0 ? "-" : "+",
    d = Math.abs(r),
    c = Math.floor(d / 60),
    p = d % 60;
  if (p === 0) return s + String(c);
  var _ = i || "";
  return s + String(c) + _ + Z(p, 2);
}
function Yo(r, i) {
  if (r % 60 === 0) {
    var s = r > 0 ? "-" : "+";
    return s + Z(Math.abs(r) / 60, 2);
  }
  return Vt(r, i);
}
function Vt(r, i) {
  var s = i || "",
    d = r > 0 ? "-" : "+",
    c = Math.abs(r),
    p = Z(Math.floor(c / 60), 2),
    _ = Z(c % 60, 2);
  return d + p + s + _;
}
const Sf = kf;
var zo = function (i, s) {
    switch (i) {
      case "P":
        return s.date({ width: "short" });
      case "PP":
        return s.date({ width: "medium" });
      case "PPP":
        return s.date({ width: "long" });
      case "PPPP":
      default:
        return s.date({ width: "full" });
    }
  },
  ss = function (i, s) {
    switch (i) {
      case "p":
        return s.time({ width: "short" });
      case "pp":
        return s.time({ width: "medium" });
      case "ppp":
        return s.time({ width: "long" });
      case "pppp":
      default:
        return s.time({ width: "full" });
    }
  },
  Df = function (i, s) {
    var d = i.match(/(P+)(p+)?/) || [],
      c = d[1],
      p = d[2];
    if (!p) return zo(i, s);
    var _;
    switch (c) {
      case "P":
        _ = s.dateTime({ width: "short" });
        break;
      case "PP":
        _ = s.dateTime({ width: "medium" });
        break;
      case "PPP":
        _ = s.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        _ = s.dateTime({ width: "full" });
        break;
    }
    return _.replace("{{date}}", zo(c, s)).replace("{{time}}", ss(p, s));
  },
  Tf = { p: ss, P: Df };
const Cf = Tf;
var Of = ["D", "DD"],
  Pf = ["YY", "YYYY"];
function Ff(r) {
  return Of.indexOf(r) !== -1;
}
function If(r) {
  return Pf.indexOf(r) !== -1;
}
function Bo(r, i, s) {
  if (r === "YYYY")
    throw new RangeError(
      "Use `yyyy` instead of `YYYY` (in `"
        .concat(i, "`) for formatting years to the input `")
        .concat(
          s,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
        )
    );
  if (r === "YY")
    throw new RangeError(
      "Use `yy` instead of `YY` (in `"
        .concat(i, "`) for formatting years to the input `")
        .concat(
          s,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
        )
    );
  if (r === "D")
    throw new RangeError(
      "Use `d` instead of `D` (in `"
        .concat(i, "`) for formatting days of the month to the input `")
        .concat(
          s,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
        )
    );
  if (r === "DD")
    throw new RangeError(
      "Use `dd` instead of `DD` (in `"
        .concat(i, "`) for formatting days of the month to the input `")
        .concat(
          s,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
        )
    );
}
var Af = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  Nf = function (i, s, d) {
    var c,
      p = Af[i];
    return (
      typeof p == "string"
        ? (c = p)
        : s === 1
        ? (c = p.one)
        : (c = p.other.replace("{{count}}", s.toString())),
      d != null && d.addSuffix
        ? d.comparison && d.comparison > 0
          ? "in " + c
          : c + " ago"
        : c
    );
  };
const Rf = Nf;
function Yn(r) {
  return function () {
    var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      s = i.width ? String(i.width) : r.defaultWidth,
      d = r.formats[s] || r.formats[r.defaultWidth];
    return d;
  };
}
var Lf = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  Wf = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a",
  },
  Ef = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  Yf = {
    date: Yn({ formats: Lf, defaultWidth: "full" }),
    time: Yn({ formats: Wf, defaultWidth: "full" }),
    dateTime: Yn({ formats: Ef, defaultWidth: "full" }),
  };
const zf = Yf;
var Bf = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  Hf = function (i, s, d, c) {
    return Bf[i];
  };
const Vf = Hf;
function Ir(r) {
  return function (i, s) {
    var d = s != null && s.context ? String(s.context) : "standalone",
      c;
    if (d === "formatting" && r.formattingValues) {
      var p = r.defaultFormattingWidth || r.defaultWidth,
        _ = s != null && s.width ? String(s.width) : p;
      c = r.formattingValues[_] || r.formattingValues[p];
    } else {
      var S = r.defaultWidth,
        T = s != null && s.width ? String(s.width) : r.defaultWidth;
      c = r.values[T] || r.values[S];
    }
    var P = r.argumentCallback ? r.argumentCallback(i) : i;
    return c[P];
  };
}
var Uf = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  jf = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  $f = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  Gf = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  qf = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  Xf = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  Zf = function (i, s) {
    var d = Number(i),
      c = d % 100;
    if (c > 20 || c < 10)
      switch (c % 10) {
        case 1:
          return d + "st";
        case 2:
          return d + "nd";
        case 3:
          return d + "rd";
      }
    return d + "th";
  },
  Kf = {
    ordinalNumber: Zf,
    era: Ir({ values: Uf, defaultWidth: "wide" }),
    quarter: Ir({
      values: jf,
      defaultWidth: "wide",
      argumentCallback: function (i) {
        return i - 1;
      },
    }),
    month: Ir({ values: $f, defaultWidth: "wide" }),
    day: Ir({ values: Gf, defaultWidth: "wide" }),
    dayPeriod: Ir({
      values: qf,
      defaultWidth: "wide",
      formattingValues: Xf,
      defaultFormattingWidth: "wide",
    }),
  };
const Qf = Kf;
function Ar(r) {
  return function (i) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      d = s.width,
      c = (d && r.matchPatterns[d]) || r.matchPatterns[r.defaultMatchWidth],
      p = i.match(c);
    if (!p) return null;
    var _ = p[0],
      S = (d && r.parsePatterns[d]) || r.parsePatterns[r.defaultParseWidth],
      T = Array.isArray(S)
        ? ec(S, function (Y) {
            return Y.test(_);
          })
        : Jf(S, function (Y) {
            return Y.test(_);
          }),
      P;
    (P = r.valueCallback ? r.valueCallback(T) : T),
      (P = s.valueCallback ? s.valueCallback(P) : P);
    var L = i.slice(_.length);
    return { value: P, rest: L };
  };
}
function Jf(r, i) {
  for (var s in r) if (r.hasOwnProperty(s) && i(r[s])) return s;
}
function ec(r, i) {
  for (var s = 0; s < r.length; s++) if (i(r[s])) return s;
}
function tc(r) {
  return function (i) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      d = i.match(r.matchPattern);
    if (!d) return null;
    var c = d[0],
      p = i.match(r.parsePattern);
    if (!p) return null;
    var _ = r.valueCallback ? r.valueCallback(p[0]) : p[0];
    _ = s.valueCallback ? s.valueCallback(_) : _;
    var S = i.slice(c.length);
    return { value: _, rest: S };
  };
}
var rc = /^(\d+)(th|st|nd|rd)?/i,
  ac = /\d+/i,
  nc = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  ic = { any: [/^b/i, /^(a|c)/i] },
  oc = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  sc = { any: [/1/i, /2/i, /3/i, /4/i] },
  lc = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  uc = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  dc = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  fc = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  cc = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  hc = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  vc = {
    ordinalNumber: tc({
      matchPattern: rc,
      parsePattern: ac,
      valueCallback: function (i) {
        return parseInt(i, 10);
      },
    }),
    era: Ar({
      matchPatterns: nc,
      defaultMatchWidth: "wide",
      parsePatterns: ic,
      defaultParseWidth: "any",
    }),
    quarter: Ar({
      matchPatterns: oc,
      defaultMatchWidth: "wide",
      parsePatterns: sc,
      defaultParseWidth: "any",
      valueCallback: function (i) {
        return i + 1;
      },
    }),
    month: Ar({
      matchPatterns: lc,
      defaultMatchWidth: "wide",
      parsePatterns: uc,
      defaultParseWidth: "any",
    }),
    day: Ar({
      matchPatterns: dc,
      defaultMatchWidth: "wide",
      parsePatterns: fc,
      defaultParseWidth: "any",
    }),
    dayPeriod: Ar({
      matchPatterns: cc,
      defaultMatchWidth: "any",
      parsePatterns: hc,
      defaultParseWidth: "any",
    }),
  };
const gc = vc;
var mc = {
  code: "en-US",
  formatDistance: Rf,
  formatLong: zf,
  formatRelative: Vf,
  localize: Qf,
  match: gc,
  options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
};
const pc = mc;
var bc = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  yc = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  _c = /^'([^]*?)'?$/,
  xc = /''/g,
  wc = /[a-zA-Z]/;
function Mc(r, i, s) {
  var d, c, p, _, S, T, P, L, Y, V, de, Te, Ct, Je, et, be, Ot, Pt;
  ge(2, arguments);
  var Xr = String(i),
    Ft = Ba(),
    It =
      (d =
        (c = s == null ? void 0 : s.locale) !== null && c !== void 0
          ? c
          : Ft.locale) !== null && d !== void 0
        ? d
        : pc,
    br = St(
      (p =
        (_ =
          (S =
            (T = s == null ? void 0 : s.firstWeekContainsDate) !== null &&
            T !== void 0
              ? T
              : s == null ||
                (P = s.locale) === null ||
                P === void 0 ||
                (L = P.options) === null ||
                L === void 0
              ? void 0
              : L.firstWeekContainsDate) !== null && S !== void 0
            ? S
            : Ft.firstWeekContainsDate) !== null && _ !== void 0
          ? _
          : (Y = Ft.locale) === null ||
            Y === void 0 ||
            (V = Y.options) === null ||
            V === void 0
          ? void 0
          : V.firstWeekContainsDate) !== null && p !== void 0
        ? p
        : 1
    );
  if (!(br >= 1 && br <= 7))
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively"
    );
  var yr = St(
    (de =
      (Te =
        (Ct =
          (Je = s == null ? void 0 : s.weekStartsOn) !== null && Je !== void 0
            ? Je
            : s == null ||
              (et = s.locale) === null ||
              et === void 0 ||
              (be = et.options) === null ||
              be === void 0
            ? void 0
            : be.weekStartsOn) !== null && Ct !== void 0
          ? Ct
          : Ft.weekStartsOn) !== null && Te !== void 0
        ? Te
        : (Ot = Ft.locale) === null ||
          Ot === void 0 ||
          (Pt = Ot.options) === null ||
          Pt === void 0
        ? void 0
        : Pt.weekStartsOn) !== null && de !== void 0
      ? de
      : 0
  );
  if (!(yr >= 0 && yr <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!It.localize)
    throw new RangeError("locale must contain localize property");
  if (!It.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var qt = Ze(r);
  if (!hf(qt)) throw new RangeError("Invalid time value");
  var Zr = ff(qt),
    rn = vf(qt, Zr),
    Kr = {
      firstWeekContainsDate: br,
      weekStartsOn: yr,
      locale: It,
      _originalDate: qt,
    },
    an = Xr.match(yc)
      .map(function (ce) {
        var Ve = ce[0];
        if (Ve === "p" || Ve === "P") {
          var Xt = Cf[Ve];
          return Xt(ce, It.formatLong);
        }
        return ce;
      })
      .join("")
      .match(bc)
      .map(function (ce) {
        if (ce === "''") return "'";
        var Ve = ce[0];
        if (Ve === "'") return kc(ce);
        var Xt = Sf[Ve];
        if (Xt)
          return (
            !(s != null && s.useAdditionalWeekYearTokens) &&
              If(ce) &&
              Bo(ce, i, String(r)),
            !(s != null && s.useAdditionalDayOfYearTokens) &&
              Ff(ce) &&
              Bo(ce, i, String(r)),
            Xt(rn, ce, It.localize, Kr)
          );
        if (Ve.match(wc))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              Ve +
              "`"
          );
        return ce;
      })
      .join("");
  return an;
}
function kc(r) {
  var i = r.match(_c);
  return i ? i[1].replace(xc, "'") : r;
}
function Sc(r, i) {
  var s;
  ge(1, arguments);
  var d = St(
    (s = i == null ? void 0 : i.additionalDigits) !== null && s !== void 0
      ? s
      : 2
  );
  if (d !== 2 && d !== 1 && d !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (
    !(
      typeof r == "string" ||
      Object.prototype.toString.call(r) === "[object String]"
    )
  )
    return new Date(NaN);
  var c = Oc(r),
    p;
  if (c.date) {
    var _ = Pc(c.date, d);
    p = Fc(_.restDateString, _.year);
  }
  if (!p || isNaN(p.getTime())) return new Date(NaN);
  var S = p.getTime(),
    T = 0,
    P;
  if (c.time && ((T = Ic(c.time)), isNaN(T))) return new Date(NaN);
  if (c.timezone) {
    if (((P = Ac(c.timezone)), isNaN(P))) return new Date(NaN);
  } else {
    var L = new Date(S + T),
      Y = new Date(0);
    return (
      Y.setFullYear(L.getUTCFullYear(), L.getUTCMonth(), L.getUTCDate()),
      Y.setHours(
        L.getUTCHours(),
        L.getUTCMinutes(),
        L.getUTCSeconds(),
        L.getUTCMilliseconds()
      ),
      Y
    );
  }
  return new Date(S + T + P);
}
var ma = {
    dateTimeDelimiter: /[T ]/,
    timeZoneDelimiter: /[Z ]/i,
    timezone: /([Z+-].*)$/,
  },
  Dc = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
  Tc =
    /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
  Cc = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Oc(r) {
  var i = {},
    s = r.split(ma.dateTimeDelimiter),
    d;
  if (s.length > 2) return i;
  if (
    (/:/.test(s[0])
      ? (d = s[0])
      : ((i.date = s[0]),
        (d = s[1]),
        ma.timeZoneDelimiter.test(i.date) &&
          ((i.date = r.split(ma.timeZoneDelimiter)[0]),
          (d = r.substr(i.date.length, r.length)))),
    d)
  ) {
    var c = ma.timezone.exec(d);
    c ? ((i.time = d.replace(c[1], "")), (i.timezone = c[1])) : (i.time = d);
  }
  return i;
}
function Pc(r, i) {
  var s = new RegExp(
      "^(?:(\\d{4}|[+-]\\d{" +
        (4 + i) +
        "})|(\\d{2}|[+-]\\d{" +
        (2 + i) +
        "})$)"
    ),
    d = r.match(s);
  if (!d) return { year: NaN, restDateString: "" };
  var c = d[1] ? parseInt(d[1]) : null,
    p = d[2] ? parseInt(d[2]) : null;
  return {
    year: p === null ? c : p * 100,
    restDateString: r.slice((d[1] || d[2]).length),
  };
}
function Fc(r, i) {
  if (i === null) return new Date(NaN);
  var s = r.match(Dc);
  if (!s) return new Date(NaN);
  var d = !!s[4],
    c = Nr(s[1]),
    p = Nr(s[2]) - 1,
    _ = Nr(s[3]),
    S = Nr(s[4]),
    T = Nr(s[5]) - 1;
  if (d) return Ec(i, S, T) ? Nc(i, S, T) : new Date(NaN);
  var P = new Date(0);
  return !Lc(i, p, _) || !Wc(i, c)
    ? new Date(NaN)
    : (P.setUTCFullYear(i, p, Math.max(c, _)), P);
}
function Nr(r) {
  return r ? parseInt(r) : 1;
}
function Ic(r) {
  var i = r.match(Tc);
  if (!i) return NaN;
  var s = zn(i[1]),
    d = zn(i[2]),
    c = zn(i[3]);
  return Yc(s, d, c) ? s * ns + d * as + c * 1e3 : NaN;
}
function zn(r) {
  return (r && parseFloat(r.replace(",", "."))) || 0;
}
function Ac(r) {
  if (r === "Z") return 0;
  var i = r.match(Cc);
  if (!i) return 0;
  var s = i[1] === "+" ? -1 : 1,
    d = parseInt(i[2]),
    c = (i[3] && parseInt(i[3])) || 0;
  return zc(d, c) ? s * (d * ns + c * as) : NaN;
}
function Nc(r, i, s) {
  var d = new Date(0);
  d.setUTCFullYear(r, 0, 4);
  var c = d.getUTCDay() || 7,
    p = (i - 1) * 7 + s + 1 - c;
  return d.setUTCDate(d.getUTCDate() + p), d;
}
var Rc = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ls(r) {
  return r % 400 === 0 || (r % 4 === 0 && r % 100 !== 0);
}
function Lc(r, i, s) {
  return i >= 0 && i <= 11 && s >= 1 && s <= (Rc[i] || (ls(r) ? 29 : 28));
}
function Wc(r, i) {
  return i >= 1 && i <= (ls(r) ? 366 : 365);
}
function Ec(r, i, s) {
  return i >= 1 && i <= 53 && s >= 0 && s <= 6;
}
function Yc(r, i, s) {
  return r === 24
    ? i === 0 && s === 0
    : s >= 0 && s < 60 && i >= 0 && i < 60 && r >= 0 && r < 25;
}
function zc(r, i) {
  return i >= 0 && i <= 59;
}
var us = { exports: {} }; //! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var ds;
function O() {
  return ds.apply(null, arguments);
}
function Bc(r) {
  ds = r;
}
function ze(r) {
  return (
    r instanceof Array || Object.prototype.toString.call(r) === "[object Array]"
  );
}
function jt(r) {
  return r != null && Object.prototype.toString.call(r) === "[object Object]";
}
function q(r, i) {
  return Object.prototype.hasOwnProperty.call(r, i);
}
function ri(r) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(r).length === 0;
  var i;
  for (i in r) if (q(r, i)) return !1;
  return !0;
}
function De(r) {
  return r === void 0;
}
function ft(r) {
  return (
    typeof r == "number" ||
    Object.prototype.toString.call(r) === "[object Number]"
  );
}
function Ur(r) {
  return (
    r instanceof Date || Object.prototype.toString.call(r) === "[object Date]"
  );
}
function fs(r, i) {
  var s = [],
    d,
    c = r.length;
  for (d = 0; d < c; ++d) s.push(i(r[d], d));
  return s;
}
function wt(r, i) {
  for (var s in i) q(i, s) && (r[s] = i[s]);
  return (
    q(i, "toString") && (r.toString = i.toString),
    q(i, "valueOf") && (r.valueOf = i.valueOf),
    r
  );
}
function Ke(r, i, s, d) {
  return Rs(r, i, s, d, !0).utc();
}
function Hc() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1,
  };
}
function z(r) {
  return r._pf == null && (r._pf = Hc()), r._pf;
}
var jn;
Array.prototype.some
  ? (jn = Array.prototype.some)
  : (jn = function (r) {
      var i = Object(this),
        s = i.length >>> 0,
        d;
      for (d = 0; d < s; d++) if (d in i && r.call(this, i[d], d, i)) return !0;
      return !1;
    });
function ai(r) {
  if (r._isValid == null) {
    var i = z(r),
      s = jn.call(i.parsedDateParts, function (c) {
        return c != null;
      }),
      d =
        !isNaN(r._d.getTime()) &&
        i.overflow < 0 &&
        !i.empty &&
        !i.invalidEra &&
        !i.invalidMonth &&
        !i.invalidWeekday &&
        !i.weekdayMismatch &&
        !i.nullInput &&
        !i.invalidFormat &&
        !i.userInvalidated &&
        (!i.meridiem || (i.meridiem && s));
    if (
      (r._strict &&
        (d =
          d &&
          i.charsLeftOver === 0 &&
          i.unusedTokens.length === 0 &&
          i.bigHour === void 0),
      Object.isFrozen == null || !Object.isFrozen(r))
    )
      r._isValid = d;
    else return d;
  }
  return r._isValid;
}
function Ha(r) {
  var i = Ke(NaN);
  return r != null ? wt(z(i), r) : (z(i).userInvalidated = !0), i;
}
var Ho = (O.momentProperties = []),
  Bn = !1;
function ni(r, i) {
  var s,
    d,
    c,
    p = Ho.length;
  if (
    (De(i._isAMomentObject) || (r._isAMomentObject = i._isAMomentObject),
    De(i._i) || (r._i = i._i),
    De(i._f) || (r._f = i._f),
    De(i._l) || (r._l = i._l),
    De(i._strict) || (r._strict = i._strict),
    De(i._tzm) || (r._tzm = i._tzm),
    De(i._isUTC) || (r._isUTC = i._isUTC),
    De(i._offset) || (r._offset = i._offset),
    De(i._pf) || (r._pf = z(i)),
    De(i._locale) || (r._locale = i._locale),
    p > 0)
  )
    for (s = 0; s < p; s++) (d = Ho[s]), (c = i[d]), De(c) || (r[d] = c);
  return r;
}
function jr(r) {
  ni(this, r),
    (this._d = new Date(r._d != null ? r._d.getTime() : NaN)),
    this.isValid() || (this._d = new Date(NaN)),
    Bn === !1 && ((Bn = !0), O.updateOffset(this), (Bn = !1));
}
function Be(r) {
  return r instanceof jr || (r != null && r._isAMomentObject != null);
}
function cs(r) {
  O.suppressDeprecationWarnings === !1 &&
    typeof console < "u" &&
    console.warn &&
    console.warn("Deprecation warning: " + r);
}
function We(r, i) {
  var s = !0;
  return wt(function () {
    if ((O.deprecationHandler != null && O.deprecationHandler(null, r), s)) {
      var d = [],
        c,
        p,
        _,
        S = arguments.length;
      for (p = 0; p < S; p++) {
        if (((c = ""), typeof arguments[p] == "object")) {
          c +=
            `
[` +
            p +
            "] ";
          for (_ in arguments[0])
            q(arguments[0], _) && (c += _ + ": " + arguments[0][_] + ", ");
          c = c.slice(0, -2);
        } else c = arguments[p];
        d.push(c);
      }
      cs(
        r +
          `
Arguments: ` +
          Array.prototype.slice.call(d).join("") +
          `
` +
          new Error().stack
      ),
        (s = !1);
    }
    return i.apply(this, arguments);
  }, i);
}
var Vo = {};
function hs(r, i) {
  O.deprecationHandler != null && O.deprecationHandler(r, i),
    Vo[r] || (cs(i), (Vo[r] = !0));
}
O.suppressDeprecationWarnings = !1;
O.deprecationHandler = null;
function Qe(r) {
  return (
    (typeof Function < "u" && r instanceof Function) ||
    Object.prototype.toString.call(r) === "[object Function]"
  );
}
function Vc(r) {
  var i, s;
  for (s in r)
    q(r, s) && ((i = r[s]), Qe(i) ? (this[s] = i) : (this["_" + s] = i));
  (this._config = r),
    (this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
        "|" +
        /\d{1,2}/.source
    ));
}
function $n(r, i) {
  var s = wt({}, r),
    d;
  for (d in i)
    q(i, d) &&
      (jt(r[d]) && jt(i[d])
        ? ((s[d] = {}), wt(s[d], r[d]), wt(s[d], i[d]))
        : i[d] != null
        ? (s[d] = i[d])
        : delete s[d]);
  for (d in r) q(r, d) && !q(i, d) && jt(r[d]) && (s[d] = wt({}, s[d]));
  return s;
}
function ii(r) {
  r != null && this.set(r);
}
var Gn;
Object.keys
  ? (Gn = Object.keys)
  : (Gn = function (r) {
      var i,
        s = [];
      for (i in r) q(r, i) && s.push(i);
      return s;
    });
var Uc = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L",
};
function jc(r, i, s) {
  var d = this._calendar[r] || this._calendar.sameElse;
  return Qe(d) ? d.call(i, s) : d;
}
function Xe(r, i, s) {
  var d = "" + Math.abs(r),
    c = i - d.length,
    p = r >= 0;
  return (
    (p ? (s ? "+" : "") : "-") +
    Math.pow(10, Math.max(0, c)).toString().substr(1) +
    d
  );
}
var oi =
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  pa = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  Hn = {},
  hr = {};
function R(r, i, s, d) {
  var c = d;
  typeof d == "string" &&
    (c = function () {
      return this[d]();
    }),
    r && (hr[r] = c),
    i &&
      (hr[i[0]] = function () {
        return Xe(c.apply(this, arguments), i[1], i[2]);
      }),
    s &&
      (hr[s] = function () {
        return this.localeData().ordinal(c.apply(this, arguments), r);
      });
}
function $c(r) {
  return r.match(/\[[\s\S]/) ? r.replace(/^\[|\]$/g, "") : r.replace(/\\/g, "");
}
function Gc(r) {
  var i = r.match(oi),
    s,
    d;
  for (s = 0, d = i.length; s < d; s++)
    hr[i[s]] ? (i[s] = hr[i[s]]) : (i[s] = $c(i[s]));
  return function (c) {
    var p = "",
      _;
    for (_ = 0; _ < d; _++) p += Qe(i[_]) ? i[_].call(c, r) : i[_];
    return p;
  };
}
function Da(r, i) {
  return r.isValid()
    ? ((i = vs(i, r.localeData())), (Hn[i] = Hn[i] || Gc(i)), Hn[i](r))
    : r.localeData().invalidDate();
}
function vs(r, i) {
  var s = 5;
  function d(c) {
    return i.longDateFormat(c) || c;
  }
  for (pa.lastIndex = 0; s >= 0 && pa.test(r); )
    (r = r.replace(pa, d)), (pa.lastIndex = 0), (s -= 1);
  return r;
}
var qc = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A",
};
function Xc(r) {
  var i = this._longDateFormat[r],
    s = this._longDateFormat[r.toUpperCase()];
  return i || !s
    ? i
    : ((this._longDateFormat[r] = s
        .match(oi)
        .map(function (d) {
          return d === "MMMM" || d === "MM" || d === "DD" || d === "dddd"
            ? d.slice(1)
            : d;
        })
        .join("")),
      this._longDateFormat[r]);
}
var Zc = "Invalid date";
function Kc() {
  return this._invalidDate;
}
var Qc = "%d",
  Jc = /\d{1,2}/;
function eh(r) {
  return this._ordinal.replace("%d", r);
}
var th = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years",
};
function rh(r, i, s, d) {
  var c = this._relativeTime[s];
  return Qe(c) ? c(r, i, s, d) : c.replace(/%d/i, r);
}
function ah(r, i) {
  var s = this._relativeTime[r > 0 ? "future" : "past"];
  return Qe(s) ? s(i) : s.replace(/%s/i, i);
}
var Er = {};
function me(r, i) {
  var s = r.toLowerCase();
  Er[s] = Er[s + "s"] = Er[i] = r;
}
function Ee(r) {
  return typeof r == "string" ? Er[r] || Er[r.toLowerCase()] : void 0;
}
function si(r) {
  var i = {},
    s,
    d;
  for (d in r) q(r, d) && ((s = Ee(d)), s && (i[s] = r[d]));
  return i;
}
var gs = {};
function pe(r, i) {
  gs[r] = i;
}
function nh(r) {
  var i = [],
    s;
  for (s in r) q(r, s) && i.push({ unit: s, priority: gs[s] });
  return (
    i.sort(function (d, c) {
      return d.priority - c.priority;
    }),
    i
  );
}
function Va(r) {
  return (r % 4 === 0 && r % 100 !== 0) || r % 400 === 0;
}
function Re(r) {
  return r < 0 ? Math.ceil(r) || 0 : Math.floor(r);
}
function H(r) {
  var i = +r,
    s = 0;
  return i !== 0 && isFinite(i) && (s = Re(i)), s;
}
function mr(r, i) {
  return function (s) {
    return s != null
      ? (ms(this, r, s), O.updateOffset(this, i), this)
      : Aa(this, r);
  };
}
function Aa(r, i) {
  return r.isValid() ? r._d["get" + (r._isUTC ? "UTC" : "") + i]() : NaN;
}
function ms(r, i, s) {
  r.isValid() &&
    !isNaN(s) &&
    (i === "FullYear" && Va(r.year()) && r.month() === 1 && r.date() === 29
      ? ((s = H(s)),
        r._d["set" + (r._isUTC ? "UTC" : "") + i](
          s,
          r.month(),
          Xa(s, r.month())
        ))
      : r._d["set" + (r._isUTC ? "UTC" : "") + i](s));
}
function ih(r) {
  return (r = Ee(r)), Qe(this[r]) ? this[r]() : this;
}
function oh(r, i) {
  if (typeof r == "object") {
    r = si(r);
    var s = nh(r),
      d,
      c = s.length;
    for (d = 0; d < c; d++) this[s[d].unit](r[s[d].unit]);
  } else if (((r = Ee(r)), Qe(this[r]))) return this[r](i);
  return this;
}
var ps = /\d/,
  Pe = /\d\d/,
  bs = /\d{3}/,
  li = /\d{4}/,
  Ua = /[+-]?\d{6}/,
  re = /\d\d?/,
  ys = /\d\d\d\d?/,
  _s = /\d\d\d\d\d\d?/,
  ja = /\d{1,3}/,
  ui = /\d{1,4}/,
  $a = /[+-]?\d{1,6}/,
  pr = /\d+/,
  Ga = /[+-]?\d+/,
  sh = /Z|[+-]\d\d:?\d\d/gi,
  qa = /Z|[+-]\d\d(?::?\d\d)?/gi,
  lh = /[+-]?\d+(\.\d{1,3})?/,
  $r =
    /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  Na;
Na = {};
function I(r, i, s) {
  Na[r] = Qe(i)
    ? i
    : function (d, c) {
        return d && s ? s : i;
      };
}
function uh(r, i) {
  return q(Na, r) ? Na[r](i._strict, i._locale) : new RegExp(dh(r));
}
function dh(r) {
  return Oe(
    r
      .replace("\\", "")
      .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (i, s, d, c, p) {
        return s || d || c || p;
      })
  );
}
function Oe(r) {
  return r.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var qn = {};
function Q(r, i) {
  var s,
    d = i,
    c;
  for (
    typeof r == "string" && (r = [r]),
      ft(i) &&
        (d = function (p, _) {
          _[i] = H(p);
        }),
      c = r.length,
      s = 0;
    s < c;
    s++
  )
    qn[r[s]] = d;
}
function Gr(r, i) {
  Q(r, function (s, d, c, p) {
    (c._w = c._w || {}), i(s, c._w, c, p);
  });
}
function fh(r, i, s) {
  i != null && q(qn, r) && qn[r](i, s._a, s, r);
}
var ve = 0,
  lt = 1,
  qe = 2,
  le = 3,
  Ye = 4,
  ut = 5,
  Ut = 6,
  ch = 7,
  hh = 8;
function vh(r, i) {
  return ((r % i) + i) % i;
}
var ie;
Array.prototype.indexOf
  ? (ie = Array.prototype.indexOf)
  : (ie = function (r) {
      var i;
      for (i = 0; i < this.length; ++i) if (this[i] === r) return i;
      return -1;
    });
function Xa(r, i) {
  if (isNaN(r) || isNaN(i)) return NaN;
  var s = vh(i, 12);
  return (r += (i - s) / 12), s === 1 ? (Va(r) ? 29 : 28) : 31 - ((s % 7) % 2);
}
R("M", ["MM", 2], "Mo", function () {
  return this.month() + 1;
});
R("MMM", 0, 0, function (r) {
  return this.localeData().monthsShort(this, r);
});
R("MMMM", 0, 0, function (r) {
  return this.localeData().months(this, r);
});
me("month", "M");
pe("month", 8);
I("M", re);
I("MM", re, Pe);
I("MMM", function (r, i) {
  return i.monthsShortRegex(r);
});
I("MMMM", function (r, i) {
  return i.monthsRegex(r);
});
Q(["M", "MM"], function (r, i) {
  i[lt] = H(r) - 1;
});
Q(["MMM", "MMMM"], function (r, i, s, d) {
  var c = s._locale.monthsParse(r, d, s._strict);
  c != null ? (i[lt] = c) : (z(s).invalidMonth = r);
});
var gh =
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  xs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  ws = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  mh = $r,
  ph = $r;
function bh(r, i) {
  return r
    ? ze(this._months)
      ? this._months[r.month()]
      : this._months[
          (this._months.isFormat || ws).test(i) ? "format" : "standalone"
        ][r.month()]
    : ze(this._months)
    ? this._months
    : this._months.standalone;
}
function yh(r, i) {
  return r
    ? ze(this._monthsShort)
      ? this._monthsShort[r.month()]
      : this._monthsShort[ws.test(i) ? "format" : "standalone"][r.month()]
    : ze(this._monthsShort)
    ? this._monthsShort
    : this._monthsShort.standalone;
}
function _h(r, i, s) {
  var d,
    c,
    p,
    _ = r.toLocaleLowerCase();
  if (!this._monthsParse)
    for (
      this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = [],
        d = 0;
      d < 12;
      ++d
    )
      (p = Ke([2e3, d])),
        (this._shortMonthsParse[d] = this.monthsShort(
          p,
          ""
        ).toLocaleLowerCase()),
        (this._longMonthsParse[d] = this.months(p, "").toLocaleLowerCase());
  return s
    ? i === "MMM"
      ? ((c = ie.call(this._shortMonthsParse, _)), c !== -1 ? c : null)
      : ((c = ie.call(this._longMonthsParse, _)), c !== -1 ? c : null)
    : i === "MMM"
    ? ((c = ie.call(this._shortMonthsParse, _)),
      c !== -1
        ? c
        : ((c = ie.call(this._longMonthsParse, _)), c !== -1 ? c : null))
    : ((c = ie.call(this._longMonthsParse, _)),
      c !== -1
        ? c
        : ((c = ie.call(this._shortMonthsParse, _)), c !== -1 ? c : null));
}
function xh(r, i, s) {
  var d, c, p;
  if (this._monthsParseExact) return _h.call(this, r, i, s);
  for (
    this._monthsParse ||
      ((this._monthsParse = []),
      (this._longMonthsParse = []),
      (this._shortMonthsParse = [])),
      d = 0;
    d < 12;
    d++
  ) {
    if (
      ((c = Ke([2e3, d])),
      s &&
        !this._longMonthsParse[d] &&
        ((this._longMonthsParse[d] = new RegExp(
          "^" + this.months(c, "").replace(".", "") + "$",
          "i"
        )),
        (this._shortMonthsParse[d] = new RegExp(
          "^" + this.monthsShort(c, "").replace(".", "") + "$",
          "i"
        ))),
      !s &&
        !this._monthsParse[d] &&
        ((p = "^" + this.months(c, "") + "|^" + this.monthsShort(c, "")),
        (this._monthsParse[d] = new RegExp(p.replace(".", ""), "i"))),
      s && i === "MMMM" && this._longMonthsParse[d].test(r))
    )
      return d;
    if (s && i === "MMM" && this._shortMonthsParse[d].test(r)) return d;
    if (!s && this._monthsParse[d].test(r)) return d;
  }
}
function Ms(r, i) {
  var s;
  if (!r.isValid()) return r;
  if (typeof i == "string") {
    if (/^\d+$/.test(i)) i = H(i);
    else if (((i = r.localeData().monthsParse(i)), !ft(i))) return r;
  }
  return (
    (s = Math.min(r.date(), Xa(r.year(), i))),
    r._d["set" + (r._isUTC ? "UTC" : "") + "Month"](i, s),
    r
  );
}
function ks(r) {
  return r != null
    ? (Ms(this, r), O.updateOffset(this, !0), this)
    : Aa(this, "Month");
}
function wh() {
  return Xa(this.year(), this.month());
}
function Mh(r) {
  return this._monthsParseExact
    ? (q(this, "_monthsRegex") || Ss.call(this),
      r ? this._monthsShortStrictRegex : this._monthsShortRegex)
    : (q(this, "_monthsShortRegex") || (this._monthsShortRegex = mh),
      this._monthsShortStrictRegex && r
        ? this._monthsShortStrictRegex
        : this._monthsShortRegex);
}
function kh(r) {
  return this._monthsParseExact
    ? (q(this, "_monthsRegex") || Ss.call(this),
      r ? this._monthsStrictRegex : this._monthsRegex)
    : (q(this, "_monthsRegex") || (this._monthsRegex = ph),
      this._monthsStrictRegex && r
        ? this._monthsStrictRegex
        : this._monthsRegex);
}
function Ss() {
  function r(_, S) {
    return S.length - _.length;
  }
  var i = [],
    s = [],
    d = [],
    c,
    p;
  for (c = 0; c < 12; c++)
    (p = Ke([2e3, c])),
      i.push(this.monthsShort(p, "")),
      s.push(this.months(p, "")),
      d.push(this.months(p, "")),
      d.push(this.monthsShort(p, ""));
  for (i.sort(r), s.sort(r), d.sort(r), c = 0; c < 12; c++)
    (i[c] = Oe(i[c])), (s[c] = Oe(s[c]));
  for (c = 0; c < 24; c++) d[c] = Oe(d[c]);
  (this._monthsRegex = new RegExp("^(" + d.join("|") + ")", "i")),
    (this._monthsShortRegex = this._monthsRegex),
    (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
    (this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"));
}
R("Y", 0, 0, function () {
  var r = this.year();
  return r <= 9999 ? Xe(r, 4) : "+" + r;
});
R(0, ["YY", 2], 0, function () {
  return this.year() % 100;
});
R(0, ["YYYY", 4], 0, "year");
R(0, ["YYYYY", 5], 0, "year");
R(0, ["YYYYYY", 6, !0], 0, "year");
me("year", "y");
pe("year", 1);
I("Y", Ga);
I("YY", re, Pe);
I("YYYY", ui, li);
I("YYYYY", $a, Ua);
I("YYYYYY", $a, Ua);
Q(["YYYYY", "YYYYYY"], ve);
Q("YYYY", function (r, i) {
  i[ve] = r.length === 2 ? O.parseTwoDigitYear(r) : H(r);
});
Q("YY", function (r, i) {
  i[ve] = O.parseTwoDigitYear(r);
});
Q("Y", function (r, i) {
  i[ve] = parseInt(r, 10);
});
function Yr(r) {
  return Va(r) ? 366 : 365;
}
O.parseTwoDigitYear = function (r) {
  return H(r) + (H(r) > 68 ? 1900 : 2e3);
};
var Ds = mr("FullYear", !0);
function Sh() {
  return Va(this.year());
}
function Dh(r, i, s, d, c, p, _) {
  var S;
  return (
    r < 100 && r >= 0
      ? ((S = new Date(r + 400, i, s, d, c, p, _)),
        isFinite(S.getFullYear()) && S.setFullYear(r))
      : (S = new Date(r, i, s, d, c, p, _)),
    S
  );
}
function zr(r) {
  var i, s;
  return (
    r < 100 && r >= 0
      ? ((s = Array.prototype.slice.call(arguments)),
        (s[0] = r + 400),
        (i = new Date(Date.UTC.apply(null, s))),
        isFinite(i.getUTCFullYear()) && i.setUTCFullYear(r))
      : (i = new Date(Date.UTC.apply(null, arguments))),
    i
  );
}
function Ra(r, i, s) {
  var d = 7 + i - s,
    c = (7 + zr(r, 0, d).getUTCDay() - i) % 7;
  return -c + d - 1;
}
function Ts(r, i, s, d, c) {
  var p = (7 + s - d) % 7,
    _ = Ra(r, d, c),
    S = 1 + 7 * (i - 1) + p + _,
    T,
    P;
  return (
    S <= 0
      ? ((T = r - 1), (P = Yr(T) + S))
      : S > Yr(r)
      ? ((T = r + 1), (P = S - Yr(r)))
      : ((T = r), (P = S)),
    { year: T, dayOfYear: P }
  );
}
function Br(r, i, s) {
  var d = Ra(r.year(), i, s),
    c = Math.floor((r.dayOfYear() - d - 1) / 7) + 1,
    p,
    _;
  return (
    c < 1
      ? ((_ = r.year() - 1), (p = c + dt(_, i, s)))
      : c > dt(r.year(), i, s)
      ? ((p = c - dt(r.year(), i, s)), (_ = r.year() + 1))
      : ((_ = r.year()), (p = c)),
    { week: p, year: _ }
  );
}
function dt(r, i, s) {
  var d = Ra(r, i, s),
    c = Ra(r + 1, i, s);
  return (Yr(r) - d + c) / 7;
}
R("w", ["ww", 2], "wo", "week");
R("W", ["WW", 2], "Wo", "isoWeek");
me("week", "w");
me("isoWeek", "W");
pe("week", 5);
pe("isoWeek", 5);
I("w", re);
I("ww", re, Pe);
I("W", re);
I("WW", re, Pe);
Gr(["w", "ww", "W", "WW"], function (r, i, s, d) {
  i[d.substr(0, 1)] = H(r);
});
function Th(r) {
  return Br(r, this._week.dow, this._week.doy).week;
}
var Ch = { dow: 0, doy: 6 };
function Oh() {
  return this._week.dow;
}
function Ph() {
  return this._week.doy;
}
function Fh(r) {
  var i = this.localeData().week(this);
  return r == null ? i : this.add((r - i) * 7, "d");
}
function Ih(r) {
  var i = Br(this, 1, 4).week;
  return r == null ? i : this.add((r - i) * 7, "d");
}
R("d", 0, "do", "day");
R("dd", 0, 0, function (r) {
  return this.localeData().weekdaysMin(this, r);
});
R("ddd", 0, 0, function (r) {
  return this.localeData().weekdaysShort(this, r);
});
R("dddd", 0, 0, function (r) {
  return this.localeData().weekdays(this, r);
});
R("e", 0, 0, "weekday");
R("E", 0, 0, "isoWeekday");
me("day", "d");
me("weekday", "e");
me("isoWeekday", "E");
pe("day", 11);
pe("weekday", 11);
pe("isoWeekday", 11);
I("d", re);
I("e", re);
I("E", re);
I("dd", function (r, i) {
  return i.weekdaysMinRegex(r);
});
I("ddd", function (r, i) {
  return i.weekdaysShortRegex(r);
});
I("dddd", function (r, i) {
  return i.weekdaysRegex(r);
});
Gr(["dd", "ddd", "dddd"], function (r, i, s, d) {
  var c = s._locale.weekdaysParse(r, d, s._strict);
  c != null ? (i.d = c) : (z(s).invalidWeekday = r);
});
Gr(["d", "e", "E"], function (r, i, s, d) {
  i[d] = H(r);
});
function Ah(r, i) {
  return typeof r != "string"
    ? r
    : isNaN(r)
    ? ((r = i.weekdaysParse(r)), typeof r == "number" ? r : null)
    : parseInt(r, 10);
}
function Nh(r, i) {
  return typeof r == "string"
    ? i.weekdaysParse(r) % 7 || 7
    : isNaN(r)
    ? null
    : r;
}
function di(r, i) {
  return r.slice(i, 7).concat(r.slice(0, i));
}
var Rh = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  Cs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  Lh = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  Wh = $r,
  Eh = $r,
  Yh = $r;
function zh(r, i) {
  var s = ze(this._weekdays)
    ? this._weekdays
    : this._weekdays[
        r && r !== !0 && this._weekdays.isFormat.test(i)
          ? "format"
          : "standalone"
      ];
  return r === !0 ? di(s, this._week.dow) : r ? s[r.day()] : s;
}
function Bh(r) {
  return r === !0
    ? di(this._weekdaysShort, this._week.dow)
    : r
    ? this._weekdaysShort[r.day()]
    : this._weekdaysShort;
}
function Hh(r) {
  return r === !0
    ? di(this._weekdaysMin, this._week.dow)
    : r
    ? this._weekdaysMin[r.day()]
    : this._weekdaysMin;
}
function Vh(r, i, s) {
  var d,
    c,
    p,
    _ = r.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (
      this._weekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._minWeekdaysParse = [],
        d = 0;
      d < 7;
      ++d
    )
      (p = Ke([2e3, 1]).day(d)),
        (this._minWeekdaysParse[d] = this.weekdaysMin(
          p,
          ""
        ).toLocaleLowerCase()),
        (this._shortWeekdaysParse[d] = this.weekdaysShort(
          p,
          ""
        ).toLocaleLowerCase()),
        (this._weekdaysParse[d] = this.weekdays(p, "").toLocaleLowerCase());
  return s
    ? i === "dddd"
      ? ((c = ie.call(this._weekdaysParse, _)), c !== -1 ? c : null)
      : i === "ddd"
      ? ((c = ie.call(this._shortWeekdaysParse, _)), c !== -1 ? c : null)
      : ((c = ie.call(this._minWeekdaysParse, _)), c !== -1 ? c : null)
    : i === "dddd"
    ? ((c = ie.call(this._weekdaysParse, _)),
      c !== -1 || ((c = ie.call(this._shortWeekdaysParse, _)), c !== -1)
        ? c
        : ((c = ie.call(this._minWeekdaysParse, _)), c !== -1 ? c : null))
    : i === "ddd"
    ? ((c = ie.call(this._shortWeekdaysParse, _)),
      c !== -1 || ((c = ie.call(this._weekdaysParse, _)), c !== -1)
        ? c
        : ((c = ie.call(this._minWeekdaysParse, _)), c !== -1 ? c : null))
    : ((c = ie.call(this._minWeekdaysParse, _)),
      c !== -1 || ((c = ie.call(this._weekdaysParse, _)), c !== -1)
        ? c
        : ((c = ie.call(this._shortWeekdaysParse, _)), c !== -1 ? c : null));
}
function Uh(r, i, s) {
  var d, c, p;
  if (this._weekdaysParseExact) return Vh.call(this, r, i, s);
  for (
    this._weekdaysParse ||
      ((this._weekdaysParse = []),
      (this._minWeekdaysParse = []),
      (this._shortWeekdaysParse = []),
      (this._fullWeekdaysParse = [])),
      d = 0;
    d < 7;
    d++
  ) {
    if (
      ((c = Ke([2e3, 1]).day(d)),
      s &&
        !this._fullWeekdaysParse[d] &&
        ((this._fullWeekdaysParse[d] = new RegExp(
          "^" + this.weekdays(c, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._shortWeekdaysParse[d] = new RegExp(
          "^" + this.weekdaysShort(c, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._minWeekdaysParse[d] = new RegExp(
          "^" + this.weekdaysMin(c, "").replace(".", "\\.?") + "$",
          "i"
        ))),
      this._weekdaysParse[d] ||
        ((p =
          "^" +
          this.weekdays(c, "") +
          "|^" +
          this.weekdaysShort(c, "") +
          "|^" +
          this.weekdaysMin(c, "")),
        (this._weekdaysParse[d] = new RegExp(p.replace(".", ""), "i"))),
      s && i === "dddd" && this._fullWeekdaysParse[d].test(r))
    )
      return d;
    if (s && i === "ddd" && this._shortWeekdaysParse[d].test(r)) return d;
    if (s && i === "dd" && this._minWeekdaysParse[d].test(r)) return d;
    if (!s && this._weekdaysParse[d].test(r)) return d;
  }
}
function jh(r) {
  if (!this.isValid()) return r != null ? this : NaN;
  var i = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return r != null ? ((r = Ah(r, this.localeData())), this.add(r - i, "d")) : i;
}
function $h(r) {
  if (!this.isValid()) return r != null ? this : NaN;
  var i = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return r == null ? i : this.add(r - i, "d");
}
function Gh(r) {
  if (!this.isValid()) return r != null ? this : NaN;
  if (r != null) {
    var i = Nh(r, this.localeData());
    return this.day(this.day() % 7 ? i : i - 7);
  } else return this.day() || 7;
}
function qh(r) {
  return this._weekdaysParseExact
    ? (q(this, "_weekdaysRegex") || fi.call(this),
      r ? this._weekdaysStrictRegex : this._weekdaysRegex)
    : (q(this, "_weekdaysRegex") || (this._weekdaysRegex = Wh),
      this._weekdaysStrictRegex && r
        ? this._weekdaysStrictRegex
        : this._weekdaysRegex);
}
function Xh(r) {
  return this._weekdaysParseExact
    ? (q(this, "_weekdaysRegex") || fi.call(this),
      r ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    : (q(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Eh),
      this._weekdaysShortStrictRegex && r
        ? this._weekdaysShortStrictRegex
        : this._weekdaysShortRegex);
}
function Zh(r) {
  return this._weekdaysParseExact
    ? (q(this, "_weekdaysRegex") || fi.call(this),
      r ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    : (q(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Yh),
      this._weekdaysMinStrictRegex && r
        ? this._weekdaysMinStrictRegex
        : this._weekdaysMinRegex);
}
function fi() {
  function r(L, Y) {
    return Y.length - L.length;
  }
  var i = [],
    s = [],
    d = [],
    c = [],
    p,
    _,
    S,
    T,
    P;
  for (p = 0; p < 7; p++)
    (_ = Ke([2e3, 1]).day(p)),
      (S = Oe(this.weekdaysMin(_, ""))),
      (T = Oe(this.weekdaysShort(_, ""))),
      (P = Oe(this.weekdays(_, ""))),
      i.push(S),
      s.push(T),
      d.push(P),
      c.push(S),
      c.push(T),
      c.push(P);
  i.sort(r),
    s.sort(r),
    d.sort(r),
    c.sort(r),
    (this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")", "i")),
    (this._weekdaysShortRegex = this._weekdaysRegex),
    (this._weekdaysMinRegex = this._weekdaysRegex),
    (this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")),
    (this._weekdaysShortStrictRegex = new RegExp(
      "^(" + s.join("|") + ")",
      "i"
    )),
    (this._weekdaysMinStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"));
}
function ci() {
  return this.hours() % 12 || 12;
}
function Kh() {
  return this.hours() || 24;
}
R("H", ["HH", 2], 0, "hour");
R("h", ["hh", 2], 0, ci);
R("k", ["kk", 2], 0, Kh);
R("hmm", 0, 0, function () {
  return "" + ci.apply(this) + Xe(this.minutes(), 2);
});
R("hmmss", 0, 0, function () {
  return "" + ci.apply(this) + Xe(this.minutes(), 2) + Xe(this.seconds(), 2);
});
R("Hmm", 0, 0, function () {
  return "" + this.hours() + Xe(this.minutes(), 2);
});
R("Hmmss", 0, 0, function () {
  return "" + this.hours() + Xe(this.minutes(), 2) + Xe(this.seconds(), 2);
});
function Os(r, i) {
  R(r, 0, 0, function () {
    return this.localeData().meridiem(this.hours(), this.minutes(), i);
  });
}
Os("a", !0);
Os("A", !1);
me("hour", "h");
pe("hour", 13);
function Ps(r, i) {
  return i._meridiemParse;
}
I("a", Ps);
I("A", Ps);
I("H", re);
I("h", re);
I("k", re);
I("HH", re, Pe);
I("hh", re, Pe);
I("kk", re, Pe);
I("hmm", ys);
I("hmmss", _s);
I("Hmm", ys);
I("Hmmss", _s);
Q(["H", "HH"], le);
Q(["k", "kk"], function (r, i, s) {
  var d = H(r);
  i[le] = d === 24 ? 0 : d;
});
Q(["a", "A"], function (r, i, s) {
  (s._isPm = s._locale.isPM(r)), (s._meridiem = r);
});
Q(["h", "hh"], function (r, i, s) {
  (i[le] = H(r)), (z(s).bigHour = !0);
});
Q("hmm", function (r, i, s) {
  var d = r.length - 2;
  (i[le] = H(r.substr(0, d))), (i[Ye] = H(r.substr(d))), (z(s).bigHour = !0);
});
Q("hmmss", function (r, i, s) {
  var d = r.length - 4,
    c = r.length - 2;
  (i[le] = H(r.substr(0, d))),
    (i[Ye] = H(r.substr(d, 2))),
    (i[ut] = H(r.substr(c))),
    (z(s).bigHour = !0);
});
Q("Hmm", function (r, i, s) {
  var d = r.length - 2;
  (i[le] = H(r.substr(0, d))), (i[Ye] = H(r.substr(d)));
});
Q("Hmmss", function (r, i, s) {
  var d = r.length - 4,
    c = r.length - 2;
  (i[le] = H(r.substr(0, d))),
    (i[Ye] = H(r.substr(d, 2))),
    (i[ut] = H(r.substr(c)));
});
function Qh(r) {
  return (r + "").toLowerCase().charAt(0) === "p";
}
var Jh = /[ap]\.?m?\.?/i,
  ev = mr("Hours", !0);
function tv(r, i, s) {
  return r > 11 ? (s ? "pm" : "PM") : s ? "am" : "AM";
}
var Fs = {
    calendar: Uc,
    longDateFormat: qc,
    invalidDate: Zc,
    ordinal: Qc,
    dayOfMonthOrdinalParse: Jc,
    relativeTime: th,
    months: gh,
    monthsShort: xs,
    week: Ch,
    weekdays: Rh,
    weekdaysMin: Lh,
    weekdaysShort: Cs,
    meridiemParse: Jh,
  },
  ae = {},
  Rr = {},
  Hr;
function rv(r, i) {
  var s,
    d = Math.min(r.length, i.length);
  for (s = 0; s < d; s += 1) if (r[s] !== i[s]) return s;
  return d;
}
function Uo(r) {
  return r && r.toLowerCase().replace("_", "-");
}
function av(r) {
  for (var i = 0, s, d, c, p; i < r.length; ) {
    for (
      p = Uo(r[i]).split("-"),
        s = p.length,
        d = Uo(r[i + 1]),
        d = d ? d.split("-") : null;
      s > 0;

    ) {
      if (((c = Za(p.slice(0, s).join("-"))), c)) return c;
      if (d && d.length >= s && rv(p, d) >= s - 1) break;
      s--;
    }
    i++;
  }
  return Hr;
}
function nv(r) {
  return r.match("^[^/\\\\]*$") != null;
}
function Za(r) {
  var i = null,
    s;
  if (
    ae[r] === void 0 &&
    typeof module < "u" &&
    module &&
    module.exports &&
    nv(r)
  )
    try {
      (i = Hr._abbr), (s = require), s("./locale/" + r), kt(i);
    } catch {
      ae[r] = null;
    }
  return ae[r];
}
function kt(r, i) {
  var s;
  return (
    r &&
      (De(i) ? (s = ht(r)) : (s = hi(r, i)),
      s
        ? (Hr = s)
        : typeof console < "u" &&
          console.warn &&
          console.warn(
            "Locale " + r + " not found. Did you forget to load it?"
          )),
    Hr._abbr
  );
}
function hi(r, i) {
  if (i !== null) {
    var s,
      d = Fs;
    if (((i.abbr = r), ae[r] != null))
      hs(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (d = ae[r]._config);
    else if (i.parentLocale != null)
      if (ae[i.parentLocale] != null) d = ae[i.parentLocale]._config;
      else if (((s = Za(i.parentLocale)), s != null)) d = s._config;
      else
        return (
          Rr[i.parentLocale] || (Rr[i.parentLocale] = []),
          Rr[i.parentLocale].push({ name: r, config: i }),
          null
        );
    return (
      (ae[r] = new ii($n(d, i))),
      Rr[r] &&
        Rr[r].forEach(function (c) {
          hi(c.name, c.config);
        }),
      kt(r),
      ae[r]
    );
  } else return delete ae[r], null;
}
function iv(r, i) {
  if (i != null) {
    var s,
      d,
      c = Fs;
    ae[r] != null && ae[r].parentLocale != null
      ? ae[r].set($n(ae[r]._config, i))
      : ((d = Za(r)),
        d != null && (c = d._config),
        (i = $n(c, i)),
        d == null && (i.abbr = r),
        (s = new ii(i)),
        (s.parentLocale = ae[r]),
        (ae[r] = s)),
      kt(r);
  } else
    ae[r] != null &&
      (ae[r].parentLocale != null
        ? ((ae[r] = ae[r].parentLocale), r === kt() && kt(r))
        : ae[r] != null && delete ae[r]);
  return ae[r];
}
function ht(r) {
  var i;
  if ((r && r._locale && r._locale._abbr && (r = r._locale._abbr), !r))
    return Hr;
  if (!ze(r)) {
    if (((i = Za(r)), i)) return i;
    r = [r];
  }
  return av(r);
}
function ov() {
  return Gn(ae);
}
function vi(r) {
  var i,
    s = r._a;
  return (
    s &&
      z(r).overflow === -2 &&
      ((i =
        s[lt] < 0 || s[lt] > 11
          ? lt
          : s[qe] < 1 || s[qe] > Xa(s[ve], s[lt])
          ? qe
          : s[le] < 0 ||
            s[le] > 24 ||
            (s[le] === 24 && (s[Ye] !== 0 || s[ut] !== 0 || s[Ut] !== 0))
          ? le
          : s[Ye] < 0 || s[Ye] > 59
          ? Ye
          : s[ut] < 0 || s[ut] > 59
          ? ut
          : s[Ut] < 0 || s[Ut] > 999
          ? Ut
          : -1),
      z(r)._overflowDayOfYear && (i < ve || i > qe) && (i = qe),
      z(r)._overflowWeeks && i === -1 && (i = ch),
      z(r)._overflowWeekday && i === -1 && (i = hh),
      (z(r).overflow = i)),
    r
  );
}
var sv =
    /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  lv =
    /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  uv = /Z|[+-]\d\d(?::?\d\d)?/,
  ba = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, !1],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
    ["YYYYDDD", /\d{7}/],
    ["YYYYMM", /\d{6}/, !1],
    ["YYYY", /\d{4}/, !1],
  ],
  Vn = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/],
  ],
  dv = /^\/?Date\((-?\d+)/i,
  fv =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
  cv = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
  };
function Is(r) {
  var i,
    s,
    d = r._i,
    c = sv.exec(d) || lv.exec(d),
    p,
    _,
    S,
    T,
    P = ba.length,
    L = Vn.length;
  if (c) {
    for (z(r).iso = !0, i = 0, s = P; i < s; i++)
      if (ba[i][1].exec(c[1])) {
        (_ = ba[i][0]), (p = ba[i][2] !== !1);
        break;
      }
    if (_ == null) {
      r._isValid = !1;
      return;
    }
    if (c[3]) {
      for (i = 0, s = L; i < s; i++)
        if (Vn[i][1].exec(c[3])) {
          S = (c[2] || " ") + Vn[i][0];
          break;
        }
      if (S == null) {
        r._isValid = !1;
        return;
      }
    }
    if (!p && S != null) {
      r._isValid = !1;
      return;
    }
    if (c[4])
      if (uv.exec(c[4])) T = "Z";
      else {
        r._isValid = !1;
        return;
      }
    (r._f = _ + (S || "") + (T || "")), mi(r);
  } else r._isValid = !1;
}
function hv(r, i, s, d, c, p) {
  var _ = [
    vv(r),
    xs.indexOf(i),
    parseInt(s, 10),
    parseInt(d, 10),
    parseInt(c, 10),
  ];
  return p && _.push(parseInt(p, 10)), _;
}
function vv(r) {
  var i = parseInt(r, 10);
  return i <= 49 ? 2e3 + i : i <= 999 ? 1900 + i : i;
}
function gv(r) {
  return r
    .replace(/\([^()]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .replace(/^\s\s*/, "")
    .replace(/\s\s*$/, "");
}
function mv(r, i, s) {
  if (r) {
    var d = Cs.indexOf(r),
      c = new Date(i[0], i[1], i[2]).getDay();
    if (d !== c) return (z(s).weekdayMismatch = !0), (s._isValid = !1), !1;
  }
  return !0;
}
function pv(r, i, s) {
  if (r) return cv[r];
  if (i) return 0;
  var d = parseInt(s, 10),
    c = d % 100,
    p = (d - c) / 100;
  return p * 60 + c;
}
function As(r) {
  var i = fv.exec(gv(r._i)),
    s;
  if (i) {
    if (((s = hv(i[4], i[3], i[2], i[5], i[6], i[7])), !mv(i[1], s, r))) return;
    (r._a = s),
      (r._tzm = pv(i[8], i[9], i[10])),
      (r._d = zr.apply(null, r._a)),
      r._d.setUTCMinutes(r._d.getUTCMinutes() - r._tzm),
      (z(r).rfc2822 = !0);
  } else r._isValid = !1;
}
function bv(r) {
  var i = dv.exec(r._i);
  if (i !== null) {
    r._d = new Date(+i[1]);
    return;
  }
  if ((Is(r), r._isValid === !1)) delete r._isValid;
  else return;
  if ((As(r), r._isValid === !1)) delete r._isValid;
  else return;
  r._strict ? (r._isValid = !1) : O.createFromInputFallback(r);
}
O.createFromInputFallback = We(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function (r) {
    r._d = new Date(r._i + (r._useUTC ? " UTC" : ""));
  }
);
function lr(r, i, s) {
  return r != null ? r : i != null ? i : s;
}
function yv(r) {
  var i = new Date(O.now());
  return r._useUTC
    ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()]
    : [i.getFullYear(), i.getMonth(), i.getDate()];
}
function gi(r) {
  var i,
    s,
    d = [],
    c,
    p,
    _;
  if (!r._d) {
    for (
      c = yv(r),
        r._w && r._a[qe] == null && r._a[lt] == null && _v(r),
        r._dayOfYear != null &&
          ((_ = lr(r._a[ve], c[ve])),
          (r._dayOfYear > Yr(_) || r._dayOfYear === 0) &&
            (z(r)._overflowDayOfYear = !0),
          (s = zr(_, 0, r._dayOfYear)),
          (r._a[lt] = s.getUTCMonth()),
          (r._a[qe] = s.getUTCDate())),
        i = 0;
      i < 3 && r._a[i] == null;
      ++i
    )
      r._a[i] = d[i] = c[i];
    for (; i < 7; i++)
      r._a[i] = d[i] = r._a[i] == null ? (i === 2 ? 1 : 0) : r._a[i];
    r._a[le] === 24 &&
      r._a[Ye] === 0 &&
      r._a[ut] === 0 &&
      r._a[Ut] === 0 &&
      ((r._nextDay = !0), (r._a[le] = 0)),
      (r._d = (r._useUTC ? zr : Dh).apply(null, d)),
      (p = r._useUTC ? r._d.getUTCDay() : r._d.getDay()),
      r._tzm != null && r._d.setUTCMinutes(r._d.getUTCMinutes() - r._tzm),
      r._nextDay && (r._a[le] = 24),
      r._w &&
        typeof r._w.d < "u" &&
        r._w.d !== p &&
        (z(r).weekdayMismatch = !0);
  }
}
function _v(r) {
  var i, s, d, c, p, _, S, T, P;
  (i = r._w),
    i.GG != null || i.W != null || i.E != null
      ? ((p = 1),
        (_ = 4),
        (s = lr(i.GG, r._a[ve], Br(te(), 1, 4).year)),
        (d = lr(i.W, 1)),
        (c = lr(i.E, 1)),
        (c < 1 || c > 7) && (T = !0))
      : ((p = r._locale._week.dow),
        (_ = r._locale._week.doy),
        (P = Br(te(), p, _)),
        (s = lr(i.gg, r._a[ve], P.year)),
        (d = lr(i.w, P.week)),
        i.d != null
          ? ((c = i.d), (c < 0 || c > 6) && (T = !0))
          : i.e != null
          ? ((c = i.e + p), (i.e < 0 || i.e > 6) && (T = !0))
          : (c = p)),
    d < 1 || d > dt(s, p, _)
      ? (z(r)._overflowWeeks = !0)
      : T != null
      ? (z(r)._overflowWeekday = !0)
      : ((S = Ts(s, d, c, p, _)),
        (r._a[ve] = S.year),
        (r._dayOfYear = S.dayOfYear));
}
O.ISO_8601 = function () {};
O.RFC_2822 = function () {};
function mi(r) {
  if (r._f === O.ISO_8601) {
    Is(r);
    return;
  }
  if (r._f === O.RFC_2822) {
    As(r);
    return;
  }
  (r._a = []), (z(r).empty = !0);
  var i = "" + r._i,
    s,
    d,
    c,
    p,
    _,
    S = i.length,
    T = 0,
    P,
    L;
  for (c = vs(r._f, r._locale).match(oi) || [], L = c.length, s = 0; s < L; s++)
    (p = c[s]),
      (d = (i.match(uh(p, r)) || [])[0]),
      d &&
        ((_ = i.substr(0, i.indexOf(d))),
        _.length > 0 && z(r).unusedInput.push(_),
        (i = i.slice(i.indexOf(d) + d.length)),
        (T += d.length)),
      hr[p]
        ? (d ? (z(r).empty = !1) : z(r).unusedTokens.push(p), fh(p, d, r))
        : r._strict && !d && z(r).unusedTokens.push(p);
  (z(r).charsLeftOver = S - T),
    i.length > 0 && z(r).unusedInput.push(i),
    r._a[le] <= 12 &&
      z(r).bigHour === !0 &&
      r._a[le] > 0 &&
      (z(r).bigHour = void 0),
    (z(r).parsedDateParts = r._a.slice(0)),
    (z(r).meridiem = r._meridiem),
    (r._a[le] = xv(r._locale, r._a[le], r._meridiem)),
    (P = z(r).era),
    P !== null && (r._a[ve] = r._locale.erasConvertYear(P, r._a[ve])),
    gi(r),
    vi(r);
}
function xv(r, i, s) {
  var d;
  return s == null
    ? i
    : r.meridiemHour != null
    ? r.meridiemHour(i, s)
    : (r.isPM != null &&
        ((d = r.isPM(s)), d && i < 12 && (i += 12), !d && i === 12 && (i = 0)),
      i);
}
function wv(r) {
  var i,
    s,
    d,
    c,
    p,
    _,
    S = !1,
    T = r._f.length;
  if (T === 0) {
    (z(r).invalidFormat = !0), (r._d = new Date(NaN));
    return;
  }
  for (c = 0; c < T; c++)
    (p = 0),
      (_ = !1),
      (i = ni({}, r)),
      r._useUTC != null && (i._useUTC = r._useUTC),
      (i._f = r._f[c]),
      mi(i),
      ai(i) && (_ = !0),
      (p += z(i).charsLeftOver),
      (p += z(i).unusedTokens.length * 10),
      (z(i).score = p),
      S
        ? p < d && ((d = p), (s = i))
        : (d == null || p < d || _) && ((d = p), (s = i), _ && (S = !0));
  wt(r, s || i);
}
function Mv(r) {
  if (!r._d) {
    var i = si(r._i),
      s = i.day === void 0 ? i.date : i.day;
    (r._a = fs(
      [i.year, i.month, s, i.hour, i.minute, i.second, i.millisecond],
      function (d) {
        return d && parseInt(d, 10);
      }
    )),
      gi(r);
  }
}
function kv(r) {
  var i = new jr(vi(Ns(r)));
  return i._nextDay && (i.add(1, "d"), (i._nextDay = void 0)), i;
}
function Ns(r) {
  var i = r._i,
    s = r._f;
  return (
    (r._locale = r._locale || ht(r._l)),
    i === null || (s === void 0 && i === "")
      ? Ha({ nullInput: !0 })
      : (typeof i == "string" && (r._i = i = r._locale.preparse(i)),
        Be(i)
          ? new jr(vi(i))
          : (Ur(i) ? (r._d = i) : ze(s) ? wv(r) : s ? mi(r) : Sv(r),
            ai(r) || (r._d = null),
            r))
  );
}
function Sv(r) {
  var i = r._i;
  De(i)
    ? (r._d = new Date(O.now()))
    : Ur(i)
    ? (r._d = new Date(i.valueOf()))
    : typeof i == "string"
    ? bv(r)
    : ze(i)
    ? ((r._a = fs(i.slice(0), function (s) {
        return parseInt(s, 10);
      })),
      gi(r))
    : jt(i)
    ? Mv(r)
    : ft(i)
    ? (r._d = new Date(i))
    : O.createFromInputFallback(r);
}
function Rs(r, i, s, d, c) {
  var p = {};
  return (
    (i === !0 || i === !1) && ((d = i), (i = void 0)),
    (s === !0 || s === !1) && ((d = s), (s = void 0)),
    ((jt(r) && ri(r)) || (ze(r) && r.length === 0)) && (r = void 0),
    (p._isAMomentObject = !0),
    (p._useUTC = p._isUTC = c),
    (p._l = s),
    (p._i = r),
    (p._f = i),
    (p._strict = d),
    kv(p)
  );
}
function te(r, i, s, d) {
  return Rs(r, i, s, d, !1);
}
var Dv = We(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var r = te.apply(null, arguments);
      return this.isValid() && r.isValid() ? (r < this ? this : r) : Ha();
    }
  ),
  Tv = We(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var r = te.apply(null, arguments);
      return this.isValid() && r.isValid() ? (r > this ? this : r) : Ha();
    }
  );
function Ls(r, i) {
  var s, d;
  if ((i.length === 1 && ze(i[0]) && (i = i[0]), !i.length)) return te();
  for (s = i[0], d = 1; d < i.length; ++d)
    (!i[d].isValid() || i[d][r](s)) && (s = i[d]);
  return s;
}
function Cv() {
  var r = [].slice.call(arguments, 0);
  return Ls("isBefore", r);
}
function Ov() {
  var r = [].slice.call(arguments, 0);
  return Ls("isAfter", r);
}
var Pv = function () {
    return Date.now ? Date.now() : +new Date();
  },
  Lr = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
function Fv(r) {
  var i,
    s = !1,
    d,
    c = Lr.length;
  for (i in r)
    if (q(r, i) && !(ie.call(Lr, i) !== -1 && (r[i] == null || !isNaN(r[i]))))
      return !1;
  for (d = 0; d < c; ++d)
    if (r[Lr[d]]) {
      if (s) return !1;
      parseFloat(r[Lr[d]]) !== H(r[Lr[d]]) && (s = !0);
    }
  return !0;
}
function Iv() {
  return this._isValid;
}
function Av() {
  return He(NaN);
}
function Ka(r) {
  var i = si(r),
    s = i.year || 0,
    d = i.quarter || 0,
    c = i.month || 0,
    p = i.week || i.isoWeek || 0,
    _ = i.day || 0,
    S = i.hour || 0,
    T = i.minute || 0,
    P = i.second || 0,
    L = i.millisecond || 0;
  (this._isValid = Fv(i)),
    (this._milliseconds = +L + P * 1e3 + T * 6e4 + S * 1e3 * 60 * 60),
    (this._days = +_ + p * 7),
    (this._months = +c + d * 3 + s * 12),
    (this._data = {}),
    (this._locale = ht()),
    this._bubble();
}
function Ta(r) {
  return r instanceof Ka;
}
function Xn(r) {
  return r < 0 ? Math.round(-1 * r) * -1 : Math.round(r);
}
function Nv(r, i, s) {
  var d = Math.min(r.length, i.length),
    c = Math.abs(r.length - i.length),
    p = 0,
    _;
  for (_ = 0; _ < d; _++)
    ((s && r[_] !== i[_]) || (!s && H(r[_]) !== H(i[_]))) && p++;
  return p + c;
}
function Ws(r, i) {
  R(r, 0, 0, function () {
    var s = this.utcOffset(),
      d = "+";
    return (
      s < 0 && ((s = -s), (d = "-")),
      d + Xe(~~(s / 60), 2) + i + Xe(~~s % 60, 2)
    );
  });
}
Ws("Z", ":");
Ws("ZZ", "");
I("Z", qa);
I("ZZ", qa);
Q(["Z", "ZZ"], function (r, i, s) {
  (s._useUTC = !0), (s._tzm = pi(qa, r));
});
var Rv = /([\+\-]|\d\d)/gi;
function pi(r, i) {
  var s = (i || "").match(r),
    d,
    c,
    p;
  return s === null
    ? null
    : ((d = s[s.length - 1] || []),
      (c = (d + "").match(Rv) || ["-", 0, 0]),
      (p = +(c[1] * 60) + H(c[2])),
      p === 0 ? 0 : c[0] === "+" ? p : -p);
}
function bi(r, i) {
  var s, d;
  return i._isUTC
    ? ((s = i.clone()),
      (d = (Be(r) || Ur(r) ? r.valueOf() : te(r).valueOf()) - s.valueOf()),
      s._d.setTime(s._d.valueOf() + d),
      O.updateOffset(s, !1),
      s)
    : te(r).local();
}
function Zn(r) {
  return -Math.round(r._d.getTimezoneOffset());
}
O.updateOffset = function () {};
function Lv(r, i, s) {
  var d = this._offset || 0,
    c;
  if (!this.isValid()) return r != null ? this : NaN;
  if (r != null) {
    if (typeof r == "string") {
      if (((r = pi(qa, r)), r === null)) return this;
    } else Math.abs(r) < 16 && !s && (r = r * 60);
    return (
      !this._isUTC && i && (c = Zn(this)),
      (this._offset = r),
      (this._isUTC = !0),
      c != null && this.add(c, "m"),
      d !== r &&
        (!i || this._changeInProgress
          ? zs(this, He(r - d, "m"), 1, !1)
          : this._changeInProgress ||
            ((this._changeInProgress = !0),
            O.updateOffset(this, !0),
            (this._changeInProgress = null))),
      this
    );
  } else return this._isUTC ? d : Zn(this);
}
function Wv(r, i) {
  return r != null
    ? (typeof r != "string" && (r = -r), this.utcOffset(r, i), this)
    : -this.utcOffset();
}
function Ev(r) {
  return this.utcOffset(0, r);
}
function Yv(r) {
  return (
    this._isUTC &&
      (this.utcOffset(0, r),
      (this._isUTC = !1),
      r && this.subtract(Zn(this), "m")),
    this
  );
}
function zv() {
  if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var r = pi(sh, this._i);
    r != null ? this.utcOffset(r) : this.utcOffset(0, !0);
  }
  return this;
}
function Bv(r) {
  return this.isValid()
    ? ((r = r ? te(r).utcOffset() : 0), (this.utcOffset() - r) % 60 === 0)
    : !1;
}
function Hv() {
  return (
    this.utcOffset() > this.clone().month(0).utcOffset() ||
    this.utcOffset() > this.clone().month(5).utcOffset()
  );
}
function Vv() {
  if (!De(this._isDSTShifted)) return this._isDSTShifted;
  var r = {},
    i;
  return (
    ni(r, this),
    (r = Ns(r)),
    r._a
      ? ((i = r._isUTC ? Ke(r._a) : te(r._a)),
        (this._isDSTShifted = this.isValid() && Nv(r._a, i.toArray()) > 0))
      : (this._isDSTShifted = !1),
    this._isDSTShifted
  );
}
function Uv() {
  return this.isValid() ? !this._isUTC : !1;
}
function jv() {
  return this.isValid() ? this._isUTC : !1;
}
function Es() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var $v = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
  Gv =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function He(r, i) {
  var s = r,
    d = null,
    c,
    p,
    _;
  return (
    Ta(r)
      ? (s = { ms: r._milliseconds, d: r._days, M: r._months })
      : ft(r) || !isNaN(+r)
      ? ((s = {}), i ? (s[i] = +r) : (s.milliseconds = +r))
      : (d = $v.exec(r))
      ? ((c = d[1] === "-" ? -1 : 1),
        (s = {
          y: 0,
          d: H(d[qe]) * c,
          h: H(d[le]) * c,
          m: H(d[Ye]) * c,
          s: H(d[ut]) * c,
          ms: H(Xn(d[Ut] * 1e3)) * c,
        }))
      : (d = Gv.exec(r))
      ? ((c = d[1] === "-" ? -1 : 1),
        (s = {
          y: Ht(d[2], c),
          M: Ht(d[3], c),
          w: Ht(d[4], c),
          d: Ht(d[5], c),
          h: Ht(d[6], c),
          m: Ht(d[7], c),
          s: Ht(d[8], c),
        }))
      : s == null
      ? (s = {})
      : typeof s == "object" &&
        ("from" in s || "to" in s) &&
        ((_ = qv(te(s.from), te(s.to))),
        (s = {}),
        (s.ms = _.milliseconds),
        (s.M = _.months)),
    (p = new Ka(s)),
    Ta(r) && q(r, "_locale") && (p._locale = r._locale),
    Ta(r) && q(r, "_isValid") && (p._isValid = r._isValid),
    p
  );
}
He.fn = Ka.prototype;
He.invalid = Av;
function Ht(r, i) {
  var s = r && parseFloat(r.replace(",", "."));
  return (isNaN(s) ? 0 : s) * i;
}
function jo(r, i) {
  var s = {};
  return (
    (s.months = i.month() - r.month() + (i.year() - r.year()) * 12),
    r.clone().add(s.months, "M").isAfter(i) && --s.months,
    (s.milliseconds = +i - +r.clone().add(s.months, "M")),
    s
  );
}
function qv(r, i) {
  var s;
  return r.isValid() && i.isValid()
    ? ((i = bi(i, r)),
      r.isBefore(i)
        ? (s = jo(r, i))
        : ((s = jo(i, r)),
          (s.milliseconds = -s.milliseconds),
          (s.months = -s.months)),
      s)
    : { milliseconds: 0, months: 0 };
}
function Ys(r, i) {
  return function (s, d) {
    var c, p;
    return (
      d !== null &&
        !isNaN(+d) &&
        (hs(
          i,
          "moment()." +
            i +
            "(period, number) is deprecated. Please use moment()." +
            i +
            "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
        ),
        (p = s),
        (s = d),
        (d = p)),
      (c = He(s, d)),
      zs(this, c, r),
      this
    );
  };
}
function zs(r, i, s, d) {
  var c = i._milliseconds,
    p = Xn(i._days),
    _ = Xn(i._months);
  !r.isValid() ||
    ((d = d == null ? !0 : d),
    _ && Ms(r, Aa(r, "Month") + _ * s),
    p && ms(r, "Date", Aa(r, "Date") + p * s),
    c && r._d.setTime(r._d.valueOf() + c * s),
    d && O.updateOffset(r, p || _));
}
var Xv = Ys(1, "add"),
  Zv = Ys(-1, "subtract");
function Bs(r) {
  return typeof r == "string" || r instanceof String;
}
function Kv(r) {
  return (
    Be(r) ||
    Ur(r) ||
    Bs(r) ||
    ft(r) ||
    Jv(r) ||
    Qv(r) ||
    r === null ||
    r === void 0
  );
}
function Qv(r) {
  var i = jt(r) && !ri(r),
    s = !1,
    d = [
      "years",
      "year",
      "y",
      "months",
      "month",
      "M",
      "days",
      "day",
      "d",
      "dates",
      "date",
      "D",
      "hours",
      "hour",
      "h",
      "minutes",
      "minute",
      "m",
      "seconds",
      "second",
      "s",
      "milliseconds",
      "millisecond",
      "ms",
    ],
    c,
    p,
    _ = d.length;
  for (c = 0; c < _; c += 1) (p = d[c]), (s = s || q(r, p));
  return i && s;
}
function Jv(r) {
  var i = ze(r),
    s = !1;
  return (
    i &&
      (s =
        r.filter(function (d) {
          return !ft(d) && Bs(r);
        }).length === 0),
    i && s
  );
}
function eg(r) {
  var i = jt(r) && !ri(r),
    s = !1,
    d = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
    c,
    p;
  for (c = 0; c < d.length; c += 1) (p = d[c]), (s = s || q(r, p));
  return i && s;
}
function tg(r, i) {
  var s = r.diff(i, "days", !0);
  return s < -6
    ? "sameElse"
    : s < -1
    ? "lastWeek"
    : s < 0
    ? "lastDay"
    : s < 1
    ? "sameDay"
    : s < 2
    ? "nextDay"
    : s < 7
    ? "nextWeek"
    : "sameElse";
}
function rg(r, i) {
  arguments.length === 1 &&
    (arguments[0]
      ? Kv(arguments[0])
        ? ((r = arguments[0]), (i = void 0))
        : eg(arguments[0]) && ((i = arguments[0]), (r = void 0))
      : ((r = void 0), (i = void 0)));
  var s = r || te(),
    d = bi(s, this).startOf("day"),
    c = O.calendarFormat(this, d) || "sameElse",
    p = i && (Qe(i[c]) ? i[c].call(this, s) : i[c]);
  return this.format(p || this.localeData().calendar(c, this, te(s)));
}
function ag() {
  return new jr(this);
}
function ng(r, i) {
  var s = Be(r) ? r : te(r);
  return this.isValid() && s.isValid()
    ? ((i = Ee(i) || "millisecond"),
      i === "millisecond"
        ? this.valueOf() > s.valueOf()
        : s.valueOf() < this.clone().startOf(i).valueOf())
    : !1;
}
function ig(r, i) {
  var s = Be(r) ? r : te(r);
  return this.isValid() && s.isValid()
    ? ((i = Ee(i) || "millisecond"),
      i === "millisecond"
        ? this.valueOf() < s.valueOf()
        : this.clone().endOf(i).valueOf() < s.valueOf())
    : !1;
}
function og(r, i, s, d) {
  var c = Be(r) ? r : te(r),
    p = Be(i) ? i : te(i);
  return this.isValid() && c.isValid() && p.isValid()
    ? ((d = d || "()"),
      (d[0] === "(" ? this.isAfter(c, s) : !this.isBefore(c, s)) &&
        (d[1] === ")" ? this.isBefore(p, s) : !this.isAfter(p, s)))
    : !1;
}
function sg(r, i) {
  var s = Be(r) ? r : te(r),
    d;
  return this.isValid() && s.isValid()
    ? ((i = Ee(i) || "millisecond"),
      i === "millisecond"
        ? this.valueOf() === s.valueOf()
        : ((d = s.valueOf()),
          this.clone().startOf(i).valueOf() <= d &&
            d <= this.clone().endOf(i).valueOf()))
    : !1;
}
function lg(r, i) {
  return this.isSame(r, i) || this.isAfter(r, i);
}
function ug(r, i) {
  return this.isSame(r, i) || this.isBefore(r, i);
}
function dg(r, i, s) {
  var d, c, p;
  if (!this.isValid()) return NaN;
  if (((d = bi(r, this)), !d.isValid())) return NaN;
  switch (((c = (d.utcOffset() - this.utcOffset()) * 6e4), (i = Ee(i)), i)) {
    case "year":
      p = Ca(this, d) / 12;
      break;
    case "month":
      p = Ca(this, d);
      break;
    case "quarter":
      p = Ca(this, d) / 3;
      break;
    case "second":
      p = (this - d) / 1e3;
      break;
    case "minute":
      p = (this - d) / 6e4;
      break;
    case "hour":
      p = (this - d) / 36e5;
      break;
    case "day":
      p = (this - d - c) / 864e5;
      break;
    case "week":
      p = (this - d - c) / 6048e5;
      break;
    default:
      p = this - d;
  }
  return s ? p : Re(p);
}
function Ca(r, i) {
  if (r.date() < i.date()) return -Ca(i, r);
  var s = (i.year() - r.year()) * 12 + (i.month() - r.month()),
    d = r.clone().add(s, "months"),
    c,
    p;
  return (
    i - d < 0
      ? ((c = r.clone().add(s - 1, "months")), (p = (i - d) / (d - c)))
      : ((c = r.clone().add(s + 1, "months")), (p = (i - d) / (c - d))),
    -(s + p) || 0
  );
}
O.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
O.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function fg() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function cg(r) {
  if (!this.isValid()) return null;
  var i = r !== !0,
    s = i ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999
    ? Da(
        s,
        i ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
      )
    : Qe(Date.prototype.toISOString)
    ? i
      ? this.toDate().toISOString()
      : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
          .toISOString()
          .replace("Z", Da(s, "Z"))
    : Da(s, i ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function hg() {
  if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
  var r = "moment",
    i = "",
    s,
    d,
    c,
    p;
  return (
    this.isLocal() ||
      ((r = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone"),
      (i = "Z")),
    (s = "[" + r + '("]'),
    (d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
    (c = "-MM-DD[T]HH:mm:ss.SSS"),
    (p = i + '[")]'),
    this.format(s + d + c + p)
  );
}
function vg(r) {
  r || (r = this.isUtc() ? O.defaultFormatUtc : O.defaultFormat);
  var i = Da(this, r);
  return this.localeData().postformat(i);
}
function gg(r, i) {
  return this.isValid() && ((Be(r) && r.isValid()) || te(r).isValid())
    ? He({ to: this, from: r }).locale(this.locale()).humanize(!i)
    : this.localeData().invalidDate();
}
function mg(r) {
  return this.from(te(), r);
}
function pg(r, i) {
  return this.isValid() && ((Be(r) && r.isValid()) || te(r).isValid())
    ? He({ from: this, to: r }).locale(this.locale()).humanize(!i)
    : this.localeData().invalidDate();
}
function bg(r) {
  return this.to(te(), r);
}
function Hs(r) {
  var i;
  return r === void 0
    ? this._locale._abbr
    : ((i = ht(r)), i != null && (this._locale = i), this);
}
var Vs = We(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function (r) {
    return r === void 0 ? this.localeData() : this.locale(r);
  }
);
function Us() {
  return this._locale;
}
var La = 1e3,
  vr = 60 * La,
  Wa = 60 * vr,
  js = (365 * 400 + 97) * 24 * Wa;
function gr(r, i) {
  return ((r % i) + i) % i;
}
function $s(r, i, s) {
  return r < 100 && r >= 0
    ? new Date(r + 400, i, s) - js
    : new Date(r, i, s).valueOf();
}
function Gs(r, i, s) {
  return r < 100 && r >= 0 ? Date.UTC(r + 400, i, s) - js : Date.UTC(r, i, s);
}
function yg(r) {
  var i, s;
  if (((r = Ee(r)), r === void 0 || r === "millisecond" || !this.isValid()))
    return this;
  switch (((s = this._isUTC ? Gs : $s), r)) {
    case "year":
      i = s(this.year(), 0, 1);
      break;
    case "quarter":
      i = s(this.year(), this.month() - (this.month() % 3), 1);
      break;
    case "month":
      i = s(this.year(), this.month(), 1);
      break;
    case "week":
      i = s(this.year(), this.month(), this.date() - this.weekday());
      break;
    case "isoWeek":
      i = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
      break;
    case "day":
    case "date":
      i = s(this.year(), this.month(), this.date());
      break;
    case "hour":
      (i = this._d.valueOf()),
        (i -= gr(i + (this._isUTC ? 0 : this.utcOffset() * vr), Wa));
      break;
    case "minute":
      (i = this._d.valueOf()), (i -= gr(i, vr));
      break;
    case "second":
      (i = this._d.valueOf()), (i -= gr(i, La));
      break;
  }
  return this._d.setTime(i), O.updateOffset(this, !0), this;
}
function _g(r) {
  var i, s;
  if (((r = Ee(r)), r === void 0 || r === "millisecond" || !this.isValid()))
    return this;
  switch (((s = this._isUTC ? Gs : $s), r)) {
    case "year":
      i = s(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      i = s(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
      break;
    case "month":
      i = s(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      i = s(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
      break;
    case "isoWeek":
      i =
        s(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1;
      break;
    case "day":
    case "date":
      i = s(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      (i = this._d.valueOf()),
        (i += Wa - gr(i + (this._isUTC ? 0 : this.utcOffset() * vr), Wa) - 1);
      break;
    case "minute":
      (i = this._d.valueOf()), (i += vr - gr(i, vr) - 1);
      break;
    case "second":
      (i = this._d.valueOf()), (i += La - gr(i, La) - 1);
      break;
  }
  return this._d.setTime(i), O.updateOffset(this, !0), this;
}
function xg() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function wg() {
  return Math.floor(this.valueOf() / 1e3);
}
function Mg() {
  return new Date(this.valueOf());
}
function kg() {
  var r = this;
  return [
    r.year(),
    r.month(),
    r.date(),
    r.hour(),
    r.minute(),
    r.second(),
    r.millisecond(),
  ];
}
function Sg() {
  var r = this;
  return {
    years: r.year(),
    months: r.month(),
    date: r.date(),
    hours: r.hours(),
    minutes: r.minutes(),
    seconds: r.seconds(),
    milliseconds: r.milliseconds(),
  };
}
function Dg() {
  return this.isValid() ? this.toISOString() : null;
}
function Tg() {
  return ai(this);
}
function Cg() {
  return wt({}, z(this));
}
function Og() {
  return z(this).overflow;
}
function Pg() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict,
  };
}
R("N", 0, 0, "eraAbbr");
R("NN", 0, 0, "eraAbbr");
R("NNN", 0, 0, "eraAbbr");
R("NNNN", 0, 0, "eraName");
R("NNNNN", 0, 0, "eraNarrow");
R("y", ["y", 1], "yo", "eraYear");
R("y", ["yy", 2], 0, "eraYear");
R("y", ["yyy", 3], 0, "eraYear");
R("y", ["yyyy", 4], 0, "eraYear");
I("N", yi);
I("NN", yi);
I("NNN", yi);
I("NNNN", Bg);
I("NNNNN", Hg);
Q(["N", "NN", "NNN", "NNNN", "NNNNN"], function (r, i, s, d) {
  var c = s._locale.erasParse(r, d, s._strict);
  c ? (z(s).era = c) : (z(s).invalidEra = r);
});
I("y", pr);
I("yy", pr);
I("yyy", pr);
I("yyyy", pr);
I("yo", Vg);
Q(["y", "yy", "yyy", "yyyy"], ve);
Q(["yo"], function (r, i, s, d) {
  var c;
  s._locale._eraYearOrdinalRegex &&
    (c = r.match(s._locale._eraYearOrdinalRegex)),
    s._locale.eraYearOrdinalParse
      ? (i[ve] = s._locale.eraYearOrdinalParse(r, c))
      : (i[ve] = parseInt(r, 10));
});
function Fg(r, i) {
  var s,
    d,
    c,
    p = this._eras || ht("en")._eras;
  for (s = 0, d = p.length; s < d; ++s) {
    switch (typeof p[s].since) {
      case "string":
        (c = O(p[s].since).startOf("day")), (p[s].since = c.valueOf());
        break;
    }
    switch (typeof p[s].until) {
      case "undefined":
        p[s].until = 1 / 0;
        break;
      case "string":
        (c = O(p[s].until).startOf("day").valueOf()),
          (p[s].until = c.valueOf());
        break;
    }
  }
  return p;
}
function Ig(r, i, s) {
  var d,
    c,
    p = this.eras(),
    _,
    S,
    T;
  for (r = r.toUpperCase(), d = 0, c = p.length; d < c; ++d)
    if (
      ((_ = p[d].name.toUpperCase()),
      (S = p[d].abbr.toUpperCase()),
      (T = p[d].narrow.toUpperCase()),
      s)
    )
      switch (i) {
        case "N":
        case "NN":
        case "NNN":
          if (S === r) return p[d];
          break;
        case "NNNN":
          if (_ === r) return p[d];
          break;
        case "NNNNN":
          if (T === r) return p[d];
          break;
      }
    else if ([_, S, T].indexOf(r) >= 0) return p[d];
}
function Ag(r, i) {
  var s = r.since <= r.until ? 1 : -1;
  return i === void 0
    ? O(r.since).year()
    : O(r.since).year() + (i - r.offset) * s;
}
function Ng() {
  var r,
    i,
    s,
    d = this.localeData().eras();
  for (r = 0, i = d.length; r < i; ++r)
    if (
      ((s = this.clone().startOf("day").valueOf()),
      (d[r].since <= s && s <= d[r].until) ||
        (d[r].until <= s && s <= d[r].since))
    )
      return d[r].name;
  return "";
}
function Rg() {
  var r,
    i,
    s,
    d = this.localeData().eras();
  for (r = 0, i = d.length; r < i; ++r)
    if (
      ((s = this.clone().startOf("day").valueOf()),
      (d[r].since <= s && s <= d[r].until) ||
        (d[r].until <= s && s <= d[r].since))
    )
      return d[r].narrow;
  return "";
}
function Lg() {
  var r,
    i,
    s,
    d = this.localeData().eras();
  for (r = 0, i = d.length; r < i; ++r)
    if (
      ((s = this.clone().startOf("day").valueOf()),
      (d[r].since <= s && s <= d[r].until) ||
        (d[r].until <= s && s <= d[r].since))
    )
      return d[r].abbr;
  return "";
}
function Wg() {
  var r,
    i,
    s,
    d,
    c = this.localeData().eras();
  for (r = 0, i = c.length; r < i; ++r)
    if (
      ((s = c[r].since <= c[r].until ? 1 : -1),
      (d = this.clone().startOf("day").valueOf()),
      (c[r].since <= d && d <= c[r].until) ||
        (c[r].until <= d && d <= c[r].since))
    )
      return (this.year() - O(c[r].since).year()) * s + c[r].offset;
  return this.year();
}
function Eg(r) {
  return (
    q(this, "_erasNameRegex") || _i.call(this),
    r ? this._erasNameRegex : this._erasRegex
  );
}
function Yg(r) {
  return (
    q(this, "_erasAbbrRegex") || _i.call(this),
    r ? this._erasAbbrRegex : this._erasRegex
  );
}
function zg(r) {
  return (
    q(this, "_erasNarrowRegex") || _i.call(this),
    r ? this._erasNarrowRegex : this._erasRegex
  );
}
function yi(r, i) {
  return i.erasAbbrRegex(r);
}
function Bg(r, i) {
  return i.erasNameRegex(r);
}
function Hg(r, i) {
  return i.erasNarrowRegex(r);
}
function Vg(r, i) {
  return i._eraYearOrdinalRegex || pr;
}
function _i() {
  var r = [],
    i = [],
    s = [],
    d = [],
    c,
    p,
    _ = this.eras();
  for (c = 0, p = _.length; c < p; ++c)
    i.push(Oe(_[c].name)),
      r.push(Oe(_[c].abbr)),
      s.push(Oe(_[c].narrow)),
      d.push(Oe(_[c].name)),
      d.push(Oe(_[c].abbr)),
      d.push(Oe(_[c].narrow));
  (this._erasRegex = new RegExp("^(" + d.join("|") + ")", "i")),
    (this._erasNameRegex = new RegExp("^(" + i.join("|") + ")", "i")),
    (this._erasAbbrRegex = new RegExp("^(" + r.join("|") + ")", "i")),
    (this._erasNarrowRegex = new RegExp("^(" + s.join("|") + ")", "i"));
}
R(0, ["gg", 2], 0, function () {
  return this.weekYear() % 100;
});
R(0, ["GG", 2], 0, function () {
  return this.isoWeekYear() % 100;
});
function Qa(r, i) {
  R(0, [r, r.length], 0, i);
}
Qa("gggg", "weekYear");
Qa("ggggg", "weekYear");
Qa("GGGG", "isoWeekYear");
Qa("GGGGG", "isoWeekYear");
me("weekYear", "gg");
me("isoWeekYear", "GG");
pe("weekYear", 1);
pe("isoWeekYear", 1);
I("G", Ga);
I("g", Ga);
I("GG", re, Pe);
I("gg", re, Pe);
I("GGGG", ui, li);
I("gggg", ui, li);
I("GGGGG", $a, Ua);
I("ggggg", $a, Ua);
Gr(["gggg", "ggggg", "GGGG", "GGGGG"], function (r, i, s, d) {
  i[d.substr(0, 2)] = H(r);
});
Gr(["gg", "GG"], function (r, i, s, d) {
  i[d] = O.parseTwoDigitYear(r);
});
function Ug(r) {
  return qs.call(
    this,
    r,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function jg(r) {
  return qs.call(this, r, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function $g() {
  return dt(this.year(), 1, 4);
}
function Gg() {
  return dt(this.isoWeekYear(), 1, 4);
}
function qg() {
  var r = this.localeData()._week;
  return dt(this.year(), r.dow, r.doy);
}
function Xg() {
  var r = this.localeData()._week;
  return dt(this.weekYear(), r.dow, r.doy);
}
function qs(r, i, s, d, c) {
  var p;
  return r == null
    ? Br(this, d, c).year
    : ((p = dt(r, d, c)), i > p && (i = p), Zg.call(this, r, i, s, d, c));
}
function Zg(r, i, s, d, c) {
  var p = Ts(r, i, s, d, c),
    _ = zr(p.year, 0, p.dayOfYear);
  return (
    this.year(_.getUTCFullYear()),
    this.month(_.getUTCMonth()),
    this.date(_.getUTCDate()),
    this
  );
}
R("Q", 0, "Qo", "quarter");
me("quarter", "Q");
pe("quarter", 7);
I("Q", ps);
Q("Q", function (r, i) {
  i[lt] = (H(r) - 1) * 3;
});
function Kg(r) {
  return r == null
    ? Math.ceil((this.month() + 1) / 3)
    : this.month((r - 1) * 3 + (this.month() % 3));
}
R("D", ["DD", 2], "Do", "date");
me("date", "D");
pe("date", 9);
I("D", re);
I("DD", re, Pe);
I("Do", function (r, i) {
  return r
    ? i._dayOfMonthOrdinalParse || i._ordinalParse
    : i._dayOfMonthOrdinalParseLenient;
});
Q(["D", "DD"], qe);
Q("Do", function (r, i) {
  i[qe] = H(r.match(re)[0]);
});
var Xs = mr("Date", !0);
R("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
me("dayOfYear", "DDD");
pe("dayOfYear", 4);
I("DDD", ja);
I("DDDD", bs);
Q(["DDD", "DDDD"], function (r, i, s) {
  s._dayOfYear = H(r);
});
function Qg(r) {
  var i =
    Math.round(
      (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
    ) + 1;
  return r == null ? i : this.add(r - i, "d");
}
R("m", ["mm", 2], 0, "minute");
me("minute", "m");
pe("minute", 14);
I("m", re);
I("mm", re, Pe);
Q(["m", "mm"], Ye);
var Jg = mr("Minutes", !1);
R("s", ["ss", 2], 0, "second");
me("second", "s");
pe("second", 15);
I("s", re);
I("ss", re, Pe);
Q(["s", "ss"], ut);
var em = mr("Seconds", !1);
R("S", 0, 0, function () {
  return ~~(this.millisecond() / 100);
});
R(0, ["SS", 2], 0, function () {
  return ~~(this.millisecond() / 10);
});
R(0, ["SSS", 3], 0, "millisecond");
R(0, ["SSSS", 4], 0, function () {
  return this.millisecond() * 10;
});
R(0, ["SSSSS", 5], 0, function () {
  return this.millisecond() * 100;
});
R(0, ["SSSSSS", 6], 0, function () {
  return this.millisecond() * 1e3;
});
R(0, ["SSSSSSS", 7], 0, function () {
  return this.millisecond() * 1e4;
});
R(0, ["SSSSSSSS", 8], 0, function () {
  return this.millisecond() * 1e5;
});
R(0, ["SSSSSSSSS", 9], 0, function () {
  return this.millisecond() * 1e6;
});
me("millisecond", "ms");
pe("millisecond", 16);
I("S", ja, ps);
I("SS", ja, Pe);
I("SSS", ja, bs);
var Mt, Zs;
for (Mt = "SSSS"; Mt.length <= 9; Mt += "S") I(Mt, pr);
function tm(r, i) {
  i[Ut] = H(("0." + r) * 1e3);
}
for (Mt = "S"; Mt.length <= 9; Mt += "S") Q(Mt, tm);
Zs = mr("Milliseconds", !1);
R("z", 0, 0, "zoneAbbr");
R("zz", 0, 0, "zoneName");
function rm() {
  return this._isUTC ? "UTC" : "";
}
function am() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var C = jr.prototype;
C.add = Xv;
C.calendar = rg;
C.clone = ag;
C.diff = dg;
C.endOf = _g;
C.format = vg;
C.from = gg;
C.fromNow = mg;
C.to = pg;
C.toNow = bg;
C.get = ih;
C.invalidAt = Og;
C.isAfter = ng;
C.isBefore = ig;
C.isBetween = og;
C.isSame = sg;
C.isSameOrAfter = lg;
C.isSameOrBefore = ug;
C.isValid = Tg;
C.lang = Vs;
C.locale = Hs;
C.localeData = Us;
C.max = Tv;
C.min = Dv;
C.parsingFlags = Cg;
C.set = oh;
C.startOf = yg;
C.subtract = Zv;
C.toArray = kg;
C.toObject = Sg;
C.toDate = Mg;
C.toISOString = cg;
C.inspect = hg;
typeof Symbol < "u" &&
  Symbol.for != null &&
  (C[Symbol.for("nodejs.util.inspect.custom")] = function () {
    return "Moment<" + this.format() + ">";
  });
C.toJSON = Dg;
C.toString = fg;
C.unix = wg;
C.valueOf = xg;
C.creationData = Pg;
C.eraName = Ng;
C.eraNarrow = Rg;
C.eraAbbr = Lg;
C.eraYear = Wg;
C.year = Ds;
C.isLeapYear = Sh;
C.weekYear = Ug;
C.isoWeekYear = jg;
C.quarter = C.quarters = Kg;
C.month = ks;
C.daysInMonth = wh;
C.week = C.weeks = Fh;
C.isoWeek = C.isoWeeks = Ih;
C.weeksInYear = qg;
C.weeksInWeekYear = Xg;
C.isoWeeksInYear = $g;
C.isoWeeksInISOWeekYear = Gg;
C.date = Xs;
C.day = C.days = jh;
C.weekday = $h;
C.isoWeekday = Gh;
C.dayOfYear = Qg;
C.hour = C.hours = ev;
C.minute = C.minutes = Jg;
C.second = C.seconds = em;
C.millisecond = C.milliseconds = Zs;
C.utcOffset = Lv;
C.utc = Ev;
C.local = Yv;
C.parseZone = zv;
C.hasAlignedHourOffset = Bv;
C.isDST = Hv;
C.isLocal = Uv;
C.isUtcOffset = jv;
C.isUtc = Es;
C.isUTC = Es;
C.zoneAbbr = rm;
C.zoneName = am;
C.dates = We("dates accessor is deprecated. Use date instead.", Xs);
C.months = We("months accessor is deprecated. Use month instead", ks);
C.years = We("years accessor is deprecated. Use year instead", Ds);
C.zone = We(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Wv
);
C.isDSTShifted = We(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Vv
);
function nm(r) {
  return te(r * 1e3);
}
function im() {
  return te.apply(null, arguments).parseZone();
}
function Ks(r) {
  return r;
}
var X = ii.prototype;
X.calendar = jc;
X.longDateFormat = Xc;
X.invalidDate = Kc;
X.ordinal = eh;
X.preparse = Ks;
X.postformat = Ks;
X.relativeTime = rh;
X.pastFuture = ah;
X.set = Vc;
X.eras = Fg;
X.erasParse = Ig;
X.erasConvertYear = Ag;
X.erasAbbrRegex = Yg;
X.erasNameRegex = Eg;
X.erasNarrowRegex = zg;
X.months = bh;
X.monthsShort = yh;
X.monthsParse = xh;
X.monthsRegex = kh;
X.monthsShortRegex = Mh;
X.week = Th;
X.firstDayOfYear = Ph;
X.firstDayOfWeek = Oh;
X.weekdays = zh;
X.weekdaysMin = Hh;
X.weekdaysShort = Bh;
X.weekdaysParse = Uh;
X.weekdaysRegex = qh;
X.weekdaysShortRegex = Xh;
X.weekdaysMinRegex = Zh;
X.isPM = Qh;
X.meridiem = tv;
function Ea(r, i, s, d) {
  var c = ht(),
    p = Ke().set(d, i);
  return c[s](p, r);
}
function Qs(r, i, s) {
  if ((ft(r) && ((i = r), (r = void 0)), (r = r || ""), i != null))
    return Ea(r, i, s, "month");
  var d,
    c = [];
  for (d = 0; d < 12; d++) c[d] = Ea(r, d, s, "month");
  return c;
}
function xi(r, i, s, d) {
  typeof r == "boolean"
    ? (ft(i) && ((s = i), (i = void 0)), (i = i || ""))
    : ((i = r),
      (s = i),
      (r = !1),
      ft(i) && ((s = i), (i = void 0)),
      (i = i || ""));
  var c = ht(),
    p = r ? c._week.dow : 0,
    _,
    S = [];
  if (s != null) return Ea(i, (s + p) % 7, d, "day");
  for (_ = 0; _ < 7; _++) S[_] = Ea(i, (_ + p) % 7, d, "day");
  return S;
}
function om(r, i) {
  return Qs(r, i, "months");
}
function sm(r, i) {
  return Qs(r, i, "monthsShort");
}
function lm(r, i, s) {
  return xi(r, i, s, "weekdays");
}
function um(r, i, s) {
  return xi(r, i, s, "weekdaysShort");
}
function dm(r, i, s) {
  return xi(r, i, s, "weekdaysMin");
}
kt("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD",
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC",
    },
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (r) {
    var i = r % 10,
      s =
        H((r % 100) / 10) === 1
          ? "th"
          : i === 1
          ? "st"
          : i === 2
          ? "nd"
          : i === 3
          ? "rd"
          : "th";
    return r + s;
  },
});
O.lang = We("moment.lang is deprecated. Use moment.locale instead.", kt);
O.langData = We(
  "moment.langData is deprecated. Use moment.localeData instead.",
  ht
);
var ot = Math.abs;
function fm() {
  var r = this._data;
  return (
    (this._milliseconds = ot(this._milliseconds)),
    (this._days = ot(this._days)),
    (this._months = ot(this._months)),
    (r.milliseconds = ot(r.milliseconds)),
    (r.seconds = ot(r.seconds)),
    (r.minutes = ot(r.minutes)),
    (r.hours = ot(r.hours)),
    (r.months = ot(r.months)),
    (r.years = ot(r.years)),
    this
  );
}
function Js(r, i, s, d) {
  var c = He(i, s);
  return (
    (r._milliseconds += d * c._milliseconds),
    (r._days += d * c._days),
    (r._months += d * c._months),
    r._bubble()
  );
}
function cm(r, i) {
  return Js(this, r, i, 1);
}
function hm(r, i) {
  return Js(this, r, i, -1);
}
function $o(r) {
  return r < 0 ? Math.floor(r) : Math.ceil(r);
}
function vm() {
  var r = this._milliseconds,
    i = this._days,
    s = this._months,
    d = this._data,
    c,
    p,
    _,
    S,
    T;
  return (
    (r >= 0 && i >= 0 && s >= 0) ||
      (r <= 0 && i <= 0 && s <= 0) ||
      ((r += $o(Kn(s) + i) * 864e5), (i = 0), (s = 0)),
    (d.milliseconds = r % 1e3),
    (c = Re(r / 1e3)),
    (d.seconds = c % 60),
    (p = Re(c / 60)),
    (d.minutes = p % 60),
    (_ = Re(p / 60)),
    (d.hours = _ % 24),
    (i += Re(_ / 24)),
    (T = Re(el(i))),
    (s += T),
    (i -= $o(Kn(T))),
    (S = Re(s / 12)),
    (s %= 12),
    (d.days = i),
    (d.months = s),
    (d.years = S),
    this
  );
}
function el(r) {
  return (r * 4800) / 146097;
}
function Kn(r) {
  return (r * 146097) / 4800;
}
function gm(r) {
  if (!this.isValid()) return NaN;
  var i,
    s,
    d = this._milliseconds;
  if (((r = Ee(r)), r === "month" || r === "quarter" || r === "year"))
    switch (((i = this._days + d / 864e5), (s = this._months + el(i)), r)) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (((i = this._days + Math.round(Kn(this._months))), r)) {
      case "week":
        return i / 7 + d / 6048e5;
      case "day":
        return i + d / 864e5;
      case "hour":
        return i * 24 + d / 36e5;
      case "minute":
        return i * 1440 + d / 6e4;
      case "second":
        return i * 86400 + d / 1e3;
      case "millisecond":
        return Math.floor(i * 864e5) + d;
      default:
        throw new Error("Unknown unit " + r);
    }
}
function mm() {
  return this.isValid()
    ? this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        H(this._months / 12) * 31536e6
    : NaN;
}
function vt(r) {
  return function () {
    return this.as(r);
  };
}
var pm = vt("ms"),
  bm = vt("s"),
  ym = vt("m"),
  _m = vt("h"),
  xm = vt("d"),
  wm = vt("w"),
  Mm = vt("M"),
  km = vt("Q"),
  Sm = vt("y");
function Dm() {
  return He(this);
}
function Tm(r) {
  return (r = Ee(r)), this.isValid() ? this[r + "s"]() : NaN;
}
function Gt(r) {
  return function () {
    return this.isValid() ? this._data[r] : NaN;
  };
}
var Cm = Gt("milliseconds"),
  Om = Gt("seconds"),
  Pm = Gt("minutes"),
  Fm = Gt("hours"),
  Im = Gt("days"),
  Am = Gt("months"),
  Nm = Gt("years");
function Rm() {
  return Re(this.days() / 7);
}
var st = Math.round,
  ur = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
function Lm(r, i, s, d, c) {
  return c.relativeTime(i || 1, !!s, r, d);
}
function Wm(r, i, s, d) {
  var c = He(r).abs(),
    p = st(c.as("s")),
    _ = st(c.as("m")),
    S = st(c.as("h")),
    T = st(c.as("d")),
    P = st(c.as("M")),
    L = st(c.as("w")),
    Y = st(c.as("y")),
    V =
      (p <= s.ss && ["s", p]) ||
      (p < s.s && ["ss", p]) ||
      (_ <= 1 && ["m"]) ||
      (_ < s.m && ["mm", _]) ||
      (S <= 1 && ["h"]) ||
      (S < s.h && ["hh", S]) ||
      (T <= 1 && ["d"]) ||
      (T < s.d && ["dd", T]);
  return (
    s.w != null && (V = V || (L <= 1 && ["w"]) || (L < s.w && ["ww", L])),
    (V = V ||
      (P <= 1 && ["M"]) ||
      (P < s.M && ["MM", P]) ||
      (Y <= 1 && ["y"]) || ["yy", Y]),
    (V[2] = i),
    (V[3] = +r > 0),
    (V[4] = d),
    Lm.apply(null, V)
  );
}
function Em(r) {
  return r === void 0 ? st : typeof r == "function" ? ((st = r), !0) : !1;
}
function Ym(r, i) {
  return ur[r] === void 0
    ? !1
    : i === void 0
    ? ur[r]
    : ((ur[r] = i), r === "s" && (ur.ss = i - 1), !0);
}
function zm(r, i) {
  if (!this.isValid()) return this.localeData().invalidDate();
  var s = !1,
    d = ur,
    c,
    p;
  return (
    typeof r == "object" && ((i = r), (r = !1)),
    typeof r == "boolean" && (s = r),
    typeof i == "object" &&
      ((d = Object.assign({}, ur, i)),
      i.s != null && i.ss == null && (d.ss = i.s - 1)),
    (c = this.localeData()),
    (p = Wm(this, !s, d, c)),
    s && (p = c.pastFuture(+this, p)),
    c.postformat(p)
  );
}
var Un = Math.abs;
function ir(r) {
  return (r > 0) - (r < 0) || +r;
}
function Ja() {
  if (!this.isValid()) return this.localeData().invalidDate();
  var r = Un(this._milliseconds) / 1e3,
    i = Un(this._days),
    s = Un(this._months),
    d,
    c,
    p,
    _,
    S = this.asSeconds(),
    T,
    P,
    L,
    Y;
  return S
    ? ((d = Re(r / 60)),
      (c = Re(d / 60)),
      (r %= 60),
      (d %= 60),
      (p = Re(s / 12)),
      (s %= 12),
      (_ = r ? r.toFixed(3).replace(/\.?0+$/, "") : ""),
      (T = S < 0 ? "-" : ""),
      (P = ir(this._months) !== ir(S) ? "-" : ""),
      (L = ir(this._days) !== ir(S) ? "-" : ""),
      (Y = ir(this._milliseconds) !== ir(S) ? "-" : ""),
      T +
        "P" +
        (p ? P + p + "Y" : "") +
        (s ? P + s + "M" : "") +
        (i ? L + i + "D" : "") +
        (c || d || r ? "T" : "") +
        (c ? Y + c + "H" : "") +
        (d ? Y + d + "M" : "") +
        (r ? Y + _ + "S" : ""))
    : "P0D";
}
var $ = Ka.prototype;
$.isValid = Iv;
$.abs = fm;
$.add = cm;
$.subtract = hm;
$.as = gm;
$.asMilliseconds = pm;
$.asSeconds = bm;
$.asMinutes = ym;
$.asHours = _m;
$.asDays = xm;
$.asWeeks = wm;
$.asMonths = Mm;
$.asQuarters = km;
$.asYears = Sm;
$.valueOf = mm;
$._bubble = vm;
$.clone = Dm;
$.get = Tm;
$.milliseconds = Cm;
$.seconds = Om;
$.minutes = Pm;
$.hours = Fm;
$.days = Im;
$.weeks = Rm;
$.months = Am;
$.years = Nm;
$.humanize = zm;
$.toISOString = Ja;
$.toString = Ja;
$.toJSON = Ja;
$.locale = Hs;
$.localeData = Us;
$.toIsoString = We(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Ja
);
$.lang = Vs;
R("X", 0, 0, "unix");
R("x", 0, 0, "valueOf");
I("x", Ga);
I("X", lh);
Q("X", function (r, i, s) {
  s._d = new Date(parseFloat(r) * 1e3);
});
Q("x", function (r, i, s) {
  s._d = new Date(H(r));
}); //! moment.js
O.version = "2.29.4";
Bc(te);
O.fn = C;
O.min = Cv;
O.max = Ov;
O.now = Pv;
O.utc = Ke;
O.unix = nm;
O.months = om;
O.isDate = Ur;
O.locale = kt;
O.invalid = Ha;
O.duration = He;
O.isMoment = Be;
O.weekdays = lm;
O.parseZone = im;
O.localeData = ht;
O.isDuration = Ta;
O.monthsShort = sm;
O.weekdaysMin = dm;
O.defineLocale = hi;
O.updateLocale = iv;
O.locales = ov;
O.weekdaysShort = um;
O.normalizeUnits = Ee;
O.relativeTimeRounding = Em;
O.relativeTimeThreshold = Ym;
O.calendarFormat = tg;
O.prototype = C;
O.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM",
};
const Bm = Object.freeze(
    Object.defineProperty({ __proto__: null, default: O }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  Hm = Jd(Bm);
/*!
 * Chart.js v2.9.4
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */ (function (r, i) {
  (function (s, d) {
    r.exports = d(
      (function () {
        try {
          return Hm;
        } catch {}
      })()
    );
  })(ef, function (s) {
    s = s && s.hasOwnProperty("default") ? s.default : s;
    function d(e, t) {
      return (t = { exports: {} }), e(t, t.exports), t.exports;
    }
    function c(e) {
      return (e && e.default) || e;
    }
    var p = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      },
      _ = d(function (e) {
        var t = {};
        for (var a in p) p.hasOwnProperty(a) && (t[p[a]] = a);
        var n = (e.exports = {
          rgb: { channels: 3, labels: "rgb" },
          hsl: { channels: 3, labels: "hsl" },
          hsv: { channels: 3, labels: "hsv" },
          hwb: { channels: 3, labels: "hwb" },
          cmyk: { channels: 4, labels: "cmyk" },
          xyz: { channels: 3, labels: "xyz" },
          lab: { channels: 3, labels: "lab" },
          lch: { channels: 3, labels: "lch" },
          hex: { channels: 1, labels: ["hex"] },
          keyword: { channels: 1, labels: ["keyword"] },
          ansi16: { channels: 1, labels: ["ansi16"] },
          ansi256: { channels: 1, labels: ["ansi256"] },
          hcg: { channels: 3, labels: ["h", "c", "g"] },
          apple: { channels: 3, labels: ["r16", "g16", "b16"] },
          gray: { channels: 1, labels: ["gray"] },
        });
        for (var o in n)
          if (n.hasOwnProperty(o)) {
            if (!("channels" in n[o]))
              throw new Error("missing channels property: " + o);
            if (!("labels" in n[o]))
              throw new Error("missing channel labels property: " + o);
            if (n[o].labels.length !== n[o].channels)
              throw new Error("channel and label counts mismatch: " + o);
            var l = n[o].channels,
              u = n[o].labels;
            delete n[o].channels,
              delete n[o].labels,
              Object.defineProperty(n[o], "channels", { value: l }),
              Object.defineProperty(n[o], "labels", { value: u });
          }
        (n.rgb.hsl = function (f) {
          var v = f[0] / 255,
            g = f[1] / 255,
            m = f[2] / 255,
            y = Math.min(v, g, m),
            x = Math.max(v, g, m),
            w = x - y,
            M,
            k,
            D;
          return (
            x === y
              ? (M = 0)
              : v === x
              ? (M = (g - m) / w)
              : g === x
              ? (M = 2 + (m - v) / w)
              : m === x && (M = 4 + (v - g) / w),
            (M = Math.min(M * 60, 360)),
            M < 0 && (M += 360),
            (D = (y + x) / 2),
            x === y
              ? (k = 0)
              : D <= 0.5
              ? (k = w / (x + y))
              : (k = w / (2 - x - y)),
            [M, k * 100, D * 100]
          );
        }),
          (n.rgb.hsv = function (f) {
            var v,
              g,
              m,
              y,
              x,
              w = f[0] / 255,
              M = f[1] / 255,
              k = f[2] / 255,
              D = Math.max(w, M, k),
              F = D - Math.min(w, M, k),
              A = function (E) {
                return (D - E) / 6 / F + 1 / 2;
              };
            return (
              F === 0
                ? (y = x = 0)
                : ((x = F / D),
                  (v = A(w)),
                  (g = A(M)),
                  (m = A(k)),
                  w === D
                    ? (y = m - g)
                    : M === D
                    ? (y = 1 / 3 + v - m)
                    : k === D && (y = 2 / 3 + g - v),
                  y < 0 ? (y += 1) : y > 1 && (y -= 1)),
              [y * 360, x * 100, D * 100]
            );
          }),
          (n.rgb.hwb = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y = n.rgb.hsl(f)[0],
              x = (1 / 255) * Math.min(v, Math.min(g, m));
            return (
              (m = 1 - (1 / 255) * Math.max(v, Math.max(g, m))),
              [y, x * 100, m * 100]
            );
          }),
          (n.rgb.cmyk = function (f) {
            var v = f[0] / 255,
              g = f[1] / 255,
              m = f[2] / 255,
              y,
              x,
              w,
              M;
            return (
              (M = Math.min(1 - v, 1 - g, 1 - m)),
              (y = (1 - v - M) / (1 - M) || 0),
              (x = (1 - g - M) / (1 - M) || 0),
              (w = (1 - m - M) / (1 - M) || 0),
              [y * 100, x * 100, w * 100, M * 100]
            );
          });
        function h(f, v) {
          return (
            Math.pow(f[0] - v[0], 2) +
            Math.pow(f[1] - v[1], 2) +
            Math.pow(f[2] - v[2], 2)
          );
        }
        (n.rgb.keyword = function (f) {
          var v = t[f];
          if (v) return v;
          var g = 1 / 0,
            m;
          for (var y in p)
            if (p.hasOwnProperty(y)) {
              var x = p[y],
                w = h(f, x);
              w < g && ((g = w), (m = y));
            }
          return m;
        }),
          (n.keyword.rgb = function (f) {
            return p[f];
          }),
          (n.rgb.xyz = function (f) {
            var v = f[0] / 255,
              g = f[1] / 255,
              m = f[2] / 255;
            (v = v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92),
              (g =
                g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92),
              (m =
                m > 0.04045 ? Math.pow((m + 0.055) / 1.055, 2.4) : m / 12.92);
            var y = v * 0.4124 + g * 0.3576 + m * 0.1805,
              x = v * 0.2126 + g * 0.7152 + m * 0.0722,
              w = v * 0.0193 + g * 0.1192 + m * 0.9505;
            return [y * 100, x * 100, w * 100];
          }),
          (n.rgb.lab = function (f) {
            var v = n.rgb.xyz(f),
              g = v[0],
              m = v[1],
              y = v[2],
              x,
              w,
              M;
            return (
              (g /= 95.047),
              (m /= 100),
              (y /= 108.883),
              (g = g > 0.008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116),
              (m = m > 0.008856 ? Math.pow(m, 1 / 3) : 7.787 * m + 16 / 116),
              (y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116),
              (x = 116 * m - 16),
              (w = 500 * (g - m)),
              (M = 200 * (m - y)),
              [x, w, M]
            );
          }),
          (n.hsl.rgb = function (f) {
            var v = f[0] / 360,
              g = f[1] / 100,
              m = f[2] / 100,
              y,
              x,
              w,
              M,
              k;
            if (g === 0) return (k = m * 255), [k, k, k];
            m < 0.5 ? (x = m * (1 + g)) : (x = m + g - m * g),
              (y = 2 * m - x),
              (M = [0, 0, 0]);
            for (var D = 0; D < 3; D++)
              (w = v + (1 / 3) * -(D - 1)),
                w < 0 && w++,
                w > 1 && w--,
                6 * w < 1
                  ? (k = y + (x - y) * 6 * w)
                  : 2 * w < 1
                  ? (k = x)
                  : 3 * w < 2
                  ? (k = y + (x - y) * (2 / 3 - w) * 6)
                  : (k = y),
                (M[D] = k * 255);
            return M;
          }),
          (n.hsl.hsv = function (f) {
            var v = f[0],
              g = f[1] / 100,
              m = f[2] / 100,
              y = g,
              x = Math.max(m, 0.01),
              w,
              M;
            return (
              (m *= 2),
              (g *= m <= 1 ? m : 2 - m),
              (y *= x <= 1 ? x : 2 - x),
              (M = (m + g) / 2),
              (w = m === 0 ? (2 * y) / (x + y) : (2 * g) / (m + g)),
              [v, w * 100, M * 100]
            );
          }),
          (n.hsv.rgb = function (f) {
            var v = f[0] / 60,
              g = f[1] / 100,
              m = f[2] / 100,
              y = Math.floor(v) % 6,
              x = v - Math.floor(v),
              w = 255 * m * (1 - g),
              M = 255 * m * (1 - g * x),
              k = 255 * m * (1 - g * (1 - x));
            switch (((m *= 255), y)) {
              case 0:
                return [m, k, w];
              case 1:
                return [M, m, w];
              case 2:
                return [w, m, k];
              case 3:
                return [w, M, m];
              case 4:
                return [k, w, m];
              case 5:
                return [m, w, M];
            }
          }),
          (n.hsv.hsl = function (f) {
            var v = f[0],
              g = f[1] / 100,
              m = f[2] / 100,
              y = Math.max(m, 0.01),
              x,
              w,
              M;
            return (
              (M = (2 - g) * m),
              (x = (2 - g) * y),
              (w = g * y),
              (w /= x <= 1 ? x : 2 - x),
              (w = w || 0),
              (M /= 2),
              [v, w * 100, M * 100]
            );
          }),
          (n.hwb.rgb = function (f) {
            var v = f[0] / 360,
              g = f[1] / 100,
              m = f[2] / 100,
              y = g + m,
              x,
              w,
              M,
              k;
            y > 1 && ((g /= y), (m /= y)),
              (x = Math.floor(6 * v)),
              (w = 1 - m),
              (M = 6 * v - x),
              (x & 1) !== 0 && (M = 1 - M),
              (k = g + M * (w - g));
            var D, F, A;
            switch (x) {
              default:
              case 6:
              case 0:
                (D = w), (F = k), (A = g);
                break;
              case 1:
                (D = k), (F = w), (A = g);
                break;
              case 2:
                (D = g), (F = w), (A = k);
                break;
              case 3:
                (D = g), (F = k), (A = w);
                break;
              case 4:
                (D = k), (F = g), (A = w);
                break;
              case 5:
                (D = w), (F = g), (A = k);
                break;
            }
            return [D * 255, F * 255, A * 255];
          }),
          (n.cmyk.rgb = function (f) {
            var v = f[0] / 100,
              g = f[1] / 100,
              m = f[2] / 100,
              y = f[3] / 100,
              x,
              w,
              M;
            return (
              (x = 1 - Math.min(1, v * (1 - y) + y)),
              (w = 1 - Math.min(1, g * (1 - y) + y)),
              (M = 1 - Math.min(1, m * (1 - y) + y)),
              [x * 255, w * 255, M * 255]
            );
          }),
          (n.xyz.rgb = function (f) {
            var v = f[0] / 100,
              g = f[1] / 100,
              m = f[2] / 100,
              y,
              x,
              w;
            return (
              (y = v * 3.2406 + g * -1.5372 + m * -0.4986),
              (x = v * -0.9689 + g * 1.8758 + m * 0.0415),
              (w = v * 0.0557 + g * -0.204 + m * 1.057),
              (y =
                y > 0.0031308
                  ? 1.055 * Math.pow(y, 1 / 2.4) - 0.055
                  : y * 12.92),
              (x =
                x > 0.0031308
                  ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055
                  : x * 12.92),
              (w =
                w > 0.0031308
                  ? 1.055 * Math.pow(w, 1 / 2.4) - 0.055
                  : w * 12.92),
              (y = Math.min(Math.max(0, y), 1)),
              (x = Math.min(Math.max(0, x), 1)),
              (w = Math.min(Math.max(0, w), 1)),
              [y * 255, x * 255, w * 255]
            );
          }),
          (n.xyz.lab = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y,
              x,
              w;
            return (
              (v /= 95.047),
              (g /= 100),
              (m /= 108.883),
              (v = v > 0.008856 ? Math.pow(v, 1 / 3) : 7.787 * v + 16 / 116),
              (g = g > 0.008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116),
              (m = m > 0.008856 ? Math.pow(m, 1 / 3) : 7.787 * m + 16 / 116),
              (y = 116 * g - 16),
              (x = 500 * (v - g)),
              (w = 200 * (g - m)),
              [y, x, w]
            );
          }),
          (n.lab.xyz = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y,
              x,
              w;
            (x = (v + 16) / 116), (y = g / 500 + x), (w = x - m / 200);
            var M = Math.pow(x, 3),
              k = Math.pow(y, 3),
              D = Math.pow(w, 3);
            return (
              (x = M > 0.008856 ? M : (x - 16 / 116) / 7.787),
              (y = k > 0.008856 ? k : (y - 16 / 116) / 7.787),
              (w = D > 0.008856 ? D : (w - 16 / 116) / 7.787),
              (y *= 95.047),
              (x *= 100),
              (w *= 108.883),
              [y, x, w]
            );
          }),
          (n.lab.lch = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y,
              x,
              w;
            return (
              (y = Math.atan2(m, g)),
              (x = (y * 360) / 2 / Math.PI),
              x < 0 && (x += 360),
              (w = Math.sqrt(g * g + m * m)),
              [v, w, x]
            );
          }),
          (n.lch.lab = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y,
              x,
              w;
            return (
              (w = (m / 360) * 2 * Math.PI),
              (y = g * Math.cos(w)),
              (x = g * Math.sin(w)),
              [v, y, x]
            );
          }),
          (n.rgb.ansi16 = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2],
              y = 1 in arguments ? arguments[1] : n.rgb.hsv(f)[2];
            if (((y = Math.round(y / 50)), y === 0)) return 30;
            var x =
              30 +
              ((Math.round(m / 255) << 2) |
                (Math.round(g / 255) << 1) |
                Math.round(v / 255));
            return y === 2 && (x += 60), x;
          }),
          (n.hsv.ansi16 = function (f) {
            return n.rgb.ansi16(n.hsv.rgb(f), f[2]);
          }),
          (n.rgb.ansi256 = function (f) {
            var v = f[0],
              g = f[1],
              m = f[2];
            if (v === g && g === m)
              return v < 8
                ? 16
                : v > 248
                ? 231
                : Math.round(((v - 8) / 247) * 24) + 232;
            var y =
              16 +
              36 * Math.round((v / 255) * 5) +
              6 * Math.round((g / 255) * 5) +
              Math.round((m / 255) * 5);
            return y;
          }),
          (n.ansi16.rgb = function (f) {
            var v = f % 10;
            if (v === 0 || v === 7)
              return f > 50 && (v += 3.5), (v = (v / 10.5) * 255), [v, v, v];
            var g = (~~(f > 50) + 1) * 0.5,
              m = (v & 1) * g * 255,
              y = ((v >> 1) & 1) * g * 255,
              x = ((v >> 2) & 1) * g * 255;
            return [m, y, x];
          }),
          (n.ansi256.rgb = function (f) {
            if (f >= 232) {
              var v = (f - 232) * 10 + 8;
              return [v, v, v];
            }
            f -= 16;
            var g,
              m = (Math.floor(f / 36) / 5) * 255,
              y = (Math.floor((g = f % 36) / 6) / 5) * 255,
              x = ((g % 6) / 5) * 255;
            return [m, y, x];
          }),
          (n.rgb.hex = function (f) {
            var v =
                ((Math.round(f[0]) & 255) << 16) +
                ((Math.round(f[1]) & 255) << 8) +
                (Math.round(f[2]) & 255),
              g = v.toString(16).toUpperCase();
            return "000000".substring(g.length) + g;
          }),
          (n.hex.rgb = function (f) {
            var v = f.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            if (!v) return [0, 0, 0];
            var g = v[0];
            v[0].length === 3 &&
              (g = g
                .split("")
                .map(function (M) {
                  return M + M;
                })
                .join(""));
            var m = parseInt(g, 16),
              y = (m >> 16) & 255,
              x = (m >> 8) & 255,
              w = m & 255;
            return [y, x, w];
          }),
          (n.rgb.hcg = function (f) {
            var v = f[0] / 255,
              g = f[1] / 255,
              m = f[2] / 255,
              y = Math.max(Math.max(v, g), m),
              x = Math.min(Math.min(v, g), m),
              w = y - x,
              M,
              k;
            return (
              w < 1 ? (M = x / (1 - w)) : (M = 0),
              w <= 0
                ? (k = 0)
                : y === v
                ? (k = ((g - m) / w) % 6)
                : y === g
                ? (k = 2 + (m - v) / w)
                : (k = 4 + (v - g) / w + 4),
              (k /= 6),
              (k %= 1),
              [k * 360, w * 100, M * 100]
            );
          }),
          (n.hsl.hcg = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = 1,
              y = 0;
            return (
              g < 0.5 ? (m = 2 * v * g) : (m = 2 * v * (1 - g)),
              m < 1 && (y = (g - 0.5 * m) / (1 - m)),
              [f[0], m * 100, y * 100]
            );
          }),
          (n.hsv.hcg = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = v * g,
              y = 0;
            return m < 1 && (y = (g - m) / (1 - m)), [f[0], m * 100, y * 100];
          }),
          (n.hcg.rgb = function (f) {
            var v = f[0] / 360,
              g = f[1] / 100,
              m = f[2] / 100;
            if (g === 0) return [m * 255, m * 255, m * 255];
            var y = [0, 0, 0],
              x = (v % 1) * 6,
              w = x % 1,
              M = 1 - w,
              k = 0;
            switch (Math.floor(x)) {
              case 0:
                (y[0] = 1), (y[1] = w), (y[2] = 0);
                break;
              case 1:
                (y[0] = M), (y[1] = 1), (y[2] = 0);
                break;
              case 2:
                (y[0] = 0), (y[1] = 1), (y[2] = w);
                break;
              case 3:
                (y[0] = 0), (y[1] = M), (y[2] = 1);
                break;
              case 4:
                (y[0] = w), (y[1] = 0), (y[2] = 1);
                break;
              default:
                (y[0] = 1), (y[1] = 0), (y[2] = M);
            }
            return (
              (k = (1 - g) * m),
              [(g * y[0] + k) * 255, (g * y[1] + k) * 255, (g * y[2] + k) * 255]
            );
          }),
          (n.hcg.hsv = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = v + g * (1 - v),
              y = 0;
            return m > 0 && (y = v / m), [f[0], y * 100, m * 100];
          }),
          (n.hcg.hsl = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = g * (1 - v) + 0.5 * v,
              y = 0;
            return (
              m > 0 && m < 0.5
                ? (y = v / (2 * m))
                : m >= 0.5 && m < 1 && (y = v / (2 * (1 - m))),
              [f[0], y * 100, m * 100]
            );
          }),
          (n.hcg.hwb = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = v + g * (1 - v);
            return [f[0], (m - v) * 100, (1 - m) * 100];
          }),
          (n.hwb.hcg = function (f) {
            var v = f[1] / 100,
              g = f[2] / 100,
              m = 1 - g,
              y = m - v,
              x = 0;
            return y < 1 && (x = (m - y) / (1 - y)), [f[0], y * 100, x * 100];
          }),
          (n.apple.rgb = function (f) {
            return [
              (f[0] / 65535) * 255,
              (f[1] / 65535) * 255,
              (f[2] / 65535) * 255,
            ];
          }),
          (n.rgb.apple = function (f) {
            return [
              (f[0] / 255) * 65535,
              (f[1] / 255) * 65535,
              (f[2] / 255) * 65535,
            ];
          }),
          (n.gray.rgb = function (f) {
            return [(f[0] / 100) * 255, (f[0] / 100) * 255, (f[0] / 100) * 255];
          }),
          (n.gray.hsl = n.gray.hsv =
            function (f) {
              return [0, 0, f[0]];
            }),
          (n.gray.hwb = function (f) {
            return [0, 100, f[0]];
          }),
          (n.gray.cmyk = function (f) {
            return [0, 0, 0, f[0]];
          }),
          (n.gray.lab = function (f) {
            return [f[0], 0, 0];
          }),
          (n.gray.hex = function (f) {
            var v = Math.round((f[0] / 100) * 255) & 255,
              g = (v << 16) + (v << 8) + v,
              m = g.toString(16).toUpperCase();
            return "000000".substring(m.length) + m;
          }),
          (n.rgb.gray = function (f) {
            var v = (f[0] + f[1] + f[2]) / 3;
            return [(v / 255) * 100];
          });
      });
    _.rgb,
      _.hsl,
      _.hsv,
      _.hwb,
      _.cmyk,
      _.xyz,
      _.lab,
      _.lch,
      _.hex,
      _.keyword,
      _.ansi16,
      _.ansi256,
      _.hcg,
      _.apple,
      _.gray;
    function S() {
      for (var e = {}, t = Object.keys(_), a = t.length, n = 0; n < a; n++)
        e[t[n]] = { distance: -1, parent: null };
      return e;
    }
    function T(e) {
      var t = S(),
        a = [e];
      for (t[e].distance = 0; a.length; )
        for (
          var n = a.pop(), o = Object.keys(_[n]), l = o.length, u = 0;
          u < l;
          u++
        ) {
          var h = o[u],
            f = t[h];
          f.distance === -1 &&
            ((f.distance = t[n].distance + 1), (f.parent = n), a.unshift(h));
        }
      return t;
    }
    function P(e, t) {
      return function (a) {
        return t(e(a));
      };
    }
    function L(e, t) {
      for (
        var a = [t[e].parent, e], n = _[t[e].parent][e], o = t[e].parent;
        t[o].parent;

      )
        a.unshift(t[o].parent),
          (n = P(_[t[o].parent][o], n)),
          (o = t[o].parent);
      return (n.conversion = a), n;
    }
    var Y = function (e) {
        for (
          var t = T(e), a = {}, n = Object.keys(t), o = n.length, l = 0;
          l < o;
          l++
        ) {
          var u = n[l],
            h = t[u];
          h.parent !== null && (a[u] = L(u, t));
        }
        return a;
      },
      V = {},
      de = Object.keys(_);
    function Te(e) {
      var t = function (a) {
        return a == null
          ? a
          : (arguments.length > 1 &&
              (a = Array.prototype.slice.call(arguments)),
            e(a));
      };
      return "conversion" in e && (t.conversion = e.conversion), t;
    }
    function Ct(e) {
      var t = function (a) {
        if (a == null) return a;
        arguments.length > 1 && (a = Array.prototype.slice.call(arguments));
        var n = e(a);
        if (typeof n == "object")
          for (var o = n.length, l = 0; l < o; l++) n[l] = Math.round(n[l]);
        return n;
      };
      return "conversion" in e && (t.conversion = e.conversion), t;
    }
    de.forEach(function (e) {
      (V[e] = {}),
        Object.defineProperty(V[e], "channels", { value: _[e].channels }),
        Object.defineProperty(V[e], "labels", { value: _[e].labels });
      var t = Y(e),
        a = Object.keys(t);
      a.forEach(function (n) {
        var o = t[n];
        (V[e][n] = Ct(o)), (V[e][n].raw = Te(o));
      });
    });
    var Je = V,
      et = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      },
      be = {
        getRgba: Ot,
        getHsla: Pt,
        getRgb: Ft,
        getHsl: It,
        getHwb: Xr,
        getAlpha: br,
        hexString: yr,
        rgbString: qt,
        rgbaString: Zr,
        percentString: rn,
        percentaString: Kr,
        hslString: an,
        hslaString: ce,
        hwbString: Ve,
        keyword: Xt,
      };
    function Ot(e) {
      if (!!e) {
        var t = /^#([a-fA-F0-9]{3,4})$/i,
          a = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i,
          n =
            /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
          o =
            /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
          l = /(\w+)/,
          u = [0, 0, 0],
          h = 1,
          f = e.match(t),
          v = "";
        if (f) {
          (f = f[1]), (v = f[3]);
          for (var g = 0; g < u.length; g++) u[g] = parseInt(f[g] + f[g], 16);
          v && (h = Math.round((parseInt(v + v, 16) / 255) * 100) / 100);
        } else if ((f = e.match(a))) {
          (v = f[2]), (f = f[1]);
          for (var g = 0; g < u.length; g++)
            u[g] = parseInt(f.slice(g * 2, g * 2 + 2), 16);
          v && (h = Math.round((parseInt(v, 16) / 255) * 100) / 100);
        } else if ((f = e.match(n))) {
          for (var g = 0; g < u.length; g++) u[g] = parseInt(f[g + 1]);
          h = parseFloat(f[4]);
        } else if ((f = e.match(o))) {
          for (var g = 0; g < u.length; g++)
            u[g] = Math.round(parseFloat(f[g + 1]) * 2.55);
          h = parseFloat(f[4]);
        } else if ((f = e.match(l))) {
          if (f[1] == "transparent") return [0, 0, 0, 0];
          if (((u = et[f[1]]), !u)) return;
        }
        for (var g = 0; g < u.length; g++) u[g] = Ue(u[g], 0, 255);
        return !h && h != 0 ? (h = 1) : (h = Ue(h, 0, 1)), (u[3] = h), u;
      }
    }
    function Pt(e) {
      if (!!e) {
        var t =
            /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
          a = e.match(t);
        if (a) {
          var n = parseFloat(a[4]),
            o = Ue(parseInt(a[1]), 0, 360),
            l = Ue(parseFloat(a[2]), 0, 100),
            u = Ue(parseFloat(a[3]), 0, 100),
            h = Ue(isNaN(n) ? 1 : n, 0, 1);
          return [o, l, u, h];
        }
      }
    }
    function Xr(e) {
      if (!!e) {
        var t =
            /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
          a = e.match(t);
        if (a) {
          var n = parseFloat(a[4]),
            o = Ue(parseInt(a[1]), 0, 360),
            l = Ue(parseFloat(a[2]), 0, 100),
            u = Ue(parseFloat(a[3]), 0, 100),
            h = Ue(isNaN(n) ? 1 : n, 0, 1);
          return [o, l, u, h];
        }
      }
    }
    function Ft(e) {
      var t = Ot(e);
      return t && t.slice(0, 3);
    }
    function It(e) {
      var t = Pt(e);
      return t && t.slice(0, 3);
    }
    function br(e) {
      var t = Ot(e);
      if (t) return t[3];
      if ((t = Pt(e))) return t[3];
      if ((t = Xr(e))) return t[3];
    }
    function yr(e, a) {
      var a = a !== void 0 && e.length === 3 ? a : e[3];
      return (
        "#" +
        Qr(e[0]) +
        Qr(e[1]) +
        Qr(e[2]) +
        (a >= 0 && a < 1 ? Qr(Math.round(a * 255)) : "")
      );
    }
    function qt(e, t) {
      return t < 1 || (e[3] && e[3] < 1)
        ? Zr(e, t)
        : "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
    }
    function Zr(e, t) {
      return (
        t === void 0 && (t = e[3] !== void 0 ? e[3] : 1),
        "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + t + ")"
      );
    }
    function rn(e, t) {
      if (t < 1 || (e[3] && e[3] < 1)) return Kr(e, t);
      var a = Math.round((e[0] / 255) * 100),
        n = Math.round((e[1] / 255) * 100),
        o = Math.round((e[2] / 255) * 100);
      return "rgb(" + a + "%, " + n + "%, " + o + "%)";
    }
    function Kr(e, t) {
      var a = Math.round((e[0] / 255) * 100),
        n = Math.round((e[1] / 255) * 100),
        o = Math.round((e[2] / 255) * 100);
      return (
        "rgba(" + a + "%, " + n + "%, " + o + "%, " + (t || e[3] || 1) + ")"
      );
    }
    function an(e, t) {
      return t < 1 || (e[3] && e[3] < 1)
        ? ce(e, t)
        : "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)";
    }
    function ce(e, t) {
      return (
        t === void 0 && (t = e[3] !== void 0 ? e[3] : 1),
        "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + t + ")"
      );
    }
    function Ve(e, t) {
      return (
        t === void 0 && (t = e[3] !== void 0 ? e[3] : 1),
        "hwb(" +
          e[0] +
          ", " +
          e[1] +
          "%, " +
          e[2] +
          "%" +
          (t !== void 0 && t !== 1 ? ", " + t : "") +
          ")"
      );
    }
    function Xt(e) {
      return Ii[e.slice(0, 3)];
    }
    function Ue(e, t, a) {
      return Math.min(Math.max(t, e), a);
    }
    function Qr(e) {
      var t = e.toString(16).toUpperCase();
      return t.length < 2 ? "0" + t : t;
    }
    var Ii = {};
    for (var Ai in et) Ii[et[Ai]] = Ai;
    var Ce = function (e) {
      if (e instanceof Ce) return e;
      if (!(this instanceof Ce)) return new Ce(e);
      (this.valid = !1),
        (this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1,
        });
      var t;
      typeof e == "string"
        ? ((t = be.getRgba(e)),
          t
            ? this.setValues("rgb", t)
            : (t = be.getHsla(e))
            ? this.setValues("hsl", t)
            : (t = be.getHwb(e)) && this.setValues("hwb", t))
        : typeof e == "object" &&
          ((t = e),
          t.r !== void 0 || t.red !== void 0
            ? this.setValues("rgb", t)
            : t.l !== void 0 || t.lightness !== void 0
            ? this.setValues("hsl", t)
            : t.v !== void 0 || t.value !== void 0
            ? this.setValues("hsv", t)
            : t.w !== void 0 || t.whiteness !== void 0
            ? this.setValues("hwb", t)
            : (t.c !== void 0 || t.cyan !== void 0) &&
              this.setValues("cmyk", t));
    };
    (Ce.prototype = {
      isValid: function () {
        return this.valid;
      },
      rgb: function () {
        return this.setSpace("rgb", arguments);
      },
      hsl: function () {
        return this.setSpace("hsl", arguments);
      },
      hsv: function () {
        return this.setSpace("hsv", arguments);
      },
      hwb: function () {
        return this.setSpace("hwb", arguments);
      },
      cmyk: function () {
        return this.setSpace("cmyk", arguments);
      },
      rgbArray: function () {
        return this.values.rgb;
      },
      hslArray: function () {
        return this.values.hsl;
      },
      hsvArray: function () {
        return this.values.hsv;
      },
      hwbArray: function () {
        var e = this.values;
        return e.alpha !== 1 ? e.hwb.concat([e.alpha]) : e.hwb;
      },
      cmykArray: function () {
        return this.values.cmyk;
      },
      rgbaArray: function () {
        var e = this.values;
        return e.rgb.concat([e.alpha]);
      },
      hslaArray: function () {
        var e = this.values;
        return e.hsl.concat([e.alpha]);
      },
      alpha: function (e) {
        return e === void 0
          ? this.values.alpha
          : (this.setValues("alpha", e), this);
      },
      red: function (e) {
        return this.setChannel("rgb", 0, e);
      },
      green: function (e) {
        return this.setChannel("rgb", 1, e);
      },
      blue: function (e) {
        return this.setChannel("rgb", 2, e);
      },
      hue: function (e) {
        return (
          e && ((e %= 360), (e = e < 0 ? 360 + e : e)),
          this.setChannel("hsl", 0, e)
        );
      },
      saturation: function (e) {
        return this.setChannel("hsl", 1, e);
      },
      lightness: function (e) {
        return this.setChannel("hsl", 2, e);
      },
      saturationv: function (e) {
        return this.setChannel("hsv", 1, e);
      },
      whiteness: function (e) {
        return this.setChannel("hwb", 1, e);
      },
      blackness: function (e) {
        return this.setChannel("hwb", 2, e);
      },
      value: function (e) {
        return this.setChannel("hsv", 2, e);
      },
      cyan: function (e) {
        return this.setChannel("cmyk", 0, e);
      },
      magenta: function (e) {
        return this.setChannel("cmyk", 1, e);
      },
      yellow: function (e) {
        return this.setChannel("cmyk", 2, e);
      },
      black: function (e) {
        return this.setChannel("cmyk", 3, e);
      },
      hexString: function () {
        return be.hexString(this.values.rgb);
      },
      rgbString: function () {
        return be.rgbString(this.values.rgb, this.values.alpha);
      },
      rgbaString: function () {
        return be.rgbaString(this.values.rgb, this.values.alpha);
      },
      percentString: function () {
        return be.percentString(this.values.rgb, this.values.alpha);
      },
      hslString: function () {
        return be.hslString(this.values.hsl, this.values.alpha);
      },
      hslaString: function () {
        return be.hslaString(this.values.hsl, this.values.alpha);
      },
      hwbString: function () {
        return be.hwbString(this.values.hwb, this.values.alpha);
      },
      keyword: function () {
        return be.keyword(this.values.rgb, this.values.alpha);
      },
      rgbNumber: function () {
        var e = this.values.rgb;
        return (e[0] << 16) | (e[1] << 8) | e[2];
      },
      luminosity: function () {
        for (var e = this.values.rgb, t = [], a = 0; a < e.length; a++) {
          var n = e[a] / 255;
          t[a] = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
      },
      contrast: function (e) {
        var t = this.luminosity(),
          a = e.luminosity();
        return t > a ? (t + 0.05) / (a + 0.05) : (a + 0.05) / (t + 0.05);
      },
      level: function (e) {
        var t = this.contrast(e);
        return t >= 7.1 ? "AAA" : t >= 4.5 ? "AA" : "";
      },
      dark: function () {
        var e = this.values.rgb,
          t = (e[0] * 299 + e[1] * 587 + e[2] * 114) / 1e3;
        return t < 128;
      },
      light: function () {
        return !this.dark();
      },
      negate: function () {
        for (var e = [], t = 0; t < 3; t++) e[t] = 255 - this.values.rgb[t];
        return this.setValues("rgb", e), this;
      },
      lighten: function (e) {
        var t = this.values.hsl;
        return (t[2] += t[2] * e), this.setValues("hsl", t), this;
      },
      darken: function (e) {
        var t = this.values.hsl;
        return (t[2] -= t[2] * e), this.setValues("hsl", t), this;
      },
      saturate: function (e) {
        var t = this.values.hsl;
        return (t[1] += t[1] * e), this.setValues("hsl", t), this;
      },
      desaturate: function (e) {
        var t = this.values.hsl;
        return (t[1] -= t[1] * e), this.setValues("hsl", t), this;
      },
      whiten: function (e) {
        var t = this.values.hwb;
        return (t[1] += t[1] * e), this.setValues("hwb", t), this;
      },
      blacken: function (e) {
        var t = this.values.hwb;
        return (t[2] += t[2] * e), this.setValues("hwb", t), this;
      },
      greyscale: function () {
        var e = this.values.rgb,
          t = e[0] * 0.3 + e[1] * 0.59 + e[2] * 0.11;
        return this.setValues("rgb", [t, t, t]), this;
      },
      clearer: function (e) {
        var t = this.values.alpha;
        return this.setValues("alpha", t - t * e), this;
      },
      opaquer: function (e) {
        var t = this.values.alpha;
        return this.setValues("alpha", t + t * e), this;
      },
      rotate: function (e) {
        var t = this.values.hsl,
          a = (t[0] + e) % 360;
        return (t[0] = a < 0 ? 360 + a : a), this.setValues("hsl", t), this;
      },
      mix: function (e, t) {
        var a = this,
          n = e,
          o = t === void 0 ? 0.5 : t,
          l = 2 * o - 1,
          u = a.alpha() - n.alpha(),
          h = ((l * u === -1 ? l : (l + u) / (1 + l * u)) + 1) / 2,
          f = 1 - h;
        return this.rgb(
          h * a.red() + f * n.red(),
          h * a.green() + f * n.green(),
          h * a.blue() + f * n.blue()
        ).alpha(a.alpha() * o + n.alpha() * (1 - o));
      },
      toJSON: function () {
        return this.rgb();
      },
      clone: function () {
        var e = new Ce(),
          t = this.values,
          a = e.values,
          n,
          o;
        for (var l in t)
          t.hasOwnProperty(l) &&
            ((n = t[l]),
            (o = {}.toString.call(n)),
            o === "[object Array]"
              ? (a[l] = n.slice(0))
              : o === "[object Number]"
              ? (a[l] = n)
              : console.error("unexpected color value:", n));
        return e;
      },
    }),
      (Ce.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"],
      }),
      (Ce.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100],
      }),
      (Ce.prototype.getValues = function (e) {
        for (var t = this.values, a = {}, n = 0; n < e.length; n++)
          a[e.charAt(n)] = t[e][n];
        return t.alpha !== 1 && (a.a = t.alpha), a;
      }),
      (Ce.prototype.setValues = function (e, t) {
        var a = this.values,
          n = this.spaces,
          o = this.maxes,
          l = 1,
          u;
        if (((this.valid = !0), e === "alpha")) l = t;
        else if (t.length) (a[e] = t.slice(0, e.length)), (l = t[e.length]);
        else if (t[e.charAt(0)] !== void 0) {
          for (u = 0; u < e.length; u++) a[e][u] = t[e.charAt(u)];
          l = t.a;
        } else if (t[n[e][0]] !== void 0) {
          var h = n[e];
          for (u = 0; u < e.length; u++) a[e][u] = t[h[u]];
          l = t.alpha;
        }
        if (
          ((a.alpha = Math.max(0, Math.min(1, l === void 0 ? a.alpha : l))),
          e === "alpha")
        )
          return !1;
        var f;
        for (u = 0; u < e.length; u++)
          (f = Math.max(0, Math.min(o[e][u], a[e][u]))),
            (a[e][u] = Math.round(f));
        for (var v in n) v !== e && (a[v] = Je[e][v](a[e]));
        return !0;
      }),
      (Ce.prototype.setSpace = function (e, t) {
        var a = t[0];
        return a === void 0
          ? this.getValues(e)
          : (typeof a == "number" && (a = Array.prototype.slice.call(t)),
            this.setValues(e, a),
            this);
      }),
      (Ce.prototype.setChannel = function (e, t, a) {
        var n = this.values[e];
        return a === void 0
          ? n[t]
          : a === n[t]
          ? this
          : ((n[t] = a), this.setValues(e, n), this);
      }),
      typeof window < "u" && (window.Color = Ce);
    var Jr = Ce;
    function Ni(e) {
      return ["__proto__", "prototype", "constructor"].indexOf(e) === -1;
    }
    var U = {
        noop: function () {},
        uid: (function () {
          var e = 0;
          return function () {
            return e++;
          };
        })(),
        isNullOrUndef: function (e) {
          return e === null || typeof e > "u";
        },
        isArray: function (e) {
          if (Array.isArray && Array.isArray(e)) return !0;
          var t = Object.prototype.toString.call(e);
          return t.substr(0, 7) === "[object" && t.substr(-6) === "Array]";
        },
        isObject: function (e) {
          return (
            e !== null &&
            Object.prototype.toString.call(e) === "[object Object]"
          );
        },
        isFinite: function (e) {
          return (typeof e == "number" || e instanceof Number) && isFinite(e);
        },
        valueOrDefault: function (e, t) {
          return typeof e > "u" ? t : e;
        },
        valueAtIndexOrDefault: function (e, t, a) {
          return U.valueOrDefault(U.isArray(e) ? e[t] : e, a);
        },
        callback: function (e, t, a) {
          if (e && typeof e.call == "function") return e.apply(a, t);
        },
        each: function (e, t, a, n) {
          var o, l, u;
          if (U.isArray(e))
            if (((l = e.length), n))
              for (o = l - 1; o >= 0; o--) t.call(a, e[o], o);
            else for (o = 0; o < l; o++) t.call(a, e[o], o);
          else if (U.isObject(e))
            for (u = Object.keys(e), l = u.length, o = 0; o < l; o++)
              t.call(a, e[u[o]], u[o]);
        },
        arrayEquals: function (e, t) {
          var a, n, o, l;
          if (!e || !t || e.length !== t.length) return !1;
          for (a = 0, n = e.length; a < n; ++a)
            if (
              ((o = e[a]), (l = t[a]), o instanceof Array && l instanceof Array)
            ) {
              if (!U.arrayEquals(o, l)) return !1;
            } else if (o !== l) return !1;
          return !0;
        },
        clone: function (e) {
          if (U.isArray(e)) return e.map(U.clone);
          if (U.isObject(e)) {
            for (
              var t = Object.create(e), a = Object.keys(e), n = a.length, o = 0;
              o < n;
              ++o
            )
              t[a[o]] = U.clone(e[a[o]]);
            return t;
          }
          return e;
        },
        _merger: function (e, t, a, n) {
          if (!!Ni(e)) {
            var o = t[e],
              l = a[e];
            U.isObject(o) && U.isObject(l)
              ? U.merge(o, l, n)
              : (t[e] = U.clone(l));
          }
        },
        _mergerIf: function (e, t, a) {
          if (!!Ni(e)) {
            var n = t[e],
              o = a[e];
            U.isObject(n) && U.isObject(o)
              ? U.mergeIf(n, o)
              : t.hasOwnProperty(e) || (t[e] = U.clone(o));
          }
        },
        merge: function (e, t, a) {
          var n = U.isArray(t) ? t : [t],
            o = n.length,
            l,
            u,
            h,
            f,
            v;
          if (!U.isObject(e)) return e;
          for (a = a || {}, l = a.merger || U._merger, u = 0; u < o; ++u)
            if (((t = n[u]), !!U.isObject(t)))
              for (h = Object.keys(t), v = 0, f = h.length; v < f; ++v)
                l(h[v], e, t, a);
          return e;
        },
        mergeIf: function (e, t) {
          return U.merge(e, t, { merger: U._mergerIf });
        },
        extend:
          Object.assign ||
          function (e) {
            return U.merge(e, [].slice.call(arguments, 1), {
              merger: function (t, a, n) {
                a[t] = n[t];
              },
            });
          },
        inherits: function (e) {
          var t = this,
            a =
              e && e.hasOwnProperty("constructor")
                ? e.constructor
                : function () {
                    return t.apply(this, arguments);
                  },
            n = function () {
              this.constructor = a;
            };
          return (
            (n.prototype = t.prototype),
            (a.prototype = new n()),
            (a.extend = U.inherits),
            e && U.extend(a.prototype, e),
            (a.__super__ = t.prototype),
            a
          );
        },
        _deprecated: function (e, t, a, n) {
          t !== void 0 &&
            console.warn(
              e + ': "' + a + '" is deprecated. Please use "' + n + '" instead'
            );
        },
      },
      Fe = U;
    (U.callCallback = U.callback),
      (U.indexOf = function (e, t, a) {
        return Array.prototype.indexOf.call(e, t, a);
      }),
      (U.getValueOrDefault = U.valueOrDefault),
      (U.getValueAtIndexOrDefault = U.valueAtIndexOrDefault);
    var _r = {
        linear: function (e) {
          return e;
        },
        easeInQuad: function (e) {
          return e * e;
        },
        easeOutQuad: function (e) {
          return -e * (e - 2);
        },
        easeInOutQuad: function (e) {
          return (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
        },
        easeInCubic: function (e) {
          return e * e * e;
        },
        easeOutCubic: function (e) {
          return (e = e - 1) * e * e + 1;
        },
        easeInOutCubic: function (e) {
          return (e /= 0.5) < 1
            ? 0.5 * e * e * e
            : 0.5 * ((e -= 2) * e * e + 2);
        },
        easeInQuart: function (e) {
          return e * e * e * e;
        },
        easeOutQuart: function (e) {
          return -((e = e - 1) * e * e * e - 1);
        },
        easeInOutQuart: function (e) {
          return (e /= 0.5) < 1
            ? 0.5 * e * e * e * e
            : -0.5 * ((e -= 2) * e * e * e - 2);
        },
        easeInQuint: function (e) {
          return e * e * e * e * e;
        },
        easeOutQuint: function (e) {
          return (e = e - 1) * e * e * e * e + 1;
        },
        easeInOutQuint: function (e) {
          return (e /= 0.5) < 1
            ? 0.5 * e * e * e * e * e
            : 0.5 * ((e -= 2) * e * e * e * e + 2);
        },
        easeInSine: function (e) {
          return -Math.cos(e * (Math.PI / 2)) + 1;
        },
        easeOutSine: function (e) {
          return Math.sin(e * (Math.PI / 2));
        },
        easeInOutSine: function (e) {
          return -0.5 * (Math.cos(Math.PI * e) - 1);
        },
        easeInExpo: function (e) {
          return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
        },
        easeOutExpo: function (e) {
          return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
        },
        easeInOutExpo: function (e) {
          return e === 0
            ? 0
            : e === 1
            ? 1
            : (e /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (e - 1))
            : 0.5 * (-Math.pow(2, -10 * --e) + 2);
        },
        easeInCirc: function (e) {
          return e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1);
        },
        easeOutCirc: function (e) {
          return Math.sqrt(1 - (e = e - 1) * e);
        },
        easeInOutCirc: function (e) {
          return (e /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - e * e) - 1)
            : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
        },
        easeInElastic: function (e) {
          var t = 1.70158,
            a = 0,
            n = 1;
          return e === 0
            ? 0
            : e === 1
            ? 1
            : (a || (a = 0.3),
              (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              -(
                n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / a)
              ));
        },
        easeOutElastic: function (e) {
          var t = 1.70158,
            a = 0,
            n = 1;
          return e === 0
            ? 0
            : e === 1
            ? 1
            : (a || (a = 0.3),
              (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              n *
                Math.pow(2, -10 * e) *
                Math.sin(((e - t) * (2 * Math.PI)) / a) +
                1);
        },
        easeInOutElastic: function (e) {
          var t = 1.70158,
            a = 0,
            n = 1;
          return e === 0
            ? 0
            : (e /= 0.5) === 2
            ? 1
            : (a || (a = 0.45),
              (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              e < 1
                ? -0.5 *
                  (n *
                    Math.pow(2, 10 * (e -= 1)) *
                    Math.sin(((e - t) * (2 * Math.PI)) / a))
                : n *
                    Math.pow(2, -10 * (e -= 1)) *
                    Math.sin(((e - t) * (2 * Math.PI)) / a) *
                    0.5 +
                  1);
        },
        easeInBack: function (e) {
          var t = 1.70158;
          return e * e * ((t + 1) * e - t);
        },
        easeOutBack: function (e) {
          var t = 1.70158;
          return (e = e - 1) * e * ((t + 1) * e + t) + 1;
        },
        easeInOutBack: function (e) {
          var t = 1.70158;
          return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
        },
        easeInBounce: function (e) {
          return 1 - _r.easeOutBounce(1 - e);
        },
        easeOutBounce: function (e) {
          return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
        },
        easeInOutBounce: function (e) {
          return e < 0.5
            ? _r.easeInBounce(e * 2) * 0.5
            : _r.easeOutBounce(e * 2 - 1) * 0.5 + 0.5;
        },
      },
      bl = { effects: _r };
    Fe.easingEffects = _r;
    var xe = Math.PI,
      yl = xe / 180,
      _l = xe * 2,
      Ie = xe / 2,
      xr = xe / 4,
      Ri = (xe * 2) / 3,
      ea = {
        clear: function (e) {
          e.ctx.clearRect(0, 0, e.width, e.height);
        },
        roundedRect: function (e, t, a, n, o, l) {
          if (l) {
            var u = Math.min(l, o / 2, n / 2),
              h = t + u,
              f = a + u,
              v = t + n - u,
              g = a + o - u;
            e.moveTo(t, f),
              h < v && f < g
                ? (e.arc(h, f, u, -xe, -Ie),
                  e.arc(v, f, u, -Ie, 0),
                  e.arc(v, g, u, 0, Ie),
                  e.arc(h, g, u, Ie, xe))
                : h < v
                ? (e.moveTo(h, a),
                  e.arc(v, f, u, -Ie, Ie),
                  e.arc(h, f, u, Ie, xe + Ie))
                : f < g
                ? (e.arc(h, f, u, -xe, 0), e.arc(h, g, u, 0, xe))
                : e.arc(h, f, u, -xe, xe),
              e.closePath(),
              e.moveTo(t, a);
          } else e.rect(t, a, n, o);
        },
        drawPoint: function (e, t, a, n, o, l) {
          var u,
            h,
            f,
            v,
            g,
            m = (l || 0) * yl;
          if (
            t &&
            typeof t == "object" &&
            ((u = t.toString()),
            u === "[object HTMLImageElement]" ||
              u === "[object HTMLCanvasElement]")
          ) {
            e.save(),
              e.translate(n, o),
              e.rotate(m),
              e.drawImage(t, -t.width / 2, -t.height / 2, t.width, t.height),
              e.restore();
            return;
          }
          if (!(isNaN(a) || a <= 0)) {
            switch ((e.beginPath(), t)) {
              default:
                e.arc(n, o, a, 0, _l), e.closePath();
                break;
              case "triangle":
                e.moveTo(n + Math.sin(m) * a, o - Math.cos(m) * a),
                  (m += Ri),
                  e.lineTo(n + Math.sin(m) * a, o - Math.cos(m) * a),
                  (m += Ri),
                  e.lineTo(n + Math.sin(m) * a, o - Math.cos(m) * a),
                  e.closePath();
                break;
              case "rectRounded":
                (g = a * 0.516),
                  (v = a - g),
                  (h = Math.cos(m + xr) * v),
                  (f = Math.sin(m + xr) * v),
                  e.arc(n - h, o - f, g, m - xe, m - Ie),
                  e.arc(n + f, o - h, g, m - Ie, m),
                  e.arc(n + h, o + f, g, m, m + Ie),
                  e.arc(n - f, o + h, g, m + Ie, m + xe),
                  e.closePath();
                break;
              case "rect":
                if (!l) {
                  (v = Math.SQRT1_2 * a), e.rect(n - v, o - v, 2 * v, 2 * v);
                  break;
                }
                m += xr;
              case "rectRot":
                (h = Math.cos(m) * a),
                  (f = Math.sin(m) * a),
                  e.moveTo(n - h, o - f),
                  e.lineTo(n + f, o - h),
                  e.lineTo(n + h, o + f),
                  e.lineTo(n - f, o + h),
                  e.closePath();
                break;
              case "crossRot":
                m += xr;
              case "cross":
                (h = Math.cos(m) * a),
                  (f = Math.sin(m) * a),
                  e.moveTo(n - h, o - f),
                  e.lineTo(n + h, o + f),
                  e.moveTo(n + f, o - h),
                  e.lineTo(n - f, o + h);
                break;
              case "star":
                (h = Math.cos(m) * a),
                  (f = Math.sin(m) * a),
                  e.moveTo(n - h, o - f),
                  e.lineTo(n + h, o + f),
                  e.moveTo(n + f, o - h),
                  e.lineTo(n - f, o + h),
                  (m += xr),
                  (h = Math.cos(m) * a),
                  (f = Math.sin(m) * a),
                  e.moveTo(n - h, o - f),
                  e.lineTo(n + h, o + f),
                  e.moveTo(n + f, o - h),
                  e.lineTo(n - f, o + h);
                break;
              case "line":
                (h = Math.cos(m) * a),
                  (f = Math.sin(m) * a),
                  e.moveTo(n - h, o - f),
                  e.lineTo(n + h, o + f);
                break;
              case "dash":
                e.moveTo(n, o),
                  e.lineTo(n + Math.cos(m) * a, o + Math.sin(m) * a);
                break;
            }
            e.fill(), e.stroke();
          }
        },
        _isPointInArea: function (e, t) {
          var a = 1e-6;
          return (
            e.x > t.left - a &&
            e.x < t.right + a &&
            e.y > t.top - a &&
            e.y < t.bottom + a
          );
        },
        clipArea: function (e, t) {
          e.save(),
            e.beginPath(),
            e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top),
            e.clip();
        },
        unclipArea: function (e) {
          e.restore();
        },
        lineTo: function (e, t, a, n) {
          var o = a.steppedLine;
          if (o) {
            if (o === "middle") {
              var l = (t.x + a.x) / 2;
              e.lineTo(l, n ? a.y : t.y), e.lineTo(l, n ? t.y : a.y);
            } else
              (o === "after" && !n) || (o !== "after" && n)
                ? e.lineTo(t.x, a.y)
                : e.lineTo(a.x, t.y);
            e.lineTo(a.x, a.y);
            return;
          }
          if (!a.tension) {
            e.lineTo(a.x, a.y);
            return;
          }
          e.bezierCurveTo(
            n ? t.controlPointPreviousX : t.controlPointNextX,
            n ? t.controlPointPreviousY : t.controlPointNextY,
            n ? a.controlPointNextX : a.controlPointPreviousX,
            n ? a.controlPointNextY : a.controlPointPreviousY,
            a.x,
            a.y
          );
        },
      },
      xl = ea;
    (Fe.clear = ea.clear),
      (Fe.drawRoundedRectangle = function (e) {
        e.beginPath(), ea.roundedRect.apply(ea, arguments);
      });
    var Li = {
      _set: function (e, t) {
        return Fe.merge(this[e] || (this[e] = {}), t);
      },
    };
    Li._set("global", {
      defaultColor: "rgba(0,0,0,0.1)",
      defaultFontColor: "#666",
      defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      defaultFontSize: 12,
      defaultFontStyle: "normal",
      defaultLineHeight: 1.2,
      showLines: !0,
    });
    var N = Li,
      ta = Fe.valueOrDefault;
    function wl(e) {
      return !e || Fe.isNullOrUndef(e.size) || Fe.isNullOrUndef(e.family)
        ? null
        : (e.style ? e.style + " " : "") +
            (e.weight ? e.weight + " " : "") +
            e.size +
            "px " +
            e.family;
    }
    var Ml = {
        toLineHeight: function (e, t) {
          var a = ("" + e).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
          if (!a || a[1] === "normal") return t * 1.2;
          switch (((e = +a[2]), a[3])) {
            case "px":
              return e;
            case "%":
              e /= 100;
              break;
          }
          return t * e;
        },
        toPadding: function (e) {
          var t, a, n, o;
          return (
            Fe.isObject(e)
              ? ((t = +e.top || 0),
                (a = +e.right || 0),
                (n = +e.bottom || 0),
                (o = +e.left || 0))
              : (t = a = n = o = +e || 0),
            {
              top: t,
              right: a,
              bottom: n,
              left: o,
              height: t + n,
              width: o + a,
            }
          );
        },
        _parseFont: function (e) {
          var t = N.global,
            a = ta(e.fontSize, t.defaultFontSize),
            n = {
              family: ta(e.fontFamily, t.defaultFontFamily),
              lineHeight: Fe.options.toLineHeight(
                ta(e.lineHeight, t.defaultLineHeight),
                a
              ),
              size: a,
              style: ta(e.fontStyle, t.defaultFontStyle),
              weight: null,
              string: "",
            };
          return (n.string = wl(n)), n;
        },
        resolve: function (e, t, a, n) {
          var o = !0,
            l,
            u,
            h;
          for (l = 0, u = e.length; l < u; ++l)
            if (
              ((h = e[l]),
              h !== void 0 &&
                (t !== void 0 &&
                  typeof h == "function" &&
                  ((h = h(t)), (o = !1)),
                a !== void 0 && Fe.isArray(h) && ((h = h[a]), (o = !1)),
                h !== void 0))
            )
              return n && !o && (n.cacheable = !1), h;
        },
      },
      Wi = {
        _factorize: function (e) {
          var t = [],
            a = Math.sqrt(e),
            n;
          for (n = 1; n < a; n++) e % n === 0 && (t.push(n), t.push(e / n));
          return (
            a === (a | 0) && t.push(a),
            t
              .sort(function (o, l) {
                return o - l;
              })
              .pop(),
            t
          );
        },
        log10:
          Math.log10 ||
          function (e) {
            var t = Math.log(e) * Math.LOG10E,
              a = Math.round(t),
              n = e === Math.pow(10, a);
            return n ? a : t;
          },
      },
      kl = Wi;
    Fe.log10 = Wi.log10;
    var Sl = function (e, t) {
        return {
          x: function (a) {
            return e + e + t - a;
          },
          setWidth: function (a) {
            t = a;
          },
          textAlign: function (a) {
            return a === "center" ? a : a === "right" ? "left" : "right";
          },
          xPlus: function (a, n) {
            return a - n;
          },
          leftForLtr: function (a, n) {
            return a - n;
          },
        };
      },
      Dl = function () {
        return {
          x: function (e) {
            return e;
          },
          setWidth: function (e) {},
          textAlign: function (e) {
            return e;
          },
          xPlus: function (e, t) {
            return e + t;
          },
          leftForLtr: function (e, t) {
            return e;
          },
        };
      },
      Tl = function (e, t, a) {
        return e ? Sl(t, a) : Dl();
      },
      Cl = function (e, t) {
        var a, n;
        (t === "ltr" || t === "rtl") &&
          ((a = e.canvas.style),
          (n = [
            a.getPropertyValue("direction"),
            a.getPropertyPriority("direction"),
          ]),
          a.setProperty("direction", t, "important"),
          (e.prevTextDirection = n));
      },
      Ol = function (e) {
        var t = e.prevTextDirection;
        t !== void 0 &&
          (delete e.prevTextDirection,
          e.canvas.style.setProperty("direction", t[0], t[1]));
      },
      Pl = {
        getRtlAdapter: Tl,
        overrideTextDirection: Cl,
        restoreTextDirection: Ol,
      },
      b = Fe,
      Fl = bl,
      Il = xl,
      Al = Ml,
      Nl = kl,
      Rl = Pl;
    (b.easing = Fl),
      (b.canvas = Il),
      (b.options = Al),
      (b.math = Nl),
      (b.rtl = Rl);
    function Ll(e, t, a, n) {
      var o = Object.keys(a),
        l,
        u,
        h,
        f,
        v,
        g,
        m,
        y,
        x;
      for (l = 0, u = o.length; l < u; ++l)
        if (
          ((h = o[l]),
          (g = a[h]),
          t.hasOwnProperty(h) || (t[h] = g),
          (f = t[h]),
          !(f === g || h[0] === "_"))
        ) {
          if (
            (e.hasOwnProperty(h) || (e[h] = f),
            (v = e[h]),
            (m = typeof g),
            m === typeof v)
          ) {
            if (m === "string") {
              if (((y = Jr(v)), y.valid && ((x = Jr(g)), x.valid))) {
                t[h] = x.mix(y, n).rgbString();
                continue;
              }
            } else if (b.isFinite(v) && b.isFinite(g)) {
              t[h] = v + (g - v) * n;
              continue;
            }
          }
          t[h] = g;
        }
    }
    var nn = function (e) {
      b.extend(this, e), this.initialize.apply(this, arguments);
    };
    b.extend(nn.prototype, {
      _type: void 0,
      initialize: function () {
        this.hidden = !1;
      },
      pivot: function () {
        var e = this;
        return (
          e._view || (e._view = b.extend({}, e._model)), (e._start = {}), e
        );
      },
      transition: function (e) {
        var t = this,
          a = t._model,
          n = t._start,
          o = t._view;
        return !a || e === 1
          ? ((t._view = b.extend({}, a)), (t._start = null), t)
          : (o || (o = t._view = {}),
            n || (n = t._start = {}),
            Ll(n, o, a, e),
            t);
      },
      tooltipPosition: function () {
        return { x: this._model.x, y: this._model.y };
      },
      hasValue: function () {
        return b.isNumber(this._model.x) && b.isNumber(this._model.y);
      },
    }),
      (nn.extend = b.inherits);
    var je = nn,
      on = je.extend({
        chart: null,
        currentStep: 0,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null,
      }),
      sn = on;
    Object.defineProperty(on.prototype, "animationObject", {
      get: function () {
        return this;
      },
    }),
      Object.defineProperty(on.prototype, "chartInstance", {
        get: function () {
          return this.chart;
        },
        set: function (e) {
          this.chart = e;
        },
      }),
      N._set("global", {
        animation: {
          duration: 1e3,
          easing: "easeOutQuart",
          onProgress: b.noop,
          onComplete: b.noop,
        },
      });
    var ln = {
        animations: [],
        request: null,
        addAnimation: function (e, t, a, n) {
          var o = this.animations,
            l,
            u;
          for (
            t.chart = e,
              t.startTime = Date.now(),
              t.duration = a,
              n || (e.animating = !0),
              l = 0,
              u = o.length;
            l < u;
            ++l
          )
            if (o[l].chart === e) {
              o[l] = t;
              return;
            }
          o.push(t), o.length === 1 && this.requestAnimationFrame();
        },
        cancelAnimation: function (e) {
          var t = b.findIndex(this.animations, function (a) {
            return a.chart === e;
          });
          t !== -1 && (this.animations.splice(t, 1), (e.animating = !1));
        },
        requestAnimationFrame: function () {
          var e = this;
          e.request === null &&
            (e.request = b.requestAnimFrame.call(window, function () {
              (e.request = null), e.startDigest();
            }));
        },
        startDigest: function () {
          var e = this;
          e.advance(), e.animations.length > 0 && e.requestAnimationFrame();
        },
        advance: function () {
          for (var e = this.animations, t, a, n, o, l = 0; l < e.length; )
            (t = e[l]),
              (a = t.chart),
              (n = t.numSteps),
              (o =
                Math.floor(((Date.now() - t.startTime) / t.duration) * n) + 1),
              (t.currentStep = Math.min(o, n)),
              b.callback(t.render, [a, t], a),
              b.callback(t.onAnimationProgress, [t], a),
              t.currentStep >= n
                ? (b.callback(t.onAnimationComplete, [t], a),
                  (a.animating = !1),
                  e.splice(l, 1))
                : ++l;
        },
      },
      Zt = b.options.resolve,
      Ei = ["push", "pop", "shift", "splice", "unshift"];
    function Wl(e, t) {
      if (e._chartjs) {
        e._chartjs.listeners.push(t);
        return;
      }
      Object.defineProperty(e, "_chartjs", {
        configurable: !0,
        enumerable: !1,
        value: { listeners: [t] },
      }),
        Ei.forEach(function (a) {
          var n = "onData" + a.charAt(0).toUpperCase() + a.slice(1),
            o = e[a];
          Object.defineProperty(e, a, {
            configurable: !0,
            enumerable: !1,
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                u = o.apply(this, l);
              return (
                b.each(e._chartjs.listeners, function (h) {
                  typeof h[n] == "function" && h[n].apply(h, l);
                }),
                u
              );
            },
          });
        });
    }
    function Yi(e, t) {
      var a = e._chartjs;
      if (!!a) {
        var n = a.listeners,
          o = n.indexOf(t);
        o !== -1 && n.splice(o, 1),
          !(n.length > 0) &&
            (Ei.forEach(function (l) {
              delete e[l];
            }),
            delete e._chartjs);
      }
    }
    var un = function (e, t) {
      this.initialize(e, t);
    };
    b.extend(un.prototype, {
      datasetElementType: null,
      dataElementType: null,
      _datasetElementOptions: [
        "backgroundColor",
        "borderCapStyle",
        "borderColor",
        "borderDash",
        "borderDashOffset",
        "borderJoinStyle",
        "borderWidth",
      ],
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "pointStyle",
      ],
      initialize: function (e, t) {
        var a = this;
        (a.chart = e),
          (a.index = t),
          a.linkScales(),
          a.addElements(),
          (a._type = a.getMeta().type);
      },
      updateIndex: function (e) {
        this.index = e;
      },
      linkScales: function () {
        var e = this,
          t = e.getMeta(),
          a = e.chart,
          n = a.scales,
          o = e.getDataset(),
          l = a.options.scales;
        (t.xAxisID === null || !(t.xAxisID in n) || o.xAxisID) &&
          (t.xAxisID = o.xAxisID || l.xAxes[0].id),
          (t.yAxisID === null || !(t.yAxisID in n) || o.yAxisID) &&
            (t.yAxisID = o.yAxisID || l.yAxes[0].id);
      },
      getDataset: function () {
        return this.chart.data.datasets[this.index];
      },
      getMeta: function () {
        return this.chart.getDatasetMeta(this.index);
      },
      getScaleForId: function (e) {
        return this.chart.scales[e];
      },
      _getValueScaleId: function () {
        return this.getMeta().yAxisID;
      },
      _getIndexScaleId: function () {
        return this.getMeta().xAxisID;
      },
      _getValueScale: function () {
        return this.getScaleForId(this._getValueScaleId());
      },
      _getIndexScale: function () {
        return this.getScaleForId(this._getIndexScaleId());
      },
      reset: function () {
        this._update(!0);
      },
      destroy: function () {
        this._data && Yi(this._data, this);
      },
      createMetaDataset: function () {
        var e = this,
          t = e.datasetElementType;
        return t && new t({ _chart: e.chart, _datasetIndex: e.index });
      },
      createMetaData: function (e) {
        var t = this,
          a = t.dataElementType;
        return (
          a && new a({ _chart: t.chart, _datasetIndex: t.index, _index: e })
        );
      },
      addElements: function () {
        var e = this,
          t = e.getMeta(),
          a = e.getDataset().data || [],
          n = t.data,
          o,
          l;
        for (o = 0, l = a.length; o < l; ++o)
          n[o] = n[o] || e.createMetaData(o);
        t.dataset = t.dataset || e.createMetaDataset();
      },
      addElementAndReset: function (e) {
        var t = this.createMetaData(e);
        this.getMeta().data.splice(e, 0, t), this.updateElement(t, e, !0);
      },
      buildOrUpdateElements: function () {
        var e = this,
          t = e.getDataset(),
          a = t.data || (t.data = []);
        e._data !== a &&
          (e._data && Yi(e._data, e),
          a && Object.isExtensible(a) && Wl(a, e),
          (e._data = a)),
          e.resyncElements();
      },
      _configure: function () {
        var e = this;
        e._config = b.merge(
          Object.create(null),
          [e.chart.options.datasets[e._type], e.getDataset()],
          {
            merger: function (t, a, n) {
              t !== "_meta" && t !== "data" && b._merger(t, a, n);
            },
          }
        );
      },
      _update: function (e) {
        var t = this;
        t._configure(), (t._cachedDataOpts = null), t.update(e);
      },
      update: b.noop,
      transition: function (e) {
        for (
          var t = this.getMeta(), a = t.data || [], n = a.length, o = 0;
          o < n;
          ++o
        )
          a[o].transition(e);
        t.dataset && t.dataset.transition(e);
      },
      draw: function () {
        var e = this.getMeta(),
          t = e.data || [],
          a = t.length,
          n = 0;
        for (e.dataset && e.dataset.draw(); n < a; ++n) t[n].draw();
      },
      getStyle: function (e) {
        var t = this,
          a = t.getMeta(),
          n = a.dataset,
          o;
        return (
          t._configure(),
          n && e === void 0
            ? (o = t._resolveDatasetElementOptions(n || {}))
            : ((e = e || 0),
              (o = t._resolveDataElementOptions(a.data[e] || {}, e))),
          (o.fill === !1 || o.fill === null) &&
            (o.backgroundColor = o.borderColor),
          o
        );
      },
      _resolveDatasetElementOptions: function (e, t) {
        var a = this,
          n = a.chart,
          o = a._config,
          l = e.custom || {},
          u = n.options.elements[a.datasetElementType.prototype._type] || {},
          h = a._datasetElementOptions,
          f = {},
          v,
          g,
          m,
          y,
          x = {
            chart: n,
            dataset: a.getDataset(),
            datasetIndex: a.index,
            hover: t,
          };
        for (v = 0, g = h.length; v < g; ++v)
          (m = h[v]),
            (y = t ? "hover" + m.charAt(0).toUpperCase() + m.slice(1) : m),
            (f[m] = Zt([l[y], o[y], u[y]], x));
        return f;
      },
      _resolveDataElementOptions: function (e, t) {
        var a = this,
          n = e && e.custom,
          o = a._cachedDataOpts;
        if (o && !n) return o;
        var l = a.chart,
          u = a._config,
          h = l.options.elements[a.dataElementType.prototype._type] || {},
          f = a._dataElementOptions,
          v = {},
          g = {
            chart: l,
            dataIndex: t,
            dataset: a.getDataset(),
            datasetIndex: a.index,
          },
          m = { cacheable: !n },
          y,
          x,
          w,
          M;
        if (((n = n || {}), b.isArray(f)))
          for (x = 0, w = f.length; x < w; ++x)
            (M = f[x]), (v[M] = Zt([n[M], u[M], h[M]], g, t, m));
        else
          for (y = Object.keys(f), x = 0, w = y.length; x < w; ++x)
            (M = y[x]), (v[M] = Zt([n[M], u[f[M]], u[M], h[M]], g, t, m));
        return m.cacheable && (a._cachedDataOpts = Object.freeze(v)), v;
      },
      removeHoverStyle: function (e) {
        b.merge(e._model, e.$previousStyle || {}), delete e.$previousStyle;
      },
      setHoverStyle: function (e) {
        var t = this.chart.data.datasets[e._datasetIndex],
          a = e._index,
          n = e.custom || {},
          o = e._model,
          l = b.getHoverColor;
        (e.$previousStyle = {
          backgroundColor: o.backgroundColor,
          borderColor: o.borderColor,
          borderWidth: o.borderWidth,
        }),
          (o.backgroundColor = Zt(
            [
              n.hoverBackgroundColor,
              t.hoverBackgroundColor,
              l(o.backgroundColor),
            ],
            void 0,
            a
          )),
          (o.borderColor = Zt(
            [n.hoverBorderColor, t.hoverBorderColor, l(o.borderColor)],
            void 0,
            a
          )),
          (o.borderWidth = Zt(
            [n.hoverBorderWidth, t.hoverBorderWidth, o.borderWidth],
            void 0,
            a
          ));
      },
      _removeDatasetHoverStyle: function () {
        var e = this.getMeta().dataset;
        e && this.removeHoverStyle(e);
      },
      _setDatasetHoverStyle: function () {
        var e = this.getMeta().dataset,
          t = {},
          a,
          n,
          o,
          l,
          u,
          h;
        if (!!e) {
          for (
            h = e._model,
              u = this._resolveDatasetElementOptions(e, !0),
              l = Object.keys(u),
              a = 0,
              n = l.length;
            a < n;
            ++a
          )
            (o = l[a]), (t[o] = h[o]), (h[o] = u[o]);
          e.$previousStyle = t;
        }
      },
      resyncElements: function () {
        var e = this,
          t = e.getMeta(),
          a = e.getDataset().data,
          n = t.data.length,
          o = a.length;
        o < n ? t.data.splice(o, n - o) : o > n && e.insertElements(n, o - n);
      },
      insertElements: function (e, t) {
        for (var a = 0; a < t; ++a) this.addElementAndReset(e + a);
      },
      onDataPush: function () {
        var e = arguments.length;
        this.insertElements(this.getDataset().data.length - e, e);
      },
      onDataPop: function () {
        this.getMeta().data.pop();
      },
      onDataShift: function () {
        this.getMeta().data.shift();
      },
      onDataSplice: function (e, t) {
        this.getMeta().data.splice(e, t),
          this.insertElements(e, arguments.length - 2);
      },
      onDataUnshift: function () {
        this.insertElements(0, arguments.length);
      },
    }),
      (un.extend = b.inherits);
    var Ae = un,
      $e = Math.PI * 2;
    N._set("global", {
      elements: {
        arc: {
          backgroundColor: N.global.defaultColor,
          borderColor: "#fff",
          borderWidth: 2,
          borderAlign: "center",
        },
      },
    });
    function zi(e, t) {
      var a = t.startAngle,
        n = t.endAngle,
        o = t.pixelMargin,
        l = o / t.outerRadius,
        u = t.x,
        h = t.y;
      e.beginPath(),
        e.arc(u, h, t.outerRadius, a - l, n + l),
        t.innerRadius > o
          ? ((l = o / t.innerRadius),
            e.arc(u, h, t.innerRadius - o, n + l, a - l, !0))
          : e.arc(u, h, o, n + Math.PI / 2, a - Math.PI / 2),
        e.closePath(),
        e.clip();
    }
    function El(e, t, a, n) {
      var o = a.endAngle,
        l;
      for (
        n &&
          ((a.endAngle = a.startAngle + $e),
          zi(e, a),
          (a.endAngle = o),
          a.endAngle === a.startAngle &&
            a.fullCircles &&
            ((a.endAngle += $e), a.fullCircles--)),
          e.beginPath(),
          e.arc(a.x, a.y, a.innerRadius, a.startAngle + $e, a.startAngle, !0),
          l = 0;
        l < a.fullCircles;
        ++l
      )
        e.stroke();
      for (
        e.beginPath(),
          e.arc(a.x, a.y, t.outerRadius, a.startAngle, a.startAngle + $e),
          l = 0;
        l < a.fullCircles;
        ++l
      )
        e.stroke();
    }
    function Yl(e, t, a) {
      var n = t.borderAlign === "inner";
      n
        ? ((e.lineWidth = t.borderWidth * 2), (e.lineJoin = "round"))
        : ((e.lineWidth = t.borderWidth), (e.lineJoin = "bevel")),
        a.fullCircles && El(e, t, a, n),
        n && zi(e, a),
        e.beginPath(),
        e.arc(a.x, a.y, t.outerRadius, a.startAngle, a.endAngle),
        e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0),
        e.closePath(),
        e.stroke();
    }
    var zl = je.extend({
        _type: "arc",
        inLabelRange: function (e) {
          var t = this._view;
          return t
            ? Math.pow(e - t.x, 2) < Math.pow(t.radius + t.hoverRadius, 2)
            : !1;
        },
        inRange: function (e, t) {
          var a = this._view;
          if (a) {
            for (
              var n = b.getAngleFromPoint(a, { x: e, y: t }),
                o = n.angle,
                l = n.distance,
                u = a.startAngle,
                h = a.endAngle;
              h < u;

            )
              h += $e;
            for (; o > h; ) o -= $e;
            for (; o < u; ) o += $e;
            var f = o >= u && o <= h,
              v = l >= a.innerRadius && l <= a.outerRadius;
            return f && v;
          }
          return !1;
        },
        getCenterPoint: function () {
          var e = this._view,
            t = (e.startAngle + e.endAngle) / 2,
            a = (e.innerRadius + e.outerRadius) / 2;
          return { x: e.x + Math.cos(t) * a, y: e.y + Math.sin(t) * a };
        },
        getArea: function () {
          var e = this._view;
          return (
            Math.PI *
            ((e.endAngle - e.startAngle) / (2 * Math.PI)) *
            (Math.pow(e.outerRadius, 2) - Math.pow(e.innerRadius, 2))
          );
        },
        tooltipPosition: function () {
          var e = this._view,
            t = e.startAngle + (e.endAngle - e.startAngle) / 2,
            a = (e.outerRadius - e.innerRadius) / 2 + e.innerRadius;
          return { x: e.x + Math.cos(t) * a, y: e.y + Math.sin(t) * a };
        },
        draw: function () {
          var e = this._chart.ctx,
            t = this._view,
            a = t.borderAlign === "inner" ? 0.33 : 0,
            n = {
              x: t.x,
              y: t.y,
              innerRadius: t.innerRadius,
              outerRadius: Math.max(t.outerRadius - a, 0),
              pixelMargin: a,
              startAngle: t.startAngle,
              endAngle: t.endAngle,
              fullCircles: Math.floor(t.circumference / $e),
            },
            o;
          if (
            (e.save(),
            (e.fillStyle = t.backgroundColor),
            (e.strokeStyle = t.borderColor),
            n.fullCircles)
          ) {
            for (
              n.endAngle = n.startAngle + $e,
                e.beginPath(),
                e.arc(n.x, n.y, n.outerRadius, n.startAngle, n.endAngle),
                e.arc(n.x, n.y, n.innerRadius, n.endAngle, n.startAngle, !0),
                e.closePath(),
                o = 0;
              o < n.fullCircles;
              ++o
            )
              e.fill();
            n.endAngle = n.startAngle + (t.circumference % $e);
          }
          e.beginPath(),
            e.arc(n.x, n.y, n.outerRadius, n.startAngle, n.endAngle),
            e.arc(n.x, n.y, n.innerRadius, n.endAngle, n.startAngle, !0),
            e.closePath(),
            e.fill(),
            t.borderWidth && Yl(e, t, n),
            e.restore();
        },
      }),
      Bi = b.valueOrDefault,
      Hi = N.global.defaultColor;
    N._set("global", {
      elements: {
        line: {
          tension: 0.4,
          backgroundColor: Hi,
          borderWidth: 3,
          borderColor: Hi,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          capBezierPoints: !0,
          fill: !0,
        },
      },
    });
    var Bl = je.extend({
        _type: "line",
        draw: function () {
          var e = this,
            t = e._view,
            a = e._chart.ctx,
            n = t.spanGaps,
            o = e._children.slice(),
            l = N.global,
            u = l.elements.line,
            h = -1,
            f = e._loop,
            v,
            g,
            m;
          if (!!o.length) {
            if (e._loop) {
              for (v = 0; v < o.length; ++v)
                if (
                  ((g = b.previousItem(o, v)), !o[v]._view.skip && g._view.skip)
                ) {
                  (o = o.slice(v).concat(o.slice(0, v))), (f = n);
                  break;
                }
              f && o.push(o[0]);
            }
            for (
              a.save(),
                a.lineCap = t.borderCapStyle || u.borderCapStyle,
                a.setLineDash && a.setLineDash(t.borderDash || u.borderDash),
                a.lineDashOffset = Bi(t.borderDashOffset, u.borderDashOffset),
                a.lineJoin = t.borderJoinStyle || u.borderJoinStyle,
                a.lineWidth = Bi(t.borderWidth, u.borderWidth),
                a.strokeStyle = t.borderColor || l.defaultColor,
                a.beginPath(),
                m = o[0]._view,
                m.skip || (a.moveTo(m.x, m.y), (h = 0)),
                v = 1;
              v < o.length;
              ++v
            )
              (m = o[v]._view),
                (g = h === -1 ? b.previousItem(o, v) : o[h]),
                m.skip ||
                  ((h !== v - 1 && !n) || h === -1
                    ? a.moveTo(m.x, m.y)
                    : b.canvas.lineTo(a, g._view, m),
                  (h = v));
            f && a.closePath(), a.stroke(), a.restore();
          }
        },
      }),
      Hl = b.valueOrDefault,
      Vi = N.global.defaultColor;
    N._set("global", {
      elements: {
        point: {
          radius: 3,
          pointStyle: "circle",
          backgroundColor: Vi,
          borderColor: Vi,
          borderWidth: 1,
          hitRadius: 1,
          hoverRadius: 4,
          hoverBorderWidth: 1,
        },
      },
    });
    function Ui(e) {
      var t = this._view;
      return t ? Math.abs(e - t.x) < t.radius + t.hitRadius : !1;
    }
    function Vl(e) {
      var t = this._view;
      return t ? Math.abs(e - t.y) < t.radius + t.hitRadius : !1;
    }
    var Ul = je.extend({
        _type: "point",
        inRange: function (e, t) {
          var a = this._view;
          return a
            ? Math.pow(e - a.x, 2) + Math.pow(t - a.y, 2) <
                Math.pow(a.hitRadius + a.radius, 2)
            : !1;
        },
        inLabelRange: Ui,
        inXRange: Ui,
        inYRange: Vl,
        getCenterPoint: function () {
          var e = this._view;
          return { x: e.x, y: e.y };
        },
        getArea: function () {
          return Math.PI * Math.pow(this._view.radius, 2);
        },
        tooltipPosition: function () {
          var e = this._view;
          return { x: e.x, y: e.y, padding: e.radius + e.borderWidth };
        },
        draw: function (e) {
          var t = this._view,
            a = this._chart.ctx,
            n = t.pointStyle,
            o = t.rotation,
            l = t.radius,
            u = t.x,
            h = t.y,
            f = N.global,
            v = f.defaultColor;
          t.skip ||
            ((e === void 0 || b.canvas._isPointInArea(t, e)) &&
              ((a.strokeStyle = t.borderColor || v),
              (a.lineWidth = Hl(t.borderWidth, f.elements.point.borderWidth)),
              (a.fillStyle = t.backgroundColor || v),
              b.canvas.drawPoint(a, n, l, u, h, o)));
        },
      }),
      ji = N.global.defaultColor;
    N._set("global", {
      elements: {
        rectangle: {
          backgroundColor: ji,
          borderColor: ji,
          borderSkipped: "bottom",
          borderWidth: 0,
        },
      },
    });
    function ra(e) {
      return e && e.width !== void 0;
    }
    function $i(e) {
      var t, a, n, o, l;
      return (
        ra(e)
          ? ((l = e.width / 2),
            (t = e.x - l),
            (a = e.x + l),
            (n = Math.min(e.y, e.base)),
            (o = Math.max(e.y, e.base)))
          : ((l = e.height / 2),
            (t = Math.min(e.x, e.base)),
            (a = Math.max(e.x, e.base)),
            (n = e.y - l),
            (o = e.y + l)),
        { left: t, top: n, right: a, bottom: o }
      );
    }
    function Gi(e, t, a) {
      return e === t ? a : e === a ? t : e;
    }
    function jl(e) {
      var t = e.borderSkipped,
        a = {};
      return (
        t &&
          (e.horizontal
            ? e.base > e.x && (t = Gi(t, "left", "right"))
            : e.base < e.y && (t = Gi(t, "bottom", "top")),
          (a[t] = !0)),
        a
      );
    }
    function $l(e, t, a) {
      var n = e.borderWidth,
        o = jl(e),
        l,
        u,
        h,
        f;
      return (
        b.isObject(n)
          ? ((l = +n.top || 0),
            (u = +n.right || 0),
            (h = +n.bottom || 0),
            (f = +n.left || 0))
          : (l = u = h = f = +n || 0),
        {
          t: o.top || l < 0 ? 0 : l > a ? a : l,
          r: o.right || u < 0 ? 0 : u > t ? t : u,
          b: o.bottom || h < 0 ? 0 : h > a ? a : h,
          l: o.left || f < 0 ? 0 : f > t ? t : f,
        }
      );
    }
    function Gl(e) {
      var t = $i(e),
        a = t.right - t.left,
        n = t.bottom - t.top,
        o = $l(e, a / 2, n / 2);
      return {
        outer: { x: t.left, y: t.top, w: a, h: n },
        inner: {
          x: t.left + o.l,
          y: t.top + o.t,
          w: a - o.l - o.r,
          h: n - o.t - o.b,
        },
      };
    }
    function wr(e, t, a) {
      var n = t === null,
        o = a === null,
        l = !e || (n && o) ? !1 : $i(e);
      return (
        l &&
        (n || (t >= l.left && t <= l.right)) &&
        (o || (a >= l.top && a <= l.bottom))
      );
    }
    var ql = je.extend({
        _type: "rectangle",
        draw: function () {
          var e = this._chart.ctx,
            t = this._view,
            a = Gl(t),
            n = a.outer,
            o = a.inner;
          (e.fillStyle = t.backgroundColor),
            e.fillRect(n.x, n.y, n.w, n.h),
            !(n.w === o.w && n.h === o.h) &&
              (e.save(),
              e.beginPath(),
              e.rect(n.x, n.y, n.w, n.h),
              e.clip(),
              (e.fillStyle = t.borderColor),
              e.rect(o.x, o.y, o.w, o.h),
              e.fill("evenodd"),
              e.restore());
        },
        height: function () {
          var e = this._view;
          return e.base - e.y;
        },
        inRange: function (e, t) {
          return wr(this._view, e, t);
        },
        inLabelRange: function (e, t) {
          var a = this._view;
          return ra(a) ? wr(a, e, null) : wr(a, null, t);
        },
        inXRange: function (e) {
          return wr(this._view, e, null);
        },
        inYRange: function (e) {
          return wr(this._view, null, e);
        },
        getCenterPoint: function () {
          var e = this._view,
            t,
            a;
          return (
            ra(e)
              ? ((t = e.x), (a = (e.y + e.base) / 2))
              : ((t = (e.x + e.base) / 2), (a = e.y)),
            { x: t, y: a }
          );
        },
        getArea: function () {
          var e = this._view;
          return ra(e)
            ? e.width * Math.abs(e.y - e.base)
            : e.height * Math.abs(e.x - e.base);
        },
        tooltipPosition: function () {
          var e = this._view;
          return { x: e.x, y: e.y };
        },
      }),
      we = {},
      Xl = zl,
      Zl = Bl,
      Kl = Ul,
      Ql = ql;
    (we.Arc = Xl), (we.Line = Zl), (we.Point = Kl), (we.Rectangle = Ql);
    var Mr = b._deprecated,
      Kt = b.valueOrDefault;
    N._set("bar", {
      hover: { mode: "label" },
      scales: {
        xAxes: [
          { type: "category", offset: !0, gridLines: { offsetGridLines: !0 } },
        ],
        yAxes: [{ type: "linear" }],
      },
    }),
      N._set("global", {
        datasets: { bar: { categoryPercentage: 0.8, barPercentage: 0.9 } },
      });
    function Jl(e, t) {
      var a = e._length,
        n,
        o,
        l,
        u;
      for (l = 1, u = t.length; l < u; ++l)
        a = Math.min(a, Math.abs(t[l] - t[l - 1]));
      for (l = 0, u = e.getTicks().length; l < u; ++l)
        (o = e.getPixelForTick(l)),
          (a = l > 0 ? Math.min(a, Math.abs(o - n)) : a),
          (n = o);
      return a;
    }
    function eu(e, t, a) {
      var n = a.barThickness,
        o = t.stackCount,
        l = t.pixels[e],
        u = b.isNullOrUndef(n) ? Jl(t.scale, t.pixels) : -1,
        h,
        f;
      return (
        b.isNullOrUndef(n)
          ? ((h = u * a.categoryPercentage), (f = a.barPercentage))
          : ((h = n * o), (f = 1)),
        { chunk: h / o, ratio: f, start: l - h / 2 }
      );
    }
    function tu(e, t, a) {
      var n = t.pixels,
        o = n[e],
        l = e > 0 ? n[e - 1] : null,
        u = e < n.length - 1 ? n[e + 1] : null,
        h = a.categoryPercentage,
        f,
        v;
      return (
        l === null && (l = o - (u === null ? t.end - t.start : u - o)),
        u === null && (u = o + o - l),
        (f = o - ((o - Math.min(l, u)) / 2) * h),
        (v = (Math.abs(u - l) / 2) * h),
        { chunk: v / t.stackCount, ratio: a.barPercentage, start: f }
      );
    }
    var qi = Ae.extend({
        dataElementType: we.Rectangle,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderSkipped",
          "borderWidth",
          "barPercentage",
          "barThickness",
          "categoryPercentage",
          "maxBarThickness",
          "minBarLength",
        ],
        initialize: function () {
          var e = this,
            t,
            a;
          Ae.prototype.initialize.apply(e, arguments),
            (t = e.getMeta()),
            (t.stack = e.getDataset().stack),
            (t.bar = !0),
            (a = e._getIndexScale().options),
            Mr(
              "bar chart",
              a.barPercentage,
              "scales.[x/y]Axes.barPercentage",
              "dataset.barPercentage"
            ),
            Mr(
              "bar chart",
              a.barThickness,
              "scales.[x/y]Axes.barThickness",
              "dataset.barThickness"
            ),
            Mr(
              "bar chart",
              a.categoryPercentage,
              "scales.[x/y]Axes.categoryPercentage",
              "dataset.categoryPercentage"
            ),
            Mr(
              "bar chart",
              e._getValueScale().options.minBarLength,
              "scales.[x/y]Axes.minBarLength",
              "dataset.minBarLength"
            ),
            Mr(
              "bar chart",
              a.maxBarThickness,
              "scales.[x/y]Axes.maxBarThickness",
              "dataset.maxBarThickness"
            );
        },
        update: function (e) {
          var t = this,
            a = t.getMeta().data,
            n,
            o;
          for (t._ruler = t.getRuler(), n = 0, o = a.length; n < o; ++n)
            t.updateElement(a[n], n, e);
        },
        updateElement: function (e, t, a) {
          var n = this,
            o = n.getMeta(),
            l = n.getDataset(),
            u = n._resolveDataElementOptions(e, t);
          (e._xScale = n.getScaleForId(o.xAxisID)),
            (e._yScale = n.getScaleForId(o.yAxisID)),
            (e._datasetIndex = n.index),
            (e._index = t),
            (e._model = {
              backgroundColor: u.backgroundColor,
              borderColor: u.borderColor,
              borderSkipped: u.borderSkipped,
              borderWidth: u.borderWidth,
              datasetLabel: l.label,
              label: n.chart.data.labels[t],
            }),
            b.isArray(l.data[t]) && (e._model.borderSkipped = null),
            n._updateElementGeometry(e, t, a, u),
            e.pivot();
        },
        _updateElementGeometry: function (e, t, a, n) {
          var o = this,
            l = e._model,
            u = o._getValueScale(),
            h = u.getBasePixel(),
            f = u.isHorizontal(),
            v = o._ruler || o.getRuler(),
            g = o.calculateBarValuePixels(o.index, t, n),
            m = o.calculateBarIndexPixels(o.index, t, v, n);
          (l.horizontal = f),
            (l.base = a ? h : g.base),
            (l.x = f ? (a ? h : g.head) : m.center),
            (l.y = f ? m.center : a ? h : g.head),
            (l.height = f ? m.size : void 0),
            (l.width = f ? void 0 : m.size);
        },
        _getStacks: function (e) {
          var t = this,
            a = t._getIndexScale(),
            n = a._getMatchingVisibleMetas(t._type),
            o = a.options.stacked,
            l = n.length,
            u = [],
            h,
            f;
          for (
            h = 0;
            h < l &&
            ((f = n[h]),
            (o === !1 ||
              u.indexOf(f.stack) === -1 ||
              (o === void 0 && f.stack === void 0)) &&
              u.push(f.stack),
            f.index !== e);
            ++h
          );
          return u;
        },
        getStackCount: function () {
          return this._getStacks().length;
        },
        getStackIndex: function (e, t) {
          var a = this._getStacks(e),
            n = t !== void 0 ? a.indexOf(t) : -1;
          return n === -1 ? a.length - 1 : n;
        },
        getRuler: function () {
          var e = this,
            t = e._getIndexScale(),
            a = [],
            n,
            o;
          for (n = 0, o = e.getMeta().data.length; n < o; ++n)
            a.push(t.getPixelForValue(null, n, e.index));
          return {
            pixels: a,
            start: t._startPixel,
            end: t._endPixel,
            stackCount: e.getStackCount(),
            scale: t,
          };
        },
        calculateBarValuePixels: function (e, t, a) {
          var n = this,
            o = n.chart,
            l = n._getValueScale(),
            u = l.isHorizontal(),
            h = o.data.datasets,
            f = l._getMatchingVisibleMetas(n._type),
            v = l._parseValue(h[e].data[t]),
            g = a.minBarLength,
            m = l.options.stacked,
            y = n.getMeta().stack,
            x =
              v.start === void 0 ? 0 : v.max >= 0 && v.min >= 0 ? v.min : v.max,
            w =
              v.start === void 0
                ? v.end
                : v.max >= 0 && v.min >= 0
                ? v.max - v.min
                : v.min - v.max,
            M = f.length,
            k,
            D,
            F,
            A,
            E,
            W,
            G;
          if (m || (m === void 0 && y !== void 0))
            for (k = 0; k < M && ((D = f[k]), D.index !== e); ++k)
              D.stack === y &&
                ((G = l._parseValue(h[D.index].data[t])),
                (F =
                  G.start === void 0
                    ? G.end
                    : G.min >= 0 && G.max >= 0
                    ? G.max
                    : G.min),
                ((v.min < 0 && F < 0) || (v.max >= 0 && F > 0)) && (x += F));
          return (
            (A = l.getPixelForValue(x)),
            (E = l.getPixelForValue(x + w)),
            (W = E - A),
            g !== void 0 &&
              Math.abs(W) < g &&
              ((W = g),
              (w >= 0 && !u) || (w < 0 && u) ? (E = A - g) : (E = A + g)),
            { size: W, base: A, head: E, center: E + W / 2 }
          );
        },
        calculateBarIndexPixels: function (e, t, a, n) {
          var o = this,
            l = n.barThickness === "flex" ? tu(t, a, n) : eu(t, a, n),
            u = o.getStackIndex(e, o.getMeta().stack),
            h = l.start + l.chunk * u + l.chunk / 2,
            f = Math.min(Kt(n.maxBarThickness, 1 / 0), l.chunk * l.ratio);
          return { base: h - f / 2, head: h + f / 2, center: h, size: f };
        },
        draw: function () {
          var e = this,
            t = e.chart,
            a = e._getValueScale(),
            n = e.getMeta().data,
            o = e.getDataset(),
            l = n.length,
            u = 0;
          for (b.canvas.clipArea(t.ctx, t.chartArea); u < l; ++u) {
            var h = a._parseValue(o.data[u]);
            !isNaN(h.min) && !isNaN(h.max) && n[u].draw();
          }
          b.canvas.unclipArea(t.ctx);
        },
        _resolveDataElementOptions: function () {
          var e = this,
            t = b.extend(
              {},
              Ae.prototype._resolveDataElementOptions.apply(e, arguments)
            ),
            a = e._getIndexScale().options,
            n = e._getValueScale().options;
          return (
            (t.barPercentage = Kt(a.barPercentage, t.barPercentage)),
            (t.barThickness = Kt(a.barThickness, t.barThickness)),
            (t.categoryPercentage = Kt(
              a.categoryPercentage,
              t.categoryPercentage
            )),
            (t.maxBarThickness = Kt(a.maxBarThickness, t.maxBarThickness)),
            (t.minBarLength = Kt(n.minBarLength, t.minBarLength)),
            t
          );
        },
      }),
      dn = b.valueOrDefault,
      ru = b.options.resolve;
    N._set("bubble", {
      hover: { mode: "single" },
      scales: {
        xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }],
        yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }],
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (e, t) {
            var a = t.datasets[e.datasetIndex].label || "",
              n = t.datasets[e.datasetIndex].data[e.index];
            return a + ": (" + e.xLabel + ", " + e.yLabel + ", " + n.r + ")";
          },
        },
      },
    });
    var au = Ae.extend({
        dataElementType: we.Point,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth",
          "hoverRadius",
          "hitRadius",
          "pointStyle",
          "rotation",
        ],
        update: function (e) {
          var t = this,
            a = t.getMeta(),
            n = a.data;
          b.each(n, function (o, l) {
            t.updateElement(o, l, e);
          });
        },
        updateElement: function (e, t, a) {
          var n = this,
            o = n.getMeta(),
            l = e.custom || {},
            u = n.getScaleForId(o.xAxisID),
            h = n.getScaleForId(o.yAxisID),
            f = n._resolveDataElementOptions(e, t),
            v = n.getDataset().data[t],
            g = n.index,
            m = a
              ? u.getPixelForDecimal(0.5)
              : u.getPixelForValue(typeof v == "object" ? v : NaN, t, g),
            y = a ? h.getBasePixel() : h.getPixelForValue(v, t, g);
          (e._xScale = u),
            (e._yScale = h),
            (e._options = f),
            (e._datasetIndex = g),
            (e._index = t),
            (e._model = {
              backgroundColor: f.backgroundColor,
              borderColor: f.borderColor,
              borderWidth: f.borderWidth,
              hitRadius: f.hitRadius,
              pointStyle: f.pointStyle,
              rotation: f.rotation,
              radius: a ? 0 : f.radius,
              skip: l.skip || isNaN(m) || isNaN(y),
              x: m,
              y,
            }),
            e.pivot();
        },
        setHoverStyle: function (e) {
          var t = e._model,
            a = e._options,
            n = b.getHoverColor;
          (e.$previousStyle = {
            backgroundColor: t.backgroundColor,
            borderColor: t.borderColor,
            borderWidth: t.borderWidth,
            radius: t.radius,
          }),
            (t.backgroundColor = dn(
              a.hoverBackgroundColor,
              n(a.backgroundColor)
            )),
            (t.borderColor = dn(a.hoverBorderColor, n(a.borderColor))),
            (t.borderWidth = dn(a.hoverBorderWidth, a.borderWidth)),
            (t.radius = a.radius + a.hoverRadius);
        },
        _resolveDataElementOptions: function (e, t) {
          var a = this,
            n = a.chart,
            o = a.getDataset(),
            l = e.custom || {},
            u = o.data[t] || {},
            h = Ae.prototype._resolveDataElementOptions.apply(a, arguments),
            f = { chart: n, dataIndex: t, dataset: o, datasetIndex: a.index };
          return (
            a._cachedDataOpts === h && (h = b.extend({}, h)),
            (h.radius = ru(
              [
                l.radius,
                u.r,
                a._config.radius,
                n.options.elements.point.radius,
              ],
              f,
              t
            )),
            h
          );
        },
      }),
      aa = b.valueOrDefault,
      At = Math.PI,
      tt = At * 2,
      Nt = At / 2;
    N._set("doughnut", {
      animation: { animateRotate: !0, animateScale: !1 },
      hover: { mode: "single" },
      legendCallback: function (e) {
        var t = document.createElement("ul"),
          a = e.data,
          n = a.datasets,
          o = a.labels,
          l,
          u,
          h,
          f;
        if ((t.setAttribute("class", e.id + "-legend"), n.length))
          for (l = 0, u = n[0].data.length; l < u; ++l)
            (h = t.appendChild(document.createElement("li"))),
              (f = h.appendChild(document.createElement("span"))),
              (f.style.backgroundColor = n[0].backgroundColor[l]),
              o[l] && h.appendChild(document.createTextNode(o[l]));
        return t.outerHTML;
      },
      legend: {
        labels: {
          generateLabels: function (e) {
            var t = e.data;
            return t.labels.length && t.datasets.length
              ? t.labels.map(function (a, n) {
                  var o = e.getDatasetMeta(0),
                    l = o.controller.getStyle(n);
                  return {
                    text: a,
                    fillStyle: l.backgroundColor,
                    strokeStyle: l.borderColor,
                    lineWidth: l.borderWidth,
                    hidden: isNaN(t.datasets[0].data[n]) || o.data[n].hidden,
                    index: n,
                  };
                })
              : [];
          },
        },
        onClick: function (e, t) {
          var a = t.index,
            n = this.chart,
            o,
            l,
            u;
          for (o = 0, l = (n.data.datasets || []).length; o < l; ++o)
            (u = n.getDatasetMeta(o)),
              u.data[a] && (u.data[a].hidden = !u.data[a].hidden);
          n.update();
        },
      },
      cutoutPercentage: 50,
      rotation: -Nt,
      circumference: tt,
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (e, t) {
            var a = t.labels[e.index],
              n = ": " + t.datasets[e.datasetIndex].data[e.index];
            return b.isArray(a) ? ((a = a.slice()), (a[0] += n)) : (a += n), a;
          },
        },
      },
    });
    var Xi = Ae.extend({
      dataElementType: we.Arc,
      linkScales: b.noop,
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "borderAlign",
        "hoverBackgroundColor",
        "hoverBorderColor",
        "hoverBorderWidth",
      ],
      getRingIndex: function (e) {
        for (var t = 0, a = 0; a < e; ++a)
          this.chart.isDatasetVisible(a) && ++t;
        return t;
      },
      update: function (e) {
        var t = this,
          a = t.chart,
          n = a.chartArea,
          o = a.options,
          l = 1,
          u = 1,
          h = 0,
          f = 0,
          v = t.getMeta(),
          g = v.data,
          m = o.cutoutPercentage / 100 || 0,
          y = o.circumference,
          x = t._getRingWeight(t.index),
          w,
          M,
          k,
          D;
        if (y < tt) {
          var F = o.rotation % tt;
          F += F >= At ? -tt : F < -At ? tt : 0;
          var A = F + y,
            E = Math.cos(F),
            W = Math.sin(F),
            G = Math.cos(A),
            j = Math.sin(A),
            K = (F <= 0 && A >= 0) || A >= tt,
            ee = (F <= Nt && A >= Nt) || A >= tt + Nt,
            ue = F === -At || A >= At,
            se = (F <= -Nt && A >= -Nt) || A >= At + Nt,
            oe = ue ? -1 : Math.min(E, E * m, G, G * m),
            fe = se ? -1 : Math.min(W, W * m, j, j * m),
            rr = K ? 1 : Math.max(E, E * m, G, G * m),
            ar = ee ? 1 : Math.max(W, W * m, j, j * m);
          (l = (rr - oe) / 2),
            (u = (ar - fe) / 2),
            (h = -(rr + oe) / 2),
            (f = -(ar + fe) / 2);
        }
        for (k = 0, D = g.length; k < D; ++k)
          g[k]._options = t._resolveDataElementOptions(g[k], k);
        for (
          a.borderWidth = t.getMaxBorderWidth(),
            w = (n.right - n.left - a.borderWidth) / l,
            M = (n.bottom - n.top - a.borderWidth) / u,
            a.outerRadius = Math.max(Math.min(w, M) / 2, 0),
            a.innerRadius = Math.max(a.outerRadius * m, 0),
            a.radiusLength =
              (a.outerRadius - a.innerRadius) /
              (t._getVisibleDatasetWeightTotal() || 1),
            a.offsetX = h * a.outerRadius,
            a.offsetY = f * a.outerRadius,
            v.total = t.calculateTotal(),
            t.outerRadius =
              a.outerRadius - a.radiusLength * t._getRingWeightOffset(t.index),
            t.innerRadius = Math.max(t.outerRadius - a.radiusLength * x, 0),
            k = 0,
            D = g.length;
          k < D;
          ++k
        )
          t.updateElement(g[k], k, e);
      },
      updateElement: function (e, t, a) {
        var n = this,
          o = n.chart,
          l = o.chartArea,
          u = o.options,
          h = u.animation,
          f = (l.left + l.right) / 2,
          v = (l.top + l.bottom) / 2,
          g = u.rotation,
          m = u.rotation,
          y = n.getDataset(),
          x =
            (a && h.animateRotate) || e.hidden
              ? 0
              : n.calculateCircumference(y.data[t]) * (u.circumference / tt),
          w = a && h.animateScale ? 0 : n.innerRadius,
          M = a && h.animateScale ? 0 : n.outerRadius,
          k = e._options || {};
        b.extend(e, {
          _datasetIndex: n.index,
          _index: t,
          _model: {
            backgroundColor: k.backgroundColor,
            borderColor: k.borderColor,
            borderWidth: k.borderWidth,
            borderAlign: k.borderAlign,
            x: f + o.offsetX,
            y: v + o.offsetY,
            startAngle: g,
            endAngle: m,
            circumference: x,
            outerRadius: M,
            innerRadius: w,
            label: b.valueAtIndexOrDefault(y.label, t, o.data.labels[t]),
          },
        });
        var D = e._model;
        (!a || !h.animateRotate) &&
          (t === 0
            ? (D.startAngle = u.rotation)
            : (D.startAngle = n.getMeta().data[t - 1]._model.endAngle),
          (D.endAngle = D.startAngle + D.circumference)),
          e.pivot();
      },
      calculateTotal: function () {
        var e = this.getDataset(),
          t = this.getMeta(),
          a = 0,
          n;
        return (
          b.each(t.data, function (o, l) {
            (n = e.data[l]), !isNaN(n) && !o.hidden && (a += Math.abs(n));
          }),
          a
        );
      },
      calculateCircumference: function (e) {
        var t = this.getMeta().total;
        return t > 0 && !isNaN(e) ? tt * (Math.abs(e) / t) : 0;
      },
      getMaxBorderWidth: function (e) {
        var t = this,
          a = 0,
          n = t.chart,
          o,
          l,
          u,
          h,
          f,
          v,
          g,
          m;
        if (!e) {
          for (o = 0, l = n.data.datasets.length; o < l; ++o)
            if (n.isDatasetVisible(o)) {
              (u = n.getDatasetMeta(o)),
                (e = u.data),
                o !== t.index && (f = u.controller);
              break;
            }
        }
        if (!e) return 0;
        for (o = 0, l = e.length; o < l; ++o)
          (h = e[o]),
            f
              ? (f._configure(), (v = f._resolveDataElementOptions(h, o)))
              : (v = h._options),
            v.borderAlign !== "inner" &&
              ((g = v.borderWidth),
              (m = v.hoverBorderWidth),
              (a = g > a ? g : a),
              (a = m > a ? m : a));
        return a;
      },
      setHoverStyle: function (e) {
        var t = e._model,
          a = e._options,
          n = b.getHoverColor;
        (e.$previousStyle = {
          backgroundColor: t.backgroundColor,
          borderColor: t.borderColor,
          borderWidth: t.borderWidth,
        }),
          (t.backgroundColor = aa(
            a.hoverBackgroundColor,
            n(a.backgroundColor)
          )),
          (t.borderColor = aa(a.hoverBorderColor, n(a.borderColor))),
          (t.borderWidth = aa(a.hoverBorderWidth, a.borderWidth));
      },
      _getRingWeightOffset: function (e) {
        for (var t = 0, a = 0; a < e; ++a)
          this.chart.isDatasetVisible(a) && (t += this._getRingWeight(a));
        return t;
      },
      _getRingWeight: function (e) {
        return Math.max(aa(this.chart.data.datasets[e].weight, 1), 0);
      },
      _getVisibleDatasetWeightTotal: function () {
        return this._getRingWeightOffset(this.chart.data.datasets.length);
      },
    });
    N._set("horizontalBar", {
      hover: { mode: "index", axis: "y" },
      scales: {
        xAxes: [{ type: "linear", position: "bottom" }],
        yAxes: [
          {
            type: "category",
            position: "left",
            offset: !0,
            gridLines: { offsetGridLines: !0 },
          },
        ],
      },
      elements: { rectangle: { borderSkipped: "left" } },
      tooltips: { mode: "index", axis: "y" },
    }),
      N._set("global", {
        datasets: {
          horizontalBar: { categoryPercentage: 0.8, barPercentage: 0.9 },
        },
      });
    var nu = qi.extend({
        _getValueScaleId: function () {
          return this.getMeta().xAxisID;
        },
        _getIndexScaleId: function () {
          return this.getMeta().yAxisID;
        },
      }),
      rt = b.valueOrDefault,
      iu = b.options.resolve,
      fn = b.canvas._isPointInArea;
    N._set("line", {
      showLines: !0,
      spanGaps: !1,
      hover: { mode: "label" },
      scales: {
        xAxes: [{ type: "category", id: "x-axis-0" }],
        yAxes: [{ type: "linear", id: "y-axis-0" }],
      },
    });
    function Zi(e, t) {
      var a = (e && e.options.ticks) || {},
        n = a.reverse,
        o = a.min === void 0 ? t : 0,
        l = a.max === void 0 ? t : 0;
      return { start: n ? l : o, end: n ? o : l };
    }
    function ou(e, t, a) {
      var n = a / 2,
        o = Zi(e, n),
        l = Zi(t, n);
      return { top: l.end, right: o.end, bottom: l.start, left: o.start };
    }
    function su(e) {
      var t, a, n, o;
      return (
        b.isObject(e)
          ? ((t = e.top), (a = e.right), (n = e.bottom), (o = e.left))
          : (t = a = n = o = e),
        { top: t, right: a, bottom: n, left: o }
      );
    }
    var Ki = Ae.extend({
        datasetElementType: we.Line,
        dataElementType: we.Point,
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth",
          "cubicInterpolationMode",
          "fill",
        ],
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation",
        },
        update: function (e) {
          var t = this,
            a = t.getMeta(),
            n = a.dataset,
            o = a.data || [],
            l = t.chart.options,
            u = t._config,
            h = (t._showLine = rt(u.showLine, l.showLines)),
            f,
            v;
          for (
            t._xScale = t.getScaleForId(a.xAxisID),
              t._yScale = t.getScaleForId(a.yAxisID),
              h &&
                (u.tension !== void 0 &&
                  u.lineTension === void 0 &&
                  (u.lineTension = u.tension),
                (n._scale = t._yScale),
                (n._datasetIndex = t.index),
                (n._children = o),
                (n._model = t._resolveDatasetElementOptions(n)),
                n.pivot()),
              f = 0,
              v = o.length;
            f < v;
            ++f
          )
            t.updateElement(o[f], f, e);
          for (
            h && n._model.tension !== 0 && t.updateBezierControlPoints(),
              f = 0,
              v = o.length;
            f < v;
            ++f
          )
            o[f].pivot();
        },
        updateElement: function (e, t, a) {
          var n = this,
            o = n.getMeta(),
            l = e.custom || {},
            u = n.getDataset(),
            h = n.index,
            f = u.data[t],
            v = n._xScale,
            g = n._yScale,
            m = o.dataset._model,
            y,
            x,
            w = n._resolveDataElementOptions(e, t);
          (y = v.getPixelForValue(typeof f == "object" ? f : NaN, t, h)),
            (x = a ? g.getBasePixel() : n.calculatePointY(f, t, h)),
            (e._xScale = v),
            (e._yScale = g),
            (e._options = w),
            (e._datasetIndex = h),
            (e._index = t),
            (e._model = {
              x: y,
              y: x,
              skip: l.skip || isNaN(y) || isNaN(x),
              radius: w.radius,
              pointStyle: w.pointStyle,
              rotation: w.rotation,
              backgroundColor: w.backgroundColor,
              borderColor: w.borderColor,
              borderWidth: w.borderWidth,
              tension: rt(l.tension, m ? m.tension : 0),
              steppedLine: m ? m.steppedLine : !1,
              hitRadius: w.hitRadius,
            });
        },
        _resolveDatasetElementOptions: function (e) {
          var t = this,
            a = t._config,
            n = e.custom || {},
            o = t.chart.options,
            l = o.elements.line,
            u = Ae.prototype._resolveDatasetElementOptions.apply(t, arguments);
          return (
            (u.spanGaps = rt(a.spanGaps, o.spanGaps)),
            (u.tension = rt(a.lineTension, l.tension)),
            (u.steppedLine = iu([n.steppedLine, a.steppedLine, l.stepped])),
            (u.clip = su(rt(a.clip, ou(t._xScale, t._yScale, u.borderWidth)))),
            u
          );
        },
        calculatePointY: function (e, t, a) {
          var n = this,
            o = n.chart,
            l = n._yScale,
            u = 0,
            h = 0,
            f,
            v,
            g,
            m,
            y,
            x,
            w;
          if (l.options.stacked) {
            for (
              y = +l.getRightValue(e),
                x = o._getSortedVisibleDatasetMetas(),
                w = x.length,
                f = 0;
              f < w && ((g = x[f]), g.index !== a);
              ++f
            )
              (v = o.data.datasets[g.index]),
                g.type === "line" &&
                  g.yAxisID === l.id &&
                  ((m = +l.getRightValue(v.data[t])),
                  m < 0 ? (h += m || 0) : (u += m || 0));
            return y < 0
              ? l.getPixelForValue(h + y)
              : l.getPixelForValue(u + y);
          }
          return l.getPixelForValue(e);
        },
        updateBezierControlPoints: function () {
          var e = this,
            t = e.chart,
            a = e.getMeta(),
            n = a.dataset._model,
            o = t.chartArea,
            l = a.data || [],
            u,
            h,
            f,
            v;
          n.spanGaps &&
            (l = l.filter(function (m) {
              return !m._model.skip;
            }));
          function g(m, y, x) {
            return Math.max(Math.min(m, x), y);
          }
          if (n.cubicInterpolationMode === "monotone") b.splineCurveMonotone(l);
          else
            for (u = 0, h = l.length; u < h; ++u)
              (f = l[u]._model),
                (v = b.splineCurve(
                  b.previousItem(l, u)._model,
                  f,
                  b.nextItem(l, u)._model,
                  n.tension
                )),
                (f.controlPointPreviousX = v.previous.x),
                (f.controlPointPreviousY = v.previous.y),
                (f.controlPointNextX = v.next.x),
                (f.controlPointNextY = v.next.y);
          if (t.options.elements.line.capBezierPoints)
            for (u = 0, h = l.length; u < h; ++u)
              (f = l[u]._model),
                fn(f, o) &&
                  (u > 0 &&
                    fn(l[u - 1]._model, o) &&
                    ((f.controlPointPreviousX = g(
                      f.controlPointPreviousX,
                      o.left,
                      o.right
                    )),
                    (f.controlPointPreviousY = g(
                      f.controlPointPreviousY,
                      o.top,
                      o.bottom
                    ))),
                  u < l.length - 1 &&
                    fn(l[u + 1]._model, o) &&
                    ((f.controlPointNextX = g(
                      f.controlPointNextX,
                      o.left,
                      o.right
                    )),
                    (f.controlPointNextY = g(
                      f.controlPointNextY,
                      o.top,
                      o.bottom
                    ))));
        },
        draw: function () {
          var e = this,
            t = e.chart,
            a = e.getMeta(),
            n = a.data || [],
            o = t.chartArea,
            l = t.canvas,
            u = 0,
            h = n.length,
            f;
          for (
            e._showLine &&
            ((f = a.dataset._model.clip),
            b.canvas.clipArea(t.ctx, {
              left: f.left === !1 ? 0 : o.left - f.left,
              right: f.right === !1 ? l.width : o.right + f.right,
              top: f.top === !1 ? 0 : o.top - f.top,
              bottom: f.bottom === !1 ? l.height : o.bottom + f.bottom,
            }),
            a.dataset.draw(),
            b.canvas.unclipArea(t.ctx));
            u < h;
            ++u
          )
            n[u].draw(o);
        },
        setHoverStyle: function (e) {
          var t = e._model,
            a = e._options,
            n = b.getHoverColor;
          (e.$previousStyle = {
            backgroundColor: t.backgroundColor,
            borderColor: t.borderColor,
            borderWidth: t.borderWidth,
            radius: t.radius,
          }),
            (t.backgroundColor = rt(
              a.hoverBackgroundColor,
              n(a.backgroundColor)
            )),
            (t.borderColor = rt(a.hoverBorderColor, n(a.borderColor))),
            (t.borderWidth = rt(a.hoverBorderWidth, a.borderWidth)),
            (t.radius = rt(a.hoverRadius, a.radius));
        },
      }),
      lu = b.options.resolve;
    N._set("polarArea", {
      scale: {
        type: "radialLinear",
        angleLines: { display: !1 },
        gridLines: { circular: !0 },
        pointLabels: { display: !1 },
        ticks: { beginAtZero: !0 },
      },
      animation: { animateRotate: !0, animateScale: !0 },
      startAngle: -0.5 * Math.PI,
      legendCallback: function (e) {
        var t = document.createElement("ul"),
          a = e.data,
          n = a.datasets,
          o = a.labels,
          l,
          u,
          h,
          f;
        if ((t.setAttribute("class", e.id + "-legend"), n.length))
          for (l = 0, u = n[0].data.length; l < u; ++l)
            (h = t.appendChild(document.createElement("li"))),
              (f = h.appendChild(document.createElement("span"))),
              (f.style.backgroundColor = n[0].backgroundColor[l]),
              o[l] && h.appendChild(document.createTextNode(o[l]));
        return t.outerHTML;
      },
      legend: {
        labels: {
          generateLabels: function (e) {
            var t = e.data;
            return t.labels.length && t.datasets.length
              ? t.labels.map(function (a, n) {
                  var o = e.getDatasetMeta(0),
                    l = o.controller.getStyle(n);
                  return {
                    text: a,
                    fillStyle: l.backgroundColor,
                    strokeStyle: l.borderColor,
                    lineWidth: l.borderWidth,
                    hidden: isNaN(t.datasets[0].data[n]) || o.data[n].hidden,
                    index: n,
                  };
                })
              : [];
          },
        },
        onClick: function (e, t) {
          var a = t.index,
            n = this.chart,
            o,
            l,
            u;
          for (o = 0, l = (n.data.datasets || []).length; o < l; ++o)
            (u = n.getDatasetMeta(o)), (u.data[a].hidden = !u.data[a].hidden);
          n.update();
        },
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (e, t) {
            return t.labels[e.index] + ": " + e.yLabel;
          },
        },
      },
    });
    var uu = Ae.extend({
      dataElementType: we.Arc,
      linkScales: b.noop,
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "borderAlign",
        "hoverBackgroundColor",
        "hoverBorderColor",
        "hoverBorderWidth",
      ],
      _getIndexScaleId: function () {
        return this.chart.scale.id;
      },
      _getValueScaleId: function () {
        return this.chart.scale.id;
      },
      update: function (e) {
        var t = this,
          a = t.getDataset(),
          n = t.getMeta(),
          o = t.chart.options.startAngle || 0,
          l = (t._starts = []),
          u = (t._angles = []),
          h = n.data,
          f,
          v,
          g;
        for (
          t._updateRadius(),
            n.count = t.countVisibleElements(),
            f = 0,
            v = a.data.length;
          f < v;
          f++
        )
          (l[f] = o), (g = t._computeAngle(f)), (u[f] = g), (o += g);
        for (f = 0, v = h.length; f < v; ++f)
          (h[f]._options = t._resolveDataElementOptions(h[f], f)),
            t.updateElement(h[f], f, e);
      },
      _updateRadius: function () {
        var e = this,
          t = e.chart,
          a = t.chartArea,
          n = t.options,
          o = Math.min(a.right - a.left, a.bottom - a.top);
        (t.outerRadius = Math.max(o / 2, 0)),
          (t.innerRadius = Math.max(
            n.cutoutPercentage ? (t.outerRadius / 100) * n.cutoutPercentage : 1,
            0
          )),
          (t.radiusLength =
            (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount()),
          (e.outerRadius = t.outerRadius - t.radiusLength * e.index),
          (e.innerRadius = e.outerRadius - t.radiusLength);
      },
      updateElement: function (e, t, a) {
        var n = this,
          o = n.chart,
          l = n.getDataset(),
          u = o.options,
          h = u.animation,
          f = o.scale,
          v = o.data.labels,
          g = f.xCenter,
          m = f.yCenter,
          y = u.startAngle,
          x = e.hidden ? 0 : f.getDistanceFromCenterForValue(l.data[t]),
          w = n._starts[t],
          M = w + (e.hidden ? 0 : n._angles[t]),
          k = h.animateScale ? 0 : f.getDistanceFromCenterForValue(l.data[t]),
          D = e._options || {};
        b.extend(e, {
          _datasetIndex: n.index,
          _index: t,
          _scale: f,
          _model: {
            backgroundColor: D.backgroundColor,
            borderColor: D.borderColor,
            borderWidth: D.borderWidth,
            borderAlign: D.borderAlign,
            x: g,
            y: m,
            innerRadius: 0,
            outerRadius: a ? k : x,
            startAngle: a && h.animateRotate ? y : w,
            endAngle: a && h.animateRotate ? y : M,
            label: b.valueAtIndexOrDefault(v, t, v[t]),
          },
        }),
          e.pivot();
      },
      countVisibleElements: function () {
        var e = this.getDataset(),
          t = this.getMeta(),
          a = 0;
        return (
          b.each(t.data, function (n, o) {
            !isNaN(e.data[o]) && !n.hidden && a++;
          }),
          a
        );
      },
      setHoverStyle: function (e) {
        var t = e._model,
          a = e._options,
          n = b.getHoverColor,
          o = b.valueOrDefault;
        (e.$previousStyle = {
          backgroundColor: t.backgroundColor,
          borderColor: t.borderColor,
          borderWidth: t.borderWidth,
        }),
          (t.backgroundColor = o(a.hoverBackgroundColor, n(a.backgroundColor))),
          (t.borderColor = o(a.hoverBorderColor, n(a.borderColor))),
          (t.borderWidth = o(a.hoverBorderWidth, a.borderWidth));
      },
      _computeAngle: function (e) {
        var t = this,
          a = this.getMeta().count,
          n = t.getDataset(),
          o = t.getMeta();
        if (isNaN(n.data[e]) || o.data[e].hidden) return 0;
        var l = {
          chart: t.chart,
          dataIndex: e,
          dataset: n,
          datasetIndex: t.index,
        };
        return lu(
          [t.chart.options.elements.arc.angle, (2 * Math.PI) / a],
          l,
          e
        );
      },
    });
    N._set("pie", b.clone(N.doughnut)), N._set("pie", { cutoutPercentage: 0 });
    var du = Xi,
      Rt = b.valueOrDefault;
    N._set("radar", {
      spanGaps: !1,
      scale: { type: "radialLinear" },
      elements: { line: { fill: "start", tension: 0 } },
    });
    var fu = Ae.extend({
      datasetElementType: we.Line,
      dataElementType: we.Point,
      linkScales: b.noop,
      _datasetElementOptions: [
        "backgroundColor",
        "borderWidth",
        "borderColor",
        "borderCapStyle",
        "borderDash",
        "borderDashOffset",
        "borderJoinStyle",
        "fill",
      ],
      _dataElementOptions: {
        backgroundColor: "pointBackgroundColor",
        borderColor: "pointBorderColor",
        borderWidth: "pointBorderWidth",
        hitRadius: "pointHitRadius",
        hoverBackgroundColor: "pointHoverBackgroundColor",
        hoverBorderColor: "pointHoverBorderColor",
        hoverBorderWidth: "pointHoverBorderWidth",
        hoverRadius: "pointHoverRadius",
        pointStyle: "pointStyle",
        radius: "pointRadius",
        rotation: "pointRotation",
      },
      _getIndexScaleId: function () {
        return this.chart.scale.id;
      },
      _getValueScaleId: function () {
        return this.chart.scale.id;
      },
      update: function (e) {
        var t = this,
          a = t.getMeta(),
          n = a.dataset,
          o = a.data || [],
          l = t.chart.scale,
          u = t._config,
          h,
          f;
        for (
          u.tension !== void 0 &&
            u.lineTension === void 0 &&
            (u.lineTension = u.tension),
            n._scale = l,
            n._datasetIndex = t.index,
            n._children = o,
            n._loop = !0,
            n._model = t._resolveDatasetElementOptions(n),
            n.pivot(),
            h = 0,
            f = o.length;
          h < f;
          ++h
        )
          t.updateElement(o[h], h, e);
        for (t.updateBezierControlPoints(), h = 0, f = o.length; h < f; ++h)
          o[h].pivot();
      },
      updateElement: function (e, t, a) {
        var n = this,
          o = e.custom || {},
          l = n.getDataset(),
          u = n.chart.scale,
          h = u.getPointPositionForValue(t, l.data[t]),
          f = n._resolveDataElementOptions(e, t),
          v = n.getMeta().dataset._model,
          g = a ? u.xCenter : h.x,
          m = a ? u.yCenter : h.y;
        (e._scale = u),
          (e._options = f),
          (e._datasetIndex = n.index),
          (e._index = t),
          (e._model = {
            x: g,
            y: m,
            skip: o.skip || isNaN(g) || isNaN(m),
            radius: f.radius,
            pointStyle: f.pointStyle,
            rotation: f.rotation,
            backgroundColor: f.backgroundColor,
            borderColor: f.borderColor,
            borderWidth: f.borderWidth,
            tension: Rt(o.tension, v ? v.tension : 0),
            hitRadius: f.hitRadius,
          });
      },
      _resolveDatasetElementOptions: function () {
        var e = this,
          t = e._config,
          a = e.chart.options,
          n = Ae.prototype._resolveDatasetElementOptions.apply(e, arguments);
        return (
          (n.spanGaps = Rt(t.spanGaps, a.spanGaps)),
          (n.tension = Rt(t.lineTension, a.elements.line.tension)),
          n
        );
      },
      updateBezierControlPoints: function () {
        var e = this,
          t = e.getMeta(),
          a = e.chart.chartArea,
          n = t.data || [],
          o,
          l,
          u,
          h;
        t.dataset._model.spanGaps &&
          (n = n.filter(function (v) {
            return !v._model.skip;
          }));
        function f(v, g, m) {
          return Math.max(Math.min(v, m), g);
        }
        for (o = 0, l = n.length; o < l; ++o)
          (u = n[o]._model),
            (h = b.splineCurve(
              b.previousItem(n, o, !0)._model,
              u,
              b.nextItem(n, o, !0)._model,
              u.tension
            )),
            (u.controlPointPreviousX = f(h.previous.x, a.left, a.right)),
            (u.controlPointPreviousY = f(h.previous.y, a.top, a.bottom)),
            (u.controlPointNextX = f(h.next.x, a.left, a.right)),
            (u.controlPointNextY = f(h.next.y, a.top, a.bottom));
      },
      setHoverStyle: function (e) {
        var t = e._model,
          a = e._options,
          n = b.getHoverColor;
        (e.$previousStyle = {
          backgroundColor: t.backgroundColor,
          borderColor: t.borderColor,
          borderWidth: t.borderWidth,
          radius: t.radius,
        }),
          (t.backgroundColor = Rt(
            a.hoverBackgroundColor,
            n(a.backgroundColor)
          )),
          (t.borderColor = Rt(a.hoverBorderColor, n(a.borderColor))),
          (t.borderWidth = Rt(a.hoverBorderWidth, a.borderWidth)),
          (t.radius = Rt(a.hoverRadius, a.radius));
      },
    });
    N._set("scatter", {
      hover: { mode: "single" },
      scales: {
        xAxes: [{ id: "x-axis-1", type: "linear", position: "bottom" }],
        yAxes: [{ id: "y-axis-1", type: "linear", position: "left" }],
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (e) {
            return "(" + e.xLabel + ", " + e.yLabel + ")";
          },
        },
      },
    }),
      N._set("global", { datasets: { scatter: { showLine: !1 } } });
    var cu = Ki,
      Qi = {
        bar: qi,
        bubble: au,
        doughnut: Xi,
        horizontalBar: nu,
        line: Ki,
        polarArea: uu,
        pie: du,
        radar: fu,
        scatter: cu,
      };
    function Lt(e, t) {
      return e.native ? { x: e.x, y: e.y } : b.getRelativePosition(e, t);
    }
    function kr(e, t) {
      var a = e._getSortedVisibleDatasetMetas(),
        n,
        o,
        l,
        u,
        h,
        f;
      for (o = 0, u = a.length; o < u; ++o)
        for (n = a[o].data, l = 0, h = n.length; l < h; ++l)
          (f = n[l]), f._view.skip || t(f);
    }
    function cn(e, t) {
      var a = [];
      return (
        kr(e, function (n) {
          n.inRange(t.x, t.y) && a.push(n);
        }),
        a
      );
    }
    function hn(e, t, a, n) {
      var o = Number.POSITIVE_INFINITY,
        l = [];
      return (
        kr(e, function (u) {
          if (!(a && !u.inRange(t.x, t.y))) {
            var h = u.getCenterPoint(),
              f = n(t, h);
            f < o ? ((l = [u]), (o = f)) : f === o && l.push(u);
          }
        }),
        l
      );
    }
    function vn(e) {
      var t = e.indexOf("x") !== -1,
        a = e.indexOf("y") !== -1;
      return function (n, o) {
        var l = t ? Math.abs(n.x - o.x) : 0,
          u = a ? Math.abs(n.y - o.y) : 0;
        return Math.sqrt(Math.pow(l, 2) + Math.pow(u, 2));
      };
    }
    function gn(e, t, a) {
      var n = Lt(t, e);
      a.axis = a.axis || "x";
      var o = vn(a.axis),
        l = a.intersect ? cn(e, n) : hn(e, n, !1, o),
        u = [];
      return l.length
        ? (e._getSortedVisibleDatasetMetas().forEach(function (h) {
            var f = h.data[l[0]._index];
            f && !f._view.skip && u.push(f);
          }),
          u)
        : [];
    }
    var Qt = {
        modes: {
          single: function (e, t) {
            var a = Lt(t, e),
              n = [];
            return (
              kr(e, function (o) {
                if (o.inRange(a.x, a.y)) return n.push(o), n;
              }),
              n.slice(0, 1)
            );
          },
          label: gn,
          index: gn,
          dataset: function (e, t, a) {
            var n = Lt(t, e);
            a.axis = a.axis || "xy";
            var o = vn(a.axis),
              l = a.intersect ? cn(e, n) : hn(e, n, !1, o);
            return (
              l.length > 0 && (l = e.getDatasetMeta(l[0]._datasetIndex).data), l
            );
          },
          "x-axis": function (e, t) {
            return gn(e, t, { intersect: !1 });
          },
          point: function (e, t) {
            var a = Lt(t, e);
            return cn(e, a);
          },
          nearest: function (e, t, a) {
            var n = Lt(t, e);
            a.axis = a.axis || "xy";
            var o = vn(a.axis);
            return hn(e, n, a.intersect, o);
          },
          x: function (e, t, a) {
            var n = Lt(t, e),
              o = [],
              l = !1;
            return (
              kr(e, function (u) {
                u.inXRange(n.x) && o.push(u), u.inRange(n.x, n.y) && (l = !0);
              }),
              a.intersect && !l && (o = []),
              o
            );
          },
          y: function (e, t, a) {
            var n = Lt(t, e),
              o = [],
              l = !1;
            return (
              kr(e, function (u) {
                u.inYRange(n.y) && o.push(u), u.inRange(n.x, n.y) && (l = !0);
              }),
              a.intersect && !l && (o = []),
              o
            );
          },
        },
      },
      mn = b.extend;
    function Sr(e, t) {
      return b.where(e, function (a) {
        return a.pos === t;
      });
    }
    function na(e, t) {
      return e.sort(function (a, n) {
        var o = t ? n : a,
          l = t ? a : n;
        return o.weight === l.weight ? o.index - l.index : o.weight - l.weight;
      });
    }
    function hu(e) {
      var t = [],
        a,
        n,
        o;
      for (a = 0, n = (e || []).length; a < n; ++a)
        (o = e[a]),
          t.push({
            index: a,
            box: o,
            pos: o.position,
            horizontal: o.isHorizontal(),
            weight: o.weight,
          });
      return t;
    }
    function vu(e, t) {
      var a, n, o;
      for (a = 0, n = e.length; a < n; ++a)
        (o = e[a]),
          (o.width = o.horizontal
            ? o.box.fullWidth && t.availableWidth
            : t.vBoxMaxWidth),
          (o.height = o.horizontal && t.hBoxMaxHeight);
    }
    function gu(e) {
      var t = hu(e),
        a = na(Sr(t, "left"), !0),
        n = na(Sr(t, "right")),
        o = na(Sr(t, "top"), !0),
        l = na(Sr(t, "bottom"));
      return {
        leftAndTop: a.concat(o),
        rightAndBottom: n.concat(l),
        chartArea: Sr(t, "chartArea"),
        vertical: a.concat(n),
        horizontal: o.concat(l),
      };
    }
    function Ji(e, t, a, n) {
      return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
    }
    function mu(e, t, a) {
      var n = a.box,
        o = e.maxPadding,
        l,
        u;
      if (
        (a.size && (e[a.pos] -= a.size),
        (a.size = a.horizontal ? n.height : n.width),
        (e[a.pos] += a.size),
        n.getPadding)
      ) {
        var h = n.getPadding();
        (o.top = Math.max(o.top, h.top)),
          (o.left = Math.max(o.left, h.left)),
          (o.bottom = Math.max(o.bottom, h.bottom)),
          (o.right = Math.max(o.right, h.right));
      }
      if (
        ((l = t.outerWidth - Ji(o, e, "left", "right")),
        (u = t.outerHeight - Ji(o, e, "top", "bottom")),
        l !== e.w || u !== e.h)
      ) {
        (e.w = l), (e.h = u);
        var f = a.horizontal ? [l, e.w] : [u, e.h];
        return f[0] !== f[1] && (!isNaN(f[0]) || !isNaN(f[1]));
      }
    }
    function pu(e) {
      var t = e.maxPadding;
      function a(n) {
        var o = Math.max(t[n] - e[n], 0);
        return (e[n] += o), o;
      }
      (e.y += a("top")), (e.x += a("left")), a("right"), a("bottom");
    }
    function bu(e, t) {
      var a = t.maxPadding;
      function n(o) {
        var l = { left: 0, top: 0, right: 0, bottom: 0 };
        return (
          o.forEach(function (u) {
            l[u] = Math.max(t[u], a[u]);
          }),
          l
        );
      }
      return n(e ? ["left", "right"] : ["top", "bottom"]);
    }
    function ia(e, t, a) {
      var n = [],
        o,
        l,
        u,
        h,
        f,
        v;
      for (o = 0, l = e.length; o < l; ++o)
        (u = e[o]),
          (h = u.box),
          h.update(u.width || t.w, u.height || t.h, bu(u.horizontal, t)),
          mu(t, a, u) && ((v = !0), n.length && (f = !0)),
          h.fullWidth || n.push(u);
      return (f && ia(n, t, a)) || v;
    }
    function eo(e, t, a) {
      var n = a.padding,
        o = t.x,
        l = t.y,
        u,
        h,
        f,
        v;
      for (u = 0, h = e.length; u < h; ++u)
        (f = e[u]),
          (v = f.box),
          f.horizontal
            ? ((v.left = v.fullWidth ? n.left : t.left),
              (v.right = v.fullWidth ? a.outerWidth - n.right : t.left + t.w),
              (v.top = l),
              (v.bottom = l + v.height),
              (v.width = v.right - v.left),
              (l = v.bottom))
            : ((v.left = o),
              (v.right = o + v.width),
              (v.top = t.top),
              (v.bottom = t.top + t.h),
              (v.height = v.bottom - v.top),
              (o = v.right));
      (t.x = o), (t.y = l);
    }
    N._set("global", {
      layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
    });
    var Ne = {
        defaults: {},
        addBox: function (e, t) {
          e.boxes || (e.boxes = []),
            (t.fullWidth = t.fullWidth || !1),
            (t.position = t.position || "top"),
            (t.weight = t.weight || 0),
            (t._layers =
              t._layers ||
              function () {
                return [
                  {
                    z: 0,
                    draw: function () {
                      t.draw.apply(t, arguments);
                    },
                  },
                ];
              }),
            e.boxes.push(t);
        },
        removeBox: function (e, t) {
          var a = e.boxes ? e.boxes.indexOf(t) : -1;
          a !== -1 && e.boxes.splice(a, 1);
        },
        configure: function (e, t, a) {
          for (
            var n = ["fullWidth", "position", "weight"], o = n.length, l = 0, u;
            l < o;
            ++l
          )
            (u = n[l]), a.hasOwnProperty(u) && (t[u] = a[u]);
        },
        update: function (e, t, a) {
          if (!!e) {
            var n = e.options.layout || {},
              o = b.options.toPadding(n.padding),
              l = t - o.width,
              u = a - o.height,
              h = gu(e.boxes),
              f = h.vertical,
              v = h.horizontal,
              g = Object.freeze({
                outerWidth: t,
                outerHeight: a,
                padding: o,
                availableWidth: l,
                vBoxMaxWidth: l / 2 / f.length,
                hBoxMaxHeight: u / 2,
              }),
              m = mn(
                { maxPadding: mn({}, o), w: l, h: u, x: o.left, y: o.top },
                o
              );
            vu(f.concat(v), g),
              ia(f, m, g),
              ia(v, m, g) && ia(f, m, g),
              pu(m),
              eo(h.leftAndTop, m, g),
              (m.x += m.w),
              (m.y += m.h),
              eo(h.rightAndBottom, m, g),
              (e.chartArea = {
                left: m.left,
                top: m.top,
                right: m.left + m.w,
                bottom: m.top + m.h,
              }),
              b.each(h.chartArea, function (y) {
                var x = y.box;
                mn(x, e.chartArea), x.update(m.w, m.h);
              });
          }
        },
      },
      yu = {
        acquireContext: function (e) {
          return (
            e && e.canvas && (e = e.canvas), (e && e.getContext("2d")) || null
          );
        },
      },
      _u = `/*\r
 * DOM element rendering detection\r
 * https://davidwalsh.name/detect-node-insertion\r
 */\r
@keyframes chartjs-render-animation {\r
	from { opacity: 0.99; }\r
	to { opacity: 1; }\r
}\r
\r
.chartjs-render-monitor {\r
	animation: chartjs-render-animation 0.001s;\r
}\r
\r
/*\r
 * DOM element resizing detection\r
 * https://github.com/marcj/css-element-queries\r
 */\r
.chartjs-size-monitor,\r
.chartjs-size-monitor-expand,\r
.chartjs-size-monitor-shrink {\r
	position: absolute;\r
	direction: ltr;\r
	left: 0;\r
	top: 0;\r
	right: 0;\r
	bottom: 0;\r
	overflow: hidden;\r
	pointer-events: none;\r
	visibility: hidden;\r
	z-index: -1;\r
}\r
\r
.chartjs-size-monitor-expand > div {\r
	position: absolute;\r
	width: 1000000px;\r
	height: 1000000px;\r
	left: 0;\r
	top: 0;\r
}\r
\r
.chartjs-size-monitor-shrink > div {\r
	position: absolute;\r
	width: 200%;\r
	height: 200%;\r
	left: 0;\r
	top: 0;\r
}\r
`,
      xu = Object.freeze({ __proto__: null, default: _u }),
      wu = c(xu),
      ye = "$chartjs",
      pn = "chartjs-",
      bn = pn + "size-monitor",
      to = pn + "render-monitor",
      Mu = pn + "render-animation",
      ro = ["animationstart", "webkitAnimationStart"],
      ku = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout",
      };
    function ao(e, t) {
      var a = b.getStyle(e, t),
        n = a && a.match(/^(\d+)(\.\d+)?px$/);
      return n ? Number(n[1]) : void 0;
    }
    function Su(e, t) {
      var a = e.style,
        n = e.getAttribute("height"),
        o = e.getAttribute("width");
      if (
        ((e[ye] = {
          initial: {
            height: n,
            width: o,
            style: { display: a.display, height: a.height, width: a.width },
          },
        }),
        (a.display = a.display || "block"),
        o === null || o === "")
      ) {
        var l = ao(e, "width");
        l !== void 0 && (e.width = l);
      }
      if (n === null || n === "")
        if (e.style.height === "")
          e.height = e.width / (t.options.aspectRatio || 2);
        else {
          var u = ao(e, "height");
          l !== void 0 && (e.height = u);
        }
      return e;
    }
    var Du = (function () {
        var e = !1;
        try {
          var t = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
          window.addEventListener("e", null, t);
        } catch {}
        return e;
      })(),
      no = Du ? { passive: !0 } : !1;
    function Dr(e, t, a) {
      e.addEventListener(t, a, no);
    }
    function yn(e, t, a) {
      e.removeEventListener(t, a, no);
    }
    function _n(e, t, a, n, o) {
      return {
        type: e,
        chart: t,
        native: o || null,
        x: a !== void 0 ? a : null,
        y: n !== void 0 ? n : null,
      };
    }
    function Tu(e, t) {
      var a = ku[e.type] || e.type,
        n = b.getRelativePosition(e, t);
      return _n(a, t, n.x, n.y, e);
    }
    function Cu(e, t) {
      var a = !1,
        n = [];
      return function () {
        (n = Array.prototype.slice.call(arguments)),
          (t = t || this),
          a ||
            ((a = !0),
            b.requestAnimFrame.call(window, function () {
              (a = !1), e.apply(t, n);
            }));
      };
    }
    function Tr(e) {
      var t = document.createElement("div");
      return (t.className = e || ""), t;
    }
    function Ou(e) {
      var t = 1e6,
        a = Tr(bn),
        n = Tr(bn + "-expand"),
        o = Tr(bn + "-shrink");
      n.appendChild(Tr()),
        o.appendChild(Tr()),
        a.appendChild(n),
        a.appendChild(o),
        (a._reset = function () {
          (n.scrollLeft = t),
            (n.scrollTop = t),
            (o.scrollLeft = t),
            (o.scrollTop = t);
        });
      var l = function () {
        a._reset(), e();
      };
      return (
        Dr(n, "scroll", l.bind(n, "expand")),
        Dr(o, "scroll", l.bind(o, "shrink")),
        a
      );
    }
    function Pu(e, t) {
      var a = e[ye] || (e[ye] = {}),
        n = (a.renderProxy = function (o) {
          o.animationName === Mu && t();
        });
      b.each(ro, function (o) {
        Dr(e, o, n);
      }),
        (a.reflow = !!e.offsetParent),
        e.classList.add(to);
    }
    function Fu(e) {
      var t = e[ye] || {},
        a = t.renderProxy;
      a &&
        (b.each(ro, function (n) {
          yn(e, n, a);
        }),
        delete t.renderProxy),
        e.classList.remove(to);
    }
    function Iu(e, t, a) {
      var n = e[ye] || (e[ye] = {}),
        o = (n.resizer = Ou(
          Cu(function () {
            if (n.resizer) {
              var l = a.options.maintainAspectRatio && e.parentNode,
                u = l ? l.clientWidth : 0;
              t(_n("resize", a)),
                l && l.clientWidth < u && a.canvas && t(_n("resize", a));
            }
          })
        ));
      Pu(e, function () {
        if (n.resizer) {
          var l = e.parentNode;
          l && l !== o.parentNode && l.insertBefore(o, l.firstChild),
            o._reset();
        }
      });
    }
    function Au(e) {
      var t = e[ye] || {},
        a = t.resizer;
      delete t.resizer, Fu(e), a && a.parentNode && a.parentNode.removeChild(a);
    }
    function Nu(e, t) {
      var a = e[ye] || (e[ye] = {});
      if (!a.containsStyles) {
        (a.containsStyles = !0),
          (t =
            `/* Chart.js */
` + t);
        var n = document.createElement("style");
        n.setAttribute("type", "text/css"),
          n.appendChild(document.createTextNode(t)),
          e.appendChild(n);
      }
    }
    var io = {
      disableCSSInjection: !1,
      _enabled: typeof window < "u" && typeof document < "u",
      _ensureLoaded: function (e) {
        if (!this.disableCSSInjection) {
          var t = e.getRootNode ? e.getRootNode() : document,
            a = t.host ? t : document.head;
          Nu(a, wu);
        }
      },
      acquireContext: function (e, t) {
        typeof e == "string"
          ? (e = document.getElementById(e))
          : e.length && (e = e[0]),
          e && e.canvas && (e = e.canvas);
        var a = e && e.getContext && e.getContext("2d");
        return a && a.canvas === e
          ? (this._ensureLoaded(e), Su(e, t), a)
          : null;
      },
      releaseContext: function (e) {
        var t = e.canvas;
        if (!!t[ye]) {
          var a = t[ye].initial;
          ["height", "width"].forEach(function (n) {
            var o = a[n];
            b.isNullOrUndef(o) ? t.removeAttribute(n) : t.setAttribute(n, o);
          }),
            b.each(a.style || {}, function (n, o) {
              t.style[o] = n;
            }),
            (t.width = t.width),
            delete t[ye];
        }
      },
      addEventListener: function (e, t, a) {
        var n = e.canvas;
        if (t === "resize") {
          Iu(n, a, e);
          return;
        }
        var o = a[ye] || (a[ye] = {}),
          l = o.proxies || (o.proxies = {}),
          u = (l[e.id + "_" + t] = function (h) {
            a(Tu(h, e));
          });
        Dr(n, t, u);
      },
      removeEventListener: function (e, t, a) {
        var n = e.canvas;
        if (t === "resize") {
          Au(n);
          return;
        }
        var o = a[ye] || {},
          l = o.proxies || {},
          u = l[e.id + "_" + t];
        !u || yn(n, t, u);
      },
    };
    (b.addEvent = Dr), (b.removeEvent = yn);
    var Ru = io._enabled ? io : yu,
      Jt = b.extend(
        {
          initialize: function () {},
          acquireContext: function () {},
          releaseContext: function () {},
          addEventListener: function () {},
          removeEventListener: function () {},
        },
        Ru
      );
    N._set("global", { plugins: {} });
    var J = {
        _plugins: [],
        _cacheId: 0,
        register: function (e) {
          var t = this._plugins;
          [].concat(e).forEach(function (a) {
            t.indexOf(a) === -1 && t.push(a);
          }),
            this._cacheId++;
        },
        unregister: function (e) {
          var t = this._plugins;
          [].concat(e).forEach(function (a) {
            var n = t.indexOf(a);
            n !== -1 && t.splice(n, 1);
          }),
            this._cacheId++;
        },
        clear: function () {
          (this._plugins = []), this._cacheId++;
        },
        count: function () {
          return this._plugins.length;
        },
        getAll: function () {
          return this._plugins;
        },
        notify: function (e, t, a) {
          var n = this.descriptors(e),
            o = n.length,
            l,
            u,
            h,
            f,
            v;
          for (l = 0; l < o; ++l)
            if (
              ((u = n[l]),
              (h = u.plugin),
              (v = h[t]),
              typeof v == "function" &&
                ((f = [e].concat(a || [])),
                f.push(u.options),
                v.apply(h, f) === !1))
            )
              return !1;
          return !0;
        },
        descriptors: function (e) {
          var t = e.$plugins || (e.$plugins = {});
          if (t.id === this._cacheId) return t.descriptors;
          var a = [],
            n = [],
            o = (e && e.config) || {},
            l = (o.options && o.options.plugins) || {};
          return (
            this._plugins.concat(o.plugins || []).forEach(function (u) {
              var h = a.indexOf(u);
              if (h === -1) {
                var f = u.id,
                  v = l[f];
                v !== !1 &&
                  (v === !0 && (v = b.clone(N.global.plugins[f])),
                  a.push(u),
                  n.push({ plugin: u, options: v || {} }));
              }
            }),
            (t.descriptors = n),
            (t.id = this._cacheId),
            n
          );
        },
        _invalidate: function (e) {
          delete e.$plugins;
        },
      },
      Cr = {
        constructors: {},
        defaults: {},
        registerScaleType: function (e, t, a) {
          (this.constructors[e] = t), (this.defaults[e] = b.clone(a));
        },
        getScaleConstructor: function (e) {
          return this.constructors.hasOwnProperty(e)
            ? this.constructors[e]
            : void 0;
        },
        getScaleDefaults: function (e) {
          return this.defaults.hasOwnProperty(e)
            ? b.merge(Object.create(null), [N.scale, this.defaults[e]])
            : {};
        },
        updateScaleDefaults: function (e, t) {
          var a = this;
          a.defaults.hasOwnProperty(e) &&
            (a.defaults[e] = b.extend(a.defaults[e], t));
        },
        addScalesToLayout: function (e) {
          b.each(e.scales, function (t) {
            (t.fullWidth = t.options.fullWidth),
              (t.position = t.options.position),
              (t.weight = t.options.weight),
              Ne.addBox(e, t);
          });
        },
      },
      at = b.valueOrDefault,
      xn = b.rtl.getRtlAdapter;
    N._set("global", {
      tooltips: {
        enabled: !0,
        custom: null,
        mode: "nearest",
        position: "average",
        intersect: !0,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontStyle: "bold",
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleFontColor: "#fff",
        titleAlign: "left",
        bodySpacing: 2,
        bodyFontColor: "#fff",
        bodyAlign: "left",
        footerFontStyle: "bold",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFontColor: "#fff",
        footerAlign: "left",
        yPadding: 6,
        xPadding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        multiKeyBackground: "#fff",
        displayColors: !0,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        callbacks: {
          beforeTitle: b.noop,
          title: function (e, t) {
            var a = "",
              n = t.labels,
              o = n ? n.length : 0;
            if (e.length > 0) {
              var l = e[0];
              l.label
                ? (a = l.label)
                : l.xLabel
                ? (a = l.xLabel)
                : o > 0 && l.index < o && (a = n[l.index]);
            }
            return a;
          },
          afterTitle: b.noop,
          beforeBody: b.noop,
          beforeLabel: b.noop,
          label: function (e, t) {
            var a = t.datasets[e.datasetIndex].label || "";
            return (
              a && (a += ": "),
              b.isNullOrUndef(e.value) ? (a += e.yLabel) : (a += e.value),
              a
            );
          },
          labelColor: function (e, t) {
            var a = t.getDatasetMeta(e.datasetIndex),
              n = a.data[e.index],
              o = n._view;
            return {
              borderColor: o.borderColor,
              backgroundColor: o.backgroundColor,
            };
          },
          labelTextColor: function () {
            return this._options.bodyFontColor;
          },
          afterLabel: b.noop,
          afterBody: b.noop,
          beforeFooter: b.noop,
          footer: b.noop,
          afterFooter: b.noop,
        },
      },
    });
    var oo = {
      average: function (e) {
        if (!e.length) return !1;
        var t,
          a,
          n = 0,
          o = 0,
          l = 0;
        for (t = 0, a = e.length; t < a; ++t) {
          var u = e[t];
          if (u && u.hasValue()) {
            var h = u.tooltipPosition();
            (n += h.x), (o += h.y), ++l;
          }
        }
        return { x: n / l, y: o / l };
      },
      nearest: function (e, t) {
        var a = t.x,
          n = t.y,
          o = Number.POSITIVE_INFINITY,
          l,
          u,
          h;
        for (l = 0, u = e.length; l < u; ++l) {
          var f = e[l];
          if (f && f.hasValue()) {
            var v = f.getCenterPoint(),
              g = b.distanceBetweenPoints(t, v);
            g < o && ((o = g), (h = f));
          }
        }
        if (h) {
          var m = h.tooltipPosition();
          (a = m.x), (n = m.y);
        }
        return { x: a, y: n };
      },
    };
    function Ge(e, t) {
      return (
        t && (b.isArray(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e
      );
    }
    function nt(e) {
      return (typeof e == "string" || e instanceof String) &&
        e.indexOf(`
`) > -1
        ? e.split(`
`)
        : e;
    }
    function Lu(e) {
      var t = e._xScale,
        a = e._yScale || e._scale,
        n = e._index,
        o = e._datasetIndex,
        l = e._chart.getDatasetMeta(o).controller,
        u = l._getIndexScale(),
        h = l._getValueScale();
      return {
        xLabel: t ? t.getLabelForIndex(n, o) : "",
        yLabel: a ? a.getLabelForIndex(n, o) : "",
        label: u ? "" + u.getLabelForIndex(n, o) : "",
        value: h ? "" + h.getLabelForIndex(n, o) : "",
        index: n,
        datasetIndex: o,
        x: e._model.x,
        y: e._model.y,
      };
    }
    function so(e) {
      var t = N.global;
      return {
        xPadding: e.xPadding,
        yPadding: e.yPadding,
        xAlign: e.xAlign,
        yAlign: e.yAlign,
        rtl: e.rtl,
        textDirection: e.textDirection,
        bodyFontColor: e.bodyFontColor,
        _bodyFontFamily: at(e.bodyFontFamily, t.defaultFontFamily),
        _bodyFontStyle: at(e.bodyFontStyle, t.defaultFontStyle),
        _bodyAlign: e.bodyAlign,
        bodyFontSize: at(e.bodyFontSize, t.defaultFontSize),
        bodySpacing: e.bodySpacing,
        titleFontColor: e.titleFontColor,
        _titleFontFamily: at(e.titleFontFamily, t.defaultFontFamily),
        _titleFontStyle: at(e.titleFontStyle, t.defaultFontStyle),
        titleFontSize: at(e.titleFontSize, t.defaultFontSize),
        _titleAlign: e.titleAlign,
        titleSpacing: e.titleSpacing,
        titleMarginBottom: e.titleMarginBottom,
        footerFontColor: e.footerFontColor,
        _footerFontFamily: at(e.footerFontFamily, t.defaultFontFamily),
        _footerFontStyle: at(e.footerFontStyle, t.defaultFontStyle),
        footerFontSize: at(e.footerFontSize, t.defaultFontSize),
        _footerAlign: e.footerAlign,
        footerSpacing: e.footerSpacing,
        footerMarginTop: e.footerMarginTop,
        caretSize: e.caretSize,
        cornerRadius: e.cornerRadius,
        backgroundColor: e.backgroundColor,
        opacity: 0,
        legendColorBackground: e.multiKeyBackground,
        displayColors: e.displayColors,
        borderColor: e.borderColor,
        borderWidth: e.borderWidth,
      };
    }
    function Wu(e, t) {
      var a = e._chart.ctx,
        n = t.yPadding * 2,
        o = 0,
        l = t.body,
        u = l.reduce(function (w, M) {
          return w + M.before.length + M.lines.length + M.after.length;
        }, 0);
      u += t.beforeBody.length + t.afterBody.length;
      var h = t.title.length,
        f = t.footer.length,
        v = t.titleFontSize,
        g = t.bodyFontSize,
        m = t.footerFontSize;
      (n += h * v),
        (n += h ? (h - 1) * t.titleSpacing : 0),
        (n += h ? t.titleMarginBottom : 0),
        (n += u * g),
        (n += u ? (u - 1) * t.bodySpacing : 0),
        (n += f ? t.footerMarginTop : 0),
        (n += f * m),
        (n += f ? (f - 1) * t.footerSpacing : 0);
      var y = 0,
        x = function (w) {
          o = Math.max(o, a.measureText(w).width + y);
        };
      return (
        (a.font = b.fontString(v, t._titleFontStyle, t._titleFontFamily)),
        b.each(t.title, x),
        (a.font = b.fontString(g, t._bodyFontStyle, t._bodyFontFamily)),
        b.each(t.beforeBody.concat(t.afterBody), x),
        (y = t.displayColors ? g + 2 : 0),
        b.each(l, function (w) {
          b.each(w.before, x), b.each(w.lines, x), b.each(w.after, x);
        }),
        (y = 0),
        (a.font = b.fontString(m, t._footerFontStyle, t._footerFontFamily)),
        b.each(t.footer, x),
        (o += 2 * t.xPadding),
        { width: o, height: n }
      );
    }
    function Eu(e, t) {
      var a = e._model,
        n = e._chart,
        o = e._chart.chartArea,
        l = "center",
        u = "center";
      a.y < t.height
        ? (u = "top")
        : a.y > n.height - t.height && (u = "bottom");
      var h,
        f,
        v,
        g,
        m,
        y = (o.left + o.right) / 2,
        x = (o.top + o.bottom) / 2;
      u === "center"
        ? ((h = function (M) {
            return M <= y;
          }),
          (f = function (M) {
            return M > y;
          }))
        : ((h = function (M) {
            return M <= t.width / 2;
          }),
          (f = function (M) {
            return M >= n.width - t.width / 2;
          })),
        (v = function (M) {
          return M + t.width + a.caretSize + a.caretPadding > n.width;
        }),
        (g = function (M) {
          return M - t.width - a.caretSize - a.caretPadding < 0;
        }),
        (m = function (M) {
          return M <= x ? "top" : "bottom";
        }),
        h(a.x)
          ? ((l = "left"), v(a.x) && ((l = "center"), (u = m(a.y))))
          : f(a.x) && ((l = "right"), g(a.x) && ((l = "center"), (u = m(a.y))));
      var w = e._options;
      return {
        xAlign: w.xAlign ? w.xAlign : l,
        yAlign: w.yAlign ? w.yAlign : u,
      };
    }
    function Yu(e, t, a, n) {
      var o = e.x,
        l = e.y,
        u = e.caretSize,
        h = e.caretPadding,
        f = e.cornerRadius,
        v = a.xAlign,
        g = a.yAlign,
        m = u + h,
        y = f + h;
      return (
        v === "right"
          ? (o -= t.width)
          : v === "center" &&
            ((o -= t.width / 2),
            o + t.width > n.width && (o = n.width - t.width),
            o < 0 && (o = 0)),
        g === "top"
          ? (l += m)
          : g === "bottom"
          ? (l -= t.height + m)
          : (l -= t.height / 2),
        g === "center"
          ? v === "left"
            ? (o += m)
            : v === "right" && (o -= m)
          : v === "left"
          ? (o -= y)
          : v === "right" && (o += y),
        { x: o, y: l }
      );
    }
    function oa(e, t) {
      return t === "center"
        ? e.x + e.width / 2
        : t === "right"
        ? e.x + e.width - e.xPadding
        : e.x + e.xPadding;
    }
    function lo(e) {
      return Ge([], nt(e));
    }
    var zu = je.extend({
        initialize: function () {
          (this._model = so(this._options)), (this._lastActive = []);
        },
        getTitle: function () {
          var e = this,
            t = e._options,
            a = t.callbacks,
            n = a.beforeTitle.apply(e, arguments),
            o = a.title.apply(e, arguments),
            l = a.afterTitle.apply(e, arguments),
            u = [];
          return (u = Ge(u, nt(n))), (u = Ge(u, nt(o))), (u = Ge(u, nt(l))), u;
        },
        getBeforeBody: function () {
          return lo(this._options.callbacks.beforeBody.apply(this, arguments));
        },
        getBody: function (e, t) {
          var a = this,
            n = a._options.callbacks,
            o = [];
          return (
            b.each(e, function (l) {
              var u = { before: [], lines: [], after: [] };
              Ge(u.before, nt(n.beforeLabel.call(a, l, t))),
                Ge(u.lines, n.label.call(a, l, t)),
                Ge(u.after, nt(n.afterLabel.call(a, l, t))),
                o.push(u);
            }),
            o
          );
        },
        getAfterBody: function () {
          return lo(this._options.callbacks.afterBody.apply(this, arguments));
        },
        getFooter: function () {
          var e = this,
            t = e._options.callbacks,
            a = t.beforeFooter.apply(e, arguments),
            n = t.footer.apply(e, arguments),
            o = t.afterFooter.apply(e, arguments),
            l = [];
          return (l = Ge(l, nt(a))), (l = Ge(l, nt(n))), (l = Ge(l, nt(o))), l;
        },
        update: function (e) {
          var t = this,
            a = t._options,
            n = t._model,
            o = (t._model = so(a)),
            l = t._active,
            u = t._data,
            h = { xAlign: n.xAlign, yAlign: n.yAlign },
            f = { x: n.x, y: n.y },
            v = { width: n.width, height: n.height },
            g = { x: n.caretX, y: n.caretY },
            m,
            y;
          if (l.length) {
            o.opacity = 1;
            var x = [],
              w = [];
            g = oo[a.position].call(t, l, t._eventPosition);
            var M = [];
            for (m = 0, y = l.length; m < y; ++m) M.push(Lu(l[m]));
            a.filter &&
              (M = M.filter(function (k) {
                return a.filter(k, u);
              })),
              a.itemSort &&
                (M = M.sort(function (k, D) {
                  return a.itemSort(k, D, u);
                })),
              b.each(M, function (k) {
                x.push(a.callbacks.labelColor.call(t, k, t._chart)),
                  w.push(a.callbacks.labelTextColor.call(t, k, t._chart));
              }),
              (o.title = t.getTitle(M, u)),
              (o.beforeBody = t.getBeforeBody(M, u)),
              (o.body = t.getBody(M, u)),
              (o.afterBody = t.getAfterBody(M, u)),
              (o.footer = t.getFooter(M, u)),
              (o.x = g.x),
              (o.y = g.y),
              (o.caretPadding = a.caretPadding),
              (o.labelColors = x),
              (o.labelTextColors = w),
              (o.dataPoints = M),
              (v = Wu(this, o)),
              (h = Eu(this, v)),
              (f = Yu(o, v, h, t._chart));
          } else o.opacity = 0;
          return (
            (o.xAlign = h.xAlign),
            (o.yAlign = h.yAlign),
            (o.x = f.x),
            (o.y = f.y),
            (o.width = v.width),
            (o.height = v.height),
            (o.caretX = g.x),
            (o.caretY = g.y),
            (t._model = o),
            e && a.custom && a.custom.call(t, o),
            t
          );
        },
        drawCaret: function (e, t) {
          var a = this._chart.ctx,
            n = this._view,
            o = this.getCaretPosition(e, t, n);
          a.lineTo(o.x1, o.y1), a.lineTo(o.x2, o.y2), a.lineTo(o.x3, o.y3);
        },
        getCaretPosition: function (e, t, a) {
          var n,
            o,
            l,
            u,
            h,
            f,
            v = a.caretSize,
            g = a.cornerRadius,
            m = a.xAlign,
            y = a.yAlign,
            x = e.x,
            w = e.y,
            M = t.width,
            k = t.height;
          if (y === "center")
            (h = w + k / 2),
              m === "left"
                ? ((n = x), (o = n - v), (l = n), (u = h + v), (f = h - v))
                : ((n = x + M), (o = n + v), (l = n), (u = h - v), (f = h + v));
          else if (
            (m === "left"
              ? ((o = x + g + v), (n = o - v), (l = o + v))
              : m === "right"
              ? ((o = x + M - g - v), (n = o - v), (l = o + v))
              : ((o = a.caretX), (n = o - v), (l = o + v)),
            y === "top")
          )
            (u = w), (h = u - v), (f = u);
          else {
            (u = w + k), (h = u + v), (f = u);
            var D = l;
            (l = n), (n = D);
          }
          return { x1: n, x2: o, x3: l, y1: u, y2: h, y3: f };
        },
        drawTitle: function (e, t, a) {
          var n = t.title,
            o = n.length,
            l,
            u,
            h;
          if (o) {
            var f = xn(t.rtl, t.x, t.width);
            for (
              e.x = oa(t, t._titleAlign),
                a.textAlign = f.textAlign(t._titleAlign),
                a.textBaseline = "middle",
                l = t.titleFontSize,
                u = t.titleSpacing,
                a.fillStyle = t.titleFontColor,
                a.font = b.fontString(l, t._titleFontStyle, t._titleFontFamily),
                h = 0;
              h < o;
              ++h
            )
              a.fillText(n[h], f.x(e.x), e.y + l / 2),
                (e.y += l + u),
                h + 1 === o && (e.y += t.titleMarginBottom - u);
          }
        },
        drawBody: function (e, t, a) {
          var n = t.bodyFontSize,
            o = t.bodySpacing,
            l = t._bodyAlign,
            u = t.body,
            h = t.displayColors,
            f = 0,
            v = h ? oa(t, "left") : 0,
            g = xn(t.rtl, t.x, t.width),
            m = function (G) {
              a.fillText(G, g.x(e.x + f), e.y + n / 2), (e.y += n + o);
            },
            y,
            x,
            w,
            M,
            k,
            D,
            F,
            A,
            E = g.textAlign(l);
          for (
            a.textAlign = l,
              a.textBaseline = "middle",
              a.font = b.fontString(n, t._bodyFontStyle, t._bodyFontFamily),
              e.x = oa(t, E),
              a.fillStyle = t.bodyFontColor,
              b.each(t.beforeBody, m),
              f = h && E !== "right" ? (l === "center" ? n / 2 + 1 : n + 2) : 0,
              k = 0,
              F = u.length;
            k < F;
            ++k
          ) {
            for (
              y = u[k],
                x = t.labelTextColors[k],
                w = t.labelColors[k],
                a.fillStyle = x,
                b.each(y.before, m),
                M = y.lines,
                D = 0,
                A = M.length;
              D < A;
              ++D
            ) {
              if (h) {
                var W = g.x(v);
                (a.fillStyle = t.legendColorBackground),
                  a.fillRect(g.leftForLtr(W, n), e.y, n, n),
                  (a.lineWidth = 1),
                  (a.strokeStyle = w.borderColor),
                  a.strokeRect(g.leftForLtr(W, n), e.y, n, n),
                  (a.fillStyle = w.backgroundColor),
                  a.fillRect(
                    g.leftForLtr(g.xPlus(W, 1), n - 2),
                    e.y + 1,
                    n - 2,
                    n - 2
                  ),
                  (a.fillStyle = x);
              }
              m(M[D]);
            }
            b.each(y.after, m);
          }
          (f = 0), b.each(t.afterBody, m), (e.y -= o);
        },
        drawFooter: function (e, t, a) {
          var n = t.footer,
            o = n.length,
            l,
            u;
          if (o) {
            var h = xn(t.rtl, t.x, t.width);
            for (
              e.x = oa(t, t._footerAlign),
                e.y += t.footerMarginTop,
                a.textAlign = h.textAlign(t._footerAlign),
                a.textBaseline = "middle",
                l = t.footerFontSize,
                a.fillStyle = t.footerFontColor,
                a.font = b.fontString(
                  l,
                  t._footerFontStyle,
                  t._footerFontFamily
                ),
                u = 0;
              u < o;
              ++u
            )
              a.fillText(n[u], h.x(e.x), e.y + l / 2),
                (e.y += l + t.footerSpacing);
          }
        },
        drawBackground: function (e, t, a, n) {
          (a.fillStyle = t.backgroundColor),
            (a.strokeStyle = t.borderColor),
            (a.lineWidth = t.borderWidth);
          var o = t.xAlign,
            l = t.yAlign,
            u = e.x,
            h = e.y,
            f = n.width,
            v = n.height,
            g = t.cornerRadius;
          a.beginPath(),
            a.moveTo(u + g, h),
            l === "top" && this.drawCaret(e, n),
            a.lineTo(u + f - g, h),
            a.quadraticCurveTo(u + f, h, u + f, h + g),
            l === "center" && o === "right" && this.drawCaret(e, n),
            a.lineTo(u + f, h + v - g),
            a.quadraticCurveTo(u + f, h + v, u + f - g, h + v),
            l === "bottom" && this.drawCaret(e, n),
            a.lineTo(u + g, h + v),
            a.quadraticCurveTo(u, h + v, u, h + v - g),
            l === "center" && o === "left" && this.drawCaret(e, n),
            a.lineTo(u, h + g),
            a.quadraticCurveTo(u, h, u + g, h),
            a.closePath(),
            a.fill(),
            t.borderWidth > 0 && a.stroke();
        },
        draw: function () {
          var e = this._chart.ctx,
            t = this._view;
          if (t.opacity !== 0) {
            var a = { width: t.width, height: t.height },
              n = { x: t.x, y: t.y },
              o = Math.abs(t.opacity < 0.001) ? 0 : t.opacity,
              l =
                t.title.length ||
                t.beforeBody.length ||
                t.body.length ||
                t.afterBody.length ||
                t.footer.length;
            this._options.enabled &&
              l &&
              (e.save(),
              (e.globalAlpha = o),
              this.drawBackground(n, t, e, a),
              (n.y += t.yPadding),
              b.rtl.overrideTextDirection(e, t.textDirection),
              this.drawTitle(n, t, e),
              this.drawBody(n, t, e),
              this.drawFooter(n, t, e),
              b.rtl.restoreTextDirection(e, t.textDirection),
              e.restore());
          }
        },
        handleEvent: function (e) {
          var t = this,
            a = t._options,
            n = !1;
          return (
            (t._lastActive = t._lastActive || []),
            e.type === "mouseout"
              ? (t._active = [])
              : ((t._active = t._chart.getElementsAtEventForMode(e, a.mode, a)),
                a.reverse && t._active.reverse()),
            (n = !b.arrayEquals(t._active, t._lastActive)),
            n &&
              ((t._lastActive = t._active),
              (a.enabled || a.custom) &&
                ((t._eventPosition = { x: e.x, y: e.y }),
                t.update(!0),
                t.pivot())),
            n
          );
        },
      }),
      Bu = oo,
      wn = zu;
    wn.positioners = Bu;
    var Mn = b.valueOrDefault;
    N._set("global", {
      elements: {},
      events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
      hover: {
        onHover: null,
        mode: "nearest",
        intersect: !0,
        animationDuration: 400,
      },
      onClick: null,
      maintainAspectRatio: !0,
      responsive: !0,
      responsiveAnimationDuration: 0,
    });
    function uo() {
      return b.merge(Object.create(null), [].slice.call(arguments), {
        merger: function (e, t, a, n) {
          if (e === "xAxes" || e === "yAxes") {
            var o = a[e].length,
              l,
              u,
              h;
            for (t[e] || (t[e] = []), l = 0; l < o; ++l)
              (h = a[e][l]),
                (u = Mn(h.type, e === "xAxes" ? "category" : "linear")),
                l >= t[e].length && t[e].push({}),
                !t[e][l].type || (h.type && h.type !== t[e][l].type)
                  ? b.merge(t[e][l], [Cr.getScaleDefaults(u), h])
                  : b.merge(t[e][l], h);
          } else b._merger(e, t, a, n);
        },
      });
    }
    function kn() {
      return b.merge(Object.create(null), [].slice.call(arguments), {
        merger: function (e, t, a, n) {
          var o = t[e] || Object.create(null),
            l = a[e];
          e === "scales"
            ? (t[e] = uo(o, l))
            : e === "scale"
            ? (t[e] = b.merge(o, [Cr.getScaleDefaults(l.type), l]))
            : b._merger(e, t, a, n);
        },
      });
    }
    function Hu(e) {
      e = e || Object.create(null);
      var t = (e.data = e.data || {});
      return (
        (t.datasets = t.datasets || []),
        (t.labels = t.labels || []),
        (e.options = kn(N.global, N[e.type], e.options || {})),
        e
      );
    }
    function Vu(e) {
      var t = e.options;
      b.each(e.scales, function (a) {
        Ne.removeBox(e, a);
      }),
        (t = kn(N.global, N[e.config.type], t)),
        (e.options = e.config.options = t),
        e.ensureScalesHaveIDs(),
        e.buildOrUpdateScales(),
        (e.tooltip._options = t.tooltips),
        e.tooltip.initialize();
    }
    function fo(e, t, a) {
      var n,
        o = function (l) {
          return l.id === n;
        };
      do n = t + a++;
      while (b.findIndex(e, o) >= 0);
      return n;
    }
    function co(e) {
      return e === "top" || e === "bottom";
    }
    function ho(e, t) {
      return function (a, n) {
        return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
      };
    }
    var mt = function (e, t) {
      return this.construct(e, t), this;
    };
    b.extend(mt.prototype, {
      construct: function (e, t) {
        var a = this;
        t = Hu(t);
        var n = Jt.acquireContext(e, t),
          o = n && n.canvas,
          l = o && o.height,
          u = o && o.width;
        if (
          ((a.id = b.uid()),
          (a.ctx = n),
          (a.canvas = o),
          (a.config = t),
          (a.width = u),
          (a.height = l),
          (a.aspectRatio = l ? u / l : null),
          (a.options = t.options),
          (a._bufferedRender = !1),
          (a._layers = []),
          (a.chart = a),
          (a.controller = a),
          (mt.instances[a.id] = a),
          Object.defineProperty(a, "data", {
            get: function () {
              return a.config.data;
            },
            set: function (h) {
              a.config.data = h;
            },
          }),
          !n || !o)
        ) {
          console.error(
            "Failed to create chart: can't acquire context from the given item"
          );
          return;
        }
        a.initialize(), a.update();
      },
      initialize: function () {
        var e = this;
        return (
          J.notify(e, "beforeInit"),
          b.retinaScale(e, e.options.devicePixelRatio),
          e.bindEvents(),
          e.options.responsive && e.resize(!0),
          e.initToolTip(),
          J.notify(e, "afterInit"),
          e
        );
      },
      clear: function () {
        return b.canvas.clear(this), this;
      },
      stop: function () {
        return ln.cancelAnimation(this), this;
      },
      resize: function (e) {
        var t = this,
          a = t.options,
          n = t.canvas,
          o = (a.maintainAspectRatio && t.aspectRatio) || null,
          l = Math.max(0, Math.floor(b.getMaximumWidth(n))),
          u = Math.max(0, Math.floor(o ? l / o : b.getMaximumHeight(n)));
        if (
          !(t.width === l && t.height === u) &&
          ((n.width = t.width = l),
          (n.height = t.height = u),
          (n.style.width = l + "px"),
          (n.style.height = u + "px"),
          b.retinaScale(t, a.devicePixelRatio),
          !e)
        ) {
          var h = { width: l, height: u };
          J.notify(t, "resize", [h]),
            a.onResize && a.onResize(t, h),
            t.stop(),
            t.update({ duration: a.responsiveAnimationDuration });
        }
      },
      ensureScalesHaveIDs: function () {
        var e = this.options,
          t = e.scales || {},
          a = e.scale;
        b.each(t.xAxes, function (n, o) {
          n.id || (n.id = fo(t.xAxes, "x-axis-", o));
        }),
          b.each(t.yAxes, function (n, o) {
            n.id || (n.id = fo(t.yAxes, "y-axis-", o));
          }),
          a && (a.id = a.id || "scale");
      },
      buildOrUpdateScales: function () {
        var e = this,
          t = e.options,
          a = e.scales || {},
          n = [],
          o = Object.keys(a).reduce(function (l, u) {
            return (l[u] = !1), l;
          }, {});
        t.scales &&
          (n = n.concat(
            (t.scales.xAxes || []).map(function (l) {
              return { options: l, dtype: "category", dposition: "bottom" };
            }),
            (t.scales.yAxes || []).map(function (l) {
              return { options: l, dtype: "linear", dposition: "left" };
            })
          )),
          t.scale &&
            n.push({
              options: t.scale,
              dtype: "radialLinear",
              isDefault: !0,
              dposition: "chartArea",
            }),
          b.each(n, function (l) {
            var u = l.options,
              h = u.id,
              f = Mn(u.type, l.dtype);
            co(u.position) !== co(l.dposition) && (u.position = l.dposition),
              (o[h] = !0);
            var v = null;
            if (h in a && a[h].type === f)
              (v = a[h]), (v.options = u), (v.ctx = e.ctx), (v.chart = e);
            else {
              var g = Cr.getScaleConstructor(f);
              if (!g) return;
              (v = new g({ id: h, type: f, options: u, ctx: e.ctx, chart: e })),
                (a[v.id] = v);
            }
            v.mergeTicksOptions(), l.isDefault && (e.scale = v);
          }),
          b.each(o, function (l, u) {
            l || delete a[u];
          }),
          (e.scales = a),
          Cr.addScalesToLayout(this);
      },
      buildOrUpdateControllers: function () {
        var e = this,
          t = [],
          a = e.data.datasets,
          n,
          o;
        for (n = 0, o = a.length; n < o; n++) {
          var l = a[n],
            u = e.getDatasetMeta(n),
            h = l.type || e.config.type;
          if (
            (u.type &&
              u.type !== h &&
              (e.destroyDatasetMeta(n), (u = e.getDatasetMeta(n))),
            (u.type = h),
            (u.order = l.order || 0),
            (u.index = n),
            u.controller)
          )
            u.controller.updateIndex(n), u.controller.linkScales();
          else {
            var f = Qi[u.type];
            if (f === void 0)
              throw new Error('"' + u.type + '" is not a chart type.');
            (u.controller = new f(e, n)), t.push(u.controller);
          }
        }
        return t;
      },
      resetElements: function () {
        var e = this;
        b.each(
          e.data.datasets,
          function (t, a) {
            e.getDatasetMeta(a).controller.reset();
          },
          e
        );
      },
      reset: function () {
        this.resetElements(), this.tooltip.initialize();
      },
      update: function (e) {
        var t = this,
          a,
          n;
        if (
          ((!e || typeof e != "object") &&
            (e = { duration: e, lazy: arguments[1] }),
          Vu(t),
          J._invalidate(t),
          J.notify(t, "beforeUpdate") !== !1)
        ) {
          t.tooltip._data = t.data;
          var o = t.buildOrUpdateControllers();
          for (a = 0, n = t.data.datasets.length; a < n; a++)
            t.getDatasetMeta(a).controller.buildOrUpdateElements();
          t.updateLayout(),
            t.options.animation &&
              t.options.animation.duration &&
              b.each(o, function (l) {
                l.reset();
              }),
            t.updateDatasets(),
            t.tooltip.initialize(),
            (t.lastActive = []),
            J.notify(t, "afterUpdate"),
            t._layers.sort(ho("z", "_idx")),
            t._bufferedRender
              ? (t._bufferedRequest = {
                  duration: e.duration,
                  easing: e.easing,
                  lazy: e.lazy,
                })
              : t.render(e);
        }
      },
      updateLayout: function () {
        var e = this;
        J.notify(e, "beforeLayout") !== !1 &&
          (Ne.update(this, this.width, this.height),
          (e._layers = []),
          b.each(
            e.boxes,
            function (t) {
              t._configure && t._configure(),
                e._layers.push.apply(e._layers, t._layers());
            },
            e
          ),
          e._layers.forEach(function (t, a) {
            t._idx = a;
          }),
          J.notify(e, "afterScaleUpdate"),
          J.notify(e, "afterLayout"));
      },
      updateDatasets: function () {
        var e = this;
        if (J.notify(e, "beforeDatasetsUpdate") !== !1) {
          for (var t = 0, a = e.data.datasets.length; t < a; ++t)
            e.updateDataset(t);
          J.notify(e, "afterDatasetsUpdate");
        }
      },
      updateDataset: function (e) {
        var t = this,
          a = t.getDatasetMeta(e),
          n = { meta: a, index: e };
        J.notify(t, "beforeDatasetUpdate", [n]) !== !1 &&
          (a.controller._update(), J.notify(t, "afterDatasetUpdate", [n]));
      },
      render: function (e) {
        var t = this;
        (!e || typeof e != "object") &&
          (e = { duration: e, lazy: arguments[1] });
        var a = t.options.animation,
          n = Mn(e.duration, a && a.duration),
          o = e.lazy;
        if (J.notify(t, "beforeRender") !== !1) {
          var l = function (h) {
            J.notify(t, "afterRender"), b.callback(a && a.onComplete, [h], t);
          };
          if (a && n) {
            var u = new sn({
              numSteps: n / 16.66,
              easing: e.easing || a.easing,
              render: function (h, f) {
                var v = b.easing.effects[f.easing],
                  g = f.currentStep,
                  m = g / f.numSteps;
                h.draw(v(m), m, g);
              },
              onAnimationProgress: a.onProgress,
              onAnimationComplete: l,
            });
            ln.addAnimation(t, u, n, o);
          } else t.draw(), l(new sn({ numSteps: 0, chart: t }));
          return t;
        }
      },
      draw: function (e) {
        var t = this,
          a,
          n;
        if (
          (t.clear(),
          b.isNullOrUndef(e) && (e = 1),
          t.transition(e),
          !(t.width <= 0 || t.height <= 0) &&
            J.notify(t, "beforeDraw", [e]) !== !1)
        ) {
          for (n = t._layers, a = 0; a < n.length && n[a].z <= 0; ++a)
            n[a].draw(t.chartArea);
          for (t.drawDatasets(e); a < n.length; ++a) n[a].draw(t.chartArea);
          t._drawTooltip(e), J.notify(t, "afterDraw", [e]);
        }
      },
      transition: function (e) {
        for (
          var t = this, a = 0, n = (t.data.datasets || []).length;
          a < n;
          ++a
        )
          t.isDatasetVisible(a) && t.getDatasetMeta(a).controller.transition(e);
        t.tooltip.transition(e);
      },
      _getSortedDatasetMetas: function (e) {
        var t = this,
          a = t.data.datasets || [],
          n = [],
          o,
          l;
        for (o = 0, l = a.length; o < l; ++o)
          (!e || t.isDatasetVisible(o)) && n.push(t.getDatasetMeta(o));
        return n.sort(ho("order", "index")), n;
      },
      _getSortedVisibleDatasetMetas: function () {
        return this._getSortedDatasetMetas(!0);
      },
      drawDatasets: function (e) {
        var t = this,
          a,
          n;
        if (J.notify(t, "beforeDatasetsDraw", [e]) !== !1) {
          for (
            a = t._getSortedVisibleDatasetMetas(), n = a.length - 1;
            n >= 0;
            --n
          )
            t.drawDataset(a[n], e);
          J.notify(t, "afterDatasetsDraw", [e]);
        }
      },
      drawDataset: function (e, t) {
        var a = this,
          n = { meta: e, index: e.index, easingValue: t };
        J.notify(a, "beforeDatasetDraw", [n]) !== !1 &&
          (e.controller.draw(t), J.notify(a, "afterDatasetDraw", [n]));
      },
      _drawTooltip: function (e) {
        var t = this,
          a = t.tooltip,
          n = { tooltip: a, easingValue: e };
        J.notify(t, "beforeTooltipDraw", [n]) !== !1 &&
          (a.draw(), J.notify(t, "afterTooltipDraw", [n]));
      },
      getElementAtEvent: function (e) {
        return Qt.modes.single(this, e);
      },
      getElementsAtEvent: function (e) {
        return Qt.modes.label(this, e, { intersect: !0 });
      },
      getElementsAtXAxis: function (e) {
        return Qt.modes["x-axis"](this, e, { intersect: !0 });
      },
      getElementsAtEventForMode: function (e, t, a) {
        var n = Qt.modes[t];
        return typeof n == "function" ? n(this, e, a) : [];
      },
      getDatasetAtEvent: function (e) {
        return Qt.modes.dataset(this, e, { intersect: !0 });
      },
      getDatasetMeta: function (e) {
        var t = this,
          a = t.data.datasets[e];
        a._meta || (a._meta = {});
        var n = a._meta[t.id];
        return (
          n ||
            (n = a._meta[t.id] =
              {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: a.order || 0,
                index: e,
              }),
          n
        );
      },
      getVisibleDatasetCount: function () {
        for (var e = 0, t = 0, a = this.data.datasets.length; t < a; ++t)
          this.isDatasetVisible(t) && e++;
        return e;
      },
      isDatasetVisible: function (e) {
        var t = this.getDatasetMeta(e);
        return typeof t.hidden == "boolean"
          ? !t.hidden
          : !this.data.datasets[e].hidden;
      },
      generateLegend: function () {
        return this.options.legendCallback(this);
      },
      destroyDatasetMeta: function (e) {
        var t = this.id,
          a = this.data.datasets[e],
          n = a._meta && a._meta[t];
        n && (n.controller.destroy(), delete a._meta[t]);
      },
      destroy: function () {
        var e = this,
          t = e.canvas,
          a,
          n;
        for (e.stop(), a = 0, n = e.data.datasets.length; a < n; ++a)
          e.destroyDatasetMeta(a);
        t &&
          (e.unbindEvents(),
          b.canvas.clear(e),
          Jt.releaseContext(e.ctx),
          (e.canvas = null),
          (e.ctx = null)),
          J.notify(e, "destroy"),
          delete mt.instances[e.id];
      },
      toBase64Image: function () {
        return this.canvas.toDataURL.apply(this.canvas, arguments);
      },
      initToolTip: function () {
        var e = this;
        e.tooltip = new wn(
          {
            _chart: e,
            _chartInstance: e,
            _data: e.data,
            _options: e.options.tooltips,
          },
          e
        );
      },
      bindEvents: function () {
        var e = this,
          t = (e._listeners = {}),
          a = function () {
            e.eventHandler.apply(e, arguments);
          };
        b.each(e.options.events, function (n) {
          Jt.addEventListener(e, n, a), (t[n] = a);
        }),
          e.options.responsive &&
            ((a = function () {
              e.resize();
            }),
            Jt.addEventListener(e, "resize", a),
            (t.resize = a));
      },
      unbindEvents: function () {
        var e = this,
          t = e._listeners;
        !t ||
          (delete e._listeners,
          b.each(t, function (a, n) {
            Jt.removeEventListener(e, n, a);
          }));
      },
      updateHoverStyle: function (e, t, a) {
        var n = a ? "set" : "remove",
          o,
          l,
          u;
        for (l = 0, u = e.length; l < u; ++l)
          (o = e[l]),
            o &&
              this.getDatasetMeta(o._datasetIndex).controller[n + "HoverStyle"](
                o
              );
        t === "dataset" &&
          this.getDatasetMeta(e[0]._datasetIndex).controller[
            "_" + n + "DatasetHoverStyle"
          ]();
      },
      eventHandler: function (e) {
        var t = this,
          a = t.tooltip;
        if (J.notify(t, "beforeEvent", [e]) !== !1) {
          (t._bufferedRender = !0), (t._bufferedRequest = null);
          var n = t.handleEvent(e);
          a && (n = a._start ? a.handleEvent(e) : n | a.handleEvent(e)),
            J.notify(t, "afterEvent", [e]);
          var o = t._bufferedRequest;
          return (
            o
              ? t.render(o)
              : n &&
                !t.animating &&
                (t.stop(),
                t.render({
                  duration: t.options.hover.animationDuration,
                  lazy: !0,
                })),
            (t._bufferedRender = !1),
            (t._bufferedRequest = null),
            t
          );
        }
      },
      handleEvent: function (e) {
        var t = this,
          a = t.options || {},
          n = a.hover,
          o = !1;
        return (
          (t.lastActive = t.lastActive || []),
          e.type === "mouseout"
            ? (t.active = [])
            : (t.active = t.getElementsAtEventForMode(e, n.mode, n)),
          b.callback(a.onHover || a.hover.onHover, [e.native, t.active], t),
          (e.type === "mouseup" || e.type === "click") &&
            a.onClick &&
            a.onClick.call(t, e.native, t.active),
          t.lastActive.length && t.updateHoverStyle(t.lastActive, n.mode, !1),
          t.active.length && n.mode && t.updateHoverStyle(t.active, n.mode, !0),
          (o = !b.arrayEquals(t.active, t.lastActive)),
          (t.lastActive = t.active),
          o
        );
      },
    }),
      (mt.instances = {});
    var B = mt;
    (mt.Controller = mt),
      (mt.types = {}),
      (b.configMerge = kn),
      (b.scaleMerge = uo);
    var Uu = function () {
      (b.where = function (n, o) {
        if (b.isArray(n) && Array.prototype.filter) return n.filter(o);
        var l = [];
        return (
          b.each(n, function (u) {
            o(u) && l.push(u);
          }),
          l
        );
      }),
        (b.findIndex = Array.prototype.findIndex
          ? function (n, o, l) {
              return n.findIndex(o, l);
            }
          : function (n, o, l) {
              l = l === void 0 ? n : l;
              for (var u = 0, h = n.length; u < h; ++u)
                if (o.call(l, n[u], u, n)) return u;
              return -1;
            }),
        (b.findNextWhere = function (n, o, l) {
          b.isNullOrUndef(l) && (l = -1);
          for (var u = l + 1; u < n.length; u++) {
            var h = n[u];
            if (o(h)) return h;
          }
        }),
        (b.findPreviousWhere = function (n, o, l) {
          b.isNullOrUndef(l) && (l = n.length);
          for (var u = l - 1; u >= 0; u--) {
            var h = n[u];
            if (o(h)) return h;
          }
        }),
        (b.isNumber = function (n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }),
        (b.almostEquals = function (n, o, l) {
          return Math.abs(n - o) < l;
        }),
        (b.almostWhole = function (n, o) {
          var l = Math.round(n);
          return l - o <= n && l + o >= n;
        }),
        (b.max = function (n) {
          return n.reduce(function (o, l) {
            return isNaN(l) ? o : Math.max(o, l);
          }, Number.NEGATIVE_INFINITY);
        }),
        (b.min = function (n) {
          return n.reduce(function (o, l) {
            return isNaN(l) ? o : Math.min(o, l);
          }, Number.POSITIVE_INFINITY);
        }),
        (b.sign = Math.sign
          ? function (n) {
              return Math.sign(n);
            }
          : function (n) {
              return (n = +n), n === 0 || isNaN(n) ? n : n > 0 ? 1 : -1;
            }),
        (b.toRadians = function (n) {
          return n * (Math.PI / 180);
        }),
        (b.toDegrees = function (n) {
          return n * (180 / Math.PI);
        }),
        (b._decimalPlaces = function (n) {
          if (!!b.isFinite(n)) {
            for (var o = 1, l = 0; Math.round(n * o) / o !== n; )
              (o *= 10), l++;
            return l;
          }
        }),
        (b.getAngleFromPoint = function (n, o) {
          var l = o.x - n.x,
            u = o.y - n.y,
            h = Math.sqrt(l * l + u * u),
            f = Math.atan2(u, l);
          return (
            f < -0.5 * Math.PI && (f += 2 * Math.PI), { angle: f, distance: h }
          );
        }),
        (b.distanceBetweenPoints = function (n, o) {
          return Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2));
        }),
        (b.aliasPixel = function (n) {
          return n % 2 === 0 ? 0 : 0.5;
        }),
        (b._alignPixel = function (n, o, l) {
          var u = n.currentDevicePixelRatio,
            h = l / 2;
          return Math.round((o - h) * u) / u + h;
        }),
        (b.splineCurve = function (n, o, l, u) {
          var h = n.skip ? o : n,
            f = o,
            v = l.skip ? o : l,
            g = Math.sqrt(Math.pow(f.x - h.x, 2) + Math.pow(f.y - h.y, 2)),
            m = Math.sqrt(Math.pow(v.x - f.x, 2) + Math.pow(v.y - f.y, 2)),
            y = g / (g + m),
            x = m / (g + m);
          (y = isNaN(y) ? 0 : y), (x = isNaN(x) ? 0 : x);
          var w = u * y,
            M = u * x;
          return {
            previous: { x: f.x - w * (v.x - h.x), y: f.y - w * (v.y - h.y) },
            next: { x: f.x + M * (v.x - h.x), y: f.y + M * (v.y - h.y) },
          };
        }),
        (b.EPSILON = Number.EPSILON || 1e-14),
        (b.splineCurveMonotone = function (n) {
          var o = (n || []).map(function (k) {
              return { model: k._model, deltaK: 0, mK: 0 };
            }),
            l = o.length,
            u,
            h,
            f,
            v;
          for (u = 0; u < l; ++u)
            if (((f = o[u]), !f.model.skip)) {
              if (
                ((h = u > 0 ? o[u - 1] : null),
                (v = u < l - 1 ? o[u + 1] : null),
                v && !v.model.skip)
              ) {
                var g = v.model.x - f.model.x;
                f.deltaK = g !== 0 ? (v.model.y - f.model.y) / g : 0;
              }
              !h || h.model.skip
                ? (f.mK = f.deltaK)
                : !v || v.model.skip
                ? (f.mK = h.deltaK)
                : this.sign(h.deltaK) !== this.sign(f.deltaK)
                ? (f.mK = 0)
                : (f.mK = (h.deltaK + f.deltaK) / 2);
            }
          var m, y, x, w;
          for (u = 0; u < l - 1; ++u)
            if (((f = o[u]), (v = o[u + 1]), !(f.model.skip || v.model.skip))) {
              if (b.almostEquals(f.deltaK, 0, this.EPSILON)) {
                f.mK = v.mK = 0;
                continue;
              }
              (m = f.mK / f.deltaK),
                (y = v.mK / f.deltaK),
                (w = Math.pow(m, 2) + Math.pow(y, 2)),
                !(w <= 9) &&
                  ((x = 3 / Math.sqrt(w)),
                  (f.mK = m * x * f.deltaK),
                  (v.mK = y * x * f.deltaK));
            }
          var M;
          for (u = 0; u < l; ++u)
            (f = o[u]),
              !f.model.skip &&
                ((h = u > 0 ? o[u - 1] : null),
                (v = u < l - 1 ? o[u + 1] : null),
                h &&
                  !h.model.skip &&
                  ((M = (f.model.x - h.model.x) / 3),
                  (f.model.controlPointPreviousX = f.model.x - M),
                  (f.model.controlPointPreviousY = f.model.y - M * f.mK)),
                v &&
                  !v.model.skip &&
                  ((M = (v.model.x - f.model.x) / 3),
                  (f.model.controlPointNextX = f.model.x + M),
                  (f.model.controlPointNextY = f.model.y + M * f.mK)));
        }),
        (b.nextItem = function (n, o, l) {
          return l
            ? o >= n.length - 1
              ? n[0]
              : n[o + 1]
            : o >= n.length - 1
            ? n[n.length - 1]
            : n[o + 1];
        }),
        (b.previousItem = function (n, o, l) {
          return l
            ? o <= 0
              ? n[n.length - 1]
              : n[o - 1]
            : o <= 0
            ? n[0]
            : n[o - 1];
        }),
        (b.niceNum = function (n, o) {
          var l = Math.floor(b.log10(n)),
            u = n / Math.pow(10, l),
            h;
          return (
            o
              ? u < 1.5
                ? (h = 1)
                : u < 3
                ? (h = 2)
                : u < 7
                ? (h = 5)
                : (h = 10)
              : u <= 1
              ? (h = 1)
              : u <= 2
              ? (h = 2)
              : u <= 5
              ? (h = 5)
              : (h = 10),
            h * Math.pow(10, l)
          );
        }),
        (b.requestAnimFrame = (function () {
          return typeof window > "u"
            ? function (n) {
                n();
              }
            : window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (n) {
                  return window.setTimeout(n, 1e3 / 60);
                };
        })()),
        (b.getRelativePosition = function (n, o) {
          var l,
            u,
            h = n.originalEvent || n,
            f = n.target || n.srcElement,
            v = f.getBoundingClientRect(),
            g = h.touches;
          g && g.length > 0
            ? ((l = g[0].clientX), (u = g[0].clientY))
            : ((l = h.clientX), (u = h.clientY));
          var m = parseFloat(b.getStyle(f, "padding-left")),
            y = parseFloat(b.getStyle(f, "padding-top")),
            x = parseFloat(b.getStyle(f, "padding-right")),
            w = parseFloat(b.getStyle(f, "padding-bottom")),
            M = v.right - v.left - m - x,
            k = v.bottom - v.top - y - w;
          return (
            (l = Math.round(
              (((l - v.left - m) / M) * f.width) / o.currentDevicePixelRatio
            )),
            (u = Math.round(
              (((u - v.top - y) / k) * f.height) / o.currentDevicePixelRatio
            )),
            { x: l, y: u }
          );
        });
      function e(n, o, l) {
        var u;
        return (
          typeof n == "string"
            ? ((u = parseInt(n, 10)),
              n.indexOf("%") !== -1 && (u = (u / 100) * o.parentNode[l]))
            : (u = n),
          u
        );
      }
      function t(n) {
        return n != null && n !== "none";
      }
      function a(n, o, l) {
        var u = document.defaultView,
          h = b._getParentNode(n),
          f = u.getComputedStyle(n)[o],
          v = u.getComputedStyle(h)[o],
          g = t(f),
          m = t(v),
          y = Number.POSITIVE_INFINITY;
        return g || m
          ? Math.min(g ? e(f, n, l) : y, m ? e(v, h, l) : y)
          : "none";
      }
      (b.getConstraintWidth = function (n) {
        return a(n, "max-width", "clientWidth");
      }),
        (b.getConstraintHeight = function (n) {
          return a(n, "max-height", "clientHeight");
        }),
        (b._calculatePadding = function (n, o, l) {
          return (
            (o = b.getStyle(n, o)),
            o.indexOf("%") > -1 ? (l * parseInt(o, 10)) / 100 : parseInt(o, 10)
          );
        }),
        (b._getParentNode = function (n) {
          var o = n.parentNode;
          return o && o.toString() === "[object ShadowRoot]" && (o = o.host), o;
        }),
        (b.getMaximumWidth = function (n) {
          var o = b._getParentNode(n);
          if (!o) return n.clientWidth;
          var l = o.clientWidth,
            u = b._calculatePadding(o, "padding-left", l),
            h = b._calculatePadding(o, "padding-right", l),
            f = l - u - h,
            v = b.getConstraintWidth(n);
          return isNaN(v) ? f : Math.min(f, v);
        }),
        (b.getMaximumHeight = function (n) {
          var o = b._getParentNode(n);
          if (!o) return n.clientHeight;
          var l = o.clientHeight,
            u = b._calculatePadding(o, "padding-top", l),
            h = b._calculatePadding(o, "padding-bottom", l),
            f = l - u - h,
            v = b.getConstraintHeight(n);
          return isNaN(v) ? f : Math.min(f, v);
        }),
        (b.getStyle = function (n, o) {
          return n.currentStyle
            ? n.currentStyle[o]
            : document.defaultView
                .getComputedStyle(n, null)
                .getPropertyValue(o);
        }),
        (b.retinaScale = function (n, o) {
          var l = (n.currentDevicePixelRatio =
            o || (typeof window < "u" && window.devicePixelRatio) || 1);
          if (l !== 1) {
            var u = n.canvas,
              h = n.height,
              f = n.width;
            (u.height = h * l),
              (u.width = f * l),
              n.ctx.scale(l, l),
              !u.style.height &&
                !u.style.width &&
                ((u.style.height = h + "px"), (u.style.width = f + "px"));
          }
        }),
        (b.fontString = function (n, o, l) {
          return o + " " + n + "px " + l;
        }),
        (b.longestText = function (n, o, l, u) {
          u = u || {};
          var h = (u.data = u.data || {}),
            f = (u.garbageCollect = u.garbageCollect || []);
          u.font !== o &&
            ((h = u.data = {}), (f = u.garbageCollect = []), (u.font = o)),
            (n.font = o);
          var v = 0,
            g = l.length,
            m,
            y,
            x,
            w,
            M;
          for (m = 0; m < g; m++)
            if (((w = l[m]), w != null && b.isArray(w) !== !0))
              v = b.measureText(n, h, f, v, w);
            else if (b.isArray(w))
              for (y = 0, x = w.length; y < x; y++)
                (M = w[y]),
                  M != null &&
                    !b.isArray(M) &&
                    (v = b.measureText(n, h, f, v, M));
          var k = f.length / 2;
          if (k > l.length) {
            for (m = 0; m < k; m++) delete h[f[m]];
            f.splice(0, k);
          }
          return v;
        }),
        (b.measureText = function (n, o, l, u, h) {
          var f = o[h];
          return (
            f || ((f = o[h] = n.measureText(h).width), l.push(h)),
            f > u && (u = f),
            u
          );
        }),
        (b.numberOfLabelLines = function (n) {
          var o = 1;
          return (
            b.each(n, function (l) {
              b.isArray(l) && l.length > o && (o = l.length);
            }),
            o
          );
        }),
        (b.color = Jr
          ? function (n) {
              return (
                n instanceof CanvasGradient && (n = N.global.defaultColor),
                Jr(n)
              );
            }
          : function (n) {
              return console.error("Color.js not found!"), n;
            }),
        (b.getHoverColor = function (n) {
          return n instanceof CanvasPattern || n instanceof CanvasGradient
            ? n
            : b.color(n).saturate(0.5).darken(0.1).rgbString();
        });
    };
    function Wt() {
      throw new Error(
        "This method is not implemented: either no adapter can be found or an incomplete integration was provided."
      );
    }
    function sa(e) {
      this.options = e || {};
    }
    b.extend(sa.prototype, {
      formats: Wt,
      parse: Wt,
      format: Wt,
      add: Wt,
      diff: Wt,
      startOf: Wt,
      endOf: Wt,
      _create: function (e) {
        return e;
      },
    }),
      (sa.override = function (e) {
        b.extend(sa.prototype, e);
      });
    var ju = sa,
      Sn = { _date: ju },
      Or = {
        formatters: {
          values: function (e) {
            return b.isArray(e) ? e : "" + e;
          },
          linear: function (e, t, a) {
            var n = a.length > 3 ? a[2] - a[1] : a[1] - a[0];
            Math.abs(n) > 1 && e !== Math.floor(e) && (n = e - Math.floor(e));
            var o = b.log10(Math.abs(n)),
              l = "";
            if (e !== 0) {
              var u = Math.max(Math.abs(a[0]), Math.abs(a[a.length - 1]));
              if (u < 1e-4) {
                var h = b.log10(Math.abs(e)),
                  f = Math.floor(h) - Math.floor(o);
                (f = Math.max(Math.min(f, 20), 0)), (l = e.toExponential(f));
              } else {
                var v = -1 * Math.floor(o);
                (v = Math.max(Math.min(v, 20), 0)), (l = e.toFixed(v));
              }
            } else l = "0";
            return l;
          },
          logarithmic: function (e, t, a) {
            var n = e / Math.pow(10, Math.floor(b.log10(e)));
            return e === 0
              ? "0"
              : n === 1 || n === 2 || n === 5 || t === 0 || t === a.length - 1
              ? e.toExponential()
              : "";
          },
        },
      },
      Et = b.isArray,
      Pr = b.isNullOrUndef,
      Yt = b.valueOrDefault,
      er = b.valueAtIndexOrDefault;
    N._set("scale", {
      display: !0,
      position: "left",
      offset: !1,
      gridLines: {
        display: !0,
        color: "rgba(0,0,0,0.1)",
        lineWidth: 1,
        drawBorder: !0,
        drawOnChartArea: !0,
        drawTicks: !0,
        tickMarkLength: 10,
        zeroLineWidth: 1,
        zeroLineColor: "rgba(0,0,0,0.25)",
        zeroLineBorderDash: [],
        zeroLineBorderDashOffset: 0,
        offsetGridLines: !1,
        borderDash: [],
        borderDashOffset: 0,
      },
      scaleLabel: {
        display: !1,
        labelString: "",
        padding: { top: 4, bottom: 4 },
      },
      ticks: {
        beginAtZero: !1,
        minRotation: 0,
        maxRotation: 50,
        mirror: !1,
        padding: 0,
        reverse: !1,
        display: !0,
        autoSkip: !0,
        autoSkipPadding: 0,
        labelOffset: 0,
        callback: Or.formatters.values,
        minor: {},
        major: {},
      },
    });
    function $u(e, t) {
      for (var a = [], n = e.length / t, o = 0, l = e.length; o < l; o += n)
        a.push(e[Math.floor(o)]);
      return a;
    }
    function Gu(e, t, a) {
      var n = e.getTicks().length,
        o = Math.min(t, n - 1),
        l = e.getPixelForTick(o),
        u = e._startPixel,
        h = e._endPixel,
        f = 1e-6,
        v;
      if (
        !(
          a &&
          (n === 1
            ? (v = Math.max(l - u, h - l))
            : t === 0
            ? (v = (e.getPixelForTick(1) - l) / 2)
            : (v = (l - e.getPixelForTick(o - 1)) / 2),
          (l += o < t ? v : -v),
          l < u - f || l > h + f)
        )
      )
        return l;
    }
    function qu(e, t) {
      b.each(e, function (a) {
        var n = a.gc,
          o = n.length / 2,
          l;
        if (o > t) {
          for (l = 0; l < o; ++l) delete a.data[n[l]];
          n.splice(0, o);
        }
      });
    }
    function Xu(e, t, a, n) {
      var o = a.length,
        l = [],
        u = [],
        h = [],
        f = 0,
        v = 0,
        g,
        m,
        y,
        x,
        w,
        M,
        k,
        D,
        F,
        A,
        E,
        W,
        G;
      for (g = 0; g < o; ++g) {
        if (
          ((x = a[g].label),
          (w = a[g].major ? t.major : t.minor),
          (e.font = M = w.string),
          (k = n[M] = n[M] || { data: {}, gc: [] }),
          (D = w.lineHeight),
          (F = A = 0),
          !Pr(x) && !Et(x))
        )
          (F = b.measureText(e, k.data, k.gc, F, x)), (A = D);
        else if (Et(x))
          for (m = 0, y = x.length; m < y; ++m)
            (E = x[m]),
              !Pr(E) &&
                !Et(E) &&
                ((F = b.measureText(e, k.data, k.gc, F, E)), (A += D));
        l.push(F),
          u.push(A),
          h.push(D / 2),
          (f = Math.max(F, f)),
          (v = Math.max(A, v));
      }
      qu(n, o), (W = l.indexOf(f)), (G = u.indexOf(v));
      function j(K) {
        return { width: l[K] || 0, height: u[K] || 0, offset: h[K] || 0 };
      }
      return { first: j(0), last: j(o - 1), widest: j(W), highest: j(G) };
    }
    function Fr(e) {
      return e.drawTicks ? e.tickMarkLength : 0;
    }
    function Dn(e) {
      var t, a;
      return e.display
        ? ((t = b.options._parseFont(e)),
          (a = b.options.toPadding(e.padding)),
          t.lineHeight + a.height)
        : 0;
    }
    function vo(e, t) {
      return b.extend(
        b.options._parseFont({
          fontFamily: Yt(t.fontFamily, e.fontFamily),
          fontSize: Yt(t.fontSize, e.fontSize),
          fontStyle: Yt(t.fontStyle, e.fontStyle),
          lineHeight: Yt(t.lineHeight, e.lineHeight),
        }),
        {
          color: b.options.resolve([
            t.fontColor,
            e.fontColor,
            N.global.defaultFontColor,
          ]),
        }
      );
    }
    function Tn(e) {
      var t = vo(e, e.minor),
        a = e.major.enabled ? vo(e, e.major) : t;
      return { minor: t, major: a };
    }
    function Cn(e) {
      var t = [],
        a,
        n,
        o;
      for (n = 0, o = e.length; n < o; ++n)
        (a = e[n]), typeof a._index < "u" && t.push(a);
      return t;
    }
    function Zu(e) {
      var t = e.length,
        a,
        n;
      if (t < 2) return !1;
      for (n = e[0], a = 1; a < t; ++a) if (e[a] - e[a - 1] !== n) return !1;
      return n;
    }
    function Ku(e, t, a, n) {
      var o = Zu(e),
        l = (t.length - 1) / n,
        u,
        h,
        f,
        v;
      if (!o) return Math.max(l, 1);
      for (u = b.math._factorize(o), f = 0, v = u.length - 1; f < v; f++)
        if (((h = u[f]), h > l)) return h;
      return Math.max(l, 1);
    }
    function Qu(e) {
      var t = [],
        a,
        n;
      for (a = 0, n = e.length; a < n; a++) e[a].major && t.push(a);
      return t;
    }
    function Ju(e, t, a) {
      var n = 0,
        o = t[0],
        l,
        u;
      for (a = Math.ceil(a), l = 0; l < e.length; l++)
        (u = e[l]),
          l === o ? ((u._index = l), n++, (o = t[n * a])) : delete u.label;
    }
    function la(e, t, a, n) {
      var o = Yt(a, 0),
        l = Math.min(Yt(n, e.length), e.length),
        u = 0,
        h,
        f,
        v,
        g;
      for (
        t = Math.ceil(t),
          n && ((h = n - a), (t = h / Math.floor(h / t))),
          g = o;
        g < 0;

      )
        u++, (g = Math.round(o + u * t));
      for (f = Math.max(o, 0); f < l; f++)
        (v = e[f]),
          f === g
            ? ((v._index = f), u++, (g = Math.round(o + u * t)))
            : delete v.label;
    }
    var On = je.extend({
      zeroLineIndex: 0,
      getPadding: function () {
        var e = this;
        return {
          left: e.paddingLeft || 0,
          top: e.paddingTop || 0,
          right: e.paddingRight || 0,
          bottom: e.paddingBottom || 0,
        };
      },
      getTicks: function () {
        return this._ticks;
      },
      _getLabels: function () {
        var e = this.chart.data;
        return (
          this.options.labels ||
          (this.isHorizontal() ? e.xLabels : e.yLabels) ||
          e.labels ||
          []
        );
      },
      mergeTicksOptions: function () {},
      beforeUpdate: function () {
        b.callback(this.options.beforeUpdate, [this]);
      },
      update: function (e, t, a) {
        var n = this,
          o = n.options.ticks,
          l = o.sampleSize,
          u,
          h,
          f,
          v,
          g;
        if (
          (n.beforeUpdate(),
          (n.maxWidth = e),
          (n.maxHeight = t),
          (n.margins = b.extend({ left: 0, right: 0, top: 0, bottom: 0 }, a)),
          (n._ticks = null),
          (n.ticks = null),
          (n._labelSizes = null),
          (n._maxLabelLines = 0),
          (n.longestLabelWidth = 0),
          (n.longestTextCache = n.longestTextCache || {}),
          (n._gridLineItems = null),
          (n._labelItems = null),
          n.beforeSetDimensions(),
          n.setDimensions(),
          n.afterSetDimensions(),
          n.beforeDataLimits(),
          n.determineDataLimits(),
          n.afterDataLimits(),
          n.beforeBuildTicks(),
          (v = n.buildTicks() || []),
          (v = n.afterBuildTicks(v) || v),
          (!v || !v.length) && n.ticks)
        )
          for (v = [], u = 0, h = n.ticks.length; u < h; ++u)
            v.push({ value: n.ticks[u], major: !1 });
        return (
          (n._ticks = v),
          (g = l < v.length),
          (f = n._convertTicksToLabels(g ? $u(v, l) : v)),
          n._configure(),
          n.beforeCalculateTickRotation(),
          n.calculateTickRotation(),
          n.afterCalculateTickRotation(),
          n.beforeFit(),
          n.fit(),
          n.afterFit(),
          (n._ticksToDraw =
            o.display && (o.autoSkip || o.source === "auto")
              ? n._autoSkip(v)
              : v),
          g && (f = n._convertTicksToLabels(n._ticksToDraw)),
          (n.ticks = f),
          n.afterUpdate(),
          n.minSize
        );
      },
      _configure: function () {
        var e = this,
          t = e.options.ticks.reverse,
          a,
          n;
        e.isHorizontal()
          ? ((a = e.left), (n = e.right))
          : ((a = e.top), (n = e.bottom), (t = !t)),
          (e._startPixel = a),
          (e._endPixel = n),
          (e._reversePixels = t),
          (e._length = n - a);
      },
      afterUpdate: function () {
        b.callback(this.options.afterUpdate, [this]);
      },
      beforeSetDimensions: function () {
        b.callback(this.options.beforeSetDimensions, [this]);
      },
      setDimensions: function () {
        var e = this;
        e.isHorizontal()
          ? ((e.width = e.maxWidth), (e.left = 0), (e.right = e.width))
          : ((e.height = e.maxHeight), (e.top = 0), (e.bottom = e.height)),
          (e.paddingLeft = 0),
          (e.paddingTop = 0),
          (e.paddingRight = 0),
          (e.paddingBottom = 0);
      },
      afterSetDimensions: function () {
        b.callback(this.options.afterSetDimensions, [this]);
      },
      beforeDataLimits: function () {
        b.callback(this.options.beforeDataLimits, [this]);
      },
      determineDataLimits: b.noop,
      afterDataLimits: function () {
        b.callback(this.options.afterDataLimits, [this]);
      },
      beforeBuildTicks: function () {
        b.callback(this.options.beforeBuildTicks, [this]);
      },
      buildTicks: b.noop,
      afterBuildTicks: function (e) {
        var t = this;
        return Et(e) && e.length
          ? b.callback(t.options.afterBuildTicks, [t, e])
          : ((t.ticks =
              b.callback(t.options.afterBuildTicks, [t, t.ticks]) || t.ticks),
            e);
      },
      beforeTickToLabelConversion: function () {
        b.callback(this.options.beforeTickToLabelConversion, [this]);
      },
      convertTicksToLabels: function () {
        var e = this,
          t = e.options.ticks;
        e.ticks = e.ticks.map(t.userCallback || t.callback, this);
      },
      afterTickToLabelConversion: function () {
        b.callback(this.options.afterTickToLabelConversion, [this]);
      },
      beforeCalculateTickRotation: function () {
        b.callback(this.options.beforeCalculateTickRotation, [this]);
      },
      calculateTickRotation: function () {
        var e = this,
          t = e.options,
          a = t.ticks,
          n = e.getTicks().length,
          o = a.minRotation || 0,
          l = a.maxRotation,
          u = o,
          h,
          f,
          v,
          g,
          m,
          y,
          x;
        if (
          !e._isVisible() ||
          !a.display ||
          o >= l ||
          n <= 1 ||
          !e.isHorizontal()
        ) {
          e.labelRotation = o;
          return;
        }
        (h = e._getLabelSizes()),
          (f = h.widest.width),
          (v = h.highest.height - h.highest.offset),
          (g = Math.min(e.maxWidth, e.chart.width - f)),
          (m = t.offset ? e.maxWidth / n : g / (n - 1)),
          f + 6 > m &&
            ((m = g / (n - (t.offset ? 0.5 : 1))),
            (y = e.maxHeight - Fr(t.gridLines) - a.padding - Dn(t.scaleLabel)),
            (x = Math.sqrt(f * f + v * v)),
            (u = b.toDegrees(
              Math.min(
                Math.asin(Math.min((h.highest.height + 6) / m, 1)),
                Math.asin(Math.min(y / x, 1)) - Math.asin(v / x)
              )
            )),
            (u = Math.max(o, Math.min(l, u)))),
          (e.labelRotation = u);
      },
      afterCalculateTickRotation: function () {
        b.callback(this.options.afterCalculateTickRotation, [this]);
      },
      beforeFit: function () {
        b.callback(this.options.beforeFit, [this]);
      },
      fit: function () {
        var e = this,
          t = (e.minSize = { width: 0, height: 0 }),
          a = e.chart,
          n = e.options,
          o = n.ticks,
          l = n.scaleLabel,
          u = n.gridLines,
          h = e._isVisible(),
          f = n.position === "bottom",
          v = e.isHorizontal();
        if (
          (v ? (t.width = e.maxWidth) : h && (t.width = Fr(u) + Dn(l)),
          v ? h && (t.height = Fr(u) + Dn(l)) : (t.height = e.maxHeight),
          o.display && h)
        ) {
          var g = Tn(o),
            m = e._getLabelSizes(),
            y = m.first,
            x = m.last,
            w = m.widest,
            M = m.highest,
            k = g.minor.lineHeight * 0.4,
            D = o.padding;
          if (v) {
            var F = e.labelRotation !== 0,
              A = b.toRadians(e.labelRotation),
              E = Math.cos(A),
              W = Math.sin(A),
              G =
                W * w.width + E * (M.height - (F ? M.offset : 0)) + (F ? 0 : k);
            t.height = Math.min(e.maxHeight, t.height + G + D);
            var j = e.getPixelForTick(0) - e.left,
              K = e.right - e.getPixelForTick(e.getTicks().length - 1),
              ee,
              ue;
            F
              ? ((ee = f
                  ? E * y.width + W * y.offset
                  : W * (y.height - y.offset)),
                (ue = f
                  ? W * (x.height - x.offset)
                  : E * x.width + W * x.offset))
              : ((ee = y.width / 2), (ue = x.width / 2)),
              (e.paddingLeft =
                Math.max(((ee - j) * e.width) / (e.width - j), 0) + 3),
              (e.paddingRight =
                Math.max(((ue - K) * e.width) / (e.width - K), 0) + 3);
          } else {
            var se = o.mirror ? 0 : w.width + D + k;
            (t.width = Math.min(e.maxWidth, t.width + se)),
              (e.paddingTop = y.height / 2),
              (e.paddingBottom = x.height / 2);
          }
        }
        e.handleMargins(),
          v
            ? ((e.width = e._length =
                a.width - e.margins.left - e.margins.right),
              (e.height = t.height))
            : ((e.width = t.width),
              (e.height = e._length =
                a.height - e.margins.top - e.margins.bottom));
      },
      handleMargins: function () {
        var e = this;
        e.margins &&
          ((e.margins.left = Math.max(e.paddingLeft, e.margins.left)),
          (e.margins.top = Math.max(e.paddingTop, e.margins.top)),
          (e.margins.right = Math.max(e.paddingRight, e.margins.right)),
          (e.margins.bottom = Math.max(e.paddingBottom, e.margins.bottom)));
      },
      afterFit: function () {
        b.callback(this.options.afterFit, [this]);
      },
      isHorizontal: function () {
        var e = this.options.position;
        return e === "top" || e === "bottom";
      },
      isFullWidth: function () {
        return this.options.fullWidth;
      },
      getRightValue: function (e) {
        if (Pr(e)) return NaN;
        if ((typeof e == "number" || e instanceof Number) && !isFinite(e))
          return NaN;
        if (e) {
          if (this.isHorizontal()) {
            if (e.x !== void 0) return this.getRightValue(e.x);
          } else if (e.y !== void 0) return this.getRightValue(e.y);
        }
        return e;
      },
      _convertTicksToLabels: function (e) {
        var t = this,
          a,
          n,
          o;
        for (
          t.ticks = e.map(function (l) {
            return l.value;
          }),
            t.beforeTickToLabelConversion(),
            a = t.convertTicksToLabels(e) || t.ticks,
            t.afterTickToLabelConversion(),
            n = 0,
            o = e.length;
          n < o;
          ++n
        )
          e[n].label = a[n];
        return a;
      },
      _getLabelSizes: function () {
        var e = this,
          t = e._labelSizes;
        return (
          t ||
            ((e._labelSizes = t =
              Xu(e.ctx, Tn(e.options.ticks), e.getTicks(), e.longestTextCache)),
            (e.longestLabelWidth = t.widest.width)),
          t
        );
      },
      _parseValue: function (e) {
        var t, a, n, o;
        return (
          Et(e)
            ? ((t = +this.getRightValue(e[0])),
              (a = +this.getRightValue(e[1])),
              (n = Math.min(t, a)),
              (o = Math.max(t, a)))
            : ((e = +this.getRightValue(e)),
              (t = void 0),
              (a = e),
              (n = e),
              (o = e)),
          { min: n, max: o, start: t, end: a }
        );
      },
      _getScaleLabel: function (e) {
        var t = this._parseValue(e);
        return t.start !== void 0
          ? "[" + t.start + ", " + t.end + "]"
          : +this.getRightValue(e);
      },
      getLabelForIndex: b.noop,
      getPixelForValue: b.noop,
      getValueForPixel: b.noop,
      getPixelForTick: function (e) {
        var t = this,
          a = t.options.offset,
          n = t._ticks.length,
          o = 1 / Math.max(n - (a ? 0 : 1), 1);
        return e < 0 || e > n - 1
          ? null
          : t.getPixelForDecimal(e * o + (a ? o / 2 : 0));
      },
      getPixelForDecimal: function (e) {
        var t = this;
        return t._reversePixels && (e = 1 - e), t._startPixel + e * t._length;
      },
      getDecimalForPixel: function (e) {
        var t = (e - this._startPixel) / this._length;
        return this._reversePixels ? 1 - t : t;
      },
      getBasePixel: function () {
        return this.getPixelForValue(this.getBaseValue());
      },
      getBaseValue: function () {
        var e = this,
          t = e.min,
          a = e.max;
        return e.beginAtZero ? 0 : t < 0 && a < 0 ? a : t > 0 && a > 0 ? t : 0;
      },
      _autoSkip: function (e) {
        var t = this,
          a = t.options.ticks,
          n = t._length,
          o = a.maxTicksLimit || n / t._tickSize() + 1,
          l = a.major.enabled ? Qu(e) : [],
          u = l.length,
          h = l[0],
          f = l[u - 1],
          v,
          g,
          m,
          y;
        if (u > o) return Ju(e, l, u / o), Cn(e);
        if (((m = Ku(l, e, n, o)), u > 0)) {
          for (v = 0, g = u - 1; v < g; v++) la(e, m, l[v], l[v + 1]);
          return (
            (y = u > 1 ? (f - h) / (u - 1) : null),
            la(e, m, b.isNullOrUndef(y) ? 0 : h - y, h),
            la(e, m, f, b.isNullOrUndef(y) ? e.length : f + y),
            Cn(e)
          );
        }
        return la(e, m), Cn(e);
      },
      _tickSize: function () {
        var e = this,
          t = e.options.ticks,
          a = b.toRadians(e.labelRotation),
          n = Math.abs(Math.cos(a)),
          o = Math.abs(Math.sin(a)),
          l = e._getLabelSizes(),
          u = t.autoSkipPadding || 0,
          h = l ? l.widest.width + u : 0,
          f = l ? l.highest.height + u : 0;
        return e.isHorizontal()
          ? f * n > h * o
            ? h / n
            : f / o
          : f * o < h * n
          ? f / n
          : h / o;
      },
      _isVisible: function () {
        var e = this,
          t = e.chart,
          a = e.options.display,
          n,
          o,
          l;
        if (a !== "auto") return !!a;
        for (n = 0, o = t.data.datasets.length; n < o; ++n)
          if (
            t.isDatasetVisible(n) &&
            ((l = t.getDatasetMeta(n)),
            l.xAxisID === e.id || l.yAxisID === e.id)
          )
            return !0;
        return !1;
      },
      _computeGridLineItems: function (e) {
        var t = this,
          a = t.chart,
          n = t.options,
          o = n.gridLines,
          l = n.position,
          u = o.offsetGridLines,
          h = t.isHorizontal(),
          f = t._ticksToDraw,
          v = f.length + (u ? 1 : 0),
          g = Fr(o),
          m = [],
          y = o.drawBorder ? er(o.lineWidth, 0, 0) : 0,
          x = y / 2,
          w = b._alignPixel,
          M = function (Qd) {
            return w(a, Qd, y);
          },
          k,
          D,
          F,
          A,
          E,
          W,
          G,
          j,
          K,
          ee,
          ue,
          se,
          oe,
          fe,
          rr,
          ar,
          En;
        for (
          l === "top"
            ? ((k = M(t.bottom)),
              (G = t.bottom - g),
              (K = k - x),
              (ue = M(e.top) + x),
              (oe = e.bottom))
            : l === "bottom"
            ? ((k = M(t.top)),
              (ue = e.top),
              (oe = M(e.bottom) - x),
              (G = k + x),
              (K = t.top + g))
            : l === "left"
            ? ((k = M(t.right)),
              (W = t.right - g),
              (j = k - x),
              (ee = M(e.left) + x),
              (se = e.right))
            : ((k = M(t.left)),
              (ee = e.left),
              (se = M(e.right) - x),
              (W = k + x),
              (j = t.left + g)),
            D = 0;
          D < v;
          ++D
        )
          (F = f[D] || {}),
            !(Pr(F.label) && D < f.length) &&
              (D === t.zeroLineIndex && n.offset === u
                ? ((fe = o.zeroLineWidth),
                  (rr = o.zeroLineColor),
                  (ar = o.zeroLineBorderDash || []),
                  (En = o.zeroLineBorderDashOffset || 0))
                : ((fe = er(o.lineWidth, D, 1)),
                  (rr = er(o.color, D, "rgba(0,0,0,0.1)")),
                  (ar = o.borderDash || []),
                  (En = o.borderDashOffset || 0)),
              (A = Gu(t, F._index || D, u)),
              A !== void 0 &&
                ((E = w(a, A, fe)),
                h ? (W = j = ee = se = E) : (G = K = ue = oe = E),
                m.push({
                  tx1: W,
                  ty1: G,
                  tx2: j,
                  ty2: K,
                  x1: ee,
                  y1: ue,
                  x2: se,
                  y2: oe,
                  width: fe,
                  color: rr,
                  borderDash: ar,
                  borderDashOffset: En,
                })));
        return (m.ticksLength = v), (m.borderValue = k), m;
      },
      _computeLabelItems: function () {
        var e = this,
          t = e.options,
          a = t.ticks,
          n = t.position,
          o = a.mirror,
          l = e.isHorizontal(),
          u = e._ticksToDraw,
          h = Tn(a),
          f = a.padding,
          v = Fr(t.gridLines),
          g = -b.toRadians(e.labelRotation),
          m = [],
          y,
          x,
          w,
          M,
          k,
          D,
          F,
          A,
          E,
          W,
          G,
          j;
        for (
          n === "top"
            ? ((D = e.bottom - v - f), (F = g ? "left" : "center"))
            : n === "bottom"
            ? ((D = e.top + v + f), (F = g ? "right" : "center"))
            : n === "left"
            ? ((k = e.right - (o ? 0 : v) - f), (F = o ? "left" : "right"))
            : ((k = e.left + (o ? 0 : v) + f), (F = o ? "right" : "left")),
            y = 0,
            x = u.length;
          y < x;
          ++y
        )
          (w = u[y]),
            (M = w.label),
            !Pr(M) &&
              ((A = e.getPixelForTick(w._index || y) + a.labelOffset),
              (E = w.major ? h.major : h.minor),
              (W = E.lineHeight),
              (G = Et(M) ? M.length : 1),
              l
                ? ((k = A),
                  (j =
                    n === "top" ? ((g ? 1 : 0.5) - G) * W : (g ? 0 : 0.5) * W))
                : ((D = A), (j = ((1 - G) * W) / 2)),
              m.push({
                x: k,
                y: D,
                rotation: g,
                label: M,
                font: E,
                textOffset: j,
                textAlign: F,
              }));
        return m;
      },
      _drawGrid: function (e) {
        var t = this,
          a = t.options.gridLines;
        if (!!a.display) {
          var n = t.ctx,
            o = t.chart,
            l = b._alignPixel,
            u = a.drawBorder ? er(a.lineWidth, 0, 0) : 0,
            h =
              t._gridLineItems ||
              (t._gridLineItems = t._computeGridLineItems(e)),
            f,
            v,
            g,
            m,
            y;
          for (g = 0, m = h.length; g < m; ++g)
            (y = h[g]),
              (f = y.width),
              (v = y.color),
              f &&
                v &&
                (n.save(),
                (n.lineWidth = f),
                (n.strokeStyle = v),
                n.setLineDash &&
                  (n.setLineDash(y.borderDash),
                  (n.lineDashOffset = y.borderDashOffset)),
                n.beginPath(),
                a.drawTicks && (n.moveTo(y.tx1, y.ty1), n.lineTo(y.tx2, y.ty2)),
                a.drawOnChartArea &&
                  (n.moveTo(y.x1, y.y1), n.lineTo(y.x2, y.y2)),
                n.stroke(),
                n.restore());
          if (u) {
            var x = u,
              w = er(a.lineWidth, h.ticksLength - 1, 1),
              M = h.borderValue,
              k,
              D,
              F,
              A;
            t.isHorizontal()
              ? ((k = l(o, t.left, x) - x / 2),
                (D = l(o, t.right, w) + w / 2),
                (F = A = M))
              : ((F = l(o, t.top, x) - x / 2),
                (A = l(o, t.bottom, w) + w / 2),
                (k = D = M)),
              (n.lineWidth = u),
              (n.strokeStyle = er(a.color, 0)),
              n.beginPath(),
              n.moveTo(k, F),
              n.lineTo(D, A),
              n.stroke();
          }
        }
      },
      _drawLabels: function () {
        var e = this,
          t = e.options.ticks;
        if (!!t.display) {
          var a = e.ctx,
            n = e._labelItems || (e._labelItems = e._computeLabelItems()),
            o,
            l,
            u,
            h,
            f,
            v,
            g,
            m;
          for (o = 0, u = n.length; o < u; ++o) {
            if (
              ((f = n[o]),
              (v = f.font),
              a.save(),
              a.translate(f.x, f.y),
              a.rotate(f.rotation),
              (a.font = v.string),
              (a.fillStyle = v.color),
              (a.textBaseline = "middle"),
              (a.textAlign = f.textAlign),
              (g = f.label),
              (m = f.textOffset),
              Et(g))
            )
              for (l = 0, h = g.length; l < h; ++l)
                a.fillText("" + g[l], 0, m), (m += v.lineHeight);
            else a.fillText(g, 0, m);
            a.restore();
          }
        }
      },
      _drawTitle: function () {
        var e = this,
          t = e.ctx,
          a = e.options,
          n = a.scaleLabel;
        if (!!n.display) {
          var o = Yt(n.fontColor, N.global.defaultFontColor),
            l = b.options._parseFont(n),
            u = b.options.toPadding(n.padding),
            h = l.lineHeight / 2,
            f = a.position,
            v = 0,
            g,
            m;
          if (e.isHorizontal())
            (g = e.left + e.width / 2),
              (m =
                f === "bottom" ? e.bottom - h - u.bottom : e.top + h + u.top);
          else {
            var y = f === "left";
            (g = y ? e.left + h + u.top : e.right - h - u.top),
              (m = e.top + e.height / 2),
              (v = y ? -0.5 * Math.PI : 0.5 * Math.PI);
          }
          t.save(),
            t.translate(g, m),
            t.rotate(v),
            (t.textAlign = "center"),
            (t.textBaseline = "middle"),
            (t.fillStyle = o),
            (t.font = l.string),
            t.fillText(n.labelString, 0, 0),
            t.restore();
        }
      },
      draw: function (e) {
        var t = this;
        !t._isVisible() || (t._drawGrid(e), t._drawTitle(), t._drawLabels());
      },
      _layers: function () {
        var e = this,
          t = e.options,
          a = (t.ticks && t.ticks.z) || 0,
          n = (t.gridLines && t.gridLines.z) || 0;
        return !e._isVisible() || a === n || e.draw !== e._draw
          ? [
              {
                z: a,
                draw: function () {
                  e.draw.apply(e, arguments);
                },
              },
            ]
          : [
              {
                z: n,
                draw: function () {
                  e._drawGrid.apply(e, arguments),
                    e._drawTitle.apply(e, arguments);
                },
              },
              {
                z: a,
                draw: function () {
                  e._drawLabels.apply(e, arguments);
                },
              },
            ];
      },
      _getMatchingVisibleMetas: function (e) {
        var t = this,
          a = t.isHorizontal();
        return t.chart._getSortedVisibleDatasetMetas().filter(function (n) {
          return (
            (!e || n.type === e) &&
            (a ? n.xAxisID === t.id : n.yAxisID === t.id)
          );
        });
      },
    });
    On.prototype._draw = On.prototype.draw;
    var Me = On,
      Pn = b.isNullOrUndef,
      ed = { position: "bottom" },
      go = Me.extend({
        determineDataLimits: function () {
          var e = this,
            t = e._getLabels(),
            a = e.options.ticks,
            n = a.min,
            o = a.max,
            l = 0,
            u = t.length - 1,
            h;
          n !== void 0 && ((h = t.indexOf(n)), h >= 0 && (l = h)),
            o !== void 0 && ((h = t.indexOf(o)), h >= 0 && (u = h)),
            (e.minIndex = l),
            (e.maxIndex = u),
            (e.min = t[l]),
            (e.max = t[u]);
        },
        buildTicks: function () {
          var e = this,
            t = e._getLabels(),
            a = e.minIndex,
            n = e.maxIndex;
          e.ticks = a === 0 && n === t.length - 1 ? t : t.slice(a, n + 1);
        },
        getLabelForIndex: function (e, t) {
          var a = this,
            n = a.chart;
          return n.getDatasetMeta(t).controller._getValueScaleId() === a.id
            ? a.getRightValue(n.data.datasets[t].data[e])
            : a._getLabels()[e];
        },
        _configure: function () {
          var e = this,
            t = e.options.offset,
            a = e.ticks;
          Me.prototype._configure.call(e),
            e.isHorizontal() || (e._reversePixels = !e._reversePixels),
            a &&
              ((e._startValue = e.minIndex - (t ? 0.5 : 0)),
              (e._valueRange = Math.max(a.length - (t ? 0 : 1), 1)));
        },
        getPixelForValue: function (e, t, a) {
          var n = this,
            o,
            l,
            u;
          return (
            !Pn(t) && !Pn(a) && (e = n.chart.data.datasets[a].data[t]),
            Pn(e) || (o = n.isHorizontal() ? e.x : e.y),
            (o !== void 0 || (e !== void 0 && isNaN(t))) &&
              ((l = n._getLabels()),
              (e = b.valueOrDefault(o, e)),
              (u = l.indexOf(e)),
              (t = u !== -1 ? u : t),
              isNaN(t) && (t = e)),
            n.getPixelForDecimal((t - n._startValue) / n._valueRange)
          );
        },
        getPixelForTick: function (e) {
          var t = this.ticks;
          return e < 0 || e > t.length - 1
            ? null
            : this.getPixelForValue(t[e], e + this.minIndex);
        },
        getValueForPixel: function (e) {
          var t = this,
            a = Math.round(
              t._startValue + t.getDecimalForPixel(e) * t._valueRange
            );
          return Math.min(Math.max(a, 0), t.ticks.length - 1);
        },
        getBasePixel: function () {
          return this.bottom;
        },
      }),
      td = ed;
    go._defaults = td;
    var rd = b.noop,
      zt = b.isNullOrUndef;
    function ad(e, t) {
      var a = [],
        n = 1e-14,
        o = e.stepSize,
        l = o || 1,
        u = e.maxTicks - 1,
        h = e.min,
        f = e.max,
        v = e.precision,
        g = t.min,
        m = t.max,
        y = b.niceNum((m - g) / u / l) * l,
        x,
        w,
        M,
        k;
      if (y < n && zt(h) && zt(f)) return [g, m];
      (k = Math.ceil(m / y) - Math.floor(g / y)),
        k > u && (y = b.niceNum((k * y) / u / l) * l),
        o || zt(v)
          ? (x = Math.pow(10, b._decimalPlaces(y)))
          : ((x = Math.pow(10, v)), (y = Math.ceil(y * x) / x)),
        (w = Math.floor(g / y) * y),
        (M = Math.ceil(m / y) * y),
        o &&
          (!zt(h) && b.almostWhole(h / y, y / 1e3) && (w = h),
          !zt(f) && b.almostWhole(f / y, y / 1e3) && (M = f)),
        (k = (M - w) / y),
        b.almostEquals(k, Math.round(k), y / 1e3)
          ? (k = Math.round(k))
          : (k = Math.ceil(k)),
        (w = Math.round(w * x) / x),
        (M = Math.round(M * x) / x),
        a.push(zt(h) ? w : h);
      for (var D = 1; D < k; ++D) a.push(Math.round((w + D * y) * x) / x);
      return a.push(zt(f) ? M : f), a;
    }
    var ua = Me.extend({
        getRightValue: function (e) {
          return typeof e == "string"
            ? +e
            : Me.prototype.getRightValue.call(this, e);
        },
        handleTickRangeOptions: function () {
          var e = this,
            t = e.options,
            a = t.ticks;
          if (a.beginAtZero) {
            var n = b.sign(e.min),
              o = b.sign(e.max);
            n < 0 && o < 0 ? (e.max = 0) : n > 0 && o > 0 && (e.min = 0);
          }
          var l = a.min !== void 0 || a.suggestedMin !== void 0,
            u = a.max !== void 0 || a.suggestedMax !== void 0;
          a.min !== void 0
            ? (e.min = a.min)
            : a.suggestedMin !== void 0 &&
              (e.min === null
                ? (e.min = a.suggestedMin)
                : (e.min = Math.min(e.min, a.suggestedMin))),
            a.max !== void 0
              ? (e.max = a.max)
              : a.suggestedMax !== void 0 &&
                (e.max === null
                  ? (e.max = a.suggestedMax)
                  : (e.max = Math.max(e.max, a.suggestedMax))),
            l !== u &&
              e.min >= e.max &&
              (l ? (e.max = e.min + 1) : (e.min = e.max - 1)),
            e.min === e.max && (e.max++, a.beginAtZero || e.min--);
        },
        getTickLimit: function () {
          var e = this,
            t = e.options.ticks,
            a = t.stepSize,
            n = t.maxTicksLimit,
            o;
          return (
            a
              ? (o = Math.ceil(e.max / a) - Math.floor(e.min / a) + 1)
              : ((o = e._computeTickLimit()), (n = n || 11)),
            n && (o = Math.min(n, o)),
            o
          );
        },
        _computeTickLimit: function () {
          return Number.POSITIVE_INFINITY;
        },
        handleDirectionalChanges: rd,
        buildTicks: function () {
          var e = this,
            t = e.options,
            a = t.ticks,
            n = e.getTickLimit();
          n = Math.max(2, n);
          var o = {
              maxTicks: n,
              min: a.min,
              max: a.max,
              precision: a.precision,
              stepSize: b.valueOrDefault(a.fixedStepSize, a.stepSize),
            },
            l = (e.ticks = ad(o, e));
          e.handleDirectionalChanges(),
            (e.max = b.max(l)),
            (e.min = b.min(l)),
            a.reverse
              ? (l.reverse(), (e.start = e.max), (e.end = e.min))
              : ((e.start = e.min), (e.end = e.max));
        },
        convertTicksToLabels: function () {
          var e = this;
          (e.ticksAsNumbers = e.ticks.slice()),
            (e.zeroLineIndex = e.ticks.indexOf(0)),
            Me.prototype.convertTicksToLabels.call(e);
        },
        _configure: function () {
          var e = this,
            t = e.getTicks(),
            a = e.min,
            n = e.max,
            o;
          Me.prototype._configure.call(e),
            e.options.offset &&
              t.length &&
              ((o = (n - a) / Math.max(t.length - 1, 1) / 2),
              (a -= o),
              (n += o)),
            (e._startValue = a),
            (e._endValue = n),
            (e._valueRange = n - a);
        },
      }),
      nd = { position: "left", ticks: { callback: Or.formatters.linear } },
      id = 0,
      od = 1;
    function sd(e, t, a) {
      var n = [
        a.type,
        t === void 0 && a.stack === void 0 ? a.index : "",
        a.stack,
      ].join(".");
      return e[n] === void 0 && (e[n] = { pos: [], neg: [] }), e[n];
    }
    function ld(e, t, a, n) {
      var o = e.options,
        l = o.stacked,
        u = sd(t, l, a),
        h = u.pos,
        f = u.neg,
        v = n.length,
        g,
        m;
      for (g = 0; g < v; ++g)
        (m = e._parseValue(n[g])),
          !(isNaN(m.min) || isNaN(m.max) || a.data[g].hidden) &&
            ((h[g] = h[g] || 0),
            (f[g] = f[g] || 0),
            o.relativePoints
              ? (h[g] = 100)
              : m.min < 0 || m.max < 0
              ? (f[g] += m.min)
              : (h[g] += m.max));
    }
    function ud(e, t, a) {
      var n = a.length,
        o,
        l;
      for (o = 0; o < n; ++o)
        (l = e._parseValue(a[o])),
          !(isNaN(l.min) || isNaN(l.max) || t.data[o].hidden) &&
            ((e.min = Math.min(e.min, l.min)),
            (e.max = Math.max(e.max, l.max)));
    }
    var mo = ua.extend({
        determineDataLimits: function () {
          var e = this,
            t = e.options,
            a = e.chart,
            n = a.data.datasets,
            o = e._getMatchingVisibleMetas(),
            l = t.stacked,
            u = {},
            h = o.length,
            f,
            v,
            g,
            m;
          if (
            ((e.min = Number.POSITIVE_INFINITY),
            (e.max = Number.NEGATIVE_INFINITY),
            l === void 0)
          )
            for (f = 0; !l && f < h; ++f) (v = o[f]), (l = v.stack !== void 0);
          for (f = 0; f < h; ++f)
            (v = o[f]), (g = n[v.index].data), l ? ld(e, u, v, g) : ud(e, v, g);
          b.each(u, function (y) {
            (m = y.pos.concat(y.neg)),
              (e.min = Math.min(e.min, b.min(m))),
              (e.max = Math.max(e.max, b.max(m)));
          }),
            (e.min = b.isFinite(e.min) && !isNaN(e.min) ? e.min : id),
            (e.max = b.isFinite(e.max) && !isNaN(e.max) ? e.max : od),
            e.handleTickRangeOptions();
        },
        _computeTickLimit: function () {
          var e = this,
            t;
          return e.isHorizontal()
            ? Math.ceil(e.width / 40)
            : ((t = b.options._parseFont(e.options.ticks)),
              Math.ceil(e.height / t.lineHeight));
        },
        handleDirectionalChanges: function () {
          this.isHorizontal() || this.ticks.reverse();
        },
        getLabelForIndex: function (e, t) {
          return this._getScaleLabel(this.chart.data.datasets[t].data[e]);
        },
        getPixelForValue: function (e) {
          var t = this;
          return t.getPixelForDecimal(
            (+t.getRightValue(e) - t._startValue) / t._valueRange
          );
        },
        getValueForPixel: function (e) {
          return (
            this._startValue + this.getDecimalForPixel(e) * this._valueRange
          );
        },
        getPixelForTick: function (e) {
          var t = this.ticksAsNumbers;
          return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e]);
        },
      }),
      dd = nd;
    mo._defaults = dd;
    var Fn = b.valueOrDefault,
      ke = b.math.log10;
    function fd(e, t) {
      var a = [],
        n = Fn(e.min, Math.pow(10, Math.floor(ke(t.min)))),
        o = Math.floor(ke(t.max)),
        l = Math.ceil(t.max / Math.pow(10, o)),
        u,
        h;
      n === 0
        ? ((u = Math.floor(ke(t.minNotZero))),
          (h = Math.floor(t.minNotZero / Math.pow(10, u))),
          a.push(n),
          (n = h * Math.pow(10, u)))
        : ((u = Math.floor(ke(n))), (h = Math.floor(n / Math.pow(10, u))));
      var f = u < 0 ? Math.pow(10, Math.abs(u)) : 1;
      do
        a.push(n),
          ++h,
          h === 10 && ((h = 1), ++u, (f = u >= 0 ? 1 : f)),
          (n = Math.round(h * Math.pow(10, u) * f) / f);
      while (u < o || (u === o && h < l));
      var v = Fn(e.max, n);
      return a.push(v), a;
    }
    var cd = {
      position: "left",
      ticks: { callback: Or.formatters.logarithmic },
    };
    function da(e, t) {
      return b.isFinite(e) && e >= 0 ? e : t;
    }
    var po = Me.extend({
        determineDataLimits: function () {
          var e = this,
            t = e.options,
            a = e.chart,
            n = a.data.datasets,
            o = e.isHorizontal();
          function l(k) {
            return o ? k.xAxisID === e.id : k.yAxisID === e.id;
          }
          var u, h, f, v, g, m;
          (e.min = Number.POSITIVE_INFINITY),
            (e.max = Number.NEGATIVE_INFINITY),
            (e.minNotZero = Number.POSITIVE_INFINITY);
          var y = t.stacked;
          if (y === void 0) {
            for (u = 0; u < n.length; u++)
              if (
                ((h = a.getDatasetMeta(u)),
                a.isDatasetVisible(u) && l(h) && h.stack !== void 0)
              ) {
                y = !0;
                break;
              }
          }
          if (t.stacked || y) {
            var x = {};
            for (u = 0; u < n.length; u++) {
              h = a.getDatasetMeta(u);
              var w = [
                h.type,
                t.stacked === void 0 && h.stack === void 0 ? u : "",
                h.stack,
              ].join(".");
              if (a.isDatasetVisible(u) && l(h))
                for (
                  x[w] === void 0 && (x[w] = []),
                    v = n[u].data,
                    g = 0,
                    m = v.length;
                  g < m;
                  g++
                ) {
                  var M = x[w];
                  (f = e._parseValue(v[g])),
                    !(
                      isNaN(f.min) ||
                      isNaN(f.max) ||
                      h.data[g].hidden ||
                      f.min < 0 ||
                      f.max < 0
                    ) && ((M[g] = M[g] || 0), (M[g] += f.max));
                }
            }
            b.each(x, function (k) {
              if (k.length > 0) {
                var D = b.min(k),
                  F = b.max(k);
                (e.min = Math.min(e.min, D)), (e.max = Math.max(e.max, F));
              }
            });
          } else
            for (u = 0; u < n.length; u++)
              if (((h = a.getDatasetMeta(u)), a.isDatasetVisible(u) && l(h)))
                for (v = n[u].data, g = 0, m = v.length; g < m; g++)
                  (f = e._parseValue(v[g])),
                    !(
                      isNaN(f.min) ||
                      isNaN(f.max) ||
                      h.data[g].hidden ||
                      f.min < 0 ||
                      f.max < 0
                    ) &&
                      ((e.min = Math.min(f.min, e.min)),
                      (e.max = Math.max(f.max, e.max)),
                      f.min !== 0 &&
                        (e.minNotZero = Math.min(f.min, e.minNotZero)));
          (e.min = b.isFinite(e.min) ? e.min : null),
            (e.max = b.isFinite(e.max) ? e.max : null),
            (e.minNotZero = b.isFinite(e.minNotZero) ? e.minNotZero : null),
            this.handleTickRangeOptions();
        },
        handleTickRangeOptions: function () {
          var e = this,
            t = e.options.ticks,
            a = 1,
            n = 10;
          (e.min = da(t.min, e.min)),
            (e.max = da(t.max, e.max)),
            e.min === e.max &&
              (e.min !== 0 && e.min !== null
                ? ((e.min = Math.pow(10, Math.floor(ke(e.min)) - 1)),
                  (e.max = Math.pow(10, Math.floor(ke(e.max)) + 1)))
                : ((e.min = a), (e.max = n))),
            e.min === null && (e.min = Math.pow(10, Math.floor(ke(e.max)) - 1)),
            e.max === null &&
              (e.max =
                e.min !== 0 ? Math.pow(10, Math.floor(ke(e.min)) + 1) : n),
            e.minNotZero === null &&
              (e.min > 0
                ? (e.minNotZero = e.min)
                : e.max < 1
                ? (e.minNotZero = Math.pow(10, Math.floor(ke(e.max))))
                : (e.minNotZero = a));
        },
        buildTicks: function () {
          var e = this,
            t = e.options.ticks,
            a = !e.isHorizontal(),
            n = { min: da(t.min), max: da(t.max) },
            o = (e.ticks = fd(n, e));
          (e.max = b.max(o)),
            (e.min = b.min(o)),
            t.reverse
              ? ((a = !a), (e.start = e.max), (e.end = e.min))
              : ((e.start = e.min), (e.end = e.max)),
            a && o.reverse();
        },
        convertTicksToLabels: function () {
          (this.tickValues = this.ticks.slice()),
            Me.prototype.convertTicksToLabels.call(this);
        },
        getLabelForIndex: function (e, t) {
          return this._getScaleLabel(this.chart.data.datasets[t].data[e]);
        },
        getPixelForTick: function (e) {
          var t = this.tickValues;
          return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e]);
        },
        _getFirstTickValue: function (e) {
          var t = Math.floor(ke(e)),
            a = Math.floor(e / Math.pow(10, t));
          return a * Math.pow(10, t);
        },
        _configure: function () {
          var e = this,
            t = e.min,
            a = 0;
          Me.prototype._configure.call(e),
            t === 0 &&
              ((t = e._getFirstTickValue(e.minNotZero)),
              (a =
                Fn(e.options.ticks.fontSize, N.global.defaultFontSize) /
                e._length)),
            (e._startValue = ke(t)),
            (e._valueOffset = a),
            (e._valueRange = (ke(e.max) - ke(t)) / (1 - a));
        },
        getPixelForValue: function (e) {
          var t = this,
            a = 0;
          return (
            (e = +t.getRightValue(e)),
            e > t.min &&
              e > 0 &&
              (a = (ke(e) - t._startValue) / t._valueRange + t._valueOffset),
            t.getPixelForDecimal(a)
          );
        },
        getValueForPixel: function (e) {
          var t = this,
            a = t.getDecimalForPixel(e);
          return a === 0 && t.min === 0
            ? 0
            : Math.pow(
                10,
                t._startValue + (a - t._valueOffset) * t._valueRange
              );
        },
      }),
      hd = cd;
    po._defaults = hd;
    var fa = b.valueOrDefault,
      In = b.valueAtIndexOrDefault,
      bo = b.options.resolve,
      vd = {
        display: !0,
        animate: !0,
        position: "chartArea",
        angleLines: {
          display: !0,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0,
        },
        gridLines: { circular: !1 },
        ticks: {
          showLabelBackdrop: !0,
          backdropColor: "rgba(255,255,255,0.75)",
          backdropPaddingY: 2,
          backdropPaddingX: 2,
          callback: Or.formatters.linear,
        },
        pointLabels: {
          display: !0,
          fontSize: 10,
          callback: function (e) {
            return e;
          },
        },
      };
    function An(e) {
      var t = e.ticks;
      return t.display && e.display
        ? fa(t.fontSize, N.global.defaultFontSize) + t.backdropPaddingY * 2
        : 0;
    }
    function gd(e, t, a) {
      return b.isArray(a)
        ? { w: b.longestText(e, e.font, a), h: a.length * t }
        : { w: e.measureText(a).width, h: t };
    }
    function yo(e, t, a, n, o) {
      return e === n || e === o
        ? { start: t - a / 2, end: t + a / 2 }
        : e < n || e > o
        ? { start: t - a, end: t }
        : { start: t, end: t + a };
    }
    function md(e) {
      var t = b.options._parseFont(e.options.pointLabels),
        a = { l: 0, r: e.width, t: 0, b: e.height - e.paddingTop },
        n = {},
        o,
        l,
        u;
      (e.ctx.font = t.string), (e._pointLabelSizes = []);
      var h = e.chart.data.labels.length;
      for (o = 0; o < h; o++) {
        (u = e.getPointPosition(o, e.drawingArea + 5)),
          (l = gd(e.ctx, t.lineHeight, e.pointLabels[o])),
          (e._pointLabelSizes[o] = l);
        var f = e.getIndexAngle(o),
          v = b.toDegrees(f) % 360,
          g = yo(v, u.x, l.w, 0, 180),
          m = yo(v, u.y, l.h, 90, 270);
        g.start < a.l && ((a.l = g.start), (n.l = f)),
          g.end > a.r && ((a.r = g.end), (n.r = f)),
          m.start < a.t && ((a.t = m.start), (n.t = f)),
          m.end > a.b && ((a.b = m.end), (n.b = f));
      }
      e.setReductions(e.drawingArea, a, n);
    }
    function pd(e) {
      return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
    }
    function bd(e, t, a, n) {
      var o = a.y + n / 2,
        l,
        u;
      if (b.isArray(t))
        for (l = 0, u = t.length; l < u; ++l)
          e.fillText(t[l], a.x, o), (o += n);
      else e.fillText(t, a.x, o);
    }
    function yd(e, t, a) {
      e === 90 || e === 270
        ? (a.y -= t.h / 2)
        : (e > 270 || e < 90) && (a.y -= t.h);
    }
    function _d(e) {
      var t = e.ctx,
        a = e.options,
        n = a.pointLabels,
        o = An(a),
        l = e.getDistanceFromCenterForValue(a.ticks.reverse ? e.min : e.max),
        u = b.options._parseFont(n);
      t.save(), (t.font = u.string), (t.textBaseline = "middle");
      for (var h = e.chart.data.labels.length - 1; h >= 0; h--) {
        var f = h === 0 ? o / 2 : 0,
          v = e.getPointPosition(h, l + f + 5),
          g = In(n.fontColor, h, N.global.defaultFontColor);
        t.fillStyle = g;
        var m = e.getIndexAngle(h),
          y = b.toDegrees(m);
        (t.textAlign = pd(y)),
          yd(y, e._pointLabelSizes[h], v),
          bd(t, e.pointLabels[h], v, u.lineHeight);
      }
      t.restore();
    }
    function xd(e, t, a, n) {
      var o = e.ctx,
        l = t.circular,
        u = e.chart.data.labels.length,
        h = In(t.color, n - 1),
        f = In(t.lineWidth, n - 1),
        v;
      if (!((!l && !u) || !h || !f)) {
        if (
          (o.save(),
          (o.strokeStyle = h),
          (o.lineWidth = f),
          o.setLineDash &&
            (o.setLineDash(t.borderDash || []),
            (o.lineDashOffset = t.borderDashOffset || 0)),
          o.beginPath(),
          l)
        )
          o.arc(e.xCenter, e.yCenter, a, 0, Math.PI * 2);
        else {
          (v = e.getPointPosition(0, a)), o.moveTo(v.x, v.y);
          for (var g = 1; g < u; g++)
            (v = e.getPointPosition(g, a)), o.lineTo(v.x, v.y);
        }
        o.closePath(), o.stroke(), o.restore();
      }
    }
    function ca(e) {
      return b.isNumber(e) ? e : 0;
    }
    var _o = ua.extend({
        setDimensions: function () {
          var e = this;
          (e.width = e.maxWidth),
            (e.height = e.maxHeight),
            (e.paddingTop = An(e.options) / 2),
            (e.xCenter = Math.floor(e.width / 2)),
            (e.yCenter = Math.floor((e.height - e.paddingTop) / 2)),
            (e.drawingArea = Math.min(e.height - e.paddingTop, e.width) / 2);
        },
        determineDataLimits: function () {
          var e = this,
            t = e.chart,
            a = Number.POSITIVE_INFINITY,
            n = Number.NEGATIVE_INFINITY;
          b.each(t.data.datasets, function (o, l) {
            if (t.isDatasetVisible(l)) {
              var u = t.getDatasetMeta(l);
              b.each(o.data, function (h, f) {
                var v = +e.getRightValue(h);
                isNaN(v) ||
                  u.data[f].hidden ||
                  ((a = Math.min(v, a)), (n = Math.max(v, n)));
              });
            }
          }),
            (e.min = a === Number.POSITIVE_INFINITY ? 0 : a),
            (e.max = n === Number.NEGATIVE_INFINITY ? 0 : n),
            e.handleTickRangeOptions();
        },
        _computeTickLimit: function () {
          return Math.ceil(this.drawingArea / An(this.options));
        },
        convertTicksToLabels: function () {
          var e = this;
          ua.prototype.convertTicksToLabels.call(e),
            (e.pointLabels = e.chart.data.labels.map(function () {
              var t = b.callback(e.options.pointLabels.callback, arguments, e);
              return t || t === 0 ? t : "";
            }));
        },
        getLabelForIndex: function (e, t) {
          return +this.getRightValue(this.chart.data.datasets[t].data[e]);
        },
        fit: function () {
          var e = this,
            t = e.options;
          t.display && t.pointLabels.display
            ? md(e)
            : e.setCenterPoint(0, 0, 0, 0);
        },
        setReductions: function (e, t, a) {
          var n = this,
            o = t.l / Math.sin(a.l),
            l = Math.max(t.r - n.width, 0) / Math.sin(a.r),
            u = -t.t / Math.cos(a.t),
            h = -Math.max(t.b - (n.height - n.paddingTop), 0) / Math.cos(a.b);
          (o = ca(o)),
            (l = ca(l)),
            (u = ca(u)),
            (h = ca(h)),
            (n.drawingArea = Math.min(
              Math.floor(e - (o + l) / 2),
              Math.floor(e - (u + h) / 2)
            )),
            n.setCenterPoint(o, l, u, h);
        },
        setCenterPoint: function (e, t, a, n) {
          var o = this,
            l = o.width - t - o.drawingArea,
            u = e + o.drawingArea,
            h = a + o.drawingArea,
            f = o.height - o.paddingTop - n - o.drawingArea;
          (o.xCenter = Math.floor((u + l) / 2 + o.left)),
            (o.yCenter = Math.floor((h + f) / 2 + o.top + o.paddingTop));
        },
        getIndexAngle: function (e) {
          var t = this.chart,
            a = 360 / t.data.labels.length,
            n = t.options || {},
            o = n.startAngle || 0,
            l = (e * a + o) % 360;
          return ((l < 0 ? l + 360 : l) * Math.PI * 2) / 360;
        },
        getDistanceFromCenterForValue: function (e) {
          var t = this;
          if (b.isNullOrUndef(e)) return NaN;
          var a = t.drawingArea / (t.max - t.min);
          return t.options.ticks.reverse ? (t.max - e) * a : (e - t.min) * a;
        },
        getPointPosition: function (e, t) {
          var a = this,
            n = a.getIndexAngle(e) - Math.PI / 2;
          return {
            x: Math.cos(n) * t + a.xCenter,
            y: Math.sin(n) * t + a.yCenter,
          };
        },
        getPointPositionForValue: function (e, t) {
          return this.getPointPosition(
            e,
            this.getDistanceFromCenterForValue(t)
          );
        },
        getBasePosition: function (e) {
          var t = this,
            a = t.min,
            n = t.max;
          return t.getPointPositionForValue(
            e || 0,
            t.beginAtZero ? 0 : a < 0 && n < 0 ? n : a > 0 && n > 0 ? a : 0
          );
        },
        _drawGrid: function () {
          var e = this,
            t = e.ctx,
            a = e.options,
            n = a.gridLines,
            o = a.angleLines,
            l = fa(o.lineWidth, n.lineWidth),
            u = fa(o.color, n.color),
            h,
            f,
            v;
          if (
            (a.pointLabels.display && _d(e),
            n.display &&
              b.each(e.ticks, function (g, m) {
                m !== 0 &&
                  ((f = e.getDistanceFromCenterForValue(e.ticksAsNumbers[m])),
                  xd(e, n, f, m));
              }),
            o.display && l && u)
          ) {
            for (
              t.save(),
                t.lineWidth = l,
                t.strokeStyle = u,
                t.setLineDash &&
                  (t.setLineDash(bo([o.borderDash, n.borderDash, []])),
                  (t.lineDashOffset = bo([
                    o.borderDashOffset,
                    n.borderDashOffset,
                    0,
                  ]))),
                h = e.chart.data.labels.length - 1;
              h >= 0;
              h--
            )
              (f = e.getDistanceFromCenterForValue(
                a.ticks.reverse ? e.min : e.max
              )),
                (v = e.getPointPosition(h, f)),
                t.beginPath(),
                t.moveTo(e.xCenter, e.yCenter),
                t.lineTo(v.x, v.y),
                t.stroke();
            t.restore();
          }
        },
        _drawLabels: function () {
          var e = this,
            t = e.ctx,
            a = e.options,
            n = a.ticks;
          if (!!n.display) {
            var o = e.getIndexAngle(0),
              l = b.options._parseFont(n),
              u = fa(n.fontColor, N.global.defaultFontColor),
              h,
              f;
            t.save(),
              (t.font = l.string),
              t.translate(e.xCenter, e.yCenter),
              t.rotate(o),
              (t.textAlign = "center"),
              (t.textBaseline = "middle"),
              b.each(e.ticks, function (v, g) {
                (g === 0 && !n.reverse) ||
                  ((h = e.getDistanceFromCenterForValue(e.ticksAsNumbers[g])),
                  n.showLabelBackdrop &&
                    ((f = t.measureText(v).width),
                    (t.fillStyle = n.backdropColor),
                    t.fillRect(
                      -f / 2 - n.backdropPaddingX,
                      -h - l.size / 2 - n.backdropPaddingY,
                      f + n.backdropPaddingX * 2,
                      l.size + n.backdropPaddingY * 2
                    )),
                  (t.fillStyle = u),
                  t.fillText(v, 0, -h));
              }),
              t.restore();
          }
        },
        _drawTitle: b.noop,
      }),
      wd = vd;
    _o._defaults = wd;
    var Nn = b._deprecated,
      xo = b.options.resolve,
      Md = b.valueOrDefault,
      wo = Number.MIN_SAFE_INTEGER || -9007199254740991,
      Rn = Number.MAX_SAFE_INTEGER || 9007199254740991,
      ha = {
        millisecond: { common: !0, size: 1, steps: 1e3 },
        second: { common: !0, size: 1e3, steps: 60 },
        minute: { common: !0, size: 6e4, steps: 60 },
        hour: { common: !0, size: 36e5, steps: 24 },
        day: { common: !0, size: 864e5, steps: 30 },
        week: { common: !1, size: 6048e5, steps: 4 },
        month: { common: !0, size: 2628e6, steps: 12 },
        quarter: { common: !1, size: 7884e6, steps: 4 },
        year: { common: !0, size: 3154e7 },
      },
      Se = Object.keys(ha);
    function Mo(e, t) {
      return e - t;
    }
    function kd(e) {
      var t = {},
        a = [],
        n,
        o,
        l;
      for (n = 0, o = e.length; n < o; ++n)
        (l = e[n]), t[l] || ((t[l] = !0), a.push(l));
      return a;
    }
    function ko(e) {
      return b.valueOrDefault(e.time.min, e.ticks.min);
    }
    function So(e) {
      return b.valueOrDefault(e.time.max, e.ticks.max);
    }
    function Sd(e, t, a, n) {
      if (n === "linear" || !e.length)
        return [
          { time: t, pos: 0 },
          { time: a, pos: 1 },
        ];
      var o = [],
        l = [t],
        u,
        h,
        f,
        v,
        g;
      for (u = 0, h = e.length; u < h; ++u)
        (v = e[u]), v > t && v < a && l.push(v);
      for (l.push(a), u = 0, h = l.length; u < h; ++u)
        (g = l[u + 1]),
          (f = l[u - 1]),
          (v = l[u]),
          (f === void 0 || g === void 0 || Math.round((g + f) / 2) !== v) &&
            o.push({ time: v, pos: u / (h - 1) });
      return o;
    }
    function Dd(e, t, a) {
      for (var n = 0, o = e.length - 1, l, u, h; n >= 0 && n <= o; )
        if (((l = (n + o) >> 1), (u = e[l - 1] || null), (h = e[l]), u))
          if (h[t] < a) n = l + 1;
          else if (u[t] > a) o = l - 1;
          else return { lo: u, hi: h };
        else return { lo: null, hi: h };
      return { lo: h, hi: null };
    }
    function tr(e, t, a, n) {
      var o = Dd(e, t, a),
        l = o.lo ? (o.hi ? o.lo : e[e.length - 2]) : e[0],
        u = o.lo ? (o.hi ? o.hi : e[e.length - 1]) : e[1],
        h = u[t] - l[t],
        f = h ? (a - l[t]) / h : 0,
        v = (u[n] - l[n]) * f;
      return l[n] + v;
    }
    function Ln(e, t) {
      var a = e._adapter,
        n = e.options.time,
        o = n.parser,
        l = o || n.format,
        u = t;
      return (
        typeof o == "function" && (u = o(u)),
        b.isFinite(u) ||
          (u = typeof l == "string" ? a.parse(u, l) : a.parse(u)),
        u !== null
          ? +u
          : (!o &&
              typeof l == "function" &&
              ((u = l(t)), b.isFinite(u) || (u = a.parse(u))),
            u)
      );
    }
    function Bt(e, t) {
      if (b.isNullOrUndef(t)) return null;
      var a = e.options.time,
        n = Ln(e, e.getRightValue(t));
      return (
        n === null || (a.round && (n = +e._adapter.startOf(n, a.round))), n
      );
    }
    function Do(e, t, a, n) {
      var o = Se.length,
        l,
        u,
        h;
      for (l = Se.indexOf(e); l < o - 1; ++l)
        if (
          ((u = ha[Se[l]]),
          (h = u.steps ? u.steps : Rn),
          u.common && Math.ceil((a - t) / (h * u.size)) <= n)
        )
          return Se[l];
      return Se[o - 1];
    }
    function Td(e, t, a, n, o) {
      var l, u;
      for (l = Se.length - 1; l >= Se.indexOf(a); l--)
        if (((u = Se[l]), ha[u].common && e._adapter.diff(o, n, u) >= t - 1))
          return u;
      return Se[a ? Se.indexOf(a) : 0];
    }
    function Cd(e) {
      for (var t = Se.indexOf(e) + 1, a = Se.length; t < a; ++t)
        if (ha[Se[t]].common) return Se[t];
    }
    function Od(e, t, a, n) {
      var o = e._adapter,
        l = e.options,
        u = l.time,
        h = u.unit || Do(u.minUnit, t, a, n),
        f = xo([u.stepSize, u.unitStepSize, 1]),
        v = h === "week" ? u.isoWeekday : !1,
        g = t,
        m = [],
        y;
      if (
        (v && (g = +o.startOf(g, "isoWeek", v)),
        (g = +o.startOf(g, v ? "day" : h)),
        o.diff(a, t, h) > 1e5 * f)
      )
        throw (
          t + " and " + a + " are too far apart with stepSize of " + f + " " + h
        );
      for (y = g; y < a; y = +o.add(y, f, h)) m.push(y);
      return (y === a || l.bounds === "ticks") && m.push(y), m;
    }
    function Pd(e, t, a, n, o) {
      var l = 0,
        u = 0,
        h,
        f;
      return (
        o.offset &&
          t.length &&
          ((h = tr(e, "time", t[0], "pos")),
          t.length === 1
            ? (l = 1 - h)
            : (l = (tr(e, "time", t[1], "pos") - h) / 2),
          (f = tr(e, "time", t[t.length - 1], "pos")),
          t.length === 1
            ? (u = f)
            : (u = (f - tr(e, "time", t[t.length - 2], "pos")) / 2)),
        { start: l, end: u, factor: 1 / (l + 1 + u) }
      );
    }
    function Fd(e, t, a, n) {
      var o = e._adapter,
        l = +o.startOf(t[0].value, n),
        u = t[t.length - 1].value,
        h,
        f;
      for (h = l; h <= u; h = +o.add(h, 1, n))
        (f = a[h]), f >= 0 && (t[f].major = !0);
      return t;
    }
    function To(e, t, a) {
      var n = [],
        o = {},
        l = t.length,
        u,
        h;
      for (u = 0; u < l; ++u)
        (h = t[u]), (o[h] = u), n.push({ value: h, major: !1 });
      return l === 0 || !a ? n : Fd(e, n, o, a);
    }
    var Id = {
        position: "bottom",
        distribution: "linear",
        bounds: "data",
        adapters: {},
        time: {
          parser: !1,
          unit: !1,
          round: !1,
          displayFormat: !1,
          isoWeekday: !1,
          minUnit: "millisecond",
          displayFormats: {},
        },
        ticks: { autoSkip: !1, source: "auto", major: { enabled: !1 } },
      },
      Co = Me.extend({
        initialize: function () {
          this.mergeTicksOptions(), Me.prototype.initialize.call(this);
        },
        update: function () {
          var e = this,
            t = e.options,
            a = t.time || (t.time = {}),
            n = (e._adapter = new Sn._date(t.adapters.date));
          return (
            Nn("time scale", a.format, "time.format", "time.parser"),
            Nn("time scale", a.min, "time.min", "ticks.min"),
            Nn("time scale", a.max, "time.max", "ticks.max"),
            b.mergeIf(a.displayFormats, n.formats()),
            Me.prototype.update.apply(e, arguments)
          );
        },
        getRightValue: function (e) {
          return (
            e && e.t !== void 0 && (e = e.t),
            Me.prototype.getRightValue.call(this, e)
          );
        },
        determineDataLimits: function () {
          var e = this,
            t = e.chart,
            a = e._adapter,
            n = e.options,
            o = n.time.unit || "day",
            l = Rn,
            u = wo,
            h = [],
            f = [],
            v = [],
            g,
            m,
            y,
            x,
            w,
            M,
            k,
            D = e._getLabels();
          for (g = 0, y = D.length; g < y; ++g) v.push(Bt(e, D[g]));
          for (g = 0, y = (t.data.datasets || []).length; g < y; ++g)
            if (t.isDatasetVisible(g))
              if (((w = t.data.datasets[g].data), b.isObject(w[0])))
                for (f[g] = [], m = 0, x = w.length; m < x; ++m)
                  (M = Bt(e, w[m])), h.push(M), (f[g][m] = M);
              else (f[g] = v.slice(0)), k || ((h = h.concat(v)), (k = !0));
            else f[g] = [];
          v.length &&
            ((l = Math.min(l, v[0])), (u = Math.max(u, v[v.length - 1]))),
            h.length &&
              ((h = y > 1 ? kd(h).sort(Mo) : h.sort(Mo)),
              (l = Math.min(l, h[0])),
              (u = Math.max(u, h[h.length - 1]))),
            (l = Bt(e, ko(n)) || l),
            (u = Bt(e, So(n)) || u),
            (l = l === Rn ? +a.startOf(Date.now(), o) : l),
            (u = u === wo ? +a.endOf(Date.now(), o) + 1 : u),
            (e.min = Math.min(l, u)),
            (e.max = Math.max(l + 1, u)),
            (e._table = []),
            (e._timestamps = { data: h, datasets: f, labels: v });
        },
        buildTicks: function () {
          var e = this,
            t = e.min,
            a = e.max,
            n = e.options,
            o = n.ticks,
            l = n.time,
            u = e._timestamps,
            h = [],
            f = e.getLabelCapacity(t),
            v = o.source,
            g = n.distribution,
            m,
            y,
            x;
          for (
            v === "data" || (v === "auto" && g === "series")
              ? (u = u.data)
              : v === "labels"
              ? (u = u.labels)
              : (u = Od(e, t, a, f)),
              n.bounds === "ticks" &&
                u.length &&
                ((t = u[0]), (a = u[u.length - 1])),
              t = Bt(e, ko(n)) || t,
              a = Bt(e, So(n)) || a,
              m = 0,
              y = u.length;
            m < y;
            ++m
          )
            (x = u[m]), x >= t && x <= a && h.push(x);
          return (
            (e.min = t),
            (e.max = a),
            (e._unit =
              l.unit ||
              (o.autoSkip
                ? Do(l.minUnit, e.min, e.max, f)
                : Td(e, h.length, l.minUnit, e.min, e.max))),
            (e._majorUnit =
              !o.major.enabled || e._unit === "year" ? void 0 : Cd(e._unit)),
            (e._table = Sd(e._timestamps.data, t, a, g)),
            (e._offsets = Pd(e._table, h, t, a, n)),
            o.reverse && h.reverse(),
            To(e, h, e._majorUnit)
          );
        },
        getLabelForIndex: function (e, t) {
          var a = this,
            n = a._adapter,
            o = a.chart.data,
            l = a.options.time,
            u = o.labels && e < o.labels.length ? o.labels[e] : "",
            h = o.datasets[t].data[e];
          return (
            b.isObject(h) && (u = a.getRightValue(h)),
            l.tooltipFormat
              ? n.format(Ln(a, u), l.tooltipFormat)
              : typeof u == "string"
              ? u
              : n.format(Ln(a, u), l.displayFormats.datetime)
          );
        },
        tickFormatFunction: function (e, t, a, n) {
          var o = this,
            l = o._adapter,
            u = o.options,
            h = u.time.displayFormats,
            f = h[o._unit],
            v = o._majorUnit,
            g = h[v],
            m = a[t],
            y = u.ticks,
            x = v && g && m && m.major,
            w = l.format(e, n || (x ? g : f)),
            M = x ? y.major : y.minor,
            k = xo([M.callback, M.userCallback, y.callback, y.userCallback]);
          return k ? k(w, t, a) : w;
        },
        convertTicksToLabels: function (e) {
          var t = [],
            a,
            n;
          for (a = 0, n = e.length; a < n; ++a)
            t.push(this.tickFormatFunction(e[a].value, a, e));
          return t;
        },
        getPixelForOffset: function (e) {
          var t = this,
            a = t._offsets,
            n = tr(t._table, "time", e, "pos");
          return t.getPixelForDecimal((a.start + n) * a.factor);
        },
        getPixelForValue: function (e, t, a) {
          var n = this,
            o = null;
          if (
            (t !== void 0 && a !== void 0 && (o = n._timestamps.datasets[a][t]),
            o === null && (o = Bt(n, e)),
            o !== null)
          )
            return n.getPixelForOffset(o);
        },
        getPixelForTick: function (e) {
          var t = this.getTicks();
          return e >= 0 && e < t.length
            ? this.getPixelForOffset(t[e].value)
            : null;
        },
        getValueForPixel: function (e) {
          var t = this,
            a = t._offsets,
            n = t.getDecimalForPixel(e) / a.factor - a.end,
            o = tr(t._table, "pos", n, "time");
          return t._adapter._create(o);
        },
        _getLabelSize: function (e) {
          var t = this,
            a = t.options.ticks,
            n = t.ctx.measureText(e).width,
            o = b.toRadians(t.isHorizontal() ? a.maxRotation : a.minRotation),
            l = Math.cos(o),
            u = Math.sin(o),
            h = Md(a.fontSize, N.global.defaultFontSize);
          return { w: n * l + h * u, h: n * u + h * l };
        },
        getLabelWidth: function (e) {
          return this._getLabelSize(e).w;
        },
        getLabelCapacity: function (e) {
          var t = this,
            a = t.options.time,
            n = a.displayFormats,
            o = n[a.unit] || n.millisecond,
            l = t.tickFormatFunction(e, 0, To(t, [e], t._majorUnit), o),
            u = t._getLabelSize(l),
            h = Math.floor(t.isHorizontal() ? t.width / u.w : t.height / u.h);
          return t.options.offset && h--, h > 0 ? h : 1;
        },
      }),
      Ad = Id;
    Co._defaults = Ad;
    var Nd = {
        category: go,
        linear: mo,
        logarithmic: po,
        radialLinear: _o,
        time: Co,
      },
      Rd = {
        datetime: "MMM D, YYYY, h:mm:ss a",
        millisecond: "h:mm:ss.SSS a",
        second: "h:mm:ss a",
        minute: "h:mm a",
        hour: "hA",
        day: "MMM D",
        week: "ll",
        month: "MMM YYYY",
        quarter: "[Q]Q - YYYY",
        year: "YYYY",
      };
    Sn._date.override(
      typeof s == "function"
        ? {
            _id: "moment",
            formats: function () {
              return Rd;
            },
            parse: function (e, t) {
              return (
                typeof e == "string" && typeof t == "string"
                  ? (e = s(e, t))
                  : e instanceof s || (e = s(e)),
                e.isValid() ? e.valueOf() : null
              );
            },
            format: function (e, t) {
              return s(e).format(t);
            },
            add: function (e, t, a) {
              return s(e).add(t, a).valueOf();
            },
            diff: function (e, t, a) {
              return s(e).diff(s(t), a);
            },
            startOf: function (e, t, a) {
              return (
                (e = s(e)),
                t === "isoWeek"
                  ? e.isoWeekday(a).valueOf()
                  : e.startOf(t).valueOf()
              );
            },
            endOf: function (e, t) {
              return s(e).endOf(t).valueOf();
            },
            _create: function (e) {
              return s(e);
            },
          }
        : {}
    ),
      N._set("global", { plugins: { filler: { propagate: !0 } } });
    var Ld = {
      dataset: function (e) {
        var t = e.fill,
          a = e.chart,
          n = a.getDatasetMeta(t),
          o = n && a.isDatasetVisible(t),
          l = (o && n.dataset._children) || [],
          u = l.length || 0;
        return u
          ? function (h, f) {
              return (f < u && l[f]._view) || null;
            }
          : null;
      },
      boundary: function (e) {
        var t = e.boundary,
          a = t ? t.x : null,
          n = t ? t.y : null;
        return b.isArray(t)
          ? function (o, l) {
              return t[l];
            }
          : function (o) {
              return { x: a === null ? o.x : a, y: n === null ? o.y : n };
            };
      },
    };
    function Wd(e, t, a) {
      var n = e._model || {},
        o = n.fill,
        l;
      if ((o === void 0 && (o = !!n.backgroundColor), o === !1 || o === null))
        return !1;
      if (o === !0) return "origin";
      if (((l = parseFloat(o, 10)), isFinite(l) && Math.floor(l) === l))
        return (
          (o[0] === "-" || o[0] === "+") && (l = t + l),
          l === t || l < 0 || l >= a ? !1 : l
        );
      switch (o) {
        case "bottom":
          return "start";
        case "top":
          return "end";
        case "zero":
          return "origin";
        case "origin":
        case "start":
        case "end":
          return o;
        default:
          return !1;
      }
    }
    function Ed(e) {
      var t = e.el._model || {},
        a = e.el._scale || {},
        n = e.fill,
        o = null,
        l;
      if (isFinite(n)) return null;
      if (
        (n === "start"
          ? (o = t.scaleBottom === void 0 ? a.bottom : t.scaleBottom)
          : n === "end"
          ? (o = t.scaleTop === void 0 ? a.top : t.scaleTop)
          : t.scaleZero !== void 0
          ? (o = t.scaleZero)
          : a.getBasePixel && (o = a.getBasePixel()),
        o != null)
      ) {
        if (o.x !== void 0 && o.y !== void 0) return o;
        if (b.isFinite(o))
          return (l = a.isHorizontal()), { x: l ? o : null, y: l ? null : o };
      }
      return null;
    }
    function Yd(e) {
      var t = e.el._scale,
        a = t.options,
        n = t.chart.data.labels.length,
        o = e.fill,
        l = [],
        u,
        h,
        f,
        v,
        g;
      if (!n) return null;
      for (
        u = a.ticks.reverse ? t.max : t.min,
          h = a.ticks.reverse ? t.min : t.max,
          f = t.getPointPositionForValue(0, u),
          v = 0;
        v < n;
        ++v
      )
        (g =
          o === "start" || o === "end"
            ? t.getPointPositionForValue(v, o === "start" ? u : h)
            : t.getBasePosition(v)),
          a.gridLines.circular &&
            ((g.cx = f.x),
            (g.cy = f.y),
            (g.angle = t.getIndexAngle(v) - Math.PI / 2)),
          l.push(g);
      return l;
    }
    function zd(e) {
      var t = e.el._scale || {};
      return t.getPointPositionForValue ? Yd(e) : Ed(e);
    }
    function Bd(e, t, a) {
      var n = e[t],
        o = n.fill,
        l = [t],
        u;
      if (!a) return o;
      for (; o !== !1 && l.indexOf(o) === -1; ) {
        if (!isFinite(o)) return o;
        if (((u = e[o]), !u)) return !1;
        if (u.visible) return o;
        l.push(o), (o = u.fill);
      }
      return !1;
    }
    function Hd(e) {
      var t = e.fill,
        a = "dataset";
      return t === !1 ? null : (isFinite(t) || (a = "boundary"), Ld[a](e));
    }
    function Oo(e) {
      return e && !e.skip;
    }
    function Po(e, t, a, n, o) {
      var l, u, h, f;
      if (!(!n || !o)) {
        for (e.moveTo(t[0].x, t[0].y), l = 1; l < n; ++l)
          b.canvas.lineTo(e, t[l - 1], t[l]);
        if (a[0].angle !== void 0) {
          for (
            u = a[0].cx,
              h = a[0].cy,
              f = Math.sqrt(Math.pow(a[0].x - u, 2) + Math.pow(a[0].y - h, 2)),
              l = o - 1;
            l > 0;
            --l
          )
            e.arc(u, h, f, a[l].angle, a[l - 1].angle, !0);
          return;
        }
        for (e.lineTo(a[o - 1].x, a[o - 1].y), l = o - 1; l > 0; --l)
          b.canvas.lineTo(e, a[l], a[l - 1], !0);
      }
    }
    function Vd(e, t, a, n, o, l) {
      var u = t.length,
        h = n.spanGaps,
        f = [],
        v = [],
        g = 0,
        m = 0,
        y,
        x,
        w,
        M,
        k,
        D,
        F,
        A;
      for (e.beginPath(), y = 0, x = u; y < x; ++y)
        (w = y % u),
          (M = t[w]._view),
          (k = a(M, w, n)),
          (D = Oo(M)),
          (F = Oo(k)),
          l && A === void 0 && D && ((A = y + 1), (x = u + A)),
          D && F
            ? ((g = f.push(M)), (m = v.push(k)))
            : g &&
              m &&
              (h
                ? (D && f.push(M), F && v.push(k))
                : (Po(e, f, v, g, m), (g = m = 0), (f = []), (v = [])));
      Po(e, f, v, g, m), e.closePath(), (e.fillStyle = o), e.fill();
    }
    var Ud = {
        id: "filler",
        afterDatasetsUpdate: function (e, t) {
          var a = (e.data.datasets || []).length,
            n = t.propagate,
            o = [],
            l,
            u,
            h,
            f;
          for (u = 0; u < a; ++u)
            (l = e.getDatasetMeta(u)),
              (h = l.dataset),
              (f = null),
              h &&
                h._model &&
                h instanceof we.Line &&
                (f = {
                  visible: e.isDatasetVisible(u),
                  fill: Wd(h, u, a),
                  chart: e,
                  el: h,
                }),
              (l.$filler = f),
              o.push(f);
          for (u = 0; u < a; ++u)
            (f = o[u]),
              f &&
                ((f.fill = Bd(o, u, n)),
                (f.boundary = zd(f)),
                (f.mapper = Hd(f)));
        },
        beforeDatasetsDraw: function (e) {
          var t = e._getSortedVisibleDatasetMetas(),
            a = e.ctx,
            n,
            o,
            l,
            u,
            h,
            f,
            v;
          for (o = t.length - 1; o >= 0; --o)
            (n = t[o].$filler),
              !(!n || !n.visible) &&
                ((l = n.el),
                (u = l._view),
                (h = l._children || []),
                (f = n.mapper),
                (v = u.backgroundColor || N.global.defaultColor),
                f &&
                  v &&
                  h.length &&
                  (b.canvas.clipArea(a, e.chartArea),
                  Vd(a, h, f, u, v, l._loop),
                  b.canvas.unclipArea(a)));
        },
      },
      jd = b.rtl.getRtlAdapter,
      pt = b.noop,
      bt = b.valueOrDefault;
    N._set("global", {
      legend: {
        display: !0,
        position: "top",
        align: "center",
        fullWidth: !0,
        reverse: !1,
        weight: 1e3,
        onClick: function (e, t) {
          var a = t.datasetIndex,
            n = this.chart,
            o = n.getDatasetMeta(a);
          (o.hidden = o.hidden === null ? !n.data.datasets[a].hidden : null),
            n.update();
        },
        onHover: null,
        onLeave: null,
        labels: {
          boxWidth: 40,
          padding: 10,
          generateLabels: function (e) {
            var t = e.data.datasets,
              a = e.options.legend || {},
              n = a.labels && a.labels.usePointStyle;
            return e._getSortedDatasetMetas().map(function (o) {
              var l = o.controller.getStyle(n ? 0 : void 0);
              return {
                text: t[o.index].label,
                fillStyle: l.backgroundColor,
                hidden: !e.isDatasetVisible(o.index),
                lineCap: l.borderCapStyle,
                lineDash: l.borderDash,
                lineDashOffset: l.borderDashOffset,
                lineJoin: l.borderJoinStyle,
                lineWidth: l.borderWidth,
                strokeStyle: l.borderColor,
                pointStyle: l.pointStyle,
                rotation: l.rotation,
                datasetIndex: o.index,
              };
            }, this);
          },
        },
      },
      legendCallback: function (e) {
        var t = document.createElement("ul"),
          a = e.data.datasets,
          n,
          o,
          l,
          u;
        for (
          t.setAttribute("class", e.id + "-legend"), n = 0, o = a.length;
          n < o;
          n++
        )
          (l = t.appendChild(document.createElement("li"))),
            (u = l.appendChild(document.createElement("span"))),
            (u.style.backgroundColor = a[n].backgroundColor),
            a[n].label && l.appendChild(document.createTextNode(a[n].label));
        return t.outerHTML;
      },
    });
    function Wn(e, t) {
      return e.usePointStyle && e.boxWidth > t ? t : e.boxWidth;
    }
    var Fo = je.extend({
      initialize: function (e) {
        var t = this;
        b.extend(t, e),
          (t.legendHitBoxes = []),
          (t._hoveredItem = null),
          (t.doughnutMode = !1);
      },
      beforeUpdate: pt,
      update: function (e, t, a) {
        var n = this;
        return (
          n.beforeUpdate(),
          (n.maxWidth = e),
          (n.maxHeight = t),
          (n.margins = a),
          n.beforeSetDimensions(),
          n.setDimensions(),
          n.afterSetDimensions(),
          n.beforeBuildLabels(),
          n.buildLabels(),
          n.afterBuildLabels(),
          n.beforeFit(),
          n.fit(),
          n.afterFit(),
          n.afterUpdate(),
          n.minSize
        );
      },
      afterUpdate: pt,
      beforeSetDimensions: pt,
      setDimensions: function () {
        var e = this;
        e.isHorizontal()
          ? ((e.width = e.maxWidth), (e.left = 0), (e.right = e.width))
          : ((e.height = e.maxHeight), (e.top = 0), (e.bottom = e.height)),
          (e.paddingLeft = 0),
          (e.paddingTop = 0),
          (e.paddingRight = 0),
          (e.paddingBottom = 0),
          (e.minSize = { width: 0, height: 0 });
      },
      afterSetDimensions: pt,
      beforeBuildLabels: pt,
      buildLabels: function () {
        var e = this,
          t = e.options.labels || {},
          a = b.callback(t.generateLabels, [e.chart], e) || [];
        t.filter &&
          (a = a.filter(function (n) {
            return t.filter(n, e.chart.data);
          })),
          e.options.reverse && a.reverse(),
          (e.legendItems = a);
      },
      afterBuildLabels: pt,
      beforeFit: pt,
      fit: function () {
        var e = this,
          t = e.options,
          a = t.labels,
          n = t.display,
          o = e.ctx,
          l = b.options._parseFont(a),
          u = l.size,
          h = (e.legendHitBoxes = []),
          f = e.minSize,
          v = e.isHorizontal();
        if (
          (v
            ? ((f.width = e.maxWidth), (f.height = n ? 10 : 0))
            : ((f.width = n ? 10 : 0), (f.height = e.maxHeight)),
          !n)
        ) {
          e.width = f.width = e.height = f.height = 0;
          return;
        }
        if (((o.font = l.string), v)) {
          var g = (e.lineWidths = [0]),
            m = 0;
          (o.textAlign = "left"),
            (o.textBaseline = "middle"),
            b.each(e.legendItems, function (F, A) {
              var E = Wn(a, u),
                W = E + u / 2 + o.measureText(F.text).width;
              (A === 0 || g[g.length - 1] + W + 2 * a.padding > f.width) &&
                ((m += u + a.padding), (g[g.length - (A > 0 ? 0 : 1)] = 0)),
                (h[A] = { left: 0, top: 0, width: W, height: u }),
                (g[g.length - 1] += W + a.padding);
            }),
            (f.height += m);
        } else {
          var y = a.padding,
            x = (e.columnWidths = []),
            w = (e.columnHeights = []),
            M = a.padding,
            k = 0,
            D = 0;
          b.each(e.legendItems, function (F, A) {
            var E = Wn(a, u),
              W = E + u / 2 + o.measureText(F.text).width;
            A > 0 &&
              D + u + 2 * y > f.height &&
              ((M += k + a.padding), x.push(k), w.push(D), (k = 0), (D = 0)),
              (k = Math.max(k, W)),
              (D += u + y),
              (h[A] = { left: 0, top: 0, width: W, height: u });
          }),
            (M += k),
            x.push(k),
            w.push(D),
            (f.width += M);
        }
        (e.width = f.width), (e.height = f.height);
      },
      afterFit: pt,
      isHorizontal: function () {
        return (
          this.options.position === "top" || this.options.position === "bottom"
        );
      },
      draw: function () {
        var e = this,
          t = e.options,
          a = t.labels,
          n = N.global,
          o = n.defaultColor,
          l = n.elements.line,
          u = e.height,
          h = e.columnHeights,
          f = e.width,
          v = e.lineWidths;
        if (!!t.display) {
          var g = jd(t.rtl, e.left, e.minSize.width),
            m = e.ctx,
            y = bt(a.fontColor, n.defaultFontColor),
            x = b.options._parseFont(a),
            w = x.size,
            M;
          (m.textAlign = g.textAlign("left")),
            (m.textBaseline = "middle"),
            (m.lineWidth = 0.5),
            (m.strokeStyle = y),
            (m.fillStyle = y),
            (m.font = x.string);
          var k = Wn(a, w),
            D = e.legendHitBoxes,
            F = function (j, K, ee) {
              if (!(isNaN(k) || k <= 0)) {
                m.save();
                var ue = bt(ee.lineWidth, l.borderWidth);
                if (
                  ((m.fillStyle = bt(ee.fillStyle, o)),
                  (m.lineCap = bt(ee.lineCap, l.borderCapStyle)),
                  (m.lineDashOffset = bt(
                    ee.lineDashOffset,
                    l.borderDashOffset
                  )),
                  (m.lineJoin = bt(ee.lineJoin, l.borderJoinStyle)),
                  (m.lineWidth = ue),
                  (m.strokeStyle = bt(ee.strokeStyle, o)),
                  m.setLineDash && m.setLineDash(bt(ee.lineDash, l.borderDash)),
                  a && a.usePointStyle)
                ) {
                  var se = (k * Math.SQRT2) / 2,
                    oe = g.xPlus(j, k / 2),
                    fe = K + w / 2;
                  b.canvas.drawPoint(m, ee.pointStyle, se, oe, fe, ee.rotation);
                } else
                  m.fillRect(g.leftForLtr(j, k), K, k, w),
                    ue !== 0 && m.strokeRect(g.leftForLtr(j, k), K, k, w);
                m.restore();
              }
            },
            A = function (j, K, ee, ue) {
              var se = w / 2,
                oe = g.xPlus(j, k + se),
                fe = K + se;
              m.fillText(ee.text, oe, fe),
                ee.hidden &&
                  (m.beginPath(),
                  (m.lineWidth = 2),
                  m.moveTo(oe, fe),
                  m.lineTo(g.xPlus(oe, ue), fe),
                  m.stroke());
            },
            E = function (j, K) {
              switch (t.align) {
                case "start":
                  return a.padding;
                case "end":
                  return j - K;
                default:
                  return (j - K + a.padding) / 2;
              }
            },
            W = e.isHorizontal();
          W
            ? (M = { x: e.left + E(f, v[0]), y: e.top + a.padding, line: 0 })
            : (M = { x: e.left + a.padding, y: e.top + E(u, h[0]), line: 0 }),
            b.rtl.overrideTextDirection(e.ctx, t.textDirection);
          var G = w + a.padding;
          b.each(e.legendItems, function (j, K) {
            var ee = m.measureText(j.text).width,
              ue = k + w / 2 + ee,
              se = M.x,
              oe = M.y;
            g.setWidth(e.minSize.width),
              W
                ? K > 0 &&
                  se + ue + a.padding > e.left + e.minSize.width &&
                  ((oe = M.y += G),
                  M.line++,
                  (se = M.x = e.left + E(f, v[M.line])))
                : K > 0 &&
                  oe + G > e.top + e.minSize.height &&
                  ((se = M.x = se + e.columnWidths[M.line] + a.padding),
                  M.line++,
                  (oe = M.y = e.top + E(u, h[M.line])));
            var fe = g.x(se);
            F(fe, oe, j),
              (D[K].left = g.leftForLtr(fe, D[K].width)),
              (D[K].top = oe),
              A(fe, oe, j, ee),
              W ? (M.x += ue + a.padding) : (M.y += G);
          }),
            b.rtl.restoreTextDirection(e.ctx, t.textDirection);
        }
      },
      _getLegendItemAt: function (e, t) {
        var a = this,
          n,
          o,
          l;
        if (e >= a.left && e <= a.right && t >= a.top && t <= a.bottom) {
          for (l = a.legendHitBoxes, n = 0; n < l.length; ++n)
            if (
              ((o = l[n]),
              e >= o.left &&
                e <= o.left + o.width &&
                t >= o.top &&
                t <= o.top + o.height)
            )
              return a.legendItems[n];
        }
        return null;
      },
      handleEvent: function (e) {
        var t = this,
          a = t.options,
          n = e.type === "mouseup" ? "click" : e.type,
          o;
        if (n === "mousemove") {
          if (!a.onHover && !a.onLeave) return;
        } else if (n === "click") {
          if (!a.onClick) return;
        } else return;
        (o = t._getLegendItemAt(e.x, e.y)),
          n === "click"
            ? o && a.onClick && a.onClick.call(t, e.native, o)
            : (a.onLeave &&
                o !== t._hoveredItem &&
                (t._hoveredItem && a.onLeave.call(t, e.native, t._hoveredItem),
                (t._hoveredItem = o)),
              a.onHover && o && a.onHover.call(t, e.native, o));
      },
    });
    function Io(e, t) {
      var a = new Fo({ ctx: e.ctx, options: t, chart: e });
      Ne.configure(e, a, t), Ne.addBox(e, a), (e.legend = a);
    }
    var $d = {
        id: "legend",
        _element: Fo,
        beforeInit: function (e) {
          var t = e.options.legend;
          t && Io(e, t);
        },
        beforeUpdate: function (e) {
          var t = e.options.legend,
            a = e.legend;
          t
            ? (b.mergeIf(t, N.global.legend),
              a ? (Ne.configure(e, a, t), (a.options = t)) : Io(e, t))
            : a && (Ne.removeBox(e, a), delete e.legend);
        },
        afterEvent: function (e, t) {
          var a = e.legend;
          a && a.handleEvent(t);
        },
      },
      it = b.noop;
    N._set("global", {
      title: {
        display: !1,
        fontStyle: "bold",
        fullWidth: !0,
        padding: 10,
        position: "top",
        text: "",
        weight: 2e3,
      },
    });
    var Ao = je.extend({
      initialize: function (e) {
        var t = this;
        b.extend(t, e), (t.legendHitBoxes = []);
      },
      beforeUpdate: it,
      update: function (e, t, a) {
        var n = this;
        return (
          n.beforeUpdate(),
          (n.maxWidth = e),
          (n.maxHeight = t),
          (n.margins = a),
          n.beforeSetDimensions(),
          n.setDimensions(),
          n.afterSetDimensions(),
          n.beforeBuildLabels(),
          n.buildLabels(),
          n.afterBuildLabels(),
          n.beforeFit(),
          n.fit(),
          n.afterFit(),
          n.afterUpdate(),
          n.minSize
        );
      },
      afterUpdate: it,
      beforeSetDimensions: it,
      setDimensions: function () {
        var e = this;
        e.isHorizontal()
          ? ((e.width = e.maxWidth), (e.left = 0), (e.right = e.width))
          : ((e.height = e.maxHeight), (e.top = 0), (e.bottom = e.height)),
          (e.paddingLeft = 0),
          (e.paddingTop = 0),
          (e.paddingRight = 0),
          (e.paddingBottom = 0),
          (e.minSize = { width: 0, height: 0 });
      },
      afterSetDimensions: it,
      beforeBuildLabels: it,
      buildLabels: it,
      afterBuildLabels: it,
      beforeFit: it,
      fit: function () {
        var e = this,
          t = e.options,
          a = (e.minSize = {}),
          n = e.isHorizontal(),
          o,
          l;
        if (!t.display) {
          e.width = a.width = e.height = a.height = 0;
          return;
        }
        (o = b.isArray(t.text) ? t.text.length : 1),
          (l = o * b.options._parseFont(t).lineHeight + t.padding * 2),
          (e.width = a.width = n ? e.maxWidth : l),
          (e.height = a.height = n ? l : e.maxHeight);
      },
      afterFit: it,
      isHorizontal: function () {
        var e = this.options.position;
        return e === "top" || e === "bottom";
      },
      draw: function () {
        var e = this,
          t = e.ctx,
          a = e.options;
        if (!!a.display) {
          var n = b.options._parseFont(a),
            o = n.lineHeight,
            l = o / 2 + a.padding,
            u = 0,
            h = e.top,
            f = e.left,
            v = e.bottom,
            g = e.right,
            m,
            y,
            x;
          (t.fillStyle = b.valueOrDefault(
            a.fontColor,
            N.global.defaultFontColor
          )),
            (t.font = n.string),
            e.isHorizontal()
              ? ((y = f + (g - f) / 2), (x = h + l), (m = g - f))
              : ((y = a.position === "left" ? f + l : g - l),
                (x = h + (v - h) / 2),
                (m = v - h),
                (u = Math.PI * (a.position === "left" ? -0.5 : 0.5))),
            t.save(),
            t.translate(y, x),
            t.rotate(u),
            (t.textAlign = "center"),
            (t.textBaseline = "middle");
          var w = a.text;
          if (b.isArray(w))
            for (var M = 0, k = 0; k < w.length; ++k)
              t.fillText(w[k], 0, M, m), (M += o);
          else t.fillText(w, 0, 0, m);
          t.restore();
        }
      },
    });
    function No(e, t) {
      var a = new Ao({ ctx: e.ctx, options: t, chart: e });
      Ne.configure(e, a, t), Ne.addBox(e, a), (e.titleBlock = a);
    }
    var Gd = {
        id: "title",
        _element: Ao,
        beforeInit: function (e) {
          var t = e.options.title;
          t && No(e, t);
        },
        beforeUpdate: function (e) {
          var t = e.options.title,
            a = e.titleBlock;
          t
            ? (b.mergeIf(t, N.global.title),
              a ? (Ne.configure(e, a, t), (a.options = t)) : No(e, t))
            : a && (Ne.removeBox(e, a), delete e.titleBlock);
        },
      },
      yt = {},
      qd = Ud,
      Xd = $d,
      Zd = Gd;
    (yt.filler = qd),
      (yt.legend = Xd),
      (yt.title = Zd),
      (B.helpers = b),
      Uu(),
      (B._adapters = Sn),
      (B.Animation = sn),
      (B.animationService = ln),
      (B.controllers = Qi),
      (B.DatasetController = Ae),
      (B.defaults = N),
      (B.Element = je),
      (B.elements = we),
      (B.Interaction = Qt),
      (B.layouts = Ne),
      (B.platform = Jt),
      (B.plugins = J),
      (B.Scale = Me),
      (B.scaleService = Cr),
      (B.Ticks = Or),
      (B.Tooltip = wn),
      B.helpers.each(Nd, function (e, t) {
        B.scaleService.registerScaleType(t, e, e._defaults);
      });
    for (var Ro in yt) yt.hasOwnProperty(Ro) && B.plugins.register(yt[Ro]);
    B.platform.initialize();
    var Kd = B;
    return (
      typeof window < "u" && (window.Chart = B),
      (B.Chart = B),
      (B.Legend = yt.legend._element),
      (B.Title = yt.title._element),
      (B.pluginService = B.plugins),
      (B.PluginBase = B.Element.extend({})),
      (B.canvasHelpers = B.helpers.canvas),
      (B.layoutService = B.layouts),
      (B.LinearScaleBase = ua),
      B.helpers.each(
        ["Bar", "Bubble", "Doughnut", "Line", "PolarArea", "Radar", "Scatter"],
        function (e) {
          B[e] = function (t, a) {
            return new B(
              t,
              B.helpers.merge(a || {}, {
                type: e.charAt(0).toLowerCase() + e.slice(1),
              })
            );
          };
        }
      ),
      Kd
    );
  });
})(us);
const Go = us.exports;
function Vm(r, i) {
  const s = Object.create(null),
    d = r.split(",");
  for (let c = 0; c < d.length; c++) s[d[c]] = !0;
  return i ? (c) => !!s[c.toLowerCase()] : (c) => !!s[c];
}
function wi(r) {
  if (_e(r)) {
    const i = {};
    for (let s = 0; s < r.length; s++) {
      const d = r[s],
        c = Dt(d) ? Gm(d) : wi(d);
      if (c) for (const p in c) i[p] = c[p];
    }
    return i;
  } else {
    if (Dt(r)) return r;
    if (ct(r)) return r;
  }
}
const Um = /;(?![^(]*\))/g,
  jm = /:([^]+)/,
  $m = /\/\*.*?\*\//gs;
function Gm(r) {
  const i = {};
  return (
    r
      .replace($m, "")
      .split(Um)
      .forEach((s) => {
        if (s) {
          const d = s.split(jm);
          d.length > 1 && (i[d[0].trim()] = d[1].trim());
        }
      }),
    i
  );
}
function Mi(r) {
  let i = "";
  if (Dt(r)) i = r;
  else if (_e(r))
    for (let s = 0; s < r.length; s++) {
      const d = Mi(r[s]);
      d && (i += d + " ");
    }
  else if (ct(r)) for (const s in r) r[s] && (i += s + " ");
  return i.trim();
}
const qm = () => !1,
  Xm = /^on[^a-z]/,
  Zm = (r) => Xm.test(r),
  tl = Object.assign,
  Km = Object.prototype.hasOwnProperty,
  en = (r, i) => Km.call(r, i),
  _e = Array.isArray,
  Oa = (r) => rl(r) === "[object Map]",
  qr = (r) => typeof r == "function",
  Dt = (r) => typeof r == "string",
  ki = (r) => typeof r == "symbol",
  ct = (r) => r !== null && typeof r == "object",
  Qm = Object.prototype.toString,
  rl = (r) => Qm.call(r),
  Jm = (r) => rl(r).slice(8, -1),
  Si = (r) =>
    Dt(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r,
  al = (r, i) => !Object.is(r, i),
  nl = (r) => {
    const i = new Set(r);
    return (i.w = 0), (i.n = 0), i;
  },
  e0 = (r) => (r.w & Di) > 0,
  t0 = (r) => (r.n & Di) > 0,
  Qn = new WeakMap();
let Di = 1,
  Ya;
const $t = Symbol(""),
  Jn = Symbol("");
let za = !0;
const il = [];
function r0() {
  il.push(za), (za = !1);
}
function a0() {
  const r = il.pop();
  za = r === void 0 ? !0 : r;
}
function Le(r, i, s) {
  if (za && Ya) {
    let d = Qn.get(r);
    d || Qn.set(r, (d = new Map()));
    let c = d.get(s);
    c || d.set(s, (c = nl())), n0(c);
  }
}
function n0(r, i) {
  let s = !1;
  t0(r) || ((r.n |= Di), (s = !e0(r))), s && (r.add(Ya), Ya.deps.push(r));
}
function Tt(r, i, s, d, c, p) {
  const _ = Qn.get(r);
  if (!_) return;
  let S = [];
  if (i === "clear") S = [..._.values()];
  else if (s === "length" && _e(r)) {
    const T = Number(d);
    _.forEach((P, L) => {
      (L === "length" || L >= T) && S.push(P);
    });
  } else
    switch ((s !== void 0 && S.push(_.get(s)), i)) {
      case "add":
        _e(r)
          ? Si(s) && S.push(_.get("length"))
          : (S.push(_.get($t)), Oa(r) && S.push(_.get(Jn)));
        break;
      case "delete":
        _e(r) || (S.push(_.get($t)), Oa(r) && S.push(_.get(Jn)));
        break;
      case "set":
        Oa(r) && S.push(_.get($t));
        break;
    }
  if (S.length === 1) S[0] && qo(S[0]);
  else {
    const T = [];
    for (const P of S) P && T.push(...P);
    qo(nl(T));
  }
}
function qo(r, i) {
  const s = _e(r) ? r : [...r];
  for (const d of s) d.computed && Xo(d);
  for (const d of s) d.computed || Xo(d);
}
function Xo(r, i) {
  (r !== Ya || r.allowRecurse) && (r.scheduler ? r.scheduler() : r.run());
}
const i0 = Vm("__proto__,__v_isRef,__isVue"),
  ol = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((r) => r !== "arguments" && r !== "caller")
      .map((r) => Symbol[r])
      .filter(ki)
  ),
  o0 = sl(),
  s0 = sl(!0),
  Zo = l0();
function l0() {
  const r = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((i) => {
      r[i] = function (...s) {
        const d = ne(this);
        for (let p = 0, _ = this.length; p < _; p++) Le(d, "get", p + "");
        const c = d[i](...s);
        return c === -1 || c === !1 ? d[i](...s.map(ne)) : c;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((i) => {
      r[i] = function (...s) {
        r0();
        const d = ne(this)[i].apply(this, s);
        return a0(), d;
      };
    }),
    r
  );
}
function u0(r) {
  const i = ne(this);
  return Le(i, "has", r), i.hasOwnProperty(r);
}
function sl(r = !1, i = !1) {
  return function (d, c, p) {
    if (c === "__v_isReactive") return !r;
    if (c === "__v_isReadonly") return r;
    if (c === "__v_isShallow") return i;
    if (c === "__v_raw" && p === (r ? (i ? S0 : dl) : i ? k0 : ul).get(d))
      return d;
    const _ = _e(d);
    if (!r) {
      if (_ && en(Zo, c)) return Reflect.get(Zo, c, p);
      if (c === "hasOwnProperty") return u0;
    }
    const S = Reflect.get(d, c, p);
    return (ki(c) ? ol.has(c) : i0(c)) || (r || Le(d, "get", c), i)
      ? S
      : dr(S)
      ? _ && Si(c)
        ? S
        : S.value
      : ct(S)
      ? r
        ? fl(S)
        : Ci(S)
      : S;
  };
}
const d0 = f0();
function f0(r = !1) {
  return function (s, d, c, p) {
    let _ = s[d];
    if (Vr(_) && dr(_) && !dr(c)) return !1;
    if (
      !r &&
      (!C0(c) && !Vr(c) && ((_ = ne(_)), (c = ne(c))),
      !_e(s) && dr(_) && !dr(c))
    )
      return (_.value = c), !0;
    const S = _e(s) && Si(d) ? Number(d) < s.length : en(s, d),
      T = Reflect.set(s, d, c, p);
    return (
      s === ne(p) && (S ? al(c, _) && Tt(s, "set", d, c) : Tt(s, "add", d, c)),
      T
    );
  };
}
function c0(r, i) {
  const s = en(r, i);
  r[i];
  const d = Reflect.deleteProperty(r, i);
  return d && s && Tt(r, "delete", i, void 0), d;
}
function h0(r, i) {
  const s = Reflect.has(r, i);
  return (!ki(i) || !ol.has(i)) && Le(r, "has", i), s;
}
function v0(r) {
  return Le(r, "iterate", _e(r) ? "length" : $t), Reflect.ownKeys(r);
}
const g0 = { get: o0, set: d0, deleteProperty: c0, has: h0, ownKeys: v0 },
  m0 = {
    get: s0,
    set(r, i) {
      return !0;
    },
    deleteProperty(r, i) {
      return !0;
    },
  },
  Ti = (r) => r,
  tn = (r) => Reflect.getPrototypeOf(r);
function ya(r, i, s = !1, d = !1) {
  r = r.__v_raw;
  const c = ne(r),
    p = ne(i);
  s || (i !== p && Le(c, "get", i), Le(c, "get", p));
  const { has: _ } = tn(c),
    S = d ? Ti : s ? Pi : Oi;
  if (_.call(c, i)) return S(r.get(i));
  if (_.call(c, p)) return S(r.get(p));
  r !== c && r.get(i);
}
function _a(r, i = !1) {
  const s = this.__v_raw,
    d = ne(s),
    c = ne(r);
  return (
    i || (r !== c && Le(d, "has", r), Le(d, "has", c)),
    r === c ? s.has(r) : s.has(r) || s.has(c)
  );
}
function xa(r, i = !1) {
  return (
    (r = r.__v_raw), !i && Le(ne(r), "iterate", $t), Reflect.get(r, "size", r)
  );
}
function Ko(r) {
  r = ne(r);
  const i = ne(this);
  return tn(i).has.call(i, r) || (i.add(r), Tt(i, "add", r, r)), this;
}
function Qo(r, i) {
  i = ne(i);
  const s = ne(this),
    { has: d, get: c } = tn(s);
  let p = d.call(s, r);
  p || ((r = ne(r)), (p = d.call(s, r)));
  const _ = c.call(s, r);
  return (
    s.set(r, i), p ? al(i, _) && Tt(s, "set", r, i) : Tt(s, "add", r, i), this
  );
}
function Jo(r) {
  const i = ne(this),
    { has: s, get: d } = tn(i);
  let c = s.call(i, r);
  c || ((r = ne(r)), (c = s.call(i, r))), d && d.call(i, r);
  const p = i.delete(r);
  return c && Tt(i, "delete", r, void 0), p;
}
function es() {
  const r = ne(this),
    i = r.size !== 0,
    s = r.clear();
  return i && Tt(r, "clear", void 0, void 0), s;
}
function wa(r, i) {
  return function (d, c) {
    const p = this,
      _ = p.__v_raw,
      S = ne(_),
      T = i ? Ti : r ? Pi : Oi;
    return (
      !r && Le(S, "iterate", $t), _.forEach((P, L) => d.call(c, T(P), T(L), p))
    );
  };
}
function Ma(r, i, s) {
  return function (...d) {
    const c = this.__v_raw,
      p = ne(c),
      _ = Oa(p),
      S = r === "entries" || (r === Symbol.iterator && _),
      T = r === "keys" && _,
      P = c[r](...d),
      L = s ? Ti : i ? Pi : Oi;
    return (
      !i && Le(p, "iterate", T ? Jn : $t),
      {
        next() {
          const { value: Y, done: V } = P.next();
          return V
            ? { value: Y, done: V }
            : { value: S ? [L(Y[0]), L(Y[1])] : L(Y), done: V };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function xt(r) {
  return function (...i) {
    return r === "delete" ? !1 : this;
  };
}
function p0() {
  const r = {
      get(p) {
        return ya(this, p);
      },
      get size() {
        return xa(this);
      },
      has: _a,
      add: Ko,
      set: Qo,
      delete: Jo,
      clear: es,
      forEach: wa(!1, !1),
    },
    i = {
      get(p) {
        return ya(this, p, !1, !0);
      },
      get size() {
        return xa(this);
      },
      has: _a,
      add: Ko,
      set: Qo,
      delete: Jo,
      clear: es,
      forEach: wa(!1, !0),
    },
    s = {
      get(p) {
        return ya(this, p, !0);
      },
      get size() {
        return xa(this, !0);
      },
      has(p) {
        return _a.call(this, p, !0);
      },
      add: xt("add"),
      set: xt("set"),
      delete: xt("delete"),
      clear: xt("clear"),
      forEach: wa(!0, !1),
    },
    d = {
      get(p) {
        return ya(this, p, !0, !0);
      },
      get size() {
        return xa(this, !0);
      },
      has(p) {
        return _a.call(this, p, !0);
      },
      add: xt("add"),
      set: xt("set"),
      delete: xt("delete"),
      clear: xt("clear"),
      forEach: wa(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((p) => {
      (r[p] = Ma(p, !1, !1)),
        (s[p] = Ma(p, !0, !1)),
        (i[p] = Ma(p, !1, !0)),
        (d[p] = Ma(p, !0, !0));
    }),
    [r, s, i, d]
  );
}
const [b0, y0, _0, x0] = p0();
function ll(r, i) {
  const s = i ? (r ? x0 : _0) : r ? y0 : b0;
  return (d, c, p) =>
    c === "__v_isReactive"
      ? !r
      : c === "__v_isReadonly"
      ? r
      : c === "__v_raw"
      ? d
      : Reflect.get(en(s, c) && c in d ? s : d, c, p);
}
const w0 = { get: ll(!1, !1) },
  M0 = { get: ll(!0, !1) },
  ul = new WeakMap(),
  k0 = new WeakMap(),
  dl = new WeakMap(),
  S0 = new WeakMap();
function D0(r) {
  switch (r) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function T0(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : D0(Jm(r));
}
function Ci(r) {
  return Vr(r) ? r : cl(r, !1, g0, w0, ul);
}
function fl(r) {
  return cl(r, !0, m0, M0, dl);
}
function cl(r, i, s, d, c) {
  if (!ct(r) || (r.__v_raw && !(i && r.__v_isReactive))) return r;
  const p = c.get(r);
  if (p) return p;
  const _ = T0(r);
  if (_ === 0) return r;
  const S = new Proxy(r, _ === 2 ? d : s);
  return c.set(r, S), S;
}
function hl(r) {
  return Vr(r) ? hl(r.__v_raw) : !!(r && r.__v_isReactive);
}
function Vr(r) {
  return !!(r && r.__v_isReadonly);
}
function C0(r) {
  return !!(r && r.__v_isShallow);
}
function vl(r) {
  return hl(r) || Vr(r);
}
function ne(r) {
  const i = r && r.__v_raw;
  return i ? ne(i) : r;
}
const Oi = (r) => (ct(r) ? Ci(r) : r),
  Pi = (r) => (ct(r) ? fl(r) : r);
function dr(r) {
  return !!(r && r.__v_isRef === !0);
}
let fr = null,
  O0 = null;
const P0 = (r) => r.__isSuspense;
function F0(r) {
  return qr(r) ? { setup: r, name: r.name } : r;
}
const I0 = Symbol();
function A0() {
  return {
    app: null,
    config: {
      isNativeTag: qm,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
const N0 = (r) => r.__isTeleport,
  gl = Symbol(void 0),
  R0 = Symbol(void 0),
  L0 = Symbol(void 0);
let cr = null;
function ei(r) {
  return r ? r.__v_isVNode === !0 : !1;
}
const ml = "__vInternal",
  pl = ({ key: r }) => (r != null ? r : null),
  Pa = ({ ref: r, ref_key: i, ref_for: s }) =>
    r != null
      ? Dt(r) || dr(r) || qr(r)
        ? { i: fr, r, k: i, f: !!s }
        : r
      : null;
function W0(
  r,
  i = null,
  s = null,
  d = 0,
  c = null,
  p = r === gl ? 0 : 1,
  _ = !1,
  S = !1
) {
  const T = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: r,
    props: i,
    key: i && pl(i),
    ref: i && Pa(i),
    scopeId: O0,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: p,
    patchFlag: d,
    dynamicProps: c,
    dynamicChildren: null,
    appContext: null,
    ctx: fr,
  };
  return (
    S
      ? (Fi(T, s), p & 128 && r.normalize(T))
      : s && (T.shapeFlag |= Dt(s) ? 8 : 16),
    !_ && cr && (T.patchFlag > 0 || p & 6) && T.patchFlag !== 32 && cr.push(T),
    T
  );
}
const Wr = E0;
function E0(r, i = null, s = null, d = 0, c = null, p = !1) {
  if (((!r || r === I0) && (r = L0), ei(r))) {
    const S = ti(r, i, !0);
    return (
      s && Fi(S, s),
      !p && cr && (S.shapeFlag & 6 ? (cr[cr.indexOf(r)] = S) : cr.push(S)),
      (S.patchFlag |= -2),
      S
    );
  }
  if ((H0(r) && (r = r.__vccOpts), i)) {
    i = Y0(i);
    let { class: S, style: T } = i;
    S && !Dt(S) && (i.class = Mi(S)),
      ct(T) && (vl(T) && !_e(T) && (T = tl({}, T)), (i.style = wi(T)));
  }
  const _ = Dt(r) ? 1 : P0(r) ? 128 : N0(r) ? 64 : ct(r) ? 4 : qr(r) ? 2 : 0;
  return W0(r, i, s, d, c, _, p, !0);
}
function Y0(r) {
  return r ? (vl(r) || ml in r ? tl({}, r) : r) : null;
}
function ti(r, i, s = !1) {
  const { props: d, ref: c, patchFlag: p, children: _ } = r,
    S = i ? B0(d || {}, i) : d;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: r.type,
    props: S,
    key: S && pl(S),
    ref:
      i && i.ref
        ? s && c
          ? _e(c)
            ? c.concat(Pa(i))
            : [c, Pa(i)]
          : Pa(i)
        : c,
    scopeId: r.scopeId,
    slotScopeIds: r.slotScopeIds,
    children: _,
    target: r.target,
    targetAnchor: r.targetAnchor,
    staticCount: r.staticCount,
    shapeFlag: r.shapeFlag,
    patchFlag: i && r.type !== gl ? (p === -1 ? 16 : p | 16) : p,
    dynamicProps: r.dynamicProps,
    dynamicChildren: r.dynamicChildren,
    appContext: r.appContext,
    dirs: r.dirs,
    transition: r.transition,
    component: r.component,
    suspense: r.suspense,
    ssContent: r.ssContent && ti(r.ssContent),
    ssFallback: r.ssFallback && ti(r.ssFallback),
    el: r.el,
    anchor: r.anchor,
    ctx: r.ctx,
    ce: r.ce,
  };
}
function z0(r = " ", i = 0) {
  return Wr(R0, null, r, i);
}
function Fi(r, i) {
  let s = 0;
  const { shapeFlag: d } = r;
  if (i == null) i = null;
  else if (_e(i)) s = 16;
  else if (typeof i == "object")
    if (d & 65) {
      const c = i.default;
      c && (c._c && (c._d = !1), Fi(r, c()), c._c && (c._d = !0));
      return;
    } else {
      s = 32;
      const c = i._;
      !c && !(ml in i)
        ? (i._ctx = fr)
        : c === 3 &&
          fr &&
          (fr.slots._ === 1 ? (i._ = 1) : ((i._ = 2), (r.patchFlag |= 1024)));
    }
  else
    qr(i)
      ? ((i = { default: i, _ctx: fr }), (s = 32))
      : ((i = String(i)), d & 64 ? ((s = 16), (i = [z0(i)])) : (s = 8));
  (r.children = i), (r.shapeFlag |= s);
}
function B0(...r) {
  const i = {};
  for (let s = 0; s < r.length; s++) {
    const d = r[s];
    for (const c in d)
      if (c === "class")
        i.class !== d.class && (i.class = Mi([i.class, d.class]));
      else if (c === "style") i.style = wi([i.style, d.style]);
      else if (Zm(c)) {
        const p = i[c],
          _ = d[c];
        _ &&
          p !== _ &&
          !(_e(p) && p.includes(_)) &&
          (i[c] = p ? [].concat(p, _) : _);
      } else c !== "" && (i[c] = d[c]);
  }
  return i;
}
A0();
function H0(r) {
  return qr(r) && "__vccOpts" in r;
}
function ts(r, i, s) {
  const d = arguments.length;
  return d === 2
    ? ct(i) && !_e(i)
      ? ei(i)
        ? Wr(r, null, [i])
        : Wr(r, i)
      : Wr(r, null, i)
    : (d > 3
        ? (s = Array.prototype.slice.call(arguments, 2))
        : d === 3 && ei(s) && (s = [s]),
      Wr(r, i, s));
}
function V0() {
  const r = Ci({ myName: "", userData: {}, userOptions: {} });
  function i(d) {
    r.userData = d;
  }
  function s(d) {
    r.userOptions = d;
  }
  return { state: r, setChartData: i, setChartOption: s };
}
function gt(r, i) {
  let { state: s, setChartData: d, setChartOption: c } = V0();
  return F0({
    name: "BaseChart",
    props: {
      chartId: { type: String, required: !1 },
      chartType: { type: String, required: !1 },
      width: { type: Number, required: !1, default: 400 },
      height: { type: Number, required: !1, default: 400 },
      cssClasses: { type: String, required: !1, default: "" },
      styles: { type: Object, required: !1 },
    },
    data() {
      return { state: { chartObj: null } };
    },
    beforeUnmount() {
      this.state.chartObj && this.state.chartObj.destroy();
    },
    methods: {
      renderChart(p, _) {
        d(p),
          c(_),
          this.state.chartObj,
          this.state.chartObj != null &&
            this.state.chartObj.data != null &&
            this.state.chartObj.data.datasets.pop();
        let S = this.$refs.canvas.getContext("2d");
        this.state.chartObj = new Go(S, { type: i, data: p, options: _ });
      },
    },
    beforeMount() {
      if (document.getElementById(r)) {
        let p = document.getElementById(r).getContext("2d");
        this.state.chartObj = new Go(p, {
          type: i,
          data: {
            datasets: [
              {
                data: [1, 2, 3, 4],
                backgroundColor: ["Red", "Yellow", "Blue", "Green"],
              },
            ],
            labels: ["Red", "Yellow", "Blue", "Green"],
          },
          options: { responsive: !1 },
        });
      }
    },
    computed: {
      currentChartData() {
        return s.userData;
      },
      currentChartOption() {
        return s.userOptions;
      },
    },
    watch: {
      chartData(p, _) {
        p !== _ && this.renderChart(_, this.currentChartOption);
      },
    },
    render() {
      return ts("div", { style: this.styles, class: this.cssClasses }, [
        ts("canvas", {
          ref: "canvas",
          id: this.chartId,
          width: this.width,
          height: this.height,
        }),
      ]);
    },
  });
}
gt("bar-chart", "bar");
gt("bubble-chart", "bubble");
gt("doughnut-chart", "doughnut");
gt("horizontalbar-chart", "horizontalBar");
const U0 = gt("line-chart", "line");
gt("pie-chart", "pie");
gt("polar-chart", "polarArea");
gt("radar-chart", "radar");
gt("scatter-chart", "scatter");
const j0 = {
    components: { Line: U0 },
    props: {
      chartData: { type: Object, required: !0 },
      options: { type: Object, required: !0 },
    },
  },
  $0 = ["chart-data", "options"];
function G0(r, i, s, d, c, p) {
  return (
    or(),
    sr("div", null, [
      he(
        "line",
        { "chart-data": s.chartData, options: s.options },
        null,
        8,
        $0
      ),
    ])
  );
}
const q0 = rs(j0, [["render", G0]]),
  X0 = {
    components: { WeightLineGraph: q0 },
    data() {
      return {
        clientWeights: [],
        newWeight: "",
        newWeighDate: "",
        clientName: "",
        clientBirthDay: "",
        loading: !0,
        chartData: null,
        defaultChartData: { labels: [], datasets: [{ data: [] }] },
        options: { responsive: !0, maintainAspectRatio: !1 },
      };
    },
    async mounted() {
      await this.getClient(), await this.getWeights(), (this.loading = !1);
    },
    methods: {
      newDate(r) {
        return Mc(Sc(r), "MMM dd, yyyy");
      },
      getClient() {
        va.get(
          `https://better-together-f87fbab820d6.herokuapp.com/clients/${this.$route.params.clientId}`
        ).then((r) => {
          (this.clientName = r.data[0].client_name),
            (this.clientBirthDay = tf(r.data[0].birth_day));
        });
      },
      deleteWeight(r) {
        console.log("delete"),
          console.log(r),
          va
            .delete(
              `https://better-together-f87fbab820d6.herokuapp.com/clients_weights/${r}`
            )
            .then((i) => {
              this.getWeights();
            });
      },
      addWeight() {
        const r = { weight: this.newWeight };
        va.post(
          `https://better-together-f87fbab820d6.herokuapp.com/clients_weights/${this.$route.params.clientId}`,
          r
        ).then((i) => {
          this.getWeights(), (this.newWeight = "");
        });
      },
      getWeights() {
        va.get(
          `https://better-together-f87fbab820d6.herokuapp.com/clients_weights/${this.$route.params.clientId}`
        ).then((r) => {
          this.clientWeights = r.data;
          const i = {
            labels: r.data.map((s) => s.date),
            datasets: [
              {
                label: "Weight",
                data: r.data.map((s) => s.weight),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: !1,
              },
            ],
          };
          this.chartData = i;
        });
      },
    },
  },
  Z0 = { id: "app" },
  K0 = { key: 0 },
  Q0 = { key: 1 },
  J0 = lf("Workouts"),
  ep = he("h1", null, "Weights", -1),
  tp = he("tr", null, [he("th", null, "Weight"), he("th", null, "Date")], -1),
  rp = ["onClick"],
  ap = he("label", null, "Weight: ", -1),
  np = he("h3", null, "My Line Graph", -1);
function ip(r, i, s, d, c, p) {
  const _ = Lo("router-link"),
    S = Lo("weight-line-graph");
  return (
    or(),
    sr("div", Z0, [
      c.loading
        ? (or(), sr("div", K0, "LOADING..."))
        : (or(),
          sr("div", Q0, [
            Wo(_, { to: "/workout-rx" }, { default: rf(() => [J0]), _: 1 }),
            ep,
            he("h2", null, ga(c.clientName) + " " + ga(c.clientBirthDay), 1),
            he("table", null, [
              tp,
              (or(!0),
              sr(
                af,
                null,
                nf(
                  c.clientWeights,
                  (T) => (
                    or(),
                    sr("tr", null, [
                      he("td", null, ga(T.weight), 1),
                      he("td", null, ga(p.newDate(T.date)), 1),
                      he("td", null, [
                        he(
                          "button",
                          { onClick: (P) => p.deleteWeight(T.id) },
                          "\u{1F5D1}",
                          8,
                          rp
                        ),
                      ]),
                    ])
                  )
                ),
                256
              )),
            ]),
            ap,
            of(
              he(
                "input",
                {
                  "onUpdate:modelValue":
                    i[0] || (i[0] = (T) => (c.newWeight = T)),
                  type: "integer",
                  id: "weight",
                  placeholder: "Weight",
                },
                null,
                512
              ),
              [[sf, c.newWeight]]
            ),
            he(
              "button",
              {
                onClick:
                  i[1] || (i[1] = (...T) => p.addWeight && p.addWeight(...T)),
              },
              "\u2714"
            ),
            he("div", null, [
              np,
              Wo(
                S,
                {
                  "chart-data": c.chartData || c.defaultChartData,
                  options: r.chartOptions,
                },
                null,
                8,
                ["chart-data", "options"]
              ),
            ]),
          ])),
    ])
  );
}
const sp = rs(X0, [["render", ip]]);
export { sp as default };
