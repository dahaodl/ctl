var abp = abp || {};
(function ($) {
    if (!sweetAlert || !$) {
        return;
    }

    /* DEFAULTS *************************************************/

    abp.libs = abp.libs || {};
    abp.libs.sweetAlert = {
        config: {
            'default': {

            },
            info: {
                icon: 'info'
            },
            success: {
                icon: 'success'
            },
            warn: {
                icon: 'warning'
            },
            error: {
                icon: 'error'
            },
            confirm: {
                icon: 'warning',
                title: 'Are you sure?',
                buttons: ['Không', 'Có']
            }
        }
    };

    /* MESSAGE **************************************************/

    var showMessage = function (type, message, title,btnText) {
        if (!title) {
            title = message;
            message = undefined;
        }

        var opts = $.extend(
            {},
            abp.libs.sweetAlert.config['default'],
            abp.libs.sweetAlert.config[type],
            {
                title: title,
                text: message,                
            },
        );

        if (btnText) {
            opts.buttons = btnText;
        }
        return $.Deferred(function ($dfd) {
            sweetAlert(opts).then(function () {
                $dfd.resolve();
            });
        });
    };

    abp.message.info = function (message, title, btnText) {
        return showMessage('info', message, title, btnText);
    };

    abp.message.success = function (message, title, btnText) {
        return showMessage('success', message, title, btnText);
    };

    abp.message.warn = function (message, title, btnText) {
        return showMessage('warn', message, title, btnText);
    };

    abp.message.error = function (message, title, btnText) {
        return showMessage('error', message, title, btnText);
    };

    abp.message.confirm = function (messageOrOption, titleOrCallback, callback) {
        var userOpts = {
            text: "",
            title: "",
            showCloseButton: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
            focusConfirm: false,
            buttons: [app.localize('No'), app.localize('Yes')]
        };

        if (typeof messageOrOption === 'object' && !Array.isArray(messageOrOption) && messageOrOption !== null) {
            
            if (messageOrOption.message) {
                userOpts.text = messageOrOption.message;
            }
            if (messageOrOption.title) {
                userOpts.title = messageOrOption.title;
            }
            if (messageOrOption.cancelButtonText) {
                userOpts.buttons[0] = messageOrOption.cancelButtonText;
            }
            if (messageOrOption.confirmButtonText) {
                userOpts.buttons[1] = messageOrOption.confirmButtonText;
            }
            if (messageOrOption.focusConfirm) {
                userOpts.focusConfirm = messageOrOption.focusConfirm;
            }

        }
        else if (typeof messageOrOption === 'string') {
            userOpts.text = messageOrOption;
        }

        if ($.isFunction(titleOrCallback)) {
            callback = titleOrCallback;
        } else if (titleOrCallback) {
            userOpts.title = titleOrCallback;
        };
        var opts = $.extend(
            {},
            abp.libs.sweetAlert.config['default'],
            abp.libs.sweetAlert.config.confirm,
            userOpts
        );
        return $.Deferred(function ($dfd) {
            sweetAlert(opts).then(function (isConfirmed) {
                callback && callback(isConfirmed);
                $dfd.resolve(isConfirmed);
            });
            setTimeout(function () {
                if (userOpts.focusConfirm) {
                    $(".swal-button.swal-button--confirm").focus();
                }
                else {
                    $(".swal-button.swal-button--cancel").focus();
                }
            }, 30);
        });
       
       
        
        
    };

    abp.event.on('abp.dynamicScriptsInitialized', function () {
        abp.libs.sweetAlert.config.confirm.title = abp.localization.abpWeb('AreYouSure');
        abp.libs.sweetAlert.config.confirm.buttons = [abp.localization.abpWeb('No'), abp.localization.abpWeb('Yes')];
    });

})(jQuery);