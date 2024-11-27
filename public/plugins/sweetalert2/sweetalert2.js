(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/sweetalert2/src/SweetAlert.js":
/*!****************************************************!*\
  !*** ./node_modules/sweetalert2/src/SweetAlert.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SweetAlert: function() { return /* binding */ SweetAlert; }
/* harmony export */ });
/* harmony import */ var _buttons_handlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons-handlers.js */ "./node_modules/sweetalert2/src/buttons-handlers.js");
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceMethods.js */ "./node_modules/sweetalert2/src/instanceMethods.js");
/* harmony import */ var _keydown_handler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keydown-handler.js */ "./node_modules/sweetalert2/src/keydown-handler.js");
/* harmony import */ var _popup_click_handler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popup-click-handler.js */ "./node_modules/sweetalert2/src/popup-click-handler.js");
/* harmony import */ var _privateMethods_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./privateMethods.js */ "./node_modules/sweetalert2/src/privateMethods.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _staticMethods_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./staticMethods.js */ "./node_modules/sweetalert2/src/staticMethods.js");
/* harmony import */ var _utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/DismissReason.js */ "./node_modules/sweetalert2/src/utils/DismissReason.js");
/* harmony import */ var _utils_Timer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/Timer.js */ "./node_modules/sweetalert2/src/utils/Timer.js");
/* harmony import */ var _utils_aria_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/aria.js */ "./node_modules/sweetalert2/src/utils/aria.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_dom_inputUtils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/dom/inputUtils.js */ "./node_modules/sweetalert2/src/utils/dom/inputUtils.js");
/* harmony import */ var _utils_getTemplateParams_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/getTemplateParams.js */ "./node_modules/sweetalert2/src/utils/getTemplateParams.js");
/* harmony import */ var _utils_openPopup_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/openPopup.js */ "./node_modules/sweetalert2/src/utils/openPopup.js");
/* harmony import */ var _utils_params_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/params.js */ "./node_modules/sweetalert2/src/utils/params.js");
/* harmony import */ var _utils_setParameters_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/setParameters.js */ "./node_modules/sweetalert2/src/utils/setParameters.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");



















/** @type {SweetAlert} */
let currentInstance

class SweetAlert {
  /**
   * @type {Promise<SweetAlertResult>}
   */
  #promise

  /**
   * @param {...any} args
   * @this {SweetAlert}
   */
  constructor(...args) {
    // Prevent run in Node env
    if (typeof window === 'undefined') {
      return
    }

    currentInstance = this

    // @ts-ignore
    const outerParams = Object.freeze(this.constructor.argsToParams(args))

    /** @type {Readonly<SweetAlertOptions>} */
    this.params = outerParams

    /** @type {boolean} */
    this.isAwaitingPromise = false

    this.#promise = this._main(currentInstance.params)
  }

  _main(userParams, mixinParams = {}) {
    (0,_utils_params_js__WEBPACK_IMPORTED_MODULE_15__.showWarningsForParams)(Object.assign({}, mixinParams, userParams))

    if (_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].currentInstance) {
      const swalPromiseResolve = _privateMethods_js__WEBPACK_IMPORTED_MODULE_5__["default"].swalPromiseResolve.get(_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].currentInstance)
      const { isAwaitingPromise } = _globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].currentInstance
      _globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].currentInstance._destroy()
      if (!isAwaitingPromise) {
        swalPromiseResolve({ isDismissed: true })
      }
      if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.isModal()) {
        (0,_utils_aria_js__WEBPACK_IMPORTED_MODULE_10__.unsetAriaHidden)()
      }
    }

    _globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].currentInstance = currentInstance

    const innerParams = prepareParams(userParams, mixinParams)
    ;(0,_utils_setParameters_js__WEBPACK_IMPORTED_MODULE_16__["default"])(innerParams)
    Object.freeze(innerParams)

    // clear the previous timer
    if (_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].timeout) {
      _globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].timeout.stop()
      delete _globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].timeout
    }

    // clear the restore focus timeout
    clearTimeout(_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"].restoreFocusTimeout)

    const domCache = populateDomCache(currentInstance)

    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.render(currentInstance, innerParams)

    _privateProps_js__WEBPACK_IMPORTED_MODULE_6__["default"].innerParams.set(currentInstance, innerParams)

    return swalPromise(currentInstance, domCache, innerParams)
  }

  // `catch` cannot be the name of a module export, so we define our thenable methods here instead
  then(onFulfilled) {
    return this.#promise.then(onFulfilled)
  }

  finally(onFinally) {
    return this.#promise.finally(onFinally)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {DomCache} domCache
 * @param {SweetAlertOptions} innerParams
 * @returns {Promise}
 */
const swalPromise = (instance, domCache, innerParams) => {
  return new Promise((resolve, reject) => {
    // functions to handle all closings/dismissals
    /**
     * @param {DismissReason} dismiss
     */
    const dismissWith = (dismiss) => {
      instance.close({ isDismissed: true, dismiss })
    }

    _privateMethods_js__WEBPACK_IMPORTED_MODULE_5__["default"].swalPromiseResolve.set(instance, resolve)
    _privateMethods_js__WEBPACK_IMPORTED_MODULE_5__["default"].swalPromiseReject.set(instance, reject)

    domCache.confirmButton.onclick = () => {
      ;(0,_buttons_handlers_js__WEBPACK_IMPORTED_MODULE_0__.handleConfirmButtonClick)(instance)
    }

    domCache.denyButton.onclick = () => {
      ;(0,_buttons_handlers_js__WEBPACK_IMPORTED_MODULE_0__.handleDenyButtonClick)(instance)
    }

    domCache.cancelButton.onclick = () => {
      ;(0,_buttons_handlers_js__WEBPACK_IMPORTED_MODULE_0__.handleCancelButtonClick)(instance, dismissWith)
    }

    domCache.closeButton.onclick = () => {
      dismissWith(_utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_8__.DismissReason.close)
    }

    ;(0,_popup_click_handler_js__WEBPACK_IMPORTED_MODULE_4__.handlePopupClick)(innerParams, domCache, dismissWith)

    ;(0,_keydown_handler_js__WEBPACK_IMPORTED_MODULE_3__.addKeydownHandler)(_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"], innerParams, dismissWith)

    ;(0,_utils_dom_inputUtils_js__WEBPACK_IMPORTED_MODULE_12__.handleInputOptionsAndValue)(instance, innerParams)

    ;(0,_utils_openPopup_js__WEBPACK_IMPORTED_MODULE_14__.openPopup)(innerParams)

    setupTimer(_globalState_js__WEBPACK_IMPORTED_MODULE_1__["default"], innerParams, dismissWith)

    initFocus(domCache, innerParams)

    // Scroll container to top on open (#1247, #1946)
    setTimeout(() => {
      domCache.container.scrollTop = 0
    })
  })
}

/**
 * @param {SweetAlertOptions} userParams
 * @param {SweetAlertOptions} mixinParams
 * @returns {SweetAlertOptions}
 */
const prepareParams = (userParams, mixinParams) => {
  const templateParams = (0,_utils_getTemplateParams_js__WEBPACK_IMPORTED_MODULE_13__.getTemplateParams)(userParams)
  const params = Object.assign({}, _utils_params_js__WEBPACK_IMPORTED_MODULE_15__["default"], mixinParams, templateParams, userParams) // precedence is described in #2131
  params.showClass = Object.assign({}, _utils_params_js__WEBPACK_IMPORTED_MODULE_15__["default"].showClass, params.showClass)
  params.hideClass = Object.assign({}, _utils_params_js__WEBPACK_IMPORTED_MODULE_15__["default"].hideClass, params.hideClass)
  if (params.animation === false) {
    params.showClass = {
      backdrop: 'swal2-noanimation',
    }
    params.hideClass = {}
  }
  return params
}

/**
 * @param {SweetAlert} instance
 * @returns {DomCache}
 */
const populateDomCache = (instance) => {
  const domCache = {
    popup: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getPopup(),
    container: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getContainer(),
    actions: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getActions(),
    confirmButton: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getConfirmButton(),
    denyButton: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getDenyButton(),
    cancelButton: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getCancelButton(),
    loader: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getLoader(),
    closeButton: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getCloseButton(),
    validationMessage: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getValidationMessage(),
    progressSteps: _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getProgressSteps(),
  }
  _privateProps_js__WEBPACK_IMPORTED_MODULE_6__["default"].domCache.set(instance, domCache)

  return domCache
}

/**
 * @param {GlobalState} globalState
 * @param {SweetAlertOptions} innerParams
 * @param {Function} dismissWith
 */
const setupTimer = (globalState, innerParams, dismissWith) => {
  const timerProgressBar = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.getTimerProgressBar()
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.hide(timerProgressBar)
  if (innerParams.timer) {
    globalState.timeout = new _utils_Timer_js__WEBPACK_IMPORTED_MODULE_9__["default"](() => {
      dismissWith('timer')
      delete globalState.timeout
    }, innerParams.timer)
    if (innerParams.timerProgressBar) {
      _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.show(timerProgressBar)
      _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar')
      setTimeout(() => {
        if (globalState.timeout && globalState.timeout.running) {
          // timer can be already stopped or unset at this point
          _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.animateTimerProgressBar(innerParams.timer)
        }
      })
    }
  }
}

/**
 * Initialize focus in the popup:
 *
 * 1. If `toast` is `true`, don't steal focus from the document.
 * 2. Else if there is an [autofocus] element, focus it.
 * 3. Else if `focusConfirm` is `true` and confirm button is visible, focus it.
 * 4. Else if `focusDeny` is `true` and deny button is visible, focus it.
 * 5. Else if `focusCancel` is `true` and cancel button is visible, focus it.
 * 6. Else focus the first focusable element in a popup (if any).
 *
 * @param {DomCache} domCache
 * @param {SweetAlertOptions} innerParams
 */
const initFocus = (domCache, innerParams) => {
  if (innerParams.toast) {
    return
  }
  // TODO: this is dumb, remove `allowEnterKey` param in the next major version
  if (!(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_17__.callIfFunction)(innerParams.allowEnterKey)) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_17__.warnAboutDeprecation)('allowEnterKey')
    blurActiveElement()
    return
  }

  if (focusAutofocus(domCache)) {
    return
  }

  if (focusButton(domCache, innerParams)) {
    return
  }

  (0,_keydown_handler_js__WEBPACK_IMPORTED_MODULE_3__.setFocus)(-1, 1)
}

/**
 * @param {DomCache} domCache
 * @returns {boolean}
 */
const focusAutofocus = (domCache) => {
  const autofocusElements = domCache.popup.querySelectorAll('[autofocus]')
  for (const autofocusElement of autofocusElements) {
    if (autofocusElement instanceof HTMLElement && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.isVisible(autofocusElement)) {
      autofocusElement.focus()
      return true
    }
  }
  return false
}

/**
 * @param {DomCache} domCache
 * @param {SweetAlertOptions} innerParams
 * @returns {boolean}
 */
const focusButton = (domCache, innerParams) => {
  if (innerParams.focusDeny && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.isVisible(domCache.denyButton)) {
    domCache.denyButton.focus()
    return true
  }

  if (innerParams.focusCancel && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.isVisible(domCache.cancelButton)) {
    domCache.cancelButton.focus()
    return true
  }

  if (innerParams.focusConfirm && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_11__.isVisible(domCache.confirmButton)) {
    domCache.confirmButton.focus()
    return true
  }

  return false
}

const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur()
  }
}

// Dear russian users visiting russian sites. Let's have fun.
if (
  typeof window !== 'undefined' &&
  /^ru\b/.test(navigator.language) &&
  location.host.match(/\.(ru|su|by|xn--p1ai)$/)
) {
  const now = new Date()
  const initiationDate = localStorage.getItem('swal-initiation')
  if (!initiationDate) {
    localStorage.setItem('swal-initiation', `${now}`)
  } else if ((now.getTime() - Date.parse(initiationDate)) / (1000 * 60 * 60 * 24) > 3) {
    setTimeout(() => {
      document.body.style.pointerEvents = 'none'
      const ukrainianAnthem = document.createElement('audio')
      ukrainianAnthem.src = 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3'
      ukrainianAnthem.loop = true
      document.body.appendChild(ukrainianAnthem)
      setTimeout(() => {
        ukrainianAnthem.play().catch(() => {
          // ignore
        })
      }, 2500)
    }, 500)
  }
}

// Assign instance methods from src/instanceMethods/*.js to prototype
SweetAlert.prototype.disableButtons = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.disableButtons
SweetAlert.prototype.enableButtons = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.enableButtons
SweetAlert.prototype.getInput = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.getInput
SweetAlert.prototype.disableInput = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.disableInput
SweetAlert.prototype.enableInput = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.enableInput
SweetAlert.prototype.hideLoading = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.hideLoading
SweetAlert.prototype.disableLoading = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.disableLoading
SweetAlert.prototype.showValidationMessage = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.showValidationMessage
SweetAlert.prototype.resetValidationMessage = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.resetValidationMessage
SweetAlert.prototype.close = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.close
SweetAlert.prototype.closePopup = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.closePopup
SweetAlert.prototype.closeModal = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.closeModal
SweetAlert.prototype.closeToast = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.closeToast
SweetAlert.prototype.rejectPromise = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.rejectPromise
SweetAlert.prototype.update = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__.update
SweetAlert.prototype._destroy = _instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__._destroy

// Assign static methods from src/staticMethods/*.js to constructor
Object.assign(SweetAlert, _staticMethods_js__WEBPACK_IMPORTED_MODULE_7__)

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(_instanceMethods_js__WEBPACK_IMPORTED_MODULE_2__).forEach((key) => {
  /**
   * @param {...any} args
   * @returns {any | undefined}
   */
  SweetAlert[key] = function (...args) {
    if (currentInstance && currentInstance[key]) {
      return currentInstance[key](...args)
    }
    return null
  }
})

SweetAlert.DismissReason = _utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_8__.DismissReason

SweetAlert.version = '11.14.1'

/* harmony default export */ __webpack_exports__["default"] = (SweetAlert);


/***/ }),

/***/ "./node_modules/sweetalert2/src/buttons-handlers.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/src/buttons-handlers.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleCancelButtonClick: function() { return /* binding */ handleCancelButtonClick; },
/* harmony export */   handleConfirmButtonClick: function() { return /* binding */ handleConfirmButtonClick; },
/* harmony export */   handleDenyButtonClick: function() { return /* binding */ handleDenyButtonClick; }
/* harmony export */ });
/* harmony import */ var _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceMethods/close.js */ "./node_modules/sweetalert2/src/instanceMethods/close.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staticMethods/showLoading.js */ "./node_modules/sweetalert2/src/staticMethods/showLoading.js");
/* harmony import */ var _utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/DismissReason.js */ "./node_modules/sweetalert2/src/utils/DismissReason.js");
/* harmony import */ var _utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom/domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");
/* harmony import */ var _utils_dom_getters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dom/getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");
/* harmony import */ var _utils_dom_inputUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/dom/inputUtils.js */ "./node_modules/sweetalert2/src/utils/dom/inputUtils.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");









/**
 * @param {SweetAlert} instance
 */
const handleConfirmButtonClick = (instance) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance)
  instance.disableButtons()
  if (innerParams.input) {
    handleConfirmOrDenyWithInput(instance, 'confirm')
  } else {
    confirm(instance, true)
  }
}

/**
 * @param {SweetAlert} instance
 */
const handleDenyButtonClick = (instance) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance)
  instance.disableButtons()
  if (innerParams.returnInputValueOnDeny) {
    handleConfirmOrDenyWithInput(instance, 'deny')
  } else {
    deny(instance, false)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {Function} dismissWith
 */
const handleCancelButtonClick = (instance, dismissWith) => {
  instance.disableButtons()
  dismissWith(_utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_3__.DismissReason.cancel)
}

/**
 * @param {SweetAlert} instance
 * @param {'confirm' | 'deny'} type
 */
const handleConfirmOrDenyWithInput = (instance, type) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance)
  if (!innerParams.input) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__.error)(`The "input" parameter is needed to be set when using returnInputValueOn${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__.capitalizeFirstLetter)(type)}`)
    return
  }
  const input = instance.getInput()
  const inputValue = (0,_utils_dom_inputUtils_js__WEBPACK_IMPORTED_MODULE_6__.getInputValue)(instance, innerParams)
  if (innerParams.inputValidator) {
    handleInputValidator(instance, inputValue, type)
  } else if (input && !input.checkValidity()) {
    instance.enableButtons()
    instance.showValidationMessage(innerParams.validationMessage || input.validationMessage)
  } else if (type === 'deny') {
    deny(instance, inputValue)
  } else {
    confirm(instance, inputValue)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertInputValue} inputValue
 * @param {'confirm' | 'deny'} type
 */
const handleInputValidator = (instance, inputValue, type) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance)
  instance.disableInput()
  const validationPromise = Promise.resolve().then(() =>
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__.asPromise)(innerParams.inputValidator(inputValue, innerParams.validationMessage))
  )
  validationPromise.then((validationMessage) => {
    instance.enableButtons()
    instance.enableInput()
    if (validationMessage) {
      instance.showValidationMessage(validationMessage)
    } else if (type === 'deny') {
      deny(instance, inputValue)
    } else {
      confirm(instance, inputValue)
    }
  })
}

/**
 * @param {SweetAlert} instance
 * @param {any} value
 */
const deny = (instance, value) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance || undefined)

  if (innerParams.showLoaderOnDeny) {
    (0,_staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_2__.showLoading)((0,_utils_dom_getters_js__WEBPACK_IMPORTED_MODULE_5__.getDenyButton)())
  }

  if (innerParams.preDeny) {
    instance.isAwaitingPromise = true // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
    const preDenyPromise = Promise.resolve().then(() =>
      (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__.asPromise)(innerParams.preDeny(value, innerParams.validationMessage))
    )
    preDenyPromise
      .then((preDenyValue) => {
        if (preDenyValue === false) {
          instance.hideLoading()
          ;(0,_instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_0__.handleAwaitingPromise)(instance)
        } else {
          instance.close({ isDenied: true, value: typeof preDenyValue === 'undefined' ? value : preDenyValue })
        }
      })
      .catch((error) => rejectWith(instance || undefined, error))
  } else {
    instance.close({ isDenied: true, value })
  }
}

/**
 * @param {SweetAlert} instance
 * @param {any} value
 */
const succeedWith = (instance, value) => {
  instance.close({ isConfirmed: true, value })
}

/**
 *
 * @param {SweetAlert} instance
 * @param {string} error
 */
const rejectWith = (instance, error) => {
  instance.rejectPromise(error)
}

/**
 *
 * @param {SweetAlert} instance
 * @param {any} value
 */
const confirm = (instance, value) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].innerParams.get(instance || undefined)

  if (innerParams.showLoaderOnConfirm) {
    (0,_staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_2__.showLoading)()
  }

  if (innerParams.preConfirm) {
    instance.resetValidationMessage()
    instance.isAwaitingPromise = true // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
    const preConfirmPromise = Promise.resolve().then(() =>
      (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__.asPromise)(innerParams.preConfirm(value, innerParams.validationMessage))
    )
    preConfirmPromise
      .then((preConfirmValue) => {
        if ((0,_utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.isVisible)((0,_utils_dom_getters_js__WEBPACK_IMPORTED_MODULE_5__.getValidationMessage)()) || preConfirmValue === false) {
          instance.hideLoading()
          ;(0,_instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_0__.handleAwaitingPromise)(instance)
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue)
        }
      })
      .catch((error) => rejectWith(instance || undefined, error))
  } else {
    succeedWith(instance, value)
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/constants.js":
/*!***************************************************!*\
  !*** ./node_modules/sweetalert2/src/constants.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RESTORE_FOCUS_TIMEOUT: function() { return /* binding */ RESTORE_FOCUS_TIMEOUT; }
