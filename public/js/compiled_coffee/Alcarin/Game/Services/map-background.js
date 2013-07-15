'use strict';
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

namespace('Alcarin.Game.Services', function(exports, Alcarin) {
  var Units;

  Units = (function() {
    function Units(parent) {
      this.parent = parent;
      this.toUnits = __bind(this.toUnits, this);
      this.toPixels = __bind(this.toPixels, this);
    }

    Units.prototype.center = function() {
      return this.toPixels(this.parent.center.x, this.parent.center.y);
    };

    Units.prototype.toPixels = function(x, y) {
      var center, offset, pixelRadius, radius;

      center = this.parent.center;
      radius = this.parent.radius;
      pixelRadius = this.parent.pixelRadius;
      offset = {
        x: center.x - radius,
        y: center.y - radius
      };
      return {
        x: Math.round(Math.round(x - offset.x) * pixelRadius / radius),
        y: Math.round(Math.round(y - offset.y) * pixelRadius / radius)
      };
    };

    Units.prototype.toUnits = function(pixelX, pixelY) {
      var center, offset, pixelRadius, radius;

      center = this.parent.center;
      radius = this.parent.radius;
      pixelRadius = this.parent.pixelRadius;
      offset = {
        x: center.x - radius,
        y: center.y - radius
      };
      return {
        x: offset.x + Math.round(x * radius / pixelRadius),
        y: offset.y + Math.round(y * radius / pixelRadius)
      };
    };

    return Units;

  })();
  return exports.module.factory('MapBackground', [
    '$q', function($q) {
      var Background;

      Background = (function(_super) {
        __extends(Background, _super);

        Background.prototype.BackgroundReadyDefer = null;

        function Background() {
          this.onDrawn = __bind(this.onDrawn, this);          this.reset();
        }

        Background.prototype.onDrawn = function() {
          var UnitsConverter;

          UnitsConverter = new Units(this);
          this.BackgroundReadyDefer.resolve(UnitsConverter);
          return this.$emit('drawn', UnitsConverter);
        };

        Background.prototype.init = function(center, info) {
          this.center = center;
          this.radius = info.radius;
          return this.charViewRadius = info.charViewRadius;
        };

        Background.prototype.setPixelRadius = function(pixelRadius) {
          this.pixelRadius = pixelRadius;
        };

        Background.prototype.setFields = function(fields) {
          this.fields = fields;
          return this.$emit('fieldsChanged');
        };

        Background.prototype.reset = function() {
          if (this.BackgroundReadyDefer != null) {
            this.BackgroundReadyDefer.reject();
          }
          return this.BackgroundReadyDefer = $q.defer();
        };

        Background.prototype.then = function(what) {
          return this.BackgroundReadyDefer.promise.then(what);
        };

        return Background;

      })(Alcarin.EventsEmitter);
      return new Background();
    }
  ]);
});

/*
//@ sourceMappingURL=map-background.js.map
*/
