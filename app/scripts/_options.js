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
    var $showUpdateNotification = $('#show_update_notification')

    function loadSettings() {
        storage.get('showUpdateNotification', function(val) {
            $showUpdateNotification.prop('checked', (typeof val.showUpdateNotification === 'undefined') ? true : val.showUpdateNotification);
        });
    }

    function saveSettings() {
        storage.set({
            showUpdateNotification: $showUpdateNotification.is(':checked'),
        });
    }

    $showUpdateNotification.on('change', saveSettings);
    loadSettings();
}

$(function() {
    initMenu();
    initSettingStorage();
    setStaticContent();
});