/* harmony export */ });
const RESTORE_FOCUS_TIMEOUT = 100


/***/ }),

/***/ "./node_modules/sweetalert2/src/globalState.js":
/*!*****************************************************!*\
  !*** ./node_modules/sweetalert2/src/globalState.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   restoreActiveElement: function() { return /* binding */ restoreActiveElement; }
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/sweetalert2/src/constants.js");


/** @type {GlobalState} */
const globalState = {}

/* harmony default export */ __webpack_exports__["default"] = (globalState);

const focusPreviousActiveElement = () => {
  if (globalState.previousActiveElement instanceof HTMLElement) {
    globalState.previousActiveElement.focus()
    globalState.previousActiveElement = null
  } else if (document.body) {
    document.body.focus()
  }
}

/**
 * Restore previous active (focused) element
 *
 * @param {boolean} returnFocus
 * @returns {Promise<void>}
 */
const restoreActiveElement = (returnFocus) => {
  return new Promise((resolve) => {
    if (!returnFocus) {
      return resolve()
    }
    const x = window.scrollX
    const y = window.scrollY

    globalState.restoreFocusTimeout = setTimeout(() => {
      focusPreviousActiveElement()
      resolve()
    }, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESTORE_FOCUS_TIMEOUT) // issues/900

    window.scrollTo(x, y)
  })
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _destroy: function() { return /* reexport safe */ _instanceMethods_destroy_js__WEBPACK_IMPORTED_MODULE_6__._destroy; },
/* harmony export */   close: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.close; },
/* harmony export */   closeModal: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.closeModal; },
/* harmony export */   closePopup: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.closePopup; },
/* harmony export */   closeToast: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.closeToast; },
/* harmony export */   disableButtons: function() { return /* reexport safe */ _instanceMethods_enable_disable_elements_js__WEBPACK_IMPORTED_MODULE_3__.disableButtons; },
/* harmony export */   disableInput: function() { return /* reexport safe */ _instanceMethods_enable_disable_elements_js__WEBPACK_IMPORTED_MODULE_3__.disableInput; },
/* harmony export */   disableLoading: function() { return /* reexport safe */ _instanceMethods_hideLoading_js__WEBPACK_IMPORTED_MODULE_0__.disableLoading; },
/* harmony export */   enableButtons: function() { return /* reexport safe */ _instanceMethods_enable_disable_elements_js__WEBPACK_IMPORTED_MODULE_3__.enableButtons; },
/* harmony export */   enableInput: function() { return /* reexport safe */ _instanceMethods_enable_disable_elements_js__WEBPACK_IMPORTED_MODULE_3__.enableInput; },
/* harmony export */   getInput: function() { return /* reexport safe */ _instanceMethods_getInput_js__WEBPACK_IMPORTED_MODULE_1__.getInput; },
/* harmony export */   handleAwaitingPromise: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.handleAwaitingPromise; },
/* harmony export */   hideLoading: function() { return /* reexport safe */ _instanceMethods_hideLoading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading; },
/* harmony export */   rejectPromise: function() { return /* reexport safe */ _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__.rejectPromise; },
/* harmony export */   resetValidationMessage: function() { return /* reexport safe */ _instanceMethods_validation_message_js__WEBPACK_IMPORTED_MODULE_4__.resetValidationMessage; },
/* harmony export */   showValidationMessage: function() { return /* reexport safe */ _instanceMethods_validation_message_js__WEBPACK_IMPORTED_MODULE_4__.showValidationMessage; },
/* harmony export */   update: function() { return /* reexport safe */ _instanceMethods_update_js__WEBPACK_IMPORTED_MODULE_5__.update; }
/* harmony export */ });
/* harmony import */ var _instanceMethods_hideLoading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceMethods/hideLoading.js */ "./node_modules/sweetalert2/src/instanceMethods/hideLoading.js");
/* harmony import */ var _instanceMethods_getInput_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceMethods/getInput.js */ "./node_modules/sweetalert2/src/instanceMethods/getInput.js");
/* harmony import */ var _instanceMethods_close_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceMethods/close.js */ "./node_modules/sweetalert2/src/instanceMethods/close.js");
/* harmony import */ var _instanceMethods_enable_disable_elements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceMethods/enable-disable-elements.js */ "./node_modules/sweetalert2/src/instanceMethods/enable-disable-elements.js");
/* harmony import */ var _instanceMethods_validation_message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceMethods/validation-message.js */ "./node_modules/sweetalert2/src/instanceMethods/validation-message.js");
/* harmony import */ var _instanceMethods_update_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./instanceMethods/update.js */ "./node_modules/sweetalert2/src/instanceMethods/update.js");
/* harmony import */ var _instanceMethods_destroy_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./instanceMethods/_destroy.js */ "./node_modules/sweetalert2/src/instanceMethods/_destroy.js");









/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/_destroy.js":
/*!******************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/_destroy.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _destroy: function() { return /* binding */ _destroy; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _privateMethods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../privateMethods.js */ "./node_modules/sweetalert2/src/privateMethods.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");




/**
 * Dispose the current SweetAlert2 instance
 */
function _destroy() {
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_2__["default"].domCache.get(this)
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_2__["default"].innerParams.get(this)

  if (!innerParams) {
    disposeWeakMaps(this) // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
    return // This instance has already been destroyed
  }

  // Check if there is another Swal closing
  if (domCache.popup && _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback) {
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback()
    delete _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback
  }

  if (typeof innerParams.didDestroy === 'function') {
    innerParams.didDestroy()
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('didDestroy')
  disposeSwal(this)
}

/**
 * @param {SweetAlert} instance
 */
const disposeSwal = (instance) => {
  disposeWeakMaps(instance)
  // Unset this.params so GC will dispose it (#1569)
  delete instance.params
  // Unset globalState props so GC will dispose globalState (#1569)
  delete _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].keydownHandler
  delete _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].keydownTarget
  // Unset currentInstance
  delete _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentInstance
}

/**
 * @param {SweetAlert} instance
 */
const disposeWeakMaps = (instance) => {
  // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
  if (instance.isAwaitingPromise) {
    unsetWeakMaps(_privateProps_js__WEBPACK_IMPORTED_MODULE_2__["default"], instance)
    instance.isAwaitingPromise = true
  } else {
    unsetWeakMaps(_privateMethods_js__WEBPACK_IMPORTED_MODULE_1__["default"], instance)
    unsetWeakMaps(_privateProps_js__WEBPACK_IMPORTED_MODULE_2__["default"], instance)

    delete instance.isAwaitingPromise
    // Unset instance methods
    delete instance.disableButtons
    delete instance.enableButtons
    delete instance.getInput
    delete instance.disableInput
    delete instance.enableInput
    delete instance.hideLoading
    delete instance.disableLoading
    delete instance.showValidationMessage
    delete instance.resetValidationMessage
    delete instance.close
    delete instance.closePopup
    delete instance.closeModal
    delete instance.closeToast
    delete instance.rejectPromise
    delete instance.update
    delete instance._destroy
  }
}

/**
 * @param {object} obj
 * @param {SweetAlert} instance
 */
const unsetWeakMaps = (obj, instance) => {
  for (const i in obj) {
    obj[i].delete(instance)
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/close.js":
/*!***************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/close.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   close: function() { return /* binding */ close; },
/* harmony export */   closeModal: function() { return /* binding */ close; },
/* harmony export */   closePopup: function() { return /* binding */ close; },
/* harmony export */   closeToast: function() { return /* binding */ close; },
/* harmony export */   handleAwaitingPromise: function() { return /* binding */ handleAwaitingPromise; },
/* harmony export */   rejectPromise: function() { return /* binding */ rejectPromise; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _keydown_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../keydown-handler.js */ "./node_modules/sweetalert2/src/keydown-handler.js");
/* harmony import */ var _privateMethods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../privateMethods.js */ "./node_modules/sweetalert2/src/privateMethods.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _utils_aria_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/aria.js */ "./node_modules/sweetalert2/src/utils/aria.js");
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_iosFix_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/iosFix.js */ "./node_modules/sweetalert2/src/utils/iosFix.js");
/* harmony import */ var _utils_scrollbar_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/scrollbar.js */ "./node_modules/sweetalert2/src/utils/scrollbar.js");











/**
 * @param {SweetAlert} instance
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
function removePopupAndResetState(instance, container, returnFocus, didClose) {
  if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.isToast()) {
    triggerDidCloseAndDispose(instance, didClose)
  } else {
    (0,_globalState_js__WEBPACK_IMPORTED_MODULE_0__.restoreActiveElement)(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose))
    ;(0,_keydown_handler_js__WEBPACK_IMPORTED_MODULE_1__.removeKeydownHandler)(_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"])
  }

  // workaround for https://github.com/sweetalert2/sweetalert2/issues/2088
  // for some reason removing the container in Safari will scroll the document to bottom
  if (_utils_iosFix_js__WEBPACK_IMPORTED_MODULE_7__.isSafariOrIOS) {
    container.setAttribute('style', 'display:none !important')
    container.removeAttribute('class')
    container.innerHTML = ''
  } else {
    container.remove()
  }

  if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.isModal()) {
    (0,_utils_scrollbar_js__WEBPACK_IMPORTED_MODULE_8__.undoReplaceScrollbarWithPadding)()
    ;(0,_utils_iosFix_js__WEBPACK_IMPORTED_MODULE_7__.undoIOSfix)()
    ;(0,_utils_aria_js__WEBPACK_IMPORTED_MODULE_4__.unsetAriaHidden)()
  }

  removeBodyClasses()
}

/**
 * Remove SweetAlert2 classes from body
 */
function removeBodyClasses() {
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.removeClass(
    [document.documentElement, document.body],
    [_utils_classes_js__WEBPACK_IMPORTED_MODULE_5__.swalClasses.shown, _utils_classes_js__WEBPACK_IMPORTED_MODULE_5__.swalClasses['height-auto'], _utils_classes_js__WEBPACK_IMPORTED_MODULE_5__.swalClasses['no-backdrop'], _utils_classes_js__WEBPACK_IMPORTED_MODULE_5__.swalClasses['toast-shown']]
  )
}

/**
 * Instance method to close sweetAlert
 *
 * @param {any} resolveValue
 */
function close(resolveValue) {
  resolveValue = prepareResolveValue(resolveValue)

  const swalPromiseResolve = _privateMethods_js__WEBPACK_IMPORTED_MODULE_2__["default"].swalPromiseResolve.get(this)

  const didClose = triggerClosePopup(this)

  if (this.isAwaitingPromise) {
    // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
    if (!resolveValue.isDismissed) {
      handleAwaitingPromise(this)
      swalPromiseResolve(resolveValue)
    }
  } else if (didClose) {
    // Resolve Swal promise
    swalPromiseResolve(resolveValue)
  }
}

const triggerClosePopup = (instance) => {
  const popup = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.getPopup()

  if (!popup) {
    return false
  }

  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_3__["default"].innerParams.get(instance)
  if (!innerParams || _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.hasClass(popup, innerParams.hideClass.popup)) {
    return false
  }

  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.removeClass(popup, innerParams.showClass.popup)
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.addClass(popup, innerParams.hideClass.popup)

  const backdrop = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.getContainer()
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.removeClass(backdrop, innerParams.showClass.backdrop)
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.addClass(backdrop, innerParams.hideClass.backdrop)

  handlePopupAnimation(instance, popup, innerParams)

  return true
}

/**
 * @param {any} error
 */
function rejectPromise(error) {
  const rejectPromise = _privateMethods_js__WEBPACK_IMPORTED_MODULE_2__["default"].swalPromiseReject.get(this)
  handleAwaitingPromise(this)
  if (rejectPromise) {
    // Reject Swal promise
    rejectPromise(error)
  }
}

/**
 * @param {SweetAlert} instance
 */
const handleAwaitingPromise = (instance) => {
  if (instance.isAwaitingPromise) {
    delete instance.isAwaitingPromise
    // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
    if (!_privateProps_js__WEBPACK_IMPORTED_MODULE_3__["default"].innerParams.get(instance)) {
      instance._destroy()
    }
  }
}

/**
 * @param {any} resolveValue
 * @returns {SweetAlertResult}
 */
const prepareResolveValue = (resolveValue) => {
  // When user calls Swal.close()
  if (typeof resolveValue === 'undefined') {
    return {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
    }
  }

  return Object.assign(
    {
      isConfirmed: false,
      isDenied: false,
      isDismissed: false,
    },
    resolveValue
  )
}

/**
 * @param {SweetAlert} instance
 * @param {HTMLElement} popup
 * @param {SweetAlertOptions} innerParams
 */
const handlePopupAnimation = (instance, popup, innerParams) => {
  const container = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.getContainer()
  // If animation is supported, animate
  const animationIsSupported = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.animationEndEvent && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.hasCssAnimation(popup)

  if (typeof innerParams.willClose === 'function') {
    innerParams.willClose(popup)
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('willClose', popup)

  if (animationIsSupported) {
    animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose)
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {HTMLElement} popup
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
const animatePopup = (instance, popup, container, returnFocus, didClose) => {
  if (!_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.animationEndEvent) {
    return
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback = removePopupAndResetState.bind(
    null,
    instance,
    container,
    returnFocus,
    didClose
  )
  popup.addEventListener(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_6__.animationEndEvent, function (e) {
    if (e.target === popup) {
      _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback()
      delete _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].swalCloseEventFinishedCallback
    }
  })
}

/**
 * @param {SweetAlert} instance
 * @param {Function} didClose
 */
const triggerDidCloseAndDispose = (instance, didClose) => {
  setTimeout(() => {
    if (typeof didClose === 'function') {
      didClose.bind(instance.params)()
    }
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('didClose')
    // instance might have been destroyed already
    if (instance._destroy) {
      instance._destroy()
    }
  })
}




/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/enable-disable-elements.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/enable-disable-elements.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableButtons: function() { return /* binding */ disableButtons; },
/* harmony export */   disableInput: function() { return /* binding */ disableInput; },
/* harmony export */   enableButtons: function() { return /* binding */ enableButtons; },
/* harmony export */   enableInput: function() { return /* binding */ enableInput; }
/* harmony export */ });
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");




/**
 * @param {SweetAlert} instance
 * @param {string[]} buttons
 * @param {boolean} disabled
 */
function setButtonsDisabled(instance, buttons, disabled) {
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_1__["default"].domCache.get(instance)
  buttons.forEach((button) => {
    domCache[button].disabled = disabled
  })
}

/**
 * @param {HTMLInputElement | null} input
 * @param {boolean} disabled
 */
function setInputDisabled(input, disabled) {
  const popup = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getPopup()
  if (!popup || !input) {
    return
  }
  if (input.type === 'radio') {
    /** @type {NodeListOf<HTMLInputElement>} */
    const radios = popup.querySelectorAll(`[name="${_utils_classes_js__WEBPACK_IMPORTED_MODULE_2__.swalClasses.radio}"]`)
    for (let i = 0; i < radios.length; i++) {
      radios[i].disabled = disabled
    }
  } else {
    input.disabled = disabled
  }
}

/**
 * Enable all the buttons
 * @this {SweetAlert}
 */
function enableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false)
}

/**
 * Disable all the buttons
 * @this {SweetAlert}
 */
function disableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true)
}

/**
 * Enable the input field
 * @this {SweetAlert}
 */
function enableInput() {
  setInputDisabled(this.getInput(), false)
}

/**
 * Disable the input field
 * @this {SweetAlert}
 */
function disableInput() {
  setInputDisabled(this.getInput(), true)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/getInput.js":
/*!******************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/getInput.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInput: function() { return /* binding */ getInput; }
/* harmony export */ });
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");



/**
 * Gets the input DOM node, this method works with input parameter.
 *
 * @returns {HTMLInputElement | null}
 */
function getInput() {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].innerParams.get(this)
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].domCache.get(this)
  if (!domCache) {
    return null
  }
  return _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getInput(domCache.popup, innerParams.input)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/hideLoading.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/hideLoading.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableLoading: function() { return /* binding */ hideLoading; },
/* harmony export */   hideLoading: function() { return /* binding */ hideLoading; }
/* harmony export */ });
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");




/**
 * Hides loader and shows back the button which was hidden by .showLoading()
 */
function hideLoading() {
  // do nothing if popup is closed
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].innerParams.get(this)
  if (!innerParams) {
    return
  }
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].domCache.get(this)
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(domCache.loader)
  if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.isToast()) {
    if (innerParams.icon) {
      _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getIcon())
    }
  } else {
    showRelatedButton(domCache)
  }
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.removeClass([domCache.popup, domCache.actions], _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.loading)
  domCache.popup.removeAttribute('aria-busy')
  domCache.popup.removeAttribute('data-loading')
  domCache.confirmButton.disabled = false
  domCache.denyButton.disabled = false
  domCache.cancelButton.disabled = false
}

const showRelatedButton = (domCache) => {
  const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'))
  if (buttonToReplace.length) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(buttonToReplace[0], 'inline-block')
  } else if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.allButtonsAreHidden()) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(domCache.actions)
  }
}




/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/update.js":
/*!****************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/update.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   update: function() { return /* binding */ update; }
/* harmony export */ });
/* harmony import */ var _src_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _src_utils_params_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/utils/params.js */ "./node_modules/sweetalert2/src/utils/params.js");
/* harmony import */ var _src_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");





/**
 * Updates popup parameters.
 *
 * @param {SweetAlertOptions} params
 */
function update(params) {
  const popup = _src_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getPopup()
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_3__["default"].innerParams.get(this)

  if (!popup || _src_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(popup, innerParams.hideClass.popup)) {
    (0,_src_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(
      `You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`
    )
    return
  }

  const validUpdatableParams = filterValidParams(params)

  const updatedParams = Object.assign({}, innerParams, validUpdatableParams)

  _src_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_0__.render(this, updatedParams)

  _privateProps_js__WEBPACK_IMPORTED_MODULE_3__["default"].innerParams.set(this, updatedParams)
  Object.defineProperties(this, {
    params: {
      value: Object.assign({}, this.params, params),
      writable: false,
      enumerable: true,
    },
  })
}

/**
 * @param {SweetAlertOptions} params
 * @returns {SweetAlertOptions}
 */
const filterValidParams = (params) => {
  const validUpdatableParams = {}
  Object.keys(params).forEach((param) => {
    if ((0,_src_utils_params_js__WEBPACK_IMPORTED_MODULE_1__.isUpdatableParameter)(param)) {
      validUpdatableParams[param] = params[param]
    } else {
      (0,_src_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(`Invalid parameter to update: ${param}`)
    }
  })
  return validUpdatableParams
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/instanceMethods/validation-message.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/instanceMethods/validation-message.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetValidationMessage: function() { return /* binding */ resetValidationMessage; },
/* harmony export */   showValidationMessage: function() { return /* binding */ showValidationMessage; }
/* harmony export */ });
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");




/**
 * Show block with validation message
 *
 * @param {string} error
 * @this {SweetAlert}
 */
function showValidationMessage(error) {
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].domCache.get(this)
  const params = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].innerParams.get(this)
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setInnerHtml(domCache.validationMessage, error)
  domCache.validationMessage.className = _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['validation-message']
  if (params.customClass && params.customClass.validationMessage) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass(domCache.validationMessage, params.customClass.validationMessage)
  }
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(domCache.validationMessage)

  const input = this.getInput()
  if (input) {
    input.setAttribute('aria-invalid', 'true')
    input.setAttribute('aria-describedby', _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['validation-message'])
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.focusInput(input)
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass(input, _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.inputerror)
  }
}

