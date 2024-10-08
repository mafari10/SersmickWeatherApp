var z7 = Object.defineProperty,
  V7 = Object.defineProperties;
var w7 = Object.getOwnPropertyDescriptors;
var R0 = Object.getOwnPropertySymbols;
var x7 = Object.prototype.hasOwnProperty,
  b7 = Object.prototype.propertyIsEnumerable;
var _0 = (e, t, r) =>
    t in e
      ? z7(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  H = (e, t) => {
    for (var r in (t ||= {})) x7.call(t, r) && _0(e, r, t[r]);
    if (R0) for (var r of R0(t)) b7.call(t, r) && _0(e, r, t[r]);
    return e;
  },
  J = (e, t) => V7(e, w7(t));
var E4 = (e, t, r) =>
  new Promise((n, c) => {
    var i = (s) => {
        try {
          o(r.next(s));
        } catch (l) {
          c(l);
        }
      },
      a = (s) => {
        try {
          o(r.throw(s));
        } catch (l) {
          c(l);
        }
      },
      o = (s) => (s.done ? n(s.value) : Promise.resolve(s.value).then(i, a));
    o((r = r.apply(e, t)).next());
  });
var Zn = null;
var Yn = 1,
  P0 = Symbol("SIGNAL");
function $(e) {
  let t = Zn;
  return (Zn = e), t;
}
function O0() {
  return Zn;
}
var Qn = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function L7(e) {
  if (!(t6(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Yn)) {
    if (!e.producerMustRecompute(e) && !Kn(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = Yn);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Yn);
  }
}
function Xn(e) {
  return e && (e.nextProducerIndex = 0), $(e);
}
function F0(e, t) {
  if (
    ($(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (t6(e))
      for (let r = e.nextProducerIndex; r < e.producerNode.length; r++)
        e6(e.producerNode[r], e.producerIndexOfThis[r]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function Kn(e) {
  n6(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let r = e.producerNode[t],
      n = e.producerLastReadVersion[t];
    if (n !== r.version || (L7(r), n !== r.version)) return !0;
  }
  return !1;
}
function Jn(e) {
  if ((n6(e), t6(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      e6(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function e6(e, t) {
  if ((D7(e), e.liveConsumerNode.length === 1 && S7(e)))
    for (let n = 0; n < e.producerNode.length; n++)
      e6(e.producerNode[n], e.producerIndexOfThis[n]);
  let r = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[r]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[r]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let n = e.liveConsumerIndexOfThis[t],
      c = e.liveConsumerNode[t];
    n6(c), (c.producerIndexOfThis[n] = t);
  }
}
function t6(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function n6(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function D7(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function S7(e) {
  return e.producerNode !== void 0;
}
function N7() {
  throw new Error();
}
var E7 = N7;
function B0(e) {
  E7 = e;
}
function E(e) {
  return typeof e == "function";
}
function be(e) {
  let r = e((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (r.prototype = Object.create(Error.prototype)),
    (r.prototype.constructor = r),
    r
  );
}
var I4 = be(
  (e) =>
    function (r) {
      e(this),
        (this.message = r
          ? `${r.length} errors occurred during unsubscription:
${r.map((n, c) => `${c + 1}) ${n.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = r);
    }
);
function M3(e, t) {
  if (e) {
    let r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var i2 = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: r } = this;
      if (r)
        if (((this._parentage = null), Array.isArray(r)))
          for (let i of r) i.remove(this);
        else r.remove(this);
      let { initialTeardown: n } = this;
      if (E(n))
        try {
          n();
        } catch (i) {
          t = i instanceof I4 ? i.errors : [i];
        }
      let { _finalizers: c } = this;
      if (c) {
        this._finalizers = null;
        for (let i of c)
          try {
            j0(i);
          } catch (a) {
            (t = t ?? []),
              a instanceof I4 ? (t = [...t, ...a.errors]) : t.push(a);
          }
      }
      if (t) throw new I4(t);
    }
  }
  add(t) {
    var r;
    if (t && t !== this)
      if (this.closed) j0(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: r } = this;
    return r === t || (Array.isArray(r) && r.includes(t));
  }
  _addParent(t) {
    let { _parentage: r } = this;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }
  _removeParent(t) {
    let { _parentage: r } = this;
    r === t ? (this._parentage = null) : Array.isArray(r) && M3(r, t);
  }
  remove(t) {
    let { _finalizers: r } = this;
    r && M3(r, t), t instanceof e && t._removeParent(this);
  }
};
i2.EMPTY = (() => {
  let e = new i2();
  return (e.closed = !0), e;
})();
var r6 = i2.EMPTY;
function A4(e) {
  return (
    e instanceof i2 ||
    (e && "closed" in e && E(e.remove) && E(e.add) && E(e.unsubscribe))
  );
}
function j0(e) {
  E(e) ? e() : e.unsubscribe();
}
var B2 = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Le = {
  setTimeout(e, t, ...r) {
    let { delegate: n } = Le;
    return n?.setTimeout ? n.setTimeout(e, t, ...r) : setTimeout(e, t, ...r);
  },
  clearTimeout(e) {
    let { delegate: t } = Le;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function T4(e) {
  Le.setTimeout(() => {
    let { onUnhandledError: t } = B2;
    if (t) t(e);
    else throw e;
  });
}
function C3() {}
var U0 = c6("C", void 0, void 0);
function $0(e) {
  return c6("E", void 0, e);
}
function W0(e) {
  return c6("N", e, void 0);
}
function c6(e, t, r) {
  return { kind: e, value: t, error: r };
}
var K1 = null;
function De(e) {
  if (B2.useDeprecatedSynchronousErrorHandling) {
    let t = !K1;
    if ((t && (K1 = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: r, error: n } = K1;
      if (((K1 = null), r)) throw n;
    }
  } else e();
}
function q0(e) {
  B2.useDeprecatedSynchronousErrorHandling &&
    K1 &&
    ((K1.errorThrown = !0), (K1.error = e));
}
var J1 = class extends i2 {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), A4(t) && t.add(this))
          : (this.destination = T7);
    }
    static create(t, r, n) {
      return new Se(t, r, n);
    }
    next(t) {
      this.isStopped ? a6(W0(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? a6($0(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? a6(U0, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  I7 = Function.prototype.bind;
function i6(e, t) {
  return I7.call(e, t);
}
var o6 = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: r } = this;
      if (r.next)
        try {
          r.next(t);
        } catch (n) {
          k4(n);
        }
    }
    error(t) {
      let { partialObserver: r } = this;
      if (r.error)
        try {
          r.error(t);
        } catch (n) {
          k4(n);
        }
      else k4(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (r) {
          k4(r);
        }
    }
  },
  Se = class extends J1 {
    constructor(t, r, n) {
      super();
      let c;
      if (E(t) || !t)
        c = { next: t ?? void 0, error: r ?? void 0, complete: n ?? void 0 };
      else {
        let i;
        this && B2.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (c = {
              next: t.next && i6(t.next, i),
              error: t.error && i6(t.error, i),
              complete: t.complete && i6(t.complete, i),
            }))
          : (c = t);
      }
      this.destination = new o6(c);
    }
  };
function k4(e) {
  B2.useDeprecatedSynchronousErrorHandling ? q0(e) : T4(e);
}
function A7(e) {
  throw e;
}
function a6(e, t) {
  let { onStoppedNotification: r } = B2;
  r && Le.setTimeout(() => r(e, t));
}
var T7 = { closed: !0, next: C3, error: A7, complete: C3 };
var Ne = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function V2(e) {
  return e;
}
function s6(...e) {
  return l6(e);
}
function l6(e) {
  return e.length === 0
    ? V2
    : e.length === 1
    ? e[0]
    : function (r) {
        return e.reduce((n, c) => c(n), r);
      };
}
var U = (() => {
  class e {
    constructor(r) {
      r && (this._subscribe = r);
    }
    lift(r) {
      let n = new e();
      return (n.source = this), (n.operator = r), n;
    }
    subscribe(r, n, c) {
      let i = R7(r) ? r : new Se(r, n, c);
      return (
        De(() => {
          let { operator: a, source: o } = this;
          i.add(
            a ? a.call(i, o) : o ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(r) {
      try {
        return this._subscribe(r);
      } catch (n) {
        r.error(n);
      }
    }
    forEach(r, n) {
      return (
        (n = G0(n)),
        new n((c, i) => {
          let a = new Se({
            next: (o) => {
              try {
                r(o);
              } catch (s) {
                i(s), a.unsubscribe();
              }
            },
            error: i,
            complete: c,
          });
          this.subscribe(a);
        })
      );
    }
    _subscribe(r) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(r);
    }
    [Ne]() {
      return this;
    }
    pipe(...r) {
      return l6(r)(this);
    }
    toPromise(r) {
      return (
        (r = G0(r)),
        new r((n, c) => {
          let i;
          this.subscribe(
            (a) => (i = a),
            (a) => c(a),
            () => n(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function G0(e) {
  var t;
  return (t = e ?? B2.Promise) !== null && t !== void 0 ? t : Promise;
}
function k7(e) {
  return e && E(e.next) && E(e.error) && E(e.complete);
}
function R7(e) {
  return (e && e instanceof J1) || (k7(e) && A4(e));
}
function f6(e) {
  return E(e?.lift);
}
function B(e) {
  return (t) => {
    if (f6(t))
      return t.lift(function (r) {
        try {
          return e(r, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function j(e, t, r, n, c) {
  return new u6(e, t, r, n, c);
}
var u6 = class extends J1 {
  constructor(t, r, n, c, i, a) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = a),
      (this._next = r
        ? function (o) {
            try {
              r(o);
            } catch (s) {
              t.error(s);
            }
          }
        : super._next),
      (this._error = c
        ? function (o) {
            try {
              c(o);
            } catch (s) {
              t.error(s);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (o) {
              t.error(o);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: r } = this;
      super.unsubscribe(),
        !r && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Ee() {
  return B((e, t) => {
    let r = null;
    e._refCount++;
    let n = j(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        r = null;
        return;
      }
      let c = e._connection,
        i = r;
      (r = null), c && (!i || c === i) && c.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(n), n.closed || (r = e.connect());
  });
}
var Ie = class extends U {
  constructor(t, r) {
    super(),
      (this.source = t),
      (this.subjectFactory = r),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      f6(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new i2();
      let r = this.getSubject();
      t.add(
        this.source.subscribe(
          j(
            r,
            void 0,
            () => {
              this._teardown(), r.complete();
            },
            (n) => {
              this._teardown(), r.error(n);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = i2.EMPTY));
    }
    return t;
  }
  refCount() {
    return Ee()(this);
  }
};
var Y0 = be(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var g2 = (() => {
    class e extends U {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(r) {
        let n = new R4(this, this);
        return (n.operator = r), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new Y0();
      }
      next(r) {
        De(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(r);
          }
        });
      }
      error(r) {
        De(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = r);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(r);
          }
        });
      }
      complete() {
        De(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: r } = this;
            for (; r.length; ) r.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var r;
        return (
          ((r = this.observers) === null || r === void 0 ? void 0 : r.length) >
          0
        );
      }
      _trySubscribe(r) {
        return this._throwIfClosed(), super._trySubscribe(r);
      }
      _subscribe(r) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(r),
          this._innerSubscribe(r)
        );
      }
      _innerSubscribe(r) {
        let { hasError: n, isStopped: c, observers: i } = this;
        return n || c
          ? r6
          : ((this.currentObservers = null),
            i.push(r),
            new i2(() => {
              (this.currentObservers = null), M3(i, r);
            }));
      }
      _checkFinalizedStatuses(r) {
        let { hasError: n, thrownError: c, isStopped: i } = this;
        n ? r.error(c) : i && r.complete();
      }
      asObservable() {
        let r = new U();
        return (r.source = this), r;
      }
    }
    return (e.create = (t, r) => new R4(t, r)), e;
  })(),
  R4 = class extends g2 {
    constructor(t, r) {
      super(), (this.destination = t), (this.source = r);
    }
    next(t) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.next) ===
        null ||
        n === void 0 ||
        n.call(r, t);
    }
    error(t) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.error) ===
        null ||
        n === void 0 ||
        n.call(r, t);
    }
    complete() {
      var t, r;
      (r =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        r === void 0 ||
        r.call(t);
    }
    _subscribe(t) {
      var r, n;
      return (n =
        (r = this.source) === null || r === void 0
          ? void 0
          : r.subscribe(t)) !== null && n !== void 0
        ? n
        : r6;
    }
  };
var o2 = class extends g2 {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let r = super._subscribe(t);
    return !r.closed && t.next(this._value), r;
  }
  getValue() {
    let { hasError: t, thrownError: r, _value: n } = this;
    if (t) throw r;
    return this._throwIfClosed(), n;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var w2 = new U((e) => e.complete());
function Z0(e) {
  return e && E(e.schedule);
}
function Q0(e) {
  return e[e.length - 1];
}
function X0(e) {
  return E(Q0(e)) ? e.pop() : void 0;
}
function D1(e) {
  return Z0(Q0(e)) ? e.pop() : void 0;
}
function J0(e, t, r, n) {
  function c(i) {
    return i instanceof r
      ? i
      : new r(function (a) {
          a(i);
        });
  }
  return new (r || (r = Promise))(function (i, a) {
    function o(f) {
      try {
        l(n.next(f));
      } catch (u) {
        a(u);
      }
    }
    function s(f) {
      try {
        l(n.throw(f));
      } catch (u) {
        a(u);
      }
    }
    function l(f) {
      f.done ? i(f.value) : c(f.value).then(o, s);
    }
    l((n = n.apply(e, t || [])).next());
  });
}
function K0(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    r = t && e[t],
    n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function ee(e) {
  return this instanceof ee ? ((this.v = e), this) : new ee(e);
}
function ei(e, t, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []),
    c,
    i = [];
  return (
    (c = {}),
    o("next"),
    o("throw"),
    o("return", a),
    (c[Symbol.asyncIterator] = function () {
      return this;
    }),
    c
  );
  function a(h) {
    return function (p) {
      return Promise.resolve(p).then(h, u);
    };
  }
  function o(h, p) {
    n[h] &&
      ((c[h] = function (w) {
        return new Promise(function (M, C) {
          i.push([h, w, M, C]) > 1 || s(h, w);
        });
      }),
      p && (c[h] = p(c[h])));
  }
  function s(h, p) {
    try {
      l(n[h](p));
    } catch (w) {
      d(i[0][3], w);
    }
  }
  function l(h) {
    h.value instanceof ee
      ? Promise.resolve(h.value.v).then(f, u)
      : d(i[0][2], h);
  }
  function f(h) {
    s("next", h);
  }
  function u(h) {
    s("throw", h);
  }
  function d(h, p) {
    h(p), i.shift(), i.length && s(i[0][0], i[0][1]);
  }
}
function ti(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    r;
  return t
    ? t.call(e)
    : ((e = typeof K0 == "function" ? K0(e) : e[Symbol.iterator]()),
      (r = {}),
      n("next"),
      n("throw"),
      n("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function n(i) {
    r[i] =
      e[i] &&
      function (a) {
        return new Promise(function (o, s) {
          (a = e[i](a)), c(o, s, a.done, a.value);
        });
      };
  }
  function c(i, a, o, s) {
    Promise.resolve(s).then(function (l) {
      i({ value: l, done: o });
    }, a);
  }
}
var _4 = (e) => e && typeof e.length == "number" && typeof e != "function";
function P4(e) {
  return E(e?.then);
}
function O4(e) {
  return E(e[Ne]);
}
function F4(e) {
  return Symbol.asyncIterator && E(e?.[Symbol.asyncIterator]);
}
function B4(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function _7() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var j4 = _7();
function U4(e) {
  return E(e?.[j4]);
}
function $4(e) {
  return ei(this, arguments, function* () {
    let r = e.getReader();
    try {
      for (;;) {
        let { value: n, done: c } = yield ee(r.read());
        if (c) return yield ee(void 0);
        yield yield ee(n);
      }
    } finally {
      r.releaseLock();
    }
  });
}
function W4(e) {
  return E(e?.getReader);
}
function u2(e) {
  if (e instanceof U) return e;
  if (e != null) {
    if (O4(e)) return P7(e);
    if (_4(e)) return O7(e);
    if (P4(e)) return F7(e);
    if (F4(e)) return ni(e);
    if (U4(e)) return B7(e);
    if (W4(e)) return j7(e);
  }
  throw B4(e);
}
function P7(e) {
  return new U((t) => {
    let r = e[Ne]();
    if (E(r.subscribe)) return r.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function O7(e) {
  return new U((t) => {
    for (let r = 0; r < e.length && !t.closed; r++) t.next(e[r]);
    t.complete();
  });
}
function F7(e) {
  return new U((t) => {
    e.then(
      (r) => {
        t.closed || (t.next(r), t.complete());
      },
      (r) => t.error(r)
    ).then(null, T4);
  });
}
function B7(e) {
  return new U((t) => {
    for (let r of e) if ((t.next(r), t.closed)) return;
    t.complete();
  });
}
function ni(e) {
  return new U((t) => {
    U7(e, t).catch((r) => t.error(r));
  });
}
function j7(e) {
  return ni($4(e));
}
function U7(e, t) {
  var r, n, c, i;
  return J0(this, void 0, void 0, function* () {
    try {
      for (r = ti(e); (n = yield r.next()), !n.done; ) {
        let a = n.value;
        if ((t.next(a), t.closed)) return;
      }
    } catch (a) {
      c = { error: a };
    } finally {
      try {
        n && !n.done && (i = r.return) && (yield i.call(r));
      } finally {
        if (c) throw c.error;
      }
    }
    t.complete();
  });
}
function C2(e, t, r, n = 0, c = !1) {
  let i = t.schedule(function () {
    r(), c ? e.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((e.add(i), !c)) return i;
}
function q4(e, t = 0) {
  return B((r, n) => {
    r.subscribe(
      j(
        n,
        (c) => C2(n, e, () => n.next(c), t),
        () => C2(n, e, () => n.complete(), t),
        (c) => C2(n, e, () => n.error(c), t)
      )
    );
  });
}
function G4(e, t = 0) {
  return B((r, n) => {
    n.add(e.schedule(() => r.subscribe(n), t));
  });
}
function ri(e, t) {
  return u2(e).pipe(G4(t), q4(t));
}
function ci(e, t) {
  return u2(e).pipe(G4(t), q4(t));
}
function ii(e, t) {
  return new U((r) => {
    let n = 0;
    return t.schedule(function () {
      n === e.length
        ? r.complete()
        : (r.next(e[n++]), r.closed || this.schedule());
    });
  });
}
function ai(e, t) {
  return new U((r) => {
    let n;
    return (
      C2(r, t, () => {
        (n = e[j4]()),
          C2(
            r,
            t,
            () => {
              let c, i;
              try {
                ({ value: c, done: i } = n.next());
              } catch (a) {
                r.error(a);
                return;
              }
              i ? r.complete() : r.next(c);
            },
            0,
            !0
          );
      }),
      () => E(n?.return) && n.return()
    );
  });
}
function Y4(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new U((r) => {
    C2(r, t, () => {
      let n = e[Symbol.asyncIterator]();
      C2(
        r,
        t,
        () => {
          n.next().then((c) => {
            c.done ? r.complete() : r.next(c.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function oi(e, t) {
  return Y4($4(e), t);
}
function si(e, t) {
  if (e != null) {
    if (O4(e)) return ri(e, t);
    if (_4(e)) return ii(e, t);
    if (P4(e)) return ci(e, t);
    if (F4(e)) return Y4(e, t);
    if (U4(e)) return ai(e, t);
    if (W4(e)) return oi(e, t);
  }
  throw B4(e);
}
function t2(e, t) {
  return t ? si(e, t) : u2(e);
}
function D(...e) {
  let t = D1(e);
  return t2(e, t);
}
function Ae(e, t) {
  let r = E(e) ? e : () => e,
    n = (c) => c.error(r());
  return new U(t ? (c) => t.schedule(n, 0, c) : n);
}
function d6(e) {
  return !!e && (e instanceof U || (E(e.lift) && E(e.subscribe)));
}
var d1 = be(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function R(e, t) {
  return B((r, n) => {
    let c = 0;
    r.subscribe(
      j(n, (i) => {
        n.next(e.call(t, i, c++));
      })
    );
  });
}
var { isArray: $7 } = Array;
function W7(e, t) {
  return $7(t) ? e(...t) : e(t);
}
function li(e) {
  return R((t) => W7(e, t));
}
var { isArray: q7 } = Array,
  { getPrototypeOf: G7, prototype: Y7, keys: Z7 } = Object;
function fi(e) {
  if (e.length === 1) {
    let t = e[0];
    if (q7(t)) return { args: t, keys: null };
    if (Q7(t)) {
      let r = Z7(t);
      return { args: r.map((n) => t[n]), keys: r };
    }
  }
  return { args: e, keys: null };
}
function Q7(e) {
  return e && typeof e == "object" && G7(e) === Y7;
}
function ui(e, t) {
  return e.reduce((r, n, c) => ((r[n] = t[c]), r), {});
}
function Z4(...e) {
  let t = D1(e),
    r = X0(e),
    { args: n, keys: c } = fi(e);
  if (n.length === 0) return t2([], t);
  let i = new U(X7(n, t, c ? (a) => ui(c, a) : V2));
  return r ? i.pipe(li(r)) : i;
}
function X7(e, t, r = V2) {
  return (n) => {
    di(
      t,
      () => {
        let { length: c } = e,
          i = new Array(c),
          a = c,
          o = c;
        for (let s = 0; s < c; s++)
          di(
            t,
            () => {
              let l = t2(e[s], t),
                f = !1;
              l.subscribe(
                j(
                  n,
                  (u) => {
                    (i[s] = u), f || ((f = !0), o--), o || n.next(r(i.slice()));
                  },
                  () => {
                    --a || n.complete();
                  }
                )
              );
            },
            n
          );
      },
      n
    );
  };
}
function di(e, t, r) {
  e ? C2(r, e, t) : t();
}
function hi(e, t, r, n, c, i, a, o) {
  let s = [],
    l = 0,
    f = 0,
    u = !1,
    d = () => {
      u && !s.length && !l && t.complete();
    },
    h = (w) => (l < n ? p(w) : s.push(w)),
    p = (w) => {
      i && t.next(w), l++;
      let M = !1;
      u2(r(w, f++)).subscribe(
        j(
          t,
          (C) => {
            c?.(C), i ? h(C) : t.next(C);
          },
          () => {
            M = !0;
          },
          void 0,
          () => {
            if (M)
              try {
                for (l--; s.length && l < n; ) {
                  let C = s.shift();
                  a ? C2(t, a, () => p(C)) : p(C);
                }
                d();
              } catch (C) {
                t.error(C);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      j(t, h, () => {
        (u = !0), d();
      })
    ),
    () => {
      o?.();
    }
  );
}
function s2(e, t, r = 1 / 0) {
  return E(t)
    ? s2((n, c) => R((i, a) => t(n, i, c, a))(u2(e(n, c))), r)
    : (typeof t == "number" && (r = t), B((n, c) => hi(n, c, e, r)));
}
function h6(e = 1 / 0) {
  return s2(V2, e);
}
function pi() {
  return h6(1);
}
function Te(...e) {
  return pi()(t2(e, D1(e)));
}
function Q4(e) {
  return new U((t) => {
    u2(e()).subscribe(t);
  });
}
function x2(e, t) {
  return B((r, n) => {
    let c = 0;
    r.subscribe(j(n, (i) => e.call(t, i, c++) && n.next(i)));
  });
}
function S1(e) {
  return B((t, r) => {
    let n = null,
      c = !1,
      i;
    (n = t.subscribe(
      j(r, void 0, void 0, (a) => {
        (i = u2(e(a, S1(e)(t)))),
          n ? (n.unsubscribe(), (n = null), i.subscribe(r)) : (c = !0);
      })
    )),
      c && (n.unsubscribe(), (n = null), i.subscribe(r));
  });
}
function mi(e, t, r, n, c) {
  return (i, a) => {
    let o = r,
      s = t,
      l = 0;
    i.subscribe(
      j(
        a,
        (f) => {
          let u = l++;
          (s = o ? e(s, f, u) : ((o = !0), f)), n && a.next(s);
        },
        c &&
          (() => {
            o && a.next(s), a.complete();
          })
      )
    );
  };
}
function N1(e, t) {
  return E(t) ? s2(e, t, 1) : s2(e, 1);
}
function E1(e) {
  return B((t, r) => {
    let n = !1;
    t.subscribe(
      j(
        r,
        (c) => {
          (n = !0), r.next(c);
        },
        () => {
          n || r.next(e), r.complete();
        }
      )
    );
  });
}
function h1(e) {
  return e <= 0
    ? () => w2
    : B((t, r) => {
        let n = 0;
        t.subscribe(
          j(r, (c) => {
            ++n <= e && (r.next(c), e <= n && r.complete());
          })
        );
      });
}
function p6(e) {
  return R(() => e);
}
function X4(e = K7) {
  return B((t, r) => {
    let n = !1;
    t.subscribe(
      j(
        r,
        (c) => {
          (n = !0), r.next(c);
        },
        () => (n ? r.complete() : r.error(e()))
      )
    );
  });
}
function K7() {
  return new d1();
}
function I1(e) {
  return B((t, r) => {
    try {
      t.subscribe(r);
    } finally {
      r.add(e);
    }
  });
}
function e1(e, t) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      e ? x2((c, i) => e(c, i, n)) : V2,
      h1(1),
      r ? E1(t) : X4(() => new d1())
    );
}
function ke(e) {
  return e <= 0
    ? () => w2
    : B((t, r) => {
        let n = [];
        t.subscribe(
          j(
            r,
            (c) => {
              n.push(c), e < n.length && n.shift();
            },
            () => {
              for (let c of n) r.next(c);
              r.complete();
            },
            void 0,
            () => {
              n = null;
            }
          )
        );
      });
}
function m6(e, t) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      e ? x2((c, i) => e(c, i, n)) : V2,
      ke(1),
      r ? E1(t) : X4(() => new d1())
    );
}
function g6(e, t) {
  return B(mi(e, t, arguments.length >= 2, !0));
}
function v6(...e) {
  let t = D1(e);
  return B((r, n) => {
    (t ? Te(e, r, t) : Te(e, r)).subscribe(n);
  });
}
function b2(e, t) {
  return B((r, n) => {
    let c = null,
      i = 0,
      a = !1,
      o = () => a && !c && n.complete();
    r.subscribe(
      j(
        n,
        (s) => {
          c?.unsubscribe();
          let l = 0,
            f = i++;
          u2(e(s, f)).subscribe(
            (c = j(
              n,
              (u) => n.next(t ? t(s, u, f, l++) : u),
              () => {
                (c = null), o();
              }
            ))
          );
        },
        () => {
          (a = !0), o();
        }
      )
    );
  });
}
function M6(e) {
  return B((t, r) => {
    u2(e).subscribe(j(r, () => r.complete(), C3)), !r.closed && t.subscribe(r);
  });
}
function d2(e, t, r) {
  let n = E(e) || t || r ? { next: e, error: t, complete: r } : e;
  return n
    ? B((c, i) => {
        var a;
        (a = n.subscribe) === null || a === void 0 || a.call(n);
        let o = !0;
        c.subscribe(
          j(
            i,
            (s) => {
              var l;
              (l = n.next) === null || l === void 0 || l.call(n, s), i.next(s);
            },
            () => {
              var s;
              (o = !1),
                (s = n.complete) === null || s === void 0 || s.call(n),
                i.complete();
            },
            (s) => {
              var l;
              (o = !1),
                (l = n.error) === null || l === void 0 || l.call(n, s),
                i.error(s);
            },
            () => {
              var s, l;
              o && ((s = n.unsubscribe) === null || s === void 0 || s.call(n)),
                (l = n.finalize) === null || l === void 0 || l.call(n);
            }
          )
        );
      })
    : V2;
}
var na = "https://g.co/ng/security#xss",
  x = class extends Error {
    constructor(t, r) {
      super(Dt(t, r)), (this.code = t);
    }
  };
function Dt(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
function A3(e) {
  return { toString: e }.toString();
}
var K4 = "__parameters__";
function J7(e) {
  return function (...r) {
    if (e) {
      let n = e(...r);
      for (let c in n) this[c] = n[c];
    }
  };
}
function ra(e, t, r) {
  return A3(() => {
    let n = J7(t);
    function c(...i) {
      if (this instanceof c) return n.apply(this, i), this;
      let a = new c(...i);
      return (o.annotation = a), o;
      function o(s, l, f) {
        let u = s.hasOwnProperty(K4)
          ? s[K4]
          : Object.defineProperty(s, K4, { value: [] })[K4];
        for (; u.length <= f; ) u.push(null);
        return (u[f] = u[f] || []).push(a), s;
      }
    }
    return (
      r && (c.prototype = Object.create(r.prototype)),
      (c.prototype.ngMetadataName = e),
      (c.annotationCls = c),
      c
    );
  });
}
var V3 = globalThis;
function Y(e) {
  for (let t in e) if (e[t] === Y) return t;
  throw Error("Could not find renamed property on target object.");
}
function y2(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(y2).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let r = t.indexOf(`
`);
  return r === -1 ? t : t.substring(0, r);
}
function gi(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
    ? e
    : e + " " + t;
}
var el = Y({ __forward_ref__: Y });
function ca(e) {
  return (
    (e.__forward_ref__ = ca),
    (e.toString = function () {
      return y2(this());
    }),
    e
  );
}
function A2(e) {
  return ia(e) ? e() : e;
}
function ia(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(el) && e.__forward_ref__ === ca
  );
}
function V(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function P1(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function St(e) {
  return vi(e, oa) || vi(e, sa);
}
function aa(e) {
  return St(e) !== null;
}
function vi(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function tl(e) {
  let t = e && (e[oa] || e[sa]);
  return t || null;
}
function Mi(e) {
  return e && (e.hasOwnProperty(Ci) || e.hasOwnProperty(nl)) ? e[Ci] : null;
}
var oa = Y({ ɵprov: Y }),
  Ci = Y({ ɵinj: Y }),
  sa = Y({ ngInjectableDef: Y }),
  nl = Y({ ngInjectorDef: Y }),
  b = class {
    constructor(t, r) {
      (this._desc = t),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof r == "number"
          ? (this.__NG_ELEMENT_ID__ = r)
          : r !== void 0 &&
            (this.ɵprov = V({
              token: this,
              providedIn: r.providedIn || "root",
              factory: r.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function la(e) {
  return e && !!e.ɵproviders;
}
var rl = Y({ ɵcmp: Y }),
  cl = Y({ ɵdir: Y }),
  il = Y({ ɵpipe: Y }),
  al = Y({ ɵmod: Y }),
  st = Y({ ɵfac: Y }),
  z3 = Y({ __NG_ELEMENT_ID__: Y }),
  yi = Y({ __NG_ENV_ID__: Y });
function ce(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function ol(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : ce(e);
}
function sl(e, t) {
  let r = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new x(-200, e);
}
function yr(e, t) {
  throw new x(-201, !1);
}
var _ = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(_ || {}),
  L6;
function fa() {
  return L6;
}
function I2(e) {
  let t = L6;
  return (L6 = e), t;
}
function ua(e, t, r) {
  let n = St(e);
  if (n && n.providedIn == "root")
    return n.value === void 0 ? (n.value = n.factory()) : n.value;
  if (r & _.Optional) return null;
  if (t !== void 0) return t;
  yr(e, "Injector");
}
var ll = {},
  w3 = ll,
  D6 = "__NG_DI_FLAG__",
  lt = "ngTempTokenPath",
  fl = "ngTokenPath",
  ul = /\n/gm,
  dl = "\u0275",
  Hi = "__source",
  Oe;
function hl() {
  return Oe;
}
function A1(e) {
  let t = Oe;
  return (Oe = e), t;
}
function pl(e, t = _.Default) {
  if (Oe === void 0) throw new x(-203, !1);
  return Oe === null
    ? ua(e, void 0, t)
    : Oe.get(e, t & _.Optional ? null : void 0, t);
}
function L(e, t = _.Default) {
  return (fa() || pl)(A2(e), t);
}
function m(e, t = _.Default) {
  return L(e, Nt(t));
}
function Nt(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function S6(e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let n = A2(e[r]);
    if (Array.isArray(n)) {
      if (n.length === 0) throw new x(900, !1);
      let c,
        i = _.Default;
      for (let a = 0; a < n.length; a++) {
        let o = n[a],
          s = ml(o);
        typeof s == "number" ? (s === -1 ? (c = o.token) : (i |= s)) : (c = o);
      }
      t.push(L(c, i));
    } else t.push(L(n));
  }
  return t;
}
function da(e, t) {
  return (e[D6] = t), (e.prototype[D6] = t), e;
}
function ml(e) {
  return e[D6];
}
function gl(e, t, r, n) {
  let c = e[lt];
  throw (
    (t[Hi] && c.unshift(t[Hi]),
    (e.message = vl(
      `
` + e.message,
      c,
      r,
      n
    )),
    (e[fl] = c),
    (e[lt] = null),
    e)
  );
}
function vl(e, t, r, n = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == dl
      ? e.slice(2)
      : e;
  let c = y2(t);
  if (Array.isArray(t)) c = t.map(y2).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let a in t)
      if (t.hasOwnProperty(a)) {
        let o = t[a];
        i.push(a + ":" + (typeof o == "string" ? JSON.stringify(o) : y2(o)));
      }
    c = `{${i.join(", ")}}`;
  }
  return `${r}${n ? "(" + n + ")" : ""}[${c}]: ${e.replace(
    ul,
    `
  `
  )}`;
}
var Hr = da(ra("Optional"), 8);
var ha = da(ra("SkipSelf"), 4);
function Be(e, t) {
  let r = e.hasOwnProperty(st);
  return r ? e[st] : null;
}
function zr(e, t) {
  e.forEach((r) => (Array.isArray(r) ? zr(r, t) : t(r)));
}
function pa(e, t, r) {
  t >= e.length ? e.push(r) : e.splice(t, 0, r);
}
function ft(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Ml(e, t) {
  let r = [];
  for (let n = 0; n < e; n++) r.push(t);
  return r;
}
var x3 = {},
  t1 = [],
  je = new b(""),
  ma = new b("", -1),
  ga = new b(""),
  ut = class {
    get(t, r = w3) {
      if (r === w3) {
        let n = new Error(`NullInjectorError: No provider for ${y2(t)}!`);
        throw ((n.name = "NullInjectorError"), n);
      }
      return r;
    }
  },
  va = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(va || {}),
  c1 = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(c1 || {}),
  R1 = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(R1 || {});
function Cl(e, t, r) {
  let n = e.length;
  for (;;) {
    let c = e.indexOf(t, r);
    if (c === -1) return c;
    if (c === 0 || e.charCodeAt(c - 1) <= 32) {
      let i = t.length;
      if (c + i === n || e.charCodeAt(c + i) <= 32) return c;
    }
    r = c + 1;
  }
}
function N6(e, t, r) {
  let n = 0;
  for (; n < r.length; ) {
    let c = r[n];
    if (typeof c == "number") {
      if (c !== 0) break;
      n++;
      let i = r[n++],
        a = r[n++],
        o = r[n++];
      e.setAttribute(t, a, o, i);
    } else {
      let i = c,
        a = r[++n];
      Hl(i) ? e.setProperty(t, i, a) : e.setAttribute(t, i, a), n++;
    }
  }
  return n;
}
function yl(e) {
  return e === 3 || e === 4 || e === 6;
}
function Hl(e) {
  return e.charCodeAt(0) === 64;
}
function Vr(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let r = -1;
      for (let n = 0; n < t.length; n++) {
        let c = t[n];
        typeof c == "number"
          ? (r = c)
          : r === 0 ||
            (r === -1 || r === 2
              ? zi(e, r, c, null, t[++n])
              : zi(e, r, c, null, null));
      }
    }
  return e;
}
function zi(e, t, r, n, c) {
  let i = 0,
    a = e.length;
  if (t === -1) a = -1;
  else
    for (; i < e.length; ) {
      let o = e[i++];
      if (typeof o == "number") {
        if (o === t) {
          a = -1;
          break;
        } else if (o > t) {
          a = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let o = e[i];
    if (typeof o == "number") break;
    if (o === r) {
      if (n === null) {
        c !== null && (e[i + 1] = c);
        return;
      } else if (n === e[i + 1]) {
        e[i + 2] = c;
        return;
      }
    }
    i++, n !== null && i++, c !== null && i++;
  }
  a !== -1 && (e.splice(a, 0, t), (i = a + 1)),
    e.splice(i++, 0, r),
    n !== null && e.splice(i++, 0, n),
    c !== null && e.splice(i++, 0, c);
}
var Ma = "ng-template";
function zl(e, t, r, n) {
  let c = 0;
  if (n) {
    for (; c < t.length && typeof t[c] == "string"; c += 2)
      if (t[c] === "class" && Cl(t[c + 1].toLowerCase(), r, 0) !== -1)
        return !0;
  } else if (wr(e)) return !1;
  if (((c = t.indexOf(1, c)), c > -1)) {
    let i;
    for (; ++c < t.length && typeof (i = t[c]) == "string"; )
      if (i.toLowerCase() === r) return !0;
  }
  return !1;
}
function wr(e) {
  return e.type === 4 && e.value !== Ma;
}
function Vl(e, t, r) {
  let n = e.type === 4 && !r ? Ma : e.value;
  return t === n;
}
function wl(e, t, r) {
  let n = 4,
    c = e.attrs,
    i = c !== null ? Ll(c) : 0,
    a = !1;
  for (let o = 0; o < t.length; o++) {
    let s = t[o];
    if (typeof s == "number") {
      if (!a && !j2(n) && !j2(s)) return !1;
      if (a && j2(s)) continue;
      (a = !1), (n = s | (n & 1));
      continue;
    }
    if (!a)
      if (n & 4) {
        if (
          ((n = 2 | (n & 1)),
          (s !== "" && !Vl(e, s, r)) || (s === "" && t.length === 1))
        ) {
          if (j2(n)) return !1;
          a = !0;
        }
      } else if (n & 8) {
        if (c === null || !zl(e, c, s, r)) {
          if (j2(n)) return !1;
          a = !0;
        }
      } else {
        let l = t[++o],
          f = xl(s, c, wr(e), r);
        if (f === -1) {
          if (j2(n)) return !1;
          a = !0;
          continue;
        }
        if (l !== "") {
          let u;
          if (
            (f > i ? (u = "") : (u = c[f + 1].toLowerCase()), n & 2 && l !== u)
          ) {
            if (j2(n)) return !1;
            a = !0;
          }
        }
      }
  }
  return j2(n) || a;
}
function j2(e) {
  return (e & 1) === 0;
}
function xl(e, t, r, n) {
  if (t === null) return -1;
  let c = 0;
  if (n || !r) {
    let i = !1;
    for (; c < t.length; ) {
      let a = t[c];
      if (a === e) return c;
      if (a === 3 || a === 6) i = !0;
      else if (a === 1 || a === 2) {
        let o = t[++c];
        for (; typeof o == "string"; ) o = t[++c];
        continue;
      } else {
        if (a === 4) break;
        if (a === 0) {
          c += 4;
          continue;
        }
      }
      c += i ? 1 : 2;
    }
    return -1;
  } else return Dl(t, e);
}
function Ca(e, t, r = !1) {
  for (let n = 0; n < t.length; n++) if (wl(e, t[n], r)) return !0;
  return !1;
}
function bl(e) {
  let t = e.attrs;
  if (t != null) {
    let r = t.indexOf(5);
    if (!(r & 1)) return t[r + 1];
  }
  return null;
}
function Ll(e) {
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    if (yl(r)) return t;
  }
  return e.length;
}
function Dl(e, t) {
  let r = e.indexOf(4);
  if (r > -1)
    for (r++; r < e.length; ) {
      let n = e[r];
      if (typeof n == "number") return -1;
      if (n === t) return r;
      r++;
    }
  return -1;
}
function Sl(e, t) {
  e: for (let r = 0; r < t.length; r++) {
    let n = t[r];
    if (e.length === n.length) {
      for (let c = 0; c < e.length; c++) if (e[c] !== n[c]) continue e;
      return !0;
    }
  }
  return !1;
}
function Vi(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function Nl(e) {
  let t = e[0],
    r = 1,
    n = 2,
    c = "",
    i = !1;
  for (; r < e.length; ) {
    let a = e[r];
    if (typeof a == "string")
      if (n & 2) {
        let o = e[++r];
        c += "[" + a + (o.length > 0 ? '="' + o + '"' : "") + "]";
      } else n & 8 ? (c += "." + a) : n & 4 && (c += " " + a);
    else
      c !== "" && !j2(a) && ((t += Vi(i, c)), (c = "")),
        (n = a),
        (i = i || !j2(n));
    r++;
  }
  return c !== "" && (t += Vi(i, c)), t;
}
function El(e) {
  return e.map(Nl).join(",");
}
function Il(e) {
  let t = [],
    r = [],
    n = 1,
    c = 2;
  for (; n < e.length; ) {
    let i = e[n];
    if (typeof i == "string")
      c === 2 ? i !== "" && t.push(i, e[++n]) : c === 8 && r.push(i);
    else {
      if (!j2(c)) break;
      c = i;
    }
    n++;
  }
  return { attrs: t, classes: r };
}
function L2(e) {
  return A3(() => {
    let t = wa(e),
      r = J(H({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === va.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || c1.Emulated,
        styles: e.styles || t1,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    xa(r);
    let n = e.dependencies;
    return (
      (r.directiveDefs = xi(n, !1)), (r.pipeDefs = xi(n, !0)), (r.id = kl(r)), r
    );
  });
}
function Al(e) {
  return ie(e) || ya(e);
}
function Tl(e) {
  return e !== null;
}
function O1(e) {
  return A3(() => ({
    type: e.type,
    bootstrap: e.bootstrap || t1,
    declarations: e.declarations || t1,
    imports: e.imports || t1,
    exports: e.exports || t1,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function wi(e, t) {
  if (e == null) return x3;
  let r = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let c = e[n],
        i,
        a,
        o = R1.None;
      Array.isArray(c)
        ? ((o = c[0]), (i = c[1]), (a = c[2] ?? i))
        : ((i = c), (a = c)),
        t ? ((r[i] = o !== R1.None ? [n, o] : n), (t[i] = a)) : (r[i] = n);
    }
  return r;
}
function de(e) {
  return A3(() => {
    let t = wa(e);
    return xa(t), t;
  });
}
function ie(e) {
  return e[rl] || null;
}
function ya(e) {
  return e[cl] || null;
}
function Ha(e) {
  return e[il] || null;
}
function za(e) {
  let t = ie(e) || ya(e) || Ha(e);
  return t !== null ? t.standalone : !1;
}
function Va(e, t) {
  let r = e[al] || null;
  if (!r && t === !0)
    throw new Error(`Type ${y2(e)} does not have '\u0275mod' property.`);
  return r;
}
function wa(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || x3,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || t1,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: wi(e.inputs, t),
    outputs: wi(e.outputs),
    debugInfo: null,
  };
}
function xa(e) {
  e.features?.forEach((t) => t(e));
}
function xi(e, t) {
  if (!e) return null;
  let r = t ? Ha : Al;
  return () => (typeof e == "function" ? e() : e).map((n) => r(n)).filter(Tl);
}
function kl(e) {
  let t = 0,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join("|");
  for (let c of r) t = (Math.imul(31, t) + c.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function T3(e) {
  return { ɵproviders: e };
}
function Rl(...e) {
  return { ɵproviders: ba(!0, e), ɵfromNgModule: !0 };
}
function ba(e, ...t) {
  let r = [],
    n = new Set(),
    c,
    i = (a) => {
      r.push(a);
    };
  return (
    zr(t, (a) => {
      let o = a;
      E6(o, i, [], n) && ((c ||= []), c.push(o));
    }),
    c !== void 0 && La(c, i),
    r
  );
}
function La(e, t) {
  for (let r = 0; r < e.length; r++) {
    let { ngModule: n, providers: c } = e[r];
    xr(c, (i) => {
      t(i, n);
    });
  }
}
function E6(e, t, r, n) {
  if (((e = A2(e)), !e)) return !1;
  let c = null,
    i = Mi(e),
    a = !i && ie(e);
  if (!i && !a) {
    let s = e.ngModule;
    if (((i = Mi(s)), i)) c = s;
    else return !1;
  } else {
    if (a && !a.standalone) return !1;
    c = e;
  }
  let o = n.has(c);
  if (a) {
    if (o) return !1;
    if ((n.add(c), a.dependencies)) {
      let s =
        typeof a.dependencies == "function" ? a.dependencies() : a.dependencies;
      for (let l of s) E6(l, t, r, n);
    }
  } else if (i) {
    if (i.imports != null && !o) {
      n.add(c);
      let l;
      try {
        zr(i.imports, (f) => {
          E6(f, t, r, n) && ((l ||= []), l.push(f));
        });
      } finally {
      }
      l !== void 0 && La(l, t);
    }
    if (!o) {
      let l = Be(c) || (() => new c());
      t({ provide: c, useFactory: l, deps: t1 }, c),
        t({ provide: ga, useValue: c, multi: !0 }, c),
        t({ provide: je, useValue: () => L(c), multi: !0 }, c);
    }
    let s = i.providers;
    if (s != null && !o) {
      let l = e;
      xr(s, (f) => {
        t(f, l);
      });
    }
  } else return !1;
  return c !== e && e.providers !== void 0;
}
function xr(e, t) {
  for (let r of e)
    la(r) && (r = r.ɵproviders), Array.isArray(r) ? xr(r, t) : t(r);
}
var _l = Y({ provide: String, useValue: Y });
function Da(e) {
  return e !== null && typeof e == "object" && _l in e;
}
function Pl(e) {
  return !!(e && e.useExisting);
}
function Ol(e) {
  return !!(e && e.useFactory);
}
function I6(e) {
  return typeof e == "function";
}
var Et = new b(""),
  rt = {},
  Fl = {},
  C6;
function br() {
  return C6 === void 0 && (C6 = new ut()), C6;
}
var H2 = class {},
  b3 = class extends H2 {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, r, n, c) {
      super(),
        (this.parent = r),
        (this.source = n),
        (this.scopes = c),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        T6(t, (a) => this.processProvider(a)),
        this.records.set(ma, Re(void 0, this)),
        c.has("environment") && this.records.set(H2, Re(void 0, this));
      let i = this.records.get(Et);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(ga, t1, _.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = $(null);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let r = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of r) n();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          $(t);
      }
    }
    onDestroy(t) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(t),
        () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let r = A1(this),
        n = I2(void 0),
        c;
      try {
        return t();
      } finally {
        A1(r), I2(n);
      }
    }
    get(t, r = w3, n = _.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(yi))) return t[yi](this);
      n = Nt(n);
      let c,
        i = A1(this),
        a = I2(void 0);
      try {
        if (!(n & _.SkipSelf)) {
          let s = this.records.get(t);
          if (s === void 0) {
            let l = ql(t) && St(t);
            l && this.injectableDefInScope(l)
              ? (s = Re(A6(t), rt))
              : (s = null),
              this.records.set(t, s);
          }
          if (s != null) return this.hydrate(t, s);
        }
        let o = n & _.Self ? br() : this.parent;
        return (r = n & _.Optional && r === w3 ? null : r), o.get(t, r);
      } catch (o) {
        if (o.name === "NullInjectorError") {
          if (((o[lt] = o[lt] || []).unshift(y2(t)), i)) throw o;
          return gl(o, t, "R3InjectorError", this.source);
        } else throw o;
      } finally {
        I2(a), A1(i);
      }
    }
    resolveInjectorInitializers() {
      let t = $(null),
        r = A1(this),
        n = I2(void 0),
        c;
      try {
        let i = this.get(je, t1, _.Self);
        for (let a of i) a();
      } finally {
        A1(r), I2(n), $(t);
      }
    }
    toString() {
      let t = [],
        r = this.records;
      for (let n of r.keys()) t.push(y2(n));
      return `R3Injector[${t.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new x(205, !1);
    }
    processProvider(t) {
      t = A2(t);
      let r = I6(t) ? t : A2(t && t.provide),
        n = jl(t);
      if (!I6(t) && t.multi === !0) {
        let c = this.records.get(r);
        c ||
          ((c = Re(void 0, rt, !0)),
          (c.factory = () => S6(c.multi)),
          this.records.set(r, c)),
          (r = t),
          c.multi.push(t);
      }
      this.records.set(r, n);
    }
    hydrate(t, r) {
      let n = $(null);
      try {
        return (
          r.value === rt && ((r.value = Fl), (r.value = r.factory())),
          typeof r.value == "object" &&
            r.value &&
            Wl(r.value) &&
            this._ngOnDestroyHooks.add(r.value),
          r.value
        );
      } finally {
        $(n);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let r = A2(t.providedIn);
      return typeof r == "string"
        ? r === "any" || this.scopes.has(r)
        : this.injectorDefTypes.has(r);
    }
    removeOnDestroy(t) {
      let r = this._onDestroyHooks.indexOf(t);
      r !== -1 && this._onDestroyHooks.splice(r, 1);
    }
  };
function A6(e) {
  let t = St(e),
    r = t !== null ? t.factory : Be(e);
  if (r !== null) return r;
  if (e instanceof b) throw new x(204, !1);
  if (e instanceof Function) return Bl(e);
  throw new x(204, !1);
}
function Bl(e) {
  if (e.length > 0) throw new x(204, !1);
  let r = tl(e);
  return r !== null ? () => r.factory(e) : () => new e();
}
function jl(e) {
  if (Da(e)) return Re(void 0, e.useValue);
  {
    let t = Ul(e);
    return Re(t, rt);
  }
}
function Ul(e, t, r) {
  let n;
  if (I6(e)) {
    let c = A2(e);
    return Be(c) || A6(c);
  } else if (Da(e)) n = () => A2(e.useValue);
  else if (Ol(e)) n = () => e.useFactory(...S6(e.deps || []));
  else if (Pl(e)) n = () => L(A2(e.useExisting));
  else {
    let c = A2(e && (e.useClass || e.provide));
    if ($l(e)) n = () => new c(...S6(e.deps));
    else return Be(c) || A6(c);
  }
  return n;
}
function Re(e, t, r = !1) {
  return { factory: e, value: t, multi: r ? [] : void 0 };
}
function $l(e) {
  return !!e.deps;
}
function Wl(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function ql(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof b);
}
function T6(e, t) {
  for (let r of e)
    Array.isArray(r) ? T6(r, t) : r && la(r) ? T6(r.ɵproviders, t) : t(r);
}
function q2(e, t) {
  e instanceof b3 && e.assertNotDestroyed();
  let r,
    n = A1(e),
    c = I2(void 0);
  try {
    return t();
  } finally {
    A1(n), I2(c);
  }
}
function Gl() {
  return fa() !== void 0 || hl() != null;
}
function Yl(e) {
  return typeof e == "function";
}
var g1 = 0,
  F = 1,
  S = 2,
  M2 = 3,
  U2 = 4,
  z2 = 5,
  L3 = 6,
  dt = 7,
  $2 = 8,
  Ue = 9,
  i1 = 10,
  l2 = 11,
  D3 = 12,
  bi = 13,
  Qe = 14,
  R2 = 15,
  $e = 16,
  _e = 17,
  We = 18,
  It = 19,
  Sa = 20,
  T1 = 21,
  y6 = 22,
  T2 = 23,
  W2 = 25,
  Na = 1;
var ae = 7,
  ht = 8,
  pt = 9,
  k2 = 10,
  mt = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(mt || {});
function k1(e) {
  return Array.isArray(e) && typeof e[Na] == "object";
}
function v1(e) {
  return Array.isArray(e) && e[Na] === !0;
}
function Ea(e) {
  return (e.flags & 4) !== 0;
}
function At(e) {
  return e.componentOffset > -1;
}
function Lr(e) {
  return (e.flags & 1) === 1;
}
function k3(e) {
  return !!e.template;
}
function k6(e) {
  return (e[S] & 512) !== 0;
}
var R6 = class {
  constructor(t, r, n) {
    (this.previousValue = t), (this.currentValue = r), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Ia(e, t, r, n) {
  t !== null ? t.applyValueToInputSignal(t, n) : (e[r] = n);
}
function F1() {
  return Aa;
}
function Aa(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = Ql), Zl;
}
F1.ngInherit = !0;
function Zl() {
  let e = ka(this),
    t = e?.current;
  if (t) {
    let r = e.previous;
    if (r === x3) e.previous = t;
    else for (let n in t) r[n] = t[n];
    (e.current = null), this.ngOnChanges(t);
  }
}
function Ql(e, t, r, n, c) {
  let i = this.declaredInputs[n],
    a = ka(e) || Xl(e, { previous: x3, current: null }),
    o = a.current || (a.current = {}),
    s = a.previous,
    l = s[i];
  (o[i] = new R6(l && l.currentValue, r, s === x3)), Ia(e, t, c, r);
}
var Ta = "__ngSimpleChanges__";
function ka(e) {
  return e[Ta] || null;
}
function Xl(e, t) {
  return (e[Ta] = t);
}
var Li = null;
var n1 = function (e, t, r) {
    Li?.(e, t, r);
  },
  Kl = "svg",
  Jl = "math";
function a1(e) {
  for (; Array.isArray(e); ) e = e[g1];
  return e;
}
function e9(e, t) {
  return a1(t[e]);
}
function _2(e, t) {
  return a1(t[e.index]);
}
function Ra(e, t) {
  return e.data[t];
}
function t9(e, t) {
  return e[t];
}
function B1(e, t) {
  let r = t[e];
  return k1(r) ? r : r[g1];
}
function Dr(e) {
  return (e[S] & 128) === 128;
}
function n9(e) {
  return v1(e[M2]);
}
function gt(e, t) {
  return t == null ? null : e[t];
}
function _a(e) {
  e[_e] = 0;
}
function Pa(e) {
  e[S] & 1024 || ((e[S] |= 1024), Dr(e) && kt(e));
}
function r9(e, t) {
  for (; e > 0; ) (t = t[Qe]), e--;
  return t;
}
function Tt(e) {
  return !!(e[S] & 9216 || e[T2]?.dirty);
}
function _6(e) {
  e[i1].changeDetectionScheduler?.notify(8),
    e[S] & 64 && (e[S] |= 1024),
    Tt(e) && kt(e);
}
function kt(e) {
  e[i1].changeDetectionScheduler?.notify(0);
  let t = oe(e);
  for (; t !== null && !(t[S] & 8192 || ((t[S] |= 8192), !Dr(t))); ) t = oe(t);
}
function Oa(e, t) {
  if ((e[S] & 256) === 256) throw new x(911, !1);
  e[T1] === null && (e[T1] = []), e[T1].push(t);
}
function c9(e, t) {
  if (e[T1] === null) return;
  let r = e[T1].indexOf(t);
  r !== -1 && e[T1].splice(r, 1);
}
function oe(e) {
  let t = e[M2];
  return v1(t) ? t[M2] : t;
}
var O = { lFrame: Qa(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Fa = !1;
function i9() {
  return O.lFrame.elementDepthCount;
}
function a9() {
  O.lFrame.elementDepthCount++;
}
function o9() {
  O.lFrame.elementDepthCount--;
}
function Ba() {
  return O.bindingsEnabled;
}
function ja() {
  return O.skipHydrationRootTNode !== null;
}
function s9(e) {
  return O.skipHydrationRootTNode === e;
}
function l9() {
  O.skipHydrationRootTNode = null;
}
function Q() {
  return O.lFrame.lView;
}
function G2() {
  return O.lFrame.tView;
}
function Sr(e) {
  return (O.lFrame.contextLView = e), e[$2];
}
function Nr(e) {
  return (O.lFrame.contextLView = null), e;
}
function P2() {
  let e = Ua();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Ua() {
  return O.lFrame.currentTNode;
}
function f9() {
  let e = O.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function R3(e, t) {
  let r = O.lFrame;
  (r.currentTNode = e), (r.isParent = t);
}
function $a() {
  return O.lFrame.isParent;
}
function Wa() {
  O.lFrame.isParent = !1;
}
function u9() {
  return O.lFrame.contextLView;
}
function qa() {
  return Fa;
}
function Di(e) {
  Fa = e;
}
function d9() {
  return O.lFrame.bindingIndex;
}
function h9(e) {
  return (O.lFrame.bindingIndex = e);
}
function Rt() {
  return O.lFrame.bindingIndex++;
}
function p9(e) {
  let t = O.lFrame,
    r = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), r;
}
function m9() {
  return O.lFrame.inI18n;
}
function g9(e, t) {
  let r = O.lFrame;
  (r.bindingIndex = r.bindingRootIndex = e), P6(t);
}
function v9() {
  return O.lFrame.currentDirectiveIndex;
}
function P6(e) {
  O.lFrame.currentDirectiveIndex = e;
}
function Ga(e) {
  O.lFrame.currentQueryIndex = e;
}
function M9(e) {
  let t = e[F];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[z2] : null;
}
function Ya(e, t, r) {
  if (r & _.SkipSelf) {
    let c = t,
      i = e;
    for (; (c = c.parent), c === null && !(r & _.Host); )
      if (((c = M9(i)), c === null || ((i = i[Qe]), c.type & 10))) break;
    if (c === null) return !1;
    (t = c), (e = i);
  }
  let n = (O.lFrame = Za());
  return (n.currentTNode = t), (n.lView = e), !0;
}
function Er(e) {
  let t = Za(),
    r = e[F];
  (O.lFrame = t),
    (t.currentTNode = r.firstChild),
    (t.lView = e),
    (t.tView = r),
    (t.contextLView = e),
    (t.bindingIndex = r.bindingStartIndex),
    (t.inI18n = !1);
}
function Za() {
  let e = O.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Qa(e) : t;
}
function Qa(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Xa() {
  let e = O.lFrame;
  return (O.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Ka = Xa;
function Ir() {
  let e = Xa();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function C9(e) {
  return (O.lFrame.contextLView = r9(e, O.lFrame.contextLView))[$2];
}
function _t() {
  return O.lFrame.selectedIndex;
}
function se(e) {
  O.lFrame.selectedIndex = e;
}
function Pt() {
  let e = O.lFrame;
  return Ra(e.tView, e.selectedIndex);
}
function y9() {
  return O.lFrame.currentNamespace;
}
var Ja = !0;
function Ar() {
  return Ja;
}
function Tr(e) {
  Ja = e;
}
function H9(e, t, r) {
  let { ngOnChanges: n, ngOnInit: c, ngDoCheck: i } = t.type.prototype;
  if (n) {
    let a = Aa(t);
    (r.preOrderHooks ??= []).push(e, a),
      (r.preOrderCheckHooks ??= []).push(e, a);
  }
  c && (r.preOrderHooks ??= []).push(0 - e, c),
    i &&
      ((r.preOrderHooks ??= []).push(e, i),
      (r.preOrderCheckHooks ??= []).push(e, i));
}
function kr(e, t) {
  for (let r = t.directiveStart, n = t.directiveEnd; r < n; r++) {
    let i = e.data[r].type.prototype,
      {
        ngAfterContentInit: a,
        ngAfterContentChecked: o,
        ngAfterViewInit: s,
        ngAfterViewChecked: l,
        ngOnDestroy: f,
      } = i;
    a && (e.contentHooks ??= []).push(-r, a),
      o &&
        ((e.contentHooks ??= []).push(r, o),
        (e.contentCheckHooks ??= []).push(r, o)),
      s && (e.viewHooks ??= []).push(-r, s),
      l &&
        ((e.viewHooks ??= []).push(r, l), (e.viewCheckHooks ??= []).push(r, l)),
      f != null && (e.destroyHooks ??= []).push(r, f);
  }
}
function ct(e, t, r) {
  eo(e, t, 3, r);
}
function it(e, t, r, n) {
  (e[S] & 3) === r && eo(e, t, r, n);
}
function H6(e, t) {
  let r = e[S];
  (r & 3) === t && ((r &= 16383), (r += 1), (e[S] = r));
}
function eo(e, t, r, n) {
  let c = n !== void 0 ? e[_e] & 65535 : 0,
    i = n ?? -1,
    a = t.length - 1,
    o = 0;
  for (let s = c; s < a; s++)
    if (typeof t[s + 1] == "number") {
      if (((o = t[s]), n != null && o >= n)) break;
    } else
      t[s] < 0 && (e[_e] += 65536),
        (o < i || i == -1) &&
          (z9(e, r, t, s), (e[_e] = (e[_e] & 4294901760) + s + 2)),
        s++;
}
function Si(e, t) {
  n1(4, e, t);
  let r = $(null);
  try {
    t.call(e);
  } finally {
    $(r), n1(5, e, t);
  }
}
function z9(e, t, r, n) {
  let c = r[n] < 0,
    i = r[n + 1],
    a = c ? -r[n] : r[n],
    o = e[a];
  c
    ? e[S] >> 14 < e[_e] >> 16 &&
      (e[S] & 3) === t &&
      ((e[S] += 16384), Si(o, i))
    : Si(o, i);
}
var Fe = -1,
  S3 = class {
    constructor(t, r, n) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = r),
        (this.injectImpl = n);
    }
  };
function V9(e) {
  return e instanceof S3;
}
function w9(e) {
  return (e.flags & 8) !== 0;
}
function x9(e) {
  return (e.flags & 16) !== 0;
}
var z6 = {},
  O6 = class {
    constructor(t, r) {
      (this.injector = t), (this.parentInjector = r);
    }
    get(t, r, n) {
      n = Nt(n);
      let c = this.injector.get(t, z6, n);
      return c !== z6 || r === z6 ? c : this.parentInjector.get(t, r, n);
    }
  };
function to(e) {
  return e !== Fe;
}
function vt(e) {
  return e & 32767;
}
function b9(e) {
  return e >> 16;
}
function Mt(e, t) {
  let r = b9(e),
    n = t;
  for (; r > 0; ) (n = n[Qe]), r--;
  return n;
}
var F6 = !0;
function Ni(e) {
  let t = F6;
  return (F6 = e), t;
}
var L9 = 256,
  no = L9 - 1,
  ro = 5,
  D9 = 0,
  r1 = {};
function S9(e, t, r) {
  let n;
  typeof r == "string"
    ? (n = r.charCodeAt(0) || 0)
    : r.hasOwnProperty(z3) && (n = r[z3]),
    n == null && (n = r[z3] = D9++);
  let c = n & no,
    i = 1 << c;
  t.data[e + (c >> ro)] |= i;
}
function co(e, t) {
  let r = io(e, t);
  if (r !== -1) return r;
  let n = t[F];
  n.firstCreatePass &&
    ((e.injectorIndex = t.length),
    V6(n.data, e),
    V6(t, null),
    V6(n.blueprint, null));
  let c = Rr(e, t),
    i = e.injectorIndex;
  if (to(c)) {
    let a = vt(c),
      o = Mt(c, t),
      s = o[F].data;
    for (let l = 0; l < 8; l++) t[i + l] = o[a + l] | s[a + l];
  }
  return (t[i + 8] = c), i;
}
function V6(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function io(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Rr(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let r = 0,
    n = null,
    c = t;
  for (; c !== null; ) {
    if (((n = fo(c)), n === null)) return Fe;
    if ((r++, (c = c[Qe]), n.injectorIndex !== -1))
      return n.injectorIndex | (r << 16);
  }
  return Fe;
}
function N9(e, t, r) {
  S9(e, t, r);
}
function ao(e, t, r) {
  if (r & _.Optional || e !== void 0) return e;
  yr(t, "NodeInjector");
}
function oo(e, t, r, n) {
  if (
    (r & _.Optional && n === void 0 && (n = null), !(r & (_.Self | _.Host)))
  ) {
    let c = e[Ue],
      i = I2(void 0);
    try {
      return c ? c.get(t, n, r & _.Optional) : ua(t, n, r & _.Optional);
    } finally {
      I2(i);
    }
  }
  return ao(n, t, r);
}
function so(e, t, r, n = _.Default, c) {
  if (e !== null) {
    if (t[S] & 2048 && !(n & _.Self)) {
      let a = k9(e, t, r, n, r1);
      if (a !== r1) return a;
    }
    let i = lo(e, t, r, n, r1);
    if (i !== r1) return i;
  }
  return oo(t, r, n, c);
}
function lo(e, t, r, n, c) {
  let i = A9(r);
  if (typeof i == "function") {
    if (!Ya(t, e, n)) return n & _.Host ? ao(c, r, n) : oo(t, r, n, c);
    try {
      let a;
      if (((a = i(n)), a == null && !(n & _.Optional))) yr(r);
      else return a;
    } finally {
      Ka();
    }
  } else if (typeof i == "number") {
    let a = null,
      o = io(e, t),
      s = Fe,
      l = n & _.Host ? t[R2][z2] : null;
    for (
      (o === -1 || n & _.SkipSelf) &&
      ((s = o === -1 ? Rr(e, t) : t[o + 8]),
      s === Fe || !Ii(n, !1)
        ? (o = -1)
        : ((a = t[F]), (o = vt(s)), (t = Mt(s, t))));
      o !== -1;

    ) {
      let f = t[F];
      if (Ei(i, o, f.data)) {
        let u = E9(o, t, r, a, n, l);
        if (u !== r1) return u;
      }
      (s = t[o + 8]),
        s !== Fe && Ii(n, t[F].data[o + 8] === l) && Ei(i, o, t)
          ? ((a = f), (o = vt(s)), (t = Mt(s, t)))
          : (o = -1);
    }
  }
  return c;
}
function E9(e, t, r, n, c, i) {
  let a = t[F],
    o = a.data[e + 8],
    s = n == null ? At(o) && F6 : n != a && (o.type & 3) !== 0,
    l = c & _.Host && i === o,
    f = I9(o, a, r, s, l);
  return f !== null ? N3(t, a, f, o) : r1;
}
function I9(e, t, r, n, c) {
  let i = e.providerIndexes,
    a = t.data,
    o = i & 1048575,
    s = e.directiveStart,
    l = e.directiveEnd,
    f = i >> 20,
    u = n ? o : o + f,
    d = c ? o + f : l;
  for (let h = u; h < d; h++) {
    let p = a[h];
    if ((h < s && r === p) || (h >= s && p.type === r)) return h;
  }
  if (c) {
    let h = a[s];
    if (h && k3(h) && h.type === r) return s;
  }
  return null;
}
function N3(e, t, r, n) {
  let c = e[r],
    i = t.data;
  if (V9(c)) {
    let a = c;
    a.resolving && sl(ol(i[r]));
    let o = Ni(a.canSeeViewProviders);
    a.resolving = !0;
    let s,
      l = a.injectImpl ? I2(a.injectImpl) : null,
      f = Ya(e, n, _.Default);
    try {
      (c = e[r] = a.factory(void 0, i, e, n)),
        t.firstCreatePass && r >= n.directiveStart && H9(r, i[r], t);
    } finally {
      l !== null && I2(l), Ni(o), (a.resolving = !1), Ka();
    }
  }
  return c;
}
function A9(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(z3) ? e[z3] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & no : T9) : t;
}
function Ei(e, t, r) {
  let n = 1 << e;
  return !!(r[t + (e >> ro)] & n);
}
function Ii(e, t) {
  return !(e & _.Self) && !(e & _.Host && t);
}
var re = class {
  constructor(t, r) {
    (this._tNode = t), (this._lView = r);
  }
  get(t, r, n) {
    return so(this._tNode, this._lView, t, Nt(n), r);
  }
};
function T9() {
  return new re(P2(), Q());
}
function Ot(e) {
  return A3(() => {
    let t = e.prototype.constructor,
      r = t[st] || B6(t),
      n = Object.prototype,
      c = Object.getPrototypeOf(e.prototype).constructor;
    for (; c && c !== n; ) {
      let i = c[st] || B6(c);
      if (i && i !== r) return i;
      c = Object.getPrototypeOf(c);
    }
    return (i) => new i();
  });
}
function B6(e) {
  return ia(e)
    ? () => {
        let t = B6(A2(e));
        return t && t();
      }
    : Be(e);
}
function k9(e, t, r, n, c) {
  let i = e,
    a = t;
  for (; i !== null && a !== null && a[S] & 2048 && !(a[S] & 512); ) {
    let o = lo(i, a, r, n | _.Self, r1);
    if (o !== r1) return o;
    let s = i.parent;
    if (!s) {
      let l = a[Sa];
      if (l) {
        let f = l.get(r, r1, n);
        if (f !== r1) return f;
      }
      (s = fo(a)), (a = a[Qe]);
    }
    i = s;
  }
  return c;
}
function fo(e) {
  let t = e[F],
    r = t.type;
  return r === 2 ? t.declTNode : r === 1 ? e[z2] : null;
}
function Ai(e, t = null, r = null, n) {
  let c = uo(e, t, r, n);
  return c.resolveInjectorInitializers(), c;
}
function uo(e, t = null, r = null, n, c = new Set()) {
  let i = [r || t1, Rl(e)];
  return (
    (n = n || (typeof e == "object" ? void 0 : y2(e))),
    new b3(i, t || br(), n || null, c)
  );
}
var te = class te {
  static create(t, r) {
    if (Array.isArray(t)) return Ai({ name: "" }, r, t, "");
    {
      let n = t.name ?? "";
      return Ai({ name: n }, t.parent, t.providers, n);
    }
  }
};
(te.THROW_IF_NOT_FOUND = w3),
  (te.NULL = new ut()),
  (te.ɵprov = V({ token: te, providedIn: "any", factory: () => L(ma) })),
  (te.__NG_ELEMENT_ID__ = -1);
var le = te;
var R9 = new b("");
R9.__NG_ELEMENT_ID__ = (e) => {
  let t = P2();
  if (t === null) throw new x(204, !1);
  if (t.type & 2) return t.value;
  if (e & _.Optional) return null;
  throw new x(204, !1);
};
var _9 = "ngOriginalError";
function w6(e) {
  return e[_9];
}
var ho = !0,
  po = (() => {
    let t = class t {};
    (t.__NG_ELEMENT_ID__ = P9), (t.__NG_ENV_ID__ = (n) => n);
    let e = t;
    return e;
  })(),
  j6 = class extends po {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Oa(this._lView, t), () => c9(this._lView, t);
    }
  };
function P9() {
  return new j6(Q());
}
var M1 = (() => {
  let t = class t {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new o2(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  t.ɵprov = V({ token: t, providedIn: "root", factory: () => new t() });
  let e = t;
  return e;
})();
var U6 = class extends g2 {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        Gl() &&
          ((this.destroyRef = m(po, { optional: !0 }) ?? void 0),
          (this.pendingTasks = m(M1, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let r = $(null);
      try {
        super.next(t);
      } finally {
        $(r);
      }
    }
    subscribe(t, r, n) {
      let c = t,
        i = r || (() => null),
        a = n;
      if (t && typeof t == "object") {
        let s = t;
        (c = s.next?.bind(s)),
          (i = s.error?.bind(s)),
          (a = s.complete?.bind(s));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        c && (c = this.wrapInTimeout(c)),
        a && (a = this.wrapInTimeout(a)));
      let o = super.subscribe({ next: c, error: i, complete: a });
      return t instanceof i2 && t.add(o), o;
    }
    wrapInTimeout(t) {
      return (r) => {
        let n = this.pendingTasks?.add();
        setTimeout(() => {
          t(r), n !== void 0 && this.pendingTasks?.remove(n);
        });
      };
    }
  },
  v2 = U6;
function Ct(...e) {}
function mo(e) {
  let t, r;
  function n() {
    e = Ct;
    try {
      r !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(r),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), n();
    })),
    typeof requestAnimationFrame == "function" &&
      (r = requestAnimationFrame(() => {
        e(), n();
      })),
    () => n()
  );
}
function Ti(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Ct;
    }
  );
}
var _r = "isAngularZone",
  yt = _r + "_ID",
  O9 = 0,
  n2 = class e {
    constructor(t) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new v2(!1)),
        (this.onMicrotaskEmpty = new v2(!1)),
        (this.onStable = new v2(!1)),
        (this.onError = new v2(!1));
      let {
        enableLongStackTrace: r = !1,
        shouldCoalesceEventChangeDetection: n = !1,
        shouldCoalesceRunChangeDetection: c = !1,
        scheduleInRootZone: i = ho,
      } = t;
      if (typeof Zone > "u") throw new x(908, !1);
      Zone.assertZonePatched();
      let a = this;
      (a._nesting = 0),
        (a._outer = a._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (a._inner = a._inner.fork(new Zone.TaskTrackingZoneSpec())),
        r &&
          Zone.longStackTraceZoneSpec &&
          (a._inner = a._inner.fork(Zone.longStackTraceZoneSpec)),
        (a.shouldCoalesceEventChangeDetection = !c && n),
        (a.shouldCoalesceRunChangeDetection = c),
        (a.callbackScheduled = !1),
        (a.scheduleInRootZone = i),
        j9(a);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(_r) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new x(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new x(909, !1);
    }
    run(t, r, n) {
      return this._inner.run(t, r, n);
    }
    runTask(t, r, n, c) {
      let i = this._inner,
        a = i.scheduleEventTask("NgZoneEvent: " + c, t, F9, Ct, Ct);
      try {
        return i.runTask(a, r, n);
      } finally {
        i.cancelTask(a);
      }
    }
    runGuarded(t, r, n) {
      return this._inner.runGuarded(t, r, n);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  F9 = {};
function Pr(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function B9(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    mo(() => {
      (e.callbackScheduled = !1),
        $6(e),
        (e.isCheckStableRunning = !0),
        Pr(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    $6(e);
}
function j9(e) {
  let t = () => {
      B9(e);
    },
    r = O9++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [_r]: !0, [yt]: r, [yt + r]: !0 },
    onInvokeTask: (n, c, i, a, o, s) => {
      if (U9(s)) return n.invokeTask(i, a, o, s);
      try {
        return ki(e), n.invokeTask(i, a, o, s);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && a.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Ri(e);
      }
    },
    onInvoke: (n, c, i, a, o, s, l) => {
      try {
        return ki(e), n.invoke(i, a, o, s, l);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !$9(s) &&
          t(),
          Ri(e);
      }
    },
    onHasTask: (n, c, i, a) => {
      n.hasTask(i, a),
        c === i &&
          (a.change == "microTask"
            ? ((e._hasPendingMicrotasks = a.microTask), $6(e), Pr(e))
            : a.change == "macroTask" &&
              (e.hasPendingMacrotasks = a.macroTask));
    },
    onHandleError: (n, c, i, a) => (
      n.handleError(i, a), e.runOutsideAngular(() => e.onError.emit(a)), !1
    ),
  });
}
function $6(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function ki(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Ri(e) {
  e._nesting--, Pr(e);
}
var W6 = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new v2()),
      (this.onMicrotaskEmpty = new v2()),
      (this.onStable = new v2()),
      (this.onError = new v2());
  }
  run(t, r, n) {
    return t.apply(r, n);
  }
  runGuarded(t, r, n) {
    return t.apply(r, n);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, r, n, c) {
    return t.apply(r, n);
  }
};
function U9(e) {
  return go(e, "__ignore_ng_zone__");
}
function $9(e) {
  return go(e, "__scheduler_tick__");
}
function go(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var p1 = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let r = this._findOriginalError(t);
      this._console.error("ERROR", t),
        r && this._console.error("ORIGINAL ERROR", r);
    }
    _findOriginalError(t) {
      let r = t && w6(t);
      for (; r && w6(r); ) r = w6(r);
      return r || null;
    }
  },
  W9 = new b("", {
    providedIn: "root",
    factory: () => {
      let e = m(n2),
        t = m(p1);
      return (r) => e.runOutsideAngular(() => t.handleError(r));
    },
  });
function q9() {
  return Ft(P2(), Q());
}
function Ft(e, t) {
  return new Xe(_2(e, t));
}
var Xe = (() => {
  let t = class t {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  t.__NG_ELEMENT_ID__ = q9;
  let e = t;
  return e;
})();
function vo(e) {
  return (e.flags & 128) === 128;
}
var Mo = new Map(),
  G9 = 0;
function Y9() {
  return G9++;
}
function Z9(e) {
  Mo.set(e[It], e);
}
function q6(e) {
  Mo.delete(e[It]);
}
var _i = "__ngContext__";
function fe(e, t) {
  k1(t) ? ((e[_i] = t[It]), Z9(t)) : (e[_i] = t);
}
function Co(e) {
  return Ho(e[D3]);
}
function yo(e) {
  return Ho(e[U2]);
}
function Ho(e) {
  for (; e !== null && !v1(e); ) e = e[U2];
  return e;
}
var G6;
function zo(e) {
  G6 = e;
}
function Vo() {
  if (G6 !== void 0) return G6;
  if (typeof document < "u") return document;
  throw new x(210, !1);
}
var Or = new b("", { providedIn: "root", factory: () => Q9 }),
  Q9 = "ng",
  Fr = new b(""),
  j1 = new b("", { providedIn: "platform", factory: () => "unknown" });
var Br = new b("", {
  providedIn: "root",
  factory: () =>
    Vo().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var X9 = "h",
  K9 = "b";
var J9 = () => null;
function jr(e, t, r = !1) {
  return J9(e, t, r);
}
var wo = !1,
  ef = new b("", { providedIn: "root", factory: () => wo });
var J4;
function tf() {
  if (J4 === void 0 && ((J4 = null), V3.trustedTypes))
    try {
      J4 = V3.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return J4;
}
function Bt(e) {
  return tf()?.createHTML(e) || e;
}
var et;
function nf() {
  if (et === void 0 && ((et = null), V3.trustedTypes))
    try {
      et = V3.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return et;
}
function Pi(e) {
  return nf()?.createHTML(e) || e;
}
var m1 = class {
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${na})`;
    }
  },
  Y6 = class extends m1 {
    getTypeName() {
      return "HTML";
    }
  },
  Z6 = class extends m1 {
    getTypeName() {
      return "Style";
    }
  },
  Q6 = class extends m1 {
    getTypeName() {
      return "Script";
    }
  },
  X6 = class extends m1 {
    getTypeName() {
      return "URL";
    }
  },
  K6 = class extends m1 {
    getTypeName() {
      return "ResourceURL";
    }
  };
function C1(e) {
  return e instanceof m1 ? e.changingThisBreaksApplicationSecurity : e;
}
function U1(e, t) {
  let r = rf(e);
  if (r != null && r !== t) {
    if (r === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${r} (see ${na})`);
  }
  return r === t;
}
function rf(e) {
  return (e instanceof m1 && e.getTypeName()) || null;
}
function xo(e) {
  return new Y6(e);
}
function bo(e) {
  return new Z6(e);
}
function Lo(e) {
  return new Q6(e);
}
function Do(e) {
  return new X6(e);
}
function So(e) {
  return new K6(e);
}
function cf(e) {
  let t = new er(e);
  return af() ? new J6(t) : t;
}
var J6 = class {
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = "<body><remove></remove>" + t;
      try {
        let r = new window.DOMParser().parseFromString(Bt(t), "text/html").body;
        return r === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (r.firstChild?.remove(), r);
      } catch {
        return null;
      }
    }
  },
  er = class {
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(t) {
      let r = this.inertDocument.createElement("template");
      return (r.innerHTML = Bt(t)), r;
    }
  };
function af() {
  try {
    return !!new window.DOMParser().parseFromString(Bt(""), "text/html");
  } catch {
    return !1;
  }
}
var of = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function jt(e) {
  return (e = String(e)), e.match(of) ? e : "unsafe:" + e;
}
function y1(e) {
  let t = {};
  for (let r of e.split(",")) t[r] = !0;
  return t;
}
function _3(...e) {
  let t = {};
  for (let r of e) for (let n in r) r.hasOwnProperty(n) && (t[n] = !0);
  return t;
}
var No = y1("area,br,col,hr,img,wbr"),
  Eo = y1("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  Io = y1("rp,rt"),
  sf = _3(Io, Eo),
  lf = _3(
    Eo,
    y1(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  ff = _3(
    Io,
    y1(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  Oi = _3(No, lf, ff, sf),
  Ao = y1("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  uf = y1(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  df = y1(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  hf = _3(Ao, uf, df),
  pf = y1("script,style,template"),
  tr = class {
    constructor() {
      (this.sanitizedSomething = !1), (this.buf = []);
    }
    sanitizeChildren(t) {
      let r = t.firstChild,
        n = !0,
        c = [];
      for (; r; ) {
        if (
          (r.nodeType === Node.ELEMENT_NODE
            ? (n = this.startElement(r))
            : r.nodeType === Node.TEXT_NODE
            ? this.chars(r.nodeValue)
            : (this.sanitizedSomething = !0),
          n && r.firstChild)
        ) {
          c.push(r), (r = vf(r));
          continue;
        }
        for (; r; ) {
          r.nodeType === Node.ELEMENT_NODE && this.endElement(r);
          let i = gf(r);
          if (i) {
            r = i;
            break;
          }
          r = c.pop();
        }
      }
      return this.buf.join("");
    }
    startElement(t) {
      let r = Fi(t).toLowerCase();
      if (!Oi.hasOwnProperty(r))
        return (this.sanitizedSomething = !0), !pf.hasOwnProperty(r);
      this.buf.push("<"), this.buf.push(r);
      let n = t.attributes;
      for (let c = 0; c < n.length; c++) {
        let i = n.item(c),
          a = i.name,
          o = a.toLowerCase();
        if (!hf.hasOwnProperty(o)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let s = i.value;
        Ao[o] && (s = jt(s)), this.buf.push(" ", a, '="', Bi(s), '"');
      }
      return this.buf.push(">"), !0;
    }
    endElement(t) {
      let r = Fi(t).toLowerCase();
      Oi.hasOwnProperty(r) &&
        !No.hasOwnProperty(r) &&
        (this.buf.push("</"), this.buf.push(r), this.buf.push(">"));
    }
    chars(t) {
      this.buf.push(Bi(t));
    }
  };
function mf(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function gf(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw To(t);
  return t;
}
function vf(e) {
  let t = e.firstChild;
  if (t && mf(e, t)) throw To(t);
  return t;
}
function Fi(e) {
  let t = e.nodeName;
  return typeof t == "string" ? t : "FORM";
}
function To(e) {
  return new Error(
    `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
  );
}
var Mf = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Cf = /([^\#-~ |!])/g;
function Bi(e) {
  return e
    .replace(/&/g, "&amp;")
    .replace(Mf, function (t) {
      let r = t.charCodeAt(0),
        n = t.charCodeAt(1);
      return "&#" + ((r - 55296) * 1024 + (n - 56320) + 65536) + ";";
    })
    .replace(Cf, function (t) {
      return "&#" + t.charCodeAt(0) + ";";
    })
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
var tt;
function Ur(e, t) {
  let r = null;
  try {
    tt = tt || cf(e);
    let n = t ? String(t) : "";
    r = tt.getInertBodyElement(n);
    let c = 5,
      i = n;
    do {
      if (c === 0)
        throw new Error(
          "Failed to sanitize html because the input is unstable"
        );
      c--, (n = i), (i = r.innerHTML), (r = tt.getInertBodyElement(n));
    } while (n !== i);
    let o = new tr().sanitizeChildren(ji(r) || r);
    return Bt(o);
  } finally {
    if (r) {
      let n = ji(r) || r;
      for (; n.firstChild; ) n.firstChild.remove();
    }
  }
}
function ji(e) {
  return "content" in e && yf(e) ? e.content : null;
}
function yf(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var o1 = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(o1 || {});
function ko(e) {
  let t = Ro();
  return t
    ? Pi(t.sanitize(o1.HTML, e) || "")
    : U1(e, "HTML")
    ? Pi(C1(e))
    : Ur(Vo(), ce(e));
}
function P3(e) {
  let t = Ro();
  return t ? t.sanitize(o1.URL, e) || "" : U1(e, "URL") ? C1(e) : jt(ce(e));
}
function Ro() {
  let e = Q();
  return e && e[i1].sanitizer;
}
function _o(e) {
  return e instanceof Function ? e() : e;
}
var he = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(he || {}),
  Hf;
function $r(e, t) {
  return Hf(e, t);
}
function Pe(e, t, r, n, c) {
  if (n != null) {
    let i,
      a = !1;
    v1(n) ? (i = n) : k1(n) && ((a = !0), (n = n[g1]));
    let o = a1(n);
    e === 0 && r !== null
      ? c == null
        ? Uo(t, r, o)
        : Ht(t, r, o, c || null, !0)
      : e === 1 && r !== null
      ? Ht(t, r, o, c || null, !0)
      : e === 2
      ? Tf(t, o, a)
      : e === 3 && t.destroyNode(o),
      i != null && Rf(t, e, i, r, c);
  }
}
function zf(e, t) {
  return e.createText(t);
}
function Vf(e, t, r) {
  e.setValue(t, r);
}
function Po(e, t, r) {
  return e.createElement(t, r);
}
function wf(e, t) {
  Oo(e, t), (t[g1] = null), (t[z2] = null);
}
function xf(e, t, r, n, c, i) {
  (n[g1] = c), (n[z2] = t), Ut(e, n, r, 1, c, i);
}
function Oo(e, t) {
  t[i1].changeDetectionScheduler?.notify(9), Ut(e, t, t[l2], 2, null, null);
}
function bf(e) {
  let t = e[D3];
  if (!t) return x6(e[F], e);
  for (; t; ) {
    let r = null;
    if (k1(t)) r = t[D3];
    else {
      let n = t[k2];
      n && (r = n);
    }
    if (!r) {
      for (; t && !t[U2] && t !== e; ) k1(t) && x6(t[F], t), (t = t[M2]);
      t === null && (t = e), k1(t) && x6(t[F], t), (r = t && t[U2]);
    }
    t = r;
  }
}
function Lf(e, t, r, n) {
  let c = k2 + n,
    i = r.length;
  n > 0 && (r[c - 1][U2] = t),
    n < i - k2
      ? ((t[U2] = r[c]), pa(r, k2 + n, t))
      : (r.push(t), (t[U2] = null)),
    (t[M2] = r);
  let a = t[$e];
  a !== null && r !== a && Fo(a, t);
  let o = t[We];
  o !== null && o.insertView(e), _6(t), (t[S] |= 128);
}
function Fo(e, t) {
  let r = e[pt],
    n = t[M2];
  if (k1(n)) e[S] |= mt.HasTransplantedViews;
  else {
    let c = n[M2][R2];
    t[R2] !== c && (e[S] |= mt.HasTransplantedViews);
  }
  r === null ? (e[pt] = [t]) : r.push(t);
}
function Wr(e, t) {
  let r = e[pt],
    n = r.indexOf(t);
  r.splice(n, 1);
}
function nr(e, t) {
  if (e.length <= k2) return;
  let r = k2 + t,
    n = e[r];
  if (n) {
    let c = n[$e];
    c !== null && c !== e && Wr(c, n), t > 0 && (e[r - 1][U2] = n[U2]);
    let i = ft(e, k2 + t);
    wf(n[F], n);
    let a = i[We];
    a !== null && a.detachView(i[F]),
      (n[M2] = null),
      (n[U2] = null),
      (n[S] &= -129);
  }
  return n;
}
function Bo(e, t) {
  if (!(t[S] & 256)) {
    let r = t[l2];
    r.destroyNode && Ut(e, t, r, 3, null, null), bf(t);
  }
}
function x6(e, t) {
  if (t[S] & 256) return;
  let r = $(null);
  try {
    (t[S] &= -129),
      (t[S] |= 256),
      t[T2] && Jn(t[T2]),
      Sf(e, t),
      Df(e, t),
      t[F].type === 1 && t[l2].destroy();
    let n = t[$e];
    if (n !== null && v1(t[M2])) {
      n !== t[M2] && Wr(n, t);
      let c = t[We];
      c !== null && c.detachView(e);
    }
    q6(t);
  } finally {
    $(r);
  }
}
function Df(e, t) {
  let r = e.cleanup,
    n = t[dt];
  if (r !== null)
    for (let i = 0; i < r.length - 1; i += 2)
      if (typeof r[i] == "string") {
        let a = r[i + 3];
        a >= 0 ? n[a]() : n[-a].unsubscribe(), (i += 2);
      } else {
        let a = n[r[i + 1]];
        r[i].call(a);
      }
  n !== null && (t[dt] = null);
  let c = t[T1];
  if (c !== null) {
    t[T1] = null;
    for (let i = 0; i < c.length; i++) {
      let a = c[i];
      a();
    }
  }
}
function Sf(e, t) {
  let r;
  if (e != null && (r = e.destroyHooks) != null)
    for (let n = 0; n < r.length; n += 2) {
      let c = t[r[n]];
      if (!(c instanceof S3)) {
        let i = r[n + 1];
        if (Array.isArray(i))
          for (let a = 0; a < i.length; a += 2) {
            let o = c[i[a]],
              s = i[a + 1];
            n1(4, o, s);
            try {
              s.call(o);
            } finally {
              n1(5, o, s);
            }
          }
        else {
          n1(4, c, i);
          try {
            i.call(c);
          } finally {
            n1(5, c, i);
          }
        }
      }
    }
}
function jo(e, t, r) {
  return Nf(e, t.parent, r);
}
function Nf(e, t, r) {
  let n = t;
  for (; n !== null && n.type & 168; ) (t = n), (n = t.parent);
  if (n === null) return r[g1];
  {
    let { componentOffset: c } = n;
    if (c > -1) {
      let { encapsulation: i } = e.data[n.directiveStart + c];
      if (i === c1.None || i === c1.Emulated) return null;
    }
    return _2(n, r);
  }
}
function Ht(e, t, r, n, c) {
  e.insertBefore(t, r, n, c);
}
function Uo(e, t, r) {
  e.appendChild(t, r);
}
function Ui(e, t, r, n, c) {
  n !== null ? Ht(e, t, r, n, c) : Uo(e, t, r);
}
function $o(e, t) {
  return e.parentNode(t);
}
function Ef(e, t) {
  return e.nextSibling(t);
}
function Wo(e, t, r) {
  return Af(e, t, r);
}
function If(e, t, r) {
  return e.type & 40 ? _2(e, r) : null;
}
var Af = If,
  $i;
function qr(e, t, r, n) {
  let c = jo(e, n, t),
    i = t[l2],
    a = n.parent || t[z2],
    o = Wo(a, n, t);
  if (c != null)
    if (Array.isArray(r))
      for (let s = 0; s < r.length; s++) Ui(i, c, r[s], o, !1);
    else Ui(i, c, r, o, !1);
  $i !== void 0 && $i(i, n, t, r, c);
}
function y3(e, t) {
  if (t !== null) {
    let r = t.type;
    if (r & 3) return _2(t, e);
    if (r & 4) return rr(-1, e[t.index]);
    if (r & 8) {
      let n = t.child;
      if (n !== null) return y3(e, n);
      {
        let c = e[t.index];
        return v1(c) ? rr(-1, c) : a1(c);
      }
    } else {
      if (r & 128) return y3(e, t.next);
      if (r & 32) return $r(t, e)() || a1(e[t.index]);
      {
        let n = qo(e, t);
        if (n !== null) {
          if (Array.isArray(n)) return n[0];
          let c = oe(e[R2]);
          return y3(c, n);
        } else return y3(e, t.next);
      }
    }
  }
  return null;
}
function qo(e, t) {
  if (t !== null) {
    let n = e[R2][z2],
      c = t.projection;
    return n.projection[c];
  }
  return null;
}
function rr(e, t) {
  let r = k2 + e + 1;
  if (r < t.length) {
    let n = t[r],
      c = n[F].firstChild;
    if (c !== null) return y3(n, c);
  }
  return t[ae];
}
function Tf(e, t, r) {
  e.removeChild(null, t, r);
}
function Gr(e, t, r, n, c, i, a) {
  for (; r != null; ) {
    if (r.type === 128) {
      r = r.next;
      continue;
    }
    let o = n[r.index],
      s = r.type;
    if (
      (a && t === 0 && (o && fe(a1(o), n), (r.flags |= 2)),
      (r.flags & 32) !== 32)
    )
      if (s & 8) Gr(e, t, r.child, n, c, i, !1), Pe(t, e, c, o, i);
      else if (s & 32) {
        let l = $r(r, n),
          f;
        for (; (f = l()); ) Pe(t, e, c, f, i);
        Pe(t, e, c, o, i);
      } else s & 16 ? Go(e, t, n, r, c, i) : Pe(t, e, c, o, i);
    r = a ? r.projectionNext : r.next;
  }
}
function Ut(e, t, r, n, c, i) {
  Gr(r, n, e.firstChild, t, c, i, !1);
}
function kf(e, t, r) {
  let n = t[l2],
    c = jo(e, r, t),
    i = r.parent || t[z2],
    a = Wo(i, r, t);
  Go(n, 0, t, r, c, a);
}
function Go(e, t, r, n, c, i) {
  let a = r[R2],
    s = a[z2].projection[n.projection];
  if (Array.isArray(s))
    for (let l = 0; l < s.length; l++) {
      let f = s[l];
      Pe(t, e, c, f, i);
    }
  else {
    let l = s,
      f = a[M2];
    vo(n) && (l.flags |= 128), Gr(e, t, l, f, c, i, !0);
  }
}
function Rf(e, t, r, n, c) {
  let i = r[ae],
    a = a1(r);
  i !== a && Pe(t, e, n, i, c);
  for (let o = k2; o < r.length; o++) {
    let s = r[o];
    Ut(s[F], s, e, t, n, i);
  }
}
function _f(e, t, r) {
  e.setAttribute(t, "style", r);
}
function Yo(e, t, r) {
  r === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", r);
}
function Zo(e, t, r) {
  let { mergedAttrs: n, classes: c, styles: i } = r;
  n !== null && N6(e, t, n),
    c !== null && Yo(e, t, c),
    i !== null && _f(e, t, i);
}
var pe = {};
function N(e = 1) {
  Qo(G2(), Q(), _t() + e, !1);
}
function Qo(e, t, r, n) {
  if (!n)
    if ((t[S] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && ct(t, i, r);
    } else {
      let i = e.preOrderHooks;
      i !== null && it(t, i, 0, r);
    }
  se(r);
}
function a2(e, t = _.Default) {
  let r = Q();
  if (r === null) return L(e, t);
  let n = P2();
  return so(n, r, A2(e), t);
}
function Xo(e, t, r, n, c, i) {
  let a = $(null);
  try {
    let o = null;
    c & R1.SignalBased && (o = t[n][P0]),
      o !== null && o.transformFn !== void 0 && (i = o.transformFn(i)),
      c & R1.HasDecoratorInputTransform &&
        (i = e.inputTransforms[n].call(t, i)),
      e.setInput !== null ? e.setInput(t, o, i, r, n) : Ia(t, o, n, i);
  } finally {
    $(a);
  }
}
function Pf(e, t) {
  let r = e.hostBindingOpCodes;
  if (r !== null)
    try {
      for (let n = 0; n < r.length; n++) {
        let c = r[n];
        if (c < 0) se(~c);
        else {
          let i = c,
            a = r[++n],
            o = r[++n];
          g9(a, i);
          let s = t[i];
          o(2, s);
        }
      }
    } finally {
      se(-1);
    }
}
function $t(e, t, r, n, c, i, a, o, s, l, f) {
  let u = t.blueprint.slice();
  return (
    (u[g1] = c),
    (u[S] = n | 4 | 128 | 8 | 64),
    (l !== null || (e && e[S] & 2048)) && (u[S] |= 2048),
    _a(u),
    (u[M2] = u[Qe] = e),
    (u[$2] = r),
    (u[i1] = a || (e && e[i1])),
    (u[l2] = o || (e && e[l2])),
    (u[Ue] = s || (e && e[Ue]) || null),
    (u[z2] = i),
    (u[It] = Y9()),
    (u[L3] = f),
    (u[Sa] = l),
    (u[R2] = t.type == 2 ? e[R2] : u),
    u
  );
}
function O3(e, t, r, n, c) {
  let i = e.data[t];
  if (i === null) (i = Of(e, t, r, n, c)), m9() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = r), (i.value = n), (i.attrs = c);
    let a = f9();
    i.injectorIndex = a === null ? -1 : a.injectorIndex;
  }
  return R3(i, !0), i;
}
function Of(e, t, r, n, c) {
  let i = Ua(),
    a = $a(),
    o = a ? i : i && i.parent,
    s = (e.data[t] = $f(e, o, r, t, n, c));
  return (
    e.firstChild === null && (e.firstChild = s),
    i !== null &&
      (a
        ? i.child == null && s.parent !== null && (i.child = s)
        : i.next === null && ((i.next = s), (s.prev = i))),
    s
  );
}
function Ko(e, t, r, n) {
  if (r === 0) return -1;
  let c = t.length;
  for (let i = 0; i < r; i++) t.push(n), e.blueprint.push(n), e.data.push(null);
  return c;
}
function Jo(e, t, r, n, c) {
  let i = _t(),
    a = n & 2;
  try {
    se(-1), a && t.length > W2 && Qo(e, t, W2, !1), n1(a ? 2 : 0, c), r(n, c);
  } finally {
    se(i), n1(a ? 3 : 1, c);
  }
}
function es(e, t, r) {
  if (Ea(t)) {
    let n = $(null);
    try {
      let c = t.directiveStart,
        i = t.directiveEnd;
      for (let a = c; a < i; a++) {
        let o = e.data[a];
        if (o.contentQueries) {
          let s = r[a];
          o.contentQueries(1, s, a);
        }
      }
    } finally {
      $(n);
    }
  }
}
function ts(e, t, r) {
  Ba() && (Qf(e, t, r, _2(r, t)), (r.flags & 64) === 64 && as(e, t, r));
}
function ns(e, t, r = _2) {
  let n = t.localNames;
  if (n !== null) {
    let c = t.index + 1;
    for (let i = 0; i < n.length; i += 2) {
      let a = n[i + 1],
        o = a === -1 ? r(t, e) : e[a];
      e[c++] = o;
    }
  }
}
function rs(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = Yr(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function Yr(e, t, r, n, c, i, a, o, s, l, f) {
  let u = W2 + n,
    d = u + c,
    h = Ff(u, d),
    p = typeof l == "function" ? l() : l;
  return (h[F] = {
    type: e,
    blueprint: h,
    template: r,
    queries: null,
    viewQuery: o,
    declTNode: t,
    data: h.slice().fill(null, u),
    bindingStartIndex: u,
    expandoStartIndex: d,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof a == "function" ? a() : a,
    firstChild: null,
    schemas: s,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: f,
  });
}
function Ff(e, t) {
  let r = [];
  for (let n = 0; n < t; n++) r.push(n < e ? null : pe);
  return r;
}
function Bf(e, t, r, n) {
  let i = n.get(ef, wo) || r === c1.ShadowDom,
    a = e.selectRootElement(t, i);
  return jf(a), a;
}
function jf(e) {
  Uf(e);
}
var Uf = () => null;
function $f(e, t, r, n, c, i) {
  let a = t ? t.injectorIndex : -1,
    o = 0;
  return (
    ja() && (o |= 128),
    {
      type: r,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: a,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: o,
      providerIndexes: 0,
      value: c,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Wi(e, t, r, n, c) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let a = t[i];
    if (a === void 0) continue;
    n ??= {};
    let o,
      s = R1.None;
    Array.isArray(a) ? ((o = a[0]), (s = a[1])) : (o = a);
    let l = i;
    if (c !== null) {
      if (!c.hasOwnProperty(i)) continue;
      l = c[i];
    }
    e === 0 ? qi(n, r, l, o, s) : qi(n, r, l, o);
  }
  return n;
}
function qi(e, t, r, n, c) {
  let i;
  e.hasOwnProperty(r) ? (i = e[r]).push(t, n) : (i = e[r] = [t, n]),
    c !== void 0 && i.push(c);
}
function Wf(e, t, r) {
  let n = t.directiveStart,
    c = t.directiveEnd,
    i = e.data,
    a = t.attrs,
    o = [],
    s = null,
    l = null;
  for (let f = n; f < c; f++) {
    let u = i[f],
      d = r ? r.get(u) : null,
      h = d ? d.inputs : null,
      p = d ? d.outputs : null;
    (s = Wi(0, u.inputs, f, s, h)), (l = Wi(1, u.outputs, f, l, p));
    let w = s !== null && a !== null && !wr(t) ? ou(s, f, a) : null;
    o.push(w);
  }
  s !== null &&
    (s.hasOwnProperty("class") && (t.flags |= 8),
    s.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = o),
    (t.inputs = s),
    (t.outputs = l);
}
function qf(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function Zr(e, t, r, n, c, i, a, o) {
  let s = _2(t, r),
    l = t.inputs,
    f;
  !o && l != null && (f = l[n])
    ? (Qr(e, r, f, n, c), At(t) && Gf(r, t.index))
    : t.type & 3
    ? ((n = qf(n)),
      (c = a != null ? a(c, t.value || "", n) : c),
      i.setProperty(s, n, c))
    : t.type & 12;
}
function Gf(e, t) {
  let r = B1(t, e);
  r[S] & 16 || (r[S] |= 64);
}
function cs(e, t, r, n) {
  if (Ba()) {
    let c = n === null ? null : { "": -1 },
      i = Kf(e, r),
      a,
      o;
    i === null ? (a = o = null) : ([a, o] = i),
      a !== null && is(e, t, r, a, c, o),
      c && Jf(r, n, c);
  }
  r.mergedAttrs = Vr(r.mergedAttrs, r.attrs);
}
function is(e, t, r, n, c, i) {
  for (let l = 0; l < n.length; l++) N9(co(r, t), e, n[l].type);
  tu(r, e.data.length, n.length);
  for (let l = 0; l < n.length; l++) {
    let f = n[l];
    f.providersResolver && f.providersResolver(f);
  }
  let a = !1,
    o = !1,
    s = Ko(e, t, n.length, null);
  for (let l = 0; l < n.length; l++) {
    let f = n[l];
    (r.mergedAttrs = Vr(r.mergedAttrs, f.hostAttrs)),
      nu(e, r, t, s, f),
      eu(s, f, c),
      f.contentQueries !== null && (r.flags |= 4),
      (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) &&
        (r.flags |= 64);
    let u = f.type.prototype;
    !a &&
      (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(r.index), (a = !0)),
      !o &&
        (u.ngOnChanges || u.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(r.index), (o = !0)),
      s++;
  }
  Wf(e, r, i);
}
function Yf(e, t, r, n, c) {
  let i = c.hostBindings;
  if (i) {
    let a = e.hostBindingOpCodes;
    a === null && (a = e.hostBindingOpCodes = []);
    let o = ~t.index;
    Zf(a) != o && a.push(o), a.push(r, n, i);
  }
}
function Zf(e) {
  let t = e.length;
  for (; t > 0; ) {
    let r = e[--t];
    if (typeof r == "number" && r < 0) return r;
  }
  return 0;
}
function Qf(e, t, r, n) {
  let c = r.directiveStart,
    i = r.directiveEnd;
  At(r) && ru(t, r, e.data[c + r.componentOffset]),
    e.firstCreatePass || co(r, t),
    fe(n, t);
  let a = r.initialInputs;
  for (let o = c; o < i; o++) {
    let s = e.data[o],
      l = N3(t, e, o, r);
    if ((fe(l, t), a !== null && au(t, o - c, l, s, r, a), k3(s))) {
      let f = B1(r.index, t);
      f[$2] = N3(t, e, o, r);
    }
  }
}
function as(e, t, r) {
  let n = r.directiveStart,
    c = r.directiveEnd,
    i = r.index,
    a = v9();
  try {
    se(i);
    for (let o = n; o < c; o++) {
      let s = e.data[o],
        l = t[o];
      P6(o),
        (s.hostBindings !== null || s.hostVars !== 0 || s.hostAttrs !== null) &&
          Xf(s, l);
    }
  } finally {
    se(-1), P6(a);
  }
}
function Xf(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function Kf(e, t) {
  let r = e.directiveRegistry,
    n = null,
    c = null;
  if (r)
    for (let i = 0; i < r.length; i++) {
      let a = r[i];
      if (Ca(t, a.selectors, !1))
        if ((n || (n = []), k3(a)))
          if (a.findHostDirectiveDefs !== null) {
            let o = [];
            (c = c || new Map()),
              a.findHostDirectiveDefs(a, o, c),
              n.unshift(...o, a);
            let s = o.length;
            cr(e, t, s);
          } else n.unshift(a), cr(e, t, 0);
        else
          (c = c || new Map()), a.findHostDirectiveDefs?.(a, n, c), n.push(a);
    }
  return n === null ? null : [n, c];
}
function cr(e, t, r) {
  (t.componentOffset = r), (e.components ??= []).push(t.index);
}
function Jf(e, t, r) {
  if (t) {
    let n = (e.localNames = []);
    for (let c = 0; c < t.length; c += 2) {
      let i = r[t[c + 1]];
      if (i == null) throw new x(-301, !1);
      n.push(t[c], i);
    }
  }
}
function eu(e, t, r) {
  if (r) {
    if (t.exportAs)
      for (let n = 0; n < t.exportAs.length; n++) r[t.exportAs[n]] = e;
    k3(t) && (r[""] = e);
  }
}
function tu(e, t, r) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + r),
    (e.providerIndexes = t);
}
function nu(e, t, r, n, c) {
  e.data[n] = c;
  let i = c.factory || (c.factory = Be(c.type, !0)),
    a = new S3(i, k3(c), a2);
  (e.blueprint[n] = a), (r[n] = a), Yf(e, t, n, Ko(e, r, c.hostVars, pe), c);
}
function ru(e, t, r) {
  let n = _2(t, e),
    c = rs(r),
    i = e[i1].rendererFactory,
    a = 16;
  r.signals ? (a = 4096) : r.onPush && (a = 64);
  let o = Wt(
    e,
    $t(e, c, null, a, n, t, null, i.createRenderer(n, r), null, null, null)
  );
  e[t.index] = o;
}
function cu(e, t, r, n, c, i) {
  let a = _2(e, t);
  iu(t[l2], a, i, e.value, r, n, c);
}
function iu(e, t, r, n, c, i, a) {
  if (i == null) e.removeAttribute(t, c, r);
  else {
    let o = a == null ? ce(i) : a(i, n || "", c);
    e.setAttribute(t, c, o, r);
  }
}
function au(e, t, r, n, c, i) {
  let a = i[t];
  if (a !== null)
    for (let o = 0; o < a.length; ) {
      let s = a[o++],
        l = a[o++],
        f = a[o++],
        u = a[o++];
      Xo(n, r, s, l, f, u);
    }
}
function ou(e, t, r) {
  let n = null,
    c = 0;
  for (; c < r.length; ) {
    let i = r[c];
    if (i === 0) {
      c += 4;
      continue;
    } else if (i === 5) {
      c += 2;
      continue;
    }
    if (typeof i == "number") break;
    if (e.hasOwnProperty(i)) {
      n === null && (n = []);
      let a = e[i];
      for (let o = 0; o < a.length; o += 3)
        if (a[o] === t) {
          n.push(i, a[o + 1], a[o + 2], r[c + 1]);
          break;
        }
    }
    c += 2;
  }
  return n;
}
function os(e, t, r, n) {
  return [e, !0, 0, t, null, n, null, r, null, null];
}
function ss(e, t) {
  let r = e.contentQueries;
  if (r !== null) {
    let n = $(null);
    try {
      for (let c = 0; c < r.length; c += 2) {
        let i = r[c],
          a = r[c + 1];
        if (a !== -1) {
          let o = e.data[a];
          Ga(i), o.contentQueries(2, t[a], a);
        }
      }
    } finally {
      $(n);
    }
  }
}
function Wt(e, t) {
  return e[D3] ? (e[bi][U2] = t) : (e[D3] = t), (e[bi] = t), t;
}
function ir(e, t, r) {
  Ga(0);
  let n = $(null);
  try {
    t(e, r);
  } finally {
    $(n);
  }
}
function su(e) {
  return (e[dt] ??= []);
}
function lu(e) {
  return (e.cleanup ??= []);
}
function ls(e, t) {
  let r = e[Ue],
    n = r ? r.get(p1, null) : null;
  n && n.handleError(t);
}
function Qr(e, t, r, n, c) {
  for (let i = 0; i < r.length; ) {
    let a = r[i++],
      o = r[i++],
      s = r[i++],
      l = t[a],
      f = e.data[a];
    Xo(f, l, n, o, s, c);
  }
}
function fs(e, t, r) {
  let n = e9(t, e);
  Vf(e[l2], n, r);
}
function fu(e, t) {
  let r = B1(t, e),
    n = r[F];
  uu(n, r);
  let c = r[g1];
  c !== null && r[L3] === null && (r[L3] = jr(c, r[Ue])), Xr(n, r, r[$2]);
}
function uu(e, t) {
  for (let r = t.length; r < e.blueprint.length; r++) t.push(e.blueprint[r]);
}
function Xr(e, t, r) {
  Er(t);
  try {
    let n = e.viewQuery;
    n !== null && ir(1, n, r);
    let c = e.template;
    c !== null && Jo(e, t, c, 1, r),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[We]?.finishViewCreation(e),
      e.staticContentQueries && ss(e, t),
      e.staticViewQueries && ir(2, e.viewQuery, r);
    let i = e.components;
    i !== null && du(t, i);
  } catch (n) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      n)
    );
  } finally {
    (t[S] &= -5), Ir();
  }
}
function du(e, t) {
  for (let r = 0; r < t.length; r++) fu(e, t[r]);
}
function us(e, t, r, n) {
  let c = $(null);
  try {
    let i = t.tView,
      o = e[S] & 4096 ? 4096 : 16,
      s = $t(
        e,
        i,
        r,
        o,
        null,
        t,
        null,
        null,
        n?.injector ?? null,
        n?.embeddedViewInjector ?? null,
        n?.dehydratedView ?? null
      ),
      l = e[t.index];
    s[$e] = l;
    let f = e[We];
    return f !== null && (s[We] = f.createEmbeddedView(i)), Xr(i, s, r), s;
  } finally {
    $(c);
  }
}
function ar(e, t) {
  return !t || t.firstChild === null || vo(e);
}
function ds(e, t, r, n = !0) {
  let c = t[F];
  if ((Lf(c, t, e, r), n)) {
    let a = rr(r, e),
      o = t[l2],
      s = $o(o, e[ae]);
    s !== null && xf(c, e[z2], o, t, s, a);
  }
  let i = t[L3];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function zt(e, t, r, n, c = !1) {
  for (; r !== null; ) {
    if (r.type === 128) {
      r = c ? r.projectionNext : r.next;
      continue;
    }
    let i = t[r.index];
    i !== null && n.push(a1(i)), v1(i) && hu(i, n);
    let a = r.type;
    if (a & 8) zt(e, t, r.child, n);
    else if (a & 32) {
      let o = $r(r, t),
        s;
      for (; (s = o()); ) n.push(s);
    } else if (a & 16) {
      let o = qo(t, r);
      if (Array.isArray(o)) n.push(...o);
      else {
        let s = oe(t[R2]);
        zt(s[F], s, o, n, !0);
      }
    }
    r = c ? r.projectionNext : r.next;
  }
  return n;
}
function hu(e, t) {
  for (let r = k2; r < e.length; r++) {
    let n = e[r],
      c = n[F].firstChild;
    c !== null && zt(n[F], n, c, t);
  }
  e[ae] !== e[g1] && t.push(e[ae]);
}
var hs = [];
function pu(e) {
  return e[T2] ?? mu(e);
}
function mu(e) {
  let t = hs.pop() ?? Object.create(vu);
  return (t.lView = e), t;
}
function gu(e) {
  e.lView[T2] !== e && ((e.lView = null), hs.push(e));
}
var vu = J(H({}, Qn), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    kt(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[T2] = this;
  },
});
function Mu(e) {
  let t = e[T2] ?? Object.create(Cu);
  return (t.lView = e), t;
}
var Cu = J(H({}, Qn), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = oe(e.lView);
    for (; t && !ps(t[F]); ) t = oe(t);
    t && Pa(t);
  },
  consumerOnSignalRead() {
    this.lView[T2] = this;
  },
});
function ps(e) {
  return e.type !== 2;
}
var yu = 100;
function ms(e, t = !0, r = 0) {
  let n = e[i1],
    c = n.rendererFactory,
    i = !1;
  i || c.begin?.();
  try {
    Hu(e, r);
  } catch (a) {
    throw (t && ls(e, a), a);
  } finally {
    i || (c.end?.(), n.inlineEffectRunner?.flush());
  }
}
function Hu(e, t) {
  let r = qa();
  try {
    Di(!0), or(e, t);
    let n = 0;
    for (; Tt(e); ) {
      if (n === yu) throw new x(103, !1);
      n++, or(e, 1);
    }
  } finally {
    Di(r);
  }
}
function zu(e, t, r, n) {
  let c = t[S];
  if ((c & 256) === 256) return;
  let i = !1,
    a = !1;
  !i && t[i1].inlineEffectRunner?.flush(), Er(t);
  let o = !0,
    s = null,
    l = null;
  i ||
    (ps(e)
      ? ((l = pu(t)), (s = Xn(l)))
      : O0() === null
      ? ((o = !1), (l = Mu(t)), (s = Xn(l)))
      : t[T2] && (Jn(t[T2]), (t[T2] = null)));
  try {
    _a(t), h9(e.bindingStartIndex), r !== null && Jo(e, t, r, 2, n);
    let f = (c & 3) === 3;
    if (!i)
      if (f) {
        let h = e.preOrderCheckHooks;
        h !== null && ct(t, h, null);
      } else {
        let h = e.preOrderHooks;
        h !== null && it(t, h, 0, null), H6(t, 0);
      }
    if ((a || Vu(t), gs(t, 0), e.contentQueries !== null && ss(e, t), !i))
      if (f) {
        let h = e.contentCheckHooks;
        h !== null && ct(t, h);
      } else {
        let h = e.contentHooks;
        h !== null && it(t, h, 1), H6(t, 1);
      }
    Pf(e, t);
    let u = e.components;
    u !== null && Ms(t, u, 0);
    let d = e.viewQuery;
    if ((d !== null && ir(2, d, n), !i))
      if (f) {
        let h = e.viewCheckHooks;
        h !== null && ct(t, h);
      } else {
        let h = e.viewHooks;
        h !== null && it(t, h, 2), H6(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[y6])) {
      for (let h of t[y6]) h();
      t[y6] = null;
    }
    i || (t[S] &= -73);
  } catch (f) {
    throw (i || kt(t), f);
  } finally {
    l !== null && (F0(l, s), o && gu(l)), Ir();
  }
}
function gs(e, t) {
  for (let r = Co(e); r !== null; r = yo(r))
    for (let n = k2; n < r.length; n++) {
      let c = r[n];
      vs(c, t);
    }
}
function Vu(e) {
  for (let t = Co(e); t !== null; t = yo(t)) {
    if (!(t[S] & mt.HasTransplantedViews)) continue;
    let r = t[pt];
    for (let n = 0; n < r.length; n++) {
      let c = r[n];
      Pa(c);
    }
  }
}
function wu(e, t, r) {
  let n = B1(t, e);
  vs(n, r);
}
function vs(e, t) {
  Dr(e) && or(e, t);
}
function or(e, t) {
  let n = e[F],
    c = e[S],
    i = e[T2],
    a = !!(t === 0 && c & 16);
  if (
    ((a ||= !!(c & 64 && t === 0)),
    (a ||= !!(c & 1024)),
    (a ||= !!(i?.dirty && Kn(i))),
    (a ||= !1),
    i && (i.dirty = !1),
    (e[S] &= -9217),
    a)
  )
    zu(n, e, n.template, e[$2]);
  else if (c & 8192) {
    gs(e, 1);
    let o = n.components;
    o !== null && Ms(e, o, 1);
  }
}
function Ms(e, t, r) {
  for (let n = 0; n < t.length; n++) wu(e, t[n], r);
}
function Kr(e, t) {
  let r = qa() ? 64 : 1088;
  for (e[i1].changeDetectionScheduler?.notify(t); e; ) {
    e[S] |= r;
    let n = oe(e);
    if (k6(e) && !n) return e;
    e = n;
  }
  return null;
}
var ue = class {
    get rootNodes() {
      let t = this._lView,
        r = t[F];
      return zt(r, t, r.firstChild, []);
    }
    constructor(t, r, n = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = r),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[$2];
    }
    set context(t) {
      this._lView[$2] = t;
    }
    get destroyed() {
      return (this._lView[S] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[M2];
        if (v1(t)) {
          let r = t[ht],
            n = r ? r.indexOf(this) : -1;
          n > -1 && (nr(t, n), ft(r, n));
        }
        this._attachedToViewContainer = !1;
      }
      Bo(this._lView[F], this._lView);
    }
    onDestroy(t) {
      Oa(this._lView, t);
    }
    markForCheck() {
      Kr(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[S] &= -129;
    }
    reattach() {
      _6(this._lView), (this._lView[S] |= 128);
    }
    detectChanges() {
      (this._lView[S] |= 1024), ms(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new x(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = k6(this._lView),
        r = this._lView[$e];
      r !== null && !t && Wr(r, this._lView), Oo(this._lView[F], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new x(902, !1);
      this._appRef = t;
      let r = k6(this._lView),
        n = this._lView[$e];
      n !== null && !r && Fo(n, this._lView), _6(this._lView);
    }
  },
  qt = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = Lu;
    let e = t;
    return e;
  })(),
  xu = qt,
  bu = class extends xu {
    constructor(t, r, n) {
      super(),
        (this._declarationLView = t),
        (this._declarationTContainer = r),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, r) {
      return this.createEmbeddedViewImpl(t, r);
    }
    createEmbeddedViewImpl(t, r, n) {
      let c = us(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: r,
        dehydratedView: n,
      });
      return new ue(c);
    }
  };
function Lu() {
  return Cs(P2(), Q());
}
function Cs(e, t) {
  return e.type & 4 ? new bu(t, e, Ft(e, t)) : null;
}
var fV = new RegExp(`^(\\d+)*(${K9}|${X9})*(.*)`);
var Du = () => null;
function sr(e, t) {
  return Du(e, t);
}
var qe = class {},
  ys = new b("", { providedIn: "root", factory: () => !1 });
var Hs = new b(""),
  zs = new b(""),
  lr = class {},
  Vt = class {};
function Su(e) {
  let t = Error(`No component factory found for ${y2(e)}.`);
  return (t[Nu] = e), t;
}
var Nu = "ngComponent";
var fr = class {
    resolveComponentFactory(t) {
      throw Su(t);
    }
  },
  ic = class ic {};
ic.NULL = new fr();
var Ge = ic,
  Ye = class {},
  F3 = (() => {
    let t = class t {
      constructor() {
        this.destroyNode = null;
      }
    };
    t.__NG_ELEMENT_ID__ = () => Eu();
    let e = t;
    return e;
  })();
function Eu() {
  let e = Q(),
    t = P2(),
    r = B1(t.index, e);
  return (k1(r) ? r : e)[l2];
}
var Iu = (() => {
  let t = class t {};
  t.ɵprov = V({ token: t, providedIn: "root", factory: () => null });
  let e = t;
  return e;
})();
function ur(e, t, r) {
  let n = r ? e.styles : null,
    c = r ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let a = 0; a < t.length; a++) {
      let o = t[a];
      if (typeof o == "number") i = o;
      else if (i == 1) c = gi(c, o);
      else if (i == 2) {
        let s = o,
          l = t[++a];
        n = gi(n, s + ": " + l + ";");
      }
    }
  r ? (e.styles = n) : (e.stylesWithoutHost = n),
    r ? (e.classes = c) : (e.classesWithoutHost = c);
}
var wt = class extends Ge {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let r = ie(t);
    return new E3(r, this.ngModule);
  }
};
function Gi(e, t) {
  let r = [];
  for (let n in e) {
    if (!e.hasOwnProperty(n)) continue;
    let c = e[n];
    if (c === void 0) continue;
    let i = Array.isArray(c),
      a = i ? c[0] : c,
      o = i ? c[1] : R1.None;
    t
      ? r.push({
          propName: a,
          templateName: n,
          isSignal: (o & R1.SignalBased) !== 0,
        })
      : r.push({ propName: a, templateName: n });
  }
  return r;
}
function Au(e) {
  let t = e.toLowerCase();
  return t === "svg" ? Kl : t === "math" ? Jl : null;
}
var E3 = class extends Vt {
    get inputs() {
      let t = this.componentDef,
        r = t.inputTransforms,
        n = Gi(t.inputs, !0);
      if (r !== null)
        for (let c of n)
          r.hasOwnProperty(c.propName) && (c.transform = r[c.propName]);
      return n;
    }
    get outputs() {
      return Gi(this.componentDef.outputs, !1);
    }
    constructor(t, r) {
      super(),
        (this.componentDef = t),
        (this.ngModule = r),
        (this.componentType = t.type),
        (this.selector = El(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!r);
    }
    create(t, r, n, c) {
      let i = $(null);
      try {
        c = c || this.ngModule;
        let a = c instanceof H2 ? c : c?.injector;
        a &&
          this.componentDef.getStandaloneInjector !== null &&
          (a = this.componentDef.getStandaloneInjector(a) || a);
        let o = a ? new O6(t, a) : t,
          s = o.get(Ye, null);
        if (s === null) throw new x(407, !1);
        let l = o.get(Iu, null),
          f = o.get(qe, null),
          u = {
            rendererFactory: s,
            sanitizer: l,
            inlineEffectRunner: null,
            changeDetectionScheduler: f,
          },
          d = s.createRenderer(null, this.componentDef),
          h = this.componentDef.selectors[0][0] || "div",
          p = n
            ? Bf(d, n, this.componentDef.encapsulation, o)
            : Po(d, h, Au(h)),
          w = 512;
        this.componentDef.signals
          ? (w |= 4096)
          : this.componentDef.onPush || (w |= 16);
        let M = null;
        p !== null && (M = jr(p, o, !0));
        let C = Yr(0, null, null, 1, 0, null, null, null, null, null, null),
          I = $t(null, C, null, w, null, null, u, d, o, null, M);
        Er(I);
        let P,
          k,
          Z = null;
        try {
          let q = this.componentDef,
            c2,
            K2 = null;
          q.findHostDirectiveDefs
            ? ((c2 = []),
              (K2 = new Map()),
              q.findHostDirectiveDefs(q, c2, K2),
              c2.push(q))
            : (c2 = [q]);
          let J2 = Tu(I, p);
          (Z = ku(J2, p, q, c2, I, u, d)),
            (k = Ra(C, W2)),
            p && Pu(d, q, p, n),
            r !== void 0 && Ou(k, this.ngContentSelectors, r),
            (P = _u(Z, q, c2, K2, I, [Fu])),
            Xr(C, I, null);
        } catch (q) {
          throw (Z !== null && q6(Z), q6(I), q);
        } finally {
          Ir();
        }
        return new dr(this.componentType, P, Ft(k, I), I, k);
      } finally {
        $(i);
      }
    }
  },
  dr = class extends lr {
    constructor(t, r, n, c, i) {
      super(),
        (this.location = n),
        (this._rootLView = c),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = r),
        (this.hostView = this.changeDetectorRef = new ue(c, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, r) {
      let n = this._tNode.inputs,
        c;
      if (n !== null && (c = n[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), r))
        )
          return;
        let i = this._rootLView;
        Qr(i[F], i, c, t, r), this.previousInputValues.set(t, r);
        let a = B1(this._tNode.index, i);
        Kr(a, 1);
      }
    }
    get injector() {
      return new re(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function Tu(e, t) {
  let r = e[F],
    n = W2;
  return (e[n] = t), O3(r, n, 2, "#host", null);
}
function ku(e, t, r, n, c, i, a) {
  let o = c[F];
  Ru(n, e, t, a);
  let s = null;
  t !== null && (s = jr(t, c[Ue]));
  let l = i.rendererFactory.createRenderer(t, r),
    f = 16;
  r.signals ? (f = 4096) : r.onPush && (f = 64);
  let u = $t(c, rs(r), null, f, c[e.index], e, i, l, null, null, s);
  return (
    o.firstCreatePass && cr(o, e, n.length - 1), Wt(c, u), (c[e.index] = u)
  );
}
function Ru(e, t, r, n) {
  for (let c of e) t.mergedAttrs = Vr(t.mergedAttrs, c.hostAttrs);
  t.mergedAttrs !== null &&
    (ur(t, t.mergedAttrs, !0), r !== null && Zo(n, r, t));
}
function _u(e, t, r, n, c, i) {
  let a = P2(),
    o = c[F],
    s = _2(a, c);
  is(o, c, a, r, null, n);
  for (let f = 0; f < r.length; f++) {
    let u = a.directiveStart + f,
      d = N3(c, o, u, a);
    fe(d, c);
  }
  as(o, c, a), s && fe(s, c);
  let l = N3(c, o, a.directiveStart + a.componentOffset, a);
  if (((e[$2] = c[$2] = l), i !== null)) for (let f of i) f(l, t);
  return es(o, a, c), l;
}
function Pu(e, t, r, n) {
  if (n) N6(e, r, ["ng-version", "18.2.3"]);
  else {
    let { attrs: c, classes: i } = Il(t.selectors[0]);
    c && N6(e, r, c), i && i.length > 0 && Yo(e, r, i.join(" "));
  }
}
function Ou(e, t, r) {
  let n = (e.projection = []);
  for (let c = 0; c < t.length; c++) {
    let i = r[c];
    n.push(i != null ? Array.from(i) : null);
  }
}
function Fu() {
  let e = P2();
  kr(Q()[F], e);
}
var Ke = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = Bu;
  let e = t;
  return e;
})();
function Bu() {
  let e = P2();
  return Uu(e, Q());
}
var ju = Ke,
  Vs = class extends ju {
    constructor(t, r, n) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = r),
        (this._hostLView = n);
    }
    get element() {
      return Ft(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new re(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Rr(this._hostTNode, this._hostLView);
      if (to(t)) {
        let r = Mt(t, this._hostLView),
          n = vt(t),
          c = r[F].data[n + 8];
        return new re(c, r);
      } else return new re(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let r = Yi(this._lContainer);
      return (r !== null && r[t]) || null;
    }
    get length() {
      return this._lContainer.length - k2;
    }
    createEmbeddedView(t, r, n) {
      let c, i;
      typeof n == "number"
        ? (c = n)
        : n != null && ((c = n.index), (i = n.injector));
      let a = sr(this._lContainer, t.ssrId),
        o = t.createEmbeddedViewImpl(r || {}, i, a);
      return this.insertImpl(o, c, ar(this._hostTNode, a)), o;
    }
    createComponent(t, r, n, c, i) {
      let a = t && !Yl(t),
        o;
      if (a) o = r;
      else {
        let p = r || {};
        (o = p.index),
          (n = p.injector),
          (c = p.projectableNodes),
          (i = p.environmentInjector || p.ngModuleRef);
      }
      let s = a ? t : new E3(ie(t)),
        l = n || this.parentInjector;
      if (!i && s.ngModule == null) {
        let w = (a ? l : this.parentInjector).get(H2, null);
        w && (i = w);
      }
      let f = ie(s.componentType ?? {}),
        u = sr(this._lContainer, f?.id ?? null),
        d = u?.firstChild ?? null,
        h = s.create(l, c, d, i);
      return this.insertImpl(h.hostView, o, ar(this._hostTNode, u)), h;
    }
    insert(t, r) {
      return this.insertImpl(t, r, !0);
    }
    insertImpl(t, r, n) {
      let c = t._lView;
      if (n9(c)) {
        let o = this.indexOf(t);
        if (o !== -1) this.detach(o);
        else {
          let s = c[M2],
            l = new Vs(s, s[z2], s[M2]);
          l.detach(l.indexOf(t));
        }
      }
      let i = this._adjustIndex(r),
        a = this._lContainer;
      return ds(a, c, i, n), t.attachToViewContainerRef(), pa(b6(a), i, t), t;
    }
    move(t, r) {
      return this.insert(t, r);
    }
    indexOf(t) {
      let r = Yi(this._lContainer);
      return r !== null ? r.indexOf(t) : -1;
    }
    remove(t) {
      let r = this._adjustIndex(t, -1),
        n = nr(this._lContainer, r);
      n && (ft(b6(this._lContainer), r), Bo(n[F], n));
    }
    detach(t) {
      let r = this._adjustIndex(t, -1),
        n = nr(this._lContainer, r);
      return n && ft(b6(this._lContainer), r) != null ? new ue(n) : null;
    }
    _adjustIndex(t, r = 0) {
      return t ?? this.length + r;
    }
  };
function Yi(e) {
  return e[ht];
}
function b6(e) {
  return e[ht] || (e[ht] = []);
}
function Uu(e, t) {
  let r,
    n = t[e.index];
  return (
    v1(n) ? (r = n) : ((r = os(n, t, null, e)), (t[e.index] = r), Wt(t, r)),
    Wu(r, t, e, n),
    new Vs(r, e, t)
  );
}
function $u(e, t) {
  let r = e[l2],
    n = r.createComment(""),
    c = _2(t, e),
    i = $o(r, c);
  return Ht(r, i, n, Ef(r, c), !1), n;
}
var Wu = Yu,
  qu = () => !1;
function Gu(e, t, r) {
  return qu(e, t, r);
}
function Yu(e, t, r, n) {
  if (e[ae]) return;
  let c;
  r.type & 8 ? (c = a1(n)) : (c = $u(t, r)), (e[ae] = c);
}
var Zi = new Set();
function Jr(e) {
  Zi.has(e) ||
    (Zi.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
var _1 = class {},
  I3 = class {};
var hr = class extends _1 {
    constructor(t, r, n, c = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = r),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new wt(this));
      let i = Va(t);
      (this._bootstrapComponents = _o(i.bootstrap)),
        (this._r3Injector = uo(
          t,
          r,
          [
            { provide: _1, useValue: this },
            { provide: Ge, useValue: this.componentFactoryResolver },
            ...n,
          ],
          y2(t),
          new Set(["environment"])
        )),
        c && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((r) => r()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  pr = class extends I3 {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new hr(this.moduleType, t, []);
    }
  };
var xt = class extends _1 {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new wt(this)),
      (this.instance = null);
    let r = new b3(
      [
        ...t.providers,
        { provide: _1, useValue: this },
        { provide: Ge, useValue: this.componentFactoryResolver },
      ],
      t.parent || br(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = r),
      t.runEnvironmentInitializers && r.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function ec(e, t, r = null) {
  return new xt({
    providers: e,
    parent: t,
    debugName: r,
    runEnvironmentInitializers: !0,
  }).injector;
}
function ws(e) {
  return Qu(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function Zu(e, t) {
  if (Array.isArray(e)) for (let r = 0; r < e.length; r++) t(e[r]);
  else {
    let r = e[Symbol.iterator](),
      n;
    for (; !(n = r.next()).done; ) t(n.value);
  }
}
function Qu(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function Ze(e, t, r) {
  let n = e[t];
  return Object.is(n, r) ? !1 : ((e[t] = r), !0);
}
function Xu(e, t, r, n) {
  let c = Ze(e, t, r);
  return Ze(e, t + 1, n) || c;
}
function Ku(e) {
  return (e.flags & 32) === 32;
}
function Ju(e, t, r, n, c, i, a, o, s) {
  let l = t.consts,
    f = O3(t, e, 4, a || null, o || null);
  cs(t, r, f, gt(l, s)), kr(t, f);
  let u = (f.tView = Yr(
    2,
    f,
    n,
    c,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    l,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, f), (u.queries = t.queries.embeddedTView(f))),
    f
  );
}
function xs(e, t, r, n, c, i, a, o, s, l) {
  let f = r + W2,
    u = t.firstCreatePass ? Ju(f, t, e, n, c, i, a, o, s) : t.data[f];
  R3(u, !1);
  let d = ed(t, e, u, r);
  Ar() && qr(t, e, d, u), fe(d, e);
  let h = os(d, e, d, u);
  return (
    (e[f] = h),
    Wt(e, h),
    Gu(h, u, e),
    Lr(u) && ts(t, e, u),
    s != null && ns(e, u, l),
    u
  );
}
function me(e, t, r, n, c, i, a, o) {
  let s = Q(),
    l = G2(),
    f = gt(l.consts, i);
  return xs(s, l, e, t, r, n, c, f, a, o), me;
}
var ed = td;
function td(e, t, r, n) {
  return Tr(!0), t[l2].createComment("");
}
var H3 = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(H3 || {}),
  nd = (() => {
    let t = class t {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
    };
    t.ɵprov = V({ token: t, providedIn: "root", factory: () => new t() });
    let e = t;
    return e;
  })(),
  ne = class ne {
    constructor() {
      (this.ngZone = m(n2)),
        (this.scheduler = m(qe)),
        (this.errorHandler = m(p1, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    execute() {
      this.executing = !0;
      for (let t of ne.PHASES)
        for (let r of this.sequences)
          if (!(r.erroredOrDestroyed || !r.hooks[t]))
            try {
              r.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                r.hooks[t](r.pipelinedValue)
              );
            } catch (n) {
              (r.erroredOrDestroyed = !0), this.errorHandler?.handleError(n);
            }
      this.executing = !1;
      for (let t of this.sequences)
        t.afterRun(), t.once && this.sequences.delete(t);
      for (let t of this.deferredRegistrations) this.sequences.add(t);
      this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
        this.deferredRegistrations.clear();
    }
    register(t) {
      this.executing
        ? this.deferredRegistrations.add(t)
        : (this.sequences.add(t), this.scheduler.notify(6));
    }
    unregister(t) {
      this.executing && this.sequences.has(t)
        ? ((t.erroredOrDestroyed = !0),
          (t.pipelinedValue = void 0),
          (t.once = !0))
        : (this.sequences.delete(t), this.deferredRegistrations.delete(t));
    }
  };
(ne.PHASES = [H3.EarlyRead, H3.Write, H3.MixedReadWrite, H3.Read]),
  (ne.ɵprov = V({ token: ne, providedIn: "root", factory: () => new ne() }));
var Qi = ne;
function Gt(e, t, r, n) {
  let c = Q(),
    i = Rt();
  if (Ze(c, i, t)) {
    let a = G2(),
      o = Pt();
    cu(o, c, e, t, r, n);
  }
  return Gt;
}
function bs(e, t, r, n) {
  return Ze(e, Rt(), r) ? t + ce(r) + n : pe;
}
function rd(e, t, r, n, c, i) {
  let a = d9(),
    o = Xu(e, a, r, c);
  return p9(2), o ? t + ce(r) + n + ce(c) + i : pe;
}
function r2(e, t, r) {
  let n = Q(),
    c = Rt();
  if (Ze(n, c, t)) {
    let i = G2(),
      a = Pt();
    Zr(i, a, n, e, t, n[l2], r, !1);
  }
  return r2;
}
function Xi(e, t, r, n, c) {
  let i = t.inputs,
    a = c ? "class" : "style";
  Qr(e, r, i[a], a, n);
}
function cd(e, t, r, n, c, i) {
  let a = t.consts,
    o = gt(a, c),
    s = O3(t, e, 2, n, o);
  return (
    cs(t, r, s, gt(a, i)),
    s.attrs !== null && ur(s, s.attrs, !1),
    s.mergedAttrs !== null && ur(s, s.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, s),
    s
  );
}
function v(e, t, r, n) {
  let c = Q(),
    i = G2(),
    a = W2 + e,
    o = c[l2],
    s = i.firstCreatePass ? cd(a, i, c, t, r, n) : i.data[a],
    l = id(i, c, s, o, t, e);
  c[a] = l;
  let f = Lr(s);
  return (
    R3(s, !0),
    Zo(o, l, s),
    !Ku(s) && Ar() && qr(i, c, l, s),
    i9() === 0 && fe(l, c),
    a9(),
    f && (ts(i, c, s), es(i, s, c)),
    n !== null && ns(c, s),
    v
  );
}
function z() {
  let e = P2();
  $a() ? Wa() : ((e = e.parent), R3(e, !1));
  let t = e;
  s9(t) && l9(), o9();
  let r = G2();
  return (
    r.firstCreatePass && (kr(r, e), Ea(e) && r.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      w9(t) &&
      Xi(r, t, Q(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      x9(t) &&
      Xi(r, t, Q(), t.stylesWithoutHost, !1),
    z
  );
}
function G(e, t, r, n) {
  return v(e, t, r, n), z(), G;
}
var id = (e, t, r, n, c, i) => (Tr(!0), Po(n, c, y9()));
function Ls() {
  return Q();
}
function tc(e, t, r) {
  let n = Q(),
    c = Rt();
  if (Ze(n, c, t)) {
    let i = G2(),
      a = Pt();
    Zr(i, a, n, e, t, n[l2], r, !0);
  }
  return tc;
}
var bt = "en-US";
var ad = bt;
function od(e) {
  typeof e == "string" && (ad = e.toLowerCase().replace(/_/g, "-"));
}
var sd = (e, t, r) => {};
function s1(e, t, r, n) {
  let c = Q(),
    i = G2(),
    a = P2();
  return fd(i, c, c[l2], a, e, t, n), s1;
}
function ld(e, t, r, n) {
  let c = e.cleanup;
  if (c != null)
    for (let i = 0; i < c.length - 1; i += 2) {
      let a = c[i];
      if (a === r && c[i + 1] === n) {
        let o = t[dt],
          s = c[i + 2];
        return o.length > s ? o[s] : null;
      }
      typeof a == "string" && (i += 2);
    }
  return null;
}
function fd(e, t, r, n, c, i, a) {
  let o = Lr(n),
    l = e.firstCreatePass && lu(e),
    f = t[$2],
    u = su(t),
    d = !0;
  if (n.type & 3 || a) {
    let w = _2(n, t),
      M = a ? a(w) : w,
      C = u.length,
      I = a ? (k) => a(a1(k[n.index])) : n.index,
      P = null;
    if ((!a && o && (P = ld(e, t, c, n.index)), P !== null)) {
      let k = P.__ngLastListenerFn__ || P;
      (k.__ngNextListenerFn__ = i), (P.__ngLastListenerFn__ = i), (d = !1);
    } else {
      (i = Ji(n, t, f, i)), sd(w, c, i);
      let k = r.listen(M, c, i);
      u.push(i, k), l && l.push(c, I, C, C + 1);
    }
  } else i = Ji(n, t, f, i);
  let h = n.outputs,
    p;
  if (d && h !== null && (p = h[c])) {
    let w = p.length;
    if (w)
      for (let M = 0; M < w; M += 2) {
        let C = p[M],
          I = p[M + 1],
          Z = t[C][I].subscribe(i),
          q = u.length;
        u.push(i, Z), l && l.push(c, n.index, q, -(q + 1));
      }
  }
}
function Ki(e, t, r, n) {
  let c = $(null);
  try {
    return n1(6, t, r), r(n) !== !1;
  } catch (i) {
    return ls(e, i), !1;
  } finally {
    n1(7, t, r), $(c);
  }
}
function Ji(e, t, r, n) {
  return function c(i) {
    if (i === Function) return n;
    let a = e.componentOffset > -1 ? B1(e.index, t) : t;
    Kr(a, 5);
    let o = Ki(t, r, n, i),
      s = c.__ngNextListenerFn__;
    for (; s; ) (o = Ki(t, r, s, i) && o), (s = s.__ngNextListenerFn__);
    return o;
  };
}
function B3(e = 1) {
  return C9(e);
}
function ud(e, t) {
  let r = null,
    n = bl(e);
  for (let c = 0; c < t.length; c++) {
    let i = t[c];
    if (i === "*") {
      r = c;
      continue;
    }
    if (n === null ? Ca(e, i, !0) : Sl(n, i)) return c;
  }
  return r;
}
function Ds(e) {
  let t = Q()[R2][z2];
  if (!t.projection) {
    let r = e ? e.length : 1,
      n = (t.projection = Ml(r, null)),
      c = n.slice(),
      i = t.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let a = e ? ud(i, e) : 0;
        a !== null &&
          (c[a] ? (c[a].projectionNext = i) : (n[a] = i), (c[a] = i));
      }
      i = i.next;
    }
  }
}
function Ss(e, t = 0, r, n, c, i) {
  let a = Q(),
    o = G2(),
    s = n ? e + 1 : null;
  s !== null && xs(a, o, s, n, c, i, null, r);
  let l = O3(o, W2 + e, 16, null, r || null);
  l.projection === null && (l.projection = t), Wa();
  let u = !a[L3] || ja();
  a[R2][z2].projection[l.projection] === null && s !== null
    ? dd(a, o, s)
    : u && (l.flags & 32) !== 32 && kf(o, a, l);
}
function dd(e, t, r) {
  let n = W2 + r,
    c = t.data[n],
    i = e[n],
    a = sr(i, c.tView.ssrId),
    o = us(e, c, void 0, { dehydratedView: a });
  ds(i, o, 0, ar(c, a));
}
function Je(e, t, r) {
  return Ns(e, "", t, "", r), Je;
}
function Ns(e, t, r, n, c) {
  let i = Q(),
    a = bs(i, t, r, n);
  if (a !== pe) {
    let o = G2(),
      s = Pt();
    Zr(o, s, i, e, a, i[l2], c, !1);
  }
  return Ns;
}
function j3(e) {
  let t = u9();
  return t9(t, W2 + e);
}
function A(e, t = "") {
  let r = Q(),
    n = G2(),
    c = e + W2,
    i = n.firstCreatePass ? O3(n, c, 1, t, null) : n.data[c],
    a = hd(n, r, i, t, e);
  (r[c] = a), Ar() && qr(n, r, a, i), R3(i, !1);
}
var hd = (e, t, r, n, c) => (Tr(!0), zf(t[l2], n));
function H1(e) {
  return h2("", e, ""), H1;
}
function h2(e, t, r) {
  let n = Q(),
    c = bs(n, e, t, r);
  return c !== pe && fs(n, _t(), c), h2;
}
function U3(e, t, r, n, c) {
  let i = Q(),
    a = rd(i, e, t, r, n, c);
  return a !== pe && fs(i, _t(), a), U3;
}
var pd = (() => {
  let t = class t {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let c = ba(!1, n.type),
          i =
            c.length > 0
              ? ec([c], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, i);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  t.ɵprov = V({
    token: t,
    providedIn: "environment",
    factory: () => new t(L(H2)),
  });
  let e = t;
  return e;
})();
function D2(e) {
  Jr("NgStandalone"),
    (e.getStandaloneInjector = (t) =>
      t.get(pd).getOrCreateStandaloneInjector(e));
}
function Es(e, t) {
  return Cs(e, t);
}
var Yt = (() => {
  let t = class t {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "platform" }));
  let e = t;
  return e;
})();
var Is = new b("");
function $3(e) {
  return !!e && typeof e.then == "function";
}
function As(e) {
  return !!e && typeof e.subscribe == "function";
}
var Ts = new b(""),
  ks = (() => {
    let t = class t {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, c) => {
            (this.resolve = n), (this.reject = c);
          })),
          (this.appInits = m(Ts, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let i of this.appInits) {
          let a = i();
          if ($3(a)) n.push(a);
          else if (As(a)) {
            let o = new Promise((s, l) => {
              a.subscribe({ complete: s, error: l });
            });
            n.push(o);
          }
        }
        let c = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            c();
          })
          .catch((i) => {
            this.reject(i);
          }),
          n.length === 0 && c(),
          (this.initialized = !0);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  Zt = new b("");
function md() {
  B0(() => {
    throw new x(600, !1);
  });
}
function gd(e) {
  return e.isBoundToModule;
}
var vd = 10;
function Md(e, t, r) {
  try {
    let n = r();
    return $3(n)
      ? n.catch((c) => {
          throw (t.runOutsideAngular(() => e.handleError(c)), c);
        })
      : n;
  } catch (n) {
    throw (t.runOutsideAngular(() => e.handleError(n)), n);
  }
}
var $1 = (() => {
  let t = class t {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = m(W9)),
        (this.afterRenderManager = m(nd)),
        (this.zonelessEnabled = m(ys)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new g2()),
        (this.afterTick = new g2()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = m(M1).hasPendingTasks.pipe(R((n) => !n))),
        (this._injector = m(H2));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let n;
      return new Promise((c) => {
        n = this.isStable.subscribe({
          next: (i) => {
            i && c();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, c) {
      let i = n instanceof Vt;
      if (!this._injector.get(ks).done) {
        let h = !i && za(n),
          p = !1;
        throw new x(405, p);
      }
      let o;
      i ? (o = n) : (o = this._injector.get(Ge).resolveComponentFactory(n)),
        this.componentTypes.push(o.componentType);
      let s = gd(o) ? void 0 : this._injector.get(_1),
        l = c || o.selector,
        f = o.create(le.NULL, [], l, s),
        u = f.location.nativeElement,
        d = f.injector.get(Is, null);
      return (
        d?.registerApplication(u),
        f.onDestroy(() => {
          this.detachView(f.hostView),
            at(this.components, f),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(f),
        f
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new x(101, !1);
      let n = $(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (c) {
        this.internalErrorHandler(c);
      } finally {
        (this._runningTick = !1), $(n), this.afterTick.next();
      }
    }
    synchronize() {
      let n = null;
      this._injector.destroyed ||
        (n = this._injector.get(Ye, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let c = 0;
      for (; this.dirtyFlags !== 0 && c++ < vd; ) this.synchronizeOnce(n);
    }
    synchronizeOnce(n) {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 7)
      ) {
        let c = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8),
          (this.dirtyFlags |= 8),
          this.beforeRender.next(c);
        for (let { _lView: i, notifyErrorHandler: a } of this._views)
          Cd(i, a, c, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 7)
        )
          return;
      } else n?.begin?.(), n?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => Tt(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let c = n;
      this._views.push(c), c.attachToAppRef(this);
    }
    detachView(n) {
      let c = n;
      at(this._views, c), c.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let c = this._injector.get(Zt, []);
      [...this._bootstrapListeners, ...c].forEach((i) => i(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => at(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new x(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
function at(e, t) {
  let r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}
function Cd(e, t, r, n) {
  if (!r && !Tt(e)) return;
  ms(e, t, r && !n ? 0 : 1);
}
var mr = class {
    constructor(t, r) {
      (this.ngModuleFactory = t), (this.componentFactories = r);
    }
  },
  nc = (() => {
    let t = class t {
      compileModuleSync(n) {
        return new pr(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let c = this.compileModuleSync(n),
          i = Va(n),
          a = _o(i.declarations).reduce((o, s) => {
            let l = ie(s);
            return l && o.push(new E3(l)), o;
          }, []);
        return new mr(c, a);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
var yd = (() => {
  let t = class t {
    constructor() {
      (this.zone = m(n2)),
        (this.changeDetectionScheduler = m(qe)),
        (this.applicationRef = m($1));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.changeDetectionScheduler.runningTick ||
                this.zone.run(() => {
                  this.applicationRef.tick();
                });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
function Hd({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: r,
}) {
  return (
    (e ??= () => new n2(J(H({}, zd()), { scheduleInRootZone: r }))),
    [
      { provide: n2, useFactory: e },
      {
        provide: je,
        multi: !0,
        useFactory: () => {
          let n = m(yd, { optional: !0 });
          return () => n.initialize();
        },
      },
      {
        provide: je,
        multi: !0,
        useFactory: () => {
          let n = m(Vd);
          return () => {
            n.initialize();
          };
        },
      },
      t === !0 ? { provide: Hs, useValue: !0 } : [],
      { provide: zs, useValue: r ?? ho },
    ]
  );
}
function zd(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var Vd = (() => {
  let t = class t {
    constructor() {
      (this.subscription = new i2()),
        (this.initialized = !1),
        (this.zone = m(n2)),
        (this.pendingTasks = m(M1));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              n2.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            n2.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
var wd = (() => {
  let t = class t {
    constructor() {
      (this.appRef = m($1)),
        (this.taskService = m(M1)),
        (this.ngZone = m(n2)),
        (this.zonelessEnabled = m(ys)),
        (this.disableScheduling = m(Hs, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new i2()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(yt)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (m(zs, { optional: !0 }) ?? !1)),
        (this.cancelScheduledCallback = null),
        (this.useMicrotaskScheduler = !1),
        (this.runningTick = !1),
        (this.pendingRenderTaskId = null),
        this.subscriptions.add(
          this.appRef.afterTick.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof W6 || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 7: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 9:
        case 8:
        case 6:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (!this.shouldScheduleTick()) return;
      let c = this.useMicrotaskScheduler ? Ti : mo;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              c(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              c(() => this.tick())
            ));
    }
    shouldScheduleTick() {
      return !(
        this.disableScheduling ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(yt + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (c) {
        throw (this.taskService.remove(n), c);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        Ti(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
function xd() {
  return (typeof $localize < "u" && $localize.locale) || bt;
}
var rc = new b("", {
  providedIn: "root",
  factory: () => m(rc, _.Optional | _.SkipSelf) || xd(),
});
var Rs = new b("");
function nt(e) {
  return !!e.platformInjector;
}
function bd(e) {
  let t = nt(e) ? e.r3Injector : e.moduleRef.injector,
    r = t.get(n2);
  return r.run(() => {
    nt(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let n = t.get(p1, null),
      c;
    if (
      (r.runOutsideAngular(() => {
        c = r.onError.subscribe({
          next: (i) => {
            n.handleError(i);
          },
        });
      }),
      nt(e))
    ) {
      let i = () => t.destroy(),
        a = e.platformInjector.get(Rs);
      a.add(i),
        t.onDestroy(() => {
          c.unsubscribe(), a.delete(i);
        });
    } else
      e.moduleRef.onDestroy(() => {
        at(e.allPlatformModules, e.moduleRef), c.unsubscribe();
      });
    return Md(n, r, () => {
      let i = t.get(ks);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let a = t.get(rc, bt);
          if ((od(a || bt), nt(e))) {
            let o = t.get($1);
            return (
              e.rootComponent !== void 0 && o.bootstrap(e.rootComponent), o
            );
          } else return Ld(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function Ld(e, t) {
  let r = e.injector.get($1);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((n) => r.bootstrap(n));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(r);
  else throw new x(-403, !1);
  t.push(e);
}
var ot = null;
function Dd(e = [], t) {
  return le.create({
    name: t,
    providers: [
      { provide: Et, useValue: "platform" },
      { provide: Rs, useValue: new Set([() => (ot = null)]) },
      ...e,
    ],
  });
}
function Sd(e = []) {
  if (ot) return ot;
  let t = Dd(e);
  return (ot = t), md(), Nd(t), t;
}
function Nd(e) {
  e.get(Fr, null)?.forEach((r) => r());
}
var W3 = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = Ed;
  let e = t;
  return e;
})();
function Ed(e) {
  return Id(P2(), Q(), (e & 16) === 16);
}
function Id(e, t, r) {
  if (At(e) && !r) {
    let n = B1(e.index, t);
    return new ue(n, n);
  } else if (e.type & 175) {
    let n = t[R2];
    return new ue(n, t);
  }
  return null;
}
var gr = class {
    constructor() {}
    supports(t) {
      return ws(t);
    }
    create(t) {
      return new vr(t);
    }
  },
  Ad = (e, t) => t,
  vr = class {
    constructor(t) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = t || Ad);
    }
    forEachItem(t) {
      let r;
      for (r = this._itHead; r !== null; r = r._next) t(r);
    }
    forEachOperation(t) {
      let r = this._itHead,
        n = this._removalsHead,
        c = 0,
        i = null;
      for (; r || n; ) {
        let a = !n || (r && r.currentIndex < ea(n, c, i)) ? r : n,
          o = ea(a, c, i),
          s = a.currentIndex;
        if (a === n) c--, (n = n._nextRemoved);
        else if (((r = r._next), a.previousIndex == null)) c++;
        else {
          i || (i = []);
          let l = o - c,
            f = s - c;
          if (l != f) {
            for (let d = 0; d < l; d++) {
              let h = d < i.length ? i[d] : (i[d] = 0),
                p = h + d;
              f <= p && p < l && (i[d] = h + 1);
            }
            let u = a.previousIndex;
            i[u] = f - l;
          }
        }
        o !== s && t(a, o, s);
      }
    }
    forEachPreviousItem(t) {
      let r;
      for (r = this._previousItHead; r !== null; r = r._nextPrevious) t(r);
    }
    forEachAddedItem(t) {
      let r;
      for (r = this._additionsHead; r !== null; r = r._nextAdded) t(r);
    }
    forEachMovedItem(t) {
      let r;
      for (r = this._movesHead; r !== null; r = r._nextMoved) t(r);
    }
    forEachRemovedItem(t) {
      let r;
      for (r = this._removalsHead; r !== null; r = r._nextRemoved) t(r);
    }
    forEachIdentityChange(t) {
      let r;
      for (r = this._identityChangesHead; r !== null; r = r._nextIdentityChange)
        t(r);
    }
    diff(t) {
      if ((t == null && (t = []), !ws(t))) throw new x(900, !1);
      return this.check(t) ? this : null;
    }
    onDestroy() {}
    check(t) {
      this._reset();
      let r = this._itHead,
        n = !1,
        c,
        i,
        a;
      if (Array.isArray(t)) {
        this.length = t.length;
        for (let o = 0; o < this.length; o++)
          (i = t[o]),
            (a = this._trackByFn(o, i)),
            r === null || !Object.is(r.trackById, a)
              ? ((r = this._mismatch(r, i, a, o)), (n = !0))
              : (n && (r = this._verifyReinsertion(r, i, a, o)),
                Object.is(r.item, i) || this._addIdentityChange(r, i)),
            (r = r._next);
      } else
        (c = 0),
          Zu(t, (o) => {
            (a = this._trackByFn(c, o)),
              r === null || !Object.is(r.trackById, a)
                ? ((r = this._mismatch(r, o, a, c)), (n = !0))
                : (n && (r = this._verifyReinsertion(r, o, a, c)),
                  Object.is(r.item, o) || this._addIdentityChange(r, o)),
              (r = r._next),
              c++;
          }),
          (this.length = c);
      return this._truncate(r), (this.collection = t), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let t;
        for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
          t._nextPrevious = t._next;
        for (t = this._additionsHead; t !== null; t = t._nextAdded)
          t.previousIndex = t.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, t = this._movesHead;
          t !== null;
          t = t._nextMoved
        )
          t.previousIndex = t.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(t, r, n, c) {
      let i;
      return (
        t === null ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
        (t =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(n, null)),
        t !== null
          ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
            this._reinsertAfter(t, i, c))
          : ((t =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(n, c)),
            t !== null
              ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
                this._moveAfter(t, i, c))
              : (t = this._addAfter(new Mr(r, n), i, c))),
        t
      );
    }
    _verifyReinsertion(t, r, n, c) {
      let i =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(n, null);
      return (
        i !== null
          ? (t = this._reinsertAfter(i, t._prev, c))
          : t.currentIndex != c &&
            ((t.currentIndex = c), this._addToMoves(t, c)),
        t
      );
    }
    _truncate(t) {
      for (; t !== null; ) {
        let r = t._next;
        this._addToRemovals(this._unlink(t)), (t = r);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(t, r, n) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
      let c = t._prevRemoved,
        i = t._nextRemoved;
      return (
        c === null ? (this._removalsHead = i) : (c._nextRemoved = i),
        i === null ? (this._removalsTail = c) : (i._prevRemoved = c),
        this._insertAfter(t, r, n),
        this._addToMoves(t, n),
        t
      );
    }
    _moveAfter(t, r, n) {
      return (
        this._unlink(t), this._insertAfter(t, r, n), this._addToMoves(t, n), t
      );
    }
    _addAfter(t, r, n) {
      return (
        this._insertAfter(t, r, n),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = t)
          : (this._additionsTail = this._additionsTail._nextAdded = t),
        t
      );
    }
    _insertAfter(t, r, n) {
      let c = r === null ? this._itHead : r._next;
      return (
        (t._next = c),
        (t._prev = r),
        c === null ? (this._itTail = t) : (c._prev = t),
        r === null ? (this._itHead = t) : (r._next = t),
        this._linkedRecords === null && (this._linkedRecords = new Lt()),
        this._linkedRecords.put(t),
        (t.currentIndex = n),
        t
      );
    }
    _remove(t) {
      return this._addToRemovals(this._unlink(t));
    }
    _unlink(t) {
      this._linkedRecords !== null && this._linkedRecords.remove(t);
      let r = t._prev,
        n = t._next;
      return (
        r === null ? (this._itHead = n) : (r._next = n),
        n === null ? (this._itTail = r) : (n._prev = r),
        t
      );
    }
    _addToMoves(t, r) {
      return (
        t.previousIndex === r ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = t)
            : (this._movesTail = this._movesTail._nextMoved = t)),
        t
      );
    }
    _addToRemovals(t) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new Lt()),
        this._unlinkedRecords.put(t),
        (t.currentIndex = null),
        (t._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = t),
            (t._prevRemoved = null))
          : ((t._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = t)),
        t
      );
    }
    _addIdentityChange(t, r) {
      return (
        (t.item = r),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = t)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                t),
        t
      );
    }
  },
  Mr = class {
    constructor(t, r) {
      (this.item = t),
        (this.trackById = r),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  Cr = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(t) {
      this._head === null
        ? ((this._head = this._tail = t),
          (t._nextDup = null),
          (t._prevDup = null))
        : ((this._tail._nextDup = t),
          (t._prevDup = this._tail),
          (t._nextDup = null),
          (this._tail = t));
    }
    get(t, r) {
      let n;
      for (n = this._head; n !== null; n = n._nextDup)
        if ((r === null || r <= n.currentIndex) && Object.is(n.trackById, t))
          return n;
      return null;
    }
    remove(t) {
      let r = t._prevDup,
        n = t._nextDup;
      return (
        r === null ? (this._head = n) : (r._nextDup = n),
        n === null ? (this._tail = r) : (n._prevDup = r),
        this._head === null
      );
    }
  },
  Lt = class {
    constructor() {
      this.map = new Map();
    }
    put(t) {
      let r = t.trackById,
        n = this.map.get(r);
      n || ((n = new Cr()), this.map.set(r, n)), n.add(t);
    }
    get(t, r) {
      let n = t,
        c = this.map.get(n);
      return c ? c.get(t, r) : null;
    }
    remove(t) {
      let r = t.trackById;
      return this.map.get(r).remove(t) && this.map.delete(r), t;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function ea(e, t, r) {
  let n = e.previousIndex;
  if (n === null) return n;
  let c = 0;
  return r && n < r.length && (c = r[n]), n + t + c;
}
function ta() {
  return new cc([new gr()]);
}
var cc = (() => {
  let t = class t {
    constructor(n) {
      this.factories = n;
    }
    static create(n, c) {
      if (c != null) {
        let i = c.factories.slice();
        n = n.concat(i);
      }
      return new t(n);
    }
    static extend(n) {
      return {
        provide: t,
        useFactory: (c) => t.create(n, c || ta()),
        deps: [[t, new ha(), new Hr()]],
      };
    }
    find(n) {
      let c = this.factories.find((i) => i.supports(n));
      if (c != null) return c;
      throw new x(901, !1);
    }
  };
  t.ɵprov = V({ token: t, providedIn: "root", factory: ta });
  let e = t;
  return e;
})();
function _s(e) {
  try {
    let { rootComponent: t, appProviders: r, platformProviders: n } = e,
      c = Sd(n),
      i = [Hd({}), { provide: qe, useExisting: wd }, ...(r || [])],
      a = new xt({
        providers: i,
        parent: c,
        debugName: "",
        runEnvironmentInitializers: !1,
      });
    return bd({
      r3Injector: a.injector,
      platformInjector: c,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var Ps = new b("");
var $s = null;
function e3() {
  return $s;
}
function Ws(e) {
  $s ??= e;
}
var Qt = class {};
var m2 = new b(""),
  qs = (() => {
    let t = class t {
      historyGo(n) {
        throw new Error("");
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(Pd), providedIn: "platform" }));
    let e = t;
    return e;
  })();
var Pd = (() => {
  let t = class t extends qs {
    constructor() {
      super(),
        (this._doc = m(m2)),
        (this._location = window.location),
        (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return e3().getBaseHref(this._doc);
    }
    onPopState(n) {
      let c = e3().getGlobalEventTarget(this._doc, "window");
      return (
        c.addEventListener("popstate", n, !1),
        () => c.removeEventListener("popstate", n)
      );
    }
    onHashChange(n) {
      let c = e3().getGlobalEventTarget(this._doc, "window");
      return (
        c.addEventListener("hashchange", n, !1),
        () => c.removeEventListener("hashchange", n)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(n) {
      this._location.pathname = n;
    }
    pushState(n, c, i) {
      this._history.pushState(n, c, i);
    }
    replaceState(n, c, i) {
      this._history.replaceState(n, c, i);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(n = 0) {
      this._history.go(n);
    }
    getState() {
      return this._history.state;
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵprov = V({ token: t, factory: () => new t(), providedIn: "platform" }));
  let e = t;
  return e;
})();
function Gs(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let r = 0;
  return (
    e.endsWith("/") && r++,
    t.startsWith("/") && r++,
    r == 2 ? e + t.substring(1) : r == 1 ? e + t : e + "/" + t
  );
}
function Os(e) {
  let t = e.match(/#|\?|$/),
    r = (t && t.index) || e.length,
    n = r - (e[r - 1] === "/" ? 1 : 0);
  return e.slice(0, n) + e.slice(r);
}
function ge(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var Xt = (() => {
    let t = class t {
      historyGo(n) {
        throw new Error("");
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(Ys), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  Od = new b(""),
  Ys = (() => {
    let t = class t extends Xt {
      constructor(n, c) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            c ??
            this._platformLocation.getBaseHrefFromDOM() ??
            m(m2).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Gs(this._baseHref, n);
      }
      path(n = !1) {
        let c =
            this._platformLocation.pathname + ge(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && n ? `${c}${i}` : c;
      }
      pushState(n, c, i, a) {
        let o = this.prepareExternalUrl(i + ge(a));
        this._platformLocation.pushState(n, c, o);
      }
      replaceState(n, c, i, a) {
        let o = this.prepareExternalUrl(i + ge(a));
        this._platformLocation.replaceState(n, c, o);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(qs), L(Od, 8));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
var q3 = (() => {
  let t = class t {
    constructor(n) {
      (this._subject = new v2()),
        (this._urlChangeListeners = []),
        (this._urlChangeSubscription = null),
        (this._locationStrategy = n);
      let c = this._locationStrategy.getBaseHref();
      (this._basePath = jd(Os(Fs(c)))),
        this._locationStrategy.onPopState((i) => {
          this._subject.emit({
            url: this.path(!0),
            pop: !0,
            state: i.state,
            type: i.type,
          });
        });
    }
    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(),
        (this._urlChangeListeners = []);
    }
    path(n = !1) {
      return this.normalize(this._locationStrategy.path(n));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(n, c = "") {
      return this.path() == this.normalize(n + ge(c));
    }
    normalize(n) {
      return t.stripTrailingSlash(Bd(this._basePath, Fs(n)));
    }
    prepareExternalUrl(n) {
      return (
        n && n[0] !== "/" && (n = "/" + n),
        this._locationStrategy.prepareExternalUrl(n)
      );
    }
    go(n, c = "", i = null) {
      this._locationStrategy.pushState(i, "", n, c),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ge(c)), i);
    }
    replaceState(n, c = "", i = null) {
      this._locationStrategy.replaceState(i, "", n, c),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ge(c)), i);
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(n = 0) {
      this._locationStrategy.historyGo?.(n);
    }
    onUrlChange(n) {
      return (
        this._urlChangeListeners.push(n),
        (this._urlChangeSubscription ??= this.subscribe((c) => {
          this._notifyUrlChangeListeners(c.url, c.state);
        })),
        () => {
          let c = this._urlChangeListeners.indexOf(n);
          this._urlChangeListeners.splice(c, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(),
              (this._urlChangeSubscription = null));
        }
      );
    }
    _notifyUrlChangeListeners(n = "", c) {
      this._urlChangeListeners.forEach((i) => i(n, c));
    }
    subscribe(n, c, i) {
      return this._subject.subscribe({ next: n, error: c, complete: i });
    }
  };
  (t.normalizeQueryParams = ge),
    (t.joinWithSlash = Gs),
    (t.stripTrailingSlash = Os),
    (t.ɵfac = function (c) {
      return new (c || t)(L(Xt));
    }),
    (t.ɵprov = V({ token: t, factory: () => Fd(), providedIn: "root" }));
  let e = t;
  return e;
})();
function Fd() {
  return new q3(L(Xt));
}
function Bd(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let r = t.substring(e.length);
  return r === "" || ["/", ";", "?", "#"].includes(r[0]) ? r : t;
}
function Fs(e) {
  return e.replace(/\/index.html$/, "");
}
function jd(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, r] = e.split(/\/\/[^\/]+/);
    return r;
  }
  return e;
}
function Kt(e, t) {
  t = encodeURIComponent(t);
  for (let r of e.split(";")) {
    let n = r.indexOf("="),
      [c, i] = n == -1 ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
    if (c.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var ac = class {
    constructor(t, r, n, c) {
      (this.$implicit = t),
        (this.ngForOf = r),
        (this.index = n),
        (this.count = c);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  Zs = (() => {
    let t = class t {
      set ngForOf(n) {
        (this._ngForOf = n), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(n) {
        this._trackByFn = n;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      constructor(n, c, i) {
        (this._viewContainer = n),
          (this._template = c),
          (this._differs = i),
          (this._ngForOf = null),
          (this._ngForOfDirty = !0),
          (this._differ = null);
      }
      set ngForTemplate(n) {
        n && (this._template = n);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let n = this._ngForOf;
          if (!this._differ && n)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(n).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let n = this._differ.diff(this._ngForOf);
          n && this._applyChanges(n);
        }
      }
      _applyChanges(n) {
        let c = this._viewContainer;
        n.forEachOperation((i, a, o) => {
          if (i.previousIndex == null)
            c.createEmbeddedView(
              this._template,
              new ac(i.item, this._ngForOf, -1, -1),
              o === null ? void 0 : o
            );
          else if (o == null) c.remove(a === null ? void 0 : a);
          else if (a !== null) {
            let s = c.get(a);
            c.move(s, o), Bs(s, i);
          }
        });
        for (let i = 0, a = c.length; i < a; i++) {
          let s = c.get(i).context;
          (s.index = i), (s.count = a), (s.ngForOf = this._ngForOf);
        }
        n.forEachIdentityChange((i) => {
          let a = c.get(i.currentIndex);
          Bs(a, i);
        });
      }
      static ngTemplateContextGuard(n, c) {
        return !0;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(a2(Ke), a2(qt), a2(cc));
    }),
      (t.ɵdir = de({
        type: t,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate",
        },
        standalone: !0,
      }));
    let e = t;
    return e;
  })();
function Bs(e, t) {
  e.context.$implicit = t.item;
}
var Jt = (() => {
    let t = class t {
      constructor(n, c) {
        (this._viewContainer = n),
          (this._context = new oc()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = c);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        js("ngIfThen", n),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        js("ngIfElse", n),
          (this._elseTemplateRef = n),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(n, c) {
        return !0;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(a2(Ke), a2(qt));
    }),
      (t.ɵdir = de({
        type: t,
        selectors: [["", "ngIf", ""]],
        inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
        standalone: !0,
      }));
    let e = t;
    return e;
  })(),
  oc = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function js(e, t) {
  if (!!!(!t || t.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${y2(t)}'.`);
}
var ve = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵmod = O1({ type: t })),
      (t.ɵinj = P1({}));
    let e = t;
    return e;
  })(),
  Qs = "browser",
  Ud = "server";
function en(e) {
  return e === Ud;
}
var t3 = class {};
var Y3 = class {},
  nn = class {},
  O2 = class e {
    constructor(t) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        t
          ? typeof t == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  t
                    .split(
                      `
`
                    )
                    .forEach((r) => {
                      let n = r.indexOf(":");
                      if (n > 0) {
                        let c = r.slice(0, n),
                          i = c.toLowerCase(),
                          a = r.slice(n + 1).trim();
                        this.maybeSetNormalizedName(c, i),
                          this.headers.has(i)
                            ? this.headers.get(i).push(a)
                            : this.headers.set(i, [a]);
                      }
                    });
              })
            : typeof Headers < "u" && t instanceof Headers
            ? ((this.headers = new Map()),
              t.forEach((r, n) => {
                this.setHeaderEntries(n, r);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(t).forEach(([r, n]) => {
                    this.setHeaderEntries(r, n);
                  });
              })
          : (this.headers = new Map());
    }
    has(t) {
      return this.init(), this.headers.has(t.toLowerCase());
    }
    get(t) {
      this.init();
      let r = this.headers.get(t.toLowerCase());
      return r && r.length > 0 ? r[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(t) {
      return this.init(), this.headers.get(t.toLowerCase()) || null;
    }
    append(t, r) {
      return this.clone({ name: t, value: r, op: "a" });
    }
    set(t, r) {
      return this.clone({ name: t, value: r, op: "s" });
    }
    delete(t, r) {
      return this.clone({ name: t, value: r, op: "d" });
    }
    maybeSetNormalizedName(t, r) {
      this.normalizedNames.has(r) || this.normalizedNames.set(r, t);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
          (this.lazyUpdate = null)));
    }
    copyFrom(t) {
      t.init(),
        Array.from(t.headers.keys()).forEach((r) => {
          this.headers.set(r, t.headers.get(r)),
            this.normalizedNames.set(r, t.normalizedNames.get(r));
        });
    }
    clone(t) {
      let r = new e();
      return (
        (r.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (r.lazyUpdate = (this.lazyUpdate || []).concat([t])),
        r
      );
    }
    applyUpdate(t) {
      let r = t.name.toLowerCase();
      switch (t.op) {
        case "a":
        case "s":
          let n = t.value;
          if ((typeof n == "string" && (n = [n]), n.length === 0)) return;
          this.maybeSetNormalizedName(t.name, r);
          let c = (t.op === "a" ? this.headers.get(r) : void 0) || [];
          c.push(...n), this.headers.set(r, c);
          break;
        case "d":
          let i = t.value;
          if (!i) this.headers.delete(r), this.normalizedNames.delete(r);
          else {
            let a = this.headers.get(r);
            if (!a) return;
            (a = a.filter((o) => i.indexOf(o) === -1)),
              a.length === 0
                ? (this.headers.delete(r), this.normalizedNames.delete(r))
                : this.headers.set(r, a);
          }
          break;
      }
    }
    setHeaderEntries(t, r) {
      let n = (Array.isArray(r) ? r : [r]).map((i) => i.toString()),
        c = t.toLowerCase();
      this.headers.set(c, n), this.maybeSetNormalizedName(t, c);
    }
    forEach(t) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((r) =>
          t(this.normalizedNames.get(r), this.headers.get(r))
        );
    }
  };
var fc = class {
  encodeKey(t) {
    return Xs(t);
  }
  encodeValue(t) {
    return Xs(t);
  }
  decodeKey(t) {
    return decodeURIComponent(t);
  }
  decodeValue(t) {
    return decodeURIComponent(t);
  }
};
function $d(e, t) {
  let r = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((c) => {
          let i = c.indexOf("="),
            [a, o] =
              i == -1
                ? [t.decodeKey(c), ""]
                : [t.decodeKey(c.slice(0, i)), t.decodeValue(c.slice(i + 1))],
            s = r.get(a) || [];
          s.push(o), r.set(a, s);
        }),
    r
  );
}
var Wd = /%(\d[a-f0-9])/gi,
  qd = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function Xs(e) {
  return encodeURIComponent(e).replace(Wd, (t, r) => qd[r] ?? t);
}
function tn(e) {
  return `${e}`;
}
var Y2 = class e {
  constructor(t = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = t.encoder || new fc()),
      t.fromString)
    ) {
      if (t.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = $d(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((r) => {
            let n = t.fromObject[r],
              c = Array.isArray(n) ? n.map(tn) : [tn(n)];
            this.map.set(r, c);
          }))
        : (this.map = null);
  }
  has(t) {
    return this.init(), this.map.has(t);
  }
  get(t) {
    this.init();
    let r = this.map.get(t);
    return r ? r[0] : null;
  }
  getAll(t) {
    return this.init(), this.map.get(t) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(t, r) {
    return this.clone({ param: t, value: r, op: "a" });
  }
  appendAll(t) {
    let r = [];
    return (
      Object.keys(t).forEach((n) => {
        let c = t[n];
        Array.isArray(c)
          ? c.forEach((i) => {
              r.push({ param: n, value: i, op: "a" });
            })
          : r.push({ param: n, value: c, op: "a" });
      }),
      this.clone(r)
    );
  }
  set(t, r) {
    return this.clone({ param: t, value: r, op: "s" });
  }
  delete(t, r) {
    return this.clone({ param: t, value: r, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let r = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((n) => r + "=" + this.encoder.encodeValue(n))
            .join("&");
        })
        .filter((t) => t !== "")
        .join("&")
    );
  }
  clone(t) {
    let r = new e({ encoder: this.encoder });
    return (
      (r.cloneFrom = this.cloneFrom || this),
      (r.updates = (this.updates || []).concat(t)),
      r
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case "a":
            case "s":
              let r = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
              r.push(tn(t.value)), this.map.set(t.param, r);
              break;
            case "d":
              if (t.value !== void 0) {
                let n = this.map.get(t.param) || [],
                  c = n.indexOf(tn(t.value));
                c !== -1 && n.splice(c, 1),
                  n.length > 0
                    ? this.map.set(t.param, n)
                    : this.map.delete(t.param);
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var uc = class {
  constructor() {
    this.map = new Map();
  }
  set(t, r) {
    return this.map.set(t, r), this;
  }
  get(t) {
    return (
      this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    );
  }
  delete(t) {
    return this.map.delete(t), this;
  }
  has(t) {
    return this.map.has(t);
  }
  keys() {
    return this.map.keys();
  }
};
function Gd(e) {
  switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function Ks(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function Js(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function e8(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Yd(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var G3 = class e {
    constructor(t, r, n, c) {
      (this.url = r),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = t.toUpperCase());
      let i;
      if (
        (Gd(this.method) || c
          ? ((this.body = n !== void 0 ? n : null), (i = c))
          : (i = n),
        i &&
          ((this.reportProgress = !!i.reportProgress),
          (this.withCredentials = !!i.withCredentials),
          i.responseType && (this.responseType = i.responseType),
          i.headers && (this.headers = i.headers),
          i.context && (this.context = i.context),
          i.params && (this.params = i.params),
          (this.transferCache = i.transferCache)),
        (this.headers ??= new O2()),
        (this.context ??= new uc()),
        !this.params)
      )
        (this.params = new Y2()), (this.urlWithParams = r);
      else {
        let a = this.params.toString();
        if (a.length === 0) this.urlWithParams = r;
        else {
          let o = r.indexOf("?"),
            s = o === -1 ? "?" : o < r.length - 1 ? "&" : "";
          this.urlWithParams = r + s + a;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          Ks(this.body) ||
          Js(this.body) ||
          e8(this.body) ||
          Yd(this.body)
        ? this.body
        : this.body instanceof Y2
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || e8(this.body)
        ? null
        : Js(this.body)
        ? this.body.type || null
        : Ks(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof Y2
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(t = {}) {
      let r = t.method || this.method,
        n = t.url || this.url,
        c = t.responseType || this.responseType,
        i = t.transferCache ?? this.transferCache,
        a = t.body !== void 0 ? t.body : this.body,
        o = t.withCredentials ?? this.withCredentials,
        s = t.reportProgress ?? this.reportProgress,
        l = t.headers || this.headers,
        f = t.params || this.params,
        u = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (l = Object.keys(t.setHeaders).reduce(
            (d, h) => d.set(h, t.setHeaders[h]),
            l
          )),
        t.setParams &&
          (f = Object.keys(t.setParams).reduce(
            (d, h) => d.set(h, t.setParams[h]),
            f
          )),
        new e(r, n, a, {
          params: f,
          headers: l,
          context: u,
          reportProgress: s,
          responseType: c,
          withCredentials: o,
          transferCache: i,
        })
      );
    }
  },
  q1 = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(q1 || {}),
  Z3 = class {
    constructor(t, r = 200, n = "OK") {
      (this.headers = t.headers || new O2()),
        (this.status = t.status !== void 0 ? t.status : r),
        (this.statusText = t.statusText || n),
        (this.url = t.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  rn = class e extends Z3 {
    constructor(t = {}) {
      super(t), (this.type = q1.ResponseHeader);
    }
    clone(t = {}) {
      return new e({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Q3 = class e extends Z3 {
    constructor(t = {}) {
      super(t),
        (this.type = q1.Response),
        (this.body = t.body !== void 0 ? t.body : null);
    }
    clone(t = {}) {
      return new e({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  W1 = class extends Z3 {
    constructor(t) {
      super(t, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              t.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              t.url || "(unknown url)"
            }: ${t.status} ${t.statusText}`),
        (this.error = t.error || null);
    }
  },
  i8 = 200,
  Zd = 204;
function lc(e, t) {
  return {
    body: t,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    transferCache: e.transferCache,
  };
}
var pc = (() => {
    let t = class t {
      constructor(n) {
        this.handler = n;
      }
      request(n, c, i = {}) {
        let a;
        if (n instanceof G3) a = n;
        else {
          let l;
          i.headers instanceof O2 ? (l = i.headers) : (l = new O2(i.headers));
          let f;
          i.params &&
            (i.params instanceof Y2
              ? (f = i.params)
              : (f = new Y2({ fromObject: i.params }))),
            (a = new G3(n, c, i.body !== void 0 ? i.body : null, {
              headers: l,
              context: i.context,
              params: f,
              reportProgress: i.reportProgress,
              responseType: i.responseType || "json",
              withCredentials: i.withCredentials,
              transferCache: i.transferCache,
            }));
        }
        let o = D(a).pipe(N1((l) => this.handler.handle(l)));
        if (n instanceof G3 || i.observe === "events") return o;
        let s = o.pipe(x2((l) => l instanceof Q3));
        switch (i.observe || "body") {
          case "body":
            switch (a.responseType) {
              case "arraybuffer":
                return s.pipe(
                  R((l) => {
                    if (l.body !== null && !(l.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return l.body;
                  })
                );
              case "blob":
                return s.pipe(
                  R((l) => {
                    if (l.body !== null && !(l.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return l.body;
                  })
                );
              case "text":
                return s.pipe(
                  R((l) => {
                    if (l.body !== null && typeof l.body != "string")
                      throw new Error("Response is not a string.");
                    return l.body;
                  })
                );
              case "json":
              default:
                return s.pipe(R((l) => l.body));
            }
          case "response":
            return s;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${i.observe}}`
            );
        }
      }
      delete(n, c = {}) {
        return this.request("DELETE", n, c);
      }
      get(n, c = {}) {
        return this.request("GET", n, c);
      }
      head(n, c = {}) {
        return this.request("HEAD", n, c);
      }
      jsonp(n, c) {
        return this.request("JSONP", n, {
          params: new Y2().append(c, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(n, c = {}) {
        return this.request("OPTIONS", n, c);
      }
      patch(n, c, i = {}) {
        return this.request("PATCH", n, lc(i, c));
      }
      post(n, c, i = {}) {
        return this.request("POST", n, lc(i, c));
      }
      put(n, c, i = {}) {
        return this.request("PUT", n, lc(i, c));
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(Y3));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  Qd = /^\)\]\}',?\n/,
  Xd = "X-Request-URL";
function t8(e) {
  if (e.url) return e.url;
  let t = Xd.toLocaleLowerCase();
  return e.headers.get(t);
}
var Kd = (() => {
    let t = class t {
      constructor() {
        (this.fetchImpl =
          m(dc, { optional: !0 })?.fetch ?? ((...n) => globalThis.fetch(...n))),
          (this.ngZone = m(n2));
      }
      handle(n) {
        return new U((c) => {
          let i = new AbortController();
          return (
            this.doRequest(n, i.signal, c).then(hc, (a) =>
              c.error(new W1({ error: a }))
            ),
            () => i.abort()
          );
        });
      }
      doRequest(n, c, i) {
        return E4(this, null, function* () {
          let a = this.createRequestInit(n),
            o;
          try {
            let p = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(n.urlWithParams, H({ signal: c }, a))
            );
            Jd(p), i.next({ type: q1.Sent }), (o = yield p);
          } catch (p) {
            i.error(
              new W1({
                error: p,
                status: p.status ?? 0,
                statusText: p.statusText,
                url: n.urlWithParams,
                headers: p.headers,
              })
            );
            return;
          }
          let s = new O2(o.headers),
            l = o.statusText,
            f = t8(o) ?? n.urlWithParams,
            u = o.status,
            d = null;
          if (
            (n.reportProgress &&
              i.next(new rn({ headers: s, status: u, statusText: l, url: f })),
            o.body)
          ) {
            let p = o.headers.get("content-length"),
              w = [],
              M = o.body.getReader(),
              C = 0,
              I,
              P,
              k = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              E4(this, null, function* () {
                for (;;) {
                  let { done: q, value: c2 } = yield M.read();
                  if (q) break;
                  if ((w.push(c2), (C += c2.length), n.reportProgress)) {
                    P =
                      n.responseType === "text"
                        ? (P ?? "") +
                          (I ??= new TextDecoder()).decode(c2, { stream: !0 })
                        : void 0;
                    let K2 = () =>
                      i.next({
                        type: q1.DownloadProgress,
                        total: p ? +p : void 0,
                        loaded: C,
                        partialText: P,
                      });
                    k ? k.run(K2) : K2();
                  }
                }
              })
            );
            let Z = this.concatChunks(w, C);
            try {
              let q = o.headers.get("Content-Type") ?? "";
              d = this.parseBody(n, Z, q);
            } catch (q) {
              i.error(
                new W1({
                  error: q,
                  headers: new O2(o.headers),
                  status: o.status,
                  statusText: o.statusText,
                  url: t8(o) ?? n.urlWithParams,
                })
              );
              return;
            }
          }
          u === 0 && (u = d ? i8 : 0),
            u >= 200 && u < 300
              ? (i.next(
                  new Q3({
                    body: d,
                    headers: s,
                    status: u,
                    statusText: l,
                    url: f,
                  })
                ),
                i.complete())
              : i.error(
                  new W1({
                    error: d,
                    headers: s,
                    status: u,
                    statusText: l,
                    url: f,
                  })
                );
        });
      }
      parseBody(n, c, i) {
        switch (n.responseType) {
          case "json":
            let a = new TextDecoder().decode(c).replace(Qd, "");
            return a === "" ? null : JSON.parse(a);
          case "text":
            return new TextDecoder().decode(c);
          case "blob":
            return new Blob([c], { type: i });
          case "arraybuffer":
            return c.buffer;
        }
      }
      createRequestInit(n) {
        let c = {},
          i = n.withCredentials ? "include" : void 0;
        if (
          (n.headers.forEach((a, o) => (c[a] = o.join(","))),
          n.headers.has("Accept") ||
            (c.Accept = "application/json, text/plain, */*"),
          !n.headers.has("Content-Type"))
        ) {
          let a = n.detectContentTypeHeader();
          a !== null && (c["Content-Type"] = a);
        }
        return {
          body: n.serializeBody(),
          method: n.method,
          headers: c,
          credentials: i,
        };
      }
      concatChunks(n, c) {
        let i = new Uint8Array(c),
          a = 0;
        for (let o of n) i.set(o, a), (a += o.length);
        return i;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  dc = class {};
function hc() {}
function Jd(e) {
  e.then(hc, hc);
}
function a8(e, t) {
  return t(e);
}
function eh(e, t) {
  return (r, n) => t.intercept(r, { handle: (c) => e(c, n) });
}
function th(e, t, r) {
  return (n, c) => q2(r, () => t(n, (i) => e(i, c)));
}
var nh = new b(""),
  mc = new b(""),
  rh = new b(""),
  o8 = new b("", { providedIn: "root", factory: () => !0 });
function ch() {
  let e = null;
  return (t, r) => {
    e === null && (e = (m(nh, { optional: !0 }) ?? []).reduceRight(eh, a8));
    let n = m(M1);
    if (m(o8)) {
      let i = n.add();
      return e(t, r).pipe(I1(() => n.remove(i)));
    } else return e(t, r);
  };
}
var n8 = (() => {
  let t = class t extends Y3 {
    constructor(n, c) {
      super(),
        (this.backend = n),
        (this.injector = c),
        (this.chain = null),
        (this.pendingTasks = m(M1)),
        (this.contributeToStability = m(o8));
    }
    handle(n) {
      if (this.chain === null) {
        let c = Array.from(
          new Set([...this.injector.get(mc), ...this.injector.get(rh, [])])
        );
        this.chain = c.reduceRight((i, a) => th(i, a, this.injector), a8);
      }
      if (this.contributeToStability) {
        let c = this.pendingTasks.add();
        return this.chain(n, (i) => this.backend.handle(i)).pipe(
          I1(() => this.pendingTasks.remove(c))
        );
      } else return this.chain(n, (c) => this.backend.handle(c));
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)(L(nn), L(H2));
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac }));
  let e = t;
  return e;
})();
var ih = /^\)\]\}',?\n/;
function ah(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
    ? e.getResponseHeader("X-Request-URL")
    : null;
}
var r8 = (() => {
    let t = class t {
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new x(-2800, !1);
        let c = this.xhrFactory;
        return (c.ɵloadImpl ? t2(c.ɵloadImpl()) : D(null)).pipe(
          b2(
            () =>
              new U((a) => {
                let o = c.build();
                if (
                  (o.open(n.method, n.urlWithParams),
                  n.withCredentials && (o.withCredentials = !0),
                  n.headers.forEach((M, C) =>
                    o.setRequestHeader(M, C.join(","))
                  ),
                  n.headers.has("Accept") ||
                    o.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !n.headers.has("Content-Type"))
                ) {
                  let M = n.detectContentTypeHeader();
                  M !== null && o.setRequestHeader("Content-Type", M);
                }
                if (n.responseType) {
                  let M = n.responseType.toLowerCase();
                  o.responseType = M !== "json" ? M : "text";
                }
                let s = n.serializeBody(),
                  l = null,
                  f = () => {
                    if (l !== null) return l;
                    let M = o.statusText || "OK",
                      C = new O2(o.getAllResponseHeaders()),
                      I = ah(o) || n.url;
                    return (
                      (l = new rn({
                        headers: C,
                        status: o.status,
                        statusText: M,
                        url: I,
                      })),
                      l
                    );
                  },
                  u = () => {
                    let { headers: M, status: C, statusText: I, url: P } = f(),
                      k = null;
                    C !== Zd &&
                      (k =
                        typeof o.response > "u" ? o.responseText : o.response),
                      C === 0 && (C = k ? i8 : 0);
                    let Z = C >= 200 && C < 300;
                    if (n.responseType === "json" && typeof k == "string") {
                      let q = k;
                      k = k.replace(ih, "");
                      try {
                        k = k !== "" ? JSON.parse(k) : null;
                      } catch (c2) {
                        (k = q), Z && ((Z = !1), (k = { error: c2, text: k }));
                      }
                    }
                    Z
                      ? (a.next(
                          new Q3({
                            body: k,
                            headers: M,
                            status: C,
                            statusText: I,
                            url: P || void 0,
                          })
                        ),
                        a.complete())
                      : a.error(
                          new W1({
                            error: k,
                            headers: M,
                            status: C,
                            statusText: I,
                            url: P || void 0,
                          })
                        );
                  },
                  d = (M) => {
                    let { url: C } = f(),
                      I = new W1({
                        error: M,
                        status: o.status || 0,
                        statusText: o.statusText || "Unknown Error",
                        url: C || void 0,
                      });
                    a.error(I);
                  },
                  h = !1,
                  p = (M) => {
                    h || (a.next(f()), (h = !0));
                    let C = { type: q1.DownloadProgress, loaded: M.loaded };
                    M.lengthComputable && (C.total = M.total),
                      n.responseType === "text" &&
                        o.responseText &&
                        (C.partialText = o.responseText),
                      a.next(C);
                  },
                  w = (M) => {
                    let C = { type: q1.UploadProgress, loaded: M.loaded };
                    M.lengthComputable && (C.total = M.total), a.next(C);
                  };
                return (
                  o.addEventListener("load", u),
                  o.addEventListener("error", d),
                  o.addEventListener("timeout", d),
                  o.addEventListener("abort", d),
                  n.reportProgress &&
                    (o.addEventListener("progress", p),
                    s !== null &&
                      o.upload &&
                      o.upload.addEventListener("progress", w)),
                  o.send(s),
                  a.next({ type: q1.Sent }),
                  () => {
                    o.removeEventListener("error", d),
                      o.removeEventListener("abort", d),
                      o.removeEventListener("load", u),
                      o.removeEventListener("timeout", d),
                      n.reportProgress &&
                        (o.removeEventListener("progress", p),
                        s !== null &&
                          o.upload &&
                          o.upload.removeEventListener("progress", w)),
                      o.readyState !== o.DONE && o.abort();
                  }
                );
              })
          )
        );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(t3));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  s8 = new b(""),
  oh = "XSRF-TOKEN",
  sh = new b("", { providedIn: "root", factory: () => oh }),
  lh = "X-XSRF-TOKEN",
  fh = new b("", { providedIn: "root", factory: () => lh }),
  cn = class {},
  uh = (() => {
    let t = class t {
      constructor(n, c, i) {
        (this.doc = n),
          (this.platform = c),
          (this.cookieName = i),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = Kt(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2), L(j1), L(sh));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })();
function dh(e, t) {
  let r = e.url.toLowerCase();
  if (
    !m(s8) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    r.startsWith("http://") ||
    r.startsWith("https://")
  )
    return t(e);
  let n = m(cn).getToken(),
    c = m(fh);
  return (
    n != null &&
      !e.headers.has(c) &&
      (e = e.clone({ headers: e.headers.set(c, n) })),
    t(e)
  );
}
var l8 = (function (e) {
  return (
    (e[(e.Interceptors = 0)] = "Interceptors"),
    (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
    (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (e[(e.Fetch = 6)] = "Fetch"),
    e
  );
})(l8 || {});
function hh(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function gc(...e) {
  let t = [
    pc,
    r8,
    n8,
    { provide: Y3, useExisting: n8 },
    { provide: nn, useFactory: () => m(Kd, { optional: !0 }) ?? m(r8) },
    { provide: mc, useValue: dh, multi: !0 },
    { provide: s8, useValue: !0 },
    { provide: cn, useClass: uh },
  ];
  for (let r of e) t.push(...r.ɵproviders);
  return T3(t);
}
var c8 = new b("");
function ph() {
  return hh(l8.LegacyInterceptors, [
    { provide: c8, useFactory: ch },
    { provide: mc, useExisting: c8, multi: !0 },
  ]);
}
var f8 = (() => {
  let t = class t {};
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵmod = O1({ type: t })),
    (t.ɵinj = P1({ providers: [gc(ph())] }));
  let e = t;
  return e;
})();
var Cc = class extends Qt {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  yc = class e extends Cc {
    static makeCurrent() {
      Ws(new e());
    }
    onAndCancel(t, r, n) {
      return (
        t.addEventListener(r, n),
        () => {
          t.removeEventListener(r, n);
        }
      );
    }
    dispatchEvent(t, r) {
      t.dispatchEvent(r);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, r) {
      return (r = r || this.getDefaultDocument()), r.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, r) {
      return r === "window"
        ? window
        : r === "document"
        ? t
        : r === "body"
        ? t.body
        : null;
    }
    getBaseHref(t) {
      let r = gh();
      return r == null ? null : vh(r);
    }
    resetBaseElement() {
      X3 = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Kt(document.cookie, t);
    }
  },
  X3 = null;
function gh() {
  return (
    (X3 = X3 || document.querySelector("base")),
    X3 ? X3.getAttribute("href") : null
  );
}
function vh(e) {
  return new URL(e, document.baseURI).pathname;
}
var Mh = (() => {
    let t = class t {
      build() {
        return new XMLHttpRequest();
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  an = new b(""),
  p8 = (() => {
    let t = class t {
      constructor(n, c) {
        (this._zone = c),
          (this._eventNameToPlugin = new Map()),
          n.forEach((i) => {
            i.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, c, i) {
        return this._findPluginFor(c).addEventListener(n, c, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let c = this._eventNameToPlugin.get(n);
        if (c) return c;
        if (((c = this._plugins.find((a) => a.supports(n))), !c))
          throw new x(5101, !1);
        return this._eventNameToPlugin.set(n, c), c;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(an), L(n2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  K3 = class {
    constructor(t) {
      this._doc = t;
    }
  },
  vc = "ng-app-id",
  m8 = (() => {
    let t = class t {
      constructor(n, c, i, a = {}) {
        (this.doc = n),
          (this.appId = c),
          (this.nonce = i),
          (this.platformId = a),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = en(a)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let c of n)
          this.changeUsageCount(c, 1) === 1 && this.onStyleAdded(c);
      }
      removeStyles(n) {
        for (let c of n)
          this.changeUsageCount(c, -1) <= 0 && this.onStyleRemoved(c);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((c) => c.remove()), n.clear());
        for (let c of this.getAllStyles()) this.onStyleRemoved(c);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let c of this.getAllStyles()) this.addStyleToHost(n, c);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let c of this.hostNodes) this.addStyleToHost(c, n);
      }
      onStyleRemoved(n) {
        let c = this.styleRef;
        c.get(n)?.elements?.forEach((i) => i.remove()), c.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${vc}="${this.appId}"]`);
        if (n?.length) {
          let c = new Map();
          return (
            n.forEach((i) => {
              i.textContent != null && c.set(i.textContent, i);
            }),
            c
          );
        }
        return null;
      }
      changeUsageCount(n, c) {
        let i = this.styleRef;
        if (i.has(n)) {
          let a = i.get(n);
          return (a.usage += c), a.usage;
        }
        return i.set(n, { usage: c, elements: [] }), c;
      }
      getStyleElement(n, c) {
        let i = this.styleNodesInDOM,
          a = i?.get(c);
        if (a?.parentNode === n) return i.delete(c), a.removeAttribute(vc), a;
        {
          let o = this.doc.createElement("style");
          return (
            this.nonce && o.setAttribute("nonce", this.nonce),
            (o.textContent = c),
            this.platformIsServer && o.setAttribute(vc, this.appId),
            n.appendChild(o),
            o
          );
        }
      }
      addStyleToHost(n, c) {
        let i = this.getStyleElement(n, c),
          a = this.styleRef,
          o = a.get(c)?.elements;
        o ? o.push(i) : a.set(c, { elements: [i], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2), L(Or), L(Br, 8), L(j1));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  Mc = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  zc = /%COMP%/g,
  g8 = "%COMP%",
  Ch = `_nghost-${g8}`,
  yh = `_ngcontent-${g8}`,
  Hh = !0,
  zh = new b("", { providedIn: "root", factory: () => Hh });
function Vh(e) {
  return yh.replace(zc, e);
}
function wh(e) {
  return Ch.replace(zc, e);
}
function v8(e, t) {
  return t.map((r) => r.replace(zc, e));
}
var u8 = (() => {
    let t = class t {
      constructor(n, c, i, a, o, s, l, f = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = c),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = a),
          (this.doc = o),
          (this.platformId = s),
          (this.ngZone = l),
          (this.nonce = f),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = en(s)),
          (this.defaultRenderer = new J3(n, o, l, this.platformIsServer));
      }
      createRenderer(n, c) {
        if (!n || !c) return this.defaultRenderer;
        this.platformIsServer &&
          c.encapsulation === c1.ShadowDom &&
          (c = J(H({}, c), { encapsulation: c1.Emulated }));
        let i = this.getOrCreateRenderer(n, c);
        return (
          i instanceof on
            ? i.applyToHost(n)
            : i instanceof e4 && i.applyStyles(),
          i
        );
      }
      getOrCreateRenderer(n, c) {
        let i = this.rendererByCompId,
          a = i.get(c.id);
        if (!a) {
          let o = this.doc,
            s = this.ngZone,
            l = this.eventManager,
            f = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (c.encapsulation) {
            case c1.Emulated:
              a = new on(l, f, c, this.appId, u, o, s, d);
              break;
            case c1.ShadowDom:
              return new Hc(l, f, n, c, o, s, this.nonce, d);
            default:
              a = new e4(l, f, c, u, o, s, d);
              break;
          }
          i.set(c.id, a);
        }
        return a;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(
        L(p8),
        L(m8),
        L(Or),
        L(zh),
        L(m2),
        L(j1),
        L(n2),
        L(Br)
      );
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  J3 = class {
    constructor(t, r, n, c) {
      (this.eventManager = t),
        (this.doc = r),
        (this.ngZone = n),
        (this.platformIsServer = c),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(t, r) {
      return r
        ? this.doc.createElementNS(Mc[r] || r, t)
        : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, r) {
      (d8(t) ? t.content : t).appendChild(r);
    }
    insertBefore(t, r, n) {
      t && (d8(t) ? t.content : t).insertBefore(r, n);
    }
    removeChild(t, r) {
      r.remove();
    }
    selectRootElement(t, r) {
      let n = typeof t == "string" ? this.doc.querySelector(t) : t;
      if (!n) throw new x(-5104, !1);
      return r || (n.textContent = ""), n;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, r, n, c) {
      if (c) {
        r = c + ":" + r;
        let i = Mc[c];
        i ? t.setAttributeNS(i, r, n) : t.setAttribute(r, n);
      } else t.setAttribute(r, n);
    }
    removeAttribute(t, r, n) {
      if (n) {
        let c = Mc[n];
        c ? t.removeAttributeNS(c, r) : t.removeAttribute(`${n}:${r}`);
      } else t.removeAttribute(r);
    }
    addClass(t, r) {
      t.classList.add(r);
    }
    removeClass(t, r) {
      t.classList.remove(r);
    }
    setStyle(t, r, n, c) {
      c & (he.DashCase | he.Important)
        ? t.style.setProperty(r, n, c & he.Important ? "important" : "")
        : (t.style[r] = n);
    }
    removeStyle(t, r, n) {
      n & he.DashCase ? t.style.removeProperty(r) : (t.style[r] = "");
    }
    setProperty(t, r, n) {
      t != null && (t[r] = n);
    }
    setValue(t, r) {
      t.nodeValue = r;
    }
    listen(t, r, n) {
      if (
        typeof t == "string" &&
        ((t = e3().getGlobalEventTarget(this.doc, t)), !t)
      )
        throw new Error(`Unsupported event target ${t} for event ${r}`);
      return this.eventManager.addEventListener(
        t,
        r,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(t) {
      return (r) => {
        if (r === "__ngUnwrap__") return t;
        (this.platformIsServer ? this.ngZone.runGuarded(() => t(r)) : t(r)) ===
          !1 && r.preventDefault();
      };
    }
  };
function d8(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var Hc = class extends J3 {
    constructor(t, r, n, c, i, a, o, s) {
      super(t, i, a, s),
        (this.sharedStylesHost = r),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = v8(c.id, c.styles);
      for (let f of l) {
        let u = document.createElement("style");
        o && u.setAttribute("nonce", o),
          (u.textContent = f),
          this.shadowRoot.appendChild(u);
      }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, r) {
      return super.appendChild(this.nodeOrShadowRoot(t), r);
    }
    insertBefore(t, r, n) {
      return super.insertBefore(this.nodeOrShadowRoot(t), r, n);
    }
    removeChild(t, r) {
      return super.removeChild(null, r);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  e4 = class extends J3 {
    constructor(t, r, n, c, i, a, o, s) {
      super(t, i, a, o),
        (this.sharedStylesHost = r),
        (this.removeStylesOnCompDestroy = c),
        (this.styles = s ? v8(s, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  on = class extends e4 {
    constructor(t, r, n, c, i, a, o, s) {
      let l = c + "-" + n.id;
      super(t, r, n, i, a, o, s, l),
        (this.contentAttr = Vh(l)),
        (this.hostAttr = wh(l));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
    }
    createElement(t, r) {
      let n = super.createElement(t, r);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  xh = (() => {
    let t = class t extends K3 {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, c, i) {
        return (
          n.addEventListener(c, i, !1), () => this.removeEventListener(n, c, i)
        );
      }
      removeEventListener(n, c, i) {
        return n.removeEventListener(c, i);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  bh = (() => {
    let t = class t extends K3 {
      constructor(n) {
        super(n), (this.delegate = m(Ps, { optional: !0 }));
      }
      supports(n) {
        return this.delegate ? this.delegate.supports(n) : !1;
      }
      addEventListener(n, c, i) {
        return this.delegate.addEventListener(n, c, i);
      }
      removeEventListener(n, c, i) {
        return this.delegate.removeEventListener(n, c, i);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  h8 = ["alt", "control", "meta", "shift"],
  Lh = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  Dh = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  Sh = (() => {
    let t = class t extends K3 {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return t.parseEventName(n) != null;
      }
      addEventListener(n, c, i) {
        let a = t.parseEventName(c),
          o = t.eventCallback(a.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => e3().onAndCancel(n, a.domEventName, o));
      }
      static parseEventName(n) {
        let c = n.toLowerCase().split("."),
          i = c.shift();
        if (c.length === 0 || !(i === "keydown" || i === "keyup")) return null;
        let a = t._normalizeKey(c.pop()),
          o = "",
          s = c.indexOf("code");
        if (
          (s > -1 && (c.splice(s, 1), (o = "code.")),
          h8.forEach((f) => {
            let u = c.indexOf(f);
            u > -1 && (c.splice(u, 1), (o += f + "."));
          }),
          (o += a),
          c.length != 0 || a.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = i), (l.fullKey = o), l;
      }
      static matchEventFullKeyCode(n, c) {
        let i = Lh[n.key] || n.key,
          a = "";
        return (
          c.indexOf("code.") > -1 && ((i = n.code), (a = "code.")),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === " " ? (i = "space") : i === "." && (i = "dot"),
              h8.forEach((o) => {
                if (o !== i) {
                  let s = Dh[o];
                  s(n) && (a += o + ".");
                }
              }),
              (a += i),
              a === c)
        );
      }
      static eventCallback(n, c, i) {
        return (a) => {
          t.matchEventFullKeyCode(a, n) && i.runGuarded(() => c(a));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })();
function M8(e, t) {
  return _s(H({ rootComponent: e }, Nh(t)));
}
function Nh(e) {
  return {
    appProviders: [...kh, ...(e?.providers ?? [])],
    platformProviders: Th,
  };
}
function Eh() {
  yc.makeCurrent();
}
function Ih() {
  return new p1();
}
function Ah() {
  return zo(document), document;
}
var Th = [
  { provide: j1, useValue: Qs },
  { provide: Fr, useValue: Eh, multi: !0 },
  { provide: m2, useFactory: Ah, deps: [] },
];
var kh = [
  { provide: Et, useValue: "root" },
  { provide: p1, useFactory: Ih, deps: [] },
  { provide: an, useClass: xh, multi: !0, deps: [m2, n2, j1] },
  { provide: an, useClass: Sh, multi: !0, deps: [m2] },
  { provide: an, useClass: bh, multi: !0 },
  u8,
  m8,
  p8,
  { provide: Ye, useExisting: u8 },
  { provide: t3, useClass: Mh, deps: [] },
  [],
];
var C8 = (() => {
  let t = class t {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)(L(m2));
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
var Vc = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({
        token: t,
        factory: function (c) {
          let i = null;
          return c ? (i = new (c || t)()) : (i = L(Rh)), i;
        },
        providedIn: "root",
      }));
    let e = t;
    return e;
  })(),
  Rh = (() => {
    let t = class t extends Vc {
      constructor(n) {
        super(), (this._doc = n);
      }
      sanitize(n, c) {
        if (c == null) return null;
        switch (n) {
          case o1.NONE:
            return c;
          case o1.HTML:
            return U1(c, "HTML") ? C1(c) : Ur(this._doc, String(c)).toString();
          case o1.STYLE:
            return U1(c, "Style") ? C1(c) : c;
          case o1.SCRIPT:
            if (U1(c, "Script")) return C1(c);
            throw new x(5200, !1);
          case o1.URL:
            return U1(c, "URL") ? C1(c) : jt(String(c));
          case o1.RESOURCE_URL:
            if (U1(c, "ResourceURL")) return C1(c);
            throw new x(5201, !1);
          default:
            throw new x(5202, !1);
        }
      }
      bypassSecurityTrustHtml(n) {
        return xo(n);
      }
      bypassSecurityTrustStyle(n) {
        return bo(n);
      }
      bypassSecurityTrustScript(n) {
        return Lo(n);
      }
      bypassSecurityTrustUrl(n) {
        return Do(n);
      }
      bypassSecurityTrustResourceUrl(n) {
        return So(n);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(m2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
var T = "primary",
  v4 = Symbol("RouteTitle"),
  Dc = class {
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let r = this.params[t];
        return Array.isArray(r) ? r[0] : r;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let r = this.params[t];
        return Array.isArray(r) ? r : [r];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function o3(e) {
  return new Dc(e);
}
function _h(e, t, r) {
  let n = r.path.split("/");
  if (
    n.length > e.length ||
    (r.pathMatch === "full" && (t.hasChildren() || n.length < e.length))
  )
    return null;
  let c = {};
  for (let i = 0; i < n.length; i++) {
    let a = n[i],
      o = e[i];
    if (a[0] === ":") c[a.substring(1)] = o;
    else if (a !== o.path) return null;
  }
  return { consumed: e.slice(0, n.length), posParams: c };
}
function Ph(e, t) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; ++r) if (!f1(e[r], t[r])) return !1;
  return !0;
}
function f1(e, t) {
  let r = e ? Sc(e) : void 0,
    n = t ? Sc(t) : void 0;
  if (!r || !n || r.length != n.length) return !1;
  let c;
  for (let i = 0; i < r.length; i++)
    if (((c = r[i]), !D8(e[c], t[c]))) return !1;
  return !0;
}
function Sc(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function D8(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let r = [...e].sort(),
      n = [...t].sort();
    return r.every((c, i) => n[i] === c);
  } else return e === t;
}
function S8(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function G1(e) {
  return d6(e) ? e : $3(e) ? t2(Promise.resolve(e)) : D(e);
}
var Oh = { exact: E8, subset: I8 },
  N8 = { exact: Fh, subset: Bh, ignored: () => !0 };
function H8(e, t, r) {
  return (
    Oh[r.paths](e.root, t.root, r.matrixParams) &&
    N8[r.queryParams](e.queryParams, t.queryParams) &&
    !(r.fragment === "exact" && e.fragment !== t.fragment)
  );
}
function Fh(e, t) {
  return f1(e, t);
}
function E8(e, t, r) {
  if (
    !Ce(e.segments, t.segments) ||
    !fn(e.segments, t.segments, r) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let n in t.children)
    if (!e.children[n] || !E8(e.children[n], t.children[n], r)) return !1;
  return !0;
}
function Bh(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length &&
    Object.keys(t).every((r) => D8(e[r], t[r]))
  );
}
function I8(e, t, r) {
  return A8(e, t, t.segments, r);
}
function A8(e, t, r, n) {
  if (e.segments.length > r.length) {
    let c = e.segments.slice(0, r.length);
    return !(!Ce(c, r) || t.hasChildren() || !fn(c, r, n));
  } else if (e.segments.length === r.length) {
    if (!Ce(e.segments, r) || !fn(e.segments, r, n)) return !1;
    for (let c in t.children)
      if (!e.children[c] || !I8(e.children[c], t.children[c], n)) return !1;
    return !0;
  } else {
    let c = r.slice(0, e.segments.length),
      i = r.slice(e.segments.length);
    return !Ce(e.segments, c) || !fn(e.segments, c, n) || !e.children[T]
      ? !1
      : A8(e.children[T], t, i, n);
  }
}
function fn(e, t, r) {
  return t.every((n, c) => N8[r](e[c].parameters, n.parameters));
}
var V1 = class {
    constructor(t = new W([], {}), r = {}, n = null) {
      (this.root = t), (this.queryParams = r), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= o3(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return $h.serialize(this);
    }
  },
  W = class {
    constructor(t, r) {
      (this.segments = t),
        (this.children = r),
        (this.parent = null),
        Object.values(r).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return un(this);
    }
  },
  Me = class {
    constructor(t, r) {
      (this.path = t), (this.parameters = r);
    }
    get parameterMap() {
      return (this._parameterMap ??= o3(this.parameters)), this._parameterMap;
    }
    toString() {
      return k8(this);
    }
  };
function jh(e, t) {
  return Ce(e, t) && e.every((r, n) => f1(r.parameters, t[n].parameters));
}
function Ce(e, t) {
  return e.length !== t.length ? !1 : e.every((r, n) => r.path === t[n].path);
}
function Uh(e, t) {
  let r = [];
  return (
    Object.entries(e.children).forEach(([n, c]) => {
      n === T && (r = r.concat(t(c, n)));
    }),
    Object.entries(e.children).forEach(([n, c]) => {
      n !== T && (r = r.concat(t(c, n)));
    }),
    r
  );
}
var t0 = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => new o4(), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  o4 = class {
    parse(t) {
      let r = new Ec(t);
      return new V1(
        r.parseRootSegment(),
        r.parseQueryParams(),
        r.parseFragment()
      );
    }
    serialize(t) {
      let r = `/${t4(t.root, !0)}`,
        n = Gh(t.queryParams),
        c = typeof t.fragment == "string" ? `#${Wh(t.fragment)}` : "";
      return `${r}${n}${c}`;
    }
  },
  $h = new o4();
function un(e) {
  return e.segments.map((t) => k8(t)).join("/");
}
function t4(e, t) {
  if (!e.hasChildren()) return un(e);
  if (t) {
    let r = e.children[T] ? t4(e.children[T], !1) : "",
      n = [];
    return (
      Object.entries(e.children).forEach(([c, i]) => {
        c !== T && n.push(`${c}:${t4(i, !1)}`);
      }),
      n.length > 0 ? `${r}(${n.join("//")})` : r
    );
  } else {
    let r = Uh(e, (n, c) =>
      c === T ? [t4(e.children[T], !1)] : [`${c}:${t4(n, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[T] != null
      ? `${un(e)}/${r[0]}`
      : `${un(e)}/(${r.join("//")})`;
  }
}
function T8(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function sn(e) {
  return T8(e).replace(/%3B/gi, ";");
}
function Wh(e) {
  return encodeURI(e);
}
function Nc(e) {
  return T8(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function dn(e) {
  return decodeURIComponent(e);
}
function z8(e) {
  return dn(e.replace(/\+/g, "%20"));
}
function k8(e) {
  return `${Nc(e.path)}${qh(e.parameters)}`;
}
function qh(e) {
  return Object.entries(e)
    .map(([t, r]) => `;${Nc(t)}=${Nc(r)}`)
    .join("");
}
function Gh(e) {
  let t = Object.entries(e)
    .map(([r, n]) =>
      Array.isArray(n)
        ? n.map((c) => `${sn(r)}=${sn(c)}`).join("&")
        : `${sn(r)}=${sn(n)}`
    )
    .filter((r) => r);
  return t.length ? `?${t.join("&")}` : "";
}
var Yh = /^[^\/()?;#]+/;
function wc(e) {
  let t = e.match(Yh);
  return t ? t[0] : "";
}
var Zh = /^[^\/()?;=#]+/;
function Qh(e) {
  let t = e.match(Zh);
  return t ? t[0] : "";
}
var Xh = /^[^=?&#]+/;
function Kh(e) {
  let t = e.match(Xh);
  return t ? t[0] : "";
}
var Jh = /^[^&#]+/;
function ep(e) {
  let t = e.match(Jh);
  return t ? t[0] : "";
}
var Ec = class {
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new W([], {})
        : new W([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(t);
      while (this.consumeOptional("&"));
    return t;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let t = [];
    for (
      this.peekStartsWith("(") || t.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), t.push(this.parseSegment());
    let r = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (r = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (t.length > 0 || Object.keys(r).length > 0) && (n[T] = new W(t, r)),
      n
    );
  }
  parseSegment() {
    let t = wc(this.remaining);
    if (t === "" && this.peekStartsWith(";")) throw new x(4009, !1);
    return this.capture(t), new Me(dn(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(";"); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let r = Qh(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let c = wc(this.remaining);
      c && ((n = c), this.capture(n));
    }
    t[dn(r)] = dn(n);
  }
  parseQueryParam(t) {
    let r = Kh(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let a = ep(this.remaining);
      a && ((n = a), this.capture(n));
    }
    let c = z8(r),
      i = z8(n);
    if (t.hasOwnProperty(c)) {
      let a = t[c];
      Array.isArray(a) || ((a = [a]), (t[c] = a)), a.push(i);
    } else t[c] = i;
  }
  parseParens(t) {
    let r = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let n = wc(this.remaining),
        c = this.remaining[n.length];
      if (c !== "/" && c !== ")" && c !== ";") throw new x(4010, !1);
      let i;
      n.indexOf(":") > -1
        ? ((i = n.slice(0, n.indexOf(":"))), this.capture(i), this.capture(":"))
        : t && (i = T);
      let a = this.parseChildren();
      (r[i] = Object.keys(a).length === 1 ? a[T] : new W([], a)),
        this.consumeOptional("//");
    }
    return r;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new x(4011, !1);
  }
};
function R8(e) {
  return e.segments.length > 0 ? new W([], { [T]: e }) : e;
}
function _8(e) {
  let t = {};
  for (let [n, c] of Object.entries(e.children)) {
    let i = _8(c);
    if (n === T && i.segments.length === 0 && i.hasChildren())
      for (let [a, o] of Object.entries(i.children)) t[a] = o;
    else (i.segments.length > 0 || i.hasChildren()) && (t[n] = i);
  }
  let r = new W(e.segments, t);
  return tp(r);
}
function tp(e) {
  if (e.numberOfChildren === 1 && e.children[T]) {
    let t = e.children[T];
    return new W(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function s4(e) {
  return e instanceof V1;
}
function np(e, t, r = null, n = null) {
  let c = P8(e);
  return O8(c, t, r, n);
}
function P8(e) {
  let t;
  function r(i) {
    let a = {};
    for (let s of i.children) {
      let l = r(s);
      a[s.outlet] = l;
    }
    let o = new W(i.url, a);
    return i === e && (t = o), o;
  }
  let n = r(e.root),
    c = R8(n);
  return t ?? c;
}
function O8(e, t, r, n) {
  let c = e;
  for (; c.parent; ) c = c.parent;
  if (t.length === 0) return xc(c, c, c, r, n);
  let i = rp(t);
  if (i.toRoot()) return xc(c, c, new W([], {}), r, n);
  let a = cp(i, c, e),
    o = a.processChildren
      ? c4(a.segmentGroup, a.index, i.commands)
      : B8(a.segmentGroup, a.index, i.commands);
  return xc(c, a.segmentGroup, o, r, n);
}
function hn(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function l4(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function xc(e, t, r, n, c) {
  let i = {};
  n &&
    Object.entries(n).forEach(([s, l]) => {
      i[s] = Array.isArray(l) ? l.map((f) => `${f}`) : `${l}`;
    });
  let a;
  e === t ? (a = r) : (a = F8(e, t, r));
  let o = R8(_8(a));
  return new V1(o, i, c);
}
function F8(e, t, r) {
  let n = {};
  return (
    Object.entries(e.children).forEach(([c, i]) => {
      i === t ? (n[c] = r) : (n[c] = F8(i, t, r));
    }),
    new W(e.segments, n)
  );
}
var pn = class {
  constructor(t, r, n) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = r),
      (this.commands = n),
      t && n.length > 0 && hn(n[0]))
    )
      throw new x(4003, !1);
    let c = n.find(l4);
    if (c && c !== S8(n)) throw new x(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function rp(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new pn(!0, 0, e);
  let t = 0,
    r = !1,
    n = e.reduce((c, i, a) => {
      if (typeof i == "object" && i != null) {
        if (i.outlets) {
          let o = {};
          return (
            Object.entries(i.outlets).forEach(([s, l]) => {
              o[s] = typeof l == "string" ? l.split("/") : l;
            }),
            [...c, { outlets: o }]
          );
        }
        if (i.segmentPath) return [...c, i.segmentPath];
      }
      return typeof i != "string"
        ? [...c, i]
        : a === 0
        ? (i.split("/").forEach((o, s) => {
            (s == 0 && o === ".") ||
              (s == 0 && o === ""
                ? (r = !0)
                : o === ".."
                ? t++
                : o != "" && c.push(o));
          }),
          c)
        : [...c, i];
    }, []);
  return new pn(r, t, n);
}
var c3 = class {
  constructor(t, r, n) {
    (this.segmentGroup = t), (this.processChildren = r), (this.index = n);
  }
};
function cp(e, t, r) {
  if (e.isAbsolute) return new c3(t, !0, 0);
  if (!r) return new c3(t, !1, NaN);
  if (r.parent === null) return new c3(r, !0, 0);
  let n = hn(e.commands[0]) ? 0 : 1,
    c = r.segments.length - 1 + n;
  return ip(r, c, e.numberOfDoubleDots);
}
function ip(e, t, r) {
  let n = e,
    c = t,
    i = r;
  for (; i > c; ) {
    if (((i -= c), (n = n.parent), !n)) throw new x(4005, !1);
    c = n.segments.length;
  }
  return new c3(n, !1, c - i);
}
function ap(e) {
  return l4(e[0]) ? e[0].outlets : { [T]: e };
}
function B8(e, t, r) {
  if (((e ??= new W([], {})), e.segments.length === 0 && e.hasChildren()))
    return c4(e, t, r);
  let n = op(e, t, r),
    c = r.slice(n.commandIndex);
  if (n.match && n.pathIndex < e.segments.length) {
    let i = new W(e.segments.slice(0, n.pathIndex), {});
    return (
      (i.children[T] = new W(e.segments.slice(n.pathIndex), e.children)),
      c4(i, 0, c)
    );
  } else
    return n.match && c.length === 0
      ? new W(e.segments, {})
      : n.match && !e.hasChildren()
      ? Ic(e, t, r)
      : n.match
      ? c4(e, 0, c)
      : Ic(e, t, r);
}
function c4(e, t, r) {
  if (r.length === 0) return new W(e.segments, {});
  {
    let n = ap(r),
      c = {};
    if (
      Object.keys(n).some((i) => i !== T) &&
      e.children[T] &&
      e.numberOfChildren === 1 &&
      e.children[T].segments.length === 0
    ) {
      let i = c4(e.children[T], t, r);
      return new W(e.segments, i.children);
    }
    return (
      Object.entries(n).forEach(([i, a]) => {
        typeof a == "string" && (a = [a]),
          a !== null && (c[i] = B8(e.children[i], t, a));
      }),
      Object.entries(e.children).forEach(([i, a]) => {
        n[i] === void 0 && (c[i] = a);
      }),
      new W(e.segments, c)
    );
  }
}
function op(e, t, r) {
  let n = 0,
    c = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; c < e.segments.length; ) {
    if (n >= r.length) return i;
    let a = e.segments[c],
      o = r[n];
    if (l4(o)) break;
    let s = `${o}`,
      l = n < r.length - 1 ? r[n + 1] : null;
    if (c > 0 && s === void 0) break;
    if (s && l && typeof l == "object" && l.outlets === void 0) {
      if (!w8(s, l, a)) return i;
      n += 2;
    } else {
      if (!w8(s, {}, a)) return i;
      n++;
    }
    c++;
  }
  return { match: !0, pathIndex: c, commandIndex: n };
}
function Ic(e, t, r) {
  let n = e.segments.slice(0, t),
    c = 0;
  for (; c < r.length; ) {
    let i = r[c];
    if (l4(i)) {
      let s = sp(i.outlets);
      return new W(n, s);
    }
    if (c === 0 && hn(r[0])) {
      let s = e.segments[t];
      n.push(new Me(s.path, V8(r[0]))), c++;
      continue;
    }
    let a = l4(i) ? i.outlets[T] : `${i}`,
      o = c < r.length - 1 ? r[c + 1] : null;
    a && o && hn(o)
      ? (n.push(new Me(a, V8(o))), (c += 2))
      : (n.push(new Me(a, {})), c++);
  }
  return new W(n, {});
}
function sp(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([r, n]) => {
      typeof n == "string" && (n = [n]),
        n !== null && (t[r] = Ic(new W([], {}), 0, n));
    }),
    t
  );
}
function V8(e) {
  let t = {};
  return Object.entries(e).forEach(([r, n]) => (t[r] = `${n}`)), t;
}
function w8(e, t, r) {
  return e == r.path && f1(t, r.parameters);
}
var i4 = "imperative",
  p2 = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(p2 || {}),
  F2 = class {
    constructor(t, r) {
      (this.id = t), (this.url = r);
    }
  },
  f4 = class extends F2 {
    constructor(t, r, n = "imperative", c = null) {
      super(t, r),
        (this.type = p2.NavigationStart),
        (this.navigationTrigger = n),
        (this.restoredState = c);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ye = class extends F2 {
    constructor(t, r, n) {
      super(t, r), (this.urlAfterRedirects = n), (this.type = p2.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  N2 = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(N2 || {}),
  Ac = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(Ac || {}),
  z1 = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.reason = n),
        (this.code = c),
        (this.type = p2.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  He = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.reason = n),
        (this.code = c),
        (this.type = p2.NavigationSkipped);
    }
  },
  u4 = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.error = n),
        (this.target = c),
        (this.type = p2.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  mn = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.urlAfterRedirects = n),
        (this.state = c),
        (this.type = p2.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Tc = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.urlAfterRedirects = n),
        (this.state = c),
        (this.type = p2.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  kc = class extends F2 {
    constructor(t, r, n, c, i) {
      super(t, r),
        (this.urlAfterRedirects = n),
        (this.state = c),
        (this.shouldActivate = i),
        (this.type = p2.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Rc = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.urlAfterRedirects = n),
        (this.state = c),
        (this.type = p2.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  _c = class extends F2 {
    constructor(t, r, n, c) {
      super(t, r),
        (this.urlAfterRedirects = n),
        (this.state = c),
        (this.type = p2.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Pc = class {
    constructor(t) {
      (this.route = t), (this.type = p2.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Oc = class {
    constructor(t) {
      (this.route = t), (this.type = p2.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Fc = class {
    constructor(t) {
      (this.snapshot = t), (this.type = p2.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Bc = class {
    constructor(t) {
      (this.snapshot = t), (this.type = p2.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  jc = class {
    constructor(t) {
      (this.snapshot = t), (this.type = p2.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Uc = class {
    constructor(t) {
      (this.snapshot = t), (this.type = p2.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  };
var d4 = class {},
  s3 = class {
    constructor(t, r) {
      (this.url = t), (this.navigationBehaviorOptions = r);
    }
  };
function lp(e, t) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = ec(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function Z2(e) {
  return e.outlet || T;
}
function fp(e, t) {
  let r = e.filter((n) => Z2(n) === t);
  return r.push(...e.filter((n) => Z2(n) !== t)), r;
}
function M4(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let r = t.routeConfig;
    if (r?._loadedInjector) return r._loadedInjector;
    if (r?._injector) return r._injector;
  }
  return null;
}
var $c = class {
    get injector() {
      return M4(this.route?.snapshot) ?? this.rootInjector;
    }
    set injector(t) {}
    constructor(t) {
      (this.rootInjector = t),
        (this.outlet = null),
        (this.route = null),
        (this.children = new zn(this.rootInjector)),
        (this.attachRef = null);
    }
  },
  zn = (() => {
    let t = class t {
      constructor(n) {
        (this.rootInjector = n), (this.contexts = new Map());
      }
      onChildOutletCreated(n, c) {
        let i = this.getOrCreateContext(n);
        (i.outlet = c), this.contexts.set(n, i);
      }
      onChildOutletDestroyed(n) {
        let c = this.getContext(n);
        c && ((c.outlet = null), (c.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let c = this.getContext(n);
        return (
          c || ((c = new $c(this.rootInjector)), this.contexts.set(n, c)), c
        );
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(H2));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  gn = class {
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let r = this.pathFromRoot(t);
      return r.length > 1 ? r[r.length - 2] : null;
    }
    children(t) {
      let r = Wc(t, this._root);
      return r ? r.children.map((n) => n.value) : [];
    }
    firstChild(t) {
      let r = Wc(t, this._root);
      return r && r.children.length > 0 ? r.children[0].value : null;
    }
    siblings(t) {
      let r = qc(t, this._root);
      return r.length < 2
        ? []
        : r[r.length - 2].children.map((c) => c.value).filter((c) => c !== t);
    }
    pathFromRoot(t) {
      return qc(t, this._root).map((r) => r.value);
    }
  };
function Wc(e, t) {
  if (e === t.value) return t;
  for (let r of t.children) {
    let n = Wc(e, r);
    if (n) return n;
  }
  return null;
}
function qc(e, t) {
  if (e === t.value) return [t];
  for (let r of t.children) {
    let n = qc(e, r);
    if (n.length) return n.unshift(t), n;
  }
  return [];
}
var S2 = class {
  constructor(t, r) {
    (this.value = t), (this.children = r);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function r3(e) {
  let t = {};
  return e && e.children.forEach((r) => (t[r.value.outlet] = r)), t;
}
var vn = class extends gn {
  constructor(t, r) {
    super(t), (this.snapshot = r), n0(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function j8(e) {
  let t = up(e),
    r = new o2([new Me("", {})]),
    n = new o2({}),
    c = new o2({}),
    i = new o2({}),
    a = new o2(""),
    o = new l3(r, n, i, a, c, T, e, t.root);
  return (o.snapshot = t.root), new vn(new S2(o, []), t);
}
function up(e) {
  let t = {},
    r = {},
    n = {},
    c = "",
    i = new i3([], t, n, c, r, T, e, null, {});
  return new Cn("", new S2(i, []));
}
var l3 = class {
  constructor(t, r, n, c, i, a, o, s) {
    (this.urlSubject = t),
      (this.paramsSubject = r),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = c),
      (this.dataSubject = i),
      (this.outlet = a),
      (this.component = o),
      (this._futureSnapshot = s),
      (this.title = this.dataSubject?.pipe(R((l) => l[v4])) ?? D(void 0)),
      (this.url = t),
      (this.params = r),
      (this.queryParams = n),
      (this.fragment = c),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(R((t) => o3(t)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(R((t) => o3(t)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Mn(e, t, r = "emptyOnly") {
  let n,
    { routeConfig: c } = e;
  return (
    t !== null &&
    (r === "always" ||
      c?.path === "" ||
      (!t.component && !t.routeConfig?.loadComponent))
      ? (n = {
          params: H(H({}, t.params), e.params),
          data: H(H({}, t.data), e.data),
          resolve: H(H(H(H({}, e.data), t.data), c?.data), e._resolvedData),
        })
      : (n = {
          params: H({}, e.params),
          data: H({}, e.data),
          resolve: H(H({}, e.data), e._resolvedData ?? {}),
        }),
    c && $8(c) && (n.resolve[v4] = c.title),
    n
  );
}
var i3 = class {
    get title() {
      return this.data?.[v4];
    }
    constructor(t, r, n, c, i, a, o, s, l) {
      (this.url = t),
        (this.params = r),
        (this.queryParams = n),
        (this.fragment = c),
        (this.data = i),
        (this.outlet = a),
        (this.component = o),
        (this.routeConfig = s),
        (this._resolve = l);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= o3(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= o3(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let t = this.url.map((n) => n.toString()).join("/"),
        r = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${t}', path:'${r}')`;
    }
  },
  Cn = class extends gn {
    constructor(t, r) {
      super(r), (this.url = t), n0(this, r);
    }
    toString() {
      return U8(this._root);
    }
  };
function n0(e, t) {
  (t.value._routerState = e), t.children.forEach((r) => n0(e, r));
}
function U8(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(U8).join(", ")} } ` : "";
  return `${e.value}${t}`;
}
function bc(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      r = e._futureSnapshot;
    (e.snapshot = r),
      f1(t.queryParams, r.queryParams) ||
        e.queryParamsSubject.next(r.queryParams),
      t.fragment !== r.fragment && e.fragmentSubject.next(r.fragment),
      f1(t.params, r.params) || e.paramsSubject.next(r.params),
      Ph(t.url, r.url) || e.urlSubject.next(r.url),
      f1(t.data, r.data) || e.dataSubject.next(r.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function Gc(e, t) {
  let r = f1(e.params, t.params) && jh(e.url, t.url),
    n = !e.parent != !t.parent;
  return r && !n && (!e.parent || Gc(e.parent, t.parent));
}
function $8(e) {
  return typeof e.title == "string" || e.title === null;
}
var dp = (() => {
    let t = class t {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = T),
          (this.activateEvents = new v2()),
          (this.deactivateEvents = new v2()),
          (this.attachEvents = new v2()),
          (this.detachEvents = new v2()),
          (this.parentContexts = m(zn)),
          (this.location = m(Ke)),
          (this.changeDetector = m(W3)),
          (this.inputBinder = m(r0, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: c, previousValue: i } = n.name;
          if (c) return;
          this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new x(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new x(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new x(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, c) {
        (this.activated = n),
          (this._activatedRoute = c),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, c) {
        if (this.isActivated) throw new x(4013, !1);
        this._activatedRoute = n;
        let i = this.location,
          o = n.snapshot.component,
          s = this.parentContexts.getOrCreateContext(this.name).children,
          l = new Yc(n, s, i.injector);
        (this.activated = i.createComponent(o, {
          index: i.length,
          injector: l,
          environmentInjector: c,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵdir = de({
        type: t,
        selectors: [["router-outlet"]],
        inputs: { name: "name" },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [F1],
      }));
    let e = t;
    return e;
  })(),
  Yc = class e {
    __ngOutletInjector(t) {
      return new e(this.route, this.childContexts, t);
    }
    constructor(t, r, n) {
      (this.route = t), (this.childContexts = r), (this.parent = n);
    }
    get(t, r) {
      return t === l3
        ? this.route
        : t === zn
        ? this.childContexts
        : this.parent.get(t, r);
    }
  },
  r0 = new b("");
function hp(e, t, r) {
  let n = h4(e, t._root, r ? r._root : void 0);
  return new vn(n, t);
}
function h4(e, t, r) {
  if (r && e.shouldReuseRoute(t.value, r.value.snapshot)) {
    let n = r.value;
    n._futureSnapshot = t.value;
    let c = pp(e, t, r);
    return new S2(n, c);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let a = i.route;
        return (
          (a.value._futureSnapshot = t.value),
          (a.children = t.children.map((o) => h4(e, o))),
          a
        );
      }
    }
    let n = mp(t.value),
      c = t.children.map((i) => h4(e, i));
    return new S2(n, c);
  }
}
function pp(e, t, r) {
  return t.children.map((n) => {
    for (let c of r.children)
      if (e.shouldReuseRoute(n.value, c.value.snapshot)) return h4(e, n, c);
    return h4(e, n);
  });
}
function mp(e) {
  return new l3(
    new o2(e.url),
    new o2(e.params),
    new o2(e.queryParams),
    new o2(e.fragment),
    new o2(e.data),
    e.outlet,
    e.component,
    e
  );
}
var p4 = class {
    constructor(t, r) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = r);
    }
  },
  W8 = "ngNavigationCancelingError";
function yn(e, t) {
  let { redirectTo: r, navigationBehaviorOptions: n } = s4(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    c = q8(!1, N2.Redirect);
  return (c.url = r), (c.navigationBehaviorOptions = n), c;
}
function q8(e, t) {
  let r = new Error(`NavigationCancelingError: ${e || ""}`);
  return (r[W8] = !0), (r.cancellationCode = t), r;
}
function gp(e) {
  return G8(e) && s4(e.url);
}
function G8(e) {
  return !!e && e[W8];
}
var vp = (e, t, r, n) =>
    R(
      (c) => (
        new Zc(t, c.targetRouterState, c.currentRouterState, r, n).activate(e),
        c
      )
    ),
  Zc = class {
    constructor(t, r, n, c, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = r),
        (this.currState = n),
        (this.forwardEvent = c),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let r = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(r, n, t),
        bc(this.futureState.root),
        this.activateChildRoutes(r, n, t);
    }
    deactivateChildRoutes(t, r, n) {
      let c = r3(r);
      t.children.forEach((i) => {
        let a = i.value.outlet;
        this.deactivateRoutes(i, c[a], n), delete c[a];
      }),
        Object.values(c).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, n);
        });
    }
    deactivateRoutes(t, r, n) {
      let c = t.value,
        i = r ? r.value : null;
      if (c === i)
        if (c.component) {
          let a = n.getContext(c.outlet);
          a && this.deactivateChildRoutes(t, r, a.children);
        } else this.deactivateChildRoutes(t, r, n);
      else i && this.deactivateRouteAndItsChildren(r, n);
    }
    deactivateRouteAndItsChildren(t, r) {
      t.value.component &&
      this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, r)
        : this.deactivateRouteAndOutlet(t, r);
    }
    detachAndStoreRouteSubtree(t, r) {
      let n = r.getContext(t.value.outlet),
        c = n && t.value.component ? n.children : r,
        i = r3(t);
      for (let a of Object.values(i)) this.deactivateRouteAndItsChildren(a, c);
      if (n && n.outlet) {
        let a = n.outlet.detach(),
          o = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, {
          componentRef: a,
          route: t,
          contexts: o,
        });
      }
    }
    deactivateRouteAndOutlet(t, r) {
      let n = r.getContext(t.value.outlet),
        c = n && t.value.component ? n.children : r,
        i = r3(t);
      for (let a of Object.values(i)) this.deactivateRouteAndItsChildren(a, c);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(t, r, n) {
      let c = r3(r);
      t.children.forEach((i) => {
        this.activateRoutes(i, c[i.value.outlet], n),
          this.forwardEvent(new Uc(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new Bc(t.value.snapshot));
    }
    activateRoutes(t, r, n) {
      let c = t.value,
        i = r ? r.value : null;
      if ((bc(c), c === i))
        if (c.component) {
          let a = n.getOrCreateContext(c.outlet);
          this.activateChildRoutes(t, r, a.children);
        } else this.activateChildRoutes(t, r, n);
      else if (c.component) {
        let a = n.getOrCreateContext(c.outlet);
        if (this.routeReuseStrategy.shouldAttach(c.snapshot)) {
          let o = this.routeReuseStrategy.retrieve(c.snapshot);
          this.routeReuseStrategy.store(c.snapshot, null),
            a.children.onOutletReAttached(o.contexts),
            (a.attachRef = o.componentRef),
            (a.route = o.route.value),
            a.outlet && a.outlet.attach(o.componentRef, o.route.value),
            bc(o.route.value),
            this.activateChildRoutes(t, null, a.children);
        } else
          (a.attachRef = null),
            (a.route = c),
            a.outlet && a.outlet.activateWith(c, a.injector),
            this.activateChildRoutes(t, null, a.children);
      } else this.activateChildRoutes(t, null, n);
    }
  },
  Hn = class {
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  a3 = class {
    constructor(t, r) {
      (this.component = t), (this.route = r);
    }
  };
function Mp(e, t, r) {
  let n = e._root,
    c = t ? t._root : null;
  return n4(n, c, r, [n.value]);
}
function Cp(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function u3(e, t) {
  let r = Symbol(),
    n = t.get(e, r);
  return n === r ? (typeof e == "function" && !aa(e) ? e : t.get(e)) : n;
}
function n4(
  e,
  t,
  r,
  n,
  c = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = r3(t);
  return (
    e.children.forEach((a) => {
      yp(a, i[a.value.outlet], r, n.concat([a.value]), c),
        delete i[a.value.outlet];
    }),
    Object.entries(i).forEach(([a, o]) => a4(o, r.getContext(a), c)),
    c
  );
}
function yp(
  e,
  t,
  r,
  n,
  c = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = e.value,
    a = t ? t.value : null,
    o = r ? r.getContext(e.value.outlet) : null;
  if (a && i.routeConfig === a.routeConfig) {
    let s = Hp(a, i, i.routeConfig.runGuardsAndResolvers);
    s
      ? c.canActivateChecks.push(new Hn(n))
      : ((i.data = a.data), (i._resolvedData = a._resolvedData)),
      i.component ? n4(e, t, o ? o.children : null, n, c) : n4(e, t, r, n, c),
      s &&
        o &&
        o.outlet &&
        o.outlet.isActivated &&
        c.canDeactivateChecks.push(new a3(o.outlet.component, a));
  } else
    a && a4(t, o, c),
      c.canActivateChecks.push(new Hn(n)),
      i.component
        ? n4(e, null, o ? o.children : null, n, c)
        : n4(e, null, r, n, c);
  return c;
}
function Hp(e, t, r) {
  if (typeof r == "function") return r(e, t);
  switch (r) {
    case "pathParamsChange":
      return !Ce(e.url, t.url);
    case "pathParamsOrQueryParamsChange":
      return !Ce(e.url, t.url) || !f1(e.queryParams, t.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !Gc(e, t) || !f1(e.queryParams, t.queryParams);
    case "paramsChange":
    default:
      return !Gc(e, t);
  }
}
function a4(e, t, r) {
  let n = r3(e),
    c = e.value;
  Object.entries(n).forEach(([i, a]) => {
    c.component
      ? t
        ? a4(a, t.children.getContext(i), r)
        : a4(a, null, r)
      : a4(a, t, r);
  }),
    c.component
      ? t && t.outlet && t.outlet.isActivated
        ? r.canDeactivateChecks.push(new a3(t.outlet.component, c))
        : r.canDeactivateChecks.push(new a3(null, c))
      : r.canDeactivateChecks.push(new a3(null, c));
}
function C4(e) {
  return typeof e == "function";
}
function zp(e) {
  return typeof e == "boolean";
}
function Vp(e) {
  return e && C4(e.canLoad);
}
function wp(e) {
  return e && C4(e.canActivate);
}
function xp(e) {
  return e && C4(e.canActivateChild);
}
function bp(e) {
  return e && C4(e.canDeactivate);
}
function Lp(e) {
  return e && C4(e.canMatch);
}
function Y8(e) {
  return e instanceof d1 || e?.name === "EmptyError";
}
var ln = Symbol("INITIAL_VALUE");
function f3() {
  return b2((e) =>
    Z4(e.map((t) => t.pipe(h1(1), v6(ln)))).pipe(
      R((t) => {
        for (let r of t)
          if (r !== !0) {
            if (r === ln) return ln;
            if (r === !1 || Dp(r)) return r;
          }
        return !0;
      }),
      x2((t) => t !== ln),
      h1(1)
    )
  );
}
function Dp(e) {
  return s4(e) || e instanceof p4;
}
function Sp(e, t) {
  return s2((r) => {
    let {
      targetSnapshot: n,
      currentSnapshot: c,
      guards: { canActivateChecks: i, canDeactivateChecks: a },
    } = r;
    return a.length === 0 && i.length === 0
      ? D(J(H({}, r), { guardsResult: !0 }))
      : Np(a, n, c, e).pipe(
          s2((o) => (o && zp(o) ? Ep(n, i, e, t) : D(o))),
          R((o) => J(H({}, r), { guardsResult: o }))
        );
  });
}
function Np(e, t, r, n) {
  return t2(e).pipe(
    s2((c) => Rp(c.component, c.route, r, t, n)),
    e1((c) => c !== !0, !0)
  );
}
function Ep(e, t, r, n) {
  return t2(t).pipe(
    N1((c) =>
      Te(
        Ap(c.route.parent, n),
        Ip(c.route, n),
        kp(e, c.path, r),
        Tp(e, c.route, r)
      )
    ),
    e1((c) => c !== !0, !0)
  );
}
function Ip(e, t) {
  return e !== null && t && t(new jc(e)), D(!0);
}
function Ap(e, t) {
  return e !== null && t && t(new Fc(e)), D(!0);
}
function Tp(e, t, r) {
  let n = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!n || n.length === 0) return D(!0);
  let c = n.map((i) =>
    Q4(() => {
      let a = M4(t) ?? r,
        o = u3(i, a),
        s = wp(o) ? o.canActivate(t, e) : q2(a, () => o(t, e));
      return G1(s).pipe(e1());
    })
  );
  return D(c).pipe(f3());
}
function kp(e, t, r) {
  let n = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((a) => Cp(a))
      .filter((a) => a !== null)
      .map((a) =>
        Q4(() => {
          let o = a.guards.map((s) => {
            let l = M4(a.node) ?? r,
              f = u3(s, l),
              u = xp(f) ? f.canActivateChild(n, e) : q2(l, () => f(n, e));
            return G1(u).pipe(e1());
          });
          return D(o).pipe(f3());
        })
      );
  return D(i).pipe(f3());
}
function Rp(e, t, r, n, c) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return D(!0);
  let a = i.map((o) => {
    let s = M4(t) ?? c,
      l = u3(o, s),
      f = bp(l) ? l.canDeactivate(e, t, r, n) : q2(s, () => l(e, t, r, n));
    return G1(f).pipe(e1());
  });
  return D(a).pipe(f3());
}
function _p(e, t, r, n) {
  let c = t.canLoad;
  if (c === void 0 || c.length === 0) return D(!0);
  let i = c.map((a) => {
    let o = u3(a, e),
      s = Vp(o) ? o.canLoad(t, r) : q2(e, () => o(t, r));
    return G1(s);
  });
  return D(i).pipe(f3(), Z8(n));
}
function Z8(e) {
  return s6(
    d2((t) => {
      if (typeof t != "boolean") throw yn(e, t);
    }),
    R((t) => t === !0)
  );
}
function Pp(e, t, r, n) {
  let c = t.canMatch;
  if (!c || c.length === 0) return D(!0);
  let i = c.map((a) => {
    let o = u3(a, e),
      s = Lp(o) ? o.canMatch(t, r) : q2(e, () => o(t, r));
    return G1(s);
  });
  return D(i).pipe(f3(), Z8(n));
}
var m4 = class {
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  g4 = class extends Error {
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function n3(e) {
  return Ae(new m4(e));
}
function Op(e) {
  return Ae(new x(4e3, !1));
}
function Fp(e) {
  return Ae(q8(!1, N2.GuardRejected));
}
var Qc = class {
    constructor(t, r) {
      (this.urlSerializer = t), (this.urlTree = r);
    }
    lineralizeSegments(t, r) {
      let n = [],
        c = r.root;
      for (;;) {
        if (((n = n.concat(c.segments)), c.numberOfChildren === 0)) return D(n);
        if (c.numberOfChildren > 1 || !c.children[T])
          return Op(`${t.redirectTo}`);
        c = c.children[T];
      }
    }
    applyRedirectCommands(t, r, n, c, i) {
      if (typeof r != "string") {
        let o = r,
          {
            queryParams: s,
            fragment: l,
            routeConfig: f,
            url: u,
            outlet: d,
            params: h,
            data: p,
            title: w,
          } = c,
          M = q2(i, () =>
            o({
              params: h,
              data: p,
              queryParams: s,
              fragment: l,
              routeConfig: f,
              url: u,
              outlet: d,
              title: w,
            })
          );
        if (M instanceof V1) throw new g4(M);
        r = M;
      }
      let a = this.applyRedirectCreateUrlTree(
        r,
        this.urlSerializer.parse(r),
        t,
        n
      );
      if (r[0] === "/") throw new g4(a);
      return a;
    }
    applyRedirectCreateUrlTree(t, r, n, c) {
      let i = this.createSegmentGroup(t, r.root, n, c);
      return new V1(
        i,
        this.createQueryParams(r.queryParams, this.urlTree.queryParams),
        r.fragment
      );
    }
    createQueryParams(t, r) {
      let n = {};
      return (
        Object.entries(t).forEach(([c, i]) => {
          if (typeof i == "string" && i[0] === ":") {
            let o = i.substring(1);
            n[c] = r[o];
          } else n[c] = i;
        }),
        n
      );
    }
    createSegmentGroup(t, r, n, c) {
      let i = this.createSegments(t, r.segments, n, c),
        a = {};
      return (
        Object.entries(r.children).forEach(([o, s]) => {
          a[o] = this.createSegmentGroup(t, s, n, c);
        }),
        new W(i, a)
      );
    }
    createSegments(t, r, n, c) {
      return r.map((i) =>
        i.path[0] === ":" ? this.findPosParam(t, i, c) : this.findOrReturn(i, n)
      );
    }
    findPosParam(t, r, n) {
      let c = n[r.path.substring(1)];
      if (!c) throw new x(4001, !1);
      return c;
    }
    findOrReturn(t, r) {
      let n = 0;
      for (let c of r) {
        if (c.path === t.path) return r.splice(n), c;
        n++;
      }
      return t;
    }
  },
  Xc = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function Bp(e, t, r, n, c) {
  let i = Q8(e, t, r);
  return i.matched
    ? ((n = lp(t, n)),
      Pp(n, t, r, c).pipe(R((a) => (a === !0 ? i : H({}, Xc)))))
    : D(i);
}
function Q8(e, t, r) {
  if (t.path === "**") return jp(r);
  if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || r.length > 0)
      ? H({}, Xc)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: r,
          parameters: {},
          positionalParamSegments: {},
        };
  let c = (t.matcher || _h)(r, e, t);
  if (!c) return H({}, Xc);
  let i = {};
  Object.entries(c.posParams ?? {}).forEach(([o, s]) => {
    i[o] = s.path;
  });
  let a =
    c.consumed.length > 0
      ? H(H({}, i), c.consumed[c.consumed.length - 1].parameters)
      : i;
  return {
    matched: !0,
    consumedSegments: c.consumed,
    remainingSegments: r.slice(c.consumed.length),
    parameters: a,
    positionalParamSegments: c.posParams ?? {},
  };
}
function jp(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? S8(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function x8(e, t, r, n) {
  return r.length > 0 && Wp(e, r, n)
    ? {
        segmentGroup: new W(t, $p(n, new W(r, e.children))),
        slicedSegments: [],
      }
    : r.length === 0 && qp(e, r, n)
    ? {
        segmentGroup: new W(e.segments, Up(e, r, n, e.children)),
        slicedSegments: r,
      }
    : { segmentGroup: new W(e.segments, e.children), slicedSegments: r };
}
function Up(e, t, r, n) {
  let c = {};
  for (let i of r)
    if (Vn(e, t, i) && !n[Z2(i)]) {
      let a = new W([], {});
      c[Z2(i)] = a;
    }
  return H(H({}, n), c);
}
function $p(e, t) {
  let r = {};
  r[T] = t;
  for (let n of e)
    if (n.path === "" && Z2(n) !== T) {
      let c = new W([], {});
      r[Z2(n)] = c;
    }
  return r;
}
function Wp(e, t, r) {
  return r.some((n) => Vn(e, t, n) && Z2(n) !== T);
}
function qp(e, t, r) {
  return r.some((n) => Vn(e, t, n));
}
function Vn(e, t, r) {
  return (e.hasChildren() || t.length > 0) && r.pathMatch === "full"
    ? !1
    : r.path === "";
}
function Gp(e, t, r) {
  return t.length === 0 && !e.children[r];
}
var Kc = class {};
function Yp(e, t, r, n, c, i, a = "emptyOnly") {
  return new Jc(e, t, r, n, c, a, i).recognize();
}
var Zp = 31,
  Jc = class {
    constructor(t, r, n, c, i, a, o) {
      (this.injector = t),
        (this.configLoader = r),
        (this.rootComponentType = n),
        (this.config = c),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = a),
        (this.urlSerializer = o),
        (this.applyRedirects = new Qc(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(t) {
      return new x(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = x8(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        R(({ children: r, rootSnapshot: n }) => {
          let c = new S2(n, r),
            i = new Cn("", c),
            a = np(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (a.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(a)),
            { state: i, tree: a }
          );
        })
      );
    }
    match(t) {
      let r = new i3(
        [],
        Object.freeze({}),
        Object.freeze(H({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        T,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, t, T, r).pipe(
        R((n) => ({ children: n, rootSnapshot: r })),
        S1((n) => {
          if (n instanceof g4)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof m4 ? this.noMatchError(n) : n;
        })
      );
    }
    processSegmentGroup(t, r, n, c, i) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(t, r, n, i)
        : this.processSegment(t, r, n, n.segments, c, !0, i).pipe(
            R((a) => (a instanceof S2 ? [a] : []))
          );
    }
    processChildren(t, r, n, c) {
      let i = [];
      for (let a of Object.keys(n.children))
        a === "primary" ? i.unshift(a) : i.push(a);
      return t2(i).pipe(
        N1((a) => {
          let o = n.children[a],
            s = fp(r, a);
          return this.processSegmentGroup(t, s, o, a, c);
        }),
        g6((a, o) => (a.push(...o), a)),
        E1(null),
        m6(),
        s2((a) => {
          if (a === null) return n3(n);
          let o = X8(a);
          return Qp(o), D(o);
        })
      );
    }
    processSegment(t, r, n, c, i, a, o) {
      return t2(r).pipe(
        N1((s) =>
          this.processSegmentAgainstRoute(
            s._injector ?? t,
            r,
            s,
            n,
            c,
            i,
            a,
            o
          ).pipe(
            S1((l) => {
              if (l instanceof m4) return D(null);
              throw l;
            })
          )
        ),
        e1((s) => !!s),
        S1((s) => {
          if (Y8(s)) return Gp(n, c, i) ? D(new Kc()) : n3(n);
          throw s;
        })
      );
    }
    processSegmentAgainstRoute(t, r, n, c, i, a, o, s) {
      return Z2(n) !== a && (a === T || !Vn(c, i, n))
        ? n3(c)
        : n.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, c, n, i, a, s)
        : this.allowRedirects && o
        ? this.expandSegmentAgainstRouteUsingRedirect(t, c, r, n, i, a, s)
        : n3(c);
    }
    expandSegmentAgainstRouteUsingRedirect(t, r, n, c, i, a, o) {
      let {
        matched: s,
        parameters: l,
        consumedSegments: f,
        positionalParamSegments: u,
        remainingSegments: d,
      } = Q8(r, c, i);
      if (!s) return n3(r);
      typeof c.redirectTo == "string" &&
        c.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > Zp && (this.allowRedirects = !1));
      let h = new i3(
          i,
          l,
          Object.freeze(H({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          b8(c),
          Z2(c),
          c.component ?? c._loadedComponent ?? null,
          c,
          L8(c)
        ),
        p = Mn(h, o, this.paramsInheritanceStrategy);
      (h.params = Object.freeze(p.params)), (h.data = Object.freeze(p.data));
      let w = this.applyRedirects.applyRedirectCommands(
        f,
        c.redirectTo,
        u,
        h,
        t
      );
      return this.applyRedirects
        .lineralizeSegments(c, w)
        .pipe(s2((M) => this.processSegment(t, n, r, M.concat(d), a, !1, o)));
    }
    matchSegmentAgainstRoute(t, r, n, c, i, a) {
      let o = Bp(r, n, c, t, this.urlSerializer);
      return (
        n.path === "**" && (r.children = {}),
        o.pipe(
          b2((s) =>
            s.matched
              ? ((t = n._injector ?? t),
                this.getChildConfig(t, n, c).pipe(
                  b2(({ routes: l }) => {
                    let f = n._loadedInjector ?? t,
                      {
                        parameters: u,
                        consumedSegments: d,
                        remainingSegments: h,
                      } = s,
                      p = new i3(
                        d,
                        u,
                        Object.freeze(H({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        b8(n),
                        Z2(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        L8(n)
                      ),
                      w = Mn(p, a, this.paramsInheritanceStrategy);
                    (p.params = Object.freeze(w.params)),
                      (p.data = Object.freeze(w.data));
                    let { segmentGroup: M, slicedSegments: C } = x8(r, d, h, l);
                    if (C.length === 0 && M.hasChildren())
                      return this.processChildren(f, l, M, p).pipe(
                        R((P) => new S2(p, P))
                      );
                    if (l.length === 0 && C.length === 0)
                      return D(new S2(p, []));
                    let I = Z2(n) === i;
                    return this.processSegment(
                      f,
                      l,
                      M,
                      C,
                      I ? T : i,
                      !0,
                      p
                    ).pipe(R((P) => new S2(p, P instanceof S2 ? [P] : [])));
                  })
                ))
              : n3(r)
          )
        )
      );
    }
    getChildConfig(t, r, n) {
      return r.children
        ? D({ routes: r.children, injector: t })
        : r.loadChildren
        ? r._loadedRoutes !== void 0
          ? D({ routes: r._loadedRoutes, injector: r._loadedInjector })
          : _p(t, r, n, this.urlSerializer).pipe(
              s2((c) =>
                c
                  ? this.configLoader.loadChildren(t, r).pipe(
                      d2((i) => {
                        (r._loadedRoutes = i.routes),
                          (r._loadedInjector = i.injector);
                      })
                    )
                  : Fp(r)
              )
            )
        : D({ routes: [], injector: t });
    }
  };
function Qp(e) {
  e.sort((t, r) =>
    t.value.outlet === T
      ? -1
      : r.value.outlet === T
      ? 1
      : t.value.outlet.localeCompare(r.value.outlet)
  );
}
function Xp(e) {
  let t = e.value.routeConfig;
  return t && t.path === "";
}
function X8(e) {
  let t = [],
    r = new Set();
  for (let n of e) {
    if (!Xp(n)) {
      t.push(n);
      continue;
    }
    let c = t.find((i) => n.value.routeConfig === i.value.routeConfig);
    c !== void 0 ? (c.children.push(...n.children), r.add(c)) : t.push(n);
  }
  for (let n of r) {
    let c = X8(n.children);
    t.push(new S2(n.value, c));
  }
  return t.filter((n) => !r.has(n));
}
function b8(e) {
  return e.data || {};
}
function L8(e) {
  return e.resolve || {};
}
function Kp(e, t, r, n, c, i) {
  return s2((a) =>
    Yp(e, t, r, n, a.extractedUrl, c, i).pipe(
      R(({ state: o, tree: s }) =>
        J(H({}, a), { targetSnapshot: o, urlAfterRedirects: s })
      )
    )
  );
}
function Jp(e, t) {
  return s2((r) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: c },
    } = r;
    if (!c.length) return D(r);
    let i = new Set(c.map((s) => s.route)),
      a = new Set();
    for (let s of i) if (!a.has(s)) for (let l of K8(s)) a.add(l);
    let o = 0;
    return t2(a).pipe(
      N1((s) =>
        i.has(s)
          ? em(s, n, e, t)
          : ((s.data = Mn(s, s.parent, e).resolve), D(void 0))
      ),
      d2(() => o++),
      ke(1),
      s2((s) => (o === a.size ? D(r) : w2))
    );
  });
}
function K8(e) {
  let t = e.children.map((r) => K8(r)).flat();
  return [e, ...t];
}
function em(e, t, r, n) {
  let c = e.routeConfig,
    i = e._resolve;
  return (
    c?.title !== void 0 && !$8(c) && (i[v4] = c.title),
    tm(i, e, t, n).pipe(
      R(
        (a) => (
          (e._resolvedData = a), (e.data = Mn(e, e.parent, r).resolve), null
        )
      )
    )
  );
}
function tm(e, t, r, n) {
  let c = Sc(e);
  if (c.length === 0) return D({});
  let i = {};
  return t2(c).pipe(
    s2((a) =>
      nm(e[a], t, r, n).pipe(
        e1(),
        d2((o) => {
          if (o instanceof p4) throw yn(new o4(), o);
          i[a] = o;
        })
      )
    ),
    ke(1),
    p6(i),
    S1((a) => (Y8(a) ? w2 : Ae(a)))
  );
}
function nm(e, t, r, n) {
  let c = M4(t) ?? n,
    i = u3(e, c),
    a = i.resolve ? i.resolve(t, r) : q2(c, () => i(t, r));
  return G1(a);
}
function Lc(e) {
  return b2((t) => {
    let r = e(t);
    return r ? t2(r).pipe(R(() => t)) : D(t);
  });
}
var J8 = (() => {
    let t = class t {
      buildTitle(n) {
        let c,
          i = n.root;
        for (; i !== void 0; )
          (c = this.getResolvedTitleForRoute(i) ?? c),
            (i = i.children.find((a) => a.outlet === T));
        return c;
      }
      getResolvedTitleForRoute(n) {
        return n.data[v4];
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(rm), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  rm = (() => {
    let t = class t extends J8 {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let c = this.buildTitle(n);
        c !== void 0 && this.title.setTitle(c);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(L(C8));
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  c0 = new b("", { providedIn: "root", factory: () => ({}) }),
  cm = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵcmp = L2({
        type: t,
        selectors: [["ng-component"]],
        standalone: !0,
        features: [D2],
        decls: 1,
        vars: 0,
        template: function (c, i) {
          c & 1 && G(0, "router-outlet");
        },
        dependencies: [dp],
        encapsulation: 2,
      }));
    let e = t;
    return e;
  })();
function i0(e) {
  let t = e.children && e.children.map(i0),
    r = t ? J(H({}, e), { children: t }) : H({}, e);
  return (
    !r.component &&
      !r.loadComponent &&
      (t || r.loadChildren) &&
      r.outlet &&
      r.outlet !== T &&
      (r.component = cm),
    r
  );
}
var a0 = new b(""),
  im = (() => {
    let t = class t {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = m(nc));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return D(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let c = G1(n.loadComponent()).pipe(
            R(e5),
            d2((a) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = a);
            }),
            I1(() => {
              this.componentLoaders.delete(n);
            })
          ),
          i = new Ie(c, () => new g2()).pipe(Ee());
        return this.componentLoaders.set(n, i), i;
      }
      loadChildren(n, c) {
        if (this.childrenLoaders.get(c)) return this.childrenLoaders.get(c);
        if (c._loadedRoutes)
          return D({ routes: c._loadedRoutes, injector: c._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(c);
        let a = am(c, this.compiler, n, this.onLoadEndListener).pipe(
            I1(() => {
              this.childrenLoaders.delete(c);
            })
          ),
          o = new Ie(a, () => new g2()).pipe(Ee());
        return this.childrenLoaders.set(c, o), o;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
function am(e, t, r, n) {
  return G1(e.loadChildren()).pipe(
    R(e5),
    s2((c) =>
      c instanceof I3 || Array.isArray(c) ? D(c) : t2(t.compileModuleAsync(c))
    ),
    R((c) => {
      n && n(e);
      let i,
        a,
        o = !1;
      return (
        Array.isArray(c)
          ? ((a = c), (o = !0))
          : ((i = c.create(r).injector),
            (a = i.get(a0, [], { optional: !0, self: !0 }).flat())),
        { routes: a.map(i0), injector: i }
      );
    })
  );
}
function om(e) {
  return e && typeof e == "object" && "default" in e;
}
function e5(e) {
  return om(e) ? e.default : e;
}
var o0 = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(sm), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  sm = (() => {
    let t = class t {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, c) {
        return n;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  lm = new b("");
var fm = new b(""),
  um = (() => {
    let t = class t {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        (this.currentNavigation = null),
          (this.currentTransition = null),
          (this.lastSuccessfulNavigation = null),
          (this.events = new g2()),
          (this.transitionAbortSubject = new g2()),
          (this.configLoader = m(im)),
          (this.environmentInjector = m(H2)),
          (this.urlSerializer = m(t0)),
          (this.rootContexts = m(zn)),
          (this.location = m(q3)),
          (this.inputBindingEnabled = m(r0, { optional: !0 }) !== null),
          (this.titleStrategy = m(J8)),
          (this.options = m(c0, { optional: !0 }) || {}),
          (this.paramsInheritanceStrategy =
            this.options.paramsInheritanceStrategy || "emptyOnly"),
          (this.urlHandlingStrategy = m(o0)),
          (this.createViewTransition = m(lm, { optional: !0 })),
          (this.navigationErrorHandler = m(fm, { optional: !0 })),
          (this.navigationId = 0),
          (this.afterPreactivation = () => D(void 0)),
          (this.rootComponentType = null);
        let n = (i) => this.events.next(new Pc(i)),
          c = (i) => this.events.next(new Oc(i));
        (this.configLoader.onLoadEndListener = c),
          (this.configLoader.onLoadStartListener = n);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let c = ++this.navigationId;
        this.transitions?.next(
          J(H(H({}, this.transitions.value), n), { id: c })
        );
      }
      setupNavigations(n, c, i) {
        return (
          (this.transitions = new o2({
            id: 0,
            currentUrlTree: c,
            currentRawUrl: c,
            extractedUrl: this.urlHandlingStrategy.extract(c),
            urlAfterRedirects: this.urlHandlingStrategy.extract(c),
            rawUrl: c,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: i4,
            restoredState: null,
            currentSnapshot: i.snapshot,
            targetSnapshot: null,
            currentRouterState: i,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            x2((a) => a.id !== 0),
            R((a) =>
              J(H({}, a), {
                extractedUrl: this.urlHandlingStrategy.extract(a.rawUrl),
              })
            ),
            b2((a) => {
              let o = !1,
                s = !1;
              return D(a).pipe(
                b2((l) => {
                  if (this.navigationId > a.id)
                    return (
                      this.cancelNavigationTransition(
                        a,
                        "",
                        N2.SupersededByNewNavigation
                      ),
                      w2
                    );
                  (this.currentTransition = a),
                    (this.currentNavigation = {
                      id: l.id,
                      initialUrl: l.rawUrl,
                      extractedUrl: l.extractedUrl,
                      targetBrowserUrl:
                        typeof l.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(l.extras.browserUrl)
                          : l.extras.browserUrl,
                      trigger: l.source,
                      extras: l.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? J(H({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let f =
                      !n.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    u = l.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!f && u !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new He(
                          l.id,
                          this.urlSerializer.serialize(l.rawUrl),
                          d,
                          Ac.IgnoredSameUrlNavigation
                        )
                      ),
                      l.resolve(!1),
                      w2
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                    return D(l).pipe(
                      b2((d) => {
                        let h = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new f4(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          h !== this.transitions?.getValue()
                            ? w2
                            : Promise.resolve(d)
                        );
                      }),
                      Kp(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      d2((d) => {
                        (a.targetSnapshot = d.targetSnapshot),
                          (a.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = J(
                            H({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let h = new mn(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(h);
                      })
                    );
                  if (
                    f &&
                    this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: h,
                        source: p,
                        restoredState: w,
                        extras: M,
                      } = l,
                      C = new f4(d, this.urlSerializer.serialize(h), p, w);
                    this.events.next(C);
                    let I = j8(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = a =
                        J(H({}, l), {
                          targetSnapshot: I,
                          urlAfterRedirects: h,
                          extras: J(H({}, M), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = h),
                      D(a)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new He(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          d,
                          Ac.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      l.resolve(!1),
                      w2
                    );
                  }
                }),
                d2((l) => {
                  let f = new Tc(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot
                  );
                  this.events.next(f);
                }),
                R(
                  (l) => (
                    (this.currentTransition = a =
                      J(H({}, l), {
                        guards: Mp(
                          l.targetSnapshot,
                          l.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    a
                  )
                ),
                Sp(this.environmentInjector, (l) => this.events.next(l)),
                d2((l) => {
                  if (
                    ((a.guardsResult = l.guardsResult),
                    l.guardsResult && typeof l.guardsResult != "boolean")
                  )
                    throw yn(this.urlSerializer, l.guardsResult);
                  let f = new kc(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot,
                    !!l.guardsResult
                  );
                  this.events.next(f);
                }),
                x2((l) =>
                  l.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(l, "", N2.GuardRejected),
                      !1)
                ),
                Lc((l) => {
                  if (l.guards.canActivateChecks.length)
                    return D(l).pipe(
                      d2((f) => {
                        let u = new Rc(
                          f.id,
                          this.urlSerializer.serialize(f.extractedUrl),
                          this.urlSerializer.serialize(f.urlAfterRedirects),
                          f.targetSnapshot
                        );
                        this.events.next(u);
                      }),
                      b2((f) => {
                        let u = !1;
                        return D(f).pipe(
                          Jp(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          d2({
                            next: () => (u = !0),
                            complete: () => {
                              u ||
                                this.cancelNavigationTransition(
                                  f,
                                  "",
                                  N2.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      d2((f) => {
                        let u = new _c(
                          f.id,
                          this.urlSerializer.serialize(f.extractedUrl),
                          this.urlSerializer.serialize(f.urlAfterRedirects),
                          f.targetSnapshot
                        );
                        this.events.next(u);
                      })
                    );
                }),
                Lc((l) => {
                  let f = (u) => {
                    let d = [];
                    u.routeConfig?.loadComponent &&
                      !u.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(u.routeConfig).pipe(
                          d2((h) => {
                            u.component = h;
                          }),
                          R(() => {})
                        )
                      );
                    for (let h of u.children) d.push(...f(h));
                    return d;
                  };
                  return Z4(f(l.targetSnapshot.root)).pipe(E1(null), h1(1));
                }),
                Lc(() => this.afterPreactivation()),
                b2(() => {
                  let { currentSnapshot: l, targetSnapshot: f } = a,
                    u = this.createViewTransition?.(
                      this.environmentInjector,
                      l.root,
                      f.root
                    );
                  return u ? t2(u).pipe(R(() => a)) : D(a);
                }),
                R((l) => {
                  let f = hp(
                    n.routeReuseStrategy,
                    l.targetSnapshot,
                    l.currentRouterState
                  );
                  return (
                    (this.currentTransition = a =
                      J(H({}, l), { targetRouterState: f })),
                    (this.currentNavigation.targetRouterState = f),
                    a
                  );
                }),
                d2(() => {
                  this.events.next(new d4());
                }),
                vp(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (l) => this.events.next(l),
                  this.inputBindingEnabled
                ),
                h1(1),
                d2({
                  next: (l) => {
                    (o = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new ye(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          this.urlSerializer.serialize(l.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        l.targetRouterState.snapshot
                      ),
                      l.resolve(!0);
                  },
                  complete: () => {
                    o = !0;
                  },
                }),
                M6(
                  this.transitionAbortSubject.pipe(
                    d2((l) => {
                      throw l;
                    })
                  )
                ),
                I1(() => {
                  !o &&
                    !s &&
                    this.cancelNavigationTransition(
                      a,
                      "",
                      N2.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === a.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                S1((l) => {
                  if (((s = !0), G8(l)))
                    this.events.next(
                      new z1(
                        a.id,
                        this.urlSerializer.serialize(a.extractedUrl),
                        l.message,
                        l.cancellationCode
                      )
                    ),
                      gp(l)
                        ? this.events.next(
                            new s3(l.url, l.navigationBehaviorOptions)
                          )
                        : a.resolve(!1);
                  else {
                    let f = new u4(
                      a.id,
                      this.urlSerializer.serialize(a.extractedUrl),
                      l,
                      a.targetSnapshot ?? void 0
                    );
                    try {
                      let u = q2(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(f)
                      );
                      if (u instanceof p4) {
                        let { message: d, cancellationCode: h } = yn(
                          this.urlSerializer,
                          u
                        );
                        this.events.next(
                          new z1(
                            a.id,
                            this.urlSerializer.serialize(a.extractedUrl),
                            d,
                            h
                          )
                        ),
                          this.events.next(
                            new s3(u.redirectTo, u.navigationBehaviorOptions)
                          );
                      } else {
                        this.events.next(f);
                        let d = n.errorHandler(l);
                        a.resolve(!!d);
                      }
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError
                        ? a.resolve(!1)
                        : a.reject(u);
                    }
                  }
                  return w2;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, c, i) {
        let a = new z1(
          n.id,
          this.urlSerializer.serialize(n.extractedUrl),
          c,
          i
        );
        this.events.next(a), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          c =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          n.toString() !== c?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
function dm(e) {
  return e !== i4;
}
var hm = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(pm), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  e0 = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, r) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, r) {
      return t.routeConfig === r.routeConfig;
    }
  },
  pm = (() => {
    let t = class t extends e0 {};
    (t.ɵfac = (() => {
      let n;
      return function (i) {
        return (n || (n = Ot(t)))(i || t);
      };
    })()),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  t5 = (() => {
    let t = class t {};
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: () => m(mm), providedIn: "root" }));
    let e = t;
    return e;
  })(),
  mm = (() => {
    let t = class t extends t5 {
      constructor() {
        super(...arguments),
          (this.location = m(q3)),
          (this.urlSerializer = m(t0)),
          (this.options = m(c0, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = m(o0)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new V1()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = j8(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((c) => {
          c.type === "popstate" && n(c.url, c.state);
        });
      }
      handleRouterEvent(n, c) {
        if (n instanceof f4) this.stateMemento = this.createStateMemento();
        else if (n instanceof He) this.rawUrlTree = c.initialUrl;
        else if (n instanceof mn) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !c.extras.skipLocationChange
          ) {
            let i = this.urlHandlingStrategy.merge(c.finalUrl, c.initialUrl);
            this.setBrowserUrl(c.targetBrowserUrl ?? i, c);
          }
        } else
          n instanceof d4
            ? ((this.currentUrlTree = c.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                c.finalUrl,
                c.initialUrl
              )),
              (this.routerState = c.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !c.extras.skipLocationChange &&
                this.setBrowserUrl(c.targetBrowserUrl ?? this.rawUrlTree, c))
            : n instanceof z1 &&
              (n.code === N2.GuardRejected || n.code === N2.NoDataFromResolver)
            ? this.restoreHistory(c)
            : n instanceof u4
            ? this.restoreHistory(c, !0)
            : n instanceof ye &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, c) {
        let i = n instanceof V1 ? this.urlSerializer.serialize(n) : n;
        if (this.location.isCurrentPathEqualTo(i) || c.extras.replaceUrl) {
          let a = this.browserPageId,
            o = H(H({}, c.extras.state), this.generateNgRouterState(c.id, a));
          this.location.replaceState(i, "", o);
        } else {
          let a = H(
            H({}, c.extras.state),
            this.generateNgRouterState(c.id, this.browserPageId + 1)
          );
          this.location.go(i, "", a);
        }
      }
      restoreHistory(n, c = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let i = this.browserPageId,
            a = this.currentPageId - i;
          a !== 0
            ? this.location.historyGo(a)
            : this.currentUrlTree === n.finalUrl &&
              a === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (c && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, c) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: c }
          : { navigationId: n };
      }
    };
    (t.ɵfac = (() => {
      let n;
      return function (i) {
        return (n || (n = Ot(t)))(i || t);
      };
    })()),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  r4 = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = "COMPLETE"),
      (e[(e.FAILED = 1)] = "FAILED"),
      (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
      e
    );
  })(r4 || {});
function gm(e, t) {
  e.events
    .pipe(
      x2(
        (r) =>
          r instanceof ye ||
          r instanceof z1 ||
          r instanceof u4 ||
          r instanceof He
      ),
      R((r) =>
        r instanceof ye || r instanceof He
          ? r4.COMPLETE
          : (
              r instanceof z1
                ? r.code === N2.Redirect ||
                  r.code === N2.SupersededByNewNavigation
                : !1
            )
          ? r4.REDIRECTING
          : r4.FAILED
      ),
      x2((r) => r !== r4.REDIRECTING),
      h1(1)
    )
    .subscribe(() => {
      t();
    });
}
function vm(e) {
  throw e;
}
var Mm = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  Cm = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  n5 = (() => {
    let t = class t {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.console = m(Yt)),
          (this.stateManager = m(t5)),
          (this.options = m(c0, { optional: !0 }) || {}),
          (this.pendingTasks = m(M1)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = m(um)),
          (this.urlSerializer = m(t0)),
          (this.location = m(q3)),
          (this.urlHandlingStrategy = m(o0)),
          (this._events = new g2()),
          (this.errorHandler = this.options.errorHandler || vm),
          (this.navigated = !1),
          (this.routeReuseStrategy = m(hm)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = m(a0, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!m(r0, { optional: !0 })),
          (this.eventsSubscription = new i2()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((c) => {
          try {
            let i = this.navigationTransitions.currentTransition,
              a = this.navigationTransitions.currentNavigation;
            if (i !== null && a !== null) {
              if (
                (this.stateManager.handleRouterEvent(c, a),
                c instanceof z1 &&
                  c.code !== N2.Redirect &&
                  c.code !== N2.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (c instanceof ye) this.navigated = !0;
              else if (c instanceof s3) {
                let o = c.navigationBehaviorOptions,
                  s = this.urlHandlingStrategy.merge(c.url, i.currentRawUrl),
                  l = H(
                    {
                      browserUrl: i.extras.browserUrl,
                      info: i.extras.info,
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        i.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        dm(i.source),
                    },
                    o
                  );
                this.scheduleNavigation(s, i4, null, l, {
                  resolve: i.resolve,
                  reject: i.reject,
                  promise: i.promise,
                });
              }
            }
            Hm(c) && this._events.next(c);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              i4,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, c) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", c);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, c, i) {
        let a = { replaceUrl: !0 },
          o = i?.navigationId ? i : null;
        if (i) {
          let l = H({}, i);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (a.state = l);
        }
        let s = this.parseUrl(n);
        this.scheduleNavigation(s, c, o, a);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(i0)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, c = {}) {
        let {
            relativeTo: i,
            queryParams: a,
            fragment: o,
            queryParamsHandling: s,
            preserveFragment: l,
          } = c,
          f = l ? this.currentUrlTree.fragment : o,
          u = null;
        switch (s ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            u = H(H({}, this.currentUrlTree.queryParams), a);
            break;
          case "preserve":
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = a || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let h = i ? i.snapshot : this.routerState.snapshot.root;
          d = P8(h);
        } catch {
          (typeof n[0] != "string" || n[0][0] !== "/") && (n = []),
            (d = this.currentUrlTree.root);
        }
        return O8(d, n, u, f ?? null);
      }
      navigateByUrl(n, c = { skipLocationChange: !1 }) {
        let i = s4(n) ? n : this.parseUrl(n),
          a = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(a, i4, null, c);
      }
      navigate(n, c = { skipLocationChange: !1 }) {
        return ym(n), this.navigateByUrl(this.createUrlTree(n, c), c);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, c) {
        let i;
        if (
          (c === !0 ? (i = H({}, Mm)) : c === !1 ? (i = H({}, Cm)) : (i = c),
          s4(n))
        )
          return H8(this.currentUrlTree, n, i);
        let a = this.parseUrl(n);
        return H8(this.currentUrlTree, a, i);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (c, [i, a]) => (a != null && (c[i] = a), c),
          {}
        );
      }
      scheduleNavigation(n, c, i, a, o) {
        if (this.disposed) return Promise.resolve(!1);
        let s, l, f;
        o
          ? ((s = o.resolve), (l = o.reject), (f = o.promise))
          : (f = new Promise((d, h) => {
              (s = d), (l = h);
            }));
        let u = this.pendingTasks.add();
        return (
          gm(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: c,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: a,
            resolve: s,
            reject: l,
            promise: f,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          f.catch((d) => Promise.reject(d))
        );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })();
function ym(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new x(4008, !1);
}
function Hm(e) {
  return !(e instanceof d4) && !(e instanceof s3);
}
var zm = new b("");
function r5(e, ...t) {
  return T3([
    { provide: a0, multi: !0, useValue: e },
    [],
    { provide: l3, useFactory: Vm, deps: [n5] },
    { provide: Zt, multi: !0, useFactory: wm },
    t.map((r) => r.ɵproviders),
  ]);
}
function Vm(e) {
  return e.routerState.root;
}
function wm() {
  let e = m(le);
  return (t) => {
    let r = e.get($1);
    if (t !== r.components[0]) return;
    let n = e.get(n5),
      c = e.get(xm);
    e.get(bm) === 1 && n.initialNavigation(),
      e.get(Lm, null, _.Optional)?.setUpPreloading(),
      e.get(zm, null, _.Optional)?.init(),
      n.resetRootComponentType(r.componentTypes[0]),
      c.closed || (c.next(), c.complete(), c.unsubscribe());
  };
}
var xm = new b("", { factory: () => new g2() }),
  bm = new b("", { providedIn: "root", factory: () => 1 });
var Lm = new b("");
var c5 = [];
var i5 = { providers: [r5(c5), gc()] };
function a5(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (c) {
        return Object.getOwnPropertyDescriptor(e, c).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function g(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? a5(Object(r), !0).forEach(function (n) {
          f2(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : a5(Object(r)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
        });
  }
  return e;
}
function kn(e) {
  "@babel/helpers - typeof";
  return (
    (kn =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    kn(e)
  );
}
function Dm(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function o5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function Sm(e, t, r) {
  return (
    t && o5(e.prototype, t),
    r && o5(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function f2(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function V0(e, t) {
  return Em(e) || Am(e, t) || I5(e, t) || km();
}
function D4(e) {
  return Nm(e) || Im(e) || I5(e) || Tm();
}
function Nm(e) {
  if (Array.isArray(e)) return d0(e);
}
function Em(e) {
  if (Array.isArray(e)) return e;
}
function Im(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function Am(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (r != null) {
    var n = [],
      c = !0,
      i = !1,
      a,
      o;
    try {
      for (
        r = r.call(e);
        !(c = (a = r.next()).done) && (n.push(a.value), !(t && n.length === t));
        c = !0
      );
    } catch (s) {
      (i = !0), (o = s);
    } finally {
      try {
        !c && r.return != null && r.return();
      } finally {
        if (i) throw o;
      }
    }
    return n;
  }
}
function I5(e, t) {
  if (e) {
    if (typeof e == "string") return d0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return d0(e, t);
  }
}
function d0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Tm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function km() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var s5 = function () {},
  w0 = {},
  A5 = {},
  T5 = null,
  k5 = { mark: s5, measure: s5 };
try {
  typeof window < "u" && (w0 = window),
    typeof document < "u" && (A5 = document),
    typeof MutationObserver < "u" && (T5 = MutationObserver),
    typeof performance < "u" && (k5 = performance);
} catch {}
var Rm = w0.navigator || {},
  l5 = Rm.userAgent,
  f5 = l5 === void 0 ? "" : l5,
  Z1 = w0,
  K = A5,
  u5 = T5,
  wn = k5,
  Zw = !!Z1.document,
  L1 =
    !!K.documentElement &&
    !!K.head &&
    typeof K.addEventListener == "function" &&
    typeof K.createElement == "function",
  R5 = ~f5.indexOf("MSIE") || ~f5.indexOf("Trident/"),
  xn,
  bn,
  Ln,
  Dn,
  Sn,
  w1 = "___FONT_AWESOME___",
  h0 = 16,
  _5 = "fa",
  P5 = "svg-inline--fa",
  we = "data-fa-i2svg",
  p0 = "data-fa-pseudo-element",
  _m = "data-fa-pseudo-element-pending",
  x0 = "data-prefix",
  b0 = "data-icon",
  d5 = "fontawesome-i2svg",
  Pm = "async",
  Om = ["HTML", "HEAD", "STYLE", "SCRIPT"],
  O5 = (function () {
    try {
      return !0;
    } catch {
      return !1;
    }
  })(),
  X = "classic",
  e2 = "sharp",
  L0 = [X, e2];
function S4(e) {
  return new Proxy(e, {
    get: function (r, n) {
      return n in r ? r[n] : r[X];
    },
  });
}
var V4 = S4(
    ((xn = {}),
    f2(xn, X, {
      fa: "solid",
      fas: "solid",
      "fa-solid": "solid",
      far: "regular",
      "fa-regular": "regular",
      fal: "light",
      "fa-light": "light",
      fat: "thin",
      "fa-thin": "thin",
      fad: "duotone",
      "fa-duotone": "duotone",
      fab: "brands",
      "fa-brands": "brands",
      fak: "kit",
      fakd: "kit",
      "fa-kit": "kit",
      "fa-kit-duotone": "kit",
    }),
    f2(xn, e2, {
      fa: "solid",
      fass: "solid",
      "fa-solid": "solid",
      fasr: "regular",
      "fa-regular": "regular",
      fasl: "light",
      "fa-light": "light",
      fast: "thin",
      "fa-thin": "thin",
    }),
    xn)
  ),
  w4 = S4(
    ((bn = {}),
    f2(bn, X, {
      solid: "fas",
      regular: "far",
      light: "fal",
      thin: "fat",
      duotone: "fad",
      brands: "fab",
      kit: "fak",
    }),
    f2(bn, e2, { solid: "fass", regular: "fasr", light: "fasl", thin: "fast" }),
    bn)
  ),
  x4 = S4(
    ((Ln = {}),
    f2(Ln, X, {
      fab: "fa-brands",
      fad: "fa-duotone",
      fak: "fa-kit",
      fal: "fa-light",
      far: "fa-regular",
      fas: "fa-solid",
      fat: "fa-thin",
    }),
    f2(Ln, e2, {
      fass: "fa-solid",
      fasr: "fa-regular",
      fasl: "fa-light",
      fast: "fa-thin",
    }),
    Ln)
  ),
  Fm = S4(
    ((Dn = {}),
    f2(Dn, X, {
      "fa-brands": "fab",
      "fa-duotone": "fad",
      "fa-kit": "fak",
      "fa-light": "fal",
      "fa-regular": "far",
      "fa-solid": "fas",
      "fa-thin": "fat",
    }),
    f2(Dn, e2, {
      "fa-solid": "fass",
      "fa-regular": "fasr",
      "fa-light": "fasl",
      "fa-thin": "fast",
    }),
    Dn)
  ),
  Bm = /fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,
  F5 = "fa-layers-text",
  jm =
    /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
  Um = S4(
    ((Sn = {}),
    f2(Sn, X, {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat",
    }),
    f2(Sn, e2, { 900: "fass", 400: "fasr", 300: "fasl", 100: "fast" }),
    Sn)
  ),
  B5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  $m = B5.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  Wm = [
    "class",
    "data-prefix",
    "data-icon",
    "data-fa-transform",
    "data-fa-mask",
  ],
  ze = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary",
  },
  b4 = new Set();
Object.keys(w4[X]).map(b4.add.bind(b4));
Object.keys(w4[e2]).map(b4.add.bind(b4));
var qm = []
    .concat(L0, D4(b4), [
      "2xs",
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "beat",
      "border",
      "fade",
      "beat-fade",
      "bounce",
      "flip-both",
      "flip-horizontal",
      "flip-vertical",
      "flip",
      "fw",
      "inverse",
      "layers-counter",
      "layers-text",
      "layers",
      "li",
      "pull-left",
      "pull-right",
      "pulse",
      "rotate-180",
      "rotate-270",
      "rotate-90",
      "rotate-by",
      "shake",
      "spin-pulse",
      "spin-reverse",
      "spin",
      "stack-1x",
      "stack-2x",
      "stack",
      "ul",
      ze.GROUP,
      ze.SWAP_OPACITY,
      ze.PRIMARY,
      ze.SECONDARY,
    ])
    .concat(
      B5.map(function (e) {
        return "".concat(e, "x");
      })
    )
    .concat(
      $m.map(function (e) {
        return "w-".concat(e);
      })
    ),
  H4 = Z1.FontAwesomeConfig || {};
function Gm(e) {
  var t = K.querySelector("script[" + e + "]");
  if (t) return t.getAttribute(e);
}
function Ym(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
K &&
  typeof K.querySelector == "function" &&
  ((h5 = [
    ["data-family-prefix", "familyPrefix"],
    ["data-css-prefix", "cssPrefix"],
    ["data-family-default", "familyDefault"],
    ["data-style-default", "styleDefault"],
    ["data-replacement-class", "replacementClass"],
    ["data-auto-replace-svg", "autoReplaceSvg"],
    ["data-auto-add-css", "autoAddCss"],
    ["data-auto-a11y", "autoA11y"],
    ["data-search-pseudo-elements", "searchPseudoElements"],
    ["data-observe-mutations", "observeMutations"],
    ["data-mutate-approach", "mutateApproach"],
    ["data-keep-original-source", "keepOriginalSource"],
    ["data-measure-performance", "measurePerformance"],
    ["data-show-missing-icons", "showMissingIcons"],
  ]),
  h5.forEach(function (e) {
    var t = V0(e, 2),
      r = t[0],
      n = t[1],
      c = Ym(Gm(r));
    c != null && (H4[n] = c);
  }));
var h5,
  j5 = {
    styleDefault: "solid",
    familyDefault: "classic",
    cssPrefix: _5,
    replacementClass: P5,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0,
  };
H4.familyPrefix && (H4.cssPrefix = H4.familyPrefix);
var m3 = g(g({}, j5), H4);
m3.autoReplaceSvg || (m3.observeMutations = !1);
var y = {};
Object.keys(j5).forEach(function (e) {
  Object.defineProperty(y, e, {
    enumerable: !0,
    set: function (r) {
      (m3[e] = r),
        z4.forEach(function (n) {
          return n(y);
        });
    },
    get: function () {
      return m3[e];
    },
  });
});
Object.defineProperty(y, "familyPrefix", {
  enumerable: !0,
  set: function (t) {
    (m3.cssPrefix = t),
      z4.forEach(function (r) {
        return r(y);
      });
  },
  get: function () {
    return m3.cssPrefix;
  },
});
Z1.FontAwesomeConfig = y;
var z4 = [];
function Zm(e) {
  return (
    z4.push(e),
    function () {
      z4.splice(z4.indexOf(e), 1);
    }
  );
}
var Y1 = h0,
  u1 = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function Qm(e) {
  if (!(!e || !L1)) {
    var t = K.createElement("style");
    t.setAttribute("type", "text/css"), (t.innerHTML = e);
    for (var r = K.head.childNodes, n = null, c = r.length - 1; c > -1; c--) {
      var i = r[c],
        a = (i.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(a) > -1 && (n = i);
    }
    return K.head.insertBefore(t, n), e;
  }
}
var Xm = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function L4() {
  for (var e = 12, t = ""; e-- > 0; ) t += Xm[(Math.random() * 62) | 0];
  return t;
}
function g3(e) {
  for (var t = [], r = (e || []).length >>> 0; r--; ) t[r] = e[r];
  return t;
}
function D0(e) {
  return e.classList
    ? g3(e.classList)
    : (e.getAttribute("class") || "").split(" ").filter(function (t) {
        return t;
      });
}
function U5(e) {
  return ""
    .concat(e)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function Km(e) {
  return Object.keys(e || {})
    .reduce(function (t, r) {
      return t + "".concat(r, '="').concat(U5(e[r]), '" ');
    }, "")
    .trim();
}
function Pn(e) {
  return Object.keys(e || {}).reduce(function (t, r) {
    return t + "".concat(r, ": ").concat(e[r].trim(), ";");
  }, "");
}
function S0(e) {
  return (
    e.size !== u1.size ||
    e.x !== u1.x ||
    e.y !== u1.y ||
    e.rotate !== u1.rotate ||
    e.flipX ||
    e.flipY
  );
}
function Jm(e) {
  var t = e.transform,
    r = e.containerWidth,
    n = e.iconWidth,
    c = { transform: "translate(".concat(r / 2, " 256)") },
    i = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "),
    a = "scale("
      .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
      .concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
    o = "rotate(".concat(t.rotate, " 0 0)"),
    s = { transform: "".concat(i, " ").concat(a, " ").concat(o) },
    l = { transform: "translate(".concat((n / 2) * -1, " -256)") };
  return { outer: c, inner: s, path: l };
}
function eg(e) {
  var t = e.transform,
    r = e.width,
    n = r === void 0 ? h0 : r,
    c = e.height,
    i = c === void 0 ? h0 : c,
    a = e.startCentered,
    o = a === void 0 ? !1 : a,
    s = "";
  return (
    o && R5
      ? (s += "translate("
          .concat(t.x / Y1 - n / 2, "em, ")
          .concat(t.y / Y1 - i / 2, "em) "))
      : o
      ? (s += "translate(calc(-50% + "
          .concat(t.x / Y1, "em), calc(-50% + ")
          .concat(t.y / Y1, "em)) "))
      : (s += "translate(".concat(t.x / Y1, "em, ").concat(t.y / Y1, "em) ")),
    (s += "scale("
      .concat((t.size / Y1) * (t.flipX ? -1 : 1), ", ")
      .concat((t.size / Y1) * (t.flipY ? -1 : 1), ") ")),
    (s += "rotate(".concat(t.rotate, "deg) ")),
    s
  );
}
var tg = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function $5() {
  var e = _5,
    t = P5,
    r = y.cssPrefix,
    n = y.replacementClass,
    c = tg;
  if (r !== e || n !== t) {
    var i = new RegExp("\\.".concat(e, "\\-"), "g"),
      a = new RegExp("\\--".concat(e, "\\-"), "g"),
      o = new RegExp("\\.".concat(t), "g");
    c = c
      .replace(i, ".".concat(r, "-"))
      .replace(a, "--".concat(r, "-"))
      .replace(o, ".".concat(n));
  }
  return c;
}
var p5 = !1;
function s0() {
  y.autoAddCss && !p5 && (Qm($5()), (p5 = !0));
}
var ng = {
    mixout: function () {
      return { dom: { css: $5, insertCss: s0 } };
    },
    hooks: function () {
      return {
        beforeDOMElementCreation: function () {
          s0();
        },
        beforeI2svg: function () {
          s0();
        },
      };
    },
  },
  x1 = Z1 || {};
x1[w1] || (x1[w1] = {});
x1[w1].styles || (x1[w1].styles = {});
x1[w1].hooks || (x1[w1].hooks = {});
x1[w1].shims || (x1[w1].shims = []);
var Q2 = x1[w1],
  W5 = [],
  rg = function e() {
    K.removeEventListener("DOMContentLoaded", e),
      (Rn = 1),
      W5.map(function (t) {
        return t();
      });
  },
  Rn = !1;
L1 &&
  ((Rn = (K.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
    K.readyState
  )),
  Rn || K.addEventListener("DOMContentLoaded", rg));
function cg(e) {
  L1 && (Rn ? setTimeout(e, 0) : W5.push(e));
}
function N4(e) {
  var t = e.tag,
    r = e.attributes,
    n = r === void 0 ? {} : r,
    c = e.children,
    i = c === void 0 ? [] : c;
  return typeof e == "string"
    ? U5(e)
    : "<"
        .concat(t, " ")
        .concat(Km(n), ">")
        .concat(i.map(N4).join(""), "</")
        .concat(t, ">");
}
function m5(e, t, r) {
  if (e && e[t] && e[t][r]) return { prefix: t, iconName: r, icon: e[t][r] };
}
var ig = function (t, r) {
    return function (n, c, i, a) {
      return t.call(r, n, c, i, a);
    };
  },
  l0 = function (t, r, n, c) {
    var i = Object.keys(t),
      a = i.length,
      o = c !== void 0 ? ig(r, c) : r,
      s,
      l,
      f;
    for (
      n === void 0 ? ((s = 1), (f = t[i[0]])) : ((s = 0), (f = n));
      s < a;
      s++
    )
      (l = i[s]), (f = o(f, t[l], l, t));
    return f;
  };
function ag(e) {
  for (var t = [], r = 0, n = e.length; r < n; ) {
    var c = e.charCodeAt(r++);
    if (c >= 55296 && c <= 56319 && r < n) {
      var i = e.charCodeAt(r++);
      (i & 64512) == 56320
        ? t.push(((c & 1023) << 10) + (i & 1023) + 65536)
        : (t.push(c), r--);
    } else t.push(c);
  }
  return t;
}
function m0(e) {
  var t = ag(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function og(e, t) {
  var r = e.length,
    n = e.charCodeAt(t),
    c;
  return n >= 55296 &&
    n <= 56319 &&
    r > t + 1 &&
    ((c = e.charCodeAt(t + 1)), c >= 56320 && c <= 57343)
    ? (n - 55296) * 1024 + c - 56320 + 65536
    : n;
}
function g5(e) {
  return Object.keys(e).reduce(function (t, r) {
    var n = e[r],
      c = !!n.icon;
    return c ? (t[n.iconName] = n.icon) : (t[r] = n), t;
  }, {});
}
function g0(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    n = r.skipHooks,
    c = n === void 0 ? !1 : n,
    i = g5(t);
  typeof Q2.hooks.addPack == "function" && !c
    ? Q2.hooks.addPack(e, g5(t))
    : (Q2.styles[e] = g(g({}, Q2.styles[e] || {}), i)),
    e === "fas" && g0("fa", t);
}
var Nn,
  En,
  In,
  d3 = Q2.styles,
  sg = Q2.shims,
  lg =
    ((Nn = {}),
    f2(Nn, X, Object.values(x4[X])),
    f2(Nn, e2, Object.values(x4[e2])),
    Nn),
  N0 = null,
  q5 = {},
  G5 = {},
  Y5 = {},
  Z5 = {},
  Q5 = {},
  fg =
    ((En = {}),
    f2(En, X, Object.keys(V4[X])),
    f2(En, e2, Object.keys(V4[e2])),
    En);
function ug(e) {
  return ~qm.indexOf(e);
}
function dg(e, t) {
  var r = t.split("-"),
    n = r[0],
    c = r.slice(1).join("-");
  return n === e && c !== "" && !ug(c) ? c : null;
}
var X5 = function () {
  var t = function (i) {
    return l0(
      d3,
      function (a, o, s) {
        return (a[s] = l0(o, i, {})), a;
      },
      {}
    );
  };
  (q5 = t(function (c, i, a) {
    if ((i[3] && (c[i[3]] = a), i[2])) {
      var o = i[2].filter(function (s) {
        return typeof s == "number";
      });
      o.forEach(function (s) {
        c[s.toString(16)] = a;
      });
    }
    return c;
  })),
    (G5 = t(function (c, i, a) {
      if (((c[a] = a), i[2])) {
        var o = i[2].filter(function (s) {
          return typeof s == "string";
        });
        o.forEach(function (s) {
          c[s] = a;
        });
      }
      return c;
    })),
    (Q5 = t(function (c, i, a) {
      var o = i[2];
      return (
        (c[a] = a),
        o.forEach(function (s) {
          c[s] = a;
        }),
        c
      );
    }));
  var r = "far" in d3 || y.autoFetchSvg,
    n = l0(
      sg,
      function (c, i) {
        var a = i[0],
          o = i[1],
          s = i[2];
        return (
          o === "far" && !r && (o = "fas"),
          typeof a == "string" && (c.names[a] = { prefix: o, iconName: s }),
          typeof a == "number" &&
            (c.unicodes[a.toString(16)] = { prefix: o, iconName: s }),
          c
        );
      },
      { names: {}, unicodes: {} }
    );
  (Y5 = n.names),
    (Z5 = n.unicodes),
    (N0 = On(y.styleDefault, { family: y.familyDefault }));
};
Zm(function (e) {
  N0 = On(e.styleDefault, { family: y.familyDefault });
});
X5();
function E0(e, t) {
  return (q5[e] || {})[t];
}
function hg(e, t) {
  return (G5[e] || {})[t];
}
function Ve(e, t) {
  return (Q5[e] || {})[t];
}
function K5(e) {
  return Y5[e] || { prefix: null, iconName: null };
}
function pg(e) {
  var t = Z5[e],
    r = E0("fas", e);
  return (
    t ||
    (r ? { prefix: "fas", iconName: r } : null) || {
      prefix: null,
      iconName: null,
    }
  );
}
function Q1() {
  return N0;
}
var I0 = function () {
  return { prefix: null, iconName: null, rest: [] };
};
function On(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.family,
    n = r === void 0 ? X : r,
    c = V4[n][e],
    i = w4[n][e] || w4[n][c],
    a = e in Q2.styles ? e : null;
  return i || a || null;
}
var v5 =
  ((In = {}),
  f2(In, X, Object.keys(x4[X])),
  f2(In, e2, Object.keys(x4[e2])),
  In);
function Fn(e) {
  var t,
    r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = r.skipLookups,
    c = n === void 0 ? !1 : n,
    i =
      ((t = {}),
      f2(t, X, "".concat(y.cssPrefix, "-").concat(X)),
      f2(t, e2, "".concat(y.cssPrefix, "-").concat(e2)),
      t),
    a = null,
    o = X;
  (e.includes(i[X]) ||
    e.some(function (l) {
      return v5[X].includes(l);
    })) &&
    (o = X),
    (e.includes(i[e2]) ||
      e.some(function (l) {
        return v5[e2].includes(l);
      })) &&
      (o = e2);
  var s = e.reduce(function (l, f) {
    var u = dg(y.cssPrefix, f);
    if (
      (d3[f]
        ? ((f = lg[o].includes(f) ? Fm[o][f] : f), (a = f), (l.prefix = f))
        : fg[o].indexOf(f) > -1
        ? ((a = f), (l.prefix = On(f, { family: o })))
        : u
        ? (l.iconName = u)
        : f !== y.replacementClass &&
          f !== i[X] &&
          f !== i[e2] &&
          l.rest.push(f),
      !c && l.prefix && l.iconName)
    ) {
      var d = a === "fa" ? K5(l.iconName) : {},
        h = Ve(l.prefix, l.iconName);
      d.prefix && (a = null),
        (l.iconName = d.iconName || h || l.iconName),
        (l.prefix = d.prefix || l.prefix),
        l.prefix === "far" &&
          !d3.far &&
          d3.fas &&
          !y.autoFetchSvg &&
          (l.prefix = "fas");
    }
    return l;
  }, I0());
  return (
    (e.includes("fa-brands") || e.includes("fab")) && (s.prefix = "fab"),
    (e.includes("fa-duotone") || e.includes("fad")) && (s.prefix = "fad"),
    !s.prefix &&
      o === e2 &&
      (d3.fass || y.autoFetchSvg) &&
      ((s.prefix = "fass"),
      (s.iconName = Ve(s.prefix, s.iconName) || s.iconName)),
    (s.prefix === "fa" || a === "fa") && (s.prefix = Q1() || "fas"),
    s
  );
}
var mg = (function () {
    function e() {
      Dm(this, e), (this.definitions = {});
    }
    return (
      Sm(e, [
        {
          key: "add",
          value: function () {
            for (
              var r = this, n = arguments.length, c = new Array(n), i = 0;
              i < n;
              i++
            )
              c[i] = arguments[i];
            var a = c.reduce(this._pullDefinitions, {});
            Object.keys(a).forEach(function (o) {
              (r.definitions[o] = g(g({}, r.definitions[o] || {}), a[o])),
                g0(o, a[o]);
              var s = x4[X][o];
              s && g0(s, a[o]), X5();
            });
          },
        },
        {
          key: "reset",
          value: function () {
            this.definitions = {};
          },
        },
        {
          key: "_pullDefinitions",
          value: function (r, n) {
            var c = n.prefix && n.iconName && n.icon ? { 0: n } : n;
            return (
              Object.keys(c).map(function (i) {
                var a = c[i],
                  o = a.prefix,
                  s = a.iconName,
                  l = a.icon,
                  f = l[2];
                r[o] || (r[o] = {}),
                  f.length > 0 &&
                    f.forEach(function (u) {
                      typeof u == "string" && (r[o][u] = l);
                    }),
                  (r[o][s] = l);
              }),
              r
            );
          },
        },
      ]),
      e
    );
  })(),
  M5 = [],
  h3 = {},
  p3 = {},
  gg = Object.keys(p3);
function vg(e, t) {
  var r = t.mixoutsTo;
  return (
    (M5 = e),
    (h3 = {}),
    Object.keys(p3).forEach(function (n) {
      gg.indexOf(n) === -1 && delete p3[n];
    }),
    M5.forEach(function (n) {
      var c = n.mixout ? n.mixout() : {};
      if (
        (Object.keys(c).forEach(function (a) {
          typeof c[a] == "function" && (r[a] = c[a]),
            kn(c[a]) === "object" &&
              Object.keys(c[a]).forEach(function (o) {
                r[a] || (r[a] = {}), (r[a][o] = c[a][o]);
              });
        }),
        n.hooks)
      ) {
        var i = n.hooks();
        Object.keys(i).forEach(function (a) {
          h3[a] || (h3[a] = []), h3[a].push(i[a]);
        });
      }
      n.provides && n.provides(p3);
    }),
    r
  );
}
function v0(e, t) {
  for (
    var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), c = 2;
    c < r;
    c++
  )
    n[c - 2] = arguments[c];
  var i = h3[e] || [];
  return (
    i.forEach(function (a) {
      t = a.apply(null, [t].concat(n));
    }),
    t
  );
}
function xe(e) {
  for (
    var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
    n < t;
    n++
  )
    r[n - 1] = arguments[n];
  var c = h3[e] || [];
  c.forEach(function (i) {
    i.apply(null, r);
  });
}
function b1() {
  var e = arguments[0],
    t = Array.prototype.slice.call(arguments, 1);
  return p3[e] ? p3[e].apply(null, t) : void 0;
}
function M0(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName,
    r = e.prefix || Q1();
  if (t)
    return (t = Ve(r, t) || t), m5(J5.definitions, r, t) || m5(Q2.styles, r, t);
}
var J5 = new mg(),
  Mg = function () {
    (y.autoReplaceSvg = !1), (y.observeMutations = !1), xe("noAuto");
  },
  Cg = {
    i2svg: function () {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return L1
        ? (xe("beforeI2svg", t), b1("pseudoElements2svg", t), b1("i2svg", t))
        : Promise.reject("Operation requires a DOM of some kind.");
    },
    watch: function () {
      var t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        r = t.autoReplaceSvgRoot;
      y.autoReplaceSvg === !1 && (y.autoReplaceSvg = !0),
        (y.observeMutations = !0),
        cg(function () {
          Hg({ autoReplaceSvgRoot: r }), xe("watch", t);
        });
    },
  },
  yg = {
    icon: function (t) {
      if (t === null) return null;
      if (kn(t) === "object" && t.prefix && t.iconName)
        return {
          prefix: t.prefix,
          iconName: Ve(t.prefix, t.iconName) || t.iconName,
        };
      if (Array.isArray(t) && t.length === 2) {
        var r = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1],
          n = On(t[0]);
        return { prefix: n, iconName: Ve(n, r) || r };
      }
      if (
        typeof t == "string" &&
        (t.indexOf("".concat(y.cssPrefix, "-")) > -1 || t.match(Bm))
      ) {
        var c = Fn(t.split(" "), { skipLookups: !0 });
        return {
          prefix: c.prefix || Q1(),
          iconName: Ve(c.prefix, c.iconName) || c.iconName,
        };
      }
      if (typeof t == "string") {
        var i = Q1();
        return { prefix: i, iconName: Ve(i, t) || t };
      }
    },
  },
  E2 = {
    noAuto: Mg,
    config: y,
    dom: Cg,
    parse: yg,
    library: J5,
    findIconDefinition: M0,
    toHtml: N4,
  },
  Hg = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.autoReplaceSvgRoot,
      n = r === void 0 ? K : r;
    (Object.keys(Q2.styles).length > 0 || y.autoFetchSvg) &&
      L1 &&
      y.autoReplaceSvg &&
      E2.dom.i2svg({ node: n });
  };
function Bn(e, t) {
  return (
    Object.defineProperty(e, "abstract", { get: t }),
    Object.defineProperty(e, "html", {
      get: function () {
        return e.abstract.map(function (n) {
          return N4(n);
        });
      },
    }),
    Object.defineProperty(e, "node", {
      get: function () {
        if (L1) {
          var n = K.createElement("div");
          return (n.innerHTML = e.html), n.children;
        }
      },
    }),
    e
  );
}
function zg(e) {
  var t = e.children,
    r = e.main,
    n = e.mask,
    c = e.attributes,
    i = e.styles,
    a = e.transform;
  if (S0(a) && r.found && !n.found) {
    var o = r.width,
      s = r.height,
      l = { x: o / s / 2, y: 0.5 };
    c.style = Pn(
      g(
        g({}, i),
        {},
        {
          "transform-origin": ""
            .concat(l.x + a.x / 16, "em ")
            .concat(l.y + a.y / 16, "em"),
        }
      )
    );
  }
  return [{ tag: "svg", attributes: c, children: t }];
}
function Vg(e) {
  var t = e.prefix,
    r = e.iconName,
    n = e.children,
    c = e.attributes,
    i = e.symbol,
    a = i === !0 ? "".concat(t, "-").concat(y.cssPrefix, "-").concat(r) : i;
  return [
    {
      tag: "svg",
      attributes: { style: "display: none;" },
      children: [
        { tag: "symbol", attributes: g(g({}, c), {}, { id: a }), children: n },
      ],
    },
  ];
}
function A0(e) {
  var t = e.icons,
    r = t.main,
    n = t.mask,
    c = e.prefix,
    i = e.iconName,
    a = e.transform,
    o = e.symbol,
    s = e.title,
    l = e.maskId,
    f = e.titleId,
    u = e.extra,
    d = e.watchable,
    h = d === void 0 ? !1 : d,
    p = n.found ? n : r,
    w = p.width,
    M = p.height,
    C = c === "fak",
    I = [y.replacementClass, i ? "".concat(y.cssPrefix, "-").concat(i) : ""]
      .filter(function (J2) {
        return u.classes.indexOf(J2) === -1;
      })
      .filter(function (J2) {
        return J2 !== "" || !!J2;
      })
      .concat(u.classes)
      .join(" "),
    P = {
      children: [],
      attributes: g(
        g({}, u.attributes),
        {},
        {
          "data-prefix": c,
          "data-icon": i,
          class: I,
          role: u.attributes.role || "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 ".concat(w, " ").concat(M),
        }
      ),
    },
    k =
      C && !~u.classes.indexOf("fa-fw")
        ? { width: "".concat((w / M) * 16 * 0.0625, "em") }
        : {};
  h && (P.attributes[we] = ""),
    s &&
      (P.children.push({
        tag: "title",
        attributes: {
          id: P.attributes["aria-labelledby"] || "title-".concat(f || L4()),
        },
        children: [s],
      }),
      delete P.attributes.title);
  var Z = g(
      g({}, P),
      {},
      {
        prefix: c,
        iconName: i,
        main: r,
        mask: n,
        maskId: l,
        transform: a,
        symbol: o,
        styles: g(g({}, k), u.styles),
      }
    ),
    q =
      n.found && r.found
        ? b1("generateAbstractMask", Z) || { children: [], attributes: {} }
        : b1("generateAbstractIcon", Z) || { children: [], attributes: {} },
    c2 = q.children,
    K2 = q.attributes;
  return (Z.children = c2), (Z.attributes = K2), o ? Vg(Z) : zg(Z);
}
function C5(e) {
  var t = e.content,
    r = e.width,
    n = e.height,
    c = e.transform,
    i = e.title,
    a = e.extra,
    o = e.watchable,
    s = o === void 0 ? !1 : o,
    l = g(
      g(g({}, a.attributes), i ? { title: i } : {}),
      {},
      { class: a.classes.join(" ") }
    );
  s && (l[we] = "");
  var f = g({}, a.styles);
  S0(c) &&
    ((f.transform = eg({
      transform: c,
      startCentered: !0,
      width: r,
      height: n,
    })),
    (f["-webkit-transform"] = f.transform));
  var u = Pn(f);
  u.length > 0 && (l.style = u);
  var d = [];
  return (
    d.push({ tag: "span", attributes: l, children: [t] }),
    i &&
      d.push({ tag: "span", attributes: { class: "sr-only" }, children: [i] }),
    d
  );
}
function wg(e) {
  var t = e.content,
    r = e.title,
    n = e.extra,
    c = g(
      g(g({}, n.attributes), r ? { title: r } : {}),
      {},
      { class: n.classes.join(" ") }
    ),
    i = Pn(n.styles);
  i.length > 0 && (c.style = i);
  var a = [];
  return (
    a.push({ tag: "span", attributes: c, children: [t] }),
    r &&
      a.push({ tag: "span", attributes: { class: "sr-only" }, children: [r] }),
    a
  );
}
var f0 = Q2.styles;
function C0(e) {
  var t = e[0],
    r = e[1],
    n = e.slice(4),
    c = V0(n, 1),
    i = c[0],
    a = null;
  return (
    Array.isArray(i)
      ? (a = {
          tag: "g",
          attributes: { class: "".concat(y.cssPrefix, "-").concat(ze.GROUP) },
          children: [
            {
              tag: "path",
              attributes: {
                class: "".concat(y.cssPrefix, "-").concat(ze.SECONDARY),
                fill: "currentColor",
                d: i[0],
              },
            },
            {
              tag: "path",
              attributes: {
                class: "".concat(y.cssPrefix, "-").concat(ze.PRIMARY),
                fill: "currentColor",
                d: i[1],
              },
            },
          ],
        })
      : (a = { tag: "path", attributes: { fill: "currentColor", d: i } }),
    { found: !0, width: t, height: r, icon: a }
  );
}
var xg = { found: !1, width: 512, height: 512 };
function bg(e, t) {
  !O5 &&
    !y.showMissingIcons &&
    e &&
    console.error(
      'Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.')
    );
}
function y0(e, t) {
  var r = t;
  return (
    t === "fa" && y.styleDefault !== null && (t = Q1()),
    new Promise(function (n, c) {
      var i = {
        found: !1,
        width: 512,
        height: 512,
        icon: b1("missingIconAbstract") || {},
      };
      if (r === "fa") {
        var a = K5(e) || {};
        (e = a.iconName || e), (t = a.prefix || t);
      }
      if (e && t && f0[t] && f0[t][e]) {
        var o = f0[t][e];
        return n(C0(o));
      }
      bg(e, t),
        n(
          g(
            g({}, xg),
            {},
            {
              icon:
                y.showMissingIcons && e ? b1("missingIconAbstract") || {} : {},
            }
          )
        );
    })
  );
}
var y5 = function () {},
  H0 =
    y.measurePerformance && wn && wn.mark && wn.measure
      ? wn
      : { mark: y5, measure: y5 },
  y4 = 'FA "6.5.1"',
  Lg = function (t) {
    return (
      H0.mark("".concat(y4, " ").concat(t, " begins")),
      function () {
        return e7(t);
      }
    );
  },
  e7 = function (t) {
    H0.mark("".concat(y4, " ").concat(t, " ends")),
      H0.measure(
        "".concat(y4, " ").concat(t),
        "".concat(y4, " ").concat(t, " begins"),
        "".concat(y4, " ").concat(t, " ends")
      );
  },
  T0 = { begin: Lg, end: e7 },
  An = function () {};
function H5(e) {
  var t = e.getAttribute ? e.getAttribute(we) : null;
  return typeof t == "string";
}
function Dg(e) {
  var t = e.getAttribute ? e.getAttribute(x0) : null,
    r = e.getAttribute ? e.getAttribute(b0) : null;
  return t && r;
}
function Sg(e) {
  return (
    e &&
    e.classList &&
    e.classList.contains &&
    e.classList.contains(y.replacementClass)
  );
}
function Ng() {
  if (y.autoReplaceSvg === !0) return Tn.replace;
  var e = Tn[y.autoReplaceSvg];
  return e || Tn.replace;
}
function Eg(e) {
  return K.createElementNS("http://www.w3.org/2000/svg", e);
}
function Ig(e) {
  return K.createElement(e);
}
function t7(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.ceFn,
    n = r === void 0 ? (e.tag === "svg" ? Eg : Ig) : r;
  if (typeof e == "string") return K.createTextNode(e);
  var c = n(e.tag);
  Object.keys(e.attributes || []).forEach(function (a) {
    c.setAttribute(a, e.attributes[a]);
  });
  var i = e.children || [];
  return (
    i.forEach(function (a) {
      c.appendChild(t7(a, { ceFn: n }));
    }),
    c
  );
}
function Ag(e) {
  var t = " ".concat(e.outerHTML, " ");
  return (t = "".concat(t, "Font Awesome fontawesome.com ")), t;
}
var Tn = {
  replace: function (t) {
    var r = t[0];
    if (r.parentNode)
      if (
        (t[1].forEach(function (c) {
          r.parentNode.insertBefore(t7(c), r);
        }),
        r.getAttribute(we) === null && y.keepOriginalSource)
      ) {
        var n = K.createComment(Ag(r));
        r.parentNode.replaceChild(n, r);
      } else r.remove();
  },
  nest: function (t) {
    var r = t[0],
      n = t[1];
    if (~D0(r).indexOf(y.replacementClass)) return Tn.replace(t);
    var c = new RegExp("".concat(y.cssPrefix, "-.*"));
    if ((delete n[0].attributes.id, n[0].attributes.class)) {
      var i = n[0].attributes.class.split(" ").reduce(
        function (o, s) {
          return (
            s === y.replacementClass || s.match(c)
              ? o.toSvg.push(s)
              : o.toNode.push(s),
            o
          );
        },
        { toNode: [], toSvg: [] }
      );
      (n[0].attributes.class = i.toSvg.join(" ")),
        i.toNode.length === 0
          ? r.removeAttribute("class")
          : r.setAttribute("class", i.toNode.join(" "));
    }
    var a = n.map(function (o) {
      return N4(o);
    }).join(`
`);
    r.setAttribute(we, ""), (r.innerHTML = a);
  },
};
function z5(e) {
  e();
}
function n7(e, t) {
  var r = typeof t == "function" ? t : An;
  if (e.length === 0) r();
  else {
    var n = z5;
    y.mutateApproach === Pm && (n = Z1.requestAnimationFrame || z5),
      n(function () {
        var c = Ng(),
          i = T0.begin("mutate");
        e.map(c), i(), r();
      });
  }
}
var k0 = !1;
function r7() {
  k0 = !0;
}
function z0() {
  k0 = !1;
}
var _n = null;
function V5(e) {
  if (u5 && y.observeMutations) {
    var t = e.treeCallback,
      r = t === void 0 ? An : t,
      n = e.nodeCallback,
      c = n === void 0 ? An : n,
      i = e.pseudoElementsCallback,
      a = i === void 0 ? An : i,
      o = e.observeMutationsRoot,
      s = o === void 0 ? K : o;
    (_n = new u5(function (l) {
      if (!k0) {
        var f = Q1();
        g3(l).forEach(function (u) {
          if (
            (u.type === "childList" &&
              u.addedNodes.length > 0 &&
              !H5(u.addedNodes[0]) &&
              (y.searchPseudoElements && a(u.target), r(u.target)),
            u.type === "attributes" &&
              u.target.parentNode &&
              y.searchPseudoElements &&
              a(u.target.parentNode),
            u.type === "attributes" &&
              H5(u.target) &&
              ~Wm.indexOf(u.attributeName))
          )
            if (u.attributeName === "class" && Dg(u.target)) {
              var d = Fn(D0(u.target)),
                h = d.prefix,
                p = d.iconName;
              u.target.setAttribute(x0, h || f),
                p && u.target.setAttribute(b0, p);
            } else Sg(u.target) && c(u.target);
        });
      }
    })),
      L1 &&
        _n.observe(s, {
          childList: !0,
          attributes: !0,
          characterData: !0,
          subtree: !0,
        });
  }
}
function Tg() {
  _n && _n.disconnect();
}
function kg(e) {
  var t = e.getAttribute("style"),
    r = [];
  return (
    t &&
      (r = t.split(";").reduce(function (n, c) {
        var i = c.split(":"),
          a = i[0],
          o = i.slice(1);
        return a && o.length > 0 && (n[a] = o.join(":").trim()), n;
      }, {})),
    r
  );
}
function Rg(e) {
  var t = e.getAttribute("data-prefix"),
    r = e.getAttribute("data-icon"),
    n = e.innerText !== void 0 ? e.innerText.trim() : "",
    c = Fn(D0(e));
  return (
    c.prefix || (c.prefix = Q1()),
    t && r && ((c.prefix = t), (c.iconName = r)),
    (c.iconName && c.prefix) ||
      (c.prefix &&
        n.length > 0 &&
        (c.iconName =
          hg(c.prefix, e.innerText) || E0(c.prefix, m0(e.innerText))),
      !c.iconName &&
        y.autoFetchSvg &&
        e.firstChild &&
        e.firstChild.nodeType === Node.TEXT_NODE &&
        (c.iconName = e.firstChild.data)),
    c
  );
}
function _g(e) {
  var t = g3(e.attributes).reduce(function (c, i) {
      return (
        c.name !== "class" && c.name !== "style" && (c[i.name] = i.value), c
      );
    }, {}),
    r = e.getAttribute("title"),
    n = e.getAttribute("data-fa-title-id");
  return (
    y.autoA11y &&
      (r
        ? (t["aria-labelledby"] = ""
            .concat(y.replacementClass, "-title-")
            .concat(n || L4()))
        : ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
    t
  );
}
function Pg() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: u1,
    symbol: !1,
    mask: { iconName: null, prefix: null, rest: [] },
    maskId: null,
    extra: { classes: [], styles: {}, attributes: {} },
  };
}
function w5(e) {
  var t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { styleParser: !0 },
    r = Rg(e),
    n = r.iconName,
    c = r.prefix,
    i = r.rest,
    a = _g(e),
    o = v0("parseNodeAttributes", {}, e),
    s = t.styleParser ? kg(e) : [];
  return g(
    {
      iconName: n,
      title: e.getAttribute("title"),
      titleId: e.getAttribute("data-fa-title-id"),
      prefix: c,
      transform: u1,
      mask: { iconName: null, prefix: null, rest: [] },
      maskId: null,
      symbol: !1,
      extra: { classes: i, styles: s, attributes: a },
    },
    o
  );
}
var Og = Q2.styles;
function c7(e) {
  var t = y.autoReplaceSvg === "nest" ? w5(e, { styleParser: !1 }) : w5(e);
  return ~t.extra.classes.indexOf(F5)
    ? b1("generateLayersText", e, t)
    : b1("generateSvgReplacementMutation", e, t);
}
var X1 = new Set();
L0.map(function (e) {
  X1.add("fa-".concat(e));
});
Object.keys(V4[X]).map(X1.add.bind(X1));
Object.keys(V4[e2]).map(X1.add.bind(X1));
X1 = D4(X1);
function x5(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!L1) return Promise.resolve();
  var r = K.documentElement.classList,
    n = function (u) {
      return r.add("".concat(d5, "-").concat(u));
    },
    c = function (u) {
      return r.remove("".concat(d5, "-").concat(u));
    },
    i = y.autoFetchSvg
      ? X1
      : L0.map(function (f) {
          return "fa-".concat(f);
        }).concat(Object.keys(Og));
  i.includes("fa") || i.push("fa");
  var a = [".".concat(F5, ":not([").concat(we, "])")]
    .concat(
      i.map(function (f) {
        return ".".concat(f, ":not([").concat(we, "])");
      })
    )
    .join(", ");
  if (a.length === 0) return Promise.resolve();
  var o = [];
  try {
    o = g3(e.querySelectorAll(a));
  } catch {}
  if (o.length > 0) n("pending"), c("complete");
  else return Promise.resolve();
  var s = T0.begin("onTree"),
    l = o.reduce(function (f, u) {
      try {
        var d = c7(u);
        d && f.push(d);
      } catch (h) {
        O5 || (h.name === "MissingIcon" && console.error(h));
      }
      return f;
    }, []);
  return new Promise(function (f, u) {
    Promise.all(l)
      .then(function (d) {
        n7(d, function () {
          n("active"),
            n("complete"),
            c("pending"),
            typeof t == "function" && t(),
            s(),
            f();
        });
      })
      .catch(function (d) {
        s(), u(d);
      });
  });
}
function Fg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  c7(e).then(function (r) {
    r && n7([r], t);
  });
}
function Bg(e) {
  return function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = (t || {}).icon ? t : M0(t || {}),
      c = r.mask;
    return (
      c && (c = (c || {}).icon ? c : M0(c || {})),
      e(n, g(g({}, r), {}, { mask: c }))
    );
  };
}
var jg = function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = r.transform,
      c = n === void 0 ? u1 : n,
      i = r.symbol,
      a = i === void 0 ? !1 : i,
      o = r.mask,
      s = o === void 0 ? null : o,
      l = r.maskId,
      f = l === void 0 ? null : l,
      u = r.title,
      d = u === void 0 ? null : u,
      h = r.titleId,
      p = h === void 0 ? null : h,
      w = r.classes,
      M = w === void 0 ? [] : w,
      C = r.attributes,
      I = C === void 0 ? {} : C,
      P = r.styles,
      k = P === void 0 ? {} : P;
    if (t) {
      var Z = t.prefix,
        q = t.iconName,
        c2 = t.icon;
      return Bn(g({ type: "icon" }, t), function () {
        return (
          xe("beforeDOMElementCreation", { iconDefinition: t, params: r }),
          y.autoA11y &&
            (d
              ? (I["aria-labelledby"] = ""
                  .concat(y.replacementClass, "-title-")
                  .concat(p || L4()))
              : ((I["aria-hidden"] = "true"), (I.focusable = "false"))),
          A0({
            icons: {
              main: C0(c2),
              mask: s
                ? C0(s.icon)
                : { found: !1, width: null, height: null, icon: {} },
            },
            prefix: Z,
            iconName: q,
            transform: g(g({}, u1), c),
            symbol: a,
            title: d,
            maskId: f,
            titleId: p,
            extra: { attributes: I, styles: k, classes: M },
          })
        );
      });
    }
  },
  Ug = {
    mixout: function () {
      return { icon: Bg(jg) };
    },
    hooks: function () {
      return {
        mutationObserverCallbacks: function (r) {
          return (r.treeCallback = x5), (r.nodeCallback = Fg), r;
        },
      };
    },
    provides: function (t) {
      (t.i2svg = function (r) {
        var n = r.node,
          c = n === void 0 ? K : n,
          i = r.callback,
          a = i === void 0 ? function () {} : i;
        return x5(c, a);
      }),
        (t.generateSvgReplacementMutation = function (r, n) {
          var c = n.iconName,
            i = n.title,
            a = n.titleId,
            o = n.prefix,
            s = n.transform,
            l = n.symbol,
            f = n.mask,
            u = n.maskId,
            d = n.extra;
          return new Promise(function (h, p) {
            Promise.all([
              y0(c, o),
              f.iconName
                ? y0(f.iconName, f.prefix)
                : Promise.resolve({
                    found: !1,
                    width: 512,
                    height: 512,
                    icon: {},
                  }),
            ])
              .then(function (w) {
                var M = V0(w, 2),
                  C = M[0],
                  I = M[1];
                h([
                  r,
                  A0({
                    icons: { main: C, mask: I },
                    prefix: o,
                    iconName: c,
                    transform: s,
                    symbol: l,
                    maskId: u,
                    title: i,
                    titleId: a,
                    extra: d,
                    watchable: !0,
                  }),
                ]);
              })
              .catch(p);
          });
        }),
        (t.generateAbstractIcon = function (r) {
          var n = r.children,
            c = r.attributes,
            i = r.main,
            a = r.transform,
            o = r.styles,
            s = Pn(o);
          s.length > 0 && (c.style = s);
          var l;
          return (
            S0(a) &&
              (l = b1("generateAbstractTransformGrouping", {
                main: i,
                transform: a,
                containerWidth: i.width,
                iconWidth: i.width,
              })),
            n.push(l || i.icon),
            { children: n, attributes: c }
          );
        });
    },
  },
  $g = {
    mixout: function () {
      return {
        layer: function (r) {
          var n =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            c = n.classes,
            i = c === void 0 ? [] : c;
          return Bn({ type: "layer" }, function () {
            xe("beforeDOMElementCreation", { assembler: r, params: n });
            var a = [];
            return (
              r(function (o) {
                Array.isArray(o)
                  ? o.map(function (s) {
                      a = a.concat(s.abstract);
                    })
                  : (a = a.concat(o.abstract));
              }),
              [
                {
                  tag: "span",
                  attributes: {
                    class: ["".concat(y.cssPrefix, "-layers")]
                      .concat(D4(i))
                      .join(" "),
                  },
                  children: a,
                },
              ]
            );
          });
        },
      };
    },
  },
  Wg = {
    mixout: function () {
      return {
        counter: function (r) {
          var n =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            c = n.title,
            i = c === void 0 ? null : c,
            a = n.classes,
            o = a === void 0 ? [] : a,
            s = n.attributes,
            l = s === void 0 ? {} : s,
            f = n.styles,
            u = f === void 0 ? {} : f;
          return Bn({ type: "counter", content: r }, function () {
            return (
              xe("beforeDOMElementCreation", { content: r, params: n }),
              wg({
                content: r.toString(),
                title: i,
                extra: {
                  attributes: l,
                  styles: u,
                  classes: ["".concat(y.cssPrefix, "-layers-counter")].concat(
                    D4(o)
                  ),
                },
              })
            );
          });
        },
      };
    },
  },
  qg = {
    mixout: function () {
      return {
        text: function (r) {
          var n =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            c = n.transform,
            i = c === void 0 ? u1 : c,
            a = n.title,
            o = a === void 0 ? null : a,
            s = n.classes,
            l = s === void 0 ? [] : s,
            f = n.attributes,
            u = f === void 0 ? {} : f,
            d = n.styles,
            h = d === void 0 ? {} : d;
          return Bn({ type: "text", content: r }, function () {
            return (
              xe("beforeDOMElementCreation", { content: r, params: n }),
              C5({
                content: r,
                transform: g(g({}, u1), i),
                title: o,
                extra: {
                  attributes: u,
                  styles: h,
                  classes: ["".concat(y.cssPrefix, "-layers-text")].concat(
                    D4(l)
                  ),
                },
              })
            );
          });
        },
      };
    },
    provides: function (t) {
      t.generateLayersText = function (r, n) {
        var c = n.title,
          i = n.transform,
          a = n.extra,
          o = null,
          s = null;
        if (R5) {
          var l = parseInt(getComputedStyle(r).fontSize, 10),
            f = r.getBoundingClientRect();
          (o = f.width / l), (s = f.height / l);
        }
        return (
          y.autoA11y && !c && (a.attributes["aria-hidden"] = "true"),
          Promise.resolve([
            r,
            C5({
              content: r.innerHTML,
              width: o,
              height: s,
              transform: i,
              title: c,
              extra: a,
              watchable: !0,
            }),
          ])
        );
      };
    },
  },
  Gg = new RegExp('"', "ug"),
  b5 = [1105920, 1112319];
function Yg(e) {
  var t = e.replace(Gg, ""),
    r = og(t, 0),
    n = r >= b5[0] && r <= b5[1],
    c = t.length === 2 ? t[0] === t[1] : !1;
  return { value: m0(c ? t[0] : t), isSecondary: n || c };
}
function L5(e, t) {
  var r = "".concat(_m).concat(t.replace(":", "-"));
  return new Promise(function (n, c) {
    if (e.getAttribute(r) !== null) return n();
    var i = g3(e.children),
      a = i.filter(function (c2) {
        return c2.getAttribute(p0) === t;
      })[0],
      o = Z1.getComputedStyle(e, t),
      s = o.getPropertyValue("font-family").match(jm),
      l = o.getPropertyValue("font-weight"),
      f = o.getPropertyValue("content");
    if (a && !s) return e.removeChild(a), n();
    if (s && f !== "none" && f !== "") {
      var u = o.getPropertyValue("content"),
        d = ~["Sharp"].indexOf(s[2]) ? e2 : X,
        h = ~[
          "Solid",
          "Regular",
          "Light",
          "Thin",
          "Duotone",
          "Brands",
          "Kit",
        ].indexOf(s[2])
          ? w4[d][s[2].toLowerCase()]
          : Um[d][l],
        p = Yg(u),
        w = p.value,
        M = p.isSecondary,
        C = s[0].startsWith("FontAwesome"),
        I = E0(h, w),
        P = I;
      if (C) {
        var k = pg(w);
        k.iconName && k.prefix && ((I = k.iconName), (h = k.prefix));
      }
      if (
        I &&
        !M &&
        (!a || a.getAttribute(x0) !== h || a.getAttribute(b0) !== P)
      ) {
        e.setAttribute(r, P), a && e.removeChild(a);
        var Z = Pg(),
          q = Z.extra;
        (q.attributes[p0] = t),
          y0(I, h)
            .then(function (c2) {
              var K2 = A0(
                  g(
                    g({}, Z),
                    {},
                    {
                      icons: { main: c2, mask: I0() },
                      prefix: h,
                      iconName: P,
                      extra: q,
                      watchable: !0,
                    }
                  )
                ),
                J2 = K.createElementNS("http://www.w3.org/2000/svg", "svg");
              t === "::before"
                ? e.insertBefore(J2, e.firstChild)
                : e.appendChild(J2),
                (J2.outerHTML = K2.map(function (H7) {
                  return N4(H7);
                }).join(`
`)),
                e.removeAttribute(r),
                n();
            })
            .catch(c);
      } else n();
    } else n();
  });
}
function Zg(e) {
  return Promise.all([L5(e, "::before"), L5(e, "::after")]);
}
function Qg(e) {
  return (
    e.parentNode !== document.head &&
    !~Om.indexOf(e.tagName.toUpperCase()) &&
    !e.getAttribute(p0) &&
    (!e.parentNode || e.parentNode.tagName !== "svg")
  );
}
function D5(e) {
  if (L1)
    return new Promise(function (t, r) {
      var n = g3(e.querySelectorAll("*")).filter(Qg).map(Zg),
        c = T0.begin("searchPseudoElements");
      r7(),
        Promise.all(n)
          .then(function () {
            c(), z0(), t();
          })
          .catch(function () {
            c(), z0(), r();
          });
    });
}
var Xg = {
    hooks: function () {
      return {
        mutationObserverCallbacks: function (r) {
          return (r.pseudoElementsCallback = D5), r;
        },
      };
    },
    provides: function (t) {
      t.pseudoElements2svg = function (r) {
        var n = r.node,
          c = n === void 0 ? K : n;
        y.searchPseudoElements && D5(c);
      };
    },
  },
  S5 = !1,
  Kg = {
    mixout: function () {
      return {
        dom: {
          unwatch: function () {
            r7(), (S5 = !0);
          },
        },
      };
    },
    hooks: function () {
      return {
        bootstrap: function () {
          V5(v0("mutationObserverCallbacks", {}));
        },
        noAuto: function () {
          Tg();
        },
        watch: function (r) {
          var n = r.observeMutationsRoot;
          S5
            ? z0()
            : V5(v0("mutationObserverCallbacks", { observeMutationsRoot: n }));
        },
      };
    },
  },
  N5 = function (t) {
    var r = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
    return t
      .toLowerCase()
      .split(" ")
      .reduce(function (n, c) {
        var i = c.toLowerCase().split("-"),
          a = i[0],
          o = i.slice(1).join("-");
        if (a && o === "h") return (n.flipX = !0), n;
        if (a && o === "v") return (n.flipY = !0), n;
        if (((o = parseFloat(o)), isNaN(o))) return n;
        switch (a) {
          case "grow":
            n.size = n.size + o;
            break;
          case "shrink":
            n.size = n.size - o;
            break;
          case "left":
            n.x = n.x - o;
            break;
          case "right":
            n.x = n.x + o;
            break;
          case "up":
            n.y = n.y - o;
            break;
          case "down":
            n.y = n.y + o;
            break;
          case "rotate":
            n.rotate = n.rotate + o;
            break;
        }
        return n;
      }, r);
  },
  Jg = {
    mixout: function () {
      return {
        parse: {
          transform: function (r) {
            return N5(r);
          },
        },
      };
    },
    hooks: function () {
      return {
        parseNodeAttributes: function (r, n) {
          var c = n.getAttribute("data-fa-transform");
          return c && (r.transform = N5(c)), r;
        },
      };
    },
    provides: function (t) {
      t.generateAbstractTransformGrouping = function (r) {
        var n = r.main,
          c = r.transform,
          i = r.containerWidth,
          a = r.iconWidth,
          o = { transform: "translate(".concat(i / 2, " 256)") },
          s = "translate(".concat(c.x * 32, ", ").concat(c.y * 32, ") "),
          l = "scale("
            .concat((c.size / 16) * (c.flipX ? -1 : 1), ", ")
            .concat((c.size / 16) * (c.flipY ? -1 : 1), ") "),
          f = "rotate(".concat(c.rotate, " 0 0)"),
          u = { transform: "".concat(s, " ").concat(l, " ").concat(f) },
          d = { transform: "translate(".concat((a / 2) * -1, " -256)") },
          h = { outer: o, inner: u, path: d };
        return {
          tag: "g",
          attributes: g({}, h.outer),
          children: [
            {
              tag: "g",
              attributes: g({}, h.inner),
              children: [
                {
                  tag: n.icon.tag,
                  children: n.icon.children,
                  attributes: g(g({}, n.icon.attributes), h.path),
                },
              ],
            },
          ],
        };
      };
    },
  },
  u0 = { x: 0, y: 0, width: "100%", height: "100%" };
function E5(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return (
    e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e
  );
}
function ev(e) {
  return e.tag === "g" ? e.children : [e];
}
var tv = {
    hooks: function () {
      return {
        parseNodeAttributes: function (r, n) {
          var c = n.getAttribute("data-fa-mask"),
            i = c
              ? Fn(
                  c.split(" ").map(function (a) {
                    return a.trim();
                  })
                )
              : I0();
          return (
            i.prefix || (i.prefix = Q1()),
            (r.mask = i),
            (r.maskId = n.getAttribute("data-fa-mask-id")),
            r
          );
        },
      };
    },
    provides: function (t) {
      t.generateAbstractMask = function (r) {
        var n = r.children,
          c = r.attributes,
          i = r.main,
          a = r.mask,
          o = r.maskId,
          s = r.transform,
          l = i.width,
          f = i.icon,
          u = a.width,
          d = a.icon,
          h = Jm({ transform: s, containerWidth: u, iconWidth: l }),
          p = { tag: "rect", attributes: g(g({}, u0), {}, { fill: "white" }) },
          w = f.children ? { children: f.children.map(E5) } : {},
          M = {
            tag: "g",
            attributes: g({}, h.inner),
            children: [
              E5(
                g({ tag: f.tag, attributes: g(g({}, f.attributes), h.path) }, w)
              ),
            ],
          },
          C = { tag: "g", attributes: g({}, h.outer), children: [M] },
          I = "mask-".concat(o || L4()),
          P = "clip-".concat(o || L4()),
          k = {
            tag: "mask",
            attributes: g(
              g({}, u0),
              {},
              {
                id: I,
                maskUnits: "userSpaceOnUse",
                maskContentUnits: "userSpaceOnUse",
              }
            ),
            children: [p, C],
          },
          Z = {
            tag: "defs",
            children: [
              { tag: "clipPath", attributes: { id: P }, children: ev(d) },
              k,
            ],
          };
        return (
          n.push(Z, {
            tag: "rect",
            attributes: g(
              {
                fill: "currentColor",
                "clip-path": "url(#".concat(P, ")"),
                mask: "url(#".concat(I, ")"),
              },
              u0
            ),
          }),
          { children: n, attributes: c }
        );
      };
    },
  },
  nv = {
    provides: function (t) {
      var r = !1;
      Z1.matchMedia &&
        (r = Z1.matchMedia("(prefers-reduced-motion: reduce)").matches),
        (t.missingIconAbstract = function () {
          var n = [],
            c = { fill: "currentColor" },
            i = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" };
          n.push({
            tag: "path",
            attributes: g(
              g({}, c),
              {},
              {
                d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
              }
            ),
          });
          var a = g(g({}, i), {}, { attributeName: "opacity" }),
            o = {
              tag: "circle",
              attributes: g(g({}, c), {}, { cx: "256", cy: "364", r: "28" }),
              children: [],
            };
          return (
            r ||
              o.children.push(
                {
                  tag: "animate",
                  attributes: g(
                    g({}, i),
                    {},
                    { attributeName: "r", values: "28;14;28;28;14;28;" }
                  ),
                },
                {
                  tag: "animate",
                  attributes: g(g({}, a), {}, { values: "1;0;1;1;0;1;" }),
                }
              ),
            n.push(o),
            n.push({
              tag: "path",
              attributes: g(
                g({}, c),
                {},
                {
                  opacity: "1",
                  d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                }
              ),
              children: r
                ? []
                : [
                    {
                      tag: "animate",
                      attributes: g(g({}, a), {}, { values: "1;0;0;0;0;1;" }),
                    },
                  ],
            }),
            r ||
              n.push({
                tag: "path",
                attributes: g(
                  g({}, c),
                  {},
                  {
                    opacity: "0",
                    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                  }
                ),
                children: [
                  {
                    tag: "animate",
                    attributes: g(g({}, a), {}, { values: "0;0;1;1;0;0;" }),
                  },
                ],
              }),
            { tag: "g", attributes: { class: "missing" }, children: n }
          );
        });
    },
  },
  rv = {
    hooks: function () {
      return {
        parseNodeAttributes: function (r, n) {
          var c = n.getAttribute("data-fa-symbol"),
            i = c === null ? !1 : c === "" ? !0 : c;
          return (r.symbol = i), r;
        },
      };
    },
  },
  cv = [ng, Ug, $g, Wg, qg, Xg, Kg, Jg, tv, nv, rv];
vg(cv, { mixoutsTo: E2 });
var Qw = E2.noAuto,
  Xw = E2.config,
  Kw = E2.library,
  Jw = E2.dom,
  i7 = E2.parse,
  ex = E2.findIconDefinition,
  tx = E2.toHtml,
  a7 = E2.icon,
  nx = E2.layer,
  iv = E2.text,
  av = E2.counter;
var ov = ["*"],
  sv = (e) => {
    throw new Error(
      `Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`
    );
  },
  lv = () => {
    throw new Error(
      "Property `icon` is required for `fa-icon`/`fa-duotone-icon` components."
    );
  },
  fv = (e) => {
    let t = {
      [`fa-${e.animation}`]:
        e.animation != null && !e.animation.startsWith("spin"),
      "fa-spin": e.animation === "spin" || e.animation === "spin-reverse",
      "fa-spin-pulse":
        e.animation === "spin-pulse" || e.animation === "spin-pulse-reverse",
      "fa-spin-reverse":
        e.animation === "spin-reverse" || e.animation === "spin-pulse-reverse",
      "fa-pulse":
        e.animation === "spin-pulse" || e.animation === "spin-pulse-reverse",
      "fa-fw": e.fixedWidth,
      "fa-border": e.border,
      "fa-inverse": e.inverse,
      "fa-layers-counter": e.counter,
      "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
      "fa-flip-vertical": e.flip === "vertical" || e.flip === "both",
      [`fa-${e.size}`]: e.size !== null,
      [`fa-rotate-${e.rotate}`]: e.rotate !== null,
      [`fa-pull-${e.pull}`]: e.pull !== null,
      [`fa-stack-${e.stackItemSize}`]: e.stackItemSize != null,
    };
    return Object.keys(t)
      .map((r) => (t[r] ? r : null))
      .filter((r) => r);
  },
  uv = (e) => e.prefix !== void 0 && e.iconName !== void 0,
  dv = (e, t) =>
    uv(e)
      ? e
      : typeof e == "string"
      ? { prefix: t, iconName: e }
      : { prefix: e[0], iconName: e[1] },
  hv = (() => {
    let t = class t {
      constructor() {
        (this.defaultPrefix = "fas"), (this.fallbackIcon = null);
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  pv = (() => {
    let t = class t {
      constructor() {
        this.definitions = {};
      }
      addIcons(...n) {
        for (let c of n) {
          c.prefix in this.definitions || (this.definitions[c.prefix] = {}),
            (this.definitions[c.prefix][c.iconName] = c);
          for (let i of c.icon[2])
            typeof i == "string" && (this.definitions[c.prefix][i] = c);
        }
      }
      addIconPacks(...n) {
        for (let c of n) {
          let i = Object.keys(c).map((a) => c[a]);
          this.addIcons(...i);
        }
      }
      getIconDefinition(n, c) {
        return n in this.definitions && c in this.definitions[n]
          ? this.definitions[n][c]
          : null;
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
    let e = t;
    return e;
  })(),
  mv = (() => {
    let t = class t {
      constructor() {
        this.stackItemSize = "1x";
      }
      ngOnChanges(n) {
        if ("size" in n)
          throw new Error(
            'fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.'
          );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)();
    }),
      (t.ɵdir = de({
        type: t,
        selectors: [
          ["fa-icon", "stackItemSize", ""],
          ["fa-duotone-icon", "stackItemSize", ""],
        ],
        inputs: { stackItemSize: "stackItemSize", size: "size" },
        standalone: !0,
        features: [F1],
      }));
    let e = t;
    return e;
  })(),
  gv = (() => {
    let t = class t {
      constructor(n, c) {
        (this.renderer = n), (this.elementRef = c);
      }
      ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, "fa-stack");
      }
      ngOnChanges(n) {
        "size" in n &&
          (n.size.currentValue != null &&
            this.renderer.addClass(
              this.elementRef.nativeElement,
              `fa-${n.size.currentValue}`
            ),
          n.size.previousValue != null &&
            this.renderer.removeClass(
              this.elementRef.nativeElement,
              `fa-${n.size.previousValue}`
            ));
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(a2(F3), a2(Xe));
    }),
      (t.ɵcmp = L2({
        type: t,
        selectors: [["fa-stack"]],
        inputs: { size: "size" },
        standalone: !0,
        features: [F1, D2],
        ngContentSelectors: ov,
        decls: 1,
        vars: 0,
        template: function (c, i) {
          c & 1 && (Ds(), Ss(0));
        },
        encapsulation: 2,
      }));
    let e = t;
    return e;
  })(),
  jn = (() => {
    let t = class t {
      set spin(n) {
        this.animation = n ? "spin" : void 0;
      }
      set pulse(n) {
        this.animation = n ? "spin-pulse" : void 0;
      }
      constructor(n, c, i, a, o) {
        (this.sanitizer = n),
          (this.config = c),
          (this.iconLibrary = i),
          (this.stackItem = a),
          (this.classes = []),
          o != null &&
            a == null &&
            console.error(
              'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.'
            );
      }
      ngOnChanges(n) {
        if (this.icon == null && this.config.fallbackIcon == null) {
          lv();
          return;
        }
        if (n) {
          let c = this.icon != null ? this.icon : this.config.fallbackIcon,
            i = this.findIconDefinition(c);
          if (i != null) {
            let a = this.buildParams();
            this.renderIcon(i, a);
          }
        }
      }
      render() {
        this.ngOnChanges({});
      }
      findIconDefinition(n) {
        let c = dv(n, this.config.defaultPrefix);
        if ("icon" in c) return c;
        let i = this.iconLibrary.getIconDefinition(c.prefix, c.iconName);
        return i ?? (sv(c), null);
      }
      buildParams() {
        let n = {
            flip: this.flip,
            animation: this.animation,
            border: this.border,
            inverse: this.inverse,
            size: this.size || null,
            pull: this.pull || null,
            rotate: this.rotate || null,
            fixedWidth:
              typeof this.fixedWidth == "boolean"
                ? this.fixedWidth
                : this.config.fixedWidth,
            stackItemSize:
              this.stackItem != null ? this.stackItem.stackItemSize : null,
          },
          c =
            typeof this.transform == "string"
              ? i7.transform(this.transform)
              : this.transform;
        return {
          title: this.title,
          transform: c,
          classes: [...fv(n), ...this.classes],
          mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
          styles: this.styles != null ? this.styles : {},
          symbol: this.symbol,
          attributes: { role: this.a11yRole },
        };
      }
      renderIcon(n, c) {
        let i = a7(n, c);
        this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
          i.html.join(`
`)
        );
      }
    };
    (t.ɵfac = function (c) {
      return new (c || t)(a2(Vc), a2(hv), a2(pv), a2(mv, 8), a2(gv, 8));
    }),
      (t.ɵcmp = L2({
        type: t,
        selectors: [["fa-icon"]],
        hostAttrs: [1, "ng-fa-icon"],
        hostVars: 2,
        hostBindings: function (c, i) {
          c & 2 &&
            (tc("innerHTML", i.renderedIconHTML, ko), Gt("title", i.title));
        },
        inputs: {
          icon: "icon",
          title: "title",
          animation: "animation",
          spin: "spin",
          pulse: "pulse",
          mask: "mask",
          styles: "styles",
          flip: "flip",
          size: "size",
          pull: "pull",
          border: "border",
          inverse: "inverse",
          symbol: "symbol",
          rotate: "rotate",
          fixedWidth: "fixedWidth",
          classes: "classes",
          transform: "transform",
          a11yRole: "a11yRole",
        },
        standalone: !0,
        features: [F1, D2],
        decls: 0,
        vars: 0,
        template: function (c, i) {},
        encapsulation: 2,
      }));
    let e = t;
    return e;
  })();
var Un = (() => {
  let t = class t {};
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵmod = O1({ type: t })),
    (t.ɵinj = P1({}));
  let e = t;
  return e;
})();
var s7 = {
  prefix: "fas",
  iconName: "city",
  icon: [
    640,
    512,
    [127961],
    "f64f",
    "M480 48c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48V96H224V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V96H112V24c0-13.3-10.7-24-24-24S64 10.7 64 24V96H48C21.5 96 0 117.5 0 144v96V464c0 26.5 21.5 48 48 48H304h32 96H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM240 416H208c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM560 256c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32zM256 176v32c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32zM256 304c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM112 320H80c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z",
  ],
};
var l7 = {
  prefix: "fas",
  iconName: "face-frown",
  icon: [
    512,
    512,
    [9785, "frown"],
    "f119",
    "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
  ],
};
var vv = {
    prefix: "fas",
    iconName: "location-crosshairs",
    icon: [
      512,
      512,
      ["location"],
      "f601",
      "M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z",
    ],
  },
  f7 = vv;
var u7 = {
  prefix: "fas",
  iconName: "cloud-rain",
  icon: [
    512,
    512,
    [127783, 9926],
    "f73d",
    "M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z",
  ],
};
var d7 = {
  prefix: "fas",
  iconName: "sun",
  icon: [
    512,
    512,
    [9728],
    "f185",
    "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z",
  ],
};
var h7 = {
  prefix: "fas",
  iconName: "thumbs-down",
  icon: [
    512,
    512,
    [128078, 61576],
    "f165",
    "M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z",
  ],
};
var p7 = {
  prefix: "fas",
  iconName: "face-smile",
  icon: [
    512,
    512,
    [128578, "smile"],
    "f118",
    "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
  ],
};
var m7 = {
  prefix: "fas",
  iconName: "thumbs-up",
  icon: [
    512,
    512,
    [128077, 61575],
    "f164",
    "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z",
  ],
};
var $n = class {};
var Wn = class {};
var qn = class {};
var Gn = class {};
var X2 = {
  production: !1,
  WeatherApiLocationBAseUrl:
    "https://weather338.p.rapidapi.com/locations/search?",
  WeatherApiForecastBAseUrl:
    "https://weather338.p.rapidapi.com/weather/forecast?",
  xRapidApiKeyName: "X-RapidAPI-Key",
  xRapidApikeyValue: "09951f7677msh2ade80c0ccdba94p13ef99jsn222c7ddbb16f",
  xRapidApiHostName: "X-RapidAPI-Host",
  xRapidApiHostValue: "weather338.p.rapidapi.com",
};
var v3 = (() => {
  let t = class t {
    constructor(n) {
      (this.httpClient = n),
        (this.isloadingSubject = new o2(!1)),
        (this.isloading$ = this.isloadingSubject.asObservable()),
        (this.todayData = []),
        (this.weekData = []),
        (this.cityName = "Li\xE8ge"),
        (this.language = "en-US"),
        (this.date = "20200622"),
        (this.units = "m"),
        (this.today = !1),
        (this.week = !0),
        (this.celsius = !0),
        (this.fahrenheit = !1),
        this.getData();
    }
    getSummaryImage(n) {
      let c = "assets/",
        i = "cloudy.gif",
        a = "rainy-day.png",
        o = "wind.gif",
        s = "sun.gif",
        l = "rain.gif",
        f = "snow.gif";
      return String(n).includes("Partly Cloudy") ||
        String(n).includes("P Cloudy")
        ? c + i
        : String(n).includes("Partly Rainy") || String(n).includes("P Rainy")
        ? c + a
        : String(n).includes("wind")
        ? c + o
        : String(n).includes("rain")
        ? c + l
        : String(n).includes("snowy") || String(n).includes("snow")
        ? c + f
        : c + s;
    }
    fillTemperatureDataModel() {
      (this.currentTime = new Date()),
        (this.temperatureData.day =
          this.ForecastData["v3-wx-observations-current"].dayOfWeek),
        (this.temperatureData.time = `${String(
          this.currentTime.getHours()
        ).padStart(2, "0")}:${String(this.currentTime.getMinutes()).padStart(
          2,
          "0"
        )}`),
        (this.temperatureData.temperature =
          this.ForecastData["v3-wx-observations-current"].temperature),
        (this.temperatureData.location = `${this.locationData.location.city[0]},${this.locationData.location.country[0]}`),
        (this.temperatureData.rainPercent =
          this.ForecastData["v3-wx-observations-current"].precip24Hour),
        (this.temperatureData.summaryPhrase =
          this.ForecastData["v3-wx-observations-current"].wxPhraseShort),
        (this.temperatureData.summaryImage = this.getSummaryImage(
          this.temperatureData.summaryPhrase
        ));
    }
    fillWeekData() {
      for (let n = 0; n < 7; n++)
        this.weekData.push(new qn()),
          (this.weekData[n].day = this.ForecastData[
            "v3-wx-forecast-daily-15day"
          ].dayOfWeek[n].slice(0, 3)),
          (this.weekData[n].tempMax =
            this.ForecastData[
              "v3-wx-forecast-daily-15day"
            ].calendarDayTemperatureMax[n]),
          (this.weekData[n].tempMin =
            this.ForecastData[
              "v3-wx-forecast-daily-15day"
            ].calendarDayTemperatureMin[n]),
          (this.weekData[n].summaryImage = this.getSummaryImage(
            this.ForecastData["v3-wx-forecast-daily-15day"].narrative[n]
          ));
    }
    fillTodayData() {
      for (let n = 0; n < 7; n++)
        this.todayData.push(new Wn()),
          (this.todayData[n].time = this.ForecastData[
            "v3-wx-forecast-hourly-10day"
          ].validTimeLocal[n].slice(11, 16)),
          (this.todayData[n].temperature =
            this.ForecastData["v3-wx-forecast-hourly-10day"].temperature[n]),
          (this.todayData[n].summaryImage = this.getSummaryImage(
            this.ForecastData["v3-wx-forecast-hourly-10day"].wxPhraseShort[n]
          ));
    }
    getTimeFromString(n) {
      return n.slice(11, 16);
    }
    fillTodaysHighlight() {
      (this.TodaysHighlights.airQuality =
        this.ForecastData[
          "v3-wx-globalAirQuality"
        ].globalairquality.airQualityIndex),
        (this.TodaysHighlights.humidity =
          this.ForecastData["v3-wx-observations-current"].relativeHumidity),
        (this.TodaysHighlights.sunrise = this.getTimeFromString(
          this.ForecastData["v3-wx-observations-current"].sunriseTimeLocal
        )),
        (this.TodaysHighlights.sunset = this.getTimeFromString(
          this.ForecastData["v3-wx-observations-current"].sunsetTimeLocal
        )),
        (this.TodaysHighlights.uvIndex =
          this.ForecastData["v3-wx-observations-current"].uvIndex),
        (this.TodaysHighlights.visibility =
          this.ForecastData["v3-wx-observations-current"].visibility),
        (this.TodaysHighlights.windStatus =
          this.ForecastData["v3-wx-observations-current"].windSpeed);
    }
    prepareData() {
      this.fillTemperatureDataModel(),
        this.fillWeekData(),
        this.fillTodayData(),
        this.fillTodaysHighlight(),
        console.log(this.ForecastData),
        console.log(this.temperatureData),
        console.log(this.weekData),
        console.log(this.todayData),
        console.log(this.TodaysHighlights);
    }
    celsiusToFahrenheit(n) {
      return +(n * 1.8 + 32).toFixed(2);
    }
    fahrenheitToCelsius(n) {
      return +((n - 32) * 0.55).toFixed(2);
    }
    getLocationData(n, c) {
      return this.httpClient.get(X2.WeatherApiLocationBAseUrl, {
        headers: new O2()
          .set(X2.xRapidApiKeyName, X2.xRapidApikeyValue)
          .set(X2.xRapidApiHostName, X2.xRapidApiHostValue),
        params: new Y2().set("query", n).set("language", c),
      });
    }
    getWeatherReport(n, c, i, a, o) {
      return this.httpClient.get(X2.WeatherApiForecastBAseUrl, {
        headers: new O2()
          .set(X2.xRapidApiKeyName, X2.xRapidApikeyValue)
          .set(X2.xRapidApiHostName, X2.xRapidApiHostValue),
        params: new Y2()
          .set("date", n)
          .set("latitude", c)
          .set("longitude", i)
          .set("language", a)
          .set("units", o),
      });
    }
    getData() {
      this.isloadingSubject.next(!0),
        (this.todayData = []),
        (this.weekData = []),
        (this.temperatureData = new $n()),
        (this.TodaysHighlights = new Gn());
      var n = 0,
        c = 0;
      this.getLocationData(this.cityName, this.language).subscribe({
        next: (i) => {
          (this.locationData = i),
            (n = this.locationData.location.latitude[0]),
            (c = this.locationData.location.longitude[0]),
            console.log(this.locationData),
            this.getWeatherReport(
              this.date,
              n,
              c,
              this.language,
              this.units
            ).subscribe({
              next: (a) => {
                (this.ForecastData = a),
                  this.prepareData(),
                  this.isloadingSubject.next(!1);
              },
              error: () => {
                this.isloadingSubject.next(!1);
              },
            });
        },
        error: () => {
          this.isloadingSubject.next(!1);
        },
      });
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)(L(pc));
  }),
    (t.ɵprov = V({ token: t, factory: t.ɵfac, providedIn: "root" }));
  let e = t;
  return e;
})();
var v7 = (() => {
  let t = class t {
    constructor() {
      (this.faLocation = f7),
        (this.searchIcon = s7),
        (this.faSun = d7),
        (this.faCloudRain = u7),
        (this.weatherService = m(v3));
    }
    onSearch(n) {
      (this.weatherService.cityName = n), this.weatherService.getData();
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵcmp = L2({
      type: t,
      selectors: [["app-left-container"]],
      standalone: !0,
      features: [D2],
      decls: 41,
      vars: 13,
      consts: [
        ["search", ""],
        [1, "left-container"],
        [1, "left-container-nav-bar"],
        [1, "search-icon"],
        [1, "fa-s", 3, "icon"],
        [1, "search-input"],
        [
          "type",
          "text",
          "placeholder",
          "Search for places...",
          3,
          "keyup.Enter",
        ],
        [1, "location-icon", 3, "click"],
        [1, "city"],
        [1, "left-container-data-box"],
        [1, "left-container-temp-data"],
        [1, "left-container-temp-img"],
        ["alt", "", 3, "src"],
        [1, "left-container-temp-value"],
        [1, "left-container-day-time"],
        [1, "time"],
        [1, "dividing-line"],
        [1, "left-container-other-details"],
        [1, "left-container-temp-summary"],
        [1, "left-container-temp-summary-phrase-img"],
        [1, "fa-s", 2, "color", "#387ADF", 3, "icon"],
        [1, "left-container-temp-summary-value"],
        [1, "left-container-rain-stats"],
        [1, "left-container-rain-stats-img"],
        [1, "left-container-rain-stats-value"],
        [1, "left-container-location-details"],
        [1, "left-container-location-img"],
        ["src", "assets/download.jpeg", "alt", "cityimage"],
        [1, "left-container-location-name"],
      ],
      template: function (c, i) {
        if (c & 1) {
          let a = Ls();
          v(0, "div", 1)(1, "div", 2)(2, "div", 3),
            G(3, "fa-icon", 4),
            z(),
            v(4, "div", 5)(5, "input", 6, 0),
            s1("keyup.Enter", function () {
              Sr(a);
              let s = j3(6);
              return Nr(i.onSearch(s.value));
            }),
            z()(),
            v(7, "div", 7),
            s1("click", function () {
              Sr(a);
              let s = j3(6);
              return Nr(i.onSearch(s.value));
            }),
            G(8, "fa-icon", 4),
            z()(),
            v(9, "div")(10, "p", 8),
            A(11),
            z()(),
            v(12, "div", 9)(13, "div", 10)(14, "div", 11),
            G(15, "img", 12),
            z(),
            v(16, "div", 13),
            A(17),
            v(18, "sup"),
            A(19),
            z()(),
            v(20, "div", 14),
            A(21),
            v(22, "span", 15),
            A(23),
            z()()(),
            G(24, "div", 16),
            v(25, "div", 17)(26, "div", 18)(27, "div", 19),
            G(28, "fa-icon", 20),
            z(),
            v(29, "div", 21),
            A(30),
            z()(),
            v(31, "div", 22)(32, "div", 23),
            G(33, "fa-icon", 20),
            z(),
            v(34, "div", 24),
            A(35),
            z()(),
            v(36, "div", 25)(37, "div", 26),
            G(38, "img", 27),
            z(),
            v(39, "div", 28),
            A(40),
            z()()()()();
        }
        c & 2 &&
          (N(3),
          r2("icon", i.searchIcon),
          N(5),
          r2("icon", i.faLocation),
          N(3),
          h2(" ", i.weatherService.cityName, ""),
          N(4),
          Je("src", i.weatherService.temperatureData.summaryImage, P3),
          N(2),
          H1(
            i.weatherService.celsius == !0
              ? i.weatherService.temperatureData.temperature
              : i.weatherService.celsiusToFahrenheit(
                  i.weatherService.temperatureData.temperature
                )
          ),
          N(2),
          H1(i.weatherService.celsius == !0 ? "\xB0C" : "\xB0F"),
          N(2),
          h2("", i.weatherService.temperatureData.day, ", "),
          N(2),
          H1(i.weatherService.temperatureData.time),
          N(5),
          r2("icon", i.faSun),
          N(2),
          h2("", i.weatherService.temperatureData.summaryPhrase, " "),
          N(3),
          r2("icon", i.faCloudRain),
          N(2),
          h2("Rain - ", i.weatherService.temperatureData.rainPercent, " %"),
          N(5),
          H1(i.weatherService.temperatureData.location));
      },
      dependencies: [Un, jn, ve],
      styles: [
        "@media only screen and (max-width: 1240px){.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container-today-highlight-title[_ngcontent-%COMP%]{flex:2;margin-top:3px!important;margin-left:36px!important;font-size:18px;font-weight:700;padding-top:-25px}.right-container-today-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-nav-bar[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:space-between;align-items:center;font-size:small;font-weight:700;flex-wrap:wrap;margin-top:10px}.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;margin:30px 0!important}}@media only screen and (max-width: 1216px){body[_ngcontent-%COMP%]{overflow:scroll!important}.app-container[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#fff!important;display:flex;justify-content:center;align-items:center;flex-wrap:wrap}.weather-container[_ngcontent-%COMP%]{display:block!important;background-color:#fff;border-radius:30px;display:flex;flex-direction:row;flex-wrap:wrap}.left-container[_ngcontent-%COMP%]{flex:3;background-color:#f6f6f8;width:100%;display:flex;flex-direction:column;flex-wrap:wrap;padding-bottom:10px;border-top-left-radius:0!important;border-bottom-left-radius:0!important}.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container[_ngcontent-%COMP%]{flex:7;background-color:#f6f6f8;width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;border-bottom-right-radius:0!important;align-items:center}.right-container-data-box[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:column;margin:10px;flex-wrap:wrap}.right-container-week-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.cards[_ngcontent-%COMP%]{width:95px;height:120px;text-align:center;justify-content:center;align-items:center;border-radius:10px;background-color:#fff;font-size:small;font-weight:500;margin-right:8px;margin-bottom:5px;font-weight:700}.right-container-today-highlight[_ngcontent-%COMP%]{flex:6;display:flex;flex-direction:column;flex-wrap:wrap}.right-container-today-highlight-cards[_ngcontent-%COMP%]{display:flex;flex:10;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-today-highlight-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#fff;width:227px;height:190px;border-radius:10px;justify-content:center;align-items:center;text-align:center;margin:5px 8px!important}}@media only screen and (max-width: 1216px) and (max-width: 514px){.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}}.left-container[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;flex-direction:column}.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center}.search-icon[_ngcontent-%COMP%]{flex:2;text-align:right;margin-right:5px}.search-icon[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{color:#387adf}.search-input[_ngcontent-%COMP%]{flex:4}.search-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;border:none;outline:none;padding:5px 8px;font-size:16px;color:#000;text-align:center;background:#f3f1f1;border-radius:25px}.location-icon[_ngcontent-%COMP%]{flex:2;text-align:center;margin:-2px 10px 0 0}.location-icon[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{padding:2px 5px;background-color:#8d8d96b8;border-radius:500px;color:#387adf}.location-icon[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]:hover{background-color:#9292942b;color:#5f94e3;border-radius:500px;cursor:pointer;transition:3ms ease-in-out all}.city[_ngcontent-%COMP%]{font-size:larger;font-weight:700;text-align:center}.left-container-data-box[_ngcontent-%COMP%]{flex:12;display:flex;margin:auto 30px;flex-direction:column}.left-container-temp-data[_ngcontent-%COMP%]{flex:5;display:flex;flex-direction:column;justify-content:center;align-items:center}.left-container-temp-img[_ngcontent-%COMP%]{flex:2}.left-container-temp-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:160px;height:160px}.left-container-temp-value[_ngcontent-%COMP%]{flex:1;font-size:62px;font-weight:700}.left-container-temp-value[_ngcontent-%COMP%]   sup[_ngcontent-%COMP%]{position:relative;top:2px;font-size:36px}.left-container-day-time[_ngcontent-%COMP%]{flex:1;font-weight:700;color:#000;font-size:16px}.time[_ngcontent-%COMP%]{color:#c9c9c9}.dividing-line[_ngcontent-%COMP%]{height:1px;background-color:#f5f5f5;width:100%;margin:20px auto}.left-container-other-details[_ngcontent-%COMP%]{flex:5;display:flex;flex-direction:column;justify-content:center;align-items:center}.left-container-temp-summary[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;font-size:small}.left-container-temp-summary-phrase-img[_ngcontent-%COMP%]{margin-right:8px}.left-container-rain-stats[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;font-size:small}.left-container-rain-stats-img[_ngcontent-%COMP%]{margin-right:8px}.left-container-location-details[_ngcontent-%COMP%]{flex:4;position:relative;}.left-container-location-img[_ngcontent-%COMP%]{margin-top:10px}.left-container-location-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:200px;height:138px;border-radius:20px}.left-container-location-name[_ngcontent-%COMP%]{top:18px;right:49px;font-size:medium;font-weight:700;color:#4c4c4fa6;position:absolute;}",
      ],
    }));
  let e = t;
  return e;
})();
function Mv(e, t) {
  if (
    (e & 1 &&
      (v(0, "div", 38)(1, "div", 39),
      A(2),
      z(),
      v(3, "div", 40),
      G(4, "img", 41),
      z(),
      v(5, "div", 42)(6, "span", 43),
      A(7),
      z(),
      v(8, "span", 44),
      A(9),
      z()()()),
    e & 2)
  ) {
    let r = t.$implicit,
      n = B3(2);
    N(2),
      H1(r.day),
      N(2),
      Je("src", r.summaryImage, P3),
      N(3),
      U3(
        " ",
        n.weatherService.celsius == !0
          ? r.tempMax
          : n.weatherService.celsiusToFahrenheit(r.tempMax),
        "\xB0",
        n.weatherService.celsius == !0 ? "C" : "F",
        " "
      ),
      N(2),
      U3(
        " - ",
        n.weatherService.celsius == !0
          ? r.tempMin
          : n.weatherService.celsiusToFahrenheit(r.tempMin),
        "\xB0",
        n.weatherService.celsius == !0 ? "C" : "F",
        " "
      );
  }
}
function Cv(e, t) {
  if (
    (e & 1 &&
      (v(0, "div", 35)(1, "div", 36), me(2, Mv, 10, 6, "div", 37), z()()),
    e & 2)
  ) {
    let r = B3();
    N(2), r2("ngForOf", r.weatherService.weekData);
  }
}
function yv(e, t) {
  if (
    (e & 1 &&
      (v(0, "div", 38)(1, "div", 39),
      A(2),
      z(),
      v(3, "div", 40),
      G(4, "img", 41),
      z(),
      v(5, "div", 42),
      A(6),
      z()()),
    e & 2)
  ) {
    let r = t.$implicit,
      n = B3(2);
    N(2),
      H1(r.time),
      N(2),
      Je("src", r.summaryImage, P3),
      N(2),
      U3(
        " ",
        n.weatherService.celsius == !0
          ? r.temperature
          : n.weatherService.celsiusToFahrenheit(r.temperature),
        "\xB0",
        n.weatherService.celsius == !0 ? "C" : "F",
        " "
      );
  }
}
function Hv(e, t) {
  if ((e & 1 && (v(0, "div", 45), me(1, yv, 7, 4, "div", 37), z()), e & 2)) {
    let r = B3();
    N(), r2("ngForOf", r.weatherService.todayData);
  }
}
var M7 = (() => {
  let t = class t {
    constructor(n) {
      (this.weatherService = n),
        (this.faThumbsUp = m7),
        (this.faThumbsDown = h7),
        (this.faFaceSmile = p7),
        (this.faFaceFrown = l7);
    }
    onTodayClick() {
      (this.weatherService.today = !0), (this.weatherService.week = !1);
    }
    onWeekClick() {
      (this.weatherService.week = !0), (this.weatherService.today = !1);
    }
    OnCelsiusClick() {
      (this.weatherService.celsius = !0), (this.weatherService.fahrenheit = !1);
    }
    OnFahrenheitClick() {
      (this.weatherService.celsius = !1), (this.weatherService.fahrenheit = !0);
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)(a2(v3));
  }),
    (t.ɵcmp = L2({
      type: t,
      selectors: [["app-right-container"]],
      standalone: !0,
      features: [D2],
      decls: 83,
      vars: 20,
      consts: [
        [1, "right-container"],
        [1, "right-container-nav-bar"],
        [1, "nav-bar-tabs"],
        [1, "today", 3, "click", "className"],
        [1, "week", 3, "click", "className"],
        [1, "underline", 3, "className"],
        [1, "nav-bar-metric"],
        [1, "celsius", 3, "click", "className"],
        [1, "fahrenheit", 3, "click", "className"],
        ["class", "right-container-data-box", 4, "ngIf"],
        ["class", "right-container-today-cards", 4, "ngIf"],
        [1, "right-container-today-highlight"],
        [1, "right-container-today-highlight-title"],
        [1, "right-container-today-highlight-cards"],
        [1, "right-container-today-highlight-card"],
        [1, "right-container-today-highlight-card-title"],
        [1, "gauge"],
        [1, "gauge_body"],
        [1, "gauge_fill"],
        [1, "gauge_cover"],
        [1, "right-container-today-hightlight-value"],
        [1, "wind-status-value"],
        [1, "wind-status-logo"],
        ["src", "assets/wind.gif", "alt", "wind-gif"],
        [1, "sunrise-sunset-value"],
        [1, "sunrise"],
        [1, "sunrise-img"],
        ["src", "assets/sunrise.gif"],
        [1, "sunrise-time"],
        [1, "sunset"],
        [1, "sunset-img"],
        ["src", "assets/sunset.gif"],
        [1, "sunset-time"],
        [1, "humidity-summary"],
        [1, "fa-s", 2, "color", "#387adf", 3, "icon"],
        [1, "right-container-data-box"],
        [1, "right-container-week-cards"],
        ["class", "cards", 4, "ngFor", "ngForOf"],
        [1, "cards"],
        [1, "card-day"],
        [1, "card-temp-img"],
        [3, "src"],
        [1, "temp-card-value"],
        [1, "temp-max"],
        [1, "temp-min"],
        [1, "right-container-today-cards"],
      ],
      template: function (c, i) {
        c & 1 &&
          (v(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
          s1("click", function () {
            return i.onTodayClick();
          }),
          A(4, " Today "),
          z(),
          v(5, "div", 4),
          s1("click", function () {
            return i.onWeekClick();
          }),
          A(6, " Week "),
          z(),
          G(7, "div", 5),
          z(),
          v(8, "div", 6)(9, "div", 7),
          s1("click", function () {
            return i.OnCelsiusClick();
          }),
          A(10, " \xB0C "),
          z(),
          v(11, "div", 8),
          s1("click", function () {
            return i.OnFahrenheitClick();
          }),
          A(12, " \xB0F "),
          z()()(),
          me(13, Cv, 3, 1, "div", 9)(14, Hv, 2, 1, "div", 10),
          v(15, "div", 11)(16, "div", 12),
          A(17, "Today's Highlight"),
          z(),
          v(18, "div", 13)(19, "div", 14)(20, "div", 15),
          A(21, "UV Index"),
          z(),
          v(22, "div", 16)(23, "div", 17),
          G(24, "div", 18)(25, "div", 19),
          z()(),
          v(26, "div", 20),
          A(27),
          z()(),
          v(28, "div", 14)(29, "div", 15),
          A(30, "Wind Status"),
          z(),
          v(31, "div", 21),
          A(32),
          v(33, "sub"),
          A(34, "km/hr"),
          z()(),
          v(35, "div", 22),
          G(36, "img", 23),
          z()(),
          v(37, "div", 14)(38, "div", 15),
          A(39, "Sunrise & Sunset"),
          z(),
          v(40, "div", 24)(41, "div", 25)(42, "div", 26),
          G(43, "img", 27),
          z(),
          v(44, "div", 28),
          A(45),
          z()(),
          v(46, "div", 29)(47, "div", 30),
          G(48, "img", 31),
          z(),
          v(49, "div", 32),
          A(50),
          z()()()()(),
          v(51, "div", 13)(52, "div", 14)(53, "div", 15),
          A(54, "Humidity"),
          z(),
          v(55, "div", 21),
          A(56),
          v(57, "sup"),
          A(58, "%"),
          z()(),
          v(59, "div", 33),
          A(60),
          v(61, "span"),
          G(62, "fa-icon", 34),
          z()()(),
          v(63, "div", 14)(64, "div", 15),
          A(65, "Visibility"),
          z(),
          v(66, "div", 21),
          A(67),
          v(68, "sub"),
          A(69, "km"),
          z()(),
          v(70, "div", 33),
          A(71),
          v(72, "span"),
          G(73, "fa-icon", 34),
          z()()(),
          v(74, "div", 14)(75, "div", 15),
          A(76, "Air Quality"),
          z(),
          v(77, "div", 21),
          A(78),
          z(),
          v(79, "div", 33),
          A(80),
          v(81, "span"),
          G(82, "fa-icon", 34),
          z()()()()()()),
          c & 2 &&
            (N(3),
            r2(
              "className",
              i.weatherService.today == !0 ? "today today-active" : "today"
            ),
            N(2),
            r2(
              "className",
              i.weatherService.week == !0 ? "week week-active" : "week"
            ),
            N(2),
            r2(
              "className",
              i.weatherService.today == !0
                ? "underline underline-today"
                : "underline underline-week"
            ),
            N(2),
            r2(
              "className",
              i.weatherService.celsius == !0
                ? "celsius celsius-active"
                : "celsius"
            ),
            N(2),
            r2(
              "className",
              i.weatherService.fahrenheit == !0
                ? "fahrenheit fahrenheit-active"
                : "fahrenheit"
            ),
            N(2),
            r2("ngIf", i.weatherService.today == !1),
            N(),
            r2("ngIf", i.weatherService.today == !0),
            N(13),
            h2(" ", i.weatherService.TodaysHighlights.uvIndex, " "),
            N(5),
            h2(" ", i.weatherService.TodaysHighlights.windStatus, " "),
            N(13),
            h2(" ", i.weatherService.TodaysHighlights.sunrise, " AM "),
            N(5),
            h2(" ", i.weatherService.TodaysHighlights.sunset, " PM "),
            N(6),
            h2(" ", i.weatherService.TodaysHighlights.humidity, " "),
            N(4),
            h2(
              " ",
              i.weatherService.TodaysHighlights.humidity < 50
                ? "Normal"
                : "High",
              " "
            ),
            N(2),
            r2("icon", i.faThumbsUp),
            N(5),
            h2(" ", i.weatherService.TodaysHighlights.visibility, " "),
            N(4),
            h2(
              " ",
              i.weatherService.TodaysHighlights.visibility > 2
                ? "Normal"
                : "Low",
              " "
            ),
            N(2),
            r2("icon", i.faFaceFrown),
            N(5),
            h2(" ", i.weatherService.TodaysHighlights.airQuality, " "),
            N(2),
            h2(
              " ",
              i.weatherService.TodaysHighlights.airQuality < 100
                ? "Satisfactory"
                : "Unhealthy",
              " "
            ),
            N(2),
            r2("icon", i.faThumbsDown));
      },
      dependencies: [ve, Zs, Jt, Un, jn],
      styles: [
        "@media only screen and (max-width: 1240px){.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container-today-highlight-title[_ngcontent-%COMP%]{flex:2;margin-top:3px!important;margin-left:36px!important;font-size:18px;font-weight:700;padding-top:-25px}.right-container-today-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-nav-bar[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:space-between;align-items:center;font-size:small;font-weight:700;flex-wrap:wrap;margin-top:10px}.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;margin:30px 0!important}}@media only screen and (max-width: 1216px){body[_ngcontent-%COMP%]{overflow:scroll!important}.app-container[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#fff!important;display:flex;justify-content:center;align-items:center;flex-wrap:wrap}.weather-container[_ngcontent-%COMP%]{display:block!important;background-color:#fff;border-radius:30px;display:flex;flex-direction:row;flex-wrap:wrap}.left-container[_ngcontent-%COMP%]{flex:3;background-color:#f6f6f8;width:100%;display:flex;flex-direction:column;flex-wrap:wrap;padding-bottom:10px;border-top-left-radius:0!important;border-bottom-left-radius:0!important}.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container[_ngcontent-%COMP%]{flex:7;background-color:#f6f6f8;width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;border-bottom-right-radius:0!important;align-items:center}.right-container-data-box[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:column;margin:10px;flex-wrap:wrap}.right-container-week-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.cards[_ngcontent-%COMP%]{width:95px;height:120px;text-align:center;justify-content:center;align-items:center;border-radius:10px;background-color:#fff;font-size:small;font-weight:500;margin-right:8px;margin-bottom:5px;font-weight:700}.right-container-today-highlight[_ngcontent-%COMP%]{flex:6;display:flex;flex-direction:column;flex-wrap:wrap}.right-container-today-highlight-cards[_ngcontent-%COMP%]{display:flex;flex:10;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-today-highlight-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#fff;width:227px;height:190px;border-radius:10px;justify-content:center;align-items:center;text-align:center;margin:5px 8px!important}}@media only screen and (max-width: 1216px) and (max-width: 514px){.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}}.right-container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column}.right-container-nav-bar[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:space-between;align-items:center;font-size:small;font-weight:700}.nav-bar-tabs[_ngcontent-%COMP%]{display:flex;flex-direction:row;margin-left:30px;margin-top:10px}.today[_ngcontent-%COMP%]{margin-right:10px;color:#c5c5c5}.today[_ngcontent-%COMP%]:hover{cursor:pointer;color:#1a1a1a}.today-active[_ngcontent-%COMP%]{color:#1a1a1a}.week[_ngcontent-%COMP%]{color:#c5c5c5}.week[_ngcontent-%COMP%]:hover{cursor:pointer;color:#1a1a1a}.week-active[_ngcontent-%COMP%]{color:#1a1a1a}.underline[_ngcontent-%COMP%]{width:40px;height:1.5px;background-color:#1a1a1a;margin-top:1.2rem}.underline-today[_ngcontent-%COMP%]{transform:translate3d(-205%,0,0);transition:.1s}.underline-week[_ngcontent-%COMP%]{transform:translate3d(-90%,0,0);transition:.1s}.nav-bar-metric[_ngcontent-%COMP%]{display:flex;flex-direction:row;margin-right:10px;justify-content:center;align-items:center}.celsius[_ngcontent-%COMP%]{border-radius:500px;padding:5px 7px;color:#1a1a1a;background-color:#fff;font-weight:small}.celsius[_ngcontent-%COMP%]:hover{color:#fff;background-color:#1a1a1a;cursor:pointer}.celsius-active[_ngcontent-%COMP%]{color:#fff;background-color:#1a1a1a}.fahrenheit[_ngcontent-%COMP%]{border-radius:500px;padding:5px 7px;color:#1a1a1a;background-color:#fff;font-weight:small;margin:0 10px}.fahrenheit[_ngcontent-%COMP%]:hover{color:#fff;background-color:#1a1a1a;cursor:pointer}.fahrenheit-active[_ngcontent-%COMP%]{color:#fff;background-color:#1a1a1a}.profile-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:45px;height:45px;border-radius:5px;margin:0 10px}.right-container-data-box[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:column;margin:10px}.right-container-week-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center}.cards[_ngcontent-%COMP%]{width:95px;height:120px;text-align:center;justify-content:center;align-items:center;border-radius:10px;background-color:#fff;font-size:small;font-weight:500;margin-right:8px;font-weight:700}.card-day[_ngcontent-%COMP%]{margin:5px}.card-temp-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:40px;width:40px}.right-container-today-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center}.right-container-today-highlight[_ngcontent-%COMP%]{flex:8;display:flex;flex-direction:column}.right-container-today-highlight-title[_ngcontent-%COMP%]{flex:2;margin-top:50px;margin-left:36px;font-size:18px;font-weight:700;padding-top:10px}.right-container-today-highlight-cards[_ngcontent-%COMP%]{display:flex;flex:10;flex-direction:row;justify-content:center;align-items:center}.right-container-today-highlight-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#fff;width:227px;height:190px;border-radius:10px;justify-content:center;align-items:center;text-align:center;margin:0 8px}.right-container-today-highlight-card-title[_ngcontent-%COMP%]{flex:1;color:#c9c9c9;font-size:14px;font-weight:700;margin-top:20px;align-self:self-start;margin-left:30px}.gauge[_ngcontent-%COMP%]{flex:2;width:70%;max-width:180px;font-size:32px;color:#004033;font-weight:500;margin-top:-10px;margin-bottom:-20px}.gauge_body[_ngcontent-%COMP%]{width:100%;height:0;padding-bottom:50%;background:#f3f3f4;position:relative;border-top-left-radius:100% 200%;border-top-right-radius:100% 200%;overflow:hidden;margin-top:1rem}.gauge_fill[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;width:inherit;height:100%;background:#ffbf5e;transform-origin:center top;transform:rotate(.25turn);transform:.2s ease-out}.gauge_cover[_ngcontent-%COMP%]{width:75%;height:150%;background:#fff;border-radius:50%;position:absolute;top:25%;left:50%;transform:translate(-50%);display:flex;align-items:center;box-sizing:border-box;color:#fff;justify-content:center;padding-bottom:25%}.right-container-today-hightlight-value[_ngcontent-%COMP%]{flex:1;margin-top:-33px;font-size:xx-large;font-weight:700;margin-bottom:10px;z-index:1}.wind-status-value[_ngcontent-%COMP%]{flex:2;font-size:40px;text-align:center;font-weight:700}.wind-status-value[_ngcontent-%COMP%]   sub[_ngcontent-%COMP%], .wind-status-value[_ngcontent-%COMP%]   sup[_ngcontent-%COMP%]{font-size:medium}.wind-status-logo[_ngcontent-%COMP%]{flex:1;margin-left:30px;align-self:center}.wind-status-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:60px}.sunrise-sunset-value[_ngcontent-%COMP%]{flex:3;display:flex;flex-direction:column}.sunrise[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row}.sunrise-img[_ngcontent-%COMP%]{flex:1}.sunrise-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:50px}.sunrise-time[_ngcontent-%COMP%]{flex:4;align-self:center;font-weight:700;font-size:medium}.sunset[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row}.sunset-img[_ngcontent-%COMP%]{flex:1}.sunset-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:50px}.sunset-time[_ngcontent-%COMP%]{flex:4;align-self:center;font-weight:700;font-size:medium}.humidity-summary[_ngcontent-%COMP%]{font-size:small;font-weight:500;margin-bottom:40px}",
      ],
    }));
  let e = t;
  return e;
})();
var C7 = (() => {
  let t = class t {};
  (t.ɵfac = function (c) {
    return new (c || t)();
  }),
    (t.ɵcmp = L2({
      type: t,
      selectors: [["app-skeleton-loader"]],
      standalone: !0,
      features: [D2],
      decls: 5,
      vars: 0,
      consts: [
        [1, "loader-text"],
        [1, "loader-image"],
        ["src", "assets/loading.gif", "alt", "Loading animation"],
      ],
      template: function (c, i) {
        c & 1 &&
          (v(0, "div", 0)(1, "p"),
          A(2, "Loading please wait"),
          z()(),
          v(3, "div", 1),
          G(4, "img", 2),
          z());
      },
      styles: [
        ".loader-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;width:100vw;background-color:#fffc;position:fixed;top:0;left:0;z-index:9999}.loader[_ngcontent-%COMP%]{text-align:center;padding:20px;border-radius:10px;background:#fff;box-shadow:0 0 15px #0000001a}.loader-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.5em;font-weight:700;color:#333;margin-bottom:20px;text-align:center}.loader-image[_ngcontent-%COMP%]{margin-top:1rem;display:flex;justify-content:center;align-items:center}.loader-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px}@keyframes _ngcontent-%COMP%_pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}to{transform:scale(1)}}.loader[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 1.5s infinite ease-in-out}",
      ],
    }));
  let e = t;
  return e;
})();
function zv(e, t) {
  e & 1 && (v(0, "div", 2), G(1, "app-skeleton-loader", 3), z());
}
function Vv(e, t) {
  e & 1 &&
    (v(0, "div", 4)(1, "div", 5)(2, "div", 6),
    G(3, "app-left-container"),
    z(),
    v(4, "div", 7),
    G(5, "app-right-container"),
    z()()());
}
var y7 = (() => {
  let t = class t {
    constructor(n) {
      (this.weatherService = n),
        (this.title = "SersmickWeatherApp"),
        this.weatherService.isloading$.subscribe((c) => {
          this.isloading = c;
        });
    }
  };
  (t.ɵfac = function (c) {
    return new (c || t)(a2(v3));
  }),
    (t.ɵcmp = L2({
      type: t,
      selectors: [["app-root"]],
      standalone: !0,
      features: [D2],
      decls: 3,
      vars: 2,
      consts: [
        ["weatherContent", ""],
        ["class", "loader-container", 4, "ngIf", "ngIfElse"],
        [1, "loader-container"],
        [1, "loader"],
        [1, "app-container"],
        [1, "weather-container"],
        [1, "left-container"],
        [1, "right-container"],
      ],
      template: function (c, i) {
        if (
          (c & 1 &&
            me(0, zv, 2, 0, "div", 1)(1, Vv, 6, 0, "ng-template", null, 0, Es),
          c & 2)
        ) {
          let a = j3(2);
          r2("ngIf", i.isloading)("ngIfElse", a);
        }
      },
      dependencies: [v7, M7, C7, f8, ve, Jt],
      styles: [
        "@media only screen and (max-width: 1240px){.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container-today-highlight-title[_ngcontent-%COMP%]{flex:2;margin-top:3px!important;margin-left:36px!important;font-size:18px;font-weight:700;padding-top:-25px}.right-container-today-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-nav-bar[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:space-between;align-items:center;font-size:small;font-weight:700;flex-wrap:wrap;margin-top:10px}.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;margin:30px 0!important}}@media only screen and (max-width: 1216px){body[_ngcontent-%COMP%]{overflow:scroll!important}.app-container[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#fff!important;display:flex;justify-content:center;align-items:center;flex-wrap:wrap}.weather-container[_ngcontent-%COMP%]{display:block!important;background-color:#fff;border-radius:30px;display:flex;flex-direction:row;flex-wrap:wrap}.left-container[_ngcontent-%COMP%]{flex:3;background-color:#f6f6f8;width:100%;display:flex;flex-direction:column;flex-wrap:wrap;padding-bottom:10px;border-top-left-radius:0!important;border-bottom-left-radius:0!important}.left-container-other-details[_ngcontent-%COMP%]{flex:5!important;display:flex;flex-direction:column;justify-content:center;align-items:center}.right-container[_ngcontent-%COMP%]{flex:7;background-color:#f6f6f8;width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;border-bottom-right-radius:0!important;align-items:center}.right-container-data-box[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:column;margin:10px;flex-wrap:wrap}.right-container-week-cards[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.cards[_ngcontent-%COMP%]{width:95px;height:120px;text-align:center;justify-content:center;align-items:center;border-radius:10px;background-color:#fff;font-size:small;font-weight:500;margin-right:8px;margin-bottom:5px;font-weight:700}.right-container-today-highlight[_ngcontent-%COMP%]{flex:6;display:flex;flex-direction:column;flex-wrap:wrap}.right-container-today-highlight-cards[_ngcontent-%COMP%]{display:flex;flex:10;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}.right-container-today-highlight-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#fff;width:227px;height:190px;border-radius:10px;justify-content:center;align-items:center;text-align:center;margin:5px 8px!important}}@media only screen and (max-width: 1216px) and (max-width: 514px){.left-container-nav-bar[_ngcontent-%COMP%]{flex:2;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap}}.app-container[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#d6d7da;display:flex;justify-content:center;align-items:center}.weather-container[_ngcontent-%COMP%]{height:85vh;width:65vw;background-color:#fff;border-radius:30px;display:flex;flex-direction:row}.left-container[_ngcontent-%COMP%]{flex:3;background-color:#f6f6f8;border-top-left-radius:30px;border-bottom-left-radius:30px}.right-container[_ngcontent-%COMP%]{flex:7;background-color:#f6f6f8;border-top-right-radius:30px;border-bottom-right-radius:30px}.loader-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}",
      ],
    }));
  let e = t;
  return e;
})();
M8(y7, i5).catch((e) => console.error(e));
