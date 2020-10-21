! function(t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PIXI = t()
}(function() {
    return function t(e, r, i) {
        function n(o, a) {
            if (!r[o]) {
                if (!e[o]) {
                    var h = "function" == typeof require && require;
                    if (!a && h)
                        return h(o, !0);
                    if (s)
                        return s(o, !0);
                    var u = new Error("Cannot find module '" + o + "'");
                    throw u.code = "MODULE_NOT_FOUND",
                        u
                }
                var l = r[o] = {
                    exports: {}
                };
                e[o][0].call(l.exports, function(t) {
                    return n(e[o][1][t] || t)
                }, l, l.exports, t, e, r, i)
            }
            return r[o].exports
        }
        for (var s = "function" == typeof require && require, o = 0; o < i.length; o++)
            n(i[o]);
        return n
    }({
        1: [function(t, e, r) {
            "use strict";

            function i(t) {
                var e = 32;
                return (t &= -t) && e--,
                    65535 & t && (e -= 16),
                    16711935 & t && (e -= 8),
                    252645135 & t && (e -= 4),
                    858993459 & t && (e -= 2),
                    1431655765 & t && (e -= 1),
                    e
            }
            r.INT_BITS = 32,
                r.INT_MAX = 2147483647,
                r.INT_MIN = -1 << 31,
                r.sign = function(t) {
                    return (0 < t) - (t < 0)
                },
                r.abs = function(t) {
                    var e = t >> 31;
                    return (t ^ e) - e
                },
                r.min = function(t, e) {
                    return e ^ (t ^ e) & -(t < e)
                },
                r.max = function(t, e) {
                    return t ^ (t ^ e) & -(t < e)
                },
                r.isPow2 = function(t) {
                    return !(t & t - 1 || !t)
                },
                r.log2 = function(t) {
                    var e, r;
                    return e = (65535 < t) << 4,
                        e |= r = (255 < (t >>>= e)) << 3,
                        e |= r = (15 < (t >>>= r)) << 2,
                        (e |= r = (3 < (t >>>= r)) << 1) | (t >>>= r) >> 1
                },
                r.log10 = function(t) {
                    return 1e9 <= t ? 9 : 1e8 <= t ? 8 : 1e7 <= t ? 7 : 1e6 <= t ? 6 : 1e5 <= t ? 5 : 1e4 <= t ? 4 : 1e3 <= t ? 3 : 100 <= t ? 2 : 10 <= t ? 1 : 0
                },
                r.popCount = function(t) {
                    return 16843009 * ((t = (858993459 & (t -= t >>> 1 & 1431655765)) + (t >>> 2 & 858993459)) + (t >>> 4) & 252645135) >>> 24
                },
                r.countTrailingZeros = i,
                r.nextPow2 = function(t) {
                    return t += 0 === t,
                        --t,
                        t |= t >>> 1,
                        t |= t >>> 2,
                        t |= t >>> 4,
                        1 + ((t |= t >>> 8) | t >>> 16)
                },
                r.prevPow2 = function(t) {
                    return t |= t >>> 1,
                        t |= t >>> 2,
                        t |= t >>> 4,
                        t |= t >>> 8,
                        (t |= t >>> 16) - (t >>> 1)
                },
                r.parity = function(t) {
                    return t ^= t >>> 16,
                        t ^= t >>> 8,
                        t ^= t >>> 4,
                        27030 >>> (t &= 15) & 1
                };
            var n = new Array(256);
            ! function(t) {
                for (var e = 0; e < 256; ++e) {
                    var r = e,
                        i = e,
                        n = 7;
                    for (r >>>= 1; r; r >>>= 1)
                        i <<= 1,
                        i |= 1 & r,
                        --n;
                    t[e] = i << n & 255
                }
            }(n),
            r.reverse = function(t) {
                    return n[255 & t] << 24 | n[t >>> 8 & 255] << 16 | n[t >>> 16 & 255] << 8 | n[t >>> 24 & 255]
                },
                r.interleave2 = function(t, e) {
                    return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t &= 65535) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e &= 65535) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
                },
                r.deinterleave2 = function(t, e) {
                    return (t = 65535 & ((t = 16711935 & ((t = 252645135 & ((t = 858993459 & ((t = t >>> e & 1431655765) | t >>> 1)) | t >>> 2)) | t >>> 4)) | t >>> 16)) << 16 >> 16
                },
                r.interleave3 = function(t, e, r) {
                    return t = 1227133513 & ((t = 3272356035 & ((t = 251719695 & ((t = 4278190335 & ((t &= 1023) | t << 16)) | t << 8)) | t << 4)) | t << 2),
                        (t |= (e = 1227133513 & ((e = 3272356035 & ((e = 251719695 & ((e = 4278190335 & ((e &= 1023) | e << 16)) | e << 8)) | e << 4)) | e << 2)) << 1) | (r = 1227133513 & ((r = 3272356035 & ((r = 251719695 & ((r = 4278190335 & ((r &= 1023) | r << 16)) | r << 8)) | r << 4)) | r << 2)) << 2
                },
                r.deinterleave3 = function(t, e) {
                    return (t = 1023 & ((t = 4278190335 & ((t = 251719695 & ((t = 3272356035 & ((t = t >>> e & 1227133513) | t >>> 2)) | t >>> 4)) | t >>> 8)) | t >>> 16)) << 22 >> 22
                },
                r.nextCombination = function(t) {
                    var e = t | t - 1;
                    return e + 1 | (~e & -~e) - 1 >>> i(t) + 1
                }
        }, {}],
        2: [function(t, e, r) {}, {}],
        3: [function(t, e, r) {
            (function(t) {
                ! function(i) {
                    function n(t) {
                        throw new RangeError(M[t])
                    }

                    function s(t, e) {
                        for (var r = t.length, i = []; r--;)
                            i[r] = e(t[r]);
                        return i
                    }

                    function o(t, e) {
                        var r = t.split("@"),
                            i = "";
                        return 1 < r.length && (i = r[0] + "@",
                                t = r[1]),
                            i + s((t = t.replace(R, ".")).split("."), e).join(".")
                    }

                    function a(t) {
                        for (var e, r, i = [], n = 0, s = t.length; n < s;)
                            55296 <= (e = t.charCodeAt(n++)) && e <= 56319 && n < s ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e),
                                n--) : i.push(e);
                        return i
                    }

                    function h(t) {
                        return s(t, function(t) {
                            var e = "";
                            return 65535 < t && (e += I((t -= 65536) >>> 10 & 1023 | 55296),
                                    t = 56320 | 1023 & t),
                                e + I(t)
                        }).join("")
                    }

                    function u(t, e) {
                        return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                    }

                    function l(t, e, r) {
                        var i = 0;
                        for (t = r ? D(t / E) : t >> 1,
                            t += D(t / e); A * b >> 1 < t; i += y)
                            t = D(t / A);
                        return D(i + (A + 1) * t / (t + T))
                    }

                    function c(t) {
                        var e, r, i, s, o, a, u, c, d, f, p, g = [],
                            v = t.length,
                            _ = 0,
                            T = S,
                            E = w;
                        for ((r = t.lastIndexOf(O)) < 0 && (r = 0),
                            i = 0; i < r; ++i)
                            128 <= t.charCodeAt(i) && n("not-basic"),
                            g.push(t.charCodeAt(i));
                        for (s = 0 < r ? r + 1 : 0; s < v;) {
                            for (o = _,
                                a = 1,
                                u = y; v <= s && n("invalid-input"),
                                p = t.charCodeAt(s++),
                                (y <= (c = p - 48 < 10 ? p - 22 : p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : y) || c > D((m - _) / a)) && n("overflow"),
                                _ += c * a, !(c < (d = u <= E ? x : E + b <= u ? b : u - E)); u += y)
                                a > D(m / (f = y - d)) && n("overflow"),
                                a *= f;
                            E = l(_ - o, e = g.length + 1, 0 == o),
                                D(_ / e) > m - T && n("overflow"),
                                T += D(_ / e),
                                _ %= e,
                                g.splice(_++, 0, T)
                        }
                        return h(g)
                    }

                    function d(t) {
                        var e, r, i, s, o, h, c, d, f, p, g, v, _, T, E, P = [];
                        for (v = (t = a(t)).length,
                            e = S,
                            o = w,
                            h = r = 0; h < v; ++h)
                            (g = t[h]) < 128 && P.push(I(g));
                        for (i = s = P.length,
                            s && P.push(O); i < v;) {
                            for (c = m,
                                h = 0; h < v; ++h)
                                (g = t[h]) >= e && g < c && (c = g);
                            for (c - e > D((m - r) / (_ = i + 1)) && n("overflow"),
                                r += (c - e) * _,
                                e = c,
                                h = 0; h < v; ++h)
                                if ((g = t[h]) < e && ++r > m && n("overflow"),
                                    g == e) {
                                    for (d = r,
                                        f = y; !(d < (p = f <= o ? x : o + b <= f ? b : f - o)); f += y)
                                        E = d - p,
                                        T = y - p,
                                        P.push(I(u(p + E % T, 0))),
                                        d = D(E / T);
                                    P.push(I(u(d, 0))),
                                        o = l(r, _, i == s),
                                        r = 0,
                                        ++i
                                }
                                ++r,
                            ++e
                        }
                        return P.join("")
                    }
                    var f = "object" == typeof r && r && !r.nodeType && r,
                        p = "object" == typeof e && e && !e.nodeType && e,
                        g = "object" == typeof t && t;
                    g.global !== g && g.window !== g && g.self !== g || (i = g);
                    var v, _, m = 2147483647,
                        y = 36,
                        x = 1,
                        b = 26,
                        T = 38,
                        E = 700,
                        w = 72,
                        S = 128,
                        O = "-",
                        P = /^xn--/,
                        C = /[^\x20-\x7E]/,
                        R = /[\x2E\u3002\uFF0E\uFF61]/g,
                        M = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        A = y - x,
                        D = Math.floor,
                        I = String.fromCharCode;
                    if (v = {
                            version: "1.4.1",
                            ucs2: {
                                decode: a,
                                encode: h
                            },
                            decode: c,
                            encode: d,
                            toASCII: function(t) {
                                return o(t, function(t) {
                                    return C.test(t) ? "xn--" + d(t) : t
                                })
                            },
                            toUnicode: function(t) {
                                return o(t, function(t) {
                                    return P.test(t) ? c(t.slice(4).toLowerCase()) : t
                                })
                            }
                        },
                        f && p)
                        if (e.exports == f)
                            p.exports = v;
                        else
                            for (_ in v)
                                v.hasOwnProperty(_) && (f[_] = v[_]);
                    else
                        i.punycode = v
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        4: [function(t, e, r) {
            "use strict";

            function i(t, e, r) {
                r = r || 2;
                var i, a, h, u, l, f, g, v = e && e.length,
                    _ = v ? e[0] * r : t.length,
                    m = n(t, 0, _, r, !0),
                    y = [];
                if (!m || m.next === m.prev)
                    return y;
                if (v && (m = function(t, e, r, i) {
                        var o, a, h, u = [];
                        for (o = 0,
                            a = e.length; o < a; o++)
                            (h = n(t, e[o] * i, o < a - 1 ? e[o + 1] * i : t.length, i, !1)) === h.next && (h.steiner = !0),
                            u.push(p(h));
                        for (u.sort(c),
                            o = 0; o < u.length; o++)
                            d(u[o], r),
                            r = s(r, r.next);
                        return r
                    }(t, e, m, r)),
                    t.length > 80 * r) {
                    i = h = t[0],
                        a = u = t[1];
                    for (var x = r; x < _; x += r)
                        (l = t[x]) < i && (i = l),
                        (f = t[x + 1]) < a && (a = f),
                        h < l && (h = l),
                        u < f && (u = f);
                    g = 0 !== (g = Math.max(h - i, u - a)) ? 1 / g : 0
                }
                return o(m, y, r, i, a, g),
                    y
            }

            function n(t, e, r, i, n) {
                var s, o;
                if (n === 0 < O(t, e, r, i))
                    for (s = e; s < r; s += i)
                        o = E(s, t[s], t[s + 1], o);
                else
                    for (s = r - i; e <= s; s -= i)
                        o = E(s, t[s], t[s + 1], o);
                return o && _(o, o.next) && (w(o),
                        o = o.next),
                    o
            }

            function s(t, e) {
                if (!t)
                    return t;
                e || (e = t);
                var r, i = t;
                do {
                    if (r = !1,
                        i.steiner || !_(i, i.next) && 0 !== v(i.prev, i, i.next))
                        i = i.next;
                    else {
                        if (w(i),
                            (i = e = i.prev) === i.next)
                            break;
                        r = !0
                    }
                } while (r || i !== e);
                return e
            }

            function o(t, e, r, i, n, c, d) {
                if (t) {
                    !d && c && function(t, e, r, i) {
                        for (var n = t; null === n.z && (n.z = f(n.x, n.y, e, r, i)),
                            n.prevZ = n.prev,
                            n.nextZ = n.next,
                            (n = n.next) !== t;)
                        ;
                        n.prevZ.nextZ = null,
                            n.prevZ = null,
                            function(t) {
                                var e, r, i, n, s, o, a, h, u = 1;
                                do {
                                    for (r = t,
                                        s = t = null,
                                        o = 0; r;) {
                                        for (o++,
                                            i = r,
                                            e = a = 0; e < u && (a++,
                                                i = i.nextZ); e++)
                                        ;
                                        for (h = u; 0 < a || 0 < h && i;)
                                            0 !== a && (0 === h || !i || r.z <= i.z) ? (r = (n = r).nextZ,
                                                a--) : (i = (n = i).nextZ,
                                                h--),
                                            s ? s.nextZ = n : t = n,
                                            n.prevZ = s,
                                            s = n;
                                        r = i
                                    }
                                    s.nextZ = null,
                                        u *= 2
                                } while (1 < o)
                            }(n)
                    }(t, i, n, c);
                    for (var p, g, v = t; t.prev !== t.next;)
                        if (p = t.prev,
                            g = t.next,
                            c ? h(t, i, n, c) : a(t))
                            e.push(p.i / r),
                            e.push(t.i / r),
                            e.push(g.i / r),
                            w(t),
                            t = g.next,
                            v = g.next;
                        else if ((t = g) === v) {
                        d ? 1 === d ? o(t = u(s(t), e, r), e, r, i, n, c, 2) : 2 === d && l(t, e, r, i, n, c) : o(s(t), e, r, i, n, c, 1);
                        break
                    }
                }
            }

            function a(t) {
                var e = t.prev,
                    r = t,
                    i = t.next;
                if (0 <= v(e, r, i))
                    return !1;
                for (var n = t.next.next; n !== t.prev;) {
                    if (g(e.x, e.y, r.x, r.y, i.x, i.y, n.x, n.y) && 0 <= v(n.prev, n, n.next))
                        return !1;
                    n = n.next
                }
                return !0
            }

            function h(t, e, r, i) {
                var n = t.prev,
                    s = t,
                    o = t.next;
                if (0 <= v(n, s, o))
                    return !1;
                for (var a = n.x < s.x ? n.x < o.x ? n.x : o.x : s.x < o.x ? s.x : o.x, h = n.y < s.y ? n.y < o.y ? n.y : o.y : s.y < o.y ? s.y : o.y, u = n.x > s.x ? n.x > o.x ? n.x : o.x : s.x > o.x ? s.x : o.x, l = n.y > s.y ? n.y > o.y ? n.y : o.y : s.y > o.y ? s.y : o.y, c = f(a, h, e, r, i), d = f(u, l, e, r, i), p = t.prevZ, _ = t.nextZ; p && p.z >= c && _ && _.z <= d;) {
                    if (p !== t.prev && p !== t.next && g(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && 0 <= v(p.prev, p, p.next))
                        return !1;
                    if (p = p.prevZ,
                        _ !== t.prev && _ !== t.next && g(n.x, n.y, s.x, s.y, o.x, o.y, _.x, _.y) && 0 <= v(_.prev, _, _.next))
                        return !1;
                    _ = _.nextZ
                }
                for (; p && p.z >= c;) {
                    if (p !== t.prev && p !== t.next && g(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && 0 <= v(p.prev, p, p.next))
                        return !1;
                    p = p.prevZ
                }
                for (; _ && _.z <= d;) {
                    if (_ !== t.prev && _ !== t.next && g(n.x, n.y, s.x, s.y, o.x, o.y, _.x, _.y) && 0 <= v(_.prev, _, _.next))
                        return !1;
                    _ = _.nextZ
                }
                return !0
            }

            function u(t, e, r) {
                var i = t;
                do {
                    var n = i.prev,
                        o = i.next.next;
                    !_(n, o) && m(n, i, i.next, o) && b(n, o) && b(o, n) && (e.push(n.i / r),
                            e.push(i.i / r),
                            e.push(o.i / r),
                            w(i),
                            w(i.next),
                            i = t = o),
                        i = i.next
                } while (i !== t);
                return s(i)
            }

            function l(t, e, r, i, n, a) {
                var h, u, l = t;
                do {
                    for (var c = l.next.next; c !== l.prev;) {
                        if (l.i !== c.i && (u = c,
                                (h = l).next.i !== u.i && h.prev.i !== u.i && ! function(t, e) {
                                    var r = t;
                                    do {
                                        if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && m(r, r.next, t, e))
                                            return !0;
                                        r = r.next
                                    } while (r !== t);
                                    return !1
                                }(h, u) && (b(h, u) && b(u, h) && function(t, e) {
                                    for (var r = t, i = !1, n = (t.x + e.x) / 2, s = (t.y + e.y) / 2; r.y > s != r.next.y > s && r.next.y !== r.y && n < (r.next.x - r.x) * (s - r.y) / (r.next.y - r.y) + r.x && (i = !i),
                                        (r = r.next) !== t;)
                                    ;
                                    return i
                                }(h, u) && (v(h.prev, h, u.prev) || v(h, u.prev, u)) || _(h, u) && 0 < v(h.prev, h, h.next) && 0 < v(u.prev, u, u.next)))) {
                            var d = T(l, c);
                            return l = s(l, l.next),
                                d = s(d, d.next),
                                o(l, e, r, i, n, a),
                                void o(d, e, r, i, n, a)
                        }
                        c = c.next
                    }
                    l = l.next
                } while (l !== t)
            }

            function c(t, e) {
                return t.x - e.x
            }

            function d(t, e) {
                if (e = function(t, e) {
                        var r, i = e,
                            n = t.x,
                            s = t.y,
                            o = -1 / 0;
                        do {
                            if (s <= i.y && s >= i.next.y && i.next.y !== i.y) {
                                var a = i.x + (s - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                                if (a <= n && o < a) {
                                    if ((o = a) === n) {
                                        if (s === i.y)
                                            return i;
                                        if (s === i.next.y)
                                            return i.next
                                    }
                                    r = i.x < i.next.x ? i : i.next
                                }
                            }
                            i = i.next
                        } while (i !== e);
                        if (!r)
                            return null;
                        if (n === o)
                            return r;
                        var h, u, l, c = r,
                            d = r.x,
                            f = r.y,
                            p = 1 / 0;
                        for (i = r; n >= i.x && i.x >= d && n !== i.x && g(s < f ? n : o, s, d, f, s < f ? o : n, s, i.x, i.y) && (h = Math.abs(s - i.y) / (n - i.x),
                                b(i, t) && (h < p || h === p && (i.x > r.x || i.x === r.x && (l = i,
                                    v((u = r).prev, u, l.prev) < 0 && v(l.next, u, u.next) < 0))) && (r = i,
                                    p = h)),
                            (i = i.next) !== c;)
                        ;
                        return r
                    }(t, e)) {
                    var r = T(e, t);
                    s(r, r.next)
                }
            }

            function f(t, e, r, i, n) {
                return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * n) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * n) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
            }

            function p(t) {
                for (var e = t, r = t;
                    (e.x < r.x || e.x === r.x && e.y < r.y) && (r = e),
                    (e = e.next) !== t;)
                ;
                return r
            }

            function g(t, e, r, i, n, s, o, a) {
                return 0 <= (n - o) * (e - a) - (t - o) * (s - a) && 0 <= (t - o) * (i - a) - (r - o) * (e - a) && 0 <= (r - o) * (s - a) - (n - o) * (i - a)
            }

            function v(t, e, r) {
                return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y)
            }

            function _(t, e) {
                return t.x === e.x && t.y === e.y
            }

            function m(t, e, r, i) {
                var n = x(v(t, e, r)),
                    s = x(v(t, e, i)),
                    o = x(v(r, i, t)),
                    a = x(v(r, i, e));
                return n !== s && o !== a || !(0 !== n || !y(t, r, e)) || !(0 !== s || !y(t, i, e)) || !(0 !== o || !y(r, t, i)) || !(0 !== a || !y(r, e, i))
            }

            function y(t, e, r) {
                return e.x <= Math.max(t.x, r.x) && e.x >= Math.min(t.x, r.x) && e.y <= Math.max(t.y, r.y) && e.y >= Math.min(t.y, r.y)
            }

            function x(t) {
                return 0 < t ? 1 : t < 0 ? -1 : 0
            }

            function b(t, e) {
                return v(t.prev, t, t.next) < 0 ? 0 <= v(t, e, t.next) && 0 <= v(t, t.prev, e) : v(t, e, t.prev) < 0 || v(t, t.next, e) < 0
            }

            function T(t, e) {
                var r = new S(t.i, t.x, t.y),
                    i = new S(e.i, e.x, e.y),
                    n = t.next,
                    s = e.prev;
                return (t.next = e).prev = t,
                    (r.next = n).prev = r,
                    (i.next = r).prev = i,
                    (s.next = i).prev = s,
                    i
            }

            function E(t, e, r, i) {
                var n = new S(t, e, r);
                return i ? (n.next = i.next,
                        (n.prev = i).next.prev = n,
                        i.next = n) : (n.prev = n).next = n,
                    n
            }

            function w(t) {
                t.next.prev = t.prev,
                    t.prev.next = t.next,
                    t.prevZ && (t.prevZ.nextZ = t.nextZ),
                    t.nextZ && (t.nextZ.prevZ = t.prevZ)
            }

            function S(t, e, r) {
                this.i = t,
                    this.x = e,
                    this.y = r,
                    this.prev = null,
                    this.next = null,
                    this.z = null,
                    this.prevZ = null,
                    this.nextZ = null,
                    this.steiner = !1
            }

            function O(t, e, r, i) {
                for (var n = 0, s = e, o = r - i; s < r; s += i)
                    n += (t[o] - t[s]) * (t[s + 1] + t[o + 1]),
                    o = s;
                return n
            }
            e.exports = i,
                (e.exports.default = i).deviation = function(t, e, r, i) {
                    var n = e && e.length,
                        s = n ? e[0] * r : t.length,
                        o = Math.abs(O(t, 0, s, r));
                    if (n)
                        for (var a = 0, h = e.length; a < h; a++) {
                            var u = e[a] * r,
                                l = a < h - 1 ? e[a + 1] * r : t.length;
                            o -= Math.abs(O(t, u, l, r))
                        }
                    var c = 0;
                    for (a = 0; a < i.length; a += 3) {
                        var d = i[a] * r,
                            f = i[a + 1] * r,
                            p = i[a + 2] * r;
                        c += Math.abs((t[d] - t[p]) * (t[f + 1] - t[d + 1]) - (t[d] - t[f]) * (t[p + 1] - t[d + 1]))
                    }
                    return 0 === o && 0 === c ? 0 : Math.abs((c - o) / o)
                },
                i.flatten = function(t) {
                    for (var e = t[0][0].length, r = {
                            vertices: [],
                            holes: [],
                            dimensions: e
                        }, i = 0, n = 0; n < t.length; n++) {
                        for (var s = 0; s < t[n].length; s++)
                            for (var o = 0; o < e; o++)
                                r.vertices.push(t[n][s][o]);
                        0 < n && (i += t[n - 1].length,
                            r.holes.push(i))
                    }
                    return r
                }
        }, {}],
        5: [function(t, e, r) {
            "use strict";

            function i() {}

            function n(t, e, r) {
                this.fn = t,
                    this.context = e,
                    this.once = r || !1
            }

            function s() {
                this._events = new i,
                    this._eventsCount = 0
            }
            var o = Object.prototype.hasOwnProperty,
                a = "~";
            Object.create && (i.prototype = Object.create(null),
                    (new i).__proto__ || (a = !1)),
                s.prototype.eventNames = function() {
                    var t, e, r = [];
                    if (0 === this._eventsCount)
                        return r;
                    for (e in t = this._events)
                        o.call(t, e) && r.push(a ? e.slice(1) : e);
                    return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r
                },
                s.prototype.listeners = function(t, e) {
                    var r = a ? a + t : t,
                        i = this._events[r];
                    if (e)
                        return !!i;
                    if (!i)
                        return [];
                    if (i.fn)
                        return [i.fn];
                    for (var n = 0, s = i.length, o = new Array(s); n < s; n++)
                        o[n] = i[n].fn;
                    return o
                },
                s.prototype.emit = function(t, e, r, i, n, s) {
                    var o = a ? a + t : t;
                    if (!this._events[o])
                        return !1;
                    var h, u, l = this._events[o],
                        c = arguments.length;
                    if (l.fn) {
                        switch (l.once && this.removeListener(t, l.fn, void 0, !0),
                            c) {
                            case 1:
                                return l.fn.call(l.context), !0;
                            case 2:
                                return l.fn.call(l.context, e), !0;
                            case 3:
                                return l.fn.call(l.context, e, r), !0;
                            case 4:
                                return l.fn.call(l.context, e, r, i), !0;
                            case 5:
                                return l.fn.call(l.context, e, r, i, n), !0;
                            case 6:
                                return l.fn.call(l.context, e, r, i, n, s), !0
                        }
                        for (u = 1,
                            h = new Array(c - 1); u < c; u++)
                            h[u - 1] = arguments[u];
                        l.fn.apply(l.context, h)
                    } else {
                        var d, f = l.length;
                        for (u = 0; u < f; u++)
                            switch (l[u].once && this.removeListener(t, l[u].fn, void 0, !0),
                                c) {
                                case 1:
                                    l[u].fn.call(l[u].context);
                                    break;
                                case 2:
                                    l[u].fn.call(l[u].context, e);
                                    break;
                                case 3:
                                    l[u].fn.call(l[u].context, e, r);
                                    break;
                                case 4:
                                    l[u].fn.call(l[u].context, e, r, i);
                                    break;
                                default:
                                    if (!h)
                                        for (d = 1,
                                            h = new Array(c - 1); d < c; d++)
                                            h[d - 1] = arguments[d];
                                    l[u].fn.apply(l[u].context, h)
                            }
                    }
                    return !0
                },
                s.prototype.on = function(t, e, r) {
                    var i = new n(e, r || this),
                        s = a ? a + t : t;
                    return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], i] : this._events[s].push(i) : (this._events[s] = i,
                            this._eventsCount++),
                        this
                },
                s.prototype.once = function(t, e, r) {
                    var i = new n(e, r || this, !0),
                        s = a ? a + t : t;
                    return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], i] : this._events[s].push(i) : (this._events[s] = i,
                            this._eventsCount++),
                        this
                },
                s.prototype.removeListener = function(t, e, r, n) {
                    var s = a ? a + t : t;
                    if (!this._events[s])
                        return this;
                    if (!e)
                        return 0 == --this._eventsCount ? this._events = new i : delete this._events[s],
                            this;
                    var o = this._events[s];
                    if (o.fn)
                        o.fn !== e || n && !o.once || r && o.context !== r || (0 == --this._eventsCount ? this._events = new i : delete this._events[s]);
                    else {
                        for (var h = 0, u = [], l = o.length; h < l; h++)
                            (o[h].fn !== e || n && !o[h].once || r && o[h].context !== r) && u.push(o[h]);
                        u.length ? this._events[s] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new i : delete this._events[s]
                    }
                    return this
                },
                s.prototype.removeAllListeners = function(t) {
                    var e;
                    return t ? (e = a ? a + t : t,
                            this._events[e] && (0 == --this._eventsCount ? this._events = new i : delete this._events[e])) : (this._events = new i,
                            this._eventsCount = 0),
                        this
                },
                s.prototype.off = s.prototype.removeListener,
                s.prototype.addListener = s.prototype.on,
                s.prototype.setMaxListeners = function() {
                    return this
                },
                s.prefixed = a,
                s.EventEmitter = s,
                void 0 !== e && (e.exports = s)
        }, {}],
        6: [function(t, e, r) {
            var i, n, s, o, a, h, u, l, c, d, f, p, g, v, _, m, y, x;
            i = /iPhone/i,
                n = /iPod/i,
                s = /iPad/i,
                o = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
                a = /Android/i,
                h = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
                u = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
                l = /Windows Phone/i,
                c = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
                d = /BlackBerry/i,
                f = /BB10/i,
                p = /Opera Mini/i,
                g = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
                v = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
                _ = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
                m = function(t, e) {
                    return t.test(e)
                },
                y = function(t) {
                    var e = t || navigator.userAgent,
                        r = e.split("[FBAN");
                    if (void 0 !== r[1] && (e = r[0]),
                        void 0 !== (r = e.split("Twitter"))[1] && (e = r[0]),
                        this.apple = {
                            phone: m(i, e),
                            ipod: m(n, e),
                            tablet: !m(i, e) && m(s, e),
                            device: m(i, e) || m(n, e) || m(s, e)
                        },
                        this.amazon = {
                            phone: m(h, e),
                            tablet: !m(h, e) && m(u, e),
                            device: m(h, e) || m(u, e)
                        },
                        this.android = {
                            phone: m(h, e) || m(o, e),
                            tablet: !m(h, e) && !m(o, e) && (m(u, e) || m(a, e)),
                            device: m(h, e) || m(u, e) || m(o, e) || m(a, e)
                        },
                        this.windows = {
                            phone: m(l, e),
                            tablet: m(c, e),
                            device: m(l, e) || m(c, e)
                        },
                        this.other = {
                            blackberry: m(d, e),
                            blackberry10: m(f, e),
                            opera: m(p, e),
                            firefox: m(v, e),
                            chrome: m(g, e),
                            device: m(d, e) || m(f, e) || m(p, e) || m(v, e) || m(g, e)
                        },
                        this.seven_inch = m(_, e),
                        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch,
                        this.phone = this.apple.phone || this.android.phone || this.windows.phone,
                        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet,
                        "undefined" == typeof window)
                        return this
                },
                x = function() {
                    var t = new y;
                    return t.Class = y,
                        t
                },
                void 0 !== e && e.exports && "undefined" == typeof window ? e.exports = y : void 0 !== e && e.exports && "undefined" != typeof window ? e.exports = x() : this.isMobile = x()
        }, {}],
        7: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }

            function n(t, e) {
                return t._head ? (t._tail._next = e)._prev = t._tail : t._head = e,
                    (t._tail = e)._owner = t,
                    e
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                o = function() {
                    function t(e, r, n) {
                        void 0 === r && (r = !1),
                            i(this, t),
                            this._fn = e,
                            this._once = r,
                            this._thisArg = n,
                            this._next = this._prev = this._owner = null
                    }
                    return s(t, [{
                            key: "detach",
                            value: function() {
                                return null !== this._owner && (this._owner.detach(this), !0)
                            }
                        }]),
                        t
                }(),
                a = function() {
                    function t() {
                        i(this, t),
                            this._head = this._tail = void 0
                    }
                    return s(t, [{
                            key: "handlers",
                            value: function() {
                                var t = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
                                    e = this._head;
                                if (t)
                                    return !!e;
                                for (var r = []; e;)
                                    r.push(e),
                                    e = e._next;
                                return r
                            }
                        }, {
                            key: "has",
                            value: function(t) {
                                if (!(t instanceof o))
                                    throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                                return t._owner === this
                            }
                        }, {
                            key: "dispatch",
                            value: function() {
                                var t = this._head;
                                if (!t)
                                    return !1;
                                for (; t;)
                                    t._once && this.detach(t),
                                    t._fn.apply(t._thisArg, arguments),
                                    t = t._next;
                                return !0
                            }
                        }, {
                            key: "add",
                            value: function(t) {
                                var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                                if ("function" != typeof t)
                                    throw new Error("MiniSignal#add(): First arg must be a Function.");
                                return n(this, new o(t, !1, e))
                            }
                        }, {
                            key: "once",
                            value: function(t) {
                                var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                                if ("function" != typeof t)
                                    throw new Error("MiniSignal#once(): First arg must be a Function.");
                                return n(this, new o(t, !0, e))
                            }
                        }, {
                            key: "detach",
                            value: function(t) {
                                if (!(t instanceof o))
                                    throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                                return t._owner !== this || (t._prev && (t._prev._next = t._next),
                                        t._next && (t._next._prev = t._prev),
                                        t === this._head ? (this._head = t._next,
                                            null === t._next && (this._tail = null)) : t === this._tail && (this._tail = t._prev,
                                            this._tail._next = null),
                                        t._owner = null),
                                    this
                            }
                        }, {
                            key: "detachAll",
                            value: function() {
                                var t = this._head;
                                if (!t)
                                    return this;
                                for (this._head = this._tail = null; t;)
                                    t._owner = null,
                                    t = t._next;
                                return this
                            }
                        }]),
                        t
                }();
            a.MiniSignalBinding = o,
                r.default = a,
                e.exports = r.default
        }, {}],
        8: [function(t, e, r) {
            "use strict";
            var i = Object.getOwnPropertySymbols,
                n = Object.prototype.hasOwnProperty,
                s = Object.prototype.propertyIsEnumerable;
            e.exports = function() {
                try {
                    if (!Object.assign)
                        return !1;
                    var t = new String("abc");
                    if (t[5] = "de",
                        "5" === Object.getOwnPropertyNames(t)[0])
                        return !1;
                    for (var e = {}, r = 0; r < 10; r++)
                        e["_" + String.fromCharCode(r)] = r;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                            return e[t]
                        }).join(""))
                        return !1;
                    var i = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                            i[t] = t
                        }),
                        "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
                } catch (t) {
                    return !1
                }
            }() ? Object.assign : function(t, e) {
                for (var r, o, a = function(t) {
                        if (null == t)
                            throw new TypeError("Object.assign cannot be called with null or undefined");
                        return Object(t)
                    }(t), h = 1; h < arguments.length; h++) {
                    for (var u in r = Object(arguments[h]))
                        n.call(r, u) && (a[u] = r[u]);
                    if (i) {
                        o = i(r);
                        for (var l = 0; l < o.length; l++)
                            s.call(r, o[l]) && (a[o[l]] = r[o[l]])
                    }
                }
                return a
            }
        }, {}],
        9: [function(t, e, r) {
            "use strict";
            e.exports = function(t, e) {
                e = e || {};
                for (var r = {
                        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                        q: {
                            name: "queryKey",
                            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                        },
                        parser: {
                            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                        }
                    }, i = r.parser[e.strictMode ? "strict" : "loose"].exec(t), n = {}, s = 14; s--;)
                    n[r.key[s]] = i[s] || "";
                return n[r.q.name] = {},
                    n[r.key[12]].replace(r.q.parser, function(t, e, i) {
                        e && (n[r.q.name][e] = i)
                    }),
                    n
            }
        }, {}],
        10: [function(t, e, r) {
            (function(t) {
                function e(t, e) {
                    for (var r = 0, i = t.length - 1; 0 <= i; i--) {
                        var n = t[i];
                        "." === n ? t.splice(i, 1) : ".." === n ? (t.splice(i, 1),
                            r++) : r && (t.splice(i, 1),
                            r--)
                    }
                    if (e)
                        for (; r--; r)
                            t.unshift("..");
                    return t
                }

                function i(t, e) {
                    if (t.filter)
                        return t.filter(e);
                    for (var r = [], i = 0; i < t.length; i++)
                        e(t[i], i, t) && r.push(t[i]);
                    return r
                }
                r.resolve = function() {
                        for (var r = "", n = !1, s = arguments.length - 1; - 1 <= s && !n; s--) {
                            var o = 0 <= s ? arguments[s] : t.cwd();
                            if ("string" != typeof o)
                                throw new TypeError("Arguments to path.resolve must be strings");
                            o && (r = o + "/" + r,
                                n = "/" === o.charAt(0))
                        }
                        return (n ? "/" : "") + (r = e(i(r.split("/"), function(t) {
                            return !!t
                        }), !n).join("/")) || "."
                    },
                    r.normalize = function(t) {
                        var s = r.isAbsolute(t),
                            o = "/" === n(t, -1);
                        return (t = e(i(t.split("/"), function(t) {
                                return !!t
                            }), !s).join("/")) || s || (t = "."),
                            t && o && (t += "/"),
                            (s ? "/" : "") + t
                    },
                    r.isAbsolute = function(t) {
                        return "/" === t.charAt(0)
                    },
                    r.join = function() {
                        var t = Array.prototype.slice.call(arguments, 0);
                        return r.normalize(i(t, function(t, e) {
                            if ("string" != typeof t)
                                throw new TypeError("Arguments to path.join must be strings");
                            return t
                        }).join("/"))
                    },
                    r.relative = function(t, e) {
                        function i(t) {
                            for (var e = 0; e < t.length && "" === t[e]; e++)
                            ;
                            for (var r = t.length - 1; 0 <= r && "" === t[r]; r--)
                            ;
                            return r < e ? [] : t.slice(e, r - e + 1)
                        }
                        t = r.resolve(t).substr(1),
                            e = r.resolve(e).substr(1);
                        for (var n = i(t.split("/")), s = i(e.split("/")), o = Math.min(n.length, s.length), a = o, h = 0; h < o; h++)
                            if (n[h] !== s[h]) {
                                a = h;
                                break
                            }
                        var u = [];
                        for (h = a; h < n.length; h++)
                            u.push("..");
                        return (u = u.concat(s.slice(a))).join("/")
                    },
                    r.sep = "/",
                    r.delimiter = ":",
                    r.dirname = function(t) {
                        if ("string" != typeof t && (t += ""),
                            0 === t.length)
                            return ".";
                        for (var e = t.charCodeAt(0), r = 47 === e, i = -1, n = !0, s = t.length - 1; 1 <= s; --s)
                            if (47 === (e = t.charCodeAt(s))) {
                                if (!n) {
                                    i = s;
                                    break
                                }
                            } else
                                n = !1;
                        return -1 === i ? r ? "/" : "." : r && 1 === i ? "/" : t.slice(0, i)
                    },
                    r.basename = function(t, e) {
                        var r = function(t) {
                            "string" != typeof t && (t += "");
                            var e, r = 0,
                                i = -1,
                                n = !0;
                            for (e = t.length - 1; 0 <= e; --e)
                                if (47 === t.charCodeAt(e)) {
                                    if (!n) {
                                        r = e + 1;
                                        break
                                    }
                                } else
                                    -1 === i && (n = !1,
                                        i = e + 1);
                            return -1 === i ? "" : t.slice(r, i)
                        }(t);
                        return e && r.substr(-1 * e.length) === e && (r = r.substr(0, r.length - e.length)),
                            r
                    },
                    r.extname = function(t) {
                        "string" != typeof t && (t += "");
                        for (var e = -1, r = 0, i = -1, n = !0, s = 0, o = t.length - 1; 0 <= o; --o) {
                            var a = t.charCodeAt(o);
                            if (47 !== a)
                                -
                                1 === i && (n = !1,
                                    i = o + 1),
                                46 === a ? -1 === e ? e = o : 1 !== s && (s = 1) : -1 !== e && (s = -1);
                            else if (!n) {
                                r = o + 1;
                                break
                            }
                        }
                        return -1 === e || -1 === i || 0 === s || 1 === s && e === i - 1 && e === r + 1 ? "" : t.slice(e, i)
                    };
                var n = "b" === "ab".substr(-1) ? function(t, e, r) {
                        return t.substr(e, r)
                    } :
                    function(t, e, r) {
                        return e < 0 && (e = t.length + e),
                            t.substr(e, r)
                    }
            }).call(this, t("_process"))
        }, {
            _process: 28
        }],
        11: [function(t, e, r) {
            var i = new ArrayBuffer(0),
                n = function(t, e, r, n) {
                    this.gl = t,
                        this.buffer = t.createBuffer(),
                        this.type = e || t.ARRAY_BUFFER,
                        this.drawType = n || t.STATIC_DRAW,
                        this.data = i,
                        r && this.upload(r),
                        this._updateID = 0
                };
            n.prototype.upload = function(t, e, r) {
                    r || this.bind();
                    var i = this.gl;
                    t = t || this.data,
                        e = e || 0,
                        this.data.byteLength >= t.byteLength ? i.bufferSubData(this.type, e, t) : i.bufferData(this.type, t, this.drawType),
                        this.data = t
                },
                n.prototype.bind = function() {
                    this.gl.bindBuffer(this.type, this.buffer)
                },
                n.createVertexBuffer = function(t, e, r) {
                    return new n(t, t.ARRAY_BUFFER, e, r)
                },
                n.createIndexBuffer = function(t, e, r) {
                    return new n(t, t.ELEMENT_ARRAY_BUFFER, e, r)
                },
                n.create = function(t, e, r, i) {
                    return new n(t, e, r, i)
                },
                n.prototype.destroy = function() {
                    this.gl.deleteBuffer(this.buffer)
                },
                e.exports = n
        }, {}],
        12: [function(t, e, r) {
            var i = t("./GLTexture"),
                n = function(t, e, r) {
                    this.gl = t,
                        this.framebuffer = t.createFramebuffer(),
                        this.stencil = null,
                        this.texture = null,
                        this.width = e || 100,
                        this.height = r || 100
                };
            n.prototype.enableTexture = function(t) {
                    var e = this.gl;
                    this.texture = t || new i(e),
                        this.texture.bind(),
                        this.bind(),
                        e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture.texture, 0)
                },
                n.prototype.enableStencil = function() {
                    if (!this.stencil) {
                        var t = this.gl;
                        this.stencil = t.createRenderbuffer(),
                            t.bindRenderbuffer(t.RENDERBUFFER, this.stencil),
                            t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencil),
                            t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.width, this.height)
                    }
                },
                n.prototype.clear = function(t, e, r, i) {
                    this.bind();
                    var n = this.gl;
                    n.clearColor(t, e, r, i),
                        n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT)
                },
                n.prototype.bind = function() {
                    var t = this.gl;
                    t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer)
                },
                n.prototype.unbind = function() {
                    var t = this.gl;
                    t.bindFramebuffer(t.FRAMEBUFFER, null)
                },
                n.prototype.resize = function(t, e) {
                    var r = this.gl;
                    this.width = t,
                        this.height = e,
                        this.texture && this.texture.uploadData(null, t, e),
                        this.stencil && (r.bindRenderbuffer(r.RENDERBUFFER, this.stencil),
                            r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t, e))
                },
                n.prototype.destroy = function() {
                    var t = this.gl;
                    this.texture && this.texture.destroy(),
                        t.deleteFramebuffer(this.framebuffer),
                        this.gl = null,
                        this.stencil = null,
                        this.texture = null
                },
                n.createRGBA = function(t, e, r, s) {
                    var o = i.fromData(t, null, e, r);
                    o.enableNearestScaling(),
                        o.enableWrapClamp();
                    var a = new n(t, e, r);
                    return a.enableTexture(o),
                        a.unbind(),
                        a
                },
                n.createFloat32 = function(t, e, r, s) {
                    var o = new i.fromData(t, s, e, r);
                    o.enableNearestScaling(),
                        o.enableWrapClamp();
                    var a = new n(t, e, r);
                    return a.enableTexture(o),
                        a.unbind(),
                        a
                },
                e.exports = n
        }, {
            "./GLTexture": 14
        }],
        13: [function(t, e, r) {
            var i = t("./shader/compileProgram"),
                n = t("./shader/extractAttributes"),
                s = t("./shader/extractUniforms"),
                o = t("./shader/setPrecision"),
                a = t("./shader/generateUniformAccessObject"),
                h = function(t, e, r, h, u) {
                    this.gl = t,
                        h && (e = o(e, h),
                            r = o(r, h)),
                        this.program = i(t, e, r, u),
                        this.attributes = n(t, this.program),
                        this.uniformData = s(t, this.program),
                        this.uniforms = a(t, this.uniformData)
                };
            h.prototype.bind = function() {
                    return this.gl.useProgram(this.program),
                        this
                },
                h.prototype.destroy = function() {
                    this.attributes = null,
                        this.uniformData = null,
                        this.uniforms = null,
                        this.gl.deleteProgram(this.program)
                },
                e.exports = h
        }, {
            "./shader/compileProgram": 19,
            "./shader/extractAttributes": 21,
            "./shader/extractUniforms": 22,
            "./shader/generateUniformAccessObject": 23,
            "./shader/setPrecision": 27
        }],
        14: [function(t, e, r) {
            var i = function(t, e, r, i, n) {
                    this.gl = t,
                        this.texture = t.createTexture(),
                        this.mipmap = !1,
                        this.premultiplyAlpha = !1,
                        this.width = e || -1,
                        this.height = r || -1,
                        this.format = i || t.RGBA,
                        this.type = n || t.UNSIGNED_BYTE
                },
                n = !(i.prototype.upload = function(t) {
                    this.bind();
                    var e = this.gl;
                    e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
                    var r = t.videoWidth || t.width,
                        i = t.videoHeight || t.height;
                    i !== this.height || r !== this.width ? e.texImage2D(e.TEXTURE_2D, 0, this.format, this.format, this.type, t) : e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, this.format, this.type, t),
                        this.width = r,
                        this.height = i
                });
            i.prototype.uploadData = function(t, e, r) {
                    this.bind();
                    var i = this.gl;
                    if (t instanceof Float32Array) {
                        if (!n) {
                            if (!i.getExtension("OES_texture_float"))
                                throw new Error("floating point textures not available");
                            n = !0
                        }
                        this.type = i.FLOAT
                    } else
                        this.type = this.type || i.UNSIGNED_BYTE;
                    i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha),
                        e !== this.width || r !== this.height ? i.texImage2D(i.TEXTURE_2D, 0, this.format, e, r, 0, this.format, this.type, t || null) : i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, e, r, this.format, this.type, t || null),
                        this.width = e,
                        this.height = r
                },
                i.prototype.bind = function(t) {
                    var e = this.gl;
                    void 0 !== t && e.activeTexture(e.TEXTURE0 + t),
                        e.bindTexture(e.TEXTURE_2D, this.texture)
                },
                i.prototype.unbind = function() {
                    var t = this.gl;
                    t.bindTexture(t.TEXTURE_2D, null)
                },
                i.prototype.minFilter = function(t) {
                    var e = this.gl;
                    this.bind(),
                        this.mipmap ? e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST) : e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR : e.NEAREST)
                },
                i.prototype.magFilter = function(t) {
                    var e = this.gl;
                    this.bind(),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t ? e.LINEAR : e.NEAREST)
                },
                i.prototype.enableMipmap = function() {
                    var t = this.gl;
                    this.bind(),
                        this.mipmap = !0,
                        t.generateMipmap(t.TEXTURE_2D)
                },
                i.prototype.enableLinearScaling = function() {
                    this.minFilter(!0),
                        this.magFilter(!0)
                },
                i.prototype.enableNearestScaling = function() {
                    this.minFilter(!1),
                        this.magFilter(!1)
                },
                i.prototype.enableWrapClamp = function() {
                    var t = this.gl;
                    this.bind(),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)
                },
                i.prototype.enableWrapRepeat = function() {
                    var t = this.gl;
                    this.bind(),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT)
                },
                i.prototype.enableWrapMirrorRepeat = function() {
                    var t = this.gl;
                    this.bind(),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.MIRRORED_REPEAT),
                        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.MIRRORED_REPEAT)
                },
                i.prototype.destroy = function() {
                    this.gl.deleteTexture(this.texture)
                },
                i.fromSource = function(t, e, r) {
                    var n = new i(t);
                    return n.premultiplyAlpha = r || !1,
                        n.upload(e),
                        n
                },
                i.fromData = function(t, e, r, n) {
                    var s = new i(t);
                    return s.uploadData(e, r, n),
                        s
                },
                e.exports = i
        }, {}],
        15: [function(t, e, r) {
            function i(t, e) {
                if (this.nativeVaoExtension = null,
                    i.FORCE_NATIVE || (this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")),
                    this.nativeState = e,
                    this.nativeVaoExtension) {
                    this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
                    var r = t.getParameter(t.MAX_VERTEX_ATTRIBS);
                    this.nativeState = {
                        tempAttribState: new Array(r),
                        attribState: new Array(r)
                    }
                }
                this.gl = t,
                    this.attributes = [],
                    this.indexBuffer = null,
                    this.dirty = !1
            }
            var n = t("./setVertexAttribArrays");
            i.prototype.constructor = i,
                (e.exports = i).FORCE_NATIVE = !1,
                i.prototype.bind = function() {
                    if (this.nativeVao) {
                        if (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),
                            this.dirty)
                            return this.dirty = !1,
                                this.activate(),
                                this;
                        this.indexBuffer && this.indexBuffer.bind()
                    } else
                        this.activate();
                    return this
                },
                i.prototype.unbind = function() {
                    return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null),
                        this
                },
                i.prototype.activate = function() {
                    for (var t = this.gl, e = null, r = 0; r < this.attributes.length; r++) {
                        var i = this.attributes[r];
                        e !== i.buffer && (i.buffer.bind(),
                                e = i.buffer),
                            t.vertexAttribPointer(i.attribute.location, i.attribute.size, i.type || t.FLOAT, i.normalized || !1, i.stride || 0, i.start || 0)
                    }
                    return n(t, this.attributes, this.nativeState),
                        this.indexBuffer && this.indexBuffer.bind(),
                        this
                },
                i.prototype.addAttribute = function(t, e, r, i, n, s) {
                    return this.attributes.push({
                            buffer: t,
                            attribute: e,
                            location: e.location,
                            type: r || this.gl.FLOAT,
                            normalized: i || !1,
                            stride: n || 0,
                            start: s || 0
                        }),
                        this.dirty = !0,
                        this
                },
                i.prototype.addIndex = function(t) {
                    return this.indexBuffer = t,
                        this.dirty = !0,
                        this
                },
                i.prototype.clear = function() {
                    return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),
                        this.attributes.length = 0,
                        this.indexBuffer = null,
                        this
                },
                i.prototype.draw = function(t, e, r) {
                    var i = this.gl;
                    return this.indexBuffer ? i.drawElements(t, e || this.indexBuffer.data.length, i.UNSIGNED_SHORT, 2 * (r || 0)) : i.drawArrays(t, r, e || this.getSize()),
                        this
                },
                i.prototype.destroy = function() {
                    this.gl = null,
                        this.indexBuffer = null,
                        this.attributes = null,
                        this.nativeState = null,
                        this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao),
                        this.nativeVaoExtension = null,
                        this.nativeVao = null
                },
                i.prototype.getSize = function() {
                    var t = this.attributes[0];
                    return t.buffer.data.length / (t.stride / 4 || t.attribute.size)
                }
        }, {
            "./setVertexAttribArrays": 18
        }],
        16: [function(t, e, r) {
            e.exports = function(t, e) {
                var r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
                if (!r)
                    throw new Error("This browser does not support webGL. Try using the canvas renderer");
                return r
            }
        }, {}],
        17: [function(t, e, r) {
            var i = {
                createContext: t("./createContext"),
                setVertexAttribArrays: t("./setVertexAttribArrays"),
                GLBuffer: t("./GLBuffer"),
                GLFramebuffer: t("./GLFramebuffer"),
                GLShader: t("./GLShader"),
                GLTexture: t("./GLTexture"),
                VertexArrayObject: t("./VertexArrayObject"),
                shader: t("./shader")
            };
            void 0 !== e && e.exports && (e.exports = i),
                "undefined" != typeof window && (window.PIXI = window.PIXI || {},
                    window.PIXI.glCore = i)
        }, {
            "./GLBuffer": 11,
            "./GLFramebuffer": 12,
            "./GLShader": 13,
            "./GLTexture": 14,
            "./VertexArrayObject": 15,
            "./createContext": 16,
            "./setVertexAttribArrays": 18,
            "./shader": 24
        }],
        18: [function(t, e, r) {
            e.exports = function(t, e, r) {
                var i;
                if (r) {
                    var n = r.tempAttribState,
                        s = r.attribState;
                    for (i = 0; i < n.length; i++)
                        n[i] = !1;
                    for (i = 0; i < e.length; i++)
                        n[e[i].attribute.location] = !0;
                    for (i = 0; i < s.length; i++)
                        s[i] !== n[i] && (s[i] = n[i],
                            r.attribState[i] ? t.enableVertexAttribArray(i) : t.disableVertexAttribArray(i))
                } else
                    for (i = 0; i < e.length; i++) {
                        var o = e[i];
                        t.enableVertexAttribArray(o.attribute.location)
                    }
            }
        }, {}],
        19: [function(t, e, r) {
            var i = function(t, e, r) {
                var i = t.createShader(e);
                return t.shaderSource(i, r),
                    t.compileShader(i),
                    t.getShaderParameter(i, t.COMPILE_STATUS) ? i : (console.log(t.getShaderInfoLog(i)),
                        null)
            };
            e.exports = function(t, e, r, n) {
                var s = i(t, t.VERTEX_SHADER, e),
                    o = i(t, t.FRAGMENT_SHADER, r),
                    a = t.createProgram();
                if (t.attachShader(a, s),
                    t.attachShader(a, o),
                    n)
                    for (var h in n)
                        t.bindAttribLocation(a, n[h], h);
                return t.linkProgram(a),
                    t.getProgramParameter(a, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."),
                        console.error("gl.VALIDATE_STATUS", t.getProgramParameter(a, t.VALIDATE_STATUS)),
                        console.error("gl.getError()", t.getError()),
                        "" !== t.getProgramInfoLog(a) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(a)),
                        t.deleteProgram(a),
                        a = null),
                    t.deleteShader(s),
                    t.deleteShader(o),
                    a
            }
        }, {}],
        20: [function(t, e, r) {
            var i = function(t) {
                for (var e = new Array(t), r = 0; r < e.length; r++)
                    e[r] = !1;
                return e
            };
            e.exports = function(t, e) {
                switch (t) {
                    case "float":
                        return 0;
                    case "vec2":
                        return new Float32Array(2 * e);
                    case "vec3":
                        return new Float32Array(3 * e);
                    case "vec4":
                        return new Float32Array(4 * e);
                    case "int":
                    case "sampler2D":
                        return 0;
                    case "ivec2":
                        return new Int32Array(2 * e);
                    case "ivec3":
                        return new Int32Array(3 * e);
                    case "ivec4":
                        return new Int32Array(4 * e);
                    case "bool":
                        return !1;
                    case "bvec2":
                        return i(2 * e);
                    case "bvec3":
                        return i(3 * e);
                    case "bvec4":
                        return i(4 * e);
                    case "mat2":
                        return new Float32Array([1, 0, 0, 1]);
                    case "mat3":
                        return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                    case "mat4":
                        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            }
        }, {}],
        21: [function(t, e, r) {
            var i = t("./mapType"),
                n = t("./mapSize"),
                s = function(t, e, r, i) {
                    gl.vertexAttribPointer(this.location, this.size, t || gl.FLOAT, e || !1, r || 0, i || 0)
                };
            e.exports = function(t, e) {
                for (var r = {}, o = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), a = 0; a < o; a++) {
                    var h = t.getActiveAttrib(e, a),
                        u = i(t, h.type);
                    r[h.name] = {
                        type: u,
                        size: n(u),
                        location: t.getAttribLocation(e, h.name),
                        pointer: s
                    }
                }
                return r
            }
        }, {
            "./mapSize": 25,
            "./mapType": 26
        }],
        22: [function(t, e, r) {
            var i = t("./mapType"),
                n = t("./defaultValue");
            e.exports = function(t, e) {
                for (var r = {}, s = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), o = 0; o < s; o++) {
                    var a = t.getActiveUniform(e, o),
                        h = a.name.replace(/\[.*?\]/, ""),
                        u = i(t, a.type);
                    r[h] = {
                        type: u,
                        size: a.size,
                        location: t.getUniformLocation(e, h),
                        value: n(u, a.size)
                    }
                }
                return r
            }
        }, {
            "./defaultValue": 20,
            "./mapType": 26
        }],
        23: [function(t, e, r) {
            function i(t, e) {
                return function(r) {
                    this.data[t].value = r;
                    var i = this.data[t].location;
                    1 === e.size ? o[e.type](this.gl, i, r) : a[e.type](this.gl, i, r)
                }
            }

            function n(t, e) {
                for (var r = e, i = 0; i < t.length - 1; i++) {
                    var n = r[t[i]] || {
                        data: {}
                    };
                    r[t[i]] = n,
                        r = n
                }
                return r
            }
            var s = function(t) {
                    return function() {
                        return this.data[t].value
                    }
                },
                o = {
                    float: function(t, e, r) {
                        t.uniform1f(e, r)
                    },
                    vec2: function(t, e, r) {
                        t.uniform2f(e, r[0], r[1])
                    },
                    vec3: function(t, e, r) {
                        t.uniform3f(e, r[0], r[1], r[2])
                    },
                    vec4: function(t, e, r) {
                        t.uniform4f(e, r[0], r[1], r[2], r[3])
                    },
                    int: function(t, e, r) {
                        t.uniform1i(e, r)
                    },
                    ivec2: function(t, e, r) {
                        t.uniform2i(e, r[0], r[1])
                    },
                    ivec3: function(t, e, r) {
                        t.uniform3i(e, r[0], r[1], r[2])
                    },
                    ivec4: function(t, e, r) {
                        t.uniform4i(e, r[0], r[1], r[2], r[3])
                    },
                    bool: function(t, e, r) {
                        t.uniform1i(e, r)
                    },
                    bvec2: function(t, e, r) {
                        t.uniform2i(e, r[0], r[1])
                    },
                    bvec3: function(t, e, r) {
                        t.uniform3i(e, r[0], r[1], r[2])
                    },
                    bvec4: function(t, e, r) {
                        t.uniform4i(e, r[0], r[1], r[2], r[3])
                    },
                    mat2: function(t, e, r) {
                        t.uniformMatrix2fv(e, !1, r)
                    },
                    mat3: function(t, e, r) {
                        t.uniformMatrix3fv(e, !1, r)
                    },
                    mat4: function(t, e, r) {
                        t.uniformMatrix4fv(e, !1, r)
                    },
                    sampler2D: function(t, e, r) {
                        t.uniform1i(e, r)
                    }
                },
                a = {
                    float: function(t, e, r) {
                        t.uniform1fv(e, r)
                    },
                    vec2: function(t, e, r) {
                        t.uniform2fv(e, r)
                    },
                    vec3: function(t, e, r) {
                        t.uniform3fv(e, r)
                    },
                    vec4: function(t, e, r) {
                        t.uniform4fv(e, r)
                    },
                    int: function(t, e, r) {
                        t.uniform1iv(e, r)
                    },
                    ivec2: function(t, e, r) {
                        t.uniform2iv(e, r)
                    },
                    ivec3: function(t, e, r) {
                        t.uniform3iv(e, r)
                    },
                    ivec4: function(t, e, r) {
                        t.uniform4iv(e, r)
                    },
                    bool: function(t, e, r) {
                        t.uniform1iv(e, r)
                    },
                    bvec2: function(t, e, r) {
                        t.uniform2iv(e, r)
                    },
                    bvec3: function(t, e, r) {
                        t.uniform3iv(e, r)
                    },
                    bvec4: function(t, e, r) {
                        t.uniform4iv(e, r)
                    },
                    sampler2D: function(t, e, r) {
                        t.uniform1iv(e, r)
                    }
                };
            e.exports = function(t, e) {
                var r = {
                    data: {}
                };
                r.gl = t;
                for (var o = Object.keys(e), a = 0; a < o.length; a++) {
                    var h = o[a],
                        u = h.split("."),
                        l = u[u.length - 1],
                        c = n(u, r),
                        d = e[h];
                    c.data[l] = d,
                        c.gl = t,
                        Object.defineProperty(c, l, {
                            get: s(l),
                            set: i(l, d)
                        })
                }
                return r
            }
        }, {}],
        24: [function(t, e, r) {
            e.exports = {
                compileProgram: t("./compileProgram"),
                defaultValue: t("./defaultValue"),
                extractAttributes: t("./extractAttributes"),
                extractUniforms: t("./extractUniforms"),
                generateUniformAccessObject: t("./generateUniformAccessObject"),
                setPrecision: t("./setPrecision"),
                mapSize: t("./mapSize"),
                mapType: t("./mapType")
            }
        }, {
            "./compileProgram": 19,
            "./defaultValue": 20,
            "./extractAttributes": 21,
            "./extractUniforms": 22,
            "./generateUniformAccessObject": 23,
            "./mapSize": 25,
            "./mapType": 26,
            "./setPrecision": 27
        }],
        25: [function(t, e, r) {
            var i = {
                float: 1,
                vec2: 2,
                vec3: 3,
                vec4: 4,
                int: 1,
                ivec2: 2,
                ivec3: 3,
                ivec4: 4,
                bool: 1,
                bvec2: 2,
                bvec3: 3,
                bvec4: 4,
                mat2: 4,
                mat3: 9,
                mat4: 16,
                sampler2D: 1
            };
            e.exports = function(t) {
                return i[t]
            }
        }, {}],
        26: [function(t, e, r) {
            var i = null,
                n = {
                    FLOAT: "float",
                    FLOAT_VEC2: "vec2",
                    FLOAT_VEC3: "vec3",
                    FLOAT_VEC4: "vec4",
                    INT: "int",
                    INT_VEC2: "ivec2",
                    INT_VEC3: "ivec3",
                    INT_VEC4: "ivec4",
                    BOOL: "bool",
                    BOOL_VEC2: "bvec2",
                    BOOL_VEC3: "bvec3",
                    BOOL_VEC4: "bvec4",
                    FLOAT_MAT2: "mat2",
                    FLOAT_MAT3: "mat3",
                    FLOAT_MAT4: "mat4",
                    SAMPLER_2D: "sampler2D"
                };
            e.exports = function(t, e) {
                if (!i) {
                    var r = Object.keys(n);
                    i = {};
                    for (var s = 0; s < r.length; ++s) {
                        var o = r[s];
                        i[t[o]] = n[o]
                    }
                }
                return i[e]
            }
        }, {}],
        27: [function(t, e, r) {
            e.exports = function(t, e) {
                return "precision" !== t.substring(0, 9) ? "precision " + e + " float;\n" + t : t
            }
        }, {}],
        28: [function(t, e, r) {
            function i() {
                throw new Error("setTimeout has not been defined")
            }

            function n() {
                throw new Error("clearTimeout has not been defined")
            }

            function s(t) {
                if (l === setTimeout)
                    return setTimeout(t, 0);
                if ((l === i || !l) && setTimeout)
                    return l = setTimeout,
                        setTimeout(t, 0);
                try {
                    return l(t, 0)
                } catch (e) {
                    try {
                        return l.call(null, t, 0)
                    } catch (e) {
                        return l.call(this, t, 0)
                    }
                }
            }

            function o() {
                g && f && (g = !1,
                    f.length ? p = f.concat(p) : v = -1,
                    p.length && a())
            }

            function a() {
                if (!g) {
                    var t = s(o);
                    g = !0;
                    for (var e = p.length; e;) {
                        for (f = p,
                            p = []; ++v < e;)
                            f && f[v].run();
                        v = -1,
                            e = p.length
                    }
                    f = null,
                        g = !1,
                        function(t) {
                            if (c === clearTimeout)
                                return clearTimeout(t);
                            if ((c === n || !c) && clearTimeout)
                                return c = clearTimeout,
                                    clearTimeout(t);
                            try {
                                c(t)
                            } catch (e) {
                                try {
                                    return c.call(null, t)
                                } catch (e) {
                                    return c.call(this, t)
                                }
                            }
                        }(t)
                }
            }

            function h(t, e) {
                this.fun = t,
                    this.array = e
            }

            function u() {}
            var l, c, d = e.exports = {};
            ! function() {
                try {
                    l = "function" == typeof setTimeout ? setTimeout : i
                } catch (t) {
                    l = i
                }
                try {
                    c = "function" == typeof clearTimeout ? clearTimeout : n
                } catch (t) {
                    c = n
                }
            }();
            var f, p = [],
                g = !1,
                v = -1;
            d.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (1 < arguments.length)
                        for (var r = 1; r < arguments.length; r++)
                            e[r - 1] = arguments[r];
                    p.push(new h(t, e)),
                        1 !== p.length || g || s(a)
                },
                h.prototype.run = function() {
                    this.fun.apply(null, this.array)
                },
                d.title = "browser",
                d.browser = !0,
                d.env = {},
                d.argv = [],
                d.version = "",
                d.versions = {},
                d.on = u,
                d.addListener = u,
                d.once = u,
                d.off = u,
                d.removeListener = u,
                d.removeAllListeners = u,
                d.emit = u,
                d.prependListener = u,
                d.prependOnceListener = u,
                d.listeners = function(t) {
                    return []
                },
                d.binding = function(t) {
                    throw new Error("process.binding is not supported")
                },
                d.cwd = function() {
                    return "/"
                },
                d.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                },
                d.umask = function() {
                    return 0
                }
        }, {}],
        29: [function(t, e, r) {
            "use strict";
            e.exports = function(t, e, r, n) {
                e = e || "&",
                    r = r || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length)
                    return s;
                var o = /\+/g;
                t = t.split(e);
                var a = 1e3;
                n && "number" == typeof n.maxKeys && (a = n.maxKeys);
                var h, u, l = t.length;
                0 < a && a < l && (l = a);
                for (var c = 0; c < l; ++c) {
                    var d, f, p, g, v = t[c].replace(o, "%20"),
                        _ = v.indexOf(r);
                    f = 0 <= _ ? (d = v.substr(0, _),
                            v.substr(_ + 1)) : (d = v,
                            ""),
                        p = decodeURIComponent(d),
                        g = decodeURIComponent(f),
                        h = s,
                        u = p,
                        Object.prototype.hasOwnProperty.call(h, u) ? i(s[p]) ? s[p].push(g) : s[p] = [s[p], g] : s[p] = g
                }
                return s
            };
            var i = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}],
        30: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                if (t.map)
                    return t.map(e);
                for (var r = [], i = 0; i < t.length; i++)
                    r.push(e(t[i], i));
                return r
            }
            var n = function(t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "boolean":
                        return t ? "true" : "false";
                    case "number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            e.exports = function(t, e, r, a) {
                return e = e || "&",
                    r = r || "=",
                    null === t && (t = void 0),
                    "object" == typeof t ? i(o(t), function(o) {
                        var a = encodeURIComponent(n(o)) + r;
                        return s(t[o]) ? i(t[o], function(t) {
                            return a + encodeURIComponent(n(t))
                        }).join(e) : a + encodeURIComponent(n(t[o]))
                    }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : ""
            };
            var s = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                o = Object.keys || function(t) {
                    var e = [];
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
                    return e
                }
        }, {}],
        31: [function(t, e, r) {
            "use strict";
            r.decode = r.parse = t("./decode"),
                r.encode = r.stringify = t("./encode")
        }, {
            "./decode": 29,
            "./encode": 30
        }],
        32: [function(t, e, r) {
            "use strict";
            e.exports = function(t, e, r) {
                var i, n = t.length;
                if (!(n <= e || 0 === r)) {
                    var s = n - (r = n < e + r ? n - e : r);
                    for (i = e; i < s; ++i)
                        t[i] = t[i + r];
                    t.length = s
                }
            }
        }, {}],
        33: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.Loader = void 0;
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } :
                function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                o = i(t("mini-signals")),
                a = i(t("parse-uri")),
                h = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("./async")),
                u = t("./Resource"),
                l = /(#[\w-]+)?$/,
                c = r.Loader = function() {
                    function t() {
                        var e = this,
                            r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 10;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.baseUrl = r,
                            this.progress = 0,
                            this.loading = !1,
                            this.defaultQueryString = "",
                            this._beforeMiddleware = [],
                            this._afterMiddleware = [],
                            this._resourcesParsing = [],
                            this._boundLoadResource = function(t, r) {
                                return e._loadResource(t, r)
                            },
                            this._queue = h.queue(this._boundLoadResource, i),
                            this._queue.pause(),
                            this.resources = {},
                            this.onProgress = new o.default,
                            this.onError = new o.default,
                            this.onLoad = new o.default,
                            this.onStart = new o.default,
                            this.onComplete = new o.default;
                        for (var n = 0; n < t._defaultBeforeMiddleware.length; ++n)
                            this.pre(t._defaultBeforeMiddleware[n]);
                        for (var s = 0; s < t._defaultAfterMiddleware.length; ++s)
                            this.use(t._defaultAfterMiddleware[s])
                    }
                    return t.prototype.add = function(t, e, r, i) {
                            if (Array.isArray(t)) {
                                for (var s = 0; s < t.length; ++s)
                                    this.add(t[s]);
                                return this
                            }
                            if ("object" === (void 0 === t ? "undefined" : n(t)) && (i = e || t.callback || t.onComplete,
                                    e = (r = t).url,
                                    t = t.name || t.key || t.url),
                                "string" != typeof e && (i = r,
                                    r = e,
                                    e = t),
                                "string" != typeof e)
                                throw new Error("No url passed to add resource to loader.");
                            if ("function" == typeof r && (i = r,
                                    r = null),
                                this.loading && (!r || !r.parentResource))
                                throw new Error("Cannot add resources while the loader is running.");
                            if (this.resources[t])
                                throw new Error('Resource named "' + t + '" already exists.');
                            if (e = this._prepareUrl(e),
                                this.resources[t] = new u.Resource(t, e, r),
                                "function" == typeof i && this.resources[t].onAfterMiddleware.once(i),
                                this.loading) {
                                for (var o = r.parentResource, a = [], h = 0; h < o.children.length; ++h)
                                    o.children[h].isComplete || a.push(o.children[h]);
                                var l = o.progressChunk * (a.length + 1) / (a.length + 2);
                                o.children.push(this.resources[t]),
                                    o.progressChunk = l;
                                for (var c = 0; c < a.length; ++c)
                                    a[c].progressChunk = l;
                                this.resources[t].progressChunk = l
                            }
                            return this._queue.push(this.resources[t]),
                                this
                        },
                        t.prototype.pre = function(t) {
                            return this._beforeMiddleware.push(t),
                                this
                        },
                        t.prototype.use = function(t) {
                            return this._afterMiddleware.push(t),
                                this
                        },
                        t.prototype.reset = function() {
                            for (var t in this.progress = 0,
                                    this.loading = !1,
                                    this._queue.kill(),
                                    this._queue.pause(),
                                    this.resources) {
                                var e = this.resources[t];
                                e._onLoadBinding && e._onLoadBinding.detach(),
                                    e.isLoading && e.abort()
                            }
                            return this.resources = {},
                                this
                        },
                        t.prototype.load = function(t) {
                            if ("function" == typeof t && this.onComplete.once(t),
                                this.loading)
                                return this;
                            if (this._queue.idle())
                                this._onStart(),
                                this._onComplete();
                            else {
                                for (var e = 100 / this._queue._tasks.length, r = 0; r < this._queue._tasks.length; ++r)
                                    this._queue._tasks[r].data.progressChunk = e;
                                this._onStart(),
                                    this._queue.resume()
                            }
                            return this
                        },
                        t.prototype._prepareUrl = function(t) {
                            var e = (0,
                                    a.default)(t, {
                                    strictMode: !0
                                }),
                                r = void 0;
                            if (r = e.protocol || !e.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t,
                                this.defaultQueryString) {
                                var i = l.exec(r)[0]; -
                                1 !== (r = r.substr(0, r.length - i.length)).indexOf("?") ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString,
                                    r += i
                            }
                            return r
                        },
                        t.prototype._loadResource = function(t, e) {
                            var r = this;
                            t._dequeue = e,
                                h.eachSeries(this._beforeMiddleware, function(e, i) {
                                    e.call(r, t, function() {
                                        i(t.isComplete ? {} : null)
                                    })
                                }, function() {
                                    t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r),
                                        t.load())
                                }, !0)
                        },
                        t.prototype._onStart = function() {
                            this.progress = 0,
                                this.loading = !0,
                                this.onStart.dispatch(this)
                        },
                        t.prototype._onComplete = function() {
                            this.progress = 100,
                                this.loading = !1,
                                this.onComplete.dispatch(this, this.resources)
                        },
                        t.prototype._onLoad = function(t) {
                            var e = this;
                            t._onLoadBinding = null,
                                this._resourcesParsing.push(t),
                                t._dequeue(),
                                h.eachSeries(this._afterMiddleware, function(r, i) {
                                    r.call(e, t, i)
                                }, function() {
                                    t.onAfterMiddleware.dispatch(t),
                                        e.progress = Math.min(100, e.progress + t.progressChunk),
                                        e.onProgress.dispatch(e, t),
                                        t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t),
                                        e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1),
                                        e._queue.idle() && 0 === e._resourcesParsing.length && e._onComplete()
                                }, !0)
                        },
                        s(t, [{
                            key: "concurrency",
                            get: function() {
                                return this._queue.concurrency
                            },
                            set: function(t) {
                                this._queue.concurrency = t
                            }
                        }]),
                        t
                }();
            c._defaultBeforeMiddleware = [],
                c._defaultAfterMiddleware = [],
                c.pre = function(t) {
                    return c._defaultBeforeMiddleware.push(t),
                        c
                },
                c.use = function(t) {
                    return c._defaultAfterMiddleware.push(t),
                        c
                }
        }, {
            "./Resource": 34,
            "./async": 35,
            "mini-signals": 7,
            "parse-uri": 9
        }],
        34: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function n() {}

            function s(t, e, r) {
                e && 0 === e.indexOf(".") && (e = e.substring(1)),
                    e && (t[e] = r)
            }

            function o(t) {
                return t.toString().replace("object ", "")
            }
            r.__esModule = !0,
                r.Resource = void 0;
            var a = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                h = i(t("parse-uri")),
                u = i(t("mini-signals")),
                l = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest),
                c = null,
                d = r.Resource = function() {
                    function t(e, r, i) {
                        if (function(e, r) {
                                if (!(e instanceof t))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this),
                            "string" != typeof e || "string" != typeof r)
                            throw new Error("Both name and url are required for constructing a resource.");
                        i = i || {},
                            this._flags = 0,
                            this._setFlag(t.STATUS_FLAGS.DATA_URL, 0 === r.indexOf("data:")),
                            this.name = e,
                            this.url = r,
                            this.extension = this._getExtension(),
                            this.data = null,
                            this.crossOrigin = !0 === i.crossOrigin ? "anonymous" : i.crossOrigin,
                            this.timeout = i.timeout || 0,
                            this.loadType = i.loadType || this._determineLoadType(),
                            this.xhrType = i.xhrType,
                            this.metadata = i.metadata || {},
                            this.error = null,
                            this.xhr = null,
                            this.children = [],
                            this.type = t.TYPE.UNKNOWN,
                            this.progressChunk = 0,
                            this._dequeue = n,
                            this._onLoadBinding = null,
                            this._elementTimer = 0,
                            this._boundComplete = this.complete.bind(this),
                            this._boundOnError = this._onError.bind(this),
                            this._boundOnProgress = this._onProgress.bind(this),
                            this._boundOnTimeout = this._onTimeout.bind(this),
                            this._boundXhrOnError = this._xhrOnError.bind(this),
                            this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this),
                            this._boundXhrOnAbort = this._xhrOnAbort.bind(this),
                            this._boundXhrOnLoad = this._xhrOnLoad.bind(this),
                            this.onStart = new u.default,
                            this.onProgress = new u.default,
                            this.onComplete = new u.default,
                            this.onAfterMiddleware = new u.default
                    }
                    return t.setExtensionLoadType = function(e, r) {
                            s(t._loadTypeMap, e, r)
                        },
                        t.setExtensionXhrType = function(e, r) {
                            s(t._xhrTypeMap, e, r)
                        },
                        t.prototype.complete = function() {
                            this._clearEvents(),
                                this._finish()
                        },
                        t.prototype.abort = function(e) {
                            if (!this.error) {
                                if (this.error = new Error(e),
                                    this._clearEvents(),
                                    this.xhr)
                                    this.xhr.abort();
                                else if (this.xdr)
                                    this.xdr.abort();
                                else if (this.data)
                                    if (this.data.src)
                                        this.data.src = t.EMPTY_GIF;
                                    else
                                        for (; this.data.firstChild;)
                                            this.data.removeChild(this.data.firstChild);
                                this._finish()
                            }
                        },
                        t.prototype.load = function(e) {
                            var r = this;
                            if (!this.isLoading) {
                                if (this.isComplete)
                                    return void(e && setTimeout(function() {
                                        return e(r)
                                    }, 1));
                                switch (e && this.onComplete.once(e),
                                    this._setFlag(t.STATUS_FLAGS.LOADING, !0),
                                    this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)),
                                    this.loadType) {
                                    case t.LOAD_TYPE.IMAGE:
                                        this.type = t.TYPE.IMAGE,
                                            this._loadElement("image");
                                        break;
                                    case t.LOAD_TYPE.AUDIO:
                                        this.type = t.TYPE.AUDIO,
                                            this._loadSourceElement("audio");
                                        break;
                                    case t.LOAD_TYPE.VIDEO:
                                        this.type = t.TYPE.VIDEO,
                                            this._loadSourceElement("video");
                                        break;
                                    case t.LOAD_TYPE.XHR:
                                    default:
                                        l && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                                }
                            }
                        },
                        t.prototype._hasFlag = function(t) {
                            return 0 != (this._flags & t)
                        },
                        t.prototype._setFlag = function(t, e) {
                            this._flags = e ? this._flags | t : this._flags & ~t
                        },
                        t.prototype._clearEvents = function() {
                            clearTimeout(this._elementTimer),
                                this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1),
                                    this.data.removeEventListener("load", this._boundComplete, !1),
                                    this.data.removeEventListener("progress", this._boundOnProgress, !1),
                                    this.data.removeEventListener("canplaythrough", this._boundComplete, !1)),
                                this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1),
                                    this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1),
                                    this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1),
                                    this.xhr.removeEventListener("progress", this._boundOnProgress, !1),
                                    this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null,
                                    this.xhr.ontimeout = null,
                                    this.xhr.onprogress = null,
                                    this.xhr.onload = null))
                        },
                        t.prototype._finish = function() {
                            if (this.isComplete)
                                throw new Error("Complete called again for an already completed resource.");
                            this._setFlag(t.STATUS_FLAGS.COMPLETE, !0),
                                this._setFlag(t.STATUS_FLAGS.LOADING, !1),
                                this.onComplete.dispatch(this)
                        },
                        t.prototype._loadElement = function(t) {
                            this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(t),
                                this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
                                this.metadata.skipSource || (this.data.src = this.url),
                                this.data.addEventListener("error", this._boundOnError, !1),
                                this.data.addEventListener("load", this._boundComplete, !1),
                                this.data.addEventListener("progress", this._boundOnProgress, !1),
                                this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
                        },
                        t.prototype._loadSourceElement = function(t) {
                            if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(t),
                                null !== this.data) {
                                if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource)
                                    if (navigator.isCocoonJS)
                                        this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                                    else if (Array.isArray(this.url))
                                    for (var e = this.metadata.mimeType, r = 0; r < this.url.length; ++r)
                                        this.data.appendChild(this._createSource(t, this.url[r], Array.isArray(e) ? e[r] : e));
                                else {
                                    var i = this.metadata.mimeType;
                                    this.data.appendChild(this._createSource(t, this.url, Array.isArray(i) ? i[0] : i))
                                }
                                this.data.addEventListener("error", this._boundOnError, !1),
                                    this.data.addEventListener("load", this._boundComplete, !1),
                                    this.data.addEventListener("progress", this._boundOnProgress, !1),
                                    this.data.addEventListener("canplaythrough", this._boundComplete, !1),
                                    this.data.load(),
                                    this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
                            } else
                                this.abort("Unsupported element: " + t)
                        },
                        t.prototype._loadXhr = function() {
                            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                            var e = this.xhr = new XMLHttpRequest;
                            e.open("GET", this.url, !0),
                                e.timeout = this.timeout,
                                this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = t.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType,
                                e.addEventListener("error", this._boundXhrOnError, !1),
                                e.addEventListener("timeout", this._boundXhrOnTimeout, !1),
                                e.addEventListener("abort", this._boundXhrOnAbort, !1),
                                e.addEventListener("progress", this._boundOnProgress, !1),
                                e.addEventListener("load", this._boundXhrOnLoad, !1),
                                e.send()
                        },
                        t.prototype._loadXdr = function() {
                            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                            var t = this.xhr = new XDomainRequest;
                            t.timeout = this.timeout || 5e3,
                                t.onerror = this._boundXhrOnError,
                                t.ontimeout = this._boundXhrOnTimeout,
                                t.onprogress = this._boundOnProgress,
                                t.onload = this._boundXhrOnLoad,
                                t.open("GET", this.url, !0),
                                setTimeout(function() {
                                    return t.send()
                                }, 1)
                        },
                        t.prototype._createSource = function(t, e, r) {
                            r || (r = t + "/" + this._getExtension(e));
                            var i = document.createElement("source");
                            return i.src = e,
                                i.type = r,
                                i
                        },
                        t.prototype._onError = function(t) {
                            this.abort("Failed to load element using: " + t.target.nodeName)
                        },
                        t.prototype._onProgress = function(t) {
                            t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total)
                        },
                        t.prototype._onTimeout = function() {
                            this.abort("Load timed out.")
                        },
                        t.prototype._xhrOnError = function() {
                            var t = this.xhr;
                            this.abort(o(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
                        },
                        t.prototype._xhrOnTimeout = function() {
                            var t = this.xhr;
                            this.abort(o(t) + " Request timed out.")
                        },
                        t.prototype._xhrOnAbort = function() {
                            var t = this.xhr;
                            this.abort(o(t) + " Request was aborted by the user.")
                        },
                        t.prototype._xhrOnLoad = function() {
                            var e = this.xhr,
                                r = "",
                                i = void 0 === e.status ? 200 : e.status;
                            if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (r = e.responseText),
                                0 === i && (0 < r.length || e.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? i = 200 : 1223 === i && (i = 204),
                                2 == (i / 100 | 0)) {
                                if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT)
                                    this.data = r,
                                    this.type = t.TYPE.TEXT;
                                else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON)
                                    try {
                                        this.data = JSON.parse(r),
                                            this.type = t.TYPE.JSON
                                    } catch (e) {
                                        return void this.abort("Error trying to parse loaded json: " + e)
                                    }
                                else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT)
                                    try {
                                        if (window.DOMParser) {
                                            var n = new DOMParser;
                                            this.data = n.parseFromString(r, "text/xml")
                                        } else {
                                            var s = document.createElement("div");
                                            s.innerHTML = r,
                                                this.data = s
                                        }
                                        this.type = t.TYPE.XML
                                    } catch (e) {
                                        return void this.abort("Error trying to parse loaded xml: " + e)
                                    }
                                else
                                    this.data = e.response || r;
                                this.complete()
                            } else
                                this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL)
                        },
                        t.prototype._determineCrossOrigin = function(t, e) {
                            if (0 === t.indexOf("data:"))
                                return "";
                            if (window.origin !== window.location.origin)
                                return "anonymous";
                            e = e || window.location,
                                c || (c = document.createElement("a")),
                                c.href = t;
                            var r = !(t = (0,
                                    h.default)(c.href, {
                                    strictMode: !0
                                })).port && "" === e.port || t.port === e.port,
                                i = t.protocol ? t.protocol + ":" : "";
                            return t.host === e.hostname && r && i === e.protocol ? "" : "anonymous"
                        },
                        t.prototype._determineXhrType = function() {
                            return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT
                        },
                        t.prototype._determineLoadType = function() {
                            return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR
                        },
                        t.prototype._getExtension = function() {
                            var t = this.url,
                                e = "";
                            if (this.isDataUrl) {
                                var r = t.indexOf("/");
                                e = t.substring(r + 1, t.indexOf(";", r))
                            } else {
                                var i = t.indexOf("?"),
                                    n = t.indexOf("#"),
                                    s = Math.min(-1 < i ? i : t.length, -1 < n ? n : t.length);
                                e = (t = t.substring(0, s)).substring(t.lastIndexOf(".") + 1)
                            }
                            return e.toLowerCase()
                        },
                        t.prototype._getMimeFromXhrType = function(e) {
                            switch (e) {
                                case t.XHR_RESPONSE_TYPE.BUFFER:
                                    return "application/octet-binary";
                                case t.XHR_RESPONSE_TYPE.BLOB:
                                    return "application/blob";
                                case t.XHR_RESPONSE_TYPE.DOCUMENT:
                                    return "application/xml";
                                case t.XHR_RESPONSE_TYPE.JSON:
                                    return "application/json";
                                case t.XHR_RESPONSE_TYPE.DEFAULT:
                                case t.XHR_RESPONSE_TYPE.TEXT:
                                default:
                                    return "text/plain"
                            }
                        },
                        a(t, [{
                            key: "isDataUrl",
                            get: function() {
                                return this._hasFlag(t.STATUS_FLAGS.DATA_URL)
                            }
                        }, {
                            key: "isComplete",
                            get: function() {
                                return this._hasFlag(t.STATUS_FLAGS.COMPLETE)
                            }
                        }, {
                            key: "isLoading",
                            get: function() {
                                return this._hasFlag(t.STATUS_FLAGS.LOADING)
                            }
                        }]),
                        t
                }();
            d.STATUS_FLAGS = {
                    NONE: 0,
                    DATA_URL: 1,
                    COMPLETE: 2,
                    LOADING: 4
                },
                d.TYPE = {
                    UNKNOWN: 0,
                    JSON: 1,
                    XML: 2,
                    IMAGE: 3,
                    AUDIO: 4,
                    VIDEO: 5,
                    TEXT: 6
                },
                d.LOAD_TYPE = {
                    XHR: 1,
                    IMAGE: 2,
                    AUDIO: 3,
                    VIDEO: 4
                },
                d.XHR_RESPONSE_TYPE = {
                    DEFAULT: "text",
                    BUFFER: "arraybuffer",
                    BLOB: "blob",
                    DOCUMENT: "document",
                    JSON: "json",
                    TEXT: "text"
                },
                d._loadTypeMap = {
                    gif: d.LOAD_TYPE.IMAGE,
                    png: d.LOAD_TYPE.IMAGE,
                    bmp: d.LOAD_TYPE.IMAGE,
                    jpg: d.LOAD_TYPE.IMAGE,
                    jpeg: d.LOAD_TYPE.IMAGE,
                    tif: d.LOAD_TYPE.IMAGE,
                    tiff: d.LOAD_TYPE.IMAGE,
                    webp: d.LOAD_TYPE.IMAGE,
                    tga: d.LOAD_TYPE.IMAGE,
                    svg: d.LOAD_TYPE.IMAGE,
                    "svg+xml": d.LOAD_TYPE.IMAGE,
                    mp3: d.LOAD_TYPE.AUDIO,
                    ogg: d.LOAD_TYPE.AUDIO,
                    wav: d.LOAD_TYPE.AUDIO,
                    mp4: d.LOAD_TYPE.VIDEO,
                    webm: d.LOAD_TYPE.VIDEO
                },
                d._xhrTypeMap = {
                    xhtml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    html: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    htm: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    xml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    tmx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    svg: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    tsx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                    gif: d.XHR_RESPONSE_TYPE.BLOB,
                    png: d.XHR_RESPONSE_TYPE.BLOB,
                    bmp: d.XHR_RESPONSE_TYPE.BLOB,
                    jpg: d.XHR_RESPONSE_TYPE.BLOB,
                    jpeg: d.XHR_RESPONSE_TYPE.BLOB,
                    tif: d.XHR_RESPONSE_TYPE.BLOB,
                    tiff: d.XHR_RESPONSE_TYPE.BLOB,
                    webp: d.XHR_RESPONSE_TYPE.BLOB,
                    tga: d.XHR_RESPONSE_TYPE.BLOB,
                    json: d.XHR_RESPONSE_TYPE.JSON,
                    text: d.XHR_RESPONSE_TYPE.TEXT,
                    txt: d.XHR_RESPONSE_TYPE.TEXT,
                    ttf: d.XHR_RESPONSE_TYPE.BUFFER,
                    otf: d.XHR_RESPONSE_TYPE.BUFFER
                },
                d.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                void 0 !== e && (e.exports.default = d)
        }, {
            "mini-signals": 7,
            "parse-uri": 9
        }],
        35: [function(t, e, r) {
            "use strict";

            function i() {}

            function n(t) {
                return function() {
                    if (null === t)
                        throw new Error("Callback was already called.");
                    var e = t;
                    t = null,
                        e.apply(this, arguments)
                }
            }
            r.__esModule = !0,
                r.eachSeries = function(t, e, r, i) {
                    var n = 0,
                        s = t.length;
                    ! function o(a) {
                        a || n === s ? r && r(a) : i ? setTimeout(function() {
                            e(t[n++], o)
                        }, 1) : e(t[n++], o)
                    }()
                },
                r.queue = function(t, e) {
                    function r(t, e, r) {
                        if (null != r && "function" != typeof r)
                            throw new Error("task callback must be a function");
                        if (a.started = !0,
                            null == t && a.idle())
                            setTimeout(function() {
                                return a.drain()
                            }, 1);
                        else {
                            var n = {
                                data: t,
                                callback: "function" == typeof r ? r : i
                            };
                            e ? a._tasks.unshift(n) : a._tasks.push(n),
                                setTimeout(function() {
                                    return a.process()
                                }, 1)
                        }
                    }

                    function s(t) {
                        return function() {
                            o -= 1,
                                t.callback.apply(t, arguments),
                                null != arguments[0] && a.error(arguments[0], t.data),
                                o <= a.concurrency - a.buffer && a.unsaturated(),
                                a.idle() && a.drain(),
                                a.process()
                        }
                    }
                    if (null == e)
                        e = 1;
                    else if (0 === e)
                        throw new Error("Concurrency must not be zero");
                    var o = 0,
                        a = {
                            _tasks: [],
                            concurrency: e,
                            saturated: i,
                            unsaturated: i,
                            buffer: e / 4,
                            empty: i,
                            drain: i,
                            error: i,
                            started: !1,
                            paused: !1,
                            push: function(t, e) {
                                r(t, !1, e)
                            },
                            kill: function() {
                                o = 0,
                                    a.drain = i,
                                    a.started = !1,
                                    a._tasks = []
                            },
                            unshift: function(t, e) {
                                r(t, !0, e)
                            },
                            process: function() {
                                for (; !a.paused && o < a.concurrency && a._tasks.length;) {
                                    var e = a._tasks.shift();
                                    0 === a._tasks.length && a.empty(),
                                        (o += 1) === a.concurrency && a.saturated(),
                                        t(e.data, n(s(e)))
                                }
                            },
                            length: function() {
                                return a._tasks.length
                            },
                            running: function() {
                                return o
                            },
                            idle: function() {
                                return a._tasks.length + o === 0
                            },
                            pause: function() {
                                !0 !== a.paused && (a.paused = !0)
                            },
                            resume: function() {
                                if (!1 !== a.paused) {
                                    a.paused = !1;
                                    for (var t = 1; t <= a.concurrency; t++)
                                        a.process()
                                }
                            }
                        };
                    return a
                }
        }, {}],
        36: [function(t, e, r) {
            "use strict";

            function i(t) {
                for (var e = "", r = 0; r < t.length;) {
                    for (var i = [0, 0, 0], s = [0, 0, 0, 0], o = 0; o < i.length; ++o)
                        r < t.length ? i[o] = 255 & t.charCodeAt(r++) : i[o] = 0;
                    switch (s[0] = i[0] >> 2,
                        s[1] = (3 & i[0]) << 4 | i[1] >> 4,
                        s[2] = (15 & i[1]) << 2 | i[2] >> 6,
                        s[3] = 63 & i[2],
                        r - (t.length - 1)) {
                        case 2:
                            s[3] = 64,
                                s[2] = 64;
                            break;
                        case 1:
                            s[3] = 64
                    }
                    for (var a = 0; a < s.length; ++a)
                        e += n.charAt(s[a])
                }
                return e
            }
            r.__esModule = !0,
                r.encodeBinary = i;
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            void 0 !== e && (e.exports.default = i)
        }, {}],
        37: [function(t, e, r) {
            "use strict";
            var i = t("./Loader").Loader,
                n = t("./Resource").Resource,
                s = t("./async"),
                o = t("./b64");
            i.Resource = n,
                i.async = s,
                i.encodeBinary = o,
                i.base64 = o,
                e.exports = i,
                e.exports.Loader = i,
                e.exports.default = i
        }, {
            "./Loader": 33,
            "./Resource": 34,
            "./async": 35,
            "./b64": 36
        }],
        38: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.blobMiddlewareFactory = function() {
                    return function(t, e) {
                        if (t.data) {
                            if (t.xhr && t.xhrType === i.Resource.XHR_RESPONSE_TYPE.BLOB)
                                if (window.Blob && "string" != typeof t.data) {
                                    if (0 === t.data.type.indexOf("image")) {
                                        var r = s.createObjectURL(t.data);
                                        return t.blob = t.data,
                                            t.data = new Image,
                                            t.data.src = r,
                                            t.type = i.Resource.TYPE.IMAGE,
                                            void(t.data.onload = function() {
                                                s.revokeObjectURL(r),
                                                    t.data.onload = null,
                                                    e()
                                            })
                                    }
                                } else {
                                    var o = t.xhr.getResponseHeader("content-type");
                                    if (o && 0 === o.indexOf("image"))
                                        return t.data = new Image,
                                            t.data.src = "data:" + o + ";base64," + (0,
                                                n.encodeBinary)(t.xhr.responseText),
                                            t.type = i.Resource.TYPE.IMAGE,
                                            void(t.data.onload = function() {
                                                t.data.onload = null,
                                                    e()
                                            })
                                }
                            e()
                        } else
                            e()
                    }
                };
            var i = t("../../Resource"),
                n = t("../../b64"),
                s = window.URL || window.webkitURL
        }, {
            "../../Resource": 34,
            "../../b64": 36
        }],
        39: [function(t, e, r) {
            "use strict";

            function i() {
                this.protocol = null,
                    this.slashes = null,
                    this.auth = null,
                    this.host = null,
                    this.port = null,
                    this.hostname = null,
                    this.hash = null,
                    this.search = null,
                    this.query = null,
                    this.pathname = null,
                    this.path = null,
                    this.href = null
            }

            function n(t, e, r) {
                if (t && o.isObject(t) && t instanceof i)
                    return t;
                var n = new i;
                return n.parse(t, e, r),
                    n
            }
            var s = t("punycode"),
                o = t("./util");
            r.parse = n,
                r.resolve = function(t, e) {
                    return n(t, !1, !0).resolve(e)
                },
                r.resolveObject = function(t, e) {
                    return t ? n(t, !1, !0).resolveObject(e) : e
                },
                r.format = function(t) {
                    return o.isString(t) && (t = n(t)),
                        t instanceof i ? t.format() : i.prototype.format.call(t)
                },
                r.Url = i;
            var a = /^([a-z0-9.+-]+:)/i,
                h = /:[0-9]*$/,
                u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                l = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
                c = ["'"].concat(l),
                d = ["%", "/", "?", ";", "#"].concat(c),
                f = ["/", "?", "#"],
                p = /^[+a-z0-9A-Z_-]{0,63}$/,
                g = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                v = {
                    javascript: !0,
                    "javascript:": !0
                },
                _ = {
                    javascript: !0,
                    "javascript:": !0
                },
                m = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                },
                y = t("querystring");
            i.prototype.parse = function(t, e, r) {
                    if (!o.isString(t))
                        throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                    var i = t.indexOf("?"),
                        n = -1 !== i && i < t.indexOf("#") ? "?" : "#",
                        h = t.split(n);
                    h[0] = h[0].replace(/\\/g, "/");
                    var l = t = h.join(n);
                    if (l = l.trim(), !r && 1 === t.split("#").length) {
                        var x = u.exec(l);
                        if (x)
                            return this.path = l,
                                this.href = l,
                                this.pathname = x[1],
                                x[2] ? (this.search = x[2],
                                    this.query = e ? y.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "",
                                    this.query = {}),
                                this
                    }
                    var b = a.exec(l);
                    if (b) {
                        var T = (b = b[0]).toLowerCase();
                        this.protocol = T,
                            l = l.substr(b.length)
                    }
                    if (r || b || l.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                        var E = "//" === l.substr(0, 2);
                        !E || b && _[b] || (l = l.substr(2),
                            this.slashes = !0)
                    }
                    if (!_[b] && (E || b && !m[b])) {
                        for (var w = -1, S = 0; S < f.length; S++)
                            -
                            1 !== (C = l.indexOf(f[S])) && (-1 === w || C < w) && (w = C);
                        var O, P;
                        for (-1 !== (P = -1 === w ? l.lastIndexOf("@") : l.lastIndexOf("@", w)) && (O = l.slice(0, P),
                                l = l.slice(P + 1),
                                this.auth = decodeURIComponent(O)),
                            w = -1,
                            S = 0; S < d.length; S++) {
                            var C; -
                            1 !== (C = l.indexOf(d[S])) && (-1 === w || C < w) && (w = C)
                        } -
                        1 === w && (w = l.length),
                            this.host = l.slice(0, w),
                            l = l.slice(w),
                            this.parseHost(),
                            this.hostname = this.hostname || "";
                        var R = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                        if (!R)
                            for (var M = this.hostname.split(/\./), A = (S = 0,
                                    M.length); S < A; S++) {
                                var D = M[S];
                                if (D && !D.match(p)) {
                                    for (var I = "", L = 0, k = D.length; L < k; L++)
                                        127 < D.charCodeAt(L) ? I += "x" : I += D[L];
                                    if (!I.match(p)) {
                                        var N = M.slice(0, S),
                                            B = M.slice(S + 1),
                                            U = D.match(g);
                                        U && (N.push(U[1]),
                                                B.unshift(U[2])),
                                            B.length && (l = "/" + B.join(".") + l),
                                            this.hostname = N.join(".");
                                        break
                                    }
                                }
                            }
                        255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
                            R || (this.hostname = s.toASCII(this.hostname));
                        var F = this.port ? ":" + this.port : "",
                            j = this.hostname || "";
                        this.host = j + F,
                            this.href += this.host,
                            R && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
                                "/" !== l[0] && (l = "/" + l))
                    }
                    if (!v[T])
                        for (S = 0,
                            A = c.length; S < A; S++) {
                            var G = c[S];
                            if (-1 !== l.indexOf(G)) {
                                var X = encodeURIComponent(G);
                                X === G && (X = escape(G)),
                                    l = l.split(G).join(X)
                            }
                        }
                    var V = l.indexOf("#"); -
                    1 !== V && (this.hash = l.substr(V),
                        l = l.slice(0, V));
                    var W = l.indexOf("?");
                    if (-1 !== W ? (this.search = l.substr(W),
                            this.query = l.substr(W + 1),
                            e && (this.query = y.parse(this.query)),
                            l = l.slice(0, W)) : e && (this.search = "",
                            this.query = {}),
                        l && (this.pathname = l),
                        m[T] && this.hostname && !this.pathname && (this.pathname = "/"),
                        this.pathname || this.search) {
                        F = this.pathname || "";
                        var H = this.search || "";
                        this.path = F + H
                    }
                    return this.href = this.format(),
                        this
                },
                i.prototype.format = function() {
                    var t = this.auth || "";
                    t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"),
                        t += "@");
                    var e = this.protocol || "",
                        r = this.pathname || "",
                        i = this.hash || "",
                        n = !1,
                        s = "";
                    this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
                            this.port && (n += ":" + this.port)),
                        this.query && o.isObject(this.query) && Object.keys(this.query).length && (s = y.stringify(this.query));
                    var a = this.search || s && "?" + s || "";
                    return e && ":" !== e.substr(-1) && (e += ":"),
                        this.slashes || (!e || m[e]) && !1 !== n ? (n = "//" + (n || ""),
                            r && "/" !== r.charAt(0) && (r = "/" + r)) : n || (n = ""),
                        i && "#" !== i.charAt(0) && (i = "#" + i),
                        a && "?" !== a.charAt(0) && (a = "?" + a),
                        e + n + (r = r.replace(/[?#]/g, function(t) {
                            return encodeURIComponent(t)
                        })) + (a = a.replace("#", "%23")) + i
                },
                i.prototype.resolve = function(t) {
                    return this.resolveObject(n(t, !1, !0)).format()
                },
                i.prototype.resolveObject = function(t) {
                    if (o.isString(t)) {
                        var e = new i;
                        e.parse(t, !1, !0),
                            t = e
                    }
                    for (var r = new i, n = Object.keys(this), s = 0; s < n.length; s++) {
                        var a = n[s];
                        r[a] = this[a]
                    }
                    if (r.hash = t.hash,
                        "" === t.href)
                        return r.href = r.format(),
                            r;
                    if (t.slashes && !t.protocol) {
                        for (var h = Object.keys(t), u = 0; u < h.length; u++) {
                            var l = h[u];
                            "protocol" !== l && (r[l] = t[l])
                        }
                        return m[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"),
                            r.href = r.format(),
                            r
                    }
                    if (t.protocol && t.protocol !== r.protocol) {
                        if (!m[t.protocol]) {
                            for (var c = Object.keys(t), d = 0; d < c.length; d++) {
                                var f = c[d];
                                r[f] = t[f]
                            }
                            return r.href = r.format(),
                                r
                        }
                        if (r.protocol = t.protocol,
                            t.host || _[t.protocol])
                            r.pathname = t.pathname;
                        else {
                            for (var p = (t.pathname || "").split("/"); p.length && !(t.host = p.shift());)
                            ;
                            t.host || (t.host = ""),
                                t.hostname || (t.hostname = ""),
                                "" !== p[0] && p.unshift(""),
                                p.length < 2 && p.unshift(""),
                                r.pathname = p.join("/")
                        }
                        if (r.search = t.search,
                            r.query = t.query,
                            r.host = t.host || "",
                            r.auth = t.auth,
                            r.hostname = t.hostname || t.host,
                            r.port = t.port,
                            r.pathname || r.search) {
                            var g = r.pathname || "",
                                v = r.search || "";
                            r.path = g + v
                        }
                        return r.slashes = r.slashes || t.slashes,
                            r.href = r.format(),
                            r
                    }
                    var y = r.pathname && "/" === r.pathname.charAt(0),
                        x = t.host || t.pathname && "/" === t.pathname.charAt(0),
                        b = x || y || r.host && t.pathname,
                        T = b,
                        E = r.pathname && r.pathname.split("/") || [],
                        w = (p = t.pathname && t.pathname.split("/") || [],
                            r.protocol && !m[r.protocol]);
                    if (w && (r.hostname = "",
                            r.port = null,
                            r.host && ("" === E[0] ? E[0] = r.host : E.unshift(r.host)),
                            r.host = "",
                            t.protocol && (t.hostname = null,
                                t.port = null,
                                t.host && ("" === p[0] ? p[0] = t.host : p.unshift(t.host)),
                                t.host = null),
                            b = b && ("" === p[0] || "" === E[0])),
                        x)
                        r.host = t.host || "" === t.host ? t.host : r.host,
                        r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname,
                        r.search = t.search,
                        r.query = t.query,
                        E = p;
                    else if (p.length)
                        E || (E = []),
                        E.pop(),
                        E = E.concat(p),
                        r.search = t.search,
                        r.query = t.query;
                    else if (!o.isNullOrUndefined(t.search))
                        return w && (r.hostname = r.host = E.shift(),
                                (R = !!(r.host && 0 < r.host.indexOf("@")) && r.host.split("@")) && (r.auth = R.shift(),
                                    r.host = r.hostname = R.shift())),
                            r.search = t.search,
                            r.query = t.query,
                            o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
                            r.href = r.format(),
                            r;
                    if (!E.length)
                        return r.pathname = null,
                            r.search ? r.path = "/" + r.search : r.path = null,
                            r.href = r.format(),
                            r;
                    for (var S = E.slice(-1)[0], O = (r.host || t.host || 1 < E.length) && ("." === S || ".." === S) || "" === S, P = 0, C = E.length; 0 <= C; C--)
                        "." === (S = E[C]) ? E.splice(C, 1) : ".." === S ? (E.splice(C, 1),
                            P++) : P && (E.splice(C, 1),
                            P--);
                    if (!b && !T)
                        for (; P--; P)
                            E.unshift("..");
                    !b || "" === E[0] || E[0] && "/" === E[0].charAt(0) || E.unshift(""),
                        O && "/" !== E.join("/").substr(-1) && E.push("");
                    var R, M = "" === E[0] || E[0] && "/" === E[0].charAt(0);
                    return w && (r.hostname = r.host = M ? "" : E.length ? E.shift() : "",
                            (R = !!(r.host && 0 < r.host.indexOf("@")) && r.host.split("@")) && (r.auth = R.shift(),
                                r.host = r.hostname = R.shift())),
                        (b = b || r.host && E.length) && !M && E.unshift(""),
                        E.length ? r.pathname = E.join("/") : (r.pathname = null,
                            r.path = null),
                        o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
                        r.auth = t.auth || r.auth,
                        r.slashes = r.slashes || t.slashes,
                        r.href = r.format(),
                        r
                },
                i.prototype.parseHost = function() {
                    var t = this.host,
                        e = h.exec(t);
                    e && (":" !== (e = e[0]) && (this.port = e.substr(1)),
                            t = t.substr(0, t.length - e.length)),
                        t && (this.hostname = t)
                }
        }, {
            "./util": 40,
            punycode: 3,
            querystring: 31
        }],
        40: [function(t, e, r) {
            "use strict";
            e.exports = {
                isString: function(t) {
                    return "string" == typeof t
                },
                isObject: function(t) {
                    return "object" == typeof t && null !== t
                },
                isNull: function(t) {
                    return null === t
                },
                isNullOrUndefined: function(t) {
                    return null == t
                }
            }
        }, {}],
        41: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("./autoDetectRenderer"),
                o = i(t("./display/Container")),
                a = t("./ticker"),
                h = i(t("./settings")),
                u = t("./const"),
                l = function() {
                    function t(e, r, i, n, u) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        "number" == typeof e && (e = Object.assign({
                                width: e,
                                height: r || h.default.RENDER_OPTIONS.height,
                                forceCanvas: !!n,
                                sharedTicker: !!u
                            }, i)),
                            this._options = e = Object.assign({
                                sharedTicker: !1,
                                forceCanvas: !1,
                                sharedLoader: !1
                            }, e),
                            this.renderer = (0,
                                s.autoDetectRenderer)(e),
                            this.stage = new o.default,
                            this._ticker = null,
                            this.ticker = e.sharedTicker ? a.shared : new a.Ticker,
                            this.start()
                    }
                    return t.prototype.render = function() {
                            this.renderer.render(this.stage)
                        },
                        t.prototype.stop = function() {
                            this._ticker.stop()
                        },
                        t.prototype.start = function() {
                            this._ticker.start()
                        },
                        t.prototype.destroy = function(t) {
                            var e = this._ticker;
                            this.ticker = null,
                                e.destroy(),
                                this.stage.destroy(),
                                this.stage = null,
                                this.renderer.destroy(t),
                                this.renderer = null,
                                this._options = null
                        },
                        n(t, [{
                            key: "ticker",
                            set: function(t) {
                                this._ticker && this._ticker.remove(this.render, this),
                                    (this._ticker = t) && t.add(this.render, this, u.UPDATE_PRIORITY.LOW)
                            },
                            get: function() {
                                return this._ticker
                            }
                        }, {
                            key: "view",
                            get: function() {
                                return this.renderer.view
                            }
                        }, {
                            key: "screen",
                            get: function() {
                                return this.renderer.screen
                            }
                        }]),
                        t
                }();
            r.default = l
        }, {
            "./autoDetectRenderer": 43,
            "./const": 44,
            "./display/Container": 46,
            "./settings": 99,
            "./ticker": 118
        }],
        42: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                if (t instanceof Array) {
                    if ("precision" !== t[0].substring(0, 9)) {
                        var r = t.slice(0);
                        return r.unshift("precision " + e + " float;"),
                            r
                    }
                } else if ("precision" !== t.substring(0, 9))
                    return "precision " + e + " float;\n" + t;
                return t
            }
            r.__esModule = !0;
            var n, s = t("pixi-gl-core"),
                o = (n = t("./settings")) && n.__esModule ? n : {
                    default: n
                },
                a = function(t) {
                    function e(r, n, s) {
                        return function(t, r) {
                                if (!(t instanceof e))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this),
                            function(t, e) {
                                if (!t)
                                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !e || "object" != typeof e && "function" != typeof e ? t : e
                            }(this, t.call(this, r, i(n, o.default.PRECISION_VERTEX), i(s, o.default.PRECISION_FRAGMENT)))
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e
                }(s.GLShader);
            r.default = a
        }, {
            "./settings": 99,
            "pixi-gl-core": 17
        }],
        43: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.autoDetectRenderer = function(t, e, r, i) {
                    var a = t && t.forceCanvas;
                    return void 0 !== i && (a = i), !a && n.isWebGLSupported() ? new o.default(t, e, r) : new s.default(t, e, r)
                };
            var n = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("./utils")),
                s = i(t("./renderers/canvas/CanvasRenderer")),
                o = i(t("./renderers/webgl/WebGLRenderer"))
        }, {
            "./renderers/canvas/CanvasRenderer": 75,
            "./renderers/webgl/WebGLRenderer": 82,
            "./utils": 122
        }],
        44: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.VERSION = "4.5.3",
                r.PI_2 = 2 * Math.PI,
                r.RAD_TO_DEG = 180 / Math.PI,
                r.DEG_TO_RAD = Math.PI / 180,
                r.RENDERER_TYPE = {
                    UNKNOWN: 0,
                    WEBGL: 1,
                    CANVAS: 2
                },
                r.BLEND_MODES = {
                    NORMAL: 0,
                    ADD: 1,
                    MULTIPLY: 2,
                    SCREEN: 3,
                    OVERLAY: 4,
                    DARKEN: 5,
                    LIGHTEN: 6,
                    COLOR_DODGE: 7,
                    COLOR_BURN: 8,
                    HARD_LIGHT: 9,
                    SOFT_LIGHT: 10,
                    DIFFERENCE: 11,
                    EXCLUSION: 12,
                    HUE: 13,
                    SATURATION: 14,
                    COLOR: 15,
                    LUMINOSITY: 16,
                    NORMAL_NPM: 17,
                    ADD_NPM: 18,
                    SCREEN_NPM: 19
                },
                r.DRAW_MODES = {
                    POINTS: 0,
                    LINES: 1,
                    LINE_LOOP: 2,
                    LINE_STRIP: 3,
                    TRIANGLES: 4,
                    TRIANGLE_STRIP: 5,
                    TRIANGLE_FAN: 6
                },
                r.SCALE_MODES = {
                    LINEAR: 0,
                    NEAREST: 1
                },
                r.WRAP_MODES = {
                    CLAMP: 0,
                    REPEAT: 1,
                    MIRRORED_REPEAT: 2
                },
                r.GC_MODES = {
                    AUTO: 0,
                    MANUAL: 1
                },
                r.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i,
                r.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i,
                r.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i,
                r.SHAPES = {
                    POLY: 0,
                    RECT: 1,
                    CIRC: 2,
                    ELIP: 3,
                    RREC: 4
                },
                r.PRECISION = {
                    LOW: "lowp",
                    MEDIUM: "mediump",
                    HIGH: "highp"
                },
                r.TRANSFORM_MODE = {
                    STATIC: 0,
                    DYNAMIC: 1
                },
                r.TEXT_GRADIENT = {
                    LINEAR_VERTICAL: 0,
                    LINEAR_HORIZONTAL: 1
                },
                r.UPDATE_PRIORITY = {
                    INTERACTION: 50,
                    HIGH: 25,
                    NORMAL: 0,
                    LOW: -25,
                    UTILITY: -50
                }
        }, {}],
        45: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = t("../math"),
                n = function() {
                    function t() {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.minX = 1 / 0,
                            this.minY = 1 / 0,
                            this.maxX = -1 / 0,
                            this.maxY = -1 / 0,
                            this.rect = null
                    }
                    return t.prototype.isEmpty = function() {
                            return this.minX > this.maxX || this.minY > this.maxY
                        },
                        t.prototype.clear = function() {
                            this.updateID++,
                                this.minX = 1 / 0,
                                this.minY = 1 / 0,
                                this.maxX = -1 / 0,
                                this.maxY = -1 / 0
                        },
                        t.prototype.getRectangle = function(t) {
                            return this.minX > this.maxX || this.minY > this.maxY ? i.Rectangle.EMPTY : ((t = t || new i.Rectangle(0, 0, 1, 1)).x = this.minX,
                                t.y = this.minY,
                                t.width = this.maxX - this.minX,
                                t.height = this.maxY - this.minY,
                                t)
                        },
                        t.prototype.addPoint = function(t) {
                            this.minX = Math.min(this.minX, t.x),
                                this.maxX = Math.max(this.maxX, t.x),
                                this.minY = Math.min(this.minY, t.y),
                                this.maxY = Math.max(this.maxY, t.y)
                        },
                        t.prototype.addQuad = function(t) {
                            var e = this.minX,
                                r = this.minY,
                                i = this.maxX,
                                n = this.maxY,
                                s = t[0],
                                o = t[1];
                            e = s < e ? s : e,
                                r = o < r ? o : r,
                                i = i < s ? s : i,
                                n = n < o ? o : n,
                                e = (s = t[2]) < e ? s : e,
                                r = (o = t[3]) < r ? o : r,
                                i = i < s ? s : i,
                                n = n < o ? o : n,
                                e = (s = t[4]) < e ? s : e,
                                r = (o = t[5]) < r ? o : r,
                                i = i < s ? s : i,
                                n = n < o ? o : n,
                                e = (s = t[6]) < e ? s : e,
                                r = (o = t[7]) < r ? o : r,
                                i = i < s ? s : i,
                                n = n < o ? o : n,
                                this.minX = e,
                                this.minY = r,
                                this.maxX = i,
                                this.maxY = n
                        },
                        t.prototype.addFrame = function(t, e, r, i, n) {
                            var s = t.worldTransform,
                                o = s.a,
                                a = s.b,
                                h = s.c,
                                u = s.d,
                                l = s.tx,
                                c = s.ty,
                                d = this.minX,
                                f = this.minY,
                                p = this.maxX,
                                g = this.maxY,
                                v = o * e + h * r + l,
                                _ = a * e + u * r + c;
                            d = v < d ? v : d,
                                f = _ < f ? _ : f,
                                p = p < v ? v : p,
                                g = g < _ ? _ : g,
                                d = (v = o * i + h * r + l) < d ? v : d,
                                f = (_ = a * i + u * r + c) < f ? _ : f,
                                p = p < v ? v : p,
                                g = g < _ ? _ : g,
                                d = (v = o * e + h * n + l) < d ? v : d,
                                f = (_ = a * e + u * n + c) < f ? _ : f,
                                p = p < v ? v : p,
                                g = g < _ ? _ : g,
                                d = (v = o * i + h * n + l) < d ? v : d,
                                f = (_ = a * i + u * n + c) < f ? _ : f,
                                p = p < v ? v : p,
                                g = g < _ ? _ : g,
                                this.minX = d,
                                this.minY = f,
                                this.maxX = p,
                                this.maxY = g
                        },
                        t.prototype.addVertices = function(t, e, r, i) {
                            for (var n = t.worldTransform, s = n.a, o = n.b, a = n.c, h = n.d, u = n.tx, l = n.ty, c = this.minX, d = this.minY, f = this.maxX, p = this.maxY, g = r; g < i; g += 2) {
                                var v = e[g],
                                    _ = e[g + 1],
                                    m = s * v + a * _ + u,
                                    y = h * _ + o * v + l;
                                c = m < c ? m : c,
                                    d = y < d ? y : d,
                                    f = f < m ? m : f,
                                    p = p < y ? y : p
                            }
                            this.minX = c,
                                this.minY = d,
                                this.maxX = f,
                                this.maxY = p
                        },
                        t.prototype.addBounds = function(t) {
                            var e = this.minX,
                                r = this.minY,
                                i = this.maxX,
                                n = this.maxY;
                            this.minX = t.minX < e ? t.minX : e,
                                this.minY = t.minY < r ? t.minY : r,
                                this.maxX = t.maxX > i ? t.maxX : i,
                                this.maxY = t.maxY > n ? t.maxY : n
                        },
                        t.prototype.addBoundsMask = function(t, e) {
                            var r = t.minX > e.minX ? t.minX : e.minX,
                                i = t.minY > e.minY ? t.minY : e.minY,
                                n = t.maxX < e.maxX ? t.maxX : e.maxX,
                                s = t.maxY < e.maxY ? t.maxY : e.maxY;
                            if (r <= n && i <= s) {
                                var o = this.minX,
                                    a = this.minY,
                                    h = this.maxX,
                                    u = this.maxY;
                                this.minX = r < o ? r : o,
                                    this.minY = i < a ? i : a,
                                    this.maxX = h < n ? n : h,
                                    this.maxY = u < s ? s : u
                            }
                        },
                        t.prototype.addBoundsArea = function(t, e) {
                            var r = t.minX > e.x ? t.minX : e.x,
                                i = t.minY > e.y ? t.minY : e.y,
                                n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width,
                                s = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
                            if (r <= n && i <= s) {
                                var o = this.minX,
                                    a = this.minY,
                                    h = this.maxX,
                                    u = this.maxY;
                                this.minX = r < o ? r : o,
                                    this.minY = i < a ? i : a,
                                    this.maxX = h < n ? n : h,
                                    this.maxY = u < s ? s : u
                            }
                        },
                        t
                }();
            r.default = n
        }, {
            "../math": 68
        }],
        46: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("../utils"),
                o = function(t) {
                    function e() {
                        ! function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var r = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return r.children = [],
                            r
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.onChildrenChange = function() {},
                        e.prototype.addChild = function(t) {
                            var e = arguments.length;
                            if (1 < e)
                                for (var r = 0; r < e; r++)
                                    this.addChild(arguments[r]);
                            else
                                t.parent && t.parent.removeChild(t),
                                t.parent = this,
                                t.transform._parentID = -1,
                                this.children.push(t),
                                this._boundsID++,
                                this.onChildrenChange(this.children.length - 1),
                                t.emit("added", this);
                            return t
                        },
                        e.prototype.addChildAt = function(t, e) {
                            if (e < 0 || e > this.children.length)
                                throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
                            return t.parent && t.parent.removeChild(t),
                                t.parent = this,
                                t.transform._parentID = -1,
                                this.children.splice(e, 0, t),
                                this._boundsID++,
                                this.onChildrenChange(e),
                                t.emit("added", this),
                                t
                        },
                        e.prototype.swapChildren = function(t, e) {
                            if (t !== e) {
                                var r = this.getChildIndex(t),
                                    i = this.getChildIndex(e);
                                this.children[r] = e,
                                    this.children[i] = t,
                                    this.onChildrenChange(r < i ? r : i)
                            }
                        },
                        e.prototype.getChildIndex = function(t) {
                            var e = this.children.indexOf(t);
                            if (-1 === e)
                                throw new Error("The supplied DisplayObject must be a child of the caller");
                            return e
                        },
                        e.prototype.setChildIndex = function(t, e) {
                            if (e < 0 || e >= this.children.length)
                                throw new Error("The supplied index is out of bounds");
                            var r = this.getChildIndex(t);
                            (0,
                                s.removeItems)(this.children, r, 1),
                            this.children.splice(e, 0, t),
                                this.onChildrenChange(e)
                        },
                        e.prototype.getChildAt = function(t) {
                            if (t < 0 || t >= this.children.length)
                                throw new Error("getChildAt: Index (" + t + ") does not exist.");
                            return this.children[t]
                        },
                        e.prototype.removeChild = function(t) {
                            var e = arguments.length;
                            if (1 < e)
                                for (var r = 0; r < e; r++)
                                    this.removeChild(arguments[r]);
                            else {
                                var i = this.children.indexOf(t);
                                if (-1 === i)
                                    return null;
                                t.parent = null,
                                    t.transform._parentID = -1,
                                    (0,
                                        s.removeItems)(this.children, i, 1),
                                    this._boundsID++,
                                    this.onChildrenChange(i),
                                    t.emit("removed", this)
                            }
                            return t
                        },
                        e.prototype.removeChildAt = function(t) {
                            var e = this.getChildAt(t);
                            return e.parent = null,
                                e.transform._parentID = -1,
                                (0,
                                    s.removeItems)(this.children, t, 1),
                                this._boundsID++,
                                this.onChildrenChange(t),
                                e.emit("removed", this),
                                e
                        },
                        e.prototype.removeChildren = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = arguments[1],
                                r = t,
                                i = "number" == typeof e ? e : this.children.length,
                                n = i - r,
                                s = void 0;
                            if (0 < n && n <= i) {
                                s = this.children.splice(r, n);
                                for (var o = 0; o < s.length; ++o)
                                    s[o].parent = null,
                                    s[o].transform && (s[o].transform._parentID = -1);
                                this._boundsID++,
                                    this.onChildrenChange(t);
                                for (var a = 0; a < s.length; ++a)
                                    s[a].emit("removed", this);
                                return s
                            }
                            if (0 === n && 0 === this.children.length)
                                return [];
                            throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
                        },
                        e.prototype.updateTransform = function() {
                            this._boundsID++,
                                this.transform.updateTransform(this.parent.transform),
                                this.worldAlpha = this.alpha * this.parent.worldAlpha;
                            for (var t = 0, e = this.children.length; t < e; ++t) {
                                var r = this.children[t];
                                r.visible && r.updateTransform()
                            }
                        },
                        e.prototype.calculateBounds = function() {
                            this._bounds.clear(),
                                this._calculateBounds();
                            for (var t = 0; t < this.children.length; t++) {
                                var e = this.children[t];
                                e.visible && e.renderable && (e.calculateBounds(),
                                    e._mask ? (e._mask.calculateBounds(),
                                        this._bounds.addBoundsMask(e._bounds, e._mask._bounds)) : e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds))
                            }
                            this._lastBoundsID = this._boundsID
                        },
                        e.prototype._calculateBounds = function() {},
                        e.prototype.renderWebGL = function(t) {
                            if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                                if (this._mask || this._filters)
                                    this.renderAdvancedWebGL(t);
                                else {
                                    this._renderWebGL(t);
                                    for (var e = 0, r = this.children.length; e < r; ++e)
                                        this.children[e].renderWebGL(t)
                                }
                        },
                        e.prototype.renderAdvancedWebGL = function(t) {
                            t.flush();
                            var e = this._filters,
                                r = this._mask;
                            if (e) {
                                this._enabledFilters || (this._enabledFilters = []);
                                for (var i = this._enabledFilters.length = 0; i < e.length; i++)
                                    e[i].enabled && this._enabledFilters.push(e[i]);
                                this._enabledFilters.length && t.filterManager.pushFilter(this, this._enabledFilters)
                            }
                            r && t.maskManager.pushMask(this, this._mask),
                                this._renderWebGL(t);
                            for (var n = 0, s = this.children.length; n < s; n++)
                                this.children[n].renderWebGL(t);
                            t.flush(),
                                r && t.maskManager.popMask(this, this._mask),
                                e && this._enabledFilters && this._enabledFilters.length && t.filterManager.popFilter()
                        },
                        e.prototype._renderWebGL = function(t) {},
                        e.prototype._renderCanvas = function(t) {},
                        e.prototype.renderCanvas = function(t) {
                            if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                                this._mask && t.maskManager.pushMask(this._mask),
                                    this._renderCanvas(t);
                                for (var e = 0, r = this.children.length; e < r; ++e)
                                    this.children[e].renderCanvas(t);
                                this._mask && t.maskManager.popMask(t)
                            }
                        },
                        e.prototype.destroy = function(e) {
                            t.prototype.destroy.call(this);
                            var r = "boolean" == typeof e ? e : e && e.children,
                                i = this.removeChildren(0, this.children.length);
                            if (r)
                                for (var n = 0; n < i.length; ++n)
                                    i[n].destroy(e)
                        },
                        n(e, [{
                            key: "width",
                            get: function() {
                                return this.scale.x * this.getLocalBounds().width
                            },
                            set: function(t) {
                                var e = this.getLocalBounds().width;
                                this.scale.x = 0 !== e ? t / e : 1,
                                    this._width = t
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this.scale.y * this.getLocalBounds().height
                            },
                            set: function(t) {
                                var e = this.getLocalBounds().height;
                                this.scale.y = 0 !== e ? t / e : 1,
                                    this._height = t
                            }
                        }]),
                        e
                }(((i = t("./DisplayObject")) && i.__esModule ? i : {
                    default: i
                }).default);
            (r.default = o).prototype.containerUpdateTransform = o.prototype.updateTransform
        }, {
            "../utils": 122,
            "./DisplayObject": 47
        }],
        47: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = i(t("eventemitter3")),
                o = t("../const"),
                a = i(t("../settings")),
                h = i(t("./TransformStatic")),
                u = i(t("./Transform")),
                l = i(t("./Bounds")),
                c = t("../math"),
                d = function(t) {
                    function e() {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var r = function(t, e) {
                                if (!t)
                                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !e || "object" != typeof e && "function" != typeof e ? t : e
                            }(this, t.call(this)),
                            i = a.default.TRANSFORM_MODE === o.TRANSFORM_MODE.STATIC ? h.default : u.default;
                        return r.tempDisplayObjectParent = null,
                            r.transform = new i,
                            r.alpha = 1,
                            r.visible = !0,
                            r.renderable = !0,
                            r.parent = null,
                            r.worldAlpha = 1,
                            r.filterArea = null,
                            r._filters = null,
                            r._enabledFilters = null,
                            r._bounds = new l.default,
                            r._boundsID = 0,
                            r._lastBoundsID = -1,
                            r._boundsRect = null,
                            r._localBoundsRect = null,
                            r._mask = null,
                            r._destroyed = !1,
                            r
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.updateTransform = function() {
                            this.transform.updateTransform(this.parent.transform),
                                this.worldAlpha = this.alpha * this.parent.worldAlpha,
                                this._bounds.updateID++
                        },
                        e.prototype._recursivePostUpdateTransform = function() {
                            this.parent ? (this.parent._recursivePostUpdateTransform(),
                                this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
                        },
                        e.prototype.getBounds = function(t, e) {
                            return t || (this.parent ? (this._recursivePostUpdateTransform(),
                                    this.updateTransform()) : (this.parent = this._tempDisplayObjectParent,
                                    this.updateTransform(),
                                    this.parent = null)),
                                this._boundsID !== this._lastBoundsID && this.calculateBounds(),
                                e || (this._boundsRect || (this._boundsRect = new c.Rectangle),
                                    e = this._boundsRect),
                                this._bounds.getRectangle(e)
                        },
                        e.prototype.getLocalBounds = function(t) {
                            var e = this.transform,
                                r = this.parent;
                            this.parent = null,
                                this.transform = this._tempDisplayObjectParent.transform,
                                t || (this._localBoundsRect || (this._localBoundsRect = new c.Rectangle),
                                    t = this._localBoundsRect);
                            var i = this.getBounds(!1, t);
                            return this.parent = r,
                                this.transform = e,
                                i
                        },
                        e.prototype.toGlobal = function(t, e) {
                            return 2 < arguments.length && void 0 !== arguments[2] && arguments[2] || (this._recursivePostUpdateTransform(),
                                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
                                        this.displayObjectUpdateTransform(),
                                        this.parent = null)),
                                this.worldTransform.apply(t, e)
                        },
                        e.prototype.toLocal = function(t, e, r, i) {
                            return e && (t = e.toGlobal(t, r, i)),
                                i || (this._recursivePostUpdateTransform(),
                                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
                                        this.displayObjectUpdateTransform(),
                                        this.parent = null)),
                                this.worldTransform.applyInverse(t, r)
                        },
                        e.prototype.renderWebGL = function(t) {},
                        e.prototype.renderCanvas = function(t) {},
                        e.prototype.setParent = function(t) {
                            if (!t || !t.addChild)
                                throw new Error("setParent: Argument must be a Container");
                            return t.addChild(this),
                                t
                        },
                        e.prototype.setTransform = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
                                i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 1,
                                n = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
                                s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0,
                                o = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : 0,
                                a = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 0,
                                h = 8 < arguments.length && void 0 !== arguments[8] ? arguments[8] : 0;
                            return this.position.x = t,
                                this.position.y = e,
                                this.scale.x = r || 1,
                                this.scale.y = i || 1,
                                this.rotation = n,
                                this.skew.x = s,
                                this.skew.y = o,
                                this.pivot.x = a,
                                this.pivot.y = h,
                                this
                        },
                        e.prototype.destroy = function() {
                            this.removeAllListeners(),
                                this.parent && this.parent.removeChild(this),
                                this.transform = null,
                                this.parent = null,
                                this._bounds = null,
                                this._currentBounds = null,
                                this._mask = null,
                                this.filterArea = null,
                                this.interactive = !1,
                                this.interactiveChildren = !1,
                                this._destroyed = !0
                        },
                        n(e, [{
                            key: "_tempDisplayObjectParent",
                            get: function() {
                                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new e),
                                    this.tempDisplayObjectParent
                            }
                        }, {
                            key: "x",
                            get: function() {
                                return this.position.x
                            },
                            set: function(t) {
                                this.transform.position.x = t
                            }
                        }, {
                            key: "y",
                            get: function() {
                                return this.position.y
                            },
                            set: function(t) {
                                this.transform.position.y = t
                            }
                        }, {
                            key: "worldTransform",
                            get: function() {
                                return this.transform.worldTransform
                            }
                        }, {
                            key: "localTransform",
                            get: function() {
                                return this.transform.localTransform
                            }
                        }, {
                            key: "position",
                            get: function() {
                                return this.transform.position
                            },
                            set: function(t) {
                                this.transform.position.copy(t)
                            }
                        }, {
                            key: "scale",
                            get: function() {
                                return this.transform.scale
                            },
                            set: function(t) {
                                this.transform.scale.copy(t)
                            }
                        }, {
                            key: "pivot",
                            get: function() {
                                return this.transform.pivot
                            },
                            set: function(t) {
                                this.transform.pivot.copy(t)
                            }
                        }, {
                            key: "skew",
                            get: function() {
                                return this.transform.skew
                            },
                            set: function(t) {
                                this.transform.skew.copy(t)
                            }
                        }, {
                            key: "rotation",
                            get: function() {
                                return this.transform.rotation
                            },
                            set: function(t) {
                                this.transform.rotation = t
                            }
                        }, {
                            key: "worldVisible",
                            get: function() {
                                var t = this;
                                do {
                                    if (!t.visible)
                                        return !1;
                                    t = t.parent
                                } while (t);
                                return !0
                            }
                        }, {
                            key: "mask",
                            get: function() {
                                return this._mask
                            },
                            set: function(t) {
                                this._mask && (this._mask.renderable = !0),
                                    this._mask = t,
                                    this._mask && (this._mask.renderable = !1)
                            }
                        }, {
                            key: "filters",
                            get: function() {
                                return this._filters && this._filters.slice()
                            },
                            set: function(t) {
                                this._filters = t && t.slice()
                            }
                        }]),
                        e
                }(s.default);
            (r.default = d).prototype.displayObjectUpdateTransform = d.prototype.updateTransform
        }, {
            "../const": 44,
            "../math": 68,
            "../settings": 99,
            "./Bounds": 45,
            "./Transform": 48,
            "./TransformStatic": 50,
            eventemitter3: 5
        }],
        48: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("../math"),
                o = function(t) {
                    function e() {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var r = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return r.position = new s.Point(0, 0),
                            r.scale = new s.Point(1, 1),
                            r.skew = new s.ObservablePoint(r.updateSkew, r, 0, 0),
                            r.pivot = new s.Point(0, 0),
                            r._rotation = 0,
                            r._cx = 1,
                            r._sx = 0,
                            r._cy = 0,
                            r._sy = 1,
                            r
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.updateSkew = function() {
                            this._cx = Math.cos(this._rotation + this.skew._y),
                                this._sx = Math.sin(this._rotation + this.skew._y),
                                this._cy = -Math.sin(this._rotation - this.skew._x),
                                this._sy = Math.cos(this._rotation - this.skew._x)
                        },
                        e.prototype.updateLocalTransform = function() {
                            var t = this.localTransform;
                            t.a = this._cx * this.scale.x,
                                t.b = this._sx * this.scale.x,
                                t.c = this._cy * this.scale.y,
                                t.d = this._sy * this.scale.y,
                                t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c),
                                t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d)
                        },
                        e.prototype.updateTransform = function(t) {
                            var e = this.localTransform;
                            e.a = this._cx * this.scale.x,
                                e.b = this._sx * this.scale.x,
                                e.c = this._cy * this.scale.y,
                                e.d = this._sy * this.scale.y,
                                e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c),
                                e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d);
                            var r = t.worldTransform,
                                i = this.worldTransform;
                            i.a = e.a * r.a + e.b * r.c,
                                i.b = e.a * r.b + e.b * r.d,
                                i.c = e.c * r.a + e.d * r.c,
                                i.d = e.c * r.b + e.d * r.d,
                                i.tx = e.tx * r.a + e.ty * r.c + r.tx,
                                i.ty = e.tx * r.b + e.ty * r.d + r.ty,
                                this._worldID++
                        },
                        e.prototype.setFromMatrix = function(t) {
                            t.decompose(this)
                        },
                        n(e, [{
                            key: "rotation",
                            get: function() {
                                return this._rotation
                            },
                            set: function(t) {
                                this._rotation = t,
                                    this.updateSkew()
                            }
                        }]),
                        e
                }(((i = t("./TransformBase")) && i.__esModule ? i : {
                    default: i
                }).default);
            r.default = o
        }, {
            "../math": 68,
            "./TransformBase": 49
        }],
        49: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = t("../math"),
                n = function() {
                    function t() {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.worldTransform = new i.Matrix,
                            this.localTransform = new i.Matrix,
                            this._worldID = 0,
                            this._parentID = 0
                    }
                    return t.prototype.updateLocalTransform = function() {},
                        t.prototype.updateTransform = function(t) {
                            var e = t.worldTransform,
                                r = this.worldTransform,
                                i = this.localTransform;
                            r.a = i.a * e.a + i.b * e.c,
                                r.b = i.a * e.b + i.b * e.d,
                                r.c = i.c * e.a + i.d * e.c,
                                r.d = i.c * e.b + i.d * e.d,
                                r.tx = i.tx * e.a + i.ty * e.c + e.tx,
                                r.ty = i.tx * e.b + i.ty * e.d + e.ty,
                                this._worldID++
                        },
                        t
                }();
            (r.default = n).prototype.updateWorldTransform = n.prototype.updateTransform,
                n.IDENTITY = new n
        }, {
            "../math": 68
        }],
        50: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("../math"),
                o = function(t) {
                    function e() {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var r = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return r.position = new s.ObservablePoint(r.onChange, r, 0, 0),
                            r.scale = new s.ObservablePoint(r.onChange, r, 1, 1),
                            r.pivot = new s.ObservablePoint(r.onChange, r, 0, 0),
                            r.skew = new s.ObservablePoint(r.updateSkew, r, 0, 0),
                            r._rotation = 0,
                            r._cx = 1,
                            r._sx = 0,
                            r._cy = 0,
                            r._sy = 1,
                            r._localID = 0,
                            r._currentLocalID = 0,
                            r
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.onChange = function() {
                            this._localID++
                        },
                        e.prototype.updateSkew = function() {
                            this._cx = Math.cos(this._rotation + this.skew._y),
                                this._sx = Math.sin(this._rotation + this.skew._y),
                                this._cy = -Math.sin(this._rotation - this.skew._x),
                                this._sy = Math.cos(this._rotation - this.skew._x),
                                this._localID++
                        },
                        e.prototype.updateLocalTransform = function() {
                            var t = this.localTransform;
                            this._localID !== this._currentLocalID && (t.a = this._cx * this.scale._x,
                                t.b = this._sx * this.scale._x,
                                t.c = this._cy * this.scale._y,
                                t.d = this._sy * this.scale._y,
                                t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c),
                                t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d),
                                this._currentLocalID = this._localID,
                                this._parentID = -1)
                        },
                        e.prototype.updateTransform = function(t) {
                            var e = this.localTransform;
                            if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale._x,
                                    e.b = this._sx * this.scale._x,
                                    e.c = this._cy * this.scale._y,
                                    e.d = this._sy * this.scale._y,
                                    e.tx = this.position._x - (this.pivot._x * e.a + this.pivot._y * e.c),
                                    e.ty = this.position._y - (this.pivot._x * e.b + this.pivot._y * e.d),
                                    this._currentLocalID = this._localID,
                                    this._parentID = -1),
                                this._parentID !== t._worldID) {
                                var r = t.worldTransform,
                                    i = this.worldTransform;
                                i.a = e.a * r.a + e.b * r.c,
                                    i.b = e.a * r.b + e.b * r.d,
                                    i.c = e.c * r.a + e.d * r.c,
                                    i.d = e.c * r.b + e.d * r.d,
                                    i.tx = e.tx * r.a + e.ty * r.c + r.tx,
                                    i.ty = e.tx * r.b + e.ty * r.d + r.ty,
                                    this._parentID = t._worldID,
                                    this._worldID++
                            }
                        },
                        e.prototype.setFromMatrix = function(t) {
                            t.decompose(this),
                                this._localID++
                        },
                        n(e, [{
                            key: "rotation",
                            get: function() {
                                return this._rotation
                            },
                            set: function(t) {
                                this._rotation = t,
                                    this.updateSkew()
                            }
                        }]),
                        e
                }(((i = t("./TransformBase")) && i.__esModule ? i : {
                    default: i
                }).default);
            r.default = o
        }, {
            "../math": 68,
            "./TransformBase": 49
        }],
        51: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("../display/Container")),
                s = i(t("../textures/RenderTexture")),
                o = i(t("../textures/Texture")),
                a = i(t("./GraphicsData")),
                h = i(t("../sprites/Sprite")),
                u = t("../math"),
                l = t("../utils"),
                c = t("../const"),
                d = i(t("../display/Bounds")),
                f = i(t("./utils/bezierCurveTo")),
                p = i(t("../renderers/canvas/CanvasRenderer")),
                g = void 0,
                v = new u.Matrix,
                _ = new u.Point,
                m = new Float32Array(4),
                y = new Float32Array(4),
                x = function(t) {
                    function e() {
                        var r = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return i.fillAlpha = 1,
                            i.lineWidth = 0,
                            i.nativeLines = r,
                            i.lineColor = 0,
                            i.graphicsData = [],
                            i.tint = 16777215,
                            i._prevTint = 16777215,
                            i.blendMode = c.BLEND_MODES.NORMAL,
                            i.currentPath = null,
                            i._webGL = {},
                            i.isMask = !1,
                            i.boundsPadding = 0,
                            i._localBounds = new d.default,
                            i.dirty = 0,
                            i.fastRectDirty = -1,
                            i.clearDirty = 0,
                            i.boundsDirty = -1,
                            i.cachedSpriteDirty = !1,
                            i._spriteRect = null,
                            i._fastRect = !1,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.clone = function() {
                            var t = new e;
                            t.renderable = this.renderable,
                                t.fillAlpha = this.fillAlpha,
                                t.lineWidth = this.lineWidth,
                                t.lineColor = this.lineColor,
                                t.tint = this.tint,
                                t.blendMode = this.blendMode,
                                t.isMask = this.isMask,
                                t.boundsPadding = this.boundsPadding,
                                t.dirty = 0,
                                t.cachedSpriteDirty = this.cachedSpriteDirty;
                            for (var r = 0; r < this.graphicsData.length; ++r)
                                t.graphicsData.push(this.graphicsData[r].clone());
                            return t.currentPath = t.graphicsData[t.graphicsData.length - 1],
                                t.updateLocalBounds(),
                                t
                        },
                        e.prototype.lineStyle = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1;
                            if (this.lineWidth = t,
                                this.lineColor = e,
                                this.lineAlpha = r,
                                this.currentPath)
                                if (this.currentPath.shape.points.length) {
                                    var i = new u.Polygon(this.currentPath.shape.points.slice(-2));
                                    i.closed = !1,
                                        this.drawShape(i)
                                } else
                                    this.currentPath.lineWidth = this.lineWidth,
                                    this.currentPath.lineColor = this.lineColor,
                                    this.currentPath.lineAlpha = this.lineAlpha;
                            return this
                        },
                        e.prototype.moveTo = function(t, e) {
                            var r = new u.Polygon([t, e]);
                            return r.closed = !1,
                                this.drawShape(r),
                                this
                        },
                        e.prototype.lineTo = function(t, e) {
                            return this.currentPath.shape.points.push(t, e),
                                this.dirty++,
                                this
                        },
                        e.prototype.quadraticCurveTo = function(t, e, r, i) {
                            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                            var n = this.currentPath.shape.points,
                                s = 0,
                                o = 0;
                            0 === n.length && this.moveTo(0, 0);
                            for (var a = n[n.length - 2], h = n[n.length - 1], u = 1; u <= 20; ++u) {
                                var l = u / 20;
                                s = a + (t - a) * l,
                                    o = h + (e - h) * l,
                                    n.push(s + (t + (r - t) * l - s) * l, o + (e + (i - e) * l - o) * l)
                            }
                            return this.dirty++,
                                this
                        },
                        e.prototype.bezierCurveTo = function(t, e, r, i, n, s) {
                            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                            var o = this.currentPath.shape.points,
                                a = o[o.length - 2],
                                h = o[o.length - 1];
                            return o.length -= 2,
                                (0,
                                    f.default)(a, h, t, e, r, i, n, s, o),
                                this.dirty++,
                                this
                        },
                        e.prototype.arcTo = function(t, e, r, i, n) {
                            this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e) : this.moveTo(t, e);
                            var s = this.currentPath.shape.points,
                                o = s[s.length - 2],
                                a = s[s.length - 1] - e,
                                h = o - t,
                                u = i - e,
                                l = r - t,
                                c = Math.abs(a * l - h * u);
                            if (c < 1e-8 || 0 === n)
                                s[s.length - 2] === t && s[s.length - 1] === e || s.push(t, e);
                            else {
                                var d = a * a + h * h,
                                    f = u * u + l * l,
                                    p = a * u + h * l,
                                    g = n * Math.sqrt(d) / c,
                                    v = n * Math.sqrt(f) / c,
                                    _ = g * p / d,
                                    m = v * p / f,
                                    y = g * l + v * h,
                                    x = g * u + v * a,
                                    b = h * (v + _),
                                    T = a * (v + _),
                                    E = l * (g + m),
                                    w = u * (g + m),
                                    S = Math.atan2(T - x, b - y),
                                    O = Math.atan2(w - x, E - y);
                                this.arc(y + t, x + e, n, S, O, l * a < h * u)
                            }
                            return this.dirty++,
                                this
                        },
                        e.prototype.arc = function(t, e, r, i, n) {
                            var s = 5 < arguments.length && void 0 !== arguments[5] && arguments[5];
                            if (i === n)
                                return this;
                            !s && n <= i ? n += 2 * Math.PI : s && i <= n && (i += 2 * Math.PI);
                            var o = n - i,
                                a = 40 * Math.ceil(Math.abs(o) / (2 * Math.PI));
                            if (0 === o)
                                return this;
                            var h = t + Math.cos(i) * r,
                                u = e + Math.sin(i) * r,
                                l = this.currentPath ? this.currentPath.shape.points : null;
                            l ? l[l.length - 2] === h && l[l.length - 1] === u || l.push(h, u) : (this.moveTo(h, u),
                                l = this.currentPath.shape.points);
                            for (var c = o / (2 * a), d = 2 * c, f = Math.cos(c), p = Math.sin(c), g = a - 1, v = g % 1 / g, _ = 0; _ <= g; ++_) {
                                var m = c + i + d * (_ + v * _),
                                    y = Math.cos(m),
                                    x = -Math.sin(m);
                                l.push((f * y + p * x) * r + t, (f * -x + p * y) * r + e)
                            }
                            return this.dirty++,
                                this
                        },
                        e.prototype.beginFill = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
                            return this.filling = !0,
                                this.fillColor = t,
                                this.fillAlpha = e,
                                this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling,
                                    this.currentPath.fillColor = this.fillColor,
                                    this.currentPath.fillAlpha = this.fillAlpha),
                                this
                        },
                        e.prototype.endFill = function() {
                            return this.filling = !1,
                                this.fillColor = null,
                                this.fillAlpha = 1,
                                this
                        },
                        e.prototype.drawRect = function(t, e, r, i) {
                            return this.drawShape(new u.Rectangle(t, e, r, i)),
                                this
                        },
                        e.prototype.drawRoundedRect = function(t, e, r, i, n) {
                            return this.drawShape(new u.RoundedRectangle(t, e, r, i, n)),
                                this
                        },
                        e.prototype.drawCircle = function(t, e, r) {
                            return this.drawShape(new u.Circle(t, e, r)),
                                this
                        },
                        e.prototype.drawEllipse = function(t, e, r, i) {
                            return this.drawShape(new u.Ellipse(t, e, r, i)),
                                this
                        },
                        e.prototype.drawPolygon = function(t) {
                            var e = t,
                                r = !0;
                            if (e instanceof u.Polygon && (r = e.closed,
                                    e = e.points), !Array.isArray(e)) {
                                e = new Array(arguments.length);
                                for (var i = 0; i < e.length; ++i)
                                    e[i] = arguments[i]
                            }
                            var n = new u.Polygon(e);
                            return n.closed = r,
                                this.drawShape(n),
                                this
                        },
                        e.prototype.clear = function() {
                            return (this.lineWidth || this.filling || 0 < this.graphicsData.length) && (this.lineWidth = 0,
                                    this.filling = !1,
                                    this.boundsDirty = -1,
                                    this.dirty++,
                                    this.clearDirty++,
                                    this.graphicsData.length = 0),
                                this.currentPath = null,
                                this._spriteRect = null,
                                this
                        },
                        e.prototype.isFastRect = function() {
                            return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === c.SHAPES.RECT && !this.graphicsData[0].lineWidth
                        },
                        e.prototype._renderWebGL = function(t) {
                            this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty,
                                    this._fastRect = this.isFastRect()),
                                this._fastRect ? this._renderSpriteRect(t) : (t.setObjectRenderer(t.plugins.graphics),
                                    t.plugins.graphics.render(this))
                        },
                        e.prototype._renderSpriteRect = function(t) {
                            var e = this.graphicsData[0].shape;
                            this._spriteRect || (this._spriteRect = new h.default(new o.default(o.default.WHITE)));
                            var r = this._spriteRect;
                            if (16777215 === this.tint)
                                r.tint = this.graphicsData[0].fillColor;
                            else {
                                var i = m,
                                    n = y;
                                (0,
                                    l.hex2rgb)(this.graphicsData[0].fillColor, i),
                                (0,
                                    l.hex2rgb)(this.tint, n),
                                i[0] *= n[0],
                                    i[1] *= n[1],
                                    i[2] *= n[2],
                                    r.tint = (0,
                                        l.rgb2hex)(i)
                            }
                            r.alpha = this.graphicsData[0].fillAlpha,
                                r.worldAlpha = this.worldAlpha * r.alpha,
                                r.blendMode = this.blendMode,
                                r._texture._frame.width = e.width,
                                r._texture._frame.height = e.height,
                                r.transform.worldTransform = this.transform.worldTransform,
                                r.anchor.set(-e.x / e.width, -e.y / e.height),
                                r._onAnchorUpdate(),
                                r._renderWebGL(t)
                        },
                        e.prototype._renderCanvas = function(t) {
                            !0 !== this.isMask && t.plugins.graphics.render(this)
                        },
                        e.prototype._calculateBounds = function() {
                            this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty,
                                this.updateLocalBounds(),
                                this.cachedSpriteDirty = !0);
                            var t = this._localBounds;
                            this._bounds.addFrame(this.transform, t.minX, t.minY, t.maxX, t.maxY)
                        },
                        e.prototype.containsPoint = function(t) {
                            this.worldTransform.applyInverse(t, _);
                            for (var e = this.graphicsData, r = 0; r < e.length; ++r) {
                                var i = e[r];
                                if (i.fill && i.shape && i.shape.contains(_.x, _.y)) {
                                    if (i.holes)
                                        for (var n = 0; n < i.holes.length; n++)
                                            if (i.holes[n].contains(_.x, _.y))
                                                return !1;
                                    return !0
                                }
                            }
                            return !1
                        },
                        e.prototype.updateLocalBounds = function() {
                            var t = 1 / 0,
                                e = -1 / 0,
                                r = 1 / 0,
                                i = -1 / 0;
                            if (this.graphicsData.length)
                                for (var n = 0, s = 0, o = 0, a = 0, h = 0, u = 0; u < this.graphicsData.length; u++) {
                                    var l = this.graphicsData[u],
                                        d = l.type,
                                        f = l.lineWidth;
                                    if (n = l.shape,
                                        d === c.SHAPES.RECT || d === c.SHAPES.RREC)
                                        s = n.x - f / 2,
                                        o = n.y - f / 2,
                                        t = s < t ? s : t,
                                        e = e < s + (a = n.width + f) ? s + a : e,
                                        r = o < r ? o : r,
                                        i = i < o + (h = n.height + f) ? o + h : i;
                                    else if (d === c.SHAPES.CIRC)
                                        s = n.x,
                                        o = n.y,
                                        t = s - (a = n.radius + f / 2) < t ? s - a : t,
                                        e = e < s + a ? s + a : e,
                                        r = o - (h = n.radius + f / 2) < r ? o - h : r,
                                        i = i < o + h ? o + h : i;
                                    else if (d === c.SHAPES.ELIP)
                                        s = n.x,
                                        o = n.y,
                                        t = s - (a = n.width + f / 2) < t ? s - a : t,
                                        e = e < s + a ? s + a : e,
                                        r = o - (h = n.height + f / 2) < r ? o - h : r,
                                        i = i < o + h ? o + h : i;
                                    else
                                        for (var p = n.points, g = 0, v = 0, _ = 0, m = 0, y = 0, x = 0, b = 0, T = 0, E = 0; E + 2 < p.length; E += 2)
                                            s = p[E],
                                            o = p[E + 1],
                                            g = p[E + 2],
                                            v = p[E + 3],
                                            _ = Math.abs(g - s),
                                            m = Math.abs(v - o),
                                            h = f,
                                            (a = Math.sqrt(_ * _ + m * m)) < 1e-9 || (t = (b = (g + s) / 2) - (y = (h / a * m + _) / 2) < t ? b - y : t,
                                                e = e < b + y ? b + y : e,
                                                r = (T = (v + o) / 2) - (x = (h / a * _ + m) / 2) < r ? T - x : r,
                                                i = i < T + x ? T + x : i)
                                }
                            else
                                i = r = e = t = 0;
                            var w = this.boundsPadding;
                            this._localBounds.minX = t - w,
                                this._localBounds.maxX = e + w,
                                this._localBounds.minY = r - w,
                                this._localBounds.maxY = i + w
                        },
                        e.prototype.drawShape = function(t) {
                            this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(),
                                this.currentPath = null;
                            var e = new a.default(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, this.nativeLines, t);
                            return this.graphicsData.push(e),
                                e.type === c.SHAPES.POLY && (e.shape.closed = e.shape.closed || this.filling,
                                    this.currentPath = e),
                                this.dirty++,
                                e
                        },
                        e.prototype.generateCanvasTexture = function(t) {
                            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1,
                                r = this.getLocalBounds(),
                                i = s.default.create(r.width, r.height, t, e);
                            g || (g = new p.default),
                                this.transform.updateLocalTransform(),
                                this.transform.localTransform.copy(v),
                                v.invert(),
                                v.tx -= r.x,
                                v.ty -= r.y,
                                g.render(this, i, !0, v);
                            var n = o.default.fromCanvas(i.baseTexture._canvasRenderTarget.canvas, t, "graphics");
                            return n.baseTexture.resolution = e,
                                n.baseTexture.update(),
                                n
                        },
                        e.prototype.closePath = function() {
                            var t = this.currentPath;
                            return t && t.shape && t.shape.close(),
                                this
                        },
                        e.prototype.addHole = function() {
                            var t = this.graphicsData.pop();
                            return this.currentPath = this.graphicsData[this.graphicsData.length - 1],
                                this.currentPath.addHole(t.shape),
                                this.currentPath = null,
                                this
                        },
                        e.prototype.destroy = function(e) {
                            t.prototype.destroy.call(this, e);
                            for (var r = 0; r < this.graphicsData.length; ++r)
                                this.graphicsData[r].destroy();
                            for (var i in this._webgl)
                                for (var n = 0; n < this._webgl[i].data.length; ++n)
                                    this._webgl[i].data[n].destroy();
                            this._spriteRect && this._spriteRect.destroy(),
                                this.graphicsData = null,
                                this.currentPath = null,
                                this._webgl = null,
                                this._localBounds = null
                        },
                        e
                }(n.default);
            (r.default = x)._SPRITE_TEXTURE = null
        }, {
            "../const": 44,
            "../display/Bounds": 45,
            "../display/Container": 46,
            "../math": 68,
            "../renderers/canvas/CanvasRenderer": 75,
            "../sprites/Sprite": 100,
            "../textures/RenderTexture": 111,
            "../textures/Texture": 113,
            "../utils": 122,
            "./GraphicsData": 52,
            "./utils/bezierCurveTo": 54
        }],
        52: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t(e, r, i, n, s, o, a, h) {
                    (function(e, r) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    })(this),
                    this.lineWidth = e,
                        this.nativeLines = a,
                        this.lineColor = r,
                        this.lineAlpha = i,
                        this._lineTint = r,
                        this.fillColor = n,
                        this.fillAlpha = s,
                        this._fillTint = n,
                        this.fill = o,
                        this.holes = [],
                        this.shape = h,
                        this.type = h.type
                }
                return t.prototype.clone = function() {
                        return new t(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape)
                    },
                    t.prototype.addHole = function(t) {
                        this.holes.push(t)
                    },
                    t.prototype.destroy = function() {
                        this.shape = null,
                            this.holes = null
                    },
                    t
            }();
            r.default = i
        }, {}],
        53: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("../../renderers/canvas/CanvasRenderer")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../const"),
                o = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.renderer = e
                    }
                    return t.prototype.render = function(t) {
                            var e = this.renderer,
                                r = e.context,
                                i = t.worldAlpha,
                                n = t.transform.worldTransform,
                                o = e.resolution;
                            this._prevTint !== this.tint && (this.dirty = !0),
                                r.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o),
                                t.dirty && (this.updateGraphicsTint(t),
                                    t.dirty = !1),
                                e.setBlendMode(t.blendMode);
                            for (var a = 0; a < t.graphicsData.length; a++) {
                                var h = t.graphicsData[a],
                                    u = h.shape,
                                    l = h._fillTint,
                                    c = h._lineTint;
                                if (r.lineWidth = h.lineWidth,
                                    h.type === s.SHAPES.POLY) {
                                    r.beginPath(),
                                        this.renderPolygon(u.points, u.closed, r);
                                    for (var d = 0; d < h.holes.length; d++)
                                        this.renderPolygon(h.holes[d].points, !0, r);
                                    h.fill && (r.globalAlpha = h.fillAlpha * i,
                                            r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6),
                                            r.fill()),
                                        h.lineWidth && (r.globalAlpha = h.lineAlpha * i,
                                            r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                                            r.stroke())
                                } else if (h.type === s.SHAPES.RECT)
                                    (h.fillColor || 0 === h.fillColor) && (r.globalAlpha = h.fillAlpha * i,
                                        r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6),
                                        r.fillRect(u.x, u.y, u.width, u.height)),
                                    h.lineWidth && (r.globalAlpha = h.lineAlpha * i,
                                        r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                                        r.strokeRect(u.x, u.y, u.width, u.height));
                                else if (h.type === s.SHAPES.CIRC)
                                    r.beginPath(),
                                    r.arc(u.x, u.y, u.radius, 0, 2 * Math.PI),
                                    r.closePath(),
                                    h.fill && (r.globalAlpha = h.fillAlpha * i,
                                        r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6),
                                        r.fill()),
                                    h.lineWidth && (r.globalAlpha = h.lineAlpha * i,
                                        r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                                        r.stroke());
                                else if (h.type === s.SHAPES.ELIP) {
                                    var f = 2 * u.width,
                                        p = 2 * u.height,
                                        g = u.x - f / 2,
                                        v = u.y - p / 2;
                                    r.beginPath();
                                    var _ = f / 2 * .5522848,
                                        m = p / 2 * .5522848,
                                        y = g + f,
                                        x = v + p,
                                        b = g + f / 2,
                                        T = v + p / 2;
                                    r.moveTo(g, T),
                                        r.bezierCurveTo(g, T - m, b - _, v, b, v),
                                        r.bezierCurveTo(b + _, v, y, T - m, y, T),
                                        r.bezierCurveTo(y, T + m, b + _, x, b, x),
                                        r.bezierCurveTo(b - _, x, g, T + m, g, T),
                                        r.closePath(),
                                        h.fill && (r.globalAlpha = h.fillAlpha * i,
                                            r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6),
                                            r.fill()),
                                        h.lineWidth && (r.globalAlpha = h.lineAlpha * i,
                                            r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                                            r.stroke())
                                } else if (h.type === s.SHAPES.RREC) {
                                    var E = u.x,
                                        w = u.y,
                                        S = u.width,
                                        O = u.height,
                                        P = u.radius,
                                        C = Math.min(S, O) / 2 | 0;
                                    P = C < P ? C : P,
                                        r.beginPath(),
                                        r.moveTo(E, w + P),
                                        r.lineTo(E, w + O - P),
                                        r.quadraticCurveTo(E, w + O, E + P, w + O),
                                        r.lineTo(E + S - P, w + O),
                                        r.quadraticCurveTo(E + S, w + O, E + S, w + O - P),
                                        r.lineTo(E + S, w + P),
                                        r.quadraticCurveTo(E + S, w, E + S - P, w),
                                        r.lineTo(E + P, w),
                                        r.quadraticCurveTo(E, w, E, w + P),
                                        r.closePath(),
                                        (h.fillColor || 0 === h.fillColor) && (r.globalAlpha = h.fillAlpha * i,
                                            r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6),
                                            r.fill()),
                                        h.lineWidth && (r.globalAlpha = h.lineAlpha * i,
                                            r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                                            r.stroke())
                                }
                            }
                        },
                        t.prototype.updateGraphicsTint = function(t) {
                            t._prevTint = t.tint;
                            for (var e = (t.tint >> 16 & 255) / 255, r = (t.tint >> 8 & 255) / 255, i = (255 & t.tint) / 255, n = 0; n < t.graphicsData.length; ++n) {
                                var s = t.graphicsData[n],
                                    o = 0 | s.fillColor,
                                    a = 0 | s.lineColor;
                                s._fillTint = ((o >> 16 & 255) / 255 * e * 255 << 16) + ((o >> 8 & 255) / 255 * r * 255 << 8) + (255 & o) / 255 * i * 255,
                                    s._lineTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * r * 255 << 8) + (255 & a) / 255 * i * 255
                            }
                        },
                        t.prototype.renderPolygon = function(t, e, r) {
                            r.moveTo(t[0], t[1]);
                            for (var i = 1; i < t.length / 2; ++i)
                                r.lineTo(t[2 * i], t[2 * i + 1]);
                            e && r.closePath()
                        },
                        t.prototype.destroy = function() {
                            this.renderer = null
                        },
                        t
                }();
            r.default = o,
                n.default.registerPlugin("graphics", o)
        }, {
            "../../const": 44,
            "../../renderers/canvas/CanvasRenderer": 75
        }],
        54: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t, e, r, i, n, s, o, a) {
                    var h = 8 < arguments.length && void 0 !== arguments[8] ? arguments[8] : [],
                        u = 0,
                        l = 0,
                        c = 0,
                        d = 0,
                        f = 0;
                    h.push(t, e);
                    for (var p = 1, g = 0; p <= 20; ++p)
                        c = (l = (u = 1 - (g = p / 20)) * u) * u,
                        f = (d = g * g) * g,
                        h.push(c * t + 3 * l * g * r + 3 * u * d * n + f * o, c * e + 3 * l * g * i + 3 * u * d * s + f * a);
                    return h
                }
        }, {}],
        55: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = t("../../utils"),
                s = t("../../const"),
                o = i(t("../../renderers/webgl/utils/ObjectRenderer")),
                a = i(t("../../renderers/webgl/WebGLRenderer")),
                h = i(t("./WebGLGraphicsData")),
                u = i(t("./shaders/PrimitiveShader")),
                l = i(t("./utils/buildPoly")),
                c = i(t("./utils/buildRectangle")),
                d = i(t("./utils/buildRoundedRectangle")),
                f = i(t("./utils/buildCircle")),
                p = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return i.graphicsDataPool = [],
                            i.primitiveShader = null,
                            i.gl = r.gl,
                            i.CONTEXT_UID = 0,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.onContextChange = function() {
                            this.gl = this.renderer.gl,
                                this.CONTEXT_UID = this.renderer.CONTEXT_UID,
                                this.primitiveShader = new u.default(this.gl)
                        },
                        e.prototype.destroy = function() {
                            o.default.prototype.destroy.call(this);
                            for (var t = 0; t < this.graphicsDataPool.length; ++t)
                                this.graphicsDataPool[t].destroy();
                            this.graphicsDataPool = null
                        },
                        e.prototype.render = function(t) {
                            var e = this.renderer,
                                r = e.gl,
                                i = void 0,
                                s = t._webGL[this.CONTEXT_UID];
                            s && t.dirty === s.dirty || (this.updateGraphics(t),
                                s = t._webGL[this.CONTEXT_UID]);
                            var o = this.primitiveShader;
                            e.bindShader(o),
                                e.state.setBlendMode(t.blendMode);
                            for (var a = 0, h = s.data.length; a < h; a++) {
                                var u = (i = s.data[a]).shader;
                                e.bindShader(u),
                                    u.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0),
                                    u.uniforms.tint = (0,
                                        n.hex2rgb)(t.tint),
                                    u.uniforms.alpha = t.worldAlpha,
                                    e.bindVao(i.vao),
                                    i.nativeLines ? r.drawArrays(r.LINES, 0, i.points.length / 6) : i.vao.draw(r.TRIANGLE_STRIP, i.indices.length)
                            }
                        },
                        e.prototype.updateGraphics = function(t) {
                            var e = this.renderer.gl,
                                r = t._webGL[this.CONTEXT_UID];
                            if (r || (r = t._webGL[this.CONTEXT_UID] = {
                                    lastIndex: 0,
                                    data: [],
                                    gl: e,
                                    clearDirty: -1,
                                    dirty: -1
                                }),
                                r.dirty = t.dirty,
                                t.clearDirty !== r.clearDirty) {
                                r.clearDirty = t.clearDirty;
                                for (var i = 0; i < r.data.length; i++)
                                    this.graphicsDataPool.push(r.data[i]);
                                r.data.length = 0,
                                    r.lastIndex = 0
                            }
                            for (var n = void 0, o = void 0, a = r.lastIndex; a < t.graphicsData.length; a++) {
                                var h = t.graphicsData[a];
                                n = this.getWebGLData(r, 0),
                                    h.nativeLines && h.lineWidth && (o = this.getWebGLData(r, 0, !0),
                                        r.lastIndex++),
                                    h.type === s.SHAPES.POLY && (0,
                                        l.default)(h, n, o),
                                    h.type === s.SHAPES.RECT ? (0,
                                        c.default)(h, n, o) : h.type === s.SHAPES.CIRC || h.type === s.SHAPES.ELIP ? (0,
                                        f.default)(h, n, o) : h.type === s.SHAPES.RREC && (0,
                                        d.default)(h, n, o),
                                    r.lastIndex++
                            }
                            this.renderer.bindVao(null);
                            for (var u = 0; u < r.data.length; u++)
                                (n = r.data[u]).dirty && n.upload()
                        },
                        e.prototype.getWebGLData = function(t, e, r) {
                            var i = t.data[t.data.length - 1];
                            return (!i || i.nativeLines !== r || 32e4 < i.points.length) && ((i = this.graphicsDataPool.pop() || new h.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState)).nativeLines = r,
                                    i.reset(e),
                                    t.data.push(i)),
                                i.dirty = !0,
                                i
                        },
                        e
                }(o.default);
            r.default = p,
                a.default.registerPlugin("graphics", p)
        }, {
            "../../const": 44,
            "../../renderers/webgl/WebGLRenderer": 82,
            "../../renderers/webgl/utils/ObjectRenderer": 92,
            "../../utils": 122,
            "./WebGLGraphicsData": 56,
            "./shaders/PrimitiveShader": 57,
            "./utils/buildCircle": 58,
            "./utils/buildPoly": 60,
            "./utils/buildRectangle": 61,
            "./utils/buildRoundedRectangle": 62
        }],
        56: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("pixi-gl-core")) && i.__esModule ? i : {
                    default: i
                },
                s = function() {
                    function t(e, r, i) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.gl = e,
                            this.color = [0, 0, 0],
                            this.points = [],
                            this.indices = [],
                            this.buffer = n.default.GLBuffer.createVertexBuffer(e),
                            this.indexBuffer = n.default.GLBuffer.createIndexBuffer(e),
                            this.dirty = !0,
                            this.nativeLines = !1,
                            this.glPoints = null,
                            this.glIndices = null,
                            this.shader = r,
                            this.vao = new n.default.VertexArrayObject(e, i).addIndex(this.indexBuffer).addAttribute(this.buffer, r.attributes.aVertexPosition, e.FLOAT, !1, 24, 0).addAttribute(this.buffer, r.attributes.aColor, e.FLOAT, !1, 24, 8)
                    }
                    return t.prototype.reset = function() {
                            this.points.length = 0,
                                this.indices.length = 0
                        },
                        t.prototype.upload = function() {
                            this.glPoints = new Float32Array(this.points),
                                this.buffer.upload(this.glPoints),
                                this.glIndices = new Uint16Array(this.indices),
                                this.indexBuffer.upload(this.glIndices),
                                this.dirty = !1
                        },
                        t.prototype.destroy = function() {
                            this.color = null,
                                this.points = null,
                                this.indices = null,
                                this.vao.destroy(),
                                this.buffer.destroy(),
                                this.indexBuffer.destroy(),
                                this.gl = null,
                                this.buffer = null,
                                this.indexBuffer = null,
                                this.glPoints = null,
                                this.glIndices = null
                        },
                        t
                }();
            r.default = s
        }, {
            "pixi-gl-core": 17
        }],
        57: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function(t) {
                function e(r) {
                    return function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this),
                        function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")))
                }
                return function(t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                    }(e, t),
                    e
            }(((i = t("../../../Shader")) && i.__esModule ? i : {
                default: i
            }).default);
            r.default = n
        }, {
            "../../../Shader": 42
        }],
        58: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    var i, a = t.shape,
                        h = a.x,
                        u = a.y,
                        l = void 0;
                    if (i = t.type === s.SHAPES.CIRC ? (l = a.radius,
                            a.radius) : (l = a.width,
                            a.height),
                        0 !== l && 0 !== i) {
                        var c = Math.floor(30 * Math.sqrt(a.radius)) || Math.floor(15 * Math.sqrt(a.width + a.height)),
                            d = 2 * Math.PI / c;
                        if (t.fill) {
                            var f = (0,
                                    o.hex2rgb)(t.fillColor),
                                p = t.fillAlpha,
                                g = f[0] * p,
                                v = f[1] * p,
                                _ = f[2] * p,
                                m = e.points,
                                y = e.indices,
                                x = m.length / 6;
                            y.push(x);
                            for (var b = 0; b < c + 1; b++)
                                m.push(h, u, g, v, _, p),
                                m.push(h + Math.sin(d * b) * l, u + Math.cos(d * b) * i, g, v, _, p),
                                y.push(x++, x++);
                            y.push(x - 1)
                        }
                        if (t.lineWidth) {
                            var T = t.points;
                            t.points = [];
                            for (var E = 0; E < c + 1; E++)
                                t.points.push(h + Math.sin(d * E) * l, u + Math.cos(d * E) * i);
                            (0,
                                n.default)(t, e, r),
                            t.points = T
                        }
                    }
                };
            var i, n = (i = t("./buildLine")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../../const"),
                o = t("../../../utils")
        }, {
            "../../../const": 44,
            "../../../utils": 122,
            "./buildLine": 59
        }],
        59: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    t.nativeLines ? function(t, e) {
                        var r = 0,
                            i = t.points;
                        if (0 !== i.length) {
                            var s = e.points,
                                o = i.length / 2,
                                a = (0,
                                    n.hex2rgb)(t.lineColor),
                                h = t.lineAlpha,
                                u = a[0] * h,
                                l = a[1] * h,
                                c = a[2] * h;
                            for (r = 1; r < o; r++) {
                                var d = i[2 * (r - 1)],
                                    f = i[2 * (r - 1) + 1],
                                    p = i[2 * r],
                                    g = i[2 * r + 1];
                                s.push(d, f),
                                    s.push(u, l, c, h),
                                    s.push(p, g),
                                    s.push(u, l, c, h)
                            }
                        }
                    }(t, r) : function(t, e) {
                        var r = t.points;
                        if (0 !== r.length) {
                            var s = new i.Point(r[0], r[1]),
                                o = new i.Point(r[r.length - 2], r[r.length - 1]);
                            if (s.x === o.x && s.y === o.y) {
                                (r = r.slice()).pop(),
                                    r.pop();
                                var a = (o = new i.Point(r[r.length - 2], r[r.length - 1])).x + .5 * (s.x - o.x),
                                    h = o.y + .5 * (s.y - o.y);
                                r.unshift(a, h),
                                    r.push(a, h)
                            }
                            var u = e.points,
                                l = e.indices,
                                c = r.length / 2,
                                d = r.length,
                                f = u.length / 6,
                                p = t.lineWidth / 2,
                                g = (0,
                                    n.hex2rgb)(t.lineColor),
                                v = t.lineAlpha,
                                _ = g[0] * v,
                                m = g[1] * v,
                                y = g[2] * v,
                                x = r[0],
                                b = r[1],
                                T = r[2],
                                E = r[3],
                                w = 0,
                                S = 0,
                                O = -(b - E),
                                P = x - T,
                                C = 0,
                                R = 0,
                                M = 0,
                                A = 0,
                                D = Math.sqrt(O * O + P * P);
                            O /= D,
                                P /= D,
                                O *= p,
                                P *= p,
                                u.push(x - O, b - P, _, m, y, v),
                                u.push(x + O, b + P, _, m, y, v);
                            for (var I = 1; I < c - 1; ++I) {
                                x = r[2 * (I - 1)],
                                    b = r[2 * (I - 1) + 1],
                                    T = r[2 * I],
                                    E = r[2 * I + 1],
                                    w = r[2 * (I + 1)],
                                    S = r[2 * (I + 1) + 1],
                                    O = -(b - E),
                                    P = x - T,
                                    O /= D = Math.sqrt(O * O + P * P),
                                    P /= D,
                                    O *= p,
                                    P *= p,
                                    C = -(E - S),
                                    R = T - w,
                                    C /= D = Math.sqrt(C * C + R * R),
                                    R /= D;
                                var L = -P + b - (-P + E),
                                    k = -O + T - (-O + x),
                                    N = (-O + x) * (-P + E) - (-O + T) * (-P + b),
                                    B = -(R *= p) + S - (-R + E),
                                    U = -(C *= p) + T - (-C + w),
                                    F = (-C + w) * (-R + E) - (-C + T) * (-R + S),
                                    j = L * U - B * k;
                                if (Math.abs(j) < .1)
                                    j += 10.1,
                                    u.push(T - O, E - P, _, m, y, v),
                                    u.push(T + O, E + P, _, m, y, v);
                                else {
                                    var G = (k * F - U * N) / j,
                                        X = (B * N - L * F) / j;
                                    196 * p * p < (G - T) * (G - T) + (X - E) * (X - E) ? (M = O - C,
                                        A = P - R,
                                        M /= D = Math.sqrt(M * M + A * A),
                                        A /= D,
                                        M *= p,
                                        A *= p,
                                        u.push(T - M, E - A),
                                        u.push(_, m, y, v),
                                        u.push(T + M, E + A),
                                        u.push(_, m, y, v),
                                        u.push(T - M, E - A),
                                        u.push(_, m, y, v),
                                        d++) : (u.push(G, X),
                                        u.push(_, m, y, v),
                                        u.push(T - (G - T), E - (X - E)),
                                        u.push(_, m, y, v))
                                }
                            }
                            x = r[2 * (c - 2)],
                                b = r[2 * (c - 2) + 1],
                                T = r[2 * (c - 1)],
                                O = -(b - (E = r[2 * (c - 1) + 1])),
                                P = x - T,
                                O /= D = Math.sqrt(O * O + P * P),
                                P /= D,
                                O *= p,
                                P *= p,
                                u.push(T - O, E - P),
                                u.push(_, m, y, v),
                                u.push(T + O, E + P),
                                u.push(_, m, y, v),
                                l.push(f);
                            for (var V = 0; V < d; ++V)
                                l.push(f++);
                            l.push(f - 1)
                        }
                    }(t, e)
                };
            var i = t("../../../math"),
                n = t("../../../utils")
        }, {
            "../../../math": 68,
            "../../../utils": 122
        }],
        60: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    t.points = t.shape.points.slice();
                    var i = t.points;
                    if (t.fill && 6 <= i.length) {
                        for (var a = [], h = t.holes, u = 0; u < h.length; u++) {
                            var l = h[u];
                            a.push(i.length / 2),
                                i = i.concat(l.points)
                        }
                        var c = e.points,
                            d = e.indices,
                            f = i.length / 2,
                            p = (0,
                                s.hex2rgb)(t.fillColor),
                            g = t.fillAlpha,
                            v = p[0] * g,
                            _ = p[1] * g,
                            m = p[2] * g,
                            y = (0,
                                o.default)(i, a, 2);
                        if (!y)
                            return;
                        for (var x = c.length / 6, b = 0; b < y.length; b += 3)
                            d.push(y[b] + x),
                            d.push(y[b] + x),
                            d.push(y[b + 1] + x),
                            d.push(y[b + 2] + x),
                            d.push(y[b + 2] + x);
                        for (var T = 0; T < f; T++)
                            c.push(i[2 * T], i[2 * T + 1], v, _, m, g)
                    }
                    0 < t.lineWidth && (0,
                        n.default)(t, e, r)
                };
            var n = i(t("./buildLine")),
                s = t("../../../utils"),
                o = i(t("earcut"))
        }, {
            "../../../utils": 122,
            "./buildLine": 59,
            earcut: 4
        }],
        61: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    var i = t.shape,
                        o = i.x,
                        a = i.y,
                        h = i.width,
                        u = i.height;
                    if (t.fill) {
                        var l = (0,
                                s.hex2rgb)(t.fillColor),
                            c = t.fillAlpha,
                            d = l[0] * c,
                            f = l[1] * c,
                            p = l[2] * c,
                            g = e.points,
                            v = e.indices,
                            _ = g.length / 6;
                        g.push(o, a),
                            g.push(d, f, p, c),
                            g.push(o + h, a),
                            g.push(d, f, p, c),
                            g.push(o, a + u),
                            g.push(d, f, p, c),
                            g.push(o + h, a + u),
                            g.push(d, f, p, c),
                            v.push(_, _, _ + 1, _ + 2, _ + 3, _ + 3)
                    }
                    if (t.lineWidth) {
                        var m = t.points;
                        t.points = [o, a, o + h, a, o + h, a + u, o, a + u, o, a],
                            (0,
                                n.default)(t, e, r),
                            t.points = m
                    }
                };
            var i, n = (i = t("./buildLine")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../../utils")
        }, {
            "../../../utils": 122,
            "./buildLine": 59
        }],
        62: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function n(t, e, r) {
                return t + (e - t) * r
            }

            function s(t, e, r, i, s, o) {
                for (var a = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : [], h = 0, u = 0, l = 0, c = 0, d = 0, f = 0, p = 0, g = 0; p <= 20; ++p)
                    h = n(t, r, g = p / 20),
                    u = n(e, i, g),
                    l = n(r, s, g),
                    c = n(i, o, g),
                    d = n(h, l, g),
                    f = n(u, c, g),
                    a.push(d, f);
                return a
            }
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    var i = t.shape,
                        n = i.x,
                        u = i.y,
                        l = i.width,
                        c = i.height,
                        d = i.radius,
                        f = [];
                    if (f.push(n, u + d),
                        s(n, u + c - d, n, u + c, n + d, u + c, f),
                        s(n + l - d, u + c, n + l, u + c, n + l, u + c - d, f),
                        s(n + l, u + d, n + l, u, n + l - d, u, f),
                        s(n + d, u, n, u, n, u + d + 1e-10, f),
                        t.fill) {
                        for (var p = (0,
                                h.hex2rgb)(t.fillColor), g = t.fillAlpha, v = p[0] * g, _ = p[1] * g, m = p[2] * g, y = e.points, x = e.indices, b = y.length / 6, T = (0,
                                o.default)(f, null, 2), E = 0, w = T.length; E < w; E += 3)
                            x.push(T[E] + b),
                            x.push(T[E] + b),
                            x.push(T[E + 1] + b),
                            x.push(T[E + 2] + b),
                            x.push(T[E + 2] + b);
                        for (var S = 0, O = f.length; S < O; S++)
                            y.push(f[S], f[++S], v, _, m, g)
                    }
                    if (t.lineWidth) {
                        var P = t.points;
                        t.points = f,
                            (0,
                                a.default)(t, e, r),
                            t.points = P
                    }
                };
            var o = i(t("earcut")),
                a = i(t("./buildLine")),
                h = t("../../../utils")
        }, {
            "../../../utils": 122,
            "./buildLine": 59,
            earcut: 4
        }],
        63: [function(t, e, r) {
            "use strict";

            function i(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e.default = t,
                    e
            }

            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.autoDetectRenderer = r.Application = r.Filter = r.SpriteMaskFilter = r.Quad = r.RenderTarget = r.ObjectRenderer = r.WebGLManager = r.Shader = r.CanvasRenderTarget = r.TextureUvs = r.VideoBaseTexture = r.BaseRenderTexture = r.RenderTexture = r.BaseTexture = r.Texture = r.Spritesheet = r.CanvasGraphicsRenderer = r.GraphicsRenderer = r.GraphicsData = r.Graphics = r.TextMetrics = r.TextStyle = r.Text = r.SpriteRenderer = r.CanvasTinter = r.CanvasSpriteRenderer = r.Sprite = r.TransformBase = r.TransformStatic = r.Transform = r.Container = r.DisplayObject = r.Bounds = r.glCore = r.WebGLRenderer = r.CanvasRenderer = r.ticker = r.utils = r.settings = void 0;
            var s = t("./const");
            Object.keys(s).forEach(function(t) {
                "default" !== t && "__esModule" !== t && Object.defineProperty(r, t, {
                    enumerable: !0,
                    get: function() {
                        return s[t]
                    }
                })
            });
            var o = t("./math");
            Object.keys(o).forEach(function(t) {
                "default" !== t && "__esModule" !== t && Object.defineProperty(r, t, {
                    enumerable: !0,
                    get: function() {
                        return o[t]
                    }
                })
            });
            var a = t("pixi-gl-core");
            Object.defineProperty(r, "glCore", {
                enumerable: !0,
                get: function() {
                    return n(a).default
                }
            });
            var h = t("./display/Bounds");
            Object.defineProperty(r, "Bounds", {
                enumerable: !0,
                get: function() {
                    return n(h).default
                }
            });
            var u = t("./display/DisplayObject");
            Object.defineProperty(r, "DisplayObject", {
                enumerable: !0,
                get: function() {
                    return n(u).default
                }
            });
            var l = t("./display/Container");
            Object.defineProperty(r, "Container", {
                enumerable: !0,
                get: function() {
                    return n(l).default
                }
            });
            var c = t("./display/Transform");
            Object.defineProperty(r, "Transform", {
                enumerable: !0,
                get: function() {
                    return n(c).default
                }
            });
            var d = t("./display/TransformStatic");
            Object.defineProperty(r, "TransformStatic", {
                enumerable: !0,
                get: function() {
                    return n(d).default
                }
            });
            var f = t("./display/TransformBase");
            Object.defineProperty(r, "TransformBase", {
                enumerable: !0,
                get: function() {
                    return n(f).default
                }
            });
            var p = t("./sprites/Sprite");
            Object.defineProperty(r, "Sprite", {
                enumerable: !0,
                get: function() {
                    return n(p).default
                }
            });
            var g = t("./sprites/canvas/CanvasSpriteRenderer");
            Object.defineProperty(r, "CanvasSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return n(g).default
                }
            });
            var v = t("./sprites/canvas/CanvasTinter");
            Object.defineProperty(r, "CanvasTinter", {
                enumerable: !0,
                get: function() {
                    return n(v).default
                }
            });
            var _ = t("./sprites/webgl/SpriteRenderer");
            Object.defineProperty(r, "SpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return n(_).default
                }
            });
            var m = t("./text/Text");
            Object.defineProperty(r, "Text", {
                enumerable: !0,
                get: function() {
                    return n(m).default
                }
            });
            var y = t("./text/TextStyle");
            Object.defineProperty(r, "TextStyle", {
                enumerable: !0,
                get: function() {
                    return n(y).default
                }
            });
            var x = t("./text/TextMetrics");
            Object.defineProperty(r, "TextMetrics", {
                enumerable: !0,
                get: function() {
                    return n(x).default
                }
            });
            var b = t("./graphics/Graphics");
            Object.defineProperty(r, "Graphics", {
                enumerable: !0,
                get: function() {
                    return n(b).default
                }
            });
            var T = t("./graphics/GraphicsData");
            Object.defineProperty(r, "GraphicsData", {
                enumerable: !0,
                get: function() {
                    return n(T).default
                }
            });
            var E = t("./graphics/webgl/GraphicsRenderer");
            Object.defineProperty(r, "GraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return n(E).default
                }
            });
            var w = t("./graphics/canvas/CanvasGraphicsRenderer");
            Object.defineProperty(r, "CanvasGraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return n(w).default
                }
            });
            var S = t("./textures/Spritesheet");
            Object.defineProperty(r, "Spritesheet", {
                enumerable: !0,
                get: function() {
                    return n(S).default
                }
            });
            var O = t("./textures/Texture");
            Object.defineProperty(r, "Texture", {
                enumerable: !0,
                get: function() {
                    return n(O).default
                }
            });
            var P = t("./textures/BaseTexture");
            Object.defineProperty(r, "BaseTexture", {
                enumerable: !0,
                get: function() {
                    return n(P).default
                }
            });
            var C = t("./textures/RenderTexture");
            Object.defineProperty(r, "RenderTexture", {
                enumerable: !0,
                get: function() {
                    return n(C).default
                }
            });
            var R = t("./textures/BaseRenderTexture");
            Object.defineProperty(r, "BaseRenderTexture", {
                enumerable: !0,
                get: function() {
                    return n(R).default
                }
            });
            var M = t("./textures/VideoBaseTexture");
            Object.defineProperty(r, "VideoBaseTexture", {
                enumerable: !0,
                get: function() {
                    return n(M).default
                }
            });
            var A = t("./textures/TextureUvs");
            Object.defineProperty(r, "TextureUvs", {
                enumerable: !0,
                get: function() {
                    return n(A).default
                }
            });
            var D = t("./renderers/canvas/utils/CanvasRenderTarget");
            Object.defineProperty(r, "CanvasRenderTarget", {
                enumerable: !0,
                get: function() {
                    return n(D).default
                }
            });
            var I = t("./Shader");
            Object.defineProperty(r, "Shader", {
                enumerable: !0,
                get: function() {
                    return n(I).default
                }
            });
            var L = t("./renderers/webgl/managers/WebGLManager");
            Object.defineProperty(r, "WebGLManager", {
                enumerable: !0,
                get: function() {
                    return n(L).default
                }
            });
            var k = t("./renderers/webgl/utils/ObjectRenderer");
            Object.defineProperty(r, "ObjectRenderer", {
                enumerable: !0,
                get: function() {
                    return n(k).default
                }
            });
            var N = t("./renderers/webgl/utils/RenderTarget");
            Object.defineProperty(r, "RenderTarget", {
                enumerable: !0,
                get: function() {
                    return n(N).default
                }
            });
            var B = t("./renderers/webgl/utils/Quad");
            Object.defineProperty(r, "Quad", {
                enumerable: !0,
                get: function() {
                    return n(B).default
                }
            });
            var U = t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");
            Object.defineProperty(r, "SpriteMaskFilter", {
                enumerable: !0,
                get: function() {
                    return n(U).default
                }
            });
            var F = t("./renderers/webgl/filters/Filter");
            Object.defineProperty(r, "Filter", {
                enumerable: !0,
                get: function() {
                    return n(F).default
                }
            });
            var j = t("./Application");
            Object.defineProperty(r, "Application", {
                enumerable: !0,
                get: function() {
                    return n(j).default
                }
            });
            var G = t("./autoDetectRenderer");
            Object.defineProperty(r, "autoDetectRenderer", {
                enumerable: !0,
                get: function() {
                    return G.autoDetectRenderer
                }
            });
            var X = i(t("./utils")),
                V = i(t("./ticker")),
                W = n(t("./settings")),
                H = n(t("./renderers/canvas/CanvasRenderer")),
                Y = n(t("./renderers/webgl/WebGLRenderer"));
            r.settings = W.default,
                r.utils = X,
                r.ticker = V,
                r.CanvasRenderer = H.default,
                r.WebGLRenderer = Y.default
        }, {
            "./Application": 41,
            "./Shader": 42,
            "./autoDetectRenderer": 43,
            "./const": 44,
            "./display/Bounds": 45,
            "./display/Container": 46,
            "./display/DisplayObject": 47,
            "./display/Transform": 48,
            "./display/TransformBase": 49,
            "./display/TransformStatic": 50,
            "./graphics/Graphics": 51,
            "./graphics/GraphicsData": 52,
            "./graphics/canvas/CanvasGraphicsRenderer": 53,
            "./graphics/webgl/GraphicsRenderer": 55,
            "./math": 68,
            "./renderers/canvas/CanvasRenderer": 75,
            "./renderers/canvas/utils/CanvasRenderTarget": 77,
            "./renderers/webgl/WebGLRenderer": 82,
            "./renderers/webgl/filters/Filter": 84,
            "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 87,
            "./renderers/webgl/managers/WebGLManager": 91,
            "./renderers/webgl/utils/ObjectRenderer": 92,
            "./renderers/webgl/utils/Quad": 93,
            "./renderers/webgl/utils/RenderTarget": 94,
            "./settings": 99,
            "./sprites/Sprite": 100,
            "./sprites/canvas/CanvasSpriteRenderer": 101,
            "./sprites/canvas/CanvasTinter": 102,
            "./sprites/webgl/SpriteRenderer": 104,
            "./text/Text": 106,
            "./text/TextMetrics": 107,
            "./text/TextStyle": 108,
            "./textures/BaseRenderTexture": 109,
            "./textures/BaseTexture": 110,
            "./textures/RenderTexture": 111,
            "./textures/Spritesheet": 112,
            "./textures/Texture": 113,
            "./textures/TextureUvs": 114,
            "./textures/VideoBaseTexture": 115,
            "./ticker": 118,
            "./utils": 122,
            "pixi-gl-core": 17
        }],
        64: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t < 0 ? -1 : 0 < t ? 1 : 0
            }
            r.__esModule = !0;
            var n, s = (n = t("./Matrix")) && n.__esModule ? n : {
                    default: n
                },
                o = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
                a = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
                h = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
                u = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
                l = [],
                c = [];
            ! function() {
                for (var t = 0; t < 16; t++) {
                    var e = [];
                    c.push(e);
                    for (var r = 0; r < 16; r++)
                        for (var n = i(o[t] * o[r] + h[t] * a[r]), d = i(a[t] * o[r] + u[t] * a[r]), f = i(o[t] * h[r] + h[t] * u[r]), p = i(a[t] * h[r] + u[t] * u[r]), g = 0; g < 16; g++)
                            if (o[g] === n && a[g] === d && h[g] === f && u[g] === p) {
                                e.push(g);
                                break
                            }
                }
                for (var v = 0; v < 16; v++) {
                    var _ = new s.default;
                    _.set(o[v], a[v], h[v], u[v], 0, 0),
                        l.push(_)
                }
            }();
            var d = {
                E: 0,
                SE: 1,
                S: 2,
                SW: 3,
                W: 4,
                NW: 5,
                N: 6,
                NE: 7,
                MIRROR_VERTICAL: 8,
                MIRROR_HORIZONTAL: 12,
                uX: function(t) {
                    return o[t]
                },
                uY: function(t) {
                    return a[t]
                },
                vX: function(t) {
                    return h[t]
                },
                vY: function(t) {
                    return u[t]
                },
                inv: function(t) {
                    return 8 & t ? 15 & t : 7 & -t
                },
                add: function(t, e) {
                    return c[t][e]
                },
                sub: function(t, e) {
                    return c[t][d.inv(e)]
                },
                rotate180: function(t) {
                    return 4 ^ t
                },
                isSwapWidthHeight: function(t) {
                    return 2 == (3 & t)
                },
                byDirection: function(t, e) {
                    return 2 * Math.abs(t) <= Math.abs(e) ? 0 <= e ? d.S : d.N : 2 * Math.abs(e) <= Math.abs(t) ? 0 < t ? d.E : d.W : 0 < e ? 0 < t ? d.SE : d.SW : 0 < t ? d.NE : d.NW
                },
                matrixAppendRotationInv: function(t, e) {
                    var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                        i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0,
                        n = l[d.inv(e)];
                    n.tx = r,
                        n.ty = i,
                        t.append(n)
                }
            };
            r.default = d
        }, {
            "./Matrix": 65
        }],
        65: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = (i = t("./Point")) && i.__esModule ? i : {
                    default: i
                },
                o = function() {
                    function t() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1,
                            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                            n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 1,
                            s = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
                            o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.a = e,
                            this.b = r,
                            this.c = i,
                            this.d = n,
                            this.tx = s,
                            this.ty = o,
                            this.array = null
                    }
                    return t.prototype.fromArray = function(t) {
                            this.a = t[0],
                                this.b = t[1],
                                this.c = t[3],
                                this.d = t[4],
                                this.tx = t[2],
                                this.ty = t[5]
                        },
                        t.prototype.set = function(t, e, r, i, n, s) {
                            return this.a = t,
                                this.b = e,
                                this.c = r,
                                this.d = i,
                                this.tx = n,
                                this.ty = s,
                                this
                        },
                        t.prototype.toArray = function(t, e) {
                            this.array || (this.array = new Float32Array(9));
                            var r = e || this.array;
                            return r[8] = (r[7] = t ? (r[0] = this.a,
                                        r[1] = this.b,
                                        r[2] = 0,
                                        r[3] = this.c,
                                        r[4] = this.d,
                                        r[5] = 0,
                                        r[6] = this.tx,
                                        this.ty) : (r[0] = this.a,
                                        r[1] = this.c,
                                        r[2] = this.tx,
                                        r[3] = this.b,
                                        r[4] = this.d,
                                        r[5] = this.ty,
                                        r[6] = 0),
                                    1),
                                r
                        },
                        t.prototype.apply = function(t, e) {
                            e = e || new s.default;
                            var r = t.x,
                                i = t.y;
                            return e.x = this.a * r + this.c * i + this.tx,
                                e.y = this.b * r + this.d * i + this.ty,
                                e
                        },
                        t.prototype.applyInverse = function(t, e) {
                            e = e || new s.default;
                            var r = 1 / (this.a * this.d + this.c * -this.b),
                                i = t.x,
                                n = t.y;
                            return e.x = this.d * r * i + -this.c * r * n + (this.ty * this.c - this.tx * this.d) * r,
                                e.y = this.a * r * n + -this.b * r * i + (-this.ty * this.a + this.tx * this.b) * r,
                                e
                        },
                        t.prototype.translate = function(t, e) {
                            return this.tx += t,
                                this.ty += e,
                                this
                        },
                        t.prototype.scale = function(t, e) {
                            return this.a *= t,
                                this.d *= e,
                                this.c *= t,
                                this.b *= e,
                                this.tx *= t,
                                this.ty *= e,
                                this
                        },
                        t.prototype.rotate = function(t) {
                            var e = Math.cos(t),
                                r = Math.sin(t),
                                i = this.a,
                                n = this.c,
                                s = this.tx;
                            return this.a = i * e - this.b * r,
                                this.b = i * r + this.b * e,
                                this.c = n * e - this.d * r,
                                this.d = n * r + this.d * e,
                                this.tx = s * e - this.ty * r,
                                this.ty = s * r + this.ty * e,
                                this
                        },
                        t.prototype.append = function(t) {
                            var e = this.a,
                                r = this.b,
                                i = this.c,
                                n = this.d;
                            return this.a = t.a * e + t.b * i,
                                this.b = t.a * r + t.b * n,
                                this.c = t.c * e + t.d * i,
                                this.d = t.c * r + t.d * n,
                                this.tx = t.tx * e + t.ty * i + this.tx,
                                this.ty = t.tx * r + t.ty * n + this.ty,
                                this
                        },
                        t.prototype.setTransform = function(t, e, r, i, n, s, o, a, h) {
                            var u = Math.sin(o),
                                l = Math.cos(o),
                                c = Math.cos(h),
                                d = Math.sin(h),
                                f = -Math.sin(a),
                                p = Math.cos(a),
                                g = l * n,
                                v = u * n,
                                _ = -u * s,
                                m = l * s;
                            return this.a = c * g + d * _,
                                this.b = c * v + d * m,
                                this.c = f * g + p * _,
                                this.d = f * v + p * m,
                                this.tx = t + (r * g + i * _),
                                this.ty = e + (r * v + i * m),
                                this
                        },
                        t.prototype.prepend = function(t) {
                            var e = this.tx;
                            if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                                var r = this.a,
                                    i = this.c;
                                this.a = r * t.a + this.b * t.c,
                                    this.b = r * t.b + this.b * t.d,
                                    this.c = i * t.a + this.d * t.c,
                                    this.d = i * t.b + this.d * t.d
                            }
                            return this.tx = e * t.a + this.ty * t.c + t.tx,
                                this.ty = e * t.b + this.ty * t.d + t.ty,
                                this
                        },
                        t.prototype.decompose = function(t) {
                            var e = this.a,
                                r = this.b,
                                i = this.c,
                                n = this.d,
                                s = -Math.atan2(-i, n),
                                o = Math.atan2(r, e);
                            return Math.abs(s + o) < 1e-5 ? (t.rotation = o,
                                    e < 0 && 0 <= n && (t.rotation += t.rotation <= 0 ? Math.PI : -Math.PI),
                                    t.skew.x = t.skew.y = 0) : (t.skew.x = s,
                                    t.skew.y = o),
                                t.scale.x = Math.sqrt(e * e + r * r),
                                t.scale.y = Math.sqrt(i * i + n * n),
                                t.position.x = this.tx,
                                t.position.y = this.ty,
                                t
                        },
                        t.prototype.invert = function() {
                            var t = this.a,
                                e = this.b,
                                r = this.c,
                                i = this.d,
                                n = this.tx,
                                s = t * i - e * r;
                            return this.a = i / s,
                                this.b = -e / s,
                                this.c = -r / s,
                                this.d = t / s,
                                this.tx = (r * this.ty - i * n) / s,
                                this.ty = -(t * this.ty - e * n) / s,
                                this
                        },
                        t.prototype.identity = function() {
                            return this.a = 1,
                                this.b = 0,
                                this.c = 0,
                                this.d = 1,
                                this.tx = 0,
                                this.ty = 0,
                                this
                        },
                        t.prototype.clone = function() {
                            var e = new t;
                            return e.a = this.a,
                                e.b = this.b,
                                e.c = this.c,
                                e.d = this.d,
                                e.tx = this.tx,
                                e.ty = this.ty,
                                e
                        },
                        t.prototype.copy = function(t) {
                            return t.a = this.a,
                                t.b = this.b,
                                t.c = this.c,
                                t.d = this.d,
                                t.tx = this.tx,
                                t.ty = this.ty,
                                t
                        },
                        n(t, null, [{
                            key: "IDENTITY",
                            get: function() {
                                return new t
                            }
                        }, {
                            key: "TEMP_MATRIX",
                            get: function() {
                                return new t
                            }
                        }]),
                        t
                }();
            r.default = o
        }, {
            "./Point": 67
        }],
        66: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = function() {
                    function t(e, r) {
                        var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                            n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this._x = i,
                            this._y = n,
                            this.cb = e,
                            this.scope = r
                    }
                    return t.prototype.set = function(t, e) {
                            var r = t || 0,
                                i = e || (0 !== e ? r : 0);
                            this._x === r && this._y === i || (this._x = r,
                                this._y = i,
                                this.cb.call(this.scope))
                        },
                        t.prototype.copy = function(t) {
                            this._x === t.x && this._y === t.y || (this._x = t.x,
                                this._y = t.y,
                                this.cb.call(this.scope))
                        },
                        i(t, [{
                            key: "x",
                            get: function() {
                                return this._x
                            },
                            set: function(t) {
                                this._x !== t && (this._x = t,
                                    this.cb.call(this.scope))
                            }
                        }, {
                            key: "y",
                            get: function() {
                                return this._y
                            },
                            set: function(t) {
                                this._y !== t && (this._y = t,
                                    this.cb.call(this.scope))
                            }
                        }]),
                        t
                }();
            r.default = n
        }, {}],
        67: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                        r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                    (function(e, r) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    })(this),
                    this.x = e,
                        this.y = r
                }
                return t.prototype.clone = function() {
                        return new t(this.x, this.y)
                    },
                    t.prototype.copy = function(t) {
                        this.set(t.x, t.y)
                    },
                    t.prototype.equals = function(t) {
                        return t.x === this.x && t.y === this.y
                    },
                    t.prototype.set = function(t, e) {
                        this.x = t || 0,
                            this.y = e || (0 !== e ? this.x : 0)
                    },
                    t
            }();
            r.default = i
        }, {}],
        68: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = t("./Point");
            Object.defineProperty(r, "Point", {
                enumerable: !0,
                get: function() {
                    return i(n).default
                }
            });
            var s = t("./ObservablePoint");
            Object.defineProperty(r, "ObservablePoint", {
                enumerable: !0,
                get: function() {
                    return i(s).default
                }
            });
            var o = t("./Matrix");
            Object.defineProperty(r, "Matrix", {
                enumerable: !0,
                get: function() {
                    return i(o).default
                }
            });
            var a = t("./GroupD8");
            Object.defineProperty(r, "GroupD8", {
                enumerable: !0,
                get: function() {
                    return i(a).default
                }
            });
            var h = t("./shapes/Circle");
            Object.defineProperty(r, "Circle", {
                enumerable: !0,
                get: function() {
                    return i(h).default
                }
            });
            var u = t("./shapes/Ellipse");
            Object.defineProperty(r, "Ellipse", {
                enumerable: !0,
                get: function() {
                    return i(u).default
                }
            });
            var l = t("./shapes/Polygon");
            Object.defineProperty(r, "Polygon", {
                enumerable: !0,
                get: function() {
                    return i(l).default
                }
            });
            var c = t("./shapes/Rectangle");
            Object.defineProperty(r, "Rectangle", {
                enumerable: !0,
                get: function() {
                    return i(c).default
                }
            });
            var d = t("./shapes/RoundedRectangle");
            Object.defineProperty(r, "RoundedRectangle", {
                enumerable: !0,
                get: function() {
                    return i(d).default
                }
            })
        }, {
            "./GroupD8": 64,
            "./Matrix": 65,
            "./ObservablePoint": 66,
            "./Point": 67,
            "./shapes/Circle": 69,
            "./shapes/Ellipse": 70,
            "./shapes/Polygon": 71,
            "./shapes/Rectangle": 72,
            "./shapes/RoundedRectangle": 73
        }],
        69: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("./Rectangle")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../const"),
                o = function() {
                    function t() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.x = e,
                            this.y = r,
                            this.radius = i,
                            this.type = s.SHAPES.CIRC
                    }
                    return t.prototype.clone = function() {
                            return new t(this.x, this.y, this.radius)
                        },
                        t.prototype.contains = function(t, e) {
                            if (this.radius <= 0)
                                return !1;
                            var r = this.radius * this.radius,
                                i = this.x - t,
                                n = this.y - e;
                            return (i *= i) + (n *= n) <= r
                        },
                        t.prototype.getBounds = function() {
                            return new n.default(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
                        },
                        t
                }();
            r.default = o
        }, {
            "../../const": 44,
            "./Rectangle": 72
        }],
        70: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("./Rectangle")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../const"),
                o = function() {
                    function t() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                            n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.x = e,
                            this.y = r,
                            this.width = i,
                            this.height = n,
                            this.type = s.SHAPES.ELIP
                    }
                    return t.prototype.clone = function() {
                            return new t(this.x, this.y, this.width, this.height)
                        },
                        t.prototype.contains = function(t, e) {
                            if (this.width <= 0 || this.height <= 0)
                                return !1;
                            var r = (t - this.x) / this.width,
                                i = (e - this.y) / this.height;
                            return (r *= r) + (i *= i) <= 1
                        },
                        t.prototype.getBounds = function() {
                            return new n.default(this.x - this.width, this.y - this.height, this.width, this.height)
                        },
                        t
                }();
            r.default = o
        }, {
            "../../const": 44,
            "./Rectangle": 72
        }],
        71: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("../Point")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../const"),
                o = function() {
                    function t() {
                        for (var e = arguments.length, r = Array(e), i = 0; i < e; i++)
                            r[i] = arguments[i];
                        if (function(e, r) {
                                if (!(e instanceof t))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this),
                            Array.isArray(r[0]) && (r = r[0]),
                            r[0] instanceof n.default) {
                            for (var o = [], a = 0, h = r.length; a < h; a++)
                                o.push(r[a].x, r[a].y);
                            r = o
                        }
                        this.closed = !0,
                            this.points = r,
                            this.type = s.SHAPES.POLY
                    }
                    return t.prototype.clone = function() {
                            return new t(this.points.slice())
                        },
                        t.prototype.close = function() {
                            var t = this.points;
                            t[0] === t[t.length - 2] && t[1] === t[t.length - 1] || t.push(t[0], t[1])
                        },
                        t.prototype.contains = function(t, e) {
                            for (var r = !1, i = this.points.length / 2, n = 0, s = i - 1; n < i; s = n++) {
                                var o = this.points[2 * n],
                                    a = this.points[2 * n + 1],
                                    h = this.points[2 * s],
                                    u = this.points[2 * s + 1];
                                e < a != e < u && t < (e - a) / (u - a) * (h - o) + o && (r = !r)
                            }
                            return r
                        },
                        t
                }();
            r.default = o
        }, {
            "../../const": 44,
            "../Point": 67
        }],
        72: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = t("../../const"),
                s = function() {
                    function t() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.x = e,
                            this.y = r,
                            this.width = i,
                            this.height = s,
                            this.type = n.SHAPES.RECT
                    }
                    return t.prototype.clone = function() {
                            return new t(this.x, this.y, this.width, this.height)
                        },
                        t.prototype.copy = function(t) {
                            return this.x = t.x,
                                this.y = t.y,
                                this.width = t.width,
                                this.height = t.height,
                                this
                        },
                        t.prototype.contains = function(t, e) {
                            return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
                        },
                        t.prototype.pad = function(t, e) {
                            t = t || 0,
                                e = e || (0 !== e ? t : 0),
                                this.x -= t,
                                this.y -= e,
                                this.width += 2 * t,
                                this.height += 2 * e
                        },
                        t.prototype.fit = function(t) {
                            this.x < t.x && (this.width += this.x,
                                    this.width < 0 && (this.width = 0),
                                    this.x = t.x),
                                this.y < t.y && (this.height += this.y,
                                    this.height < 0 && (this.height = 0),
                                    this.y = t.y),
                                this.x + this.width > t.x + t.width && (this.width = t.width - this.x,
                                    this.width < 0 && (this.width = 0)),
                                this.y + this.height > t.y + t.height && (this.height = t.height - this.y,
                                    this.height < 0 && (this.height = 0))
                        },
                        t.prototype.enlarge = function(t) {
                            var e = Math.min(this.x, t.x),
                                r = Math.max(this.x + this.width, t.x + t.width),
                                i = Math.min(this.y, t.y),
                                n = Math.max(this.y + this.height, t.y + t.height);
                            this.x = e,
                                this.width = r - e,
                                this.y = i,
                                this.height = n - i
                        },
                        i(t, [{
                            key: "left",
                            get: function() {
                                return this.x
                            }
                        }, {
                            key: "right",
                            get: function() {
                                return this.x + this.width
                            }
                        }, {
                            key: "top",
                            get: function() {
                                return this.y
                            }
                        }, {
                            key: "bottom",
                            get: function() {
                                return this.y + this.height
                            }
                        }], [{
                            key: "EMPTY",
                            get: function() {
                                return new t(0, 0, 0, 0)
                            }
                        }]),
                        t
                }();
            r.default = s
        }, {
            "../../const": 44
        }],
        73: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = t("../../const"),
                n = function() {
                    function t() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0,
                            o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 20;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.x = e,
                            this.y = r,
                            this.width = n,
                            this.height = s,
                            this.radius = o,
                            this.type = i.SHAPES.RREC
                    }
                    return t.prototype.clone = function() {
                            return new t(this.x, this.y, this.width, this.height, this.radius)
                        },
                        t.prototype.contains = function(t, e) {
                            if (this.width <= 0 || this.height <= 0)
                                return !1;
                            if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                                if (e >= this.y + this.radius && e <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius)
                                    return !0;
                                var r = t - (this.x + this.radius),
                                    i = e - (this.y + this.radius),
                                    n = this.radius * this.radius;
                                if (r * r + i * i <= n)
                                    return !0;
                                if ((r = t - (this.x + this.width - this.radius)) * r + i * i <= n)
                                    return !0;
                                if (r * r + (i = e - (this.y + this.height - this.radius)) * i <= n)
                                    return !0;
                                if ((r = t - (this.x + this.radius)) * r + i * i <= n)
                                    return !0
                            }
                            return !1
                        },
                        t
                }();
            r.default = n
        }, {
            "../../const": 44
        }],
        74: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("../utils"),
                o = t("../math"),
                a = t("../const"),
                h = i(t("../settings")),
                u = i(t("../display/Container")),
                l = i(t("../textures/RenderTexture")),
                c = i(t("eventemitter3")),
                d = new o.Matrix,
                f = function(t) {
                    function e(r, i, n, l) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var c = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return (0,
                                s.sayHello)(r),
                            "number" == typeof i && (i = Object.assign({
                                width: i,
                                height: n || h.default.RENDER_OPTIONS.height
                            }, l)),
                            i = Object.assign({}, h.default.RENDER_OPTIONS, i),
                            c.options = i,
                            c.type = a.RENDERER_TYPE.UNKNOWN,
                            c.screen = new o.Rectangle(0, 0, i.width, i.height),
                            c.view = i.view || document.createElement("canvas"),
                            c.resolution = i.resolution || h.default.RESOLUTION,
                            c.transparent = i.transparent,
                            c.autoResize = i.autoResize || !1,
                            c.blendModes = null,
                            c.preserveDrawingBuffer = i.preserveDrawingBuffer,
                            c.clearBeforeRender = i.clearBeforeRender,
                            c.roundPixels = i.roundPixels,
                            c._backgroundColor = 0,
                            c._backgroundColorRgba = [0, 0, 0, 0],
                            c._backgroundColorString = "#000000",
                            c.backgroundColor = i.backgroundColor || c._backgroundColor,
                            c._tempDisplayObjectParent = new u.default,
                            c._lastObjectRendered = c._tempDisplayObjectParent,
                            c
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.resize = function(t, e) {
                            this.screen.width = t,
                                this.screen.height = e,
                                this.view.width = t * this.resolution,
                                this.view.height = e * this.resolution,
                                this.autoResize && (this.view.style.width = t + "px",
                                    this.view.style.height = e + "px")
                        },
                        e.prototype.generateTexture = function(t, e, r) {
                            var i = t.getLocalBounds(),
                                n = l.default.create(0 | i.width, 0 | i.height, e, r);
                            return d.tx = -i.x,
                                d.ty = -i.y,
                                this.render(t, n, !1, d, !0),
                                n
                        },
                        e.prototype.destroy = function(t) {
                            t && this.view.parentNode && this.view.parentNode.removeChild(this.view),
                                this.type = a.RENDERER_TYPE.UNKNOWN,
                                this.view = null,
                                this.screen = null,
                                this.resolution = 0,
                                this.transparent = !1,
                                this.autoResize = !1,
                                this.blendModes = null,
                                this.options = null,
                                this.preserveDrawingBuffer = !1,
                                this.clearBeforeRender = !1,
                                this.roundPixels = !1,
                                this._backgroundColor = 0,
                                this._backgroundColorRgba = null,
                                this._backgroundColorString = null,
                                this._tempDisplayObjectParent = null,
                                this._lastObjectRendered = null
                        },
                        n(e, [{
                            key: "width",
                            get: function() {
                                return this.view.width
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this.view.height
                            }
                        }, {
                            key: "backgroundColor",
                            get: function() {
                                return this._backgroundColor
                            },
                            set: function(t) {
                                this._backgroundColor = t,
                                    this._backgroundColorString = (0,
                                        s.hex2string)(t),
                                    (0,
                                        s.hex2rgb)(t, this._backgroundColorRgba)
                            }
                        }]),
                        e
                }(c.default);
            r.default = f
        }, {
            "../const": 44,
            "../display/Container": 46,
            "../math": 68,
            "../settings": 99,
            "../textures/RenderTexture": 111,
            "../utils": 122,
            eventemitter3: 5
        }],
        75: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("../SystemRenderer")),
                s = i(t("./utils/CanvasMaskManager")),
                o = i(t("./utils/CanvasRenderTarget")),
                a = i(t("./utils/mapCanvasBlendModesToPixi")),
                h = t("../../utils"),
                u = t("../../const"),
                l = i(t("../../settings")),
                c = function(t) {
                    function e(r, i, n) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var o = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, "Canvas", r, i, n));
                        return o.type = u.RENDERER_TYPE.CANVAS,
                            o.rootContext = o.view.getContext("2d", {
                                alpha: o.transparent
                            }),
                            o.context = o.rootContext,
                            o.refresh = !0,
                            o.maskManager = new s.default(o),
                            o.smoothProperty = "imageSmoothingEnabled",
                            o.rootContext.imageSmoothingEnabled || (o.rootContext.webkitImageSmoothingEnabled ? o.smoothProperty = "webkitImageSmoothingEnabled" : o.rootContext.mozImageSmoothingEnabled ? o.smoothProperty = "mozImageSmoothingEnabled" : o.rootContext.oImageSmoothingEnabled ? o.smoothProperty = "oImageSmoothingEnabled" : o.rootContext.msImageSmoothingEnabled && (o.smoothProperty = "msImageSmoothingEnabled")),
                            o.initPlugins(),
                            o.blendModes = (0,
                                a.default)(),
                            o._activeBlendMode = null,
                            o.renderingToScreen = !1,
                            o.resize(o.options.width, o.options.height),
                            o
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.render = function(t, e, r, i, n) {
                            if (this.view) {
                                this.renderingToScreen = !e,
                                    this.emit("prerender");
                                var s = this.resolution;
                                e ? ((e = e.baseTexture || e)._canvasRenderTarget || (e._canvasRenderTarget = new o.default(e.width, e.height, e.resolution),
                                        e.source = e._canvasRenderTarget.canvas,
                                        e.valid = !0),
                                    this.context = e._canvasRenderTarget.context,
                                    this.resolution = e._canvasRenderTarget.resolution) : this.context = this.rootContext;
                                var a = this.context;
                                if (e || (this._lastObjectRendered = t), !n) {
                                    var h = t.parent,
                                        l = this._tempDisplayObjectParent.transform.worldTransform;
                                    i ? (i.copy(l),
                                            this._tempDisplayObjectParent.transform._worldID = -1) : l.identity(),
                                        t.parent = this._tempDisplayObjectParent,
                                        t.updateTransform(),
                                        t.parent = h
                                }
                                a.setTransform(1, 0, 0, 1, 0, 0),
                                    a.globalAlpha = 1,
                                    a.globalCompositeOperation = this.blendModes[u.BLEND_MODES.NORMAL],
                                    navigator.isCocoonJS && this.view.screencanvas && (a.fillStyle = "black",
                                        a.clear()),
                                    (void 0 !== r ? r : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? a.clearRect(0, 0, this.width, this.height) : (a.fillStyle = this._backgroundColorString,
                                        a.fillRect(0, 0, this.width, this.height)));
                                var c = this.context;
                                this.context = a,
                                    t.renderCanvas(this),
                                    this.context = c,
                                    this.resolution = s,
                                    this.emit("postrender")
                            }
                        },
                        e.prototype.clear = function(t) {
                            var e = this.context;
                            t = t || this._backgroundColorString, !this.transparent && t ? (e.fillStyle = t,
                                e.fillRect(0, 0, this.width, this.height)) : e.clearRect(0, 0, this.width, this.height)
                        },
                        e.prototype.setBlendMode = function(t) {
                            this._activeBlendMode !== t && (this._activeBlendMode = t,
                                this.context.globalCompositeOperation = this.blendModes[t])
                        },
                        e.prototype.destroy = function(e) {
                            this.destroyPlugins(),
                                t.prototype.destroy.call(this, e),
                                this.context = null,
                                this.refresh = !0,
                                this.maskManager.destroy(),
                                this.maskManager = null,
                                this.smoothProperty = null
                        },
                        e.prototype.resize = function(e, r) {
                            t.prototype.resize.call(this, e, r),
                                this.smoothProperty && (this.rootContext[this.smoothProperty] = l.default.SCALE_MODE === u.SCALE_MODES.LINEAR)
                        },
                        e
                }(n.default);
            r.default = c,
                h.pluginTarget.mixin(c)
        }, {
            "../../const": 44,
            "../../settings": 99,
            "../../utils": 122,
            "../SystemRenderer": 74,
            "./utils/CanvasMaskManager": 76,
            "./utils/CanvasRenderTarget": 77,
            "./utils/mapCanvasBlendModesToPixi": 79
        }],
        76: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = t("../../../const"),
                n = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.renderer = e
                    }
                    return t.prototype.pushMask = function(t) {
                            var e = this.renderer;
                            e.context.save();
                            var r = t.alpha,
                                i = t.transform.worldTransform,
                                n = e.resolution;
                            e.context.setTransform(i.a * n, i.b * n, i.c * n, i.d * n, i.tx * n, i.ty * n),
                                t._texture || (this.renderGraphicsShape(t),
                                    e.context.clip()),
                                t.worldAlpha = r
                        },
                        t.prototype.renderGraphicsShape = function(t) {
                            var e = this.renderer.context,
                                r = t.graphicsData.length;
                            if (0 !== r) {
                                e.beginPath();
                                for (var n = 0; n < r; n++) {
                                    var s = t.graphicsData[n],
                                        o = s.shape;
                                    if (s.type === i.SHAPES.POLY) {
                                        var a = o.points;
                                        e.moveTo(a[0], a[1]);
                                        for (var h = 1; h < a.length / 2; h++)
                                            e.lineTo(a[2 * h], a[2 * h + 1]);
                                        a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath()
                                    } else if (s.type === i.SHAPES.RECT)
                                        e.rect(o.x, o.y, o.width, o.height),
                                        e.closePath();
                                    else if (s.type === i.SHAPES.CIRC)
                                        e.arc(o.x, o.y, o.radius, 0, 2 * Math.PI),
                                        e.closePath();
                                    else if (s.type === i.SHAPES.ELIP) {
                                        var u = 2 * o.width,
                                            l = 2 * o.height,
                                            c = o.x - u / 2,
                                            d = o.y - l / 2,
                                            f = u / 2 * .5522848,
                                            p = l / 2 * .5522848,
                                            g = c + u,
                                            v = d + l,
                                            _ = c + u / 2,
                                            m = d + l / 2;
                                        e.moveTo(c, m),
                                            e.bezierCurveTo(c, m - p, _ - f, d, _, d),
                                            e.bezierCurveTo(_ + f, d, g, m - p, g, m),
                                            e.bezierCurveTo(g, m + p, _ + f, v, _, v),
                                            e.bezierCurveTo(_ - f, v, c, m + p, c, m),
                                            e.closePath()
                                    } else if (s.type === i.SHAPES.RREC) {
                                        var y = o.x,
                                            x = o.y,
                                            b = o.width,
                                            T = o.height,
                                            E = o.radius,
                                            w = Math.min(b, T) / 2 | 0;
                                        E = w < E ? w : E,
                                            e.moveTo(y, x + E),
                                            e.lineTo(y, x + T - E),
                                            e.quadraticCurveTo(y, x + T, y + E, x + T),
                                            e.lineTo(y + b - E, x + T),
                                            e.quadraticCurveTo(y + b, x + T, y + b, x + T - E),
                                            e.lineTo(y + b, x + E),
                                            e.quadraticCurveTo(y + b, x, y + b - E, x),
                                            e.lineTo(y + E, x),
                                            e.quadraticCurveTo(y, x, y, x + E),
                                            e.closePath()
                                    }
                                }
                            }
                        },
                        t.prototype.popMask = function(t) {
                            t.context.restore()
                        },
                        t.prototype.destroy = function() {},
                        t
                }();
            r.default = n
        }, {
            "../../../const": 44
        }],
        77: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = (i = t("../../../settings")) && i.__esModule ? i : {
                    default: i
                },
                o = function() {
                    function t(e, r, i) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.canvas = document.createElement("canvas"),
                            this.context = this.canvas.getContext("2d"),
                            this.resolution = i || s.default.RESOLUTION,
                            this.resize(e, r)
                    }
                    return t.prototype.clear = function() {
                            this.context.setTransform(1, 0, 0, 1, 0, 0),
                                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                        },
                        t.prototype.resize = function(t, e) {
                            this.canvas.width = t * this.resolution,
                                this.canvas.height = e * this.resolution
                        },
                        t.prototype.destroy = function() {
                            this.context = null,
                                this.canvas = null
                        },
                        n(t, [{
                            key: "width",
                            get: function() {
                                return this.canvas.width
                            },
                            set: function(t) {
                                this.canvas.width = t
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this.canvas.height
                            },
                            set: function(t) {
                                this.canvas.height = t
                            }
                        }]),
                        t
                }();
            r.default = o
        }, {
            "../../../settings": 99
        }],
        78: [function(t, e, r) {
            "use strict";

            function i(t) {
                var e = document.createElement("canvas");
                e.width = 6,
                    e.height = 1;
                var r = e.getContext("2d");
                return r.fillStyle = t,
                    r.fillRect(0, 0, 6, 1),
                    e
            }
            r.__esModule = !0,
                r.default = function() {
                    if ("undefined" == typeof document)
                        return !1;
                    var t = i("#ff00ff"),
                        e = i("#ffff00"),
                        r = document.createElement("canvas");
                    r.width = 6,
                        r.height = 1;
                    var n = r.getContext("2d");
                    n.globalCompositeOperation = "multiply",
                        n.drawImage(t, 0, 0),
                        n.drawImage(e, 2, 0);
                    var s = n.getImageData(2, 0, 1, 1);
                    if (!s)
                        return !1;
                    var o = s.data;
                    return 255 === o[0] && 0 === o[1] && 0 === o[2]
                }
        }, {}],
        79: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                    return (0,
                            s.default)() ? (t[n.BLEND_MODES.NORMAL] = "source-over",
                            t[n.BLEND_MODES.ADD] = "lighter",
                            t[n.BLEND_MODES.MULTIPLY] = "multiply",
                            t[n.BLEND_MODES.SCREEN] = "screen",
                            t[n.BLEND_MODES.OVERLAY] = "overlay",
                            t[n.BLEND_MODES.DARKEN] = "darken",
                            t[n.BLEND_MODES.LIGHTEN] = "lighten",
                            t[n.BLEND_MODES.COLOR_DODGE] = "color-dodge",
                            t[n.BLEND_MODES.COLOR_BURN] = "color-burn",
                            t[n.BLEND_MODES.HARD_LIGHT] = "hard-light",
                            t[n.BLEND_MODES.SOFT_LIGHT] = "soft-light",
                            t[n.BLEND_MODES.DIFFERENCE] = "difference",
                            t[n.BLEND_MODES.EXCLUSION] = "exclusion",
                            t[n.BLEND_MODES.HUE] = "hue",
                            t[n.BLEND_MODES.SATURATION] = "saturate",
                            t[n.BLEND_MODES.COLOR] = "color",
                            t[n.BLEND_MODES.LUMINOSITY] = "luminosity") : (t[n.BLEND_MODES.NORMAL] = "source-over",
                            t[n.BLEND_MODES.ADD] = "lighter",
                            t[n.BLEND_MODES.MULTIPLY] = "source-over",
                            t[n.BLEND_MODES.SCREEN] = "source-over",
                            t[n.BLEND_MODES.OVERLAY] = "source-over",
                            t[n.BLEND_MODES.DARKEN] = "source-over",
                            t[n.BLEND_MODES.LIGHTEN] = "source-over",
                            t[n.BLEND_MODES.COLOR_DODGE] = "source-over",
                            t[n.BLEND_MODES.COLOR_BURN] = "source-over",
                            t[n.BLEND_MODES.HARD_LIGHT] = "source-over",
                            t[n.BLEND_MODES.SOFT_LIGHT] = "source-over",
                            t[n.BLEND_MODES.DIFFERENCE] = "source-over",
                            t[n.BLEND_MODES.EXCLUSION] = "source-over",
                            t[n.BLEND_MODES.HUE] = "source-over",
                            t[n.BLEND_MODES.SATURATION] = "source-over",
                            t[n.BLEND_MODES.COLOR] = "source-over",
                            t[n.BLEND_MODES.LUMINOSITY] = "source-over"),
                        t[n.BLEND_MODES.NORMAL_NPM] = t[n.BLEND_MODES.NORMAL],
                        t[n.BLEND_MODES.ADD_NPM] = t[n.BLEND_MODES.ADD],
                        t[n.BLEND_MODES.SCREEN_NPM] = t[n.BLEND_MODES.SCREEN],
                        t
                };
            var i, n = t("../../../const"),
                s = (i = t("./canUseNewCanvasBlendModes")) && i.__esModule ? i : {
                    default: i
                }
        }, {
            "../../../const": 44,
            "./canUseNewCanvasBlendModes": 78
        }],
        80: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = t("../../const"),
                s = (i = t("../../settings")) && i.__esModule ? i : {
                    default: i
                },
                o = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.renderer = e,
                            this.count = 0,
                            this.checkCount = 0,
                            this.maxIdle = s.default.GC_MAX_IDLE,
                            this.checkCountMax = s.default.GC_MAX_CHECK_COUNT,
                            this.mode = s.default.GC_MODE
                    }
                    return t.prototype.update = function() {
                            this.count++,
                                this.mode !== n.GC_MODES.MANUAL && ++this.checkCount > this.checkCountMax && (this.checkCount = 0,
                                    this.run())
                        },
                        t.prototype.run = function() {
                            for (var t = this.renderer.textureManager, e = t._managedTextures, r = !1, i = 0; i < e.length; i++) {
                                var n = e[i];
                                !n._glRenderTargets && this.count - n.touched > this.maxIdle && (t.destroyTexture(n, !0),
                                    r = !(e[i] = null))
                            }
                            if (r) {
                                for (var s = 0, o = 0; o < e.length; o++)
                                    null !== e[o] && (e[s++] = e[o]);
                                e.length = s
                            }
                        },
                        t.prototype.unload = function(t) {
                            var e = this.renderer.textureManager;
                            t._texture && t._texture._glRenderTargets && e.destroyTexture(t._texture, !0);
                            for (var r = t.children.length - 1; 0 <= r; r--)
                                this.unload(t.children[r])
                        },
                        t
                }();
            r.default = o
        }, {
            "../../const": 44,
            "../../settings": 99
        }],
        81: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = t("pixi-gl-core"),
                s = t("../../const"),
                o = (i = t("./utils/RenderTarget")) && i.__esModule ? i : {
                    default: i
                },
                a = t("../../utils"),
                h = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.renderer = e,
                            this.gl = e.gl,
                            this._managedTextures = []
                    }
                    return t.prototype.bindTexture = function() {},
                        t.prototype.getTexture = function() {},
                        t.prototype.updateTexture = function(t, e) {
                            var r = this.gl,
                                i = !!t._glRenderTargets;
                            if (!t.hasLoaded)
                                return null;
                            var a = this.renderer.boundTextures;
                            if (void 0 === e)
                                for (var h = e = 0; h < a.length; ++h)
                                    if (a[h] === t) {
                                        e = h;
                                        break
                                    }
                            a[e] = t,
                                r.activeTexture(r.TEXTURE0 + e);
                            var u = t._glTextures[this.renderer.CONTEXT_UID];
                            if (u)
                                i ? t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width, t.height) : u.upload(t.source);
                            else {
                                if (i) {
                                    var l = new o.default(this.gl, t.width, t.height, t.scaleMode, t.resolution);
                                    l.resize(t.width, t.height),
                                        u = (t._glRenderTargets[this.renderer.CONTEXT_UID] = l).texture
                                } else
                                    (u = new n.GLTexture(this.gl, null, null, null, null)).bind(e),
                                    u.premultiplyAlpha = !0,
                                    u.upload(t.source);
                                t._glTextures[this.renderer.CONTEXT_UID] = u,
                                    t.on("update", this.updateTexture, this),
                                    t.on("dispose", this.destroyTexture, this),
                                    this._managedTextures.push(t),
                                    t.isPowerOfTwo ? (t.mipmap && u.enableMipmap(),
                                        t.wrapMode === s.WRAP_MODES.CLAMP ? u.enableWrapClamp() : t.wrapMode === s.WRAP_MODES.REPEAT ? u.enableWrapRepeat() : u.enableWrapMirrorRepeat()) : u.enableWrapClamp(),
                                    t.scaleMode === s.SCALE_MODES.NEAREST ? u.enableNearestScaling() : u.enableLinearScaling()
                            }
                            return u
                        },
                        t.prototype.destroyTexture = function(t, e) {
                            if ((t = t.baseTexture || t).hasLoaded && t._glTextures[this.renderer.CONTEXT_UID] && (this.renderer.unbindTexture(t),
                                    t._glTextures[this.renderer.CONTEXT_UID].destroy(),
                                    t.off("update", this.updateTexture, this),
                                    t.off("dispose", this.destroyTexture, this),
                                    delete t._glTextures[this.renderer.CONTEXT_UID], !e)) {
                                var r = this._managedTextures.indexOf(t); -
                                1 !== r && (0,
                                    a.removeItems)(this._managedTextures, r, 1)
                            }
                        },
                        t.prototype.removeAll = function() {
                            for (var t = 0; t < this._managedTextures.length; ++t) {
                                var e = this._managedTextures[t];
                                e._glTextures[this.renderer.CONTEXT_UID] && delete e._glTextures[this.renderer.CONTEXT_UID]
                            }
                        },
                        t.prototype.destroy = function() {
                            for (var t = 0; t < this._managedTextures.length; ++t) {
                                var e = this._managedTextures[t];
                                this.destroyTexture(e, !0),
                                    e.off("update", this.updateTexture, this),
                                    e.off("dispose", this.destroyTexture, this)
                            }
                            this._managedTextures = null
                        },
                        t
                }();
            r.default = h
        }, {
            "../../const": 44,
            "../../utils": 122,
            "./utils/RenderTarget": 94,
            "pixi-gl-core": 17
        }],
        82: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("../SystemRenderer")),
                s = i(t("./managers/MaskManager")),
                o = i(t("./managers/StencilManager")),
                a = i(t("./managers/FilterManager")),
                h = i(t("./utils/RenderTarget")),
                u = i(t("./utils/ObjectRenderer")),
                l = i(t("./TextureManager")),
                c = i(t("../../textures/BaseTexture")),
                d = i(t("./TextureGarbageCollector")),
                f = i(t("./WebGLState")),
                p = i(t("./utils/mapWebGLDrawModesToPixi")),
                g = i(t("./utils/validateContext")),
                v = t("../../utils"),
                _ = i(t("pixi-gl-core")),
                m = t("../../const"),
                y = 0,
                x = function(t) {
                    function e(r, i, n) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var h = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, "WebGL", r, i, n));
                        return h.legacy = h.options.legacy,
                            h.legacy && (_.default.VertexArrayObject.FORCE_NATIVE = !0),
                            h.type = m.RENDERER_TYPE.WEBGL,
                            h.handleContextLost = h.handleContextLost.bind(h),
                            h.handleContextRestored = h.handleContextRestored.bind(h),
                            h.view.addEventListener("webglcontextlost", h.handleContextLost, !1),
                            h.view.addEventListener("webglcontextrestored", h.handleContextRestored, !1),
                            h._contextOptions = {
                                alpha: h.transparent,
                                antialias: h.options.antialias,
                                premultipliedAlpha: h.transparent && "notMultiplied" !== h.transparent,
                                stencil: !0,
                                preserveDrawingBuffer: h.options.preserveDrawingBuffer
                            },
                            h._backgroundColorRgba[3] = h.transparent ? 0 : 1,
                            h.maskManager = new s.default(h),
                            h.stencilManager = new o.default(h),
                            h.emptyRenderer = new u.default(h),
                            h.currentRenderer = h.emptyRenderer,
                            h.initPlugins(),
                            h.options.context && (0,
                                g.default)(h.options.context),
                            h.gl = h.options.context || _.default.createContext(h.view, h._contextOptions),
                            h.CONTEXT_UID = y++,
                            h.state = new f.default(h.gl),
                            h.renderingToScreen = !0,
                            h.boundTextures = null,
                            h._activeShader = null,
                            h._activeVao = null,
                            h._activeRenderTarget = null,
                            h._initContext(),
                            h.filterManager = new a.default(h),
                            h.drawModes = (0,
                                p.default)(h.gl),
                            h._nextTextureLocation = 0,
                            h.setBlendMode(0),
                            h
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype._initContext = function() {
                            var t = this.gl;
                            t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext();
                            var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                            this._activeShader = null,
                                this._activeVao = null,
                                this.boundTextures = new Array(e),
                                this.emptyTextures = new Array(e),
                                this.textureManager = new l.default(this),
                                this.textureGC = new d.default(this),
                                this.state.resetToDefault(),
                                this.rootRenderTarget = new h.default(t, this.width, this.height, null, this.resolution, !0),
                                this.rootRenderTarget.clearColor = this._backgroundColorRgba,
                                this.bindRenderTarget(this.rootRenderTarget);
                            var r = new _.default.GLTexture.fromData(t, null, 1, 1),
                                i = {
                                    _glTextures: {}
                                };
                            i._glTextures[this.CONTEXT_UID] = {};
                            for (var n = 0; n < e; n++) {
                                var s = new c.default;
                                s._glTextures[this.CONTEXT_UID] = r,
                                    this.boundTextures[n] = i,
                                    this.emptyTextures[n] = s,
                                    this.bindTexture(null, n)
                            }
                            this.emit("context", t),
                                this.resize(this.screen.width, this.screen.height)
                        },
                        e.prototype.render = function(t, e, r, i, n) {
                            if (this.renderingToScreen = !e,
                                this.emit("prerender"),
                                this.gl && !this.gl.isContextLost()) {
                                if (this._nextTextureLocation = 0,
                                    e || (this._lastObjectRendered = t), !n) {
                                    var s = t.parent;
                                    t.parent = this._tempDisplayObjectParent,
                                        t.updateTransform(),
                                        t.parent = s
                                }
                                this.bindRenderTexture(e, i),
                                    this.currentRenderer.start(),
                                    (void 0 !== r ? r : this.clearBeforeRender) && this._activeRenderTarget.clear(),
                                    t.renderWebGL(this),
                                    this.currentRenderer.flush(),
                                    this.textureGC.update(),
                                    this.emit("postrender")
                            }
                        },
                        e.prototype.setObjectRenderer = function(t) {
                            this.currentRenderer !== t && (this.currentRenderer.stop(),
                                this.currentRenderer = t,
                                this.currentRenderer.start())
                        },
                        e.prototype.flush = function() {
                            this.setObjectRenderer(this.emptyRenderer)
                        },
                        e.prototype.resize = function(t, e) {
                            n.default.prototype.resize.call(this, t, e),
                                this.rootRenderTarget.resize(t, e),
                                this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(),
                                    this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)))
                        },
                        e.prototype.setBlendMode = function(t) {
                            this.state.setBlendMode(t)
                        },
                        e.prototype.clear = function(t) {
                            this._activeRenderTarget.clear(t)
                        },
                        e.prototype.setTransform = function(t) {
                            this._activeRenderTarget.transform = t
                        },
                        e.prototype.clearRenderTexture = function(t, e) {
                            var r = t.baseTexture._glRenderTargets[this.CONTEXT_UID];
                            return r && r.clear(e),
                                this
                        },
                        e.prototype.bindRenderTexture = function(t, e) {
                            var r = void 0;
                            if (t) {
                                var i = t.baseTexture;
                                i._glRenderTargets[this.CONTEXT_UID] || this.textureManager.updateTexture(i, 0),
                                    this.unbindTexture(i),
                                    (r = i._glRenderTargets[this.CONTEXT_UID]).setFrame(t.frame)
                            } else
                                r = this.rootRenderTarget;
                            return r.transform = e,
                                this.bindRenderTarget(r),
                                this
                        },
                        e.prototype.bindRenderTarget = function(t) {
                            return t !== this._activeRenderTarget && ((this._activeRenderTarget = t).activate(),
                                    this._activeShader && (this._activeShader.uniforms.projectionMatrix = t.projectionMatrix.toArray(!0)),
                                    this.stencilManager.setMaskStack(t.stencilMaskStack)),
                                this
                        },
                        e.prototype.bindShader = function(t, e) {
                            return this._activeShader !== t && ((this._activeShader = t).bind(), !1 !== e && (t.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0))),
                                this
                        },
                        e.prototype.bindTexture = function(t, e, r) {
                            if ((t = (t = t || this.emptyTextures[e]).baseTexture || t).touched = this.textureGC.count,
                                r)
                                e = e || 0;
                            else {
                                for (var i = 0; i < this.boundTextures.length; i++)
                                    if (this.boundTextures[i] === t)
                                        return i;
                                void 0 === e && (this._nextTextureLocation++,
                                    this._nextTextureLocation %= this.boundTextures.length,
                                    e = this.boundTextures.length - this._nextTextureLocation - 1)
                            }
                            var n = this.gl,
                                s = t._glTextures[this.CONTEXT_UID];
                            return s ? (this.boundTextures[e] = t,
                                    n.activeTexture(n.TEXTURE0 + e),
                                    n.bindTexture(n.TEXTURE_2D, s.texture)) : this.textureManager.updateTexture(t, e),
                                e
                        },
                        e.prototype.unbindTexture = function(t) {
                            var e = this.gl;
                            t = t.baseTexture || t;
                            for (var r = 0; r < this.boundTextures.length; r++)
                                this.boundTextures[r] === t && (this.boundTextures[r] = this.emptyTextures[r],
                                    e.activeTexture(e.TEXTURE0 + r),
                                    e.bindTexture(e.TEXTURE_2D, this.emptyTextures[r]._glTextures[this.CONTEXT_UID].texture));
                            return this
                        },
                        e.prototype.createVao = function() {
                            return new _.default.VertexArrayObject(this.gl, this.state.attribState)
                        },
                        e.prototype.bindVao = function(t) {
                            return this._activeVao === t || (t ? t.bind() : this._activeVao && this._activeVao.unbind(),
                                    this._activeVao = t),
                                this
                        },
                        e.prototype.reset = function() {
                            return this.setObjectRenderer(this.emptyRenderer),
                                this._activeShader = null,
                                this._activeRenderTarget = this.rootRenderTarget,
                                this.rootRenderTarget.activate(),
                                this.state.resetToDefault(),
                                this
                        },
                        e.prototype.handleContextLost = function(t) {
                            t.preventDefault()
                        },
                        e.prototype.handleContextRestored = function() {
                            this.textureManager.removeAll(),
                                this._initContext()
                        },
                        e.prototype.destroy = function(e) {
                            this.destroyPlugins(),
                                this.view.removeEventListener("webglcontextlost", this.handleContextLost),
                                this.view.removeEventListener("webglcontextrestored", this.handleContextRestored),
                                this.textureManager.destroy(),
                                t.prototype.destroy.call(this, e),
                                this.uid = 0,
                                this.maskManager.destroy(),
                                this.stencilManager.destroy(),
                                this.filterManager.destroy(),
                                this.maskManager = null,
                                this.filterManager = null,
                                this.textureManager = null,
                                this.currentRenderer = null,
                                this.handleContextLost = null,
                                this.handleContextRestored = null,
                                this._contextOptions = null,
                                this.gl.useProgram(null),
                                this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(),
                                this.gl = null
                        },
                        e
                }(n.default);
            r.default = x,
                v.pluginTarget.mixin(x)
        }, {
            "../../const": 44,
            "../../textures/BaseTexture": 110,
            "../../utils": 122,
            "../SystemRenderer": 74,
            "./TextureGarbageCollector": 80,
            "./TextureManager": 81,
            "./WebGLState": 83,
            "./managers/FilterManager": 88,
            "./managers/MaskManager": 89,
            "./managers/StencilManager": 90,
            "./utils/ObjectRenderer": 92,
            "./utils/RenderTarget": 94,
            "./utils/mapWebGLDrawModesToPixi": 97,
            "./utils/validateContext": 98,
            "pixi-gl-core": 17
        }],
        83: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("./utils/mapWebGLBlendModesToPixi")) && i.__esModule ? i : {
                    default: i
                },
                s = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.activeState = new Uint8Array(16),
                            this.defaultState = new Uint8Array(16),
                            this.defaultState[0] = 1,
                            this.stackIndex = 0,
                            this.stack = [],
                            this.gl = e,
                            this.maxAttribs = e.getParameter(e.MAX_VERTEX_ATTRIBS),
                            this.attribState = {
                                tempAttribState: new Array(this.maxAttribs),
                                attribState: new Array(this.maxAttribs)
                            },
                            this.blendModes = (0,
                                n.default)(e),
                            this.nativeVaoExtension = e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object")
                    }
                    return t.prototype.push = function() {
                            var t = this.stack[this.stackIndex];
                            t || (t = this.stack[this.stackIndex] = new Uint8Array(16)),
                                ++this.stackIndex;
                            for (var e = 0; e < this.activeState.length; e++)
                                t[e] = this.activeState[e]
                        },
                        t.prototype.pop = function() {
                            var t = this.stack[--this.stackIndex];
                            this.setState(t)
                        },
                        t.prototype.setState = function(t) {
                            this.setBlend(t[0]),
                                this.setDepthTest(t[1]),
                                this.setFrontFace(t[2]),
                                this.setCullFace(t[3]),
                                this.setBlendMode(t[4])
                        },
                        t.prototype.setBlend = function(t) {
                            t = t ? 1 : 0,
                                this.activeState[0] !== t && (this.activeState[0] = t,
                                    this.gl[t ? "enable" : "disable"](this.gl.BLEND))
                        },
                        t.prototype.setBlendMode = function(t) {
                            if (t !== this.activeState[4]) {
                                this.activeState[4] = t;
                                var e = this.blendModes[t];
                                2 === e.length ? this.gl.blendFunc(e[0], e[1]) : this.gl.blendFuncSeparate(e[0], e[1], e[2], e[3])
                            }
                        },
                        t.prototype.setDepthTest = function(t) {
                            t = t ? 1 : 0,
                                this.activeState[1] !== t && (this.activeState[1] = t,
                                    this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST))
                        },
                        t.prototype.setCullFace = function(t) {
                            t = t ? 1 : 0,
                                this.activeState[3] !== t && (this.activeState[3] = t,
                                    this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE))
                        },
                        t.prototype.setFrontFace = function(t) {
                            t = t ? 1 : 0,
                                this.activeState[2] !== t && (this.activeState[2] = t,
                                    this.gl.frontFace(this.gl[t ? "CW" : "CCW"]))
                        },
                        t.prototype.resetAttributes = function() {
                            for (var t = 0; t < this.attribState.tempAttribState.length; t++)
                                this.attribState.tempAttribState[t] = 0;
                            for (var e = 0; e < this.attribState.attribState.length; e++)
                                this.attribState.attribState[e] = 0;
                            for (var r = 1; r < this.maxAttribs; r++)
                                this.gl.disableVertexAttribArray(r)
                        },
                        t.prototype.resetToDefault = function() {
                            this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null),
                                this.resetAttributes();
                            for (var t = 0; t < this.activeState.length; ++t)
                                this.activeState[t] = 32;
                            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
                                this.setState(this.defaultState)
                        },
                        t
                }();
            r.default = s
        }, {
            "./utils/mapWebGLBlendModesToPixi": 96
        }],
        84: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = i(t("./extractUniformsFromSrc")),
                o = t("../../../utils"),
                a = t("../../../const"),
                h = i(t("../../../settings")),
                u = {},
                l = function() {
                    function t(e, r, i) {
                        for (var n in function(e, r) {
                                    if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                                }(this),
                                this.vertexSrc = e || t.defaultVertexSrc,
                                this.fragmentSrc = r || t.defaultFragmentSrc,
                                this.blendMode = a.BLEND_MODES.NORMAL,
                                this.uniformData = i || (0,
                                    s.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"),
                                this.uniforms = {},
                                this.uniformData)
                            this.uniforms[n] = this.uniformData[n].value;
                        this.glShaders = {},
                            u[this.vertexSrc + this.fragmentSrc] || (u[this.vertexSrc + this.fragmentSrc] = (0,
                                o.uid)()),
                            this.glShaderKey = u[this.vertexSrc + this.fragmentSrc],
                            this.padding = 4,
                            this.resolution = h.default.RESOLUTION,
                            this.enabled = !0,
                            this.autoFit = !0
                    }
                    return t.prototype.apply = function(t, e, r, i, n) {
                            t.applyFilter(this, e, r, i)
                        },
                        n(t, null, [{
                            key: "defaultVertexSrc",
                            get: function() {
                                return ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n")
                            }
                        }, {
                            key: "defaultFragmentSrc",
                            get: function() {
                                return ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
                            }
                        }]),
                        t
                }();
            r.default = l
        }, {
            "../../../const": 44,
            "../../../settings": 99,
            "../../../utils": 122,
            "./extractUniformsFromSrc": 85
        }],
        85: [function(t, e, r) {
            "use strict";

            function i(t) {
                for (var e = new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"), r = {}, i = void 0, n = t.replace(/\s+/g, " ").split(/\s*;\s*/), o = 0; o < n.length; o++) {
                    var a = n[o].trim();
                    if (-1 < a.indexOf("uniform")) {
                        var h = a.split(" "),
                            u = h[1],
                            l = h[2],
                            c = 1; -
                        1 < l.indexOf("[") && (l = (i = l.split(/\[|]/))[0],
                                c *= Number(i[1])),
                            l.match(e) || (r[l] = {
                                value: s(u, c),
                                name: l,
                                type: u
                            })
                    }
                }
                return r
            }
            r.__esModule = !0,
                r.default = function(t, e, r) {
                    var n = i(t),
                        s = i(e);
                    return Object.assign(n, s)
                };
            var n, s = ((n = t("pixi-gl-core")) && n.__esModule ? n : {
                default: n
            }).default.shader.defaultValue
        }, {
            "pixi-gl-core": 17
        }],
        86: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.calculateScreenSpaceMatrix = function(t, e, r) {
                    var i = t.identity();
                    return i.translate(e.x / r.width, e.y / r.height),
                        i.scale(r.width, r.height),
                        i
                },
                r.calculateNormalizedScreenSpaceMatrix = function(t, e, r) {
                    var i = t.identity();
                    i.translate(e.x / r.width, e.y / r.height);
                    var n = r.width / e.width,
                        s = r.height / e.height;
                    return i.scale(n, s),
                        i
                },
                r.calculateSpriteMatrix = function(t, e, r, n) {
                    var s = n.worldTransform.copy(i.Matrix.TEMP_MATRIX),
                        o = n._texture.baseTexture,
                        a = t.identity(),
                        h = r.height / r.width;
                    a.translate(e.x / r.width, e.y / r.height),
                        a.scale(1, h);
                    var u = r.width / o.width,
                        l = r.height / o.height;
                    return s.tx /= o.width * u,
                        s.ty /= o.width * u,
                        s.invert(),
                        a.prepend(s),
                        a.scale(1, 1 / h),
                        a.scale(u, l),
                        a.translate(n.anchor.x, n.anchor.y),
                        a
                };
            var i = t("../../../math")
        }, {
            "../../../math": 68
        }],
        87: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("../Filter")) && i.__esModule ? i : {
                    default: i
                },
                s = t("../../../../math"),
                o = (t("path"),
                    function(t) {
                        function e(r) {
                            ! function(t, r) {
                                if (!(t instanceof e))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this);
                            var i = new s.Matrix,
                                n = function(t, e) {
                                    if (!t)
                                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                                }(this, t.call(this, "attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 otherMatrix;\r\n\r\nvarying vec2 vMaskCoord;\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = aTextureCoord;\r\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\r\n}\r\n", "varying vec2 vMaskCoord;\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform float alpha;\r\nuniform sampler2D mask;\r\n\r\nvoid main(void)\r\n{\r\n    // check clip! this will stop the mask bleeding out from the edges\r\n    vec2 text = abs( vMaskCoord - 0.5 );\r\n    text = step(0.5, text);\r\n\r\n    float clip = 1.0 - max(text.y, text.x);\r\n    vec4 original = texture2D(uSampler, vTextureCoord);\r\n    vec4 masky = texture2D(mask, vMaskCoord);\r\n\r\n    original *= (masky.r * masky.a * alpha * clip);\r\n\r\n    gl_FragColor = original;\r\n}\r\n"));
                            return r.renderable = !1,
                                n.maskSprite = r,
                                n.maskMatrix = i,
                                n
                        }
                        return function(t, e) {
                                if ("function" != typeof e && null !== e)
                                    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, {
                                        constructor: {
                                            value: t,
                                            enumerable: !1,
                                            writable: !0,
                                            configurable: !0
                                        }
                                    }),
                                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t),
                            e.prototype.apply = function(t, e, r) {
                                var i = this.maskSprite;
                                this.uniforms.mask = i._texture,
                                    this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, i),
                                    this.uniforms.alpha = i.worldAlpha,
                                    t.applyFilter(this, e, r)
                            },
                            e
                    }(n.default));
            r.default = o
        }, {
            "../../../../math": 68,
            "../Filter": 84,
            path: 10
        }],
        88: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function n(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }
            r.__esModule = !0;
            var s = i(t("./WebGLManager")),
                o = i(t("../utils/RenderTarget")),
                a = i(t("../utils/Quad")),
                h = t("../../../math"),
                u = i(t("../../../Shader")),
                l = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../filters/filterTransforms")),
                c = i(t("bit-twiddle")),
                d = function t() {
                    n(this, t),
                        this.renderTarget = null,
                        this.sourceFrame = new h.Rectangle,
                        this.destinationFrame = new h.Rectangle,
                        this.filters = [],
                        this.target = null,
                        this.resolution = 1
                },
                f = function(t) {
                    function e(r) {
                        n(this, e);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return i.gl = i.renderer.gl,
                            i.quad = new a.default(i.gl, r.state.attribState),
                            i.shaderCache = {},
                            i.pool = {},
                            i.filterData = null,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.pushFilter = function(t, e) {
                            var r = this.renderer,
                                i = this.filterData;
                            if (!i) {
                                i = this.renderer._activeRenderTarget.filterStack;
                                var n = new d;
                                n.sourceFrame = n.destinationFrame = this.renderer._activeRenderTarget.size,
                                    n.renderTarget = r._activeRenderTarget,
                                    this.renderer._activeRenderTarget.filterData = i = {
                                        index: 0,
                                        stack: [n]
                                    },
                                    this.filterData = i
                            }
                            var s = i.stack[++i.index];
                            s || (s = i.stack[i.index] = new d);
                            var o = e[0].resolution,
                                a = 0 | e[0].padding,
                                h = t.filterArea || t.getBounds(!0),
                                u = s.sourceFrame,
                                l = s.destinationFrame;
                            u.x = (h.x * o | 0) / o,
                                u.y = (h.y * o | 0) / o,
                                u.width = (h.width * o | 0) / o,
                                u.height = (h.height * o | 0) / o,
                                i.stack[0].renderTarget.transform || e[0].autoFit && u.fit(i.stack[0].destinationFrame),
                                u.pad(a),
                                l.width = u.width,
                                l.height = u.height;
                            var c = this.getPotRenderTarget(r.gl, u.width, u.height, o);
                            s.target = t,
                                s.filters = e,
                                s.resolution = o,
                                (s.renderTarget = c).setFrame(l, u),
                                r.bindRenderTarget(c),
                                c.clear()
                        },
                        e.prototype.popFilter = function() {
                            var t = this.filterData,
                                e = t.stack[t.index - 1],
                                r = t.stack[t.index];
                            this.quad.map(r.renderTarget.size, r.sourceFrame).upload();
                            var i = r.filters;
                            if (1 === i.length)
                                i[0].apply(this, r.renderTarget, e.renderTarget, !1, r),
                                this.freePotRenderTarget(r.renderTarget);
                            else {
                                var n = r.renderTarget,
                                    s = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, r.resolution);
                                s.setFrame(r.destinationFrame, r.sourceFrame),
                                    s.clear();
                                var o = 0;
                                for (o = 0; o < i.length - 1; ++o) {
                                    i[o].apply(this, n, s, !0, r);
                                    var a = n;
                                    n = s,
                                        s = a
                                }
                                i[o].apply(this, n, e.renderTarget, !1, r),
                                    this.freePotRenderTarget(n),
                                    this.freePotRenderTarget(s)
                            }
                            0 == --t.index && (this.filterData = null)
                        },
                        e.prototype.applyFilter = function(t, e, r, i) {
                            var n = this.renderer,
                                s = n.gl,
                                o = t.glShaders[n.CONTEXT_UID];
                            o || (t.glShaderKey ? (o = this.shaderCache[t.glShaderKey]) || (o = new u.default(this.gl, t.vertexSrc, t.fragmentSrc),
                                        t.glShaders[n.CONTEXT_UID] = this.shaderCache[t.glShaderKey] = o) : o = t.glShaders[n.CONTEXT_UID] = new u.default(this.gl, t.vertexSrc, t.fragmentSrc),
                                    n.bindVao(null),
                                    this.quad.initVao(o)),
                                n.bindVao(this.quad.vao),
                                n.bindRenderTarget(r),
                                i && (s.disable(s.SCISSOR_TEST),
                                    n.clear(),
                                    s.enable(s.SCISSOR_TEST)),
                                r === n.maskManager.scissorRenderTarget && n.maskManager.pushScissorMask(null, n.maskManager.scissorData),
                                n.bindShader(o);
                            var a = this.renderer.emptyTextures[0];
                            this.renderer.boundTextures[0] = a,
                                this.syncUniforms(o, t),
                                n.state.setBlendMode(t.blendMode),
                                s.activeTexture(s.TEXTURE0),
                                s.bindTexture(s.TEXTURE_2D, e.texture.texture),
                                this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0),
                                s.bindTexture(s.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
                        },
                        e.prototype.syncUniforms = function(t, e) {
                            var r = e.uniformData,
                                i = e.uniforms,
                                n = 1,
                                s = void 0;
                            if (t.uniforms.filterArea) {
                                s = this.filterData.stack[this.filterData.index];
                                var o = t.uniforms.filterArea;
                                o[0] = s.renderTarget.size.width,
                                    o[1] = s.renderTarget.size.height,
                                    o[2] = s.sourceFrame.x,
                                    o[3] = s.sourceFrame.y,
                                    t.uniforms.filterArea = o
                            }
                            if (t.uniforms.filterClamp) {
                                s = s || this.filterData.stack[this.filterData.index];
                                var a = t.uniforms.filterClamp;
                                a[0] = 0,
                                    a[1] = 0,
                                    a[2] = (s.sourceFrame.width - 1) / s.renderTarget.size.width,
                                    a[3] = (s.sourceFrame.height - 1) / s.renderTarget.size.height,
                                    t.uniforms.filterClamp = a
                            }
                            for (var h in r)
                                if ("sampler2D" === r[h].type && 0 !== i[h]) {
                                    if (i[h].baseTexture)
                                        t.uniforms[h] = this.renderer.bindTexture(i[h].baseTexture, n);
                                    else {
                                        t.uniforms[h] = n;
                                        var u = this.renderer.gl;
                                        this.renderer.boundTextures[n] = this.renderer.emptyTextures[n],
                                            u.activeTexture(u.TEXTURE0 + n),
                                            i[h].texture.bind()
                                    }
                                    n++
                                } else if ("mat3" === r[h].type)
                                void 0 !== i[h].a ? t.uniforms[h] = i[h].toArray(!0) : t.uniforms[h] = i[h];
                            else if ("vec2" === r[h].type)
                                if (void 0 !== i[h].x) {
                                    var l = t.uniforms[h] || new Float32Array(2);
                                    l[0] = i[h].x,
                                        l[1] = i[h].y,
                                        t.uniforms[h] = l
                                } else
                                    t.uniforms[h] = i[h];
                            else
                                "float" === r[h].type ? t.uniforms.data[h].value !== r[h] && (t.uniforms[h] = i[h]) : t.uniforms[h] = i[h]
                        },
                        e.prototype.getRenderTarget = function(t, e) {
                            var r = this.filterData.stack[this.filterData.index],
                                i = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, e || r.resolution);
                            return i.setFrame(r.destinationFrame, r.sourceFrame),
                                i
                        },
                        e.prototype.returnRenderTarget = function(t) {
                            this.freePotRenderTarget(t)
                        },
                        e.prototype.calculateScreenSpaceMatrix = function(t) {
                            var e = this.filterData.stack[this.filterData.index];
                            return l.calculateScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size)
                        },
                        e.prototype.calculateNormalizedScreenSpaceMatrix = function(t) {
                            var e = this.filterData.stack[this.filterData.index];
                            return l.calculateNormalizedScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size, e.destinationFrame)
                        },
                        e.prototype.calculateSpriteMatrix = function(t, e) {
                            var r = this.filterData.stack[this.filterData.index];
                            return l.calculateSpriteMatrix(t, r.sourceFrame, r.renderTarget.size, e)
                        },
                        e.prototype.destroy = function() {
                            this.shaderCache = {},
                                this.emptyPool()
                        },
                        e.prototype.getPotRenderTarget = function(t, e, r, i) {
                            var n = (65535 & (e = c.default.nextPow2(e * i))) << 16 | 65535 & (r = c.default.nextPow2(r * i));
                            this.pool[n] || (this.pool[n] = []);
                            var s = this.pool[n].pop();
                            if (!s) {
                                var a = this.renderer.boundTextures[0];
                                t.activeTexture(t.TEXTURE0),
                                    s = new o.default(t, e, r, null, 1),
                                    t.bindTexture(t.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
                            }
                            return s.resolution = i,
                                s.defaultFrame.width = s.size.width = e / i,
                                s.defaultFrame.height = s.size.height = r / i,
                                s
                        },
                        e.prototype.emptyPool = function() {
                            for (var t in this.pool) {
                                var e = this.pool[t];
                                if (e)
                                    for (var r = 0; r < e.length; r++)
                                        e[r].destroy(!0)
                            }
                            this.pool = {}
                        },
                        e.prototype.freePotRenderTarget = function(t) {
                            var e = (65535 & t.size.width * t.resolution) << 16 | 65535 & t.size.height * t.resolution;
                            this.pool[e].push(t)
                        },
                        e
                }(s.default);
            r.default = f
        }, {
            "../../../Shader": 42,
            "../../../math": 68,
            "../filters/filterTransforms": 86,
            "../utils/Quad": 93,
            "../utils/RenderTarget": 94,
            "./WebGLManager": 91,
            "bit-twiddle": 1
        }],
        89: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("./WebGLManager")),
                s = i(t("../filters/spriteMask/SpriteMaskFilter")),
                o = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return i.scissor = !1,
                            i.scissorData = null,
                            i.scissorRenderTarget = null,
                            i.enableScissor = !0,
                            i.alphaMaskPool = [],
                            i.alphaMaskIndex = 0,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.pushMask = function(t, e) {
                            if (e.texture)
                                this.pushSpriteMask(t, e);
                            else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && e.isFastRect()) {
                                var r = e.worldTransform,
                                    i = Math.atan2(r.b, r.a);
                                (i = Math.round(i * (180 / Math.PI))) % 90 ? this.pushStencilMask(e) : this.pushScissorMask(t, e)
                            } else
                                this.pushStencilMask(e)
                        },
                        e.prototype.popMask = function(t, e) {
                            e.texture ? this.popSpriteMask(t, e) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(t, e) : this.popStencilMask(t, e)
                        },
                        e.prototype.pushSpriteMask = function(t, e) {
                            var r = this.alphaMaskPool[this.alphaMaskIndex];
                            r || (r = this.alphaMaskPool[this.alphaMaskIndex] = [new s.default(e)]),
                                r[0].resolution = this.renderer.resolution,
                                r[0].maskSprite = e,
                                t.filterArea = e.getBounds(!0),
                                this.renderer.filterManager.pushFilter(t, r),
                                this.alphaMaskIndex++
                        },
                        e.prototype.popSpriteMask = function() {
                            this.renderer.filterManager.popFilter(),
                                this.alphaMaskIndex--
                        },
                        e.prototype.pushStencilMask = function(t) {
                            this.renderer.currentRenderer.stop(),
                                this.renderer.stencilManager.pushStencil(t)
                        },
                        e.prototype.popStencilMask = function() {
                            this.renderer.currentRenderer.stop(),
                                this.renderer.stencilManager.popStencil()
                        },
                        e.prototype.pushScissorMask = function(t, e) {
                            e.renderable = !0;
                            var r = this.renderer._activeRenderTarget,
                                i = e.getBounds();
                            i.fit(r.size),
                                e.renderable = !1,
                                this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
                            var n = this.renderer.resolution;
                            this.renderer.gl.scissor(i.x * n, (r.root ? r.size.height - i.y - i.height : i.y) * n, i.width * n, i.height * n),
                                this.scissorRenderTarget = r,
                                this.scissorData = e,
                                this.scissor = !0
                        },
                        e.prototype.popScissorMask = function() {
                            this.scissorRenderTarget = null,
                                this.scissorData = null,
                                this.scissor = !1;
                            var t = this.renderer.gl;
                            t.disable(t.SCISSOR_TEST)
                        },
                        e
                }(n.default);
            r.default = o
        }, {
            "../filters/spriteMask/SpriteMaskFilter": 87,
            "./WebGLManager": 91
        }],
        90: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("./WebGLManager")) && i.__esModule ? i : {
                    default: i
                },
                s = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return i.stencilMaskStack = null,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.setMaskStack = function(t) {
                            this.stencilMaskStack = t;
                            var e = this.renderer.gl;
                            0 === t.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST)
                        },
                        e.prototype.pushStencil = function(t) {
                            this.renderer.setObjectRenderer(this.renderer.plugins.graphics),
                                this.renderer._activeRenderTarget.attachStencilBuffer();
                            var e = this.renderer.gl,
                                r = this.stencilMaskStack;
                            0 === r.length && (e.enable(e.STENCIL_TEST),
                                    e.clear(e.STENCIL_BUFFER_BIT),
                                    e.stencilFunc(e.ALWAYS, 1, 1)),
                                r.push(t),
                                e.colorMask(!1, !1, !1, !1),
                                e.stencilOp(e.KEEP, e.KEEP, e.INCR),
                                this.renderer.plugins.graphics.render(t),
                                e.colorMask(!0, !0, !0, !0),
                                e.stencilFunc(e.NOTEQUAL, 0, r.length),
                                e.stencilOp(e.KEEP, e.KEEP, e.KEEP)
                        },
                        e.prototype.popStencil = function() {
                            this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                            var t = this.renderer.gl,
                                e = this.stencilMaskStack,
                                r = e.pop();
                            0 === e.length ? t.disable(t.STENCIL_TEST) : (t.colorMask(!1, !1, !1, !1),
                                t.stencilOp(t.KEEP, t.KEEP, t.DECR),
                                this.renderer.plugins.graphics.render(r),
                                t.colorMask(!0, !0, !0, !0),
                                t.stencilFunc(t.NOTEQUAL, 0, e.length),
                                t.stencilOp(t.KEEP, t.KEEP, t.KEEP))
                        },
                        e.prototype.destroy = function() {
                            n.default.prototype.destroy.call(this),
                                this.stencilMaskStack.stencilStack = null
                        },
                        e
                }(n.default);
            r.default = s
        }, {
            "./WebGLManager": 91
        }],
        91: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t(e) {
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError("Cannot call a class as a function")
                    })(this, t),
                    this.renderer = e,
                        this.renderer.on("context", this.onContextChange, this)
                }
                return t.prototype.onContextChange = function() {},
                    t.prototype.destroy = function() {
                        this.renderer.off("context", this.onContextChange, this),
                            this.renderer = null
                    },
                    t
            }();
            r.default = i
        }, {}],
        92: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function(t) {
                function e() {
                    return function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.apply(this, arguments))
                }
                return function(t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                    }(e, t),
                    e.prototype.start = function() {},
                    e.prototype.stop = function() {
                        this.flush()
                    },
                    e.prototype.flush = function() {},
                    e.prototype.render = function(t) {},
                    e
            }(((i = t("../managers/WebGLManager")) && i.__esModule ? i : {
                default: i
            }).default);
            r.default = n
        }, {
            "../managers/WebGLManager": 91
        }],
        93: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("pixi-gl-core")),
                s = i(t("../../../utils/createIndicesForQuads")),
                o = function() {
                    function t(e, r) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.gl = e,
                            this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
                            this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                            this.interleaved = new Float32Array(16);
                        for (var i = 0; i < 4; i++)
                            this.interleaved[4 * i] = this.vertices[2 * i],
                            this.interleaved[4 * i + 1] = this.vertices[2 * i + 1],
                            this.interleaved[4 * i + 2] = this.uvs[2 * i],
                            this.interleaved[4 * i + 3] = this.uvs[2 * i + 1];
                        this.indices = (0,
                                s.default)(1),
                            this.vertexBuffer = n.default.GLBuffer.createVertexBuffer(e, this.interleaved, e.STATIC_DRAW),
                            this.indexBuffer = n.default.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW),
                            this.vao = new n.default.VertexArrayObject(e, r)
                    }
                    return t.prototype.initVao = function(t) {
                            this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, t.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, t.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8)
                        },
                        t.prototype.map = function(t, e) {
                            var r = 0,
                                i = 0;
                            return this.uvs[0] = r,
                                this.uvs[1] = i,
                                this.uvs[2] = r + e.width / t.width,
                                this.uvs[3] = i,
                                this.uvs[4] = r + e.width / t.width,
                                this.uvs[5] = i + e.height / t.height,
                                this.uvs[6] = r,
                                this.uvs[7] = i + e.height / t.height,
                                r = e.x,
                                i = e.y,
                                this.vertices[0] = r,
                                this.vertices[1] = i,
                                this.vertices[2] = r + e.width,
                                this.vertices[3] = i,
                                this.vertices[4] = r + e.width,
                                this.vertices[5] = i + e.height,
                                this.vertices[6] = r,
                                this.vertices[7] = i + e.height,
                                this
                        },
                        t.prototype.upload = function() {
                            for (var t = 0; t < 4; t++)
                                this.interleaved[4 * t] = this.vertices[2 * t],
                                this.interleaved[4 * t + 1] = this.vertices[2 * t + 1],
                                this.interleaved[4 * t + 2] = this.uvs[2 * t],
                                this.interleaved[4 * t + 3] = this.uvs[2 * t + 1];
                            return this.vertexBuffer.upload(this.interleaved),
                                this
                        },
                        t.prototype.destroy = function() {
                            var t = this.gl;
                            t.deleteBuffer(this.vertexBuffer),
                                t.deleteBuffer(this.indexBuffer)
                        },
                        t
                }();
            r.default = o
        }, {
            "../../../utils/createIndicesForQuads": 120,
            "pixi-gl-core": 17
        }],
        94: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = t("../../../math"),
                s = t("../../../const"),
                o = (i = t("../../../settings")) && i.__esModule ? i : {
                    default: i
                },
                a = t("pixi-gl-core"),
                h = function() {
                    function t(e, r, i, h, u, l) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.gl = e,
                            this.frameBuffer = null,
                            this.texture = null,
                            this.clearColor = [0, 0, 0, 0],
                            this.size = new n.Rectangle(0, 0, 1, 1),
                            this.resolution = u || o.default.RESOLUTION,
                            this.projectionMatrix = new n.Matrix,
                            this.transform = null,
                            this.frame = null,
                            this.defaultFrame = new n.Rectangle,
                            this.destinationFrame = null,
                            this.sourceFrame = null,
                            this.stencilBuffer = null,
                            this.stencilMaskStack = [],
                            this.filterData = null,
                            this.scaleMode = void 0 !== h ? h : o.default.SCALE_MODE,
                            this.root = l,
                            this.root ? (this.frameBuffer = new a.GLFramebuffer(e, 100, 100),
                                this.frameBuffer.framebuffer = null) : (this.frameBuffer = a.GLFramebuffer.createRGBA(e, 100, 100),
                                this.scaleMode === s.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(),
                                this.texture = this.frameBuffer.texture),
                            this.setFrame(),
                            this.resize(r, i)
                    }
                    return t.prototype.clear = function(t) {
                            var e = t || this.clearColor;
                            this.frameBuffer.clear(e[0], e[1], e[2], e[3])
                        },
                        t.prototype.attachStencilBuffer = function() {
                            this.root || this.frameBuffer.enableStencil()
                        },
                        t.prototype.setFrame = function(t, e) {
                            this.destinationFrame = t || this.destinationFrame || this.defaultFrame,
                                this.sourceFrame = e || this.sourceFrame || this.destinationFrame
                        },
                        t.prototype.activate = function() {
                            var t = this.gl;
                            this.frameBuffer.bind(),
                                this.calculateProjection(this.destinationFrame, this.sourceFrame),
                                this.transform && this.projectionMatrix.append(this.transform),
                                this.destinationFrame !== this.sourceFrame ? (t.enable(t.SCISSOR_TEST),
                                    t.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : t.disable(t.SCISSOR_TEST),
                                t.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
                        },
                        t.prototype.calculateProjection = function(t, e) {
                            var r = this.projectionMatrix;
                            e = e || t,
                                r.identity(),
                                this.root ? (r.a = 1 / t.width * 2,
                                    r.d = -1 / t.height * 2,
                                    r.tx = -1 - e.x * r.a,
                                    r.ty = 1 - e.y * r.d) : (r.a = 1 / t.width * 2,
                                    r.d = 1 / t.height * 2,
                                    r.tx = -1 - e.x * r.a,
                                    r.ty = -1 - e.y * r.d)
                        },
                        t.prototype.resize = function(t, e) {
                            if (t |= 0,
                                e |= 0,
                                this.size.width !== t || this.size.height !== e) {
                                this.size.width = t,
                                    this.size.height = e,
                                    this.defaultFrame.width = t,
                                    this.defaultFrame.height = e,
                                    this.frameBuffer.resize(t * this.resolution, e * this.resolution);
                                var r = this.frame || this.size;
                                this.calculateProjection(r)
                            }
                        },
                        t.prototype.destroy = function() {
                            this.frameBuffer.destroy(),
                                this.frameBuffer = null,
                                this.texture = null
                        },
                        t
                }();
            r.default = h
        }, {
            "../../../const": 44,
            "../../../math": 68,
            "../../../settings": 99,
            "pixi-gl-core": 17
        }],
        95: [function(t, e, r) {
            "use strict";

            function i(t) {
                for (var e = "", r = 0; r < t; ++r)
                    0 < r && (e += "\nelse "),
                    r < t - 1 && (e += "if(test == " + r + ".0){}");
                return e
            }
            r.__esModule = !0,
                r.default = function(t, e) {
                    var r = !e;
                    if (r) {
                        var n = document.createElement("canvas");
                        n.width = 1,
                            n.height = 1,
                            e = s.default.createContext(n)
                    }
                    for (var a = e.createShader(e.FRAGMENT_SHADER);;) {
                        var h = o.replace(/%forloop%/gi, i(t));
                        if (e.shaderSource(a, h),
                            e.compileShader(a),
                            e.getShaderParameter(a, e.COMPILE_STATUS))
                            break;
                        t = t / 2 | 0
                    }
                    return r && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").loseContext(),
                        t
                };
            var n, s = (n = t("pixi-gl-core")) && n.__esModule ? n : {
                    default: n
                },
                o = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n")
        }, {
            "pixi-gl-core": 17
        }],
        96: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
                    return e[i.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.ADD] = [t.ONE, t.DST_ALPHA],
                        e[i.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR],
                        e[i.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA],
                        e[i.BLEND_MODES.ADD_NPM] = [t.SRC_ALPHA, t.DST_ALPHA, t.ONE, t.DST_ALPHA],
                        e[i.BLEND_MODES.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_COLOR],
                        e
                };
            var i = t("../../../const")
        }, {
            "../../../const": 44
        }],
        97: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                    return e[i.DRAW_MODES.POINTS] = t.POINTS,
                        e[i.DRAW_MODES.LINES] = t.LINES,
                        e[i.DRAW_MODES.LINE_LOOP] = t.LINE_LOOP,
                        e[i.DRAW_MODES.LINE_STRIP] = t.LINE_STRIP,
                        e[i.DRAW_MODES.TRIANGLES] = t.TRIANGLES,
                        e[i.DRAW_MODES.TRIANGLE_STRIP] = t.TRIANGLE_STRIP,
                        e[i.DRAW_MODES.TRIANGLE_FAN] = t.TRIANGLE_FAN,
                        e
                };
            var i = t("../../../const")
        }, {
            "../../../const": 44
        }],
        98: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    t.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
                }
        }, {}],
        99: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("./utils/maxRecommendedTextures")),
                s = i(t("./utils/canUploadSameBuffer"));
            r.default = {
                TARGET_FPMS: .06,
                MIPMAP_TEXTURES: !0,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                SPRITE_MAX_TEXTURES: (0,
                    n.default)(32),
                SPRITE_BATCH_SIZE: 4096,
                RETINA_PREFIX: /@([0-9\.]+)x/,
                RENDER_OPTIONS: {
                    view: null,
                    antialias: !1,
                    forceFXAA: !1,
                    autoResize: !1,
                    transparent: !1,
                    backgroundColor: 0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    roundPixels: !1,
                    width: 800,
                    height: 600,
                    legacy: !1
                },
                TRANSFORM_MODE: 0,
                GC_MODE: 0,
                GC_MAX_IDLE: 3600,
                GC_MAX_CHECK_COUNT: 600,
                WRAP_MODE: 0,
                SCALE_MODE: 0,
                PRECISION_VERTEX: "highp",
                PRECISION_FRAGMENT: "mediump",
                CAN_UPLOAD_SAME_BUFFER: (0,
                    s.default)()
            }
        }, {
            "./utils/canUploadSameBuffer": 119,
            "./utils/maxRecommendedTextures": 124
        }],
        100: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = t("../math"),
                o = t("../utils"),
                a = t("../const"),
                h = i(t("../textures/Texture")),
                u = i(t("../display/Container")),
                l = new s.Point,
                c = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return i._anchor = new s.ObservablePoint(i._onAnchorUpdate, i),
                            i._texture = null,
                            i._width = 0,
                            i._height = 0,
                            i._tint = null,
                            i._tintRGB = null,
                            i.tint = 16777215,
                            i.blendMode = a.BLEND_MODES.NORMAL,
                            i.shader = null,
                            i.cachedTint = 16777215,
                            i.texture = r || h.default.EMPTY,
                            i.vertexData = new Float32Array(8),
                            i.vertexTrimmedData = null,
                            i._transformID = -1,
                            i._textureID = -1,
                            i._transformTrimmedID = -1,
                            i._textureTrimmedID = -1,
                            i.pluginName = "sprite",
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype._onTextureUpdate = function() {
                            this._textureID = -1,
                                this._textureTrimmedID = -1,
                                this._width && (this.scale.x = (0,
                                    o.sign)(this.scale.x) * this._width / this._texture.orig.width),
                                this._height && (this.scale.y = (0,
                                    o.sign)(this.scale.y) * this._height / this._texture.orig.height)
                        },
                        e.prototype._onAnchorUpdate = function() {
                            this._transformID = -1,
                                this._transformTrimmedID = -1
                        },
                        e.prototype.calculateVertices = function() {
                            if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                                this._transformID = this.transform._worldID,
                                    this._textureID = this._texture._updateID;
                                var t, e = this._texture,
                                    r = this.transform.worldTransform,
                                    i = r.a,
                                    n = r.b,
                                    s = r.c,
                                    o = r.d,
                                    a = r.tx,
                                    h = r.ty,
                                    u = this.vertexData,
                                    l = e.trim,
                                    c = e.orig,
                                    d = this._anchor,
                                    f = 0,
                                    p = 0,
                                    g = 0;
                                t = l ? (f = (p = l.x - d._x * c.width) + l.width,
                                        (g = l.y - d._y * c.height) + l.height) : (f = (p = -d._x * c.width) + c.width,
                                        (g = -d._y * c.height) + c.height),
                                    u[0] = i * p + s * g + a,
                                    u[1] = o * g + n * p + h,
                                    u[2] = i * f + s * g + a,
                                    u[3] = o * g + n * f + h,
                                    u[4] = i * f + s * t + a,
                                    u[5] = o * t + n * f + h,
                                    u[6] = i * p + s * t + a,
                                    u[7] = o * t + n * p + h
                            }
                        },
                        e.prototype.calculateTrimmedVertices = function() {
                            if (this.vertexTrimmedData) {
                                if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
                                    return
                            } else
                                this.vertexTrimmedData = new Float32Array(8);
                            this._transformTrimmedID = this.transform._worldID,
                                this._textureTrimmedID = this._texture._updateID;
                            var t = this._texture,
                                e = this.vertexTrimmedData,
                                r = t.orig,
                                i = this._anchor,
                                n = this.transform.worldTransform,
                                s = n.a,
                                o = n.b,
                                a = n.c,
                                h = n.d,
                                u = n.tx,
                                l = n.ty,
                                c = -i._x * r.width,
                                d = c + r.width,
                                f = -i._y * r.height,
                                p = f + r.height;
                            e[0] = s * c + a * f + u,
                                e[1] = h * f + o * c + l,
                                e[2] = s * d + a * f + u,
                                e[3] = h * f + o * d + l,
                                e[4] = s * d + a * p + u,
                                e[5] = h * p + o * d + l,
                                e[6] = s * c + a * p + u,
                                e[7] = h * p + o * c + l
                        },
                        e.prototype._renderWebGL = function(t) {
                            this.calculateVertices(),
                                t.setObjectRenderer(t.plugins[this.pluginName]),
                                t.plugins[this.pluginName].render(this)
                        },
                        e.prototype._renderCanvas = function(t) {
                            t.plugins[this.pluginName].render(this)
                        },
                        e.prototype._calculateBounds = function() {
                            var t = this._texture.trim,
                                e = this._texture.orig;
                            !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(),
                                this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(),
                                this._bounds.addQuad(this.vertexTrimmedData))
                        },
                        e.prototype.getLocalBounds = function(e) {
                            return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x,
                                this._bounds.minY = this._texture.orig.height * -this._anchor._y,
                                this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x),
                                this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._x),
                                e || (this._localBoundsRect || (this._localBoundsRect = new s.Rectangle),
                                    e = this._localBoundsRect),
                                this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
                        },
                        e.prototype.containsPoint = function(t) {
                            this.worldTransform.applyInverse(t, l);
                            var e = this._texture.orig.width,
                                r = this._texture.orig.height,
                                i = -e * this.anchor.x,
                                n = 0;
                            return l.x >= i && l.x < i + e && (n = -r * this.anchor.y,
                                l.y >= n && l.y < n + r)
                        },
                        e.prototype.destroy = function(e) {
                            if (t.prototype.destroy.call(this, e),
                                this._anchor = null,
                                "boolean" == typeof e ? e : e && e.texture) {
                                var r = "boolean" == typeof e ? e : e && e.baseTexture;
                                this._texture.destroy(!!r)
                            }
                            this._texture = null,
                                this.shader = null
                        },
                        e.from = function(t) {
                            return new e(h.default.from(t))
                        },
                        e.fromFrame = function(t) {
                            var r = o.TextureCache[t];
                            if (!r)
                                throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                            return new e(r)
                        },
                        e.fromImage = function(t, r, i) {
                            return new e(h.default.fromImage(t, r, i))
                        },
                        n(e, [{
                            key: "width",
                            get: function() {
                                return Math.abs(this.scale.x) * this._texture.orig.width
                            },
                            set: function(t) {
                                var e = (0,
                                    o.sign)(this.scale.x) || 1;
                                this.scale.x = e * t / this._texture.orig.width,
                                    this._width = t
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return Math.abs(this.scale.y) * this._texture.orig.height
                            },
                            set: function(t) {
                                var e = (0,
                                    o.sign)(this.scale.y) || 1;
                                this.scale.y = e * t / this._texture.orig.height,
                                    this._height = t
                            }
                        }, {
                            key: "anchor",
                            get: function() {
                                return this._anchor
                            },
                            set: function(t) {
                                this._anchor.copy(t)
                            }
                        }, {
                            key: "tint",
                            get: function() {
                                return this._tint
                            },
                            set: function(t) {
                                this._tint = t,
                                    this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)
                            }
                        }, {
                            key: "texture",
                            get: function() {
                                return this._texture
                            },
                            set: function(t) {
                                this._texture !== t && (this._texture = t,
                                    this.cachedTint = 16777215,
                                    this._textureID = -1,
                                    this._textureTrimmedID = -1,
                                    t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                            }
                        }]),
                        e
                }(u.default);
            r.default = c
        }, {
            "../const": 44,
            "../display/Container": 46,
            "../math": 68,
            "../textures/Texture": 113,
            "../utils": 122
        }],
        101: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("../../renderers/canvas/CanvasRenderer")),
                s = t("../../const"),
                o = t("../../math"),
                a = i(t("./CanvasTinter")),
                h = new o.Matrix,
                u = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.renderer = e
                    }
                    return t.prototype.render = function(t) {
                            var e = t._texture,
                                r = this.renderer,
                                i = e._frame.width,
                                n = e._frame.height,
                                u = t.transform.worldTransform,
                                l = 0,
                                c = 0;
                            if (!(e.orig.width <= 0 || e.orig.height <= 0) && e.baseTexture.source && (r.setBlendMode(t.blendMode),
                                    e.valid)) {
                                r.context.globalAlpha = t.worldAlpha;
                                var d = e.baseTexture.scaleMode === s.SCALE_MODES.LINEAR;
                                r.smoothProperty && r.context[r.smoothProperty] !== d && (r.context[r.smoothProperty] = d),
                                    c = e.trim ? (l = e.trim.width / 2 + e.trim.x - t.anchor.x * e.orig.width,
                                        e.trim.height / 2 + e.trim.y - t.anchor.y * e.orig.height) : (l = (.5 - t.anchor.x) * e.orig.width,
                                        (.5 - t.anchor.y) * e.orig.height),
                                    e.rotate && (u.copy(h),
                                        u = h,
                                        o.GroupD8.matrixAppendRotationInv(u, e.rotate, l, c),
                                        c = l = 0),
                                    l -= i / 2,
                                    c -= n / 2,
                                    r.roundPixels ? (r.context.setTransform(u.a, u.b, u.c, u.d, u.tx * r.resolution | 0, u.ty * r.resolution | 0),
                                        l |= 0,
                                        c |= 0) : r.context.setTransform(u.a, u.b, u.c, u.d, u.tx * r.resolution, u.ty * r.resolution);
                                var f = e.baseTexture.resolution;
                                16777215 !== t.tint ? (t.cachedTint === t.tint && t.tintedTexture.tintId === t._texture._updateID || (t.cachedTint = t.tint,
                                        t.tintedTexture = a.default.getTintedTexture(t, t.tint)),
                                    r.context.drawImage(t.tintedTexture, 0, 0, i * f, n * f, l * r.resolution, c * r.resolution, i * r.resolution, n * r.resolution)) : r.context.drawImage(e.baseTexture.source, e._frame.x * f, e._frame.y * f, i * f, n * f, l * r.resolution, c * r.resolution, i * r.resolution, n * r.resolution)
                            }
                        },
                        t.prototype.destroy = function() {
                            this.renderer = null
                        },
                        t
                }();
            r.default = u,
                n.default.registerPlugin("sprite", u)
        }, {
            "../../const": 44,
            "../../math": 68,
            "../../renderers/canvas/CanvasRenderer": 75,
            "./CanvasTinter": 102
        }],
        102: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = t("../../utils"),
                s = {
                    getTintedTexture: function(t, e) {
                        var r = t._texture,
                            i = "#" + ("00000" + (0 | (e = s.roundColor(e))).toString(16)).substr(-6);
                        r.tintCache = r.tintCache || {};
                        var n = r.tintCache[i],
                            o = void 0;
                        if (n) {
                            if (n.tintId === r._updateID)
                                return r.tintCache[i];
                            o = r.tintCache[i]
                        } else
                            o = s.canvas || document.createElement("canvas");
                        if (s.tintMethod(r, e, o),
                            o.tintId = r._updateID,
                            s.convertTintToImage) {
                            var a = new Image;
                            a.src = o.toDataURL(),
                                r.tintCache[i] = a
                        } else
                            r.tintCache[i] = o,
                            s.canvas = null;
                        return o
                    },
                    tintWithMultiply: function(t, e, r) {
                        var i = r.getContext("2d"),
                            n = t._frame.clone(),
                            s = t.baseTexture.resolution;
                        n.x *= s,
                            n.y *= s,
                            n.width *= s,
                            n.height *= s,
                            r.width = Math.ceil(n.width),
                            r.height = Math.ceil(n.height),
                            i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6),
                            i.fillRect(0, 0, n.width, n.height),
                            i.globalCompositeOperation = "multiply",
                            i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height),
                            i.globalCompositeOperation = "destination-atop",
                            i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height)
                    },
                    tintWithOverlay: function(t, e, r) {
                        var i = r.getContext("2d"),
                            n = t._frame.clone(),
                            s = t.baseTexture.resolution;
                        n.x *= s,
                            n.y *= s,
                            n.width *= s,
                            n.height *= s,
                            r.width = Math.ceil(n.width),
                            r.height = Math.ceil(n.height),
                            i.globalCompositeOperation = "copy",
                            i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6),
                            i.fillRect(0, 0, n.width, n.height),
                            i.globalCompositeOperation = "destination-atop",
                            i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height)
                    },
                    tintWithPerPixel: function(t, e, r) {
                        var i = r.getContext("2d"),
                            s = t._frame.clone(),
                            o = t.baseTexture.resolution;
                        s.x *= o,
                            s.y *= o,
                            s.width *= o,
                            s.height *= o,
                            r.width = Math.ceil(s.width),
                            r.height = Math.ceil(s.height),
                            i.globalCompositeOperation = "copy",
                            i.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height);
                        for (var a = (0,
                                n.hex2rgb)(e), h = a[0], u = a[1], l = a[2], c = i.getImageData(0, 0, s.width, s.height), d = c.data, f = 0; f < d.length; f += 4)
                            d[f + 0] *= h,
                            d[f + 1] *= u,
                            d[f + 2] *= l;
                        i.putImageData(c, 0, 0)
                    },
                    roundColor: function(t) {
                        var e = s.cacheStepsPerColorChannel,
                            r = (0,
                                n.hex2rgb)(t);
                        return r[0] = Math.min(255, r[0] / e * e),
                            r[1] = Math.min(255, r[1] / e * e),
                            r[2] = Math.min(255, r[2] / e * e),
                            (0,
                                n.rgb2hex)(r)
                    },
                    cacheStepsPerColorChannel: 8,
                    convertTintToImage: !1,
                    canUseMultiply: (0,
                        ((i = t("../../renderers/canvas/utils/canUseNewCanvasBlendModes")) && i.__esModule ? i : {
                            default: i
                        }).default)(),
                    tintMethod: 0
                };
            s.tintMethod = s.canUseMultiply ? s.tintWithMultiply : s.tintWithPerPixel,
                r.default = s
        }, {
            "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 78,
            "../../utils": 122
        }],
        103: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t(e) {
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError("Cannot call a class as a function")
                    })(this, t),
                    this.vertices = new ArrayBuffer(e),
                        this.float32View = new Float32Array(this.vertices),
                        this.uint32View = new Uint32Array(this.vertices)
                }
                return t.prototype.destroy = function() {
                        this.vertices = null,
                            this.positions = null,
                            this.uvs = null,
                            this.colors = null
                    },
                    t
            }();
            r.default = i
        }, {}],
        104: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("../../renderers/webgl/utils/ObjectRenderer")),
                s = i(t("../../renderers/webgl/WebGLRenderer")),
                o = i(t("../../utils/createIndicesForQuads")),
                a = i(t("./generateMultiTextureShader")),
                h = i(t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader")),
                u = i(t("./BatchBuffer")),
                l = i(t("../../settings")),
                c = t("../../utils"),
                d = i(t("pixi-gl-core")),
                f = i(t("bit-twiddle")),
                p = 0,
                g = 0,
                v = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        i.vertSize = 5,
                            i.vertByteSize = 4 * i.vertSize,
                            i.size = l.default.SPRITE_BATCH_SIZE,
                            i.buffers = [];
                        for (var n = 1; n <= f.default.nextPow2(i.size); n *= 2)
                            i.buffers.push(new u.default(4 * n * i.vertByteSize));
                        i.indices = (0,
                                o.default)(i.size),
                            i.shader = null,
                            i.currentIndex = 0,
                            i.groups = [];
                        for (var s = 0; s < i.size; s++)
                            i.groups[s] = {
                                textures: [],
                                textureCount: 0,
                                ids: [],
                                size: 0,
                                start: 0,
                                blend: 0
                            };
                        return i.sprites = [],
                            i.vertexBuffers = [],
                            i.vaos = [],
                            i.vaoMax = 2,
                            i.vertexCount = 0,
                            i.renderer.on("prerender", i.onPrerender, i),
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.onContextChange = function() {
                            var t = this.renderer.gl;
                            this.renderer.legacy ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), l.default.SPRITE_MAX_TEXTURES),
                                    this.MAX_TEXTURES = (0,
                                        h.default)(this.MAX_TEXTURES, t)),
                                this.shader = (0,
                                    a.default)(t, this.MAX_TEXTURES),
                                this.indexBuffer = d.default.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW),
                                this.renderer.bindVao(null);
                            for (var e = this.shader.attributes, r = 0; r < this.vaoMax; r++) {
                                var i = this.vertexBuffers[r] = d.default.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW),
                                    n = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(i, e.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(i, e.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(i, e.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                                e.aTextureId && n.addAttribute(i, e.aTextureId, t.FLOAT, !1, this.vertByteSize, 16),
                                    this.vaos[r] = n
                            }
                            this.vao = this.vaos[0],
                                this.currentBlendMode = 99999,
                                this.boundTextures = new Array(this.MAX_TEXTURES)
                        },
                        e.prototype.onPrerender = function() {
                            this.vertexCount = 0
                        },
                        e.prototype.render = function(t) {
                            this.currentIndex >= this.size && this.flush(),
                                t._texture._uvs && (this.sprites[this.currentIndex++] = t)
                        },
                        e.prototype.flush = function() {
                            if (0 !== this.currentIndex) {
                                var t = this.renderer.gl,
                                    e = this.MAX_TEXTURES,
                                    r = f.default.nextPow2(this.currentIndex),
                                    i = f.default.log2(r),
                                    n = this.buffers[i],
                                    s = this.sprites,
                                    o = this.groups,
                                    a = n.float32View,
                                    h = n.uint32View,
                                    u = this.boundTextures,
                                    v = this.renderer.boundTextures,
                                    _ = this.renderer.textureGC.count,
                                    m = 0,
                                    y = void 0,
                                    x = void 0,
                                    b = 1,
                                    T = 0,
                                    E = o[0],
                                    w = void 0,
                                    S = void 0,
                                    O = c.premultiplyBlendMode[s[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][s[0].blendMode];
                                E.textureCount = 0,
                                    E.start = 0,
                                    E.blend = O,
                                    p++;
                                var P = void 0;
                                for (P = 0; P < e; ++P)
                                    u[P] = v[P],
                                    u[P]._virtalBoundId = P;
                                for (P = 0; P < this.currentIndex; ++P) {
                                    var C = s[P];
                                    y = C._texture.baseTexture;
                                    var R = c.premultiplyBlendMode[Number(y.premultipliedAlpha)][C.blendMode];
                                    if (O !== R && (O = R,
                                            x = null,
                                            T = e,
                                            p++),
                                        x !== y && (x = y)._enabled !== p) {
                                        if (T === e && (p++,
                                                E.size = P - E.start,
                                                T = 0,
                                                (E = o[b++]).blend = O,
                                                E.textureCount = 0,
                                                E.start = P),
                                            y.touched = _, -1 === y._virtalBoundId)
                                            for (var M = 0; M < e; ++M) {
                                                var A = (M + g) % e,
                                                    D = u[A];
                                                if (D._enabled !== p) {
                                                    g++,
                                                    D._virtalBoundId = -1,
                                                        u[y._virtalBoundId = A] = y;
                                                    break
                                                }
                                            }
                                        y._enabled = p,
                                            E.textureCount++,
                                            E.ids[T] = y._virtalBoundId,
                                            E.textures[T++] = y
                                    }
                                    if (w = C.vertexData,
                                        S = C._texture._uvs.uvsUint32,
                                        this.renderer.roundPixels) {
                                        var I = this.renderer.resolution;
                                        a[m] = (w[0] * I | 0) / I,
                                            a[m + 1] = (w[1] * I | 0) / I,
                                            a[m + 5] = (w[2] * I | 0) / I,
                                            a[m + 6] = (w[3] * I | 0) / I,
                                            a[m + 10] = (w[4] * I | 0) / I,
                                            a[m + 11] = (w[5] * I | 0) / I,
                                            a[m + 15] = (w[6] * I | 0) / I,
                                            a[m + 16] = (w[7] * I | 0) / I
                                    } else
                                        a[m] = w[0],
                                        a[m + 1] = w[1],
                                        a[m + 5] = w[2],
                                        a[m + 6] = w[3],
                                        a[m + 10] = w[4],
                                        a[m + 11] = w[5],
                                        a[m + 15] = w[6],
                                        a[m + 16] = w[7];
                                    h[m + 2] = S[0],
                                        h[m + 7] = S[1],
                                        h[m + 12] = S[2],
                                        h[m + 17] = S[3];
                                    var L = Math.min(C.worldAlpha, 1),
                                        k = L < 1 && y.premultipliedAlpha ? (0,
                                            c.premultiplyTint)(C._tintRGB, L) : C._tintRGB + (255 * L << 24);
                                    h[m + 3] = h[m + 8] = h[m + 13] = h[m + 18] = k,
                                        a[m + 4] = a[m + 9] = a[m + 14] = a[m + 19] = y._virtalBoundId,
                                        m += 20
                                }
                                if (E.size = P - E.start,
                                    l.default.CAN_UPLOAD_SAME_BUFFER)
                                    this.vertexBuffers[this.vertexCount].upload(n.vertices, 0, !0);
                                else {
                                    if (this.vaoMax <= this.vertexCount) {
                                        this.vaoMax++;
                                        var N = this.shader.attributes,
                                            B = this.vertexBuffers[this.vertexCount] = d.default.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW),
                                            U = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(B, N.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(B, N.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(B, N.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                                        N.aTextureId && U.addAttribute(B, N.aTextureId, t.FLOAT, !1, this.vertByteSize, 16),
                                            this.vaos[this.vertexCount] = U
                                    }
                                    this.renderer.bindVao(this.vaos[this.vertexCount]),
                                        this.vertexBuffers[this.vertexCount].upload(n.vertices, 0, !1),
                                        this.vertexCount++
                                }
                                for (P = 0; P < e; ++P)
                                    v[P]._virtalBoundId = -1;
                                for (P = 0; P < b; ++P) {
                                    for (var F = o[P], j = F.textureCount, G = 0; G < j; G++)
                                        x = F.textures[G],
                                        v[F.ids[G]] !== x && this.renderer.bindTexture(x, F.ids[G], !0),
                                        x._virtalBoundId = -1;
                                    this.renderer.state.setBlendMode(F.blend),
                                        t.drawElements(t.TRIANGLES, 6 * F.size, t.UNSIGNED_SHORT, 6 * F.start * 2)
                                }
                                this.currentIndex = 0
                            }
                        },
                        e.prototype.start = function() {
                            this.renderer.bindShader(this.shader),
                                l.default.CAN_UPLOAD_SAME_BUFFER && (this.renderer.bindVao(this.vaos[this.vertexCount]),
                                    this.vertexBuffers[this.vertexCount].bind())
                        },
                        e.prototype.stop = function() {
                            this.flush()
                        },
                        e.prototype.destroy = function() {
                            for (var e = 0; e < this.vaoMax; e++)
                                this.vertexBuffers[e] && this.vertexBuffers[e].destroy(),
                                this.vaos[e] && this.vaos[e].destroy();
                            this.indexBuffer && this.indexBuffer.destroy(),
                                this.renderer.off("prerender", this.onPrerender, this),
                                t.prototype.destroy.call(this),
                                this.shader && (this.shader.destroy(),
                                    this.shader = null),
                                this.vertexBuffers = null,
                                this.vaos = null,
                                this.indexBuffer = null,
                                this.indices = null,
                                this.sprites = null;
                            for (var r = 0; r < this.buffers.length; ++r)
                                this.buffers[r].destroy()
                        },
                        e
                }(n.default);
            r.default = v,
                s.default.registerPlugin("sprite", v)
        }, {
            "../../renderers/webgl/WebGLRenderer": 82,
            "../../renderers/webgl/utils/ObjectRenderer": 92,
            "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 95,
            "../../settings": 99,
            "../../utils": 122,
            "../../utils/createIndicesForQuads": 120,
            "./BatchBuffer": 103,
            "./generateMultiTextureShader": 105,
            "bit-twiddle": 1,
            "pixi-gl-core": 17
        }],
        105: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t, e) {
                    var r = s;
                    r = (r = r.replace(/%count%/gi, e)).replace(/%forloop%/gi, function(t) {
                        var e = "";
                        e += "\n",
                            e += "\n";
                        for (var r = 0; r < t; r++)
                            0 < r && (e += "\nelse "),
                            r < t - 1 && (e += "if(textureId == " + r + ".0)"),
                            e += "\n{",
                            e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);",
                            e += "\n}";
                        return (e += "\n") + "\n"
                    }(e));
                    for (var i = new n.default(t, "precision highp float;\r\nattribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nattribute vec4 aColor;\r\nattribute float aTextureId;\r\n\r\nuniform mat3 projectionMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nvarying float vTextureId;\r\n\r\nvoid main(void){\r\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = aTextureCoord;\r\n    vTextureId = aTextureId;\r\n    vColor = aColor;\r\n}\r\n", r), o = [], a = 0; a < e; a++)
                        o[a] = a;
                    return i.bind(),
                        i.uniforms.uSamplers = o,
                        i
                };
            var i, n = (i = t("../../Shader")) && i.__esModule ? i : {
                    default: i
                },
                s = (t("path"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n"))
        }, {
            "../../Shader": 42,
            path: 10
        }],
        106: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = i(t("../sprites/Sprite")),
                o = i(t("../textures/Texture")),
                a = t("../math"),
                h = t("../utils"),
                u = t("../const"),
                l = i(t("../settings")),
                c = i(t("./TextStyle")),
                d = i(t("./TextMetrics")),
                f = i(t("../utils/trimCanvas")),
                p = {
                    texture: !0,
                    children: !1,
                    baseTexture: !0
                },
                g = function(t) {
                    function e(r, i, n) {
                        (function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        (n = n || document.createElement("canvas")).width = 3,
                            n.height = 3;
                        var s = o.default.fromCanvas(n, l.default.SCALE_MODE, "text");
                        s.orig = new a.Rectangle,
                            s.trim = new a.Rectangle;
                        var h = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, s));
                        return o.default.addToCache(h._texture, h._texture.baseTexture.textureCacheIds[0]),
                            h.canvas = n,
                            h.context = h.canvas.getContext("2d"),
                            h.resolution = l.default.RESOLUTION,
                            h._text = null,
                            h._style = null,
                            h._styleListener = null,
                            h._font = "",
                            h.text = r,
                            h.style = i,
                            h.localStyleID = -1,
                            h
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.updateText = function(t) {
                            var e = this._style;
                            if (this.localStyleID !== e.styleID && (this.dirty = !0,
                                    this.localStyleID = e.styleID),
                                this.dirty || !t) {
                                this._font = this._style.toFontString();
                                var r = this.context,
                                    i = d.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas),
                                    n = i.width,
                                    s = i.height,
                                    o = i.lines,
                                    a = i.lineHeight,
                                    h = i.lineWidths,
                                    u = i.maxLineWidth,
                                    l = i.fontProperties;
                                this.canvas.width = Math.ceil((n + 2 * e.padding) * this.resolution),
                                    this.canvas.height = Math.ceil((s + 2 * e.padding) * this.resolution),
                                    r.scale(this.resolution, this.resolution),
                                    r.clearRect(0, 0, this.canvas.width, this.canvas.height),
                                    r.font = this._font,
                                    r.strokeStyle = e.stroke,
                                    r.lineWidth = e.strokeThickness,
                                    r.textBaseline = e.textBaseline,
                                    r.lineJoin = e.lineJoin,
                                    r.miterLimit = e.miterLimit;
                                var c = void 0,
                                    f = void 0;
                                if (e.dropShadow) {
                                    r.fillStyle = e.dropShadowColor,
                                        r.globalAlpha = e.dropShadowAlpha,
                                        r.shadowBlur = e.dropShadowBlur,
                                        0 < e.dropShadowBlur && (r.shadowColor = e.dropShadowColor);
                                    for (var p = Math.cos(e.dropShadowAngle) * e.dropShadowDistance, g = Math.sin(e.dropShadowAngle) * e.dropShadowDistance, v = 0; v < o.length; v++)
                                        c = e.strokeThickness / 2,
                                        f = e.strokeThickness / 2 + v * a + l.ascent,
                                        "right" === e.align ? c += u - h[v] : "center" === e.align && (c += (u - h[v]) / 2),
                                        e.fill && (this.drawLetterSpacing(o[v], c + p + e.padding, f + g + e.padding),
                                            e.stroke && e.strokeThickness && (r.strokeStyle = e.dropShadowColor,
                                                this.drawLetterSpacing(o[v], c + p + e.padding, f + g + e.padding, !0),
                                                r.strokeStyle = e.stroke))
                                }
                                r.shadowBlur = 0,
                                    r.globalAlpha = 1,
                                    r.fillStyle = this._generateFillStyle(e, o);
                                for (var _ = 0; _ < o.length; _++)
                                    c = e.strokeThickness / 2,
                                    f = e.strokeThickness / 2 + _ * a + l.ascent,
                                    "right" === e.align ? c += u - h[_] : "center" === e.align && (c += (u - h[_]) / 2),
                                    e.stroke && e.strokeThickness && this.drawLetterSpacing(o[_], c + e.padding, f + e.padding, !0),
                                    e.fill && this.drawLetterSpacing(o[_], c + e.padding, f + e.padding);
                                this.updateTexture()
                            }
                        },
                        e.prototype.drawLetterSpacing = function(t, e, r) {
                            var i = 3 < arguments.length && void 0 !== arguments[3] && arguments[3],
                                n = this._style.letterSpacing;
                            if (0 !== n)
                                for (var s = String.prototype.split.call(t, ""), o = e, a = 0, h = ""; a < t.length;)
                                    h = s[a++],
                                    i ? this.context.strokeText(h, o, r) : this.context.fillText(h, o, r),
                                    o += this.context.measureText(h).width + n;
                            else
                                i ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r)
                        },
                        e.prototype.updateTexture = function() {
                            var t = this.canvas;
                            if (this._style.trim) {
                                var e = (0,
                                    f.default)(t);
                                t.width = e.width,
                                    t.height = e.height,
                                    this.context.putImageData(e.data, 0, 0)
                            }
                            var r = this._texture,
                                i = this._style,
                                n = i.trim ? 0 : i.padding,
                                s = r.baseTexture;
                            s.hasLoaded = !0,
                                s.resolution = this.resolution,
                                s.realWidth = t.width,
                                s.realHeight = t.height,
                                s.width = t.width / this.resolution,
                                s.height = t.height / this.resolution,
                                r.trim.width = r._frame.width = t.width / this.resolution,
                                r.trim.height = r._frame.height = t.height / this.resolution,
                                r.trim.x = -n,
                                r.trim.y = -n,
                                r.orig.width = r._frame.width - 2 * n,
                                r.orig.height = r._frame.height - 2 * n,
                                this._onTextureUpdate(),
                                s.emit("update", s),
                                this.dirty = !1
                        },
                        e.prototype.renderWebGL = function(e) {
                            this.resolution !== e.resolution && (this.resolution = e.resolution,
                                    this.dirty = !0),
                                this.updateText(!0),
                                t.prototype.renderWebGL.call(this, e)
                        },
                        e.prototype._renderCanvas = function(e) {
                            this.resolution !== e.resolution && (this.resolution = e.resolution,
                                    this.dirty = !0),
                                this.updateText(!0),
                                t.prototype._renderCanvas.call(this, e)
                        },
                        e.prototype.getLocalBounds = function(e) {
                            return this.updateText(!0),
                                t.prototype.getLocalBounds.call(this, e)
                        },
                        e.prototype._calculateBounds = function() {
                            this.updateText(!0),
                                this.calculateVertices(),
                                this._bounds.addQuad(this.vertexData)
                        },
                        e.prototype._onStyleChange = function() {
                            this.dirty = !0
                        },
                        e.prototype._generateFillStyle = function(t, e) {
                            if (!Array.isArray(t.fill))
                                return t.fill;
                            if (navigator.isCocoonJS)
                                return t.fill[0];
                            var r = void 0,
                                i = void 0,
                                n = void 0,
                                s = void 0,
                                o = this.canvas.width / this.resolution,
                                a = this.canvas.height / this.resolution,
                                h = t.fill.slice(),
                                l = t.fillGradientStops.slice();
                            if (!l.length)
                                for (var c = h.length + 1, d = 1; d < c; ++d)
                                    l.push(d / c);
                            if (h.unshift(t.fill[0]),
                                l.unshift(0),
                                h.push(t.fill[t.fill.length - 1]),
                                l.push(1),
                                t.fillGradientType === u.TEXT_GRADIENT.LINEAR_VERTICAL) {
                                r = this.context.createLinearGradient(o / 2, 0, o / 2, a),
                                    i = (h.length + 1) * e.length;
                                for (var f = n = 0; f < e.length; f++) {
                                    n += 1;
                                    for (var p = 0; p < h.length; p++)
                                        s = "number" == typeof l[p] ? l[p] / e.length + f / e.length : n / i,
                                        r.addColorStop(s, h[p]),
                                        n++
                                }
                            } else {
                                r = this.context.createLinearGradient(0, a / 2, o, a / 2),
                                    i = h.length + 1,
                                    n = 1;
                                for (var g = 0; g < h.length; g++)
                                    s = "number" == typeof l[g] ? l[g] : n / i,
                                    r.addColorStop(s, h[g]),
                                    n++
                            }
                            return r
                        },
                        e.prototype.destroy = function(e) {
                            "boolean" == typeof e && (e = {
                                    children: e
                                }),
                                e = Object.assign({}, p, e),
                                t.prototype.destroy.call(this, e),
                                this.context = null,
                                this.canvas = null,
                                this._style = null
                        },
                        n(e, [{
                            key: "width",
                            get: function() {
                                return this.updateText(!0),
                                    Math.abs(this.scale.x) * this._texture.orig.width
                            },
                            set: function(t) {
                                this.updateText(!0);
                                var e = (0,
                                    h.sign)(this.scale.x) || 1;
                                this.scale.x = e * t / this._texture.orig.width,
                                    this._width = t
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this.updateText(!0),
                                    Math.abs(this.scale.y) * this._texture.orig.height
                            },
                            set: function(t) {
                                this.updateText(!0);
                                var e = (0,
                                    h.sign)(this.scale.y) || 1;
                                this.scale.y = e * t / this._texture.orig.height,
                                    this._height = t
                            }
                        }, {
                            key: "style",
                            get: function() {
                                return this._style
                            },
                            set: function(t) {
                                (t = t || {}) instanceof c.default ? this._style = t : this._style = new c.default(t),
                                    this.localStyleID = -1,
                                    this.dirty = !0
                            }
                        }, {
                            key: "text",
                            get: function() {
                                return this._text
                            },
                            set: function(t) {
                                t = String("" === t || null == t ? " " : t),
                                    this._text !== t && (this._text = t,
                                        this.dirty = !0)
                            }
                        }]),
                        e
                }(s.default);
            r.default = g
        }, {
            "../const": 44,
            "../math": 68,
            "../settings": 99,
            "../sprites/Sprite": 100,
            "../textures/Texture": 113,
            "../utils": 122,
            "../utils/trimCanvas": 127,
            "./TextMetrics": 107,
            "./TextStyle": 108
        }],
        107: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t(e, r, i, n, s, o, a, h, u) {
                    (function(e, r) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    })(this),
                    this.text = e,
                        this.style = r,
                        this.width = i,
                        this.height = n,
                        this.lines = s,
                        this.lineWidths = o,
                        this.lineHeight = a,
                        this.maxLineWidth = h,
                        this.fontProperties = u
                }
                return t.measureText = function(e, r, i) {
                        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : t._canvas;
                        i = i || r.wordWrap;
                        var s = r.toFontString(),
                            o = t.measureFont(s),
                            a = n.getContext("2d");
                        a.font = s;
                        for (var h = (i ? t.wordWrap(e, r, n) : e).split(/(?:\r\n|\r|\n)/), u = new Array(h.length), l = 0, c = 0; c < h.length; c++) {
                            var d = a.measureText(h[c]).width + (h[c].length - 1) * r.letterSpacing;
                            u[c] = d,
                                l = Math.max(l, d)
                        }
                        var f = l + r.strokeThickness;
                        r.dropShadow && (f += r.dropShadowDistance);
                        var p = r.lineHeight || o.fontSize + r.strokeThickness,
                            g = Math.max(p, o.fontSize + r.strokeThickness) + (h.length - 1) * p;
                        return r.dropShadow && (g += r.dropShadowDistance),
                            new t(e, r, f, g, h, u, p, l, o)
                    },
                    t.wordWrap = function(e, r) {
                        for (var i = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : t._canvas).getContext("2d"), n = "", s = e.split("\n"), o = r.wordWrapWidth, a = {}, h = 0; h < s.length; h++) {
                            for (var u = o, l = s[h].split(" "), c = 0; c < l.length; c++) {
                                var d = i.measureText(l[c]).width;
                                if (r.breakWords && o < d)
                                    for (var f = l[c].split(""), p = 0; p < f.length; p++) {
                                        var g = f[p],
                                            v = a[g];
                                        void 0 === v && (v = i.measureText(g).width,
                                                a[g] = v),
                                            u < v ? (n += "\n" + g,
                                                u = o - v) : (0 === p && (n += " "),
                                                n += g,
                                                u -= v)
                                    }
                                else {
                                    var _ = d + i.measureText(" ").width;
                                    0 === c || u < _ ? (0 < c && (n += "\n"),
                                        n += l[c],
                                        u = o - d) : (u -= _,
                                        n += " " + l[c])
                                }
                            }
                            h < s.length - 1 && (n += "\n")
                        }
                        return n
                    },
                    t.measureFont = function(e) {
                        if (t._fonts[e])
                            return t._fonts[e];
                        var r = {},
                            i = t._canvas,
                            n = t._context;
                        n.font = e;
                        var s = Math.ceil(n.measureText("|MÉq").width),
                            o = Math.ceil(n.measureText("M").width),
                            a = 2 * o;
                        o = 1.4 * o | 0,
                            i.width = s,
                            i.height = a,
                            n.fillStyle = "#f00",
                            n.fillRect(0, 0, s, a),
                            n.font = e,
                            n.textBaseline = "alphabetic",
                            n.fillStyle = "#000",
                            n.fillText("|MÉq", 0, o);
                        var h = n.getImageData(0, 0, s, a).data,
                            u = h.length,
                            l = 4 * s,
                            c = 0,
                            d = 0,
                            f = !1;
                        for (c = 0; c < o; ++c) {
                            for (var p = 0; p < l; p += 4)
                                if (255 !== h[d + p]) {
                                    f = !0;
                                    break
                                }
                            if (f)
                                break;
                            d += l
                        }
                        for (r.ascent = o - c,
                            d = u - l,
                            f = !1,
                            c = a; o < c; --c) {
                            for (var g = 0; g < l; g += 4)
                                if (255 !== h[d + g]) {
                                    f = !0;
                                    break
                                }
                            if (f)
                                break;
                            d -= l
                        }
                        return r.descent = c - o,
                            r.fontSize = r.ascent + r.descent,
                            t._fonts[e] = r
                    },
                    t
            }();
            r.default = i;
            var n = document.createElement("canvas");
            n.width = n.height = 10,
                i._canvas = n,
                i._context = n.getContext("2d"),
                i._fonts = {}
        }, {}],
        108: [function(t, e, r) {
            "use strict";

            function i(t) {
                return "number" == typeof t ? (0,
                    a.hex2string)(t) : ("string" == typeof t && 0 === t.indexOf("0x") && (t = t.replace("0x", "#")),
                    t)
            }

            function n(t) {
                if (Array.isArray(t)) {
                    for (var e = 0; e < t.length; ++e)
                        t[e] = i(t[e]);
                    return t
                }
                return i(t)
            }
            r.__esModule = !0;
            var s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                o = t("../const"),
                a = t("../utils"),
                h = {
                    align: "left",
                    breakWords: !1,
                    dropShadow: !1,
                    dropShadowAlpha: 1,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowBlur: 0,
                    dropShadowColor: "black",
                    dropShadowDistance: 5,
                    fill: "black",
                    fillGradientType: o.TEXT_GRADIENT.LINEAR_VERTICAL,
                    fillGradientStops: [],
                    fontFamily: "Arial",
                    fontSize: 26,
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: "normal",
                    letterSpacing: 0,
                    lineHeight: 0,
                    lineJoin: "miter",
                    miterLimit: 10,
                    padding: 0,
                    stroke: "black",
                    strokeThickness: 0,
                    textBaseline: "alphabetic",
                    trim: !1,
                    wordWrap: !1,
                    wordWrapWidth: 100
                },
                u = function() {
                    function t(e) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.styleID = 0,
                            Object.assign(this, h, e)
                    }
                    return t.prototype.clone = function() {
                            var e = {};
                            for (var r in h)
                                e[r] = this[r];
                            return new t(e)
                        },
                        t.prototype.reset = function() {
                            Object.assign(this, h)
                        },
                        t.prototype.toFontString = function() {
                            var t = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize,
                                e = this.fontFamily;
                            Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
                            for (var r = e.length - 1; 0 <= r; r--) {
                                var i = e[r].trim();
                                /([\"\'])[^\'\"]+\1/.test(i) || (i = '"' + i + '"'),
                                    e[r] = i
                            }
                            return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",")
                        },
                        s(t, [{
                            key: "align",
                            get: function() {
                                return this._align
                            },
                            set: function(t) {
                                this._align !== t && (this._align = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "breakWords",
                            get: function() {
                                return this._breakWords
                            },
                            set: function(t) {
                                this._breakWords !== t && (this._breakWords = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadow",
                            get: function() {
                                return this._dropShadow
                            },
                            set: function(t) {
                                this._dropShadow !== t && (this._dropShadow = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadowAlpha",
                            get: function() {
                                return this._dropShadowAlpha
                            },
                            set: function(t) {
                                this._dropShadowAlpha !== t && (this._dropShadowAlpha = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadowAngle",
                            get: function() {
                                return this._dropShadowAngle
                            },
                            set: function(t) {
                                this._dropShadowAngle !== t && (this._dropShadowAngle = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadowBlur",
                            get: function() {
                                return this._dropShadowBlur
                            },
                            set: function(t) {
                                this._dropShadowBlur !== t && (this._dropShadowBlur = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadowColor",
                            get: function() {
                                return this._dropShadowColor
                            },
                            set: function(t) {
                                var e = n(t);
                                this._dropShadowColor !== e && (this._dropShadowColor = e,
                                    this.styleID++)
                            }
                        }, {
                            key: "dropShadowDistance",
                            get: function() {
                                return this._dropShadowDistance
                            },
                            set: function(t) {
                                this._dropShadowDistance !== t && (this._dropShadowDistance = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fill",
                            get: function() {
                                return this._fill
                            },
                            set: function(t) {
                                var e = n(t);
                                this._fill !== e && (this._fill = e,
                                    this.styleID++)
                            }
                        }, {
                            key: "fillGradientType",
                            get: function() {
                                return this._fillGradientType
                            },
                            set: function(t) {
                                this._fillGradientType !== t && (this._fillGradientType = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fillGradientStops",
                            get: function() {
                                return this._fillGradientStops
                            },
                            set: function(t) {
                                (function(t, e) {
                                    if (!Array.isArray(t) || !Array.isArray(e))
                                        return !1;
                                    if (t.length !== e.length)
                                        return !1;
                                    for (var r = 0; r < t.length; ++r)
                                        if (t[r] !== e[r])
                                            return !1;
                                    return !0
                                })(this._fillGradientStops, t) || (this._fillGradientStops = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fontFamily",
                            get: function() {
                                return this._fontFamily
                            },
                            set: function(t) {
                                this.fontFamily !== t && (this._fontFamily = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fontSize",
                            get: function() {
                                return this._fontSize
                            },
                            set: function(t) {
                                this._fontSize !== t && (this._fontSize = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fontStyle",
                            get: function() {
                                return this._fontStyle
                            },
                            set: function(t) {
                                this._fontStyle !== t && (this._fontStyle = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fontVariant",
                            get: function() {
                                return this._fontVariant
                            },
                            set: function(t) {
                                this._fontVariant !== t && (this._fontVariant = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "fontWeight",
                            get: function() {
                                return this._fontWeight
                            },
                            set: function(t) {
                                this._fontWeight !== t && (this._fontWeight = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "letterSpacing",
                            get: function() {
                                return this._letterSpacing
                            },
                            set: function(t) {
                                this._letterSpacing !== t && (this._letterSpacing = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "lineHeight",
                            get: function() {
                                return this._lineHeight
                            },
                            set: function(t) {
                                this._lineHeight !== t && (this._lineHeight = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "lineJoin",
                            get: function() {
                                return this._lineJoin
                            },
                            set: function(t) {
                                this._lineJoin !== t && (this._lineJoin = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "miterLimit",
                            get: function() {
                                return this._miterLimit
                            },
                            set: function(t) {
                                this._miterLimit !== t && (this._miterLimit = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "padding",
                            get: function() {
                                return this._padding
                            },
                            set: function(t) {
                                this._padding !== t && (this._padding = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "stroke",
                            get: function() {
                                return this._stroke
                            },
                            set: function(t) {
                                var e = n(t);
                                this._stroke !== e && (this._stroke = e,
                                    this.styleID++)
                            }
                        }, {
                            key: "strokeThickness",
                            get: function() {
                                return this._strokeThickness
                            },
                            set: function(t) {
                                this._strokeThickness !== t && (this._strokeThickness = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "textBaseline",
                            get: function() {
                                return this._textBaseline
                            },
                            set: function(t) {
                                this._textBaseline !== t && (this._textBaseline = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "trim",
                            get: function() {
                                return this._trim
                            },
                            set: function(t) {
                                this._trim !== t && (this._trim = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "wordWrap",
                            get: function() {
                                return this._wordWrap
                            },
                            set: function(t) {
                                this._wordWrap !== t && (this._wordWrap = t,
                                    this.styleID++)
                            }
                        }, {
                            key: "wordWrapWidth",
                            get: function() {
                                return this._wordWrapWidth
                            },
                            set: function(t) {
                                this._wordWrapWidth !== t && (this._wordWrapWidth = t,
                                    this.styleID++)
                            }
                        }]),
                        t
                }();
            r.default = u
        }, {
            "../const": 44,
            "../utils": 122
        }],
        109: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("./BaseTexture")),
                s = i(t("../settings")),
                o = function(t) {
                    function e() {
                        var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 100,
                            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100,
                            n = arguments[2],
                            o = arguments[3];
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var a = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, null, n));
                        return a.resolution = o || s.default.RESOLUTION,
                            a.width = r,
                            a.height = i,
                            a.realWidth = a.width * a.resolution,
                            a.realHeight = a.height * a.resolution,
                            a.scaleMode = void 0 !== n ? n : s.default.SCALE_MODE,
                            a.hasLoaded = !0,
                            a._glRenderTargets = {},
                            a._canvasRenderTarget = null,
                            a.valid = !1,
                            a
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.resize = function(t, e) {
                            t === this.width && e === this.height || (this.valid = 0 < t && 0 < e,
                                this.width = t,
                                this.height = e,
                                this.realWidth = this.width * this.resolution,
                                this.realHeight = this.height * this.resolution,
                                this.valid && this.emit("update", this))
                        },
                        e.prototype.destroy = function() {
                            t.prototype.destroy.call(this, !0),
                                this.renderer = null
                        },
                        e
                }(n.default);
            r.default = o
        }, {
            "../settings": 99,
            "./BaseTexture": 110
        }],
        110: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = t("../utils"),
                s = i(t("../settings")),
                o = i(t("eventemitter3")),
                a = i(t("../utils/determineCrossOrigin")),
                h = i(t("bit-twiddle")),
                u = function(t) {
                    function e(r, i, o) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var a = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return a.uid = (0,
                                n.uid)(),
                            a.touched = 0,
                            a.resolution = o || s.default.RESOLUTION,
                            a.width = 100,
                            a.height = 100,
                            a.realWidth = 100,
                            a.realHeight = 100,
                            a.scaleMode = void 0 !== i ? i : s.default.SCALE_MODE,
                            a.hasLoaded = !1,
                            a.isLoading = !1,
                            a.source = null,
                            a.origSource = null,
                            a.imageType = null,
                            a.sourceScale = 1,
                            a.premultipliedAlpha = !0,
                            a.imageUrl = null,
                            a.isPowerOfTwo = !1,
                            a.mipmap = s.default.MIPMAP_TEXTURES,
                            a.wrapMode = s.default.WRAP_MODE,
                            a._glTextures = {},
                            a._enabled = 0,
                            a._virtalBoundId = -1,
                            a._destroyed = !1,
                            a.textureCacheIds = [],
                            r && a.loadSource(r),
                            a
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.update = function() {
                            "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width,
                                    this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height,
                                    this._updateDimensions()),
                                this.emit("update", this)
                        },
                        e.prototype._updateDimensions = function() {
                            this.width = this.realWidth / this.resolution,
                                this.height = this.realHeight / this.resolution,
                                this.isPowerOfTwo = h.default.isPow2(this.realWidth) && h.default.isPow2(this.realHeight)
                        },
                        e.prototype.loadSource = function(t) {
                            var e = this.isLoading;
                            this.hasLoaded = !1,
                                this.isLoading = !1,
                                e && this.source && (this.source.onload = null,
                                    this.source.onerror = null);
                            var r = !this.source;
                            if (((this.source = t).src && t.complete || t.getContext) && t.width && t.height)
                                this._updateImageType(),
                                "svg" === this.imageType ? this._loadSvgSource() : this._sourceLoaded(),
                                r && this.emit("loaded", this);
                            else if (!t.getContext) {
                                this.isLoading = !0;
                                var i = this;
                                if (t.onload = function() {
                                        if (i._updateImageType(),
                                            t.onload = null,
                                            t.onerror = null,
                                            i.isLoading) {
                                            if (i.isLoading = !1,
                                                i._sourceLoaded(),
                                                "svg" === i.imageType)
                                                return void i._loadSvgSource();
                                            i.emit("loaded", i)
                                        }
                                    },
                                    t.onerror = function() {
                                        t.onload = null,
                                            t.onerror = null,
                                            i.isLoading && (i.isLoading = !1,
                                                i.emit("error", i))
                                    },
                                    t.complete && t.src) {
                                    if (t.onload = null,
                                        t.onerror = null,
                                        "svg" === i.imageType)
                                        return void i._loadSvgSource();
                                    this.isLoading = !1,
                                        t.width && t.height ? (this._sourceLoaded(),
                                            e && this.emit("loaded", this)) : e && this.emit("error", this)
                                }
                            }
                        },
                        e.prototype._updateImageType = function() {
                            if (this.imageUrl) {
                                var t = (0,
                                        n.decomposeDataUri)(this.imageUrl),
                                    e = void 0;
                                if (t && "image" === t.mediaType) {
                                    var r = t.subType.split("+")[0];
                                    if (!(e = (0,
                                            n.getUrlFileExtension)("." + r)))
                                        throw new Error("Invalid image type in data URI.")
                                } else
                                    (e = (0,
                                        n.getUrlFileExtension)(this.imageUrl)) || (e = "png");
                                this.imageType = e
                            }
                        },
                        e.prototype._loadSvgSource = function() {
                            if ("svg" === this.imageType) {
                                var t = (0,
                                    n.decomposeDataUri)(this.imageUrl);
                                t ? this._loadSvgSourceUsingDataUri(t) : this._loadSvgSourceUsingXhr()
                            }
                        },
                        e.prototype._loadSvgSourceUsingDataUri = function(t) {
                            var e = void 0;
                            if ("base64" === t.encoding) {
                                if (!atob)
                                    throw new Error("Your browser doesn't support base64 conversions.");
                                e = atob(t.data)
                            } else
                                e = t.data;
                            this._loadSvgSourceUsingString(e)
                        },
                        e.prototype._loadSvgSourceUsingXhr = function() {
                            var t = this,
                                e = new XMLHttpRequest;
                            e.onload = function() {
                                    if (e.readyState !== e.DONE || 200 !== e.status)
                                        throw new Error("Failed to load SVG using XHR.");
                                    t._loadSvgSourceUsingString(e.response)
                                },
                                e.onerror = function() {
                                    return t.emit("error", t)
                                },
                                e.open("GET", this.imageUrl, !0),
                                e.send()
                        },
                        e.prototype._loadSvgSourceUsingString = function(t) {
                            var r = (0,
                                    n.getSvgSize)(t),
                                i = r.width,
                                s = r.height;
                            if (!i || !s)
                                throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                            this.realWidth = Math.round(i * this.sourceScale),
                                this.realHeight = Math.round(s * this.sourceScale),
                                this._updateDimensions();
                            var o = document.createElement("canvas");
                            o.width = this.realWidth,
                                o.height = this.realHeight,
                                o._pixiId = "canvas_" + (0,
                                    n.uid)(),
                                o.getContext("2d").drawImage(this.source, 0, 0, i, s, 0, 0, this.realWidth, this.realHeight),
                                this.origSource = this.source,
                                this.source = o,
                                e.addToCache(this, o._pixiId),
                                this.isLoading = !1,
                                this._sourceLoaded(),
                                this.emit("loaded", this)
                        },
                        e.prototype._sourceLoaded = function() {
                            this.hasLoaded = !0,
                                this.update()
                        },
                        e.prototype.destroy = function() {
                            this.imageUrl && (delete n.TextureCache[this.imageUrl],
                                    this.imageUrl = null,
                                    navigator.isCocoonJS || (this.source.src = "")),
                                this.source = null,
                                this.dispose(),
                                e.removeFromCache(this),
                                this.textureCacheIds = null,
                                this._destroyed = !0
                        },
                        e.prototype.dispose = function() {
                            this.emit("dispose", this)
                        },
                        e.prototype.updateSourceImage = function(t) {
                            this.source.src = t,
                                this.loadSource(this.source)
                        },
                        e.fromImage = function(t, r, i, s) {
                            var o = n.BaseTextureCache[t];
                            if (!o) {
                                var h = new Image;
                                void 0 === r && 0 !== t.indexOf("data:") ? h.crossOrigin = (0,
                                        a.default)(t) : r && (h.crossOrigin = "string" == typeof r ? r : "anonymous"),
                                    (o = new e(h, i)).imageUrl = t,
                                    s && (o.sourceScale = s),
                                    o.resolution = (0,
                                        n.getResolutionOfUrl)(t),
                                    h.src = t,
                                    e.addToCache(o, t)
                            }
                            return o
                        },
                        e.fromCanvas = function(t, r) {
                            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "canvas";
                            t._pixiId || (t._pixiId = i + "_" + (0,
                                n.uid)());
                            var s = n.BaseTextureCache[t._pixiId];
                            return s || (s = new e(t, r),
                                    e.addToCache(s, t._pixiId)),
                                s
                        },
                        e.from = function(t, r, i) {
                            if ("string" == typeof t)
                                return e.fromImage(t, void 0, r, i);
                            if (t instanceof HTMLImageElement) {
                                var s = t.src,
                                    o = n.BaseTextureCache[s];
                                return o || ((o = new e(t, r)).imageUrl = s,
                                        i && (o.sourceScale = i),
                                        o.resolution = (0,
                                            n.getResolutionOfUrl)(s),
                                        e.addToCache(o, s)),
                                    o
                            }
                            return t instanceof HTMLCanvasElement ? e.fromCanvas(t, r) : t
                        },
                        e.addToCache = function(t, e) {
                            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e),
                                n.BaseTextureCache[e] = t)
                        },
                        e.removeFromCache = function(t) {
                            if ("string" == typeof t) {
                                var e = n.BaseTextureCache[t];
                                if (e) {
                                    var r = e.textureCacheIds.indexOf(t);
                                    return -1 < r && e.textureCacheIds.splice(r, 1),
                                        delete n.BaseTextureCache[t],
                                        e
                                }
                            } else if (t && t.textureCacheIds) {
                                for (var i = 0; i < t.textureCacheIds.length; ++i)
                                    delete n.BaseTextureCache[t.textureCacheIds[i]];
                                return t.textureCacheIds.length = 0,
                                    t
                            }
                            return null
                        },
                        e
                }(o.default);
            r.default = u
        }, {
            "../settings": 99,
            "../utils": 122,
            "../utils/determineCrossOrigin": 121,
            "bit-twiddle": 1,
            eventemitter3: 5
        }],
        111: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("./BaseRenderTexture")),
                s = function(t) {
                    function e(r, i) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var s = null;
                        if (!(r instanceof n.default)) {
                            var o = arguments[1],
                                a = arguments[2],
                                h = arguments[3],
                                u = arguments[4];
                            console.warn("Please use RenderTexture.create(" + o + ", " + a + ") instead of the ctor directly."),
                                s = arguments[0],
                                i = null,
                                r = new n.default(o, a, h, u)
                        }
                        var l = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i));
                        return l.legacyRenderer = s,
                            l.valid = !0,
                            l._updateUvs(),
                            l
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.resize = function(t, e, r) {
                            this.valid = 0 < t && 0 < e,
                                this._frame.width = this.orig.width = t,
                                this._frame.height = this.orig.height = e,
                                r || this.baseTexture.resize(t, e),
                                this._updateUvs()
                        },
                        e.create = function(t, r, i, s) {
                            return new e(new n.default(t, r, i, s))
                        },
                        e
                }(i(t("./Texture")).default);
            r.default = s
        }, {
            "./BaseRenderTexture": 109,
            "./Texture": 113
        }],
        112: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = t("../"),
                s = t("../utils"),
                o = function() {
                    function t(e, r) {
                        var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this.baseTexture = e,
                            this.textures = {},
                            this.data = r,
                            this.resolution = this._updateResolution(i || this.baseTexture.imageUrl),
                            this._frames = this.data.frames,
                            this._frameKeys = Object.keys(this._frames),
                            this._batchIndex = 0,
                            this._callback = null
                    }
                    return i(t, null, [{
                            key: "BATCH_SIZE",
                            get: function() {
                                return 1e3
                            }
                        }]),
                        t.prototype._updateResolution = function(t) {
                            var e = this.data.meta.scale,
                                r = (0,
                                    s.getResolutionOfUrl)(t, null);
                            return null === r && (r = void 0 !== e ? parseFloat(e) : 1),
                                1 !== r && (this.baseTexture.resolution = r,
                                    this.baseTexture.update()),
                                r
                        },
                        t.prototype.parse = function(e) {
                            this._batchIndex = 0,
                                this._callback = e,
                                this._frameKeys.length <= t.BATCH_SIZE ? (this._processFrames(0),
                                    this._parseComplete()) : this._nextBatch()
                        },
                        t.prototype._processFrames = function(e) {
                            for (var r = e, i = t.BATCH_SIZE; r - e < i && r < this._frameKeys.length;) {
                                var s = this._frameKeys[r],
                                    o = this._frames[s].frame;
                                if (o) {
                                    var a, h = null,
                                        u = new n.Rectangle(0, 0, this._frames[s].sourceSize.w / this.resolution, this._frames[s].sourceSize.h / this.resolution);
                                    a = this._frames[s].rotated ? new n.Rectangle(o.x / this.resolution, o.y / this.resolution, o.h / this.resolution, o.w / this.resolution) : new n.Rectangle(o.x / this.resolution, o.y / this.resolution, o.w / this.resolution, o.h / this.resolution),
                                        this._frames[s].trimmed && (h = new n.Rectangle(this._frames[s].spriteSourceSize.x / this.resolution, this._frames[s].spriteSourceSize.y / this.resolution, o.w / this.resolution, o.h / this.resolution)),
                                        this.textures[s] = new n.Texture(this.baseTexture, a, u, h, this._frames[s].rotated ? 2 : 0),
                                        n.Texture.addToCache(this.textures[s], s)
                                }
                                r++
                            }
                        },
                        t.prototype._parseComplete = function() {
                            var t = this._callback;
                            this._callback = null,
                                this._batchIndex = 0,
                                t.call(this, this.textures)
                        },
                        t.prototype._nextBatch = function() {
                            var e = this;
                            this._processFrames(this._batchIndex * t.BATCH_SIZE),
                                this._batchIndex++,
                                setTimeout(function() {
                                    e._batchIndex * t.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : e._parseComplete()
                                }, 0)
                        },
                        t.prototype.destroy = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                            for (var e in this.textures)
                                this.textures[e].destroy();
                            this._frames = null,
                                this._frameKeys = null,
                                this.data = null,
                                this.textures = null,
                                t && this.baseTexture.destroy(),
                                this.baseTexture = null
                        },
                        t
                }();
            r.default = o
        }, {
            "../": 63,
            "../utils": 122
        }],
        113: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function n(t) {
                t.destroy = function() {},
                    t.on = function() {},
                    t.once = function() {},
                    t.emit = function() {}
            }
            r.__esModule = !0;
            var s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                o = i(t("./BaseTexture")),
                a = i(t("./VideoBaseTexture")),
                h = i(t("./TextureUvs")),
                u = i(t("eventemitter3")),
                l = t("../math"),
                c = t("../utils"),
                d = i(t("../settings")),
                f = function(t) {
                    function e(r, i, n, s, o) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var a = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        if (a.noFrame = !1,
                            i || (a.noFrame = !0,
                                i = new l.Rectangle(0, 0, 1, 1)),
                            r instanceof e && (r = r.baseTexture),
                            a.baseTexture = r,
                            a._frame = i,
                            a.trim = s,
                            a.valid = !1,
                            a.requiresUpdate = !1,
                            a._uvs = null,
                            a.orig = n || i,
                            a._rotate = Number(o || 0), !0 === o)
                            a._rotate = 2;
                        else if (a._rotate % 2 != 0)
                            throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
                        return r.hasLoaded ? (a.noFrame && (i = new l.Rectangle(0, 0, r.width, r.height),
                                    r.on("update", a.onBaseTextureUpdated, a)),
                                a.frame = i) : r.once("loaded", a.onBaseTextureLoaded, a),
                            a._updateID = 0,
                            a.transform = null,
                            a.textureCacheIds = [],
                            a
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.update = function() {
                            this.baseTexture.update()
                        },
                        e.prototype.onBaseTextureLoaded = function(t) {
                            this._updateID++,
                                this.noFrame ? this.frame = new l.Rectangle(0, 0, t.width, t.height) : this.frame = this._frame,
                                this.baseTexture.on("update", this.onBaseTextureUpdated, this),
                                this.emit("update", this)
                        },
                        e.prototype.onBaseTextureUpdated = function(t) {
                            this._updateID++,
                                this._frame.width = t.width,
                                this._frame.height = t.height,
                                this.emit("update", this)
                        },
                        e.prototype.destroy = function(t) {
                            this.baseTexture && (t && (c.TextureCache[this.baseTexture.imageUrl] && e.removeFromCache(this.baseTexture.imageUrl),
                                        this.baseTexture.destroy()),
                                    this.baseTexture.off("update", this.onBaseTextureUpdated, this),
                                    this.baseTexture.off("loaded", this.onBaseTextureLoaded, this),
                                    this.baseTexture = null),
                                this._frame = null,
                                this._uvs = null,
                                this.trim = null,
                                this.orig = null,
                                this.valid = !1,
                                e.removeFromCache(this),
                                this.textureCacheIds = null
                        },
                        e.prototype.clone = function() {
                            return new e(this.baseTexture, this.frame, this.orig, this.trim, this.rotate)
                        },
                        e.prototype._updateUvs = function() {
                            this._uvs || (this._uvs = new h.default),
                                this._uvs.set(this._frame, this.baseTexture, this.rotate),
                                this._updateID++
                        },
                        e.fromImage = function(t, r, i, n) {
                            var s = c.TextureCache[t];
                            return s || (s = new e(o.default.fromImage(t, r, i, n)),
                                    e.addToCache(s, t)),
                                s
                        },
                        e.fromFrame = function(t) {
                            var e = c.TextureCache[t];
                            if (!e)
                                throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                            return e
                        },
                        e.fromCanvas = function(t, r) {
                            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "canvas";
                            return new e(o.default.fromCanvas(t, r, i))
                        },
                        e.fromVideo = function(t, r) {
                            return "string" == typeof t ? e.fromVideoUrl(t, r) : new e(a.default.fromVideo(t, r))
                        },
                        e.fromVideoUrl = function(t, r) {
                            return new e(a.default.fromUrl(t, r))
                        },
                        e.from = function(t) {
                            return "string" != typeof t ? t instanceof HTMLImageElement ? new e(o.default.from(t)) : t instanceof HTMLCanvasElement ? e.fromCanvas(t, d.default.SCALE_MODE, "HTMLCanvasElement") : t instanceof HTMLVideoElement ? e.fromVideo(t) : t instanceof o.default ? new e(t) : t : c.TextureCache[t] || (null !== t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) ? e.fromVideoUrl(t) : e.fromImage(t))
                        },
                        e.fromLoader = function(t, r, i) {
                            var n = new o.default(t, void 0, (0,
                                    c.getResolutionOfUrl)(r)),
                                s = new e(n);
                            return n.imageUrl = r,
                                i || (i = r),
                                o.default.addToCache(s.baseTexture, i),
                                e.addToCache(s, i),
                                i !== r && (o.default.addToCache(s.baseTexture, r),
                                    e.addToCache(s, r)),
                                s
                        },
                        e.addToCache = function(t, e) {
                            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e),
                                c.TextureCache[e] = t)
                        },
                        e.removeFromCache = function(t) {
                            if ("string" == typeof t) {
                                var e = c.TextureCache[t];
                                if (e) {
                                    var r = e.textureCacheIds.indexOf(t);
                                    return -1 < r && e.textureCacheIds.splice(r, 1),
                                        delete c.TextureCache[t],
                                        e
                                }
                            } else if (t && t.textureCacheIds) {
                                for (var i = 0; i < t.textureCacheIds.length; ++i)
                                    delete c.TextureCache[t.textureCacheIds[i]];
                                return t.textureCacheIds.length = 0,
                                    t
                            }
                            return null
                        },
                        s(e, [{
                            key: "frame",
                            get: function() {
                                return this._frame
                            },
                            set: function(t) {
                                if (this._frame = t,
                                    this.noFrame = !1,
                                    t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height)
                                    throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: X: " + t.x + " + " + t.width + " > " + this.baseTexture.width + " Y: " + t.y + " + " + t.height + " > " + this.baseTexture.height);
                                this.valid = t && t.width && t.height && this.baseTexture.hasLoaded,
                                    this.trim || this.rotate || (this.orig = t),
                                    this.valid && this._updateUvs()
                            }
                        }, {
                            key: "rotate",
                            get: function() {
                                return this._rotate
                            },
                            set: function(t) {
                                this._rotate = t,
                                    this.valid && this._updateUvs()
                            }
                        }, {
                            key: "width",
                            get: function() {
                                return this.orig.width
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this.orig.height
                            }
                        }]),
                        e
                }(u.default);
            (r.default = f).EMPTY = new f(new o.default),
                n(f.EMPTY),
                n(f.EMPTY.baseTexture),
                f.WHITE = function() {
                    var t = document.createElement("canvas");
                    t.width = 10,
                        t.height = 10;
                    var e = t.getContext("2d");
                    return e.fillStyle = "white",
                        e.fillRect(0, 0, 10, 10),
                        new f(new o.default(t))
                }(),
                n(f.WHITE),
                n(f.WHITE.baseTexture)
        }, {
            "../math": 68,
            "../settings": 99,
            "../utils": 122,
            "./BaseTexture": 110,
            "./TextureUvs": 114,
            "./VideoBaseTexture": 115,
            eventemitter3: 5
        }],
        114: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = (i = t("../math/GroupD8")) && i.__esModule ? i : {
                    default: i
                },
                s = function() {
                    function t() {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.x0 = 0,
                            this.y0 = 0,
                            this.x1 = 1,
                            this.y1 = 0,
                            this.x2 = 1,
                            this.y2 = 1,
                            this.x3 = 0,
                            this.y3 = 1,
                            this.uvsUint32 = new Uint32Array(4)
                    }
                    return t.prototype.set = function(t, e, r) {
                            var i = e.width,
                                s = e.height;
                            if (r) {
                                var o = t.width / 2 / i,
                                    a = t.height / 2 / s,
                                    h = t.x / i + o,
                                    u = t.y / s + a;
                                r = n.default.add(r, n.default.NW),
                                    this.x0 = h + o * n.default.uX(r),
                                    this.y0 = u + a * n.default.uY(r),
                                    r = n.default.add(r, 2),
                                    this.x1 = h + o * n.default.uX(r),
                                    this.y1 = u + a * n.default.uY(r),
                                    r = n.default.add(r, 2),
                                    this.x2 = h + o * n.default.uX(r),
                                    this.y2 = u + a * n.default.uY(r),
                                    r = n.default.add(r, 2),
                                    this.x3 = h + o * n.default.uX(r),
                                    this.y3 = u + a * n.default.uY(r)
                            } else
                                this.x0 = t.x / i,
                                this.y0 = t.y / s,
                                this.x1 = (t.x + t.width) / i,
                                this.y1 = t.y / s,
                                this.x2 = (t.x + t.width) / i,
                                this.y2 = (t.y + t.height) / s,
                                this.x3 = t.x / i,
                                this.y3 = (t.y + t.height) / s;
                            this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535,
                                this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535,
                                this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535,
                                this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535
                        },
                        t
                }();
            r.default = s
        }, {
            "../math/GroupD8": 64
        }],
        115: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                e || (e = "video/" + t.substr(t.lastIndexOf(".") + 1));
                var r = document.createElement("source");
                return r.src = t,
                    r.type = e,
                    r
            }
            r.__esModule = !0;
            var n, s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                o = (n = t("./BaseTexture")) && n.__esModule ? n : {
                    default: n
                },
                a = t("../utils"),
                h = t("../ticker"),
                u = t("../const"),
                l = function(t) {
                    function e(r, i) {
                        if (function(t, r) {
                                if (!(t instanceof e))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this), !r)
                            throw new Error("No video source element specified.");
                        (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0);
                        var n = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i));
                        return n.width = r.videoWidth,
                            n.height = r.videoHeight,
                            n._autoUpdate = !0,
                            n._isAutoUpdating = !1,
                            n.autoPlay = !0,
                            n.update = n.update.bind(n),
                            n._onCanPlay = n._onCanPlay.bind(n),
                            r.addEventListener("play", n._onPlayStart.bind(n)),
                            r.addEventListener("pause", n._onPlayStop.bind(n)),
                            n.hasLoaded = !1,
                            n.__loaded = !1,
                            n._isSourceReady() ? n._onCanPlay() : (r.addEventListener("canplay", n._onCanPlay),
                                r.addEventListener("canplaythrough", n._onCanPlay)),
                            n
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype._isSourcePlaying = function() {
                            var t = this.source;
                            return 0 < t.currentTime && !1 === t.paused && !1 === t.ended && 2 < t.readyState
                        },
                        e.prototype._isSourceReady = function() {
                            return 3 === this.source.readyState || 4 === this.source.readyState
                        },
                        e.prototype._onPlayStart = function() {
                            this.hasLoaded || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (h.shared.add(this.update, this, u.UPDATE_PRIORITY.HIGH),
                                this._isAutoUpdating = !0)
                        },
                        e.prototype._onPlayStop = function() {
                            this._isAutoUpdating && (h.shared.remove(this.update, this),
                                this._isAutoUpdating = !1)
                        },
                        e.prototype._onCanPlay = function() {
                            this.hasLoaded = !0,
                                this.source && (this.source.removeEventListener("canplay", this._onCanPlay),
                                    this.source.removeEventListener("canplaythrough", this._onCanPlay),
                                    this.width = this.source.videoWidth,
                                    this.height = this.source.videoHeight,
                                    this.__loaded || (this.__loaded = !0,
                                        this.emit("loaded", this)),
                                    this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play())
                        },
                        e.prototype.destroy = function() {
                            this._isAutoUpdating && h.shared.remove(this.update, this),
                                this.source && this.source._pixiId && (o.default.removeFromCache(this.source._pixiId),
                                    delete this.source._pixiId),
                                t.prototype.destroy.call(this)
                        },
                        e.fromVideo = function(t, r) {
                            t._pixiId || (t._pixiId = "video_" + (0,
                                a.uid)());
                            var i = a.BaseTextureCache[t._pixiId];
                            return i || (i = new e(t, r),
                                    o.default.addToCache(i, t._pixiId)),
                                i
                        },
                        e.fromUrl = function(t, r) {
                            var n = document.createElement("video");
                            if (n.setAttribute("webkit-playsinline", ""),
                                n.setAttribute("playsinline", ""),
                                Array.isArray(t))
                                for (var s = 0; s < t.length; ++s)
                                    n.appendChild(i(t[s].src || t[s], t[s].mime));
                            else
                                n.appendChild(i(t.src || t, t.mime));
                            return n.load(),
                                e.fromVideo(n, r)
                        },
                        s(e, [{
                            key: "autoUpdate",
                            get: function() {
                                return this._autoUpdate
                            },
                            set: function(t) {
                                t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isAutoUpdating ? (h.shared.remove(this.update, this),
                                    this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (h.shared.add(this.update, this, u.UPDATE_PRIORITY.HIGH),
                                    this._isAutoUpdating = !0))
                            }
                        }]),
                        e
                }(o.default);
            (r.default = l).fromUrls = l.fromUrl
        }, {
            "../const": 44,
            "../ticker": 118,
            "../utils": 122,
            "./BaseTexture": 110
        }],
        116: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = i(t("../settings")),
                o = t("../const"),
                a = i(t("./TickerListener")),
                h = function() {
                    function t() {
                        var e = this;
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this._head = new a.default(null, null, 1 / 0),
                            this._requestId = null,
                            this._maxElapsedMS = 100,
                            this.autoStart = !1,
                            this.deltaTime = 1,
                            this.elapsedMS = 1 / s.default.TARGET_FPMS,
                            this.lastTime = 0,
                            this.speed = 1,
                            this.started = !1,
                            this._tick = function(t) {
                                e._requestId = null,
                                    e.started && (e.update(t),
                                        e.started && null === e._requestId && e._head.next && (e._requestId = requestAnimationFrame(e._tick)))
                            }
                    }
                    return t.prototype._requestIfNeeded = function() {
                            null === this._requestId && this._head.next && (this.lastTime = performance.now(),
                                this._requestId = requestAnimationFrame(this._tick))
                        },
                        t.prototype._cancelIfNeeded = function() {
                            null !== this._requestId && (cancelAnimationFrame(this._requestId),
                                this._requestId = null)
                        },
                        t.prototype._startIfPossible = function() {
                            this.started ? this._requestIfNeeded() : this.autoStart && this.start()
                        },
                        t.prototype.add = function(t, e) {
                            var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : o.UPDATE_PRIORITY.NORMAL;
                            return this._addListener(new a.default(t, e, r))
                        },
                        t.prototype.addOnce = function(t, e) {
                            var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : o.UPDATE_PRIORITY.NORMAL;
                            return this._addListener(new a.default(t, e, r, !0))
                        },
                        t.prototype._addListener = function(t) {
                            var e = this._head.next,
                                r = this._head;
                            if (e) {
                                for (; e;) {
                                    if (t.priority > e.priority) {
                                        t.connect(r);
                                        break
                                    }
                                    e = (r = e).next
                                }
                                t.previous || t.connect(r)
                            } else
                                t.connect(r);
                            return this._startIfPossible(),
                                this
                        },
                        t.prototype.remove = function(t, e) {
                            for (var r = this._head.next; r;)
                                r = r.match(t, e) ? r.destroy() : r.next;
                            return this._head.next || this._cancelIfNeeded(),
                                this
                        },
                        t.prototype.start = function() {
                            this.started || (this.started = !0,
                                this._requestIfNeeded())
                        },
                        t.prototype.stop = function() {
                            this.started && (this.started = !1,
                                this._cancelIfNeeded())
                        },
                        t.prototype.destroy = function() {
                            this.stop();
                            for (var t = this._head.next; t;)
                                t = t.destroy(!0);
                            this._head.destroy(),
                                this._head = null
                        },
                        t.prototype.update = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : performance.now(),
                                e = void 0;
                            if (t > this.lastTime) {
                                (e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS),
                                    this.deltaTime = e * s.default.TARGET_FPMS * this.speed;
                                for (var r = this._head, i = r.next; i;)
                                    i = i.emit(this.deltaTime);
                                r.next || this._cancelIfNeeded()
                            } else
                                this.deltaTime = this.elapsedMS = 0;
                            this.lastTime = t
                        },
                        n(t, [{
                            key: "FPS",
                            get: function() {
                                return 1e3 / this.elapsedMS
                            }
                        }, {
                            key: "minFPS",
                            get: function() {
                                return 1e3 / this._maxElapsedMS
                            },
                            set: function(t) {
                                var e = Math.min(Math.max(0, t) / 1e3, s.default.TARGET_FPMS);
                                this._maxElapsedMS = 1 / e
                            }
                        }]),
                        t
                }();
            r.default = h
        }, {
            "../const": 44,
            "../settings": 99,
            "./TickerListener": 117
        }],
        117: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t(e) {
                    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                        i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
                        n = 3 < arguments.length && void 0 !== arguments[3] && arguments[3];
                    (function(e, r) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    })(this),
                    this.fn = e,
                        this.context = r,
                        this.priority = i,
                        this.once = n,
                        this.next = null,
                        this.previous = null,
                        this._destroyed = !1
                }
                return t.prototype.match = function(t, e) {
                        return e = e || null,
                            this.fn === t && this.context === e
                    },
                    t.prototype.emit = function(t) {
                        this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
                        var e = this.next;
                        return this.once && this.destroy(!0),
                            this._destroyed && (this.next = null),
                            e
                    },
                    t.prototype.connect = function(t) {
                        (this.previous = t).next && (t.next.previous = this),
                            this.next = t.next,
                            t.next = this
                    },
                    t.prototype.destroy = function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                        this._destroyed = !0,
                            this.fn = null,
                            this.context = null,
                            this.previous && (this.previous.next = this.next),
                            this.next && (this.next.previous = this.previous);
                        var e = this.previous;
                        return this.next = t ? null : e,
                            this.previous = null,
                            e
                    },
                    t
            }();
            r.default = i
        }, {}],
        118: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.Ticker = r.shared = void 0;
            var i, n = (i = t("./Ticker")) && i.__esModule ? i : {
                    default: i
                },
                s = new n.default;
            s.autoStart = !0,
                s.destroy = function() {},
                r.shared = s,
                r.Ticker = n.default
        }, {
            "./Ticker": 116
        }],
        119: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function() {
                    return !(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))
                }
        }, {}],
        120: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    for (var e = 6 * t, r = new Uint16Array(e), i = 0, n = 0; i < e; i += 6,
                        n += 4)
                        r[i + 0] = n + 0,
                        r[i + 1] = n + 1,
                        r[i + 2] = n + 2,
                        r[i + 3] = n + 0,
                        r[i + 4] = n + 2,
                        r[i + 5] = n + 3;
                    return r
                }
        }, {}],
        121: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : window.location;
                    if (0 === t.indexOf("data:"))
                        return "";
                    e = e || window.location,
                        s || (s = document.createElement("a")),
                        s.href = t;
                    var r = !(t = n.default.parse(s.href)).port && "" === e.port || t.port === e.port;
                    return t.hostname === e.hostname && r && t.protocol === e.protocol ? "" : "anonymous"
                };
            var i, n = (i = t("url")) && i.__esModule ? i : {
                    default: i
                },
                s = void 0
        }, {
            url: 39
        }],
        122: [function(t, e, r) {
            "use strict";

            function i(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e.default = t,
                    e
            }

            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.premultiplyBlendMode = r.BaseTextureCache = r.TextureCache = r.mixins = r.pluginTarget = r.EventEmitter = r.removeItems = r.isMobile = void 0,
                r.uid = function() {
                    return ++f
                },
                r.hex2rgb = function(t, e) {
                    return (e = e || [])[0] = (t >> 16 & 255) / 255,
                        e[1] = (t >> 8 & 255) / 255,
                        e[2] = (255 & t) / 255,
                        e
                },
                r.hex2string = function(t) {
                    return t = t.toString(16),
                        "#" + ("000000".substr(0, 6 - t.length) + t)
                },
                r.rgb2hex = function(t) {
                    return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0)
                },
                r.getResolutionOfUrl = function(t, e) {
                    var r = o.default.RETINA_PREFIX.exec(t);
                    return r ? parseFloat(r[1]) : void 0 !== e ? e : 1
                },
                r.decomposeDataUri = function(t) {
                    var e = s.DATA_URI.exec(t);
                    if (e)
                        return {
                            mediaType: e[1] ? e[1].toLowerCase() : void 0,
                            subType: e[2] ? e[2].toLowerCase() : void 0,
                            encoding: e[3] ? e[3].toLowerCase() : void 0,
                            data: e[4]
                        }
                },
                r.getUrlFileExtension = function(t) {
                    var e = s.URL_FILE_EXTENSION.exec(t);
                    if (e)
                        return e[1].toLowerCase()
                },
                r.getSvgSize = function(t) {
                    var e = s.SVG_SIZE.exec(t),
                        r = {};
                    return e && (r[e[1]] = Math.round(parseFloat(e[3])),
                            r[e[5]] = Math.round(parseFloat(e[7]))),
                        r
                },
                r.skipHello = function() {
                    p = !0
                },
                r.sayHello = function(t) {
                    if (!p) {
                        if (-1 < navigator.userAgent.toLowerCase().indexOf("chrome")) {
                            var e = ["\n %c %c %c Pixi.js " + s.VERSION + " - ✰ " + t + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                            window.console.log.apply(console, e)
                        } else
                            window.console && window.console.log("Pixi.js " + s.VERSION + " - " + t + " - http://www.pixijs.com/");
                        p = !0
                    }
                },
                r.isWebGLSupported = function() {
                    var t = {
                        stencil: !0,
                        failIfMajorPerformanceCaveat: !0
                    };
                    try {
                        if (!window.WebGLRenderingContext)
                            return !1;
                        var e = document.createElement("canvas"),
                            r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t),
                            i = !(!r || !r.getContextAttributes().stencil);
                        if (r) {
                            var n = r.getExtension("WEBGL_lose_context");
                            n && n.loseContext()
                        }
                        return r = null,
                            i
                    } catch (t) {
                        return !1
                    }
                },
                r.sign = function(t) {
                    return 0 === t ? 0 : t < 0 ? -1 : 1
                },
                r.destroyTextureCache = function() {
                    var t = void 0;
                    for (t in g)
                        g[t].destroy();
                    for (t in v)
                        v[t].destroy()
                },
                r.clearTextureCache = function() {
                    var t = void 0;
                    for (t in g)
                        delete g[t];
                    for (t in v)
                        delete v[t]
                },
                r.correctBlendMode = function(t, e) {
                    return _[e ? 1 : 0][t]
                },
                r.premultiplyTint = function(t, e) {
                    if (1 === e)
                        return (255 * e << 24) + t;
                    if (0 === e)
                        return 0;
                    var r = t >> 16 & 255,
                        i = t >> 8 & 255;
                    return (255 * e << 24) + ((r = r * e + .5 | 0) << 16) + ((i = i * e + .5 | 0) << 8) + ((255 & t) * e + .5 | 0)
                },
                r.premultiplyRgba = function(t, e, r, i) {
                    return (r = r || new Float32Array(4))[2] = i || void 0 === i ? (r[0] = t[0] * e,
                            r[1] = t[1] * e,
                            t[2] * e) : (r[0] = t[0],
                            r[1] = t[1],
                            t[2]),
                        r[3] = e,
                        r
                },
                r.premultiplyTintToRgba = function(t, e, r, i) {
                    return (r = r || new Float32Array(4))[0] = (t >> 16 & 255) / 255,
                        r[1] = (t >> 8 & 255) / 255,
                        r[2] = (255 & t) / 255,
                        (i || void 0 === i) && (r[0] *= e,
                            r[1] *= e,
                            r[2] *= e),
                        r[3] = e,
                        r
                };
            var s = t("../const"),
                o = n(t("../settings")),
                a = n(t("eventemitter3")),
                h = n(t("./pluginTarget")),
                u = i(t("./mixin")),
                l = i(t("ismobilejs")),
                c = n(t("remove-array-items")),
                d = n(t("./mapPremultipliedBlendModes")),
                f = 0,
                p = !1;
            r.isMobile = l,
                r.removeItems = c.default,
                r.EventEmitter = a.default,
                r.pluginTarget = h.default,
                r.mixins = u;
            var g = r.TextureCache = Object.create(null),
                v = r.BaseTextureCache = Object.create(null),
                _ = r.premultiplyBlendMode = (0,
                    d.default)()
        }, {
            "../const": 44,
            "../settings": 99,
            "./mapPremultipliedBlendModes": 123,
            "./mixin": 125,
            "./pluginTarget": 126,
            eventemitter3: 5,
            ismobilejs: 6,
            "remove-array-items": 32
        }],
        123: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function() {
                    for (var t = [], e = [], r = 0; r < 32; r++)
                        e[t[r] = r] = r;
                    t[i.BLEND_MODES.NORMAL_NPM] = i.BLEND_MODES.NORMAL,
                        t[i.BLEND_MODES.ADD_NPM] = i.BLEND_MODES.ADD,
                        t[i.BLEND_MODES.SCREEN_NPM] = i.BLEND_MODES.SCREEN,
                        e[i.BLEND_MODES.NORMAL] = i.BLEND_MODES.NORMAL_NPM,
                        e[i.BLEND_MODES.ADD] = i.BLEND_MODES.ADD_NPM,
                        e[i.BLEND_MODES.SCREEN] = i.BLEND_MODES.SCREEN_NPM;
                    var n = [];
                    return n.push(e),
                        n.push(t),
                        n
                };
            var i = t("../const")
        }, {
            "../const": 44
        }],
        124: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    return n.default.tablet || n.default.phone ? 4 : t
                };
            var i, n = (i = t("ismobilejs")) && i.__esModule ? i : {
                default: i
            }
        }, {
            ismobilejs: 6
        }],
        125: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                if (t && e)
                    for (var r = Object.keys(e), i = 0; i < r.length; ++i) {
                        var n = r[i];
                        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
                    }
            }
            r.__esModule = !0,
                r.mixin = i,
                r.delayMixin = function(t, e) {
                    n.push(t, e)
                },
                r.performMixins = function() {
                    for (var t = 0; t < n.length; t += 2)
                        i(n[t], n[t + 1]);
                    n.length = 0
                };
            var n = []
        }, {}],
        126: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = {
                    mixin: function(t) {
                        var e;
                        (e = t).__plugins = {},
                            e.registerPlugin = function(t, r) {
                                e.__plugins[t] = r
                            },
                            e.prototype.initPlugins = function() {
                                for (var t in this.plugins = this.plugins || {},
                                        e.__plugins)
                                    this.plugins[t] = new e.__plugins[t](this)
                            },
                            e.prototype.destroyPlugins = function() {
                                for (var t in this.plugins)
                                    this.plugins[t].destroy(),
                                    this.plugins[t] = null;
                                this.plugins = null
                            }
                    }
                }
        }, {}],
        127: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    var e = t.width,
                        r = t.height,
                        i = t.getContext("2d"),
                        n = i.getImageData(0, 0, e, r).data,
                        s = n.length,
                        o = {
                            top: null,
                            left: null,
                            right: null,
                            bottom: null
                        },
                        a = void 0,
                        h = void 0,
                        u = void 0;
                    for (a = 0; a < s; a += 4)
                        0 !== n[a + 3] && (h = a / 4 % e,
                            u = ~~(a / 4 / e),
                            null === o.top && (o.top = u),
                            null === o.left ? o.left = h : h < o.left && (o.left = h),
                            null === o.right ? o.right = h + 1 : o.right < h && (o.right = h + 1),
                            null === o.bottom ? o.bottom = u : o.bottom < u && (o.bottom = u));
                    return e = o.right - o.left, {
                        height: r = o.bottom - o.top + 1,
                        width: e,
                        data: i.getImageData(o.left, o.top, e, r)
                    }
                }
        }, {}],
        128: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function(t) {
                    var e = t.mesh,
                        r = t.particles,
                        i = t.extras,
                        n = t.filters,
                        s = t.prepare,
                        o = t.loaders,
                        a = t.interaction;
                    Object.defineProperties(t, {
                        SpriteBatch: {
                            get: function() {
                                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
                            }
                        },
                        AssetLoader: {
                            get: function() {
                                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
                            }
                        },
                        Stage: {
                            get: function() {
                                return t.Container
                            }
                        },
                        DisplayObjectContainer: {
                            get: function() {
                                return t.Container
                            }
                        },
                        Strip: {
                            get: function() {
                                return e.Mesh
                            }
                        },
                        Rope: {
                            get: function() {
                                return e.Rope
                            }
                        },
                        ParticleContainer: {
                            get: function() {
                                return r.ParticleContainer
                            }
                        },
                        MovieClip: {
                            get: function() {
                                return i.AnimatedSprite
                            }
                        },
                        TilingSprite: {
                            get: function() {
                                return i.TilingSprite
                            }
                        },
                        BitmapText: {
                            get: function() {
                                return i.BitmapText
                            }
                        },
                        blendModes: {
                            get: function() {
                                return t.BLEND_MODES
                            }
                        },
                        scaleModes: {
                            get: function() {
                                return t.SCALE_MODES
                            }
                        },
                        BaseTextureCache: {
                            get: function() {
                                return t.utils.BaseTextureCache
                            }
                        },
                        TextureCache: {
                            get: function() {
                                return t.utils.TextureCache
                            }
                        },
                        math: {
                            get: function() {
                                return t
                            }
                        },
                        AbstractFilter: {
                            get: function() {
                                return t.Filter
                            }
                        },
                        TransformManual: {
                            get: function() {
                                return t.TransformBase
                            }
                        },
                        TARGET_FPMS: {
                            get: function() {
                                return t.settings.TARGET_FPMS
                            },
                            set: function(e) {
                                t.settings.TARGET_FPMS = e
                            }
                        },
                        FILTER_RESOLUTION: {
                            get: function() {
                                return t.settings.FILTER_RESOLUTION
                            },
                            set: function(e) {
                                t.settings.FILTER_RESOLUTION = e
                            }
                        },
                        RESOLUTION: {
                            get: function() {
                                return t.settings.RESOLUTION
                            },
                            set: function(e) {
                                t.settings.RESOLUTION = e
                            }
                        },
                        MIPMAP_TEXTURES: {
                            get: function() {
                                return t.settings.MIPMAP_TEXTURES
                            },
                            set: function(e) {
                                t.settings.MIPMAP_TEXTURES = e
                            }
                        },
                        SPRITE_BATCH_SIZE: {
                            get: function() {
                                return t.settings.SPRITE_BATCH_SIZE
                            },
                            set: function(e) {
                                t.settings.SPRITE_BATCH_SIZE = e
                            }
                        },
                        SPRITE_MAX_TEXTURES: {
                            get: function() {
                                return t.settings.SPRITE_MAX_TEXTURES
                            },
                            set: function(e) {
                                t.settings.SPRITE_MAX_TEXTURES = e
                            }
                        },
                        RETINA_PREFIX: {
                            get: function() {
                                return t.settings.RETINA_PREFIX
                            },
                            set: function(e) {
                                t.settings.RETINA_PREFIX = e
                            }
                        },
                        DEFAULT_RENDER_OPTIONS: {
                            get: function() {
                                return t.settings.RENDER_OPTIONS
                            }
                        }
                    });
                    for (var h = [{
                            parent: "TRANSFORM_MODE",
                            target: "TRANSFORM_MODE"
                        }, {
                            parent: "GC_MODES",
                            target: "GC_MODE"
                        }, {
                            parent: "WRAP_MODES",
                            target: "WRAP_MODE"
                        }, {
                            parent: "SCALE_MODES",
                            target: "SCALE_MODE"
                        }, {
                            parent: "PRECISION",
                            target: "PRECISION_FRAGMENT"
                        }], u = 0; u < h.length; u++)
                        ! function(e) {
                            var r = h[u];
                            Object.defineProperty(t[r.parent], "DEFAULT", {
                                get: function() {
                                    return r.parent,
                                        r.target,
                                        t.settings[r.target]
                                },
                                set: function(e) {
                                    r.parent,
                                        r.target,
                                        t.settings[r.target] = e
                                }
                            })
                        }();
                    Object.defineProperties(t.settings, {
                            PRECISION: {
                                get: function() {
                                    return t.settings.PRECISION_FRAGMENT
                                },
                                set: function(e) {
                                    t.settings.PRECISION_FRAGMENT = e
                                }
                            }
                        }),
                        i.AnimatedSprite && Object.defineProperties(i, {
                            MovieClip: {
                                get: function() {
                                    return i.AnimatedSprite
                                }
                            }
                        }),
                        t.DisplayObject.prototype.generateTexture = function(t, e, r) {
                            return t.generateTexture(this, e, r)
                        },
                        t.Graphics.prototype.generateTexture = function(t, e) {
                            return this.generateCanvasTexture(t, e)
                        },
                        t.RenderTexture.prototype.render = function(t, e, r, i) {
                            this.legacyRenderer.render(t, this, r, e, !i)
                        },
                        t.RenderTexture.prototype.getImage = function(t) {
                            return this.legacyRenderer.extract.image(t)
                        },
                        t.RenderTexture.prototype.getBase64 = function(t) {
                            return this.legacyRenderer.extract.base64(t)
                        },
                        t.RenderTexture.prototype.getCanvas = function(t) {
                            return this.legacyRenderer.extract.canvas(t)
                        },
                        t.RenderTexture.prototype.getPixels = function(t) {
                            return this.legacyRenderer.pixels(t)
                        },
                        t.Sprite.prototype.setTexture = function(t) {
                            this.texture = t
                        },
                        i.BitmapText && (i.BitmapText.prototype.setText = function(t) {
                            this.text = t
                        }),
                        t.Text.prototype.setText = function(t) {
                            this.text = t
                        },
                        t.Text.calculateFontProperties = function(e) {
                            return t.TextMetrics.measureFont(e)
                        },
                        Object.defineProperties(t.Text, {
                            fontPropertiesCache: {
                                get: function() {
                                    return t.TextMetrics._fonts
                                }
                            },
                            fontPropertiesCanvas: {
                                get: function() {
                                    return t.TextMetrics._canvas
                                }
                            },
                            fontPropertiesContext: {
                                get: function() {
                                    return t.TextMetrics._context
                                }
                            }
                        }),
                        t.Text.prototype.setStyle = function(t) {
                            this.style = t
                        },
                        t.Text.prototype.determineFontProperties = function(e) {
                            return t.TextMetrics.measureFont(e)
                        },
                        t.Text.getFontStyle = function(e) {
                            return (e = e || {}) instanceof t.TextStyle || (e = new t.TextStyle(e)),
                                e.toFontString()
                        },
                        Object.defineProperties(t.TextStyle.prototype, {
                            font: {
                                get: function() {
                                    var t = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;
                                    return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + t + " " + this._fontFamily
                                },
                                set: function(t) {
                                    1 < t.indexOf("italic") ? this._fontStyle = "italic" : -1 < t.indexOf("oblique") ? this._fontStyle = "oblique" : this._fontStyle = "normal", -1 < t.indexOf("small-caps") ? this._fontVariant = "small-caps" : this._fontVariant = "normal";
                                    var e = t.split(" "),
                                        r = -1;
                                    this._fontSize = 26;
                                    for (var i = 0; i < e.length; ++i)
                                        if (e[i].match(/(px|pt|em|%)/)) {
                                            r = i,
                                                this._fontSize = e[i];
                                            break
                                        }
                                    this._fontWeight = "normal";
                                    for (var n = 0; n < r; ++n)
                                        if (e[n].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                                            this._fontWeight = e[n];
                                            break
                                        }
                                    if (-1 < r && r < e.length - 1) {
                                        this._fontFamily = "";
                                        for (var s = r + 1; s < e.length; ++s)
                                            this._fontFamily += e[s] + " ";
                                        this._fontFamily = this._fontFamily.slice(0, -1)
                                    } else
                                        this._fontFamily = "Arial";
                                    this.styleID++
                                }
                            }
                        }),
                        t.Texture.prototype.setFrame = function(t) {
                            this.frame = t
                        },
                        t.Texture.addTextureToCache = function(e, r) {
                            t.Texture.addToCache(e, r)
                        },
                        t.Texture.removeTextureFromCache = function(e) {
                            return t.BaseTexture.removeFromCache(e),
                                t.Texture.removeFromCache(e)
                        },
                        Object.defineProperties(n, {
                            AbstractFilter: {
                                get: function() {
                                    return t.AbstractFilter
                                }
                            },
                            SpriteMaskFilter: {
                                get: function() {
                                    return t.SpriteMaskFilter
                                }
                            }
                        }),
                        t.utils.uuid = function() {
                            return t.utils.uid()
                        },
                        t.utils.canUseNewCanvasBlendModes = function() {
                            return t.CanvasTinter.canUseMultiply
                        };
                    var l = !0;
                    if (Object.defineProperty(t.utils, "_saidHello", {
                            set: function(t) {
                                t && this.skipHello(),
                                    l = t
                            },
                            get: function() {
                                return l
                            }
                        }),
                        s.BasePrepare && (s.BasePrepare.prototype.register = function(t, e) {
                            return t && this.registerFindHook(t),
                                e && this.registerUploadHook(e),
                                this
                        }),
                        s.canvas && Object.defineProperty(s.canvas, "UPLOADS_PER_FRAME", {
                            set: function() {},
                            get: function() {
                                return NaN
                            }
                        }),
                        s.webgl && Object.defineProperty(s.webgl, "UPLOADS_PER_FRAME", {
                            set: function() {},
                            get: function() {
                                return NaN
                            }
                        }),
                        o.Loader) {
                        var c = o.Resource,
                            d = o.Loader;
                        Object.defineProperties(c.prototype, {
                                isJson: {
                                    get: function() {
                                        return this.type === c.TYPE.JSON
                                    }
                                },
                                isXml: {
                                    get: function() {
                                        return this.type === c.TYPE.XML
                                    }
                                },
                                isImage: {
                                    get: function() {
                                        return this.type === c.TYPE.IMAGE
                                    }
                                },
                                isAudio: {
                                    get: function() {
                                        return this.type === c.TYPE.AUDIO
                                    }
                                },
                                isVideo: {
                                    get: function() {
                                        return this.type === c.TYPE.VIDEO
                                    }
                                }
                            }),
                            Object.defineProperties(d.prototype, {
                                before: {
                                    get: function() {
                                        return this.pre
                                    }
                                },
                                after: {
                                    get: function() {
                                        return this.use
                                    }
                                }
                            })
                    }
                    a.interactiveTarget && Object.defineProperty(a.interactiveTarget, "defaultCursor", {
                            set: function(t) {
                                this.cursor = t
                            },
                            get: function() {
                                return this.cursor
                            }
                        }),
                        a.InteractionManager && (Object.defineProperty(a.InteractionManager, "defaultCursorStyle", {
                                set: function(t) {
                                    this.cursorStyles.default = t
                                },
                                get: function() {
                                    return this.cursorStyles.default
                                }
                            }),
                            Object.defineProperty(a.InteractionManager, "currentCursorStyle", {
                                set: function(t) {
                                    this.currentCursorMode = t
                                },
                                get: function() {
                                    return this.currentCursorMode
                                }
                            }))
                }
        }, {}],
        129: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../../core")),
                n = new i.Rectangle,
                s = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        (this.renderer = e).extract = this
                    }
                    return t.prototype.image = function(t) {
                            var e = new Image;
                            return e.src = this.base64(t),
                                e
                        },
                        t.prototype.base64 = function(t) {
                            return this.canvas(t).toDataURL()
                        },
                        t.prototype.canvas = function(t) {
                            var e = this.renderer,
                                r = void 0,
                                s = void 0,
                                o = void 0,
                                a = void 0;
                            t && (a = t instanceof i.RenderTexture ? t : e.generateTexture(t)),
                                a ? (r = a.baseTexture._canvasRenderTarget.context,
                                    s = a.baseTexture._canvasRenderTarget.resolution,
                                    o = a.frame) : (r = e.rootContext,
                                    (o = n).width = this.renderer.width,
                                    o.height = this.renderer.height);
                            var h = o.width * s,
                                u = o.height * s,
                                l = new i.CanvasRenderTarget(h, u),
                                c = r.getImageData(o.x * s, o.y * s, h, u);
                            return l.context.putImageData(c, 0, 0),
                                l.canvas
                        },
                        t.prototype.pixels = function(t) {
                            var e = this.renderer,
                                r = void 0,
                                s = void 0,
                                o = void 0,
                                a = void 0;
                            return t && (a = t instanceof i.RenderTexture ? t : e.generateTexture(t)),
                                a ? (r = a.baseTexture._canvasRenderTarget.context,
                                    s = a.baseTexture._canvasRenderTarget.resolution,
                                    o = a.frame) : (r = e.rootContext,
                                    (o = n).width = e.width,
                                    o.height = e.height),
                                r.getImageData(0, 0, o.width * s, o.height * s).data
                        },
                        t.prototype.destroy = function() {
                            this.renderer.extract = null,
                                this.renderer = null
                        },
                        t
                }();
            r.default = s,
                i.CanvasRenderer.registerPlugin("extract", s)
        }, {
            "../../core": 63
        }],
        130: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = t("./webgl/WebGLExtract");
            Object.defineProperty(r, "webgl", {
                enumerable: !0,
                get: function() {
                    return i(n).default
                }
            });
            var s = t("./canvas/CanvasExtract");
            Object.defineProperty(r, "canvas", {
                enumerable: !0,
                get: function() {
                    return i(s).default
                }
            })
        }, {
            "./canvas/CanvasExtract": 129,
            "./webgl/WebGLExtract": 131
        }],
        131: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../../core")),
                n = new i.Rectangle,
                s = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        (this.renderer = e).extract = this
                    }
                    return t.prototype.image = function(t) {
                            var e = new Image;
                            return e.src = this.base64(t),
                                e
                        },
                        t.prototype.base64 = function(t) {
                            return this.canvas(t).toDataURL()
                        },
                        t.prototype.canvas = function(t) {
                            var e = this.renderer,
                                r = void 0,
                                s = void 0,
                                o = void 0,
                                a = !1,
                                h = void 0;
                            t && (h = t instanceof i.RenderTexture ? t : this.renderer.generateTexture(t)),
                                h ? (s = (r = h.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution,
                                    o = h.frame,
                                    a = !1) : (s = (r = this.renderer.rootRenderTarget).resolution,
                                    a = !0,
                                    (o = n).width = r.size.width,
                                    o.height = r.size.height);
                            var u = o.width * s,
                                l = o.height * s,
                                c = new i.CanvasRenderTarget(u, l);
                            if (r) {
                                e.bindRenderTarget(r);
                                var d = new Uint8Array(4 * u * l),
                                    f = e.gl;
                                f.readPixels(o.x * s, o.y * s, u, l, f.RGBA, f.UNSIGNED_BYTE, d);
                                var p = c.context.getImageData(0, 0, u, l);
                                p.data.set(d),
                                    c.context.putImageData(p, 0, 0),
                                    a && (c.context.scale(1, -1),
                                        c.context.drawImage(c.canvas, 0, -l))
                            }
                            return c.canvas
                        },
                        t.prototype.pixels = function(t) {
                            var e = this.renderer,
                                r = void 0,
                                s = void 0,
                                o = void 0,
                                a = void 0;
                            t && (a = t instanceof i.RenderTexture ? t : this.renderer.generateTexture(t)),
                                a ? (s = (r = a.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution,
                                    o = a.frame) : (s = (r = this.renderer.rootRenderTarget).resolution,
                                    (o = n).width = r.size.width,
                                    o.height = r.size.height);
                            var h = o.width * s,
                                u = o.height * s,
                                l = new Uint8Array(4 * h * u);
                            if (r) {
                                e.bindRenderTarget(r);
                                var c = e.gl;
                                c.readPixels(o.x * s, o.y * s, h, u, c.RGBA, c.UNSIGNED_BYTE, l)
                            }
                            return l
                        },
                        t.prototype.destroy = function() {
                            this.renderer.extract = null,
                                this.renderer = null
                        },
                        t
                }();
            r.default = s,
                i.WebGLRenderer.registerPlugin("extract", s)
        }, {
            "../../core": 63
        }],
        132: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                s = function(t) {
                    function e(r, i) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var s = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r[0] instanceof n.Texture ? r[0] : r[0].texture));
                        return s._textures = null,
                            s._durations = null,
                            s.textures = r,
                            s._autoUpdate = !1 !== i,
                            s.animationSpeed = 1,
                            s.loop = !0,
                            s.onComplete = null,
                            s.onFrameChange = null,
                            s.onLoop = null,
                            s._currentTime = 0,
                            s.playing = !1,
                            s
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.stop = function() {
                            this.playing && (this.playing = !1,
                                this._autoUpdate && n.ticker.shared.remove(this.update, this))
                        },
                        e.prototype.play = function() {
                            this.playing || (this.playing = !0,
                                this._autoUpdate && n.ticker.shared.add(this.update, this, n.UPDATE_PRIORITY.HIGH))
                        },
                        e.prototype.gotoAndStop = function(t) {
                            this.stop();
                            var e = this.currentFrame;
                            this._currentTime = t,
                                e !== this.currentFrame && this.updateTexture()
                        },
                        e.prototype.gotoAndPlay = function(t) {
                            var e = this.currentFrame;
                            this._currentTime = t,
                                e !== this.currentFrame && this.updateTexture(),
                                this.play()
                        },
                        e.prototype.update = function(t) {
                            var e = this.animationSpeed * t,
                                r = this.currentFrame;
                            if (null !== this._durations) {
                                var i = this._currentTime % 1 * this._durations[this.currentFrame];
                                for (i += e / 60 * 1e3; i < 0;)
                                    this._currentTime--,
                                    i += this._durations[this.currentFrame];
                                var n = Math.sign(this.animationSpeed * t);
                                for (this._currentTime = Math.floor(this._currentTime); i >= this._durations[this.currentFrame];)
                                    i -= this._durations[this.currentFrame] * n,
                                    this._currentTime += n;
                                this._currentTime += i / this._durations[this.currentFrame]
                            } else
                                this._currentTime += e;
                            this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0),
                                this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1),
                                this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (0 < this.animationSpeed && this.currentFrame < r ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > r && this.onLoop()),
                                this.updateTexture())
                        },
                        e.prototype.updateTexture = function() {
                            this._texture = this._textures[this.currentFrame],
                                this._textureID = -1,
                                this.onFrameChange && this.onFrameChange(this.currentFrame)
                        },
                        e.prototype.destroy = function(e) {
                            this.stop(),
                                t.prototype.destroy.call(this, e)
                        },
                        e.fromFrames = function(t) {
                            for (var r = [], i = 0; i < t.length; ++i)
                                r.push(n.Texture.fromFrame(t[i]));
                            return new e(r)
                        },
                        e.fromImages = function(t) {
                            for (var r = [], i = 0; i < t.length; ++i)
                                r.push(n.Texture.fromImage(t[i]));
                            return new e(r)
                        },
                        i(e, [{
                            key: "totalFrames",
                            get: function() {
                                return this._textures.length
                            }
                        }, {
                            key: "textures",
                            get: function() {
                                return this._textures
                            },
                            set: function(t) {
                                if (t[0] instanceof n.Texture)
                                    this._textures = t,
                                    this._durations = null;
                                else {
                                    this._textures = [],
                                        this._durations = [];
                                    for (var e = 0; e < t.length; e++)
                                        this._textures.push(t[e].texture),
                                        this._durations.push(t[e].time)
                                }
                                this.gotoAndStop(0),
                                    this.updateTexture()
                            }
                        }, {
                            key: "currentFrame",
                            get: function() {
                                var t = Math.floor(this._currentTime) % this._textures.length;
                                return t < 0 && (t += this._textures.length),
                                    t
                            }
                        }]),
                        e
                }(n.Sprite);
            r.default = s
        }, {
            "../core": 63
        }],
        133: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                o = i(t("../core/math/ObservablePoint")),
                a = i(t("../core/settings")),
                h = function(t) {
                    function e(r) {
                        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var n = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return n._textWidth = 0,
                            n._textHeight = 0,
                            n._glyphs = [],
                            n._font = {
                                tint: void 0 !== i.tint ? i.tint : 16777215,
                                align: i.align || "left",
                                name: null,
                                size: 0
                            },
                            n.font = i.font,
                            n._text = r,
                            n._maxWidth = 0,
                            n._maxLineHeight = 0,
                            n._anchor = new o.default(function() {
                                n.dirty = !0
                            }, n, 0, 0),
                            n.dirty = !1,
                            n.updateText(),
                            n
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.updateText = function() {
                            for (var t = e.fonts[this._font.name], r = this._font.size / t.size, i = new s.Point, n = [], o = [], a = null, h = 0, u = 0, l = 0, c = -1, d = 0, f = 0, p = 0, g = 0; g < this.text.length; g++) {
                                var v = this.text.charCodeAt(g);
                                if (/(\s)/.test(this.text.charAt(g)) && (c = g,
                                        d = h),
                                    /(?:\r\n|\r|\n)/.test(this.text.charAt(g)))
                                    o.push(h),
                                    u = Math.max(u, h),
                                    l++,
                                    i.x = 0,
                                    i.y += t.lineHeight,
                                    a = null;
                                else if (-1 !== c && 0 < this._maxWidth && i.x * r > this._maxWidth)
                                    s.utils.removeItems(n, c - f, g - c),
                                    g = c,
                                    c = -1,
                                    ++f,
                                    o.push(d),
                                    u = Math.max(u, d),
                                    l++,
                                    i.x = 0,
                                    i.y += t.lineHeight,
                                    a = null;
                                else {
                                    var _ = t.chars[v];
                                    _ && (a && _.kerning[a] && (i.x += _.kerning[a]),
                                        n.push({
                                            texture: _.texture,
                                            line: l,
                                            charCode: v,
                                            position: new s.Point(i.x + _.xOffset, i.y + _.yOffset)
                                        }),
                                        h = i.x + (_.texture.width + _.xOffset),
                                        i.x += _.xAdvance,
                                        p = Math.max(p, _.yOffset + _.texture.height),
                                        a = v)
                                }
                            }
                            o.push(h),
                                u = Math.max(u, h);
                            for (var m = [], y = 0; y <= l; y++) {
                                var x = 0;
                                "right" === this._font.align ? x = u - o[y] : "center" === this._font.align && (x = (u - o[y]) / 2),
                                    m.push(x)
                            }
                            for (var b = n.length, T = this.tint, E = 0; E < b; E++) {
                                var w = this._glyphs[E];
                                w ? w.texture = n[E].texture : (w = new s.Sprite(n[E].texture),
                                        this._glyphs.push(w)),
                                    w.position.x = (n[E].position.x + m[n[E].line]) * r,
                                    w.position.y = n[E].position.y * r,
                                    w.scale.x = w.scale.y = r,
                                    w.tint = T,
                                    w.parent || this.addChild(w)
                            }
                            for (var S = b; S < this._glyphs.length; ++S)
                                this.removeChild(this._glyphs[S]);
                            if (this._textWidth = u * r,
                                this._textHeight = (i.y + t.lineHeight) * r,
                                0 !== this.anchor.x || 0 !== this.anchor.y)
                                for (var O = 0; O < b; O++)
                                    this._glyphs[O].x -= this._textWidth * this.anchor.x,
                                    this._glyphs[O].y -= this._textHeight * this.anchor.y;
                            this._maxLineHeight = p * r
                        },
                        e.prototype.updateTransform = function() {
                            this.validate(),
                                this.containerUpdateTransform()
                        },
                        e.prototype.getLocalBounds = function() {
                            return this.validate(),
                                t.prototype.getLocalBounds.call(this)
                        },
                        e.prototype.validate = function() {
                            this.dirty && (this.updateText(),
                                this.dirty = !1)
                        },
                        e.registerFont = function(t, r) {
                            var i = {},
                                n = t.getElementsByTagName("info")[0],
                                o = t.getElementsByTagName("common")[0],
                                h = r.baseTexture.resolution || a.default.RESOLUTION;
                            i.font = n.getAttribute("face"),
                                i.size = parseInt(n.getAttribute("size"), 10),
                                i.lineHeight = parseInt(o.getAttribute("lineHeight"), 10) / h,
                                i.chars = {};
                            for (var u = t.getElementsByTagName("char"), l = 0; l < u.length; l++) {
                                var c = u[l],
                                    d = parseInt(c.getAttribute("id"), 10),
                                    f = new s.Rectangle(parseInt(c.getAttribute("x"), 10) / h + r.frame.x / h, parseInt(c.getAttribute("y"), 10) / h + r.frame.y / h, parseInt(c.getAttribute("width"), 10) / h, parseInt(c.getAttribute("height"), 10) / h);
                                i.chars[d] = {
                                    xOffset: parseInt(c.getAttribute("xoffset"), 10) / h,
                                    yOffset: parseInt(c.getAttribute("yoffset"), 10) / h,
                                    xAdvance: parseInt(c.getAttribute("xadvance"), 10) / h,
                                    kerning: {},
                                    texture: new s.Texture(r.baseTexture, f)
                                }
                            }
                            for (var p = t.getElementsByTagName("kerning"), g = 0; g < p.length; g++) {
                                var v = p[g],
                                    _ = parseInt(v.getAttribute("first"), 10) / h,
                                    m = parseInt(v.getAttribute("second"), 10) / h,
                                    y = parseInt(v.getAttribute("amount"), 10) / h;
                                i.chars[m] && (i.chars[m].kerning[_] = y)
                            }
                            return e.fonts[i.font] = i
                        },
                        n(e, [{
                            key: "tint",
                            get: function() {
                                return this._font.tint
                            },
                            set: function(t) {
                                this._font.tint = "number" == typeof t && 0 <= t ? t : 16777215,
                                    this.dirty = !0
                            }
                        }, {
                            key: "align",
                            get: function() {
                                return this._font.align
                            },
                            set: function(t) {
                                this._font.align = t || "left",
                                    this.dirty = !0
                            }
                        }, {
                            key: "anchor",
                            get: function() {
                                return this._anchor
                            },
                            set: function(t) {
                                "number" == typeof t ? this._anchor.set(t) : this._anchor.copy(t)
                            }
                        }, {
                            key: "font",
                            get: function() {
                                return this._font
                            },
                            set: function(t) {
                                t && (this._font.size = "string" == typeof t ? (t = t.split(" "),
                                        this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "),
                                        2 <= t.length ? parseInt(t[0], 10) : e.fonts[this._font.name].size) : (this._font.name = t.name,
                                        "number" == typeof t.size ? t.size : parseInt(t.size, 10)),
                                    this.dirty = !0)
                            }
                        }, {
                            key: "text",
                            get: function() {
                                return this._text
                            },
                            set: function(t) {
                                t = t.toString() || " ",
                                    this._text !== t && (this._text = t,
                                        this.dirty = !0)
                            }
                        }, {
                            key: "maxWidth",
                            get: function() {
                                return this._maxWidth
                            },
                            set: function(t) {
                                this._maxWidth !== t && (this._maxWidth = t,
                                    this.dirty = !0)
                            }
                        }, {
                            key: "maxLineHeight",
                            get: function() {
                                return this.validate(),
                                    this._maxLineHeight
                            }
                        }, {
                            key: "textWidth",
                            get: function() {
                                return this.validate(),
                                    this._textWidth
                            }
                        }, {
                            key: "textHeight",
                            get: function() {
                                return this.validate(),
                                    this._textHeight
                            }
                        }]),
                        e
                }(s.Container);
            (r.default = h).fonts = {}
        }, {
            "../core": 63,
            "../core/math/ObservablePoint": 66,
            "../core/settings": 99
        }],
        134: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i, n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = (i = t("../core/math/Matrix")) && i.__esModule ? i : {
                    default: i
                },
                o = new s.default,
                a = function() {
                    function t(e, r) {
                        (function(e, r) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        })(this),
                        this._texture = e,
                            this.mapCoord = new s.default,
                            this.uClampFrame = new Float32Array(4),
                            this.uClampOffset = new Float32Array(2),
                            this._lastTextureID = -1,
                            this.clampOffset = 0,
                            this.clampMargin = void 0 === r ? .5 : r
                    }
                    return t.prototype.multiplyUvs = function(t, e) {
                            void 0 === e && (e = t);
                            for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
                                var n = t[i],
                                    s = t[i + 1];
                                e[i] = n * r.a + s * r.c + r.tx,
                                    e[i + 1] = n * r.b + s * r.d + r.ty
                            }
                            return e
                        },
                        t.prototype.update = function(t) {
                            var e = this._texture;
                            if (!e || !e.valid)
                                return !1;
                            if (!t && this._lastTextureID === e._updateID)
                                return !1;
                            this._lastTextureID = e._updateID;
                            var r = e._uvs;
                            this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
                            var i = e.orig,
                                n = e.trim;
                            n && (o.set(i.width / n.width, 0, 0, i.height / n.height, -n.x / n.width, -n.y / n.height),
                                this.mapCoord.append(o));
                            var s = e.baseTexture,
                                a = this.uClampFrame,
                                h = this.clampMargin / s.resolution,
                                u = this.clampOffset;
                            return a[0] = (e._frame.x + h + u) / s.width,
                                a[1] = (e._frame.y + h + u) / s.height,
                                a[2] = (e._frame.x + e._frame.width - h + u) / s.width,
                                a[3] = (e._frame.y + e._frame.height - h + u) / s.height,
                                this.uClampOffset[0] = u / s.realWidth,
                                this.uClampOffset[1] = u / s.realHeight, !0
                        },
                        n(t, [{
                            key: "texture",
                            get: function() {
                                return this._texture
                            },
                            set: function(t) {
                                this._texture = t,
                                    this._lastTextureID = -1
                            }
                        }]),
                        t
                }();
            r.default = a
        }, {
            "../core/math/Matrix": 65
        }],
        135: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                s = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                o = i(t("../core/sprites/canvas/CanvasTinter")),
                a = i(t("./TextureTransform")),
                h = new s.Point,
                u = function(t) {
                    function e(r) {
                        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100,
                            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 100;
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var o = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return o.tileTransform = new s.TransformStatic,
                            o._width = i,
                            o._height = n,
                            o._canvasPattern = null,
                            o.uvTransform = r.transform || new a.default(r),
                            o.pluginName = "tilingSprite",
                            o.uvRespectAnchor = !1,
                            o
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype._onTextureUpdate = function() {
                            this.uvTransform && (this.uvTransform.texture = this._texture)
                        },
                        e.prototype._renderWebGL = function(t) {
                            var e = this._texture;
                            e && e.valid && (this.tileTransform.updateLocalTransform(),
                                this.uvTransform.update(),
                                t.setObjectRenderer(t.plugins[this.pluginName]),
                                t.plugins[this.pluginName].render(this))
                        },
                        e.prototype._renderCanvas = function(t) {
                            var e = this._texture;
                            if (e.baseTexture.hasLoaded) {
                                var r = t.context,
                                    i = this.worldTransform,
                                    n = t.resolution,
                                    a = e.baseTexture,
                                    h = a.resolution,
                                    u = this.tilePosition.x / this.tileScale.x % e._frame.width * h,
                                    l = this.tilePosition.y / this.tileScale.y % e._frame.height * h;
                                if (!this._canvasPattern) {
                                    var c = new s.CanvasRenderTarget(e._frame.width, e._frame.height, h);
                                    16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint,
                                                this.tintedTexture = o.default.getTintedTexture(this, this.tint)),
                                            c.context.drawImage(this.tintedTexture, 0, 0)) : c.context.drawImage(a.source, -e._frame.x * h, -e._frame.y * h),
                                        this._canvasPattern = c.context.createPattern(c.canvas, "repeat")
                                }
                                r.globalAlpha = this.worldAlpha,
                                    r.setTransform(i.a * n, i.b * n, i.c * n, i.d * n, i.tx * n, i.ty * n),
                                    t.setBlendMode(this.blendMode),
                                    r.fillStyle = this._canvasPattern,
                                    r.scale(this.tileScale.x / h, this.tileScale.y / h);
                                var d = this.anchor.x * -this._width,
                                    f = this.anchor.y * -this._height;
                                this.uvRespectAnchor ? (r.translate(u, l),
                                    r.fillRect(-u + d, -l + f, this._width / this.tileScale.x * h, this._height / this.tileScale.y * h)) : (r.translate(u + d, l + f),
                                    r.fillRect(-u, -l, this._width / this.tileScale.x * h, this._height / this.tileScale.y * h))
                            }
                        },
                        e.prototype._calculateBounds = function() {
                            var t = this._width * -this._anchor._x,
                                e = this._height * -this._anchor._y,
                                r = this._width * (1 - this._anchor._x),
                                i = this._height * (1 - this._anchor._y);
                            this._bounds.addFrame(this.transform, t, e, r, i)
                        },
                        e.prototype.getLocalBounds = function(e) {
                            return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x,
                                this._bounds.minY = this._height * -this._anchor._y,
                                this._bounds.maxX = this._width * (1 - this._anchor._x),
                                this._bounds.maxY = this._height * (1 - this._anchor._x),
                                e || (this._localBoundsRect || (this._localBoundsRect = new s.Rectangle),
                                    e = this._localBoundsRect),
                                this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
                        },
                        e.prototype.containsPoint = function(t) {
                            this.worldTransform.applyInverse(t, h);
                            var e = this._width,
                                r = this._height,
                                i = -e * this.anchor._x;
                            if (h.x >= i && h.x < i + e) {
                                var n = -r * this.anchor._y;
                                if (h.y >= n && h.y < n + r)
                                    return !0
                            }
                            return !1
                        },
                        e.prototype.destroy = function(e) {
                            t.prototype.destroy.call(this, e),
                                this.tileTransform = null,
                                this.uvTransform = null
                        },
                        e.from = function(t, r, i) {
                            return new e(s.Texture.from(t), r, i)
                        },
                        e.fromFrame = function(t, r, i) {
                            var n = s.utils.TextureCache[t];
                            if (!n)
                                throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                            return new e(n, r, i)
                        },
                        e.fromImage = function(t, r, i, n, o) {
                            return new e(s.Texture.fromImage(t, n, o), r, i)
                        },
                        n(e, [{
                            key: "clampMargin",
                            get: function() {
                                return this.uvTransform.clampMargin
                            },
                            set: function(t) {
                                this.uvTransform.clampMargin = t,
                                    this.uvTransform.update(!0)
                            }
                        }, {
                            key: "tileScale",
                            get: function() {
                                return this.tileTransform.scale
                            },
                            set: function(t) {
                                this.tileTransform.scale.copy(t)
                            }
                        }, {
                            key: "tilePosition",
                            get: function() {
                                return this.tileTransform.position
                            },
                            set: function(t) {
                                this.tileTransform.position.copy(t)
                            }
                        }, {
                            key: "width",
                            get: function() {
                                return this._width
                            },
                            set: function(t) {
                                this._width = t
                            }
                        }, {
                            key: "height",
                            get: function() {
                                return this._height
                            },
                            set: function(t) {
                                this._height = t
                            }
                        }]),
                        e
                }(s.Sprite);
            r.default = u
        }, {
            "../core": 63,
            "../core/sprites/canvas/CanvasTinter": 102,
            "./TextureTransform": 134
        }],
        136: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var n = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                s = i(t("../core/textures/Texture")),
                o = i(t("../core/textures/BaseTexture")),
                a = t("../core/utils"),
                h = n.DisplayObject,
                u = new n.Matrix;
            h.prototype._cacheAsBitmap = !1,
                h.prototype._cacheData = !1;
            var l = function t() {
                (function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                })(this, t),
                this.textureCacheId = null,
                    this.originalRenderWebGL = null,
                    this.originalRenderCanvas = null,
                    this.originalCalculateBounds = null,
                    this.originalGetLocalBounds = null,
                    this.originalUpdateTransform = null,
                    this.originalHitTest = null,
                    this.originalDestroy = null,
                    this.originalMask = null,
                    this.originalFilterArea = null,
                    this.sprite = null
            };
            Object.defineProperties(h.prototype, {
                    cacheAsBitmap: {
                        get: function() {
                            return this._cacheAsBitmap
                        },
                        set: function(t) {
                            if (this._cacheAsBitmap !== t) {
                                var e = void 0;
                                (this._cacheAsBitmap = t) ? (this._cacheData || (this._cacheData = new l),
                                    (e = this._cacheData).originalRenderWebGL = this.renderWebGL,
                                    e.originalRenderCanvas = this.renderCanvas,
                                    e.originalUpdateTransform = this.updateTransform,
                                    e.originalCalculateBounds = this._calculateBounds,
                                    e.originalGetLocalBounds = this.getLocalBounds,
                                    e.originalDestroy = this.destroy,
                                    e.originalContainsPoint = this.containsPoint,
                                    e.originalMask = this._mask,
                                    e.originalFilterArea = this.filterArea,
                                    this.renderWebGL = this._renderCachedWebGL,
                                    this.renderCanvas = this._renderCachedCanvas,
                                    this.destroy = this._cacheAsBitmapDestroy) : ((e = this._cacheData).sprite && this._destroyCachedDisplayObject(),
                                    this.renderWebGL = e.originalRenderWebGL,
                                    this.renderCanvas = e.originalRenderCanvas,
                                    this._calculateBounds = e.originalCalculateBounds,
                                    this.getLocalBounds = e.originalGetLocalBounds,
                                    this.destroy = e.originalDestroy,
                                    this.updateTransform = e.originalUpdateTransform,
                                    this.containsPoint = e.originalContainsPoint,
                                    this._mask = e.originalMask,
                                    this.filterArea = e.originalFilterArea)
                            }
                        }
                    }
                }),
                h.prototype._renderCachedWebGL = function(t) {
                    !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t),
                        this._cacheData.sprite._transformID = -1,
                        this._cacheData.sprite.worldAlpha = this.worldAlpha,
                        this._cacheData.sprite._renderWebGL(t))
                },
                h.prototype._initCachedDisplayObject = function(t) {
                    if (!this._cacheData || !this._cacheData.sprite) {
                        var e = this.alpha;
                        this.alpha = 1,
                            t.currentRenderer.flush();
                        var r = this.getLocalBounds().clone();
                        if (this._filters) {
                            var i = this._filters[0].padding;
                            r.pad(i)
                        }
                        var h = t._activeRenderTarget,
                            l = t.filterManager.filterStack,
                            c = n.RenderTexture.create(0 | r.width, 0 | r.height),
                            d = "cacheAsBitmap_" + (0,
                                a.uid)();
                        this._cacheData.textureCacheId = d,
                            o.default.addToCache(c.baseTexture, d),
                            s.default.addToCache(c, d);
                        var f = u;
                        f.tx = -r.x,
                            f.ty = -r.y,
                            this.transform.worldTransform.identity(),
                            this.renderWebGL = this._cacheData.originalRenderWebGL,
                            t.render(this, c, !0, f, !0),
                            t.bindRenderTarget(h),
                            t.filterManager.filterStack = l,
                            this.renderWebGL = this._renderCachedWebGL,
                            this.updateTransform = this.displayObjectUpdateTransform,
                            this._mask = null,
                            this.filterArea = null;
                        var p = new n.Sprite(c);
                        p.transform.worldTransform = this.transform.worldTransform,
                            p.anchor.x = -r.x / r.width,
                            p.anchor.y = -r.y / r.height,
                            p.alpha = e,
                            p._bounds = this._bounds,
                            this._calculateBounds = this._calculateCachedBounds,
                            this.getLocalBounds = this._getCachedLocalBounds,
                            this._cacheData.sprite = p,
                            this.transform._parentID = -1,
                            this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent,
                                this.updateTransform(),
                                this.parent = null),
                            this.containsPoint = p.containsPoint.bind(p)
                    }
                },
                h.prototype._renderCachedCanvas = function(t) {
                    !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t),
                        this._cacheData.sprite.worldAlpha = this.worldAlpha,
                        this._cacheData.sprite.renderCanvas(t))
                },
                h.prototype._initCachedDisplayObjectCanvas = function(t) {
                    if (!this._cacheData || !this._cacheData.sprite) {
                        var e = this.getLocalBounds(),
                            r = this.alpha;
                        this.alpha = 1;
                        var i = t.context,
                            h = n.RenderTexture.create(0 | e.width, 0 | e.height),
                            l = "cacheAsBitmap_" + (0,
                                a.uid)();
                        this._cacheData.textureCacheId = l,
                            o.default.addToCache(h.baseTexture, l),
                            s.default.addToCache(h, l);
                        var c = u;
                        this.transform.localTransform.copy(c),
                            c.invert(),
                            c.tx -= e.x,
                            c.ty -= e.y,
                            this.renderCanvas = this._cacheData.originalRenderCanvas,
                            t.render(this, h, !0, c, !1),
                            t.context = i,
                            this.renderCanvas = this._renderCachedCanvas,
                            this._calculateBounds = this._calculateCachedBounds,
                            this._mask = null,
                            this.filterArea = null;
                        var d = new n.Sprite(h);
                        d.transform.worldTransform = this.transform.worldTransform,
                            d.anchor.x = -e.x / e.width,
                            d.anchor.y = -e.y / e.height,
                            d._bounds = this._bounds,
                            d.alpha = r,
                            this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent,
                                this.updateTransform(),
                                this.parent = null),
                            this.updateTransform = this.displayObjectUpdateTransform,
                            this._cacheData.sprite = d,
                            this.containsPoint = d.containsPoint.bind(d)
                    }
                },
                h.prototype._calculateCachedBounds = function() {
                    this._cacheData.sprite._calculateBounds()
                },
                h.prototype._getCachedLocalBounds = function() {
                    return this._cacheData.sprite.getLocalBounds()
                },
                h.prototype._destroyCachedDisplayObject = function() {
                    this._cacheData.sprite._texture.destroy(!0),
                        this._cacheData.sprite = null,
                        o.default.removeFromCache(this._cacheData.textureCacheId),
                        s.default.removeFromCache(this._cacheData.textureCacheId),
                        this._cacheData.textureCacheId = null
                },
                h.prototype._cacheAsBitmapDestroy = function(t) {
                    this.cacheAsBitmap = !1,
                        this.destroy(t)
                }
        }, {
            "../core": 63,
            "../core/textures/BaseTexture": 110,
            "../core/textures/Texture": 113,
            "../core/utils": 122
        }],
        137: [function(t, e, r) {
            "use strict";
            var i = function(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e.default = t,
                    e
            }(t("../core"));
            i.DisplayObject.prototype.name = null,
                i.Container.prototype.getChildByName = function(t) {
                    for (var e = 0; e < this.children.length; e++)
                        if (this.children[e].name === t)
                            return this.children[e];
                    return null
                }
        }, {
            "../core": 63
        }],
        138: [function(t, e, r) {
            "use strict";
            var i = function(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e.default = t,
                    e
            }(t("../core"));
            i.DisplayObject.prototype.getGlobalPosition = function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : new i.Point,
                    e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                return this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x,
                        t.y = this.position.y),
                    t
            }
        }, {
            "../core": 63
        }],
        139: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.BitmapText = r.TilingSpriteRenderer = r.TilingSprite = r.TextureTransform = r.AnimatedSprite = void 0;
            var n = t("./AnimatedSprite");
            Object.defineProperty(r, "AnimatedSprite", {
                enumerable: !0,
                get: function() {
                    return i(n).default
                }
            });
            var s = t("./TextureTransform");
            Object.defineProperty(r, "TextureTransform", {
                enumerable: !0,
                get: function() {
                    return i(s).default
                }
            });
            var o = t("./TilingSprite");
            Object.defineProperty(r, "TilingSprite", {
                enumerable: !0,
                get: function() {
                    return i(o).default
                }
            });
            var a = t("./webgl/TilingSpriteRenderer");
            Object.defineProperty(r, "TilingSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return i(a).default
                }
            });
            var h = t("./BitmapText");
            Object.defineProperty(r, "BitmapText", {
                    enumerable: !0,
                    get: function() {
                        return i(h).default
                    }
                }),
                t("./cacheAsBitmap"),
                t("./getChildByName"),
                t("./getGlobalPosition")
        }, {
            "./AnimatedSprite": 132,
            "./BitmapText": 133,
            "./TextureTransform": 134,
            "./TilingSprite": 135,
            "./cacheAsBitmap": 136,
            "./getChildByName": 137,
            "./getGlobalPosition": 138,
            "./webgl/TilingSpriteRenderer": 140
        }],
        140: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../../core")),
                n = t("../../core/const"),
                s = (t("path"),
                    new i.Matrix),
                o = function(t) {
                    function e(r) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var i = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r));
                        return i.shader = null,
                            i.simpleShader = null,
                            i.quad = null,
                            i
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.onContextChange = function() {
                            var t = this.renderer.gl;
                            this.shader = new i.Shader(t, "attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTransform;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n", "varying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec4 uColor;\r\nuniform mat3 uMapCoord;\r\nuniform vec4 uClampFrame;\r\nuniform vec2 uClampOffset;\r\n\r\nvoid main(void)\r\n{\r\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\r\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\r\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\r\n\r\n    vec4 sample = texture2D(uSampler, coord);\r\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\r\n\r\n    gl_FragColor = sample * color ;\r\n}\r\n"),
                                this.simpleShader = new i.Shader(t, "attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTransform;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n", "varying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec4 uColor;\r\n\r\nvoid main(void)\r\n{\r\n    vec4 sample = texture2D(uSampler, vTextureCoord);\r\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\r\n    gl_FragColor = sample * color;\r\n}\r\n"),
                                this.renderer.bindVao(null),
                                this.quad = new i.Quad(t, this.renderer.state.attribState),
                                this.quad.initVao(this.shader)
                        },
                        e.prototype.render = function(t) {
                            var e = this.renderer,
                                r = this.quad;
                            e.bindVao(r.vao);
                            var o = r.vertices;
                            o[0] = o[6] = t._width * -t.anchor.x,
                                o[1] = o[3] = t._height * -t.anchor.y,
                                o[2] = o[4] = t._width * (1 - t.anchor.x),
                                o[5] = o[7] = t._height * (1 - t.anchor.y),
                                t.uvRespectAnchor && ((o = r.uvs)[0] = o[6] = -t.anchor.x,
                                    o[1] = o[3] = -t.anchor.y,
                                    o[2] = o[4] = 1 - t.anchor.x,
                                    o[5] = o[7] = 1 - t.anchor.y),
                                r.upload();
                            var a = t._texture,
                                h = a.baseTexture,
                                u = t.tileTransform.localTransform,
                                l = t.uvTransform,
                                c = h.isPowerOfTwo && a.frame.width === h.width && a.frame.height === h.height;
                            c && (h._glTextures[e.CONTEXT_UID] ? c = h.wrapMode !== n.WRAP_MODES.CLAMP : h.wrapMode === n.WRAP_MODES.CLAMP && (h.wrapMode = n.WRAP_MODES.REPEAT));
                            var d = c ? this.simpleShader : this.shader;
                            e.bindShader(d);
                            var f = a.width,
                                p = a.height,
                                g = t._width,
                                v = t._height;
                            s.set(u.a * f / g, u.b * f / v, u.c * p / g, u.d * p / v, u.tx / g, u.ty / v),
                                s.invert(),
                                c ? s.prepend(l.mapCoord) : (d.uniforms.uMapCoord = l.mapCoord.toArray(!0),
                                    d.uniforms.uClampFrame = l.uClampFrame,
                                    d.uniforms.uClampOffset = l.uClampOffset),
                                d.uniforms.uTransform = s.toArray(!0),
                                d.uniforms.uColor = i.utils.premultiplyTintToRgba(t.tint, t.worldAlpha, d.uniforms.uColor, h.premultipliedAlpha),
                                d.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0),
                                d.uniforms.uSampler = e.bindTexture(a),
                                e.setBlendMode(i.utils.correctBlendMode(t.blendMode, h.premultipliedAlpha)),
                                r.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)
                        },
                        e
                }(i.ObjectRenderer);
            r.default = o,
                i.WebGLRenderer.registerPlugin("tilingSprite", o)
        }, {
            "../../core": 63,
            "../../core/const": 44,
            path: 10
        }],
        141: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                s = function() {
                    function t() {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this.global = new n.Point,
                            this.target = null,
                            this.originalEvent = null,
                            this.identifier = null,
                            this.isPrimary = !1,
                            this.button = 0,
                            this.buttons = 0,
                            this.width = 0,
                            this.height = 0,
                            this.tiltX = 0,
                            this.tiltY = 0,
                            this.pointerType = null,
                            this.pressure = 0,
                            this.rotationAngle = 0,
                            this.twist = 0,
                            this.tangentialPressure = 0
                    }
                    return t.prototype.getLocalPosition = function(t, e, r) {
                            return t.worldTransform.applyInverse(r || this.global, e)
                        },
                        t.prototype._copyEvent = function(t) {
                            t.isPrimary && (this.isPrimary = !0),
                                this.button = t.button,
                                this.buttons = t.buttons,
                                this.width = t.width,
                                this.height = t.height,
                                this.tiltX = t.tiltX,
                                this.tiltY = t.tiltY,
                                this.pointerType = t.pointerType,
                                this.pressure = t.pressure,
                                this.rotationAngle = t.rotationAngle,
                                this.twist = t.twist || 0,
                                this.tangentialPressure = t.tangentialPressure || 0
                        },
                        t.prototype._reset = function() {
                            this.isPrimary = !1
                        },
                        i(t, [{
                            key: "pointerId",
                            get: function() {
                                return this.identifier
                            }
                        }]),
                        t
                }();
            r.default = s
        }, {
            "../core": 63
        }],
        142: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                function t() {
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError("Cannot call a class as a function")
                    })(this, t),
                    this.stopped = !1,
                        this.target = null,
                        this.currentTarget = null,
                        this.type = null,
                        this.data = null
                }
                return t.prototype.stopPropagation = function() {
                        this.stopped = !0
                    },
                    t.prototype._reset = function() {
                        this.stopped = !1,
                            this.currentTarget = null,
                            this.target = null
                    },
                    t
            }();
            r.default = i
        }, {}],
        143: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } :
                function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                s = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("../core")),
                o = i(t("./InteractionData")),
                a = i(t("./InteractionEvent")),
                h = i(t("./InteractionTrackingData")),
                u = i(t("eventemitter3")),
                l = i(t("./interactiveTarget"));
            s.utils.mixins.delayMixin(s.DisplayObject.prototype, l.default);
            var c = "MOUSE",
                d = {
                    target: null,
                    data: {
                        global: null
                    }
                },
                f = function(t) {
                    function e(r, i) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var n = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this));
                        return i = i || {},
                            n.renderer = r,
                            n.autoPreventDefault = void 0 === i.autoPreventDefault || i.autoPreventDefault,
                            n.interactionFrequency = i.interactionFrequency || 10,
                            n.mouse = new o.default,
                            n.mouse.identifier = c,
                            n.mouse.global.set(-999999),
                            n.activeInteractionData = {},
                            n.activeInteractionData[c] = n.mouse,
                            n.interactionDataPool = [],
                            n.eventData = new a.default,
                            n.interactionDOMElement = null,
                            n.moveWhenInside = !1,
                            n.eventsAdded = !1,
                            n.mouseOverRenderer = !1,
                            n.supportsTouchEvents = "ontouchstart" in window,
                            n.supportsPointerEvents = !!window.PointerEvent,
                            n.onPointerUp = n.onPointerUp.bind(n),
                            n.processPointerUp = n.processPointerUp.bind(n),
                            n.onPointerCancel = n.onPointerCancel.bind(n),
                            n.processPointerCancel = n.processPointerCancel.bind(n),
                            n.onPointerDown = n.onPointerDown.bind(n),
                            n.processPointerDown = n.processPointerDown.bind(n),
                            n.onPointerMove = n.onPointerMove.bind(n),
                            n.processPointerMove = n.processPointerMove.bind(n),
                            n.onPointerOut = n.onPointerOut.bind(n),
                            n.processPointerOverOut = n.processPointerOverOut.bind(n),
                            n.onPointerOver = n.onPointerOver.bind(n),
                            n.cursorStyles = {
                                default: "inherit",
                                pointer: "pointer"
                            },
                            n.currentCursorMode = null,
                            n.cursor = null,
                            n._tempPoint = new s.Point,
                            n.resolution = 1,
                            n.setTargetElement(n.renderer.view, n.renderer.resolution),
                            n
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.prototype.hitTest = function(t, e) {
                            return d.target = null,
                                d.data.global = t,
                                e || (e = this.renderer._lastObjectRendered),
                                this.processInteractive(d, e, null, !0),
                                d.target
                        },
                        e.prototype.setTargetElement = function(t) {
                            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
                            this.removeEvents(),
                                this.interactionDOMElement = t,
                                this.resolution = e,
                                this.addEvents()
                        },
                        e.prototype.addEvents = function() {
                            this.interactionDOMElement && (s.ticker.shared.add(this.update, this, s.UPDATE_PRIORITY.INTERACTION),
                                window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none",
                                    this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"),
                                this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0),
                                    this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0),
                                    this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0),
                                    this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0),
                                    window.addEventListener("pointercancel", this.onPointerCancel, !0),
                                    window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0),
                                    this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0),
                                    this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0),
                                    this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0),
                                    window.addEventListener("mouseup", this.onPointerUp, !0)),
                                this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0),
                                    this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0),
                                    this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0),
                                    this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)),
                                this.eventsAdded = !0)
                        },
                        e.prototype.removeEvents = function() {
                            this.interactionDOMElement && (s.ticker.shared.remove(this.update, this),
                                window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "",
                                    this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""),
                                this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0),
                                    this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0),
                                    this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0),
                                    this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0),
                                    window.removeEventListener("pointercancel", this.onPointerCancel, !0),
                                    window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0),
                                    this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0),
                                    this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0),
                                    this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0),
                                    window.removeEventListener("mouseup", this.onPointerUp, !0)),
                                this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0),
                                    this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0),
                                    this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0),
                                    this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)),
                                this.interactionDOMElement = null,
                                this.eventsAdded = !1)
                        },
                        e.prototype.update = function(t) {
                            if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0,
                                    this.interactionDOMElement)) {
                                if (this.didMove)
                                    return void(this.didMove = !1);
                                for (var e in this.cursor = null,
                                        this.activeInteractionData)
                                    if (this.activeInteractionData.hasOwnProperty(e)) {
                                        var r = this.activeInteractionData[e];
                                        if (r.originalEvent && "touch" !== r.pointerType) {
                                            var i = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
                                            this.processInteractive(i, this.renderer._lastObjectRendered, this.processPointerOverOut, !0)
                                        }
                                    }
                                this.setCursorMode(this.cursor)
                            }
                        },
                        e.prototype.setCursorMode = function(t) {
                            if (t = t || "default",
                                this.currentCursorMode !== t) {
                                this.currentCursorMode = t;
                                var e = this.cursorStyles[t];
                                if (e)
                                    switch (void 0 === e ? "undefined" : n(e)) {
                                        case "string":
                                            this.interactionDOMElement.style.cursor = e;
                                            break;
                                        case "function":
                                            e(t);
                                            break;
                                        case "object":
                                            Object.assign(this.interactionDOMElement.style, e)
                                    }
                                else
                                    "string" != typeof t || Object.prototype.hasOwnProperty.call(this.cursorStyles, t) || (this.interactionDOMElement.style.cursor = t)
                            }
                        },
                        e.prototype.dispatchEvent = function(t, e, r) {
                            r.stopped || (r.currentTarget = t,
                                r.type = e,
                                t.emit(e, r),
                                t[e] && t[e](r))
                        },
                        e.prototype.mapPositionToPoint = function(t, e, r) {
                            var i;
                            i = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0
                            };
                            var n = navigator.isCocoonJS ? this.resolution : 1 / this.resolution;
                            t.x = (e - i.left) * (this.interactionDOMElement.width / i.width) * n,
                                t.y = (r - i.top) * (this.interactionDOMElement.height / i.height) * n
                        },
                        e.prototype.processInteractive = function(t, e, r, i, n) {
                            if (!e || !e.visible)
                                return !1;
                            var s = t.data.global,
                                o = !1,
                                a = n = e.interactive || n;
                            if (e.hitArea ? a = !1 : i && e._mask && (e._mask.containsPoint(s) || (i = !1)),
                                e.interactiveChildren && e.children)
                                for (var h = e.children, u = h.length - 1; 0 <= u; u--) {
                                    var l = h[u],
                                        c = this.processInteractive(t, l, r, i, a);
                                    if (c) {
                                        if (!l.parent)
                                            continue;
                                        a = !1,
                                            c && (t.target && (i = !1),
                                                o = !0)
                                    }
                                }
                            return n && (i && !t.target && (e.hitArea ? (e.worldTransform.applyInverse(s, this._tempPoint),
                                        e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) && (o = !0)) : e.containsPoint && e.containsPoint(s) && (o = !0)),
                                    e.interactive && (o && !t.target && (t.target = e),
                                        r && r(t, e, !!o))),
                                o
                        },
                        e.prototype.onPointerDown = function(t) {
                            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                                var e = this.normalizeToPointerData(t);
                                this.autoPreventDefault && e[0].isNormalized && t.preventDefault();
                                for (var r = e.length, i = 0; i < r; i++) {
                                    var n = e[i],
                                        s = this.getInteractionDataForPointerId(n),
                                        o = this.configureInteractionEventForDOMEvent(this.eventData, n, s);
                                    if (o.data.originalEvent = t,
                                        this.processInteractive(o, this.renderer._lastObjectRendered, this.processPointerDown, !0),
                                        this.emit("pointerdown", o),
                                        "touch" === n.pointerType)
                                        this.emit("touchstart", o);
                                    else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
                                        var a = 2 === n.button;
                                        this.emit(a ? "rightdown" : "mousedown", this.eventData)
                                    }
                                }
                            }
                        },
                        e.prototype.processPointerDown = function(t, e, r) {
                            var i = t.data,
                                n = t.data.identifier;
                            if (r)
                                if (e.trackedPointers[n] || (e.trackedPointers[n] = new h.default(n)),
                                    this.dispatchEvent(e, "pointerdown", t),
                                    "touch" === i.pointerType)
                                    this.dispatchEvent(e, "touchstart", t);
                                else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                                var s = 2 === i.button;
                                s ? e.trackedPointers[n].rightDown = !0 : e.trackedPointers[n].leftDown = !0,
                                    this.dispatchEvent(e, s ? "rightdown" : "mousedown", t)
                            }
                        },
                        e.prototype.onPointerComplete = function(t, e, r) {
                            for (var i = this.normalizeToPointerData(t), n = i.length, s = t.target !== this.interactionDOMElement ? "outside" : "", o = 0; o < n; o++) {
                                var a = i[o],
                                    h = this.getInteractionDataForPointerId(a),
                                    u = this.configureInteractionEventForDOMEvent(this.eventData, a, h);
                                if (u.data.originalEvent = t,
                                    this.processInteractive(u, this.renderer._lastObjectRendered, r, e || !s),
                                    this.emit(e ? "pointercancel" : "pointerup" + s, u),
                                    "mouse" === a.pointerType || "pen" === a.pointerType) {
                                    var l = 2 === a.button;
                                    this.emit(l ? "rightup" + s : "mouseup" + s, u)
                                } else
                                    "touch" === a.pointerType && (this.emit(e ? "touchcancel" : "touchend" + s, u),
                                        this.releaseInteractionDataForPointerId(a.pointerId, h))
                            }
                        },
                        e.prototype.onPointerCancel = function(t) {
                            this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel)
                        },
                        e.prototype.processPointerCancel = function(t, e) {
                            var r = t.data,
                                i = t.data.identifier;
                            void 0 !== e.trackedPointers[i] && (delete e.trackedPointers[i],
                                this.dispatchEvent(e, "pointercancel", t),
                                "touch" === r.pointerType && this.dispatchEvent(e, "touchcancel", t))
                        },
                        e.prototype.onPointerUp = function(t) {
                            this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp)
                        },
                        e.prototype.processPointerUp = function(t, e, r) {
                            var i = t.data,
                                n = t.data.identifier,
                                s = e.trackedPointers[n],
                                o = "touch" === i.pointerType;
                            if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                                var a = 2 === i.button,
                                    u = h.default.FLAGS,
                                    l = a ? u.RIGHT_DOWN : u.LEFT_DOWN,
                                    c = void 0 !== s && s.flags & l;
                                r ? (this.dispatchEvent(e, a ? "rightup" : "mouseup", t),
                                        c && this.dispatchEvent(e, a ? "rightclick" : "click", t)) : c && this.dispatchEvent(e, a ? "rightupoutside" : "mouseupoutside", t),
                                    s && (a ? s.rightDown = !1 : s.leftDown = !1)
                            }
                            r ? (this.dispatchEvent(e, "pointerup", t),
                                    o && this.dispatchEvent(e, "touchend", t),
                                    s && (this.dispatchEvent(e, "pointertap", t),
                                        o && (this.dispatchEvent(e, "tap", t),
                                            s.over = !1))) : s && (this.dispatchEvent(e, "pointerupoutside", t),
                                    o && this.dispatchEvent(e, "touchendoutside", t)),
                                s && s.none && delete e.trackedPointers[n]
                        },
                        e.prototype.onPointerMove = function(t) {
                            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                                var e = this.normalizeToPointerData(t);
                                "mouse" === e[0].pointerType && (this.didMove = !0,
                                    this.cursor = null);
                                for (var r = e.length, i = 0; i < r; i++) {
                                    var n = e[i],
                                        s = this.getInteractionDataForPointerId(n),
                                        o = this.configureInteractionEventForDOMEvent(this.eventData, n, s);
                                    o.data.originalEvent = t;
                                    var a = "touch" !== n.pointerType || this.moveWhenInside;
                                    this.processInteractive(o, this.renderer._lastObjectRendered, this.processPointerMove, a),
                                        this.emit("pointermove", o),
                                        "touch" === n.pointerType && this.emit("touchmove", o),
                                        "mouse" !== n.pointerType && "pen" !== n.pointerType || this.emit("mousemove", o)
                                }
                                "mouse" === e[0].pointerType && this.setCursorMode(this.cursor)
                            }
                        },
                        e.prototype.processPointerMove = function(t, e, r) {
                            var i = t.data,
                                n = "touch" === i.pointerType,
                                s = "mouse" === i.pointerType || "pen" === i.pointerType;
                            s && this.processPointerOverOut(t, e, r),
                                this.moveWhenInside && !r || (this.dispatchEvent(e, "pointermove", t),
                                    n && this.dispatchEvent(e, "touchmove", t),
                                    s && this.dispatchEvent(e, "mousemove", t))
                        },
                        e.prototype.onPointerOut = function(t) {
                            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                                var e = this.normalizeToPointerData(t)[0];
                                "mouse" === e.pointerType && (this.mouseOverRenderer = !1,
                                    this.setCursorMode(null));
                                var r = this.getInteractionDataForPointerId(e),
                                    i = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
                                i.data.originalEvent = e,
                                    this.processInteractive(i, this.renderer._lastObjectRendered, this.processPointerOverOut, !1),
                                    this.emit("pointerout", i),
                                    "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", i) : this.releaseInteractionDataForPointerId(r.identifier)
                            }
                        },
                        e.prototype.processPointerOverOut = function(t, e, r) {
                            var i = t.data,
                                n = t.data.identifier,
                                s = "mouse" === i.pointerType || "pen" === i.pointerType,
                                o = e.trackedPointers[n];
                            r && !o && (o = e.trackedPointers[n] = new h.default(n)),
                                void 0 !== o && (r && this.mouseOverRenderer ? (o.over || (o.over = !0,
                                        this.dispatchEvent(e, "pointerover", t),
                                        s && this.dispatchEvent(e, "mouseover", t)),
                                    s && null === this.cursor && (this.cursor = e.cursor)) : o.over && (o.over = !1,
                                    this.dispatchEvent(e, "pointerout", this.eventData),
                                    s && this.dispatchEvent(e, "mouseout", t),
                                    o.none && delete e.trackedPointers[n]))
                        },
                        e.prototype.onPointerOver = function(t) {
                            var e = this.normalizeToPointerData(t)[0],
                                r = this.getInteractionDataForPointerId(e),
                                i = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
                            "mouse" === (i.data.originalEvent = e).pointerType && (this.mouseOverRenderer = !0),
                                this.emit("pointerover", i),
                                "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mouseover", i)
                        },
                        e.prototype.getInteractionDataForPointerId = function(t) {
                            var e = t.pointerId,
                                r = void 0;
                            return e === c || "mouse" === t.pointerType ? r = this.mouse : this.activeInteractionData[e] ? r = this.activeInteractionData[e] : ((r = this.interactionDataPool.pop() || new o.default).identifier = e,
                                    this.activeInteractionData[e] = r),
                                r._copyEvent(t),
                                r
                        },
                        e.prototype.releaseInteractionDataForPointerId = function(t) {
                            var e = this.activeInteractionData[t];
                            e && (delete this.activeInteractionData[t],
                                e._reset(),
                                this.interactionDataPool.push(e))
                        },
                        e.prototype.configureInteractionEventForDOMEvent = function(t, e, r) {
                            return t.data = r,
                                this.mapPositionToPoint(r.global, e.clientX, e.clientY),
                                navigator.isCocoonJS && "touch" === e.pointerType && (r.global.x = r.global.x / this.resolution,
                                    r.global.y = r.global.y / this.resolution),
                                "touch" === e.pointerType && (e.globalX = r.global.x,
                                    e.globalY = r.global.y),
                                r.originalEvent = e,
                                t._reset(),
                                t
                        },
                        e.prototype.normalizeToPointerData = function(t) {
                            var e = [];
                            if (this.supportsTouchEvents && t instanceof TouchEvent)
                                for (var r = 0, i = t.changedTouches.length; r < i; r++) {
                                    var n = t.changedTouches[r];
                                    void 0 === n.button && (n.button = t.touches.length ? 1 : 0),
                                        void 0 === n.buttons && (n.buttons = t.touches.length ? 1 : 0),
                                        void 0 === n.isPrimary && (n.isPrimary = 1 === t.touches.length && "touchstart" === t.type),
                                        void 0 === n.width && (n.width = n.radiusX || 1),
                                        void 0 === n.height && (n.height = n.radiusY || 1),
                                        void 0 === n.tiltX && (n.tiltX = 0),
                                        void 0 === n.tiltY && (n.tiltY = 0),
                                        void 0 === n.pointerType && (n.pointerType = "touch"),
                                        void 0 === n.pointerId && (n.pointerId = n.identifier || 0),
                                        void 0 === n.pressure && (n.pressure = n.force || .5),
                                        n.twist = 0,
                                        void(n.tangentialPressure = 0) === n.layerX && (n.layerX = n.offsetX = n.clientX),
                                        void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY),
                                        n.isNormalized = !0,
                                        e.push(n)
                                }
                            else
                                !(t instanceof MouseEvent) || this.supportsPointerEvents && t instanceof window.PointerEvent || (void 0 === t.isPrimary && (t.isPrimary = !0),
                                    void 0 === t.width && (t.width = 1),
                                    void 0 === t.height && (t.height = 1),
                                    void 0 === t.tiltX && (t.tiltX = 0),
                                    void 0 === t.tiltY && (t.tiltY = 0),
                                    void 0 === t.pointerType && (t.pointerType = "mouse"),
                                    void 0 === t.pointerId && (t.pointerId = c),
                                    void 0 === t.pressure && (t.pressure = .5),
                                    t.twist = 0,
                                    t.tangentialPressure = 0,
                                    t.isNormalized = !0),
                                e.push(t);
                            return e
                        },
                        e.prototype.destroy = function() {
                            this.removeEvents(),
                                this.removeAllListeners(),
                                this.renderer = null,
                                this.mouse = null,
                                this.eventData = null,
                                this.interactionDOMElement = null,
                                this.onPointerDown = null,
                                this.processPointerDown = null,
                                this.onPointerUp = null,
                                this.processPointerUp = null,
                                this.onPointerCancel = null,
                                this.processPointerCancel = null,
                                this.onPointerMove = null,
                                this.processPointerMove = null,
                                this.onPointerOut = null,
                                this.processPointerOverOut = null,
                                this.onPointerOver = null,
                                this._tempPoint = null
                        },
                        e
                }(u.default);
            r.default = f,
                s.WebGLRenderer.registerPlugin("interaction", f),
                s.CanvasRenderer.registerPlugin("interaction", f)
        }, {
            "../core": 63,
            "./InteractionData": 141,
            "./InteractionEvent": 142,
            "./InteractionTrackingData": 144,
            "./interactiveTarget": 146,
            eventemitter3: 5
        }],
        144: [function(t, e, r) {
            "use strict";
            r.__esModule = !0;
            var i = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) {
                        return r && t(e.prototype, r),
                            i && t(e, i),
                            e
                    }
                }(),
                n = function() {
                    function t(e) {
                        (function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        })(this, t),
                        this._pointerId = e,
                            this._flags = t.FLAGS.NONE
                    }
                    return t.prototype._doSet = function(t, e) {
                            this._flags = e ? this._flags | t : this._flags & ~t
                        },
                        i(t, [{
                            key: "pointerId",
                            get: function() {
                                return this._pointerId
                            }
                        }, {
                            key: "flags",
                            get: function() {
                                return this._flags
                            },
                            set: function(t) {
                                this._flags = t
                            }
                        }, {
                            key: "none",
                            get: function() {
                                return this._flags === this.constructor.FLAGS.NONE
                            }
                        }, {
                            key: "over",
                            get: function() {
                                return 0 != (this._flags & this.constructor.FLAGS.OVER)
                            },
                            set: function(t) {
                                this._doSet(this.constructor.FLAGS.OVER, t)
                            }
                        }, {
                            key: "rightDown",
                            get: function() {
                                return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN)
                            },
                            set: function(t) {
                                this._doSet(this.constructor.FLAGS.RIGHT_DOWN, t)
                            }
                        }, {
                            key: "leftDown",
                            get: function() {
                                return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN)
                            },
                            set: function(t) {
                                this._doSet(this.constructor.FLAGS.LEFT_DOWN, t)
                            }
                        }]),
                        t
                }();
            (r.default = n).FLAGS = Object.freeze({
                NONE: 0,
                OVER: 1,
                LEFT_DOWN: 2,
                RIGHT_DOWN: 4
            })
        }, {}],
        145: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = t("./InteractionData");
            Object.defineProperty(r, "InteractionData", {
                enumerable: !0,
                get: function() {
                    return i(n).default
                }
            });
            var s = t("./InteractionManager");
            Object.defineProperty(r, "InteractionManager", {
                enumerable: !0,
                get: function() {
                    return i(s).default
                }
            });
            var o = t("./interactiveTarget");
            Object.defineProperty(r, "interactiveTarget", {
                enumerable: !0,
                get: function() {
                    return i(o).default
                }
            })
        }, {
            "./InteractionData": 141,
            "./InteractionManager": 143,
            "./interactiveTarget": 146
        }],
        146: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = {
                    interactive: !1,
                    interactiveChildren: !0,
                    hitArea: null,
                    get buttonMode() {
                        return "pointer" === this.cursor
                    },
                    set buttonMode(t) {
                        t ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null)
                    },
                    cursor: null,
                    get trackedPointers() {
                        return void 0 === this._trackedPointers && (this._trackedPointers = {}),
                            this._trackedPointers
                    },
                    _trackedPointers: void 0
                }
        }, {}],
        147: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                t.bitmapFont = a.BitmapText.registerFont(t.data, e)
            }
            r.__esModule = !0,
                r.parse = i,
                r.default = function() {
                    return function(t, e) {
                        if (t.data && t.type === o.Resource.TYPE.XML)
                            if (0 !== t.data.getElementsByTagName("page").length && 0 !== t.data.getElementsByTagName("info").length && null !== t.data.getElementsByTagName("info")[0].getAttribute("face")) {
                                var r = t.isDataUrl ? "" : n.dirname(t.url);
                                t.isDataUrl && ("." === r && (r = ""),
                                        this.baseUrl && r && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (r += "/"),
                                            r = r.replace(this.baseUrl, ""))),
                                    r && "/" !== r.charAt(r.length - 1) && (r += "/");
                                var a = r + t.data.getElementsByTagName("page")[0].getAttribute("file");
                                if (s.utils.TextureCache[a])
                                    i(t, s.utils.TextureCache[a]),
                                    e();
                                else {
                                    var h = {
                                        crossOrigin: t.crossOrigin,
                                        loadType: o.Resource.LOAD_TYPE.IMAGE,
                                        metadata: t.metadata.imageMetadata,
                                        parentResource: t
                                    };
                                    this.add(t.name + "_image", a, h, function(r) {
                                        i(t, r.texture),
                                            e()
                                    })
                                }
                            } else
                                e();
                        else
                            e()
                    }
                };
            var n = function(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }(t("path")),
                s = t("../core"),
                o = t("resource-loader"),
                a = t("../extras")
        }, {
            "../core": 63,
            "../extras": 139,
            path: 10,
            "resource-loader": 37
        }],
        148: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0,
                r.shared = r.Resource = r.textureParser = r.getResourcePath = r.spritesheetParser = r.parseBitmapFontData = r.bitmapFontParser = r.Loader = void 0;
            var n = t("./bitmapFontParser");
            Object.defineProperty(r, "bitmapFontParser", {
                    enumerable: !0,
                    get: function() {
                        return i(n).default
                    }
                }),
                Object.defineProperty(r, "parseBitmapFontData", {
                    enumerable: !0,
                    get: function() {
                        return n.parse
                    }
                });
            var s = t("./spritesheetParser");
            Object.defineProperty(r, "spritesheetParser", {
                    enumerable: !0,
                    get: function() {
                        return i(s).default
                    }
                }),
                Object.defineProperty(r, "getResourcePath", {
                    enumerable: !0,
                    get: function() {
                        return s.getResourcePath
                    }
                });
            var o = t("./textureParser");
            Object.defineProperty(r, "textureParser", {
                enumerable: !0,
                get: function() {
                    return i(o).default
                }
            });
            var a = t("resource-loader");
            Object.defineProperty(r, "Resource", {
                enumerable: !0,
                get: function() {
                    return a.Resource
                }
            });
            var h = i(t("../core/Application")),
                u = i(t("./loader"));
            r.Loader = u.default;
            var l = new u.default;
            l.destroy = function() {},
                r.shared = l;
            var c = h.default.prototype;
            c._loader = null,
                Object.defineProperty(c, "loader", {
                    get: function() {
                        if (!this._loader) {
                            var t = this._options.sharedLoader;
                            this._loader = t ? l : new u.default
                        }
                        return this._loader
                    }
                }),
                c._parentDestroy = c.destroy,
                c.destroy = function(t) {
                    this._loader && (this._loader.destroy(),
                            this._loader = null),
                        this._parentDestroy(t)
                }
        }, {
            "../core/Application": 41,
            "./bitmapFontParser": 147,
            "./loader": 149,
            "./spritesheetParser": 150,
            "./textureParser": 151,
            "resource-loader": 37
        }],
        149: [function(t, e, r) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r.__esModule = !0;
            var n = i(t("resource-loader")),
                s = t("resource-loader/lib/middlewares/parsing/blob"),
                o = i(t("eventemitter3")),
                a = i(t("./textureParser")),
                h = i(t("./spritesheetParser")),
                u = i(t("./bitmapFontParser")),
                l = function(t) {
                    function e(r, i) {
                        ! function(t, r) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this);
                        var n = function(t, e) {
                            if (!t)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !e || "object" != typeof e && "function" != typeof e ? t : e
                        }(this, t.call(this, r, i));
                        o.default.call(n);
                        for (var s = 0; s < e._pixiMiddleware.length; ++s)
                            n.use(e._pixiMiddleware[s]());
                        return n.onStart.add(function(t) {
                                return n.emit("start", t)
                            }),
                            n.onProgress.add(function(t, e) {
                                return n.emit("progress", t, e)
                            }),
                            n.onError.add(function(t, e, r) {
                                return n.emit("error", t, e, r)
                            }),
                            n.onLoad.add(function(t, e) {
                                return n.emit("load", t, e)
                            }),
                            n.onComplete.add(function(t, e) {
                                return n.emit("complete", t, e)
                            }),
                            n
                    }
                    return function(t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, t),
                        e.addPixiMiddleware = function(t) {
                            e._pixiMiddleware.push(t)
                        },
                        e.prototype.destroy = function() {
                            this.removeAllListeners(),
                                this.reset()
                        },
                        e
                }(n.default);
            for (var c in r.default = l,
                    o.default.prototype)
                l.prototype[c] = o.default.prototype[c];
            l._pixiMiddleware = [s.blobMiddlewareFactory, a.default, h.default, u.default];
            var d = n.default.Resource;
            d.setExtensionXhrType("fnt", d.XHR_RESPONSE_TYPE.DOCUMENT)
        }, {
            "./bitmapFontParser": 147,
            "./spritesheetParser": 150,
            "./textureParser": 151,
            eventemitter3: 5,
            "resource-loader": 37,
            "resource-loader/lib/middlewares/parsing/blob": 38
        }],
        150: [function(t, e, r) {
            "use strict";

            function i(t, e) {
                return t.isDataUrl ? t.data.meta.image : o.default.resolve(t.url.replace(e, ""), t.data.meta.image)
            }
            r.__esModule = !0,
                r.default = function() {
                    return function(t, e) {
                        var r = t.name + "_image";
                        if (t.data && t.type === s.Resource.TYPE.JSON && t.data.frames && !this.resources[r]) {
                            var n = {
                                    crossOrigin: t.crossOrigin,
                                    loadType: s.Resource.LOAD_TYPE.IMAGE,
                                    metadata: t.metadata.imageMetadata,
                                    parentResource: t
                                },
                                o = i(t, this.baseUrl);
                            this.add(r, o, n, function(r) {
                                var i = new a.Spritesheet(r.texture.baseTexture, t.data, t.url);
                                i.parse(function() {
                                    t.spritesheet = i,
                                        t.textures = i.textures,
                                        e()
                                })
                            })
                        } else
                            e()
                    }
                },
                r.getResourcePath = i;
            var n, s = t("resource-loader"),
                o = (n = t("url")) && n.__esModule ? n : {
                    default: n
                },
                a = t("../core")
        }, {
            "../core": 63,
            "resource-loader": 37,
            url: 39
        }],
        151: [function(t, e, r) {
            "use strict";
            r.__esModule = !0,
                r.default = function() {
                    return function(t, e) {
                        t.data && t.type === n.Resource.TYPE.IMAGE && (t.texture = s.default.fromLoader(t.data, t.url, t.name)),
                            e()
                    }
                };
            var i, n = t("resource-loader"),
                s = (i = t("../core/textures/Texture")) && i.__esModule ? i : {
                    default: i
                }
        }, {
            "../core/textures/Texture": 113,
            "resource-loader": 37
        }],
        152: [function(t, e, r) {
            "use strict";
            Math.sign || (Math.sign = function(t) {
                return 0 === (t = Number(t)) || isNaN(t) ? t : 0 < t ? 1 : -1
            })
        }, {}],
        153: [function(t, e, r) {
            "use strict";
            var i, n = (i = t("object-assign")) && i.__esModule ? i : {
                default: i
            };
            Object.assign || (Object.assign = n.default)
        }, {
            "object-assign": 8
        }],
        154: [function(t, e, r) {
            "use strict";
            t("./Object.assign"),
                t("./requestAnimationFrame"),
                t("./Math.sign"),
                window.ArrayBuffer || (window.ArrayBuffer = Array),
                window.Float32Array || (window.Float32Array = Array),
                window.Uint32Array || (window.Uint32Array = Array),
                window.Uint16Array || (window.Uint16Array = Array)
        }, {
            "./Math.sign": 152,
            "./Object.assign": 153,
            "./requestAnimationFrame": 155
        }],
        155: [function(t, e, r) {
            (function(t) {
                "use strict";
                if (Date.now && Date.prototype.getTime || (Date.now = function() {
                        return (new Date).getTime()
                    }), !t.performance || !t.performance.now) {
                    var e = Date.now();
                    t.performance || (t.performance = {}),
                        t.performance.now = function() {
                            return Date.now() - e
                        }
                }
                for (var r = Date.now(), i = ["ms", "moz", "webkit", "o"], n = 0; n < i.length && !t.requestAnimationFrame; ++n) {
                    var s = i[n];
                    t.requestAnimationFrame = t[s + "RequestAnimationFrame"],
                        t.cancelAnimationFrame = t[s + "CancelAnimationFrame"] || t[s + "CancelRequestAnimationFrame"]
                }
                t.requestAnimationFrame || (t.requestAnimationFrame = function(t) {
                        if ("function" != typeof t)
                            throw new TypeError(t + "is not a function");
                        var e = Date.now(),
                            i = 16 + r - e;
                        return i < 0 && (i = 0),
                            r = e,
                            setTimeout(function() {
                                r = Date.now(),
                                    t(performance.now())
                            }, i)
                    }),
                    t.cancelAnimationFrame || (t.cancelAnimationFrame = function(t) {
                        return clearTimeout(t)
                    })
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        156: [function(t, e, r) {
            (function(e) {
                "use strict";

                function i(t) {
                    if (t && t.__esModule)
                        return t;
                    var e = {};
                    if (null != t)
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e.default = t,
                        e
                }
                r.__esModule = !0,
                    r.loader = r.prepare = r.particles = r.mesh = r.loaders = r.interaction = r.filters = r.extras = r.extract = r.accessibility = void 0;
                var n = t("./polyfill");
                Object.keys(n).forEach(function(t) {
                    "default" !== t && "__esModule" !== t && Object.defineProperty(r, t, {
                        enumerable: !0,
                        get: function() {
                            return n[t]
                        }
                    })
                });
                var s = t("./core");
                Object.keys(s).forEach(function(t) {
                    "default" !== t && "__esModule" !== t && Object.defineProperty(r, t, {
                        enumerable: !0,
                        get: function() {
                            return s[t]
                        }
                    })
                });
                var o, a = (o = t("./deprecation")) && o.__esModule ? o : {
                        default: o
                    },
                    h = i(t("./accessibility")),
                    u = i(t("./extract")),
                    l = i(t("./extras")),
                    c = i(t("./filters")),
                    d = i(t("./interaction")),
                    f = i(t("./loaders")),
                    p = i(t("./mesh")),
                    g = i(t("./particles")),
                    v = i(t("./prepare"));
                s.utils.mixins.performMixins();
                var _ = f.shared || null;
                r.accessibility = h,
                    r.extract = u,
                    r.extras = l,
                    r.filters = c,
                    r.interaction = d,
                    r.loaders = f,
                    r.mesh = p,
                    r.particles = g,
                    r.prepare = v,
                    r.loader = _,
                    "function" == typeof a.default && (0,
                        a.default)(r),
                    e.PIXI = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./accessibility": 2,
            "./core": 63,
            "./deprecation": 128,
            "./extract": 130,
            "./extras": 139,
            "./filters": 2,
            "./interaction": 145,
            "./loaders": 148,
            "./mesh": 2,
            "./particles": 2,
            "./polyfill": 154,
            "./prepare": 2
        }]
    }, {}, [156])(156)
}),
function(t, e) {
    "use strict";
    var r = {},
        i = t.document,
        n = t.GreenSockGlobals = t.GreenSockGlobals || t,
        s = n[e];
    if (s)
        return "undefined" != typeof module && module.exports && (module.exports = s);
    var o, a, h, u, l, c, d, f = function(t) {
            var e, r = t.split("."),
                i = n;
            for (e = 0; e < r.length; e++)
                i[r[e]] = i = i[r[e]] || {};
            return i
        },
        p = f("com.greensock"),
        g = 1e-8,
        v = function(t) {
            var e, r = [],
                i = t.length;
            for (e = 0; e !== i; r.push(t[e++]))
            ;
            return r
        },
        _ = function() {},
        m = (c = Object.prototype.toString,
            d = c.call([]),
            function(t) {
                return null != t && (t instanceof Array || "object" == typeof t && !!t.push && c.call(t) === d)
            }
        ),
        y = {},
        x = function(i, s, o, a) {
            this.sc = y[i] ? y[i].sc : [],
                (y[i] = this).gsClass = null,
                this.func = o;
            var h = [];
            this.check = function(u) {
                    for (var l, c, d, p, g = s.length, v = g; - 1 < --g;)
                        (l = y[s[g]] || new x(s[g], [])).gsClass ? (h[g] = l.gsClass,
                            v--) : u && l.sc.push(this);
                    if (0 === v && o) {
                        if (d = (c = ("com.greensock." + i).split(".")).pop(),
                            p = f(c.join("."))[d] = this.gsClass = o.apply(o, h),
                            a)
                            if (n[d] = r[d] = p,
                                "undefined" != typeof module && module.exports)
                                if (i === e)
                                    for (g in module.exports = r[e] = p,
                                        r)
                                        p[g] = r[g];
                                else
                                    r[e] && (r[e][d] = p);
                        else
                            "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
                                return p
                            });
                        for (g = 0; g < this.sc.length; g++)
                            this.sc[g].check()
                    }
                },
                this.check(!0)
        },
        b = t._gsDefine = function(t, e, r, i) {
            return new x(t, e, r, i)
        },
        T = p._class = function(t, e, r) {
            return e = e || function() {},
                b(t, [], function() {
                    return e
                }, r),
                e
        };
    b.globals = n;
    var E = [0, 0, 1, 1],
        w = T("easing.Ease", function(t, e, r, i) {
            this._func = t,
                this._type = r || 0,
                this._power = i || 0,
                this._params = e ? E.concat(e) : E
        }, !0),
        S = w.map = {},
        O = w.register = function(t, e, r, i) {
            for (var n, s, o, a, h = e.split(","), u = h.length, l = (r || "easeIn,easeOut,easeInOut").split(","); - 1 < --u;)
                for (s = h[u],
                    n = i ? T("easing." + s, null, !0) : p.easing[s] || {},
                    o = l.length; - 1 < --o;)
                    a = l[o],
                    S[s + "." + a] = S[a + s] = n[a] = t.getRatio ? t : t[a] || new t
        };
    for ((h = w.prototype)._calcEnd = !1,
        h.getRatio = function(t) {
            if (this._func)
                return this._params[0] = t,
                    this._func.apply(null, this._params);
            var e = this._type,
                r = this._power,
                i = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
            return 1 === r ? i *= i : 2 === r ? i *= i * i : 3 === r ? i *= i * i * i : 4 === r && (i *= i * i * i * i),
                1 === e ? 1 - i : 2 === e ? i : t < .5 ? i / 2 : 1 - i / 2
        },
        a = (o = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; - 1 < --a;)
        h = o[a] + ",Power" + a,
        O(new w(null, null, 1, a), h, "easeOut", !0),
        O(new w(null, null, 2, a), h, "easeIn" + (0 === a ? ",easeNone" : "")),
        O(new w(null, null, 3, a), h, "easeInOut");
    S.linear = p.easing.Linear.easeIn,
        S.swing = p.easing.Quad.easeInOut;
    var P = T("events.EventDispatcher", function(t) {
        this._listeners = {},
            this._eventTarget = t || this
    });
    (h = P.prototype).addEventListener = function(t, e, r, i, n) {
            n = n || 0;
            var s, o, a = this._listeners[t],
                h = 0;
            for (this !== u || l || u.wake(),
                null == a && (this._listeners[t] = a = []),
                o = a.length; - 1 < --o;)
                (s = a[o]).c === e && s.s === r ? a.splice(o, 1) : 0 === h && s.pr < n && (h = o + 1);
            a.splice(h, 0, {
                c: e,
                s: r,
                up: i,
                pr: n
            })
        },
        h.removeEventListener = function(t, e) {
            var r, i = this._listeners[t];
            if (i)
                for (r = i.length; - 1 < --r;)
                    if (i[r].c === e)
                        return void i.splice(r, 1)
        },
        h.dispatchEvent = function(t) {
            var e, r, i, n = this._listeners[t];
            if (n)
                for (1 < (e = n.length) && (n = n.slice(0)),
                    r = this._eventTarget; - 1 < --e;)
                    (i = n[e]) && (i.up ? i.c.call(i.s || r, {
                        type: t,
                        target: r
                    }) : i.c.call(i.s || r))
        };
    var C = t.requestAnimationFrame,
        R = t.cancelAnimationFrame,
        M = Date.now || function() {
            return (new Date).getTime()
        },
        A = M();
    for (a = (o = ["ms", "moz", "webkit", "o"]).length; - 1 < --a && !C;)
        C = t[o[a] + "RequestAnimationFrame"],
        R = t[o[a] + "CancelAnimationFrame"] || t[o[a] + "CancelRequestAnimationFrame"];
    T("Ticker", function(t, e) {
            var r, n, s, o, a, h = this,
                c = M(),
                d = !(!1 === e || !C) && "auto",
                f = 500,
                p = 33,
                g = function(t) {
                    var e, i, u = M() - A;
                    f < u && (c += u - p),
                        A += u,
                        h.time = (A - c) / 1e3,
                        e = h.time - a,
                        (!r || 0 < e || !0 === t) && (h.frame++,
                            a += e + (o <= e ? .004 : o - e),
                            i = !0), !0 !== t && (s = n(g)),
                        i && h.dispatchEvent("tick")
                };
            P.call(h),
                h.time = h.frame = 0,
                h.tick = function() {
                    g(!0)
                },
                h.lagSmoothing = function(t, e) {
                    return arguments.length ? (f = t || 1e8,
                        void(p = Math.min(e, f, 0))) : f < 1e8
                },
                h.sleep = function() {
                    null != s && (d && R ? R(s) : clearTimeout(s),
                        n = _,
                        s = null,
                        h === u && (l = !1))
                },
                h.wake = function(t) {
                    null !== s ? h.sleep() : t ? c += -A + (A = M()) : 10 < h.frame && (A = M() - f + 5),
                        n = 0 === r ? _ : d && C ? C : function(t) {
                            return setTimeout(t, 1e3 * (a - h.time) + 1 | 0)
                        },
                        h === u && (l = !0),
                        g(2)
                },
                h.fps = function(t) {
                    return arguments.length ? (o = 1 / ((r = t) || 60),
                        a = this.time + o,
                        void h.wake()) : r
                },
                h.useRAF = function(t) {
                    return arguments.length ? (h.sleep(),
                        d = t,
                        void h.fps(r)) : d
                },
                h.fps(t),
                setTimeout(function() {
                    "auto" === d && h.frame < 5 && "hidden" !== (i || {}).visibilityState && h.useRAF(!1)
                }, 1500)
        }),
        (h = p.Ticker.prototype = new p.events.EventDispatcher).constructor = p.Ticker;
    var D = T("core.Animation", function(t, e) {
        if (this.vars = e = e || {},
            this._duration = this._totalDuration = t || 0,
            this._delay = Number(e.delay) || 0,
            this._timeScale = 1,
            this._active = !!e.immediateRender,
            this.data = e.data,
            this._reversed = !!e.reversed,
            J) {
            l || u.wake();
            var r = this.vars.useFrames ? Q : J;
            r.add(this, r._time),
                this.vars.paused && this.paused(!0)
        }
    });
    u = D.ticker = new p.Ticker,
        (h = D.prototype)._dirty = h._gc = h._initted = h._paused = !1,
        h._totalTime = h._time = 0,
        h._rawPrevTime = -1,
        h._next = h._last = h._onUpdate = h._timeline = h.timeline = null,
        h._paused = !1;
    var I = function() {
        l && 2e3 < M() - A && ("hidden" !== (i || {}).visibilityState || !u.lagSmoothing()) && u.wake();
        var t = setTimeout(I, 2e3);
        t.unref && t.unref()
    };
    I(),
        h.play = function(t, e) {
            return null != t && this.seek(t, e),
                this.reversed(!1).paused(!1)
        },
        h.pause = function(t, e) {
            return null != t && this.seek(t, e),
                this.paused(!0)
        },
        h.resume = function(t, e) {
            return null != t && this.seek(t, e),
                this.paused(!1)
        },
        h.seek = function(t, e) {
            return this.totalTime(Number(t), !1 !== e)
        },
        h.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
        },
        h.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
        },
        h.render = function(t, e, r) {},
        h.invalidate = function() {
            return this._time = this._totalTime = 0,
                this._initted = this._gc = !1,
                this._rawPrevTime = -1,
                (this._gc || !this.timeline) && this._enabled(!0),
                this
        },
        h.isActive = function() {
            var t, e = this._timeline,
                r = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= r && t < r + this.totalDuration() / this._timeScale - g
        },
        h._enabled = function(t, e) {
            return l || u.wake(),
                this._gc = !t,
                this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        },
        h._kill = function(t, e) {
            return this._enabled(!1, !1)
        },
        h.kill = function(t, e) {
            return this._kill(t, e),
                this
        },
        h._uncache = function(t) {
            for (var e = t ? this : this.timeline; e;)
                e._dirty = !0,
                e = e.timeline;
            return this
        },
        h._swapSelfInParams = function(t) {
            for (var e = t.length, r = t.concat(); - 1 < --e;)
                "{self}" === t[e] && (r[e] = this);
            return r
        },
        h._callback = function(t) {
            var e = this.vars,
                r = e[t],
                i = e[t + "Params"],
                n = e[t + "Scope"] || e.callbackScope || this;
            switch (i ? i.length : 0) {
                case 0:
                    r.call(n);
                    break;
                case 1:
                    r.call(n, i[0]);
                    break;
                case 2:
                    r.call(n, i[0], i[1]);
                    break;
                default:
                    r.apply(n, i)
            }
        },
        h.eventCallback = function(t, e, r, i) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length)
                    return n[t];
                null == e ? delete n[t] : (n[t] = e,
                        n[t + "Params"] = m(r) && -1 !== r.join("").indexOf("{self}") ? this._swapSelfInParams(r) : r,
                        n[t + "Scope"] = i),
                    "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        },
        h.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
                this._delay = t,
                this) : this._delay
        },
        h.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t,
                this._uncache(!0),
                this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
                this) : (this._dirty = !1,
                this._duration)
        },
        h.totalDuration = function(t) {
            return this._dirty = !1,
                arguments.length ? this.duration(t) : this._totalDuration
        },
        h.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
                this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        },
        h.totalTime = function(t, e, r) {
            if (l || u.wake(), !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (t < 0 && !r && (t += this.totalDuration()),
                    this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var i = this._totalDuration,
                        n = this._timeline;
                    if (i < t && !r && (t = i),
                        this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? i - t : t) / this._timeScale,
                        n._dirty || this._uncache(!1),
                        n._timeline)
                        for (; n._timeline;)
                            n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0),
                            n = n._timeline
                }
                this._gc && this._enabled(!0, !1),
                    (this._totalTime !== t || 0 === this._duration) && (B.length && tt(),
                        this.render(t, e, !1),
                        B.length && tt())
            }
            return this
        },
        h.progress = h.totalProgress = function(t, e) {
            var r = this.duration();
            return arguments.length ? this.totalTime(r * t, e) : r ? this._time / r : this.ratio
        },
        h.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t,
                    this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
                this) : this._startTime
        },
        h.endTime = function(t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        },
        h.timeScale = function(t) {
            if (!arguments.length)
                return this._timeScale;
            var e, r;
            for (t = t || g,
                this._timeline && this._timeline.smoothChildTiming && (r = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(),
                    this._startTime = r - (r - this._startTime) * this._timeScale / t),
                this._timeScale = t,
                r = this.timeline; r && r.timeline;)
                r._dirty = !0,
                r.totalDuration(),
                r = r.timeline;
            return this
        },
        h.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t,
                    this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
                this) : this._reversed
        },
        h.paused = function(t) {
            if (!arguments.length)
                return this._paused;
            var e, r, i = this._timeline;
            return t != this._paused && i && (l || t || u.wake(),
                    r = (e = i.rawTime()) - this._pauseTime, !t && i.smoothChildTiming && (this._startTime += r,
                        this._uncache(!1)),
                    this._pauseTime = t ? e : null,
                    this._paused = t,
                    this._active = this.isActive(), !t && 0 !== r && this._initted && this.duration() && (e = i.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale,
                        this.render(e, e === this._totalTime, !0))),
                this._gc && !t && this._enabled(!0, !1),
                this
        };
    var L = T("core.SimpleTimeline", function(t) {
        D.call(this, 0, t),
            this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    (h = L.prototype = new D).constructor = L,
        h.kill()._gc = !1,
        h._first = h._last = h._recent = null,
        h._sortChildren = !1,
        h.add = h.insert = function(t, e, r, i) {
            var n, s;
            if (t._startTime = Number(e || 0) + t._delay,
                t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
                t.timeline && t.timeline._remove(t, !0),
                t.timeline = t._timeline = this,
                t._gc && t._enabled(!0, !0),
                n = this._last,
                this._sortChildren)
                for (s = t._startTime; n && n._startTime > s;)
                    n = n._prev;
            return n ? (t._next = n._next,
                    n._next = t) : (t._next = this._first,
                    this._first = t),
                t._next ? t._next._prev = t : this._last = t,
                t._prev = n,
                this._recent = t,
                this._timeline && this._uncache(!0),
                this
        },
        h._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0),
                    t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
                    t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
                    t._next = t._prev = t.timeline = null,
                    t === this._recent && (this._recent = this._last),
                    this._timeline && this._uncache(!0)),
                this
        },
        h.render = function(t, e, r) {
            var i, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;)
                i = n._next,
                (n._active || t >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, r) : n.render((t - n._startTime) * n._timeScale, e, r)),
                n = i
        },
        h.rawTime = function() {
            return l || u.wake(),
                this._totalTime
        };
    var k = T("TweenLite", function(e, r, i) {
            if (D.call(this, r, i),
                this.render = k.prototype.render,
                null == e)
                throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : k.selector(e) || e;
            var n, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                h = this.vars.overwrite;
            if (this._overwrite = h = null == h ? Z[k.defaultOverwrite] : "number" == typeof h ? h >> 0 : Z[h],
                (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                for (this._targets = o = v(e),
                    this._propLookup = [],
                    this._siblings = [],
                    n = 0; n < o.length; n++)
                    (s = o[n]) ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(n--, 1),
                        this._targets = o = o.concat(v(s))) : (this._siblings[n] = et(s, this, !1),
                        1 === h && 1 < this._siblings[n].length && it(s, this, null, 1, this._siblings[n])) : "string" == typeof(s = o[n--] = k.selector(s)) && o.splice(n + 1, 1) : o.splice(n--, 1);
            else
                this._propLookup = {},
                this._siblings = et(e, this, !1),
                1 === h && 1 < this._siblings.length && it(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === r && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -g,
                this.render(Math.min(0, -this._delay)))
        }, !0),
        N = function(e) {
            return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        };
    (h = k.prototype = new D).constructor = k,
        h.kill()._gc = !1,
        h.ratio = 0,
        h._firstPT = h._targets = h._overwrittenProps = h._startAt = null,
        h._notifyPluginsOfEnabled = h._lazy = !1,
        k.version = "2.1.2",
        k.defaultEase = h._ease = new w(null, null, 1, 1),
        k.defaultOverwrite = "auto",
        k.ticker = u,
        k.autoSleep = 120,
        k.lagSmoothing = function(t, e) {
            u.lagSmoothing(t, e)
        },
        k.selector = t.$ || t.jQuery || function(e) {
            var r = t.$ || t.jQuery;
            return r ? (k.selector = r)(e) : (i || (i = t.document),
                i ? i.querySelectorAll ? i.querySelectorAll(e) : i.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
        };
    var B = [],
        U = {},
        F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        j = /[\+-]=-?[\.\d]/,
        G = function(t) {
            for (var e, r = this._firstPT; r;)
                e = r.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : r.c * t + r.s,
                r.m ? e = r.m.call(this._tween, e, this._target || r.t, this._tween) : e < 1e-6 && -1e-6 < e && !r.blob && (e = 0),
                r.f ? r.fp ? r.t[r.p](r.fp, e) : r.t[r.p](e) : r.t[r.p] = e,
                r = r._next
        },
        X = function(t) {
            return (1e3 * t | 0) / 1e3 + ""
        },
        V = function(t, e, r, i) {
            var n, s, o, a, h, u, l, c = [],
                d = 0,
                f = "",
                p = 0;
            for (c.start = t,
                c.end = e,
                t = c[0] = t + "",
                e = c[1] = e + "",
                r && (r(c),
                    t = c[0],
                    e = c[1]),
                c.length = 0,
                n = t.match(F) || [],
                s = e.match(F) || [],
                i && (i._next = null,
                    i.blob = 1,
                    c._firstPT = c._applyPT = i),
                h = s.length,
                a = 0; a < h; a++)
                l = s[a],
                f += (u = e.substr(d, e.indexOf(l, d) - d)) || !a ? u : ",",
                d += u.length,
                p ? p = (p + 1) % 5 : "rgba(" === u.substr(-5) && (p = 1),
                l === n[a] || n.length <= a ? f += l : (f && (c.push(f),
                        f = ""),
                    o = parseFloat(n[a]),
                    c.push(o),
                    c._firstPT = {
                        _next: c._firstPT,
                        t: c,
                        p: c.length - 1,
                        s: o,
                        c: ("=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * parseFloat(l.substr(2)) : parseFloat(l) - o) || 0,
                        f: 0,
                        m: p && p < 4 ? Math.round : X
                    }),
                d += l.length;
            return (f += e.substr(d)) && c.push(f),
                c.setRatio = G,
                j.test(e) && (c.end = null),
                c
        },
        W = function(t, e, r, i, n, s, o, a, h) {
            "function" == typeof i && (i = i(h || 0, t));
            var u = typeof t[e],
                l = "function" !== u ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                c = "get" !== r ? r : l ? o ? t[l](o) : t[l]() : t[e],
                d = "string" == typeof i && "=" === i.charAt(1),
                f = {
                    t: t,
                    p: e,
                    s: c,
                    f: "function" === u,
                    pg: 0,
                    n: n || e,
                    m: s ? "function" == typeof s ? s : Math.round : 0,
                    pr: 0,
                    c: d ? parseInt(i.charAt(0) + "1", 10) * parseFloat(i.substr(2)) : parseFloat(i) - c || 0
                };
            return ("number" != typeof c || "number" != typeof i && !d) && (o || isNaN(c) || !d && isNaN(i) || "boolean" == typeof c || "boolean" == typeof i ? (f.fp = o,
                    f = {
                        t: V(c, d ? parseFloat(f.s) + f.c + (f.s + "").replace(/[0-9\-\.]/g, "") : i, a || k.defaultStringFilter, f),
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: n || e,
                        pr: 0,
                        m: 0
                    }) : (f.s = parseFloat(c),
                    d || (f.c = parseFloat(i) - f.s || 0))),
                f.c ? ((f._next = this._firstPT) && (f._next._prev = f),
                    this._firstPT = f) : void 0
        },
        H = k._internals = {
            isArray: m,
            isSelector: N,
            lazyTweens: B,
            blobDif: V
        },
        Y = k._plugins = {},
        z = H.tweenLookup = {},
        K = 0,
        q = H.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1,
            id: 1,
            yoyoEase: 1,
            stagger: 1
        },
        Z = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            true: 1,
            false: 0
        },
        Q = D._rootFramesTimeline = new L,
        J = D._rootTimeline = new L,
        $ = 30,
        tt = H.lazyRender = function() {
            var t, e, r = B.length;
            for (U = {},
                t = 0; t < r; t++)
                (e = B[t]) && !1 !== e._lazy && (e.render(e._lazy[0], e._lazy[1], !0),
                    e._lazy = !1);
            B.length = 0
        };
    J._startTime = u.time,
        Q._startTime = u.frame,
        J._active = Q._active = !0,
        setTimeout(tt, 1),
        D._updateRoot = k.render = function() {
            var t, e, r;
            if (B.length && tt(),
                J.render((u.time - J._startTime) * J._timeScale, !1, !1),
                Q.render((u.frame - Q._startTime) * Q._timeScale, !1, !1),
                B.length && tt(),
                u.frame >= $) {
                for (r in $ = u.frame + (parseInt(k.autoSleep, 10) || 120),
                    z) {
                    for (t = (e = z[r].tweens).length; - 1 < --t;)
                        e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete z[r]
                }
                if ((!(r = J._first) || r._paused) && k.autoSleep && !Q._first && 1 === u._listeners.tick.length) {
                    for (; r && r._paused;)
                        r = r._next;
                    r || u.sleep()
                }
            }
        },
        u.addEventListener("tick", D._updateRoot);
    var et = function(t, e, r) {
            var i, n, s = t._gsTweenID;
            if (z[s || (t._gsTweenID = s = "t" + K++)] || (z[s] = {
                    target: t,
                    tweens: []
                }),
                e && ((i = z[s].tweens)[n = i.length] = e,
                    r))
                for (; - 1 < --n;)
                    i[n] === e && i.splice(n, 1);
            return z[s].tweens
        },
        rt = function(t, e, r, i) {
            var n, s, o = t.vars.onOverwrite;
            return o && (n = o(t, e, r, i)),
                (o = k.onOverwrite) && (s = o(t, e, r, i)), !1 !== n && !1 !== s
        },
        it = function(t, e, r, i, n) {
            var s, o, a, h;
            if (1 === i || 4 <= i) {
                for (h = n.length,
                    s = 0; s < h; s++)
                    if ((a = n[s]) !== e)
                        a._gc || a._kill(null, t, e) && (o = !0);
                    else if (5 === i)
                    break;
                return o
            }
            var u, l = e._startTime + g,
                c = [],
                d = 0,
                f = 0 === e._duration;
            for (s = n.length; - 1 < --s;)
                (a = n[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (u = u || nt(e, 0, f),
                    0 === nt(a, u, f) && (c[d++] = a)) : a._startTime <= l && a._startTime + a.totalDuration() / a._timeScale > l && ((f || !a._initted) && l - a._startTime <= 2e-8 || (c[d++] = a)));
            for (s = d; - 1 < --s;)
                if (h = (a = c[s])._firstPT,
                    2 === i && a._kill(r, t, e) && (o = !0),
                    2 !== i || !a._firstPT && a._initted && h) {
                    if (2 !== i && !rt(a, e))
                        continue;
                    a._enabled(!1, !1) && (o = !0)
                }
            return o
        },
        nt = function(t, e, r) {
            for (var i = t._timeline, n = i._timeScale, s = t._startTime; i._timeline;) {
                if (s += i._startTime,
                    n *= i._timeScale,
                    i._paused)
                    return -100;
                i = i._timeline
            }
            return e < (s /= n) ? s - e : r && s === e || !t._initted && s - e < 2e-8 ? g : (s += t.totalDuration() / t._timeScale / n) > e + g ? 0 : s - e - g
        };
    h._init = function() {
            var t, e, r, i, n, s, o = this.vars,
                a = this._overwrittenProps,
                h = this._duration,
                u = !!o.immediateRender,
                l = o.ease,
                c = this._startAt;
            if (o.startAt) {
                for (i in c && (c.render(-1, !0),
                        c.kill()),
                    n = {},
                    o.startAt)
                    n[i] = o.startAt[i];
                if (n.data = "isStart",
                    n.overwrite = !1,
                    n.immediateRender = !0,
                    n.lazy = u && !1 !== o.lazy,
                    n.startAt = n.delay = null,
                    n.onUpdate = o.onUpdate,
                    n.onUpdateParams = o.onUpdateParams,
                    n.onUpdateScope = o.onUpdateScope || o.callbackScope || this,
                    this._startAt = k.to(this.target || {}, 0, n),
                    u)
                    if (0 < this._time)
                        this._startAt = null;
                    else if (0 !== h)
                    return
            } else if (o.runBackwards && 0 !== h)
                if (c)
                    c.render(-1, !0),
                    c.kill(),
                    this._startAt = null;
                else {
                    for (i in 0 !== this._time && (u = !1),
                        r = {},
                        o)
                        q[i] && "autoCSS" !== i || (r[i] = o[i]);
                    if (r.overwrite = 0,
                        r.data = "isFromStart",
                        r.lazy = u && !1 !== o.lazy,
                        r.immediateRender = u,
                        this._startAt = k.to(this.target, 0, r),
                        u) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = l = l ? l instanceof w ? l : "function" == typeof l ? new w(l, o.easeParams) : S[l] || k.defaultEase : k.defaultEase,
                o.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, o.easeParams)),
                this._easeType = this._ease._type,
                this._easePower = this._ease._power,
                this._firstPT = null,
                this._targets)
                for (s = this._targets.length,
                    t = 0; t < s; t++)
                    this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
            else
                e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
            if (e && k._onPluginEvent("_onInitAllProps", this),
                a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
                o.runBackwards)
                for (r = this._firstPT; r;)
                    r.s += r.c,
                    r.c = -r.c,
                    r = r._next;
            this._onUpdate = o.onUpdate,
                this._initted = !0
        },
        h._initProps = function(e, r, i, n, s) {
            var o, a, h, u, l, c;
            if (null == e)
                return !1;
            for (o in U[e._gsTweenID] && tt(),
                this.vars.css || e.style && e !== t && e.nodeType && Y.css && !1 !== this.vars.autoCSS && function(t, e) {
                    var r, i = {};
                    for (r in t)
                        q[r] || r in e && "transform" !== r && "x" !== r && "y" !== r && "width" !== r && "height" !== r && "className" !== r && "border" !== r || !(!Y[r] || Y[r] && Y[r]._autoCSS) || (i[r] = t[r],
                            delete t[r]);
                    t.css = i
                }(this.vars, e),
                this.vars)
                if (c = this.vars[o],
                    q[o])
                    c && (c instanceof Array || c.push && m(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this));
                else if (Y[o] && (u = new Y[o])._onInitTween(e, this.vars[o], this, s)) {
                for (this._firstPT = l = {
                        _next: this._firstPT,
                        t: u,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: o,
                        pg: 1,
                        pr: u._priority,
                        m: 0
                    },
                    a = u._overwriteProps.length; - 1 < --a;)
                    r[u._overwriteProps[a]] = this._firstPT;
                (u._priority || u._onInitAllProps) && (h = !0),
                (u._onDisable || u._onEnable) && (this._notifyPluginsOfEnabled = !0),
                l._next && (l._next._prev = l)
            } else
                r[o] = W.call(this, e, o, "get", c, o, 0, null, this.vars.stringFilter, s);
            return n && this._kill(n, e) ? this._initProps(e, r, i, n, s) : 1 < this._overwrite && this._firstPT && 1 < i.length && it(e, this, r, this._overwrite, i) ? (this._kill(r, e),
                this._initProps(e, r, i, n, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (U[e._gsTweenID] = !0),
                h)
        },
        h.render = function(t, e, r) {
            var i, n, s, o, a = this,
                h = a._time,
                u = a._duration,
                l = a._rawPrevTime;
            if (u - g <= t && 0 <= t)
                a._totalTime = a._time = u,
                a.ratio = a._ease._calcEnd ? a._ease.getRatio(1) : 1,
                a._reversed || (i = !0,
                    n = "onComplete",
                    r = r || a._timeline.autoRemoveChildren),
                0 === u && (a._initted || !a.vars.lazy || r) && (a._startTime === a._timeline._duration && (t = 0),
                    (l < 0 || t <= 0 && -g <= t || l === g && "isPause" !== a.data) && l !== t && (r = !0,
                        g < l && (n = "onReverseComplete")),
                    a._rawPrevTime = o = !e || t || l === t ? t : g);
            else if (t < g)
                a._totalTime = a._time = 0,
                a.ratio = a._ease._calcEnd ? a._ease.getRatio(0) : 0,
                (0 !== h || 0 === u && 0 < l) && (n = "onReverseComplete",
                    i = a._reversed), -g < t ? t = 0 : t < 0 && (a._active = !1,
                    0 === u && (a._initted || !a.vars.lazy || r) && (0 <= l && (l !== g || "isPause" !== a.data) && (r = !0),
                        a._rawPrevTime = o = !e || t || l === t ? t : g)),
                (!a._initted || a._startAt && a._startAt.progress()) && (r = !0);
            else if (a._totalTime = a._time = t,
                a._easeType) {
                var c = t / u,
                    d = a._easeType,
                    f = a._easePower;
                (1 === d || 3 === d && .5 <= c) && (c = 1 - c),
                3 === d && (c *= 2),
                    1 === f ? c *= c : 2 === f ? c *= c * c : 3 === f ? c *= c * c * c : 4 === f && (c *= c * c * c * c),
                    a.ratio = 1 === d ? 1 - c : 2 === d ? c : t / u < .5 ? c / 2 : 1 - c / 2
            } else
                a.ratio = a._ease.getRatio(t / u);
            if (a._time !== h || r) {
                if (!a._initted) {
                    if (a._init(), !a._initted || a._gc)
                        return;
                    if (!r && a._firstPT && (!1 !== a.vars.lazy && a._duration || a.vars.lazy && !a._duration))
                        return a._time = a._totalTime = h,
                            a._rawPrevTime = l,
                            B.push(a),
                            void(a._lazy = [t, e]);
                    a._time && !i ? a.ratio = a._ease.getRatio(a._time / u) : i && a._ease._calcEnd && (a.ratio = a._ease.getRatio(0 === a._time ? 0 : 1))
                }
                for (!1 !== a._lazy && (a._lazy = !1),
                    a._active || !a._paused && a._time !== h && 0 <= t && (a._active = !0),
                    0 === h && (a._startAt && (0 <= t ? a._startAt.render(t, !0, r) : n || (n = "_dummyGS")),
                        a.vars.onStart && (0 !== a._time || 0 === u) && (e || a._callback("onStart"))),
                    s = a._firstPT; s;)
                    s.f ? s.t[s.p](s.c * a.ratio + s.s) : s.t[s.p] = s.c * a.ratio + s.s,
                    s = s._next;
                a._onUpdate && (t < 0 && a._startAt && -1e-4 !== t && a._startAt.render(t, !0, r),
                        e || (a._time !== h || i || r) && a._callback("onUpdate")),
                    n && (!a._gc || r) && (t < 0 && a._startAt && !a._onUpdate && -1e-4 !== t && a._startAt.render(t, !0, r),
                        i && (a._timeline.autoRemoveChildren && a._enabled(!1, !1),
                            a._active = !1), !e && a.vars[n] && a._callback(n),
                        0 === u && a._rawPrevTime === g && o !== g && (a._rawPrevTime = 0))
            }
        },
        h._kill = function(t, e, r) {
            if ("all" === t && (t = null),
                null == t && (null == e || e === this.target))
                return this._lazy = !1,
                    this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : k.selector(e) || e;
            var i, n, s, o, a, h, u, l, c, d = r && this._time && r._startTime === this._startTime && this._timeline === r._timeline,
                f = this._firstPT;
            if ((m(e) || N(e)) && "number" != typeof e[0])
                for (i = e.length; - 1 < --i;)
                    this._kill(t, e[i], r) && (h = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; - 1 < --i;)
                        if (e === this._targets[i]) {
                            a = this._propLookup[i] || {},
                                this._overwrittenProps = this._overwrittenProps || [],
                                n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target)
                        return !1;
                    a = this._propLookup,
                        n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    if (u = t || a,
                        l = t !== n && "all" !== n && t !== a && ("object" != typeof t || !t._tempKill),
                        r && (k.onOverwrite || this.vars.onOverwrite)) {
                        for (s in u)
                            a[s] && (c || (c = []),
                                c.push(s));
                        if ((c || !t) && !rt(this, r, e, c))
                            return !1
                    }
                    for (s in u)
                        (o = a[s]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s,
                                h = !0),
                            o.pg && o.t._kill(u) && (h = !0),
                            o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next),
                                o._next && (o._next._prev = o._prev),
                                o._next = o._prev = null),
                            delete a[s]),
                        l && (n[s] = 1);
                    !this._firstPT && this._initted && f && this._enabled(!1, !1)
                }
            }
            return h
        },
        h.invalidate = function() {
            this._notifyPluginsOfEnabled && k._onPluginEvent("_onDisable", this);
            var t = this._time;
            return this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
                this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
                this._propLookup = this._targets ? {} : [],
                D.prototype.invalidate.call(this),
                this.vars.immediateRender && (this._time = -g,
                    this.render(t, !1, !1 !== this.vars.lazy)),
                this
        },
        h._enabled = function(t, e) {
            if (l || u.wake(),
                t && this._gc) {
                var r, i = this._targets;
                if (i)
                    for (r = i.length; - 1 < --r;)
                        this._siblings[r] = et(i[r], this, !0);
                else
                    this._siblings = et(this.target, this, !0)
            }
            return D.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && k._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        },
        k.to = function(t, e, r) {
            return new k(t, e, r)
        },
        k.from = function(t, e, r) {
            return r.runBackwards = !0,
                r.immediateRender = 0 != r.immediateRender,
                new k(t, e, r)
        },
        k.fromTo = function(t, e, r, i) {
            return i.startAt = r,
                i.immediateRender = 0 != i.immediateRender && 0 != r.immediateRender,
                new k(t, e, i)
        },
        k.delayedCall = function(t, e, r, i, n) {
            return new k(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: r,
                callbackScope: i,
                onReverseComplete: e,
                onReverseCompleteParams: r,
                immediateRender: !1,
                lazy: !1,
                useFrames: n,
                overwrite: 0
            })
        },
        k.set = function(t, e) {
            return new k(t, 0, e)
        },
        k.getTweensOf = function(t, e) {
            if (null == t)
                return [];
            var r, i, n, s;
            if (t = "string" != typeof t ? t : k.selector(t) || t,
                (m(t) || N(t)) && "number" != typeof t[0]) {
                for (r = t.length,
                    i = []; - 1 < --r;)
                    i = i.concat(k.getTweensOf(t[r], e));
                for (r = i.length; - 1 < --r;)
                    for (s = i[r],
                        n = r; - 1 < --n;)
                        s === i[n] && i.splice(r, 1)
            } else if (t._gsTweenID)
                for (r = (i = et(t).concat()).length; - 1 < --r;)
                    (i[r]._gc || e && !i[r].isActive()) && i.splice(r, 1);
            return i || []
        },
        k.killTweensOf = k.killDelayedCallsTo = function(t, e, r) {
            "object" == typeof e && (r = e,
                e = !1);
            for (var i = k.getTweensOf(t, e), n = i.length; - 1 < --n;)
                i[n]._kill(r, t)
        };
    var st = T("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = e || 0,
            this._super = st.prototype
    }, !0);
    if (h = st.prototype,
        st.version = "1.19.0",
        st.API = 2,
        h._firstPT = null,
        h._addTween = W,
        h.setRatio = G,
        h._kill = function(t) {
            var e, r = this._overwriteProps,
                i = this._firstPT;
            if (null != t[this._propName])
                this._overwriteProps = [];
            else
                for (e = r.length; - 1 < --e;)
                    null != t[r[e]] && r.splice(e, 1);
            for (; i;)
                null != t[i.n] && (i._next && (i._next._prev = i._prev),
                    i._prev ? (i._prev._next = i._next,
                        i._prev = null) : this._firstPT === i && (this._firstPT = i._next)),
                i = i._next;
            return !1
        },
        h._mod = h._roundProps = function(t) {
            for (var e, r = this._firstPT; r;)
                (e = t[this._propName] || null != r.n && t[r.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === r.f ? r.t._applyPT.m = e : r.m = e),
                r = r._next
        },
        k._onPluginEvent = function(t, e) {
            var r, i, n, s, o, a = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; a;) {
                    for (o = a._next,
                        i = n; i && i.pr > a.pr;)
                        i = i._next;
                    (a._prev = i ? i._prev : s) ? a._prev._next = a: n = a,
                        (a._next = i) ? i._prev = a : s = a,
                        a = o
                }
                a = e._firstPT = n
            }
            for (; a;)
                a.pg && "function" == typeof a.t[t] && a.t[t]() && (r = !0),
                a = a._next;
            return r
        },
        st.activate = function(t) {
            for (var e = t.length; - 1 < --e;)
                t[e].API === st.API && (Y[(new t[e])._propName] = t[e]);
            return !0
        },
        b.plugin = function(t) {
            if (!(t && t.propName && t.init && t.API))
                throw "illegal plugin definition.";
            var e, r = t.propName,
                i = t.priority || 0,
                n = t.overwriteProps,
                s = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_mod",
                    mod: "_mod",
                    initAll: "_onInitAllProps"
                },
                o = T("plugins." + r.charAt(0).toUpperCase() + r.substr(1) + "Plugin", function() {
                    st.call(this, r, i),
                        this._overwriteProps = n || []
                }, !0 === t.global),
                a = o.prototype = new st(r);
            for (e in (a.constructor = o).API = t.API,
                s)
                "function" == typeof t[e] && (a[s[e]] = t[e]);
            return o.version = t.version,
                st.activate([o]),
                o
        },
        o = t._gsQueue) {
        for (a = 0; a < o.length; a++)
            o[a]();
        for (h in y)
            y[h].func || t.console.log("GSAP encountered missing dependency: " + h)
    }
    l = !1
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"),
function() {
    var t = window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5 = {};
    t.classes = {},
        t.instances = {},
        t.configs = {}
}(),
function(t) {
    function e() {}
    e.prototype.debounce = function(t, e, r) {
            var i, n, s, o, a, h = function() {
                var u = Date.now() - o;
                u < e && 0 <= u ? i = setTimeout(h, e - u) : (i = null,
                    r || (a = t.apply(s, n),
                        i || (n = s = null)))
            };
            return function() {
                s = this,
                    n = arguments,
                    o = Date.now();
                var u = r && !i;
                return i || (i = setTimeout(h, e)),
                    u && (a = t.apply(s, n),
                        s = n = null),
                    a
            }
        },
        t.classes.Utils = e
}(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
function(t) {
    function e() {
        this.sendEvent = null
    }
    e.prototype.init = function(e, r, i) {
            this.sendEvent = r,
                this.mainContainer = e,
                this.assetKeys = i,
                this.settings = t.instances.Loader.getSettings(),
                this.insideVaultContainer = new PIXI.Container,
                this.mainContainer.addChild(this.insideVaultContainer),
                this.vaultContainer = new PIXI.Container,
                this.mainContainer.addChild(this.vaultContainer),
                this.createInsideVaultSprite(),
                this.createVaultWallSprite(),
                this.createVaultDoorSprite(),
                this.createVaultOpenDoorSprite(),
                this.createVaultGlowSprite(),
                this.createHandleSprite(),
                this.createVaultOpenAnimation(),
                this.createSecretVaultButton(),
                this.createSignUpButton(),
                this.resetVault()
        },
        e.prototype.createInsideVaultSprite = function() {
            this.insideVaultSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultInside)),
                this.insideVaultSprite.anchor.set(.5),
                this.insideVaultContainer.addChild(this.insideVaultSprite),
                this.insideVaultSprite.position.set(400, 400),
                this.insideVaultSprite.scale.set(.7)
        },
        e.prototype.createVaultWallSprite = function() {
            this.vaultWallSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultWall)),
                this.vaultWallSprite.anchor.set(.5),
                this.vaultContainer.addChild(this.vaultWallSprite)
        },
        e.prototype.createVaultDoorSprite = function() {
            this.vaultDoorSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultDoor)),
                this.vaultDoorSprite.anchor.set(0),
                this.vaultContainer.addChild(this.vaultDoorSprite)
        },
        e.prototype.createVaultGlowSprite = function() {
            this.vaultGlowSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultGlow)),
                this.vaultGlowSprite.anchor.set(.5),
                this.vaultContainer.addChild(this.vaultGlowSprite)
        },
        e.prototype.createVaultOpenDoorSprite = function() {
            this.vaultOpenDoorSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultOpenDoor)),
                this.vaultOpenDoorSprite.anchor.set(.5),
                this.vaultContainer.addChild(this.vaultOpenDoorSprite)
        },
        e.prototype.createHandleSprite = function() {
            this.handleSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.vaultHandle)),
                this.handleSprite.anchor.set(0),
                this.vaultContainer.addChild(this.handleSprite)
        },
        e.prototype.createVaultOpenAnimation = function() {
            for (var e = t.instances.Loader.getSpriteSheetByName(this.assetKeys.vaultAnimation), r = e.spritesheet._frameKeys.length, i = [], n = 0; n < r; n++)
                i.push(PIXI.Texture.fromFrame(e.spritesheet._frameKeys[n]));
            this.vaultAnimation = new PIXI.extras.AnimatedSprite(i),
                this.vaultContainer.addChild(this.vaultAnimation),
                this.vaultAnimation.animationSpeed = .5,
                this.vaultAnimation.loop = !1,
                this.vaultAnimation.onComplete = this.onCompleteVaultAnimation.bind(this),
                this.vaultAnimation.visible = !1,
                this.vaultAnimation.x = 7,
                this.vaultAnimation.y = 97
        },
        e.prototype.createSecretVaultButton = function() {
            this.secretButton = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.secretButton)),
                this.secretButton.anchor.set(.5),
                this.vaultContainer.addChild(this.secretButton),
                this.secretButton.interactive = !0,
                this.secretButton.buttonMode = !0,
                this.secretButton.visible = !1,
                this.secretButton.on("pointerdown", this.onSecretVaultButtonClick, this)
        },
        e.prototype.createSignUpButton = function() {
            this.signUpButton = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.signUpButton)),
                this.signUpButton.anchor.set(.5),
                this.insideVaultContainer.addChild(this.signUpButton),
                this.signUpButton.interactive = !0,
                this.signUpButton.buttonMode = !0,
                this.signUpButton.visible = !1,
                this.signUpButton.on("pointerdown", this.onSignUpButtonClick, this)
        },
        e.prototype.onSecretVaultButtonClick = function() {
            this.secretButton.visible = !1,
                this.sendEvent(t.Events.SECRET_BUTTON_CLICKED)
        },
        e.prototype.showSecretButton = function() {
            this.secretButton.visible = !0
        },
        e.prototype.onSignUpButtonClick = function() {
            this.signUpButton.visible = !1,
                this.sendEvent(t.Events.SIGN_UP)
        },
        e.prototype.showSignUpButton = function() {
            this.signUpButton.visible = !0
        },
        e.prototype.resetVault = function() {
            this.vaultWallSprite.position.set(400, 400),
                this.vaultDoorSprite.position.set(170, 150),
                this.handleSprite.pivot.set(170, 170),
                this.handleSprite.position.set(399, 396),
                this.secretButton.position.set(this.settings.secretButton.x, this.settings.secretButton.y),
                this.signUpButton.position.set(this.settings.signUpButton.x, this.settings.signUpButton.y),
                this.vaultOpenDoorSprite.position.set(418, 398),
                this.vaultOpenDoorSprite.visible = !1,
                this.vaultGlowSprite.position.set(418, 400),
                this.vaultGlowSprite.visible = !1,
                this.vaultContainer.pivot.set(400, 400),
                this.vaultContainer.position.set(400, 400)
        },
        e.prototype.spinHandleSuccess = function() {
            TweenLite.to(this.handleSprite, 3, {
                rotation: 18.84957,
                ease: Power3.easeInOut,
                onComplete: this.spinHandleSuccessComplete.bind(this)
            })
        },
        e.prototype.spinHandleFail = function() {
            TweenLite.to(this.handleSprite, .1, {
                    rotation: 6.28319 / 64,
                    ease: Power3.easeInOut
                }),
                TweenLite.to(this.handleSprite, .2, {
                    rotation: -6.28319 / 64,
                    ease: Power3.easeInOut,
                    delay: .1
                }),
                TweenLite.to(this.handleSprite, .3, {
                    rotation: 0,
                    ease: Power3.easeInOut,
                    delay: .3,
                    onComplete: this.spinHandleFailComplete.bind(this)
                })
        },
        e.prototype.spinHandleSuccessComplete = function() {
            this.sendEvent(t.Events.SPIN_HANDLE_SUCCESS_COMPLETE)
        },
        e.prototype.spinHandleFailComplete = function() {
            this.sendEvent(t.Events.SPIN_HANDLE_FAIL_COMPLETE)
        },
        e.prototype.playVaultDoorOpenAnimation = function() {
            this.vaultAnimation.visible = !0,
                this.vaultDoorSprite.visible = !1,
                this.handleSprite.visible = !1,
                this.vaultAnimation.play()
        },
        e.prototype.onCompleteVaultAnimation = function() {
            this.vaultOpenDoorSprite.visible = !0,
                this.vaultGlowSprite.visible = !0,
                this.vaultAnimation.visible = !1,
                this.sendEvent(t.Events.VAULT_DOOR_OPEN_COMPLETE)
        },
        e.prototype.walkIntoVault = function() {
            TweenLite.to(this.vaultContainer.scale, 4, {
                    x: 3.15,
                    y: 3.15,
                    ease: Power3.easeInOut,
                    onComplete: this.walkIntoVaultComplete.bind(this)
                }),
                TweenLite.to(this.vaultGlowSprite, 4, {
                    alpha: 0,
                    ease: Power3.easeInOut
                })
        },
        e.prototype.walkIntoVaultComplete = function() {
            this.sendEvent(t.Events.WALK_INTO_VAULT_COMPLETE)
        },
        e.prototype.zoomInsideVault = function() {
            TweenLite.to(this.insideVaultSprite.scale, 4, {
                x: 1,
                y: 1,
                ease: Power3.easeInOut
            })
        },
        e.prototype.hideInsideVault = function() {
            this.insideVaultSprite.visible = !1
        },
        e.prototype.zoomOutVaultContainer = function() {
            this.vaultContainer.scale.set(.5)
        },
        e.prototype.zoomVault = function() {
            TweenLite.to(this.vaultContainer.scale, 4, {
                x: 1,
                y: 1,
                ease: Power3.easeInOut
            })
        },
        t.classes.Vault = e
}(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
function(t) {
    function e() {
        this.assetKeys = {
                keypad: "keypad"
            },
            this.sendEvent = null,
            this.enteredKeys = []
    }
    e.prototype.init = function(e, r) {
            this.sendEvent = r,
                this.mainContainer = e,
                this.settings = t.instances.Loader.getSettings(),
                this.keypadContainer = new PIXI.Container,
                this.mainContainer.addChild(this.keypadContainer),
                this.checkDevice(),
                this.createHtmlInput(),
                this.createKeypadSprite(),
                this.createKeypadButtons(),
                this.createKeypadText(),
                this.createKeypadErrorText(),
                this.resetKeypad()
        },
        e.prototype.checkDevice = function() {
            this.isIosDevice = "undefined" != typeof window && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform),
                this.isMobile = function() {
                    try {
                        return document.createEvent("TouchEvent"), !0
                    } catch (t) {
                        return !1
                    }
                }()
        },
        e.prototype.createHtmlInput = function() {
            var t = document.getElementById("vault-container");
            if (t) {
                var e = document.createElement("input");
                e && (e.id = "vaultInput",
                    e.type = "number",
                    e.type = "tel",
                    e.style = "direction: ltr; unicode-bidi: bidi-override;",
                    e.maxLength = 4,
                    e.style.opacity = "0",
                    e.style.position = "absolute",
                    e.style.width = "0px",
                    e.style.top = "50%",
                    e.style.transform = "translate(0,-50%)",
                    e.addEventListener("keypress", this.onInputKeypress.bind(this)),
                    e.addEventListener("input", this.onInputChanged.bind(this)),
                    t.appendChild(e),
                    this.inputElement = e)
            }
        },
        e.prototype.createKeypadSprite = function() {
            this.keypadSprite = new PIXI.Sprite(t.instances.Loader.getTextureByName(this.assetKeys.keypad)),
                this.keypadSprite.anchor.set(0),
                this.keypadContainer.addChild(this.keypadSprite),
                this.isMobile && (this.keypadSprite.interactive = !0,
                    this.keypadSprite.buttonMode = !0,
                    this.keypadSprite.on("pointerdown", this.onKeypadTouch, this))
        },
        e.prototype.onKeypadTouch = function() {
            this.isIosDevice ? this.inputElement && (this.inputElement.focus(),
                this.inputElement.click(),
                window.setTimeout(function() {
                        document.scrollingElement.scrollTo(0, 1e3)
                    }
                    .bind(this), 200)) : (document.activeElement.blur(),
                window.setTimeout(function() {
                        this.inputElement.focus(),
                            this.inputElement.click()
                    }
                    .bind(this), 200))
        },
        e.prototype.resetInputValue = function() {
            this.inputElement && (this.inputElement.value = "")
        },
        e.prototype.setInputValue = function(t) {
            this.inputElement && (this.inputElement.value = t)
        },
        e.prototype.onInputChanged = function(t) {
            t.target.value.length <= 4 && (this.enteredText = t.target.value,
                this.codeChanged())
        },
        e.prototype.onKeypadButtonClick = function(t) {
            var e = t.currentTarget.buttonValue;
            this.enteredText.length < 4 && (this.enteredText += e,
                this.setInputValue(this.enteredText),
                this.codeChanged())
        },
        e.prototype.codeChanged = function() {
            this.errorText.visible = !1,
                this.updateKeypadText(),
                4 === this.enteredText.length && (this.checkUniqueCode(this.enteredText) ? this.sendEvent(t.Events.KEYCODE_ENTERED, this.enteredText) : this.sendEvent(t.Events.DUPLICATE_KEYCODE_ENTERED),
                    document.activeElement.blur())
        },
        e.prototype.incorrectCodeEntered = function() {
            this.loopCounter = 0,
                this.currentXPos = this.keypadContainer.x,
                this.callback = this.tweenKeypadComplete,
                this.doKeypadShake()
        },
        e.prototype.duplicateCodeEntered = function() {
            this.errorText.visible = !0,
                this.enteredText = "",
                this.updateKeypadText(),
                this.resetInputValue(),
                this.loopCounter = 0,
                this.currentXPos = this.keypadContainer.x,
                this.callback = null,
                this.doKeypadShake()
        },
        e.prototype.correctCodeEntered = function() {
            this.tweenKeypad()
        },
        e.prototype.doKeypadShake = function() {
            TweenLite.to(this.keypadContainer, .04, {
                    x: this.currentXPos + 6,
                    delay: 0
                }),
                TweenLite.to(this.keypadContainer, .08, {
                    x: this.currentXPos - 6,
                    delay: .04
                }),
                TweenLite.to(this.keypadContainer, .04, {
                    x: this.currentXPos,
                    delay: .12
                }),
                TweenLite.delayedCall(.16, function() {
                        this.loopCounter++,
                            this.loopCounter <= 2 ? this.doKeypadShake() : this.callback && this.callback()
                    }
                    .bind(this))
        },
        e.prototype.onInputKeypress = function(t) {
            var e = t,
                r = e.keyCode || e.which;
            r = String.fromCharCode(r),
                /[0-9]/.test(r) || (e.returnValue = !1,
                    e.preventDefault && e.preventDefault())
        },
        e.prototype.resetKeypad = function() {
            this.keypadContainer.position.set(150, 450),
                this.keypadContainer.width = 500,
                this.keypadContainer.height = 300,
                this.keypadContainer.alpha = 1,
                this.resetInputValue(),
                this.enteredText = "",
                this.updateKeypadText()
        },
        e.prototype.createKeypadText = function() {
            this.enteredText = "";
            var t = new PIXI.TextStyle(this.settings.keypadText.style);
            this.basicText = new PIXI.Text("", t),
                this.basicText.x = this.settings.keypadText.x,
                this.basicText.y = this.settings.keypadText.y,
                this.keypadContainer.addChild(this.basicText)
        },
        e.prototype.createKeypadErrorText = function() {
            var t = new PIXI.TextStyle(this.settings.keypadErrorText.style);
            this.errorText = new PIXI.Text("", t),
                this.errorText.x = this.settings.keypadErrorText.x,
                this.errorText.y = this.settings.keypadErrorText.y,
                this.errorText.text = this.settings.keypadErrorText.message,
                this.errorText.visible = !1,
                this.keypadContainer.addChild(this.errorText)
        },
        e.prototype.createKeypadButtons = function() {
            for (var t = 0; t < 2; t++)
                for (var e = this.keypadSprite.y + 152 + 48 * t + 20 * t, r = 0; r < 5; r++) {
                    var i = new PIXI.Graphics;
                    i.beginFill(16777215),
                        i.alpha = 0,
                        i.drawRect(0, 0, 80, 48),
                        i.endFill(),
                        i.position.set(this.keypadSprite.x + 20 + 80 * r + 15 * r, e),
                        this.isMobile || (i.interactive = !0,
                            i.buttonMode = !0,
                            i.buttonValue = (r + 1 + 5 * t) % 10,
                            i.on("pointerdown", this.onKeypadButtonClick, this)),
                        this.keypadContainer.addChild(i)
                }
        },
        e.prototype.checkUniqueCode = function(t) {
            for (var e = !1, r = 0; r < this.enteredKeys.length; r++)
                t === this.enteredKeys[r] && (e = !0);
            return e || this.enteredKeys.push(t), !e
        },
        e.prototype.updateKeypadText = function() {
            for (var t = "", e = 0; e < this.enteredText.length; e++)
                t += this.enteredText[e] + " ";
            this.basicText.text = t
        },
        e.prototype.tweenKeypad = function() {
            TweenLite.to(this.keypadContainer, .5, {
                    width: 60,
                    height: 36,
                    x: 707,
                    y: 382,
                    delay: .5,
                    onComplete: this.tweenKeypadComplete.bind(this)
                }),
                TweenLite.to(this.keypadContainer, .3, {
                    alpha: 0,
                    delay: .9
                })
        },
        e.prototype.tweenKeypadComplete = function() {
            this.currentGameComplete = !0,
                this.sendEvent(t.Events.ENTER_KEY_COMPLETE)
        },
        t.classes.Keypad = e
}(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5.Events = {
        LOADING_COMPLETE: "LOADING_COMPLETE",
        KEYCODE_ENTERED: "KEYCODE_ENTERED",
        DUPLICATE_KEYCODE_ENTERED: "DUPLICATE_KEYCODE_ENTERED",
        TWEEN_KEYPAD_START: "TWEEN_KEYPAD_START",
        ENTER_KEY_COMPLETE: "ENTER_KEY_COMPLETE",
        SPIN_HANDLE_SUCCESS_COMPLETE: "SPIN_HANDLE_SUCCESS_COMPLETE",
        SPIN_HANDLE_FAIL_COMPLETE: "SPIN_HANDLE_FAIL_COMPLETE",
        VAULT_DOOR_OPEN_COMPLETE: "VAULT_DOOR_OPEN_COMPLETE",
        WALK_INTO_VAULT_COMPLETE: "WALK_INTO_VAULT_COMPLETE",
        SECRET_BUTTON_CLICKED: "SECRET_BUTTON_CLICKED",
        SIGN_UP: "SIGN_UP"
    },
    window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5.Enums = {
        GAME_ROUND_SECRET: "GAME_ROUND_SECRET"
    },
    function(t) {
        function e(e, r, i) {
            this.GameState = {
                    LOADING: "LOADING",
                    ENTER_KEYPAD: "ENTER_KEYPAD",
                    ENTER_KEYPAD_RETRY: "ENTER_KEYPAD_RETRY",
                    SPIN_HANDLE_SUCCESS: "SPIN_HANDLE_SUCCESS",
                    OPENING_VAULT: "OPENING_VAULT",
                    SECRET_VAULT_FOUND: "SECRET_VAULT_FOUND",
                    SPIN_SECRET_HANDLE_SUCCESS: "SPIN_SECRET_HANDLE_SUCCESS",
                    SUMMARY: "SUMMARY"
                },
                this.settingNames = {
                    gameResult: "gameResult"
                },
                this.sizeOptions = {
                    manualSetCanvasSize: !1,
                    centerCanvas: !0
                },
                this.callBack = i,
                this.currentState = this.GameState.LOADING,
                this.logicalWidth = 800,
                this.logicalHeight = 800,
                PIXI.utils._saidHello = !0,
                this.renderer = PIXI.autoDetectRenderer(this.logicalWidth, this.logicalHeight, {
                    roundPixels: !0,
                    legacy: !0,
                    forceCanvas: !0,
                    resolution: 1
                }),
                this.renderer.view.id = "vault-canvas",
                this.stage = new PIXI.Container,
                this.mainContainer = new PIXI.Container,
                this.stage.addChild(this.mainContainer),
                document.getElementById("vault-container").appendChild(this.renderer.view),
                t.instances.Sizer = new t.classes.Sizer(this.sizeOptions, this.renderer.view),
                t.instances.Loader = new t.classes.Loader(e, r),
                t.instances.Loader.init(this.onEvent.bind(this)),
                t.instances.Loader.loadAssets()
        }
        e.prototype.setup = function() {
                this.gameRound = 0,
                    this.activeVault = 1,
                    this.settings = t.instances.Loader.getSettings(),
                    this.gameResultArray = this.settings.gameResult,
                    this.totalGameRounds = this.gameResultArray.length,
                    this.accessSecretVaultUsingCode = !1,
                    this.secretCodes = [],
                    this.settings.secretVault && this.settings.secretVault.accessWithCode && (this.accessSecretVaultUsingCode = this.settings.secretVault.accessWithCode,
                        this.secretCodes = this.settings.secretVault.secretCodes),
                    t.instances.Utils = new t.classes.Utils,
                    t.instances.Keypad = new t.classes.Keypad,
                    t.instances.DivDisplayer = new t.classes.DivDisplayer,
                    t.instances.ImageDisplayer = new t.classes.ImageDisplayer,
                    this.createVaults(),
                    t.instances.Keypad.init(this.mainContainer, this.onEvent.bind(this)),
                    t.instances.DivDisplayer.init(this.settings),
                    t.instances.ImageDisplayer.init(this.settings, this.mainContainer),
                    t.instances.Sizer.resizeHandler(),
                    TweenLite.ticker.addEventListener("tick", this.update, this),
                    this.changeGameState(this.GameState.ENTER_KEYPAD)
            },
            e.prototype.createVaults = function() {
                t.instances.Vault2 = new t.classes.Vault,
                    t.instances.Vault2.init(this.mainContainer, this.onEvent.bind(this), {
                        vaultDoor: "vaultDoor",
                        vaultHandle: "vaultHandle",
                        vaultAnimation: "vaultAnimation",
                        vaultWall: "vault2Wall",
                        vaultInside: "vault2Inside",
                        secretButton: "secretButton",
                        signUpButton: "signUpButton",
                        vaultOpenDoor: "vaultOpenDoor",
                        vaultGlow: "vaultGlow"
                    }),
                    t.instances.Vault1 = new t.classes.Vault,
                    t.instances.Vault1.init(this.mainContainer, this.onEvent.bind(this), {
                        vaultDoor: "vaultDoor",
                        vaultHandle: "vaultHandle",
                        vaultAnimation: "vaultAnimation",
                        vaultWall: "vaultWall",
                        vaultInside: "vaultInside",
                        secretButton: "secretButton",
                        signUpButton: "signUpButton",
                        vaultOpenDoor: "vaultOpenDoor",
                        vaultGlow: "vaultGlow"
                    })
            },
            e.prototype.changeGameState = function(e) {
                switch (this.currentState = e,
                    this.currentState) {
                    case this.GameState.ENTER_KEYPAD:
                        t.instances.DivDisplayer.showIntro(this.gameRound),
                            t.instances.ImageDisplayer.showIntro(this.gameRound);
                        break;
                    case this.GameState.ENTER_KEYPAD_RETRY:
                        this.gameRound++,
                            t.instances.DivDisplayer.showIntro(this.gameRound),
                            t.instances.ImageDisplayer.showIntro(this.gameRound),
                            t.instances.Keypad.resetKeypad();
                        break;
                    case this.GameState.SPIN_HANDLE_SUCCESS:
                        t.instances.Vault1.spinHandleSuccess();
                        break;
                    case this.GameState.SECRET_VAULT_FOUND:
                        t.instances.DivDisplayer.showSecret(this.gameRound),
                            t.instances.ImageDisplayer.showSecret(this.gameRound),
                            t.instances.Vault2.showSecretButton(),
                            this.activeVault = 2;
                        break;
                    case this.GameState.SPIN_SECRET_HANDLE_SUCCESS:
                        t.instances.DivDisplayer.hideAllDivs(),
                            t.instances.ImageDisplayer.hideAllImages(),
                            t.instances.Vault2.spinHandleSuccess();
                        break;
                    case this.GameState.SUMMARY:
                        t.instances.DivDisplayer.showSummary(this.gameRound),
                            t.instances.ImageDisplayer.showSummary(this.gameRound),
                            1 === this.activeVault ? t.instances.Vault1.showSignUpButton() : t.instances.Vault2.showSignUpButton()
                }
            },
            e.prototype.onEvent = function(e, r) {
                switch (e) {
                    case t.Events.LOADING_COMPLETE:
                        this.setup();
                        break;
                    case t.Events.KEYCODE_ENTERED:
                        t.instances.DivDisplayer.hideAllDivs(),
                            t.instances.ImageDisplayer.hideAllImages(),
                            this.isSecretCodeEntered(r),
                            this.secretCodeEntered ? window.setTimeout(function() {
                                    t.instances.Sizer.resizeHandler(),
                                        t.instances.Keypad.correctCodeEntered()
                                }
                                .bind(this), 300) : !0 === this.gameResultArray[this.gameRound].codeSuccess ? window.setTimeout(function() {
                                    t.instances.Sizer.resizeHandler(),
                                        t.instances.Keypad.correctCodeEntered()
                                }
                                .bind(this), 300) : window.setTimeout(function() {
                                    t.instances.Sizer.resizeHandler(),
                                        t.instances.Keypad.resetKeypad(),
                                        t.instances.Keypad.incorrectCodeEntered(),
                                        t.instances.Vault1.spinHandleFail()
                                }
                                .bind(this), 300);
                        break;
                    case t.Events.DUPLICATE_KEYCODE_ENTERED:
                        window.setTimeout(function() {
                                t.instances.Sizer.resizeHandler(),
                                    t.instances.Keypad.resetKeypad(),
                                    t.instances.Keypad.duplicateCodeEntered()
                            }
                            .bind(this), 300);
                        break;
                    case t.Events.ENTER_KEY_COMPLETE:
                        this.secretCodeEntered ? this.changeGameState(this.GameState.SPIN_HANDLE_SUCCESS) : !0 === this.gameResultArray[this.gameRound].codeSuccess ? this.changeGameState(this.GameState.SPIN_HANDLE_SUCCESS) : this.changeGameState(this.GameState.ENTER_KEYPAD_RETRY);
                        break;
                    case t.Events.SPIN_HANDLE_SUCCESS_COMPLETE:
                        1 === this.activeVault ? (this.secretCodeEntered ? (t.instances.Vault1.hideInsideVault(),
                                t.instances.Vault2.zoomOutVaultContainer()) : !0 === this.gameResultArray[this.gameRound].secretVault && (t.instances.Vault1.hideInsideVault(),
                                t.instances.Vault2.zoomOutVaultContainer()),
                            t.instances.Vault1.playVaultDoorOpenAnimation()) : 2 === this.activeVault && t.instances.Vault2.playVaultDoorOpenAnimation();
                        break;
                    case t.Events.VAULT_DOOR_OPEN_COMPLETE:
                        1 === this.activeVault ? (t.instances.Vault1.walkIntoVault(),
                            this.secretCodeEntered ? t.instances.Vault2.zoomVault() : !0 === this.gameResultArray[this.gameRound].secretVault ? t.instances.Vault2.zoomVault() : t.instances.Vault1.zoomInsideVault()) : 2 === this.activeVault && (t.instances.Vault2.walkIntoVault(),
                            t.instances.Vault2.zoomInsideVault());
                        break;
                    case t.Events.WALK_INTO_VAULT_COMPLETE:
                        1 === this.activeVault ? this.secretCodeEntered ? this.changeGameState(this.GameState.SECRET_VAULT_FOUND) : !0 === this.gameResultArray[this.gameRound].secretVault ? this.changeGameState(this.GameState.SECRET_VAULT_FOUND) : this.changeGameState(this.GameState.SUMMARY) : 2 === this.activeVault && this.changeGameState(this.GameState.SUMMARY);
                        break;
                    case t.Events.SECRET_BUTTON_CLICKED:
                        this.changeGameState(this.GameState.SPIN_SECRET_HANDLE_SUCCESS);
                        break;
                    case t.Events.SIGN_UP:
                        var i = "normalVault";
                        2 === this.activeVault && (i = "secretVault"),
                            this.secretCodeEntered && (i = "secretCodeVault"),
                            this.callBack(i)
                }
            },
            e.prototype.isSecretCodeEntered = function(e) {
                if (this.secretCodeEntered = !1,
                    this.accessSecretVaultUsingCode && e)
                    for (var r = 0; r < this.secretCodes.length; r++)
                        if (this.secretCodes[r] === e) {
                            this.secretCodeEntered = !0,
                                this.gameRound = t.Enums.GAME_ROUND_SECRET;
                            break
                        }
                return this.secretCodeEntered
            },
            e.prototype.manualResizeCanvas = function(e, r) {
                t.instances.Sizer.resize(e, r)
            },
            e.prototype.update = function(t) {
                this.renderer.render(this.stage)
            },
            t.classes.Game = e
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        window.startGame = function(e, r, i) {
                t.instances.Game = new t.classes.Game(e, r, i)
            },
            window.setCanvasSize = function(e, r) {
                t.instances.Game.manualResizeCanvas(e, r)
            }
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        function e(t, e) {
            this.configLoader = new PIXI.loaders.Loader,
                this.sendData = null,
                this.assetsConfigPath = t,
                this.settingsConfigPath = e
        }
        e.prototype.init = function(t) {
                this.sendData = t
            },
            e.prototype.loadAssets = function() {
                this.loadConfigs()
            },
            e.prototype.loadConfigs = function() {
                this.configLoader.add([this.assetsConfigPath, this.settingsConfigPath]).load(this.loadingConfigsComplete.bind(this))
            },
            e.prototype.loadingConfigsComplete = function(t) {
                this.loadImages()
            },
            e.prototype.loadImages = function() {
                var t = this.configLoader.resources[this.assetsConfigPath].data.sprites;
                for (var e in t)
                    if (t.hasOwnProperty(e)) {
                        var r = t[e];
                        PIXI.loader.add(e, r)
                    }
                PIXI.loader.on("progress", this.loadProgressHandler.bind(this)).load(this.loadingComplete.bind(this))
            },
            e.prototype.getSpriteNameFromConfig = function(t) {
                return this.configLoader.resources[this.assetsConfigPath].data.sprites[t]
            },
            e.prototype.loadingComplete = function() {
                this.sendData(t.Events.LOADING_COMPLETE)
            },
            e.prototype.loadProgressHandler = function(t, e) {},
            e.prototype.getTextureByName = function(t) {
                return PIXI.loader.resources[t].texture
            },
            e.prototype.getSpriteSheetByName = function(t) {
                return PIXI.loader.resources[t]
            },
            e.prototype.getSettingByName = function(t) {
                return this.configLoader.resources[this.settingsConfigPath].data[t]
            },
            e.prototype.getSettings = function() {
                return this.configLoader.resources[this.settingsConfigPath].data
            },
            t.classes.Loader = e
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        var e = "horizontally",
            r = "vertically";

        function i(t, e) {
            this.canvas = e;
            var r = .01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", r + "px"),
                this.manualResize = t.manualSetCanvasSize,
                this.centerCanvasOnScreen = t.centerCanvas,
                this.manualResize || (window.addEventListener("resize", this.resizeHandler.bind(this), !1),
                    window.addEventListener("orientationchange", this.resizeHandler.bind(this))),
                this.resizeHandler()
        }
        i.prototype.resizeHandler = function() {
                if (!this.manualResize) {
                    var t = .01 * window.innerHeight;
                    document.documentElement.style.setProperty("--vh", t + "px")
                }
            },
            i.prototype.manualResizeCanvas = function(t, e) {
                this.resize(t, e)
            },
            i.prototype.resize = function(t, e) {
                var r, i, n, s = this.canvas;
                r = t / s.offsetWidth,
                    i = e / s.offsetHeight,
                    n = Math.min(r, i),
                    s.style.transformOrigin = "0 0",
                    s.style.transform = "scale(" + n + ")", !this.manualResize && this.centerCanvasOnScreen && this.centerCanvas(s, n),
                    s.style.paddingLeft = "0px",
                    s.style.paddingRight = "0px",
                    s.style.paddingTop = "0px",
                    s.style.paddingBottom = "0px",
                    s.style.display = "block"
            },
            i.prototype.centerCanvas = function(t, i) {
                var n, s;
                (n = t.offsetWidth === t.offsetHeight ? this.canvas.parentElement.clientWidth >= this.canvas.parentElement.clientHeight ? e : r : t.offsetWidth > t.offsetHeight ? t.offsetWidth * i < this.canvas.parentElement.clientWidth ? e : r : t.offsetHeight * i < this.canvas.parentElement.clientHeight ? r : e) === e && (s = (this.canvas.parentElement.clientWidth - t.offsetWidth * i) / 2,
                        t.style.marginTop = "0px",
                        t.style.marginBottom = "0px",
                        t.style.marginLeft = s + "px",
                        t.style.marginRight = s + "px"),
                    n === r && (s = (this.canvas.parentElement.clientHeight - t.offsetHeight * i) / 2,
                        t.style.marginTop = s + "px",
                        t.style.marginBottom = s + "px",
                        t.style.marginLeft = "0px",
                        t.style.marginRight = "0px")
            },
            t.classes.Sizer = i
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        function e() {
            this.divs = {}
        }
        e.prototype.init = function(t) {
                var e, r, i;
                this.gameResults = t.gameResult,
                    this.secretVault = t.secretVault;
                for (var n = 0; n < this.gameResults.length; n++)
                    if (this.gameResults[n].divs)
                        for (r in e = this.gameResults[n].divs)
                            e.hasOwnProperty(r) && (i = document.getElementById(e[r])) && (this.divs[e[r]] = i);
                if (this.secretVault && !0 === this.secretVault.accessWithCode && this.secretVault.divs)
                    for (r in e = this.secretVault.divs)
                        e.hasOwnProperty(r) && (i = document.getElementById(e[r])) && (this.divs[e[r]] = i)
            },
            e.prototype.hideAllDivs = function() {
                for (var t in this.divs)
                    this.divs.hasOwnProperty(t) && (this.divs[t].style.display = "none")
            },
            e.prototype.showDiv = function(t) {
                this.hideAllDivs(),
                    this.divs[t] && (this.divs[t].style.display = "block")
            },
            e.prototype.showIntro = function(t) {
                this.gameResults[t].divs && this.gameResults[t].divs.intro && this.showDiv(this.gameResults[t].divs.intro)
            },
            e.prototype.showSummary = function(e) {
                e === t.Enums.GAME_ROUND_SECRET ? this.secretVault && this.secretVault.divs && this.secretVault.divs.summary && this.showDiv(this.secretVault.divs.summary) : this.gameResults[e].divs && this.gameResults[e].divs.summary && this.showDiv(this.gameResults[e].divs.summary)
            },
            e.prototype.showSecret = function(e) {
                e === t.Enums.GAME_ROUND_SECRET ? this.secretVault && this.secretVault.divs && this.secretVault.divs.secret && this.showDiv(this.secretVault.divs.secret) : this.gameResults[e].divs && this.gameResults[e].divs.secret && this.showDiv(this.gameResults[e].divs.secret)
            },
            t.classes.DivDisplayer = e
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        function e() {
            this.images = {}
        }
        e.prototype.init = function(t, e) {
                var r, i;
                this.gameResults = t.gameResult,
                    this.secretVault = t.secretVault,
                    this.mainContainer = e,
                    this.imagesContainer = new PIXI.Container,
                    this.mainContainer.addChild(this.imagesContainer);
                for (var n = 0; n < this.gameResults.length; n++)
                    if (this.gameResults[n].images)
                        for (i in r = this.gameResults[n].images)
                            r.hasOwnProperty(i) && this.createSprite(r[i].key);
                if (this.secretVault && this.secretVault.images)
                    for (i in r = this.secretVault.images)
                        r.hasOwnProperty(i) && this.createSprite(r[i].key)
            },
            e.prototype.createSprite = function(e) {
                var r = new PIXI.Sprite(t.instances.Loader.getTextureByName(e));
                r.anchor.set(.5),
                    this.imagesContainer.addChild(r),
                    (this.images[e] = r).visible = !1
            },
            e.prototype.hideAllImages = function() {
                for (var t in this.images)
                    this.images.hasOwnProperty(t) && (this.images[t].visible = !1)
            },
            e.prototype.showImage = function(t) {
                if (this.hideAllImages(),
                    this.images[t.key]) {
                    var e = this.images[t.key];
                    e.visible = !0,
                        e.x = t.x,
                        e.y = t.y,
                        e.width = t.width,
                        e.height = t.height
                }
            },
            e.prototype.showIntro = function(t) {
                this.gameResults[t].images && this.gameResults[t].images.intro && this.showImage(this.gameResults[t].images.intro)
            },
            e.prototype.showSummary = function(e) {
                e === t.Enums.GAME_ROUND_SECRET ? this.secretVault && this.secretVault.images && this.secretVault.images.summary && this.showImage(this.secretVault.images.summary) : this.gameResults[e].images && this.gameResults[e].images.summary && this.showImage(this.gameResults[e].images.summary)
            },
            e.prototype.showSecret = function(e) {
                e === t.Enums.GAME_ROUND_SECRET ? this.secretVault && this.secretVault.images && this.secretVault.images.secret && this.showImage(this.secretVault.images.secret) : this.gameResults[e].images && this.gameResults[e].images.secret && this.showImage(this.gameResults[e].images.secret)
            },
            t.classes.ImageDisplayer = e
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5),
    function(t) {
        function e(t, e, r) {
            this.url = t;
            var i = this.getUrlVars(this.url);
            i && i.moduleId && (this.moduleId = i.moduleId),
                i && i.currencyIsoCode && (this.currency = i.currencyIsoCode),
                this.progressiveId = e,
                this.updateCallback = r,
                this.intervalTimer = null,
                this.apiResponse = null,
                this.progressiveResponse = null,
                this.intervalStartTime = null,
                this.progressiveStartValue = null,
                this.progressiveEndValue = null,
                this.centsPerSecond = null,
                this.numberOfSeconds = null,
                this.url && this.moduleId && this.currency && this.progressiveId ? this.apiRequest() : console.log("Error(Progressive Ticker) - Missing parameters")
        }
        window.createProgressiveTicker = function(e, r, i) {
                t.instances.ProgressiveTicker = new t.classes.ProgressiveTicker(e, r, i)
            },
            e.prototype.getUrlVars = function(t) {
                var e = {};
                return t.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(t, r, i) {
                        e[r] = i
                    }),
                    e
            },
            e.prototype.apiRequest = function() {
                var t = new XMLHttpRequest;
                t.open("GET", this.url, !0),
                    t.onload = function() {
                        4 === t.readyState && (200 === t.status ? this.getResponse(t) : console.error("Error(Progressive API)", t.statusText))
                    }
                    .bind(this),
                    t.onerror = function(t) {
                        console.log("Error(Progressive API)", t)
                    },
                    t.send(null)
            },
            e.prototype.getResponse = function(t) {
                try {
                    var e = JSON.parse(t.responseText);
                    if (0 < e.length) {
                        this.apiResponse = e;
                        for (var r = !1, i = 0; i < this.apiResponse.length; i++)
                            this.apiResponse[i].progressiveId === this.progressiveId && (r = !0,
                                this.progressiveResponse = this.apiResponse[i],
                                this.intervalTimer && clearInterval(this.intervalTimer),
                                this.progressiveStartValue = this.progressiveResponse.startAtValue,
                                this.progressiveEndValue = this.progressiveResponse.endAtValue,
                                this.centsPerSecond = this.progressiveResponse.centsPerSecond,
                                this.numberOfSeconds = this.progressiveResponse.numberOfSeconds,
                                this.intervalStartTime = new Date,
                                this.intervalTimer = setInterval(this.onInterval.bind(this), 1e3),
                                setTimeout(this.apiRequest.bind(this), 1e3 * this.numberOfSeconds));
                        r || console.log("Error(Progressive API): ProgressiveID not found in response")
                    } else
                        e.message ? console.log("Error(Progressive API):", e.message) : console.log("Error(Progressive API): Empty response")
                } catch (t) {
                    console.log("Error(Progressive API)", t)
                }
            },
            e.prototype.onInterval = function() {
                var t = new Date,
                    e = Math.round((t - this.intervalStartTime) / 1e3),
                    r = (this.progressiveStartValue + e * this.centsPerSecond / 100).toLocaleString(void 0, {
                        style: "currency",
                        currency: this.currency
                    });
                this.updateCallback(r)
            },
            t.classes.ProgressiveTicker = e
    }(window.b497c917cb5ff52ceed56a75bc5d7decd69c3bab6f09d65682a38771f9a67eb5);