/**
 * Hide block with validation message
 *
 * @this {SweetAlert}
 */
function resetValidationMessage() {
  const domCache = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].domCache.get(this)
  if (domCache.validationMessage) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(domCache.validationMessage)
  }

  const input = this.getInput()
  if (input) {
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.removeClass(input, _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.inputerror)
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/keydown-handler.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/keydown-handler.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addKeydownHandler: function() { return /* binding */ addKeydownHandler; },
/* harmony export */   removeKeydownHandler: function() { return /* binding */ removeKeydownHandler; },
/* harmony export */   setFocus: function() { return /* binding */ setFocus; }
/* harmony export */ });
/* harmony import */ var _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staticMethods/dom.js */ "./node_modules/sweetalert2/src/staticMethods/dom.js");
/* harmony import */ var _utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/DismissReason.js */ "./node_modules/sweetalert2/src/utils/DismissReason.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");





/**
 * @param {GlobalState} globalState
 */
const removeKeydownHandler = (globalState) => {
  if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
    globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture,
    })
    globalState.keydownHandlerAdded = false
  }
}

/**
 * @param {GlobalState} globalState
 * @param {SweetAlertOptions} innerParams
 * @param {*} dismissWith
 */
const addKeydownHandler = (globalState, innerParams, dismissWith) => {
  removeKeydownHandler(globalState)
  if (!innerParams.toast) {
    globalState.keydownHandler = (e) => keydownHandler(innerParams, e, dismissWith)
    globalState.keydownTarget = innerParams.keydownListenerCapture ? window : _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
    globalState.keydownListenerCapture = innerParams.keydownListenerCapture
    globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture,
    })
    globalState.keydownHandlerAdded = true
  }
}

/**
 * @param {number} index
 * @param {number} increment
 */
const setFocus = (index, increment) => {
  const focusableElements = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getFocusableElements()
  // search for visible elements and select the next possible match
  if (focusableElements.length) {
    index = index + increment

    // rollover to first item
    if (index === focusableElements.length) {
      index = 0

      // go to last item
    } else if (index === -1) {
      index = focusableElements.length - 1
    }

    focusableElements[index].focus()
    return
  }
  // no visible focusable elements, focus the popup
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()?.focus()
}

const arrowKeysNextButton = ['ArrowRight', 'ArrowDown']

const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp']

/**
 * @param {SweetAlertOptions} innerParams
 * @param {KeyboardEvent} event
 * @param {Function} dismissWith
 */
const keydownHandler = (innerParams, event, dismissWith) => {
  if (!innerParams) {
    return // This instance has already been destroyed
  }

  // Ignore keydown during IME composition
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
  // https://github.com/sweetalert2/sweetalert2/issues/720
  // https://github.com/sweetalert2/sweetalert2/issues/2406
  if (event.isComposing || event.keyCode === 229) {
    return
  }

  if (innerParams.stopKeydownPropagation) {
    event.stopPropagation()
  }

  // ENTER
  if (event.key === 'Enter') {
    handleEnter(event, innerParams)
  }

  // TAB
  else if (event.key === 'Tab') {
    handleTab(event)
  }

  // ARROWS - switch focus between buttons
  else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) {
    handleArrows(event.key)
  }

  // ESC
  else if (event.key === 'Escape') {
    handleEsc(event, innerParams, dismissWith)
  }
}

/**
 * @param {KeyboardEvent} event
 * @param {SweetAlertOptions} innerParams
 */
const handleEnter = (event, innerParams) => {
  // https://github.com/sweetalert2/sweetalert2/issues/2386
  if (!(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.callIfFunction)(innerParams.allowEnterKey)) {
    return
  }

  const input = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getInput(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup(), innerParams.input)

  if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
    if (['textarea', 'file'].includes(innerParams.input)) {
      return // do not submit
    }

    (0,_staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_0__.clickConfirm)()
    event.preventDefault()
  }
}

/**
 * @param {KeyboardEvent} event
 */
const handleTab = (event) => {
  const targetElement = event.target

  const focusableElements = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getFocusableElements()
  let btnIndex = -1
  for (let i = 0; i < focusableElements.length; i++) {
    if (targetElement === focusableElements[i]) {
      btnIndex = i
      break
    }
  }

  // Cycle to the next button
  if (!event.shiftKey) {
    setFocus(btnIndex, 1)
  }

  // Cycle to the prev button
  else {
    setFocus(btnIndex, -1)
  }

  event.stopPropagation()
  event.preventDefault()
}

/**
 * @param {string} key
 */
const handleArrows = (key) => {
  const actions = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getActions()
  const confirmButton = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getConfirmButton()
  const denyButton = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getDenyButton()
  const cancelButton = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getCancelButton()
  if (!actions || !confirmButton || !denyButton || !cancelButton) {
    return
  }
  /** @type HTMLElement[] */
  const buttons = [confirmButton, denyButton, cancelButton]
  if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
    return
  }
  const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling'
  let buttonToFocus = document.activeElement
  if (!buttonToFocus) {
    return
  }
  for (let i = 0; i < actions.children.length; i++) {
    buttonToFocus = buttonToFocus[sibling]
    if (!buttonToFocus) {
      return
    }
    if (buttonToFocus instanceof HTMLButtonElement && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.isVisible(buttonToFocus)) {
      break
    }
  }
  if (buttonToFocus instanceof HTMLButtonElement) {
    buttonToFocus.focus()
  }
}

/**
 * @param {KeyboardEvent} event
 * @param {SweetAlertOptions} innerParams
 * @param {Function} dismissWith
 */
const handleEsc = (event, innerParams, dismissWith) => {
  if ((0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.callIfFunction)(innerParams.allowEscapeKey)) {
    event.preventDefault()
    dismissWith(_utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_1__.DismissReason.esc)
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/popup-click-handler.js":
/*!*************************************************************!*\
  !*** ./node_modules/sweetalert2/src/popup-click-handler.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handlePopupClick: function() { return /* binding */ handlePopupClick; }
/* harmony export */ });
/* harmony import */ var _utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/DismissReason.js */ "./node_modules/sweetalert2/src/utils/DismissReason.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");



/**
 * @param {SweetAlertOptions} innerParams
 * @param {DomCache} domCache
 * @param {Function} dismissWith
 */
const handlePopupClick = (innerParams, domCache, dismissWith) => {
  if (innerParams.toast) {
    handleToastClick(innerParams, domCache, dismissWith)
  } else {
    // Ignore click events that had mousedown on the popup but mouseup on the container
    // This can happen when the user drags a slider
    handleModalMousedown(domCache)

    // Ignore click events that had mousedown on the container but mouseup on the popup
    handleContainerMousedown(domCache)

    handleModalClick(innerParams, domCache, dismissWith)
  }
}

/**
 * @param {SweetAlertOptions} innerParams
 * @param {DomCache} domCache
 * @param {Function} dismissWith
 */
const handleToastClick = (innerParams, domCache, dismissWith) => {
  // Closing toast by internal click
  domCache.popup.onclick = () => {
    if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
      return
    }
    dismissWith(_utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_0__.DismissReason.close)
  }
}

/**
 * @param {SweetAlertOptions} innerParams
 * @returns {boolean}
 */
const isAnyButtonShown = (innerParams) => {
  return !!(
    innerParams.showConfirmButton ||
    innerParams.showDenyButton ||
    innerParams.showCancelButton ||
    innerParams.showCloseButton
  )
}

let ignoreOutsideClick = false

/**
 * @param {DomCache} domCache
 */
const handleModalMousedown = (domCache) => {
  domCache.popup.onmousedown = () => {
    domCache.container.onmouseup = function (e) {
      domCache.container.onmouseup = () => {}
      // We only check if the mouseup target is the container because usually it doesn't
      // have any other direct children aside of the popup
      if (e.target === domCache.container) {
        ignoreOutsideClick = true
      }
    }
  }
}

/**
 * @param {DomCache} domCache
 */
const handleContainerMousedown = (domCache) => {
  domCache.container.onmousedown = (e) => {
    // prevent the modal text from being selected on double click on the container (allowOutsideClick: false)
    if (e.target === domCache.container) {
      e.preventDefault()
    }
    domCache.popup.onmouseup = function (e) {
      domCache.popup.onmouseup = () => {}
      // We also need to check if the mouseup target is a child of the popup
      if (e.target === domCache.popup || (e.target instanceof HTMLElement && domCache.popup.contains(e.target))) {
        ignoreOutsideClick = true
      }
    }
  }
}

/**
 * @param {SweetAlertOptions} innerParams
 * @param {DomCache} domCache
 * @param {Function} dismissWith
 */
const handleModalClick = (innerParams, domCache, dismissWith) => {
  domCache.container.onclick = (e) => {
    if (ignoreOutsideClick) {
      ignoreOutsideClick = false
      return
    }
    if (e.target === domCache.container && (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.callIfFunction)(innerParams.allowOutsideClick)) {
      dismissWith(_utils_DismissReason_js__WEBPACK_IMPORTED_MODULE_0__.DismissReason.backdrop)
    }
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/privateMethods.js":
/*!********************************************************!*\
  !*** ./node_modules/sweetalert2/src/privateMethods.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  swalPromiseResolve: new WeakMap(),
  swalPromiseReject: new WeakMap(),
});


/***/ }),

/***/ "./node_modules/sweetalert2/src/privateProps.js":
/*!******************************************************!*\
  !*** ./node_modules/sweetalert2/src/privateProps.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  innerParams: new WeakMap(),
  domCache: new WeakMap(),
});


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods.js":
/*!*******************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argsToParams: function() { return /* reexport safe */ _staticMethods_argsToParams_js__WEBPACK_IMPORTED_MODULE_0__.argsToParams; },
/* harmony export */   bindClickHandler: function() { return /* reexport safe */ _staticMethods_bindClickHandler_js__WEBPACK_IMPORTED_MODULE_6__.bindClickHandler; },
/* harmony export */   clickCancel: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.clickCancel; },
/* harmony export */   clickConfirm: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.clickConfirm; },
/* harmony export */   clickDeny: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.clickDeny; },
/* harmony export */   enableLoading: function() { return /* reexport safe */ _staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_4__.enableLoading; },
/* harmony export */   fire: function() { return /* reexport safe */ _staticMethods_fire_js__WEBPACK_IMPORTED_MODULE_2__.fire; },
/* harmony export */   getActions: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getActions; },
/* harmony export */   getCancelButton: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getCancelButton; },
/* harmony export */   getCloseButton: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getCloseButton; },
/* harmony export */   getConfirmButton: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getConfirmButton; },
/* harmony export */   getContainer: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getContainer; },
/* harmony export */   getDenyButton: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getDenyButton; },
/* harmony export */   getFocusableElements: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getFocusableElements; },
/* harmony export */   getFooter: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getFooter; },
/* harmony export */   getHtmlContainer: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getHtmlContainer; },
/* harmony export */   getIcon: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getIcon; },
/* harmony export */   getIconContent: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getIconContent; },
/* harmony export */   getImage: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getImage; },
/* harmony export */   getInputLabel: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getInputLabel; },
/* harmony export */   getLoader: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getLoader; },
/* harmony export */   getPopup: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getPopup; },
/* harmony export */   getProgressSteps: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getProgressSteps; },
/* harmony export */   getTimerLeft: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.getTimerLeft; },
/* harmony export */   getTimerProgressBar: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getTimerProgressBar; },
/* harmony export */   getTitle: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getTitle; },
/* harmony export */   getValidationMessage: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.getValidationMessage; },
/* harmony export */   increaseTimer: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.increaseTimer; },
/* harmony export */   isDeprecatedParameter: function() { return /* reexport safe */ _utils_params_js__WEBPACK_IMPORTED_MODULE_8__.isDeprecatedParameter; },
/* harmony export */   isLoading: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.isLoading; },
/* harmony export */   isTimerRunning: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.isTimerRunning; },
/* harmony export */   isUpdatableParameter: function() { return /* reexport safe */ _utils_params_js__WEBPACK_IMPORTED_MODULE_8__.isUpdatableParameter; },
/* harmony export */   isValidParameter: function() { return /* reexport safe */ _utils_params_js__WEBPACK_IMPORTED_MODULE_8__.isValidParameter; },
/* harmony export */   isVisible: function() { return /* reexport safe */ _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__.isVisible; },
/* harmony export */   mixin: function() { return /* reexport safe */ _staticMethods_mixin_js__WEBPACK_IMPORTED_MODULE_3__.mixin; },
/* harmony export */   off: function() { return /* reexport safe */ _staticMethods_eventHandlers_js__WEBPACK_IMPORTED_MODULE_7__.off; },
/* harmony export */   on: function() { return /* reexport safe */ _staticMethods_eventHandlers_js__WEBPACK_IMPORTED_MODULE_7__.on; },
/* harmony export */   once: function() { return /* reexport safe */ _staticMethods_eventHandlers_js__WEBPACK_IMPORTED_MODULE_7__.once; },
/* harmony export */   resumeTimer: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.resumeTimer; },
/* harmony export */   showLoading: function() { return /* reexport safe */ _staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_4__.showLoading; },
/* harmony export */   stopTimer: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.stopTimer; },
/* harmony export */   toggleTimer: function() { return /* reexport safe */ _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__.toggleTimer; }
/* harmony export */ });
/* harmony import */ var _staticMethods_argsToParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staticMethods/argsToParams.js */ "./node_modules/sweetalert2/src/staticMethods/argsToParams.js");
/* harmony import */ var _staticMethods_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staticMethods/dom.js */ "./node_modules/sweetalert2/src/staticMethods/dom.js");
/* harmony import */ var _staticMethods_fire_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staticMethods/fire.js */ "./node_modules/sweetalert2/src/staticMethods/fire.js");
/* harmony import */ var _staticMethods_mixin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staticMethods/mixin.js */ "./node_modules/sweetalert2/src/staticMethods/mixin.js");
/* harmony import */ var _staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./staticMethods/showLoading.js */ "./node_modules/sweetalert2/src/staticMethods/showLoading.js");
/* harmony import */ var _staticMethods_timer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./staticMethods/timer.js */ "./node_modules/sweetalert2/src/staticMethods/timer.js");
/* harmony import */ var _staticMethods_bindClickHandler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./staticMethods/bindClickHandler.js */ "./node_modules/sweetalert2/src/staticMethods/bindClickHandler.js");
/* harmony import */ var _staticMethods_eventHandlers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./staticMethods/eventHandlers.js */ "./node_modules/sweetalert2/src/staticMethods/eventHandlers.js");
/* harmony import */ var _utils_params_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/params.js */ "./node_modules/sweetalert2/src/utils/params.js");











/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/argsToParams.js":
/*!********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/argsToParams.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argsToParams: function() { return /* binding */ argsToParams; }
/* harmony export */ });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");


const isJqueryElement = (elem) => typeof elem === 'object' && elem.jquery
const isElement = (elem) => elem instanceof Element || isJqueryElement(elem)

