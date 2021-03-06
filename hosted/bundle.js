"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Add character handler
var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All feilds are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

// Return character search form
var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "domoForm", name: "domoForm", action: "/maker", method: "POST", className: "domoForm", type: "submit" },
        React.createElement(
            "div",
            { id: "searchCharacterName" },
            React.createElement(
                "label",
                { "for": "name" },
                "Name: "
            ),
            React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Character" })
        ),
        React.createElement(
            "div",
            { id: "searchCharacterRealm" },
            React.createElement(
                "label",
                { "for": "age" },
                "Realm: "
            ),
            React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Realm" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Add Character" })
    );
};

// Return character list 
var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement("div", { className: "domoList" });
    };

    var domoNodes = props.domos.map(function (domo) {
        return React.createElement(
            "li",
            { className: "character", key: domo._id },
            React.createElement(
                "div",
                { className: "imgDiv" },
                React.createElement("img", { src: "http://render-us.worldofwarcraft.com/character/" + domo.icon, alt: "domo face", className: "domoFace" })
            ),
            React.createElement(
                "div",
                { className: "textDiv" },
                React.createElement(
                    "h3",
                    _defineProperty({ className: "characterName" }, "className", domo.class),
                    domo.name,
                    React.createElement("input", { onclick: "radioClick()", type: "radio", name: "radio", id: domo.name, value: domo.age })
                ),
                React.createElement(
                    "h3",
                    { className: "characterLevel" },
                    domo.age
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        React.createElement(
            "ul",
            null,
            domoNodes
        )
    );
};

// load characters from server2
var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};

// handle search for character content
var handleSearch = function handleSearch(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Cannot search");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    //sendAjax('POST', $("#characterInfoContent").attr("action"), $("#characterInfoContent").serialize(), redirect);


    redirect({ redirect: '/maker' });
    return false;
};

// FORM 1 ***
// Return overview form 1
var OverviewForm1 = function OverviewForm1(props) {
    return React.createElement(
        "form",
        { id: "form1-character" },
        React.createElement(
            "div",
            { id: "form1-header", className: "textDiv" },
            React.createElement(
                "h2",
                _defineProperty({ id: "form-characterName", className: "characterName" }, "className", props.class),
                "Character Name"
            ),
            React.createElement(
                "h3",
                { id: "form-characterLevel", className: "characterLevel" },
                "XXX CLASS"
            ),
            React.createElement(
                "h3",
                { id: "form-characterRealm", className: "characterRealm" },
                "REALM"
            )
        ),
        React.createElement("div", { id: "form1-image", className: "imgDiv" })
    );
};

// Render character overview form 1
var createOverview1 = function createOverview1(csrf) {
    ReactDOM.render(React.createElement(OverviewForm1, { csrf: csrf }), document.querySelector("#characterInfoContent"));
};

// FORM 2 ***
// Return overview form 2
var OverviewForm2 = function OverviewForm2(props) {
    return React.createElement(
        "form",
        { id: "form2-character" },
        React.createElement(
            "div",
            { id: "form2-header", className: "textDiv" },
            React.createElement(
                "h2",
                _defineProperty({ id: "form-characterName", className: "characterName" }, "className", props.class),
                "Character Name"
            ),
            React.createElement(
                "h3",
                { id: "form-characterRealm", className: "characterRealm" },
                "REALM"
            )
        ),
        React.createElement("div", { id: "form2-image", className: "imgDiv" })
    );
};

// render character overview form 2
var createOverview2 = function createOverview2(csrf) {
    ReactDOM.render(React.createElement(OverviewForm2, { csrf: csrf }), document.querySelector("#characterInfoContent"));
};

// FORM 3 ***
// Return overview form 3
var OverviewForm3 = function OverviewForm3(props) {
    return React.createElement(
        "form",
        { id: "form2-character" },
        React.createElement(
            "div",
            { id: "form2-header", className: "textDiv" },
            React.createElement(
                "h2",
                _defineProperty({ id: "form-characterName", className: "characterName" }, "className", props.class),
                "Character Name"
            ),
            React.createElement(
                "h3",
                { id: "form-characterRealm", className: "characterRealm" },
                "RANK"
            )
        ),
        React.createElement("div", { id: "form3-image", className: "imgDiv" })
    );
};

// Render character overview form 3
var createOverview3 = function createOverview3(csrf) {
    ReactDOM.render(React.createElement(OverviewForm3, { csrf: csrf }), document.querySelector("#characterInfoContent"));
};

// Change password modal
var PasswordChange = function PasswordChange(props) {
    return React.createElement(
        "form",
        { id: "passwordForm",
            name: "passwordForm",
            onSubmit: handlePasswordChange,
            action: "/changePassword",
            method: "POST",
            className: "passwordForm"
        },
        React.createElement(
            "h2",
            null,
            "Change Password"
        ),
        React.createElement(
            "a",
            { "class": "close", href: "#" },
            "\xD7"
        ),
        React.createElement(
            "label",
            { htmlFor: "username" },
            "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "New password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "new password" }),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Submit" })
    );
};

// change password handler
var handlePasswordChange = function handlePasswordChange(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#username").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

    return false;
};

var createPasswordChange = function createPasswordChange(csrf) {
    ReactDOM.render(React.createElement(PasswordChange, { csrf: csrf }), document.querySelector("#changePassContent"));
};

// Render components
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#addCharacter"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    createPasswordChange(csrf);

    var overviewBtn1 = document.querySelector("#overviewBtn1");
    var overviewBtn2 = document.querySelector("#overviewBtn2");
    var overviewBtn3 = document.querySelector("#overviewBtn3");

    overviewBtn1.addEventListener("click", function (e) {
        e.preventDefault();
        createOverview1(csrf);
        return false;
    });

    overviewBtn2.addEventListener("click", function (e) {
        //e.preventDefault();
        //createOverview2(csrf);
        // return false;
        createOverview2(csrf);
    });

    overviewBtn3.addEventListener("click", function (e) {
        //e.preventDefault();
        createOverview3(csrf);
        //return false;
    });

    loadDomosFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
