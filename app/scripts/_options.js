'use strict';

var $ = require('jquery');

function initMenu() {
    $('.menu a').click(function(ev) {
    ev.preventDefault();
    var selected = 'selected';

    $('.mainview > *').removeClass(selected);
    $('.menu li').removeClass(selected);
    setTimeout(function() {
     $('.mainview > *:not(.selected)').css('display', 'none');
    }, 100);

    $(ev.currentTarget).parent().addClass(selected);
    var currentView = $($(ev.currentTarget).attr('href'));
    currentView.css('display', 'block');
    setTimeout(function() {
     currentView.addClass(selected);
    }, 0);

    setTimeout(function() {
     $('body')[0].scrollTop = 0;
    }, 200);
    });
}

function setStaticContent() {
    $('#version-container').html('Version ' +require('../manifest.json').version);
}

function initSettingStorage () {
    var storage = chrome.storage.sync;
    var $enableUpdateNotification = $('#enable_update_notification')

    function loadSettings() {
        storage.get('enableUpdateNotification', function(val) {
            $enableUpdateNotification.prop('checked', (typeof val.enableUpdateNotification === 'undefined') ? true : val.enableUpdateNotification);
        });
    }

    function saveSettings() {
        storage.set({
            enableUpdateNotification: $enableUpdateNotification.is(':checked'),
        });
    }

    $enableUpdateNotification.on('change', saveSettings);
    loadSettings();
}

$(function() {
    initMenu();
    initSettingStorage();
    setStaticContent();
});