const argsToParams = (args) => {
  const params = {}
  if (typeof args[0] === 'object' && !isElement(args[0])) {
    Object.assign(params, args[0])
  } else {
    ;['title', 'html', 'icon'].forEach((name, index) => {
      const arg = args[index]
      if (typeof arg === 'string' || isElement(arg)) {
        params[name] = arg
      } else if (arg !== undefined) {
        (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.error)(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`)
      }
    })
  }
  return params
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/bindClickHandler.js":
/*!************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/bindClickHandler.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindClickHandler: function() { return /* binding */ bindClickHandler; }
/* harmony export */ });
let bodyClickListenerAdded = false
const clickHandlers = {}

/**
 * @param {string} attr
 */
function bindClickHandler(attr = 'data-swal-template') {
  clickHandlers[attr] = this

  if (!bodyClickListenerAdded) {
    document.body.addEventListener('click', bodyClickListener)
    bodyClickListenerAdded = true
  }
}

const bodyClickListener = (event) => {
  for (let el = event.target; el && el !== document; el = el.parentNode) {
    for (const attr in clickHandlers) {
      const template = el.getAttribute(attr)
      if (template) {
        clickHandlers[attr].fire({ template })
        return
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/dom.js":
/*!***********************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/dom.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickCancel: function() { return /* binding */ clickCancel; },
/* harmony export */   clickConfirm: function() { return /* binding */ clickConfirm; },
/* harmony export */   clickDeny: function() { return /* binding */ clickDeny; },
/* harmony export */   getActions: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getActions; },
/* harmony export */   getCancelButton: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getCancelButton; },
/* harmony export */   getCloseButton: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getCloseButton; },
/* harmony export */   getConfirmButton: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getConfirmButton; },
/* harmony export */   getContainer: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getContainer; },
/* harmony export */   getDenyButton: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getDenyButton; },
/* harmony export */   getFocusableElements: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getFocusableElements; },
/* harmony export */   getFooter: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getFooter; },
/* harmony export */   getHtmlContainer: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getHtmlContainer; },
/* harmony export */   getIcon: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getIcon; },
/* harmony export */   getIconContent: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getIconContent; },
/* harmony export */   getImage: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getImage; },
/* harmony export */   getInputLabel: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getInputLabel; },
/* harmony export */   getLoader: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getLoader; },
/* harmony export */   getPopup: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getPopup; },
/* harmony export */   getProgressSteps: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getProgressSteps; },
/* harmony export */   getTimerProgressBar: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getTimerProgressBar; },
/* harmony export */   getTitle: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getTitle; },
/* harmony export */   getValidationMessage: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getValidationMessage; },
/* harmony export */   isLoading: function() { return /* reexport safe */ _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.isLoading; },
/* harmony export */   isVisible: function() { return /* binding */ isVisible; }
/* harmony export */ });
/* harmony import */ var _utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom/domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");





/*
 * Global function to determine if SweetAlert2 popup is shown
 */
const isVisible = () => {
  return _utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_0__.isVisible(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getPopup())
}

/*
 * Global function to click 'Confirm' button
 */
const clickConfirm = () => _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getConfirmButton()?.click()

/*
 * Global function to click 'Deny' button
 */
const clickDeny = () => _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getDenyButton()?.click()

/*
 * Global function to click 'Cancel' button
 */
const clickCancel = () => _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getCancelButton()?.click()


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/eventHandlers.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/eventHandlers.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   off: function() { return /* binding */ off; },
/* harmony export */   on: function() { return /* binding */ on; },
/* harmony export */   once: function() { return /* binding */ once; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _utils_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventEmitter.js */ "./node_modules/sweetalert2/src/utils/EventEmitter.js");



_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter = new _utils_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__["default"]()

/**
 * @param {string} eventName
 * @param {EventHandler} eventHandler
 */
const on = (eventName, eventHandler) => {
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.on(eventName, eventHandler)
}

/**
 * @param {string} eventName
 * @param {EventHandler} eventHandler
 */
const once = (eventName, eventHandler) => {
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.once(eventName, eventHandler)
}

/**
 * @param {string} [eventName]
 * @param {EventHandler} [eventHandler]
 */
const off = (eventName, eventHandler) => {
  // Remove all handlers for all events
  if (!eventName) {
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.reset()
    return
  }

  if (eventHandler) {
    // Remove a specific handler
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.removeListener(eventName, eventHandler)
  } else {
    // Remove all handlers for a specific event
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.removeAllListeners(eventName)
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/fire.js":
/*!************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/fire.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fire: function() { return /* binding */ fire; }
/* harmony export */ });
/**
 * Main method to create a new SweetAlert2 popup
 *
 * @param  {...SweetAlertOptions} args
 * @returns {Promise<SweetAlertResult>}
 */
function fire(...args) {
  return new this(...args)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/mixin.js":
/*!*************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/mixin.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixin: function() { return /* binding */ mixin; }
/* harmony export */ });
/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param {SweetAlertOptions} mixinParams
 * @returns {SweetAlert}
 */
function mixin(mixinParams) {
  class MixinSwal extends this {
    _main(params, priorityMixinParams) {
      return super._main(params, Object.assign({}, mixinParams, priorityMixinParams))
    }
  }
  // @ts-ignore
  return MixinSwal
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/showLoading.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/showLoading.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enableLoading: function() { return /* binding */ showLoading; },
/* harmony export */   showLoading: function() { return /* binding */ showLoading; }
/* harmony export */ });
/* harmony import */ var _sweetalert2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sweetalert2.js */ "./node_modules/sweetalert2/src/sweetalert2.js");
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");




/**
 * Shows loader (spinner), this is useful with AJAX requests.
 * By default the loader be shown instead of the "Confirm" button.
 *
 * @param {HTMLButtonElement | null} [buttonToReplace]
 */
const showLoading = (buttonToReplace) => {
  let popup = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    new _sweetalert2_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
  }
  popup = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    return
  }
  const loader = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getLoader()

  if (_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.isToast()) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getIcon())
  } else {
    replaceButton(popup, buttonToReplace)
  }
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(loader)

  popup.setAttribute('data-loading', 'true')
  popup.setAttribute('aria-busy', 'true')
  popup.focus()
}

/**
 * @param {HTMLElement} popup
 * @param {HTMLButtonElement | null} [buttonToReplace]
 */
const replaceButton = (popup, buttonToReplace) => {
  const actions = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getActions()
  const loader = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getLoader()
  if (!actions || !loader) {
    return
  }

  if (!buttonToReplace && _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.isVisible(_utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getConfirmButton())) {
    buttonToReplace = _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getConfirmButton()
  }

  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(actions)
  if (buttonToReplace) {
    _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(buttonToReplace)
    loader.setAttribute('data-button-to-replace', buttonToReplace.className)
    actions.insertBefore(loader, buttonToReplace)
  }
  _utils_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass([popup, actions], _utils_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.loading)
}




/***/ }),

/***/ "./node_modules/sweetalert2/src/staticMethods/timer.js":
/*!*************************************************************!*\
  !*** ./node_modules/sweetalert2/src/staticMethods/timer.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTimerLeft: function() { return /* binding */ getTimerLeft; },
/* harmony export */   increaseTimer: function() { return /* binding */ increaseTimer; },
/* harmony export */   isTimerRunning: function() { return /* binding */ isTimerRunning; },
/* harmony export */   resumeTimer: function() { return /* binding */ resumeTimer; },
/* harmony export */   stopTimer: function() { return /* binding */ stopTimer; },
/* harmony export */   toggleTimer: function() { return /* binding */ toggleTimer; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom/domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");



/**
 * If `timer` parameter is set, returns number of milliseconds of timer remained.
 * Otherwise, returns undefined.
 *
 * @returns {number | undefined}
 */
const getTimerLeft = () => {
  return _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout && _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout.getTimerLeft()
}

/**
 * Stop timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 *
 * @returns {number | undefined}
 */
const stopTimer = () => {
  if (_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout) {
    (0,_utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.stopTimerProgressBar)()
    return _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout.stop()
  }
}

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 *
 * @returns {number | undefined}
 */
const resumeTimer = () => {
  if (_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout) {
    const remaining = _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout.start()
    ;(0,_utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.animateTimerProgressBar)(remaining)
    return remaining
  }
}

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 *
 * @returns {number | undefined}
 */
const toggleTimer = () => {
  const timer = _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout
  return timer && (timer.running ? stopTimer() : resumeTimer())
}

/**
 * Increase timer. Returns number of milliseconds of an updated timer.
 * If `timer` parameter isn't set, returns undefined.
 *
 * @param {number} ms
 * @returns {number | undefined}
 */
const increaseTimer = (ms) => {
  if (_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout) {
    const remaining = _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout.increase(ms)
    ;(0,_utils_dom_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.animateTimerProgressBar)(remaining, true)
    return remaining
  }
}

/**
 * Check if timer is running. Returns true if timer is running
 * or false if timer is paused or stopped.
 * If `timer` parameter isn't set, returns undefined
 *
 * @returns {boolean}
 */
const isTimerRunning = () => {
  return !!(_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout && _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeout.isRunning())
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/sweetalert2.js":
/*!*****************************************************!*\
  !*** ./node_modules/sweetalert2/src/sweetalert2.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SweetAlert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SweetAlert.js */ "./node_modules/sweetalert2/src/SweetAlert.js");


const Swal = _SweetAlert_js__WEBPACK_IMPORTED_MODULE_0__["default"]
// @ts-ignore
Swal.default = Swal

/* harmony default export */ __webpack_exports__["default"] = (Swal);


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/DismissReason.js":
/*!*************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/DismissReason.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DismissReason: function() { return /* binding */ DismissReason; }
/* harmony export */ });
/** @typedef {'cancel' | 'backdrop' | 'close' | 'esc' | 'timer'} DismissReason */

/** @type {Record<DismissReason, DismissReason>} */
const DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'backdrop',
  close: 'close',
  esc: 'esc',
  timer: 'timer',
})


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/EventEmitter.js":
/*!************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/EventEmitter.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EventEmitter; }
/* harmony export */ });
// Source: https://gist.github.com/mudge/5830382?permalink_comment_id=2691957#gistcomment-2691957

class EventEmitter {
  constructor() {
    /** @type {Events} */
    this.events = {}
  }

  /**
   * @param {string} eventName
   * @returns {EventHandlers}
   */
  _getHandlersByEventName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      // not Set because we need to keep the FIFO order
      // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1748990334
      this.events[eventName] = []
    }
    return this.events[eventName]
  }

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  on(eventName, eventHandler) {
    const currentHandlers = this._getHandlersByEventName(eventName)
    if (!currentHandlers.includes(eventHandler)) {
      currentHandlers.push(eventHandler)
    }
  }

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  once(eventName, eventHandler) {
    /**
     * @param {Array} args
     */
    const onceFn = (...args) => {
      this.removeListener(eventName, onceFn)
      eventHandler.apply(this, args)
    }
    this.on(eventName, onceFn)
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   */
  emit(eventName, ...args) {
    this._getHandlersByEventName(eventName).forEach(
      /**
       * @param {EventHandler} eventHandler
       */
      (eventHandler) => {
        try {
          eventHandler.apply(this, args)
        } catch (error) {
          console.error(error)
        }
      }
    )
  }

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  removeListener(eventName, eventHandler) {
    const currentHandlers = this._getHandlersByEventName(eventName)
    const index = currentHandlers.indexOf(eventHandler)
    if (index > -1) {
      currentHandlers.splice(index, 1)
    }
  }

  /**
   * @param {string} eventName
   */
  removeAllListeners(eventName) {
    if (this.events[eventName] !== undefined) {
      // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1749239222
      this.events[eventName].length = 0
    }
  }

  reset() {
    this.events = {}
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/Timer.js":
/*!*****************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/Timer.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Timer; }
/* harmony export */ });
class Timer {
  /**
   * @param {Function} callback
   * @param {number} delay
   */
  constructor(callback, delay) {
    this.callback = callback
    this.remaining = delay
    this.running = false

    this.start()
  }

  /**
   * @returns {number}
   */
  start() {
    if (!this.running) {
      this.running = true
      this.started = new Date()
      this.id = setTimeout(this.callback, this.remaining)
    }
    return this.remaining
  }

  /**
   * @returns {number}
   */
  stop() {
    if (this.started && this.running) {
      this.running = false
      clearTimeout(this.id)
      this.remaining -= new Date().getTime() - this.started.getTime()
    }
    return this.remaining
  }

  /**
   * @param {number} n
   * @returns {number}
   */
  increase(n) {
    const running = this.running
    if (running) {
      this.stop()
    }
    this.remaining += n
    if (running) {
      this.start()
    }
    return this.remaining
  }

  /**
   * @returns {number}
   */
  getTimerLeft() {
    if (this.running) {
      this.stop()
      this.start()
    }
    return this.remaining
  }

  /**
   * @returns {boolean}
   */
  isRunning() {
    return this.running
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/aria.js":
/*!****************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/aria.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAriaHidden: function() { return /* binding */ setAriaHidden; },
/* harmony export */   unsetAriaHidden: function() { return /* binding */ unsetAriaHidden; }
/* harmony export */ });
/* harmony import */ var _dom_getters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");


// From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
// Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
// elements not within the active modal dialog will not be surfaced if a user opens a screen
// reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

const setAriaHidden = () => {
  const container = (0,_dom_getters_js__WEBPACK_IMPORTED_MODULE_0__.getContainer)()
  const bodyChildren = Array.from(document.body.children)
  bodyChildren.forEach((el) => {
    if (el.contains(container)) {
      return
    }

    if (el.hasAttribute('aria-hidden')) {
      el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden') || '')
    }
    el.setAttribute('aria-hidden', 'true')
  })
}

const unsetAriaHidden = () => {
  const bodyChildren = Array.from(document.body.children)
  bodyChildren.forEach((el) => {
    if (el.hasAttribute('data-previous-aria-hidden')) {
      el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden') || '')
      el.removeAttribute('data-previous-aria-hidden')
    } else {
      el.removeAttribute('aria-hidden')
    }
  })
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/classes.js":
/*!*******************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/classes.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iconTypes: function() { return /* binding */ iconTypes; },
/* harmony export */   swalClasses: function() { return /* binding */ swalClasses; },
/* harmony export */   swalPrefix: function() { return /* binding */ swalPrefix; }
/* harmony export */ });
const swalPrefix = 'swal2-'

/**
 * @typedef {Record<SwalClass, string>} SwalClasses
 */

/**
 * @typedef {'success' | 'warning' | 'info' | 'question' | 'error'} SwalIcon
 * @typedef {Record<SwalIcon, string>} SwalIcons
 */

/** @type {SwalClass[]} */
const classNames = [
  'container',
  'shown',
  'height-auto',
  'iosfix',
  'popup',
  'modal',
  'no-backdrop',
  'no-transition',
  'toast',
  'toast-shown',
  'show',
  'hide',
  'close',
  'title',
  'html-container',
  'actions',
  'confirm',
  'deny',
  'cancel',
  'default-outline',
  'footer',
  'icon',
  'icon-content',
  'image',
  'input',
  'file',
  'range',
  'select',
  'radio',
  'checkbox',
  'label',
  'textarea',
  'inputerror',
  'input-label',
  'validation-message',
  'progress-steps',
  'active-progress-step',
  'progress-step',
  'progress-step-line',
  'loader',
  'loading',
  'styled',
  'top',
  'top-start',
  'top-end',
  'top-left',
  'top-right',
  'center',
  'center-start',
  'center-end',
  'center-left',
  'center-right',
  'bottom',
  'bottom-start',
  'bottom-end',
  'bottom-left',
  'bottom-right',
  'grow-row',
  'grow-column',
  'grow-fullscreen',
  'rtl',
  'timer-progress-bar',
  'timer-progress-bar-container',
  'scrollbar-measure',
  'icon-success',
  'icon-warning',
  'icon-info',
  'icon-question',
  'icon-error',
]

const swalClasses = classNames.reduce((acc, className) => {
  acc[className] = swalPrefix + className
  return acc
}, /** @type {SwalClasses} */ ({}))

/** @type {SwalIcon[]} */
const icons = ['success', 'warning', 'info', 'question', 'error']

const iconTypes = icons.reduce((acc, icon) => {
  acc[icon] = swalPrefix + icon
  return acc
}, /** @type {SwalIcons} */ ({}))


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/defaultInputValidators.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/defaultInputValidators.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * @param {string} string
   * @param {string} [validationMessage]
   * @returns {Promise<string | void>}
   */
  email: (string, validationMessage) => {
    return /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(string)
      ? Promise.resolve()
      : Promise.resolve(validationMessage || 'Invalid email address')
  },
  /**
   * @param {string} string
   * @param {string} [validationMessage]
   * @returns {Promise<string | void>}
   */
  url: (string, validationMessage) => {
    // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string)
      ? Promise.resolve()
      : Promise.resolve(validationMessage || 'Invalid URL')
  },
});


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/animationEndEvent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/animationEndEvent.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animationEndEvent: function() { return /* binding */ animationEndEvent; }
/* harmony export */ });
/* harmony import */ var _isNodeEnv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../isNodeEnv.js */ "./node_modules/sweetalert2/src/utils/isNodeEnv.js");


/**
 * @returns {'webkitAnimationEnd' | 'animationend' | false}
 */
const animationEndEvent = (() => {
  // Prevent run in Node env
  if ((0,_isNodeEnv_js__WEBPACK_IMPORTED_MODULE_0__.isNodeEnv)()) {
    return false
  }

  const testEl = document.createElement('div')

  // Chrome, Safari and Opera
  if (typeof testEl.style.webkitAnimation !== 'undefined') {
    return 'webkitAnimationEnd'
  }

  // Standard syntax
  if (typeof testEl.style.animation !== 'undefined') {
    return 'animationend'
  }

  return false
})()


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/domUtils.js":
/*!************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/domUtils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: function() { return /* binding */ addClass; },
/* harmony export */   allButtonsAreHidden: function() { return /* binding */ allButtonsAreHidden; },
/* harmony export */   animateTimerProgressBar: function() { return /* binding */ animateTimerProgressBar; },
/* harmony export */   applyCustomClass: function() { return /* binding */ applyCustomClass; },
/* harmony export */   applyNumericalStyle: function() { return /* binding */ applyNumericalStyle; },
/* harmony export */   focusInput: function() { return /* binding */ focusInput; },
/* harmony export */   getDirectChildByClass: function() { return /* binding */ getDirectChildByClass; },
/* harmony export */   getInput: function() { return /* binding */ getInput; },
/* harmony export */   hasClass: function() { return /* binding */ hasClass; },
/* harmony export */   hasCssAnimation: function() { return /* binding */ hasCssAnimation; },
/* harmony export */   hide: function() { return /* binding */ hide; },
/* harmony export */   isScrollable: function() { return /* binding */ isScrollable; },
/* harmony export */   isVisible: function() { return /* binding */ isVisible; },
/* harmony export */   removeClass: function() { return /* binding */ removeClass; },
/* harmony export */   setInnerHtml: function() { return /* binding */ setInnerHtml; },
/* harmony export */   setStyle: function() { return /* binding */ setStyle; },
/* harmony export */   show: function() { return /* binding */ show; },
/* harmony export */   showWhenInnerHtmlPresent: function() { return /* binding */ showWhenInnerHtmlPresent; },
/* harmony export */   stopTimerProgressBar: function() { return /* binding */ stopTimerProgressBar; },
/* harmony export */   toggle: function() { return /* binding */ toggle; },
/* harmony export */   toggleClass: function() { return /* binding */ toggleClass; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");
/* harmony import */ var _getters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");




/**
 * Securely set innerHTML of an element
 * https://github.com/sweetalert2/sweetalert2/issues/1926
 *
 * @param {HTMLElement} elem
 * @param {string} html
 */
const setInnerHtml = (elem, html) => {
  elem.textContent = ''
  if (html) {
    const parser = new DOMParser()
    const parsed = parser.parseFromString(html, `text/html`)
    const head = parsed.querySelector('head')
    if (head) {
      Array.from(head.childNodes).forEach((child) => {
        elem.appendChild(child)
      })
    }
    const body = parsed.querySelector('body')
    if (body) {
      Array.from(body.childNodes).forEach((child) => {
        if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
          elem.appendChild(child.cloneNode(true)) // https://github.com/sweetalert2/sweetalert2/issues/2507
        } else {
          elem.appendChild(child)
        }
      })
    }
  }
}

/**
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {boolean}
 */
const hasClass = (elem, className) => {
  if (!className) {
    return false
  }
  const classList = className.split(/\s+/)
  for (let i = 0; i < classList.length; i++) {
    if (!elem.classList.contains(classList[i])) {
      return false
    }
  }
  return true
}

/**
 * @param {HTMLElement} elem
 * @param {SweetAlertOptions} params
 */
const removeCustomClasses = (elem, params) => {
  Array.from(elem.classList).forEach((className) => {
    if (
      !Object.values(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses).includes(className) &&
      !Object.values(_classes_js__WEBPACK_IMPORTED_MODULE_0__.iconTypes).includes(className) &&
      !Object.values(params.showClass || {}).includes(className)
    ) {
      elem.classList.remove(className)
    }
  })
}

/**
 * @param {HTMLElement} elem
 * @param {SweetAlertOptions} params
 * @param {string} className
 */
const applyCustomClass = (elem, params, className) => {
  removeCustomClasses(elem, params)

  if (!params.customClass) {
    return
  }

  const customClass = params.customClass[/** @type {keyof SweetAlertCustomClass} */ (className)]

  if (!customClass) {
    return
  }

  if (typeof customClass !== 'string' && !customClass.forEach) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.warn)(`Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof customClass}"`)
    return
  }

  addClass(elem, customClass)
}

/**
 * @param {HTMLElement} popup
 * @param {import('./renderers/renderInput').InputClass | SweetAlertInput} inputClass
 * @returns {HTMLInputElement | null}
 */
const getInput = (popup, inputClass) => {
  if (!inputClass) {
    return null
  }
  switch (inputClass) {
    case 'select':
    case 'textarea':
    case 'file':
      return popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses[inputClass]}`)
    case 'checkbox':
      return popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.checkbox} input`)
    case 'radio':
      return (
        popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.radio} input:checked`) ||
        popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.radio} input:first-child`)
      )
    case 'range':
      return popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.range} input`)
    default:
      return popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} > .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.input}`)
  }
}

/**
 * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
 */
const focusInput = (input) => {
  input.focus()

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915
    const val = input.value
    input.value = ''
    input.value = val
  }
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 * @param {boolean} condition
 */
const toggleClass = (target, classList, condition) => {
  if (!target || !classList) {
    return
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean)
  }
  classList.forEach((className) => {
    if (Array.isArray(target)) {
      target.forEach((elem) => {
        if (condition) {
          elem.classList.add(className)
        } else {
          elem.classList.remove(className)
        }
      })
    } else {
      if (condition) {
        target.classList.add(className)
      } else {
        target.classList.remove(className)
      }
    }
  })
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 */
const addClass = (target, classList) => {
  toggleClass(target, classList, true)
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 */
const removeClass = (target, classList) => {
  toggleClass(target, classList, false)
}

/**
 * Get direct child of an element by class name
 *
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {HTMLElement | undefined}
 */
const getDirectChildByClass = (elem, className) => {
  const children = Array.from(elem.children)
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child instanceof HTMLElement && hasClass(child, className)) {
      return child
    }
  }
}

