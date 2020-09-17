// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/validator.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ========================================================================
 * Bootstrap (plugin): validator.js v0.11.8
 * ========================================================================
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Cina Saffary.
 * Made by @1000hz in the style of Bootstrap 3 era @fat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ======================================================================== */
+function (t) {
  "use strict";

  function e(e) {
    return e.is('[type="checkbox"]') ? e.prop("checked") : e.is('[type="radio"]') ? !!t('[name="' + e.attr("name") + '"]:checked').length : e.is("select[multiple]") ? (e.val() || []).length : e.val();
  }

  function r(e) {
    return this.each(function () {
      var r = t(this),
          i = t.extend({}, a.DEFAULTS, r.data(), "object" == _typeof(e) && e),
          o = r.data("bs.validator");
      (o || "destroy" != e) && (o || r.data("bs.validator", o = new a(this, i)), "string" == typeof e && o[e]());
    });
  }

  var a = function a(r, i) {
    this.options = i, this.validators = t.extend({}, a.VALIDATORS, i.custom), this.$element = t(r), this.$btn = t('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), this.update(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", t.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", t.proxy(this.onSubmit, this)), this.$element.on("reset.bs.validator", t.proxy(this.reset, this)), this.$element.find("[data-match]").each(function () {
      var r = t(this),
          a = r.data("match");
      t(a).on("input.bs.validator", function (t) {
        e(r) && r.trigger("input.bs.validator");
      });
    }), this.$inputs.filter(function () {
      return e(t(this)) && !t(this).closest(".has-error").length;
    }).trigger("focusout"), this.$element.attr("novalidate", !0);
  };

  a.VERSION = "0.11.8", a.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)', a.FOCUS_OFFSET = 20, a.DEFAULTS = {
    delay: 500,
    html: !1,
    disable: !0,
    focus: !0,
    custom: {},
    errors: {
      match: "Does not match",
      minlength: "Not long enough"
    },
    feedback: {
      success: "glyphicon-ok",
      error: "glyphicon-remove"
    }
  }, a.VALIDATORS = {
    "native": function native(t) {
      var e = t[0];
      return e.checkValidity ? !e.checkValidity() && !e.validity.valid && (e.validationMessage || "error!") : void 0;
    },
    match: function match(e) {
      var r = e.data("match");
      return e.val() !== t(r).val() && a.DEFAULTS.errors.match;
    },
    minlength: function minlength(t) {
      var e = t.data("minlength");
      return t.val().length < e && a.DEFAULTS.errors.minlength;
    }
  }, a.prototype.update = function () {
    var e = this;
    return this.$inputs = this.$element.find(a.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function () {
      e.clearErrors(t(this));
    })), this.toggleSubmit(), this;
  }, a.prototype.onInput = function (e) {
    var r = this,
        a = t(e.target),
        i = "focusout" !== e.type;
    this.$inputs.is(a) && this.validateInput(a, i).done(function () {
      r.toggleSubmit();
    });
  }, a.prototype.validateInput = function (r, a) {
    var i = (e(r), r.data("bs.validator.errors"));
    r.is('[type="radio"]') && (r = this.$element.find('input[name="' + r.attr("name") + '"]'));
    var o = t.Event("validate.bs.validator", {
      relatedTarget: r[0]
    });

    if (this.$element.trigger(o), !o.isDefaultPrevented()) {
      var s = this;
      return this.runValidators(r).done(function (e) {
        r.data("bs.validator.errors", e), e.length ? a ? s.defer(r, s.showErrors) : s.showErrors(r) : s.clearErrors(r), i && e.toString() === i.toString() || (o = e.length ? t.Event("invalid.bs.validator", {
          relatedTarget: r[0],
          detail: e
        }) : t.Event("valid.bs.validator", {
          relatedTarget: r[0],
          detail: i
        }), s.$element.trigger(o)), s.toggleSubmit(), s.$element.trigger(t.Event("validated.bs.validator", {
          relatedTarget: r[0]
        }));
      });
    }
  }, a.prototype.runValidators = function (r) {
    function a(t) {
      return r.data(t + "-error");
    }

    function i() {
      var t = r[0].validity;
      return t.typeMismatch ? r.data("type-error") : t.patternMismatch ? r.data("pattern-error") : t.stepMismatch ? r.data("step-error") : t.rangeOverflow ? r.data("max-error") : t.rangeUnderflow ? r.data("min-error") : t.valueMissing ? r.data("required-error") : null;
    }

    function o() {
      return r.data("error");
    }

    function s(t) {
      return a(t) || i() || o();
    }

    var n = [],
        l = t.Deferred();
    return r.data("bs.validator.deferred") && r.data("bs.validator.deferred").reject(), r.data("bs.validator.deferred", l), t.each(this.validators, t.proxy(function (t, a) {
      var i = null;
      (e(r) || r.attr("required")) && (r.data(t) || "native" == t) && (i = a.call(this, r)) && (i = s(t) || i, !~n.indexOf(i) && n.push(i));
    }, this)), !n.length && e(r) && r.data("remote") ? this.defer(r, function () {
      var a = {};
      a[r.attr("name")] = e(r), t.get(r.data("remote"), a).fail(function (t, e, r) {
        n.push(s("remote") || r);
      }).always(function () {
        l.resolve(n);
      });
    }) : l.resolve(n), l.promise();
  }, a.prototype.validate = function () {
    var e = this;
    return t.when(this.$inputs.map(function (r) {
      return e.validateInput(t(this), !1);
    })).then(function () {
      e.toggleSubmit(), e.focusError();
    }), this;
  }, a.prototype.focusError = function () {
    if (this.options.focus) {
      var e = this.$element.find(".has-error:first :input");
      0 !== e.length && (t("html, body").animate({
        scrollTop: e.offset().top - a.FOCUS_OFFSET
      }, 250), e.focus());
    }
  }, a.prototype.showErrors = function (e) {
    var r = this.options.html ? "html" : "text",
        a = e.data("bs.validator.errors"),
        i = e.closest(".form-group"),
        o = i.find(".help-block.with-errors"),
        s = i.find(".form-control-feedback");
    a.length && (a = t("<ul/>").addClass("list-unstyled").append(t.map(a, function (e) {
      return t("<li/>")[r](e);
    })), void 0 === o.data("bs.validator.originalContent") && o.data("bs.validator.originalContent", o.html()), o.empty().append(a), i.addClass("has-error has-danger"), i.hasClass("has-feedback") && s.removeClass(this.options.feedback.success) && s.addClass(this.options.feedback.error) && i.removeClass("has-success"));
  }, a.prototype.clearErrors = function (t) {
    var r = t.closest(".form-group"),
        a = r.find(".help-block.with-errors"),
        i = r.find(".form-control-feedback");
    a.html(a.data("bs.validator.originalContent")), r.removeClass("has-error has-danger has-success"), r.hasClass("has-feedback") && i.removeClass(this.options.feedback.error) && i.removeClass(this.options.feedback.success) && e(t) && i.addClass(this.options.feedback.success) && r.addClass("has-success");
  }, a.prototype.hasErrors = function () {
    function e() {
      return !!(t(this).data("bs.validator.errors") || []).length;
    }

    return !!this.$inputs.filter(e).length;
  }, a.prototype.isIncomplete = function () {
    function r() {
      var r = e(t(this));
      return !("string" == typeof r ? t.trim(r) : r);
    }

    return !!this.$inputs.filter("[required]").filter(r).length;
  }, a.prototype.onSubmit = function (t) {
    this.validate(), (this.isIncomplete() || this.hasErrors()) && t.preventDefault();
  }, a.prototype.toggleSubmit = function () {
    this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
  }, a.prototype.defer = function (e, r) {
    return r = t.proxy(r, this, e), this.options.delay ? (window.clearTimeout(e.data("bs.validator.timeout")), void e.data("bs.validator.timeout", window.setTimeout(r, this.options.delay))) : r();
  }, a.prototype.reset = function () {
    return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success), this.$inputs.removeData(["bs.validator.errors", "bs.validator.deferred"]).each(function () {
      var e = t(this),
          r = e.data("bs.validator.timeout");
      window.clearTimeout(r) && e.removeData("bs.validator.timeout");
    }), this.$element.find(".help-block.with-errors").each(function () {
      var e = t(this),
          r = e.data("bs.validator.originalContent");
      e.removeData("bs.validator.originalContent").html(r);
    }), this.$btn.removeClass("disabled"), this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"), this;
  }, a.prototype.destroy = function () {
    return this.reset(), this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"), this.$inputs.off(".bs.validator"), this.options = null, this.validators = null, this.$element = null, this.$btn = null, this.$inputs = null, this;
  };
  var i = t.fn.validator;
  t.fn.validator = r, t.fn.validator.Constructor = a, t.fn.validator.noConflict = function () {
    return t.fn.validator = i, this;
  }, t(window).on("load", function () {
    t('form[data-toggle="validator"]').each(function () {
      var e = t(this);
      r.call(e, e.data());
    });
  });
}(jQuery);
},{}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33559" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/validator.min.js"], null)
//# sourceMappingURL=/validator.min.b26c738a.js.map