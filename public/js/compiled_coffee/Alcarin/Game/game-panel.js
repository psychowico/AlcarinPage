'use strict';namespace('Alcarin.Game', function(exports, Alcarin) {
  var socket_port;

  socket_port = 8080;
  angular.module('game-panel', ['@game-events', '@spin', 'ui.event', 'ngCookies']);
  exports.App = ngcontroller([
    '$timeout', '$location', function($timeout, $location) {
      var authorize, onGameEvent, reinitalize_socket_connection,
        _this = this;

      this.initialized = false;
      this.charid = null;
      onGameEvent = function() {
        return console.log('event?');
      };
      authorize = function() {
        return _this.socket.emit('auth', {
          charid: _this.charid
        });
      };
      reinitalize_socket_connection = function() {
        var socket, x;

        if (typeof io !== "undefined" && io !== null) {
          _this.socket = socket = io.connect($location.host() + (":" + socket_port));
          socket.on('game-event', _this.onGameEvent);
          socket.on('reconnect', function(_socket) {
            return authorize();
          });
          authorize();
          x = function() {
            return _this.socket.disconnect();
          };
          return $timeout(x, 5000);
        }
      };
      return this.$watch('charid', function() {
        var host;

        if (_this.charid != null) {
          if (!_this.initialized) {
            host = $location.host();
            return $.getScript("http://" + host + ":" + socket_port + "/socket.io/socket.io.js", function() {
              return reinitalize_socket_connection();
            });
          } else {
            return reinitalize_socket_connection();
          }
        }
      });
    }
  ]);
  return exports.GameEvents = ngcontroller([
    'Events', function(Events) {
      var translate_events,
        _this = this;

      this.events = null;
      this.talkContent = '';
      this.sending = false;
      this.talkToAll = function() {
        var content;

        _this.sending = true;
        content = _this.talkContent;
        _this.talkContent = '';
        return Events.talk(content).then(function() {
          return _this.sending = false;
        });
      };
      this.onKeyDown = function(event) {
        if (event.keyCode === 13) {
          if (!event.shiftKey) {
            _this.talkToAll();
            return event.preventDefault();
          }
        }
      };
      translate_events = function(events_data) {
        var arg, ev, ind, result, _i, _j, _len, _len1, _ref, _text;

        result = [];
        for (_i = 0, _len = events_data.length; _i < _len; _i++) {
          ev = events_data[_i];
          _text = ev.text;
          if (_text.length === 0) {
            continue;
          }
          _ref = ev.args;
          for (ind = _j = 0, _len1 = _ref.length; _j < _len1; ind = ++_j) {
            arg = _ref[ind];
            _text = _text.replace("%" + ind, arg);
          }
          result.push({
            text: _text,
            time: ev.time
          });
        }
        return result;
      };
      return Events.fetch().then(function(response) {
        return _this.events = translate_events(response.data);
      });
    }
  ]);
});

/*
//@ sourceMappingURL=game-panel.js.map
*/