/**
 * @param {HTMLElement} elem
 * @param {string} property
 * @param {*} value
 */
const applyNumericalStyle = (elem, property, value) => {
  if (value === `${parseInt(value)}`) {
    value = parseInt(value)
  }
  if (value || parseInt(value) === 0) {
    elem.style.setProperty(property, typeof value === 'number' ? `${value}px` : value)
  } else {
    elem.style.removeProperty(property)
  }
}

/**
 * @param {HTMLElement | null} elem
 * @param {string} display
 */
const show = (elem, display = 'flex') => {
  if (!elem) {
    return
  }

  elem.style.display = display
}

/**
 * @param {HTMLElement | null} elem
 */
const hide = (elem) => {
  if (!elem) {
    return
  }

  elem.style.display = 'none'
}

/**
 * @param {HTMLElement | null} elem
 * @param {string} display
 */
const showWhenInnerHtmlPresent = (elem, display = 'block') => {
  if (!elem) {
    return
  }
  new MutationObserver(() => {
    toggle(elem, elem.innerHTML, display)
  }).observe(elem, { childList: true, subtree: true })
}

/**
 * @param {HTMLElement} parent
 * @param {string} selector
 * @param {string} property
 * @param {string} value
 */
const setStyle = (parent, selector, property, value) => {
  /** @type {HTMLElement | null} */
  const el = parent.querySelector(selector)
  if (el) {
    el.style.setProperty(property, value)
  }
}

/**
 * @param {HTMLElement} elem
 * @param {any} condition
 * @param {string} display
 */
const toggle = (elem, condition, display = 'flex') => {
  if (condition) {
    show(elem, display)
  } else {
    hide(elem)
  }
}

/**
 * borrowed from jquery $(elem).is(':visible') implementation
 *
 * @param {HTMLElement | null} elem
 * @returns {boolean}
 */
const isVisible = (elem) => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length))

/**
 * @returns {boolean}
 */
const allButtonsAreHidden = () =>
  !isVisible((0,_getters_js__WEBPACK_IMPORTED_MODULE_2__.getConfirmButton)()) && !isVisible((0,_getters_js__WEBPACK_IMPORTED_MODULE_2__.getDenyButton)()) && !isVisible((0,_getters_js__WEBPACK_IMPORTED_MODULE_2__.getCancelButton)())

/**
 * @param {HTMLElement} elem
 * @returns {boolean}
 */
const isScrollable = (elem) => !!(elem.scrollHeight > elem.clientHeight)

/**
 * borrowed from https://stackoverflow.com/a/46352119
 *
 * @param {HTMLElement} elem
 * @returns {boolean}
 */
const hasCssAnimation = (elem) => {
  const style = window.getComputedStyle(elem)

  const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0')
  const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0')

  return animDuration > 0 || transDuration > 0
}

/**
 * @param {number} timer
 * @param {boolean} reset
 */
const animateTimerProgressBar = (timer, reset = false) => {
  const timerProgressBar = (0,_getters_js__WEBPACK_IMPORTED_MODULE_2__.getTimerProgressBar)()
  if (!timerProgressBar) {
    return
  }
  if (isVisible(timerProgressBar)) {
    if (reset) {
      timerProgressBar.style.transition = 'none'
      timerProgressBar.style.width = '100%'
    }
    setTimeout(() => {
      timerProgressBar.style.transition = `width ${timer / 1000}s linear`
      timerProgressBar.style.width = '0%'
    }, 10)
  }
}

const stopTimerProgressBar = () => {
  const timerProgressBar = (0,_getters_js__WEBPACK_IMPORTED_MODULE_2__.getTimerProgressBar)()
  if (!timerProgressBar) {
    return
  }
  const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width)
  timerProgressBar.style.removeProperty('transition')
  timerProgressBar.style.width = '100%'
  const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width)
  const timerProgressBarPercent = (timerProgressBarWidth / timerProgressBarFullWidth) * 100
  timerProgressBar.style.width = `${timerProgressBarPercent}%`
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/getters.js":
/*!***********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/getters.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   elementBySelector: function() { return /* binding */ elementBySelector; },
/* harmony export */   getActions: function() { return /* binding */ getActions; },
/* harmony export */   getCancelButton: function() { return /* binding */ getCancelButton; },
/* harmony export */   getCloseButton: function() { return /* binding */ getCloseButton; },
/* harmony export */   getConfirmButton: function() { return /* binding */ getConfirmButton; },
/* harmony export */   getContainer: function() { return /* binding */ getContainer; },
/* harmony export */   getDenyButton: function() { return /* binding */ getDenyButton; },
/* harmony export */   getFocusableElements: function() { return /* binding */ getFocusableElements; },
/* harmony export */   getFooter: function() { return /* binding */ getFooter; },
/* harmony export */   getHtmlContainer: function() { return /* binding */ getHtmlContainer; },
/* harmony export */   getIcon: function() { return /* binding */ getIcon; },
/* harmony export */   getIconContent: function() { return /* binding */ getIconContent; },
/* harmony export */   getImage: function() { return /* binding */ getImage; },
/* harmony export */   getInputLabel: function() { return /* binding */ getInputLabel; },
/* harmony export */   getLoader: function() { return /* binding */ getLoader; },
/* harmony export */   getPopup: function() { return /* binding */ getPopup; },
/* harmony export */   getProgressSteps: function() { return /* binding */ getProgressSteps; },
/* harmony export */   getTimerProgressBar: function() { return /* binding */ getTimerProgressBar; },
/* harmony export */   getTitle: function() { return /* binding */ getTitle; },
/* harmony export */   getValidationMessage: function() { return /* binding */ getValidationMessage; },
/* harmony export */   isLoading: function() { return /* binding */ isLoading; },
/* harmony export */   isModal: function() { return /* binding */ isModal; },
/* harmony export */   isToast: function() { return /* binding */ isToast; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _domUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");



/**
 * Gets the popup container which contains the backdrop and the popup itself.
 *
 * @returns {HTMLElement | null}
 */
const getContainer = () => document.body.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.container}`)

/**
 * @param {string} selectorString
 * @returns {HTMLElement | null}
 */
const elementBySelector = (selectorString) => {
  const container = getContainer()
  return container ? container.querySelector(selectorString) : null
}

/**
 * @param {string} className
 * @returns {HTMLElement | null}
 */
const elementByClass = (className) => {
  return elementBySelector(`.${className}`)
}

/**
 * @returns {HTMLElement | null}
 */
const getPopup = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup)

/**
 * @returns {HTMLElement | null}
 */
const getIcon = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.icon)

/**
 * @returns {HTMLElement | null}
 */
const getIconContent = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['icon-content'])

/**
 * @returns {HTMLElement | null}
 */
const getTitle = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.title)

/**
 * @returns {HTMLElement | null}
 */
const getHtmlContainer = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['html-container'])

/**
 * @returns {HTMLElement | null}
 */
const getImage = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.image)

/**
 * @returns {HTMLElement | null}
 */
const getProgressSteps = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['progress-steps'])

/**
 * @returns {HTMLElement | null}
 */
const getValidationMessage = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['validation-message'])

/**
 * @returns {HTMLButtonElement | null}
 */
const getConfirmButton = () =>
  /** @type {HTMLButtonElement} */ (elementBySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.actions} .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.confirm}`))

/**
 * @returns {HTMLButtonElement | null}
 */
const getCancelButton = () =>
  /** @type {HTMLButtonElement} */ (elementBySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.actions} .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.cancel}`))

/**
 * @returns {HTMLButtonElement | null}
 */
const getDenyButton = () =>
  /** @type {HTMLButtonElement} */ (elementBySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.actions} .${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.deny}`))

/**
 * @returns {HTMLElement | null}
 */
const getInputLabel = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['input-label'])

/**
 * @returns {HTMLElement | null}
 */
const getLoader = () => elementBySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.loader}`)

/**
 * @returns {HTMLElement | null}
 */
const getActions = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.actions)

/**
 * @returns {HTMLElement | null}
 */
const getFooter = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.footer)

/**
 * @returns {HTMLElement | null}
 */
const getTimerProgressBar = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['timer-progress-bar'])

/**
 * @returns {HTMLElement | null}
 */
const getCloseButton = () => elementByClass(_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.close)

// https://github.com/jkup/focusable/blob/master/index.js
const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`
/**
 * @returns {HTMLElement[]}
 */
const getFocusableElements = () => {
  const popup = getPopup()
  if (!popup) {
    return []
  }
  /** @type {NodeListOf<HTMLElement>} */
  const focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')
  const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex)
    // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex') || '0')
      const tabindexB = parseInt(b.getAttribute('tabindex') || '0')
      if (tabindexA > tabindexB) {
        return 1
      } else if (tabindexA < tabindexB) {
        return -1
      }
      return 0
    })

  /** @type {NodeListOf<HTMLElement>} */
  const otherFocusableElements = popup.querySelectorAll(focusable)
  const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(
    (el) => el.getAttribute('tabindex') !== '-1'
  )

  return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter((el) =>
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.isVisible)(el)
  )
}

/**
 * @returns {boolean}
 */
const isModal = () => {
  return (
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.body, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.shown) &&
    !(0,_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.body, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['toast-shown']) &&
    !(0,_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.hasClass)(document.body, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['no-backdrop'])
  )
}

/**
 * @returns {boolean}
 */
const isToast = () => {
  const popup = getPopup()
  if (!popup) {
    return false
  }
  return (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_1__.hasClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.toast)
}

/**
 * @returns {boolean}
 */
const isLoading = () => {
  const popup = getPopup()
  if (!popup) {
    return false
  }
  return popup.hasAttribute('data-loading')
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.addClass; },
/* harmony export */   allButtonsAreHidden: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.allButtonsAreHidden; },
/* harmony export */   animateTimerProgressBar: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.animateTimerProgressBar; },
/* harmony export */   animationEndEvent: function() { return /* reexport safe */ _animationEndEvent_js__WEBPACK_IMPORTED_MODULE_4__.animationEndEvent; },
/* harmony export */   applyCustomClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.applyCustomClass; },
/* harmony export */   applyNumericalStyle: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.applyNumericalStyle; },
/* harmony export */   elementBySelector: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.elementBySelector; },
/* harmony export */   focusInput: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.focusInput; },
/* harmony export */   getActions: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getActions; },
/* harmony export */   getCancelButton: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getCancelButton; },
/* harmony export */   getCloseButton: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getCloseButton; },
/* harmony export */   getConfirmButton: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getConfirmButton; },
/* harmony export */   getContainer: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getContainer; },
/* harmony export */   getDenyButton: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getDenyButton; },
/* harmony export */   getDirectChildByClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.getDirectChildByClass; },
/* harmony export */   getFocusableElements: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getFocusableElements; },
/* harmony export */   getFooter: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getFooter; },
/* harmony export */   getHtmlContainer: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getHtmlContainer; },
/* harmony export */   getIcon: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getIcon; },
/* harmony export */   getIconContent: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getIconContent; },
/* harmony export */   getImage: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getImage; },
/* harmony export */   getInput: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.getInput; },
/* harmony export */   getInputLabel: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getInputLabel; },
/* harmony export */   getLoader: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getLoader; },
/* harmony export */   getPopup: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getPopup; },
/* harmony export */   getProgressSteps: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getProgressSteps; },
/* harmony export */   getTimerProgressBar: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getTimerProgressBar; },
/* harmony export */   getTitle: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getTitle; },
/* harmony export */   getValidationMessage: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.getValidationMessage; },
/* harmony export */   hasClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.hasClass; },
/* harmony export */   hasCssAnimation: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.hasCssAnimation; },
/* harmony export */   hide: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.hide; },
/* harmony export */   init: function() { return /* reexport safe */ _init_js__WEBPACK_IMPORTED_MODULE_1__.init; },
/* harmony export */   isLoading: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.isLoading; },
/* harmony export */   isModal: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.isModal; },
/* harmony export */   isScrollable: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.isScrollable; },
/* harmony export */   isToast: function() { return /* reexport safe */ _getters_js__WEBPACK_IMPORTED_MODULE_2__.isToast; },
/* harmony export */   isVisible: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.isVisible; },
/* harmony export */   parseHtmlToContainer: function() { return /* reexport safe */ _parseHtmlToContainer_js__WEBPACK_IMPORTED_MODULE_3__.parseHtmlToContainer; },
/* harmony export */   removeClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.removeClass; },
/* harmony export */   render: function() { return /* reexport safe */ _renderers_render_js__WEBPACK_IMPORTED_MODULE_5__.render; },
/* harmony export */   setInnerHtml: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml; },
/* harmony export */   setStyle: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.setStyle; },
/* harmony export */   show: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.show; },
/* harmony export */   showWhenInnerHtmlPresent: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.showWhenInnerHtmlPresent; },
/* harmony export */   stopTimerProgressBar: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.stopTimerProgressBar; },
/* harmony export */   toggle: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.toggle; },
/* harmony export */   toggleClass: function() { return /* reexport safe */ _domUtils_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass; }
/* harmony export */ });
/* harmony import */ var _domUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init.js */ "./node_modules/sweetalert2/src/utils/dom/init.js");
/* harmony import */ var _getters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");
/* harmony import */ var _parseHtmlToContainer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseHtmlToContainer.js */ "./node_modules/sweetalert2/src/utils/dom/parseHtmlToContainer.js");
/* harmony import */ var _animationEndEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animationEndEvent.js */ "./node_modules/sweetalert2/src/utils/dom/animationEndEvent.js");
/* harmony import */ var _renderers_render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderers/render.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/render.js");








/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/init.js":
/*!********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/init.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _isNodeEnv_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../isNodeEnv.js */ "./node_modules/sweetalert2/src/utils/isNodeEnv.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");
/* harmony import */ var _domUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");
/* harmony import */ var _getters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");







const sweetHTML = `
 <div aria-labelledby="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.title}" aria-describedby="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['html-container']}" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.popup}" tabindex="-1">
   <button type="button" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.close}"></button>
   <ul class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['progress-steps']}"></ul>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.icon}"></div>
   <img class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.image}" />
   <h2 class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.title}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.title}"></h2>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['html-container']}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['html-container']}"></div>
   <input class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.input}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.input}" />
   <input type="file" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.file}" />
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.select}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.select}"></select>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.radio}"></div>
   <label class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.checkbox}">
     <input type="checkbox" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.checkbox}" />
     <span class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.label}"></span>
   </label>
   <textarea class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.textarea}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.textarea}"></textarea>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['validation-message']}" id="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['validation-message']}"></div>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.actions}">
     <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.loader}"></div>
     <button type="button" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.confirm}"></button>
     <button type="button" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.deny}"></button>
     <button type="button" class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.cancel}"></button>
   </div>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.footer}"></div>
   <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['timer-progress-bar-container']}">
     <div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '')

/**
 * @returns {boolean}
 */
const resetOldContainer = () => {
  const oldContainer = (0,_getters_js__WEBPACK_IMPORTED_MODULE_5__.getContainer)()
  if (!oldContainer) {
    return false
  }

  oldContainer.remove()
  ;(0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.removeClass)(
    [document.documentElement, document.body],
    [_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['no-backdrop'], _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['toast-shown'], _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['has-column']]
  )

  return true
}

const resetValidationMessage = () => {
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentInstance.resetValidationMessage()
}

const addInputChangeListeners = () => {
  const popup = (0,_getters_js__WEBPACK_IMPORTED_MODULE_5__.getPopup)()

  const input = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.input)
  const file = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.file)
  /** @type {HTMLInputElement} */
  const range = popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.range} input`)
  /** @type {HTMLOutputElement} */
  const rangeOutput = popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.range} output`)
  const select = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.select)
  /** @type {HTMLInputElement} */
  const checkbox = popup.querySelector(`.${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.checkbox} input`)
  const textarea = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.textarea)

  input.oninput = resetValidationMessage
  file.onchange = resetValidationMessage
  select.onchange = resetValidationMessage
  checkbox.onchange = resetValidationMessage
  textarea.oninput = resetValidationMessage

  range.oninput = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }

  range.onchange = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }
}

/**
 * @param {string | HTMLElement} target
 * @returns {HTMLElement}
 */
const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target)

/**
 * @param {SweetAlertOptions} params
 */
const setupAccessibility = (params) => {
  const popup = (0,_getters_js__WEBPACK_IMPORTED_MODULE_5__.getPopup)()

  popup.setAttribute('role', params.toast ? 'alert' : 'dialog')
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive')
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true')
  }
}

/**
 * @param {HTMLElement} targetElement
 */
const setupRTL = (targetElement) => {
  if (window.getComputedStyle(targetElement).direction === 'rtl') {
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.addClass)((0,_getters_js__WEBPACK_IMPORTED_MODULE_5__.getContainer)(), _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.rtl)
  }
}

/**
 * Add modal + backdrop + no-war message for Russians to DOM
 *
 * @param {SweetAlertOptions} params
 */
const init = (params) => {
  // Clean up the old popup container if it exists
  const oldContainerExisted = resetOldContainer()

  if ((0,_isNodeEnv_js__WEBPACK_IMPORTED_MODULE_2__.isNodeEnv)()) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.error)('SweetAlert2 requires document to initialize')
    return
  }

  const container = document.createElement('div')
  container.className = _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.container
  if (oldContainerExisted) {
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.addClass)(container, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['no-transition'])
  }
  (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_4__.setInnerHtml)(container, sweetHTML)

  const targetElement = getTarget(params.target)
  targetElement.appendChild(container)

  setupAccessibility(params)
  setupRTL(targetElement)
  addInputChangeListeners()
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/inputUtils.js":
/*!**************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/inputUtils.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInputValue: function() { return /* binding */ getInputValue; },
/* harmony export */   handleInputOptionsAndValue: function() { return /* binding */ handleInputOptionsAndValue; }
/* harmony export */ });
/* harmony import */ var _staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../staticMethods/showLoading.js */ "./node_modules/sweetalert2/src/staticMethods/showLoading.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");
/* harmony import */ var _domUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");






/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const handleInputOptionsAndValue = (instance, params) => {
  if (params.input === 'select' || params.input === 'radio') {
    handleInputOptions(instance, params)
  } else if (
    ['text', 'email', 'number', 'tel', 'textarea'].some((i) => i === params.input) &&
    ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasToPromiseFn)(params.inputValue) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isPromise)(params.inputValue))
  ) {
    (0,_staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)(_index_js__WEBPACK_IMPORTED_MODULE_4__.getConfirmButton())
    handleInputValue(instance, params)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} innerParams
 * @returns {SweetAlertInputValue}
 */
const getInputValue = (instance, innerParams) => {
  const input = instance.getInput()
  if (!input) {
    return null
  }
  switch (innerParams.input) {
    case 'checkbox':
      return getCheckboxValue(input)
    case 'radio':
      return getRadioValue(input)
    case 'file':
      return getFileValue(input)
    default:
      return innerParams.inputAutoTrim ? input.value.trim() : input.value
  }
}

/**
 * @param {HTMLInputElement} input
 * @returns {number}
 */
const getCheckboxValue = (input) => (input.checked ? 1 : 0)

/**
 * @param {HTMLInputElement} input
 * @returns {string | null}
 */
const getRadioValue = (input) => (input.checked ? input.value : null)

/**
 * @param {HTMLInputElement} input
 * @returns {FileList | File | null}
 */
const getFileValue = (input) =>
  input.files && input.files.length ? (input.getAttribute('multiple') !== null ? input.files : input.files[0]) : null

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const handleInputOptions = (instance, params) => {
  const popup = _index_js__WEBPACK_IMPORTED_MODULE_4__.getPopup()
  if (!popup) {
    return
  }
  /**
   * @param {Record<string, any>} inputOptions
   */
  const processInputOptions = (inputOptions) => {
    if (params.input === 'select') {
      populateSelectOptions(popup, formatInputOptions(inputOptions), params)
    } else if (params.input === 'radio') {
      populateRadioOptions(popup, formatInputOptions(inputOptions), params)
    }
  }
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasToPromiseFn)(params.inputOptions) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isPromise)(params.inputOptions)) {
    (0,_staticMethods_showLoading_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)(_index_js__WEBPACK_IMPORTED_MODULE_4__.getConfirmButton())
    ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.asPromise)(params.inputOptions).then((inputOptions) => {
      instance.hideLoading()
      processInputOptions(inputOptions)
    })
  } else if (typeof params.inputOptions === 'object') {
    processInputOptions(params.inputOptions)
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.error)(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`)
  }
}

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const handleInputValue = (instance, params) => {
  const input = instance.getInput()
  if (!input) {
    return
  }
  _index_js__WEBPACK_IMPORTED_MODULE_4__.hide(input)
  ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.asPromise)(params.inputValue)
    .then((inputValue) => {
      input.value = params.input === 'number' ? `${parseFloat(inputValue) || 0}` : `${inputValue}`
      _index_js__WEBPACK_IMPORTED_MODULE_4__.show(input)
      input.focus()
      instance.hideLoading()
    })
    .catch((err) => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.error)(`Error in inputValue promise: ${err}`)
      input.value = ''
      _index_js__WEBPACK_IMPORTED_MODULE_4__.show(input)
      input.focus()
      instance.hideLoading()
    })
}

