var app = (function () {
  'use strict';
  function t() {}
  const e = (t) => t;
  function n(t, e) {
    for (const n in e) t[n] = e[n];
    return t;
  }
  function s(t) {
    return t();
  }
  function r() {
    return Object.create(null);
  }
  function o(t) {
    t.forEach(s);
  }
  function l(t) {
    return 'function' == typeof t;
  }
  function i(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function c(e, n, s) {
    e.$$.on_destroy.push(
      (function (e, ...n) {
        if (null == e) return t;
        const s = e.subscribe(...n);
        return s.unsubscribe ? () => s.unsubscribe() : s;
      })(n, s)
    );
  }
  function u(t, e, n, s) {
    if (t) {
      const r = a(t, e, n, s);
      return t[0](r);
    }
  }
  function a(t, e, s, r) {
    return t[1] && r ? n(s.ctx.slice(), t[1](r(e))) : s.ctx;
  }
  function f(t, e, n, s) {
    if (t[2] && s) {
      const r = t[2](s(n));
      if (void 0 === e.dirty) return r;
      if ('object' == typeof r) {
        const t = [],
          n = Math.max(e.dirty.length, r.length);
        for (let s = 0; s < n; s += 1) t[s] = e.dirty[s] | r[s];
        return t;
      }
      return e.dirty | r;
    }
    return e.dirty;
  }
  function d(t, e, n, s, r, o) {
    if (r) {
      const l = a(e, n, s, o);
      t.p(l, r);
    }
  }
  function p(t) {
    if (t.ctx.length > 32) {
      const e = [],
        n = t.ctx.length / 32;
      for (let t = 0; t < n; t++) e[t] = -1;
      return e;
    }
    return -1;
  }
  function $(t) {
    return null == t ? '' : t;
  }
  const m = 'undefined' != typeof window;
  let h = m ? () => window.performance.now() : () => Date.now(),
    g = m ? (t) => requestAnimationFrame(t) : t;
  const v = new Set();
  function y(t) {
    v.forEach((e) => {
      e.c(t) || (v.delete(e), e.f());
    }),
      0 !== v.size && g(y);
  }
  function w(t) {
    let e;
    return (
      0 === v.size && g(y),
      {
        promise: new Promise((n) => {
          v.add((e = { c: t, f: n }));
        }),
        abort() {
          v.delete(e);
        },
      }
    );
  }
  function b(t, e) {
    t.appendChild(e);
  }
  function x(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument;
  }
  function _(t) {
    const e = B('style');
    return (
      (function (t, e) {
        b(t.head || t, e);
      })(x(t), e),
      e
    );
  }
  function A(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function k(t) {
    t.parentNode.removeChild(t);
  }
  function B(t) {
    return document.createElement(t);
  }
  function C(t) {
    return document.createTextNode(t);
  }
  function E() {
    return C(' ');
  }
  function q(t, e, n, s) {
    return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
  }
  function P(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function j(t, e) {
    (e = '' + e), t.wholeText !== e && (t.data = e);
  }
  function S(t, e) {
    t.value = null == e ? '' : e;
  }
  function z(t, e, n, s) {
    t.style.setProperty(e, n, s ? 'important' : '');
  }
  function M(t, e, n) {
    t.classList[n ? 'add' : 'remove'](e);
  }
  function R(t, e, n = !1) {
    const s = document.createEvent('CustomEvent');
    return s.initCustomEvent(t, n, !1, e), s;
  }
  const N = new Set();
  let O,
    D = 0;
  function T(t, e, n, s, r, o, l, i = 0) {
    const c = 16.666 / s;
    let u = '{\n';
    for (let t = 0; t <= 1; t += c) {
      const s = e + (n - e) * o(t);
      u += 100 * t + `%{${l(s, 1 - s)}}\n`;
    }
    const a = u + `100% {${l(n, 1 - n)}}\n}`,
      f = `__svelte_${(function (t) {
        let e = 5381,
          n = t.length;
        for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
        return e >>> 0;
      })(a)}_${i}`,
      d = x(t);
    N.add(d);
    const p = d.__svelte_stylesheet || (d.__svelte_stylesheet = _(t).sheet),
      $ = d.__svelte_rules || (d.__svelte_rules = {});
    $[f] ||
      (($[f] = !0), p.insertRule(`@keyframes ${f} ${a}`, p.cssRules.length));
    const m = t.style.animation || '';
    return (
      (t.style.animation = `${
        m ? `${m}, ` : ''
      }${f} ${s}ms linear ${r}ms 1 both`),
      (D += 1),
      f
    );
  }
  function I(t, e) {
    const n = (t.style.animation || '').split(', '),
      s = n.filter(
        e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf('__svelte')
      ),
      r = n.length - s.length;
    r &&
      ((t.style.animation = s.join(', ')),
      (D -= r),
      D ||
        g(() => {
          D ||
            (N.forEach((t) => {
              const e = t.__svelte_stylesheet;
              let n = e.cssRules.length;
              for (; n--; ) e.deleteRule(n);
              t.__svelte_rules = {};
            }),
            N.clear());
        }));
  }
  function L(t, e) {
    const n = t.getBoundingClientRect();
    if (e.left !== n.left || e.top !== n.top) {
      const s = getComputedStyle(t),
        r = 'none' === s.transform ? '' : s.transform;
      t.style.transform = `${r} translate(${e.left - n.left}px, ${
        e.top - n.top
      }px)`;
    }
  }
  function F(t) {
    O = t;
  }
  function H() {
    const t = (function () {
      if (!O)
        throw new Error('Function called outside component initialization');
      return O;
    })();
    return (e, n) => {
      const s = t.$$.callbacks[e];
      if (s) {
        const r = R(e, n);
        s.slice().forEach((e) => {
          e.call(t, r);
        });
      }
    };
  }
  function J(t, e) {
    const n = t.$$.callbacks[e.type];
    n && n.slice().forEach((t) => t.call(this, e));
  }
  const Q = [],
    G = [],
    K = [],
    U = [],
    V = Promise.resolve();
  let W = !1;
  function X(t) {
    K.push(t);
  }
  const Y = new Set();
  let Z,
    tt = 0;
  function et() {
    const t = O;
    do {
      for (; tt < Q.length; ) {
        const t = Q[tt];
        tt++, F(t), nt(t.$$);
      }
      for (F(null), Q.length = 0, tt = 0; G.length; ) G.pop()();
      for (let t = 0; t < K.length; t += 1) {
        const e = K[t];
        Y.has(e) || (Y.add(e), e());
      }
      K.length = 0;
    } while (Q.length);
    for (; U.length; ) U.pop()();
    (W = !1), Y.clear(), F(t);
  }
  function nt(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(X);
    }
  }
  function st() {
    return (
      Z ||
        ((Z = Promise.resolve()),
        Z.then(() => {
          Z = null;
        })),
      Z
    );
  }
  function rt(t, e, n) {
    t.dispatchEvent(R(`${e ? 'intro' : 'outro'}${n}`));
  }
  const ot = new Set();
  let lt;
  function it() {
    lt = { r: 0, c: [], p: lt };
  }
  function ct() {
    lt.r || o(lt.c), (lt = lt.p);
  }
  function ut(t, e) {
    t && t.i && (ot.delete(t), t.i(e));
  }
  function at(t, e, n, s) {
    if (t && t.o) {
      if (ot.has(t)) return;
      ot.add(t),
        lt.c.push(() => {
          ot.delete(t), s && (n && t.d(1), s());
        }),
        t.o(e);
    }
  }
  const ft = { duration: 0 };
  function dt(t, e) {
    t.f(),
      (function (t, e) {
        at(t, 1, 1, () => {
          e.delete(t.key);
        });
      })(t, e);
  }
  function pt(t) {
    t && t.c();
  }
  function $t(t, e, n, r) {
    const { fragment: i, on_mount: c, on_destroy: u, after_update: a } = t.$$;
    i && i.m(e, n),
      r ||
        X(() => {
          const e = c.map(s).filter(l);
          u ? u.push(...e) : o(e), (t.$$.on_mount = []);
        }),
      a.forEach(X);
  }
  function mt(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (o(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function ht(t, e) {
    -1 === t.$$.dirty[0] &&
      (Q.push(t), W || ((W = !0), V.then(et)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function gt(e, n, s, l, i, c, u, a = [-1]) {
    const f = O;
    F(e);
    const d = (e.$$ = {
      fragment: null,
      ctx: null,
      props: c,
      update: t,
      not_equal: i,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (f ? f.$$.context : [])),
      callbacks: r(),
      dirty: a,
      skip_bound: !1,
      root: n.target || f.$$.root,
    });
    u && u(d.root);
    let p = !1;
    if (
      ((d.ctx = s
        ? s(e, n.props || {}, (t, n, ...s) => {
            const r = s.length ? s[0] : n;
            return (
              d.ctx &&
                i(d.ctx[t], (d.ctx[t] = r)) &&
                (!d.skip_bound && d.bound[t] && d.bound[t](r), p && ht(e, t)),
              n
            );
          })
        : []),
      d.update(),
      (p = !0),
      o(d.before_update),
      (d.fragment = !!l && l(d.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(n.target);
        d.fragment && d.fragment.l(t), t.forEach(k);
      } else d.fragment && d.fragment.c();
      n.intro && ut(e.$$.fragment),
        $t(e, n.target, n.anchor, n.customElement),
        et();
    }
    F(f);
  }
  class vt {
    $destroy() {
      mt(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  function yt(e) {
    let n;
    return {
      c() {
        (n = B('header')),
          (n.innerHTML =
            '<h1 class="svelte-1g0p5uc"><img src="./img/poll_ninja_logo.svg" alt="Poll Ninja Logo" class="svelte-1g0p5uc"/></h1>'),
          P(n, 'class', 'svelte-1g0p5uc');
      },
      m(t, e) {
        A(t, n, e);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && k(n);
      },
    };
  }
  class wt extends vt {
    constructor(t) {
      super(), gt(this, t, null, yt, i, {});
    }
  }
  function bt(e) {
    let n;
    return {
      c() {
        (n = B('footer')),
          (n.innerHTML =
            '<div class="copyright svelte-6xwcu5">Copyright 2020 Poll Ninja</div>'),
          P(n, 'class', 'svelte-6xwcu5');
      },
      m(t, e) {
        A(t, n, e);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && k(n);
      },
    };
  }
  class xt extends vt {
    constructor(t) {
      super(), gt(this, t, null, bt, i, {});
    }
  }
  const _t = [];
  function At(e, n = t) {
    let s;
    const r = new Set();
    function o(t) {
      if (i(e, t) && ((e = t), s)) {
        const t = !_t.length;
        for (const t of r) t[1](), _t.push(t, e);
        if (t) {
          for (let t = 0; t < _t.length; t += 2) _t[t][0](_t[t + 1]);
          _t.length = 0;
        }
      }
    }
    return {
      set: o,
      update: function (t) {
        o(t(e));
      },
      subscribe: function (l, i = t) {
        const c = [l, i];
        return (
          r.add(c),
          1 === r.size && (s = n(o) || t),
          l(e),
          () => {
            r.delete(c), 0 === r.size && (s(), (s = null));
          }
        );
      },
    };
  }
  const kt = At([
    {
      id: 1,
      question: 'Python or JavaScript?',
      answerA: 'Python',
      answerB: 'JavaScript',
      votesA: 9,
      votesB: 15,
    },
  ]);
  function Bt(t) {
    let e, n, s, r, o;
    const l = t[4].default,
      i = u(l, t, t[3], null);
    return {
      c() {
        (e = B('button')),
          i && i.c(),
          P(e, 'class', (n = $(t[0]) + ' svelte-1mjty3u')),
          M(e, 'flat', t[1]),
          M(e, 'inverse', t[2]);
      },
      m(n, l) {
        A(n, e, l),
          i && i.m(e, null),
          (s = !0),
          r || ((o = q(e, 'click', t[5])), (r = !0));
      },
      p(t, [r]) {
        i &&
          i.p &&
          (!s || 8 & r) &&
          d(i, l, t, t[3], s ? f(l, t[3], r, null) : p(t[3]), null),
          (!s || (1 & r && n !== (n = $(t[0]) + ' svelte-1mjty3u'))) &&
            P(e, 'class', n),
          3 & r && M(e, 'flat', t[1]),
          5 & r && M(e, 'inverse', t[2]);
      },
      i(t) {
        s || (ut(i, t), (s = !0));
      },
      o(t) {
        at(i, t), (s = !1);
      },
      d(t) {
        t && k(e), i && i.d(t), (r = !1), o();
      },
    };
  }
  function Ct(t, e, n) {
    let { $$slots: s = {}, $$scope: r } = e,
      { type: o = 'primary' } = e,
      { flat: l = !1 } = e,
      { inverse: i = !1 } = e;
    return (
      (t.$$set = (t) => {
        'type' in t && n(0, (o = t.type)),
          'flat' in t && n(1, (l = t.flat)),
          'inverse' in t && n(2, (i = t.inverse)),
          '$$scope' in t && n(3, (r = t.$$scope));
      }),
      [
        o,
        l,
        i,
        r,
        s,
        function (e) {
          J.call(this, t, e);
        },
      ]
    );
  }
  class Et extends vt {
    constructor(t) {
      super(), gt(this, t, Ct, Bt, i, { type: 0, flat: 1, inverse: 2 });
    }
  }
  function qt(t) {
    let e;
    return {
      c() {
        e = C('Add Poll');
      },
      m(t, n) {
        A(t, e, n);
      },
      d(t) {
        t && k(e);
      },
    };
  }
  function Pt(t) {
    let e,
      n,
      s,
      r,
      l,
      i,
      c,
      u,
      a,
      f,
      d,
      p,
      $,
      m,
      h,
      g,
      v,
      y,
      w,
      x,
      _,
      z,
      M,
      R,
      N,
      O,
      D,
      T,
      I,
      L = t[1].question + '',
      F = t[1].answerA + '',
      H = t[1].answerB + '';
    return (
      (O = new Et({
        props: { $$slots: { default: [qt] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = B('form')),
            (n = B('div')),
            (s = B('label')),
            (s.textContent = 'Poll Question:'),
            (r = E()),
            (l = B('input')),
            (i = E()),
            (c = B('div')),
            (u = C(L)),
            (a = E()),
            (f = B('div')),
            (d = B('label')),
            (d.textContent = 'Answer A value:'),
            (p = E()),
            ($ = B('input')),
            (m = E()),
            (h = B('div')),
            (g = C(F)),
            (v = E()),
            (y = B('div')),
            (w = B('label')),
            (w.textContent = 'Answer B value:'),
            (x = E()),
            (_ = B('input')),
            (z = E()),
            (M = B('div')),
            (R = C(H)),
            (N = E()),
            pt(O.$$.fragment),
            P(s, 'for', 'question'),
            P(s, 'class', 'svelte-1ub4sem'),
            P(l, 'type', 'text'),
            P(l, 'id', 'question'),
            P(l, 'class', 'svelte-1ub4sem'),
            P(c, 'class', 'error svelte-1ub4sem'),
            P(n, 'class', 'form-field svelte-1ub4sem'),
            P(d, 'for', 'answer-a'),
            P(d, 'class', 'svelte-1ub4sem'),
            P($, 'type', 'text'),
            P($, 'id', 'answer-a'),
            P($, 'class', 'svelte-1ub4sem'),
            P(h, 'class', 'error svelte-1ub4sem'),
            P(f, 'class', 'form-field svelte-1ub4sem'),
            P(w, 'for', 'answer-b'),
            P(w, 'class', 'svelte-1ub4sem'),
            P(_, 'type', 'text'),
            P(_, 'id', 'answer-b'),
            P(_, 'class', 'svelte-1ub4sem'),
            P(M, 'class', 'error svelte-1ub4sem'),
            P(y, 'class', 'form-field svelte-1ub4sem'),
            P(e, 'class', 'svelte-1ub4sem');
        },
        m(o, k) {
          var B;
          A(o, e, k),
            b(e, n),
            b(n, s),
            b(n, r),
            b(n, l),
            S(l, t[0].question),
            b(n, i),
            b(n, c),
            b(c, u),
            b(e, a),
            b(e, f),
            b(f, d),
            b(f, p),
            b(f, $),
            S($, t[0].answerA),
            b(f, m),
            b(f, h),
            b(h, g),
            b(e, v),
            b(e, y),
            b(y, w),
            b(y, x),
            b(y, _),
            S(_, t[0].answerB),
            b(y, z),
            b(y, M),
            b(M, R),
            b(e, N),
            $t(O, e, null),
            (D = !0),
            T ||
              ((I = [
                q(l, 'input', t[3]),
                q($, 'input', t[4]),
                q(_, 'input', t[5]),
                q(
                  e,
                  'submit',
                  ((B = t[2]),
                  function (t) {
                    return t.preventDefault(), B.call(this, t);
                  })
                ),
              ]),
              (T = !0));
        },
        p(t, [e]) {
          1 & e && l.value !== t[0].question && S(l, t[0].question),
            (!D || 2 & e) && L !== (L = t[1].question + '') && j(u, L),
            1 & e && $.value !== t[0].answerA && S($, t[0].answerA),
            (!D || 2 & e) && F !== (F = t[1].answerA + '') && j(g, F),
            1 & e && _.value !== t[0].answerB && S(_, t[0].answerB),
            (!D || 2 & e) && H !== (H = t[1].answerB + '') && j(R, H);
          const n = {};
          256 & e && (n.$$scope = { dirty: e, ctx: t }), O.$set(n);
        },
        i(t) {
          D || (ut(O.$$.fragment, t), (D = !0));
        },
        o(t) {
          at(O.$$.fragment, t), (D = !1);
        },
        d(t) {
          t && k(e), mt(O), (T = !1), o(I);
        },
      }
    );
  }
  function jt(t, e, n) {
    let s = H(),
      r = { question: '', answerA: '', answerB: '' },
      o = { question: '', answerA: '', answerB: '' },
      l = !1;
    return [
      r,
      o,
      () => {
        if (
          ((l = !0),
          r.question.trim().length < 5
            ? ((l = !1),
              n(1, (o.question = 'Question must be at least 5 chars long'), o))
            : n(1, (o.question = ''), o),
          r.answerA.trim().length < 1
            ? ((l = !1), n(1, (o.answerA = 'Answer A cannot be empty'), o))
            : n(1, (o.answerA = ''), o),
          r.answerB.trim().length < 1
            ? ((l = !1), n(1, (o.answerB = 'Answer B cannot be empty'), o))
            : n(1, (o.answerB = ''), o),
          l)
        ) {
          let t = { ...r, id: Math.random(), votesA: 0, votesB: 0 };
          kt.update((e) => [t, ...e]), s('add');
        }
      },
      function () {
        (r.question = this.value), n(0, r);
      },
      function () {
        (r.answerA = this.value), n(0, r);
      },
      function () {
        (r.answerB = this.value), n(0, r);
      },
    ];
  }
  class St extends vt {
    constructor(t) {
      super(), gt(this, t, jt, Pt, i, {});
    }
  }
  function zt(t) {
    const e = t - 1;
    return e * e * e + 1;
  }
  function Mt(t, { delay: n = 0, duration: s = 400, easing: r = e } = {}) {
    const o = +getComputedStyle(t).opacity;
    return {
      delay: n,
      duration: s,
      easing: r,
      css: (t) => 'opacity: ' + t * o,
    };
  }
  function Rt(
    t,
    {
      delay: e = 0,
      duration: n = 400,
      easing: s = zt,
      start: r = 0,
      opacity: o = 0,
    } = {}
  ) {
    const l = getComputedStyle(t),
      i = +l.opacity,
      c = 'none' === l.transform ? '' : l.transform,
      u = 1 - r,
      a = i * (1 - o);
    return {
      delay: e,
      duration: n,
      easing: s,
      css: (t, e) =>
        `\n\t\t\ttransform: ${c} scale(${1 - u * e});\n\t\t\topacity: ${
          i - a * e
        }\n\t\t`,
    };
  }
  function Nt(t, { from: e, to: n }, s = {}) {
    const r = getComputedStyle(t),
      o = 'none' === r.transform ? '' : r.transform,
      [i, c] = r.transformOrigin.split(' ').map(parseFloat),
      u = e.left + (e.width * i) / n.width - (n.left + i),
      a = e.top + (e.height * c) / n.height - (n.top + c),
      {
        delay: f = 0,
        duration: d = (t) => 120 * Math.sqrt(t),
        easing: p = zt,
      } = s;
    return {
      delay: f,
      duration: l(d) ? d(Math.sqrt(u * u + a * a)) : d,
      easing: p,
      css: (t, s) => {
        const r = s * u,
          l = s * a,
          i = t + (s * e.width) / n.width,
          c = t + (s * e.height) / n.height;
        return `transform: ${o} translate(${r}px, ${l}px) scale(${i}, ${c});`;
      },
    };
  }
  function Ot(t) {
    let e, n;
    const s = t[1].default,
      r = u(s, t, t[0], null);
    return {
      c() {
        (e = B('div')), r && r.c(), P(e, 'class', 'card svelte-clb1pe');
      },
      m(t, s) {
        A(t, e, s), r && r.m(e, null), (n = !0);
      },
      p(t, [e]) {
        r &&
          r.p &&
          (!n || 1 & e) &&
          d(r, s, t, t[0], n ? f(s, t[0], e, null) : p(t[0]), null);
      },
      i(t) {
        n || (ut(r, t), (n = !0));
      },
      o(t) {
        at(r, t), (n = !1);
      },
      d(t) {
        t && k(e), r && r.d(t);
      },
    };
  }
  function Dt(t, e, n) {
    let { $$slots: s = {}, $$scope: r } = e;
    return (
      (t.$$set = (t) => {
        '$$scope' in t && n(0, (r = t.$$scope));
      }),
      [r, s]
    );
  }
  class Tt extends vt {
    constructor(t) {
      super(), gt(this, t, Dt, Ot, i, {});
    }
  }
  function It(t) {
    return '[object Date]' === Object.prototype.toString.call(t);
  }
  function Lt(t, e) {
    if (t === e || t != t) return () => t;
    const n = typeof t;
    if (n !== typeof e || Array.isArray(t) !== Array.isArray(e))
      throw new Error('Cannot interpolate values of different type');
    if (Array.isArray(t)) {
      const n = e.map((e, n) => Lt(t[n], e));
      return (t) => n.map((e) => e(t));
    }
    if ('object' === n) {
      if (!t || !e) throw new Error('Object cannot be null');
      if (It(t) && It(e)) {
        t = t.getTime();
        const n = (e = e.getTime()) - t;
        return (e) => new Date(t + e * n);
      }
      const n = Object.keys(e),
        s = {};
      return (
        n.forEach((n) => {
          s[n] = Lt(t[n], e[n]);
        }),
        (t) => {
          const e = {};
          return (
            n.forEach((n) => {
              e[n] = s[n](t);
            }),
            e
          );
        }
      );
    }
    if ('number' === n) {
      const n = e - t;
      return (e) => t + e * n;
    }
    throw new Error(`Cannot interpolate ${n} values`);
  }
  function Ft(t, s = {}) {
    const r = At(t);
    let o,
      l = t;
    function i(i, c) {
      if (null == t) return r.set((t = i)), Promise.resolve();
      l = i;
      let u = o,
        a = !1,
        {
          delay: f = 0,
          duration: d = 400,
          easing: p = e,
          interpolate: $ = Lt,
        } = n(n({}, s), c);
      if (0 === d)
        return u && (u.abort(), (u = null)), r.set((t = l)), Promise.resolve();
      const m = h() + f;
      let g;
      return (
        (o = w((e) => {
          if (e < m) return !0;
          a ||
            ((g = $(t, i)), 'function' == typeof d && (d = d(t, i)), (a = !0)),
            u && (u.abort(), (u = null));
          const n = e - m;
          return n > d ? (r.set((t = i)), !1) : (r.set((t = g(p(n / d)))), !0);
        })),
        o.promise
      );
    }
    return { set: i, update: (e, n) => i(e(l, t), n), subscribe: r.subscribe };
  }
  function Ht(t) {
    let e;
    return {
      c() {
        e = C('Delete');
      },
      m(t, n) {
        A(t, e, n);
      },
      d(t) {
        t && k(e);
      },
    };
  }
  function Jt(t) {
    let e,
      n,
      s,
      r,
      l,
      i,
      c,
      u,
      a,
      f,
      d,
      p,
      $,
      m,
      h,
      g,
      v,
      y,
      w,
      x,
      _,
      S,
      M,
      R,
      N,
      O,
      D,
      T,
      I,
      L,
      F,
      H = t[0].question + '',
      J = t[0].answerA + '',
      Q = t[0].votesA + '',
      G = t[0].answerB + '',
      K = t[0].votesB + '';
    return (
      (T = new Et({
        props: { flat: !0, $$slots: { default: [Ht] }, $$scope: { ctx: t } },
      })),
      T.$on('click', t[12]),
      {
        c() {
          (e = B('div')),
            (n = B('h3')),
            (s = C(H)),
            (r = E()),
            (l = B('p')),
            (i = C('Total votes: ')),
            (c = C(t[1])),
            (u = E()),
            (a = B('div')),
            (f = B('div')),
            (d = E()),
            (p = B('span')),
            ($ = C(J)),
            (m = C(' (')),
            (h = C(Q)),
            (g = C(' votes)')),
            (v = E()),
            (y = B('div')),
            (w = B('div')),
            (x = E()),
            (_ = B('span')),
            (S = C(G)),
            (M = C(' (')),
            (R = C(K)),
            (N = C(' votes)')),
            (O = E()),
            (D = B('div')),
            pt(T.$$.fragment),
            P(n, 'class', 'svelte-1prr6z8'),
            P(l, 'class', 'svelte-1prr6z8'),
            P(f, 'class', 'percent percent-a svelte-1prr6z8'),
            z(f, 'width', t[3] + '%'),
            P(p, 'class', 'svelte-1prr6z8'),
            P(a, 'class', 'answer svelte-1prr6z8'),
            P(w, 'class', 'percent percent-b svelte-1prr6z8'),
            z(w, 'width', t[2] + '%'),
            P(_, 'class', 'svelte-1prr6z8'),
            P(y, 'class', 'answer svelte-1prr6z8'),
            P(D, 'class', 'delete svelte-1prr6z8'),
            P(e, 'class', 'poll');
        },
        m(o, k) {
          A(o, e, k),
            b(e, n),
            b(n, s),
            b(e, r),
            b(e, l),
            b(l, i),
            b(l, c),
            b(e, u),
            b(e, a),
            b(a, f),
            b(a, d),
            b(a, p),
            b(p, $),
            b(p, m),
            b(p, h),
            b(p, g),
            b(e, v),
            b(e, y),
            b(y, w),
            b(y, x),
            b(y, _),
            b(_, S),
            b(_, M),
            b(_, R),
            b(_, N),
            b(e, O),
            b(e, D),
            $t(T, D, null),
            (I = !0),
            L || ((F = [q(a, 'click', t[10]), q(y, 'click', t[11])]), (L = !0));
        },
        p(t, e) {
          (!I || 1 & e) && H !== (H = t[0].question + '') && j(s, H),
            (!I || 2 & e) && j(c, t[1]),
            (!I || 8 & e) && z(f, 'width', t[3] + '%'),
            (!I || 1 & e) && J !== (J = t[0].answerA + '') && j($, J),
            (!I || 1 & e) && Q !== (Q = t[0].votesA + '') && j(h, Q),
            (!I || 4 & e) && z(w, 'width', t[2] + '%'),
            (!I || 1 & e) && G !== (G = t[0].answerB + '') && j(S, G),
            (!I || 1 & e) && K !== (K = t[0].votesB + '') && j(R, K);
          const n = {};
          8192 & e && (n.$$scope = { dirty: e, ctx: t }), T.$set(n);
        },
        i(t) {
          I || (ut(T.$$.fragment, t), (I = !0));
        },
        o(t) {
          at(T.$$.fragment, t), (I = !1);
        },
        d(t) {
          t && k(e), mt(T), (L = !1), o(F);
        },
      }
    );
  }
  function Qt(t) {
    let e, n;
    return (
      (e = new Tt({
        props: { $$slots: { default: [Jt] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          pt(e.$$.fragment);
        },
        m(t, s) {
          $t(e, t, s), (n = !0);
        },
        p(t, [n]) {
          const s = {};
          8207 & n && (s.$$scope = { dirty: n, ctx: t }), e.$set(s);
        },
        i(t) {
          n || (ut(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          at(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          mt(e, t);
        },
      }
    );
  }
  function Gt(t, e, n) {
    let s,
      r,
      o,
      l,
      i,
      { poll: u } = e;
    const a = Ft(0);
    c(t, a, (t) => n(3, (i = t)));
    const f = Ft(0);
    c(t, f, (t) => n(2, (l = t)));
    const d = (t, e) => {
        kt.update((n) => {
          let s = [...n],
            r = s.find((t) => t.id == e);
          return 'a' === t && r.votesA++, 'b' === t && r.votesB++, s;
        });
      },
      p = (t) => {
        kt.update((e) => e.filter((e) => e.id != t));
      };
    return (
      (t.$$set = (t) => {
        'poll' in t && n(0, (u = t.poll));
      }),
      (t.$$.update = () => {
        1 & t.$$.dirty && n(1, (s = u.votesA + u.votesB)),
          3 & t.$$.dirty && n(9, (r = Math.floor((100 / s) * u.votesA) || 0)),
          3 & t.$$.dirty && n(8, (o = Math.floor((100 / s) * u.votesB) || 0)),
          512 & t.$$.dirty && a.set(r),
          256 & t.$$.dirty && f.set(o),
          12 & t.$$.dirty && console.log(i, l);
      }),
      [
        u,
        s,
        l,
        i,
        a,
        f,
        d,
        p,
        o,
        r,
        () => d('a', u.id),
        () => d('b', u.id),
        () => p(u.id),
      ]
    );
  }
  class Kt extends vt {
    constructor(t) {
      super(), gt(this, t, Gt, Qt, i, { poll: 0 });
    }
  }
  function Ut(t, e, n) {
    const s = t.slice();
    return (s[1] = e[n]), s;
  }
  function Vt(n, s) {
    let r,
      i,
      c,
      u,
      a,
      f,
      d,
      p = t;
    return (
      (i = new Kt({ props: { poll: s[1] } })),
      {
        key: n,
        first: null,
        c() {
          (r = B('div')), pt(i.$$.fragment), (c = E()), (this.first = r);
        },
        m(t, e) {
          A(t, r, e), $t(i, r, null), b(r, c), (d = !0);
        },
        p(t, e) {
          s = t;
          const n = {};
          1 & e && (n.poll = s[1]), i.$set(n);
        },
        r() {
          f = r.getBoundingClientRect();
        },
        f() {
          !(function (t) {
            const e = getComputedStyle(t);
            if ('absolute' !== e.position && 'fixed' !== e.position) {
              const { width: n, height: s } = e,
                r = t.getBoundingClientRect();
              (t.style.position = 'absolute'),
                (t.style.width = n),
                (t.style.height = s),
                L(t, r);
            }
          })(r),
            p(),
            L(r, f);
        },
        a() {
          p(),
            (p = (function (n, s, r, o) {
              if (!s) return t;
              const l = n.getBoundingClientRect();
              if (
                s.left === l.left &&
                s.right === l.right &&
                s.top === l.top &&
                s.bottom === l.bottom
              )
                return t;
              const {
                delay: i = 0,
                duration: c = 300,
                easing: u = e,
                start: a = h() + i,
                end: f = a + c,
                tick: d = t,
                css: p,
              } = r(n, { from: s, to: l }, o);
              let $,
                m = !0,
                g = !1;
              function v() {
                p && I(n, $), (m = !1);
              }
              return (
                w((t) => {
                  if (
                    (!g && t >= a && (g = !0),
                    g && t >= f && (d(1, 0), v()),
                    !m)
                  )
                    return !1;
                  if (g) {
                    const e = 0 + 1 * u((t - a) / c);
                    d(e, 1 - e);
                  }
                  return !0;
                }),
                p && ($ = T(n, 0, 1, c, i, u, p)),
                i || (g = !0),
                d(0, 1),
                v
              );
            })(r, f, Nt, { duration: 500 }));
        },
        i(n) {
          d ||
            (ut(i.$$.fragment, n),
            X(() => {
              a && a.end(1),
                (u = (function (n, s, r) {
                  let o,
                    i,
                    c = s(n, r),
                    u = !1,
                    a = 0;
                  function f() {
                    o && I(n, o);
                  }
                  function d() {
                    const {
                      delay: s = 0,
                      duration: r = 300,
                      easing: l = e,
                      tick: d = t,
                      css: p,
                    } = c || ft;
                    p && (o = T(n, 0, 1, r, s, l, p, a++)), d(0, 1);
                    const $ = h() + s,
                      m = $ + r;
                    i && i.abort(),
                      (u = !0),
                      X(() => rt(n, !0, 'start')),
                      (i = w((t) => {
                        if (u) {
                          if (t >= m)
                            return d(1, 0), rt(n, !0, 'end'), f(), (u = !1);
                          if (t >= $) {
                            const e = l((t - $) / r);
                            d(e, 1 - e);
                          }
                        }
                        return u;
                      }));
                  }
                  let p = !1;
                  return {
                    start() {
                      p ||
                        ((p = !0),
                        I(n),
                        l(c) ? ((c = c()), st().then(d)) : d());
                    },
                    invalidate() {
                      p = !1;
                    },
                    end() {
                      u && (f(), (u = !1));
                    },
                  };
                })(r, Mt, {})),
                u.start();
            }),
            (d = !0));
        },
        o(n) {
          at(i.$$.fragment, n),
            u && u.invalidate(),
            n &&
              (a = (function (n, s, r) {
                let i,
                  c = s(n, r),
                  u = !0;
                const a = lt;
                function f() {
                  const {
                    delay: s = 0,
                    duration: r = 300,
                    easing: l = e,
                    tick: f = t,
                    css: d,
                  } = c || ft;
                  d && (i = T(n, 1, 0, r, s, l, d));
                  const p = h() + s,
                    $ = p + r;
                  X(() => rt(n, !1, 'start')),
                    w((t) => {
                      if (u) {
                        if (t >= $)
                          return f(0, 1), rt(n, !1, 'end'), --a.r || o(a.c), !1;
                        if (t >= p) {
                          const e = l((t - p) / r);
                          f(1 - e, e);
                        }
                      }
                      return u;
                    });
                }
                return (
                  (a.r += 1),
                  l(c)
                    ? st().then(() => {
                        (c = c()), f();
                      })
                    : f(),
                  {
                    end(t) {
                      t && c.tick && c.tick(1, 0),
                        u && (i && I(n, i), (u = !1));
                    },
                  }
                );
              })(r, Rt, {})),
            (d = !1);
        },
        d(t) {
          t && k(r), mt(i), t && a && a.end();
        },
      }
    );
  }
  function Wt(t) {
    let e,
      n,
      s = [],
      r = new Map(),
      o = t[0];
    const l = (t) => t[1].id;
    for (let e = 0; e < o.length; e += 1) {
      let n = Ut(t, o, e),
        i = l(n);
      r.set(i, (s[e] = Vt(i, n)));
    }
    return {
      c() {
        e = B('div');
        for (let t = 0; t < s.length; t += 1) s[t].c();
        P(e, 'class', 'poll-list svelte-5ar2qy');
      },
      m(t, r) {
        A(t, e, r);
        for (let t = 0; t < s.length; t += 1) s[t].m(e, null);
        n = !0;
      },
      p(t, [n]) {
        if (1 & n) {
          (o = t[0]), it();
          for (let t = 0; t < s.length; t += 1) s[t].r();
          s = (function (t, e, n, s, r, o, l, i, c, u, a, f) {
            let d = t.length,
              p = o.length,
              $ = d;
            const m = {};
            for (; $--; ) m[t[$].key] = $;
            const h = [],
              g = new Map(),
              v = new Map();
            for ($ = p; $--; ) {
              const t = f(r, o, $),
                i = n(t);
              let c = l.get(i);
              c ? s && c.p(t, e) : ((c = u(i, t)), c.c()),
                g.set(i, (h[$] = c)),
                i in m && v.set(i, Math.abs($ - m[i]));
            }
            const y = new Set(),
              w = new Set();
            function b(t) {
              ut(t, 1), t.m(i, a), l.set(t.key, t), (a = t.first), p--;
            }
            for (; d && p; ) {
              const e = h[p - 1],
                n = t[d - 1],
                s = e.key,
                r = n.key;
              e === n
                ? ((a = e.first), d--, p--)
                : g.has(r)
                ? !l.has(s) || y.has(s)
                  ? b(e)
                  : w.has(r)
                  ? d--
                  : v.get(s) > v.get(r)
                  ? (w.add(s), b(e))
                  : (y.add(r), d--)
                : (c(n, l), d--);
            }
            for (; d--; ) {
              const e = t[d];
              g.has(e.key) || c(e, l);
            }
            for (; p; ) b(h[p - 1]);
            return h;
          })(s, n, l, 1, t, o, r, e, dt, Vt, null, Ut);
          for (let t = 0; t < s.length; t += 1) s[t].a();
          ct();
        }
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < o.length; t += 1) ut(s[t]);
          n = !0;
        }
      },
      o(t) {
        for (let t = 0; t < s.length; t += 1) at(s[t]);
        n = !1;
      },
      d(t) {
        t && k(e);
        for (let t = 0; t < s.length; t += 1) s[t].d();
      },
    };
  }
  function Xt(t, e, n) {
    let s;
    return c(t, kt, (t) => n(0, (s = t))), [s];
  }
  class Yt extends vt {
    constructor(t) {
      super(), gt(this, t, Xt, Wt, i, {});
    }
  }
  function Zt(t, e, n) {
    const s = t.slice();
    return (s[4] = e[n]), s;
  }
  function te(t) {
    let e,
      n,
      s,
      r,
      o,
      l,
      i = t[4] + '';
    function c() {
      return t[3](t[4]);
    }
    return {
      c() {
        (e = B('li')),
          (n = B('div')),
          (s = C(i)),
          (r = E()),
          P(n, 'class', 'svelte-1l1mpdp'),
          M(n, 'active', t[4] === t[1]),
          P(e, 'class', 'svelte-1l1mpdp');
      },
      m(t, i) {
        A(t, e, i),
          b(e, n),
          b(n, s),
          b(e, r),
          o || ((l = q(e, 'click', c)), (o = !0));
      },
      p(e, r) {
        (t = e),
          1 & r && i !== (i = t[4] + '') && j(s, i),
          3 & r && M(n, 'active', t[4] === t[1]);
      },
      d(t) {
        t && k(e), (o = !1), l();
      },
    };
  }
  function ee(e) {
    let n,
      s,
      r = e[0],
      o = [];
    for (let t = 0; t < r.length; t += 1) o[t] = te(Zt(e, r, t));
    return {
      c() {
        (n = B('div')), (s = B('ul'));
        for (let t = 0; t < o.length; t += 1) o[t].c();
        P(s, 'class', 'svelte-1l1mpdp'), P(n, 'class', 'tabs svelte-1l1mpdp');
      },
      m(t, e) {
        A(t, n, e), b(n, s);
        for (let t = 0; t < o.length; t += 1) o[t].m(s, null);
      },
      p(t, [e]) {
        if (7 & e) {
          let n;
          for (r = t[0], n = 0; n < r.length; n += 1) {
            const l = Zt(t, r, n);
            o[n] ? o[n].p(l, e) : ((o[n] = te(l)), o[n].c(), o[n].m(s, null));
          }
          for (; n < o.length; n += 1) o[n].d(1);
          o.length = r.length;
        }
      },
      i: t,
      o: t,
      d(t) {
        t && k(n),
          (function (t, e) {
            for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
          })(o, t);
      },
    };
  }
  function ne(t, e, n) {
    let s = H(),
      { items: r } = e,
      { activeItem: o } = e;
    return (
      (t.$$set = (t) => {
        'items' in t && n(0, (r = t.items)),
          'activeItem' in t && n(1, (o = t.activeItem));
      }),
      [r, o, s, (t) => s('tabChange', t)]
    );
  }
  class se extends vt {
    constructor(t) {
      super(), gt(this, t, ne, ee, i, { items: 0, activeItem: 1 });
    }
  }
  function re(e) {
    let n, s;
    return (
      (n = new St({})),
      n.$on('add', e[3]),
      {
        c() {
          pt(n.$$.fragment);
        },
        m(t, e) {
          $t(n, t, e), (s = !0);
        },
        p: t,
        i(t) {
          s || (ut(n.$$.fragment, t), (s = !0));
        },
        o(t) {
          at(n.$$.fragment, t), (s = !1);
        },
        d(t) {
          mt(n, t);
        },
      }
    );
  }
  function oe(e) {
    let n, s;
    return (
      (n = new Yt({})),
      {
        c() {
          pt(n.$$.fragment);
        },
        m(t, e) {
          $t(n, t, e), (s = !0);
        },
        p: t,
        i(t) {
          s || (ut(n.$$.fragment, t), (s = !0));
        },
        o(t) {
          at(n.$$.fragment, t), (s = !1);
        },
        d(t) {
          mt(n, t);
        },
      }
    );
  }
  function le(t) {
    let e, n, s, r, o, l, i, c, u, a;
    (e = new wt({})),
      (r = new se({ props: { activeItem: t[0], items: t[1] } })),
      r.$on('tabChange', t[2]);
    const f = [oe, re],
      d = [];
    function p(t, e) {
      return 'Current Polls' === t[0] ? 0 : 'Add New Poll' === t[0] ? 1 : -1;
    }
    return (
      ~(l = p(t)) && (i = d[l] = f[l](t)),
      (u = new xt({})),
      {
        c() {
          pt(e.$$.fragment),
            (n = E()),
            (s = B('main')),
            pt(r.$$.fragment),
            (o = E()),
            i && i.c(),
            (c = E()),
            pt(u.$$.fragment),
            P(s, 'class', 'svelte-gmttu');
        },
        m(t, i) {
          $t(e, t, i),
            A(t, n, i),
            A(t, s, i),
            $t(r, s, null),
            b(s, o),
            ~l && d[l].m(s, null),
            A(t, c, i),
            $t(u, t, i),
            (a = !0);
        },
        p(t, [e]) {
          const n = {};
          1 & e && (n.activeItem = t[0]), r.$set(n);
          let o = l;
          (l = p(t)),
            l === o
              ? ~l && d[l].p(t, e)
              : (i &&
                  (it(),
                  at(d[o], 1, 1, () => {
                    d[o] = null;
                  }),
                  ct()),
                ~l
                  ? ((i = d[l]),
                    i ? i.p(t, e) : ((i = d[l] = f[l](t)), i.c()),
                    ut(i, 1),
                    i.m(s, null))
                  : (i = null));
        },
        i(t) {
          a ||
            (ut(e.$$.fragment, t),
            ut(r.$$.fragment, t),
            ut(i),
            ut(u.$$.fragment, t),
            (a = !0));
        },
        o(t) {
          at(e.$$.fragment, t),
            at(r.$$.fragment, t),
            at(i),
            at(u.$$.fragment, t),
            (a = !1);
        },
        d(t) {
          mt(e, t),
            t && k(n),
            t && k(s),
            mt(r),
            ~l && d[l].d(),
            t && k(c),
            mt(u, t);
        },
      }
    );
  }
  function ie(t, e, n) {
    let s = 'Current Polls';
    return [
      s,
      ['Current Polls', 'Add New Poll'],
      (t) => n(0, (s = t.detail)),
      () => {
        n(0, (s = 'Current Polls'));
      },
    ];
  }
  return new (class extends vt {
    constructor(t) {
      super(), gt(this, t, ie, le, i, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