/**
 * @param {HTMLElement} popup
 * @param {InputOptionFlattened[]} inputOptions
 * @param {SweetAlertOptions} params
 */
function populateSelectOptions(popup, inputOptions, params) {
  const select = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_3__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.select)
  if (!select) {
    return
  }
  /**
   * @param {HTMLElement} parent
   * @param {string} optionLabel
   * @param {string} optionValue
   */
  const renderOption = (parent, optionLabel, optionValue) => {
    const option = document.createElement('option')
    option.value = optionValue
    _index_js__WEBPACK_IMPORTED_MODULE_4__.setInnerHtml(option, optionLabel)
    option.selected = isSelected(optionValue, params.inputValue)
    parent.appendChild(option)
  }
  inputOptions.forEach((inputOption) => {
    const optionValue = inputOption[0]
    const optionLabel = inputOption[1]
    // <optgroup> spec:
    // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
    // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
    // check whether this is a <optgroup>
    if (Array.isArray(optionLabel)) {
      // if it is an array, then it is an <optgroup>
      const optgroup = document.createElement('optgroup')
      optgroup.label = optionValue
      optgroup.disabled = false // not configurable for now
      select.appendChild(optgroup)
      optionLabel.forEach((o) => renderOption(optgroup, o[1], o[0]))
    } else {
      // case of <option>
      renderOption(select, optionLabel, optionValue)
    }
  })
  select.focus()
}

/**
 * @param {HTMLElement} popup
 * @param {InputOptionFlattened[]} inputOptions
 * @param {SweetAlertOptions} params
 */
function populateRadioOptions(popup, inputOptions, params) {
  const radio = (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_3__.getDirectChildByClass)(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.radio)
  if (!radio) {
    return
  }
  inputOptions.forEach((inputOption) => {
    const radioValue = inputOption[0]
    const radioLabel = inputOption[1]
    const radioInput = document.createElement('input')
    const radioLabelElement = document.createElement('label')
    radioInput.type = 'radio'
    radioInput.name = _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.radio
    radioInput.value = radioValue
    if (isSelected(radioValue, params.inputValue)) {
      radioInput.checked = true
    }
    const label = document.createElement('span')
    _index_js__WEBPACK_IMPORTED_MODULE_4__.setInnerHtml(label, radioLabel)
    label.className = _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.label
    radioLabelElement.appendChild(radioInput)
    radioLabelElement.appendChild(label)
    radio.appendChild(radioLabelElement)
  })
  const radios = radio.querySelectorAll('input')
  if (radios.length) {
    radios[0].focus()
  }
}

/**
 * Converts `inputOptions` into an array of `[value, label]`s
 *
 * @param {Record<string, any>} inputOptions
 * @typedef {string[]} InputOptionFlattened
 * @returns {InputOptionFlattened[]}
 */
const formatInputOptions = (inputOptions) => {
  /** @type {InputOptionFlattened[]} */
  const result = []
  if (inputOptions instanceof Map) {
    inputOptions.forEach((value, key) => {
      let valueFormatted = value
      if (typeof valueFormatted === 'object') {
        // case of <optgroup>
        valueFormatted = formatInputOptions(valueFormatted)
      }
      result.push([key, valueFormatted])
    })
  } else {
    Object.keys(inputOptions).forEach((key) => {
      let valueFormatted = inputOptions[key]
      if (typeof valueFormatted === 'object') {
        // case of <optgroup>
        valueFormatted = formatInputOptions(valueFormatted)
      }
      result.push([key, valueFormatted])
    })
  }
  return result
}

/**
 * @param {string} optionValue
 * @param {SweetAlertInputValue} inputValue
 * @returns {boolean}
 */
const isSelected = (optionValue, inputValue) => {
  return !!inputValue && inputValue.toString() === optionValue.toString()
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/parseHtmlToContainer.js":
/*!************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/parseHtmlToContainer.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseHtmlToContainer: function() { return /* binding */ parseHtmlToContainer; }
/* harmony export */ });
/* harmony import */ var _domUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domUtils.js */ "./node_modules/sweetalert2/src/utils/dom/domUtils.js");


/**
 * @param {HTMLElement | object | string} param
 * @param {HTMLElement} target
 */
const parseHtmlToContainer = (param, target) => {
  // DOM element
  if (param instanceof HTMLElement) {
    target.appendChild(param)
  }

  // Object
  else if (typeof param === 'object') {
    handleObject(param, target)
  }

  // Plain string
  else if (param) {
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(target, param)
  }
}

/**
 * @param {any} param
 * @param {HTMLElement} target
 */
const handleObject = (param, target) => {
  // JQuery element(s)
  if (param.jquery) {
    handleJqueryElem(target, param)
  }

  // For other objects use their string representation
  else {
    (0,_domUtils_js__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(target, param.toString())
  }
}

/**
 * @param {HTMLElement} target
 * @param {any} elem
 */
const handleJqueryElem = (target, elem) => {
  target.textContent = ''
  if (0 in elem) {
    for (let i = 0; i in elem; i++) {
      target.appendChild(elem[i].cloneNode(true))
    }
  } else {
    target.appendChild(elem.cloneNode(true))
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/render.js":
/*!********************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/render.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _getters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getters.js */ "./node_modules/sweetalert2/src/utils/dom/getters.js");
/* harmony import */ var _renderActions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderActions.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderActions.js");
/* harmony import */ var _renderCloseButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderCloseButton.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderCloseButton.js");
/* harmony import */ var _renderContainer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderContainer.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderContainer.js");
/* harmony import */ var _renderContent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderContent.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderContent.js");
/* harmony import */ var _renderFooter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderFooter.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderFooter.js");
/* harmony import */ var _renderIcon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderIcon.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderIcon.js");
/* harmony import */ var _renderImage_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./renderImage.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderImage.js");
/* harmony import */ var _renderPopup_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./renderPopup.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderPopup.js");
/* harmony import */ var _renderProgressSteps_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./renderProgressSteps.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderProgressSteps.js");
/* harmony import */ var _renderTitle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./renderTitle.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderTitle.js");













/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const render = (instance, params) => {
  (0,_renderPopup_js__WEBPACK_IMPORTED_MODULE_9__.renderPopup)(instance, params)
  ;(0,_renderContainer_js__WEBPACK_IMPORTED_MODULE_4__.renderContainer)(instance, params)

  ;(0,_renderProgressSteps_js__WEBPACK_IMPORTED_MODULE_10__.renderProgressSteps)(instance, params)
  ;(0,_renderIcon_js__WEBPACK_IMPORTED_MODULE_7__.renderIcon)(instance, params)
  ;(0,_renderImage_js__WEBPACK_IMPORTED_MODULE_8__.renderImage)(instance, params)
  ;(0,_renderTitle_js__WEBPACK_IMPORTED_MODULE_11__.renderTitle)(instance, params)
  ;(0,_renderCloseButton_js__WEBPACK_IMPORTED_MODULE_3__.renderCloseButton)(instance, params)

  ;(0,_renderContent_js__WEBPACK_IMPORTED_MODULE_5__.renderContent)(instance, params)
  ;(0,_renderActions_js__WEBPACK_IMPORTED_MODULE_2__.renderActions)(instance, params)
  ;(0,_renderFooter_js__WEBPACK_IMPORTED_MODULE_6__.renderFooter)(instance, params)

  const popup = (0,_getters_js__WEBPACK_IMPORTED_MODULE_1__.getPopup)()
  if (typeof params.didRender === 'function' && popup) {
    params.didRender(popup)
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('didRender', popup)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderActions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderActions.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderActions: function() { return /* binding */ renderActions; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");




/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderActions = (instance, params) => {
  const actions = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getActions()
  const loader = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getLoader()
  if (!actions || !loader) {
    return
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hide(actions)
  } else {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.show(actions)
  }

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(actions, params, 'actions')

  // Render all the buttons
  renderButtons(actions, loader, params)

  // Loader
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml(loader, params.loaderHtml || '')
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(loader, params, 'loader')
}

/**
 * @param {HTMLElement} actions
 * @param {HTMLElement} loader
 * @param {SweetAlertOptions} params
 */
function renderButtons(actions, loader, params) {
  const confirmButton = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getConfirmButton()
  const denyButton = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getDenyButton()
  const cancelButton = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getCancelButton()
  if (!confirmButton || !denyButton || !cancelButton) {
    return
  }

  // Render buttons
  renderButton(confirmButton, 'confirm', params)
  renderButton(denyButton, 'deny', params)
  renderButton(cancelButton, 'cancel', params)
  handleButtonsStyling(confirmButton, denyButton, cancelButton, params)

  if (params.reverseButtons) {
    if (params.toast) {
      actions.insertBefore(cancelButton, confirmButton)
      actions.insertBefore(denyButton, confirmButton)
    } else {
      actions.insertBefore(cancelButton, loader)
      actions.insertBefore(denyButton, loader)
      actions.insertBefore(confirmButton, loader)
    }
  }
}

/**
 * @param {HTMLElement} confirmButton
 * @param {HTMLElement} denyButton
 * @param {HTMLElement} cancelButton
 * @param {SweetAlertOptions} params
 */
function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
  if (!params.buttonsStyling) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.removeClass([confirmButton, denyButton, cancelButton], _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.styled)
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass([confirmButton, denyButton, cancelButton], _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.styled)

  // Buttons background colors
  if (params.confirmButtonColor) {
    confirmButton.style.backgroundColor = params.confirmButtonColor
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(confirmButton, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['default-outline'])
  }
  if (params.denyButtonColor) {
    denyButton.style.backgroundColor = params.denyButtonColor
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(denyButton, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['default-outline'])
  }
  if (params.cancelButtonColor) {
    cancelButton.style.backgroundColor = params.cancelButtonColor
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(cancelButton, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['default-outline'])
  }
}

/**
 * @param {HTMLElement} button
 * @param {'confirm' | 'deny' | 'cancel'} buttonType
 * @param {SweetAlertOptions} params
 */
function renderButton(button, buttonType, params) {
  const buttonName = /** @type {'Confirm' | 'Deny' | 'Cancel'} */ ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.capitalizeFirstLetter)(buttonType))

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.toggle(button, params[`show${buttonName}Button`], 'inline-block')
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml(button, params[`${buttonType}ButtonText`] || '') // Set caption text
  button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`] || '') // ARIA label

  // Add buttons custom classes
  button.className = _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses[buttonType]
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(button, params, `${buttonType}Button`)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderCloseButton.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderCloseButton.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCloseButton: function() { return /* binding */ renderCloseButton; }
/* harmony export */ });
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");


/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderCloseButton = (instance, params) => {
  const closeButton = _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getCloseButton()
  if (!closeButton) {
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml(closeButton, params.closeButtonHtml || '')

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.applyCustomClass(closeButton, params, 'closeButton')

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.toggle(closeButton, params.showCloseButton)
  closeButton.setAttribute('aria-label', params.closeButtonAriaLabel || '')
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderContainer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderContainer.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderContainer: function() { return /* binding */ renderContainer; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");




/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderContainer = (instance, params) => {
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getContainer()

  if (!container) {
    return
  }

  handleBackdropParam(container, params.backdrop)

  handlePositionParam(container, params.position)
  handleGrowParam(container, params.grow)

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(container, params, 'container')
}

/**
 * @param {HTMLElement} container
 * @param {SweetAlertOptions['backdrop']} backdrop
 */
function handleBackdropParam(container, backdrop) {
  if (typeof backdrop === 'string') {
    container.style.background = backdrop
  } else if (!backdrop) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass([document.documentElement, document.body], _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['no-backdrop'])
  }
}

/**
 * @param {HTMLElement} container
 * @param {SweetAlertOptions['position']} position
 */
function handlePositionParam(container, position) {
  if (!position) {
    return
  }
  if (position in _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(container, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses[position])
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)('The "position" parameter is not valid, defaulting to "center"')
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(container, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.center)
  }
}

/**
 * @param {HTMLElement} container
 * @param {SweetAlertOptions['grow']} grow
 */
function handleGrowParam(container, grow) {
  if (!grow) {
    return
  }
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(container, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses[`grow-${grow}`])
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderContent.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderContent.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderContent: function() { return /* binding */ renderContent; }
/* harmony export */ });
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _renderInput_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderInput.js */ "./node_modules/sweetalert2/src/utils/dom/renderers/renderInput.js");



/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderContent = (instance, params) => {
  const htmlContainer = _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getHtmlContainer()
  if (!htmlContainer) {
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.showWhenInnerHtmlPresent(htmlContainer)

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.applyCustomClass(htmlContainer, params, 'htmlContainer')

  // Content as HTML
  if (params.html) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.parseHtmlToContainer(params.html, htmlContainer)
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.show(htmlContainer, 'block')
  }

  // Content as plain text
  else if (params.text) {
    htmlContainer.textContent = params.text
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.show(htmlContainer, 'block')
  }

  // No content
  else {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.hide(htmlContainer)
  }

  (0,_renderInput_js__WEBPACK_IMPORTED_MODULE_1__.renderInput)(instance, params)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderFooter.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderFooter.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFooter: function() { return /* binding */ renderFooter; }
/* harmony export */ });
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");


/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderFooter = (instance, params) => {
  const footer = _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getFooter()
  if (!footer) {
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.showWhenInnerHtmlPresent(footer)

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.toggle(footer, params.footer, 'block')

  if (params.footer) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.parseHtmlToContainer(params.footer, footer)
  }

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.applyCustomClass(footer, params, 'footer')
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderIcon.js":
/*!************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderIcon.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderIcon: function() { return /* binding */ renderIcon; }
/* harmony export */ });
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");





/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderIcon = (instance, params) => {
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].innerParams.get(instance)
  const icon = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getIcon()
  if (!icon) {
    return
  }

  // if the given icon already rendered, apply the styling without re-rendering the icon
  if (innerParams && params.icon === innerParams.icon) {
    // Custom or default content
    setContent(icon, params)

    applyStyles(icon, params)
    return
  }

  if (!params.icon && !params.iconHtml) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(icon)
    return
  }

  if (params.icon && Object.keys(_classes_js__WEBPACK_IMPORTED_MODULE_1__.iconTypes).indexOf(params.icon) === -1) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.error)(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`)
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(icon)
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(icon)

  // Custom or default content
  setContent(icon, params)

  applyStyles(icon, params)

  // Animate icon
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass(icon, params.showClass && params.showClass.icon)
}

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 */
const applyStyles = (icon, params) => {
  for (const [iconType, iconClassName] of Object.entries(_classes_js__WEBPACK_IMPORTED_MODULE_1__.iconTypes)) {
    if (params.icon !== iconType) {
      _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.removeClass(icon, iconClassName)
    }
  }
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass(icon, params.icon && _classes_js__WEBPACK_IMPORTED_MODULE_1__.iconTypes[params.icon])

  // Icon color
  setColor(icon, params)

  // Success icon background color
  adjustSuccessIconBackgroundColor()

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.applyCustomClass(icon, params, 'icon')
}

// Adjust success icon background color to match the popup background color
const adjustSuccessIconBackgroundColor = () => {
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    return
  }
  const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color')
  /** @type {NodeListOf<HTMLElement>} */
  const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix')
  for (let i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor
  }
}

const successIconHtml = `
  <div class="swal2-success-circular-line-left"></div>
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
  <div class="swal2-success-circular-line-right"></div>
`

const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 */
const setContent = (icon, params) => {
  if (!params.icon && !params.iconHtml) {
    return
  }
  let oldContent = icon.innerHTML
  let newContent = ''
  if (params.iconHtml) {
    newContent = iconContent(params.iconHtml)
  } else if (params.icon === 'success') {
    newContent = successIconHtml
    oldContent = oldContent.replace(/ style=".*?"/g, '') // undo adjustSuccessIconBackgroundColor()
  } else if (params.icon === 'error') {
    newContent = errorIconHtml
  } else if (params.icon) {
    const defaultIconHtml = {
      question: '?',
      warning: '!',
      info: 'i',
    }
    newContent = iconContent(defaultIconHtml[params.icon])
  }

  if (oldContent.trim() !== newContent.trim()) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setInnerHtml(icon, newContent)
  }
}

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 */
const setColor = (icon, params) => {
  if (!params.iconColor) {
    return
  }
  icon.style.color = params.iconColor
  icon.style.borderColor = params.iconColor
  for (const sel of [
    '.swal2-success-line-tip',
    '.swal2-success-line-long',
    '.swal2-x-mark-line-left',
    '.swal2-x-mark-line-right',
  ]) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setStyle(icon, sel, 'background-color', params.iconColor)
  }
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setStyle(icon, '.swal2-success-ring', 'border-color', params.iconColor)
}

/**
 * @param {string} content
 * @returns {string}
 */
const iconContent = (content) => `<div class="${_classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['icon-content']}">${content}</div>`


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderImage.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderImage.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderImage: function() { return /* binding */ renderImage; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");



/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderImage = (instance, params) => {
  const image = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getImage()
  if (!image) {
    return
  }

  if (!params.imageUrl) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hide(image)
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.show(image, '')

  // Src, alt
  image.setAttribute('src', params.imageUrl)
  image.setAttribute('alt', params.imageAlt || '')

  // Width, height
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(image, 'width', params.imageWidth)
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(image, 'height', params.imageHeight)

  // Class
  image.className = _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.image
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(image, params, 'image')
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderInput.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderInput.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderInput: function() { return /* binding */ renderInput; }
/* harmony export */ });
/* harmony import */ var _privateProps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../privateProps.js */ "./node_modules/sweetalert2/src/privateProps.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");
/// <reference path="../../../../sweetalert2.d.ts"/>

/**
 * @typedef { HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement } Input
 * @typedef { 'input' | 'file' | 'range' | 'select' | 'radio' | 'checkbox' | 'textarea' } InputClass
 */





/** @type {InputClass[]} */
const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea']

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderInput = (instance, params) => {
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    return
  }
  const innerParams = _privateProps_js__WEBPACK_IMPORTED_MODULE_0__["default"].innerParams.get(instance)
  const rerender = !innerParams || params.input !== innerParams.input

  inputClasses.forEach((inputClass) => {
    const inputContainer = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getDirectChildByClass(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses[inputClass])

    if (!inputContainer) {
      return
    }

    // set attributes
    setAttributes(inputClass, params.inputAttributes)

    // set class
    inputContainer.className = _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses[inputClass]

    if (rerender) {
      _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.hide(inputContainer)
    }
  })

  if (params.input) {
    if (rerender) {
      showInput(params)
    }
    // set custom class
    setCustomClass(params)
  }
}

/**
 * @param {SweetAlertOptions} params
 */
const showInput = (params) => {
  if (!params.input) {
    return
  }

  if (!renderInputType[params.input]) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.error)(`Unexpected type of input! Expected ${Object.keys(renderInputType).join(' | ')}, got "${params.input}"`)
    return
  }

  const inputContainer = getInputContainer(params.input)
  if (!inputContainer) {
    return
  }

  const input = renderInputType[params.input](inputContainer, params)
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.show(inputContainer)

  // input autofocus
  if (params.inputAutoFocus) {
    setTimeout(() => {
      _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.focusInput(input)
    })
  }
}

/**
 * @param {HTMLInputElement} input
 */
const removeAttributes = (input) => {
  for (let i = 0; i < input.attributes.length; i++) {
    const attrName = input.attributes[i].name
    if (!['id', 'type', 'value', 'style'].includes(attrName)) {
      input.removeAttribute(attrName)
    }
  }
}

/**
 * @param {InputClass} inputClass
 * @param {SweetAlertOptions['inputAttributes']} inputAttributes
 */
const setAttributes = (inputClass, inputAttributes) => {
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    return
  }

  const input = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getInput(popup, inputClass)
  if (!input) {
    return
  }

  removeAttributes(input)

  for (const attr in inputAttributes) {
    input.setAttribute(attr, inputAttributes[attr])
  }
}

/**
 * @param {SweetAlertOptions} params
 */
const setCustomClass = (params) => {
  if (!params.input) {
    return
  }
  const inputContainer = getInputContainer(params.input)
  if (inputContainer) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.applyCustomClass(inputContainer, params, 'input')
  }
}

/**
 * @param {HTMLInputElement | HTMLTextAreaElement} input
 * @param {SweetAlertOptions} params
 */
const setInputPlaceholder = (input, params) => {
  if (!input.placeholder && params.inputPlaceholder) {
    input.placeholder = params.inputPlaceholder
  }
}

/**
 * @param {Input} input
 * @param {Input} prependTo
 * @param {SweetAlertOptions} params
 */
const setInputLabel = (input, prependTo, params) => {
  if (params.inputLabel) {
    const label = document.createElement('label')
    const labelClass = _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses['input-label']
    label.setAttribute('for', input.id)
    label.className = labelClass
    if (typeof params.customClass === 'object') {
      _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.addClass(label, params.customClass.inputLabel)
    }
    label.innerText = params.inputLabel
    prependTo.insertAdjacentElement('beforebegin', label)
  }
}

/**
 * @param {SweetAlertInput} inputType
 * @returns {HTMLElement | undefined}
 */
const getInputContainer = (inputType) => {
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()
  if (!popup) {
    return
  }

  return _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getDirectChildByClass(popup, _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses[/** @type {SwalClass} */ (inputType)] || _classes_js__WEBPACK_IMPORTED_MODULE_1__.swalClasses.input)
}

/**
 * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
 * @param {SweetAlertOptions['inputValue']} inputValue
 */
const checkAndSetInputValue = (input, inputValue) => {
  if (['string', 'number'].includes(typeof inputValue)) {
    input.value = `${inputValue}`
  } else if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isPromise)(inputValue)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.warn)(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`)
  }
}

/** @type {Record<SweetAlertInput, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */
const renderInputType = {}

/**
 * @param {HTMLInputElement} input
 * @param {SweetAlertOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.text =
  renderInputType.email =
  renderInputType.password =
  renderInputType.number =
  renderInputType.tel =
  renderInputType.url =
  renderInputType.search =
  renderInputType.date =
  renderInputType['datetime-local'] =
  renderInputType.time =
  renderInputType.week =
  renderInputType.month =
    /** @type {(input: Input | HTMLElement, params: SweetAlertOptions) => Input} */
    (input, params) => {
      checkAndSetInputValue(input, params.inputValue)
      setInputLabel(input, input, params)
      setInputPlaceholder(input, params)
      input.type = params.input
      return input
    }

/**
 * @param {HTMLInputElement} input
 * @param {SweetAlertOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.file = (input, params) => {
  setInputLabel(input, input, params)
  setInputPlaceholder(input, params)
  return input
}

/**
 * @param {HTMLInputElement} range
 * @param {SweetAlertOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.range = (range, params) => {
  const rangeInput = range.querySelector('input')
  const rangeOutput = range.querySelector('output')
  checkAndSetInputValue(rangeInput, params.inputValue)
  rangeInput.type = params.input
  checkAndSetInputValue(rangeOutput, params.inputValue)
  setInputLabel(rangeInput, range, params)
  return range
}

/**
 * @param {HTMLSelectElement} select
 * @param {SweetAlertOptions} params
 * @returns {HTMLSelectElement}
 */
renderInputType.select = (select, params) => {
  select.textContent = ''
  if (params.inputPlaceholder) {
    const placeholder = document.createElement('option')
    _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setInnerHtml(placeholder, params.inputPlaceholder)
    placeholder.value = ''
    placeholder.disabled = true
    placeholder.selected = true
    select.appendChild(placeholder)
  }
  setInputLabel(select, select, params)
  return select
}

/**
 * @param {HTMLInputElement} radio
 * @returns {HTMLInputElement}
 */
renderInputType.radio = (radio) => {
  radio.textContent = ''
  return radio
}

/**
 * @param {HTMLLabelElement} checkboxContainer
 * @param {SweetAlertOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.checkbox = (checkboxContainer, params) => {
  const checkbox = _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getInput(_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup(), 'checkbox')
  checkbox.value = '1'
  checkbox.checked = Boolean(params.inputValue)
  const label = checkboxContainer.querySelector('span')
  _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.setInnerHtml(label, params.inputPlaceholder || params.inputLabel)
  return checkbox
}

/**
 * @param {HTMLTextAreaElement} textarea
 * @param {SweetAlertOptions} params
 * @returns {HTMLTextAreaElement}
 */
renderInputType.textarea = (textarea, params) => {
  checkAndSetInputValue(textarea, params.inputValue)
  setInputPlaceholder(textarea, params)
  setInputLabel(textarea, textarea, params)

  /**
   * @param {HTMLElement} el
   * @returns {number}
   */
  const getMargin = (el) =>
    parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight)

  // https://github.com/sweetalert2/sweetalert2/issues/2291
  setTimeout(() => {
    // https://github.com/sweetalert2/sweetalert2/issues/1699
    if ('MutationObserver' in window) {
      const initialPopupWidth = parseInt(window.getComputedStyle(_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup()).width)
      const textareaResizeHandler = () => {
        // check if texarea is still in document (i.e. popup wasn't closed in the meantime)
        if (!document.body.contains(textarea)) {
          return
        }
        const textareaWidth = textarea.offsetWidth + getMargin(textarea)
        if (textareaWidth > initialPopupWidth) {
          _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup().style.width = `${textareaWidth}px`
        } else {
          _dom_index_js__WEBPACK_IMPORTED_MODULE_2__.applyNumericalStyle(_dom_index_js__WEBPACK_IMPORTED_MODULE_2__.getPopup(), 'width', params.width)
        }
      }
      new MutationObserver(textareaResizeHandler).observe(textarea, {
        attributes: true,
        attributeFilter: ['style'],
      })
    }
  })

  return textarea
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderPopup.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderPopup.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPopup: function() { return /* binding */ renderPopup; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");



/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderPopup = (instance, params) => {
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getContainer()
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getPopup()
  if (!container || !popup) {
    return
  }

  // Width
  // https://github.com/sweetalert2/sweetalert2/issues/2170
  if (params.toast) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(container, 'width', params.width)
    popup.style.width = '100%'
    const loader = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getLoader()
    if (loader) {
      popup.insertBefore(loader, _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getIcon())
    }
  } else {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(popup, 'width', params.width)
  }

  // Padding
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(popup, 'padding', params.padding)

  // Color
  if (params.color) {
    popup.style.color = params.color
  }

  // Background
  if (params.background) {
    popup.style.background = params.background
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hide(_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getValidationMessage())

  // Classes
  addClasses(popup, params)
}

/**
 * @param {HTMLElement} popup
 * @param {SweetAlertOptions} params
 */
const addClasses = (popup, params) => {
  const showClass = params.showClass || {}
  // Default Class + showClass when updating Swal.update({})
  popup.className = `${_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.popup} ${_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.isVisible(popup) ? showClass.popup : ''}`

  if (params.toast) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass([document.documentElement, document.body], _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['toast-shown'])
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(popup, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.toast)
  } else {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(popup, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.modal)
  }

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyCustomClass(popup, params, 'popup')
  // TODO: remove in the next major
  if (typeof params.customClass === 'string') {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(popup, params.customClass)
  }

  // Icon class (#1842)
  if (params.icon) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(popup, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses[`icon-${params.icon}`])
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderProgressSteps.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderProgressSteps.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProgressSteps: function() { return /* binding */ renderProgressSteps; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");




/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderProgressSteps = (instance, params) => {
  const progressStepsContainer = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getProgressSteps()
  if (!progressStepsContainer) {
    return
  }

  const { progressSteps, currentProgressStep } = params

  if (!progressSteps || progressSteps.length === 0 || currentProgressStep === undefined) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hide(progressStepsContainer)
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.show(progressStepsContainer)
  progressStepsContainer.textContent = ''
  if (currentProgressStep >= progressSteps.length) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(
      'Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
        '(currentProgressStep like JS arrays starts from 0)'
    )
  }

  progressSteps.forEach((step, index) => {
    const stepEl = createStepElement(step)
    progressStepsContainer.appendChild(stepEl)
    if (index === currentProgressStep) {
      _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(stepEl, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['active-progress-step'])
    }

    if (index !== progressSteps.length - 1) {
      const lineEl = createLineElement(params)
      progressStepsContainer.appendChild(lineEl)
    }
  })
}

/**
 * @param {string} step
 * @returns {HTMLLIElement}
 */
const createStepElement = (step) => {
  const stepEl = document.createElement('li')
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(stepEl, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['progress-step'])
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml(stepEl, step)
  return stepEl
}

/**
 * @param {SweetAlertOptions} params
 * @returns {HTMLLIElement}
 */
const createLineElement = (params) => {
  const lineEl = document.createElement('li')
  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(lineEl, _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['progress-step-line'])
  if (params.progressStepsDistance) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.applyNumericalStyle(lineEl, 'width', params.progressStepsDistance)
  }
  return lineEl
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/dom/renderers/renderTitle.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/dom/renderers/renderTitle.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTitle: function() { return /* binding */ renderTitle; }
/* harmony export */ });
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");


/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
const renderTitle = (instance, params) => {
  const title = _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.getTitle()
  if (!title) {
    return
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.showWhenInnerHtmlPresent(title)

  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.toggle(title, params.title || params.titleText, 'block')

  if (params.title) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.parseHtmlToContainer(params.title, title)
  }

  if (params.titleText) {
    title.innerText = params.titleText
  }

  // Custom class
  _dom_index_js__WEBPACK_IMPORTED_MODULE_0__.applyCustomClass(title, params, 'title')
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/getTemplateParams.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/getTemplateParams.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTemplateParams: function() { return /* binding */ getTemplateParams; }
/* harmony export */ });
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params.js */ "./node_modules/sweetalert2/src/utils/params.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");



const swalStringParams = ['swal-title', 'swal-html', 'swal-footer']

/**
 * @param {SweetAlertOptions} params
 * @returns {SweetAlertOptions}
 */
const getTemplateParams = (params) => {
  const template =
    typeof params.template === 'string'
      ? /** @type {HTMLTemplateElement} */ (document.querySelector(params.template))
      : params.template
  if (!template) {
    return {}
  }
  /** @type {DocumentFragment} */
  const templateContent = template.content

  showWarningsForElements(templateContent)

  const result = Object.assign(
    getSwalParams(templateContent),
    getSwalFunctionParams(templateContent),
    getSwalButtons(templateContent),
    getSwalImage(templateContent),
    getSwalIcon(templateContent),
    getSwalInput(templateContent),
    getSwalStringParams(templateContent, swalStringParams)
  )
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Record<string, any>}
 */
const getSwalParams = (templateContent) => {
  /** @type {Record<string, any>} */
  const result = {}
  /** @type {HTMLElement[]} */
  const swalParams = Array.from(templateContent.querySelectorAll('swal-param'))
  swalParams.forEach((param) => {
    showWarningsForAttributes(param, ['name', 'value'])
    const paramName = /** @type {keyof SweetAlertOptions} */ (param.getAttribute('name'))
    const value = param.getAttribute('value')
    if (!paramName || !value) {
      return
    }
    if (typeof _params_js__WEBPACK_IMPORTED_MODULE_0__["default"][paramName] === 'boolean') {
      result[paramName] = value !== 'false'
    } else if (typeof _params_js__WEBPACK_IMPORTED_MODULE_0__["default"][paramName] === 'object') {
      result[paramName] = JSON.parse(value)
    } else {
      result[paramName] = value
    }
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Record<string, any>}
 */
const getSwalFunctionParams = (templateContent) => {
  /** @type {Record<string, any>} */
  const result = {}
  /** @type {HTMLElement[]} */
  const swalFunctions = Array.from(templateContent.querySelectorAll('swal-function-param'))
  swalFunctions.forEach((param) => {
    const paramName = /** @type {keyof SweetAlertOptions} */ param.getAttribute('name')
    const value = param.getAttribute('value')
    if (!paramName || !value) {
      return
    }
    result[paramName] = new Function(`return ${value}`)()
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Record<string, any>}
 */
const getSwalButtons = (templateContent) => {
  /** @type {Record<string, any>} */
  const result = {}
  /** @type {HTMLElement[]} */
  const swalButtons = Array.from(templateContent.querySelectorAll('swal-button'))
  swalButtons.forEach((button) => {
    showWarningsForAttributes(button, ['type', 'color', 'aria-label'])
    const type = button.getAttribute('type')
    if (!type || !['confirm', 'cancel', 'deny'].includes(type)) {
      return
    }
    result[`${type}ButtonText`] = button.innerHTML
    result[`show${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.capitalizeFirstLetter)(type)}Button`] = true
    if (button.hasAttribute('color')) {
      result[`${type}ButtonColor`] = button.getAttribute('color')
    }
    if (button.hasAttribute('aria-label')) {
      result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label')
    }
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Pick<SweetAlertOptions, 'imageUrl' | 'imageWidth' | 'imageHeight' | 'imageAlt'>}
 */
const getSwalImage = (templateContent) => {
  const result = {}
  /** @type {HTMLElement | null} */
  const image = templateContent.querySelector('swal-image')
  if (image) {
    showWarningsForAttributes(image, ['src', 'width', 'height', 'alt'])
    if (image.hasAttribute('src')) {
      result.imageUrl = image.getAttribute('src') || undefined
    }
    if (image.hasAttribute('width')) {
      result.imageWidth = image.getAttribute('width') || undefined
    }
    if (image.hasAttribute('height')) {
      result.imageHeight = image.getAttribute('height') || undefined
    }
    if (image.hasAttribute('alt')) {
      result.imageAlt = image.getAttribute('alt') || undefined
    }
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Record<string, any>}
 */
const getSwalIcon = (templateContent) => {
  const result = {}
  /** @type {HTMLElement | null} */
  const icon = templateContent.querySelector('swal-icon')
  if (icon) {
    showWarningsForAttributes(icon, ['type', 'color'])
    if (icon.hasAttribute('type')) {
      result.icon = icon.getAttribute('type')
    }
    if (icon.hasAttribute('color')) {
      result.iconColor = icon.getAttribute('color')
    }
    result.iconHtml = icon.innerHTML
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {Record<string, any>}
 */
const getSwalInput = (templateContent) => {
  /** @type {Record<string, any>} */
  const result = {}
  /** @type {HTMLElement | null} */
  const input = templateContent.querySelector('swal-input')
  if (input) {
    showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value'])
    result.input = input.getAttribute('type') || 'text'
    if (input.hasAttribute('label')) {
      result.inputLabel = input.getAttribute('label')
    }
    if (input.hasAttribute('placeholder')) {
      result.inputPlaceholder = input.getAttribute('placeholder')
    }
    if (input.hasAttribute('value')) {
      result.inputValue = input.getAttribute('value')
    }
  }
  /** @type {HTMLElement[]} */
  const inputOptions = Array.from(templateContent.querySelectorAll('swal-input-option'))
  if (inputOptions.length) {
    result.inputOptions = {}
    inputOptions.forEach((option) => {
      showWarningsForAttributes(option, ['value'])
      const optionValue = option.getAttribute('value')
      if (!optionValue) {
        return
      }
      const optionName = option.innerHTML
      result.inputOptions[optionValue] = optionName
    })
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @param {string[]} paramNames
 * @returns {Record<string, any>}
 */
const getSwalStringParams = (templateContent, paramNames) => {
  /** @type {Record<string, any>} */
  const result = {}
  for (const i in paramNames) {
    const paramName = paramNames[i]
    /** @type {HTMLElement | null} */
    const tag = templateContent.querySelector(paramName)
    if (tag) {
      showWarningsForAttributes(tag, [])
      result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim()
    }
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 */
const showWarningsForElements = (templateContent) => {
  const allowedElements = swalStringParams.concat([
    'swal-param',
    'swal-function-param',
    'swal-button',
    'swal-image',
    'swal-icon',
    'swal-input',
    'swal-input-option',
  ])
  Array.from(templateContent.children).forEach((el) => {
    const tagName = el.tagName.toLowerCase()
    if (!allowedElements.includes(tagName)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.warn)(`Unrecognized element <${tagName}>`)
    }
  })
}

/**
 * @param {HTMLElement} el
 * @param {string[]} allowedAttributes
 */
const showWarningsForAttributes = (el, allowedAttributes) => {
  Array.from(el.attributes).forEach((attribute) => {
    if (allowedAttributes.indexOf(attribute.name) === -1) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.warn)([
        `Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`,
        `${
          allowedAttributes.length
            ? `Allowed attributes are: ${allowedAttributes.join(', ')}`
            : 'To set the value, use HTML within the element.'
        }`,
      ])
    }
  })
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/iosFix.js":
/*!******************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/iosFix.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iOSfix: function() { return /* binding */ iOSfix; },
/* harmony export */   isSafariOrIOS: function() { return /* binding */ isSafariOrIOS; },
/* harmony export */   undoIOSfix: function() { return /* binding */ undoIOSfix; }
/* harmony export */ });
/* harmony import */ var _utils_classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");



// @ts-ignore
const isSafariOrIOS = typeof window !== 'undefined' && !!window.GestureEvent // true for Safari desktop + all iOS browsers https://stackoverflow.com/a/70585394

/**
 * Fix iOS scrolling
 * http://stackoverflow.com/q/39626302
 */
const iOSfix = () => {
  if (isSafariOrIOS && !_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hasClass(document.body, _utils_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.iosfix)) {
    const offset = document.body.scrollTop
    document.body.style.top = `${offset * -1}px`
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.addClass(document.body, _utils_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.iosfix)
    lockBodyScroll()
  }
}

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1246
 */
const lockBodyScroll = () => {
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getContainer()
  if (!container) {
    return
  }
  /** @type {boolean} */
  let preventTouchMove
  /**
   * @param {TouchEvent} event
   */
  container.ontouchstart = (event) => {
    preventTouchMove = shouldPreventTouchMove(event)
  }
  /**
   * @param {TouchEvent} event
   */
  container.ontouchmove = (event) => {
    if (preventTouchMove) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}

/**
 * @param {TouchEvent} event
 * @returns {boolean}
 */
const shouldPreventTouchMove = (event) => {
  const target = event.target
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getContainer()
  const htmlContainer = _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.getHtmlContainer()
  if (!container || !htmlContainer) {
    return false
  }
  if (isStylus(event) || isZoom(event)) {
    return false
  }
  if (target === container) {
    return true
  }
  if (
    !_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.isScrollable(container) &&
    target instanceof HTMLElement &&
    target.tagName !== 'INPUT' && // #1603
    target.tagName !== 'TEXTAREA' && // #2266
    !(
      _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.isScrollable(htmlContainer) && // #1944
      htmlContainer.contains(target)
    )
  ) {
    return true
  }
  return false
}

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1786
 *
 * @param {*} event
 * @returns {boolean}
 */
const isStylus = (event) => {
  return event.touches && event.touches.length && event.touches[0].touchType === 'stylus'
}

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1891
 *
 * @param {TouchEvent} event
 * @returns {boolean}
 */
const isZoom = (event) => {
  return event.touches && event.touches.length > 1
}

const undoIOSfix = () => {
  if (_dom_index_js__WEBPACK_IMPORTED_MODULE_1__.hasClass(document.body, _utils_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.iosfix)) {
    const offset = parseInt(document.body.style.top, 10)
    _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.removeClass(document.body, _utils_classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses.iosfix)
    document.body.style.top = ''
    document.body.scrollTop = offset * -1
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/isNodeEnv.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/isNodeEnv.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNodeEnv: function() { return /* binding */ isNodeEnv; }
/* harmony export */ });
/**
 * Detect Node env
 *
 * @returns {boolean}
 */
const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined'


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/openPopup.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/openPopup.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SHOW_CLASS_TIMEOUT: function() { return /* binding */ SHOW_CLASS_TIMEOUT; },
/* harmony export */   openPopup: function() { return /* binding */ openPopup; }
/* harmony export */ });
/* harmony import */ var _globalState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalState.js */ "./node_modules/sweetalert2/src/globalState.js");
/* harmony import */ var _aria_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aria.js */ "./node_modules/sweetalert2/src/utils/aria.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _iosFix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./iosFix.js */ "./node_modules/sweetalert2/src/utils/iosFix.js");
/* harmony import */ var _scrollbar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scrollbar.js */ "./node_modules/sweetalert2/src/utils/scrollbar.js");







const SHOW_CLASS_TIMEOUT = 10

/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param {SweetAlertOptions} params
 */
const openPopup = (params) => {
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.getContainer()
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.getPopup()

  if (typeof params.willOpen === 'function') {
    params.willOpen(popup)
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('willOpen', popup)

  const bodyStyles = window.getComputedStyle(document.body)
  const initialBodyOverflow = bodyStyles.overflowY
  addClasses(container, popup, params)

  // scrolling is 'hidden' until animation is done, after that 'auto'
  setTimeout(() => {
    setScrollingVisibility(container, popup)
  }, SHOW_CLASS_TIMEOUT)

  if (_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.isModal()) {
    fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow)
    ;(0,_aria_js__WEBPACK_IMPORTED_MODULE_1__.setAriaHidden)()
  }

  if (!_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.isToast() && !_globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].previousActiveElement) {
    _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].previousActiveElement = document.activeElement
  }

  if (typeof params.didOpen === 'function') {
    setTimeout(() => params.didOpen(popup))
  }
  _globalState_js__WEBPACK_IMPORTED_MODULE_0__["default"].eventEmitter.emit('didOpen', popup)

  _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.removeClass(container, _classes_js__WEBPACK_IMPORTED_MODULE_2__.swalClasses['no-transition'])
}

/**
 * @param {AnimationEvent} event
 */
const swalOpenAnimationFinished = (event) => {
  const popup = _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.getPopup()
  if (event.target !== popup || !_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.animationEndEvent) {
    return
  }
  const container = _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.getContainer()
  popup.removeEventListener(_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.animationEndEvent, swalOpenAnimationFinished)
  container.style.overflowY = 'auto'
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} popup
 */
const setScrollingVisibility = (container, popup) => {
  if (_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.animationEndEvent && _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.hasCssAnimation(popup)) {
    container.style.overflowY = 'hidden'
    popup.addEventListener(_dom_index_js__WEBPACK_IMPORTED_MODULE_3__.animationEndEvent, swalOpenAnimationFinished)
  } else {
    container.style.overflowY = 'auto'
  }
}

/**
 * @param {HTMLElement} container
 * @param {boolean} scrollbarPadding
 * @param {string} initialBodyOverflow
 */
const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
  ;(0,_iosFix_js__WEBPACK_IMPORTED_MODULE_4__.iOSfix)()

  if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
    (0,_scrollbar_js__WEBPACK_IMPORTED_MODULE_5__.replaceScrollbarWithPadding)(initialBodyOverflow)
  }

  // sweetalert2/issues/1247
  setTimeout(() => {
    container.scrollTop = 0
  })
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} popup
 * @param {SweetAlertOptions} params
 */
const addClasses = (container, popup, params) => {
  _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.addClass(container, params.showClass.backdrop)
  if (params.animation) {
    // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
    popup.style.setProperty('opacity', '0', 'important')
    _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.show(popup, 'grid')
    setTimeout(() => {
      // Animate popup right after showing it
      _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.addClass(popup, params.showClass.popup)
      // and remove the opacity workaround
      popup.style.removeProperty('opacity')
    }, SHOW_CLASS_TIMEOUT) // 10ms in order to fix #2062
  } else {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.show(popup, 'grid')
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.addClass([document.documentElement, document.body], _classes_js__WEBPACK_IMPORTED_MODULE_2__.swalClasses.shown)
  if (params.heightAuto && params.backdrop && !params.toast) {
    _dom_index_js__WEBPACK_IMPORTED_MODULE_3__.addClass([document.documentElement, document.body], _classes_js__WEBPACK_IMPORTED_MODULE_2__.swalClasses['height-auto'])
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/params.js":
/*!******************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/params.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultParams: function() { return /* binding */ defaultParams; },
/* harmony export */   deprecatedParams: function() { return /* binding */ deprecatedParams; },
/* harmony export */   isDeprecatedParameter: function() { return /* binding */ isDeprecatedParameter; },
/* harmony export */   isUpdatableParameter: function() { return /* binding */ isUpdatableParameter; },
/* harmony export */   isValidParameter: function() { return /* binding */ isValidParameter; },
/* harmony export */   showWarningsForParams: function() { return /* binding */ showWarningsForParams; },
/* harmony export */   updatableParams: function() { return /* binding */ updatableParams; }
/* harmony export */ });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");


const defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  icon: undefined,
  iconColor: undefined,
  iconHtml: undefined,
  template: undefined,
  toast: false,
  animation: true,
  showClass: {
    popup: 'swal2-show',
    backdrop: 'swal2-backdrop-show',
    icon: 'swal2-icon-show',
  },
  hideClass: {
    popup: 'swal2-hide',
    backdrop: 'swal2-backdrop-hide',
    icon: 'swal2-icon-hide',
  },
  customClass: {},
  target: 'body',
  color: undefined,
  backdrop: true,
  heightAuto: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
  keydownListenerCapture: false,
  showConfirmButton: true,
  showDenyButton: false,
  showCancelButton: false,
  preConfirm: undefined,
  preDeny: undefined,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: undefined,
  denyButtonText: 'No',
  denyButtonAriaLabel: '',
  denyButtonColor: undefined,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: undefined,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusDeny: false,
  focusCancel: false,
  returnFocus: true,
  showCloseButton: false,
  closeButtonHtml: '&times;',
  closeButtonAriaLabel: 'Close this dialog',
  loaderHtml: '',
  showLoaderOnConfirm: false,
  showLoaderOnDeny: false,
  imageUrl: undefined,
  imageWidth: undefined,
  imageHeight: undefined,
  imageAlt: '',
  timer: undefined,
  timerProgressBar: false,
  width: undefined,
  padding: undefined,
  background: undefined,
  input: undefined,
  inputPlaceholder: '',
  inputLabel: '',
  inputValue: '',
  inputOptions: {},
  inputAutoFocus: true,
  inputAutoTrim: true,
  inputAttributes: {},
  inputValidator: undefined,
  returnInputValueOnDeny: false,
  validationMessage: undefined,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: undefined,
  progressStepsDistance: undefined,
  willOpen: undefined,
  didOpen: undefined,
  didRender: undefined,
  willClose: undefined,
  didClose: undefined,
  didDestroy: undefined,
  scrollbarPadding: true,
}

const updatableParams = [
  'allowEscapeKey',
  'allowOutsideClick',
  'background',
  'buttonsStyling',
  'cancelButtonAriaLabel',
  'cancelButtonColor',
  'cancelButtonText',
  'closeButtonAriaLabel',
  'closeButtonHtml',
  'color',
  'confirmButtonAriaLabel',
  'confirmButtonColor',
  'confirmButtonText',
  'currentProgressStep',
  'customClass',
  'denyButtonAriaLabel',
  'denyButtonColor',
  'denyButtonText',
  'didClose',
  'didDestroy',
  'footer',
  'hideClass',
  'html',
  'icon',
  'iconColor',
  'iconHtml',
  'imageAlt',
  'imageHeight',
  'imageUrl',
  'imageWidth',
  'preConfirm',
  'preDeny',
  'progressSteps',
  'returnFocus',
  'reverseButtons',
  'showCancelButton',
  'showCloseButton',
  'showConfirmButton',
  'showDenyButton',
  'text',
  'title',
  'titleText',
  'willClose',
]

/** @type {Record<string, string | undefined>} */
const deprecatedParams = {
  allowEnterKey: undefined,
}

const toastIncompatibleParams = [
  'allowOutsideClick',
  'allowEnterKey',
  'backdrop',
  'focusConfirm',
  'focusDeny',
  'focusCancel',
  'returnFocus',
  'heightAuto',
  'keydownListenerCapture',
]

/**
 * Is valid parameter
 *
 * @param {string} paramName
 * @returns {boolean}
 */
const isValidParameter = (paramName) => {
  return Object.prototype.hasOwnProperty.call(defaultParams, paramName)
}

/**
 * Is valid parameter for Swal.update() method
 *
 * @param {string} paramName
 * @returns {boolean}
 */
const isUpdatableParameter = (paramName) => {
  return updatableParams.indexOf(paramName) !== -1
}

/**
 * Is deprecated parameter
 *
 * @param {string} paramName
 * @returns {string | undefined}
 */
const isDeprecatedParameter = (paramName) => {
  return deprecatedParams[paramName]
}

/**
 * @param {string} param
 */
const checkIfParamIsValid = (param) => {
  if (!isValidParameter(param)) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.warn)(`Unknown parameter "${param}"`)
  }
}

/**
 * @param {string} param
 */
const checkIfToastParamIsValid = (param) => {
  if (toastIncompatibleParams.includes(param)) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.warn)(`The parameter "${param}" is incompatible with toasts`)
  }
}

/**
 * @param {string} param
 */
const checkIfParamIsDeprecated = (param) => {
  const isDeprecated = isDeprecatedParameter(param)
  if (isDeprecated) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.warnAboutDeprecation)(param, isDeprecated)
  }
}

/**
 * Show relevant warnings for given params
 *
 * @param {SweetAlertOptions} params
 */
const showWarningsForParams = (params) => {
  if (params.backdrop === false && params.allowOutsideClick) {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.warn)('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`')
  }

  for (const param in params) {
    checkIfParamIsValid(param)

    if (params.toast) {
      checkIfToastParamIsValid(param)
    }

    checkIfParamIsDeprecated(param)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (defaultParams);


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/scrollbar.js":
/*!*********************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/scrollbar.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   measureScrollbar: function() { return /* binding */ measureScrollbar; },
/* harmony export */   replaceScrollbarWithPadding: function() { return /* binding */ replaceScrollbarWithPadding; },
/* harmony export */   undoReplaceScrollbarWithPadding: function() { return /* binding */ undoReplaceScrollbarWithPadding; }
/* harmony export */ });
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes.js */ "./node_modules/sweetalert2/src/utils/classes.js");


/**
 * Measure scrollbar width for padding body during modal show/hide
 * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
 *
 * @returns {number}
 */
const measureScrollbar = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.className = _classes_js__WEBPACK_IMPORTED_MODULE_0__.swalClasses['scrollbar-measure']
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

/**
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * @type {number | null}
 */
let previousBodyPadding = null

/**
 * @param {string} initialBodyOverflow
 */
const replaceScrollbarWithPadding = (initialBodyOverflow) => {
  // for queues, do not do this more than once
  if (previousBodyPadding !== null) {
    return
  }
  // if the body has overflow
  if (
    document.body.scrollHeight > window.innerHeight ||
    initialBodyOverflow === 'scroll' // https://github.com/sweetalert2/sweetalert2/issues/2663
  ) {
    // add padding so the content doesn't shift after removal of scrollbar
    previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'))
    document.body.style.paddingRight = `${previousBodyPadding + measureScrollbar()}px`
  }
}

const undoReplaceScrollbarWithPadding = () => {
  if (previousBodyPadding !== null) {
    document.body.style.paddingRight = `${previousBodyPadding}px`
    previousBodyPadding = null
  }
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/setParameters.js":
/*!*************************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/setParameters.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ setParameters; }
/* harmony export */ });
/* harmony import */ var _defaultInputValidators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultInputValidators.js */ "./node_modules/sweetalert2/src/utils/defaultInputValidators.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/index.js */ "./node_modules/sweetalert2/src/utils/dom/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sweetalert2/src/utils/utils.js");




/**
 * @param {SweetAlertOptions} params
 */
function setDefaultInputValidators(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (params.inputValidator) {
    return
  }
  if (params.input === 'email') {
    params.inputValidator = _defaultInputValidators_js__WEBPACK_IMPORTED_MODULE_0__["default"]['email']
  }
  if (params.input === 'url') {
    params.inputValidator = _defaultInputValidators_js__WEBPACK_IMPORTED_MODULE_0__["default"]['url']
  }
}

/**
 * @param {SweetAlertOptions} params
 */
function validateCustomTargetElement(params) {
  // Determine if the custom target element is valid
  if (
    !params.target ||
    (typeof params.target === 'string' && !document.querySelector(params.target)) ||
    (typeof params.target !== 'string' && !params.target.appendChild)
  ) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)('Target parameter is not valid, defaulting to "body"')
    params.target = 'body'
  }
}

/**
 * Set type, text and actions on popup
 *
 * @param {SweetAlertOptions} params
 */
function setParameters(params) {
  setDefaultInputValidators(params)

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(
      'showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' +
        'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' +
        'https://sweetalert2.github.io/#ajax-request'
    )
  }

  validateCustomTargetElement(params)

  // Replace newlines with <br> in title
  if (typeof params.title === 'string') {
    params.title = params.title.split('\n').join('<br />')
  }

  _dom_index_js__WEBPACK_IMPORTED_MODULE_1__.init(params)
}


/***/ }),

/***/ "./node_modules/sweetalert2/src/utils/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/sweetalert2/src/utils/utils.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asPromise: function() { return /* binding */ asPromise; },
/* harmony export */   callIfFunction: function() { return /* binding */ callIfFunction; },
/* harmony export */   capitalizeFirstLetter: function() { return /* binding */ capitalizeFirstLetter; },
/* harmony export */   consolePrefix: function() { return /* binding */ consolePrefix; },
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   hasToPromiseFn: function() { return /* binding */ hasToPromiseFn; },
/* harmony export */   isPromise: function() { return /* binding */ isPromise; },
/* harmony export */   warn: function() { return /* binding */ warn; },
/* harmony export */   warnAboutDeprecation: function() { return /* binding */ warnAboutDeprecation; },
/* harmony export */   warnOnce: function() { return /* binding */ warnOnce; }
/* harmony export */ });
const consolePrefix = 'SweetAlert2:'

/**
 * Capitalize the first letter of a string
 *
 * @param {string} str
 * @returns {string}
 */
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Standardize console warnings
 *
 * @param {string | string[]} message
 */
const warn = (message) => {
  console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`)
}

/**
 * Standardize console errors
 *
 * @param {string} message
 */
const error = (message) => {
  console.error(`${consolePrefix} ${message}`)
}

/**
 * Private global state for `warnOnce`
 *
 * @type {string[]}
 * @private
 */
const previousWarnOnceMessages = []

/**
 * Show a console warning, but only if it hasn't already been shown
 *
 * @param {string} message
 */
const warnOnce = (message) => {
  if (!previousWarnOnceMessages.includes(message)) {
    previousWarnOnceMessages.push(message)
    warn(message)
  }
}

/**
 * Show a one-time console warning about deprecated params/methods
 *
 * @param {string} deprecatedParam
 * @param {string?} useInstead
 */
const warnAboutDeprecation = (deprecatedParam, useInstead = null) => {
  warnOnce(
    `"${deprecatedParam}" is deprecated and will be removed in the next major release.${
      useInstead ? ` Use "${useInstead}" instead.` : ''
    }`
  )
}

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 *
 * @param {Function | any} arg
 * @returns {any}
 */
const callIfFunction = (arg) => (typeof arg === 'function' ? arg() : arg)

/**
 * @param {any} arg
 * @returns {boolean}
 */
const hasToPromiseFn = (arg) => arg && typeof arg.toPromise === 'function'

/**
 * @param {any} arg
 * @returns {Promise<any>}
 */
const asPromise = (arg) => (hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg))

/**
 * @param {any} arg
 * @returns {boolean}
 */
const isPromise = (arg) => arg && Promise.resolve(arg) === arg


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************************************************!*\
  !*** ./resources/assets/vendor/libs/sweetalert2/sweetalert2.js ***!
  \*****************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Swal: function() { return /* reexport safe */ sweetalert2_src_sweetalert2__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var sweetalert2_src_sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2/src/sweetalert2 */ "./node_modules/sweetalert2/src/sweetalert2.js");


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});